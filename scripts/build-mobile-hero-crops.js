// One-off build script: composes a portrait mobile hero image per slide by
// stacking a crop of the headline band over a crop of the car band, both
// taken from the same landscape campaign banner. Mirrors what
// auto.mahindra.com does with hand-made portrait creative per campaign —
// we only have one landscape source per slide, so this recomposes it
// instead of relying on a single flat crop (which either loses the car or
// chops the headline). Run with: node scripts/build-mobile-hero-crops.js
const sharp = require("sharp");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "public", "images", "home");
const OUT_DIR = path.join(SRC_DIR, "mobile");
const OUT_WIDTH = 1080;

// Each slide: source file, a crop rect around the headline text, and a
// crop rect around the car, in source-image pixel coordinates. Rects
// picked by eye from the source banners.
const slides = [
  {
    file: "hero-xuv3xo-adventure.jpg",
    out: "hero-xuv3xo-adventure-mobile.jpg",
    // Trimmed to end above the "XUV 3XO TURNS 2" badge, so the badge only
    // appears once (in the car band below) instead of being split across
    // both bands at two different scales.
    text: { left: 530, top: 40, width: 1230, height: 230 },
    car: { left: 610, top: 270, width: 1090, height: 475 },
  },
  {
    file: "hero-xuv7xo-milestone.jpg",
    out: "hero-xuv7xo-milestone-mobile.jpg",
    text: { left: 320, top: 40, width: 520, height: 300 },
    car: { left: 380, top: 340, width: 950, height: 350 },
  },
  {
    file: "hero-xuv7xo-booking.jpg",
    out: "hero-xuv7xo-booking-mobile.jpg",
    text: { left: 480, top: 25, width: 950, height: 200 },
    car: { left: 380, top: 230, width: 1180, height: 599 },
  },
  {
    file: "hero-xuv3xo-gst.jpg",
    out: "hero-xuv3xo-gst-mobile.jpg",
    text: { left: 920, top: 175, width: 970, height: 210 },
    car: { left: 0, top: 140, width: 760, height: 560 },
  },
  {
    file: "hero-adventure-explore.jpg",
    out: "hero-adventure-explore-mobile.jpg",
    text: { left: 70, top: 100, width: 840, height: 500 },
    car: { left: 940, top: 140, width: 910, height: 689 },
  },
  {
    file: "hero-xuv3xo-banner.jpg",
    out: "hero-xuv3xo-banner-mobile.jpg",
    text: { left: 70, top: 220, width: 690, height: 260 },
    car: { left: 890, top: 140, width: 1010, height: 605 },
  },
  {
    file: "hero-be6-freedom.png",
    out: "hero-be6-freedom-mobile.jpg",
    text: { left: 70, top: 510, width: 700, height: 270 },
    car: { left: 800, top: 70, width: 610, height: 680 },
  },
];

async function buildOne(slide) {
  const srcPath = path.join(SRC_DIR, slide.file);
  const outPath = path.join(OUT_DIR, slide.out);

  const bandHeight = (rect) => Math.round((OUT_WIDTH / rect.width) * rect.height);

  const textOutH = bandHeight(slide.text);
  const carOutH = bandHeight(slide.car);

  const [textBuf, carBuf] = await Promise.all([
    sharp(srcPath).extract(slide.text).resize(OUT_WIDTH, textOutH).toBuffer(),
    sharp(srcPath).extract(slide.car).resize(OUT_WIDTH, carOutH).toBuffer(),
  ]);

  await sharp({
    create: {
      width: OUT_WIDTH,
      height: textOutH + carOutH,
      channels: 3,
      background: "#1a1a1a",
    },
  })
    .composite([
      { input: textBuf, left: 0, top: 0 },
      { input: carBuf, left: 0, top: textOutH },
    ])
    .jpeg({ quality: 88 })
    .toFile(outPath);

  console.log(`${slide.out}  ${OUT_WIDTH}x${textOutH + carOutH}`);
}

(async () => {
  for (const slide of slides) {
    await buildOne(slide);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
