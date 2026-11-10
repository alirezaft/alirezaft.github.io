import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Procedurally generates a cyberpunk holographic label sticker texture
 * for the data cartridge using HTML5 Canvas.
 */
export function createCartridgeLabelTexture(
  title: string,
  categoryName: string,
  accentColor: string,
  genre: string = 'CYBER DECK ROM',
  year: string = '2026'
): THREE.CanvasTexture {
  const cacheKey = `${title}_${categoryName}_${accentColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // 1. Base dark foil background
  ctx.fillStyle = '#080a12';
  ctx.fillRect(0, 0, width, height);

  // Subtle carbon grid lines
  ctx.strokeStyle = '#101524';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. High-contrast perimeter warning border
  ctx.strokeStyle = '#1e2638';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  // Corner tech ticks
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(12, 40);
  ctx.lineTo(12, 12);
  ctx.lineTo(40, 12);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(width - 40, 12);
  ctx.lineTo(width - 12, 12);
  ctx.lineTo(width - 12, 40);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(12, height - 40);
  ctx.lineTo(12, height - 12);
  ctx.lineTo(40, height - 12);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - 40, height - 12);
  ctx.lineTo(width - 12, height - 12);
  ctx.lineTo(width - 12, height - 40);
  ctx.stroke();

  // 3. Top Category Header Bar
  ctx.fillStyle = accentColor;
  ctx.fillRect(24, 28, width - 48, 44);

  // Header category text
  ctx.fillStyle = '#05070c';
  ctx.font = 'bold 20px "Courier New", monospace';
  ctx.textBaseline = 'middle';
  ctx.fillText(categoryName.toUpperCase(), 36, 50);

  // Year badge
  ctx.font = 'bold 16px "Courier New", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`// ${year}`, width - 36, 50);
  ctx.textAlign = 'left';

  // 4. Genre Pill Tag
  ctx.fillStyle = '#141a29';
  ctx.fillRect(28, 92, width - 56, 32);
  ctx.strokeStyle = '#2a354d';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 92, width - 56, 32);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px "Courier New", monospace';
  ctx.fillText(`GENRE: ${genre.toUpperCase()}`, 38, 112);

  // 5. Main Project Title (Large Hero Text)
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 36px "Segoe UI", system-ui, sans-serif';
  ctx.textBaseline = 'top';

  // Multi-line wrap if long
  const words = title.toUpperCase().split(' ');
  let line = '';
  let lineY = 150;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width - 70 && n > 0) {
      ctx.fillText(line, 32, lineY);
      line = words[n] + ' ';
      lineY += 44;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 32, lineY);

  // 6. Cyber Hologram Specular Sheen (diagonal light streak)
  const sheen = ctx.createLinearGradient(0, 0, width, height);
  sheen.addColorStop(0.0, 'rgba(255, 255, 255, 0.0)');
  sheen.addColorStop(0.35, 'rgba(255, 255, 255, 0.02)');
  sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
  sheen.addColorStop(0.65, 'rgba(255, 255, 255, 0.02)');
  sheen.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);

  // 7. Bottom Tech Bar & Barcode
  const barcodeY = height - 90;
  ctx.fillStyle = '#101726';
  ctx.fillRect(28, barcodeY, width - 56, 56);

  // Barcode stripes
  ctx.fillStyle = '#64748b';
  let barX = 40;
  const barPattern = [3, 1, 4, 2, 1, 5, 2, 3, 1, 4, 2, 6, 1, 3, 2, 4, 1, 5, 3, 2, 4];
  for (const w of barPattern) {
    ctx.fillRect(barX, barcodeY + 8, w * 2.5, 40);
    barX += w * 2.5 + 4;
    if (barX > width - 180) break;
  }

  // Serial & Specs
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 12px "Courier New", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('HIGH-DENSITY ROM', width - 40, barcodeY + 20);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px "Courier New", monospace';
  ctx.fillText('BUS: 128-BIT QPI', width - 40, barcodeY + 38);
  ctx.textAlign = 'left';

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}
