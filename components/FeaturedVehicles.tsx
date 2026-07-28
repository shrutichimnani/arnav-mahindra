"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Electric",
  "MPV",
  "Pickup",
  "Commercial",
];

// Cache lives on `window` so it survives HMR module re-evaluation in dev mode,
// SPA navigation (e.g. car detail page -> back), but resets on a hard refresh.
// Per-category keys mean switching tabs generates a fresh shuffle on first
// visit to that category, but returns the saved order on back-navigation.
function getShuffleCache(): Map<string, typeof cars> {
  if (typeof window === "undefined") return new Map();
  const key = "__mahindra_featured_vehicles_shuffle__";
  if (!(window as any)[key]) (window as any)[key] = new Map();
  return (window as any)[key];
}

export default function FeaturedVehicles() {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [index, setIndex] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(1000);
  const dragR = useRef({ startX: 0, moved: false, active: false });
  const preventClickR = useRef(false);
  const wheelAccR = useRef(0);
  const wheelTimerR = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categoryFiltered = useMemo(
    () => (category === "All" ? cars : cars.filter((c) => c.category === category)),
    [category],
  );

  const cacheKey = category;

  const [filtered, setFiltered] = useState(() => {
    const cached = getShuffleCache().get(cacheKey);
    if (cached) return cached;
    return categoryFiltered;
  });

  useEffect(() => {
    const cache = getShuffleCache();
    if (cache.has(cacheKey)) return;
    const arr = [...categoryFiltered];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    cache.set(cacheKey, arr);
    setFiltered(arr);
  }, [categoryFiltered, cacheKey]);

  const active = filtered[index] ?? filtered[0];

  const selectCategory = (nextCategory: "All" | CarCategory) => {
    setCategory(nextCategory);
    // Each filter starts at the first matching model. This keeps the active
    // model and the visible filter in sync, including after carousel use.
    setIndex(0);
    setHasNavigated(false);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (dragR.current.active) return;
      e.preventDefault();
      wheelAccR.current += e.deltaX;
      if (Math.abs(wheelAccR.current) > 50) {
        advance(wheelAccR.current > 0 ? 1 : -1);
        wheelAccR.current = 0;
        if (wheelTimerR.current) clearTimeout(wheelTimerR.current);
        return;
      }
      if (wheelTimerR.current) clearTimeout(wheelTimerR.current);
      wheelTimerR.current = setTimeout(() => {
        wheelAccR.current = 0;
      }, 150);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimerR.current) clearTimeout(wheelTimerR.current);
    };
  }, []);

  const len = filtered.length;
  const canGoBack = hasNavigated && len > 1;
  const canGoForward = len > 1;
  const go = (dir: number) => {
    if (len < 2 || (dir < 0 && !hasNavigated)) return;
    setHasNavigated(true);
    setIndex((i) => (i + dir + len) % len);
  };

  const cooldownR = useRef(0);
  const advance = (dir: number) => {
    const now = Date.now();
    if (now - cooldownR.current < 550) return;
    cooldownR.current = now;
    goRef.current(dir);
  };

  const SWIPE_THRESHOLD = 50;
  const goRef = useRef(go);
  goRef.current = go;

  const handleDragStart = (clientX: number) => {
    dragR.current = { startX: clientX, moved: false, active: true };
    wheelAccR.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!dragR.current.active) return;
    if (Math.abs(clientX - dragR.current.startX) > 8) {
      dragR.current.moved = true;
      preventClickR.current = true;
    }
  };

  const handleDragEnd = (clientX: number) => {
    if (!dragR.current.active) return;
    dragR.current.active = false;
    if (!dragR.current.moved) return;
    const delta = clientX - dragR.current.startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    advance(delta > 0 ? -1 : 1);
  };

  // Step distance and scale/opacity falloff are proportional to the stage's
  // own measured width, so the "coverflow" spacing stays consistent across
  // breakpoints without a hardcoded pixel value. Kept just short of the
  // fixed-position prev/next arrows (absolute left-0/right-0) so the side
  // cars sit close to, but don't get covered by, the arrow controls.
  const step = Math.min(stageWidth * 0.36, 380);
  // The centre card renders larger than its neighbours, so a purely linear
  // step makes the main-to-neighbour gap look tighter than the gaps further
  // out. A small constant push on every non-zero offset widens just that
  // first gap, without changing the spacing between the side cards.
  const centreGapBoost = 24;

  return (
    <section
      id="cars"
      className="scroll-mt-24 bg-white py-12 lg:py-16"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Category tabs. relative z-30 keeps the tabs above the absolutely
            positioned, scaled-up carousel cards (max z-20) that would
            otherwise overflow upward and swallow tab clicks. */}
        <Reveal className="relative z-30 flex justify-center">
          <div className="flex gap-1 overflow-x-auto sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                aria-pressed={category === cat}
                className={`cursor-pointer shrink-0 border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                  category === cat
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Coverflow stage */}
        <div
          ref={stageRef}
          onTouchStart={(e) => { e.preventDefault(); handleDragStart(e.touches[0].clientX); }}
          onTouchMove={(e) => {
            handleDragMove(e.touches[0].clientX);
            if (dragR.current.active) e.preventDefault();
          }}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onMouseLeave={() => { dragR.current.active = false; }}
          className="relative mt-4 h-[300px] select-none overflow-hidden sm:h-[360px] lg:h-[400px]"
        >
          <button
            aria-label="Previous car"
            onClick={() => go(-1)}
            disabled={!canGoBack}
            aria-disabled={!canGoBack}
            className={`absolute left-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center transition-colors sm:h-12 sm:w-12 ${
              canGoBack ? "text-text hover:text-brand" : "cursor-not-allowed text-faint/45"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {filtered.map((car, i) => {
            let offset = i - index;
            if (hasNavigated) {
              if (offset > len / 2) offset -= len;
              if (offset < -len / 2) offset += len;
            }
            if (!hasNavigated && offset < 0) return null;
            if (Math.abs(offset) > 3) return null;
            const abs = Math.abs(offset);
            // The focused car is scaled up so it dominates as the hero of the
            // section, but kept modest enough not to crowd the stage;
            // neighbours shrink and fade sharply so they read as small,
            // distant thumbnails rather than near-peers of the centre car.
            const scale = offset === 0 ? 1.08 : Math.max(0.24, 0.4 - abs * 0.1);
            const opacity = abs > 2 ? 0 : 1 - abs * 0.48;
            const translateX =
              offset === 0
                ? 0
                : Math.sign(offset) * (abs * step + centreGapBoost);
            return (
              <div
                key={car.name}
                onClick={() => {
                  if (preventClickR.current) { preventClickR.current = false; return; }
                  if (offset !== 0) {
                    setHasNavigated(true);
                    setIndex(i);
                  }
                }}
                className="absolute left-1/2 top-1/2 flex h-full w-[70%] items-center justify-center transition-all duration-500 ease-out sm:w-[55%] lg:w-[46%]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: offset !== 0 ? "pointer" : "default",
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                {offset === 0 ? (
                  <Link
                    href={`/cars/${car.slug}`}
                    aria-label={`View Mahindra ${car.name} details`}
                    className="block w-full"
                  >
                    <Image
                      src={car.image}
                      alt={car.alt}
                      title={`Mahindra ${car.name}`}
                      width={800}
                      height={295}
                      priority
                      className="h-auto w-full object-contain drop-shadow-xl"
                    />
                  </Link>
                ) : (
                  <Image
                    src={car.image}
                    alt={car.alt}
                    title={`Mahindra ${car.name}`}
                    width={800}
                    height={295}
                    priority={false}
                    className="h-auto w-full object-contain drop-shadow-xl"
                  />
                )}
              </div>
            );
          })}

          <button
            aria-label="Next car"
            onClick={() => go(1)}
            disabled={!canGoForward}
            aria-disabled={!canGoForward}
            className={`absolute right-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center transition-colors sm:h-12 sm:w-12 ${
              canGoForward ? "text-text hover:text-brand" : "cursor-not-allowed text-faint/45"
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Info row, keyed so it fades between models. relative z-30 lifts the
            name link + spec grid above the overflowing carousel cards so the
            car-name link is actually clickable. */}
        <div
          key={active.name}
          className="relative z-30 mx-auto mt-4 max-w-2xl text-center animate-[fade-up_.35s_ease-out both]"
        >
          <Link
            href={`/cars/${active.slug}`}
            className="group mx-auto inline-flex items-center gap-1 text-xl font-bold text-brand transition-colors hover:text-brand-light sm:text-2xl"
          >
            Mahindra {active.name}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-2 grid grid-cols-1 gap-2 border-t border-border pt-2 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-muted">Starting at</p>
              <p className="mt-0.5 text-base font-semibold text-text">
                {active.priceOnRequest ? "On Request" : formatINR(active.priceINR)}
              </p>
              {!active.priceOnRequest && <p className="text-xs text-faint">*Ex Showroom Price</p>}
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Engine</p>
              <p className="mt-0.5 text-sm text-text">{active.engine}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Transmission available</p>
              <p className="mt-0.5 text-sm text-text">{active.transmission}</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
