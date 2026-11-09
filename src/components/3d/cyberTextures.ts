import * as THREE from 'three';

/**
 * Procedural Texture Generator for Cyberpunk 3D Workstation surfaces.
 * Generates lightweight, seamless micro-textures in-memory via HTML5 Offscreen Canvas.
 * Zero external asset downloads, zero network latency, instant 60fps load time.
 */

export interface CarbonFiberMaps {
  diffuseMap: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

/**
 * Generates procedural carbon-fiber weave maps:
 * 1. Diffuse (anisotropic graphite/obsidian weave threads)
 * 2. Tangent-space Normal map (perturbed bundle curvature + micro-filament striations)
 * 3. Roughness map (sleek bundle crests vs matte seam recesses)
 */
export function createCarbonFiberTextures(repeatX = 36, repeatY = 16): CarbonFiberMaps {
  const size = 128;
  const tileSize = 32; // 4x4 weave tiles in a 128x128 texture

  // 1. Setup canvases
  const diffCanvas = document.createElement('canvas');
  diffCanvas.width = size;
  diffCanvas.height = size;
  const diffCtx = diffCanvas.getContext('2d')!;

  const normCanvas = document.createElement('canvas');
  normCanvas.width = size;
  normCanvas.height = size;
  const normCtx = normCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const roughCtx = roughCanvas.getContext('2d')!;

  const diffImg = diffCtx.createImageData(size, size);
  const normImg = normCtx.createImageData(size, size);
  const roughImg = roughCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      const tileX = Math.floor(x / tileSize);
      const tileY = Math.floor(y / tileSize);
      const localX = x % tileSize;
      const localY = y % tileSize;

      // Plain weave alternating horizontal (runs along X) and vertical (runs along Y)
      const isHorizontal = (tileX + tileY) % 2 === 0;

      // Calculate normalized lateral position across bundle width [-1, 1]
      const vBundle = isHorizontal
        ? (localY / tileSize) * 2 - 1
        : (localX / tileSize) * 2 - 1;

      // Height profile across the bundle width (vBundle)
      // Clamped cosine arch
      const vDist = Math.abs(vBundle);
      const height = Math.cos((vDist * Math.PI) / 2);

      // Micro-filament striations along bundle length (uBundle)
      const filamentPeriod = 4;
      const filamentCoord = isHorizontal ? localY : localX;
      const filamentWave = Math.sin((filamentCoord / filamentPeriod) * Math.PI * 2);

      // Seam detection (bundle border)
      const isBorder = localX === 0 || localX === tileSize - 1 || localY === 0 || localY === tileSize - 1;

      // --- Diffuse calculation ---
      // Base obsidian graphite tone
      let baseLum = isHorizontal ? 26 : 21;
      baseLum += Math.round(height * 8);
      baseLum += Math.round(filamentWave * 2.5);
      if (isBorder) baseLum = Math.max(10, baseLum - 12);

      const r = Math.round(baseLum * 0.85); // slight cool graphite tint
      const g = Math.round(baseLum * 0.95);
      const b = Math.min(255, Math.round(baseLum * 1.15));

      diffImg.data[idx] = r;
      diffImg.data[idx + 1] = g;
      diffImg.data[idx + 2] = b;
      diffImg.data[idx + 3] = 255;

      // --- Normal map calculation (Tangent space) ---
      // Slope derivative: d(cos)/dv = -sin
      const slope = -Math.sin((vBundle * Math.PI) / 2) * 0.55;
      const microSlope = filamentWave * 0.12;

      let nx = 0;
      let ny = 0;
      if (isHorizontal) {
        ny = slope;
        nx = microSlope;
      } else {
        nx = slope;
        ny = microSlope;
      }

      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const normX = nx / len;
      const normY = ny / len;
      const normZ = nz / len;

      normImg.data[idx] = Math.round((normX * 0.5 + 0.5) * 255);
      normImg.data[idx + 1] = Math.round((normY * 0.5 + 0.5) * 255);
      normImg.data[idx + 2] = Math.round((normZ * 0.5 + 0.5) * 255);
      normImg.data[idx + 3] = 255;

      // --- Roughness map calculation ---
      // Bundle crests are smoother (0.42), edges and seams rougher (0.82)
      let roughVal = 0.42 + (1.0 - height) * 0.35;
      if (isBorder) roughVal = 0.85;
      const roughByte = Math.round(roughVal * 255);

      roughImg.data[idx] = roughByte;
      roughImg.data[idx + 1] = roughByte;
      roughImg.data[idx + 2] = roughByte;
      roughImg.data[idx + 3] = 255;
    }
  }

  diffCtx.putImageData(diffImg, 0, 0);
  normCtx.putImageData(normImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);

  const diffuseMap = new THREE.CanvasTexture(diffCanvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(repeatX, repeatY);
  diffuseMap.colorSpace = THREE.SRGBColorSpace;
  diffuseMap.anisotropy = 8;
  diffuseMap.needsUpdate = true;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatX, repeatY);
  normalMap.anisotropy = 8;
  normalMap.needsUpdate = true;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(repeatX, repeatY);
  roughnessMap.anisotropy = 8;
  roughnessMap.needsUpdate = true;

  return { diffuseMap, normalMap, roughnessMap };
}

