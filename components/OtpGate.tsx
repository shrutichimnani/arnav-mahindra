"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, ChevronLeft, Clock, Phone } from "./icons";
import { countryCodes, type CountryCode } from "@/lib/countryCodes";
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
  source,
  heroImage,
  onPolicyNavigate,
  frameless,
}: {
  children: (props: { phone: string; onResetPhone: () => void }) => ReactNode;
  source?: string;
  // Optional image shown alongside the phone/OTP card, for call sites
  // (e.g. the test-drive modal) that want it. Omitted everywhere else so
  // narrower embeds (contact form, sidebar cards) are unaffected.
  heroImage?: { src: string; alt: string };
  // Called before a same-tab navigation to the Terms / Privacy pages. Only
  // the modal passes this (to close itself first) — without it the modal
  // would stay mounted on top of the destination page. Inline forms leave
  // it unset; they unmount on navigation, so no close is needed.
  onPolicyNavigate?: () => void;
  // Set by call sites that already render their own border/shadow frame
  // directly around this component (e.g. the test-drive modal dialog, or a
  // bordered card that wraps nothing else). Without this, those sites end
  // up with two concentric borders/shadows — this component's own plus the
  // wrapper's — which reads as a stray outline around the whole popup.
  frameless?: boolean;
}) {
  const { verifiedPhone, setVerifiedPhone, clearVerifiedPhone } = usePhoneVerification();

  // Persist the in-progress phone-verification form across a same-tab detour
  // to the Terms / Privacy pages (which now open in this tab). Without this,
  // navigating away unmounts the form and back returns to an empty phone
  // step. sessionStorage mirrors the verified-phone pattern (per tab, gone
  // on close) — the form is restored exactly as the visitor left it.
  //
  // IMPORTANT: sessionStorage is NOT read during render — doing so causes a
  // hydration mismatch (server always sees null, client may have a stored
  // value). Instead, the persisted state is read in a useEffect after mount.
  const FORM_STATE_KEY = "mm_otp_form";
  type PersistedForm = Pick<
    { stage: "phone" | "otp"; countryIso: string; phone: string; agreed: boolean },
    "stage" | "countryIso" | "phone" | "agreed"
  >;

  const hydratedRef = useRef(false);
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [countryIso, setCountryIso] = useState("IN");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  // Cancel in-flight requests when this form goes away. Their response
  // handlers would otherwise keep the unmounted form alive until completion.
  useEffect(() => {
    return () => activeRequest.current?.abort();
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(FORM_STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedForm;
        if (parsed.stage) setStage(parsed.stage);
        if (parsed.countryIso) setCountryIso(parsed.countryIso);
        if (parsed.phone) setPhone(parsed.phone);
        if (typeof parsed.agreed === "boolean") setAgreed(parsed.agreed);
      }
    } catch { /* ignore */ }
    hydratedRef.current = true;
  }, []);

  // Write the restorable fields to sessionStorage whenever they change, so a
  // same-tab navigation away (and back) restores the form intact. Guarded by
  // a ref — on mount the read effect restores persisted values first and
  // flips the ref; until then, writing would blindly overwrite any saved
  // progress with fresh defaults.
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      sessionStorage.setItem(
        FORM_STATE_KEY,
        JSON.stringify({ stage, countryIso, phone, agreed } satisfies PersistedForm),
      );
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — ignore.
    }
  }, [stage, countryIso, phone, agreed]);

  const activeCountry = countryCodes.find((c) => c.iso === countryIso) ?? countryCodes[0];
  const countryCode = activeCountry.code;

  // Resend countdown ticker.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // When the verified phone is cleared (user clicks "Change"), reset to
  // the phone-input stage instead of showing the OTP form.
  useEffect(() => {
    if (!verifiedPhone) {
      setStage("phone");
      setCountryIso("IN");
      setPhone("");
      setCode("");
      setError("");
      setAgreed(false);
    }
  }, [verifiedPhone]);

  const sendOtp = async (target?: string) => {
    const number = target ?? phone;
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: countryCode + number }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (controller.signal.aborted) return false;
      if (!data.ok) {
        setError(data.error ?? "Could not send code. Try again.");
        return false;
      }
      setResendIn(30);
      return true;
    } catch {
      if (controller.signal.aborted) return false;
      setError("Network error. Please try again.");
      return false;
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        if (!controller.signal.aborted) setBusy(false);
      }
    }
  };

  const onPhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }
    if (!/^\d+$/.test(phone) || phone.length < activeCountry.min || phone.length > activeCountry.max) {
      setError(
        activeCountry.min === activeCountry.max
          ? `Enter a valid ${activeCountry.max}-digit mobile number.`
          : `Enter a valid ${activeCountry.min}-${activeCountry.max} digit mobile number.`,
      );
      return;
    }
    const ok = await sendOtp(phone);
    if (ok) {
      setStage("otp");
      setCode("");
      setError("");
    }
  };

  const verifyOtp = async (otpCode: string) => {
    if (!/^\d{4}$/.test(otpCode)) {
      setError("Enter the 4-digit code.");
      return;
    }
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: countryCode + phone, code: otpCode }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (controller.signal.aborted) return;
      if (!data.ok) {
        setError(data.error ?? "Verification failed.");
        return;
      }
      // Persist the verified number for the whole session so every
      // other form (and re-opening this one) skips the OTP step.
      setVerifiedPhone(countryCode + phone, source);
    } catch {
      if (controller.signal.aborted) return;
      setError("Network error. Please try again.");
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        if (!controller.signal.aborted) setBusy(false);
      }
    }
  };

  const onOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    verifyOtp(code);
  };

  // Pass-through: a session-verified number skips the OTP UI entirely.
  // "Change" clears the session verification and restarts the flow.
  if (verifiedPhone) {
    return (
      <>{children({ phone: verifiedPhone, onResetPhone: clearVerifiedPhone })}</>
    );
  }

  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-lg bg-white ${
        frameless ? "" : "border border-border shadow-[0_4px_32px_0_rgba(0,0,0,0.08)]"
      } ${heroImage ? "max-w-2xl sm:grid sm:grid-cols-[0.85fr_1.15fr]" : "max-w-md"}`}
    >
      {heroImage && (
        <div className="relative hidden min-h-[280px] sm:block">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            title={heroImage.alt}
            className="absolute inset-0 h-full w-full object-cover object-[30%_42%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
      )}
      <div className="p-6 sm:p-8">
      {stage === "phone" && (
        <form onSubmit={onPhoneSubmit}>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-center font-display text-xl font-bold text-text">
            Verify Your Phone
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs text-center text-sm text-muted">
            Enter your phone number to get started.
          </p>

          <label className="mt-6 block">
            <div
              className={`flex items-center rounded-full border bg-bg-2 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/10 ${
                error ? "border-red-400 focus-within:border-red-400" : "border-border focus-within:border-brand"
              }`}
            >
              <CountryPicker
                value={activeCountry}
                onChange={(c) => {
                  setCountryIso(c.iso);
                  setPhone("");
                  setError("");
                }}
              />
              <span className="shrink-0 pr-2 text-sm font-semibold text-text">{activeCountry.code}</span>
              <span className="h-6 w-px shrink-0 bg-border" />
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, activeCountry.max));
                  setError("");
                }}
                placeholder={
                  activeCountry.min === activeCountry.max
                    ? `${activeCountry.max}-digit mobile number`
                    : `${activeCountry.min}-${activeCountry.max} digit mobile number`
                }
                className="w-full border-0 bg-transparent py-3.5 pl-3 pr-5 text-sm text-text outline-none placeholder:text-faint"
              />
            </div>
          </label>

          {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}

          <label className="mt-4 flex items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand"
            />
            <span className="text-[11px] leading-relaxed text-faint">
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                onClick={() => onPolicyNavigate?.()}
                className="font-medium text-brand underline hover:text-brand-light"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                onClick={() => onPolicyNavigate?.()}
                className="font-medium text-brand underline hover:text-brand-light"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={busy || phone.length < activeCountry.min || phone.length > activeCountry.max}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all ${
              agreed
                ? "bg-brand hover:bg-brand-light"
                : "bg-brand-light/50"
            } disabled:opacity-50`}
          >
            {busy ? "Sending..." : "Send OTP"}
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
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-center font-display text-xl font-bold text-text">Enter the Code</h3>
          <p className="mx-auto mt-1.5 max-w-xs text-center text-sm text-muted">
            Sent to <span className="font-semibold text-text">{countryCode} {phone}</span>
          </p>

          <OtpInput value={code} onChange={(v) => { setCode(v); setError(""); }} onComplete={verifyOtp} />

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
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
          >
            {busy ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>
      )}
      </div>
    </div>
  );
}

