"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";

const AUTOPLAY = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;
  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-brand-deep"
      style={{ marginTop: "60px" }} /* offset for 2-row nav */
    >
      {/* Cinematic banner carousel, matching auto.mahindra.com's own hero
          treatment exactly: the official campaign creative already carries
          the headline/graphics baked into the photo, so each slide is shown
          clean and clickable, with only a slim progress bar and minimal
          arrow controls overlaid. */}
      <div className="relative h-[calc(100dvh-60px)] w-full">
        {heroSlides.map((slide, i) => (
          <Link
            key={slide.model + i}
            href={slide.href}
            aria-hidden={i === index ? undefined : true}
            tabIndex={i === index ? undefined : -1}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </Link>
        ))}

        <h1 className="sr-only">
          New Mahindra Cars, Test Drives &amp; Authorised Service Across
          Thane and Navi Mumbai | Mahindra Modi
        </h1>

        {/* Arrow controls — left and right edges, vertically centred */}
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white/80 backdrop-blur transition-colors hover:bg-white/30 hover:text-white sm:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white/80 backdrop-blur transition-colors hover:bg-white/30 hover:text-white sm:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slim progress bar, bottom-left */}
        <div className="absolute bottom-4 left-4 z-10 h-[3px] w-32 overflow-hidden rounded-full bg-white/30 sm:bottom-6 sm:left-6 sm:w-48">
          <span
            key={index}
            className="block h-full rounded-full bg-white"
            style={{ width: "0%", animation: `hero-progress ${AUTOPLAY}ms linear forwards` }}
          />
        </div>
      </div>
    </section>
  );
}
