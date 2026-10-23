#!/usr/bin/env node
// Editorial quality gates for content/insights/*.json. Structural validation
// (types, lengths, FAQ counts) also runs at build time via lib/insights/content-schema.ts;
// this script adds the checks that protect search quality and factual accuracy.
//
// Usage: node scripts/insights/validate.mjs            (all files)
//        node scripts/insights/validate.mjs <slug>...  (strict "new article" gates for these slugs)
import {execFileSync} from 'node:child_process';
import {join} from 'node:path';
import {
  blockedTerms,
  loadArticles,
  loadProjects,
  loadResources,
  loadSystems,
  localeStrings,
  normalizeKeyword,
  reservedPrimaryKeywords,
  root,
  todayInTehran,
  wordCount
} from './lib.mjs';

const LOCALES = ['fa', 'en', 'ar', 'ru'];
const SIMILARITY_LIMIT = 0.3;
// Bar for automatically generated (trend-based) articles. Migrated articles are exempt.
const NEW_ARTICLE_MIN_WORDS = {fa: 650, en: 600, ar: 520, ru: 520};
const NEW_ARTICLE_MIN = {points: 4, steps: 4, faqs: 4};

const errors = [];
const warnings = [];
const fail = (slug, message) => errors.push(`[${slug}] ${message}`);
const warn = (slug, message) => warnings.push(`[${slug}] ${message}`);

const strictSlugs = new Set(process.argv.slice(2));
const today = todayInTehran();
const articles = loadArticles();
const systems = loadSystems();
const projectSlugs = new Set(loadProjects().map((p) => p.slug));
const resourceSlugs = new Set(loadResources());
const articleSlugs = new Set(articles.map((a) => a.data.slug));

// 1. Manifest must list exactly the files on disk.
try {
  execFileSync(process.execPath, [join(root, 'scripts/insights/build-manifest.mjs'), '--check'], {stdio: 'pipe'});
} catch {
  errors.push('[manifest] lib/insights/articles.generated.ts is out of date. Run: node scripts/insights/build-manifest.mjs');
}

for (const slug of strictSlugs) {
  if (!articleSlugs.has(slug)) errors.push(`[${slug}] no content/insights/${slug}.json file found.`);
}

const toLatinDigits = (value) =>
  value.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

const scriptChecks = {
  fa: {pattern: /[؀-ۿ]/, forbidden: /[يك]/, forbiddenMessage: 'uses Arabic ي/ك instead of Persian ی/ک'},
  ar: {pattern: /[؀-ۿ]/, forbidden: /[یکگچپژ]/, forbiddenMessage: 'contains Persian-only letters (ی ک گ چ پ ژ)'},
  ru: {pattern: /[Ѐ-ӿ]/},
  en: {pattern: /[A-Za-z]/, forbidden: /[؀-ۿЀ-ӿ]/, forbiddenMessage: 'contains Persian/Arabic/Cyrillic text'}
};

function shingles(text) {
  const words = normalizeKeyword(text).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 3 <= words.length; i += 1) set.add(words.slice(i, i + 3).join(' '));
  return set;
}

