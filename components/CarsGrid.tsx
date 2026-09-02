"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Electric",
  "Pickup",
  "Commercial",
];

const categorySet = new Set<string>(categories);

// Persisted in sessionStorage (not just an in-memory `window` cache) so the
// shuffled order survives a page reload — browsers give JS no way to tell a
// plain refresh apart from a hard/cache-busting one, so "reshuffle only on
// hard refresh" isn't something a page can detect. sessionStorage is the
// closest match: the order stays put across reloads and back/forward nav,
// and only resets once the tab itself is closed. Per-category keys mean
// switching tabs generates a fresh shuffle on first visit to that category.
const SHUFFLE_STORAGE_PREFIX = "mahindra_cars_grid_shuffle:";

function loadShuffle(cacheKey: string): typeof cars | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SHUFFLE_STORAGE_PREFIX + cacheKey);
    if (!raw) return null;
    const slugs: string[] = JSON.parse(raw);
    const bySlug = new Map(cars.map((c) => [c.slug, c]));
    const arr = slugs.map((s) => bySlug.get(s)).filter((c): c is (typeof cars)[number] => Boolean(c));
    return arr.length === slugs.length ? arr : null;
  } catch {
    return null;
  }
}

function saveShuffle(cacheKey: string, arr: typeof cars) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SHUFFLE_STORAGE_PREFIX + cacheKey, JSON.stringify(arr.map((c) => c.slug)));
  } catch {
    // sessionStorage unavailable (private mode, quota) — shuffle just won't persist.
  }
}

// These product shots have more empty space around the vehicle than the
// other listing photos, so they read smaller at the same box size — nudge
// them up to match visual weight with their neighbours.
const cardImageScale: Partial<Record<string, string>> = {
  veero: "scale-[1.12]",
  "bolero-pik-up": "scale-[1.4]",
};

export default function CarsGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const category: "All" | CarCategory = (
    rawCategory && categorySet.has(rawCategory) ? rawCategory : "All"
  ) as "All" | CarCategory;

  const setCategory = (next: "All" | CarCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);
    const qs = params.toString();
    router.push(qs ? `/cars?${qs}` : "/cars", { scroll: false });
  };

  const categoryFiltered = useMemo(
    () => (category === "All" ? cars : cars.filter((c) => c.category === category)),
    [category],
  );

  const cacheKey = category;

  // Initial state must match what the server rendered (server has no
  // sessionStorage, so it always renders `categoryFiltered` unshuffled) —
  // reading sessionStorage here too would make the client's first render
  // diverge from the SSR HTML and trigger a hydration error. The stored
  // order is applied client-only, in the layout effect below.
  const [filtered, setFiltered] = useState(categoryFiltered);

  // useLayoutEffect (not useEffect) so the shuffle lands before the browser
  // paints this commit — reordering after paint, while Reveal's entrance
  // transition is running, was what previously made a card flicker/vanish.
  useLayoutEffect(() => {
    const cached = loadShuffle(cacheKey);
    if (cached) {
      setFiltered(cached);
      return;
    }
    const arr = [...categoryFiltered];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // On the "All" tab, the grid should always open on an SUV; everything
    // after that first slot stays in shuffled order.
    if (cacheKey === "All") {
      const suvIndex = arr.findIndex((c) => c.category === "SUV");
      if (suvIndex > 0) {
        const [suv] = arr.splice(suvIndex, 1);
        arr.unshift(suv);
      }
    }
    saveShuffle(cacheKey, arr);
    setFiltered(arr);
  }, [categoryFiltered, cacheKey]);

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="flex justify-center">
          <div className="flex gap-1 overflow-x-auto sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
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

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => {
            const displayName = "Mahindra " + car.name;
            return (
              <Reveal key={car.slug} delay={(i % 3) * 90} variant="fade-up">
                <Link
                  href={`/cars/${car.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-500 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]"
                >
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-bg-2 p-6">
                    <div className={cardImageScale[car.slug] ?? ""}>
                      <Image
                        src={car.image}
                        alt={car.alt}
                        title={`Mahindra ${car.name}`}
                        width={400}
                        height={150}
                        className="max-h-full w-auto max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                      {car.type}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-text">
                      {displayName}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {car.priceOnRequest ? (
                        <span className="font-semibold text-text">Price on Request</span>
                      ) : (
                        <>
                          Starts from{" "}
                          <span className="font-semibold text-text">
                            {formatINR(car.priceINR)}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-faint">{car.fuel}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
