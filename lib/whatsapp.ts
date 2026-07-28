/* ============================================================
   WhatsApp Business API — OTP delivery via the "registration"
   template message.

   Sends a one-time verification code through WhatsApp (not SMS) using
   the approved template. The same OTP value is passed to both the
   message body parameter and the CTA button parameter.

   Env vars (set in .env.local):
     WHATSAPP_ENDPOINT_URL — the API endpoint to POST to
     WHATSAPP_API_KEY      — sent as the X-API-KEY header
   ============================================================ */

export type WhatsAppResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Send an OTP via the WhatsApp "registration" template.
 *
 * @param to  Recipient in international format: country code + number,
 *            digits only, no "+", no spaces — e.g. "918080888131".
 * @param otp The 4-digit code. Used in both the body and the button.
 */
export async function sendOtpWhatsApp(to: string, otp: string): Promise<WhatsAppResult> {
  const endpoint = process.env.WHATSAPP_ENDPOINT_URL;
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!endpoint || !apiKey) {
    return {
      ok: false,
      error: "WhatsApp is not configured. Set WHATSAPP_ENDPOINT_URL and WHATSAPP_API_KEY.",
    };
  }

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "template",
    template: {
      name: "registration",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: otp }],
        },
        {
          type: "button",
          parameters: [{ type: "text", text: otp }],
          sub_type: "url",
          index: "0",
        },
      ],
    },
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // Surface the upstream detail when available so failures are
      // debuggable, without leaking it to the end user (the caller is
      // responsible for the user-facing message).
      let detail = "";
      try {
        detail = await res.text();
      } catch {
        // ignore — body not readable
      }
      return {
        ok: false,
        error: `WhatsApp request failed (${res.status})${detail ? `: ${detail}` : ""}`,
      };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error contacting WhatsApp.",
    };
  }
}
