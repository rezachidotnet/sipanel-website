# SIPANEL GTM Phase 2.1 — Ownership Reconciliation

## 1. Summary

This pass completed the remaining Phase 2.1 documentation and verification work. The repository still uses the Phase 1 transport model, the GTM-ready surfaces remain selector-gated, and no target is currently marked `data-analytics-owner="gtm"`.

The reconciliation also confirms that the Case Study CTA semantic fix is in place: `rfq_start` was removed from Case Study CTA clicks and replaced by `case_study_cta_click`.

## 2. Contradictions Found

- `rfq_start` had been used for CTA clicks in case-study and service surfaces, which was semantically incorrect.
- `rfq_abandon` had no active call site and was removed from the application allowlist.
- `hero_secondary_cta_click`, `sticky_call_click`, `sticky_whatsapp_click`, `header_cta_click`, and `map_click` remain unresolved/manual because they are aliases, lack a verified element, or would duplicate an existing event.
- `case_study_expand` remains documentation-only because there is no real expansion interaction in the current component.
- `resource_filter_use` and `project_filter_use` remain manual because the repository does not provide a reliable GTM-ready element/state boundary for them.
- The GA4 Measurement ID discrepancy remains unresolved in repository evidence: `G-33FL4K0R3S` versus `G-8QFRB20LMW`.

## 3. RFQ Funnel Correction

Case Study CTA clicks no longer represent `rfq_start`.

Source evidence:

- `components/case-studies/case-study-page-template.tsx:305-314` now uses `case_study_cta_click` on the hero CTA.
- `components/case-studies/case-study-page-template.tsx:630-638` uses `case_study_cta_click` on the conversion CTA.
- `components/services/service-page-template.tsx:227-236` also uses `case_study_cta_click` for the service hero secondary CTA.
- `components/contact/rfq-contact-page.tsx:269-276`, `components/contact/rfq-contact-page.tsx:284-343`, and `components/home/rfq-section.tsx:110-150` keep `rfq_start`, `rfq_step_complete`, `rfq_submit`, and `rfq_error` tied to actual form state and submission flow.

`rfq_abandon` was removed because `lib/analytics/events.ts` had no active call site for it after the allowlist cleanup.

## 4. Canonical Event Decisions

- `case_study_cta_click` is the canonical CTA event for case-study RFQ CTAs and the service hero secondary CTA.
- `catalog_cta_click` remains the canonical catalog CTA event across the homepage, header, and projects page.
- `phone_click`, `whatsapp_click`, and `email_click` remain the canonical public-contact link events.
- `related_case_study_click`, `related_resource_click`, and `related_service_click` remain the canonical related-content link events.
- `service_page_click` remains the canonical service conversion secondary CTA event.
- `rfq_start` remains reserved for the first reliable form interaction, not a CTA click.

## 5. Allowlist Reconciliation

`lib/analytics/events.ts` now contains 29 active application-dispatched event names and no dead alias for `rfq_abandon`.

The allowlist is aligned with current runtime dispatches, and GTM-only scroll events remain outside the application helper allowlist.

## 6. Element-Level Ownership

- GTM-ready targets: 39
- Application-owned targets: 25
- Unassigned targets: 14
- Manual-decision events: 13

No target currently has owner `gtm`.

## 7. Cutover Gate

Every GTM-ready surface uses a gate of either `data-analytics-owner="application"` or `data-analytics-owner="unassigned"` in source.

Future GTM selectors must require `data-analytics-owner="gtm"` in addition to the event selector. That gate is intentionally absent from the current source tree so GTM cannot accidentally match application-owned targets before a cutover code change.

## 8. Revised GTM Specification

`reports/gtm-phase-2-gtm-spec.json` now has the required split structure:

- `ready_for_gtm_preview`
- `manual_decisions`
- `scroll_depth_events`
- `not_eligible_for_gtm_dom_tracking`

Every item inside `ready_for_gtm_preview` includes a future selector that requires `data-analytics-owner="gtm"` and includes target-level fields for component, location, source file, current owner, future owner, application dispatch status, PII risk, cutover steps, and validation steps.

## 9. Marker Inventory Completion

The Phase 2 ownership report now states the marker inventory precisely: 49 grouped marker entries covering 111 `track:` occurrences. The two dual-marker header lines are explicitly called out so the grouped count and occurrence count both reconcile.

## 10. Files Changed

- `reports/gtm-phase-2-1-reconciliation.md`
- `reports/gtm-phase-2-event-ownership.md`

The existing source changes from the earlier Phase 2/2.1 work were preserved. No unrelated files were edited in this pass.

## 11. Checks Executed

- `git status --short`
- `git diff --stat`
- `git diff --name-only`
- `test -f reports/gtm-phase-2-1-reconciliation.md && echo "exists" || echo "missing"` before creation
- `grep -RIn 'data-analytics-owner="gtm"' app components || true`
- `grep -RIn -E 'data-analytics-owner="(application|unassigned|gtm)"' app components`
- JSON selector-gate validation over `reports/gtm-phase-2-gtm-spec.json`
- `npm run typecheck`
- `npm run lint`
- `git diff --check`

Results:

- No active `data-analytics-owner="gtm"` matches.
- The GTM spec passed structural and selector-gate validation.
- Typecheck passed.
- Lint passed with one pre-existing warning in `components/home/engineering-proof-snapshot.tsx:194`.
- `git diff --check` passed.

## 12. Remaining Manual Decisions

- `hero_secondary_cta_click`
- `sticky_call_click`
- `sticky_whatsapp_click`
- `header_cta_click`
- `map_click`
- `resource_filter_use`
- `project_filter_use`
- `case_study_expand`
- `faq_search`
- `language_switcher_open`
- `consultation_cta_click`
- `resource_card_click`
- `resource_detail_view`

## 13. Safe Cutover Procedure

1. Configure GTM triggers that require `data-analytics-owner="gtm"`.
2. Test trigger matching in GTM Preview.
3. Publish GTM while repository targets remain `application` or `unassigned`.
4. In one application code change:
   - remove the matching application dispatch where present;
   - change the target owner to `gtm`.
5. Deploy the application change.
6. Test production immediately.
7. Confirm one event per interaction.
8. Roll back the application ownership change if GTM fails.

## 14. Definition of Done

- `reports/gtm-phase-2-1-reconciliation.md` exists.
- The report contains all 14 required sections.
- Case Study CTA clicks no longer represent `rfq_start`.
- `rfq_start` remains tied to actual form interaction.
- `rfq_abandon` removal is supported by zero active call sites.
- No active target has owner `gtm`.
- Every GTM-ready future selector requires owner `gtm`.
- Incomplete or unresolved targets are under `manual_decisions`.
- The safe cutover procedure has no duplicate-tracking window.
- The full 111-marker evidence is present in the Phase 2 ownership report.
- The revised GTM JSON passes structural and ownership-gate validation.
- Typecheck passed.
- Lint passed with one pre-existing warning only.
- `git diff --check` passed.
- No unrelated change was made.
- No GTM, Vercel, commit, push, or deployment action occurred.
