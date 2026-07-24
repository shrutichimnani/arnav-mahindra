"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import TestDriveModal from "./TestDriveModal";

type OpenFn = (opts?: { carSlug?: string; source?: string }) => void;

const TestDriveModalContext = createContext<OpenFn | null>(null);

export function useTestDriveModal() {
  const ctx = useContext(TestDriveModalContext);
  if (!ctx) {
    throw new Error("useTestDriveModal must be used inside <TestDriveModalProvider>");
  }
  return ctx;
}

export default function TestDriveModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [carSlug, setCarSlug] = useState<string | undefined>(undefined);
  const [modalSource, setModalSource] = useState<string | undefined>(undefined);
  const scrollY = useRef(0);

  const openTestDrive = useCallback<OpenFn>((opts) => {
    scrollY.current = window.scrollY;
    setCarSlug(opts?.carSlug);
    setModalSource(opts?.source);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => { setCarSlug(undefined); setModalSource(undefined); }, 200);
    window.scrollTo(0, scrollY.current);
  }, []);

  // Lock body scroll while the modal is mounted.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const value = useMemo(() => openTestDrive, [openTestDrive]);

  return (
    <TestDriveModalContext.Provider value={value}>
      {children}
      {open && <TestDriveModal carSlug={carSlug} source={modalSource} onClose={close} />}
    </TestDriveModalContext.Provider>
  );
}

/* A trigger usable from anywhere — client OR server components.
   Server components can't use hooks, so this component is a client
   island that reads the context and renders a button styled by the
   `className` prop. The `carSlug` is forwarded when given (car
   detail page CTAs use this to pre-select the model in the modal). */
export function TestDriveTrigger({
  carSlug,
  source,
  className,
  children,
  variant = "button",
}: {
  carSlug?: string;
  source?: string;
  className?: string;
  children: ReactNode;
  variant?: "button" | "link";
}) {
  return (
    <OpenHandler
      carSlug={carSlug}
      source={source}
      className={className}
      variant={variant}
      children={children}
    />
  );
}

/* Split out so the hook call stays inside a client component even
   though <TestDriveTrigger> is imported into server components. */
function OpenHandler({
  carSlug,
  source,
  className,
  children,
  variant,
}: {
  carSlug?: string;
  source?: string;
  className?: string;
  children: ReactNode;
  variant: "button" | "link";
}) {
  const openTestDrive = useTestDriveModal();
  // For the "link" variant, reset the native button chrome so it renders
  // like an inline link/text element (used in footers, blog banners, etc.).
  // For the "button" variant, the caller's className fully controls styling.
  const reset = variant === "link"
    ? "appearance-none bg-transparent p-0 text-left font-inherit border-0 cursor-pointer"
    : "appearance-none border-0 cursor-pointer";
  return (
    <button
      type="button"
      onClick={() => openTestDrive({ carSlug, source })}
      className={`${reset} ${className ?? ""}`}
      data-variant={variant}
    >
      {children}
    </button>
  );
}
