import { getUtmPayloadFields } from "@/lib/utm";

const SHEET_SCRIPT_URL = process.env.NEXT_PUBLIC_SHEET_SCRIPT_URL ?? "";

export async function submitToSheet(payload: Record<string, string>) {
  // Attach the visitor's captured UTM params to every form submission
  // (phoneVerification, contactUs, service, testDrive). They are read
  // fresh from localStorage here, so any values captured before this
  // call — even from an earlier page visit — are included. Existing
  // payload keys are preserved; UTM fields are only added when absent
  // so a caller passing its own UTM value still wins.
  const utm = getUtmPayloadFields();
  const fullPayload: Record<string, string> = { ...utm, ...payload };
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
