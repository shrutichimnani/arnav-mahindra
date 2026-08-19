import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ServiceBooking from "@/components/ServiceBooking";
import ServiceCentres from "@/components/ServiceCentres";
import Reveal from "@/components/Reveal";
import { serviceHeroImage, serviceCentres, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Locate a Service Centre & Book a Service Appointment | Mahindra Modi";
const description =
  "Book authorised Mahindra service online across Thane, Navi Mumbai and Mumbai. Choose a convenient centre and slot for maintenance, repairs, genuine parts and pickup/drop support.";

export const metadata: Metadata = {
  title,
  description,
    alternates: { canonical: `${SITE_URL}/locate-service-centre` },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/locate-service-centre`,
    images: [{ url: serviceHeroImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: serviceHeroImage, width: 1200, height: 630 }],
  },
};

const servicePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/locate-service-centre#webpage`,
      url: `${SITE_URL}/locate-service-centre`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locate a Service Centre",
          item: `${SITE_URL}/locate-service-centre`,
        },
      ],
    },
    {
      "@type": "ItemList",
      itemListElement: serviceCentres.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "AutomotiveBusiness",
          name: s.name,
          address: s.address,
          telephone: s.phone,
        },
      })),
    },
  ],
};

export default function LocateServiceCentrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main className="main-offset">
        {/* Hero */}
        <section className="relative h-[280px] w-full overflow-hidden bg-brand-deep sm:h-[340px]">
          <Image
            src={serviceHeroImage}
            alt="Mahindra service centre bay"
            title="Mahindra Service Centre"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%] sm:object-[center_30%] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="hero-safe absolute inset-x-0 bottom-0 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Service
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Locate a Service Centre & Book a Service
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Keep your Mahindra performing at its best with genuine parts,
                factory-trained technicians, clear estimates and convenient
                service booking.
              </p>
            </Reveal>
          </div>
        </section>

        <ServiceBooking />

        {/* Genuine Parts */}
        <section id="genuine-parts" className="scroll-mt-24 bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal variant="slide-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Genuine Parts</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                  Genuine Mahindra Parts &amp; Accessories
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Every Mahindra Modi service centre uses only genuine OEM parts sourced directly
                  from Mahindra &amp; Mahindra. Counterfeit parts may look similar but compromise
                  safety, performance and longevity. Our genuine parts come with manufacturer
                  warranty and are precision-engineered for your specific model.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "100% OEM parts with manufacturer warranty",
                    "Trained technicians for precise fitment",
                    "Wide inventory, no long waiting periods",
                    "Quality checks at every stage",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal variant="slide-left" className="relative h-64 overflow-hidden rounded-lg bg-bg-2 lg:h-80">
                <Image
                  src="/images/locate-us/service-workshop.webp"
                  alt="Mahindra Modi service centre workshop"
                  title="Mahindra Modi service centre workshop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Roadside Assistance */}
        <section id="roadside-assistance" className="scroll-mt-24 bg-brand py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal className="mx-auto mb-10 max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Roadside Assistance</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                24x7 Roadside Assistance
              </h2>
              <p className="mt-3 text-sm text-white/70">
                Breakdowns don&apos;t follow a schedule, and neither do we. Mahindra Modi&apos;s
                roadside assistance is available round-the-clock to get you back on the road
                quickly and safely.
              </p>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Flat Tyre", desc: "On-the-spot puncture repair and tyre change by trained technicians." },
                { title: "Battery Jump-Start", desc: "Dead battery? We'll jump-start it or fit a replacement on site." },
                { title: "Emergency Fuel", desc: "Ran out of fuel? We'll deliver enough to get you to the nearest pump." },
                { title: "Towing Service", desc: "Vehicle recovery and towing to the nearest authorised service centre." },
                { title: "Key Lockout", desc: "Locked your keys inside? We'll help you regain access without damage." },
                { title: "On-Site Minor Repairs", desc: "Quick fixes for minor mechanical issues right where you are." },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 80} variant="fade-up">
                  <div className="h-full rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]">
                    <h3 className="font-display text-base font-bold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Extended Warranty */}
        <section id="extended-warranty" className="scroll-mt-24 bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal variant="slide-right" className="relative h-64 overflow-hidden rounded-lg bg-bg-2 lg:h-80 lg:order-1">
                <Image
                  src="/images/locate-us/service-workshop-team.webp"
                  alt="Mahindra Modi workshop team"
                  title="Mahindra Modi workshop team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </Reveal>
              <Reveal variant="slide-left" className="lg:order-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Extended Warranty</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                  Extended Warranty Plans
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Protect your Mahindra beyond the standard warranty with our extended coverage
                  plans. An extended warranty shields you from unexpected repair costs on engine,
                  transmission, electricals and more, giving you complete peace of mind for
                  years to come.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Coverage for major mechanical and electrical components",
                    "Flexible plans up to 5 years or 1,00,000 km",
                    "Cashless repairs at any authorised Mahindra service centre",
                    "Transferable warranty, adds resale value",
                    "Zero depreciation add-on available",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Scheduled Maintenance */}
        <section id="scheduled-maintenance" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal className="mx-auto mb-12 max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">Scheduled Maintenance</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Scheduled Maintenance Packages
              </h2>
              <p className="mt-3 text-sm text-muted">
                Regular maintenance is the key to your vehicle&apos;s long-term reliability and
                performance. Our packages follow Mahindra&apos;s recommended service intervals,
                performed by factory-trained technicians.
              </p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "10,000 km Service",
                  items: ["Engine oil & filter change", "Fluid level top-up", "Brake inspection", "Tyre rotation & alignment", "Battery health check"],
                },
                {
                  step: "02",
                  title: "20,000 km Service",
                  items: ["Air & AC filter replacement", "Fuel filter change", "Brake pad assessment", "Suspension check", "Comprehensive 40-point inspection"],
                },
                {
                  step: "03",
                  title: "40,000 km Service",
                  items: ["Coolant flush & replacement", "Transmission fluid change", "Spark plug replacement", "Drive belt inspection", "Full electrical system check"],
                },
              ].map((pkg, i) => (
                <Reveal key={pkg.step} delay={i * 100} variant="fade-up">
                  <div className="h-full rounded-lg border border-border bg-white p-6 shadow-[0_2px_12px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]">
                    <span className="text-3xl font-bold text-brand/20">{pkg.step}</span>
                    <h3 className="mt-2 font-display text-lg font-bold text-text">{pkg.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {pkg.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ServiceCentres />
      </main>
      <Footer />
    </>
  );
}
