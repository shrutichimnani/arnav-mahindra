/* ============================================================
   Blog content for the Mahindra Modi blogs section. Written as
   original dealer-editorial copy, grounded in the real spec and
   pricing figures already defined in lib/data.ts so the numbers
   quoted here never drift out of sync with the car pages. Treat
   as demo/portfolio content, not published journalism.
   ============================================================ */

import { cars, formatINR } from "./data";

const car = (name: string) => {
  const found = cars.find((c) => c.name === name);
  if (!found) throw new Error(`Blog content references unknown car: ${name}`);
  return found;
};

export type BlogCategory =
  | "SUVs"
  | "Electric"
  | "Buying Guide"
  | "Ownership"
  | "Service & Maintenance"
  | "News"
  | "Offers & Events"
  | "Accessories"
  | "Finance";

export const blogFilters: ("All" | BlogCategory)[] = [
  "All",
  "SUVs",
  "Electric",
  "Buying Guide",
  "Ownership",
  "Service & Maintenance",
  "News",
  "Offers & Events",
  "Accessories",
  "Finance",
];

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  alt: string;
  content: string[];
  featured?: boolean;
  imagePosition?: string;
};

const scorpioN = car("Scorpio-N");
const xuv7xo = car("XUV 7XO");
const tharRoxx = car("Thar Roxx");
const thar = car("Thar");
const xuv3xo = car("XUV 3XO");
const xuv400 = car("XUV400");
const xev9e = car("XEV 9e");
const be6 = car("BE 6");
const bolero = car("Bolero");
const boleroNeo = car("Bolero Neo");

