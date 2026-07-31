/* One-off script: downloads curated interior & exterior images of the
   Mahindra Bolero Neo Plus from CarDekho, resizes and compresses them
   with sharp, and saves them as .webp into
   public/images/cars/gallery/bolero-neo-plus/ so the car detail page
   serves a real official image gallery instead of just the hero shot.
   Mirrors the approach in fetch-location-images.mjs.
   Run: node scripts/fetch-bolero-neo-plus-gallery.mjs */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "cars", "gallery", "bolero-neo-plus");

const BASE = "https://stimg.cardekho.com/images";

/* Curated set mirroring the breadth of the other model galleries
   (exterior styling + cabin). Labels match the GalleryImage.label
   strings used in lib/car-details.ts. */
const sources = {
  // Exterior / styling
  "bolero-neo-plus-01-front-left-side-47": `${BASE}/carexteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1758198862271/front-left-side-47.jpg`,
  "bolero-neo-plus-02-grille-97": `${BASE}/carexteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257900879/grille-97.jpg`,
  "bolero-neo-plus-03-wheel-42": `${BASE}/carexteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257900879/wheel-42.jpg`,
  "bolero-neo-plus-04-front-fog-lamp-41": `${BASE}/carexteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257900879/front-fog-lamp-41.jpg`,
  "bolero-neo-plus-05-body-shell-164": `${BASE}/carexteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1749624850374/exterior-image-164.jpg`,
  "bolero-neo-plus-06-mahindra-badging-165": `${BASE}/carexteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1749624850374/exterior-image-165.jpg`,
  // Interior / cabin
  "bolero-neo-plus-07-dashboard-59": `${BASE}/carinteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257865059/dashboard-59.jpg`,
  "bolero-neo-plus-08-door-view-of-driver-seat-51": `${BASE}/carinteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257865059/door-view-of-driver-seat-51.jpg`,
  "bolero-neo-plus-09-seats-aerial-view-53": `${BASE}/carinteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257865059/seats-(aerial-view)-53.jpg`,
  "bolero-neo-plus-10-airbags-94": `${BASE}/carinteriorimages/930x620/Mahindra/Bolero-Neo-Plus/9137/1713257865059/airbags-94.jpg`,
};

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(sources)) {
  const dest = path.join(outDir, `${name}.webp`);
  process.stdout.write(`Fetching ${name}... `);
  const start = Date.now();
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = await sharp(buf)
    .resize({ width: 900, height: 600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 72 })
    .toBuffer();
  await writeFile(dest, out);
  console.log(
    `${(buf.length / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB in ${Date.now() - start}ms`,
  );
}

console.log("Done.");
