import Link from "next/link";
import { company } from "@/lib/data";
import Reveal from "./Reveal";
import { TestDriveTrigger } from "./TestDriveModalProvider";

/* ============================================================
   Homepage SEO & AEO content blocks.

   These sections give the homepage meaningful, crawlable copy so
   it ranks for dealer-level and model-level queries (e.g. "Mahindra
   dealer in Thane", "Mahindra Thar Roxx price Navi Mumbai"). Content
   is written to be useful to human buyers and extractable by answer
   engines — short definitional sentences, clear lists and an FAQ
   close. Layout stays clean and on-brand: light surfaces, the
   brand accent and the existing card / eyebrow styling.
   ============================================================ */

const lineages = [
  {
    name: "Lifestyle SUVs",
    blurb:
      "The iconic Thar and Thar Roxx bring true off-road 4x4 ability and a cult following to Mahindra's lifestyle SUV range.",
    models: ["Thar", "Thar Roxx"],
    href: "/cars",
  },
  {
    name: "Family SUVs",
    blurb:
      "From the compact XUV 3XO to the flagship XUV 7XO and Scorpio-N, a full range of SUVs covering every budget and seating need.",
    models: ["XUV 3XO", "XUV 7XO", "Scorpio-N", "Scorpio Classic"],
    href: "/cars",
  },
  {
    name: "Rugged & MPV",
    blurb:
      "Decades of reliability in the Bolero range, plus the spacious Marazzo MPV for families who need genuine third-row room.",
    models: ["Bolero", "Bolero Neo", "Marazzo"],
    href: "/cars",
  },
  {
    name: "Electric",
    blurb:
      "Mahindra's electric range spans the practical XUV400 to the new-generation BE 6 and XEV 9e electric SUV coupes.",
    models: ["XUV400", "BE 6", "XEV 9e"],
    href: "/cars",
  },
];

const buyingSteps = [
  {
    step: "01",
    title: "Shortlist your Mahindra",
    text: "Browse the full lineup by body style, fuel type and budget. Compare variants, colours, mileage and on-road pricing for every model in one place.",
  },
  {
    step: "02",
    title: "Book a test drive",
    text: "Pick a date and your nearest Mahindra Modi outlet across Thane or Navi Mumbai, or request a home test drive at no obligation.",
  },
  {
    step: "03",
    title: "Finalise finance & exchange",
    text: "Get a transparent quote with flexible EMI plans from leading banks, plus instant exchange value on your existing car.",
  },
  {
    step: "04",
    title: "Delivery & aftercare",
    text: "Take delivery of your new Mahindra, then rely on factory-trained technicians, genuine parts and free pickup-and-drop service for the years ahead.",
  },
];

const servicePoints = [
  "Periodic maintenance on the manufacturer-recommended schedule, done right the first time.",
  "Only genuine, warranty-backed Mahindra parts, never aftermarket substitutes.",
  "Free pickup and drop for every service booking across the Thane and Navi Mumbai region.",
  "24x7 roadside assistance and extendable warranty plans for total peace of mind.",
];

export default function HomeSeoContent() {
  return (
    <>
      {/* Lineup by category */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-3 block">The Mahindra Lineup</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              New Mahindra cars for every driver, family and budget
            </h2>
            <p className="mt-3 text-base text-muted">
              As an authorised Mahindra dealership, Mahindra Modi stocks the
              complete Mahindra range: lifestyle off-roaders, compact and
              mid-size SUVs, a spacious MPV, commercial pickups and fully
              electric SUVs. Discover{" "}
              <Link href="/cars" className="font-semibold text-text underline underline-offset-2 hover:text-brand transition-colors">
                Mahindra&apos;s complete range
              </Link>
              , organised by category for easy browsing.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {lineages.map((group, i) => (
              <Reveal key={group.name} delay={i * 90} variant="fade-up">
                <div className="flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_12px_0_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]">
                  <h3 className="font-display text-lg font-bold text-text">
                    {group.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {group.blurb}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">
                    {group.models.join(" · ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why buy from an authorised dealer */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-full">
            <span className="eyebrow mb-3 block">Why Mahindra Modi</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Your authorised Mahindra dealer across Thane and Navi Mumbai
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                Mahindra Modi is an authorised Mahindra & Mahindra Ltd
                dealership serving Thane, Navi Mumbai and Mumbai. Every new
                car, genuine part and accessory we supply is sourced directly
                from Mahindra, so your purchase is backed by the full
                manufacturer warranty and nationwide service network.
              </p>
              <p>
                With thousands of new and pre-owned cars delivered, countless
                services completed and consistently high customer
                satisfaction, our team brings decades of combined
                Gautam Modi Group dealership experience to every test drive,
                finance plan and service booking.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <TestDriveTrigger
                source="home_seo"
                variant="button"
                className="btn-primary"
              >
                Book a Test Drive
              </TestDriveTrigger>
              <Link href="/about" className="btn-outline">
                About Mahindra Modi
              </Link>
            </div>
          </Reveal>

          </div>
      </section>

      {/* How buying works */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-3 block">How It Works</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Buying a Mahindra in four simple steps
            </h2>
            <p className="mt-3 text-base text-muted">
              From shortlisting to delivery and aftercare, we make buying and
              owning a Mahindra straightforward and transparent - no
              pressure, no hidden charges.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyingSteps.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 90} variant="fade-up">
                <div className="flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_12px_0_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]">
                  <span className="font-display text-3xl font-bold text-brand/20">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Authorised service */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal variant="slide-right">
            <span className="eyebrow mb-3 block">Authorised Service</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Genuine Mahindra service, close to home
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Keep your Mahindra performing like new with factory-trained
              technicians, genuine parts and manufacturer-approved service
              schedules. Book online and we will collect your car for service
              and drop it back - at no extra cost - anywhere in our service
              area.
            </p>
            <div className="mt-6">
              <Link href="/locate-service-centre" className="btn-primary">
                Book a Service
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} variant="slide-left">
            <ul className="grid gap-3 sm:grid-cols-2">
              {servicePoints.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-border bg-bg-2 p-5 text-sm leading-relaxed text-text"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

    </>
  );
}
