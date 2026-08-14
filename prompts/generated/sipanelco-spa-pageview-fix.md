# SIPANEL SPA Page View Remediation Brief

## Verified Defect

SIPANEL currently sends exactly one GA4 `page_view` on a fresh document load, but sends no GA4 `page_view` on normal client-side SPA navigation.

## Verified Browser Evidence

- Site: `https://www.sipanelco.ir/`
- GTM container: `GTM-K5HK55FN`
- GA4 Measurement ID: `G-8QFRB20LMW`
- Fresh-load result: exactly one `page_view`.
- SPA navigation result: URL changes, `gtm.historyChange-v2` occurs, GTM variables update, but Tags Fired is `None` and no GA4 `page_view` is sent.
- Example destination variables: `Page Hostname=www.sipanelco.ir`, `Page Path=/contact`, `Page URL=https://www.sipanelco.ir/contact`, `Referrer=https://www.sipanelco.ir/resources`.

## Root Cause

The production Google Tag sends the initial document-load `page_view`, but there is no active page-view producer for SPA route changes. GTM detects browser history changes, but no page-view tag fires on `gtm.historyChange-v2`.

## Selected Architecture

Affected layer: GTM.

Create a GTM-owned History Change page-view path:

1. Keep the existing `GA4 - Google Tag - All Pages` tag unchanged for fresh document-load page views.
2. Create or identify a History Change trigger for `gtm.historyChange-v2`.
3. Configure the trigger to include relevant history-change sources for normal SPA navigation and browser Back/Forward. At minimum validate `pushState`; also validate `replaceState` and `popstate`.
4. Create a GA4 Event tag named `page_view` for `G-8QFRB20LMW`.
5. Fire that tag only from the History Change trigger.
6. Set `page_location` from GTM's current Page URL on the History Change message.
7. Set `page_referrer` from the previous-page referrer value available on the History Change message. Do not rely on `document.referrer` alone for SPA navigation.
8. Do not add website application code unless GTM Preview proves GTM cannot supply reliable destination/referrer values.

## Existing Files To Reference

- `app/[locale]/layout.tsx`: single GTM loader using `GoogleTagManager` and `NEXT_PUBLIC_GTM_ID`.
- `lib/analytics/events.ts`: application-owned custom events only; no explicit `page_view`.
- `i18n/routing.ts`: `next-intl` navigation wrapper for App Router links.
- `components/layout/header.tsx`: normal internal `Link` navigation and hard-reload locale anchors.
- `components/localization/language-switcher.tsx`: hard-reload locale anchors.

## Forbidden Changes

- Do not modify website code.
- Do not modify Consent Mode.
- Do not modify GA4 Admin unless separately approved.
- Do not deploy website code.
- Do not push repository changes.
- Do not change Odoo, RFQ, contact, catalog, resource lead, or `generate_lead` behavior.
- Do not create another page-view producer on initial load.
- Do not send names, phone numbers, emails, company names, WhatsApp numbers, messages, uploaded filenames, or uncontrolled URL query strings.

## AvizSazeh Regression Lessons

Avoid the two known failure modes:

1. Duplicate initial page views caused by automatic Google Tag page views plus explicit page-view dispatch.
2. Stale `page_location` or `page_referrer` caused by bad tag-level override mapping.

For SIPANEL, keep the existing fresh-load producer and add only a History Change producer. In Preview, inspect the exact outgoing GA4 request after each navigation and reject the change if `dl` or `dr` is stale.

## Preview Test Matrix

### Fresh-load duplicate test

1. Open a clean Tag Assistant session.
2. Direct-load `https://www.sipanelco.ir/`.
3. Expected: exactly one GA4 `page_view` to `G-8QFRB20LMW`.
4. Expected: the new History Change page-view tag does not fire.

### Normal SPA navigation test

1. Direct-load `https://www.sipanelco.ir/resources`.
2. Click internal navigation to `/contact`.
3. Expected: `gtm.historyChange-v2` occurs.
4. Expected: exactly one GA4 `page_view` is sent for `/contact`.
5. Expected: `page_location=https://www.sipanelco.ir/contact`.
6. Expected: `page_referrer=https://www.sipanelco.ir/resources`.

### Back test

1. From `/contact`, click browser Back.
2. Expected: exactly one GA4 `page_view` for the destination page.
3. Expected: History Change source is covered by the trigger.
4. Expected: `page_location` and `page_referrer` are not stale.

### Forward test

1. Click browser Forward.
2. Expected: exactly one GA4 `page_view` for the destination page.
3. Expected: History Change source is covered by the trigger.
4. Expected: `page_location` and `page_referrer` are not stale.

### Locale hard reload test

1. Click a locale switcher link.
2. Expected: hard reload occurs.
3. Expected: exactly one fresh-load GA4 `page_view` for the destination locale URL.
4. Expected: the History Change page-view tag does not add a duplicate page view on top of the fresh-load page view.

### page_location / page_referrer test

Inspect the outgoing GA4 request parameters:

- `dl` / `page_location` equals the destination page URL.
- `dr` / `page_referrer` equals the previous page for SPA navigation.
- Hostname is `www.sipanelco.ir`.
- Measurement ID is `G-8QFRB20LMW`.

### PII test

Confirm no GA4 page-view parameters contain:

- name
- phone
- email
- company
- WhatsApp number
- message text
- uploaded filename
- uncontrolled query string containing user-entered values

### Contact-event regression test

Trigger phone, WhatsApp, email, sticky CTA, header catalog CTA, and RFQ-start interactions. Expected: existing event ownership and counts do not change as a side effect of page-view remediation.

### generate_lead regression test

Submit a safe test RFQ/catalog/resource lead through the existing form flow only if approved for Preview testing. Expected: existing server-confirmed conversion behavior remains unchanged. Submit clicks alone must not count as `generate_lead`.

## Production Validation Plan

After Preview passes and only after approval to publish:

1. Publish the GTM container.
2. Run the same tests in production Tag Assistant.
3. Confirm GA4 DebugView shows one page_view per destination.
4. Confirm Realtime does not show duplicate fresh-load page views.
5. Monitor for unexpected contact-event or conversion-count changes.

## Rollback Plan

If duplicates, stale `dl`/`dr`, missing Back/Forward coverage, or conversion regressions appear:

1. Revert the GTM workspace change or disable the new History Change page-view tag.
2. Republish the previous GTM version.
3. Re-run fresh-load and SPA tests to confirm the system returns to the known baseline.

## Publish Gate

Do not publish until all Preview tests pass:

- Fresh load exactly one page_view.
- SPA exactly one page_view.
- Back exactly one page_view.
- Forward exactly one page_view.
- Locale hard reload exactly one page_view.
- Correct `page_location`.
- Correct `page_referrer`.
- No PII.
- No contact-event regression.
- No `generate_lead` regression.
