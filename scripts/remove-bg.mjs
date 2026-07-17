// One-off background-removal utility: floods in from the image border through
// connected near-uniform background pixels (the studio backdrop, whatever
// its actual tone — white, light grey, etc. — plus the soft shadow gradient)
// and makes them transparent, tapering alpha smoothly so the shadow still
// reads. Pixels not reachable from the border — i.e. anything enclosed by
// the car's silhouette, including bright chrome/glass highlights — are left
// fully opaque, so it doesn't punch holes in the car.
import sharp from "sharp";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node remove-bg.mjs <input> <output>");
  process.exit(1);
}

const image = sharp(inputPath).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Reference background tone, sampled from a guaranteed-background corner
// pixel, rather than assuming the backdrop is pure white. This is what
// makes flat grey (or any-tone) studio backdrops fade to full transparency
// instead of just a partial "wash", while true shadow — visibly darker
// than this reference — still tapers in smoothly.
const refIdx = (2 * width + 2) * channels;
const refLuma = (data[refIdx] + data[refIdx + 1] + data[refIdx + 2]) / 3;

const isBackgroundish = (r, g, b) => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const sat = max - min; // low saturation = grayscale (backdrop/shadow)
  const luma = (r + g + b) / 3;
  // Background-connected pixels can be as dark as a deep shadow core, so
  // this only needs to reject saturated (coloured) or very dark car pixels.
  return sat < 26 && luma > Math.min(90, refLuma - 90);
};

const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let qHead = 0;
let qTail = 0;

const push = (x, y) => {
  const idx = y * width + x;
  if (visited[idx]) return;
  const p = idx * channels;
  if (!isBackgroundish(data[p], data[p + 1], data[p + 2])) return;
  visited[idx] = 1;
  queue[qTail++] = idx;
};

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

while (qHead < qTail) {
  const idx = queue[qHead++];
  const x = idx % width;
  const y = (idx / width) | 0;
  if (x > 0) push(x - 1, y);
  if (x < width - 1) push(x + 1, y);
  if (y > 0) push(x, y - 1);
  if (y < height - 1) push(x, y + 1);
}

for (let i = 0; i < width * height; i++) {
  if (!visited[i]) continue;
  const p = i * channels;
  const r = data[p];
  const g = data[p + 1];
  const b = data[p + 2];
  const avg = (r + g + b) / 3;
  // At the reference background tone -> alpha 0 (fully transparent). Only
  // pixels notably darker than that reference (the true shadow core right
  // under the car) fade back in, and only partially.
  const darkerBy = Math.max(0, refLuma - avg);
  const alpha = Math.max(0, Math.min(220, Math.round(darkerBy * 4)));
  data[p + 3] = alpha;
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log("done", outputPath, "refLuma", refLuma);
