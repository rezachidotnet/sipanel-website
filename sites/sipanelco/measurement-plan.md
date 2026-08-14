# SIPANEL Measurement Plan

## Page View Architecture

Target state:

- Fresh load: one and only one GA4 `page_view`.
- SPA navigation: one and only one destination GA4 `page_view`.
- Back: one and only one destination GA4 `page_view`.
- Forward: one and only one destination GA4 `page_view`.
- Locale hard reload: one and only one destination GA4 `page_view`.

## Selected Remediation Architecture

Use GTM as the page-view owner:

- Keep the existing base Google Tag / All Pages behavior for document-load page views.
- Add a GTM History Change trigger for `gtm.historyChange-v2`.
- Fire a GA4 Event tag named `page_view` from that trigger.
- Use GTM variables that are updated on the History Change message for `page_location` and `page_referrer`.
- Do not add application code for page views unless GTM Preview proves the referrer/location values are unreliable.

## Duplicate Prevention

- The base Google Tag remains the only fresh-load page-view producer.
- The new History Change tag must not fire on container initialization, DOM Ready, Window Loaded, Consent Initialization, Initialization, or All Pages.
- The new History Change tag must fire only on history-change messages.

## Referrer and Location Strategy

- `page_location`: use the destination URL from GTM's updated Page URL variable on the History Change message. Do not use a stale tag-level override.
- `page_referrer`: use the previous-page value exposed by GTM on the History Change message. Do not rely on `document.referrer` alone for SPA navigation.
- Strip or avoid query strings unless a specific non-PII query policy is approved.

## Conversion Protection

- Do not alter `rfq_submit`, `catalog_form_submitted`, `resource_download_complete`, or any `generate_lead` mapping.
- Do not convert successful form submissions to click-based triggers.
- Do not send name, phone, email, company, WhatsApp, message, uploaded filename, or uncontrolled URL query strings to GA4.
