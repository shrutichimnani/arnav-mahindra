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
  "xev-9s": detail({
    overview:
      "XEV 9S is Mahindra's flagship electric SUV, built on the INGLO EV platform with three battery pack options, a spacious 6/7-seat cabin and Level 2 ADAS on higher trims.",
    idealFor: "Families who want a genuinely three-row electric SUV with long range and Mahindra's latest EV technology.",
    performance: [
      "Rear-wheel-drive layout with a choice of 59 kWh, 70 kWh or 79 kWh battery packs.",
      "MIDC (P1+P2) claimed range of up to 521 km (59 kWh) or up to 679 km (79 kWh pack).",
      "DC fast-charging from 20-80% in about 20 minutes on the compatible charger for each pack.",
    ],
    safety: [
      "6 airbags on entry variants, 7 airbags (with knee airbag) on higher trims.",
      "Level 2 ADAS with adaptive cruise control and lane-keep assist on Pack Two Above and above.",
    ],
    adas: [
      "Traffic sign recognition, high beam assist and forward collision warning on top trims.",
      "Secure 360 camera with recording and live view on the highest trim.",
    ],
    interior: [
      "6-seat (captain seats, second row) or 7-seat layouts, depending on trim.",
      "527-litre boot with the third row folded, plus a 150-litre front trunk.",
      "Third-row seats with multi-step recline (Club, Calm & Cosy modes).",
    ],
    exterior: [
      "Full-width LED lighting signature with an illuminated front badge on higher trims.",
      "235/60 R18 wheels, styled alloys on mid and top variants.",
    ],
    infotainment: [
      "Triple 31.24 cm (12.3-inch class) displays across instrument cluster, infotainment and co-passenger screen on top trims.",
      "Harman Kardon 16-speaker immersive audio on Pack Two Above and above; wireless charger and OTA updates.",
    ],
    comfort: [
      "Ventilated front and second-row seats, powered driver's seat with memory, on higher trims.",
      "Adaptive suspension with FDD and MTV-CL damping technology on the top variant.",
    ],
    variants: [
      "Pack One Above, Pack Two Above, Pack Three and Pack Three Above, spanning the 59/70/79 kWh battery packs.",
      "6-seat captain-seat layout is available on Pack Two Above, Pack Three and Pack Three Above.",
      "Confirm current battery pack, seating layout and pricing with Mahindra Modi.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,737 × 1,900 × 1,747 mm" },
      { label: "Wheelbase", value: "2,762 mm" },
      { label: "Ground clearance", value: "205 mm unladen (222 mm at battery)" },
      { label: "Battery / motor", value: "59 / 70 / 79 kWh pack, single PMSM, rear-wheel drive" },
      { label: "Claimed range", value: "521-679 km (MIDC P1+P2, depending on pack)" },
      { label: "Boot / frunk", value: "527 L (3rd row folded) + 150 L front trunk" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://www.mahindraelectricsuv.com/esuv/xev-9s.html",
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
  "xuv-3xo-ev": detail({
    overview:
      "XUV 3XO EV brings the XUV 3XO's bold styling, segment-leading ADAS and feature list to Mahindra's electric line-up, with a 39.4 kWh battery, a claimed real-world range of up to 285 km and fast DC charging.",
    idealFor: "City-first buyers who want the XUV 3XO's design and tech but are ready to switch to electric.",
    performance: [
      "Single motor produces 110 kW and 310 Nm, driving the front wheels through a single-speed automatic.",
      "0-100 km/h in a claimed 8.3 seconds, with Fun, Fast and Fearless drive modes to tune throttle response.",
      "39.4 kWh battery offers a real-world range of 270-300 km (up to 285 km claimed, internal tests); a 50 kW DC charger takes it from 0-80% in 50 minutes, while a 7.2 kW AC charger takes 0-100% in 6.5 hours.",
    ],
    safety: [
      "6 airbags (dual front, side and curtain) with a passenger-airbag deactivation switch, ABS with EBD and ESP.",
      "Electronic parking brake, TPMS, a 360-degree camera, ISOFIX child seat anchors and seatbelt reminders.",
    ],
    adas: [
      "Level 2 ADAS with 10 driver-assist features, including Smart Pilot Assist, Adaptive Cruise Control and Forward Collision Warning.",
    ],
    interior: [
      "Twin 26.03 cm (10.25-inch) HD screens for the infotainment and driver display.",
      "Leatherette seats with soft-touch trim, a 6-way adjustable driver seat, rear armrest and 60:40 split rear seats.",
      "First-in-segment dual-zone automatic climate control, plus rear AC vents.",
      "364-litre boot; there's no front trunk, since the EV shares its platform with the ICE XUV 3XO.",
    ],
    exterior: [
      "R17 diamond-cut alloy wheels (R16 on AX5), auto LED projector headlamps and LED DRLs/tail lamps.",
      "Six colours at launch, each also offered as a dual-tone with copper accents on the roof and grille.",
    ],
    infotainment: [
      "Adrenox connected-car tech with 80+ features, standard on both variants.",
      "Wireless Android Auto and Apple CarPlay; Harman Kardon 7-speaker audio with Dolby Atmos on the AX7L.",
    ],
    comfort: [
      "Panoramic Skyroof, wireless charging (15W) and USB-C fast charging front and rear.",
      "Height-adjustable headrests front and rear, and a one-touch up/down power window for the driver.",
    ],
    variants: [
      "AX5 and AX7L span the range, both with the full 80+ Adrenox feature set.",
      "AX7L adds the panoramic sunroof, Harman Kardon audio, ADAS, the 360-degree camera, LED fog lamps and R17 wheels over the AX5's R16 wheels and fabric seats.",
    ],
    specifications: [
      { label: "Battery / motor", value: "39.4 kWh, PMSM · 110 kW / 310 Nm" },
      { label: "Real-world range", value: "270-300 km (up to 285 km claimed, internal tests)" },
      { label: "Charging", value: "0-80% in 50 min (50 kW DC) · 0-100% in 6.5 hrs (7.2 kW AC)" },
      { label: "0-100 km/h", value: "8.3 seconds (claimed)" },
      { label: "Ground clearance", value: "190 mm (as per IS:9435)" },
      { label: "Boot space", value: "364 L" },
    ],
    warranty:
      "3-year/unlimited km vehicle warranty, plus an 8-year/160,000 km battery and motor warranty (whichever is earlier). Extended protection options are available; confirm current terms with Mahindra Modi.",
    sourceUrl: "https://auto.mahindra.com/suv/xuv3xo-ev.html",
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
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks",
  }),
  "bolero-pik-up": detail({
    overview:
      "BOLERO PIK-UP is a tough, high-payload pickup for small business owners who need reliability every single day, with a powerful m2Di diesel and an available 4WD option for tougher terrain.",
    idealFor: "Small business owners and fleet operators who need dependable daily load-carrying capacity, on-road or off it.",
    performance: [
      "1.5L m2Di diesel engine produces 59.7 kW and 220 Nm, tuned for load-carrying torque.",
      "5-speed manual transmission across the range.",
      "7R15 tyres, with an available 4WD option for tough terrain and worksites.",
    ],
    safety: [
      "Driver airbag and ABS with EBD are standard on current models.",
    ],
    interior: [
      "2-seat cabin with a durable, easy-to-clean trim.",
      "Driver seat with headrest and a wider co-driver seat for long working days.",
    ],
    exterior: [
      "Rugged body-on-frame commercial build with a reinforced cargo bed.",
    ],
    infotainment: [
      "Basic audio and connectivity equipment varies by fleet configuration.",
    ],
    comfort: [
      "AC with heater option, and power steering are available on higher trims.",
    ],
    variants: [
      "Five 2WD trims (PIK-UP FB MS CBC through PIK-UP FB PS AC) and five 4WD trims (PIK-UP CBC 4WD Diesel through PIK-UP 4WD AC) span the range.",
      "Ask Mahindra Modi for a commercial quotation covering maintenance, insurance and delivery commitments.",
    ],
    specifications: [
      { label: "Seating", value: "2" },
      { label: "Engine", value: "1.5L m2Di Diesel · 59.7 kW / 220 Nm" },
      { label: "Rated payload", value: "1,440 kg" },
      { label: "Fuel", value: "Diesel" },
      { label: "Tyres", value: "7R15, with available 4WD" },
      { label: "Claimed efficiency", value: "Up to 17 kmpl" },
      { label: "Price range", value: "₹9.35L – ₹10.32L ex-showroom" },
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
  veero: detail({
    overview:
      "VEERO is Mahindra's next-generation light commercial pickup, built on a multi-energy platform with a long cargo box and class-leading payload capability.",
    idealFor: "Small businesses, delivery operators and owner-drivers who need high payload with diesel or CNG flexibility.",
    performance: [
      "mDI 3-cylinder diesel and factory-fitted CNG powertrain options are available.",
      "5-speed manual transmission is tuned for loaded starts and everyday commercial use.",
      "Up to 1,600 kg payload and a 3,035 mm cargo box support high-volume work.",
    ],
    safety: [
      "Driver airbag, ABS with EBD and reverse parking assistance are available by variant.",
      "High-strength cabin structure and visibility-focused design support daily fleet use.",
    ],
    interior: [
      "D+2 smart-cabin layout with practical storage and easy-clean commercial trim.",
      "Ergonomic seating and a modern dashboard keep long workdays comfortable.",
    ],
    exterior: [
      "Long cargo box and robust pickup body designed for demanding loading cycles.",
      "Distinctive Veero front styling with a compact footprint for urban routes.",
    ],
    infotainment: ["Connectivity and audio features vary by commercial variant; ask for the current trim sheet."],
    comfort: ["Air-conditioning, power steering and convenience features vary by selected variant."],
    variants: [
      "V2, V4 and V6 configurations span diesel and CNG options with different cargo-body specifications.",
      "Confirm payload, cargo length, fuel type and body configuration in the fleet quotation.",
    ],
    specifications: [
      { label: "Seating", value: "D+2" },
      { label: "Wheelbase", value: "2,550 mm" },
      { label: "Rated payload", value: "Up to 1,600 kg" },
      { label: "Cargo length", value: "3,035 mm" },
      { label: "Fuel", value: "Diesel / CNG" },
      { label: "Claimed efficiency", value: "Up to 18.4 kmpl" },
    ],
    warranty: commercialWarranty,
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks/veero/UPP.html",
  }),
  "bolero-maxx-hd": detail({
    overview:
      "BOLERO MaXX HD is a heavy-duty pickup for operators who need a rugged workhorse, a long cargo deck and dependable uptime under demanding loads.",
    idealFor: "Fleet and owner-operators carrying heavy goods across city, highway and semi-urban routes.",
    performance: [
      "2.5L m2Di diesel engine delivers strong low-end torque for loaded operation.",
      "5-speed manual transmission prioritises control, durability and efficient hauling.",
      "Payload and cargo-body dimensions vary by the selected MaXX HD configuration.",
    ],
    safety: ["Driver airbag, ABS with EBD and robust ladder-frame construction are available across the range, subject to variant."],
    interior: ["D+2 cabin with durable commercial trim, practical storage and an easy-to-service layout."],
    exterior: ["Long cargo deck, high ground clearance and rugged body-on-frame construction are designed for heavy-duty work."],
    infotainment: ["Audio and connectivity equipment varies by variant and body configuration."],
    comfort: ["Power steering, air-conditioning and convenience equipment vary by selected specification."],
    variants: [
      "MaXX HD variants cover multiple wheelbase, cargo-body and payload configurations.",
      "Confirm the exact payload, deck length, tyres and registration class in your quotation.",
    ],
    specifications: [
      { label: "Seating", value: "D+2" },
      { label: "Fuel", value: "Diesel" },
      { label: "Engine", value: "2.5L m2Di diesel" },
      { label: "Transmission", value: "5-speed manual" },
      { label: "Rated payload", value: "Up to 1,700 kg" },
      { label: "Claimed efficiency", value: "Up to 13.9 kmpl" },
    ],
    warranty: commercialWarranty,
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks/maxx-hd/MXHD.html",
  }),
  "bolero-camper": detail({
    overview:
      "BOLERO CAMPER combines a comfortable double cabin with a practical open cargo deck, making it equally useful for business, farm and lifestyle work.",
    idealFor: "Buyers who need five-seat practicality without giving up a genuine pickup bed and rugged all-terrain ability.",
    performance: [
      "2.5L m2DiCR diesel engine provides dependable torque for mixed passenger-and-load duty.",
      "5-speed manual transmission is paired with a rugged ladder-frame chassis.",
      "Available 4WD configurations add confidence on rough or unpaved routes.",
    ],
    safety: ["Dual airbags, ABS with EBD and a strong body-on-frame structure support occupant protection; equipment varies by variant."],
    interior: ["Spacious double cabin seats five, with durable upholstery and practical storage for work and family use."],
    exterior: ["Distinctive Bolero styling, high ground clearance and an open cargo deck make it versatile across work sites and rural roads."],
    infotainment: ["Audio and connectivity features vary by Camper variant."],
    comfort: ["Air-conditioning, power steering and convenience features vary by selected model and drivetrain."],
    variants: [
      "Camper variants are offered with different payload, wheelbase and 4WD configurations.",
      "Confirm the exact seating, payload, cargo dimensions and 4WD availability before booking.",
    ],
    specifications: [
      { label: "Seating", value: "5" },
      { label: "Fuel", value: "Diesel" },
      { label: "Engine", value: "2.5L m2DiCR diesel" },
      { label: "Transmission", value: "5-speed manual" },
      { label: "Rated payload", value: "Up to 1,000 kg" },
      { label: "Price range", value: "₹10.10L – ₹10.86L ex-showroom" },
    ],
    warranty: commercialWarranty,
    sourceUrl: "https://auto.mahindra.com/pick-up-trucks/bolero-camper/CMPR.html",
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
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-01-thar-roxx-exterior-right-front-three-quarter-17.webp", alt: "Thar Roxx, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-02-thar-roxx-exterior-left-front-three-quarter-11.webp", alt: "Thar Roxx, left front angle", label: "Left front" , kind: "styling" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-03-thar-roxx-exterior-front-view-5.webp", alt: "Thar Roxx, front view", label: "Front view", kind: "styling" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-04-thar-roxx-exterior-rear-view-10.webp", alt: "Thar Roxx, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-05-thar-roxx-exterior-right-side-view-9.webp", alt: "Thar Roxx, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-06-thar-roxx-exterior-wheel-5.webp", alt: "Thar Roxx, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-07-thar-roxx-interior-dashboard-11.webp", alt: "Thar Roxx dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-08-thar-roxx-interior-front-row-seats-9.webp", alt: "Thar Roxx front seats", label: "Front Seats", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-09-thar-roxx-interior-rear-seats-9.webp", alt: "Thar Roxx rear seats", label: "Rear Seats", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-10-thar-roxx-interior-steering-wheel-10.webp", alt: "Thar Roxx steering wheel", label: "Steering Wheel", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-11-thar-roxx-interior-infotainment-system-11.webp", alt: "Thar Roxx infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-12-thar-roxx-interior-instrument-cluster-13.webp", alt: "Thar Roxx instrument cluster", label: "Instrument Cluster", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-13-thar-roxx-interior-sunroof-moonroof.webp", alt: "Thar Roxx sunroof", label: "Sunroof", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-14-thar-roxx-interior-gear-shifter-gear-shifter-stalk-2.webp", alt: "Thar Roxx gear shifter", label: "Gear Shifter", kind: "cabin" },
    { src: "/images/cars/gallery/thar-roxx/thar-roxx-15-thar-roxx-interior-bootspace-rear-split-seat-folded.webp", alt: "Thar Roxx boot space", label: "Boot Space", kind: "cabin" },
  ],
  "xuv-3xo": [
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-01-front-left-side-47.webp", alt: "XUV 3XO, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-02-front-right-view-120.webp", alt: "XUV 3XO, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-03-rear-left-view-121.webp", alt: "XUV 3XO, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-04-wheel-42.webp", alt: "XUV 3XO, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-05-front-grill-logo-98.webp", alt: "XUV 3XO, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-06-headlight-43.webp", alt: "XUV 3XO, LED light signature", label: "Light signature", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-07-dashboard-59.webp", alt: "XUV 3XO dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-08-steering-wheel-54.webp", alt: "XUV 3XO steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-09-instrument-cluster-62.webp", alt: "XUV 3XO instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-10-gear-shifter-87.webp", alt: "XUV 3XO gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-11-rear-seats-52.webp", alt: "XUV 3XO rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-12-sun-roof-moon-roof-81.webp", alt: "XUV 3XO sunroof", label: "Sunroof", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-13-open-trunk-49.webp", alt: "XUV 3XO boot space", label: "Boot space", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo/xuv-3xo-14-infotainment-system-main-menu-183.webp", alt: "XUV 3XO infotainment system", label: "Infotainment", kind: "cabin" },
  ],
  thar: [
    { src: "/images/cars/gallery/thar/thar-01-front-left-side-47.webp", alt: "Thar, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/thar/thar-02-front-right-view-120.webp", alt: "Thar, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/thar/thar-03-rear-left-view-121.webp", alt: "Thar, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/thar/thar-04-rear-view-119.webp", alt: "Thar, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/thar/thar-05-wheel-42.webp", alt: "Thar, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/thar/thar-06-grille-97.webp", alt: "Thar, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/thar/thar-07-dashboard-59.webp", alt: "Thar dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/thar/thar-08-steering-wheel-54.webp", alt: "Thar steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/thar/thar-09-instrument-cluster-62.webp", alt: "Thar instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/thar/thar-10-gear-shifter-87.webp", alt: "Thar gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/thar/thar-11-infotainment-stytem-57.webp", alt: "Thar infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "/images/cars/gallery/thar/thar-12-door-view-of-driver-seat-51.webp", alt: "Thar front seats", label: "Front seats", kind: "cabin" },
    { src: "/images/cars/gallery/thar/thar-13-upholstery-details-135.webp", alt: "Thar upholstery detail", label: "Upholstery detail", kind: "cabin" },
  ],
  "scorpio-n": [
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-01-front-left-side-47.webp", alt: "Scorpio-N, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-02-front-right-view-120.webp", alt: "Scorpio-N, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-03-rear-left-view-121.webp", alt: "Scorpio-N, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-04-rear-view-119.webp", alt: "Scorpio-N, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-05-grille-97.webp", alt: "Scorpio-N, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-06-front-bumper-222.webp", alt: "Scorpio-N, front styling detail", label: "Front styling detail", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-07-dashboard-59.webp", alt: "Scorpio-N dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-08-steering-wheel-54.webp", alt: "Scorpio-N steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-09-instrument-cluster-62.webp", alt: "Scorpio-N instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-10-gear-shifter-87.webp", alt: "Scorpio-N gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-11-rear-seats-52.webp", alt: "Scorpio-N rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-12-third-row-seats-274.webp", alt: "Scorpio-N third-row seats", label: "Third-row seats", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-13-open-trunk-49.webp", alt: "Scorpio-N boot space", label: "Boot space", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-n/scorpio-n-14-door-view-of-driver-seat-51.webp", alt: "Scorpio-N front seats", label: "Front seats", kind: "cabin" },
  ],
  "scorpio-classic": [
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-01-front-left-side-47.webp", alt: "Scorpio Classic, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-02-front-right-view-120.webp", alt: "Scorpio Classic, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-03-grille-97.webp", alt: "Scorpio Classic, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-04-wheel-42.webp", alt: "Scorpio Classic, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-05-side-step-231.webp", alt: "Scorpio Classic, side step design detail", label: "Design detail", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-06-front-bumper-222.webp", alt: "Scorpio Classic, front styling detail", label: "Front styling detail", kind: "styling" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-07-dashboard-59.webp", alt: "Scorpio Classic dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-08-steering-wheel-54.webp", alt: "Scorpio Classic steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-09-instrument-cluster-62.webp", alt: "Scorpio Classic instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-10-gear-shifter-87.webp", alt: "Scorpio Classic gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-11-rear-seats-52.webp", alt: "Scorpio Classic rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-12-open-trunk-49.webp", alt: "Scorpio Classic boot space", label: "Boot space", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-13-infotainment-system-main-menu-183.webp", alt: "Scorpio Classic infotainment system", label: "Infotainment", kind: "cabin" },
    { src: "/images/cars/gallery/scorpio-classic/scorpio-classic-14-ac-controls-151.webp", alt: "Scorpio Classic climate control panel", label: "Climate controls", kind: "cabin" },
  ],
  bolero: [
    { src: "/images/cars/gallery/bolero/bolero-01-front-left-side-47.webp", alt: "Bolero, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero/bolero-02-front-right-view-120.webp", alt: "Bolero, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/bolero/bolero-03-rear-left-view-121.webp", alt: "Bolero, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero/bolero-04-rear-view-119.webp", alt: "Bolero, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/bolero/bolero-05-dashboard-59.webp", alt: "Bolero dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/bolero/bolero-06-steering-wheel-54.webp", alt: "Bolero steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/bolero/bolero-07-instrument-cluster-62.webp", alt: "Bolero instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/bolero/bolero-08-gear-shifter-87.webp", alt: "Bolero gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/bolero/bolero-09-rear-seats-52.webp", alt: "Bolero rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/bolero/bolero-10-door-view-of-driver-seat-51.webp", alt: "Bolero front seats", label: "Front seats", kind: "cabin" },
    { src: "/images/cars/gallery/bolero/bolero-11-dashboard-controls-262.webp", alt: "Bolero dashboard controls", label: "Dashboard controls", kind: "cabin" },
  ],
  "bolero-neo": [
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-01-front-left-side-47.webp", alt: "Bolero Neo, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-02-front-view-118.webp", alt: "Bolero Neo, front view", label: "Front view", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-03-grille-97.webp", alt: "Bolero Neo, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-04-wheel-42.webp", alt: "Bolero Neo, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-05-headlight-43.webp", alt: "Bolero Neo, LED light signature", label: "Light signature", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-06-dashboard-59.webp", alt: "Bolero Neo dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-07-steering-wheel-54.webp", alt: "Bolero Neo steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-08-instrument-cluster-62.webp", alt: "Bolero Neo instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-09-gear-shifter-87.webp", alt: "Bolero Neo gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-10-center-console-55.webp", alt: "Bolero Neo centre console", label: "Centre console", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo/bolero-neo-11-front-armrest-185.webp", alt: "Bolero Neo front armrest", label: "Front armrest", kind: "cabin" },
  ],
  "bolero-neo-plus": [
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-01-front-left-side-47.webp", alt: "Bolero Neo Plus, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-02-grille-97.webp", alt: "Bolero Neo Plus, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-03-wheel-42.webp", alt: "Bolero Neo Plus, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-04-front-fog-lamp-41.webp", alt: "Bolero Neo Plus, front fog lamp", label: "Front fog lamp", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-05-body-shell-164.webp", alt: "Bolero Neo Plus body shell", label: "Body shell", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-06-mahindra-badging-165.webp", alt: "Bolero Neo Plus Mahindra badging", label: "Mahindra badging", kind: "styling" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-07-dashboard-59.webp", alt: "Bolero Neo Plus dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-08-door-view-of-driver-seat-51.webp", alt: "Bolero Neo Plus driver seat", label: "Driver seat", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-09-seats-aerial-view-53.webp", alt: "Bolero Neo Plus seats", label: "Seats", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-neo-plus/bolero-neo-plus-10-airbags-94.webp", alt: "Bolero Neo Plus airbags", label: "Airbags", kind: "cabin" },
  ],
  "xuv-7xo": [
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-01-front-left-side-47.webp", alt: "XUV 7XO front three-quarter", label: "Front three-quarter" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-02-front-view-118.webp", alt: "XUV 7XO front view", label: "Front view" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-03-rear-view-119.webp", alt: "XUV 7XO rear view", label: "Rear view" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-04-side-view-left-90.webp", alt: "XUV 7XO side profile", label: "Side profile" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-05-wheel-42.webp", alt: "XUV 7XO alloy wheel", label: "Alloy wheel" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-06-dashboard-59.webp", alt: "XUV 7XO dashboard", label: "Dashboard" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-07-steering-wheel-54.webp", alt: "XUV 7XO steering wheel", label: "Steering wheel" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-08-instrument-cluster-62.webp", alt: "XUV 7XO instrument cluster", label: "Instrument cluster" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-09-infotainment-system-main-menu-183.webp", alt: "XUV 7XO infotainment system", label: "Infotainment" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-10-center-console-55.webp", alt: "XUV 7XO center console", label: "Center console" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-11-rear-seats-with-arm-rest-193.webp", alt: "XUV 7XO rear seats", label: "Rear seats" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-12-sun-roof-moon-roof-81.webp", alt: "XUV 7XO panoramic sunroof", label: "Sunroof" },
    { src: "/images/cars/gallery/xuv-7xo/xuv-7xo-13-boot-space-with-third-row-folded-279.webp", alt: "XUV 7XO boot space", label: "Boot space" },
  ],
  "xev-9e": [
    { src: "/images/cars/gallery/xev-9e/xev-9e-01-front-left-side-47.webp", alt: "XEV 9e, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-02-front-right-view-120.webp", alt: "XEV 9e, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-03-rear-left-view-121.webp", alt: "XEV 9e, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-04-rear-view-119.webp", alt: "XEV 9e, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-05-grille-97.webp", alt: "XEV 9e, closed-off front panel styling", label: "Front panel styling", kind: "styling" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-06-dashboard-59.webp", alt: "XEV 9e dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-07-steering-wheel-54.webp", alt: "XEV 9e steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-08-instrument-cluster-62.webp", alt: "XEV 9e instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-09-rear-seats-52.webp", alt: "XEV 9e rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-10-door-view-of-driver-seat-51.webp", alt: "XEV 9e front seats", label: "Front seats", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9e/xev-9e-11-passenger-cabin-view-132.webp", alt: "XEV 9e cabin view", label: "Cabin view", kind: "cabin" },
  ],
  "xev-9s": [
    { src: "/images/cars/gallery/xev-9s/xev-9s-01-front-three-quarter.webp", alt: "XEV 9S, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-02-side-profile.webp", alt: "XEV 9S, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-03-rear-three-quarter.webp", alt: "XEV 9S, rear three-quarter", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-04-rear-view.webp", alt: "XEV 9S, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-05-front-view.webp", alt: "XEV 9S, front view and grille", label: "Front view", kind: "styling" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-06-dashboard.webp", alt: "XEV 9S dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-07-steering-wheel.webp", alt: "XEV 9S steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-08-instrument-cluster.webp", alt: "XEV 9S instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-09-front-seats.webp", alt: "XEV 9S front seats", label: "Front seats", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-10-second-row-seats.webp", alt: "XEV 9S second-row seats", label: "Second-row seats", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-11-third-row-seats.webp", alt: "XEV 9S third-row seats", label: "Third-row seats", kind: "cabin" },
    { src: "/images/cars/gallery/xev-9s/xev-9s-12-boot-space.webp", alt: "XEV 9S open boot with third row folded", label: "Boot space", kind: "cabin" },
  ],
  "be-6": [
    { src: "/images/cars/gallery/be-6/be-6-01-front-left-side-47.webp", alt: "BE 6, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/be-6/be-6-02-front-right-view-120.webp", alt: "BE 6, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/be-6/be-6-03-front-bumper-222.webp", alt: "BE 6, front styling detail", label: "Front styling detail", kind: "styling" },
    { src: "/images/cars/gallery/be-6/be-6-04-front-fender-223.webp", alt: "BE 6, body styling detail", label: "Body styling detail", kind: "styling" },
    { src: "/images/cars/gallery/be-6/be-6-05-dashboard-59.webp", alt: "BE 6 dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/be-6/be-6-06-steering-wheel-54.webp", alt: "BE 6 steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/be-6/be-6-07-instrument-cluster-62.webp", alt: "BE 6 instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/be-6/be-6-08-door-view-of-driver-seat-51.webp", alt: "BE 6 front seats", label: "Front seats", kind: "cabin" },
    { src: "/images/cars/gallery/be-6/be-6-09-rear-seats-with-arm-rest-193.webp", alt: "BE 6 rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/be-6/be-6-10-passenger-cabin-view-132.webp", alt: "BE 6 cabin view", label: "Cabin view", kind: "cabin" },
  ],
  "bolero-maxx-pik-up": [
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-01-mahindra-bolero-maxx-pik-up-exterior-103825.webp", alt: "Bolero Maxx Pik-Up, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-02-mahindra-bolero-maxx-pik-up-exterior-539740.webp", alt: "Bolero Maxx Pik-Up, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-03-mahindra-bolero-maxx-pik-up-exterior-684528.webp", alt: "Bolero Maxx Pik-Up, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-04-mahindra-bolero-maxx-pik-up-exterior-351747.webp", alt: "Bolero Maxx Pik-Up, cargo bed styling", label: "Cargo bed styling", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-06-front-grille-909708.webp", alt: "Bolero Maxx Pik-Up, front grille styling", label: "Front grille styling", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-07-rear-three-quarter-485643.webp", alt: "Bolero Maxx Pik-Up, rear three-quarter styling", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-pik-up/bolero-maxx-pik-up-05-mahindra-bolero-maxx-pik-up-interior-979540.webp", alt: "Bolero Maxx Pik-Up cabin", label: "Cabin", kind: "cabin" },
  ],
  "bolero-pik-up": [
    { src: "/images/cars/gallery/bolero-pik-up/bolero-pik-up-01-front-three-quarter-164.webp", alt: "Bolero Pik-Up, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-pik-up/bolero-pik-up-02-side-profile-165.webp", alt: "Bolero Pik-Up, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/bolero-pik-up/bolero-pik-up-03-rear-three-quarter-121.webp", alt: "Bolero Pik-Up, rear three-quarter with cargo bed loaded", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-pik-up/bolero-pik-up-04-off-road-action-168.webp", alt: "Bolero Pik-Up, off-road action shot", label: "Off-road", kind: "styling" },
    { src: "/images/cars/gallery/bolero-pik-up/bolero-pik-up-05-dashboard-59.webp", alt: "Bolero Pik-Up dashboard and steering wheel", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-pik-up/bolero-pik-up-06-front-seats-51.webp", alt: "Bolero Pik-Up front seats", label: "Front seats", kind: "cabin" },
  ],
  "veero": [
    { src: "/images/cars/gallery/veero/veero-01-front-three-quarter-257123.webp", alt: "Veero, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/veero/veero-02-rear-three-quarter-123652.webp", alt: "Veero, rear three-quarter styling", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/veero/veero-03-side-profile-652174.webp", alt: "Veero, side profile with cargo bed", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/veero/veero-04-front-view-191736.webp", alt: "Veero, front view", label: "Front view", kind: "styling" },
    { src: "/images/cars/gallery/veero/veero-05-dashboard-controls-375786.webp", alt: "Veero dashboard controls", label: "Dashboard controls", kind: "cabin" },
    { src: "/images/cars/gallery/veero/veero-06-gear-shifter-983138.webp", alt: "Veero gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/veero/veero-07-center-console-144321.webp", alt: "Veero centre console", label: "Centre console", kind: "cabin" },
    { src: "/images/cars/gallery/veero/veero-08-climate-control-410271.webp", alt: "Veero climate control", label: "Climate control", kind: "cabin" },
  ],
  "xuv-3xo-ev": [
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-01-front-view-118.webp", alt: "XUV 3XO EV, front view", label: "Front view", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-02-rear-view-119.webp", alt: "XUV 3XO EV, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-03-rear-three-quarter-48.webp", alt: "XUV 3XO EV, rear three-quarter styling", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-04-wheel-42.webp", alt: "XUV 3XO EV, alloy wheel design", label: "Wheel design", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-05-front-grill-logo-98.webp", alt: "XUV 3XO EV, front grille styling", label: "Grille styling", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-06-headlight-43.webp", alt: "XUV 3XO EV, LED light signature", label: "Light signature", kind: "styling" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-07-dashboard-59.webp", alt: "XUV 3XO EV dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-08-steering-wheel-54.webp", alt: "XUV 3XO EV steering wheel", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-09-instrument-cluster-62.webp", alt: "XUV 3XO EV instrument cluster", label: "Instrument cluster", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-10-gear-shifter-87.webp", alt: "XUV 3XO EV gear shifter", label: "Gear shifter", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-11-rear-seats-52.webp", alt: "XUV 3XO EV rear seats", label: "Rear seats", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-12-sunroof-81.webp", alt: "XUV 3XO EV Skyroof panoramic sunroof", label: "Skyroof", kind: "cabin" },
    { src: "/images/cars/gallery/xuv-3xo-ev/xuv-3xo-ev-13-infotainment-57.webp", alt: "XUV 3XO EV infotainment system", label: "Infotainment", kind: "cabin" },
  ],
  /* CarDekho only has one clean, unwatermarked photo for this exact HD
     variant, so the rest of this set is sourced from Mahindra's own
     official product page (auto.mahindra.com/pick-up-trucks/maxx-hd) —
     third-party alternatives (e.g. trucksfloor.com) carried a visible
     watermark across every frame, so they were skipped. */
  "bolero-maxx-hd": [
    { src: "/images/cars/gallery/bolero-maxx-hd/bolero-maxx-hd-01-side-profile.webp", alt: "Bolero MaXX HD, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-hd/bolero-maxx-hd-02-front-three-quarter.webp", alt: "Bolero MaXX HD, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-hd/bolero-maxx-hd-03-front-three-quarter-loaded.webp", alt: "Bolero MaXX HD, front three-quarter with a loaded cargo bed", label: "Loaded cargo bed", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-hd/bolero-maxx-hd-04-side-profile-action.webp", alt: "Bolero MaXX HD, side profile action shot", label: "On the move", kind: "styling" },
    { src: "/images/cars/gallery/bolero-maxx-hd/bolero-maxx-hd-05-cabin-seats.webp", alt: "Bolero MaXX HD cabin seats", label: "Cabin seats", kind: "cabin" },
  ],
  "bolero-camper": [
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-01-front-three-quarter.webp", alt: "Bolero Camper, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-02-off-road-action.webp", alt: "Bolero Camper, off-road action shot", label: "Off-road", kind: "styling" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-03-rear-three-quarter.webp", alt: "Bolero Camper, rear three-quarter with open cargo deck", label: "Rear three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-04-side-profile.webp", alt: "Bolero Camper, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-05-steering-wheel-front-seats.webp", alt: "Bolero Camper steering wheel and front seats", label: "Steering wheel", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-06-dashboard.webp", alt: "Bolero Camper dashboard", label: "Dashboard", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-07-center-console.webp", alt: "Bolero Camper centre console and AC controls", label: "Centre console", kind: "cabin" },
    { src: "/images/cars/gallery/bolero-camper/bolero-camper-08-rear-seats.webp", alt: "Bolero Camper rear seats", label: "Rear seats", kind: "cabin" },
  ],
  "supro-profit-truck": [
    { src: "/images/cars/gallery/supro-profit-truck/supro-profit-truck-01-0.webp", alt: "Supro Profit Truck, front three-quarter styling", label: "Front three-quarter", kind: "styling" },
    { src: "/images/cars/gallery/supro-profit-truck/supro-profit-truck-02-1.webp", alt: "Supro Profit Truck, side profile", label: "Side profile", kind: "styling" },
    { src: "/images/cars/gallery/supro-profit-truck/supro-profit-truck-03-2.webp", alt: "Supro Profit Truck, rear view", label: "Rear view", kind: "styling" },
    { src: "/images/cars/gallery/supro-profit-truck/supro-profit-truck-04-3.webp", alt: "Supro Profit Truck, cargo body styling", label: "Cargo body styling", kind: "styling" },
    { src: "/images/cars/gallery/supro-profit-truck/supro-profit-truck-05-0.webp", alt: "Supro Profit Truck cabin", label: "Cabin", kind: "cabin" },
    { src: "/images/cars/gallery/supro-profit-truck/supro-profit-truck-06-2.webp", alt: "Supro Profit Truck dashboard", label: "Dashboard", kind: "cabin" },
  ],
};

