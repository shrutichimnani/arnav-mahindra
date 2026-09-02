const sharp = require('sharp');

async function analyzeLogo() {
  const inputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/.user_uploaded/media_1788343767621.png';
  const img = sharp(inputFile);
  const metadata = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  
  const rowAlpha = new Array(info.height).fill(0);
  const colAlpha = new Array(info.width).fill(0);
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      // Image has white background, find dark pixels
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // assuming it's black/dark logos
      if (r < 200 && g < 200 && b < 200) {
        rowAlpha[y]++;
        colAlpha[x]++;
      }
    }
  }
  
  console.log("Column pixel counts:");
  let res = "";
  for(let x=0; x<info.width; x++) {
      if(colAlpha[x] > 0) res += x + ":" + colAlpha[x] + " ";
  }
  console.log(res.substring(0, 500));
  
  console.log("Row pixel counts:");
  res = "";
  for(let y=0; y<info.height; y++) {
      if(rowAlpha[y] > 0) res += y + ":" + rowAlpha[y] + " ";
  }
  console.log(res);
}

analyzeLogo().catch(console.error);
