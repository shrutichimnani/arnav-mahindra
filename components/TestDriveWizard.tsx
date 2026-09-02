"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cars, cityOptions, company, locations, type Car } from "@/lib/data";
import { Calendar, Check, ChevronDown, ChevronRight, X } from "./icons";
import Reveal from "./Reveal";
import { VerifiedPhoneField } from "./OtpGate";
import { submitToSheet } from "@/lib/sheets";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

const steps = ["Select Car", "When & Where", "Your Details"];

export default function TestDriveWizard({
  initialCarSlug,
  verifiedPhone,
  onResetPhone,
  inModal,
  onClose,
}: {
  initialCarSlug?: string;
  /* When the wizard opens behind an OTP gate, the verified phone is
     passed in and the mobile field is locked to it; to change it the
     user must re-verify (handled by the parent via onResetPhone). */
  verifiedPhone?: string;
  onResetPhone?: () => void;
  inModal?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  // Arriving with a pre-selected car (from an individual car page's "Book a
  // Test Drive" button) gets the Car Selected / More Options layout; the
  // generic entry points (navbar, floating action, etc.) keep the plain grid.
  const fromCarPage = Boolean(initialCarSlug);

  const [step, setStep] = useState(initialCarSlug ? 2 : 1);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [carSlug, setCarSlug] = useState(initialCarSlug ?? "");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(verifiedPhone ?? "");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  // Today's date is blocked: the earliest selectable date is tomorrow, so a
  // test drive can never be booked for the same day.
  const today = new Date().toISOString().slice(0, 10);
  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const orderedCars = useMemo(() => {
    if (!carSlug) return cars;
    const idx = cars.findIndex((c) => c.slug === carSlug);
    if (idx <= 0) return cars;
    return [cars[idx], ...cars.slice(0, idx), ...cars.slice(idx + 1)];
  }, [carSlug]);
  const selectedCar = cars.find((c) => c.slug === carSlug);
  const otherCars = useMemo(() => cars.filter((c) => c.slug !== carSlug), [carSlug]);
  const showroomsInCity = locations.filter(
    (l) => l.type === "Showroom" && city === l.name,
  );

  const availableTimeSlots = useMemo(() => {
    if (!date || date !== today) return timeSlots;
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    return timeSlots.filter((s) => s.end > currentHour);
  }, [date, today]);

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  // When arriving via the OTP gate, `mobile` is seeded from `verifiedPhone`,
  // which is stored with its country-code prefix (e.g. "+919876543210") —
  // that never matches a plain 10-digit check, so validate against the raw
  // input only when there's no OTP-verified phone to trust instead.
  const isValidMobile = verifiedPhone ? true : /^[0-9]{10}$/.test(mobile);
  const isValidPincode = /^[0-9]{6}$/.test(pincode);

  const canProceed = () => {
    if (step === 1) return Boolean(carSlug);
    if (step === 2) return Boolean(city && date && time);
    if (step === 3)
      return Boolean(name.trim() && isValidMobile && isValidEmail && isValidPincode);
    return true;
  };

  // Step-level guidance for car/location/date/time selection (steps 1-2).
  // These use buttons (type="button"), not form submit, so native validation
  // can't cover them — the message is the only feedback.
  const stepMessage =
    attempted && step === 1 && !carSlug
      ? "Please select a car to continue."
      : attempted && step === 2 && !city
        ? "Please select a location to continue."
        : attempted && step === 2 && city && !date
          ? "Please choose a preferred date."
          : attempted && step === 2 && city && date && !time
            ? "Please choose a preferred time slot."
            : "";


  const goNext = () => {
    if (canProceed()) {
      setAttempted(false);
      setStep((s) => Math.min(3, s + 1));
    } else {
      setAttempted(true);
    }
  };
  const goBack = () => {
    if (step === 1) {
      if (fromCarPage) router.push(`/cars/${initialCarSlug}`);
      return;
    }
    setAttempted(false);
    setStep((s) => s - 1);
  };

  const carCard = (car: Car, selected: boolean) => (
    <button
      type="button"
      key={car.slug}
      onClick={() => {
        setCarSlug(car.slug);
        setStep(2);
        setAttempted(false);
      }}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
        selected ? "border-brand bg-brand/5" : "border-border hover:border-muted"
      }`}
    >
      <Image
        src={car.image}
        alt={car.alt}
        title={`Mahindra ${car.name}`}
        width={140}
        height={60}
        className="h-10 w-full object-contain"
      />
      <span className="text-xs font-semibold text-text">{car.name}</span>
    </button>
  );

  const navButtons = (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={goBack}
        disabled={step === 1 && !fromCarPage}
        className="rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>
      {step < 3 ? (
        <button
          type="button"
          onClick={goNext}
          className={`group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light ${
            !canProceed() ? "opacity-50" : ""
          }`}
        >
          Next Step
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!canProceed() || sending}
          className="rounded bg-brand px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:opacity-50"
        >
          {sending ? "Booking..." : "Confirm Booking"}
        </button>
      )}
    </div>
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canProceed()) {
      setAttempted(true);
      return;
    }
    setSending(true);
    setSendError("");
    submitToSheet({
      formType: "testDrive",
      carmodel: selectedCar ? selectedCar.name : "",
      location: city,
      preferreddate: date,
      preferredtime: time,
      name,
      phone: mobile,
      email,
      pincode,
    }).then((r) => {
      setSending(false);
      if (r.ok) setSubmitted(true);
      else setSendError(r.error);
    });
  };

  const dismissConfirmation = () => {
    setSubmitted(false);
    if (inModal) onClose?.();
  };

  useEffect(() => {
    if (!submitted || inModal) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [submitted, inModal]);

  return (
    <>
      <div className={inModal ? undefined : "mx-auto max-w-3xl rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(0,0,0,0.08)] sm:p-10"}>
        {/* Step indicator */}
        <div className="flex items-start justify-between">
          {steps.map((label, i) => {
            const n = i + 1;
            const state = n === step ? "active" : n < step ? "done" : "todo";
            return (
              <div key={label} className="flex flex-1 items-start last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                      state === "done"
                        ? "bg-brand text-white"
                        : state === "active"
                          ? "bg-brand text-white ring-4 ring-brand/15"
                          : "bg-bg-2 text-faint"
                    }`}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : n}
                  </span>
                  <span
                    className={`hidden text-center text-[10px] font-medium sm:block ${
                      state === "todo" ? "text-faint" : "text-text"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {n < steps.length && (
                  <span
                    className={`mx-1.5 mt-[15px] h-0.5 flex-1 rounded transition-colors ${
                      state === "done" ? "bg-brand" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="mt-8">
          {step === 1 && (
            <Reveal variant="fade-in">
              <h3 className="text-center font-display text-lg font-bold text-text">Select Your Car</h3>

              {fromCarPage ? (
                <>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                    Car Selected
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {selectedCar && carCard(selectedCar, true)}
                  </div>
                  {stepMessage && (
                    <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
                  )}

                  <div className="mt-6">{navButtons}</div>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">
                    More Options
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {otherCars.map((car) => carCard(car, false))}
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {orderedCars.map((car) => carCard(car, carSlug === car.slug))}
                  </div>
                  {stepMessage && (
                    <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
                  )}
                </>
              )}
            </Reveal>
          )}

          {step === 2 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">When &amp; Where</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Location</span>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`${fieldBase} appearance-none pr-10`}
                    >
                      <option value="" disabled>
                        Select your location
                      </option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTime("");
                      }}
                      suppressHydrationWarning
                      className={`${fieldBase} pr-10 ${date ? "" : "text-transparent"}`}
                    />
                    <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Time</span>
                  <div className="relative">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={!date}
                      className={`${fieldBase} appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <option value="" disabled>
                        {date && availableTimeSlots.length === 0
                          ? "No slots left today"
                          : "Select time"}
                      </option>
                      {availableTimeSlots.map((s) => (
                        <option key={s.label} value={s.label}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
              </div>
              {city && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted">
                    Selected showroom
                  </p>
                  {showroomsInCity.length === 0 && (
                    <p className="text-sm text-faint">
                      No showroom is listed for this selection yet - our nearest team will reach out.
                    </p>
                  )}
                  {showroomsInCity.map((s) => (
                    <div
                      key={s.name}
                      className="rounded border border-border bg-bg-2 px-4 py-3 text-sm text-text"
                    >
                      {s.name} - <span className="text-muted">{s.address}</span>
                    </div>
                  ))}
                </div>
              )}
              {stepMessage && (
                <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
              )}
            </Reveal>
          )}

          {step === 3 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">Your Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={fieldBase}
                  />
                </label>
                {verifiedPhone ? (
                    <VerifiedPhoneField phone={verifiedPhone} onChange={onResetPhone ?? (() => {})} />
                  ) : (
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile number"
                        className={fieldBase}
                      />
                    </label>
                  )}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={fieldBase}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit pincode"
                    className={fieldBase}
                  />
                </label>
              </div>
            </Reveal>
          )}

          {sendError && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">{sendError}</p>
          )}
          {/* Nav buttons — already shown inline above for the Car Selected /
              More Options step-1 layout, so skip the duplicate here. */}
          {!(step === 1 && fromCarPage) && <div className="mt-8">{navButtons}</div>}
        </form>
      </div>

      {/* Confirmation popup */}
      {submitted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={dismissConfirmation}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-lg bg-white p-8 text-center shadow-2xl sm:p-10"
          >
            <button
              aria-label="Close"
              onClick={dismissConfirmation}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-bg-2"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
              <Check className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-text">
              Thank you for your interest!
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                We thank you for showing an interest in test driving of Mahindra{" "}
                <span className="font-semibold text-text">{selectedCar?.name}</span>.
              </p>
              <p>
                We assure you our representative will contact you shortly.
              </p>
              <p className="text-xs text-faint">
                Note: This is not the Test Drive confirmation, we shall check the schedule
                and confirm the vehicle availability.
              </p>
              <p>We appreciate your time and patience.</p>
              <p>
                For any further details you may contact us on{" "}
                <a
                  href={`https://wa.me/${company.whatsappE164.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:underline"
                >
                  {company.whatsapp}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
