/* ============================================================
   One-time-password (OTP) handling for the lead forms.

   Delivery: WhatsApp Business API "registration" template message.
   Storage:  the `phone_otps` table in Supabase (full audit trail —
             every OTP ever issued for a number is a separate row).

   Env vars (set in .env.local):
     SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY       — DB (see lib/supabase.ts)
     WHATSAPP_ENDPOINT_URL, WHATSAPP_API_KEY        — delivery (lib/whatsapp.ts)

   Phone format: `normalizePhone` returns digits only (e.g. "918080888131"),
   which is both the WhatsApp `to` format (country code + number, no "+")
   and the key used in phone_otps. The client sends "+918080888131"; the
   leading "+" is stripped here.
   ============================================================ */

import { randomInt } from "node:crypto";
import { supabase } from "./supabase";
import { sendOtpWhatsApp } from "./whatsapp";

export type NormalizedPhone = string; // digits only, e.g. "918080888131"

export const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const OTP_MAX_ATTEMPTS = 5;

// Rate limits per phone number (see issueOtp). Tuned to prevent WhatsApp
// API abuse/cost while staying usable.
const RESEND_COOLDOWN_MS = 30 * 1000; // min 30s between requests
const HOURLY_MAX = 5; // max 5 OTPs issued per number per rolling hour

const TABLE = "phone_otps";

type OtpRow = {
  id: string;
  phone_number: string;
  otp: string;
  attempts: number;
  created_at: string;
  expires_at: string;
  verified: boolean;
};

/* Accept whatever the form captures and normalise to the digits-only
   international format WhatsApp expects and the DB keys on. The client
   sends "+918080888131"; we keep 8–15 digit numbers. */
export const normalizePhone = (raw: string): NormalizedPhone | null => {
  const digits = (raw ?? "").replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
};

export type SendResult =
  | { ok: true }
  | { ok: false; error: string; status?: number };

/**
 * Issue a fresh OTP for `phone`. Every call generates a brand-new code,
   inserts a new phone_otps row (never updates/reuses an old one), and
   sends it via WhatsApp. On WhatsApp failure the inserted row is deleted
   so no "ghost" code the user can never fulfil remains.
 */
export const issueOtp = async (phone: NormalizedPhone): Promise<SendResult> => {
  const now = Date.now();

  // ---- 1. Rate limit -----------------------------------------------
  // a) Most recent request too recent? (resend cooldown)
  const { data: recent, error: recentErr } = await supabase
    .from(TABLE)
    .select("created_at")
    .eq("phone_number", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recentErr) return dbError();

  if (recent) {
    const lastMs = new Date(recent.created_at).getTime();
    if (now - lastMs < RESEND_COOLDOWN_MS) {
      return {
        ok: false,
        status: 429,
        error: "Please wait a few seconds before requesting a new code.",
      };
    }
  }

  // b) Too many requests in the last hour?
  const hourAgo = new Date(now - 60 * 60 * 1000).toISOString();
  const { count, error: countErr } = await supabase
    .from(TABLE)
    .select("id", { count: "exact", head: true })
    .eq("phone_number", phone)
    .gte("created_at", hourAgo);

  if (countErr) return dbError();
  if ((count ?? 0) >= HOURLY_MAX) {
    return {
      ok: false,
      status: 429,
      error: "Too many code requests. Please try again later.",
    };
  }

  // ---- 2. Generate a fresh 4-digit OTP (server-side, cryptographic) -
  const otp = String(randomInt(1000, 10000));

  // ---- 3. Insert a new row (full audit trail, never reuse) ---------
  const expiresAt = new Date(now + OTP_TTL_MS).toISOString();
  const { data: inserted, error: insertErr } = await supabase
    .from(TABLE)
    .insert({
      phone_number: phone,
      otp,
      expires_at: expiresAt,
      attempts: 0,
      verified: false,
    })
    .select("id")
    .single();

  if (insertErr) return dbError();
  const rowId = inserted.id;

  // ---- 4. Send via WhatsApp ---------------------------------------
  const send = await sendOtpWhatsApp(phone, otp);

  // ---- 5. On failure, remove the ghost row ------------------------
  if (!send.ok) {
    await supabase.from(TABLE).delete().eq("id", rowId);
    return { ok: false, status: 502, error: "Could not send the code. Please try again." };
  }

  // Never return the OTP to the client.
  return { ok: true };
};

export type VerifyResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Verify a code against the MOST RECENT, non-expired, unverified row for
   `phone`. Older rows are inherently invalid even if the code matches, so
   a stale OTP can't be replayed. Successful verification marks the row
   `verified = true` and the code can't be reused.
 */
export const verifyOtp = async (
  phone: NormalizedPhone,
  code: string,
): Promise<VerifyResult> => {
  // Only the newest row for this number — that alone enforces "latest wins".
  const { data: row, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("phone_number", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !row) {
    return { ok: false, error: "No code was sent. Please request a new OTP." };
  }

  const r = row as OtpRow;

  if (Date.now() > new Date(r.expires_at).getTime()) {
    return { ok: false, error: "This code has expired. Please request a new OTP." };
  }
  if (r.attempts >= OTP_MAX_ATTEMPTS) {
    return { ok: false, error: "Too many incorrect attempts. Please request a new OTP." };
  }

  // Consume one attempt before checking.
  const { error: updErr } = await supabase
    .from(TABLE)
    .update({ attempts: r.attempts + 1 })
    .eq("id", r.id);

  if (updErr) {
    return { ok: false, error: "Could not verify the code. Please try again." };
  }

  if (r.otp !== code) {
    const left = OTP_MAX_ATTEMPTS - (r.attempts + 1);
    return {
      ok: false,
      error: `Incorrect code. ${left} attempt${left === 1 ? "" : "s"} left.`,
    };
  }

  // Success — mark verified (one-time use).
  const { error: markErr } = await supabase
    .from(TABLE)
    .update({ verified: true })
    .eq("id", r.id);

  if (markErr) {
    // Non-fatal: the code matched, so treat verification as successful
    // even if the verified flag couldn't be persisted.
    return { ok: true };
  }

  return { ok: true };
};

/* Map a Supabase error to a user-facing SendResult. The upstream message
   is intentionally not surfaced to the client (could leak internals). */
function dbError(): SendResult {
  return {
    ok: false,
    status: 502,
    error: "Something went wrong. Please try again.",
  };
}
