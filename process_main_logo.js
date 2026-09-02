const sharp = require('sharp');

async function processImage() {
  const inputFile = 'public/images/logo.png';
  const outputFile = 'public/images/logo_edited.png';
  const img = sharp(inputFile);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  
  const colCount = new Array(info.width).fill(0);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const alpha = info.channels === 4 ? data[idx+3] : 255;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 200 && g < 200 && b < 200 && alpha > 50) colCount[x]++;
    }
  }
  
  let dividerCol = -1;
  for (let x = Math.floor(info.width * 0.4); x < info.width * 0.6; x++) {
    if (colCount[x] > info.height * 0.7) { // A vertical line should be tall
      dividerCol = x;
      break;
    }
  }
  
  console.log("Divider found at column:", dividerCol);
  
  // Find where the logos end and text begins. The gap script previously found:
  // Gap from 959 to 1038 (height: 80)
  // This means logos end at 959, and text starts at 1038.
  
  const outData = Buffer.from(data);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      let erase = false;
      
      // Erase divider
      if (dividerCol !== -1 && Math.abs(x - dividerCol) <= 15) { // might be thicker
        erase = true;
      }
      
      // Erase text
      if (y > 900) { // Erase everything after row 900
        erase = true;
      }
      
      if (erase) {
        const idx = (y * info.width + x) * info.channels;
        // set transparent
        outData[idx] = 0;
        outData[idx+1] = 0;
        outData[idx+2] = 0;
        if (info.channels === 4) {
          outData[idx+3] = 0;
        }
      }
    }
  }
  
  await sharp(outData, { raw: info })
    .png()
    .toFile(outputFile);
    
  console.log('Saved edited image to', outputFile);
}

processImage().catch(console.error);
