import type { Car, CarDetail, GalleryImage } from "./data";

const passengerCarWarranty =
  "Standard Mahindra manufacturer warranty (terms vary by model). Extended warranty and roadside-assistance plans can be selected at delivery; ask Mahindra Modi to confirm current plan terms for your variant.";

const evWarranty =
  "Standard vehicle warranty, plus a separate long-term high-voltage battery warranty. Extended protection options are available; confirm current terms and exclusions with Mahindra Modi.";

const commercialWarranty =
  "Commercial-vehicle warranty and maintenance terms can differ from retail models. Mahindra Modi will confirm the current coverage in your fleet quotation.";

type DetailInput = Omit<CarDetail, "warranty"> & { warranty?: string };

const detail = (input: DetailInput): CarDetail => ({
  ...input,
  warranty: input.warranty ?? passengerCarWarranty,
});

/*
 * Buyer-facing facts are best-effort, realistic approximations based on
 * publicly known Mahindra model information. Equipment, paint and price
 * can change by variant and model year — this is demo/portfolio content,
 * not a live specification sheet.
 */
export const carDetails: Record<string, CarDetail> = {
  "thar-roxx": detail({
    overview:
      "THAR ROXX takes everything buyers love about the Thar and stretches it into a genuinely usable 5-door SUV, built on a new monocoque platform without losing 4x4 ability.",
    idealFor: "Buyers who want Thar-level presence and off-road capability with real rear-seat space.",
    performance: [
      "2.0L mStallion turbo-petrol produces 190 PS and 380 Nm, paired with a 6-speed manual or 6-speed torque-converter automatic.",
      "2.2L mHawk turbo-diesel produces up to 130 PS (RWD) or 177 PS (4WD), with manual or automatic options.",
      "Available 4x4 with a low-range transfer case and multiple terrain modes for serious off-roading.",
    ],
    safety: [
      "6 airbags, ESC, hill-hold and hill-descent control are standard across the range.",
      "Level 2 ADAS with forward collision warning and lane-departure warning on higher trims.",
      "360-degree camera and rear parking sensors are available by variant.",
    ],
    interior: [
      "Dual-tone cabin with a 10.25-inch touchscreen and a 10.25-inch digital driver display.",
      "Five-seat layout with a genuinely usable 460-litre boot.",
      "Ventilated front seats and a premium Harman sound system on top variants.",
    ],
    exterior: [
      "Signature round LED headlamps, a bold seven-slat grille and squared-off wheel arches.",
      "18-inch alloy wheels and removable roof panels are available on select variants.",
    ],
    infotainment: [
      "10.25-inch touchscreen with wireless Android Auto and Apple CarPlay.",
      "Adventure Stat Pack showing off-road telemetry such as pitch, roll and altitude.",
    ],
    comfort: [
      "Automatic climate control, cruise control and keyless entry are available higher in the range.",
      "Automatic transmission suits daily driving; manual keeps direct control for off-road use.",
    ],
    variants: [
      "AX Opt, AX7, AX7L and flagship trims span the petrol and diesel, 4x2 and 4x4 range.",
      "Confirm 4x2 vs 4x4 and transmission availability on your preferred trim before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,985 × 1,855 × 1,922 mm" },
      { label: "Wheelbase", value: "2,450 mm" },
      { label: "Ground clearance", value: "226 mm" },
      { label: "Boot space", value: "460 L" },
      { label: "Fuel tank", value: "57 L" },
      { label: "Claimed efficiency", value: "Up to 15.4 kmpl (diesel AT)" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/thar-roxx/TH5D.html",
  }),
  "xuv-3xo": detail({
    overview:
      "XUV 3XO is Mahindra's compact SUV answer for buyers who want segment-leading ADAS, a sunroof and bold styling without stepping up to a mid-size SUV budget.",
    idealFor: "City-first buyers and small families who want a feature-rich, safety-focused compact SUV.",
    performance: [
      "1.2L turbo-petrol produces up to 130 PS, with manual or automatic transmission choices.",
      "1.5L diesel offers strong low-end torque for a relaxed highway cruise.",
      "Multiple drive modes tailor throttle response to city or open-road driving.",
    ],
    safety: [
      "Level 2 ADAS with forward collision warning, lane-keep assist and adaptive cruise control on top trims.",
      "6 airbags standard across most of the range, alongside ESC and hill-hold assist.",
      "360-degree camera and blind-spot monitoring are available by variant.",
    ],
    interior: [
      "Dual 10.25-inch curved displays create a modern, tech-forward cabin.",
      "Ventilated front seats and a panoramic sunroof are available on higher trims.",
      "364-litre boot handles everyday shopping and weekend luggage.",
    ],
    exterior: [
      "Bold LED light signature front and rear, with a muscular SUV stance.",
      "16- and 17-inch alloy wheel options depending on variant.",
    ],
    infotainment: [
      "Dual 10.25-inch screens with wireless Android Auto and Apple CarPlay.",
      "Harman Kardon premium sound system on select top-spec variants.",
    ],
    comfort: [
      "Automatic climate control, cruise control and a wireless charger are available higher in the range.",
      "Automatic transmission suits city traffic; manual keeps the entry price lower.",
    ],
    variants: [
      "MX, AX3, AX5, AX7 and AX7L trims span value to fully-loaded specifications.",
      "Confirm ADAS, sunroof and camera availability on your preferred trim before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,990 × 1,821 × 1,647 mm" },
      { label: "Wheelbase", value: "2,600 mm" },
      { label: "Ground clearance", value: "201 mm" },
      { label: "Boot space", value: "364 L" },
      { label: "Fuel tank", value: "45 L" },
      { label: "Claimed efficiency", value: "Up to 20.6 kmpl (petrol)" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/xuv3xo/X3XO.html",
  }),
  thar: detail({
    overview:
      "THAR is India's original off-road lifestyle SUV: a true body-on-frame 4x4 built for weekend adventures as much as daily driving.",
    idealFor: "Off-road enthusiasts and lifestyle buyers who want an open-top, go-anywhere SUV.",
    performance: [
      "2.0L mStallion turbo-petrol produces 150 PS and 300 Nm.",
      "2.2L mHawk turbo-diesel produces 130 PS and 300 Nm.",
      "Both engines offer manual or torque-converter automatic transmissions with 4x4 drive.",
    ],
    safety: [
      "6 airbags, ESC and hill-hold assist are standard across the range.",
      "Roll-over mitigation and a reinforced body structure support off-road safety.",
    ],
    interior: [
      "Compact four-seat cabin focused on driver engagement over outright space.",
      "Height-adjustable driver seat and a simple, rugged dashboard layout.",
    ],
    exterior: [
      "Iconic round headlamps, a flat bonnet and boxy proportions carry the Thar's heritage design.",
      "Convertible soft-top and hard-top body styles are available depending on variant.",
    ],
    infotainment: [
      "Touchscreen infotainment with Android Auto and Apple CarPlay on higher trims.",
      "Adventure Stat Pack telemetry showing pitch, roll and altitude.",
    ],
    comfort: [
      "Air-conditioning, power windows and a height-adjustable driver seat are standard on most trims.",
      "Automatic transmission suits relaxed city use; manual is preferred for off-road control.",
    ],
    variants: [
      "AX Opt and AX7 trims span both petrol and diesel engines, in 4x2 and 4x4 configurations.",
      "Confirm soft-top vs hard-top and 4x2 vs 4x4 availability before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,985 × 1,855 × 1,844 mm" },
      { label: "Wheelbase", value: "2,450 mm" },
      { label: "Ground clearance", value: "226 mm" },
      { label: "Fuel tank", value: "57 L" },
      { label: "Claimed efficiency", value: "Up to 15.2 kmpl (diesel manual)" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/thar/THRN.html",
  }),
  "scorpio-n": detail({
    overview:
      "SCORPIO-N brings the legendary Scorpio nameplate into a new generation: a commanding new design, modern technology and genuine off-road ability.",
    idealFor: "Families who want SUV road presence, seven-seat flexibility and available all-wheel drive.",
    performance: [
      "2.0L mStallion turbo-petrol produces up to 203 PS and 380 Nm.",
      "2.2L mHawk turbo-diesel produces up to 175 PS and 400/450 Nm depending on transmission.",
      "Available 4XPLOR all-wheel-drive system with multiple terrain modes.",
    ],
    safety: [
      "6 airbags, ESC, hill-hold and hill-descent control are standard.",
      "360-degree camera and rear parking sensors are available on higher trims.",
    ],
    interior: [
      "Second-row captain seats or bench seating, with a third row for occasional use.",
      "192-litre boot with the third row up, expandable when folded flat.",
      "Ventilated front seats and a panoramic sunroof on top variants.",
    ],
    exterior: [
      "Bold, upright grille, C-shaped LED DRLs and squared wheel arches define the new Scorpio look.",
      "18-inch alloy wheels and roof rails are available depending on trim.",
    ],
    infotainment: [
      "8-inch or 12-inch touchscreen depending on variant, with wireless Android Auto and Apple CarPlay.",
      "Sony 3D surround sound system is available on the flagship trim.",
    ],
    comfort: [
      "Dual-zone automatic climate control and paddle shifters are available on automatic variants.",
      "5 drive modes and 6 terrain modes tailor the SUV to road, sand, mud, snow or off-road use.",
    ],
    variants: [
      "Z2, Z4, Z6, Z8 and Z8L trims span the petrol and diesel, manual and automatic range.",
      "Confirm seating layout (captain seats vs bench) and 4XPLOR availability on your preferred trim.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,662 × 1,917 × 1,857 mm" },
      { label: "Wheelbase", value: "2,750 mm" },
      { label: "Ground clearance", value: "192 mm (laden)" },
      { label: "Boot space", value: "192 L (3rd row up), expandable" },
      { label: "Fuel tank", value: "57 L" },
      { label: "Claimed efficiency", value: "Up to 16.7 kmpl (diesel manual)" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/scorpio-n/SCN.html",
  }),
  "scorpio-classic": detail({
    overview:
      "SCORPIO CLASSIC keeps the original Scorpio's rugged body-on-frame silhouette alive for buyers who prioritise toughness and ground clearance above all else.",
    idealFor: "Buyers who want proven body-on-frame toughness and maximum practicality over the newest tech.",
    performance: [
      "2.2L mHawk turbo-diesel produces 132 PS and 300 Nm.",
      "6-speed manual or 6-speed torque-converter automatic transmission options.",
    ],
    safety: [
      "Dual airbags standard, with up to 6 airbags on higher trims.",
      "ESC and hill-hold assist are available on select variants.",
    ],
    interior: [
      "7- or 9-seat configurations for maximum passenger flexibility.",
      "Simple, durable cabin trim built for long-term use.",
    ],
    exterior: [
      "Classic Scorpio silhouette with the familiar tail-lamp cluster and rugged proportions.",
      "Roof rails and alloy wheels are available on higher trims.",
    ],
    infotainment: [
      "Touchscreen infotainment with Android Auto and Apple CarPlay on select trims.",
    ],
    comfort: [
      "Automatic climate control and cruise control are available on the top trim.",
      "Automatic transmission suits highway cruising; manual is the value-focused choice.",
    ],
    variants: [
      "S, S11 and S11 4WD trims span manual and automatic, 7- and 9-seat configurations.",
      "Confirm seating layout and 4WD availability before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,456 × 1,820 × 1,995 mm" },
      { label: "Wheelbase", value: "2,680 mm" },
      { label: "Ground clearance", value: "180 mm" },
      { label: "Fuel tank", value: "60 L" },
      { label: "Claimed efficiency", value: "Up to 15.4 kmpl" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/scorpio-classic/SCRC.html",
  }),
  "xuv-7xo": detail({
    overview:
      "XUV 7XO (formerly XUV700) is Mahindra's flagship SUV: a segment-leading feature list, Level 2 ADAS and a genuinely premium cabin in a five- or seven-seat layout.",
    idealFor: "Families who want a premium, tech-loaded SUV with strong highway manners and safety credentials.",
    performance: [
      "2.0L mStallion turbo-petrol produces up to 200 PS and 380 Nm.",
      "2.2L mHawk turbo-diesel produces up to 185 PS and 420/450 Nm depending on transmission.",
      "Available all-wheel drive on select diesel automatic variants.",
    ],
    safety: [
      "7 airbags standard across the range, with ESC, hill-hold and hill-descent control.",
      "Blind-view monitor and a 360-degree camera are available on higher trims.",
    ],
    adas: [
      "Adaptive cruise control, forward collision warning and autonomous emergency braking on ADAS-equipped trims.",
      "Lane-keep assist, lane-departure warning and driver drowsiness detection where fitted.",
    ],
    interior: [
      "Dual 10.25-inch curved displays with Amazon Alexa built-in.",
      "240-litre boot with the third row up, expandable when folded.",
      "Ventilated front seats and a panoramic sunroof on top variants.",
    ],
    exterior: [
      "Bold LED light signature, a muscular bonnet line and 18-inch alloy wheels on top trims.",
    ],
    infotainment: [
      "Dual 10.25-inch screens, Sony 3D audio with 12 speakers and an Adrenox connected-car app on select trims.",
      "Wireless Android Auto and Apple CarPlay across most of the range.",
    ],
    comfort: [
      "Dual-zone automatic climate control, wireless charger and driver memory seat on top variants.",
      "Automatic transmission suits highway and city use; manual keeps the entry price accessible.",
    ],
    variants: [
      "MX, AX3, AX5, AX7 and AX7L trims span 5- and 7-seat, petrol and diesel, manual and automatic combinations.",
      "Confirm ADAS, sunroof and audio system availability on your preferred trim before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,695 × 1,890 × 1,755 mm" },
      { label: "Wheelbase", value: "2,750 mm" },
      { label: "Ground clearance", value: "200 mm" },
      { label: "Boot space", value: "240 L (7-seat, 3rd row up), expandable" },
      { label: "Fuel tank", value: "60 L" },
      { label: "Claimed efficiency", value: "Up to 17 kmpl (petrol) / 18.3 kmpl (diesel)" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/xuv-7xo.html",
  }),
  marazzo: detail({
    overview:
      "MARAZZO is Mahindra's spacious MPV, built for families and long road trips with flexible 6-, 7- and 8-seat configurations.",
    idealFor: "Large families and group travellers who want genuine third-row comfort and a high seating position.",
    performance: [
      "1.5L mHawk100 turbo-diesel produces 123 PS and 300 Nm.",
      "6-speed manual transmission across the range.",
    ],
    safety: [
      "Dual airbags standard, with ABS and EBD across the range.",
      "Reverse parking camera and sensors are available on higher trims.",
    ],
    interior: [
      "Segment-first First Row Captain Seats on select variants.",
      "Wide cabin with abundant headroom and legroom across all three rows.",
    ],
    exterior: [
      "Sculpted body panels and a high, van-like roofline maximise interior space.",
    ],
    infotainment: [
      "Touchscreen infotainment with Android Auto and Apple CarPlay on higher trims.",
    ],
    comfort: [
      "Automatic climate control with rear vents keeps every row comfortable.",
      "High ground clearance handles varied road conditions with ease.",
    ],
    variants: [
      "M2, M4, M6 and M8 trims span 6-, 7- and 8-seat layouts.",
      "Confirm captain-seat vs bench layout on your preferred trim before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,585 × 1,860 × 1,774 mm" },
      { label: "Wheelbase", value: "2,772 mm" },
      { label: "Ground clearance", value: "185 mm" },
      { label: "Fuel tank", value: "55 L" },
      { label: "Claimed efficiency", value: "Up to 17.6 kmpl" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/marazzo/MRZO.html",
  }),
  bolero: detail({
    overview:
      "BOLERO is India's best-selling rugged SUV nameplate: proven reliability, high ground clearance and low running costs, built for decades of tough use.",
    idealFor: "Buyers who prioritise toughness, resale value and low running costs above all else.",
    performance: [
      "1.5L mHawk75 diesel produces 75 PS and 210 Nm.",
      "5-speed manual transmission, tuned for durability and torque delivery.",
    ],
    safety: [
      "Dual airbags and ABS with EBD are standard across the range.",
      "Hill-hold assist is available on select variants.",
    ],
    interior: [
      "7-seat cabin with a durable, easy-to-clean trim built for high-mileage use.",
    ],
    exterior: [
      "Bold grille and squared-off proportions carry decades of Bolero heritage design.",
    ],
    infotainment: [
      "Touchscreen infotainment with Bluetooth and USB connectivity on higher trims.",
    ],
    comfort: [
      "Air-conditioning and power steering are standard across the range.",
    ],
    variants: [
      "B4, B6 and B6(O) trims span the value to feature-rich range.",
      "Confirm current feature availability with Mahindra Modi before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,995 × 1,795 × 1,880 mm" },
      { label: "Wheelbase", value: "2,680 mm" },
      { label: "Ground clearance", value: "180 mm" },
      { label: "Fuel tank", value: "60 L" },
      { label: "Claimed efficiency", value: "Up to 17 kmpl" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/bolero/BOL.html",
  }),
  "bolero-neo": detail({
    overview:
      "BOLERO NEO blends Bolero-grade ruggedness with a more modern cabin, in a compact SUV footprint suited to both city and rough-road use.",
    idealFor: "Buyers who want Bolero toughness with a smaller footprint and more contemporary features.",
    performance: [
      "1.5L mHawk75 turbo-diesel produces 100 PS and 260 Nm.",
      "5-speed manual transmission across the range.",
    ],
    safety: [
      "Dual airbags and ABS with EBD are standard, with ESC on higher trims.",
    ],
    interior: [
      "7-seat cabin with a 200 mm ground clearance for rough-road confidence.",
    ],
    exterior: [
      "Ladder-frame toughness paired with a more compact, city-friendly design.",
    ],
    infotainment: [
      "Touchscreen infotainment with Android Auto and Apple CarPlay on higher trims.",
    ],
    comfort: [
      "Air-conditioning and power windows are standard across most of the range.",
    ],
    variants: [
      "N4, N8 and N10 trims span the value to feature-rich range.",
      "Confirm current feature availability with Mahindra Modi before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,995 × 1,819 × 1,817 mm" },
      { label: "Wheelbase", value: "2,700 mm" },
      { label: "Ground clearance", value: "200 mm" },
      { label: "Fuel tank", value: "50 L" },
      { label: "Claimed efficiency", value: "Up to 17.5 kmpl" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/bolero-neo/NEO.html",
  }),
  "bolero-neo-plus": detail({
    overview:
      "BOLERO NEO PLUS is Mahindra's rugged, body-on-frame 9-seater SUV, built for large families and fleet operators who need genuine three-row space and go-anywhere toughness.",
    idealFor: "Large families, taxi and fleet operators who need real 9-seat capacity and ladder-frame durability.",
    performance: [
      "2.2L mHawk turbo-diesel produces up to 120 PS and 280 Nm.",
      "6-speed manual transmission across the range.",
      "Rear-wheel drive, ladder-frame chassis construction.",
    ],
    safety: [
      "Dual front airbags, ABS with EBD and Electronic Stability Programme are standard.",
      "Hill-hold assist, rear parking sensors and ISOFIX child-seat mounts are included.",
    ],
    interior: [
      "Genuine 9-seat, three-row layout with bench-type front and second rows.",
      "Side-facing jump seats in the third row, two per side.",
      "Rear AC vents across the second and third rows.",
    ],
    exterior: [
      "Boxy, upright SUV stance with R15 steel wheels and wheel covers.",
      "Ladder-frame toughness built for rough-road and fleet duty.",
    ],
    infotainment: [
      "7-inch touchscreen with USB connectivity on higher trims.",
    ],
    comfort: [
      "Manual air-conditioning, power steering and electric ORVMs across the range.",
      "Height-adjustable driver's seat and steering-mounted audio controls.",
    ],
    variants: [
      "Trims span value to feature-rich configurations across the 9-seat layout.",
      "Confirm current feature availability and colour options with Mahindra Modi before booking.",
    ],
    specifications: [
      { label: "Seating", value: "9, three-row bench and jump-seat layout" },
      { label: "Engine displacement", value: "2,184 cc" },
      { label: "Wheels", value: "R15 steel wheels with covers" },
      { label: "Claimed efficiency", value: "Up to 14 kmpl" },
    ],
    sourceUrl: "https://auto.mahindra.com/suv/bolero-neo-plus/NEOP.html",
  }),
  xuv400: detail({
    overview:
      "XUV400 pairs Mahindra's familiar, spacious SUV cabin with a silent electric powertrain, blistering acceleration and a long real-world range.",
    idealFor: "Buyers moving to their first electric SUV who still want strong performance and everyday practicality.",
    performance: [
      "Permanent magnet synchronous motor produces up to 150 PS and 310 Nm.",
      "0-100 kmph in under 9 seconds, with a single-speed automatic transmission.",
    ],
    safety: [
      "6 airbags, ESC and hill-hold assist are standard.",
      "Rear parking camera and sensors are available on higher trims.",
    ],
    interior: [
      "Familiar, spacious XUV cabin with a 378-litre boot.",
      "Digital instrument cluster and touchscreen infotainment across the range.",
    ],
    exterior: [
      "Copper-accented badging and closed-off grille signal the EV powertrain.",
    ],
    infotainment: [
      "Touchscreen infotainment with Android Auto and Apple CarPlay.",
    ],
    comfort: [
      "Automatic climate control and cruise control are available on higher trims.",
      "Regenerative braking with selectable levels improves range and driving feel.",
    ],
    variants: [
      "EC and EL trims span the standard-range battery option.",
      "Confirm current battery capacity and charging equipment with Mahindra Modi before booking.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,200 × 1,821 × 1,634 mm" },
      { label: "Wheelbase", value: "2,600 mm" },
      { label: "Battery / motor", value: "39.4 kWh / PMSM" },
      { label: "Claimed range", value: "Up to 456 km (MIDC)" },
      { label: "Boot space", value: "378 L" },
      { label: "DC charge (0–80%)", value: "About 50 min with compatible fast charger" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://auto.mahindra.com/suv/xuv400/X400.html",
  }),
  "xev-9e": detail({
    overview:
      "XEV 9e is Mahindra's flagship electric SUV coupe, built on the dedicated INGLO EV platform with a dual-screen cockpit, ADAS and a bold coupe silhouette.",
    idealFor: "Premium EV buyers who want a distinctive design, long range and the latest Mahindra electric technology.",
    performance: [
      "Available in single-motor rear-wheel-drive or dual-motor all-wheel-drive configurations.",
      "Long-range battery option targets a claimed range of up to 656 km.",
      "Rapid DC fast-charging support for quick top-ups on longer journeys.",
    ],
    safety: [
      "6 airbags, ESC and a reinforced battery protection structure.",
      "Level 2 ADAS with adaptive cruise control and lane-keep assist.",
    ],
    adas: [
      "Forward collision warning, automatic emergency braking and lane-departure warning.",
      "360-degree camera and blind-spot monitoring on higher trims.",
    ],
    interior: [
      "Dual 12.3-inch curved displays and a driver-focused digital cockpit.",
      "663-litre boot, plus a front trunk for additional storage.",
    ],
    exterior: [
      "Coupe-SUV silhouette with a low drag coefficient and full-width LED lighting.",
    ],
    infotainment: [
      "Dual curved displays with wireless smartphone integration and OTA updates.",
    ],
    comfort: [
      "Panoramic sunroof, ventilated front seats and dual-zone climate control on top variants.",
    ],
    variants: [
      "Pack 1, Pack 2 and Pack 3 battery/feature combinations are expected to span the range.",
      "Confirm current battery pack, AWD availability and pricing with Mahindra Modi.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,789 × 1,907 × 1,627 mm (approx.)" },
      { label: "Wheelbase", value: "2,775 mm (approx.)" },
      { label: "Battery / motor", value: "Long-range pack / PMSM, single or dual motor" },
      { label: "Claimed range", value: "Up to 656 km (claimed, long-range)" },
      { label: "Boot / frunk", value: "663 L + front trunk" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://auto.mahindra.com",
  }),
  "be-6": detail({
    overview:
      "BE 6 is the debut model of Mahindra's new BE electric sub-brand: a futuristic coupe-SUV design built on the INGLO platform with a digital-first cockpit.",
    idealFor: "EV-first buyers who want distinctive design and cutting-edge technology over traditional SUV styling.",
    performance: [
      "Single rear-mounted permanent magnet synchronous motor drives the standard configuration.",
      "Long-range battery option targets a claimed range of up to 682 km.",
      "Rapid DC fast-charging support for quick top-ups on longer journeys.",
    ],
    safety: [
      "6 airbags, ESC and a reinforced battery protection structure.",
      "Level 2 ADAS with adaptive cruise control and lane-keep assist.",
    ],
    adas: [
      "Forward collision warning, automatic emergency braking and lane-departure warning.",
      "360-degree camera and blind-spot monitoring on higher trims.",
    ],
    interior: [
      "Digital-first cockpit with a driver-focused display layout.",
      "455-litre boot, plus a front trunk for additional storage.",
    ],
    exterior: [
      "Futuristic coupe-SUV design language with a distinctive light signature.",
    ],
    infotainment: [
      "Digital displays with wireless smartphone integration and OTA updates.",
    ],
    comfort: [
      "Panoramic sunroof, ventilated front seats and dual-zone climate control on top variants.",
    ],
    variants: [
      "Pack 1, Pack 2 and Pack 3 battery/feature combinations are expected to span the range.",
      "Confirm current battery pack and pricing with Mahindra Modi.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,371 × 1,907 × 1,627 mm (approx.)" },
      { label: "Wheelbase", value: "2,775 mm (approx.)" },
      { label: "Battery / motor", value: "Long-range pack / PMSM, rear-wheel drive" },
      { label: "Claimed range", value: "Up to 682 km (claimed, long-range)" },
      { label: "Boot / frunk", value: "455 L + front trunk" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://auto.mahindra.com",
  }),
  "bolero-maxx-pik-up": detail({
    overview:
      "BOLERO MAXX PIK-UP is a tough, high-payload pickup for small business owners who need reliability every single day, backed by the Bolero's rugged reputation.",
    idealFor: "Small business owners and fleet operators who need dependable daily load-carrying capacity.",
    performance: [
      "1.5L mHawk diesel engine tuned for load-carrying torque.",
      "5-speed manual transmission across the range.",
    ],
    safety: [
      "Driver airbag and ABS with EBD are standard on current models.",
    ],
    interior: [
      "2- or 3-seat cabin depending on variant, with a durable, easy-to-clean trim.",
    ],
    exterior: [
      "Rugged body-on-frame commercial build with a reinforced cargo bed.",
    ],
    infotainment: [
      "Basic audio and connectivity equipment varies by fleet configuration.",
    ],
    comfort: [
      "Air-conditioning and power steering are available on higher trims.",
    ],
    variants: [
      "Single-cab and crew-cab configurations are typically available.",
      "Ask Mahindra Modi for a commercial quotation covering maintenance, insurance and delivery commitments.",
    ],
    specifications: [
      { label: "Seating", value: "2 / 3" },
      { label: "Rated payload", value: "1,440 kg" },
      { label: "Fuel", value: "Diesel" },
      { label: "Claimed efficiency", value: "Up to 17 kmpl" },
    ],
    warranty: commercialWarranty,
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks/bolero-pik-up/PUP.html",
  }),
  "supro-profit-truck": detail({
    overview:
      "SUPRO PROFIT TRUCK is a compact, agile mini-truck built for last-mile delivery and small-load commercial operators working in dense city conditions.",
    idealFor: "Last-mile delivery operators and small businesses needing an agile, low-cost commercial vehicle.",
    performance: [
      "1.5L mDI diesel engine tuned for strong low-end torque under load.",
      "5-speed manual transmission across the range.",
    ],
    safety: [
      "Driver airbag and ABS with EBD are standard on current models.",
    ],
    interior: [
      "Compact 2-seat cabin focused on manoeuvrability and low running costs.",
    ],
    exterior: [
      "Compact footprint designed for narrow city lanes and tight turning circles.",
    ],
    infotainment: [
      "Basic audio and connectivity equipment varies by fleet configuration.",
    ],
    comfort: [
      "Air-conditioning is available on select variants.",
    ],
    variants: [
      "Flatbed and container body options are typically available.",
      "Ask Mahindra Modi for a commercial quotation covering maintenance, insurance and delivery commitments.",
    ],
    specifications: [
      { label: "Seating", value: "2" },
      { label: "Rated payload", value: "750 kg" },
      { label: "Fuel", value: "Diesel" },
      { label: "Claimed efficiency", value: "Up to 22 kmpl" },
    ],
    warranty: commercialWarranty,
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks",
  }),
  "maxx-city-cng": detail({
    overview:
      "MAXX CITY CNG is a factory-fitted CNG pickup built for operators who want to keep running costs low on every single trip.",
    idealFor: "Commercial operators who run high daily mileage and want to minimise fuel costs.",
    performance: [
      "1.5L bi-fuel petrol/CNG engine, tuned for load-carrying reliability.",
      "5-speed manual transmission across the range.",
    ],
    safety: [
      "Driver airbag and ABS with EBD are standard on current models.",
    ],
    interior: [
      "2- or 3-seat cabin depending on variant, with a durable, easy-to-clean trim.",
    ],
    exterior: [
      "Compact turning radius designed for tight city streets.",
    ],
    infotainment: [
      "Basic audio and connectivity equipment varies by fleet configuration.",
    ],
    comfort: [
      "Air-conditioning is available on select variants.",
    ],
    variants: [
      "Factory CNG and petrol-only configurations are typically available.",
      "Ask Mahindra Modi for a commercial quotation covering maintenance, insurance and delivery commitments.",
    ],
    specifications: [
      { label: "Seating", value: "2 / 3" },
      { label: "Rated payload", value: "1,025 kg" },
      { label: "Fuel", value: "Petrol + factory CNG" },
      { label: "Claimed CNG efficiency", value: "Up to 14.5 km/kg" },
    ],
    warranty: commercialWarranty,
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks/maxx-city/MAXX.html",
  }),
};

export function getCarDetail(car: Car): CarDetail {
  const researched = carDetails[car.slug];
  if (researched) return researched;

  const isElectric = car.category === "Electric";
  const isCommercial = car.category === "Commercial" || car.category === "Pickup";
  return detail({
    overview: `${car.blurb} This guide brings the core ownership facts together so you can compare the Mahindra ${car.name} on space, efficiency, powertrain choice and everyday equipment before a test drive.`,
    idealFor: `${car.type} buyers looking for a Mahindra that matches their driving needs, budget and preferred fuel type.`,
    performance: [
      `${car.engine}.`,
      `Transmission choices: ${car.transmission}.`,
      `${isElectric ? "Range and charging time depend on battery choice, charger output, state of charge and conditions." : `Claimed efficiency: ${car.mileage}.`}`,
    ],
    safety: [
      "Safety equipment varies by variant; ask for the latest Mahindra feature chart and a trim-wise quotation.",
      "Confirm the exact airbag count, stability-control features, camera and parking-assistance equipment on your preferred version.",
    ],
    interior: [
      `${car.seating}-seat layout with ${car.bootSpace}.`,
      "Request a showroom walkaround to compare seat comfort, rear-room and storage with your regular passengers and luggage.",
    ],
    exterior: [
      `${car.type} body style with the colour choices shown above.`,
      "Paint, wheel design and exterior lighting vary by selected variant and may change with Mahindra's current line-up.",
    ],
    infotainment: [
      "Screen size, smartphone integration, connected-car functions and audio system vary by trim.",
      "Have the advisor demonstrate the exact infotainment system on the version you are considering.",
    ],
    comfort: [
      "Compare manual and automatic options against your daily traffic, highway distance and driving preference.",
      "Check climate control, cruise control and convenience features on the current variant chart.",
    ],
    variants: [
      `Available powertrains: ${car.engine}.`,
      `Available transmissions: ${car.transmission}.`,
      "Colour and feature availability is subject to selected variant and current stock. Mahindra Modi can prepare a side-by-side comparison.",
    ],
    specifications: [
      { label: "Seating", value: car.seating },
      { label: "Fuel", value: car.fuel },
      { label: "Engine / motor", value: car.engine },
      { label: "Transmission", value: car.transmission },
      { label: "Mileage / range", value: car.mileage },
      { label: car.category === "Pickup" || car.category === "Commercial" ? "Payload / space" : "Boot space", value: car.bootSpace },
    ],
    warranty: isElectric ? evWarranty : isCommercial ? commercialWarranty : passengerCarWarranty,
    sourceUrl: "https://auto.mahindra.com",
  });
}

const galleryLabels = ["Front three-quarter", "Side profile", "Rear three-quarter"];

/* Mahindra does not expose a public feature-gallery image set the way
   Hyundai India's site does, but we have curated a set of images 
   for the Thar Roxx to demonstrate the gallery functionality. */
const modelFeatureGallery: Record<string, GalleryImage[]> = {
  "thar-roxx": [
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-exterior-right-front-three-quarter-17.jpeg?isig=0&q=80", alt: "Thar Roxx, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-exterior-left-front-three-quarter-11.jpeg?isig=0&q=80", alt: "Thar Roxx, left front angle", label: "Left front" , kind: "styling" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-exterior-front-view-5.jpeg?isig=0&q=80", alt: "Thar Roxx, front view", label: "Front view", kind: "styling" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-exterior-rear-view-10.jpeg?isig=0&q=80", alt: "Thar Roxx, rear view", label: "Rear view", kind: "styling" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-exterior-right-side-view-9.jpeg?isig=0&q=80", alt: "Thar Roxx, side profile", label: "Side profile", kind: "styling" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-exterior-wheel-5.jpeg?isig=0&q=80", alt: "Thar Roxx, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-dashboard-11.jpeg?isig=0&q=80", alt: "Thar Roxx dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-front-row-seats-9.jpeg?isig=0&q=80", alt: "Thar Roxx front seats", label: "Front Seats", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-rear-seats-9.jpeg?isig=0&q=80", alt: "Thar Roxx rear seats", label: "Rear Seats", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-steering-wheel-10.jpeg?isig=0&q=80", alt: "Thar Roxx steering wheel", label: "Steering Wheel", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-infotainment-system-11.jpeg?isig=0&q=80", alt: "Thar Roxx infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-instrument-cluster-13.jpeg?isig=0&q=80", alt: "Thar Roxx instrument cluster", label: "Instrument Cluster", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-sunroof-moonroof.jpeg?isig=0&q=80", alt: "Thar Roxx sunroof", label: "Sunroof", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-gear-shifter-gear-shifter-stalk-2.jpeg?isig=0&q=80", alt: "Thar Roxx gear shifter", label: "Gear Shifter", kind: "cabin" },
    { src: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/124839/thar-roxx-interior-bootspace-rear-split-seat-folded.jpeg?isig=0&q=80", alt: "Thar Roxx boot space", label: "Boot Space", kind: "cabin" },
  ],
  "xuv-3xo": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/10184/1758199247932/front-left-side-47.jpg", alt: "XUV 3XO, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086388636/front-right-view-120.jpg", alt: "XUV 3XO, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/11686/1778825529790/rear-left-view-121.jpg", alt: "XUV 3XO, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086388636/wheel-42.jpg", alt: "XUV 3XO, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086388636/front-grill---logo-98.jpg", alt: "XUV 3XO, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086388636/headlight-43.jpg", alt: "XUV 3XO, LED light signature", label: "Light signature", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086573592/dashboard-59.jpg", alt: "XUV 3XO dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086573592/steering-wheel-54.jpg", alt: "XUV 3XO steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/11687/1778330978809/instrument-cluster-62.jpg", alt: "XUV 3XO instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086573592/gear-shifter-87.jpg", alt: "XUV 3XO gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/11687/1778825503682/rear-seats-52.jpg", alt: "XUV 3XO rear seats", label: "Rear seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086573592/sun-roof-moon-roof-81.jpg", alt: "XUV 3XO sunroof", label: "Sunroof", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/10184/1751086573592/open-trunk-49.jpg", alt: "XUV 3XO boot space", label: "Boot space", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-3XO/11687/1778825503682/infotainment-system-main-menu-183.jpg", alt: "XUV 3XO infotainment system", label: "Infotainment", kind: "cabin" },
  ],
  thar: [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1776055307473/front-left-side-47.jpg", alt: "Thar, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1759841599514/front-right-view-120.jpg", alt: "Thar, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1759841599514/rear-left-view-121.jpg", alt: "Thar, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1759841599514/rear-view-119.jpg", alt: "Thar, rear view", label: "Rear view", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1759841599514/wheel-42.jpg", alt: "Thar, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/12264/1759841599514/grille-97.jpg", alt: "Thar, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12264/1759841453982/dashboard-59.jpg", alt: "Thar dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12264/1759841453982/steering-wheel-54.jpg", alt: "Thar steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12264/1759841453982/instrument-cluster-62.jpg", alt: "Thar instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12264/1759841453982/gear-shifter-87.jpg", alt: "Thar gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12264/1759841453982/infotainment-stytem-57.jpg", alt: "Thar infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12965/1778825438480/door-view-of-driver-seat-51.jpg", alt: "Thar front seats", label: "Front seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Thar/12264/1759841453982/upholstery-details-135.jpg", alt: "Thar upholstery detail", label: "Upholstery detail", kind: "cabin" },
  ],
  "scorpio-n": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/10818/1755775730308/front-left-side-47.jpg", alt: "Scorpio-N, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/10818/1753879831590/front-right-view-120.jpg", alt: "Scorpio-N, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/10837/1778825393376/rear-left-view-121.jpg", alt: "Scorpio-N, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/11530/1778326472171/rear-view-119.jpg", alt: "Scorpio-N, rear view", label: "Rear view", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/10818/1753879831590/grille-97.jpg", alt: "Scorpio-N, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/10818/1753879831590/front-bumper-222.jpg", alt: "Scorpio-N, front styling detail", label: "Front styling detail", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/dashboard-59.jpg", alt: "Scorpio-N dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/steering-wheel-54.jpg", alt: "Scorpio-N steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/instrument-cluster-62.jpg", alt: "Scorpio-N instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/gear-shifter-87.jpg", alt: "Scorpio-N gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10837/1778825370374/rear-seats-52.jpg", alt: "Scorpio-N rear seats", label: "Rear seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/third-row-seats-274.jpg", alt: "Scorpio-N third-row seats", label: "Third-row seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/open-trunk-49.jpg", alt: "Scorpio-N boot space", label: "Boot space", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio-N/10818/1753880006844/door-view-of-driver-seat-51.jpg", alt: "Scorpio-N front seats", label: "Front seats", kind: "cabin" },
  ],
  "scorpio-classic": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10764/1778474504907/front-left-side-47.jpg", alt: "Scorpio Classic, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10765/1754638266191/front-right-view-120.jpg", alt: "Scorpio Classic, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10765/1754638266191/grille-97.jpg", alt: "Scorpio Classic, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10765/1754638266191/wheel-42.jpg", alt: "Scorpio Classic, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10765/1754638266191/side-step-231.jpg", alt: "Scorpio Classic, side step design detail", label: "Design detail", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio/10765/1754638266191/front-bumper-222.jpg", alt: "Scorpio Classic, front styling detail", label: "Front styling detail", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1754638343028/dashboard-59.jpg", alt: "Scorpio Classic dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1754638343028/steering-wheel-54.jpg", alt: "Scorpio Classic steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1754638343028/instrument-cluster-62.jpg", alt: "Scorpio Classic instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1754638343028/gear-shifter-87.jpg", alt: "Scorpio Classic gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1781759862261/rear-seats-52.jpg", alt: "Scorpio Classic rear seats", label: "Rear seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1754638343028/open-trunk-49.jpg", alt: "Scorpio Classic boot space", label: "Boot space", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1781759862261/infotainment-system-main-menu-183.jpg", alt: "Scorpio Classic infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Scorpio/10765/1754638343028/ac-controls-151.jpg", alt: "Scorpio Classic climate control panel", label: "Climate controls", kind: "cabin" },
  ],
  bolero: [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/10754/1782910868699/front-left-side-47.jpg", alt: "Bolero, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/10754/1782910868699/front-right-view-120.jpg", alt: "Bolero, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/10754/1782910868699/rear-left-view-121.jpg", alt: "Bolero, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/10754/1782910868699/rear-view-119.jpg", alt: "Bolero, rear view", label: "Rear view", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/dashboard-59.jpg", alt: "Bolero dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/steering-wheel-54.jpg", alt: "Bolero steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/instrument-cluster-62.jpg", alt: "Bolero instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/gear-shifter-87.jpg", alt: "Bolero gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/rear-seats-52.jpg", alt: "Bolero rear seats", label: "Rear seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/door-view-of-driver-seat-51.jpg", alt: "Bolero front seats", label: "Front seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero/10754/1782910769724/dashboard-controls-262.jpg", alt: "Bolero dashboard controls", label: "Dashboard controls", kind: "cabin" },
  ],
  "bolero-neo": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero-Neo/10766/1762837382360/front-left-side-47.jpg", alt: "Bolero Neo, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635558577/front-view-118.jpg", alt: "Bolero Neo, front view", label: "Front view", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635558577/grille-97.jpg", alt: "Bolero Neo, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635558577/wheel-42.jpg", alt: "Bolero Neo, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635558577/headlight-43.jpg", alt: "Bolero Neo, LED light signature", label: "Light signature", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635514742/dashboard-59.jpg", alt: "Bolero Neo dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635514742/steering-wheel-54.jpg", alt: "Bolero Neo steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635514742/instrument-cluster-62.jpg", alt: "Bolero Neo instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635514742/gear-shifter-87.jpg", alt: "Bolero Neo gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635514742/center-console-55.jpg", alt: "Bolero Neo centre console", label: "Centre console", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Bolero-Neo/10767/1761635514742/front-armrest-185.jpg", alt: "Bolero Neo front armrest", label: "Front armrest", kind: "cabin" },
  ],
  "xuv-7xo": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-7XO/13188/1778660966146/front-left-side-47.jpg", alt: "XUV 7XO front three-quarter", label: "Front three-quarter" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-7XO/13186/1778657295075/front-view-118.jpg", alt: "XUV 7XO front view", label: "Front view" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-7XO/13186/1778657295075/rear-view-119.jpg", alt: "XUV 7XO rear view", label: "Rear view" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-7XO/13186/1778657295075/side-view-(left)-90.jpg", alt: "XUV 7XO side profile", label: "Side profile" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-7XO/13186/1778657295075/wheel-42.jpg", alt: "XUV 7XO alloy wheel", label: "Alloy wheel" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13187/1778657029458/dashboard-59.jpg", alt: "XUV 7XO dashboard", label: "Dashboard" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13187/1778657029458/steering-wheel-54.jpg", alt: "XUV 7XO steering wheel", label: "Steering wheel" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13187/1778657029458/instrument-cluster-62.jpg", alt: "XUV 7XO instrument cluster", label: "Instrument cluster" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13188/1778657115578/infotainment-system-main-menu-183.jpg", alt: "XUV 7XO infotainment system", label: "Infotainment" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13187/1778657029458/center-console-55.jpg", alt: "XUV 7XO center console", label: "Center console" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13188/1778657115578/rear-seats-with-arm-rest-193.jpg", alt: "XUV 7XO rear seats", label: "Rear seats" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13187/1778657029458/sun-roof-moon-roof-81.jpg", alt: "XUV 7XO panoramic sunroof", label: "Sunroof" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV-7XO/13188/1778657115578/boot-space-with-third-row-folded-279.jpg", alt: "XUV 7XO boot space", label: "Boot space" },
  ],
  marazzo: [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Marazzo/10757/1758198958040/front-left-side-47.jpg", alt: "Marazzo, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Marazzo/10758/1690195787290/front-right-view-120.jpg", alt: "Marazzo, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Marazzo/10758/1690195787290/rear-left-view-121.jpg", alt: "Marazzo, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Marazzo/10758/1690195787290/grille-97.jpg", alt: "Marazzo, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Marazzo/10758/1690195787290/wheel-42.jpg", alt: "Marazzo, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Marazzo/10758/1690195716318/dashboard-59.jpg", alt: "Marazzo dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Marazzo/10758/1690195716318/steering-wheel-54.jpg", alt: "Marazzo steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Marazzo/10758/1690195716318/instrument-cluster-62.jpg", alt: "Marazzo instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Marazzo/10758/1690195716318/center-console-55.jpg", alt: "Marazzo centre console", label: "Centre console", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Marazzo/10758/1690195716318/infotainment-system-main-menu-183.jpg", alt: "Marazzo infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/Marazzo/10758/1690195716318/door-view-of-driver-seat-51.jpg", alt: "Marazzo front seats", label: "Front seats", kind: "cabin" },
  ],
  xuv400: [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV400-EV/11392/1758199122411/front-left-side-47.jpg", alt: "XUV400, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV400-EV/11393/1743155669600/front-view-118.jpg", alt: "XUV400, front view", label: "Front view", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV400-EV/11393/1743155669600/rear-left-view-121.jpg", alt: "XUV400, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV400-EV/11393/1743155669600/grille-97.jpg", alt: "XUV400, closed-off front panel styling", label: "Front panel styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV400-EV/11393/1743155669600/wheel-42.jpg", alt: "XUV400, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV400-EV/11485/1743155564786/dashboard-59.jpg", alt: "XUV400 dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV400-EV/11485/1743155564786/steering-wheel-54.jpg", alt: "XUV400 steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV400-EV/11485/1743155564786/gear-shifter-87.jpg", alt: "XUV400 gear selector", label: "Gear selector", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV400-EV/11485/1743155564786/infotainment-system-main-menu-183.jpg", alt: "XUV400 infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV400-EV/11485/1743155564786/sun-roof-moon-roof-81.jpg", alt: "XUV400 sunroof", label: "Sunroof", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XUV400-EV/11485/1743155564786/seat-headrest-200.jpg", alt: "XUV400 seat detail", label: "Seat detail", kind: "cabin" },
  ],
  "xev-9e": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XEV-9e/9262/1755776058045/front-left-side-47.jpg", alt: "XEV 9e, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XEV-9e/9262/1753869054219/front-right-view-120.jpg", alt: "XEV 9e, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XEV-9e/9262/1753869054219/rear-left-view-121.jpg", alt: "XEV 9e, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XEV-9e/9262/1753869054219/rear-view-119.jpg", alt: "XEV 9e, rear view", label: "Rear view", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XEV-9e/9262/1753868921029/grille-97.jpg", alt: "XEV 9e, closed-off front panel styling", label: "Front panel styling", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XEV-9e/9262/1753869344424/dashboard-59.jpg", alt: "XEV 9e dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XEV-9e/9262/1753869344424/steering-wheel-54.jpg", alt: "XEV 9e steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XEV-9e/9262/1753869344424/instrument-cluster-62.jpg", alt: "XEV 9e instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XEV-9e/9262/1753869344424/rear-seats-52.jpg", alt: "XEV 9e rear seats", label: "Rear seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XEV-9e/9262/1753869344424/door-view-of-driver-seat-51.jpg", alt: "XEV 9e front seats", label: "Front seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/XEV-9e/9262/1753869540358/passenger-cabin-view-132.jpg", alt: "XEV 9e cabin view", label: "Cabin view", kind: "cabin" },
  ],
  "be-6": [
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/BE-6/9263/1762423834412/front-left-side-47.jpg", alt: "BE 6, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/BE-6/9263/1756377780877/front-right-view-120.jpg", alt: "BE 6, side profile", label: "Side profile", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/BE-6/9263/1756377780877/front-bumper-222.jpg", alt: "BE 6, front styling detail", label: "Front styling detail", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/BE-6/9263/1756377780877/front-fender-223.jpg", alt: "BE 6, body styling detail", label: "Body styling detail", kind: "styling" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/BE-6/9263/1756377505988/dashboard-59.jpg", alt: "BE 6 dashboard", label: "Dashboard", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/BE-6/9263/1756377505988/steering-wheel-54.jpg", alt: "BE 6 steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/BE-6/9263/1756377505988/instrument-cluster-62.jpg", alt: "BE 6 instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/BE-6/9263/1756377505988/door-view-of-driver-seat-51.jpg", alt: "BE 6 front seats", label: "Front seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/BE-6/9263/1756377602498/rear-seats-with-arm-rest-193.jpg", alt: "BE 6 rear seats", label: "Rear seats", kind: "cabin" },
    { src: "https://stimg.cardekho.com/images/carinteriorimages/930x620/Mahindra/BE-6/9263/1756377505988/passenger-cabin-view-132.jpg", alt: "BE 6 cabin view", label: "Cabin view", kind: "cabin" },
  ],
  "bolero-maxx-pik-up": [
    { src: "https://truckcdn.cardekho.com/in/mahindra/bolero-maxx-pik-up/mahindra-bolero-maxx-pik-up-exterior-103825.jpg", alt: "Bolero Maxx Pik-Up, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/bolero-maxx-pik-up/mahindra-bolero-maxx-pik-up-exterior-539740.jpg", alt: "Bolero Maxx Pik-Up, side profile", label: "Side profile", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/bolero-maxx-pik-up/mahindra-bolero-maxx-pik-up-exterior-684528.jpg", alt: "Bolero Maxx Pik-Up, rear view", label: "Rear view", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/bolero-maxx-pik-up/mahindra-bolero-maxx-pik-up-exterior-351747.jpg", alt: "Bolero Maxx Pik-Up, cargo bed styling", label: "Cargo bed styling", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/bolero-maxx-pik-up/mahindra-bolero-maxx-pik-up-interior-979540.jpg", alt: "Bolero Maxx Pik-Up cabin", label: "Cabin", kind: "cabin" },
  ],
  "supro-profit-truck": [
    { src: "https://truckcdn.cardekho.com/in/mahindra/supro-maxitruck/t2/exterior/0.jpg", alt: "Supro Profit Truck, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/supro-maxitruck/t2/exterior/1.jpg", alt: "Supro Profit Truck, side profile", label: "Side profile", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/supro-maxitruck/t2/exterior/2.jpg", alt: "Supro Profit Truck, rear view", label: "Rear view", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/supro-maxitruck/t2/exterior/3.jpg", alt: "Supro Profit Truck, cargo body styling", label: "Cargo body styling", kind: "styling" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/supro-maxitruck/t2/interior/0.jpg", alt: "Supro Profit Truck cabin", label: "Cabin", kind: "cabin" },
    { src: "https://truckcdn.cardekho.com/in/mahindra/supro-maxitruck/t2/interior/2.jpg", alt: "Supro Profit Truck dashboard", label: "Dashboard", kind: "cabin" },
  ],
};

/* No confirmed Mahindra brochure URLs were available to link directly,
   so this map stays empty and getCarBrochure() returns undefined —
   CarDetailClient already renders the "Download Brochure" button
   conditionally and hides it cleanly when this happens. */
const brochurePathBySlug: Record<string, string> = {
  "xuv-7xo": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw5ba5f731/XUV-7XO/brochures/XUV-7XO-Brochure.pdf",
  "thar-roxx": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw1e1f0b3f/thar-roxx/THAR-ROXX-Brochure-20-April-26.pdf",
  "thar": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dwd39c2522/brochure/Thar-Brochure-2025-NEW.pdf",
  "scorpio-n": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw648313f2/SCN/Scorpio-Big-Daddy_Horizontal-Brochure-0807.pdf",
  "xuv-3xo": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw54d8b67d/X3XO/XUV_3XO_Brochure.pdf",
  "scorpio-classic": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw50e4041a/SCRC/brochure/Scorpio-Classic-Accessories-Brochure.pdf",
  "bolero": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw5e3dbfce/Bolero/brochure/Bolero-Accessories-brochure.pdf",
  "bolero-neo": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dwc3956d51/NEO/Bolero-Neo-Accessories-brochure.pdf",
  "bolero-neo-plus": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dwa63dc1a3/NEOP/pdfs/Bolero-Neo-Plus.pdf",
  "xuv400": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw4dc915da/mahindraelectricimages/images/xuv400images/XUV400ProRangeBrochure.pdf",
  "marazzo": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dwa00130f0/Marazzo/Marazzo_Brochure.pdf",
  "xuv3xo-ev": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw485a2dcf/X3XO/29-06-MM-3XO-EV-BROCHURE_R3.pdf",
  "xev-9e": "https://www.mahindraelectricsuv.com/on/demandware.static/-/Library-Sites-eSUVSharedLibrary/default/dweb0d1969/MXV9/XEV9e_BROCHURE_R1_20260428.pdf",
  "be-6": "https://www.mahindraelectricsuv.com/on/demandware.static/-/Library-Sites-eSUVSharedLibrary/default/MBE6/BE-6-Brochure-V29.pdf",
  "bolero-maxx-pik-up": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw55120724/Pik-up/Pikup-brochure-PDF.pdf",
  "maxx-city-cng": "https://auto.mahindra.com/on/demandware.static/-/Sites-amc-Library/default/dw9d5e36d0/MAXX/AUTO-BOLERO-SM-A4-CITY-8-PG-BROCHURE-R1-FOR-WEB.pdf",
};

export function getCarBrochure(car: Car): string | undefined {
  return brochurePathBySlug[car.slug];
}

/* Mahindra product shots are single confirmed images (not 360-degree
   turntable frame sets like Hyundai's), so the gallery is simply the
   main product image plus any curated feature images for that model. */
export function getCarGallery(car: Car): GalleryImage[] {
  const exterior = [{ src: car.image, alt: car.alt, label: galleryLabels[0], kind: "styling" as const }];
  return [...exterior, ...(modelFeatureGallery[car.slug] ?? [])];
}
