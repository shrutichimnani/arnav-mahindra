import type { Metadata } from "next";
import { Inter, Sora, Lato, Georama } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import TestDriveModalProvider from "@/components/TestDriveModalProvider";
import PhoneVerificationProvider from "@/components/PhoneVerificationProvider";

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
  "Compare new Mahindra cars, variants, colours and prices at Mahindra Modi. Book a test drive, request a transparent quote or schedule authorised Mahindra service across Thane, Navi Mumbai and Mumbai.";

export const metadata: Metadata = {
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
  alternates: { canonical: "/" },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable} ${lato.variable} ${georama.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd />
        <PhoneVerificationProvider>
          <TestDriveModalProvider>
            {children}
            <WhatsAppWidget />
          </TestDriveModalProvider>
        </PhoneVerificationProvider>
      </body>
    </html>
  );
}
