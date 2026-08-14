# SIPANEL Phase 1 Exit Criteria

## Criterion 4 - SPA Page View Measurement

Status: VERIFIED DEFECT / REMEDIATION REQUIRED.

Fresh document-load validation passes: `https://www.sipanelco.ir/` sends exactly one GA4 `page_view` to `G-8QFRB20LMW`.

SPA validation fails: client-side navigation updates the URL and produces `gtm.historyChange-v2`, but no GA4 `page_view` follows. On the observed History Change message, GTM built-in variables were correct and Tags Fired was `None`.

Root cause: the current production measurement setup has one effective page-view producer for document loads and no active producer for SPA route changes.

Exit criterion remains blocked until GTM Preview proves:

- Fresh load produces exactly one `page_view`.
- Normal SPA navigation produces exactly one destination `page_view`.
- Browser Back produces exactly one destination `page_view`.
- Browser Forward produces exactly one destination `page_view`.
- Locale hard reload produces exactly one destination `page_view`.
- `page_location`, `page_referrer`, hostname, and Measurement ID are correct.
- Contact events and `generate_lead` are not regressed.
- No PII or uncontrolled query string is sent in page-view parameters.
