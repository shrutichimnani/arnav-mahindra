import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { company, SITE_URL } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BlogsExplorer from "@/components/BlogsExplorer";
import BlogsSearch from "@/components/BlogsSearch";
import { TestDriveTrigger } from "@/components/TestDriveModalProvider";
import Reveal from "@/components/Reveal";
import RestoreScroll from "@/components/RestoreScroll";

const title = "Mahindra SUV Blogs: Reviews, Buying Guides & Ownership Tips | Mahindra Modi";
const description = "Expert Mahindra reviews, car buying guides, ownership tips and the latest SUV news from Mahindra Modi, your authorised dealer in Thane, Navi Mumbai and Mumbai.";

export const metadata: Metadata = {
  title,
  description,
    alternates: { canonical: `${SITE_URL}/blogs` },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/blogs`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const blogPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/blogs#webpage`,
      url: `${SITE_URL}/blogs`,
      name: "Mahindra Modi Blogs",
      description,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
      ],
    },
  ],
};

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main className="min-h-screen bg-white pb-20 main-offset">
        <RestoreScroll />
        {/* HERO SECTION */}
        <section className="relative w-full h-[320px] lg:h-[420px] overflow-hidden bg-brand-deep">
          <Image
            src="/images/blogs/blogs-hero.webp"
            alt="Mahindra SUV on a road trip"
            title="Mahindra SUV on a road trip"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_25%] sm:object-[70%_30%] lg:object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div className="hero-safe absolute inset-x-0 bottom-0 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Blogs
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                The Mahindra Modi Journal
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Your destination for the latest Mahindra news, expert reviews, buying guides, ownership tips and more.
              </p>
              <div className="mt-6">
                <BlogsSearch />
              </div>
            </Reveal>
          </div>
        </section>

        <div className="container-px mx-auto max-w-[1200px] mt-8 lg:mt-12">
          <BlogsExplorer />

          {/* CTA BOTTOM BANNER */}
          <section className="mt-20 relative overflow-hidden rounded-2xl bg-brand-deep px-6 py-12 text-center md:px-12 md:py-16 shadow-xl">
            <div className="absolute inset-0 z-0 opacity-40">
              <Image src="/images/blogs/blogs-cta-banner.webp" alt="Mahindra SUV on an open road" title="Book a test drive" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                Need Help Choosing the Right Mahindra?
              </h2>
              <p className="mb-8 text-sm text-white/80 md:text-base max-w-lg mx-auto">
                Our experts are here to help you find the perfect SUV tailored to your lifestyle and budget.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <TestDriveTrigger source="blog_listing" variant="button" className="w-full sm:w-auto rounded-md border border-white/30 bg-black/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black">
                  Book a Test Drive
                </TestDriveTrigger>
                <Link href="/contact-us" className="w-full sm:w-auto rounded-md border border-white/30 bg-black/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black">
                  Get a Quote
                </Link>
                <Link href={`tel:${company.phoneE164}`} className="w-full sm:w-auto rounded-md border border-white/30 bg-black/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black">
                  Call Dealer
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
