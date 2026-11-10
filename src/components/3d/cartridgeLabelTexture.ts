import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Procedurally generates a cyberpunk holographic label sticker texture
 * for the data cartridge using HTML5 Canvas.
 * Uses JetBrains Mono typography to match the rest of the UI.
 */
export function createCartridgeLabelTexture(
  _title: string,
  categoryName: string,
  accentColor: string,
  _genre: string = 'CYBER DECK ROM',
  year: string = '2026'
): THREE.CanvasTexture {
  const cacheKey = `${categoryName}_${accentColor}_${year}`;
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

  // 1. Base dark obsidian foil background
  ctx.fillStyle = '#070910';
  ctx.fillRect(0, 0, width, height);

  // Subtle carbon micro-grid lines
  ctx.strokeStyle = '#0e1320';
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

  // 2. High-contrast perimeter tech border
  ctx.strokeStyle = '#182030';
  ctx.lineWidth = 4;
  ctx.strokeRect(14, 14, width - 28, height - 28);

  // Corner accent ticks
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2.5;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(14, 38);
  ctx.lineTo(14, 14);
  ctx.lineTo(38, 14);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(width - 38, 14);
  ctx.lineTo(width - 14, 14);
  ctx.lineTo(width - 14, 38);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(14, height - 38);
  ctx.lineTo(14, height - 14);
  ctx.lineTo(38, height - 14);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - 38, height - 14);
  ctx.lineTo(width - 14, height - 14);
  ctx.lineTo(width - 14, height - 38);
  ctx.stroke();

  // 3. Top Accent Header Bar
  ctx.fillStyle = accentColor;
  ctx.fillRect(22, 24, width - 44, 36);

  // Header tech identifier (JetBrains Mono)
  ctx.fillStyle = '#05070c';
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.textBaseline = 'middle';
  ctx.fillText('// HIGH-DENSITY ROM', 32, 42);

  // Year badge
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(year, width - 32, 42);
  ctx.textAlign = 'left';

  // 4. Centered Title Display Window (styled background box for the 3D title text)
  const boxX = 26;
  const boxY = 80;
  const boxW = width - 52;
  const boxH = 280;

  ctx.fillStyle = '#0a0e1a';
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = '#1a2338';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Subtle interior scanline texture in title box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
  for (let sy = boxY + 4; sy < boxY + boxH; sy += 8) {
    ctx.fillRect(boxX, sy, boxW, 2);
  }

  // Inner corner crosshairs on title box
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1.5;
  const crossSize = 10;
  // TL
  ctx.beginPath();
  ctx.moveTo(boxX + 6, boxY + 6 + crossSize);
  ctx.lineTo(boxX + 6, boxY + 6);
  ctx.lineTo(boxX + 6 + crossSize, boxY + 6);
  ctx.stroke();
  // TR
  ctx.beginPath();
  ctx.moveTo(boxX + boxW - 6 - crossSize, boxY + 6);
  ctx.lineTo(boxX + boxW - 6, boxY + 6);
  ctx.lineTo(boxX + boxW - 6, boxY + 6 + crossSize);
  ctx.stroke();
  // BL
  ctx.beginPath();
  ctx.moveTo(boxX + 6, boxY + boxH - 6 - crossSize);
  ctx.lineTo(boxX + 6, boxY + boxH - 6);
  ctx.lineTo(boxX + 6 + crossSize, boxY + boxH - 6);
  ctx.stroke();
  // BR
  ctx.beginPath();
  ctx.moveTo(boxX + boxW - 6 - crossSize, boxY + boxH - 6);
  ctx.lineTo(boxX + boxW - 6, boxY + boxH - 6);
  ctx.lineTo(boxX + boxW - 6, boxY + boxH - 6 - crossSize);
  ctx.stroke();

  // 5. Subtle Holographic Diagonal Light Streak
  const sheen = ctx.createLinearGradient(0, 0, width, height);
  sheen.addColorStop(0.0, 'rgba(255, 255, 255, 0.0)');
  sheen.addColorStop(0.35, 'rgba(255, 255, 255, 0.015)');
  sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
  sheen.addColorStop(0.65, 'rgba(255, 255, 255, 0.015)');
  sheen.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);

  // 6. Bottom Technical Bar & Barcode
  const barcodeY = height - 100;
  ctx.fillStyle = '#0c1120';
  ctx.fillRect(26, barcodeY, width - 52, 60);

  // Barcode stripes
  ctx.fillStyle = '#475569';
  let barX = 36;
  const barPattern = [3, 1, 4, 2, 1, 5, 2, 3, 1, 4, 2, 6, 1, 3, 2, 4, 1, 5, 3, 2, 4];
  for (const w of barPattern) {
    ctx.fillRect(barX, barcodeY + 10, w * 2.2, 40);
    barX += w * 2.2 + 3.5;
    if (barX > width - 180) break;
  }

  // Serial & Specs (JetBrains Mono)
  ctx.fillStyle = accentColor;
  ctx.font = '700 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('128-BIT QPI BUS', width - 36, barcodeY + 24);
  ctx.fillStyle = '#64748b';
  ctx.font = '500 10px "JetBrains Mono", monospace';
  ctx.fillText('CRC32 // VERIFIED', width - 36, barcodeY + 44);
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
