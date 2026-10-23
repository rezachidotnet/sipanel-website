// Shared helpers for the insights automation scripts. Plain Node (no TS runtime),
// so repo facts are read from source files instead of imported.
import {readdirSync, readFileSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const contentDir = join(root, 'content', 'insights');

const read = (file) => readFileSync(join(root, file), 'utf8');

/** Publishing cadence. Quality over volume: Google penalises scaled low-value content, not frequency. */
export const cadence = {
  minDaysBetween: 3,
  maxPer7Days: 2,
  maxPer30Days: 8
};

/**
 * Keywords owned by other pages (systems pages and planned landing pages in
 * SIPANEL_FA_SEO_ARCHITECTURE_DECISION_2026-08-20.md). An insight must never use
 * one of these as its primary keyword — it would cannibalize the owning page.
 */
export const reservedPrimaryKeywords = {
  fa: [
    'ساندویچ پانل', 'سیستم‌های ساندویچ پانل', 'انواع ساندویچ پانل', 'مشخصات ساندویچ پانل',
    'ساندویچ پانل سقفی', 'ساندویچ پانل دیواری', 'اجرای ساندویچ پانل', 'نصب ساندویچ پانل',
    'قیمت ساندویچ پانل', 'خرید ساندویچ پانل', 'ساندویچ پانل سردخانه‌ای', 'پوشش سقف سوله',
    'استندینگ سیم', 'سقف استندینگ سیم', 'ورق استندینگ سیم', 'زیپ پانل', 'ایستادرز',
    'نمای آلومینیومی', 'سیستم‌های نمای آلومینیومی', 'نمای کامپوزیت',
    'نورگیر سقفی', 'نورگیر', 'پوشش شفاف', 'سیستم‌های نورگیر و پوشش شفاف',
    'سازه پارچه‌ای کششی', 'سازه چادری', 'سقف متحرک', 'پوشش ETFE'
  ],
  en: [
    'sandwich panel', 'sandwich panel systems', 'standing seam roofing', 'standing seam roof',
    'zip roofing', 'aluminium cladding', 'daylighting systems', 'rooflights', 'tensile fabric structures',
    'tensile membrane structures', 'retractable roof', 'etfe roof', 'etfe systems'
  ]
};

/** Topics blocked until the business confirms scope (see SEO architecture decision, Business Fit gate). */
export const blockedTerms = [
  {pattern: /کامپوزیت|ACP\b|aluminium composite|aluminum composite|алюминиевые композит|ألومنيوم مركب|الكومبوزيت/i, reason: 'ACP/composite cladding business fit is unconfirmed'},
  {pattern: /(?:^|[\s،.(])(?:تومان|ریال|ریالی|دلار|یورو)(?=[\s،.)]|$)|\$|€|\bUSD\b|\bEUR\b|دولار|рубл|руб\./i, reason: 'prices/currency are not published in insights'}
];

export function normalizeKeyword(value) {
  return value
    .toLowerCase()
    .replace(/[‌‏‎]/g, '')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\s+/g, ' ')
    .trim();
}

export function loadArticles() {
  return readdirSync(contentDir)
    .filter((name) => name.endsWith('.json') && !name.startsWith('_'))
    .sort()
    .map((name) => {
      const raw = readFileSync(join(contentDir, name), 'utf8');
      return {fileName: name, raw, data: JSON.parse(raw)};
    });
}

export function loadSystems() {
  const source = read('lib/insights/systems.ts');
  const ids = [...source.matchAll(/^\s{2}([a-z_]+): \{\n\s{4}id: '\1',\n\s{4}href: '([^']+)'/gm)].map((m) => ({id: m[1], href: m[2]}));
  const labels = Object.fromEntries(
    [...source.matchAll(/^\s{2}([a-z_]+): \{\n\s{4}id: '\1',\n\s{4}href: '[^']+',\n\s{4}label: \{fa: '([^']+)', en: '([^']+)'/gm)].map((m) => [m[1], {fa: m[2], en: m[3]}])
  );
  if (ids.length !== 7) throw new Error(`Expected 7 insight systems in lib/insights/systems.ts, found ${ids.length}.`);
  return ids.map((system) => ({...system, label: labels[system.id]}));
}

export function loadProjects() {
  const source = read('lib/case-studies/case-study-pages.ts');
  const start = source.indexOf('const initialCaseStudies');
  const body = source.slice(start);
  const projects = [];
  for (const block of body.split(/\n  \{\n(?= {4}slug: ')/).slice(1)) {
    const slug = block.match(/^ {4}slug: '([^']+)'/)?.[1];
    const serviceHref = block.match(/\n {4}serviceHref: '([^']+)'/)?.[1];
    const name = block.match(/\n {4}projectName: \{\n\s+en: '([^']*)',\n\s+fa: '([^']*)'/);
    if (slug && serviceHref) projects.push({slug, name: name ? {en: name[1], fa: name[2]} : null, serviceHref});
  }
  return projects;
}

export function loadTierAProjects() {
  const source = read('CLAUDE.md');
  const section = source.split('## Project prioritization')[1]?.split('\n## ')[0] ?? '';
  return [...section.matchAll(/\|\s*`([a-z0-9-]+)`\s*\|/g)].map((m) => m[1]);
}

export function loadResources() {
  const dir = join(root, 'public', 'downloads', 'en');
  const slugs = existsSync(dir) ? readdirSync(dir).filter((n) => n.endsWith('.pdf')).map((n) => n.replace(/\.pdf$/, '')) : [];
  return slugs;
}

export function todayInTehran() {
  return new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Tehran', year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date());
}

export function daysBetween(a, b) {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** All human-visible strings of one locale block, flattened. */
export function localeStrings(content) {
  const out = [];
  const walk = (value) => {
    if (typeof value === 'string') out.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') Object.values(value).forEach(walk);
  };
  walk(content);
  return out;
}

export function wordCount(strings) {
  return strings.join(' ').split(/\s+/).filter(Boolean).length;
}
