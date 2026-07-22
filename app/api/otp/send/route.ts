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
    return NextResponse.json(result, { status: 429 });
  }
  // devCode is only present in simulated mode (no SMS provider key set),
  // and is used by the UI to display the code for testing.
  return NextResponse.json(result);
}
