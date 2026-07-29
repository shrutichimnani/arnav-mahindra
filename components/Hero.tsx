"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";

const AUTOPLAY = 6500;

export default function Hero() {
  // Detect screen sizes below desktop (less than 1024px) to remove the specific concept photo from mobile/tablet
  const [isBelowLg, setIsBelowLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsBelowLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Use all hero slides directly now that we are displaying original uncropped banners on all viewports
  const slides = heroSlides;

  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [count]);

  // Handle slide index bounds if viewport sizes change
  useEffect(() => {
    if (index >= slides.length) {
      setIndex(0);
    }
  }, [index, slides.length]);

  const getAspect = (image: string) => {
    if (image.includes("hero-xuv3xo-adventure") || image.includes("hero-xuv3xo-banner")) {
      return "1920/745";
    }
    if (image.includes("hero-xuv7xo-milestone")) {
      return "1600/690";
    }
    return "1920/829";
  };

  const active = slides[index] || slides[0];

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
      <div
        className="relative w-full aspect-[16/9] lg:aspect-[21/9]"
        style={isBelowLg ? { aspectRatio: getAspect(active.image) } : undefined}
      >
        {slides.map((slide, i) => (
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
              title={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              // Per-slide horizontal focus (lib/data.ts `heroFocusX`): these
              // banners aren't framed with the headline centred, so a plain
              // "center" crop clips the headline or disclaimer text off one
              // edge once the box is narrower than the source banner.
              style={{ objectPosition: `${slide.heroFocusX ?? 50}% 35%` }}
              className="block object-cover"
            />
          </Link>
        ))}

        <h1 className="sr-only">
          New Mahindra Cars, Test Drives &amp; Authorised Service Across
          Thane and Navi Mumbai | Mahindra Modi
        </h1>

        {/* Arrow controls — left and right edges, vertically centred, kept
            inside the same horizontal safe-zone padding as the rest of the
            hero overlay so they never crowd the notch/rounded-corner area
            on narrow phones. No circular background so they don't sit over
            the hero text baked into the creative. */}
        <div className="hero-safe pointer-events-none absolute inset-0 flex items-center justify-between">
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="pointer-events-auto z-10 text-white/80 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="pointer-events-auto z-10 text-white/80 transition-colors hover:text-white"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>

        {/* Slim progress bar, bottom-left, anchored inside the safe zone so
            it scales its clearance with viewport height instead of a fixed
            offset that can sit too close to the edge on short screens. */}
        <div className="hero-safe pointer-events-none absolute inset-x-0 bottom-0 flex">
          <div className="h-[3px] w-32 overflow-hidden rounded-full bg-white/30 sm:w-48">
            <span
              key={index}
              className="block h-full rounded-full bg-white"
              style={{ width: "0%", animation: `hero-progress ${AUTOPLAY}ms linear forwards` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
