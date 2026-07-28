"use client";

import { nav } from "@/lib/data";
import { Calendar, Phone } from "./icons";
import { useTestDriveModal } from "./TestDriveModalProvider";

export default function MobileBottomBar() {
  const openTestDrive = useTestDriveModal();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-border bg-white shadow-[0_-2px_12px_0_rgba(0,0,0,0.06)] md:hidden">
      <a
        href={`tel:${nav.phone.replace(/\s/g, "")}`}
        aria-label="Call Us"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-text transition-colors active:bg-bg-2"
      >
        <Phone className="h-5 w-5" />
        <span className="text-[10px] font-semibold">Call Us</span>
      </a>

      <span className="my-2 w-px shrink-0 bg-border" />

      <button
        type="button"
        aria-label="Test Drive"
        onClick={() => openTestDrive({ source: "mobile_bottom_bar" })}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-text transition-colors active:bg-bg-2"
      >
        <Calendar className="h-5 w-5" />
        <span className="text-[10px] font-semibold">Test Drive</span>
      </button>
    </nav>
  );
}
