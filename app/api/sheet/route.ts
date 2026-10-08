import { NextResponse } from "next/server";

/* Server-side relay to the Google Apps Script web app. The script URL lives
   in the server-only SHEET_SCRIPT_URL env var, so it never ships in the
   client bundle or build output (forms POST to /api/sheet instead). */
export async function POST(req: Request) {
  const scriptUrl = process.env.SHEET_SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json(
      { result: "error", message: "Submission is not configured." },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ result: "error", message: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { result: "error", message: "Network error. Please try again later." },
      { status: 502 },
    );
  }
}
