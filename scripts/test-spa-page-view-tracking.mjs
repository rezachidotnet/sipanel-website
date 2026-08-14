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

function assertPayload(actual, expected, label) {
  assert.deepEqual(JSON.parse(JSON.stringify(actual)), expected, label);
}

function loadSpaPageViewHelpers() {
  const source = read('lib/analytics/spa-page-view.ts');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const context = {
    exports: {},
    module: {exports: {}}
  };
  context.exports = context.module.exports;
  vm.runInNewContext(compiled, context, {filename: 'lib/analytics/spa-page-view.ts'});

  return context.module.exports;
}

const {createSpaPageViewState, getCanonicalPageLocation} = loadSpaPageViewHelpers();
const origin = 'https://www.sipanelco.ir';

function location(pathname) {
  const parsed = new URL(pathname, origin);
  return {
    origin: parsed.origin,
    pathname: parsed.pathname
  };
}

const tracker = createSpaPageViewState(getCanonicalPageLocation(location('/?utm_source=newsletter&phone=123456789')));

assert.equal(tracker.getPreviousLocation(), `${origin}/`, 'initial canonical location should exclude query strings');
assert.equal(
  tracker.createPayload(`${origin}/`, 'SIPANEL'),
  null,
  'initial mount and repeated same route should not emit spa_page_view'
);

assertPayload(
  tracker.createPayload(getCanonicalPageLocation(location('/systems?name=Ali&email=ali@example.com')), 'Systems | SIPANEL'),
  {
    page_location: `${origin}/systems`,
    page_referrer: `${origin}/`,
    page_title: 'Systems | SIPANEL'
  },
  '/ -> /systems should emit one destination page view'
);

assert.equal(
  tracker.createPayload(`${origin}/systems`, 'Systems | SIPANEL'),
  null,
  'repeated render of the same route should not emit another page view'
);

assertPayload(
  tracker.createPayload(`${origin}/projects`, 'Projects | SIPANEL'),
  {
    page_location: `${origin}/projects`,
    page_referrer: `${origin}/systems`,
    page_title: 'Projects | SIPANEL'
  },
  '/systems -> /projects should use /systems as referrer'
);

assertPayload(
  tracker.createPayload(`${origin}/systems`, 'Systems | SIPANEL'),
  {
    page_location: `${origin}/systems`,
    page_referrer: `${origin}/projects`,
    page_title: 'Systems | SIPANEL'
  },
  'Back /projects -> /systems should use /projects as referrer'
);

assertPayload(
  tracker.createPayload(`${origin}/projects`, 'Projects | SIPANEL'),
  {
    page_location: `${origin}/projects`,
    page_referrer: `${origin}/systems`,
    page_title: 'Projects | SIPANEL'
  },
  'Forward /systems -> /projects should use /systems as referrer'
);

const piiLocation = getCanonicalPageLocation(location('/contact?name=Ali&phone=09120000000&email=ali@example.com&message=hello#rfq-form'));
assert.equal(piiLocation, `${origin}/contact`, 'canonical page_location must exclude query strings and hashes');
for (const forbidden of ['Ali', '09120000000', 'ali@example.com', 'message=hello', '#rfq-form']) {
  assertNotIncludes(piiLocation, forbidden, `PII leakage in page_location: ${forbidden}`);
}

const analyticsSource = read('lib/analytics/events.ts');
const trackerSource = read('components/analytics/spa-page-view-tracker.tsx');
const layoutSource = read('app/[locale]/layout.tsx');
const headerSource = read('components/layout/header.tsx');
const languageSwitcherSource = read('components/localization/language-switcher.tsx');

assertIncludes(analyticsSource, "'spa_page_view'", 'spa_page_view allowlist entry');
assertIncludes(analyticsSource, 'export function trackSpaPageView', 'spa page view dispatcher');
assertIncludes(analyticsSource, "dispatchGtmEvent('spa_page_view', params)", 'spa page view dataLayer-only dispatch');
assertNotIncludes(analyticsSource, 'window.gtag', 'direct GA4 dispatch');
assertNotIncludes(analyticsSource, 'gtag(', 'direct GA4 dispatch');

const trackSpaPageViewStart = analyticsSource.indexOf('export function trackSpaPageView');
const trackSpaPageViewEnd = analyticsSource.indexOf('export function trackCtaClick');
const trackSpaPageViewBody = analyticsSource.slice(trackSpaPageViewStart, trackSpaPageViewEnd);
for (const forbidden of [
  'name:',
  'phone:',
  'email:',
  'whatsapp:',
  'company:',
  'message:',
  'leadId',
  'submissionId',
  'project_type',
  'lead_type'
]) {
  assertNotIncludes(trackSpaPageViewBody, forbidden, `PII/contact/RFQ payload field ${forbidden}`);
}

assertIncludes(trackerSource, 'usePathname', 'stable App Router pathname hook');
assertNotIncludes(trackerSource, '__PRIVATE_NEXTJS_INTERNALS_TREE', 'private Next.js internals');
assertNotIncludes(trackerSource, 'pushState =', 'pushState monkey patch');
assertNotIncludes(trackerSource, 'replaceState =', 'replaceState monkey patch');
assertIncludes(trackerSource, 'createSpaPageViewState(readCurrentLocation())', 'initial mount guard stores current location');
assertIncludes(trackerSource, 'handledPathnameRef.current === pathname', 'duplicate pathname guard');
assertIncludes(trackerSource, 'window.requestAnimationFrame(() => {', 'post-navigation title timing frame');
assertIncludes(trackerSource, 'secondFrameRef.current = window.requestAnimationFrame', 'second frame title timing');
assertIncludes(trackerSource, 'document.title', 'destination title read');
assertIncludes(trackerSource, 'trackSpaPageView(payload)', 'spa page view emission');

assertIncludes(layoutSource, '<SpaPageViewTracker />', 'global layout tracker mount');
assertIncludes(headerSource, '<a', 'desktop locale hard reload anchor');
assertIncludes(languageSwitcherSource, '<a', 'mobile locale hard reload anchor');

console.log('SPA page view tracking tests passed.');
