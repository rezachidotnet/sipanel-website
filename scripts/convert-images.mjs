#!/usr/bin/env node
/**
 * SIPANEL image processing pipeline.
 *
 * Converts the newly delivered PNGs into production formats with responsive
 * variants, then deletes the source PNGs. Uses `sharp` (already a project dep).
 *
 * Run: node scripts/convert-images.mjs
 *
 * Rules (see delivery brief):
 *   A. OG images (public/og/*.png)        -> JPG 1200x630 q90, no mobile, delete png
 *   B. Resource previews (assets/resources) -> WebP 800x450 + -mobile 400x225 q85, delete png
 *   C. Systems technical (assets/systems)   -> WebP 1200x675 + -mobile 600x338 q85, delete png
 *   D. About/Contact/Projects hero          -> WebP 1440x810 + -mobile 768x432 q85, delete png
 *   E. Any unmapped *.png left behind       -> warn (left untouched)
 */

import sharp from 'sharp';
import {existsSync} from 'node:fs';
import {unlink} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const abs = (p) => path.join(ROOT, p);

/** @typedef {{src: string, variants: Array<{dst: string, w: number, h: number}>, fmt: 'jpg'|'webp', quality: number}} Job */

/** @type {Job[]} */
const jobs = [];

// ── Rule A — OG images → JPG 1200x630 ──
for (const name of ['og-default', 'og-resources', 'og-projects', 'og-systems']) {
  jobs.push({
    src: `public/og/${name}.png`,
    fmt: 'jpg',
    quality: 90,
    variants: [{dst: `public/og/${name}.jpg`, w: 1200, h: 630}]
  });
}

// ── Rule B — Resource previews → WebP 800x450 + mobile 400x225 ──
const resourceSlugs = [
  'roof-leakage-prevention-checklist',
  'sandwich-panel-selection-guide',
  'shop-drawing-review-guide',
  'standing-seam-roof-detail-notes',
  'aluminium-cladding-layout-checklist',
  'mto-procurement-planning-sheet',
  'lead-capture-preview' // only processed if a .png exists
];
for (const slug of resourceSlugs) {
  jobs.push({
    src: `assets/resources/${slug}.png`,
    fmt: 'webp',
    quality: 85,
    variants: [
      {dst: `assets/resources/${slug}.webp`, w: 800, h: 450},
      {dst: `assets/resources/${slug}-mobile.webp`, w: 400, h: 225}
    ]
  });
}

// ── Rule C — Systems technical → WebP 1200x675 + mobile 600x338 ──
// Source filenames are system-prefixed; outputs are stripped to the canonical name.
const systemJobs = [
  ['sandwich-panel', 'sandwich-panel-installation', 'installation'],
  ['sandwich-panel', 'sandwich-panel-technical-detail', 'technical-detail'],
  ['standing-seam', 'standing-seam-clip-installation', 'clip-installation'],
  ['standing-seam', 'standing-seam-seam-detail', 'seam-detail'],
  ['aluminium-claddin', 'aluminium-cladding-installation', 'installation'],
  ['aluminium-claddin', 'aluminium-cladding-joint-detail', 'joint-detail'],
  ['transparent-roofing', 'daylighting-interior-view', 'interior-view'],
  ['transparent-roofing', 'daylighting-junction-detail', 'junction-detail']
];
for (const [dir, srcName, outName] of systemJobs) {
  jobs.push({
    src: `assets/systems/${dir}/${srcName}.png`,
    fmt: 'webp',
    quality: 85,
    variants: [
      {dst: `assets/systems/${dir}/${outName}.webp`, w: 1200, h: 675},
      {dst: `assets/systems/${dir}/${outName}-mobile.webp`, w: 600, h: 338}
    ]
  });
}

// ── Rule D — About / Contact / Projects hero → WebP 1440x810 + mobile 768x432 ──
const heroJobs = [
  ['assets/about', 'about-hero'],
  ['assets/contact', 'contact-trust-image'],
  ['assets/projects', 'projects-index-hero']
];
for (const [dir, name] of heroJobs) {
  jobs.push({
    src: `${dir}/${name}.png`,
    fmt: 'webp',
    quality: 85,
    variants: [
      {dst: `${dir}/${name}.webp`, w: 1440, h: 810},
      {dst: `${dir}/${name}-mobile.webp`, w: 768, h: 432}
    ]
  });
}

function fmtBytes(n) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function run() {
  let processed = 0;
  let skipped = 0;
  const generated = [];

  for (const job of jobs) {
    const srcPath = abs(job.src);
    if (!existsSync(srcPath)) {
      console.log(`⏭  SKIP (no source): ${job.src}`);
      skipped++;
      continue;
    }

    const meta = await sharp(srcPath).metadata();
    console.log(`\n▶ ${job.src}  (${meta.width}×${meta.height})`);

    for (const v of job.variants) {
      const pipeline = sharp(srcPath).resize(v.w, v.h, {fit: 'cover', position: 'center'});
      const out = job.fmt === 'jpg' ? pipeline.jpeg({quality: job.quality, mozjpeg: true}) : pipeline.webp({quality: job.quality});
      const info = await out.toFile(abs(v.dst));
      generated.push({dst: v.dst, size: info.size, w: v.w, h: v.h});
      console.log(`   ✅ ${v.dst}  ${v.w}×${v.h}  ${fmtBytes(info.size)}`);
    }

    await unlink(srcPath);
    console.log(`   🗑  deleted source ${job.src}`);
    processed++;
  }

  console.log(`\n──────── Summary ────────`);
  console.log(`Sources processed: ${processed}`);
  console.log(`Sources skipped:   ${skipped}`);
  console.log(`Variants written:  ${generated.length}`);
}

run().catch((err) => {
  console.error('CONVERSION FAILED:', err);
  process.exit(1);
});
