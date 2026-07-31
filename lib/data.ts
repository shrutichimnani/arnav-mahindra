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
  phoneSecondary: company.phoneSecondary,
  location: "Thane",
  links: [
    { label: "Home", href: "/" },
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
export const contactHeroImage = "/images/contact/contact-hero.webp";
export const locateHeroImage = "/images/locate-us/locate-hero.webp";
export const aboutCultureImage = "/about/team-culture.webp";
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
  /** Portrait mobile version of `image`, built by scripts/build-mobile-hero-crops.js:
      the headline band and the car band are each cropped from the source
      banner and stacked vertically, so phones get both the text and the
      car — the way auto.mahindra.com's own hand-made portrait creative
      reads — instead of one flat crop of the landscape banner losing
      one or the other. Regenerate with `node scripts/build-mobile-hero-crops.js`
      after editing the crop rects in that file. */
  // Optional: some slides have no usable mobile composite (the build
  // script's crop rects clipped a headline or the disclaimer text for
  // that particular banner) — omit both fields for those and Hero.tsx
  // falls back to the same object-cover treatment used on tablet/desktop
  // instead of showing a broken crop.
  mobileImage?: string;
  /** width/height of mobileImage (logged by the build script). Each
      composite ends up a different shape depending on how much of the
      source banner its text/car bands needed, so Hero.tsx sizes the
      mobile hero to this ratio per slide instead of forcing every slide
      into one fixed box — which would just crop these composites the
      same way the flat single-image crop did. */
  mobileAspect?: number;
  // Horizontal object-position (0-100) for the desktop `image` when it's
  // cover-cropped at tablet/desktop widths. The banners aren't framed with
  // their headline centred — some skew left, some right — so a single
  // "center" anchor clips the headline or disclaimer text off one edge
  // once the box is narrower than the source banner. Defaults to 50
  // (center) when omitted. Tuned by eye against each source image.
  heroFocusX?: number;
};

/* Real hero campaign banners, pulled directly from the live homepage
   carousel on auto.mahindra.com (fetched and confirmed during this
   build). Shown clean, exactly as sourced — no text overlay added. */
