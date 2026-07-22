"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, ChevronLeft, Clock } from "./icons";
import { usePhoneVerification } from "./PhoneVerificationProvider";

/* ---- Gate API -----------------------------------------------------------
   Wrap any lead form in <OtpGate>. Until the visitor verifies their
   phone number, only the phone -> OTP cards render. Once verified,
   the wrapped form renders and receives the verified phone via the
   render-prop children({phone, onResetPhone}).

   Verification is session-wide: a number verified on any form (or in
   the test-drive modal) is remembered for the browser session, so
   opening another form — or reopening the same one later — skips the
   OTP step entirely. "Change number" clears it and re-verifies.
   ----------------------------------------------------------------------- */
export default function OtpGate({
  children,
}: {
  children: (props: { phone: string; onResetPhone: () => void }) => ReactNode;
}) {
  const { verifiedPhone, setVerifiedPhone, clearVerifiedPhone } = usePhoneVerification();

  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  // Resend countdown ticker.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const sendOtp = async (target?: string) => {
    const number = target ?? phone;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: number }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Could not send code. Try again.");
        return false;
      }
      setResendIn(30);
      return true;
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const onPhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    const ok = await sendOtp(phone);
    if (ok) {
      setStage("otp");
      setCode("");
      setError("");
    }
  };

  const onOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(code)) {
      setError("Enter the 4-digit code.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Verification failed.");
        return;
      }
      // Persist the verified number for the whole session so every
      // other form (and re-opening this one) skips the OTP step.
      setVerifiedPhone(phone);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // Pass-through: a session-verified number skips the OTP UI entirely.
  // "Change" clears the session verification and restarts the flow.
  if (verifiedPhone) {
    return (
      <>{children({ phone: verifiedPhone, onResetPhone: clearVerifiedPhone })}</>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(0,0,0,0.08)] sm:p-8">
      {stage === "phone" && (
        <form onSubmit={onPhoneSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
            <div className="flex">
              <span className="inline-flex shrink-0 items-center rounded-l border border-r-0 border-border bg-bg-2 px-3 text-sm font-semibold text-text">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoFocus
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                placeholder="10-digit mobile number"
                className={`w-full rounded-r border px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:ring-2 focus:ring-brand/10 ${
                  error ? "border-red-400 focus:border-red-400" : "border-border focus:border-brand"
                }`}
              />
            </div>
          </label>

          {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={busy || phone.length !== 10}
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
          >
            {busy ? "Sending..." : "Send OTP"}
            {!busy && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-faint">
            By continuing you agree to be contacted by Mahindra Modi about your request.
          </p>
        </form>
      )}

      {stage === "otp" && (
        <form onSubmit={onOtpSubmit}>
          <button
            type="button"
            onClick={() => {
              setStage("phone");
              setError("");
              setCode("");
            }}
            className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-brand"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Change number
          </button>
          <h3 className="font-display text-lg font-bold text-text">Enter the code</h3>
          <p className="mt-1.5 text-sm text-muted">
            Sent to <span className="font-semibold text-text">+91 {phone}</span>
          </p>

          <OtpInput value={code} onChange={(v) => { setCode(v); setError(""); }} />

          {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}

          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {resendIn > 0 ? (
              <span>Resend code in {resendIn}s</span>
            ) : (
              <button
                type="button"
                onClick={() => sendOtp(phone)}
                disabled={busy}
                className="font-semibold text-brand transition-colors hover:text-brand-light disabled:opacity-50"
              >
                Resend code
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={busy || code.length !== 4}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
          >
            {busy ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>
      )}
    </div>
  );
}

/* Four-box OTP input. One underlying value string, visually split. */
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(4, " ").slice(0, 4).split("");

  const setAt = (i: number, d: string) => {
    const clean = d.replace(/\D/g, "");
    const arr = value.padEnd(4, " ").slice(0, 4).split("");
    arr[i] = clean ? clean[clean.length - 1] : " ";
    const joined = arr.join("").replace(/\s/g, "");
    onChange(joined.slice(0, 4));
    if (clean && i < 3) refs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i].trim() && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (text) {
      e.preventDefault();
      onChange(text);
      refs.current[Math.min(text.length, 3)]?.focus();
    }
  };

  return (
    <div className="mt-5 flex justify-between gap-2" onPaste={onPaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          autoFocus={i === 0}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => onKey(i, e)}
          onFocus={(e) => e.target.select()}
          className="h-12 w-full rounded border border-border text-center text-lg font-bold text-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      ))}
    </div>
  );
}

/* Small presentational helper for forms that want to show the locked
   verified number with a "Change" affordance. Kept here so every form
   renders the verified state identically. */
export function VerifiedPhoneField({ phone, onChange }: { phone: string; onChange: () => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
      <div className="flex items-center justify-between rounded border border-green-300 bg-green-50 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-text">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="h-3.5 w-3.5" />
          </span>
          +91 {phone}
        </span>
        <button
          type="button"
          onClick={onChange}
          className="text-xs font-semibold text-brand transition-colors hover:text-brand-light"
        >
          Change
        </button>
      </div>
    </label>
  );
}
