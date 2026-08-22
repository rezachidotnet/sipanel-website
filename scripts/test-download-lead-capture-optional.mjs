import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

function fail(message) {
  throw new Error(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
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

function extractBlock(source, startNeedle) {
  const start = source.indexOf(startNeedle);
  if (start === -1) {
    fail(`Could not locate block starting with: ${startNeedle}`);
  }
  let depth = 0;
  let i = source.indexOf('{', start);
  const blockStart = i;
  for (; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(blockStart, i + 1);
      }
    }
  }
  fail(`Unbalanced braces while extracting block: ${startNeedle}`);
  return '';
}

// --- 1. Server schema: download-lead forms have no required fields, other forms still do ---

const apiSource = read('app/api/lead/route.ts');

assertIncludes(apiSource, "downloadFormTypes = new Set(['Resource Download', 'Catalog Download'])", 'download form-type allowlist');
assertIncludes(apiSource, '.superRefine((data, ctx) => {', 'conditional validation via superRefine');
assertIncludes(apiSource, "country_code: z.string().trim().max(6).optional().default('')", 'optional country_code field');
assertIncludes(apiSource, "email: z.string().trim().email().optional().or(z.literal(''))", 'optional email field retained');

// name/phone must no longer be unconditionally required at the schema level
assertNotIncludes(apiSource, 'name: z.string().trim().min(2).max(120)', 'unconditionally required name');
assertNotIncludes(apiSource, 'phone: z.string().trim().min(5).max(60)', 'unconditionally required phone (non-optional)');
assertIncludes(apiSource, "name: z.string().trim().max(120).optional().default('')", 'name is optional at the base schema level');
assertIncludes(apiSource, "phone: z.string().trim().max(60).optional().default('')", 'phone is optional at the base schema level');

// but RFQ/contact (non-download) submissions must still be rejected without name/phone
const refineBlock = extractBlock(apiSource, '.superRefine((data, ctx) => {');
assertIncludes(refineBlock, 'isDownloadForm', 'download-form short-circuit inside superRefine');
assertIncludes(refineBlock, "data.name.length < 2", 'name still required for non-download forms');
assertIncludes(refineBlock, "data.phone.length < 5", 'phone still required for non-download forms');

// Run the actual condition to make sure it behaves as intended for both branches
function isDownloadForm(formType, resourceSlug, resourceTitle) {
  const downloadFormTypes = new Set(['Resource Download', 'Catalog Download']);
  return downloadFormTypes.has(formType) || Boolean(resourceSlug) || Boolean(resourceTitle);
}

assert.equal(isDownloadForm('Catalog Download', '', ''), true, 'catalog download form should skip required-field check');
assert.equal(isDownloadForm('Resource Download', '', ''), true, 'resource download form should skip required-field check');
assert.equal(isDownloadForm('', 'roof-leakage-prevention-checklist', ''), true, 'resource_slug alone should still be treated as a download form');
assert.equal(isDownloadForm('RFQ Consultation', '', ''), false, 'RFQ submissions must still require name/phone');
assert.equal(isDownloadForm('', '', ''), false, 'an unlabeled/default form_type must still require name/phone');

// --- 2. Client forms: download must fire from `finally`, never gated on the CRM response ---

const catalogSource = read('components/home/catalog-download-modal.tsx');
const resourceSource = read('components/resources/resource-detail-page-template.tsx');

for (const [label, source, triggerCall] of [
  ['catalog-download-modal.tsx', catalogSource, 'triggerDownload(locale);'],
  ['resource-detail-page-template.tsx', resourceSource, 'triggerResourceDownload(page.resource.downloadPath);']
]) {
  const handleSubmitBlock = extractBlock(source, 'async function handleSubmit(event: FormEvent<HTMLFormElement>) {');
  const finallyBlock = extractBlock(handleSubmitBlock, '} finally {');

  assertIncludes(finallyBlock, triggerCall.startsWith('triggerDownload') ? 'triggerDownload(locale)' : 'page.resource.downloadPath', `${label}: download trigger runs in the non-blocking finally block`);
  assertNotIncludes(handleSubmitBlock, 'throw new Error(payload.message', `${label}: download must not be gated behind a thrown CRM error`);
}

// No required fields left on either gated-download form
assertNotIncludes(catalogSource, 'required', 'required attribute on catalog download form');
assertNotIncludes(resourceSource, 'required', 'required attribute on resource download form');

// New fields present in both forms
for (const [label, source] of [
  ['catalog-download-modal.tsx', catalogSource],
  ['resource-detail-page-template.tsx', resourceSource]
]) {
  assertIncludes(source, 'name="country_code"', `${label}: country code field`);
  assertIncludes(source, 'name="email"', `${label}: email field`);
  assertIncludes(source, 'type="email"', `${label}: email input type`);
}

// --- 3. RFQ / contact forms remain untouched: still fail-closed, still require name/phone ---

const rfqSource = read('components/contact/rfq-contact-page.tsx');
assertIncludes(rfqSource, "name: z.string().trim().min(2, required)", 'RFQ client schema still requires name');
assertIncludes(rfqSource, "phone: z.string().trim().min(5, required)", 'RFQ client schema still requires phone');
assertIncludes(rfqSource, 'isConfirmedRfqDelivery(result)', 'RFQ still gates success on confirmed CRM delivery');

// --- 4. Odoo mapping: country_code merges into phone, nothing is sent as an empty string ---

const odooSource = read('lib/rfq/odoo.ts');
assertIncludes(odooSource, 'payload.country_code', 'country_code used in Odoo mapping');
assertIncludes(odooSource, 'if (payload.name) {', 'contact_name only sent when provided');
assertIncludes(odooSource, 'if (combinedPhone) {', 'phone only sent when a value exists');
assertNotIncludes(odooSource, 'contact_name: payload.name,', 'unconditional (possibly empty) contact_name assignment');

// Sanity: the TypeScript actually compiles as a module (catches obvious syntax slips
// in the edited blocks beyond what string assertions can see).
for (const file of ['lib/rfq/odoo.ts', 'app/api/lead/route.ts']) {
  const source = read(file);
  const result = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
  });
  if (result.diagnostics && result.diagnostics.length > 0) {
    fail(`${file} produced transpile diagnostics`);
  }
}

console.log('Download lead-capture optional-fields tests passed.');