export const heroSlides: Slide[] = [
  {
    model: "Mahindra XUV 3XO",
    image: "/images/home/hero-xuv3xo-adventure.jpg",
    alt: "Mahindra XUV 3XO campaign banner, official homepage creative",
    href: "/cars/xuv-3xo",
    // No mobileImage: the build script's crop clips the "BORN" headline
    // at the left edge on this banner — falls back to object-cover.
    heroFocusX: 80,
  },
  {
    model: "Mahindra XUV 7XO",
    image: "/images/home/hero-xuv7xo-milestone.jpg",
    alt: "Mahindra XUV 7XO milestone campaign banner, official homepage creative",
    href: "/cars/xuv-7xo",
    // No mobileImage: the build script's crop clips the "Thank you"
    // disclaimer at the left edge and has a visible seam between the
    // headline/car bands on this banner — falls back to object-cover.
  },
  {
    model: "Mahindra XUV 7XO",
    image: "/images/home/hero-xuv7xo-booking.jpg",
    alt: "Mahindra XUV 7XO bookings-open campaign banner, official homepage creative",
    href: "/cars/xuv-7xo",
    mobileImage: "/images/home/mobile/hero-xuv7xo-booking-mobile.jpg",
    mobileAspect: 1080 / 775,
  },
  {
    model: "Mahindra XUV 3XO",
    image: "/images/home/hero-xuv3xo-gst.jpg",
    alt: "Mahindra XUV 3XO GST-benefit campaign banner, official homepage creative",
    href: "/cars/xuv-3xo",
    mobileImage: "/images/home/mobile/hero-xuv3xo-gst-mobile.jpg",
    mobileAspect: 1080 / 1030,
    heroFocusX: 88,
  },
  {
    model: "Mahindra Adventure",
    image: "/images/home/hero-adventure-explore.jpg",
    alt: "Mahindra Adventure campaign banner, official homepage creative",
    href: "/cars/thar-roxx",
    mobileImage: "/images/home/mobile/hero-adventure-explore-mobile.jpg",
    mobileAspect: 1080 / 1461,
    heroFocusX: 22,
  },
  {
    model: "Mahindra XUV 3XO",
    image: "/images/home/hero-xuv3xo-banner.jpg",
    alt: "Mahindra XUV 3XO campaign banner, official homepage creative",
    href: "/cars/xuv-3xo",
    mobileImage: "/images/home/mobile/hero-xuv3xo-banner-mobile.jpg",
    mobileAspect: 1080 / 1054,
    heroFocusX: 25,
  },
  {
    model: "Mahindra BE 6 / XEV 9e",
    image: "/images/home/hero-be6-freedom.png",
    alt: "Mahindra BE range \"Freedom\" campaign banner, official homepage creative",
    href: "/cars/be-6",
    mobileImage: "/images/home/mobile/hero-be6-freedom-mobile.jpg",
    mobileAspect: 1080 / 1621,
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
    image: "/cars/thar-roxx.png",
    alt: "Mahindra Thar Roxx 5-door SUV, official product shot",
    colors: [
      { name: "Tango Red", hex: "#c20d0e", image: "/images/cars/colors/AX7L_TangoRed.png" },
      { name: "Deep Forest", hex: "#282d22", image: "/images/cars/colors/AX7L_DeepForest.png" },
      { name: "Burnt Sienna", hex: "#45241a", image: "/images/cars/colors/AX7L_BurntSienna.png" },
      { name: "Nebula Blue", hex: "#07132a", image: "/images/cars/colors/AX7L_NebulaBlue.png" },
      { name: "Battleship Grey", hex: "#768390", image: "/images/cars/colors/AX7L_BattleshipGrey.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/AX7L_StealthBlack.png" },
      { name: "Citrine Yellow", hex: "#baa21b", image: "/images/cars/colors/AX7_StarEdn_CitrineYellow.png" },
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/AX7L_EverestWhite.png" },
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
    image: "/cars/xuv-3xo.png",
    alt: "Mahindra XUV 3XO compact SUV, official product shot",
    colors: [
      { name: "Citrine Yellow", hex: "#baa21b", image: "/images/cars/colors/AX5L_CitrineYellow.png" },
      { name: "Dune Beige", hex: "#907b61", image: "/images/cars/colors/AX5L_DuneBeige.png" },
      { name: "Deep Forest", hex: "#282d22", image: "/images/cars/colors/AX5L_DeepForest.png" },
      { name: "Galaxy Grey", hex: "#575a63", image: "/images/cars/colors/AX5L_GalaxyGrey.png" },
      { name: "Nebula Blue", hex: "#07132a", image: "/images/cars/colors/AX5L_NebulaBlue.png" },
      { name: "Tango Red", hex: "#970211", image: "/images/cars/colors/AX5L_TangoRed.png" },
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/AX5L_EverestWhite.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/AX7L_StealthBlack_GG.png" },
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
      { name: "Tango Red", hex: "#970211", image: "/images/cars/colors/Thar_LXT_TangoRed.png" },
      { name: "Deep Forest", hex: "#282d22", image: "/images/cars/colors/Thar_LX_DeepForest.png" },
      { name: "Galaxy Grey", hex: "#575a63", image: "/images/cars/colors/Thar_LX_GalaxyGrey.png" },
      { name: "Battleship Grey", hex: "#768390", image: "/images/cars/colors/Thar_LXT_BattleshipGrey.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/Thar_LXT_StealthBlack.png" },
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/Thar_LXT_EverestWhite.png" },
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
    image: "/cars/scorpio-n.png",
    alt: "Mahindra Scorpio-N mid-size SUV, official product shot",
    colors: [
      { name: "Deep Forest", hex: "#282d22", image: "/images/cars/colors/Z8_DeepForest.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/Z8_NapoliBlack.png" },
      { name: "Everest White", hex: "#bab9b9", image: "/images/cars/colors/Z8_EverestWhite.png" },
      { name: "Valyrian Silver", hex: "#7d8088", image: "/images/cars/colors/Z8_DazzlingSIlver.png" },
      { name: "Midnight Black", hex: "#171f3c", image: "/images/cars/colors/Z8_MidnightBlack.png" },
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
      { name: "Galaxy Grey", hex: "#575a63", image: "/images/cars/colors/S11_GalaxyGrey.png" },
      { name: "Diamond White", hex: "#ffffff", image: "/images/cars/colors/S11_EverestWhite.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/S11_StealthBlack.png" },
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/S11_EverestWhite.png" },
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
      { name: "Ruby Velvet", hex: "#2d0406", image: "/images/cars/colors/AX7L_RubyVelvet.png" },
      { name: "Everest White", hex: "#bab9b9", image: "/images/cars/colors/AX7L_EverestWhite.png" },
      { name: "Nebula Blue", hex: "#0A161F", image: "/images/cars/colors/AX7L_NebulaBlue.png" },
      { name: "Midnight Black", hex: "#171f3c", image: "/images/cars/colors/AX7L_MidNightBlack.png" },
      { name: "Desert Myst", hex: "#ded6ce", image: "/images/cars/colors/AX7L_DesertMyst.png" },
      { name: "Galaxy Grey", hex: "#575a63", image: "/images/cars/colors/AX7L_GalaxyGrey.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/AX7L_StealthBlack.png" },
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
    // Uses the same studio cutout as the listing card (`image` above) —
    // same fix as Bolero Maxx Pik-Up / Maxx City CNG: the detail page's
    // hero should match the card instead of a different studio crop.
    colors: [
      { name: "Everest White", hex: "#cfcdcd", image: "/cars/marazzo-arnav.webp" },
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
    image: "/cars/bolero.png",
    alt: "Mahindra Bolero SUV, official product shot",
    colors: [
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/B8_Stealth_Black.png" },
      { name: "Diamond White", hex: "#e3dfd0", image: "/images/cars/colors/B8_Diamond_White.png" },
      { name: "Dsat Silver", hex: "#4e4e51", image: "/images/cars/colors/B8_Dsat_Silver.png" },
      { name: "Rockey Beige", hex: "#242612", image: "/images/cars/colors/B8_Rockey_Beige.png" },
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
      { name: "Jeans Blue DT", hex: "#071f35", image: "/images/cars/colors/N11_Jeans_Blue.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/N11_Stealth_Black.png" },
      { name: "Rockey Beige", hex: "#242612", image: "/images/cars/colors/N10_Opt_Rocky_Beige.png" },
      { name: "Pearl White", hex: "#b0a9a4", image: "/images/cars/colors/N11_Everest_White.png" },
      { name: "Diamond White", hex: "#e3dfd0", image: "/images/cars/colors/N11_Everest_White.png" },
      { name: "Pearl White DT", hex: "#cfcdcd", image: "/images/cars/colors/N11_Everest_White.png" },
      { name: "Jeans Blue", hex: "#071f35", image: "/images/cars/colors/N10_Opt_Jeans_Blue.png" },
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
      { name: "Dsat Silver", hex: "#4e4e51", image: "/images/cars/colors/P10_MajesticSilver.png" },
      { name: "Diamond White", hex: "#e3dfd0", image: "/images/cars/colors/P10_DiamondWhite.png" },
      { name: "Napoli Black", hex: "#242424", image: "/images/cars/colors/P10_NapoliBlack.png" },
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
    image: "/cars/xuv400.png",
    alt: "Mahindra XUV400 electric SUV, official product shot",
    // Real per-colour photos (base/single-tone variant), downloaded from
    // auto.mahindra.com/suv/xuv400/X400.html#variants and stored locally
    // under public/images/cars/colors/ — previously all four swatches
    // pointed at the same generic shot, so switching colour never changed
    // the photo. "Stealth Black" is renamed to "Napoli Black": Mahindra's
    // own site doesn't sell a solid "Stealth Black" for this model, only a
    // dualtone; Napoli Black is the real solid-black paint name and photo.
    // Nebula Blue is listed first — it's the closest match to the blue
    // dualtone shot used as the listing-card image (`image` above), and
    // colors[0] is the colour the detail page opens on by default.
    colors: [
      { name: "Nebula Blue", hex: "#07132a", image: "/images/cars/colors/XUV400_NebulaBlue.png" },
      { name: "Napoli Black", hex: "#0a0a0a", image: "/images/cars/colors/XUV400_NapoliBlack.webp" },
      { name: "Galaxy Grey", hex: "#575a63", image: "/images/cars/colors/XUV400_GalaxyGrey.webp" },
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/XUV400_EverestWhite.webp" },
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
    // Real per-colour photos, downloaded from Mahindra's own XEV 9e
    // configurator (mahindraelectricsuv.com/own-online/variant-selection?pid=MXV9)
    // and stored locally — replaces the previous set of colour images.
    // "Desert Myst Satin" is dropped: the real configurator only offers 7
    // colours for this model, and that one wasn't among them.
    colors: [
      { name: "Ruby Velvet", hex: "#2d0406", image: "/images/cars/colors/XEV9E_RubyVelvet.png" },
      { name: "Deep Forest", hex: "#282d22", image: "/images/cars/colors/XEV9E_DeepForest.png" },
      { name: "Desert Myst", hex: "#C0BEB7", image: "/images/cars/colors/XEV9E_DesertMyst.png" },
      { name: "Tango Red", hex: "#970211", image: "/images/cars/colors/XEV9E_TangoRed.png" },
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/XEV9E_EverestWhite.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/XEV9E_StealthBlack.png" },
      { name: "Nebula Blue", hex: "#07132a", image: "/images/cars/colors/XEV9E_NebulaBlue.png" },
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
    // Real per-colour photos, downloaded from Mahindra's own BE 6
    // configurator (mahindraelectricsuv.com/own-online/variant-selection?pid=MBE6)
    // and stored locally — replaces the previous set of colour images.
    colors: [
      { name: "Everest White", hex: "#cfcdcd", image: "/images/cars/colors/BE6_EverestWhite.png" },
      { name: "Firestorm Orange", hex: "#F2745E", image: "/images/cars/colors/BE6_FirestormOrange.png" },
      { name: "Desert Myst", hex: "#C0BEB7", image: "/images/cars/colors/BE6_DesertMyst.png" },
      { name: "Desert Myst Satin", hex: "#C0BEB7", image: "/images/cars/colors/BE6_DesertMystSatin.png" },
      { name: "Tango Red", hex: "#970211", image: "/images/cars/colors/BE6_TangoRed.png" },
      { name: "Everest White Satin", hex: "#cfcdcd", image: "/images/cars/colors/BE6_EverestWhiteSatin.png" },
      { name: "Stealth Black", hex: "#060505", image: "/images/cars/colors/BE6_StealthBlack.png" },
      { name: "Deep Forest", hex: "#282d22", image: "/images/cars/colors/BE6_DeepForest.png" },
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
       auto.mahindra.com), and that model is offered in one colour only.
       Uses the same studio cutout as the listing card (`image` above) —
       the outdoor lifestyle shot this pointed to previously didn't match
       the card and looked out of place as the detail page's hero. */
    colors: [
      { name: "White", hex: "#e3dfd0", image: "/cars/bolero-maxx-pikup.webp" },
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
    image: "/cars/maxx-city-cng.png",
    alt: "Mahindra Maxx City CNG pickup, official product shot",
    /* Official model is "Bolero MaXX City"; CNG is a fuelType variant of the
       same product, not a separate colour-branded model, and it's offered
       in one colour only. Uses the same studio cutout as the listing card
       (`image` above) — same fix as Bolero Maxx Pik-Up: the detail page's
       hero should match the card, not a different studio/gallery crop. */
    colors: [
      { name: "White", hex: "#e3dfd0", image: "/cars/maxx-city-cng.png" },
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
    avatar: "/images/testimonials/rahul-mehta.jpg",
  },
  {
    name: "Sneha Iyer",
    role: "XUV 3XO owner",
    rating: 5,
    text: "Booking to delivery was smooth and completely transparent. The finance desk got me a rate I did not expect.",
    avatar: "/images/testimonials/sneha-iyer.jpg",
  },
  {
    name: "Amit Verma",
    role: "XUV 7XO owner",
    rating: 5,
    text: "Service here is genuinely a step above. They explained the work, shared photos and stuck to the estimate.",
    avatar: "/images/testimonials/amit-verma.jpg",
  },
  {
    name: "Priya Nair",
    role: "Thar owner",
    rating: 5,
    text: "As a first-time SUV buyer I had endless questions. They were patient and helped me pick the right variant for my budget.",
    avatar: "/images/testimonials/priya-nair.jpg",
  },
  {
    name: "Karan Malhotra",
    role: "Thar Roxx owner, Thane",
    rating: 5,
    text: "The Thar Roxx handover was flawless. Great attention to detail and no last-minute surprises on the on-road price.",
    avatar: "/images/testimonials/karan-malhotra.jpg",
  },
  {
    name: "Deepa Rao",
    role: "Bolero owner, Thane",
    rating: 5,
    text: "Serviced my Bolero at the Wagle Estate centre. Quick, courteous, and the free pickup and drop saved me a whole day.",
    avatar: "/images/testimonials/deepa-rao.jpg",
  },
  {
    name: "Farhan Shaikh",
    role: "XUV 7XO owner, Navi Mumbai",
    rating: 5,
    text: "Booked from the Airoli showroom. They were upfront about the waiting period and kept me updated the whole way.",
    avatar: "/images/testimonials/farhan-shaikh.jpg",
  },
  {
    name: "Anjali Desai",
    role: "XUV400 owner, Mumbai",
    rating: 5,
    text: "Loved how patient they were with a first-time EV buyer. The charging and finance options were explained clearly, no jargon.",
    avatar: "/images/testimonials/anjali-desai.jpg",
  },
];

export const faqData = [
  {
    question: "How do I book a test drive at Mahindra Modi?",
    answer:
      "You can book a test drive online using the form on this page, or by calling us on 84699 89900 or 82387 85050. Once you share your details, our team will confirm your preferred date, time and location, at our showroom or your home.",
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
    image: "/images/cars/colors/Thar_Roxx_602x339.png",
    alt: "Mahindra Thar Roxx exterior styling",
  },
  {
    date: "18 Jun 2026",
    category: "Ownership",
    title: "Why the XUV 7XO is the family road-trip SUV to beat",
    image: "/images/cars/colors/AX7L_602x339_RubyVelvet.png",
    alt: "Mahindra XUV 7XO on a family road trip",
  },
  {
    date: "09 Jun 2026",
    category: "Service",
    title: "5 Monsoon Car-Care Tips Every Mahindra Owner Should Know",
    image: "/images/cars/colors/ScorpioN_602x339.png",
    alt: "Mahindra Scorpio-N SUV in the monsoon, car-care tips",
  },
  {
    date: "02 Jun 2026",
    category: "Finance",
    title: "Car Loan or Lease in 2026: Which Actually Saves You More?",
    image: "/images/cars/colors/S220_602x339.png",
    alt: "Mahindra XUV 3XO parked outdoors",
  },
];

export type Location = {
  name: string;
  type: "Showroom" | "Service Centre";
  city: string;
  address: string;
  phone: string;
  // Present for outlets that share the group's second helpline number
  // alongside their own. Airoli has its own distinct number, so it's the
  // only location without this.
  phoneSecondary?: string;
  image: string;
  mapsUrl: string;
  // Google's feature ID (ftid) for the exact place, resolved from mapsUrl.
  // Passing this to the map embed makes its own "Open in maps" link deep-link
  // to this precise place instead of falling back to a text search.
  ftid: string;
  // Exact coordinates, resolved from mapsUrl. Querying the map embed by
  // coordinates (rather than name/address text) guarantees a pin drops
  // exactly on the place instead of Google's best-guess text match.
  lat: number;
  lng: number;
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
    phoneSecondary: "82387 85050",
    image: "/images/locate-us/thane-showroom.webp",
    mapsUrl: "https://maps.app.goo.gl/hV126JsMg6duaCmE9",
    ftid: "0x3be7b9b401811351:0xcbb5fcaac0213170",
    lat: 19.1944532,
    lng: 72.946498,
  },
  {
    name: "Mahindra - Airoli Showroom",
    type: "Showroom",
    city: "Navi Mumbai",
    address: "Hissa No 1, Akshar Green World, Shop 27A 27B, Gate 242, Thane Belapur Rd, Airoli, Maharashtra 400708",
    phone: "84699 89900",
    phoneSecondary: "82387 85050",
    image: "/images/locate-us/airoli-showroom.webp",
    mapsUrl: "https://maps.app.goo.gl/LgYCDcro2fgQ7zceA",
    ftid: "0x3be7bfb7133a6f61:0x955ceba73006b316",
    lat: 19.1842157,
    lng: 72.9930943,
  },
  {
    name: "Mahindra - South Mumbai",
    type: "Showroom",
    city: "Mumbai",
    address: "Unit 48, 69 Atria - The Millennium Mall, Dr Annie Besant Rd, Lotus Colony, Worli, Mumbai, Maharashtra 400018",
    phone: "84699 89900",
    phoneSecondary: "82387 85050",
    image: "/images/locate-us/south-mumbai-showroom.webp",
    mapsUrl: "https://maps.app.goo.gl/rAW8jjtkcfj6HXZNA",
    ftid: "0x3be7ce8641a673a7:0x2e73544bb5657fff",
    lat: 18.9912457,
    lng: 72.8144358,
  },
  {
    name: "Mahindra - Charkop Service Centre",
    type: "Service Centre",
    city: "Mumbai",
    address: "Plot 95/96, Mahatma Gandhi Rd, Hindustan Naka, Charkop Industrial Estate, Kandivali West, Mumbai, Maharashtra 400067",
    phone: "84699 89900",
    phoneSecondary: "82387 85050",
    image: "/images/locate-us/charkop-service.webp",
    mapsUrl: "https://maps.app.goo.gl/cgV166Va4iuyVuky7",
    ftid: "0x3be7b75555bdaf83:0xed5e86c80f211998",
    lat: 19.2093452,
    lng: 72.8298505,
  },
  {
    name: "Mahindra - Sewri Service Center",
    type: "Service Centre",
    city: "Mumbai",
    address: "Sewree Fort, Best Saparia Sub Station, Sewri - Chembur Rd, BPCL Complex, Sewri, Mumbai, Maharashtra 400015",
    phone: "84699 89900",
    phoneSecondary: "82387 85050",
    image: "/images/blogs/sewri-workshop.png",
    mapsUrl: "https://maps.app.goo.gl/GbXbyiRbsUHrxUr58",
    ftid: "0x3be7cf1a54cf9235:0x42a17a954159a947",
    lat: 19.0024134,
    lng: 72.8608805,
  },
];

/* Curated subset for the footer's "Popular Cars" column, so it doesn't
   list all the models. */
const popularNames = ["Thar Roxx", "XUV 7XO", "Scorpio-N", "Thar", "XUV 3XO", "Bolero"];
export const popularCars = popularNames
  .map((n) => cars.find((c) => c.name === n))
  .filter((c): c is Car => Boolean(c));

export const testDriveImage = "/images/home/test-drive-interior.jpg";
export const serviceHeroImage = "/images/service/service-hero.webp";
export const carModels = cars.map((c) => c.name);
export const cityOptions = ["Thane", "Navi Mumbai", "Mumbai"];
export const serviceCentres = locations.filter((l) => l.type === "Service Centre");
