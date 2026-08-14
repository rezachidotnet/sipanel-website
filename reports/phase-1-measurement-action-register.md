# SIPANEL Phase 1 Measurement Action Register

| ID | Status | Area | Finding | Required action | Owner layer |
|---|---|---|---|---|---|
| SIPANEL-MEAS-004 | Open | SPA page views | Fresh load sends exactly one GA4 `page_view`, but SPA navigation sends zero despite `gtm.historyChange-v2` and correct GTM variables. | Execute the approved SPA page-view remediation brief in GTM Preview only. Publish only after fresh-load, SPA, Back, Forward, and locale tests pass. | GTM |

## Notes

- Do not edit website code for this issue unless GTM Preview proves History Change cannot provide reliable `page_location` and `page_referrer`.
- Do not change Consent Mode, GA4 Admin, contact events, RFQ events, Odoo, deployment, or environment variables for this issue.
- Tag Coverage warnings for `/resources/aluminium-cladding-layout-checklist` and `/resources/mto-procurement-planning-sheet` are classified as stale / false positive / detection lag because direct Tag Assistant tests detected GTM and one All Pages Google Tag fire on both URLs.
