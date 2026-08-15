import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function fail(message) {
  throw new Error(message);
}

function assertIncludes(text, needle, label) {
  if (!text.includes(needle)) {
    fail(`Missing ${label}: ${needle}`);
  }
}

function assertNotIncludes(text, needle, label) {
  if (text.includes(needle)) {
    fail(`Unexpected ${label}: ${needle}`);
  }
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function loadAnalyticsEvents() {
  const source = read('lib/analytics/events.ts');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const context = {
    exports: {},
    module: {exports: {}},
    console,
    document: {referrer: '', title: 'FAQ | SIPANEL', documentElement: {lang: 'fa'}},
    process: {env: {NODE_ENV: 'test'}},
    window: {
      dataLayer: [{event: 'page_view'}],
      innerWidth: 1280,
      location: {origin: 'https://www.sipanelco.ir', pathname: '/faq'}
    },
    require(specifier) {
      if (specifier === '@next/third-parties/google') {
        return {sendGTMEvent: (payload) => context.window.dataLayer.push(payload)};
      }

      return {};
    }
  };
  context.exports = context.module.exports;
  vm.runInNewContext(compiled, context, {filename: 'lib/analytics/events.ts'});

  return {analytics: context.module.exports, context};
}

const {analytics, context} = loadAnalyticsEvents();

assert.equal(
  analytics.trackFaqExpand({
    faq_id: 'what-does-sipanel-do',
    faq_question: '  SIPANEL چه کاری  انجام می‌دهد؟ ',
    faq_category: 'general',
    faq_position: 1,
    page_language: 'fa'
  }),
  true,
  'trackFaqExpand should dispatch in the browser'
);

assert.deepEqual(JSON.parse(JSON.stringify(context.window.dataLayer[1])), {
  event: 'faq_expand',
  faq_id: 'what-does-sipanel-do',
  faq_question: 'SIPANEL چه کاری انجام می‌دهد؟',
  faq_category: 'general',
  faq_position: 1,
  page_language: 'fa'
});
assert.equal(context.window.dataLayer[0].event, 'page_view', 'existing page_view dataLayer entry should remain intact');

for (const language of ['fa', 'en', 'ar', 'ru']) {
  assert.equal(
    analytics.trackFaqExpand({
      faq_id: 'what-does-sipanel-do',
      faq_question: `visible question ${language}`,
      faq_category: 'general',
      faq_position: 1,
      page_language: language
    }),
    true,
    `${language} page_language should be accepted`
  );
}

const analyticsSource = read('lib/analytics/events.ts');
const faqAnalyticsSource = read('lib/analytics/faq.ts');
const faqDetailsSource = read('components/analytics/faq-expand-details.tsx');
const faqPageSource = read('components/faq/faq-page.tsx');
const serviceSource = read('components/services/service-page-template.tsx');
const seoSource = read('components/seo/seo-landing-page-template.tsx');
const contactSource = read('components/contact/rfq-contact-page.tsx');
const resourcesSource = read('components/resources/engineering-resource-hub-page.tsx');
const insightsSource = read('components/insights/engineering-article-template.tsx');
const systemsSource = read('app/[locale]/systems/page.tsx');
const pageViewSource = read('lib/analytics/page-view.ts');
const packageSource = read('package.json');
const directGtagCall = ['g', 'tag('].join('');
const obsoleteFaqExpandCall = ["trackFaqEvent('", 'faq_expand', "'"].join('');
const onToggleFaqExpandPattern = new RegExp(['onToggle=.*', 'faq_expand'].join(''), 'gs');

assertIncludes(analyticsSource, "'faq_expand'", 'faq_expand allowlist entry');
assertIncludes(analyticsSource, 'export function trackFaqExpand', 'central faq_expand helper');
assertIncludes(analyticsSource, "event: 'faq_expand'", 'faq_expand event payload');
assertIncludes(analyticsSource, 'win.dataLayer = win.dataLayer || []', 'safe dataLayer initialization');
assertIncludes(analyticsSource, 'win.dataLayer.push(payload)', 'direct dataLayer push');
assertNotIncludes(analyticsSource, 'window.gtag', 'direct GA4 dispatch');
assertNotIncludes(analyticsSource, directGtagCall, 'direct GA4 dispatch');
assertIncludes(faqAnalyticsSource, 'getRequiredFaqAnalyticsId', 'required stable FAQ id helper');
assertIncludes(faqAnalyticsSource, 'Missing FAQ analytics id', 'missing FAQ id failure');
assertIncludes(faqAnalyticsSource, 'normalizeFaqAnalyticsId', 'stable id normalizer');

assertIncludes(faqDetailsSource, "'use client'", 'small client boundary for native details');
assertIncludes(faqDetailsSource, 'onClick={handleSummaryClick}', 'summary activation handler');
assertIncludes(faqDetailsSource, 'detailsRef.current?.open === false', 'closed-to-open guard');
assertIncludes(faqDetailsSource, 'trackFaqExpand({', 'details faq_expand dispatch');
assertNotIncludes(faqDetailsSource, 'useEffect', 'no effect-based faq tracking');
assertNotIncludes(faqDetailsSource, 'onToggle', 'no broad onToggle tracking');

assertIncludes(faqPageSource, 'trackFaqExpand({', 'main FAQ page tracking');
assertIncludes(faqPageSource, 'faq_position: visibleItems.findIndex', 'visible one-based position');
assertIncludes(faqPageSource, 'page_language: locale', 'authoritative locale prop');
assertNotIncludes(faqPageSource, obsoleteFaqExpandCall, 'obsolete generic faq_expand path');
assertNotIncludes(faqPageSource, "component_id: 'faq_expand_all'", 'obsolete expand-all faq_expand event');

for (const [label, source] of [
  ['service FAQ', serviceSource],
  ['SEO FAQ', seoSource],
  ['contact FAQ', contactSource],
  ['resource hub FAQ', resourcesSource],
  ['insight FAQ', insightsSource],
  ['systems overview FAQ', systemsSource]
]) {
  assertIncludes(source, '<FaqExpandDetails', `${label} opt-in FAQ details`);
  assertIncludes(source, 'faqQuestion:', `${label} localized question payload`);
  assertIncludes(source, 'faqCategory:', `${label} stable category payload`);
  assertIncludes(source, 'faqPosition:', `${label} one-based position payload`);
  assertIncludes(source, 'pageLanguage:', `${label} locale payload`);
}

assertIncludes(contactSource, "'rfq-project-info'", 'contact stable FAQ IDs');
assertIncludes(resourcesSource, "'resource-panel-selection-start'", 'resource stable FAQ IDs');
assertIncludes(insightsSource, "'panel-grade-leakage-risk'", 'insight stable FAQ IDs');
assertIncludes(systemsSource, "'systems-selection-fit'", 'systems stable FAQ IDs');
assertIncludes(serviceSource, "'panel-selection-method'", 'service stable FAQ suffixes');
assertIncludes(seoSource, "'review-scope'", 'SEO stable FAQ suffixes');

for (const [label, source] of [
  ['service FAQ', serviceSource],
  ['SEO FAQ', seoSource],
  ['resource hub FAQ', resourcesSource],
  ['insight FAQ', insightsSource],
  ['systems overview FAQ', systemsSource]
]) {
  assertIncludes(source, 'getRequiredFaqAnalyticsId', `${label} requires explicit stable FAQ IDs`);
  assertNotIncludes(source, 'faq-${index + 1}', `${label} must not use an index-derived faq_id fallback`);
}

assert.equal(countMatches(serviceSource, onToggleFaqExpandPattern), 0, 'service FAQ should not use onToggle faq_expand');
assert.equal(countMatches(seoSource, onToggleFaqExpandPattern), 0, 'SEO FAQ should not use onToggle faq_expand');
assert.equal(countMatches(`${analyticsSource}\n${faqPageSource}\n${serviceSource}\n${seoSource}`, /component_name: item\.question/g), 0, 'faq_expand should not use component_name as question transport');

assertIncludes(pageViewSource, "event: 'page_view'", 'page_view implementation preserved');
assertIncludes(pageViewSource, 'win.dataLayer.push(payload)', 'page_view still uses dataLayer');
for (const eventName of ['whatsapp_click', 'phone_click', 'email_click']) {
  assertIncludes(analyticsSource, `'${eventName}'`, `${eventName} allowlist entry preserved`);
}

assertIncludes(packageSource, '"test:faq-analytics"', 'FAQ analytics test script');

console.log('FAQ expansion analytics tests passed.');
