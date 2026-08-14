# SIPANEL Implementation Backlog

## Ready For GTM Preview

### SIPANEL-MEAS-004 - Add SPA page_view producer

Layer: GTM.

Brief: `prompts/generated/sipanelco-spa-pageview-fix.md`.

Scope:

- Add a History Change trigger for SPA route changes.
- Add a GA4 Event tag named `page_view` for `G-8QFRB20LMW`.
- Preserve the existing base Google Tag / All Pages fresh-load page view.
- Validate in GTM Preview before publishing.

Forbidden:

- Website code changes.
- Consent Mode changes.
- GA4 Admin changes unless explicitly approved.
- Contact-event or `generate_lead` changes.
- Deployment before Preview validation.

Publish gate:

Only publish after fresh-load, normal SPA, Back, Forward, locale hard reload, location/referrer, PII, contact-event, and `generate_lead` regression tests pass.
