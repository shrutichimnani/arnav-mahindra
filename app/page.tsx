import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import TestDrive from "@/components/TestDrive";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import HomeSeoContent from "@/components/HomeSeoContent";

const title = "New Mahindra Cars, Test Drives & Authorised Service in Thane | Mahindra Modi";
const description =
  "Compare new Mahindra cars, book a test drive, or schedule authorised service at Mahindra Modi in Thane, Airoli and Worli.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: "Mahindra Modi",
    title,
    description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedVehicles />
        <TestDrive />
        <HomeSeoContent />
        <Services />
        <Testimonials />
        <FAQ />
        <Locations />
      </main>
      <Footer />
    </>
  );
}
