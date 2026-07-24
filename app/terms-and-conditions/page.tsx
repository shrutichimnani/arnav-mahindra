import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Mahindra Modi - Arnav Automobiles Pvt Ltd.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="bg-bg-2 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[800px]">
            <Link
              href="/"
              className="mb-6 inline-flex w-fit items-center gap-1 text-xs font-semibold text-muted hover:text-text transition-colors"
            >
              &larr; Back
            </Link>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Legal
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                Terms &amp; Conditions
              </h1>
            </Reveal>
          </div>
        </section>
        <section className="bg-white py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[800px] space-y-6 text-[15px] leading-relaxed text-muted">
            <p>
              Welcome to Mahindra Modi, a unit of Arnav Automobiles Pvt Ltd
              (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). By accessing and using this
              website, you agree to be bound by the following terms and
              conditions. If you do not agree with any part of these terms, please
              do not use our website.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              1. Use of the Website
            </h2>
            <p>
              The content on this website is for general information and enquiry
              purposes only. We strive to keep pricing, specifications and
              availability information accurate and up to date, but we make no
              warranties or guarantees of any kind. All prices shown are
              ex-showroom unless otherwise stated, and may vary by city, variant
              and applicable taxes.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              2. Test Drives and Service Bookings
            </h2>
            <p>
              Booking a test drive or service appointment through this website
              creates a request only. A Mahindra Modi representative will contact
              you to confirm availability, timing and any applicable terms.
              Confirmation is subject to vehicle availability, service centre
              capacity and other operational factors.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              3. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, images, logos and
              graphics, is the property of Mahindra Modi, Arnav Automobiles Pvt
              Ltd, or its licensors (including Mahindra &amp; Mahindra Ltd). You
              may not reproduce, distribute or use any content without prior
              written permission.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              4. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites, including
              the official Mahindra website, social media platforms and finance
              partners. We are not responsible for the content, policies or
              practices of any third-party site.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Mahindra Modi and Arnav
              Automobiles Pvt Ltd shall not be liable for any direct, indirect,
              incidental or consequential damages arising from your use of this
              website or reliance on any information provided herein.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              6. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of India. Any disputes arising from these
              terms shall be subject to the exclusive jurisdiction of the courts
              in Thane, Maharashtra.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting on this page. Your
              continued use of the website after any changes constitutes your
              acceptance of the updated terms.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              8. Contact Information
            </h2>
            <p>
              For any questions about these Terms &amp; Conditions, please visit
              our Contact Us page or call our showroom in Thane.
            </p>

            <p className="mt-10 text-xs text-faint">
              Last updated: July 2026
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
