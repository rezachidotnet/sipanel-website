import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function fail(message) {
  throw new Error(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function loadLeadResponseHelper() {
  const source = read('lib/rfq/lead-response.ts');
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
  vm.runInNewContext(compiled, context, {filename: 'lib/rfq/lead-response.ts'});

  return context.module.exports;
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

const {isConfirmedRfqDelivery} = loadLeadResponseHelper();

assert.equal(
  isConfirmedRfqDelivery({ok: true, lead: {provider: 'odoo', delivered: true}}),
  true,
  'confirmed Odoo delivery should pass the RFQ success gate'
);

for (const [label, payload] of [
  ['delivered=false', {ok: true, lead: {provider: 'odoo', delivered: false}}],
  ['missing delivery field', {ok: true, lead: {provider: 'odoo'}}],
  ['API failure', {ok: false, lead: {provider: 'odoo', delivered: true}}],
  ['honeypot-style quiet success', {ok: true}],
  ['null response', null]
]) {
  assert.equal(isConfirmedRfqDelivery(payload), false, `${label} should fail the RFQ success gate`);
}

const rfqFrontendFiles = [
  'components/home/rfq-section.tsx',
  'components/contact/rfq-contact-page.tsx'
];
const frontendSource = rfqFrontendFiles.map((file) => read(file)).join('\n');
const apiSource = read('app/api/lead/route.ts');
const odooSource = read('lib/rfq/odoo.ts');
const analyticsSource = read('lib/analytics/events.ts');

assertIncludes(apiSource, 'lead: {', 'lead response contract');
assertIncludes(apiSource, 'delivered: true', 'positive CRM delivery response');
assertIncludes(apiSource, 'if (!odooLead.delivered)', 'fail-closed Odoo delivery check');
assertIncludes(odooSource, 'delivered: true', 'Odoo success result');
assertIncludes(odooSource, 'delivered: false', 'Odoo not-configured result');

const rfqSubmitCount = (frontendSource.match(/trackRfqEvent\('rfq_submit'/g) ?? []).length;
const deliveryGateCount = (frontendSource.match(/isConfirmedRfqDelivery\(result\)/g) ?? []).length;

assert.equal(rfqSubmitCount, 2, 'expected one rfq_submit emission per RFQ form');
assert.equal(deliveryGateCount, 2, 'expected both RFQ forms to gate success on confirmed CRM delivery');

for (const file of rfqFrontendFiles) {
  const source = read(file);
  const gateIndex = source.indexOf('if (!response.ok || !isConfirmedRfqDelivery(result))');
  const submitIndex = source.indexOf("trackRfqEvent('rfq_submit'");

  assert.notEqual(gateIndex, -1, `${file} should check confirmed CRM delivery`);
  assert.notEqual(submitIndex, -1, `${file} should emit rfq_submit`);
  assert.ok(gateIndex < submitIndex, `${file} should gate before rfq_submit`);
  assertIncludes(source, 'disabled={isSubmitting || submitState === \'success\'}', `${file} duplicate-submit disabled state`);
}

const rfqSubmitBlocks = frontendSource.match(/trackRfqEvent\('rfq_submit', \{[\s\S]*?\}\);/g) ?? [];

assert.equal(rfqSubmitBlocks.length, 2, 'expected two rfq_submit payloads');

for (const block of rfqSubmitBlocks) {
  for (const forbidden of [
    'values.name',
    'values.phone',
    'values.whatsapp',
    'values.email',
    'values.message',
    'values.project_location',
    'submissionId',
    'leadId',
    'odooLead'
  ]) {
    assertNotIncludes(block, forbidden, `PII or CRM identifier in rfq_submit payload ${forbidden}`);
  }
}

for (const eventName of ['rfq_start', 'rfq_submit', 'rfq_error']) {
  assertIncludes(analyticsSource, `'${eventName}'`, `${eventName} allowlist entry`);
}

console.log('RFQ CRM delivery gate tests passed.');
