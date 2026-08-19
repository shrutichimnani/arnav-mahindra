import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { ArrowRight, Check } from "@/components/icons";
import { TestDriveTrigger } from "@/components/TestDriveModalProvider";
import {
  company,
  groupInfo,
  mahindraFacts,
  aboutFaqData,
  aboutPageHeroImage,
  aboutCultureImage,
  SITE_URL,
} from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "About Mahindra Modi: Our Story, Values and Group";
const description =
  "Mahindra Modi is an authorised Mahindra dealership owned by the Gautam Modi Group, serving Thane, Airoli and Worli with 10,000+ cars sold and 97% customer satisfaction.";

export const metadata: Metadata = {
  title,
  description,
    alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/about`,
    images: [{ url: aboutPageHeroImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: aboutPageHeroImage, width: 1200, height: 630 }],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
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
          name: "About Us",
          item: `${SITE_URL}/about`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/about#faq`,
      mainEntity: aboutFaqData.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const stats = [
  { value: company.stats.carsSold, label: "New Cars Sold" },
  { value: company.stats.usedCarsSold, label: "Used Cars Sold" },
  { value: company.stats.servicesDone, label: "Services Completed" },
  { value: company.stats.satisfaction, label: "Customer Satisfaction" },
];

function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main className="main-offset">
        {/* Hero */}
        <section className="relative h-[320px] w-full overflow-hidden bg-brand-deep sm:h-[380px]">
          <Image
            src={aboutPageHeroImage}
            alt="Mahindra Modi showroom at dusk, Thane"
            title="Mahindra Modi showroom at dusk, Thane"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%] sm:object-[center_30%] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="hero-safe absolute inset-x-0 bottom-0 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Who We Are
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                About Mahindra Modi
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                An authorised Mahindra dealership from the Gautam Modi Group,
                serving Thane, Airoli and Worli with genuine cars, honest service
                and a customer-first promise.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Our story */}
        <section className="bg-white py-14 lg:py-20">
          <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="slide-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Our Story
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Part of the Gautam Modi Group
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>
                  Mahindra Modi is an authorised Mahindra dealership, owned
                  and operated by the {groupInfo.name}. We run a showroom and
                  service centre in Thane, plus a dedicated XUV showroom in
                  Airoli, and we have sold over{" "}
                  {company.stats.carsSold} new cars with a{" "}
                  {company.stats.satisfaction} customer satisfaction score.
                </p>
                <p>
                  The {groupInfo.name} represents {joinWithAnd(groupInfo.brands)}{" "}
                  across multiple automotive businesses, alongside{" "}
                  {joinWithAnd(groupInfo.ventures.map((v) => v.name))}.{" "}
                  {groupInfo.founded} {groupInfo.growth}
                </p>
              </div>
            </Reveal>
            <Reveal
              variant="slide-left"
              delay={150}
              className="relative min-h-[260px] overflow-hidden rounded-lg lg:min-h-full"
            >
              <Image
                src={aboutCultureImage}
                alt="Mahindra Modi team culture"
                title="Mahindra Modi team culture"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-bg-2 py-10">
          <div className="container-px mx-auto grid max-w-[1400px] grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                variant="scale-up"
                className="text-center"
              >
                <p className="font-display text-2xl font-bold text-brand sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Core values */}
        <section className="bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                What Drives Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Our Core Values
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {groupInfo.values.map((v, i) => (
                <Reveal key={v.title} delay={i * 100} variant="scale-up">
                  <div className="h-full rounded-lg border border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]">
                    <h3 className="text-sm font-semibold text-text">{v.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mahindra & Mahindra credibility */}
        <section className="bg-brand-deep py-14 text-white lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Backed By
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Mahindra &amp; Mahindra: &ldquo;{mahindraFacts.tagline}&rdquo;
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">
                {mahindraFacts.foundedNote} Today, Mahindra is one of India&apos;s
                largest SUV makers, with {mahindraFacts.plant}{" "}
                {mahindraFacts.network}
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {mahindraFacts.csr.map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={i * 100}
                  variant="fade-up"
                  className="rounded-lg border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/70">
                        {c.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FAQ
          id="about-faq"
          data={aboutFaqData}
          title="About Mahindra Modi: Frequently Asked Questions"
          subtitle="Quick answers about our ownership, group and track record."
        />

        {/* CTA */}
        <section className="bg-white py-14 lg:py-16">
          <Reveal className="container-px mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Ready to visit a showroom?
            </h2>
            <p className="max-w-md text-sm text-muted">
              Book a free test drive or find your nearest Mahindra Modi
              showroom.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <TestDriveTrigger
                source="about_page"
                variant="button"
                className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TestDriveTrigger>
              <Link
                href="/locate-us"
                className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                Find a Showroom
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
