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

function loadPageViewHelpers() {
  const source = read('lib/analytics/page-view.ts');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const context = {
    exports: {},
    module: {exports: {}},
    window: {
      dataLayer: [{event: 'generate_lead'}]
    }
  };
  context.exports = context.module.exports;
  vm.runInNewContext(compiled, context, {filename: 'lib/analytics/page-view.ts'});

  return {helpers: context.module.exports, context};
}

const {helpers, context} = loadPageViewHelpers();
const {createPageViewState, getCurrentPageLocation, pushPageView} = helpers;
const origin = 'https://www.sipanelco.ir';

function location(pathname) {
  const parsed = new URL(pathname, origin);
  return {
    origin: parsed.origin,
    pathname: parsed.pathname,
    search: parsed.search
  };
}

function current(pathname) {
  return getCurrentPageLocation(location(pathname));
}

const tracker = createPageViewState();
const initial = current('/?utm_source=newsletter');

assertPayload(
  tracker.createPayload(initial.pageLocation, initial.pagePath, 'SIPANEL', 'fa', 'https://referrer.example/source'),
  {
    event: 'page_view',
    page_location: `${origin}/?utm_source=newsletter`,
    page_path: '/?utm_source=newsletter',
    page_title: 'SIPANEL',
    page_language: 'fa',
    page_referrer: 'https://referrer.example/source'
  },
  'initial load should emit one page_view with document.referrer'
);

assert.equal(
  tracker.createPayload(initial.pageLocation, initial.pagePath, 'SIPANEL', 'fa', 'https://referrer.example/source'),
  null,
  'Strict Mode remount or rerender of the same URL should not emit a duplicate page_view'
);

const systems = current('/systems');
assertPayload(
  tracker.createPayload(systems.pageLocation, systems.pagePath, 'Systems | SIPANEL', 'fa', ''),
  {
    event: 'page_view',
    page_location: `${origin}/systems`,
    page_path: '/systems',
    page_title: 'Systems | SIPANEL',
    page_language: 'fa',
    page_referrer: `${origin}/?utm_source=newsletter`
  },
  '/ -> /systems SPA navigation should emit one destination page_view'
);

assert.equal(
  tracker.createPayload(systems.pageLocation, systems.pagePath, 'Systems | SIPANEL', 'fa', ''),
  null,
  'rerender without navigation should not emit another page_view'
);

const rfqWithQuery = current('/rfq?system=space-frame');
assertPayload(
  tracker.createPayload(rfqWithQuery.pageLocation, rfqWithQuery.pagePath, 'RFQ | SIPANEL', 'fa', ''),
  {
    event: 'page_view',
    page_location: `${origin}/rfq?system=space-frame`,
    page_path: '/rfq?system=space-frame',
    page_title: 'RFQ | SIPANEL',
    page_language: 'fa',
    page_referrer: `${origin}/systems`
  },
  'query strings should be included in page_location and page_path'
);

const projects = current('/projects');
assertPayload(
  tracker.createPayload(projects.pageLocation, projects.pagePath, 'Projects | SIPANEL', 'fa', ''),
  {
    event: 'page_view',
    page_location: `${origin}/projects`,
    page_path: '/projects',
    page_title: 'Projects | SIPANEL',
    page_language: 'fa',
    page_referrer: `${origin}/rfq?system=space-frame`
  },
  '/rfq -> /projects should use the immediately previous application URL as referrer'
);

assertPayload(
  tracker.createPayload(systems.pageLocation, systems.pagePath, 'Systems | SIPANEL', 'fa', ''),
  {
    event: 'page_view',
    page_location: `${origin}/systems`,
    page_path: '/systems',
    page_title: 'Systems | SIPANEL',
    page_language: 'fa',
    page_referrer: `${origin}/projects`
  },
  'Back /projects -> /systems should emit one page_view and use /projects as referrer'
);

assertPayload(
  tracker.createPayload(projects.pageLocation, projects.pagePath, 'Projects | SIPANEL', 'fa', ''),
  {
    event: 'page_view',
    page_location: `${origin}/projects`,
    page_path: '/projects',
    page_title: 'Projects | SIPANEL',
    page_language: 'fa',
    page_referrer: `${origin}/systems`
  },
  'Forward /systems -> /projects should emit one page_view and use /systems as referrer'
);

const localizedTracker = createPageViewState();
const localizedCases = [
  {path: '/', title: 'SIPANEL', pageLanguage: 'fa'},
  {path: '/en/systems', title: 'Systems | SIPANEL', pageLanguage: 'en'},
  {path: '/ar/projects', title: 'Projects | SIPANEL', pageLanguage: 'ar'},
  {path: '/ru/contact', title: 'Contact | SIPANEL', pageLanguage: 'ru'}
];

