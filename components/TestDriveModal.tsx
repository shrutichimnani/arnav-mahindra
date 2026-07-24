"use client";

import { useEffect } from "react";
import { X } from "./icons";
import OtpGate, { VerifiedPhoneField } from "./OtpGate";
import TestDriveWizard from "./TestDriveWizard";

/* The global "Book a Test Drive" modal. Renders the phone -> OTP
   gate; on verify, shows the existing multi-step wizard with the
   verified phone locked in. */
export default function TestDriveModal({
  carSlug,
  source,
  onClose,
}: {
  carSlug?: string;
  source?: string;
  onClose: () => void;
}) {
  // Escape to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a test drive"
        onClick={(e) => e.stopPropagation()}
        className="relative my-4 w-full max-w-3xl rounded-lg bg-white shadow-2xl sm:my-8"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-bg-2"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-6 sm:p-8">
          <OtpGate
            source={source ?? "test_drive_popup"}
            heroImage={{ src: "/about/showroom-dusk.jpg", alt: "Mahindra Modi showroom at dusk" }}
          >
            {({ phone, onResetPhone }) => (
              <div>
                <div className="mb-6 rounded-lg border border-brand/20 bg-brand/5 p-4">
                  <VerifiedPhoneField phone={phone} onChange={onResetPhone} />
                </div>
                <TestDriveWizard
                  initialCarSlug={carSlug}
                  verifiedPhone={phone}
                  onResetPhone={onResetPhone}
                  onClose={onClose}
                  inModal
                />
              </div>
            )}
          </OtpGate>
        </div>
      </div>
    </div>
  );
}
