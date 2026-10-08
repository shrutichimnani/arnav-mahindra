import { getUtmPayloadFields } from "@/lib/utm";
import { insertLeadToDb } from "@/lib/leads";

// Posts go through our own relay (app/api/sheet/route.ts) so the Google
// Apps Script URL stays server-side and isn't exposed in the browser.
const SHEET_ENDPOINT = "/api/sheet";

export async function submitToSheet(payload: Record<string, string>) {
  const utm = getUtmPayloadFields();
  const fullPayload: Record<string, string> = { ...utm, ...payload };

  // Fire the Supabase insert in parallel with Google Sheets — both
  // destinations get the same data. The Supabase call is fire-and-forget;
  // its success or failure never affects the user-facing result.
  const formType = payload.formType ?? "";
  insertLeadToDb(formType, fullPayload);

  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(fullPayload),
    });
    const data = await res.json();
    if (data.result !== "success") {
      throw new Error(data.message ?? "Submission failed.");
    }
    return { ok: true as const };
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Network error. Please try again later.",
    };
  }
}
