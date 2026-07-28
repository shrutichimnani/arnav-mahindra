/* ============================================================
   Supabase server-only client (singleton).

   Used by the OTP API routes to read/write the phone_otps table.
   Uses the SERVICE ROLE key so the Next.js server can bypass Row
   Level Security — these calls only ever run server-side (inside
   app/api routes), never in the browser, so the service key never
   reaches the client bundle.

   Env vars (set in .env.local):
     SUPABASE_URL              — project URL, e.g. https://xxx.supabase.co
     SUPABASE_SERVICE_ROLE_KEY — service-role secret (full access)
   ============================================================ */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Guard: fail fast with a clear message if the env isn't configured,
// rather than producing cryptic errors deep inside a request.
function buildClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Persist the client across Next.js dev hot-reloads so we don't open a
// new pool on every file change. Mirrors the globalThis-guard pattern.
declare global {
  var __supabaseClient: SupabaseClient | undefined;
}

export const supabase: SupabaseClient =
  globalThis.__supabaseClient ?? (globalThis.__supabaseClient = buildClient());
