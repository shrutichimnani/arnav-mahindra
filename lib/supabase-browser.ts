/* ============================================================
   Supabase browser-safe client (singleton).

   Separate from lib/supabase.ts which uses the service-role key
   for server-only API routes (OTP). This client uses the ANON key
   which is safe to bundle and send to the browser. Used by the
   form submit handlers to insert lead data directly from the
   client after Google Sheets submission succeeds.

   Env vars (set in .env.local):
     NEXT_PUBLIC_SUPABASE_URL       — project URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY  — anon/public key (safe for browser)
   ============================================================ */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function buildBrowserClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase browser client not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return createClient(url, key);
}

declare global {
  var __supabaseBrowserClient: SupabaseClient | undefined;
}

// Built lazily, on first actual use — not at module-import time. lib/leads.ts
// guards every call site with a try/catch specifically to degrade gracefully
// when this isn't configured, but that guard only works if constructing the
// client is deferred to when it's actually called; an eager throw here would
// instead blow up at import time, before that try/catch ever runs.
export const supabaseBrowser: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client =
      globalThis.__supabaseBrowserClient ??
      (globalThis.__supabaseBrowserClient = buildBrowserClient());
    return Reflect.get(client, prop, receiver);
  },
});
