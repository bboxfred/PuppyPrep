#!/usr/bin/env node
/** List all models, filter for image-generation candidates */
import fs from 'node:fs';
import path from 'node:path';
const env = Object.fromEntries(
  fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8')
    .split('\n').filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()]; })
);
const r = await fetch(`${env.MODELVERSE_BASE_URL}/v1/models`, {
  headers: { Authorization: `Bearer ${env.MODELVERSE_API_KEY}` },
});
const { data } = await r.json();

const imageKeywords = /image|flux|imagen|banana|dall|sd|stable|diff|krea|qwen-image|seedream|seededit|midjourney|ideogram|playground|recraft|byte|mj-|runway|kolor|hunyuan|wan/i;
const categories = {
  'Google Gemini Image': /gemini.*image/i,
  'FLUX / BFL': /flux|bfl|krea/i,
  'Bytedance Seed': /seed|byte/i,
  'Qwen Image': /qwen-?image/i,
  'Stable Diffusion / SDXL': /^sd|stable|sdxl/i,
  'Imagen (Google)': /imagen/i,
  'Midjourney / MJ': /midjourney|^mj-/i,
  'Ideogram': /ideogram/i,
  'Recraft': /recraft/i,
  'DALL-E': /dall/i,
  'Other image-ish': imageKeywords,
};

const matched = new Set();
for (const [cat, rx] of Object.entries(categories)) {
  const hits = data.filter(m => rx.test(m.id) && !matched.has(m.id));
  if (hits.length) {
    console.log(`\n── ${cat} ──`);
    hits.forEach(m => { console.log(`   ${m.id}`); matched.add(m.id); });
  }
}

console.log(`\n📊 ${matched.size} image-capable models out of ${data.length} total.\n`);
