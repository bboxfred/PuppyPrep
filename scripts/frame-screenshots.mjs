#!/usr/bin/env node
/**
 * FRAME SCREENSHOTS — adds device bezels to raw store screenshots.
 *
 * Apple + Google don't require bezels (your raw screenshots work fine),
 * but framed shots consistently perform better in store-listing A/B tests.
 *
 * This tool composites your raw screenshot inside a device frame PNG using
 * sharp's image-compositing API — no Photoshop, no Figma needed.
 *
 * USAGE:
 *   node scripts/frame-screenshots.mjs \
 *     --input screenshots/raw/iphone-67/ \
 *     --device iphone-15-pro-max \
 *     --output screenshots/framed/iphone-67/
 *
 * SUPPORTED DEVICES:
 *   iphone-15-pro-max     (1290 × 2796) — primary 6.7" store size
 *   iphone-14-plus        (1284 × 2778) — 6.5" fallback
 *   iphone-8-plus         (1242 × 2208) — 5.5"
 *   ipad-pro-129          (2048 × 2732) — 12.9" iPad
 *   pixel-8-pro           (1344 × 2992) — Android phone
 *   galaxy-s24-ultra      (1440 × 3120) — Android phone (alt)
 *
 * NOTE: this script requires `sharp` (for compositing). If not installed:
 *   npm install --save-dev sharp
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Parse flags
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const inputDir = flag('input');
const device = flag('device');
const outputDir = flag('output');
const listOnly = args.includes('--list');

// Device specs — the bezel PNG filename, output dimensions, screenshot
// inset offset and size (where the raw screenshot sits inside the bezel).
const DEVICES = {
  'iphone-15-pro-max': {
    bezel: 'iphone-15-pro-max-bezel.png',
    output: { w: 1290, h: 2796 },
    insetOffset: { x: 38, y: 38 },
    insetSize: { w: 1214, h: 2720 },
    bezelUrl: 'https://raw.githubusercontent.com/wiredify/device-frames/main/iphone-15-pro-max.png',
  },
  'iphone-14-plus': {
    bezel: 'iphone-14-plus-bezel.png',
    output: { w: 1284, h: 2778 },
    insetOffset: { x: 40, y: 40 },
    insetSize: { w: 1204, h: 2698 },
    bezelUrl: 'https://raw.githubusercontent.com/wiredify/device-frames/main/iphone-14-plus.png',
  },
  'iphone-8-plus': {
    bezel: 'iphone-8-plus-bezel.png',
    output: { w: 1242, h: 2208 },
    insetOffset: { x: 58, y: 220 },
    insetSize: { w: 1125, h: 2001 },
    bezelUrl: 'https://raw.githubusercontent.com/wiredify/device-frames/main/iphone-8-plus.png',
  },
  'ipad-pro-129': {
    bezel: 'ipad-pro-129-bezel.png',
    output: { w: 2048, h: 2732 },
    insetOffset: { x: 80, y: 80 },
    insetSize: { w: 1888, h: 2572 },
    bezelUrl: 'https://raw.githubusercontent.com/wiredify/device-frames/main/ipad-pro-129.png',
  },
  'pixel-8-pro': {
    bezel: 'pixel-8-pro-bezel.png',
    output: { w: 1344, h: 2992 },
    insetOffset: { x: 36, y: 36 },
    insetSize: { w: 1272, h: 2920 },
    bezelUrl: 'https://raw.githubusercontent.com/wiredify/device-frames/main/pixel-8-pro.png',
  },
  'galaxy-s24-ultra': {
    bezel: 'galaxy-s24-ultra-bezel.png',
    output: { w: 1440, h: 3120 },
    insetOffset: { x: 36, y: 36 },
    insetSize: { w: 1368, h: 3048 },
    bezelUrl: 'https://raw.githubusercontent.com/wiredify/device-frames/main/galaxy-s24-ultra.png',
  },
};

if (listOnly) {
  console.log('\nSupported devices:\n');
  for (const [id, spec] of Object.entries(DEVICES)) {
    console.log(`  ${id.padEnd(22)} ${spec.output.w} × ${spec.output.h}`);
  }
  console.log('');
  process.exit(0);
}

if (!inputDir || !device || !outputDir) {
  console.error(`
USAGE:
  node scripts/frame-screenshots.mjs --input <dir> --device <id> --output <dir>
  node scripts/frame-screenshots.mjs --list

Example:
  node scripts/frame-screenshots.mjs \\
    --input screenshots/raw/iphone-67/ \\
    --device iphone-15-pro-max \\
    --output screenshots/framed/iphone-67/
`);
  process.exit(1);
}

if (!DEVICES[device]) {
  console.error(`Unknown device: "${device}". Run --list to see supported devices.`);
  process.exit(1);
}

// Dynamic import — sharp is optional. If missing we'll give a helpful hint.
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error(`
This script requires 'sharp'. Install it with:
  npm install --save-dev sharp

Sharp is a fast image-compositing library used only by this script —
it's not needed to run the app.
`);
  process.exit(1);
}

const spec = DEVICES[device];
const bezelsDir = path.join(PROJECT_ROOT, 'assets', 'device-bezels');
const bezelPath = path.join(bezelsDir, spec.bezel);

// Download bezel if not cached
try {
  await fs.access(bezelPath);
} catch {
  console.log(`Downloading bezel for ${device}...`);
  await fs.mkdir(bezelsDir, { recursive: true });
  const res = await fetch(spec.bezelUrl);
  if (!res.ok) {
    console.error(`
Could not fetch bezel PNG from ${spec.bezelUrl}

If the URL no longer works, download a transparent ${device} frame PNG
manually from any device-mockup site (Facebook Design, Mockuuups,
shots.so, frame.store) and save it as:
  ${bezelPath}
`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(bezelPath, buf);
  console.log(`Saved bezel: ${bezelPath}`);
}

// Process every PNG/JPG in input dir
await fs.mkdir(outputDir, { recursive: true });
const files = (await fs.readdir(inputDir)).filter(f => /\.(png|jpe?g)$/i.test(f));

if (files.length === 0) {
  console.error(`No PNG/JPG files found in ${inputDir}`);
  process.exit(1);
}

console.log(`\nFraming ${files.length} screenshot(s) as ${device}...`);

for (const file of files) {
  const inPath = path.join(inputDir, file);
  const outPath = path.join(outputDir, file.replace(/\.(jpe?g)$/i, '.png'));

  // 1. Resize the raw screenshot to fit the bezel's inner screen area
  const resizedScreenshot = await sharp(inPath)
    .resize(spec.insetSize.w, spec.insetSize.h, { fit: 'cover' })
    .toBuffer();

  // 2. Composite: bezel on top, screenshot as background positioned at inset
  await sharp({
    create: {
      width: spec.output.w,
      height: spec.output.h,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([
      { input: resizedScreenshot, top: spec.insetOffset.y, left: spec.insetOffset.x },
      { input: bezelPath },
    ])
    .png()
    .toFile(outPath);

  console.log(`  ✓ ${file} → ${path.basename(outPath)}`);
}

console.log(`\n✅ Done. Framed screenshots saved to ${outputDir}`);
