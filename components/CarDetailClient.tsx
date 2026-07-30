"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/data";
import { company, formatINR } from "@/lib/data";
import { getCarBrochure, getCarDetail, getCarGallery } from "@/lib/car-details";
import type { CarDetail } from "@/lib/data";
import { ArrowRight, Check, ChevronDown, Download, X } from "./icons";
import BackLink from "./BackLink";
import Reveal from "./Reveal";
import { useTestDriveModal } from "./TestDriveModalProvider";

type DetailListProps = {
  id: string;
  title: string;
  eyebrow: string;
  items: string[];
  tone?: "white" | "soft";
};

function DetailList({ id, title, eyebrow, items, tone = "white" }: DetailListProps) {
  return (
    <section id={id} className={`${tone === "soft" ? "bg-bg-2" : "bg-white"} scroll-mt-28 py-12 lg:py-16`}>
      <div className="container-px mx-auto max-w-[1400px]">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">{title}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 rounded-lg border border-border bg-white p-4 text-sm leading-relaxed text-text shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function CarDetailClient({ car }: { car: Car }) {
  // car.colors[0] is always the colour shown on the listing card — see the
  // ordering note above the `cars` array in lib/data.ts.
  const openTestDrive = useTestDriveModal();
  const [colorIndex, setColorIndex] = useState(0);
  const gallery = getCarGallery(car);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false);
  const color = car.colors[colorIndex];
  // The hero reflects the selected paint — each CarColor carries its own
  // image. (The static car.image is only used on the listing card.)
  const heroImage = color.image;
  const detail = getCarDetail(car);
  const brochureUrl = getCarBrochure(car);
  const displayName = `Mahindra ${car.name}`;
  const transmissions = car.transmission.split(",").map((t) => t.trim());
  const engines = car.engine.split(",").map((t) => t.trim());
  const navigation = [
    ["overview", "Overview"],
    ["gallery", "Gallery"],
    ["features", "Features"],
    ["safety", "Safety"],
    ["specifications", "Specifications"],
    ["variants", "Variants"],
  ];

  useEffect(() => {
    // Warm the browser cache for every paint option after the first detail
    // view renders. The primary image remains the only colour-controlled UI.
    const preload = () => {
      car.colors.forEach((paint) => {
        const image = new window.Image();
        image.src = paint.image;
      });
    };

    const timeoutId = window.setTimeout(preload, 250);
    return () => window.clearTimeout(timeoutId);
  }, [car.colors]);

  useEffect(() => {
    const onScroll = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        setStickyCtaVisible(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="bg-white pb-8 pt-8 lg:pb-12 lg:pt-12">
        <div className="container-px mx-auto max-w-[1400px]">
          {/* Breadcrumb */}
          <BackLink />
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span className="text-faint">/</span>
            <Link href="/cars" className="hover:text-brand">Cars</Link>
            <span className="text-faint">/</span>
            <span className="font-medium text-text">{displayName}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* LEFT: colour-switchable hero + inline gallery + brochure */}
            <Reveal variant="slide-right">
              <div className="relative flex h-[230px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-bg-3 to-bg-2 sm:h-[285px] lg:h-[330px]">
                <Image
                  key={heroImage}
                  src={heroImage}
                  alt={`${displayName} in ${color.name}, front three-quarter view`}
                  title={`${displayName} in ${color.name}`}
                  width={1000}
                  height={440}
                  priority
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
                {/* Colour name badge on the hero image */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-text shadow-sm backdrop-blur">
                  {color.name}
                </span>
              </div>

              {/* Colour switcher — controls ONLY the hero above */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Colours · <span className="text-text">{car.colors.length} options</span>
                  </p>
                  <p className="text-xs text-faint">Tap to preview on the car</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {car.colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={`Show ${displayName} in ${c.name}`}
                      aria-pressed={i === colorIndex}
                      title={c.name}
                      onClick={() => setColorIndex(i)}
                      className={`h-9 w-9 shrink-0 rounded-full border-2 transition-all ${
                        i === colorIndex ? "border-brand ring-2 ring-brand/20" : "border-border hover:border-muted"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Inline thumbnail gallery — browse many images without scrolling far */}
              <div className="mt-5 border-t border-border pt-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Image gallery · <span className="text-text">{gallery.length} images</span>
                  </p>
                  <button type="button" onClick={() => setIsGalleryModalOpen(true)} className="text-xs font-semibold text-brand hover:text-brand-light">View all →</button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.slice(0, 6).map((image, index) => {
                    const isLast = index === 5 && gallery.length > 6;
                    return (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => {
                          if (isLast) setIsGalleryModalOpen(true);
                          else {
                            setGalleryIndex(index);
                            const el = document.getElementById("gallery");
                            if (el) {
                              const top = el.getBoundingClientRect().top + window.scrollY - 50;
                              window.scrollTo({ top, behavior: "smooth" });
                            }
                          }
                        }}
                        aria-pressed={index === galleryIndex}
                        title={image.label}
                        className={`group relative aspect-video overflow-hidden rounded-md border bg-bg-2 transition-all ${
                          index === galleryIndex && !isLast ? "border-brand ring-2 ring-brand/15" : "border-border hover:border-brand"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          title={image.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {isLast ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-2/80 backdrop-blur-sm transition-colors group-hover:bg-bg-2/70">
                            <span className="text-sm font-semibold text-text">View All</span>
                            <ArrowRight className="mt-1 h-4 w-4 text-brand" />
                          </div>
                        ) : (
                          <span className="absolute inset-x-0 bottom-0 bg-text/70 px-2 py-1 text-left text-[10px] font-medium text-white">
                            {image.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted">
                  Showing: <span className="font-medium text-text">{gallery[galleryIndex]?.label}</span>
                </p>
              </div>
            </Reveal>

            {/* RIGHT: identity, price, specs, brochure CTA */}
            <Reveal delay={150} variant="slide-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">{car.type}</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">{displayName}</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{detail.overview}</p>

              <div className="mt-5 flex items-baseline gap-2 border-t border-border pt-5">
                <span className="font-display text-3xl font-bold text-brand">{formatINR(car.priceINR)}</span>
                <span className="text-xs text-faint">*Ex-showroom price</span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 sm:grid-cols-3">
                {[
                  ["Seating", car.seating],
                  ["Fuel", car.fuel],
                  ["Mileage / range", car.mileage],
                  ["Boot space", car.bootSpace],
                  ["Best for", detail.idealFor],
                ].map(([label, value]) => (
                  <div key={label} className={label === "Best for" ? "col-span-2 sm:col-span-3" : ""}>
                    <dt className="text-xs font-medium text-muted">{label}</dt>
                    <dd className="mt-0.5 text-sm leading-snug text-text">{value}</dd>
                  </div>
                ))}
                <div className="col-span-2 sm:col-span-3">
                  <dt className="text-xs font-medium text-muted">Engine / motor choices</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {engines.map((engine) => <span key={engine} className="rounded border border-border bg-bg-2 px-2.5 py-1 text-xs text-text">{engine}</span>)}
                  </dd>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <dt className="text-xs font-medium text-muted">Transmission choices</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {transmissions.map((transmission) => <span key={transmission} className="rounded border border-border bg-bg-2 px-2.5 py-1 text-xs text-text">{transmission}</span>)}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Key highlights</p>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {car.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-sm text-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{highlight}</li>)}
                </ul>
              </div>

              {/* CTAs — brochure up near the hero */}
              <div ref={ctaRef} className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => openTestDrive({ carSlug: car.slug, source: `test_drive_${car.slug.replace(/-/g, "_")}` })} className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light">
                  Book a Test Drive <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <Link href="/contact-us" className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white">
                  Get a Variant Quote
                </Link>
                {brochureUrl && (
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-border bg-bg-2 px-6 py-3.5 text-sm font-semibold text-text transition-all hover:border-brand hover:text-brand"
                  >
                    <Download className="h-4 w-4" />
                    Download Brochure
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <nav aria-label="Car detail sections" className="sticky top-[60px] z-20 border-y border-border bg-white/95 backdrop-blur">
        <div className="container-px mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto py-2">
          <div className="flex flex-1 gap-1">
            {navigation.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded px-3 py-2 text-xs font-semibold text-muted transition-colors hover:bg-bg-2 hover:text-brand">{label}</a>)}
          </div>
          <div className={`hidden shrink-0 items-center gap-2 lg:flex ${stickyCtaVisible ? "" : "invisible pointer-events-none"}`}>
            <button type="button" onClick={() => openTestDrive({ carSlug: car.slug, source: `test_drive_${car.slug.replace(/-/g, "_")}` })} className="whitespace-nowrap rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-light">
              Book a Test Drive
            </button>
            <Link href="/contact-us" className="whitespace-nowrap rounded border border-brand px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white">
              Get a Variant Quote
            </Link>
            {brochureUrl && (
              <a href={brochureUrl} target="_blank" rel="noreferrer" className="whitespace-nowrap rounded border border-border bg-bg-2 px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-brand hover:text-brand">
                Download Brochure
              </a>
            )}
          </div>
        </div>
      </nav>

      <section id="overview" className="scroll-mt-28 bg-bg-2 py-12 lg:py-16">
        <div className="container-px mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">Buyer&apos;s overview</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">Is the {displayName} right for you?</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{detail.overview}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {car.priceOnRequest ? (
                <>Priced <span className="font-semibold text-text">on request</span>, the </>
              ) : (
                <>Priced from <span className="font-semibold text-text">{formatINR(car.priceINR)}*</span> (ex-showroom), the </>
              )}
              {displayName} seats {car.seating}, offers {car.bootSpace.toLowerCase()} of luggage space and is available with {engines.length} engine option{engines.length > 1 ? "s" : ""} and {transmissions.length} transmission choice{transmissions.length > 1 ? "s" : ""}. Visit Mahindra Modi for a test drive and a transparent, variant-wise quotation.
            </p>
            <div className="mt-5 rounded-lg border border-border bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Best suited to</p>
              <p className="mt-1.5 text-sm text-text">{detail.idealFor}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {detail.performance.map((point, index) => <div key={point} className="rounded-lg border border-border bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wider text-brand">Performance {index + 1}</p><p className="mt-2 text-sm leading-relaxed text-text">{point}</p></div>)}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-28 bg-white py-12 lg:py-16">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-brand">Official image gallery</p><h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">{displayName} photos: styling, cabin &amp; features</h2></div>
            <p className="max-w-md text-sm text-muted">Browse {gallery.length} official {displayName} images: styling angles, dashboard, seats, steering wheel, boot space, engine and feature close-ups. This gallery is separate from the colour selector above.</p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-lg bg-bg-2 p-6 sm:min-h-[440px]">
              <Image src={gallery[galleryIndex].src} alt={gallery[galleryIndex].alt} title={gallery[galleryIndex].alt} width={1200} height={675} sizes="(max-width: 1024px) 100vw, 65vw" className="h-auto w-full object-contain" />
              <span className="absolute bottom-4 left-4 rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white">{gallery[galleryIndex].label}</span>
              <span className="absolute bottom-4 right-4 rounded bg-white/90 px-3 py-1.5 text-xs font-medium text-text">{galleryIndex + 1} / {gallery.length}</span>
            </div>
            <div className="grid max-h-[440px] auto-rows-min grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
              {gallery.map((image, index) => <button key={image.src} type="button" onClick={() => setGalleryIndex(index)} aria-pressed={index === galleryIndex} className={`group overflow-hidden rounded-lg border bg-bg-2 text-left transition-all ${index === galleryIndex ? "border-brand ring-2 ring-brand/15" : "border-border hover:border-brand"}`}>
                <Image src={image.src} alt={image.label} title={image.label} width={360} height={200} sizes="(max-width: 640px) 50vw, 240px" className="h-24 w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                <span className="block border-t border-border bg-white px-2.5 py-2 text-xs font-medium text-text">{image.label}</span>
              </button>)}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-28 bg-bg-2 py-12 lg:py-16">
        <div className="container-px mx-auto max-w-[1400px]">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">Features</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">The details you&apos;ll use every day.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Cabin & Comfort", detail.interior],
              ["Design & Styling", detail.exterior],
              ["Infotainment & technology", detail.infotainment],
              ["Comfort & convenience", detail.comfort],
              ["Performance", detail.performance],
            ].map(([title, items]) => <article key={title as string} className="rounded-lg border border-border bg-white p-5 shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]"><h3 className="font-display text-base font-bold text-text">{title}</h3><ul className="mt-4 space-y-3">{(items as string[]).map((item) => <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{item}</li>)}</ul></article>)}
          </div>
        </div>
      </section>


      <DetailList id="safety" eyebrow="Protection" title="Safety and driver assistance" items={[...detail.safety, ...(detail.adas ?? [])]} />

      <section id="specifications" className="scroll-mt-28 bg-bg-2 py-12 lg:py-16">
        <div className="container-px mx-auto max-w-[1100px]">
          <div className="text-center"><p className="text-xs font-semibold uppercase tracking-wider text-brand">Technical specifications</p><h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">Key numbers at a glance.</h2><p className="mt-3 text-sm text-muted">Figures are manufacturer-claimed and can vary by variant, wheel size and test conditions.</p></div>
          <dl className="mt-8 overflow-hidden rounded-lg border border-border bg-white sm:grid sm:grid-cols-2">
            {detail.specifications.map((spec) => <div key={spec.label} className="border-b border-border p-5 last:border-b-0 sm:nth-[odd]:border-r sm:nth-last-[-n+2]:border-b-0"><dt className="text-xs font-semibold uppercase tracking-wider text-muted">{spec.label}</dt><dd className="mt-1 text-sm font-semibold text-text">{spec.value}</dd></div>)}
          </dl>
        </div>
      </section>

      <section id="variants" className="scroll-mt-28 bg-white py-12 lg:py-16">
        <div className="container-px mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-border bg-bg-2 p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-brand">Variants and colours</p><h2 className="mt-2 font-display text-2xl font-bold text-text">Choose the right specification, not just the right price.</h2><ul className="mt-5 space-y-3">{detail.variants.map((variant) => <li key={variant} className="flex gap-2 text-sm leading-relaxed text-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{variant}</li>)}</ul><p className="mt-6 text-xs leading-relaxed text-muted">Available colours: {car.colors.map((item) => item.name).join(", ")}. Paint availability is subject to the selected variant and current stock.</p></div>
          <aside className="rounded-lg bg-brand p-6 text-white sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-white/60">Ownership confidence</p><h2 className="mt-2 font-display text-2xl font-bold">Warranty and next steps</h2><p className="mt-4 text-sm leading-relaxed text-white/75">{detail.warranty}</p><div className="mt-5 flex flex-col items-start gap-3"><a href={detail.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80">View Mahindra&apos;s current model information</a>{brochureUrl && <a href={brochureUrl} target="_blank" rel="noreferrer" className="inline-flex text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80">Download official brochure (PDF)</a>}</div><div className="mt-7 space-y-3"><button type="button" onClick={() => openTestDrive({ carSlug: car.slug, source: `test_drive_${car.slug.replace(/-/g, "_")}` })} className="group flex w-full items-center justify-center gap-2 rounded bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white/90">Book a Test Drive <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></button><Link href="/locate-service-centre#book-service" className="flex items-center justify-center rounded border border-white/35 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">Already own one? Book service</Link></div></aside>
        </div>
      </section>

      {/* Model FAQ — AEO-friendly Q&A built from the researched data so
          answer engines can extract price, mileage, seating and power facts. */}
      <CarFaq displayName={displayName} car={car} detail={detail} brochureUrl={brochureUrl} />

      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg-2 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 shadow-sm lg:px-8">
            <h2 className="font-display text-lg font-bold text-text">
              {displayName} photos: styling, cabin & features
            </h2>
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-3 text-muted transition-colors hover:bg-border hover:text-text"
              aria-label="Close gallery"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left: Large Active Viewer */}
            <div className="relative flex flex-1 items-center justify-center bg-bg-2 p-4 lg:p-12">
              <div className="relative h-full w-full max-w-5xl">
                <Image
                  src={gallery[galleryIndex]?.src || ''}
                  alt={gallery[galleryIndex]?.alt || ''}
                  title={gallery[galleryIndex]?.alt || ''}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute bottom-6 left-6 rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white shadow-md">
                {gallery[galleryIndex]?.label}
              </div>
              <div className="absolute bottom-6 right-6 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-text shadow-md border border-border">
                {galleryIndex + 1} / {gallery.length}
              </div>
            </div>

            {/* Right: Scrollable Thumbnails */}
            <div className="w-80 shrink-0 border-l border-border bg-white overflow-y-auto p-4 lg:w-[400px] lg:p-6">
              <p className="mb-6 text-sm text-muted">
                Browse {gallery.length} official {displayName} images: styling angles, dashboard, seats, and feature close-ups.
              </p>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {gallery.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setGalleryIndex(idx)}
                    className={`group relative aspect-video w-full overflow-hidden rounded-md border transition-all ${
                      idx === galleryIndex
                        ? "border-brand ring-2 ring-brand/20"
                        : "border-border hover:border-brand"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      title={img.alt}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left">
                      <span className="text-[10px] font-medium leading-tight text-white line-clamp-1">{img.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CarFaq({
  displayName,
  car,
  detail,
  brochureUrl,
}: {
  displayName: string;
  car: Car;
  detail: CarDetail;
  brochureUrl?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqs = [
    {
      q: `What is the price of the ${displayName} in Thane?`,
      a: car.priceOnRequest
        ? `The ${displayName} is priced on request. Contact Mahindra Modi for an exact, all-inclusive quotation for Thane, Navi Mumbai or Mumbai.`
        : `The ${displayName} starts at ${formatINR(car.priceINR)}* (ex-showroom). On-road pricing depends on the chosen variant, colour, insurance, accessories and RTO charges. Request a quotation from Mahindra Modi for an exact, all-inclusive figure for Thane, Navi Mumbai or Mumbai.`,
    },
    {
      q: `How many variants does the ${displayName} offer?`,
      a: detail.variants.join(" "),
    },
    {
      q: `What engine and mileage does the ${displayName} deliver?`,
      a: `The ${displayName} is offered with ${car.engine.toLowerCase()}. Transmissions available are ${car.transmission.toLowerCase()}. Claimed efficiency is ${car.mileage.toLowerCase()}. Figures are manufacturer-claimed and vary by variant, fuel and test conditions.`,
    },
    {
      q: `What are the key features of the ${displayName}?`,
      a: car.highlights.join(". ") + ". " + detail.interior.slice(0, 2).join(" "),
    },
    {
      q: `How safe is the ${displayName}?`,
      a: [...detail.safety, ...(detail.adas ?? [])].join(" "),
    },
    {
      q: `Where can I test drive the ${displayName}?`,
      a: `Book a test drive online or call Mahindra Modi on ${company.phone}. We have showrooms and service centres across ${company.areasServed.join(", ")}.${brochureUrl ? " You can also download the official brochure above." : ""}`,
    },
  ];

  return (
    <section className="bg-bg-2 py-12 lg:py-16">
      <div className="container-px mx-auto max-w-[1000px]">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{displayName} FAQs</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
          Frequently asked questions about the {displayName}
        </h2>
        <div className="mt-7 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={item.q}
                onClick={() => toggle(i)}
                className="w-full rounded-lg border border-border bg-white p-5 text-left"
              >
                <span className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-text">
                  {item.q}
                  <span className="shrink-0">
                    {isOpen ? (
                      <X className="h-4 w-4 text-brand" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted" />
                    )}
                  </span>
                </span>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

