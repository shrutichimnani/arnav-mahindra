/* ============================================================
   Content model for the Mahindra Modi landing page.
   Car lineup, images, pricing, engine and transmission specs are
   sourced from the official Mahindra auto site (auto.mahindra.com)
   and public pricing as listed on the dealer's own site
   (arnavautomobiles.com) so the dealership page matches real-world
   Mahindra data as closely as possible for a demo rebuild. NAP/
   location facts come from arnavautomobiles.com. Portrait/showroom
   photos use stock stand-ins where noted.
   ============================================================ */

/* Stock stand-ins for people, showroom buildings and a small number of
   models where no clean official product shot could be sourced. */
const stock = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Real Mahindra product photography, sourced directly from
   auto.mahindra.com's Demandware/Salesforce Commerce Cloud image CDN
   (dw/image/v2/BKRC_PRD/.../Sites-mahindra-product-catalog/...). Every
   URL below was fetched and confirmed to be a real, live image path on
   auto.mahindra.com during this build. */
const mahindra = (path: string) => `https://auto.mahindra.com${path}`;

/* Real full-bleed campaign banners (1920x829), pulled directly from the
   homepage hero carousel on auto.mahindra.com. These already carry the
   marketing headline/graphics baked into the photo itself, so the hero
   component shows them clean with no separate text overlay — matching
   the source site's own treatment exactly. */
const campaignBanner = (path: string) =>
  `https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/${path}`;

/* Indian numbering (lakh/crore) grouping, e.g. 1090700 -> "10,90,700". */
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ---- Canonical business identity (NAP), used everywhere + in schema ---- */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.arnavautomobiles.com";

