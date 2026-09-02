const sharp = require('sharp');

async function processImage() {
  const inputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/.user_uploaded/media_1788343767621.png';
  const outputFile = 'C:/Users/Shruti Chimnani/.gemini/antigravity/brain/924c1dc0-90e1-4ed4-93d9-acd6824294b5/.user_uploaded/media_edited.png';
  
  // The image is 240x99. 
  // Let's assume the logos are in the top half, roughly from y=0 to y=60.
  // The left logo is roughly from x=0 to x=115.
  // The right logo is roughly from x=125 to x=240.
  // The divider is around x=118-122.
  
  // Let's extract the left logo
  const leftLogo = await sharp(inputFile)
    .extract({ left: 10, top: 15, width: 105, height: 45 })
    .toBuffer();
    
  // Let's extract the right logo
  const rightLogo = await sharp(inputFile)
    .extract({ left: 125, top: 15, width: 105, height: 45 })
    .toBuffer();
    
  // Combine them without the divider and text
  await sharp({
    create: {
      width: 220,
      height: 60,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 } // or transparent
    }
  })
  .composite([
    { input: leftLogo, left: 0, top: 7 },
    { input: rightLogo, left: 110, top: 7 }
  ])
  .png()
  .toFile(outputFile);
  
  console.log('Saved to', outputFile);
}

processImage().catch(console.error);
