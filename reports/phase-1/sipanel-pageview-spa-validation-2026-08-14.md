# SIPANEL SPA Page View Validation - 2026-08-14

## Status

Criterion 4 status: VERIFIED DEFECT / REMEDIATION REQUIRED.

This file replaces the prior working assumption of "BROWSER VERIFICATION REQUIRED" with the confirmed browser evidence supplied on 2026-08-14.

## Confirmed Browser Evidence

- Site: `https://www.sipanelco.ir/`
- GTM container: `GTM-K5HK55FN`
- GA4 Measurement ID: `G-8QFRB20LMW`
- Fresh document load: exactly one GA4 `page_view` hit to `G-8QFRB20LMW`.
- SPA navigation: URL changes correctly and GTM receives `gtm.historyChange-v2`.
- Observed SPA destination: `https://www.sipanelco.ir/contact`.
- Observed SPA previous page: `https://www.sipanelco.ir/resources`.
- GTM variables on History Change: `Page Hostname=www.sipanelco.ir`, `Page Path=/contact`, `Page URL=https://www.sipanelco.ir/contact`, `Referrer=https://www.sipanelco.ir/resources`.
- Tags Fired on the History Change message: none.
- SPA result: no new GA4 `page_view` hit.

## Repository Evidence

- Single GTM loader: `app/[locale]/layout.tsx` imports `GoogleTagManager` and renders it once with `NEXT_PUBLIC_GTM_ID`.
- Active source contains no `GoogleAnalytics` component, no raw `gtag(` call, and no raw `googletagmanager` loader.
- Active source contains no explicit application-dispatched `page_view`; page-view strings are comment-only markers such as `/* track: contact_page_view */`.
- Custom analytics events use `lib/analytics/events.ts`, which sends approved non-page-view events through `sendGTMEvent(...)`.
- `i18n/routing.ts` exports `Link`, `usePathname`, and `useRouter` from `next-intl/navigation`, so normal internal links are Next.js client-side navigation.
- Locale switchers in `components/layout/header.tsx` and `components/localization/language-switcher.tsx` use normal `<a href=...>` anchors, causing hard reloads.

## Root Cause

The strongest supported root cause is:

The production Google Tag sends the initial document-load `page_view`, but SIPANEL has no second page-view producer for client-side route changes. GTM receives `gtm.historyChange-v2` and its built-in URL/referrer variables update correctly, but no GA4 page-view tag fires on that History Change message. The defect is therefore not stale URL variables or missing GTM installation; it is missing SPA page-view production.

Remote GTM trigger details cannot be proven from repository files because the container configuration is not stored here. Browser evidence proves the effective production behavior:

- Fresh load: Google Tag / All Pages fires once.
- History Change: no tags fire.

## Enhanced Measurement Analysis

The evidence does not demonstrate functioning GA4 Enhanced Measurement history-based page views. GTM History Change messages are present, but that only proves GTM detects browser history changes. It does not prove GA4's "Page changes based on browser history events" feature is enabled or effective.

Because SPA navigation produces no GA4 `page_view`, GA4 history-based page-view tracking is absent, disabled, overridden, blocked, or otherwise not functioning for this property/container combination.

## Tag Coverage Diagnostic

Google Tag Coverage reported these URLs as "Not tagged":

- `/resources/aluminium-cladding-layout-checklist`
- `/resources/mto-procurement-planning-sheet`

Direct Tag Assistant tests for both URLs detected `GTM-K5HK55FN` from the on-page `gtm.js` snippet and showed `GA4 - Google Tag - All Pages` firing exactly once.

Classification: Tag Coverage diagnostic stale / false positive / detection lag. No missing-tag remediation is justified for these URLs unless a separate actual missing-tag route is proven.

## Remediation Direction

Preferred architecture: GTM-owned History Change page-view tag.

Keep the existing base Google Tag / All Pages producer for fresh document loads. Add a separate GTM History Change trigger that fires a GA4 Event tag named `page_view` only on `gtm.historyChange-v2`, using GTM's updated built-in URL/referrer variables for `page_location` and `page_referrer`.

This avoids introducing a second initial-load producer in application code and uses the already confirmed GTM History Change signal.
