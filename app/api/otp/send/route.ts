import { NextResponse } from "next/server";
import { issueOtp, normalizePhone } from "@/lib/otp";

export async function POST(req: Request) {
  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const phone = normalizePhone(body.phone ?? "");
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid 10-digit mobile number." },
      { status: 400 },
    );
  }

  const result = await issueOtp(phone);
  if (!result.ok) {
    // 429 = rate limited; 502 = SMS upstream failure; 400 otherwise.
    return NextResponse.json(result, { status: result.status ?? 400 });
  }
  return NextResponse.json(result);
}
