#!/usr/bin/env node
// Decides whether an automated insight may be published today and which system
// should get it. Prints a JSON brief consumed by the publishing agent (PLAYBOOK.md).
//
// Usage: node scripts/insights/next-slot.mjs [--date YYYY-MM-DD]
import {
  cadence,
  daysBetween,
  loadArticles,
  loadProjects,
  loadResources,
  loadSystems,
  loadTierAProjects,
  reservedPrimaryKeywords,
  todayInTehran
} from './lib.mjs';

const dateFlag = process.argv.indexOf('--date');
const today = dateFlag > -1 ? process.argv[dateFlag + 1] : todayInTehran();

const articles = loadArticles().map((a) => a.data).filter((a) => a.status === 'published');
const automated = articles.filter((a) => a.trend);
const systems = loadSystems();
const projects = loadProjects();
const tierA = loadTierAProjects();

// Cadence gate: counts every published article so manual posts also consume the budget.
const ages = articles.map((a) => daysBetween(a.publishedAt, today));
const last = articles.map((a) => a.publishedAt).sort().at(-1) ?? null;
const daysSinceLast = last ? daysBetween(last, today) : Infinity;
const inLast7 = ages.filter((d) => d >= 0 && d < 7).length;
const inLast30 = ages.filter((d) => d >= 0 && d < 30).length;

const blockers = [];
if (daysSinceLast < cadence.minDaysBetween) blockers.push(`last article was ${daysSinceLast} day(s) ago (minimum ${cadence.minDaysBetween}).`);
if (inLast7 >= cadence.maxPer7Days) blockers.push(`${inLast7} articles in the last 7 days (maximum ${cadence.maxPer7Days}).`);
if (inLast30 >= cadence.maxPer30Days) blockers.push(`${inLast30} articles in the last 30 days (maximum ${cadence.maxPer30Days}).`);

// System rotation: fewest articles first, then longest since last coverage; never repeat the last system.
const lastSystem = [...articles].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)).at(-1)?.category ?? null;
const ranking = systems
  .map((system) => {
    const own = articles.filter((a) => a.category === system.id);
    const lastDate = own.map((a) => a.publishedAt).sort().at(-1) ?? null;
    const systemProjects = projects.filter((p) => p.serviceHref === system.href);
    return {
      id: system.id,
      href: system.href,
      label: system.label,
      articleCount: own.length,
      lastPublishedAt: lastDate,
      repeatOfLastSystem: system.id === lastSystem,
      existingArticles: own.map((a) => ({slug: a.slug, faTitle: a.locales.fa.title, faKeyword: a.locales.fa.primaryKeyword, enKeyword: a.locales.en.primaryKeyword})),
      tierAProjects: systemProjects.filter((p) => tierA.includes(p.slug)).map((p) => p.slug),
      otherProjects: systemProjects.filter((p) => !tierA.includes(p.slug)).map((p) => p.slug)
    };
  })
  .sort((a, b) => {
    if (a.repeatOfLastSystem !== b.repeatOfLastSystem) return a.repeatOfLastSystem ? 1 : -1;
    if (a.articleCount !== b.articleCount) return a.articleCount - b.articleCount;
    return (a.lastPublishedAt ?? '').localeCompare(b.lastPublishedAt ?? '');
  });

const brief = {
  today,
  canPublish: blockers.length === 0,
  blockers,
  cadence,
  stats: {published: articles.length, automated: automated.length, daysSinceLast, inLast7, inLast30},
  recommendedSystems: ranking.slice(0, 3).map((s) => s.id),
  systems: ranking,
  avoidPrimaryKeywords: {
    reserved: reservedPrimaryKeywords,
    alreadyUsed: articles.map((a) => ({slug: a.slug, fa: a.locales.fa.primaryKeyword, en: a.locales.en.primaryKeyword}))
  },
  resources: loadResources(),
  recentTrendTopics: automated
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 12)
    .map((a) => ({slug: a.slug, publishedAt: a.publishedAt, topic: a.trend.topic}))
};

console.log(JSON.stringify(brief, null, 2));
