#!/usr/bin/env node
/**
 * PROBE v4 — auth works! Now try image generation for real.
 */
import fs from 'node:fs';
import path from 'node:path';

const env = Object.fromEntries(
  fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8')
    .split('\n').filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()]; })
);
const KEY = env.MODELVERSE_API_KEY;
const URL_BASE = env.MODELVERSE_BASE_URL;

async function probe(label, url, init) {
  process.stdout.write(`  → ${label.padEnd(60)} `);
  try {
    const res = await fetch(url, init);
    const text = await res.text();
    console.log(`${res.status}`);
    console.log(`      ${res.status < 400 ? '✅' : '⚠️ '} ${text.slice(0, 400).replace(/\s+/g, ' ')}`);
    return { ok: res.status < 400, status: res.status, body: text };
  } catch (e) { console.log(`ERR: ${e.message}`); return {}; }
}

console.log('\n🎨 Testing image generation endpoints:\n');

const PROMPT = 'A cute golden retriever puppy, flat illustration, teal background';

// 1. OpenAI-compat images with gemini model
await probe('/v1/images/generations gemini-3-pro-image-preview',
  `${URL_BASE}/v1/images/generations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: 'gemini-3-pro-image-preview',
      prompt: PROMPT,
      n: 1,
      size: '1024x1024',
    }),
  }
);

// 2. Gemini-native endpoint, now with Bearer auth
await probe('Gemini-native :generateContent Bearer',
  `${URL_BASE}/v1beta/models/gemini-3-pro-image-preview:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    }),
  }
);

// 3. gemini-3.1-flash-image-preview
await probe('/v1/images/generations gemini-3.1-flash-image-preview',
  `${URL_BASE}/v1/images/generations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: 'gemini-3.1-flash-image-preview',
      prompt: PROMPT,
      n: 1,
    }),
  }
);

// 4. List all image-like models precisely
console.log('\n📋 Searching for all image/generation models:\n');
const r = await fetch(`${URL_BASE}/v1/models`, { headers: { Authorization: `Bearer ${KEY}` }});
const data = JSON.parse(await r.text());
const imgModels = data.data.filter(m =>
  /image|flux|imagen|banana|dall|sd|stable|diff|krea|qwen-image/i.test(m.id)
);
imgModels.forEach(m => console.log(`     - ${m.id}  (owned_by: ${m.owned_by})`));

console.log('\n✨ Done.\n');
