"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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

/* Routes the modal is hidden behind (not closed) when the visitor taps a
   policy link from inside it. Because this provider lives in the root
   layout, the modal's React state survives a same-tab detour to one of
   these pages; on back-navigation it reappears exactly as left. */
const HIDE_BEHIND_ROUTES = ["/privacy-policy", "/terms-and-conditions"];

export default function TestDriveModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [carSlug, setCarSlug] = useState<string | undefined>(undefined);
  const [modalSource, setModalSource] = useState<string | undefined>(undefined);
  const scrollY = useRef(0);
  const pathname = usePathname();

  const openTestDrive = useCallback<OpenFn>((opts) => {
    scrollY.current = window.scrollY;
    setCarSlug(opts?.carSlug);
    setModalSource(opts?.source);
    setOpen(true);
    setHidden(false);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setHidden(false);
    setTimeout(() => { setCarSlug(undefined); setModalSource(undefined); }, 200);
    window.scrollTo(0, scrollY.current);
  }, []);

  // Hide the modal (keep it mounted, state intact) when the visitor opens a
  // policy page from inside it. The route-change effect above re-shows it on
  // back-navigation, restoring the in-progress form.
  const hide = useCallback(() => {
    setHidden(true);
    window.scrollTo(0, 0);
  }, []);

  // Hide (don't close) when navigating from inside the modal to a policy
  // page, and re-show when the visitor navigates back. Kept mounted so the
  // in-progress phone/OTP state is preserved across the round trip.
  useEffect(() => {
    if (!open) return;
    const onPolicy = HIDE_BEHIND_ROUTES.includes(pathname);
    setHidden(onPolicy);
  }, [pathname, open]);

  // Lock body scroll only while the modal is actually visible.
  useEffect(() => {
    if (!(open && !hidden)) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open, hidden]);

  const value = useMemo(() => openTestDrive, [openTestDrive]);

  return (
    <TestDriveModalContext.Provider value={value}>
      {children}
      {open && (
        <div className={hidden ? "hidden" : undefined}>
          <TestDriveModal carSlug={carSlug} source={modalSource} onClose={close} onPolicyNavigate={hide} />
        </div>
      )}
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
  // For the "button" variant, the caller's className fully controls styling
  // (preflight already defaults border-width to 0, so no explicit border-0
  // is needed here — and adding one would stop callers from setting a border).
  const reset = variant === "link"
    ? "appearance-none bg-transparent p-0 text-left font-inherit border-0 cursor-pointer"
    : "appearance-none cursor-pointer";
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
