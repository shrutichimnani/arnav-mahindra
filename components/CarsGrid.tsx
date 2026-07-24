"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Electric",
  "MPV",
  "Pickup",
  "Commercial",
];

export default function CarsGrid() {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const categoryFiltered =
    category === "All" ? cars : cars.filter((c) => c.category === category);

  const filtered = useMemo(() => {
    const arr = [...categoryFiltered];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [categoryFiltered]);

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="flex flex-wrap gap-1 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`cursor-pointer shrink-0 rounded border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                category === cat
                  ? "border-brand text-brand"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => {
            const displayName = "Mahindra " + car.name;
            return (
              <Reveal key={car.slug} delay={(i % 3) * 90} variant="fade-up">
                <Link
                  href={`/cars/${car.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]"
                >
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-bg-2 p-6">
                    <Image
                      src={car.image}
                      alt={car.alt}
                      width={400}
                      height={150}
                      className="max-h-full w-auto max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                    />
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
