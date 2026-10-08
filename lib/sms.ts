/* ============================================================
   SMS delivery of the OTP via alotsolutions.in (bulk SMS gateway).

   Replaces the former WhatsApp delivery (lib/whatsapp.ts).

   Env vars (set in .env.local):
     SMS_API_KEY           — the gateway API key
     SMS_DLT_TEMPLATE_ID   — DLT-registered template ID for the OTP message
     SMS_MESSAGE_TEMPLATE  — DLT-approved message text, with {OTP} where the
                             code goes (must match the registered template)
   ============================================================ */

export type SmsResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Send an OTP by SMS.
 *
 * @param to  Recipient, digits only, country code + number — e.g. "918080888131".
 * @param otp The generated code, inserted into the message text.
 */
export async function sendOtpSms(to: string, otp: string): Promise<SmsResult> {
  const apiKey = process.env.SMS_API_KEY;
  const templateId = process.env.SMS_DLT_TEMPLATE_ID;
  const messageTemplate = process.env.SMS_MESSAGE_TEMPLATE;
  if (!apiKey || !templateId || !messageTemplate) {
    return {
      ok: false,
      error: "SMS is not configured. Set SMS_API_KEY, SMS_DLT_TEMPLATE_ID and SMS_MESSAGE_TEMPLATE.",
    };
  }

  const message = messageTemplate.replaceAll("{OTP}", otp);

  const url =
    `https://alotsolutions.in/api/bulkmt/SendSMS?user=MahindraA` +
    `&apikey=${encodeURIComponent(apiKey)}` +
    `&senderid=ARNVPL&channel=Trans&DCS=0&flashsms=0` +
    `&number=${encodeURIComponent(to)}` +
    `&text=${encodeURIComponent(message)}` +
    `&DLTTemplateId=${encodeURIComponent(templateId)}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      // The URL carries the API key, so never include it in the error.
      let detail = "";
      try {
        detail = await res.text();
      } catch {
        // ignore — body not readable
      }
      return {
        ok: false,
        error: `SMS request failed (${res.status})${detail ? `: ${detail}` : ""}`,
      };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error contacting SMS gateway.",
    };
  }
}
