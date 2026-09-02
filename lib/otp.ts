/* ============================================================
   One-time-password (OTP) handling for the lead forms.

   Delivery: WhatsApp Business API "registration" template message.
   Storage:  in-memory (primary) + Supabase `phone_otps` table
             (async best-effort audit trail).

   KEY DESIGN: WhatsApp delivery is **independent** of Supabase.
   Rate limiting and OTP storage live in-memory so the user receives
   their code even if Supabase is down or slow. Supabase is written
   to asynchronously after the WhatsApp message succeeds — it serves
   as an audit trail and fallback for verification after a server
   restart, but never blocks delivery.

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

/* ---- In-memory stores (survive Next.js HMR via globalThis) ------------ */

/** The latest OTP issued for each phone number. Only the most recent is
    ever valid — matches the existing "latest wins" semantics. */
type MemoryOtpEntry = {
  otp: string;
  createdAt: number; // Date.now() when issued
  expiresAt: number; // Date.now() + OTP_TTL_MS
  attempts: number;
  verified: boolean;
};

/** Timestamps of every OTP issued for a phone in the current process
    lifetime. Used for in-memory rate limiting. */
type RateLimitEntry = number[]; // array of Date.now() timestamps

declare global {
  var __otpStore: Map<string, MemoryOtpEntry> | undefined;
  var __otpRateLimits: Map<string, RateLimitEntry> | undefined;
}

function getOtpStore(): Map<string, MemoryOtpEntry> {
  return (globalThis.__otpStore ??= new Map());
}

function getRateLimits(): Map<string, RateLimitEntry> {
  return (globalThis.__otpRateLimits ??= new Map());
}

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
 * Issue a fresh OTP for `phone`. Generates a new code, sends it via
   WhatsApp immediately, stores it in-memory for verification, and
   writes to Supabase asynchronously as a best-effort audit trail.

   WhatsApp delivery is completely independent of Supabase — if the DB
   is down or slow, the user still receives their code.
 */
export const issueOtp = async (phone: NormalizedPhone): Promise<SendResult> => {
  const now = Date.now();
  const rateLimits = getRateLimits();
  const otpStore = getOtpStore();

  // ---- 1. Rate limit (in-memory, no DB dependency) --------------------

  // Clean up timestamps older than 1 hour for this phone.
  const timestamps = rateLimits.get(phone) ?? [];
  const hourAgo = now - 60 * 60 * 1000;
  const recentTimestamps = timestamps.filter((t) => t > hourAgo);

  // a) Resend cooldown — most recent request too recent?
  if (recentTimestamps.length > 0) {
    const lastTs = recentTimestamps[recentTimestamps.length - 1];
    if (now - lastTs < RESEND_COOLDOWN_MS) {
      return {
        ok: false,
        status: 429,
        error: "Please wait a few seconds before requesting a new code.",
      };
    }
  }

  // b) Too many requests in the last hour?
  if (recentTimestamps.length >= HOURLY_MAX) {
    return {
      ok: false,
      status: 429,
      error: "Too many code requests. Please try again later.",
    };
  }

  // ---- 2. Generate a fresh 4-digit OTP (server-side, cryptographic) ---
  const otp = String(randomInt(1000, 10000));

  // ---- 3. Send via WhatsApp FIRST (no Supabase dependency) ------------
  const send = await sendOtpWhatsApp(phone, otp);

  if (!send.ok) {
    return { ok: false, status: 502, error: "Could not send the code. Please try again." };
  }

  // ---- 4. Record in-memory (for verification) -------------------------
  const expiresAt = now + OTP_TTL_MS;
  otpStore.set(phone, {
    otp,
    createdAt: now,
    expiresAt,
    attempts: 0,
    verified: false,
  });

  // Record the timestamp for rate limiting.
  recentTimestamps.push(now);
  rateLimits.set(phone, recentTimestamps);

  // ---- 5. Write to Supabase async (best-effort audit trail) -----------
  //      Fire-and-forget — never blocks the response to the user.
  const expiresAtISO = new Date(expiresAt).toISOString();
  Promise.resolve(
    supabase
      .from(TABLE)
      .insert({
        phone_number: phone,
        otp,
        expires_at: expiresAtISO,
        attempts: 0,
        verified: false,
      }),
  )
    .then(({ error: insertErr }) => {
      if (insertErr) {
        console.error("[OTP] Supabase insert failed (non-blocking):", insertErr.message);
      }
    })
    .catch((err: unknown) => {
      console.error("[OTP] Supabase insert threw (non-blocking):", err);
    });

  // Never return the OTP to the client.
  return { ok: true };
};

export type VerifyResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Verify a code against the latest OTP for `phone`.
   Checks in-memory first (fast, no DB dependency). Falls back to
   Supabase if the in-memory entry is missing (e.g. after a server
   restart between send and verify).
 */
export const verifyOtp = async (
  phone: NormalizedPhone,
  code: string,
): Promise<VerifyResult> => {
  const otpStore = getOtpStore();
  const entry = otpStore.get(phone);

  // ---- Try in-memory store first --------------------------------------
  if (entry && !entry.verified) {
    return verifyFromMemory(phone, code, entry, otpStore);
  }

  // ---- Fallback to Supabase (server may have restarted) ---------------
  return verifyFromSupabase(phone, code);
};

/** Verify against the in-memory OTP entry. */
function verifyFromMemory(
  phone: string,
  code: string,
  entry: MemoryOtpEntry,
  otpStore: Map<string, MemoryOtpEntry>,
): VerifyResult {
  if (Date.now() > entry.expiresAt) {
    return { ok: false, error: "This code has expired. Please request a new OTP." };
  }
  if (entry.attempts >= OTP_MAX_ATTEMPTS) {
    return { ok: false, error: "Too many incorrect attempts. Please request a new OTP." };
  }

  // Consume one attempt.
  entry.attempts += 1;

  if (entry.otp !== code) {
    const left = OTP_MAX_ATTEMPTS - entry.attempts;
    return {
      ok: false,
      error: `Incorrect code. ${left} attempt${left === 1 ? "" : "s"} left.`,
    };
  }

  // Success — mark verified (one-time use).
  entry.verified = true;
  otpStore.set(phone, entry);

  // Best-effort: update the Supabase row too (fire-and-forget).
  Promise.resolve(
    supabase
      .from(TABLE)
      .update({ verified: true, attempts: entry.attempts })
      .eq("phone_number", phone)
      .order("created_at", { ascending: false })
      .limit(1),
  )
    .then(({ error: updErr }) => {
      if (updErr) {
        console.error("[OTP] Supabase verify-update failed (non-blocking):", updErr.message);
      }
    })
    .catch((err: unknown) => {
      console.error("[OTP] Supabase verify-update threw (non-blocking):", err);
    });

  return { ok: true };
}

/** Fallback: verify against the Supabase `phone_otps` table.
    Used when the in-memory store doesn't have an entry (e.g. server
    restarted between OTP send and verify). */
async function verifyFromSupabase(
  phone: string,
  code: string,
): Promise<VerifyResult> {
  // Only the newest row for this number — "latest wins".
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
}