/**
 * Generates diagonal hazard warning stripes for heavy industrial cables.
 * Yellow (#f59e0b) and Charcoal (#141720) alternating 45-degree bands.
 */
export function createHazardStripeTexture(repeatU = 20): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Fill dark background
  ctx.fillStyle = '#141720';
  ctx.fillRect(0, 0, 128, 128);

  // Draw 45-degree caution yellow diagonal stripes
  ctx.fillStyle = '#f59e0b';
  const stripeWidth = 32;

  for (let x = -128; x < 256; x += stripeWidth * 2) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + stripeWidth, 0);
    ctx.lineTo(x + stripeWidth + 128, 128);
    ctx.lineTo(x + 128, 128);
    ctx.closePath();
    ctx.fill();
  }

  // Add subtle edge shadow along stripes for realism
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.lineWidth = 2;
  for (let x = -128; x < 256; x += stripeWidth * 2) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 128, 128);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + stripeWidth, 0);
    ctx.lineTo(x + stripeWidth + 128, 128);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatU, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Generates a technical cyber-panel inlay texture with precision metric tick lines
 * and dark brushed titanium surface finish.
 */
export function createCyberInlayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Matte brushed titanium background
  ctx.fillStyle = '#10131b';
  ctx.fillRect(0, 0, 256, 512);

  // Subtle brushed metal micro-streaks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 512; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Outer framing boundary
  ctx.strokeStyle = 'rgba(0, 243, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 232, 488);

  // Precision metric ticks along both edges
  ctx.strokeStyle = 'rgba(0, 243, 255, 0.22)';
  ctx.lineWidth = 1;
  for (let y = 24; y < 488; y += 16) {
    const isMajor = (y - 24) % 64 === 0;
    const tickLen = isMajor ? 14 : 7;

    // Left ticks
    ctx.beginPath();
    ctx.moveTo(12, y);
    ctx.lineTo(12 + tickLen, y);
    ctx.stroke();

    // Right ticks
    ctx.beginPath();
    ctx.moveTo(244, y);
    ctx.lineTo(244 - tickLen, y);
    ctx.stroke();
  }

  // Subtle corner crosshairs
  const drawCrosshair = (cx: number, cy: number) => {
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy);
    ctx.lineTo(cx + 6, cy);
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx, cy + 6);
    ctx.stroke();
  };

  drawCrosshair(32, 32);
  drawCrosshair(224, 32);
  drawCrosshair(32, 480);
  drawCrosshair(224, 480);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}
