import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import BackLink from "@/components/BackLink";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy | Mahindra Modi",
  description: "Privacy Policy for Mahindra Modi - Arnav Automobiles Pvt Ltd.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "60px" }}>
        <section className="bg-bg-2 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[800px]">
            <BackLink />
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Legal
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                Privacy Policy
              </h1>
            </Reveal>
          </div>
        </section>
        <section className="bg-white py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[800px] space-y-6 text-[15px] leading-relaxed text-muted">
            <p>
              Mahindra Modi, a unit of Arnav Automobiles Pvt Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;),
              is committed to protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose and safeguard your information when you visit our
              website or use our services.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information that you voluntarily provide when
              you fill out forms on our website, including but not limited to your
              name, mobile number, email address, pincode, vehicle preferences and
              any messages you send us. We also automatically collect certain
              information through cookies and similar technologies, such as your IP
              address, browser type and browsing patterns.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to process your test drive bookings,
              service appointments and enquiries; to communicate with you about
              our products, services and offers; to improve our website and customer
              experience; and to comply with legal obligations.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              3. Sharing Your Information
            </h2>
            <p>
              We do not sell, trade or rent your personal information to third parties.
              We may share your information with authorised service providers who
              assist us in operating our business, such as our CRM and
              communication tools. We may also disclose information where required
              by law or to protect our rights.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              4. Data Retention
            </h2>
            <p>
              We retain your personal information only for as long as necessary to
              fulfil the purposes outlined in this policy, unless a longer retention
              period is required or permitted by law.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, correct or delete your personal
              information. You may also withdraw your consent to our processing of
              your data at any time. To exercise these rights, please contact us
              using the details on our Contact Us page.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              6. Cookies
            </h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You
              can control cookie preferences through your browser settings. Please
              note that disabling cookies may affect certain features of the site.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date. We
              encourage you to review this policy periodically.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us
              at our showroom in Thane or through the Contact Us page on
              our website.
            </p>

            <h2 className="font-display text-lg font-bold text-text">
              9. Communications and NDNC Consent
            </h2>
            <p>
              By sharing your contact details (mobile number, email, etc.) through
              any form, enquiry, test drive booking, or service request on this
              website, you expressly consent to receive communication from Mahindra
              Modi / Arnav Automobiles Pvt Ltd via call, SMS, WhatsApp, email, or
              other electronic means regarding our products, services, offers, and
              transactional updates.
            </p>
            <p>
              We respect the National Do Not Call (NDNC) registry and TRAI
              regulations. Your information is not shared with any third party for
              telemarketing purposes. If at any time you wish to stop receiving
              promotional communications from us, you may opt out by replying
              &ldquo;STOP&rdquo; to any SMS, using the unsubscribe link in our
              emails, or by contacting our showroom directly. We will process
              your opt-out request within a reasonable timeframe as prescribed
              under applicable regulations.
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
