import { getUtmPayloadFields } from "@/lib/utm";
import { insertLeadToDb } from "@/lib/leads";

const SHEET_SCRIPT_URL = process.env.NEXT_PUBLIC_SHEET_SCRIPT_URL ?? "";

export async function submitToSheet(payload: Record<string, string>) {
  const utm = getUtmPayloadFields();
  const fullPayload: Record<string, string> = { ...utm, ...payload };

  // Fire the Supabase insert in parallel with Google Sheets — both
  // destinations get the same data. The Supabase call is fire-and-forget;
  // its success or failure never affects the user-facing result.
  const formType = payload.formType ?? "";
  insertLeadToDb(formType, fullPayload);

  try {
    const res = await fetch(SHEET_SCRIPT_URL, {
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
