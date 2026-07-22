import Link from "next/link";
import { company } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BlogsExplorer from "@/components/BlogsExplorer";
import BlogsSearch from "@/components/BlogsSearch";
import { TestDriveTrigger } from "@/components/TestDriveModalProvider";
import Reveal from "@/components/Reveal";
import RestoreScroll from "@/components/RestoreScroll";

export const metadata = {
  title: "Blogs | Mahindra Modi",
  description: "Your destination for the latest Mahindra news, expert reviews, buying guides, ownership tips and more.",
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main className="min-h-screen bg-white pb-20" style={{ marginTop: "60px" }}>
        <RestoreScroll />
        {/* HERO SECTION */}
        <section className="relative w-full h-[320px] lg:h-[420px] overflow-hidden bg-brand-deep">
          <img
            src="https://images.openai.com/static-rsc-4/2-rneBaVaVsIBFdEGXpmmGoOWdSfa4cb4XyyJnVgUVTYwQTwwcJkIb2TLd7RidKxoGLJcDoErq49htcIjIzdrHjUua1RyHGMc-z6LSCeLNiqHI6X3kZaC04GX5IlWh30tKIL_r__g9I8OF7eR6oEPkfsnkAAUsb4V8-zAL9i-44nLdlQ6O2wIhk0AxZDFCqP?purpose=fullsize"
            alt="Mahindra SUV on a road trip"
            className="absolute inset-0 w-full h-full object-cover object-[70%_center] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
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
          <section className="mt-20 relative overflow-hidden rounded-2xl bg-[#0a0a0a] px-6 py-12 text-center md:px-12 md:py-16 shadow-xl">
            <div className="absolute inset-0 z-0 opacity-40">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                Need Help Choosing the Right Mahindra?
              </h3>
              <p className="mb-8 text-sm text-white/80 md:text-base max-w-lg mx-auto">
                Our experts are here to help you find the perfect SUV tailored to your lifestyle and budget.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <TestDriveTrigger variant="button" className="w-full sm:w-auto rounded-md bg-brand px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-light">
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
