#!/usr/bin/env node
/**
 * Generate Field Journal library-section icons via Nano Banana.
 * Style: flat editorial linework on warm paper background.
 * Each icon should read clearly at ~80px grid-card preview size.
 */
import { generateImage } from './gen-image.mjs';

const STYLE = `Minimal editorial line-art icon in a "Field Journal" style —
hand-drawn linework on warm paper background (#F5EDE0), sepia/ink color lines
(#4C5A4E with warm #C9B896 supporting lines), subtle ochre/forest accents.
Soft, literary, calm — like a naturalist's sketchbook. NOT photorealistic.
NOT cartoon. Subject centered, generous negative space around it, square 1:1.
NO TEXT, NO LETTERS, NO CAPTIONS. Small vignette — subject takes 60% of frame.`;

const ICONS = [
  { name: 'library-birth-guide',
    prompt: `${STYLE} Subject: a small bundle of delicate line-drawn newborn puppies nestled together, whelping-box textures suggested with minimal linework.` },
  { name: 'library-emergency-guide',
    prompt: `${STYLE} Subject: a simple line-drawn medical cross inside a soft rounded shield, with a single ochre accent line. Calm, reassuring — not alarming.` },
  { name: 'library-pregnancy-care',
    prompt: `${STYLE} Subject: side profile of a mother dog sitting with a gently rounded belly, rendered in soft curved linework. Serene, meditative.` },
  { name: 'library-newborn-care',
    prompt: `${STYLE} Subject: a single tiny newborn puppy curled asleep, drawn with gentle curved lines. Warm and tender.` },
  { name: 'library-nutrition-feeding',
    prompt: `${STYLE} Subject: a simple line-drawn feeding bowl with a small bottle beside it and a subtle moss-green accent on a sprig. Calm still life.` },
  { name: 'library-development-training',
    prompt: `${STYLE} Subject: a puppy sitting attentively beside a simple hand (leash cue), rendered in clean linework. Educational, calm.` },
];

console.log(`\n🎨 Generating ${ICONS.length} Field Journal library icons\n`);
const startedAt = Date.now();

// Run 2 in parallel for speed
for (let i = 0; i < ICONS.length; i += 2) {
  const chunk = ICONS.slice(i, i + 2);
  console.log(`\n── Batch ${Math.floor(i / 2) + 1}/${Math.ceil(ICONS.length / 2)} ──`);
  await Promise.allSettled(
    chunk.map((a) => generateImage({ filename: a.name, prompt: a.prompt }))
  );
}

const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`\n✨ Done in ${elapsed}s\n`);
