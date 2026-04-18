#!/usr/bin/env node
/**
 * BATCH GENERATE PUPPY PREP ASSET PACK
 *
 * Generates all illustrations for the app, using the brand logo as a
 * reference image for character consistency across every asset.
 *
 * Runs 2 in parallel (ModelVerse handles concurrency well, but more than 2
 * risks rate-limiting on the preview endpoint).
 *
 * Usage: node scripts/gen-asset-pack.mjs [asset-name-or-all]
 *   node scripts/gen-asset-pack.mjs               → generates all
 *   node scripts/gen-asset-pack.mjs splash        → generates just 'splash'
 */
import { generateImage } from './gen-image.mjs';

const LOGO_REF = 'Logo/puppyplogo.png';

const STYLE_PREFACE = `I am attaching the Puppy Prep brand logo for character reference.
The puppy in this logo is our brand mascot — an adorable cartoon beagle-style puppy with cream/white face and body, warm orange patches on floppy droopy ears, small dark triangular nose, simple dot eyes, subtle smile, and thick warm orange outlines.

RECREATE THIS EXACT SAME PUPPY CHARACTER in the image below, maintaining identical:
- Proportions and shape
- Cream + orange two-tone palette
- Flat 2D vector cartoon style (no gradients, no textures, no shadows)
- Thick warm orange outlines
- Friendly, approachable, trustworthy mood

Scene details:`;

const ASSETS = [
  {
    name: 'splash-screen',
    prompt: `${STYLE_PREFACE}
Square 1:1 composition at 2048x2048 pixels. The puppy is sitting cheerfully in the center of a warm cream/off-white background (#F5E6D3). Puppy is the same sitting full-body pose as the logo. Below the puppy there is empty space for app branding (keep the bottom 30 percent empty and clean). NO TEXT, NO LETTERS in the image. Clean symmetrical composition. The scene should feel warm, inviting, and calm — this is a splash screen the user sees when opening the app.`,
    refImage: LOGO_REF,
  },
  {
    name: 'welcome-hero',
    prompt: `${STYLE_PREFACE}
Portrait 2:3 composition (approximately 1024x1536). A warm nursery scene with the Puppy Prep puppy character sitting contentedly on a soft rounded cushion. Scattered around: a tiny water bowl, a soft toy ball, a heart symbol. Warm cream background (#F5E6D3) with very subtle soft sage/teal accents (#74C69D) for the cushion. Warm morning light feel. Flat vector illustration. NO TEXT. Cozy, reassuring mood for first-time dog parents. The puppy is the clear focal point.`,
    refImage: LOGO_REF,
  },
  {
    name: 'onboarding-pregnant',
    prompt: `${STYLE_PREFACE}
Square 1:1 composition 1024x1024. Illustration showing the Puppy Prep puppy character as a PREGNANT MOTHER DOG with a gently rounded belly, sitting contentedly on a soft round cushion. Same puppy character style but adult-sized and with a visible pregnancy belly. Warm cream background (#F5E6D3). Soft teal accent for the cushion. A small heart floating above her belly to signify life/care. Flat vector illustration. NO TEXT. Warm, nurturing mood.`,
    refImage: LOGO_REF,
  },
  {
    name: 'onboarding-born',
    prompt: `${STYLE_PREFACE}
Square 1:1 composition 1024x1024. Illustration showing the Puppy Prep mother dog character lying down on a cozy blanket with THREE tiny newborn puppies snuggled against her. The small puppies are the same character style, but tiny (simplified smaller versions). Warm cream background (#F5E6D3). Soft teal accent for the blanket. Warm, tender family scene. Flat vector illustration. NO TEXT. This is the "puppies are here!" moment.`,
    refImage: LOGO_REF,
  },
  {
    name: 'generating-calendar',
    prompt: `${STYLE_PREFACE}
Square 1:1 composition 1024x1024. The Puppy Prep puppy character sitting next to a floating cartoon calendar page (flat style, warm orange accent color on the calendar). Small circular orbs floating gently around the puppy to suggest activity/loading. Warm cream background (#F5E6D3). Flat vector illustration. NO TEXT or numbers on the calendar. This is a "generating your calendar" loading screen illustration.`,
    refImage: LOGO_REF,
  },
  {
    name: 'graduation-hero',
    prompt: `${STYLE_PREFACE}
Landscape 4:3 composition (approximately 1024x768). CELEBRATION scene — the Puppy Prep puppy character wearing a tiny black graduation cap with orange tassel, sitting proudly. Around the puppy: confetti dots, small stars, sparkles in warm orange and cream. Warm cream background (#F5E6D3) with subtle teal confetti accents. The mood is joyful, proud, celebratory — the puppies have graduated (reached 8 weeks old). Flat vector illustration. NO TEXT. Center the puppy, distribute confetti evenly.`,
    refImage: LOGO_REF,
  },
  {
    name: 'empty-tracker',
    prompt: `${STYLE_PREFACE}
Square 1:1 composition 800x800. The Puppy Prep puppy character sitting on a simple scale/weighing platform (flat cartoon style). The scale is empty except for the puppy. Warm cream background (#F5E6D3). Very subtle dotted/dashed line suggesting measurement. Flat vector illustration. NO TEXT or numbers on the scale. This is an empty state illustration for a weight tracker — conveys "you haven't logged any weights yet, start here!"`,
    refImage: LOGO_REF,
  },
  {
    name: 'emergency-header',
    prompt: `${STYLE_PREFACE}
Wide landscape composition (approximately 1024x512 header banner aspect). The Puppy Prep puppy character with a slightly concerned but still friendly expression, sitting beside a small cartoon first aid cross symbol in soft coral/red (not alarming, just notable). Warm cream background. The mood should convey "we've got you covered" not panic. Flat vector illustration. NO TEXT. This is a header illustration for an emergency guide section.`,
    refImage: LOGO_REF,
  },
];

