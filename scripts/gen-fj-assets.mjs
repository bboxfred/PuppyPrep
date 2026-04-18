#!/usr/bin/env node
/**
 * Generate Field Journal onboarding icons + hero illustrations + textures.
 * Style: matches existing library icons — linework on warm paper.
 */
import { generateImage } from './gen-image.mjs';

const LINE_STYLE = `Field Journal linework illustration — hand-drawn pencil and ink
lines on warm paper background (#F5EDE0), with sepia/ink supporting lines
(#4C5A4E, #C9B896). Soft, literary, calm, naturalist-sketchbook feel.
NOT photorealistic. NOT cartoon. Subject centered on paper with generous
negative space. Square 1:1. NO TEXT, NO LETTERS, NO CAPTIONS. Subject
occupies 55-65% of the frame. Consistent with existing library guide sketches.`;

const ASSETS = [
  // ── Onboarding question icons ──
  { name: 'onboard-calendar',
    prompt: `${LINE_STYLE} Subject: an open pocket almanac with a soft marked date circled delicately — suggest gestation counting, gentle, calm.` },
  { name: 'onboard-vet',
    prompt: `${LINE_STYLE} Subject: a vintage stethoscope resting beside a small leather medical bag — suggest a home visit from a trusted country vet, calm, caring.` },
  { name: 'onboard-chick',
    prompt: `${LINE_STYLE} Subject: a tiny hatching chick just emerged from its shell on a pile of soft straw, ochre warm highlight on the chick, delicate wonder.` },
  { name: 'onboard-cake',
    prompt: `${LINE_STYLE} Subject: a single small birthday cake sketch with one thin candle and a soft curl of smoke, delicate linework, ochre warmth.` },
  { name: 'onboard-weigh',
    prompt: `${LINE_STYLE} Subject: a small kitchen scale with a tiny puppy outline on the pan — suggesting weekly weigh-ins, delicate, warm moss accent.` },
  { name: 'onboard-bell',
    prompt: `${LINE_STYLE} Subject: a small bronze hand-bell at rest with gentle sound ripples as faint curves beside it, editorial, calm.` },

  // ── Setup Your Puppies hero ──
  { name: 'setup-puppies-hero',
    prompt: `${LINE_STYLE} Subject: three small newborn puppies arranged in a row on warm blanket, each with a different tiny yarn collar (soft ochre / moss / terracotta) — these collars are the "ID colour" system. Soft linework, sleeping or content, delicate and warm.` },

  // ── Countdown card background ── (landscape, forest-toned, dark enough for white text)
  { name: 'card-countdown-bg',
    prompt: `Editorial watercolor background — deep forest green (#2D4A32) wash over a subtle texture of ferns and botanical linework rendered in darker forest tones and faint moss (#8FA777) highlights. A literary, calm, atmospheric surface — suitable as a card background where crisp white text will sit on top. Corners softer than edges. NO TEXT, NO LETTERS. Wide landscape 16:9.` },

  // ── Paper texture (seamless-ish) ──
  { name: 'paper-texture',
    prompt: `Seamless warm paper texture, color #F5EDE0, subtle fiber grain, delicate watermark marks, very quiet. Tileable surface — no main subject, just an evenly distributed warm paper background. Edges fade gently so tiles blend. No illustrations, no text, no letters.` },
];

// Run 3 in parallel
const CONCURRENCY = 3;

console.log(`\n🎨 Generating ${ASSETS.length} Field Journal assets\n`);
const startedAt = Date.now();

for (let i = 0; i < ASSETS.length; i += CONCURRENCY) {
  const chunk = ASSETS.slice(i, i + CONCURRENCY);
  console.log(`\n── Batch ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(ASSETS.length / CONCURRENCY)} ──`);
  await Promise.allSettled(
    chunk.map((a) => generateImage({ filename: a.name, prompt: a.prompt }))
  );
}

const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`\n✨ Done in ${elapsed}s\n`);