/* Flag emoji don't render as pictures on Windows (Chrome/Edge show the
   bare two-letter code instead, e.g. "IN") because Windows' system font
   has no color flag glyphs. A real flag image is the only way to show an
   actual flag reliably across every OS. */
function FlagImg({ iso, name }: { iso: string; name: string }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${iso.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/48x36/${iso.toLowerCase()}.png 2x`}
      alt={`${name} flag`}
      title={`${name}`}
      width={20}
      height={15}
      className="inline-block shrink-0 rounded-[2px] object-cover"
    />
  );
}

/* Compact flag + chevron trigger that opens a searchable-by-scroll list of
   every country. A native <select> can't show just the flag in its closed
   state (the browser always renders the full selected option text), so this
   is a small custom dropdown instead, to match the flag-only trigger design. */
function CountryPicker({ value, onChange }: { value: CountryCode; onChange: (c: CountryCode) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    // Focus the search box as soon as the panel mounts, so typing works
    // immediately without an extra click.
    searchRef.current?.focus();
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const q = query.trim().toLowerCase().replace(/^\+/, "");
  const filtered = q
    ? countryCodes.filter((c) => c.name.toLowerCase().includes(q) || c.code.replace("+", "").startsWith(q))
    : countryCodes;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Country code: ${value.name} ${value.code}`}
        aria-expanded={open}
        className="flex items-center gap-1 py-3 pl-3 pr-2 text-base"
      >
        <FlagImg iso={value.iso} name={value.name} />
        <ChevronDown className="h-3 w-3 text-faint" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-64 overflow-hidden rounded border border-border bg-white shadow-[0_8px_30px_0_rgba(0,0,0,0.12)]">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country or code"
            className="w-full border-b border-border px-3 py-2 text-sm text-text outline-none placeholder:text-faint"
          />
          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-sm text-muted">No match found.</p>
            )}
            {filtered.map((c) => (
              <button
                key={c.iso}
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-bg-2 ${
                  c.iso === value.iso ? "bg-bg-2 font-semibold text-brand" : "text-text"
                }`}
              >
                <FlagImg iso={c.iso} name={c.name} />
                <span className="w-12 shrink-0 text-muted">{c.code}</span>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* Four-box OTP input. One underlying value string, visually split. */
function OtpInput({ value, onChange, onComplete }: { value: string; onChange: (v: string) => void; onComplete?: (code: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(4, " ").slice(0, 4).split("");

  const setAt = (i: number, d: string) => {
    const clean = d.replace(/\D/g, "");
    const arr = value.padEnd(4, " ").slice(0, 4).split("");
    arr[i] = clean ? clean[clean.length - 1] : " ";
    const joined = arr.join("").replace(/\s/g, "");
    onChange(joined.slice(0, 4));
    if (clean && i < 3) refs.current[i + 1]?.focus();
    if (joined.length === 4) onComplete?.(joined);
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
      if (text.length === 4) onComplete?.(text);
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
          {phone}
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