export const blogPosts: BlogPost[] = [
  {
    slug: "xuv700-dominates-premium-suvs",
    title: "Why the XUV 7XO Continues to Dominate Premium SUVs",
    category: "SUVs",
    excerpt:
      "From powerful performance to advanced technology, here's why the XUV 7XO (formerly XUV700) remains a top choice for SUV lovers in India.",
    readTime: "5 min read",
    date: "15 Jul 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw3a9ff783/images/X7XO/large/AX7L_602x339_RubyVelvet.png",
    alt: "Mahindra XUV 7XO on a highway",
    featured: true,
    content: [
      `Few SUVs in India have held their ground the way the XUV 7XO has. Renamed from the XUV700 but carrying forward the same engineering underneath, it still sets the pace on features that rivals twice its price sometimes skip: Level 2 ADAS with adaptive cruise control, dual 10.25 inch curved displays, and a 3D Sony sound system on the top trims.`,
      `Priced from ${formatINR(xuv7xo.priceINR)} (ex-showroom), the XUV 7XO is offered with a ${xuv7xo.engine.toLowerCase()}, paired with a ${xuv7xo.transmission.toLowerCase()}. That spread means a buyer can pick a manual petrol for city commuting or step up to the automatic diesel with all-wheel drive for long highway stretches, without leaving the model line at all.`,
      `Seating flexes between five and seven depending on variant, with ${xuv7xo.bootSpace.toLowerCase()} when the third row is in use. Combined with 7 airbags across the range and a genuinely premium cabin, it is easy to see why families cross-shopping this segment keep coming back to it.`,
      `If you are weighing the XUV 7XO against a rival, book a test drive at Mahindra Modi in Thane or our Airoli showroom in Navi Mumbai. Fifteen minutes behind the wheel usually settles the question faster than any spec sheet.`,
    ],
  },
  {
    slug: "scorpio-n-vs-xuv7xo",
    title: "Scorpio N vs XUV 7XO: Which SUV Should You Buy?",
    category: "Buying Guide",
    excerpt:
      "Two of Mahindra's biggest SUVs, two very different personalities. Here's how to decide between the Scorpio-N and the XUV 7XO.",
    readTime: "5 min read",
    date: "12 Jul 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw14737114/images/SCN/large/ScorpioN_602x339.png",
    alt: "Mahindra Scorpio-N parked at dusk",
    content: [
      `On paper the Scorpio-N and the XUV 7XO look like they compete directly: both are seven-seat capable, both come with a 2.0L turbo petrol and a 2.2L diesel, and both wear the Mahindra badge with pride. In practice they are built for different buyers.`,
      `The Scorpio-N, priced from ${formatINR(scorpioN.priceINR)}, is the one to pick if road presence and old-school SUV toughness matter to you. It rides on a more commanding stance, offers the available 4XPLOR all-wheel-drive system with 5 drive modes and 6 terrain modes, and feels every bit the "Big Daddy" successor its marketing promises.`,
      `The XUV 7XO, from ${formatINR(xuv7xo.priceINR)}, leans into technology and comfort instead: dual curved screens, Level 2 ADAS, and a more car-like ride on tarmac. If your daily use is mostly city and highway with the occasional rough patch, it will feel more polished day to day.`,
      `Our honest advice: if you regularly drive unpaved roads or want maximum ruggedness, take the Scorpio-N. If tech, comfort, and safety assists matter more than outright toughness, the XUV 7XO wins. Either way, our sales team at Mahindra Modi can arrange a back-to-back test drive so you feel the difference yourself.`,
    ],
  },
  {
    slug: "10-tips-peak-condition",
    title: "10 Essential Tips to Keep Your Mahindra SUV in Peak Condition",
    category: "Ownership",
    excerpt:
      "Simple, practical habits that protect your Mahindra's engine, tyres, and resale value for years of trouble-free driving.",
    readTime: "4 min read",
    date: "10 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    alt: "Mechanic inspecting an SUV in a service bay",
    content: [
      `A Mahindra SUV is built to handle Indian roads for the long haul, but a few consistent habits make the difference between a car that feels new at 80,000 km and one that starts to feel tired at 40,000 km.`,
      `Stick to the manufacturer-recommended service schedule rather than stretching intervals to save a service visit. Check tyre pressure monthly, since underinflated tyres quietly eat into both mileage and handling. Keep an eye on brake pad wear indicators, especially if most of your driving is stop-start city traffic.`,
      `For diesel variants, avoid running the tank near empty for long periods, as it can draw sediment into the fuel filter. For every Mahindra, use only genuine parts and fluids at service, since aftermarket substitutes can void warranty cover and often wear out faster in the long run.`,
      `Finally, wash and wax the exterior every few weeks, particularly through monsoon months, to protect the paint and undercarriage from road salt and grime. Book your next service through Mahindra Modi and our factory-trained technicians will run through a full checklist, not just an oil change.`,
    ],
  },
  {
    slug: "be6-xev9e-future",
    title: "Mahindra BE 6 and XEV 9e: The Future Is Here",
    category: "News",
    excerpt:
      "Mahindra's new BE and XEV electric ranges bring dedicated EV platforms, coupe-SUV styling, and serious range to the Indian market.",
    readTime: "4 min read",
    date: "10 Jul 2026",
    image: "/cars/be6-everest-white.png",
    alt: "Mahindra BE 6 electric SUV coupe in Everest White",
    content: [
      `Mahindra's electric ambitions have moved well past the XUV400. The BE 6 and XEV 9e are both built on the dedicated INGLO EV platform, engineered from the ground up for electric power rather than adapted from a petrol or diesel chassis.`,
      `The XEV 9e is the flagship of the two: a coupe-SUV silhouette, dual 12.3 inch curved displays, Level 2 ADAS, and a claimed range of up to ${xev9e.mileage.toLowerCase()}. An available all-wheel-drive dual-motor layout adds genuine performance on top of the range figures.`,
      `The BE 6 shares the same INGLO underpinnings in a slightly sharper, more futuristic body, with a claimed range of up to ${be6.mileage.toLowerCase()} and rapid DC fast-charging support. Both cars are priced on request, reflecting how new and fast-moving this segment still is.`,
      `If you are considering a jump to electric, Mahindra Modi can walk you through charging setup at home, applicable subsidies, and a side-by-side comparison with the XUV400 so you pick the EV that actually matches how you drive.`,
    ],
  },
  {
    slug: "when-to-service",
    title: "When Should You Service Your Mahindra Car?",
    category: "Service & Maintenance",
    excerpt:
      "A clear breakdown of manufacturer service intervals, what each visit actually covers, and the warning signs that mean don't wait.",
    readTime: "4 min read",
    date: "08 Jul 2026",
    image:
      "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/04/Sewri-workshop-image.png",
    alt: "Mahindra service centre bay with car undergoing maintenance",
    imagePosition: "object-[25%_center] scale-110",
    content: [
      `Most Mahindra owners default to "whenever the reminder sticker says so," which is a reasonable rule of thumb, but it helps to know what is actually happening at each interval and why skipping one can cost more later.`,
      `The first service, typically around 1,000 to 1,500 km, is mostly a checkup: tightening any fittings that settled in after delivery and confirming there are no early defects. From there, most Mahindra models follow a service rhythm of roughly every 10,000 km or 12 months, whichever comes first, covering an oil and filter change, brake inspection, and a full multi-point check.`,
      `Between scheduled visits, don't ignore specific signs: a dashboard warning light that won't clear, a noticeably softer brake pedal, a burning smell, or unusual vibration at highway speed. These are not "wait for the next service" issues, they are "book this week" issues.`,
      `Mahindra Modi offers free pickup and drop for service in Thane, Navi Mumbai, and Mumbai, so a busy schedule is never a reason to delay. Use Book a Service from the menu to pick a convenient date and centre.`,
    ],
  },
  {
    slug: "electric-suvs-explained",
    title: "Electric SUVs by Mahindra: What You Need to Know",
    category: "Electric",
    excerpt:
      "From the XUV400 to the new BE and XEV ranges, here's how Mahindra's electric SUV lineup fits together and who each one suits.",
    readTime: "6 min read",
    date: "07 Jul 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dweb7ab251/images/X400/large/XUV400_602x339.png",
    alt: "Mahindra XUV400 electric SUV",
    content: [
      `Mahindra now offers three distinct electric SUVs, each aimed at a different buyer, and it is worth understanding the differences before choosing one over a petrol or diesel model.`,
      `The XUV400 is the familiar entry point: a converted-platform electric SUV with a claimed range of ${xuv400.mileage.toLowerCase()}, priced from ${formatINR(xuv400.priceINR)}. It suits buyers who want the spacious, known XUV cabin with an electric drivetrain rather than a radically different design.`,
      `The BE 6 and XEV 9e sit above it, both built on Mahindra's purpose-designed INGLO platform. They trade some of the XUV400's familiarity for genuinely new coupe-SUV styling, longer claimed ranges, dual-screen cockpits, and available all-wheel drive on the XEV 9e.`,
      `The practical question for most buyers is charging access. If you can charge at home or at work reliably, the daily range on any of these three easily covers a normal commute with margin to spare. For longer trips, Mahindra's growing fast-charging network cuts a 0 to 80 percent charge down to well under an hour on the newer platform.`,
      `Not sure which electric SUV fits your driving pattern? Our team at Mahindra Modi can talk you through real-world range, home charger installation, and current offers on all three models.`,
    ],
  },
  {
    slug: "festive-offers-july-2026",
    title: "Exciting Festive Offers on Mahindra SUVs, July 2026",
    category: "Offers & Events",
    excerpt:
      "Cash discounts, exchange bonuses, and corporate benefits across the Mahindra range this month at Mahindra Modi.",
    readTime: "3 min read",
    date: "05 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80",
    alt: "New cars lined up at a festive dealership event",
    content: [
      `This month brings some of the strongest combined offers we have run all year across the Mahindra range at Mahindra Modi, and they can be stacked depending on your purchase.`,
      `A cash discount of up to ₹50,000 is available on select models booked this season, on top of an exchange bonus of up to ₹40,000 when you trade in your current car, new or used, any make. Corporate and fleet buyers get an additional ₹40,000 corporate benefit on eligible purchases.`,
      `These offers apply across the SUV range, including the Thar Roxx, Scorpio-N, and XUV 3XO, and our finance desk can combine them with a bank loan for a lower effective on-road price than the sticker suggests.`,
      `Offers are time-bound and variant-specific, so the fastest way to know exactly what applies to the model you want is to call 84699 89900 or visit our Thane or Airoli showroom this week.`,
    ],
  },
  {
    slug: "xuv7xo-road-trip",
    title: "Why the XUV 7XO Is the Family Road-Trip SUV to Beat",
    category: "SUVs",
    excerpt:
      "Seven seats, a smooth ride, and a genuinely premium cabin: what makes the XUV 7XO such a strong choice for long family drives.",
    readTime: "4 min read",
    date: "18 Jun 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw3a9ff783/images/X7XO/large/AX7L_602x339_RubyVelvet.png",
    alt: "Mahindra XUV 7XO on a family road trip",
    content: [
      `Long drives expose an SUV's weaknesses fast: a stiff ride wears everyone down by hour three, a cramped third row causes arguments, and a noisy cabin makes conversation exhausting. The XUV 7XO is built with exactly these problems in mind.`,
      `With seating for ${xuv7xo.seating.replace("/", " or ")} and ${xuv7xo.bootSpace.toLowerCase()}, it comfortably swallows luggage for a full family trip without folding seats down. Adaptive cruise control on ADAS-equipped trims takes the edge off long highway stretches, and the dual 10.25 inch screens keep the second row entertained without a separate tablet.`,
      `Fuel-wise, expect ${xuv7xo.mileage.toLowerCase()}, which on a typical Mumbai to Goa or Mumbai to Nashik run translates to fewer fuel stops than most seven-seaters in this price bracket manage.`,
      `Planning a monsoon getaway or a festive-season family trip? Book a test drive with Mahindra Modi and take the XUV 7XO on the exact kind of drive you are planning, city traffic and highway stretch included.`,
    ],
  },
  {
    slug: "genuine-accessories-guide",
    title: "Mahindra Genuine Accessories: What's Actually Worth Adding",
    category: "Accessories",
    excerpt:
      "From all-weather floor mats to roof rails, here's a practical guide to which genuine accessories earn their price and which you can skip.",
    readTime: "4 min read",
    date: "28 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up of an SUV interior with accessories fitted",
    content: [
      `Every new Mahindra owner gets pitched an accessories list at delivery, and it is easy to either buy everything or dismiss all of it. Neither approach is right. A few genuine accessories genuinely pay for themselves.`,
      `All-weather rubber floor mats are close to essential in a country with a real monsoon: they protect the factory carpet from years of mud and water damage and are trivial to hose down. A boot liner does the same job for your cargo area if you carry gear, tools, or groceries regularly.`,
      `Body-colour door handles and a chrome kit are purely cosmetic and safe to skip if budget is tight. Roof rails, on the other hand, are worth it if you actually plan to carry a roof box or cycle rack, and largely decorative if you don't.`,
      `Only fit genuine Mahindra accessories, especially anything that touches electronics or the ECU, like reverse cameras or infotainment upgrades. Aftermarket parts here are the most common cause of warranty disputes we see. Ask our sales team at delivery for the genuine accessories catalogue specific to your variant.`,
    ],
  },
  {
    slug: "car-loan-or-lease",
    title: "Car Loan or Lease in 2026: Which Actually Saves You More?",
    category: "Finance",
    excerpt:
      "A straightforward comparison of buying with a car loan versus leasing your next Mahindra, and which makes sense for your situation.",
    readTime: "5 min read",
    date: "02 Jun 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwc4930484/images/X3XO/large/S220_602x339.png",
    alt: "Mahindra XUV 3XO parked outdoors",
    content: [
      `A car loan and a lease solve the same problem, getting you into a new Mahindra without paying the full price upfront, but they suit different financial situations and different ownership plans.`,
      `A loan builds equity. Once it is paid off, the car is fully yours, and you can keep driving it with no monthly payment, sell it, or hand it down. It is the better option if you plan to keep the car for 6 years or more, or if you drive high annual mileage where lease distance caps would hurt you.`,
      `A lease usually means lower monthly payments and the ability to switch to a new model every 3 to 4 years, which appeals to buyers who want the latest features without a long-term commitment. The trade-off is you never own the car, and going over the agreed mileage or returning it in poor condition brings extra charges.`,
      `On an SUV like the ${xuv3xo.name}, priced from ${formatINR(xuv3xo.priceINR)}, the monthly gap between a loan and a lease is often smaller than people expect once interest rates and residual value are factored in. Our finance desk at Mahindra Modi can run both numbers side by side for your exact variant before you decide.`,
    ],
  },
  {
    slug: "thar-roxx-vs-thar",
    title: "Thar Roxx vs Thar: Which One Should You Actually Buy?",
    category: "SUVs",
    excerpt:
      "Same off-road DNA, very different everyday character. Here's how to choose between the 5-door Thar Roxx and the original 3-door Thar.",
    readTime: "5 min read",
    date: "24 Jun 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dwa4de1cb1/images/TH5D/large/Thar_Roxx_602x339.png",
    alt: "Mahindra Thar Roxx exterior styling",
    content: [
      `The Thar built a cult following as a raw, 3-door, go-anywhere off-roader, and the Thar Roxx exists because a lot of that same audience also wanted a back seat their friends could actually use. That is really the whole decision in one sentence.`,
      `The Thar, priced from ${formatINR(thar.priceINR)}, is still the purer off-road tool: lighter, more compact for tight trails, and unapologetically a weekend adventure vehicle first. Rear practicality is minimal, since the rear bench simply folds flat for cargo rather than offering a dedicated boot.`,
      `The Thar Roxx, from ${formatINR(tharRoxx.priceINR)}, stretches the wheelbase into a proper 5-door body with ${tharRoxx.bootSpace.toLowerCase()} of boot space, a 10.25 inch infotainment system, and segment-first ADAS with 6 airbags, while keeping 4x4 availability with a low-range transfer case.`,
      `If the Thar is your only car and needs to double as a family runabout, the Roxx is the easy pick. If it is a dedicated second car for trails and weekends, the original 3-door Thar is still hard to beat for character per rupee. Either way, Mahindra Modi stocks both, so a back-to-back test drive is the fastest way to know which one you'll actually reach for on a Tuesday morning.`,
    ],
  },
  {
    slug: "monsoon-car-care",
    title: "5 Monsoon Car-Care Tips Every Mahindra Owner Should Know",
    category: "Ownership",
    excerpt:
      "Simple pre-monsoon checks that prevent the most common rainy-season breakdowns and keep your Mahindra running smoothly all season.",
    readTime: "4 min read",
    date: "09 Jun 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw14737114/images/SCN/large/ScorpioN_602x339.png",
    alt: "Mahindra Scorpio-N SUV in the monsoon",
    content: [
      `Mumbai and Thane monsoons are hard on cars, and most of the breakdowns we see in July and August trace back to a handful of avoidable issues. A short pre-monsoon check saves a lot of roadside stress.`,
      `First, check tyre tread depth. Worn tyres lose grip dramatically on wet roads, and this is the single biggest factor in monsoon accidents. Second, test your wiper blades before the first heavy downpour, not during it, since cracked rubber smears more than it clears.`,
      `Third, have your brakes inspected, since wet roads mean longer stopping distances even with healthy pads. Fourth, check that all door and boot rubber seals are intact to keep water out of the cabin and electronics. Fifth, avoid driving through standing water deeper than your wheel hub, and if you must, do it slowly in first gear to avoid drawing water into the air intake.`,
      `Mahindra Modi runs a free pre-monsoon inspection at our Thane and Charkop service centres covering all five of these points. Book ahead of the season rather than after the first breakdown.`,
    ],
  },
  {
    slug: "gst-on-road-price",
    title: "GST and On-Road Price Explained: What You Actually Pay",
    category: "Finance",
    excerpt:
      "Ex-showroom price, GST, cess, registration, insurance: a plain breakdown of every line item that makes up your final Mahindra price.",
    readTime: "5 min read",
    date: "07 Jul 2026",
    image:
      "https://auto.mahindra.com/dw/image/v2/BKRC_PRD/on/demandware.static/-/Sites-mahindra-product-catalog/default/dw2de0a99b/images/BOL/large/BoleroClassic_602x339.png",
    alt: "Mahindra Bolero SUV, price breakdown reference",
    content: [
      `The ex-showroom price on a brochure is never what you actually pay, and the gap can catch first-time buyers off guard. Here is what actually sits between that number and your final on-road price.`,
      `Ex-showroom price already includes GST and the applicable compensation cess, both baked in at the factory level, so this is the base you negotiate from. On top of that comes RTO registration, which varies by state and by fuel type, and is typically the single largest add-on cost after the car itself.`,
      `Insurance is mandatory and usually the second-largest line item, covering third-party liability at minimum, though most buyers take comprehensive cover for a new car. Add extended warranty if you opt in, plus any accessories fitted at delivery, and you arrive at the true on-road price.`,
      `As an example, a ${bolero.name} priced from ${formatINR(bolero.priceINR)} ex-showroom typically lands meaningfully higher once registration and insurance are added in Maharashtra. Ask Mahindra Modi for a full written on-road quote before you decide, not just the ex-showroom figure, so there are no surprises at delivery.`,
    ],
  },
  {
    slug: "bolero-vs-bolero-neo",
    title: "Bolero vs Bolero Neo: Picking the Right Rugged SUV",
    category: "SUVs",
    excerpt:
      "Same rugged, body-on-frame philosophy, two different footprints. Here's how the Bolero and Bolero Neo actually differ in daily use.",
    readTime: "4 min read",
    date: "14 May 2026",
    image: "/cars/bolero-neo-fixed.png",
    alt: "Mahindra Bolero Neo compact SUV",
    content: [
      `Both the Bolero and Bolero Neo are built for buyers who value ground clearance, low running costs, and body-on-frame durability over cabin luxury. The real difference between them comes down to size and where you drive most.`,
      `The Bolero, from ${formatINR(bolero.priceINR)}, is the larger, more traditional choice, still India's best-selling rugged SUV nameplate for good reason. It suits buyers who need genuine 7-seat capacity and don't mind a longer footprint for tighter city parking.`,
      `The Bolero Neo, from ${formatINR(boleroNeo.priceINR)}, brings the same ladder-frame toughness and ${boleroNeo.mileage.toLowerCase()} into a more compact body with a noticeably more modern cabin and touchscreen infotainment on higher trims, making it easier to live with day to day in denser traffic.`,
      `If most of your driving is on open roads or you regularly carry a full 7-seat load, the Bolero remains the stronger pick. If you want the same low-maintenance toughness with an easier daily footprint, the Bolero Neo is worth a look. Both are on our lot at Mahindra Modi Thane for a side-by-side test drive.`,
    ],
  },
];

export const featuredPost = blogPosts.find((p) => p.featured)!;
export const latestPosts = blogPosts.filter((p) => !p.featured);

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
