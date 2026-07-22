"use client";

import OtpGate, { VerifiedPhoneField } from "./OtpGate";
import TestDriveWizard from "./TestDriveWizard";

/* OtpGate's children is a function (render-prop), which can't cross a
   Server Component -> Client Component boundary. This wrapper keeps that
   render-prop usage entirely within client-rendered code, so the
   (Server Component) page can just render <TestDriveBookingSection />. */
export default function TestDriveBookingSection({ initialCarSlug }: { initialCarSlug?: string }) {
  return (
    <OtpGate>
      {({ phone, onResetPhone }) => (
        <div>
          <div className="mb-6 max-w-3xl rounded-lg border border-brand/20 bg-brand/5 p-4">
            <VerifiedPhoneField phone={phone} onChange={onResetPhone} />
          </div>
          <TestDriveWizard
            initialCarSlug={initialCarSlug}
            verifiedPhone={phone}
            onResetPhone={onResetPhone}
          />
        </div>
      )}
    </OtpGate>
  );
}
