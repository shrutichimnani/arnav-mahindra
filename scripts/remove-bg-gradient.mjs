// Variant of remove-bg.mjs for banners with a non-uniform backdrop (a blue
// gradient sky + grey asphalt ground + white marketing text overlay), rather
// than a flat studio backdrop. Flood-fills from the border through any pixel
// that's either blue-sky-ish or grey/white-ish, leaving only the car body
// (dark, warm-toned) untouched. Within that flooded region, only pixels
// notably darker than typical ground/sky tone (the true shadow gradient
// right under the car) fade back in partially — everything else (sky, far
// asphalt, "20K Deliveries" text) goes fully transparent.
import sharp from "sharp";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node remove-bg-gradient.mjs <input> <output>");
  process.exit(1);
}

const image = sharp(inputPath).ensureAlpha();
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const isBackgroundish = (r, g, b) => {
  const luma = (r + g + b) / 3;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  const isBlueSky = b - r > 15 && luma > 80;
  const isGreyOrWhite = sat < 35 && luma > 80;
  return isBlueSky || isGreyOrWhite;
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

// A background pixel only gets to keep partial "shadow" opacity if it's
// within a short distance of the car silhouette (the non-flood-filled
// pixels). Otherwise mid-tone asphalt far from the car — which reads at a
// similar darkness to the true shadow — would also stay partially visible,
// leaving a wide grey wash instead of just a shadow directly under the car.
const SHADOW_REACH = 45; // px
const nearCar = new Uint8Array(width * height);
{
  const q2 = new Int32Array(width * height);
  let h2 = 0;
  let t2 = 0;
  const dist = new Int16Array(width * height).fill(-1);
  for (let i = 0; i < width * height; i++) {
    if (!visited[i]) {
      dist[i] = 0;
      q2[t2++] = i;
    }
  }
  while (h2 < t2) {
    const idx = q2[h2++];
    const d = dist[idx];
    if (d >= SHADOW_REACH) continue;
    const x = idx % width;
    const y = (idx / width) | 0;
    const neigh = [];
    if (x > 0) neigh.push(idx - 1);
    if (x < width - 1) neigh.push(idx + 1);
    if (y > 0) neigh.push(idx - width);
    if (y < height - 1) neigh.push(idx + width);
    for (const n of neigh) {
      if (dist[n] !== -1) continue;
      dist[n] = d + 1;
      nearCar[n] = 1;
      q2[t2++] = n;
    }
  }
}

for (let i = 0; i < width * height; i++) {
  if (!visited[i]) continue;
  const p = i * channels;
  if (!nearCar[i]) {
    data[p + 3] = 0;
    continue;
  }
  const r = data[p];
  const g = data[p + 1];
  const b = data[p + 2];
  const luma = (r + g + b) / 3;
  // Clearly-lit background (bright sky, bright asphalt, white text) -> gone.
  // Only the darker shadow band right under the car fades back in, and only
  // partially, tapering to nothing as it lightens back to normal ground tone.
  const alpha = luma > 150 ? 0 : Math.max(0, Math.min(190, Math.round((150 - luma) * 2.6)));
  data[p + 3] = alpha;
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log("done", outputPath);
