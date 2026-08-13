import fs from 'node:fs';

function fail(message) {
  throw new Error(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
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

const ctaFiles = [
  'components/layout/footer-contact-links.tsx',
  'components/home/sticky-mobile-cta.tsx',
  'components/home/rfq-section.tsx',
  'components/contact/rfq-contact-page.tsx',
  'components/about/about-page.tsx',
  'components/faq/faq-page.tsx',
  'components/case-studies/case-study-page-template.tsx'
];

const combinedCtaSource = ctaFiles.map((file) => read(file)).join('\n');
const analyticsSource = read('lib/analytics/events.ts');

const contactCardHandlerCount = countMatches(combinedCtaSource, /trackContactClick\(card\.type/g);
const unrelatedExternalTargetCount = countMatches(combinedCtaSource, /className="about-inline-link"[^>]*target="_blank"/g);
const unrelatedExternalRelCount = countMatches(combinedCtaSource, /className="about-inline-link"[^>]*rel="noopener noreferrer"/g);
const whatsappTargetCount = countMatches(combinedCtaSource, /target="_blank"/g) - unrelatedExternalTargetCount + contactCardHandlerCount;
const whatsappRelCount = countMatches(combinedCtaSource, /rel="noopener noreferrer"/g) - unrelatedExternalRelCount + contactCardHandlerCount;
const whatsappEventCount = countMatches(combinedCtaSource, /data-analytics-event="whatsapp_click"/g) + contactCardHandlerCount;
const whatsappClickHandlerCount = countMatches(combinedCtaSource, /trackContactClick\('whatsapp'/g) + contactCardHandlerCount;
const phoneEventCount = countMatches(combinedCtaSource, /data-analytics-event="phone_click"/g) + contactCardHandlerCount;
const phoneClickHandlerCount = countMatches(combinedCtaSource, /trackContactClick\('phone'/g) + contactCardHandlerCount;
const emailEventCount = countMatches(combinedCtaSource, /data-analytics-event="email_click"/g) + contactCardHandlerCount;
const emailClickHandlerCount = countMatches(combinedCtaSource, /trackContactClick\('email'/g) + contactCardHandlerCount;

if (whatsappEventCount !== 11) fail(`Expected 11 WhatsApp CTA definitions, found ${whatsappEventCount}`);
if (whatsappTargetCount !== 11) fail(`Expected 11 WhatsApp target attributes, found ${whatsappTargetCount}`);
if (whatsappRelCount !== 11) fail(`Expected 11 WhatsApp safe rel attributes, found ${whatsappRelCount}`);
if (whatsappClickHandlerCount !== 11) fail(`Expected 11 WhatsApp click handlers, found ${whatsappClickHandlerCount}`);

if (phoneEventCount !== 7) fail(`Expected 7 phone analytics markers, found ${phoneEventCount}`);
if (phoneClickHandlerCount !== 7) fail(`Expected 7 phone click handlers, found ${phoneClickHandlerCount}`);

if (emailEventCount !== 4) fail(`Expected 4 email analytics markers, found ${emailEventCount}`);
if (emailClickHandlerCount !== 4) fail(`Expected 4 email click handlers, found ${emailClickHandlerCount}`);

for (const eventName of ['whatsapp_click', 'phone_click', 'email_click']) {
  assertIncludes(analyticsSource, `'${eventName}'`, `${eventName} allowlist entry`);
}

assertIncludes(
  analyticsSource,
  "export function trackContactClick(type: 'phone' | 'whatsapp' | 'email', component_id?: string)",
  'trackContactClick signature'
);
assertIncludes(analyticsSource, 'component_id,', 'contact payload component_id');
assertIncludes(analyticsSource, "interaction_type: 'click'", 'contact click interaction payload');

const trackContactClickBody = analyticsSource.slice(analyticsSource.indexOf('return trackEvent(eventName, {'));

for (const forbidden of ['href:', 'url:', 'destination:', 'message:', 'phone_number:', 'email_address:', 'whatsapp_url:']) {
  assertNotIncludes(
    trackContactClickBody,
    forbidden,
    `raw contact payload field ${forbidden}`
  );
}

if (/trackContactClick\('(?:whatsapp|phone|email)'/.test(combinedCtaSource.replace(/onClick=\{[^}]*trackContactClick\('(?:whatsapp|phone|email)'[^}]*\}/g, ''))) {
  fail('Found contact tracking outside an onClick handler');
}

console.log('Contact CTA tracking tests passed.');