export const company = {
  name: "Mahindra Modi",
  legalName: "Mahindra Modi (A Unit of Arnav Automobiles Pvt Ltd.)",
  tagline: "Explore the Impossible",
  phone: "84699 89900",
  phoneE164: "+918469989900",
  phoneSecondary: "82387 85050",
  phoneSecondaryE164: "+918238785050",
  whatsapp: "98929 29363",
  whatsappE164: "+919892929363",
  email: "info@arnavautomobiles.com",
  primaryAddress: {
    street: "Survey No 412, RD Ashar Compound, Road No 27, Wagle Ind. Estate",
    locality: "Thane West",
    region: "Maharashtra",
    postalCode: "400604",
    country: "IN",
  },
  // NOTE: confirm exact opening hours with the dealership before launch.
  hours: "Mon to Sun, 9:00 AM to 8:00 PM",
  hoursSpec: { days: "Mo-Su", opens: "09:00", closes: "20:00" },
  areasServed: ["Thane", "Navi Mumbai", "Mumbai"],
  stats: {
    carsSold: "10,000+",
    usedCarsSold: "5,000+",
    satisfaction: "97%",
    servicesDone: "150,000+",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

export const nav = {
  phone: company.phone,
  location: "Thane",
  links: [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/about" },
    { label: "Find a Car", href: "/cars" },
    { label: "Service", href: "/locate-service-centre" },
    { label: "Locate Us", href: "/locate-us" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};

/* ---- About Us page content ----
   Dealership facts sourced from arnavautomobiles.com. Parent group
   facts (values, brand portfolio, workforce/sales growth) sourced from
   gautammodigroup.com. Mahindra & Mahindra Ltd brand facts sourced
   from Mahindra's own public "About Us" / corporate history pages. */
export const aboutHeroImage = stock("photo-1560179707-f14e90ef3623", 1600);
export const contactHeroImage = "https://images.openai.com/static-rsc-4/F6mmuHO8pR2ZvITPmHE6WTwy5CJkRdbfTYOF1rrLfsO9AHPBLe5Sl3Kcna93SD-mwT2YRzoFFuPxQuCU8idLMy2P-PVlK5LW_Blvn8cRfTu9YaINq7a19W70B4r3i-mCRaKIVEsOra14tXN3Qea1Uy7KFthSBgeJlRWc29mYGPdAXdZq8wWg9iSWrN3qQimW?purpose=fullsize";
export const locateHeroImage = "https://images.openai.com/static-rsc-4/kgkFakE6WkrnihH4GLV-V194T5ssFKa-gZBuZaaIytuK6oTIBFIogvOo38RppSKOB47heF2AWTV_A5Xkbt7d_Cin2baS9tH9bdqWk8ArhLaYPDEgjjBUwLfDcXCZjWpndzTk9CiUNjXq-gy6pHGK5RXjCTzxLqOoOVHWCVQWe7pISyochzidbjYYCCr1sd7F?purpose=fullsize";
export const aboutCultureImage = "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/05/GNP01423.JPG-2048x1365.jpeg";
/* Real photo of the Mahindra Modi Thane showroom at dusk, sourced from the
   dealership's own Justdial listing (its catalogue photos, uploaded by the
   business itself). Used only for the About Us page hero. */
export const aboutPageHeroImage = "/about/showroom-dusk.jpg";

export const groupInfo = {
  name: "Gautam Modi Group",
  url: "https://gautammodigroup.com",
  founded:
    "Grown over decades from a 100-member team to a 3,500+ strong organisation.",
  growth:
    "Monthly sales have scaled from over 500 to more than 1,500 units, reflecting sustained market leadership and customer trust.",
  brands: ["Hyundai", "Audi", "Mahindra", "Kia", "MG"],
  ventures: [
    { name: "Krishiv Insurance", text: "Insurance solutions for vehicle owners." },
        { name: "ThinKarz", text: "The group's premium pre-owned vehicle brand." },
  ],
  values: [
    {
      title: "Exploring New Horizons",
      text: "Embracing new opportunities for growth and innovation.",
    },
    {
      title: "Nurturing Talents",
      text: "Empowering and developing our people to help them excel.",
    },
    {
      title: "Process with Tenacity",
      text: "Converting strategy into consistent, effective action.",
    },
    {
      title: "Grandiose Experience",
      text: "Creating meaningful experiences through recognition and service.",
    },
  ],
  headquarters:
    "Neo Vikram Building, Andheri Link Rd, Sahakar Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400053",
};

export const mahindraFacts = {
  tagline: "Rise",
  founded: 1945,
  foundedNote: "Founded as Mahindra & Mohammed in 1945; renamed Mahindra & Mahindra in 1948.",
  plant: "Major SUV manufacturing plants at Nashik and Chakan in Maharashtra, and Zaheerabad in Telangana.",
  network: "One of India's largest SUV makers, with a presence in 100+ countries worldwide.",
  milestone: "Decades of building India's most-loved SUVs, from the classic Bolero to the modern Thar and XUV 7XO.",
  csr: [
    {
      title: "Nanhi Kali",
      text: "The K.C. Mahindra Education Trust's programme supporting the education of underprivileged girls across India.",
    },
    {
      title: "Project Hariyali",
      text: "Mahindra's large-scale afforestation initiative, planting millions of trees across the country.",
    },
  ],
};

export const aboutFaqData = [
  {
    question: "Who owns Mahindra Modi?",
    answer:
      "Mahindra Modi is a unit of Arnav Automobiles Pvt Ltd, owned and operated by the Gautam Modi Group, an automotive business group that also represents Hyundai, Audi, Kia and MG in India.",
  },
  {
    question: "Is Mahindra Modi an authorised Mahindra dealership?",
    answer:
      "Yes. Mahindra Modi is an authorised Mahindra & Mahindra Ltd dealership, with a showroom and service centre in Thane and a dedicated XUV showroom in Airoli, Navi Mumbai.",
  },
  {
    question: "How experienced is the Mahindra Modi team?",
    answer:
      "As part of the Gautam Modi Group, our team draws on decades of combined dealership experience across multiple automotive brands, backed by trained sales consultants and factory-trained service technicians.",
  },
  {
    question: "Which cities does Mahindra Modi serve?",
    answer:
      "We serve Thane, Navi Mumbai and Mumbai, with a showroom and service centre in Wagle Industrial Estate, Thane, and an XUV showroom in Airoli.",
  },
  {
    question: "When was Mahindra & Mahindra founded?",
    answer:
      "Mahindra & Mahindra was founded in 1945 as Mahindra & Mohammed and renamed in 1948. Today it is one of India's largest SUV manufacturers, with plants in Nashik and Chakan (Maharashtra) and Zaheerabad (Telangana), and a presence in over 100 countries.",
  },
];

export type Slide = {
  model: string;
  image: string;
  alt: string;
  href: string;
};

/* Real hero campaign banners, pulled directly from the live homepage
   carousel on auto.mahindra.com (fetched and confirmed during this
   build). Shown clean, exactly as sourced — no text overlay added. */
export const heroSlides: Slide[] = [
  {
    model: "Mahindra XUV 3XO",
    image: campaignBanner("dw94c80559/X3XO/Adventure-Website-Banner-D.jpg.jpeg"),
    alt: "Mahindra XUV 3XO campaign banner, official homepage creative",
    href: "/cars/xuv-3xo",
  },
  {
    model: "Mahindra XUV 7XO",
    image: campaignBanner("dw0b3c978d/XUV-7XO/images/desktop/Desktop-Banner-Milestone-20k.jpeg"),
    alt: "Mahindra XUV 7XO milestone campaign banner, official homepage creative",
    href: "/cars/xuv-7xo",
  },
  {
    model: "Mahindra XUV 7XO",
    image: campaignBanner("dwe3d9c4de/XUV-7XO/images/desktop/BookingOpenBanner_desktop.jpg"),
    alt: "Mahindra XUV 7XO bookings-open campaign banner, official homepage creative",
    href: "/cars/xuv-7xo",
  },
  {
    model: "Mahindra XUV 3XO",
    image: campaignBanner("dw645d5f33/homepage/3XO-GST-Desktop-banner-1920x829_.jpg"),
    alt: "Mahindra XUV 3XO GST-benefit campaign banner, official homepage creative",
    href: "/cars/xuv-3xo",
  },
  {
    model: "Mahindra Adventure",
    image: campaignBanner("dw95680b82/homepage/1920x829-explorewebsite.jpg"),
    alt: "Mahindra Adventure campaign banner, official homepage creative",
    href: "/cars/thar-roxx",
  },
  {
    model: "Mahindra XUV 3XO",
    image: campaignBanner("dw8b17cac5/X3XO/XUV3XO-Website-Banner-02.jpg"),
    alt: "Mahindra XUV 3XO campaign banner, official homepage creative",
    href: "/cars/xuv-3xo",
  },
  {
    model: "Mahindra BE 6 / XEV 9e",
    image: campaignBanner("dw87734469/Freedom/F-NU_KV_1920x829_Desktop_Banner_01.png"),
    alt: "Mahindra BE range \"Freedom\" campaign banner, official homepage creative",
    href: "/cars/be-6",
  },
];

export type CarCategory = "SUV" | "Pickup" | "Electric" | "Commercial" | "MPV";

export type CarColor = { name: string; hex: string; image: string };

export type Car = {
  name: string;
  slug: string;
  type: string;
  category: CarCategory;
  price: string;
  priceINR: number;
  priceOnRequest?: boolean;
  engine: string;
  transmission: string;
  blurb: string;
  cta: string;
  fuel: string;
  image: string;
  alt: string;
  seating: string;
  mileage: string;
  bootSpace: string;
  highlights: string[];
  colors: CarColor[];
};

export type DetailSpec = { label: string; value: string };

export type CarDetail = {
  overview: string;
  idealFor: string;
  performance: string[];
  safety: string[];
  adas?: string[];
  interior: string[];
  exterior: string[];
  infotainment: string[];
  comfort: string[];
  variants: string[];
  specifications: DetailSpec[];
  warranty: string;
  sourceUrl: string;
};

export type GalleryImage = { src: string; alt: string; label: string; kind?: "styling" | "cabin" };

const lakh = (inr: number) => (inr / 100000).toFixed(2);

const slugify = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* Full lineup, pricing and specs are approximated from Mahindra's public
   ex-showroom pricing as listed on arnavautomobiles.com (the dealer's own
   site) and auto.mahindra.com model pages. Engine, transmission, mileage
   and dimension figures are realistic, well-known approximations for
   each model and may not reflect the exact current-year variant lineup —
   treat as demo/portfolio content, not a live price list. */
export const cars: Car[] = [
  {
    name: "Thar Roxx",
    slug: slugify("THAR ROXX"),
    type: "5-Door Lifestyle SUV",
    category: "SUV",
    price: lakh(1299000),
    priceINR: 1299000,
    engine: "2.0L mStallion Turbo Petrol, 2.2L mHawk Turbo Diesel",
    transmission: "6-Speed Manual, 6-Speed Torque Converter Automatic",
    fuel: "Petrol · Diesel",
    blurb: "The legendary Thar, stretched into a spacious 5-door SUV without losing its off-road soul.",
    cta: "Explore the Thar Roxx",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwa4de1cb1/images/TH5D/large/Thar_Roxx_602x339.png"),
    alt: "Mahindra Thar Roxx 5-door SUV, official product shot",
    colors: [
      { name: "Tango Red", hex: "#c20d0e", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw88fba8e2/images/TH5D/hires/AX7L_TangoRed_1366x443.png") },
      { name: "Deep Forest", hex: "#282d22", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw2e020505/images/TH5D/hires/AX7L_DeepForest_1366x443.png") },
      { name: "Burnt Sienna", hex: "#45241a", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwe5fbea3d/images/TH5D/hires/AX7L_BurntSienna_1366x443.png") },
      { name: "Nebula Blue", hex: "#07132a", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw80789913/images/TH5D/hires/AX7L_NebulaBlue_1366x443.png") },
      { name: "Battleship Grey", hex: "#768390", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw365b0853/images/TH5D/hires/AX7L_BattleshipGrey_1366x443.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw703e2a53/images/TH5D/hires/AX7L_StealthBlack_1366x443.png") },
      { name: "Citrine Yellow", hex: "#baa21b", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwb224ce64/images/TH5D/hires/AX7_StarEdn_1366x443_CitrineYellow.png") },
      { name: "Everest White", hex: "#cfcdcd", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw6571f9e8/images/TH5D/hires/AX7L_EverestWhite_1366x443.png") },
    ],
    seating: "5",
    mileage: "Up to 15.4 kmpl (diesel AT)",
    bootSpace: "460 litres",
    highlights: [
      "Available 4x4 with low-range transfer case",
      "Segment-first ADAS with 6 airbags",
      "Dual-tone interior with 10.25\" infotainment",
      "Removable roof panels on select variants",
    ],
  },
  {
    name: "XUV 3XO",
    slug: slugify("XUV 3XO"),
    type: "Compact SUV",
    category: "SUV",
    price: lakh(749000),
    priceINR: 749000,
    engine: "1.2L Turbo Petrol, 1.5L Diesel",
    transmission: "5/6-Speed Manual, 6-Speed AMT/Automatic",
    fuel: "Petrol · Diesel",
    blurb: "Mahindra's bold compact SUV, successor to the XUV300, with segment-leading ADAS and a sunroof.",
    cta: "Explore the XUV 3XO",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwc4930484/images/X3XO/large/S220_602x339.png"),
    alt: "Mahindra XUV 3XO compact SUV, official product shot",
    colors: [
      { name: "Citrine Yellow", hex: "#baa21b", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw0d6dd80c/images/X3XO/hires/AX5L_CitrineYellow_1366x443.png") },
      { name: "Dune Beige", hex: "#907b61", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw7b9a007e/images/X3XO/hires/AX5L_DuneBeige_1366x443.png") },
      { name: "Deep Forest", hex: "#282d22", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw06c3ccc1/images/X3XO/hires/AX5L_DeepForest_1366x443.png") },
      { name: "Galaxy Grey", hex: "#575a63", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwa7da6b81/images/X3XO/hires/AX5L_GalaxyGrey_1366x443.png") },
      { name: "Nebula Blue", hex: "#07132a", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw2a7d82dd/images/X3XO/hires/AX5L_NebulaBlue_1366x443.png") },
      { name: "Tango Red", hex: "#970211", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw4f41d370/images/X3XO/hires/AX5L_TangoRed_1366x443.png") },
      { name: "Everest White", hex: "#cfcdcd", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw1b03c2ed/images/X3XO/hires/AX5L_EverestWhite_1366x443.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw77b8d021/images/X3XO/hires/AX7L_StealthBlack_GG_1366x443.png") },
    ],
    seating: "5",
    mileage: "Up to 20.6 kmpl (petrol)",
    bootSpace: "364 litres",
    highlights: [
      "Level 2 ADAS with 6 airbags standard on higher trims",
      "Segment-first dual 10.25\" curved displays",
      "Panoramic sunroof and 360-degree camera",
      "Harman Kardon premium sound system",
    ],
  },
  {
    name: "Thar",
    slug: slugify("THAR"),
    type: "Off-Road Lifestyle SUV",
    category: "SUV",
    price: lakh(1125000),
    priceINR: 1125000,
    engine: "2.0L mStallion Turbo Petrol, 2.2L mHawk Turbo Diesel",
    transmission: "6-Speed Manual, 6-Speed Torque Converter Automatic",
    fuel: "Petrol · Diesel",
    blurb: "India's original off-road icon: true 4x4 capability, an open-top option and a cult following.",
    cta: "Explore the Thar",
    image: "/cars/thar-arnav-transparent.png",
    alt: "Mahindra Thar off-road SUV, dealer product shot",
    colors: [
      { name: "Tango Red", hex: "#970211", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw76e19b28/images/THRN/hires/Thar_LXT_TangoRed_1366x443.png") },
      { name: "Deep Forest", hex: "#282d22", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwcd7ecc85/images/THRN/hires/Thar_LX_DeepForest_1366x443.png") },
      { name: "Galaxy Grey", hex: "#575a63", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwab841fec/images/THRN/hires/Thar_LX_GalaxyGrey_1366x443.png") },
      { name: "Battleship Grey", hex: "#768390", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw70ac4a24/images/THRN/hires/Thar_LXT_BattleshipGrey_1366x443.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw76e63b95/images/THRN/hires/Thar_LXT_StealthBlack_1366x443.png") },
      { name: "Everest White", hex: "#cfcdcd", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw68963132/images/THRN/hires/Thar_LXT_EverestWhite_1366x443.png") },
    ],
    seating: "4",
    mileage: "Up to 15.2 kmpl (diesel manual)",
    bootSpace: "Minimal - rear bench folds for cargo",
    highlights: [
      "Body-on-frame ladder chassis with 4x4",
      "Low-range transfer case for serious off-roading",
      "Convertible soft-top / hard-top options",
      "6 airbags and ESC standard across the range",
    ],
  },
  {
    name: "Scorpio-N",
    slug: slugify("SCORPIO-N"),
    type: "Mid-size SUV",
    category: "SUV",
    price: lakh(1360199),
    priceINR: 1360199,
    engine: "2.0L mStallion Turbo Petrol, 2.2L mHawk Turbo Diesel",
    transmission: "6-Speed Manual, 6-Speed Automatic",
    fuel: "Petrol · Diesel",
    blurb: "Big Daddy is back: a commanding new-generation SUV with a muscular design and modern tech.",
    cta: "Explore the Scorpio-N",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw14737114/images/SCN/large/ScorpioN_602x339.png"),
    alt: "Mahindra Scorpio-N mid-size SUV, official product shot",
    colors: [
      { name: "Deep Forest", hex: "#282d22", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw2122aa6b/images/SCN/hires/Z8_DeepForest_1366x443.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwd657fcab/images/SCN/hires/Z8_NapoliBlack_1366x443.png") },
      { name: "Everest White", hex: "#bab9b9", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw9eb0fee1/images/SCN/hires/Z8_EverestWhite_1366x443.png") },
      { name: "Valyrian Silver", hex: "#7d8088", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwb2d5ba35/images/SCN/hires/Z8_DazzlingSIlver_1366x443.png") },
      { name: "Midnight Black", hex: "#171f3c", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwcf2fdc79/images/SCN/hires/Z8_MidnightBlack_1366x443.png") },
    ],
    seating: "7",
    mileage: "Up to 16.7 kmpl (diesel manual)",
    bootSpace: "192 litres (third row up), expandable",
    highlights: [
      "Available 4XPLOR all-wheel-drive system",
      "Segment-first 5 drive modes and 6 terrain modes",
      "Panoramic sunroof and second-row captain seats",
      "6 airbags, ESC and hill-hold standard",
    ],
  },
  {
    name: "Scorpio Classic",
    slug: slugify("SCORPIO CLASSIC"),
    type: "Body-on-Frame SUV",
    category: "SUV",
    price: lakh(1358600),
    priceINR: 1358600,
    engine: "2.2L mHawk Turbo Diesel",
    transmission: "6-Speed Manual, 6-Speed Automatic",
    fuel: "Diesel",
    blurb: "The rugged, original Scorpio silhouette carries on, body-on-frame toughness and all.",
    cta: "Explore the Scorpio Classic",
    image: "/cars/scorpio-classic-fixed.png",
    alt: "Mahindra Scorpio Classic SUV, official product shot",
    colors: [
      { name: "Galaxy Grey", hex: "#575a63", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw8a0e9f57/images/SCRC/hires/S11_GalaxyGrey_1366x443.png") },
      { name: "Diamond White", hex: "#ffffff", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw224ea0b6/images/SCRC/hires/S11_EverestWhite_1366x443.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw723b4af1/images/SCRC/hires/S11_StealthBlack_1366x443.png") },
      { name: "Everest White", hex: "#cfcdcd", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw224ea0b6/images/SCRC/hires/S11_EverestWhite_1366x443.png") },
    ],
    seating: "7 / 9",
    mileage: "Up to 15.4 kmpl",
    bootSpace: "Third-row bench, expandable",
    highlights: [
      "Rugged body-on-frame ladder chassis",
      "High ground clearance for tough roads",
      "Available in 7- and 9-seat layouts",
      "Trusted mHawk diesel engine",
    ],
  },
  {
    name: "XUV 7XO",
    slug: slugify("XUV 7XO"),
    type: "5/7-Seater Flagship SUV",
    category: "SUV",
    price: lakh(1399001),
    priceINR: 1399001,
    engine: "2.0L mStallion Turbo Petrol, 2.2L mHawk Turbo Diesel",
    transmission: "6-Speed Manual, 6-Speed Automatic",
    fuel: "Petrol · Diesel",
    blurb: "Mahindra's flagship SUV, renamed from XUV700: ADAS Level 2, a panoramic sunroof and a segment-leading feature list.",
    cta: "Explore the XUV 7XO",
    image: "/cars/xuv7xo.png",
    alt: "Mahindra XUV 7XO flagship SUV, official product shot",
    colors: [
      { name: "Ruby Velvet", hex: "#2d0406", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw536c3d34/images/X7XO/hires/AX7L_1366x443_RubyVelvet.png") },
      { name: "Everest White", hex: "#bab9b9", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw4c3f1b83/images/X7XO/hires/AX7L_1366x443_EverestWhite.png") },
      { name: "Nebula Blue", hex: "#0A161F", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwc336e24d/images/X7XO/hires/AX7L_1366x443_NebulaBlue.png") },
      { name: "Midnight Black", hex: "#171f3c", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw8c867731/images/X7XO/hires/AX7L_1366x443_MidNightBlack.png") },
      { name: "Desert Myst", hex: "#ded6ce", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwcfcf0938/images/X7XO/hires/AX7L_1366x443_DesertMyst.png") },
      { name: "Galaxy Grey", hex: "#575a63", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw5090da23/images/X7XO/hires/AX7L_1366x443_GalaxyGrey.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw840db8e9/images/X7XO/hires/AX7L_1366x443_StealthBlack.png") },
    ],
    seating: "5 / 7",
    mileage: "Up to 17 kmpl (petrol) / 18.3 kmpl (diesel)",
    bootSpace: "240 litres (7-seat, third row up), expandable",
    highlights: [
      "Level 2 ADAS with adaptive cruise control",
      "Dual 10.25\" screens with Amazon Alexa built-in",
      "Sony 3D audio with 12 speakers on top trims",
      "7 airbags across the range",
    ],
  },
  {
    name: "Marazzo",
    slug: slugify("MARAZZO"),
    type: "MPV",
    category: "MPV",
    price: lakh(1439400),
    priceINR: 1439400,
    engine: "1.5L mHawk100 Turbo Diesel",
    transmission: "6-Speed Manual",
    fuel: "Diesel",
    blurb: "A spacious, comfortable MPV built for families and long road trips, with room for up to 8.",
    cta: "Explore the Marazzo",
    image: "/cars/marazzo-arnav.webp",
    alt: "Mahindra Marazzo MPV, dealer product shot",
    colors: [
      { name: "Everest White", hex: "#cfcdcd", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw624c0294/images/MRZO/large/marazzo_1_white_900x439.png") },
    ],
    seating: "6 / 7 / 8",
    mileage: "Up to 17.6 kmpl",
    bootSpace: "Expandable with third row folded",
    highlights: [
      "Flexible 6, 7 and 8-seat configurations",
      "Segment-first First Row Captain Seats",
      "High ground clearance for varied road conditions",
      "Wide cabin with abundant headroom and legroom",
    ],
  },
  {
    name: "Bolero",
    slug: slugify("BOLERO"),
    type: "Rugged SUV",
    category: "SUV",
    price: lakh(989600),
    priceINR: 989600,
    engine: "1.5L mHawk75 Diesel",
    transmission: "5-Speed Manual",
    fuel: "Diesel",
    blurb: "Decades of rugged reliability, high ground clearance and unmatched go-anywhere capability.",
    cta: "Explore the Bolero",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw2de0a99b/images/BOL/large/BoleroClassic_602x339.png"),
    alt: "Mahindra Bolero SUV, official product shot",
    colors: [
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw9bf83765/images/BOL/hires/B8_Stealth_Black_1366x443.png") },
      { name: "Diamond White", hex: "#e3dfd0", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwef286e0f/images/BOL/hires/B8_Diamond_White_1366x443.png") },
      { name: "Dsat Silver", hex: "#4e4e51", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw8e8775f8/images/BOL/hires/B8_Dsat_Silver_1366x443.png") },
      { name: "Rockey Beige", hex: "#242612", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw8944ff50/images/BOL/hires/B8_Rockey_Beige_1366x443.png") },
    ],
    seating: "7",
    mileage: "Up to 17 kmpl",
    bootSpace: "Third-row bench, expandable",
    highlights: [
      "India's best-selling rugged SUV nameplate",
      "High ground clearance and body-on-frame build",
      "Low running costs and strong resale value",
      "Trusted by fleets and individual owners alike",
    ],
  },
  {
    name: "Bolero Neo",
    slug: slugify("BOLERO NEO"),
    type: "Compact SUV",
    category: "SUV",
    price: lakh(989600),
    priceINR: 989600,
    engine: "1.5L mHawk75 Turbo Diesel",
    transmission: "5-Speed Manual",
    fuel: "Diesel",
    blurb: "A compact, tough SUV that blends Bolero ruggedness with a more modern cabin and features.",
    cta: "Explore the Bolero Neo",
    image: "/cars/bolero-neo-fixed.png",
    alt: "Mahindra Bolero Neo compact SUV, official product shot",
    colors: [
      { name: "Jeans Blue DT", hex: "#071f35", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw58759e71/images/NEO/hires/N11_Jeans_Blue_1366x443.png") },
      { name: "Stealth Black", hex: "#060505", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw43729440/images/NEO/hires/N11_Stealth_Black_1366x443.png") },
      { name: "Rockey Beige", hex: "#242612", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwea5a7ad0/images/NEO/hires/N10_Opt_Rocky_Beige.png") },
      { name: "Pearl White", hex: "#b0a9a4", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw3a9400c0/images/NEO/hires/N11_Everest_White_1366x443.png") },
      { name: "Diamond White", hex: "#e3dfd0", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw3a9400c0/images/NEO/hires/N11_Everest_White_1366x443.png") },
      { name: "Pearl White DT", hex: "#cfcdcd", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw3a9400c0/images/NEO/hires/N11_Everest_White_1366x443.png") },
      { name: "Jeans Blue", hex: "#071f35", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw5770d0c0/images/NEO/hires/N10_Opt_Jeans_Blue.png") },
    ],
    seating: "7",
    mileage: "Up to 17.5 kmpl",
    bootSpace: "Third-row bench, expandable",
    highlights: [
      "Ladder-frame toughness in a compact footprint",
      "200 mm ground clearance for rough roads",
      "Touchscreen infotainment on higher trims",
      "Strong low-end torque for loaded conditions",
    ],
  },
  {
    name: "Bolero Neo Plus",
    slug: slugify("BOLERO NEO PLUS"),
    type: "9-Seater SUV",
    category: "SUV",
    price: lakh(1139000),
    priceINR: 1139000,
    engine: "2.2L mHawk Turbo Diesel",
    transmission: "6-Speed Manual",
    fuel: "Diesel",
    blurb: "A rugged, ladder-frame 9-seater built for large families and fleet duty, with genuine three-row space.",
    cta: "Explore the Bolero Neo Plus",
    image: "/cars/bolero-neo-plus-fixed.png",
    alt: "Mahindra Bolero Neo Plus 9-seater SUV, official product shot",
    colors: [
      { name: "Dsat Silver", hex: "#4e4e51", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw9a84dc83/images/NEOP/hires/P10_MajesticSilver_1366x443.png") },
      { name: "Diamond White", hex: "#e3dfd0", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwc69e00d8/images/NEOP/hires/P10_DiamondWhite_1366x443.png") },
      { name: "Napoli Black", hex: "#242424", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw87aaac3e/images/NEOP/hires/P10_NapoliBlack_1366x443.png") },
    ],
    seating: "9",
    mileage: "Up to 14 kmpl",
    bootSpace: "Third-row jump seats, expandable",
    highlights: [
      "Body-on-frame, ladder-chassis toughness",
      "Genuine 9-seat, three-row capacity",
      "Rear AC vents across 2nd and 3rd rows",
      "Dual front airbags, ABS with EBD and ESP standard",
    ],
  },
  {
    name: "XUV400",
    slug: slugify("XUV400"),
    type: "Electric SUV",
    category: "Electric",
    price: lakh(1549000),
    priceINR: 1549000,
    engine: "Permanent Magnet Synchronous Motor",
    transmission: "Single-Speed Automatic",
    fuel: "Electric",
    blurb: "Blistering acceleration, a long real-world range and Mahindra's familiar SUV comfort, now electric.",
    cta: "Explore the XUV400",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dweb7ab251/images/X400/large/XUV400_602x339.png"),
    alt: "Mahindra XUV400 electric SUV, official product shot",
    /* XUV400's official page lists these colour names in its spec table, but
       unlike the other models its "colour experience" is a WebGL 3D viewer,
       not swap-on-click photos — no per-colour hex or image exists in its
       page at all. The hex values below are Mahindra's own values for these
       exact same paint names, confirmed from other current-lineup models on
       auto.mahindra.com (Thar/XUV7XO/Scorpio-N above); the single shared
       image mirrors the source site's own lack of a per-colour photo. */
    colors: [
      { name: "Stealth Black", hex: "#060505", image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dweb7ab251/images/X400/large/XUV400_602x339.png") },
      { name: "Galaxy Grey", hex: "#575a63", image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dweb7ab251/images/X400/large/XUV400_602x339.png") },
      { name: "Nebula Blue", hex: "#07132a", image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dweb7ab251/images/X400/large/XUV400_602x339.png") },
      { name: "Everest White", hex: "#cfcdcd", image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dweb7ab251/images/X400/large/XUV400_602x339.png") },
    ],
    seating: "5",
    mileage: "Up to 456 km range per charge (MIDC, 39.4 kWh)",
    bootSpace: "378 litres",
    highlights: [
      "0-100 kmph in under 9 seconds",
      "Fast charging, 0-80% in about 50 minutes",
      "Familiar, spacious XUV cabin",
      "6 airbags and ESC standard",
    ],
  },
  {
    name: "XEV 9e",
    slug: slugify("XEV 9e"),
    type: "Electric SUV Coupe",
    category: "Electric",
    price: "On Request",
    priceINR: 2190000,
    priceOnRequest: true,
    engine: "Dual Permanent Magnet Synchronous Motors (AWD option)",
    transmission: "Single-Speed Automatic",
    fuel: "Electric",
    blurb: "Mahindra's flagship electric SUV coupe, with a dual-screen cockpit and a bold coupe silhouette.",
    cta: "Explore the XEV 9e",
    image: "/cars/xev9e-rubyvelvet-transparent.png",
    alt: "Mahindra XEV 9e electric SUV coupe in Ruby Velvet, product shot (CarDekho)",
    colors: [
      { name: "Ruby Velvet", hex: "#2d0406", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw89803c7f/images/XEV9E/m_hires_gallery/Ruby%20Velvet/1-1.jpg" },
      { name: "Deep Forest", hex: "#282d22", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw413d5f2a/images/XEV9E/m_hires_gallery/Deep%20Forest/205A1252.jpg" },
      { name: "Desert Myst", hex: "#C0BEB7", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwa725bb7e/images/XEV9E/m_hires_gallery/Desert%20Myst%20Gloss/205A1271.jpg" },
      { name: "Tango Red", hex: "#970211", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw615d5b6c/images/XEV9E/m_hires_gallery/Tango%20Red/1-1.jpg" },
      { name: "Everest White", hex: "#cfcdcd", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw39f02b90/images/XEV9E/m_hires_gallery/Everest%20White%20Gloss/1-1.jpg" },
      { name: "Stealth Black", hex: "#060505", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwfa8d64e6/images/XEV9E/m_hires_gallery/Stealth%20Black/205A0780.jpg" },
      { name: "Nebula Blue", hex: "#07132a", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwe87fcc7e/images/XEV9E/m_hires_gallery/Nebula%20Blue/205A0825.jpg" },
      { name: "Desert Myst Satin", hex: "#C0BEB7", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw69a1ac2b/images/CINE-LUXE/hires/Desert_Myst_Matte_1366x600.png" },
    ],
    seating: "5",
    mileage: "Up to 656 km range per charge (claimed, long-range battery)",
    bootSpace: "663 litres, plus front trunk",
    highlights: [
      "Built on Mahindra's dedicated INGLO EV platform",
      "Dual 12.3\" curved displays with Level 2 ADAS",
      "Coupe-SUV silhouette with a low drag coefficient",
      "Available all-wheel-drive dual-motor layout",
    ],
  },
  {
    name: "BE 6",
    slug: slugify("BE 6"),
    type: "Electric SUV Coupe",
    category: "Electric",
    price: "On Request",
    priceINR: 1890000,
    priceOnRequest: true,
    engine: "Permanent Magnet Synchronous Motor",
    transmission: "Single-Speed Automatic",
    fuel: "Electric",
    blurb: "A striking electric SUV coupe from Mahindra's new BE range, engineered on the INGLO EV platform.",
    cta: "Explore the BE 6",
    image: "/cars/be6-everest-white.png",
    alt: "Mahindra BE 6 electric SUV coupe in Everest White, official product image",
    colors: [
      { name: "Everest White", hex: "#cfcdcd", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwb5cf69b8/images/BE6/m_hires_gallery/Everest%20White%20-%20Gloss/205A1064.jpg" },
      { name: "Firestorm Orange", hex: "#F2745E", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw56364db8/images/BE6/m_hires_gallery/Firestrom%20Orange/1.jpg" },
      { name: "Desert Myst", hex: "#C0BEB7", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwc14fc1c7/images/BE6/m_hires_gallery/Desert%20Myst%20-%20Gloss/1739270871509.jpg" },
      { name: "Desert Myst Satin", hex: "#C0BEB7", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwe945155b/images/BE6/m_hires_gallery/Desert%20Myst%20-%20Satin/205A1173.jpg" },
      { name: "Tango Red", hex: "#970211", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw4c801fa2/images/BE6/m_hires_gallery/Tango%20Red/205A1298.jpg" },
      { name: "Everest White Satin", hex: "#cfcdcd", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwa62aab68/images/BE6/m_hires_gallery/Everest%20White%20-%20Satin/205A1373.jpg" },
      { name: "Stealth Black", hex: "#060505", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dw6052aec8/images/BE6/m_hires_gallery/Stealth%20Black/205A1333-2.jpg" },
      { name: "Deep Forest", hex: "#282d22", image: "https://www.mahindraelectricsuv.com/on/demandware.static/-/Sites-esuv-product-catalog/default/dwec8dd633/images/BE6/m_hires_gallery/Deep%20Forest/205A1127.jpg" },
    ],
    seating: "5",
    mileage: "Up to 682 km range per charge (claimed, long-range battery)",
    bootSpace: "455 litres, plus front trunk",
    highlights: [
      "Built on Mahindra's dedicated INGLO EV platform",
      "Futuristic coupe-SUV design language",
      "Level 2 ADAS and a digital-first cockpit",
      "Rapid DC fast-charging capability",
    ],
  },
  {
    name: "Bolero Maxx Pik-Up",
    slug: slugify("BOLERO MAXX PIK-UP"),
    type: "Pickup Truck",
    category: "Pickup",
    price: lakh(818999),
    priceINR: 818999,
    engine: "1.5L mHawk Diesel",
    transmission: "5-Speed Manual",
    fuel: "Diesel",
    blurb: "A tough, high-payload pickup built for small business owners who need reliability every single day.",
    cta: "Explore the Bolero Maxx Pik-Up",
    image: "/cars/bolero-maxx-pikup.webp",
    alt: "Mahindra Bolero Maxx Pik-Up pickup truck, official image from Arnav Automobiles",
    /* Mahindra's official pickup line only lists a single "Bolero Pik-up"
       model (no separate "Bolero Maxx Pik-up" product exists on
       auto.mahindra.com), and that model is offered in one colour only. */
    colors: [
      { name: "White", hex: "#e3dfd0", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw43b21d88/images/PUP/hires/26_01_PIK-UP_Desktop%20_1366x443_OUTDOOR.png") },
    ],
    seating: "2 / 3",
    mileage: "Up to 17 kmpl",
    bootSpace: "1,440 kg rated payload",
    highlights: [
      "High rated payload for business use",
      "Rugged body-on-frame commercial build",
      "Low cost of ownership and easy servicing",
      "Backed by Mahindra's wide service network",
    ],
  },
  {
    name: "Supro Profit Truck",
    slug: slugify("SUPRO PROFIT TRUCK"),
    type: "Small Commercial Truck",
    category: "Commercial",
    price: lakh(611808),
    priceINR: 611808,
    engine: "1.5L mDI Diesel",
    transmission: "5-Speed Manual",
    fuel: "Diesel",
    blurb: "A compact, agile mini-truck built for last-mile delivery and small-load commercial operators.",
    cta: "Explore the Supro Profit Truck",
    image: "/cars/supro-profit-truck.webp",
    alt: "Mahindra Supro Profit Truck, official image from Arnav Automobiles",
    colors: [
      { name: "Everest White", hex: "#F2F1EC", image: "/cars/supro-profit-truck.webp" },
      { name: "Napoli Black", hex: "#16181A", image: "/cars/supro-profit-truck.webp" },
    ],
    seating: "2",
    mileage: "Up to 22 kmpl",
    bootSpace: "750 kg rated payload",
    highlights: [
      "Compact footprint for narrow city lanes",
      "Strong low-end torque for loaded starts",
      "Low maintenance, high uptime design",
      "Ideal for last-mile and intra-city delivery",
    ],
  },
  {
    name: "Maxx City CNG",
    slug: slugify("MAXX CITY CNG"),
    type: "CNG Pickup",
    category: "Commercial",
    price: lakh(846000),
    priceINR: 846000,
    engine: "1.5L Bi-Fuel Petrol with CNG",
    transmission: "5-Speed Manual",
    fuel: "Petrol · CNG",
    blurb: "A factory-fitted CNG pickup built for operators who want lower running costs on every trip.",
    cta: "Explore the Maxx City CNG",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw318e4450/images/MAXX/large/MAXX.png"),
    alt: "Mahindra Maxx City CNG pickup, official product shot",
    /* Official model is "Bolero MaXX City"; CNG is a fuelType variant of the
       same product, not a separate colour-branded model, and it's offered
       in one colour only. */
    colors: [
      { name: "White", hex: "#e3dfd0", image: mahindra("/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw9b809732/images/MAXX/hires/Gallery%20and%20colour_Studio%201366x443.png") },
    ],
    seating: "2 / 3",
    mileage: "Up to 14.5 km/kg (CNG)",
    bootSpace: "1,025 kg rated payload",
    highlights: [
      "Factory-fitted CNG for low running costs",
      "Strong payload for city commercial duty",
      "Compact turning radius for tight streets",
      "Backed by Mahindra's dealer service network",
    ],
  },
];

export const trust = [
  {
    icon: "shield",
    title: "Authorised Mahindra Dealer",
    text: "Every car, part and accessory is 100% genuine, sourced directly from Mahindra & Mahindra Ltd.",
  },
  {
    icon: "users",
    title: "10,000+ Cars Sold",
    text: "A trusted Mahindra dealer across Thane and Navi Mumbai, with a 97% customer satisfaction score.",
  },
  {
    icon: "network",
    title: "Wide Sales & Service Network",
    text: "A showroom and service centre in Thane, plus a dedicated XUV showroom in Airoli, Navi Mumbai.",
  },
  {
    icon: "rupee",
    title: "Easy Finance & Exchange",
    text: "Flexible EMI plans, fast loan approvals, and instant exchange value on your old car.",
  },
  {
    icon: "wrench",
    title: "Expert Service",
    text: "Factory-trained technicians who work exclusively with genuine Mahindra parts.",
  },
];

export type Offer = {
  title: string;
  amount: string;
  caption: string;
  icon: string;
};

export const offers: Offer[] = [
  {
    title: "Cash Discount",
    amount: "₹50,000",
    caption: "Instant savings on select Mahindra models this season.",
    icon: "gift",
  },
  {
    title: "Exchange Bonus",
    amount: "₹40,000",
    caption: "Extra value when you trade in your old car.",
    icon: "car",
  },
  {
    title: "Corporate Benefit",
    amount: "₹40,000",
    caption: "Special pricing for corporate and fleet buyers.",
    icon: "users",
  },
];

export const services = [
  {
    icon: "wrench",
    title: "Periodic Maintenance",
    text: "Manufacturer-recommended service schedules, done right the first time.",
  },
  {
    icon: "shield",
    title: "Mahindra Genuine Parts",
    text: "Only authentic, warranty-backed Mahindra parts, never aftermarket substitutes.",
  },
  {
    icon: "truck",
    title: "Free Pickup & Drop",
    text: "We collect your car for service and drop it back, at no extra cost.",
  },
  {
    icon: "road",
    title: "24x7 Roadside Assistance",
    text: "Stuck on the road? Help is one call away, any time, any day.",
  },
  {
    icon: "badge",
    title: "Extended Warranty",
    text: "Extend your protection well beyond the standard warranty cover.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

/* NOTE: demo reviews with stock avatars. Replace with real, attributable
   customer reviews before launch; do not build AggregateRating schema
   from these placeholder figures. */
export const testimonials: Testimonial[] = [
  {
    name: "Rahul Mehta",
    role: "Scorpio-N owner",
    rating: 5,
    text: "The team walked me through every variant without any pressure. Delivery was on time and the car was spotless.",
    avatar: stock("photo-1500648767791-00dcc994a43e", 200),
  },
  {
    name: "Sneha Iyer",
    role: "XUV 3XO owner",
    rating: 5,
    text: "Booking to delivery was smooth and completely transparent. The finance desk got me a rate I did not expect.",
    avatar: stock("photo-1494790108377-be9c29b29330", 200),
  },
  {
    name: "Amit Verma",
    role: "XUV 7XO owner",
    rating: 5,
    text: "Service here is genuinely a step above. They explained the work, shared photos and stuck to the estimate.",
    avatar: stock("photo-1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "Priya Nair",
    role: "Thar owner",
    rating: 5,
    text: "As a first-time SUV buyer I had endless questions. They were patient and helped me pick the right variant for my budget.",
    avatar: stock("photo-1438761681033-6461ffad8d80", 200),
  },
  {
    name: "Karan Malhotra",
    role: "Thar Roxx owner, Thane",
    rating: 5,
    text: "The Thar Roxx handover was flawless. Great attention to detail and no last-minute surprises on the on-road price.",
    avatar: stock("photo-1506794778202-cad84cf45f1d", 200),
  },
  {
    name: "Deepa Rao",
    role: "Bolero owner, Thane",
    rating: 5,
    text: "Serviced my Bolero at the Wagle Estate centre. Quick, courteous, and the free pickup and drop saved me a whole day.",
    avatar: stock("photo-1544005313-94ddf0286df2", 200),
  },
  {
    name: "Farhan Shaikh",
    role: "XUV 7XO owner, Navi Mumbai",
    rating: 5,
    text: "Booked from the Airoli showroom. They were upfront about the waiting period and kept me updated the whole way.",
    avatar: stock("photo-1633332755192-727a05c4013d", 200),
  },
  {
    name: "Anjali Desai",
    role: "XUV400 owner, Mumbai",
    rating: 5,
    text: "Loved how patient they were with a first-time EV buyer. The charging and finance options were explained clearly, no jargon.",
    avatar: stock("photo-1580489944761-15a19d654956", 200),
  },
];

export const faqData = [
  {
    question: "How do I book a test drive at Mahindra Modi?",
    answer:
      "You can book a test drive online using the form on this page, or by calling us on 84699 89900. Once you share your details, our team will confirm your preferred date, time and location, at our showroom or your home.",
  },
  {
    question: "Do you offer car finance and exchange?",
    answer:
      "Yes. We work with leading banks to offer flexible EMI plans and quick loan approvals, plus instant exchange value on your existing car.",
  },
  {
    question: "Can I book my car service online?",
    answer:
      "Yes. Use Book a Service from the menu or footer to choose your model, preferred service centre and a convenient date, and our team will call to confirm.",
  },
  {
    question: "What is the warranty period on a new Mahindra car?",
    answer:
      "New Mahindra cars come with the standard manufacturer warranty, with optional extended warranty plans available. Our sales team can confirm the exact coverage for your chosen model.",
  },
  {
    question: "Do you accept trade-ins for old cars?",
    answer:
      "Yes. We evaluate your current vehicle and offer an exchange bonus you can apply against your new Mahindra's on-road price.",
  },
  {
    question: "Which areas does Mahindra Modi serve?",
    answer:
      "We have a Mahindra showroom and service centre in Thane, plus a dedicated XUV showroom in Airoli, serving Thane, Navi Mumbai and Mumbai.",
  },
  {
    question: "What documents do I need to buy a car from Mahindra Modi?",
    answer:
      "You will typically need photo ID, address proof, passport-size photographs and PAN details. Our team will guide you through the exact paperwork for cash or finance purchases.",
  },
];

export type Blog = {
  date: string;
  title: string;
  category: string;
  image: string;
  alt: string;
};

export const blogs: Blog[] = [
  {
    date: "24 Jun 2026",
    category: "Models",
    title: "Thar Roxx vs Thar: which one should you actually buy?",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwa4de1cb1/images/TH5D/large/Thar_Roxx_602x339.png"),
    alt: "Mahindra Thar Roxx exterior styling",
  },
  {
    date: "18 Jun 2026",
    category: "Ownership",
    title: "Why the XUV 7XO is the family road-trip SUV to beat",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw3a9ff783/images/X7XO/large/AX7L_602x339_RubyVelvet.png"),
    alt: "Mahindra XUV 7XO on a family road trip",
  },
  {
    date: "09 Jun 2026",
    category: "Service",
    title: "5 Monsoon Car-Care Tips Every Mahindra Owner Should Know",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw14737114/images/SCN/large/ScorpioN_602x339.png"),
    alt: "Mahindra Scorpio-N SUV in the monsoon, car-care tips",
  },
  {
    date: "02 Jun 2026",
    category: "Finance",
    title: "Car Loan or Lease in 2026: Which Actually Saves You More?",
    image: mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwc4930484/images/X3XO/large/S220_602x339.png"),
    alt: "Mahindra XUV 3XO parked outdoors",
  },
];

export type Location = {
  name: string;
  type: "Showroom" | "Service Centre";
  city: string;
  address: string;
  phone: string;
  image: string;
  mapsUrl: string;
};

/* Real Mahindra Modi outlets, sourced from the parent Gautam Modi Group's
   own business listing (gautammodigroup.com/business/), including their
   actual branch photography and Google Maps links. */
export const locations: Location[] = [
  {
    name: "Mahindra - Thane Showroom",
    type: "Showroom",
    city: "Thane",
    address: "Survey No 412, Ashar Compound, Rd No 27, Wagle Industrial Estate, Thane West, Maharashtra 400604",
    phone: "84699 89900",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Mahindra-thane-showoom-scaled.jpeg",
    mapsUrl: "https://maps.app.goo.gl/hV126JsMg6duaCmE9",
  },
  {
    name: "Mahindra - Airoli Showroom",
    type: "Showroom",
    city: "Navi Mumbai",
    address: "Hissa No 1, Akshar Green World, Shop 27A 27B, Gate 242, Thane Belapur Rd, Airoli, Maharashtra 400708",
    phone: "82387 85050",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/mahindra-airoli-showroom.jpeg",
    mapsUrl: "https://maps.app.goo.gl/LgYCDcro2fgQ7zceA",
  },
  {
    name: "Mahindra - South Mumbai",
    type: "Showroom",
    city: "Mumbai",
    address: "Unit 48, 69 Atria - The Millennium Mall, Dr Annie Besant Rd, Lotus Colony, Worli, Mumbai, Maharashtra 400018",
    phone: "84699 89900",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/04/Untitled-design-31.png",
    mapsUrl: "https://maps.app.goo.gl/rAW8jjtkcfj6HXZNA",
  },
  {
    name: "Mahindra - Charkop Service Centre",
    type: "Service Centre",
    city: "Mumbai",
    address: "Plot 95/96, Mahatma Gandhi Rd, Hindustan Naka, Charkop Industrial Estate, Kandivali West, Mumbai, Maharashtra 400067",
    phone: "84699 89900",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/charkop-_1_.png-scaled.jpg",
    mapsUrl: "https://maps.app.goo.gl/cgV166Va4iuyVuky7",
  },
  {
    name: "Mahindra - Sewri Service Center",
    type: "Service Centre",
    city: "Mumbai",
    address: "Sewree Fort, Best Saparia Sub Station, Sewri - Chembur Rd, BPCL Complex, Sewri, Mumbai, Maharashtra 400015",
    phone: "84699 89900",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/04/Sewri-workshop-image.png",
    mapsUrl: "https://maps.app.goo.gl/GbXbyiRbsUHrxUr58",
  },
];

/* Curated subset for the footer's "Popular Cars" column, so it doesn't
   list all the models. */
const popularNames = ["Thar Roxx", "XUV 7XO", "Scorpio-N", "Thar", "XUV 3XO", "Bolero"];
export const popularCars = popularNames
  .map((n) => cars.find((c) => c.name === n))
  .filter((c): c is Car => Boolean(c));

export const testDriveImage = mahindra("/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw14737114/images/SCN/large/ScorpioN_602x339.png");
export const serviceHeroImage = "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/charkop-_1_.png-2048x1365.jpg";
export const carModels = cars.map((c) => c.name);
export const cityOptions = ["Thane", "Navi Mumbai", "Mumbai"];
export const serviceCentres = locations.filter((l) => l.type === "Service Centre");
