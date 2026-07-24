"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { nav } from "@/lib/data";
import { Phone, Menu, X } from "./icons";
import { useTestDriveModal } from "./TestDriveModalProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openTestDrive = useTestDriveModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const pathname = usePathname();
  const isCarDetail = pathname.startsWith("/cars/") && pathname !== "/cars";

  // Clicking a link whose target is the current page does nothing by default;
  // detect that and scroll back to the top instead.
  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = href.split("#")[0] || "/";
    if (target.replace(/\/$/, "") === pathname.replace(/\/$/, "")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
    }
  };

  // A link is "active" when we're on its exact page, or (for section roots
  // like /cars) on a nested route beneath it, e.g. /cars/thar-roxx.
  const isActive = (href: string) => {
    const linkPath = href.split("#")[0].replace(/\/$/, "") || "/";
    if (linkPath === "/") return pathname === "/";
    return pathname === linkPath || pathname.startsWith(`${linkPath}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_#e2e6ec,0_4px_16px_0_rgba(0,0,0,0.07)]" : "shadow-[0_1px_0_0_#e2e6ec]"
      }`}
    >
      {/* Main nav */}
      <nav className="container-px mx-auto flex h-[60px] max-w-[1400px] items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`relative whitespace-nowrap rounded px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? "text-brand"
                    : "text-muted hover:bg-bg-2 hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {!isCarDetail && (
            <button
              type="button"
              onClick={() => openTestDrive({ source: "navbar" })}
              className="hidden cursor-pointer whitespace-nowrap rounded bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-light sm:inline-block"
            >
              Book a Test Drive
            </button>
          )}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text xl:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-white p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => { onNavClick(e, l.href); setOpen(false); }}
              className={`rounded px-4 py-3 text-base font-medium transition-colors ${
                isActive(l.href)
                  ? "text-brand"
                  : "text-text hover:bg-bg-2 hover:text-brand"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {!isCarDetail && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openTestDrive({ source: "navbar" });
              }}
              className="mt-4 cursor-pointer rounded bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white"
            >
              Book a Test Drive
            </button>
          )}
          <a
            href={`tel:${nav.phone.replace(/\s/g, "")}`}
            className="mt-2 flex items-center justify-center gap-2 rounded border border-border px-5 py-3.5 text-sm font-semibold text-brand"
          >
            <Phone className="h-4 w-4" /> {nav.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