// Concurrency control — run 2 at a time
const CONCURRENCY = 2;

async function runBatch(assets) {
  const results = [];
  for (let i = 0; i < assets.length; i += CONCURRENCY) {
    const chunk = assets.slice(i, i + CONCURRENCY);
    console.log(`\n━━━ Batch ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(assets.length / CONCURRENCY)} ━━━`);
    const chunkResults = await Promise.allSettled(
      chunk.map((a) => generateImage({
        filename: a.name,
        prompt: a.prompt,
        refImage: a.refImage,
      }))
    );
    chunkResults.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        results.push({ name: chunk[idx].name, ok: true, path: r.value });
      } else {
        results.push({ name: chunk[idx].name, ok: false, error: r.reason?.message });
      }
    });
  }
  return results;
}

const filter = process.argv[2];
const toGenerate = filter && filter !== 'all'
  ? ASSETS.filter((a) => a.name.includes(filter))
  : ASSETS;

if (toGenerate.length === 0) {
  console.error(`No assets matched filter: "${filter}"`);
  console.error('Available:', ASSETS.map((a) => a.name).join(', '));
  process.exit(1);
}

console.log(`\n🎨 Generating ${toGenerate.length} assets for Puppy Prep\n`);
console.log(`📎 Reference: ${LOGO_REF}`);
console.log(`🚀 Concurrency: ${CONCURRENCY}`);

const startedAt = Date.now();
const results = await runBatch(toGenerate);
const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

console.log('\n━━━ SUMMARY ━━━');
const okCount = results.filter((r) => r.ok).length;
const failCount = results.filter((r) => !r.ok).length;
results.forEach((r) => {
  if (r.ok) console.log(`  ✅ ${r.name}`);
  else console.log(`  ❌ ${r.name} — ${r.error}`);
});
console.log(`\n🎉 ${okCount}/${results.length} succeeded in ${elapsed}s\n`);
process.exit(failCount > 0 ? 1 : 0);
