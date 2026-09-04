import fs from 'fs';
import path from 'path';
import jpeg from 'jpeg-js';

const dirs = [
  'assets/images/english',
  'assets/images/telugu'
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

function createGradientJpg(filePath, width, height, colorA, colorB, colorC, isTelugu = false) {
  const frameData = Buffer.alloc(width * height * 4);
  let i = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / (width - 1);
      const v = y / (height - 1);
      
      // Radial + linear festive blend
      const cx = 0.5;
      const cy = 0.45;
      const dist = Math.sqrt((u - cx) * (u - cx) + (v - cy) * (v - cy)) * 1.4;
      const t = Math.min(1, Math.max(0, u * 0.4 + v * 0.6));

      let r, g, b;
      if (t < 0.5) {
        const factor = t * 2;
        r = colorA[0] * (1 - factor) + colorB[0] * factor;
        g = colorA[1] * (1 - factor) + colorB[1] * factor;
        b = colorA[2] * (1 - factor) + colorB[2] * factor;
      } else {
        const factor = (t - 0.5) * 2;
        r = colorB[0] * (1 - factor) + colorC[0] * factor;
        g = colorB[1] * (1 - factor) + colorC[1] * factor;
        b = colorB[2] * (1 - factor) + colorC[2] * factor;
      }

      // Add gentle center glow or watercolor vignette
      const vignette = 1 - Math.min(0.3, dist * 0.3);
      r = Math.min(255, Math.max(0, r * vignette));
      g = Math.min(255, Math.max(0, g * vignette));
      b = Math.min(255, Math.max(0, b * vignette));

      // Subtle paper/canvas texture variation
      const noise = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
      const noiseAmt = isTelugu ? 6 : 4;
      r = Math.min(255, Math.max(0, r + (noise - 0.5) * noiseAmt));
      g = Math.min(255, Math.max(0, g + (noise - 0.5) * noiseAmt));
      b = Math.min(255, Math.max(0, b + (noise - 0.5) * noiseAmt));

      frameData[i++] = Math.round(r);
      frameData[i++] = Math.round(g);
      frameData[i++] = Math.round(b);
      frameData[i++] = 255;
    }
  }

  const rawImageData = {
    data: frameData,
    width,
    height
  };
  const jpegImageData = jpeg.encode(rawImageData, 88);
  fs.writeFileSync(filePath, jpegImageData.data);
  console.log('Created:', filePath);
}

const W = 800;
const H = 600;

// English images
createGradientJpg('assets/images/english/hero.jpg', W, H, [245, 158, 11], [180, 83, 9], [120, 20, 50], false);
createGradientJpg('assets/images/english/haldi.jpg', W, H, [254, 240, 138], [245, 158, 11], [217, 119, 6], false);
createGradientJpg('assets/images/english/mehndi.jpg', W, H, [217, 249, 157], [77, 124, 15], [21, 128, 61], false);
createGradientJpg('assets/images/english/sangeet.jpg', W, H, [251, 207, 232], [147, 51, 234], [88, 28, 135], false);
createGradientJpg('assets/images/english/wedding.jpg', W, H, [254, 215, 170], [185, 28, 28], [127, 29, 29], false);
createGradientJpg('assets/images/english/reception.jpg', W, H, [224, 231, 255], [67, 56, 202], [30, 27, 75], false);

// Telugu images (Bapu watercolor muted palette: ivory, turmeric ochre, warm terracotta)
createGradientJpg('assets/images/telugu/hero.jpg', W, H, [254, 252, 240], [246, 223, 174], [194, 120, 78], true);
createGradientJpg('assets/images/telugu/haldi.jpg', W, H, [255, 251, 235], [253, 230, 138], [217, 140, 30], true);
createGradientJpg('assets/images/telugu/mehndi.jpg', W, H, [247, 250, 240], [197, 218, 168], [101, 130, 70], true);
createGradientJpg('assets/images/telugu/sangeet.jpg', W, H, [250, 245, 255], [216, 180, 226], [140, 90, 150], true);
createGradientJpg('assets/images/telugu/wedding.jpg', W, H, [255, 248, 240], [243, 180, 145], [165, 60, 50], true);

console.log('All placeholder images generated successfully.');