for (const {path, title, pageLanguage} of localizedCases) {
  const route = current(path);
  const payload = localizedTracker.createPayload(route.pageLocation, route.pagePath, title, pageLanguage, '');
  assert.equal(payload?.page_location, `${origin}${path === '/' ? '/' : path}`, `${path} page_location`);
  assert.equal(payload?.page_language, pageLanguage, `${path} page_language`);
}

const hashed = current('/contact?system=roof#rfq-form');
assert.equal(hashed.pageLocation, `${origin}/contact?system=roof`, 'page_location must exclude hash fragments');
assert.equal(hashed.pagePath, '/contact?system=roof', 'page_path must exclude hash fragments');

assert.equal(pushPageView({
  event: 'page_view',
  page_location: `${origin}/contact`,
  page_path: '/contact',
  page_title: 'Contact | SIPANEL',
  page_language: 'fa',
  page_referrer: `${origin}/projects`
}), true, 'pushPageView should dispatch in the browser');
assert.equal(context.window.dataLayer.length, 2, 'pushPageView should append to existing dataLayer entries');
assert.equal(context.window.dataLayer[0].event, 'generate_lead', 'existing non-page-view dataLayer events should remain intact');
assert.equal(context.window.dataLayer[1].event, 'page_view', 'pushPageView should send page_view through dataLayer.push');

const analyticsSource = read('lib/analytics/events.ts');
const pageViewSource = read('lib/analytics/page-view.ts');
const trackerSource = read('components/analytics/page-view-tracker.tsx');
const layoutSource = read('app/[locale]/layout.tsx');
const obsoletePageViewEvent = ['spa', 'page', 'view'].join('_');
const obsoleteDispatcher = ['track', 'Spa', 'Page', 'View'].join('');
const historyChangeMarker = ['History', 'Change'].join('');

assertNotIncludes(analyticsSource, `'${obsoletePageViewEvent}'`, 'obsolete page-view allowlist entry');
assertNotIncludes(analyticsSource, obsoleteDispatcher, 'obsolete page-view dispatcher');
assertIncludes(analyticsSource, "'whatsapp_click'", 'whatsapp_click allowlist entry');
assertIncludes(analyticsSource, "'phone_click'", 'phone_click allowlist entry');
assertIncludes(analyticsSource, "'email_click'", 'email_click allowlist entry');
assertIncludes(analyticsSource, "'faq_expand'", 'faq_expand allowlist entry');
assertNotIncludes(analyticsSource, 'window.gtag', 'direct GA4 dispatch');
assertNotIncludes(analyticsSource, 'gtag(', 'direct GA4 dispatch');

assertIncludes(pageViewSource, "event: 'page_view'", 'page_view payload event');
assertIncludes(pageViewSource, 'win.dataLayer = win.dataLayer || []', 'safe dataLayer initialization');
assertIncludes(pageViewSource, 'win.dataLayer.push(payload)', 'dataLayer page_view dispatch');
assertNotIncludes(pageViewSource, 'sendGTMEvent', 'page_view must not use sendGTMEvent');
assertNotIncludes(pageViewSource, 'gtag(', 'page_view must not use direct gtag');

assertIncludes(trackerSource, 'usePathname', 'stable App Router pathname hook');
assertIncludes(trackerSource, 'useSearchParams', 'query-string navigation hook');
assertIncludes(trackerSource, 'pageLanguage: Locale', 'authoritative locale prop');
assertIncludes(trackerSource, 'document.referrer', 'initial page_referrer source');
assertIncludes(trackerSource, 'document.title', 'destination title read');
assertIncludes(trackerSource, 'pushPageView(payload)', 'page_view emission');
assertIncludes(trackerSource, 'const pageViewState = createPageViewState()', 'module-level Strict Mode duplicate guard');
assertIncludes(trackerSource, 'window.requestAnimationFrame', 'post-navigation title timing frame');
assertNotIncludes(trackerSource, 'pushState =', 'pushState monkey patch');
assertNotIncludes(trackerSource, 'replaceState =', 'replaceState monkey patch');
assertNotIncludes(trackerSource, historyChangeMarker, 'GTM history-change implementation');

assertIncludes(layoutSource, '<PageViewTracker pageLanguage={validLocale} />', 'global layout tracker mount with authoritative locale');
assertIncludes(layoutSource, '<Suspense fallback={null}>', 'search params Suspense boundary');

console.log('Application-controlled page_view tracking tests passed.');
