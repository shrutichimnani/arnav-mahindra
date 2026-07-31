"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { nav } from "@/lib/data";
import { Phone, Menu, X } from "./icons";
import { useTestDriveModal } from "./TestDriveModalProvider";

/* ============================================================
   Cross-navigation indicator cache.

   <Navbar /> lives inside every page (not the root layout), so it
   REMOUNTS on each navigation — its React state can't carry the
   underline's previous position across pages, which means a freshly
   mounted Navbar would just snap the bar to the new link with no
   slide. To get the slide without moving Navbar into the layout, we
   stash the last measured position here at module scope. A newly
   mounted Navbar seeds its indicator from this cache (the previous
   page's spot), then measures the current page's active link; the
   CSS transition animates the bar from the cached spot to the new
   one. The cache dies on a full page reload, which is correct
   (there's no previous position to animate from on a cold load).
   ============================================================ */
let lastIndicator: { href: string; left: number; width: number } | null = null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openTestDrive = useTestDriveModal();

  const pathname = usePathname();
  const isCarDetail = pathname.startsWith("/cars/") && pathname !== "/cars";

  // A link is "active" when we're on its exact page, or (for section roots
  // like /cars) on a nested route beneath it, e.g. /cars/thar-roxx.
  const isActive = (href: string) => {
    const linkPath = href.split("#")[0].replace(/\/$/, "") || "/";
    if (linkPath === "/") return pathname === "/";
    return pathname === linkPath || pathname.startsWith(`${linkPath}/`);
  };

  // Resolve the active link once so the seed, the indicator effect, and the
  // link styling all share the exact same source of truth.
  const activeHref = nav.links.find((l) => isActive(l.href))?.href ?? null;

  // Sliding active indicator: one shared bar (not one per link) whose
  // left/width are measured from the active link's DOM node. Transitioning
  // those two properties is what makes it "slide" between pages.
  const desktopNavRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  // Seed from the cross-navigation cache so a freshly mounted Navbar can
  // slide the bar from the previous page's position instead of snapping.
  // (Navbar remounts on every navigation because it lives in each page, not
  // the root layout — see the lastIndicator note at the top of this file.)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
    lastIndicator && lastIndicator.href !== activeHref
      ? { left: lastIndicator.left, width: lastIndicator.width }
      : null,
  );

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

  // Measure the active link's offsetLeft/offsetWidth within the <ul> and
  // store it; the shared bar reads these to know where to sit. Re-runs on
  // route change (activeHref) and viewport resize / xl breakpoint changes
  // (link widths change with the container).
  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    const measure = (cache: boolean) => () => {
      const list = desktopNavRef.current;
      const link = activeHref ? linkRefs.current.get(activeHref) : null;
      if (!list || !link) {
        setIndicator(null);
        return;
      }
      // The desktop nav is `hidden xl:flex`; below xl the links are
      // display:none, so their offsetWidth is 0. In that case don't touch
      // state or cache (the mobile drawer handles active state there).
      if (link.offsetWidth === 0) return;
      // Inset the bar inside the label text so its ends fall short of the
      // words (12px clears the px-3 padding; an extra ~8px each side pulls
      // the bar well in from the letter edges for a tight underline).
      const inset = 20;
      const next = { left: link.offsetLeft + inset, width: Math.max(0, link.offsetWidth - inset * 2) };
      setIndicator(next);
      if (cache) {
        // Persist for the next mount to slide from (see lastIndicator above).
        lastIndicator = { href: activeHref!, ...next };
      }
    };
    // Defer to the next frame: the seeded position (from lastIndicator) must
    // paint first, THEN the measured position is applied in a later frame —
    // only that two-frame gap lets the CSS transition animate the slide.
    raf1 = requestAnimationFrame(measure(true));
    // A second frame catches any layout shift once fonts settle.
    raf2 = requestAnimationFrame(() => raf2 = requestAnimationFrame(measure(false)));
    const onResize = measure(true);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", onResize);
    };
  }, [activeHref, scrolled]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_#e2e6ec,0_4px_16px_0_rgba(0,0,0,0.07)]" : "shadow-[0_1px_0_0_#e2e6ec]"
      }`}
    >
      {/* Main nav */}
      <nav className="container-px mx-auto flex h-[60px] max-w-[1400px] items-center justify-between">
        <Logo showSubtitle={false} />

        {/* Desktop links */}
        <ul ref={desktopNavRef} className="relative hidden items-center gap-0.5 xl:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link
                ref={(el) => {
                  if (el) linkRefs.current.set(l.href, el);
                  else linkRefs.current.delete(l.href);
                }}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`relative whitespace-nowrap rounded px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(l.href)
                    ? "text-brand"
                    : "text-muted hover:bg-bg-2 hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {/* Single sliding active indicator — its left/width are measured
              from whichever link is active, and the CSS transition on those
              two properties produces the slide between pages. */}
          {indicator && (
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-brand transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
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
            className="grid h-11 w-11 place-items-center rounded border border-border bg-bg-2 text-text xl:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        // `inert` (rather than aria-hidden) for the closed state: it both
        // hides the drawer from assistive tech AND stops it (and any link
        // inside it that still has keyboard focus from before it closed)
        // from being focusable, so the browser never ends up with a
        // focused descendant inside an aria-hidden ancestor.
        inert={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-white p-6 shadow-2xl transition-transform duration-300 ${
            open ? "[transform:translateX(0)]" : "[transform:translateX(100%)]"
          }`}
        >
          <div className="mb-6 flex shrink-0 items-center justify-between">
            <Logo showSubtitle={false} showIcon={false} />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded border border-border bg-bg-2 text-text"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? undefined : -1}
              onClick={(e) => { onNavClick(e, l.href); setOpen(false); }}
              className={`relative border-l-[3px] px-4 py-3 text-base font-semibold transition-colors ${
                isActive(l.href)
                  ? "!border-black bg-bg-2 text-text"
                  : "!border-transparent text-text hover:bg-bg-2 hover:text-brand"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {!isCarDetail && (
            <button
              type="button"
              tabIndex={open ? undefined : -1}
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
            tabIndex={open ? undefined : -1}
            className="mt-2 flex items-center justify-center gap-2 rounded border border-border px-5 py-3.5 text-sm font-semibold text-brand"
          >
            <Phone className="h-4 w-4" /> {nav.phone}
          </a>
          <a
            href={`tel:${nav.phoneSecondary.replace(/\s/g, "")}`}
            tabIndex={open ? undefined : -1}
            className="mt-2 flex items-center justify-center gap-2 rounded border border-border px-5 py-3.5 text-sm font-semibold text-brand"
          >
            <Phone className="h-4 w-4" /> {nav.phoneSecondary}
          </a>
        </div>
      </div>
    </header>
  );
}
