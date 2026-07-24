"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { submitToSheet } from "@/lib/sheets";

/* ============================================================
   Persists a phone number that the visitor has OTP-verified, for
   the lifetime of the browser session. Once verified, every form
   across the site (test drive, service, contact, the modal) treats
   the number as verified and skips the OTP step until the session
   ends or the visitor explicitly changes the number (which forces
   re-verification).

   Stored in sessionStorage so a page refresh within the same tab
   keeps the verification, but closing the tab clears it (sensible
   default for a lead-capture flow — don't trust a verification
   from a previous browser session).
   ============================================================ */

const STORAGE_KEY = "mm_verified_phone";
const SOURCE_KEY = "mm_verification_source";

type PhoneVerificationContextValue = {
  verifiedPhone: string | null;
  setVerifiedPhone: (phone: string, source?: string) => void;
  clearVerifiedPhone: () => void;
};

const PhoneVerificationContext = createContext<PhoneVerificationContextValue | null>(null);

export function usePhoneVerification() {
  const ctx = useContext(PhoneVerificationContext);
  if (!ctx) {
    throw new Error("usePhoneVerification must be used inside <PhoneVerificationProvider>");
  }
  return ctx;
}

export default function PhoneVerificationProvider({ children }: { children: ReactNode }) {
  // Start null on the server and on first client render, then hydrate
  // from sessionStorage in an effect so SSR markup stays stable and
  // doesn't trigger a hydration mismatch.
  const [verifiedPhone, setVerifiedPhoneState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored && /^\+?\d{8,15}$/.test(stored)) {
        setVerifiedPhoneState(stored);
      }
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — fail
      // silently; the visitor simply re-verifies.
    }
  }, []);

  const setVerifiedPhone = useCallback((phone: string, source?: string) => {
    setVerifiedPhoneState(phone);
    try {
      sessionStorage.setItem(STORAGE_KEY, phone);
      if (source) sessionStorage.setItem(SOURCE_KEY, source);
    } catch {
      // ignore
    }
    submitToSheet({
      formType: "phoneVerification",
      phonenumber: phone,
      formsource: source ?? "",
    });
  }, []);

  const clearVerifiedPhone = useCallback(() => {
    setVerifiedPhoneState(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <PhoneVerificationContext.Provider
      value={{ verifiedPhone, setVerifiedPhone, clearVerifiedPhone }}
    >
      {children}
    </PhoneVerificationContext.Provider>
  );
}
