"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Absolute position within the tripled track (0..3*len-1). Kept in a ref
  // so it survives renders without needing to be derived from scrollLeft.
  const absoluteIndexRef = useRef(0);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const len = testimonials.length;

  // Three back-to-back copies of the full list. Unlike a single clone on
  // each end, this guarantees a whole extra set of real cards on both
  // sides of the "main" copy no matter how many cards fit in the
  // viewport at once, so scrolling near either edge never runs out of
  // content and exposes blank space.
  const items = mounted
    ? [...testimonials, ...testimonials, ...testimonials]
    : testimonials;

  const getCardW = (el: HTMLDivElement) => {
    const card = el.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 20 : 0;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Once the tripled list has rendered, jump (invisibly) to the start of
  // the middle copy so there's a full copy of real cards to scroll into
  // in either direction right away.
  useEffect(() => {
    if (!mounted) return;
    const el = trackRef.current;
    if (!el) return;
    const cardW = getCardW(el);
    if (!cardW) return;
    absoluteIndexRef.current = len;
    el.scrollTo({ left: len * cardW, behavior: "instant" as ScrollBehavior });
  }, [mounted, len]);

  const recenterIfNeeded = useCallback((el: HTMLDivElement, cardW: number) => {
    const abs = absoluteIndexRef.current;
    // Once we've drifted into the first or third copy, snap back by a
    // whole `len` into the middle copy. The content is identical, so
    // this is visually seamless — and because a whole copy sits on each
    // side, we always have real cards to snap onto.
    if (abs < len * 0.5) {
      const newAbs = abs + len;
      absoluteIndexRef.current = newAbs;
      el.scrollTo({ left: newAbs * cardW, behavior: "instant" as ScrollBehavior });
    } else if (abs >= len * 2.5) {
      const newAbs = abs - len;
      absoluteIndexRef.current = newAbs;
      el.scrollTo({ left: newAbs * cardW, behavior: "instant" as ScrollBehavior });
    }
  }, [len]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !mounted) return;

    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    // Only resolve the active dot (and recenter within the triple buffer)
    // once scrolling has actually settled, rather than on every scroll
    // frame — avoids reading stale in-transit positions and flickering
    // the active dot mid-animation.
    const resolveSettledPosition = () => {
      const cardW = getCardW(el);
      if (!cardW) return;
      const sl = el.scrollLeft;

      const cards = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - sl);
        if (d < minDist) { minDist = d; closest = i; }
      });

      absoluteIndexRef.current = closest;
      setActive(((closest % len) + len) % len);
      recenterIfNeeded(el, cardW);
    };

    const onScroll = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(resolveSettledPosition, 120);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, [mounted, len, recenterIfNeeded]);

  const scrollToIndex = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = getCardW(el);
    if (!cardW) return;
    const currentAbs = absoluteIndexRef.current;
    const currentReal = ((currentAbs % len) + len) % len;
    // Move by the shortest number of real steps from the current position
    // so clicking a dot always slides in the natural direction.
    let delta = i - currentReal;
    if (delta > len / 2) delta -= len;
    if (delta < -len / 2) delta += len;
    const nextAbs = currentAbs + delta;

    absoluteIndexRef.current = nextAbs;
    setActive(i);
    el.scrollTo({ left: nextAbs * cardW, behavior: "smooth" });
  }, [len]);

  const go = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = getCardW(el);
    if (!cardW) return;

    const nextAbs = absoluteIndexRef.current + dir;
    absoluteIndexRef.current = nextAbs;
    setActive(((nextAbs % len) + len) % len);
    el.scrollTo({ left: nextAbs * cardW, behavior: "smooth" });
  }, [len]);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-text">97% customer satisfaction</span>{" "}
              across 10,000+ Mahindra cars sold and 150,000+ services completed.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[85vw] shrink-0 snap-center flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_16px_0_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.12)] sm:w-[360px]"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-text/80">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-4 border-t border-border pt-5">
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name}
                aria-label={`Go to review ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(i)}
                className="h-2 shrink-0 rounded-full border-0 p-0"
                style={{
                  // Animate the real width so the dot grows into a smooth
                  // rounded pill, and the colour cross-fades in sync.
                  width: isActive ? 28 : 8,
                  backgroundColor: isActive ? "var(--brand)" : "#c8cfd9",
                  transition:
                    "width 350ms cubic-bezier(0.4, 0, 0.2, 1), background-color 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
