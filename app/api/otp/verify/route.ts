import { NextResponse } from "next/server";
import { normalizePhone, verifyOtp } from "@/lib/otp";

export async function POST(req: Request) {
  let body: { phone?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const phone = normalizePhone(body.phone ?? "");
  const code = (body.code ?? "").trim();
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid 10-digit mobile number." },
      { status: 400 },
    );
  }
  if (!/^\d{4}$/.test(code)) {
    return NextResponse.json(
      { ok: false, error: "Enter the 4-digit code." },
      { status: 400 },
    );
  }

  const result = verifyOtp(phone, code);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true, phone });
}
