import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CarDetailClient from "@/components/CarDetailClient";
import { cars, formatINR, SITE_URL } from "@/lib/data";
import { getCarDetail, getCarGallery } from "@/lib/car-details";
import { DEALER_ID } from "@/lib/schema";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  const detail = getCarDetail(car);

  const displayName = "Mahindra " + car.name;
  const title = `${displayName}: Price, Specs, Colours & Test Drive | Mahindra Modi`;
  const description = `${detail.overview} ${car.priceOnRequest ? "Price on request." : `Starting at ${formatINR(car.priceINR)}* ex-showroom.`} Compare variants, colours, features and specifications, then book a Mahindra test drive with Mahindra Modi.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/cars/${car.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/cars/${car.slug}`,
      images: [{ url: car.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const displayName = "Mahindra " + car.name;
  const detail = getCarDetail(car);
  const gallery = getCarGallery(car);

  const carPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Car",
        "@id": `${SITE_URL}/cars/${car.slug}#product`,
        name: displayName,
        description: detail.overview,
        image: [car.image, ...gallery.map((image) => image.src)],
        brand: { "@type": "Brand", name: "Mahindra" },
        vehicleConfiguration: car.type,
        fuelType: car.fuel.replace(/\s·\s/g, ", "),
        vehicleEngine: { "@type": "EngineSpecification", name: car.engine },
        vehicleTransmission: car.transmission,
        numberOfSeats: car.seating,
        additionalProperty: detail.specifications.map((spec) => ({
          "@type": "PropertyValue",
          name: spec.label,
          value: spec.value,
        })),
        offers: {
          "@type": "Offer",
          price: car.priceINR,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": DEALER_ID },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cars", item: `${SITE_URL}/#cars` },
          {
            "@type": "ListItem",
            position: 3,
            name: displayName,
            item: `${SITE_URL}/cars/${car.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/cars/${car.slug}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the price of the ${displayName} in Mumbai?`,
            acceptedAnswer: { "@type": "Answer", text: car.priceOnRequest ? `The ${displayName} price is available on request. Contact Mahindra Modi in Thane for the latest on-road price in Mumbai, Navi Mumbai and surrounding areas.` : `The ${displayName} starts at ${formatINR(car.priceINR)} ex-showroom. Visit Mahindra Modi in Thane for the exact on-road price in Mumbai including RTO, insurance and registration.` },
          },
          {
            "@type": "Question",
            name: `How many variants does the ${displayName} offer?`,
            acceptedAnswer: { "@type": "Answer", text: `The ${displayName} is available in multiple variants across petrol and diesel engine options, with manual and automatic transmissions. Browse the full variant list and features on this page, or contact Mahindra Modi to compare trims.` },
          },
          {
            "@type": "Question",
            name: `What engine and mileage does the ${displayName} deliver?`,
            acceptedAnswer: { "@type": "Answer", text: `The ${displayName} comes with a ${car.engine} engine. Fuel efficiency varies by variant and driving conditions. Check the specifications section on this page for detailed mileage figures, or speak with a Mahindra Modi advisor.` },
          },
          {
            "@type": "Question",
            name: `What are the key features of the ${displayName}?`,
            acceptedAnswer: { "@type": "Answer", text: `The ${displayName} features include a touchscreen infotainment system, connected car technology, premium upholstery, automatic climate control, push-button start, multi-drive modes and advanced safety equipment. Browse the full feature breakdown on this page.` },
          },
          {
            "@type": "Question",
            name: `How safe is the ${displayName}?`,
            acceptedAnswer: { "@type": "Answer", text: `The ${displayName} offers comprehensive safety with multiple airbags, ABS with EBD, electronic stability control, hill-hold assist, ISOFIX child-seat anchors, a 360-degree camera on select variants and a reinforced body structure.` },
          },
          {
            "@type": "Question",
            name: `Where can I test drive the ${displayName}?`,
            acceptedAnswer: { "@type": "Answer", text: `You can book a ${displayName} test drive at Mahindra Modi in Thane. Choose a showroom visit or doorstep test drive across Thane, Navi Mumbai and Mumbai. Book online or call us directly to schedule your preferred time slot.` },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carPageSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main className="main-offset">
        <CarDetailClient car={car} />
      </main>
      <Footer />
    </>
  );
}
