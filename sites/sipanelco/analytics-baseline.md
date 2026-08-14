# SIPANEL Analytics Baseline

## Current Production Baseline

- Host: `https://www.sipanelco.ir`
- GTM container: `GTM-K5HK55FN`
- GA4 Measurement ID observed in production: `G-8QFRB20LMW`
- Website loader: one `GoogleTagManager` component in `app/[locale]/layout.tsx`.
- Custom event transport: `lib/analytics/events.ts` uses `sendGTMEvent(...)`.
- Direct app `page_view` transport: none found in active source.

## Page View Baseline

Fresh document load:

- Result: pass.
- Expected: exactly one GA4 `page_view`.
- Observed: exactly one GA4 `page_view` to `G-8QFRB20LMW`.

SPA navigation:

- Result: fail.
- Expected: exactly one destination GA4 `page_view`.
- Observed: `gtm.historyChange-v2` occurs and GTM variables update, but no GA4 `page_view` is sent.

## Tag Coverage Baseline

The Tag Coverage warnings for these URLs are not accepted as missing-tag evidence:

- `/resources/aluminium-cladding-layout-checklist`
- `/resources/mto-procurement-planning-sheet`

Direct Tag Assistant validation found GTM and one All Pages Google Tag fire for both.
