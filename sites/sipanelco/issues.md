# SIPANEL Measurement Issues

## SIPANEL-MEAS-004 - SPA route changes do not generate GA4 page_view

Status: Open.

Severity: High.

Evidence:

- Fresh load of `https://www.sipanelco.ir/` sends exactly one GA4 `page_view` to `G-8QFRB20LMW`.
- Normal client-side navigation updates the URL.
- GTM receives `gtm.historyChange-v2`.
- GTM built-in variables update correctly.
- Tags Fired on the History Change message: none.
- No new GA4 `page_view` hit is generated.

Root cause:

The current production setup has a document-load page-view producer, but no active SPA page-view producer. GTM detects the route change, but no page-view tag is triggered by that event.

Recommended remediation:

GTM History Change `page_view` tag, validated in Preview before publishing.

Blocked until:

- Fresh load, SPA, Back, Forward, and locale hard reload tests pass with exactly one `page_view` per destination.
- `page_location` and `page_referrer` are correct and not stale.
- Contact-event and `generate_lead` regressions are ruled out.