function jaccard(a, b) {
  let inter = 0;
  for (const item of a) if (b.has(item)) inter += 1;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

const reservedFa = new Set(reservedPrimaryKeywords.fa.map(normalizeKeyword));
const reservedEn = new Set(reservedPrimaryKeywords.en.map(normalizeKeyword));
const keywordOwners = new Map();
const titleOwners = new Map();
const fingerprints = [];

for (const {fileName, data} of articles) {
  const slug = data.slug ?? fileName;
  const strict = strictSlugs.has(slug) || Boolean(data.trend);

  if (`${data.slug}.json` !== fileName) fail(slug, `file name ${fileName} does not match slug.`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug ?? '')) fail(slug, 'slug must be lowercase kebab-case ASCII.');
  if ((data.slug ?? '').length > 70) warn(slug, 'slug is long; keep it under ~60 characters.');
  if (!systems.some((s) => s.id === data.category)) fail(slug, `unknown category "${data.category}".`);
  if (data.publishedAt > today) fail(slug, `publishedAt ${data.publishedAt} is in the future (today ${today}).`);
  if (new Set(data.faqIds ?? []).size !== (data.faqIds ?? []).length) fail(slug, 'faqIds must be unique.');

  for (const ref of data.relatedProjects ?? []) if (!projectSlugs.has(ref)) fail(slug, `relatedProjects: unknown project "${ref}".`);
  for (const ref of data.relatedResources ?? []) if (!resourceSlugs.has(ref)) fail(slug, `relatedResources: unknown resource "${ref}".`);
  for (const ref of data.relatedInsights ?? []) {
    if (ref === slug) fail(slug, 'relatedInsights must not reference itself.');
    else if (!articleSlugs.has(ref)) fail(slug, `relatedInsights: unknown article "${ref}".`);
  }

  // Unverified figures: every number in the visible text must be declared with a source.
  const allowedFigures = new Set((data.citedFigures ?? []).map((f) => toLatinDigits(String(f.value)).replace(/[,٬\s]/g, '')));
  for (const figure of data.citedFigures ?? []) {
    if (!/^https?:\/\//.test(figure.source) && !figure.source.startsWith('repo:')) {
      fail(slug, `citedFigures "${figure.value}": source must be an https URL or "repo:<path>".`);
    }
  }

  const combined = [];
  for (const locale of LOCALES) {
    const content = data.locales?.[locale];
    if (!content) {
      fail(slug, `missing locale "${locale}".`);
      continue;
    }
    const strings = localeStrings(content);
    const text = strings.join('\n');
    const check = scriptChecks[locale];
    if (!check.pattern.test(text)) fail(slug, `${locale}: text is not in the expected script.`);
    if (check.forbidden && check.forbidden.test(text)) fail(slug, `${locale}: ${check.forbiddenMessage}.`);

    for (const {pattern, reason} of blockedTerms) {
      if (pattern.test(text)) fail(slug, `${locale}: blocked term (${reason}).`);
    }

    const numbers = toLatinDigits(text).match(/\d[\d,٬.]*/g) ?? [];
    for (const raw of numbers) {
      const value = raw.replace(/[,٬]/g, '').replace(/\.$/, '');
      if (!allowedFigures.has(value)) fail(slug, `${locale}: figure "${raw}" is not declared in citedFigures with a source.`);
    }

    const title = normalizeKeyword(content.title ?? '');
    if (titleOwners.has(`${locale}:${title}`)) fail(slug, `${locale}: title duplicates "${titleOwners.get(`${locale}:${title}`)}".`);
    titleOwners.set(`${locale}:${title}`, slug);

    const keyword = normalizeKeyword(content.primaryKeyword ?? '');
    if (keywordOwners.has(`${locale}:${keyword}`)) {
      fail(slug, `${locale}: primaryKeyword "${content.primaryKeyword}" is already targeted by "${keywordOwners.get(`${locale}:${keyword}`)}".`);
    }
    keywordOwners.set(`${locale}:${keyword}`, slug);
    if (locale === 'fa' && reservedFa.has(keyword)) fail(slug, `fa: primaryKeyword "${content.primaryKeyword}" belongs to a systems/landing page (cannibalization).`);
    if (locale === 'en' && reservedEn.has(keyword)) fail(slug, `en: primaryKeyword "${content.primaryKeyword}" belongs to a systems page (cannibalization).`);

    if (locale === 'fa' || locale === 'en') {
      const titleText = normalizeKeyword(content.title ?? '');
      const metaText = normalizeKeyword(content.metaDescription ?? '');
      const keywordHead = keyword.split(' ').slice(0, 2).join(' ');
      if (keywordHead && !titleText.includes(keywordHead)) warn(slug, `${locale}: title does not contain the primary keyword head "${keywordHead}".`);
      if (keywordHead && !metaText.includes(keywordHead)) warn(slug, `${locale}: metaDescription does not contain the primary keyword head "${keywordHead}".`);
    }
    if ((content.metaDescription ?? '').length > 165) warn(slug, `${locale}: metaDescription is ${content.metaDescription.length} chars (aim for ≤160).`);
    if ((content.title ?? '').length > 70) warn(slug, `${locale}: title is ${content.title.length} chars (aim for ≤65).`);

    if (strict) {
      const words = wordCount(strings);
      if (words < NEW_ARTICLE_MIN_WORDS[locale]) fail(slug, `${locale}: ${words} words; automated articles need at least ${NEW_ARTICLE_MIN_WORDS[locale]}.`);
      if ((content.problem?.points?.length ?? 0) < NEW_ARTICLE_MIN.points || (content.cause?.points?.length ?? 0) < NEW_ARTICLE_MIN.points) {
        fail(slug, `${locale}: automated articles need at least ${NEW_ARTICLE_MIN.points} points in problem and cause.`);
      }
      if ((content.execution?.steps?.length ?? 0) < NEW_ARTICLE_MIN.steps) fail(slug, `${locale}: automated articles need at least ${NEW_ARTICLE_MIN.steps} execution steps.`);
      if ((content.faqs?.length ?? 0) < NEW_ARTICLE_MIN.faqs) fail(slug, `${locale}: automated articles need at least ${NEW_ARTICLE_MIN.faqs} FAQs.`);
    }

    if (locale === 'fa' || locale === 'en') combined.push(text);
  }

  if (strict) {
    if (!data.trend) fail(slug, 'automated articles must record the trend signal (trend.topic, rationale, sources).');
    else if ((data.trend.sources ?? []).length === 0) fail(slug, 'trend.sources must list at least one URL that shows the trend.');
    if ((data.relatedProjects ?? []).length === 0) warn(slug, 'no relatedProjects; link a verified project for this system when one exists.');
  }

  fingerprints.push({slug, set: shingles(combined.join('\n'))});
}

// Near-duplicate detection across articles (fa + en text).
for (let i = 0; i < fingerprints.length; i += 1) {
  for (let j = i + 1; j < fingerprints.length; j += 1) {
    const score = jaccard(fingerprints[i].set, fingerprints[j].set);
    if (score > SIMILARITY_LIMIT) {
      fail(fingerprints[j].slug, `text is ${(score * 100).toFixed(0)}% similar to "${fingerprints[i].slug}" (limit ${SIMILARITY_LIMIT * 100}%).`);
    }
  }
}

for (const message of warnings) console.warn(`warn  ${message}`);
for (const message of errors) console.error(`error ${message}`);
console.log(`\nInsights: ${articles.length} files, ${errors.length} errors, ${warnings.length} warnings.`);
process.exit(errors.length > 0 ? 1 : 0);
