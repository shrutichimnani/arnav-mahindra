const sharp = require('sharp');

async function processImage() {
  const inputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/.user_uploaded/media_1788343767621.png';
  const outputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/media_edited.png';
  const img = sharp(inputFile);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const outData = Buffer.from(data);
  
  const colCount = new Array(info.width).fill(0);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] < 200 && data[idx+1] < 200) colCount[x]++;
    }
  }
  
  let dividerCol = -1;
  for (let x = Math.floor(info.width * 0.4); x < info.width * 0.6; x++) {
    if (colCount[x] > 70) {
      dividerCol = x;
      break;
    }
  }
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      let erase = false;
      
      // Erase divider
      if (dividerCol !== -1 && Math.abs(x - dividerCol) <= 2) erase = true;
      
      // Erase everything below row 57
      if (y > 57) erase = true;
      
      if (erase) {
        const idx = (y * info.width + x) * info.channels;
        outData[idx] = 255;
        outData[idx+1] = 255;
        outData[idx+2] = 255;
        if (info.channels === 4) outData[idx+3] = 255;
      }
    }
  }
  
  await sharp(outData, { raw: info }).png().toFile(outputFile);
}
processImage().catch(console.error);
