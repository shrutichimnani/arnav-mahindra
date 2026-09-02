const sharp = require('sharp');

async function processImage() {
  const inputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/.user_uploaded/media_1788343767621.png';
  const outputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/.user_uploaded/media_edited.png';
  const img = sharp(inputFile);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  
  // Create a new buffer starting with a copy of original
  const outData = Buffer.from(data);
  
  // Find the divider column by counting dark pixels
  const colCount = new Array(info.width).fill(0);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 200 && g < 200 && b < 200) colCount[x]++;
    }
  }
  
  let dividerCol = -1;
  for (let x = Math.floor(info.width * 0.4); x < info.width * 0.6; x++) {
    if (colCount[x] > 70) {
      dividerCol = x;
      break;
    }
  }
  
  console.log("Divider found at column:", dividerCol);
  
  // Erase divider and text
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      let erase = false;
      
      // Erase divider (and nearby pixels to be safe)
      if (dividerCol !== -1 && Math.abs(x - dividerCol) <= 2) {
        erase = true;
      }
      
      // Erase text (rows > 60 usually contain the text)
      if (y > 60 && y < 95) {
        erase = true;
      }
      
      if (erase) {
        const idx = (y * info.width + x) * info.channels;
        // set to white transparent or white background
        outData[idx] = 255;
        outData[idx+1] = 255;
        outData[idx+2] = 255;
        if (info.channels === 4) {
          outData[idx+3] = 255; // opaque white
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
