import type { Metadata } from "next";
import { Inter, Sora, Lato, Georama } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import TestDriveModalProvider from "@/components/TestDriveModalProvider";
import PhoneVerificationProvider from "@/components/PhoneVerificationProvider";
import MobileBottomBar from "@/components/MobileBottomBar";
import UtmCapture from "@/components/UtmCapture";
import ScrollPositionRestore from "@/components/ScrollPositionRestore";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* Site-wide body/heading fonts, matching auto.mahindra.com (Lato body
   copy, Georama headings). Inter/Sora above are kept loaded and applied
   only to the main menu and the logo lockup, which stay on their
   original fonts per that exception. */
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const title = "New Mahindra Cars, Test Drives & Authorised Service in Thane | Mahindra Modi";
const description =
  "Compare new Mahindra cars, book a test drive, or schedule authorised service at Mahindra Modi in Thane, Airoli and Worli.";

export const metadata: Metadata = {
  // SITE_URL already resolves NEXT_PUBLIC_SITE_URL with a production
  // fallback (see lib/data.ts) — reusing it here keeps metadataBase in
  // sync with the canonical/OG url below instead of duplicating the
  // env-var lookup with a different (localhost) fallback.
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Mahindra Modi",
  },
  description,
  applicationName: "Mahindra Modi",
  keywords: [
    "Mahindra Modi",
    "Mahindra dealer Thane",
    "Mahindra showroom Thane",
    "Mahindra test drive",
    "Mahindra service Thane",
    "Mahindra Thar Roxx price",
    "Mahindra XUV 7XO",
    "Mahindra Scorpio-N",
    "Mahindra XUV 3XO",
    "authorised Mahindra dealer Navi Mumbai",
  ],
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${sora.variable} ${lato.variable} ${georama.variable}`}
      // The scroll-restoration script below sets style.visibility on this
      // element before React hydrates, outside React's control — expected
      // to differ from the server-rendered markup, so don't warn about it.
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased pb-16 md:pb-0">
        {/* A raw <script> tag, deliberately not next/script: next/script's
            "beforeInteractive" only *fetches* early in this Next.js version
            — it doesn't literally land in the served HTML as a blocking
            <script>, so it still runs after first paint (visible as the
            page flashing at the top before jumping to the restored scroll
            position). A plain inline script tag here is real HTML, parsed
            and executed synchronously by the browser before anything below
            it can paint.

            Chrome/Firefox restore the previous scroll offset on a plain
            reload (not just back/forward), but they do it before the page
            has grown to its final height, so the restored position can
            land past the (still short) bottom. Disabling native scroll
            restoration here stops that, and ScrollPositionRestore below
            does the restore itself once the page is actually tall enough
            — hiding the page synchronously (before any paint) in the
            meantime, and revealing it right after the scroll lands. */}
        <script
          id="disable-scroll-restoration"
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history){history.scrollRestoration='manual';}var __sy=sessionStorage.getItem('scrollY:'+location.pathname);if(__sy&&parseInt(__sy,10)>0){document.documentElement.style.visibility='hidden';setTimeout(function(){document.documentElement.style.visibility='';},2000);}}catch(e){}",
          }}
        />
        <JsonLd />
        <ScrollPositionRestore />
        <PhoneVerificationProvider>
          <TestDriveModalProvider>
            {children}
            <WhatsAppWidget />
            <MobileBottomBar />
            <UtmCapture />
          </TestDriveModalProvider>
        </PhoneVerificationProvider>
      </body>
    </html>
  );
}
