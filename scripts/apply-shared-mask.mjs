// Applies one image's alpha channel (produced by remove-bg.mjs) onto a batch
// of pixel-aligned sibling photos — same studio shot, same car pose, only
// paint colour differs. Needed when the reference colour (e.g. white) is too
// close to the studio backdrop for flood-fill background removal to find a
// clean edge on its own; a darker sibling's already-clean silhouette stands
// in for all of them.
import sharp from "sharp";
import { readFileSync } from "node:fs";

const [, , maskPath, ...targets] = process.argv;
if (!maskPath || targets.length === 0) {
  console.error("Usage: node apply-shared-mask.mjs <mask.png> <input1.jpg=output1.png> [...]");
  process.exit(1);
}

const maskImg = sharp(maskPath).ensureAlpha();
const { data: maskData, info: maskInfo } = await maskImg.raw().toBuffer({ resolveWithObject: true });

for (const pair of targets) {
  const [inputPath, outputPath] = pair.split("=");
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== maskInfo.width || info.height !== maskInfo.height) {
    throw new Error(`${inputPath} is ${info.width}x${info.height}, mask is ${maskInfo.width}x${maskInfo.height}`);
  }
  for (let i = 0; i < info.width * info.height; i++) {
    data[i * info.channels + 3] = maskData[i * maskInfo.channels + 3];
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toFile(outputPath);
  console.log("done", outputPath);
}
