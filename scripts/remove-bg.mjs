#!/usr/bin/env node
/**
 * BACKGROUND REMOVAL
 *
 * Removes backgrounds from PNGs using @imgly/background-removal-node.
 * Runs locally via ONNX — no API, no cost, no internet.
 *
 * Usage:
 *   node scripts/remove-bg.mjs <input.png>              → writes <input>-transparent.png
 *   node scripts/remove-bg.mjs <input.png> <output.png>
 *   node scripts/remove-bg.mjs assets/generated/*.png   → batch (one file per arg)
 */
import fs from 'node:fs';
import path from 'node:path';
import { removeBackground } from '@imgly/background-removal-node';

async function processFile(inPath, outPath) {
  if (!fs.existsSync(inPath)) {
    console.error(`   ❌ Not found: ${inPath}`);
    return false;
  }
  const startedAt = Date.now();
  process.stdout.write(`  → ${path.basename(inPath)} `);

  const blob = await removeBackground(inPath);
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(outPath, buffer);

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  const inKB = (fs.statSync(inPath).size / 1024).toFixed(0);
  const outKB = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`→ ${path.basename(outPath)}  (${inKB}→${outKB} KB, ${elapsed}s)`);
  return true;
}

function deriveOutPath(inPath) {
  const dir = path.dirname(inPath);
  const ext = path.extname(inPath);
  const name = path.basename(inPath, ext);
  return path.join(dir, `${name}-transparent.png`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/remove-bg.mjs <input.png> [<output.png>]');
  console.error('       node scripts/remove-bg.mjs file1.png file2.png file3.png   (batch)');
  process.exit(1);
}

console.log('\n🪄 Background removal\n');

let ok = 0;
let fail = 0;

if (args.length === 2 && !args[1].endsWith('.png') === false && path.extname(args[0]) === '.png') {
  // Two args where second is clearly an output .png → single file mode
  const success = await processFile(args[0], args[1]);
  success ? ok++ : fail++;
} else {
  // Batch mode — each arg is an input file, output is auto-derived
  for (const inPath of args) {
    const outPath = deriveOutPath(inPath);
    try {
      const success = await processFile(inPath, outPath);
      success ? ok++ : fail++;
    } catch (e) {
      console.log(`      ❌ ${e.message}`);
      fail++;
    }
  }
}

console.log(`\n✨ Done. ${ok} ok, ${fail} failed.\n`);
