#!/usr/bin/env node
/**
 * MODELVERSE IMAGE GENERATOR
 *
 * Generates images via ModelVerse's Nano Banana 2 (Gemini 3 Pro Image) endpoint
 * and saves them to assets/generated/.
 *
 * Supports:
 *   - Text-to-image generation
 *   - Reference-image-guided generation (pass refImage = file path)
 *     → used for style consistency / mascot preservation
 *
 * Usage:
 *   node scripts/gen-image.mjs <filename> "<prompt>" [<reference-image-path>]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'assets', 'generated');

// Load .env.local
const env = Object.fromEntries(
  fs.readFileSync(path.join(PROJECT_ROOT, '.env.local'), 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const [k, ...v] = l.split('=');
      return [k.trim(), v.join('=').trim()];
    })
);

const API_KEY = env.MODELVERSE_API_KEY;
const BASE_URL = env.MODELVERSE_BASE_URL;

if (!API_KEY || !BASE_URL) {
  console.error('❌ Missing MODELVERSE_API_KEY / MODELVERSE_BASE_URL in .env.local');
  process.exit(1);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

/** Guess MIME type from file extension */
function mimeFromPath(p) {
  const ext = path.extname(p).toLowerCase().slice(1);
  return { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] ?? 'image/png';
}

/**
 * Generate an image via Nano Banana 2 and save to disk.
 *
 * @param {object} opts
 * @param {string} opts.filename   — output filename (no extension)
 * @param {string} opts.prompt     — text prompt
 * @param {string|string[]} [opts.refImage] — path(s) to reference image(s) for style/character matching
 * @param {boolean} [opts.transparent] — if true, appends transparent-bg instruction to prompt
 * @param {string} [opts.model]    — gemini-3-pro-image-preview (default) or gemini-3.1-flash-image-preview
 */
export async function generateImage({ filename, prompt, refImage, transparent, model = 'gemini-3-pro-image-preview' }) {
  // Append transparent-bg instruction if requested
  if (transparent) {
    prompt = `${prompt}\n\nIMPORTANT: The image MUST have a fully transparent background (alpha channel). The subject should be isolated with NO background color, NO backdrop, NO ground plane, NO shadows on ground. Output as PNG with full alpha transparency around all edges of the subject.`;
  }
  const url = `${BASE_URL}/v1beta/models/${model}:generateContent`;
  const startedAt = Date.now();

  // Build parts array — optional reference image(s) first, then text prompt
  const parts = [];
  const refPaths = refImage ? (Array.isArray(refImage) ? refImage : [refImage]) : [];
  for (const refPath of refPaths) {
    if (!fs.existsSync(refPath)) {
      console.error(`   ⚠️  Reference image not found: ${refPath}`);
      continue;
    }
    const bytes = fs.readFileSync(refPath);
    parts.push({
      inlineData: {
        mimeType: mimeFromPath(refPath),
        data: bytes.toString('base64'),
      },
    });
  }
  parts.push({ text: prompt });

  console.log(`\n🎨 Generating: ${filename}`);
  console.log(`   Model:   ${model}`);
  if (refPaths.length) {
    console.log(`   Refs:    ${refPaths.map((p) => path.basename(p)).join(', ')}`);
  }
  console.log(`   Prompt:  ${prompt.slice(0, 100)}${prompt.length > 100 ? '…' : ''}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    }),
  });

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  if (!res.ok) {
    const errText = await res.text();
    console.error(`   ❌ ${res.status} ${res.statusText} (${elapsed}s)`);
    console.error(`   ${errText.slice(0, 400)}`);
    throw new Error(`API error ${res.status}`);
  }

  const payload = await res.json();
  const outParts = payload.candidates?.[0]?.content?.parts ?? [];
  const imagePart = outParts.find((p) => p.inlineData?.data);
  const textPart = outParts.find((p) => p.text);

  if (!imagePart) {
    console.error(`   ❌ No image in response (${elapsed}s)`);
    if (textPart) console.error(`   Text: ${textPart.text.slice(0, 300)}`);
    throw new Error('No image in response');
  }

  const mimeType = imagePart.inlineData.mimeType ?? 'image/png';
  const ext = mimeType.split('/')[1] ?? 'png';
  const outPath = path.join(OUTPUT_DIR, `${filename}.${ext}`);

  fs.writeFileSync(outPath, Buffer.from(imagePart.inlineData.data, 'base64'));

  const sizeKB = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`   ✅ ${outPath}  (${sizeKB} KB, ${elapsed}s)`);

  return outPath;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , filename, prompt, refImage] = process.argv;
  if (!filename || !prompt) {
    console.error('Usage: node scripts/gen-image.mjs <filename> "<prompt>" [<reference-image-path>]');
    process.exit(1);
  }
  try {
    await generateImage({ filename, prompt, refImage });
  } catch (e) {
    process.exit(1);
  }
}
