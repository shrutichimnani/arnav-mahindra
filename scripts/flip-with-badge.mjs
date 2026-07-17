// Flips a right-facing car product shot to face left, but pastes the
// original (un-mirrored) number-plate/badge crop back on top afterwards —
// otherwise a plain horizontal flip would mirror the badge text into
// backwards characters. Same technique used for the Marazzo homepage image.
import sharp from "sharp";

const [, , inputPath, outputPath, leftStr, topStr, widthStr, heightStr] = process.argv;
if (!inputPath || !outputPath || !leftStr) {
  console.error(
    "Usage: node flip-with-badge.mjs <input> <output> <badgeLeft> <badgeTop> <badgeWidth> <badgeHeight>",
  );
  process.exit(1);
}
const badgeLeft = Number(leftStr);
const badgeTop = Number(topStr);
const badgeWidth = Number(widthStr);
const badgeHeight = Number(heightStr);

const meta = await sharp(inputPath).metadata();
const { width } = meta;

const badgeCrop = await sharp(inputPath)
  .extract({ left: badgeLeft, top: badgeTop, width: badgeWidth, height: badgeHeight })
  .toBuffer();

const mirroredLeft = width - badgeLeft - badgeWidth;

await sharp(inputPath)
  .flop()
  .composite([{ input: badgeCrop, left: mirroredLeft, top: badgeTop }])
  .png()
  .toFile(outputPath);

console.log("done", outputPath, "badge pasted at", mirroredLeft, badgeTop);
