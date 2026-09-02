const sharp = require('sharp');
const fs = require('fs');

async function analyze() {
  const img = sharp('public/images/logo.png');
  const metadata = await img.metadata();
  
  // get raw pixel data
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  
  // calculate row and column profiles of alpha channel (or darkness)
  const rowAlpha = new Array(info.height).fill(0);
  const colAlpha = new Array(info.width).fill(0);
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const alpha = info.channels === 4 ? data[idx + 3] : 255;
      
      // If it's not fully transparent, and not white (if background is white)
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const isDark = (r < 200 || g < 200 || b < 200);
      
      if (alpha > 50 && isDark) {
        rowAlpha[y]++;
        colAlpha[x]++;
      }
    }
  }
  
  // Print horizontal projection (to find where the divider is)
  console.log("Column gaps (empty columns):");
  let gapStart = -1;
  for(let x=0; x<info.width; x++) {
      if (colAlpha[x] === 0) {
          if (gapStart === -1) gapStart = x;
      } else {
          if (gapStart !== -1) {
              if (x - gapStart > 10) console.log(`Gap from ${gapStart} to ${x-1} (width: ${x - gapStart})`);
              gapStart = -1;
          }
      }
  }
  
  // Print vertical projection (to find where the text is vs the logos)
  console.log("Row gaps (empty rows):");
  gapStart = -1;
  for(let y=0; y<info.height; y++) {
      if (rowAlpha[y] === 0) {
          if (gapStart === -1) gapStart = y;
      } else {
          if (gapStart !== -1) {
              if (y - gapStart > 10) console.log(`Gap from ${gapStart} to ${y-1} (height: ${y - gapStart})`);
              gapStart = -1;
          }
      }
  }
  
  // Find divider: a thin column with pixels, surrounded by gaps
  console.log("Looking for divider...");
  for(let x=10; x<info.width-10; x++) {
      if (colAlpha[x] > 0 && colAlpha[x-5] === 0 && colAlpha[x+5] === 0) {
          console.log(`Possible divider at x=${x}`);
      }
  }
}

analyze().catch(console.error);