/* Brochures are hosted locally under /public/brochures/ so the PDF viewer
   never navigates to an external Mahindra URL. Files were downloaded and
   committed to the repository. */
const brochurePathBySlug: Record<string, string> = {
  "xuv-7xo":            "/brochures/xuv-7xo.pdf",
  "thar-roxx":          "/brochures/thar-roxx.pdf",
  "thar":               "/brochures/thar.pdf",
  "scorpio-n":          "/brochures/scorpio-n.pdf",
  "xuv-3xo":            "/brochures/xuv-3xo.pdf",
  "scorpio-classic":    "/brochures/scorpio-classic.pdf",
  "bolero":             "/brochures/bolero.pdf",
  "bolero-neo":         "/brochures/bolero-neo.pdf",
  "bolero-neo-plus":    "/brochures/bolero-neo-plus.pdf",
  "xev-9e":             "/brochures/xev-9e.pdf",
  "xev-9s":             "/brochures/xev-9s.pdf",
  "be-6":               "/brochures/be-6.pdf",
  "bolero-maxx-pik-up": "/brochures/bolero-maxx-pik-up.pdf",
  "maxx-city-cng":      "/brochures/maxx-city-cng.pdf",
  "xuv-3xo-ev":         "/brochures/xuv-3xo-ev.pdf",
  "bolero-pik-up":      "/brochures/bolero-pik-up.pdf",
  "veero":              "/brochures/veero.pdf",
  "bolero-camper":      "/brochures/bolero-camper.pdf",
  "bolero-maxx-hd":     "/brochures/bolero-maxx-hd.pdf",
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
