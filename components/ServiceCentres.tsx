"use client";

import Image from "next/image";
import Link from "next/link";
import { serviceCentres } from "@/lib/data";
import { MapPin, Phone, ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function ServiceCentres() {
  return (
    <section id="service-centres" className="scroll-mt-24 bg-brand py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Locate a Service Centre
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {serviceCentres.length} authorised Mahindra Modi service centre
              across Thane, serving Thane, Navi Mumbai and Mumbai.
            </p>
          </div>
          <Link
            href="/locate-us"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand shadow-md transition-all hover:bg-bg-2"
          >
            View on Map
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCentres.map((loc, i) => (
            <Reveal key={loc.name} delay={(i % 3) * 90} variant="fade-up">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/15">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={loc.image}
                    alt={`${loc.name} service centre in ${loc.city}`}
                    title={`${loc.name} Service Centre`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-sm font-bold leading-snug text-white">
                    {loc.name}
                  </h3>
                  <p className="flex items-start gap-1.5 text-xs text-white/75">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/60" />
                    <span>{loc.address}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    <a
                      href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-1.5 text-xs font-medium text-white/90 transition-colors hover:text-white"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-white/60" />
                      {loc.phone}
                    </a>
                    {loc.phoneSecondary && (
                      <>
                        <span aria-hidden className="text-xs text-white/60">/</span>
                        <a
                          href={`tel:${loc.phoneSecondary.replace(/[^0-9+]/g, "")}`}
                          className="text-xs font-medium text-white/90 transition-colors hover:text-white"
                        >
                          {loc.phoneSecondary}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
