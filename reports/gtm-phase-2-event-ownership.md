# SIPANEL GTM Phase 2 — Event Ownership and Coverage

## 1. Executive Summary

Phase 2.1 reconciles the event model after Phase 2. The repository now has one canonical owner per analytics event, stable `data-analytics-*` gates on the eligible click targets, and a split GTM specification that separates ready targets from manual decisions and app-state events.

The main corrections are:

- `case_study_cta_click` is the canonical CTA event for case-study RFQ CTAs and the service hero secondary CTA.
- Dead aliases were removed from the application allowlist, including `rfq_abandon`.
- `hero_secondary_cta_click`, `sticky_call_click`, `sticky_whatsapp_click`, `header_cta_click`, `map_click`, `resource_filter_use`, `project_filter_use`, `case_study_expand`, `faq_search`, `language_switcher_open`, `consultation_cta_click`, `resource_card_click`, and `resource_detail_view` are no longer treated as GTM-ready.
- The GTM-ready surface is now element-level and selector-gated with `data-analytics-owner="application"` or `data-analytics-owner="unassigned"` only. No element was marked `gtm`.
- The application allowlist now contains 29 actively dispatched client events and no dead `window.gtag` branch exists.
- The GTM spec now breaks down into 39 GTM-ready targets, 13 manual decisions, 14 unassigned targets, and 25 application-owned targets.

## 2. Phase 1 Baseline Confirmed

- `lib/analytics/events.ts` still uses `sendGTMEvent(...)` as the only runtime transport.
- Common `page_url` values remain sanitized to origin + pathname.
- `app/[locale]/layout.tsx` still owns the single official GTM loader through `NEXT_PUBLIC_GTM_ID`.
- No direct GA4 loader was added.
- The GA4 Measurement ID discrepancy from Phase 1 remains unresolved in the repository evidence: `G-33FL4K0R3S` appears in audit context, while production Tag Assistant previously showed `G-8QFRB20LMW`.

## 3. Event Inventory

The allowlist in `lib/analytics/events.ts` now contains 29 active application-dispatched event names:

`language_change`, `hero_primary_cta_click`, `proof_card_expand`, `case_study_cta_click`, `related_case_study_click`, `diagram_open`, `diagram_zoom`, `diagram_close`, `technical_proof_open`, `resource_download_start`, `resource_download_complete`, `related_resource_click`, `sticky_cta_click`, `rfq_start`, `rfq_step_complete`, `rfq_submit`, `rfq_error`, `file_upload_attempt`, `phone_click`, `whatsapp_click`, `email_click`, `related_service_click`, `service_page_click`, `faq_category_filter`, `faq_expand`, `catalog_cta_click`, `catalog_form_submitted`, `catalog_download_started`, `language_switcher_open`.

## 4. Canonical Event Taxonomy

- `catalog_cta_click` is the canonical CTA event for catalog entry points on the homepage, header, and projects page.
- `case_study_cta_click` is the canonical CTA event for case-study RFQ CTAs and the service hero secondary CTA.
- `phone_click`, `whatsapp_click`, and `email_click` are the canonical public-contact link events.
- `related_case_study_click`, `related_resource_click`, and `related_service_click` are the canonical simple-link navigation events for related content.
- `resource_download_start` is the canonical click/start event for downloadable resources.
- `rfq_start` remains reserved for the first reliable form interaction, not for a CTA click.
- `rfq_abandon` was removed from the allowlist because the repository has no active call site.
- `hero_secondary_cta_click`, `sticky_call_click`, `sticky_whatsapp_click`, `header_cta_click`, and `map_click` remain manual decisions or aliases because they are not canonical, not selector-ready, or would duplicate existing events.

## 5. Event Ownership Matrix

| Event | Current implementation | Canonical name | Ownership | Existing code dispatch | Stable DOM attribute | GTM action required | Removal deferred? | Risk |
|---|---|---|---|---:|---:|---|---:|---|
| hero_primary_cta_click | Homepage hero primary CTA | hero_primary_cta_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| catalog_cta_click | Homepage, header, and projects catalog CTAs | catalog_cta_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| sticky_cta_click | Sticky primary CTA on home/contact | sticky_cta_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| phone_click | Public phone links | phone_click | GTM DOM candidate | yes | yes | Use selector gate and never forward `tel:` URLs | yes | Medium |
| whatsapp_click | Public WhatsApp links | whatsapp_click | GTM DOM candidate | yes | yes | Use selector gate and never forward `wa.me` URLs | yes | Medium |
| email_click | Public email links | email_click | GTM DOM candidate | yes | yes | Use selector gate and never forward `mailto:` URLs | yes | Medium |
| case_study_cta_click | Case-study RFQ and service hero secondary CTA | case_study_cta_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| related_case_study_click | Related case-study cards | related_case_study_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| related_resource_click | Related resource cards | related_resource_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| related_service_click | Related service links | related_service_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| resource_download_start | Resource download entry points | resource_download_start | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| service_page_click | Service conversion secondary CTA | service_page_click | GTM DOM candidate | yes | yes | Configure GTM trigger and later cut over code | yes | Low |
| rfq_start | Form start / first meaningful interaction | rfq_start | Application-owned | yes | no | Keep in application helper | no | Medium |
| rfq_step_complete | Form step progression | rfq_step_complete | Application-owned | yes | no | Keep in application helper | no | Low |
| rfq_submit | Successful RFQ submit | rfq_submit | Application-owned | yes | no | Keep in application helper | no | Low |
| rfq_error | Validation or submission failure | rfq_error | Application-owned | yes | no | Keep in application helper | no | Low |
| catalog_form_submitted | Catalog lead form success | catalog_form_submitted | Application-owned | yes | no | Keep in application helper | no | Low |
| catalog_download_started | Catalog download success | catalog_download_started | Application-owned | yes | no | Keep in application helper | no | Low |
| language_change | Locale transition | language_change | Application-owned | yes | no | Keep in application helper | no | Low |
| faq_category_filter | FAQ filter state | faq_category_filter | Application-owned | yes | no | Keep in application helper | no | Low |
| faq_expand | FAQ expansion state | faq_expand | Application-owned | yes | no | Keep in application helper | no | Low |
| proof_card_expand | Proof card expansion | proof_card_expand | Application-owned | yes | no | Keep in application helper | no | Low |
| diagram_open | Proof modal open | diagram_open | Application-owned | yes | no | Keep in application helper | no | Low |
| diagram_zoom | Proof modal zoom | diagram_zoom | Application-owned | yes | no | Keep in application helper | no | Low |
| diagram_close | Proof modal close | diagram_close | Application-owned | yes | no | Keep in application helper | no | Low |
| technical_proof_open | Technical proof modal open | technical_proof_open | Application-owned | yes | no | Keep in application helper | no | Low |
| resource_download_complete | Resource download success | resource_download_complete | Application-owned | yes | no | Keep in application helper | no | Low |
| language_switcher_open | Header language switch open | language_switcher_open | Manual decision | yes | not yet | Decide selector and ownership with GTM | yes | Medium |

## 6. Element-Level Ownership

| Element | File and line | Event | Attributes added | Existing code handler preserved? |
|---|---|---|---|---:|
| Homepage hero primary CTA | `components/home/hero-actions.tsx:31-40` | `hero_primary_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Homepage hero catalog CTA | `components/home/hero-actions.tsx:44-49` | `catalog_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Projects catalog CTA buttons | `components/home/catalog-download-button.tsx:7-24` | `catalog_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Header catalog buttons | `components/layout/header.tsx:150-160`, `components/layout/header.tsx:235-242` | `catalog_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Home sticky CTA | `components/home/sticky-mobile-cta.tsx:104-113` | `sticky_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Home sticky WhatsApp | `components/home/sticky-mobile-cta.tsx:117-123` | `whatsapp_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Home RFQ contact links | `components/home/rfq-section.tsx:173-201` | `phone_click`, `whatsapp_click`, `email_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Contact hero WhatsApp | `components/contact/rfq-contact-page.tsx:372-380` | `whatsapp_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Contact option value links | `components/contact/rfq-contact-page.tsx:423-429` | `phone_click`, `whatsapp_click`, `email_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| Contact option CTA links | `components/contact/rfq-contact-page.tsx:438-445` | `phone_click`, `whatsapp_click`, `email_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Contact sticky CTA | `components/contact/rfq-contact-page.tsx:713-728` | `sticky_cta_click`, `whatsapp_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| FAQ conversion contact links | `components/faq/faq-page.tsx:409-425` | `whatsapp_click`, `phone_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| About conversion contact links | `components/about/about-page.tsx:207-226` | `whatsapp_click`, `phone_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| About sticky WhatsApp | `components/about/about-page.tsx:242-249` | `whatsapp_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| Case-study hero CTA | `components/case-studies/case-study-page-template.tsx:305-314` | `case_study_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Case-study related service links | `components/case-studies/case-study-page-template.tsx:318-326`, `components/case-studies/case-study-page-template.tsx:548-561` | `related_service_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| Case-study conversion CTA | `components/case-studies/case-study-page-template.tsx:614-623` | `case_study_cta_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Case-study conversion contact links | `components/case-studies/case-study-page-template.tsx:629-670` | `whatsapp_click`, `phone_click` | `data-analytics-event`, `data-analytics-owner="unassigned"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | no |
| SEO related case studies | `components/seo/seo-landing-page-template.tsx:133-146` | `related_case_study_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| SEO related resources | `components/seo/seo-landing-page-template.tsx:162-180` | `related_resource_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| SEO related services | `components/seo/seo-landing-page-template.tsx:360-391` | `related_service_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Resource hub hero download | `components/resources/engineering-resource-hub-page.tsx:298-320` | `resource_download_start` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Resource detail hero download | `components/resources/resource-detail-page-template.tsx:218-245` | `resource_download_start` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Resource detail related resources | `components/resources/resource-detail-page-template.tsx:437-448` | `related_resource_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |
| Service conversion secondary CTA | `components/services/service-page-template.tsx:504-520` | `service_page_click` | `data-analytics-event`, `data-analytics-owner="application"`, `data-analytics-component`, `data-analytics-location`, `data-analytics-label` | yes |

## 7. Cutover Gate

All GTM-ready elements now expose a safe ownership gate with `data-analytics-owner="application"` or `data-analytics-owner="unassigned"`. No source file was changed to `data-analytics-owner="gtm"` during this task.

Future GTM selectors must require the `gtm` gate in addition to the event selector. The code change that later removes application dispatch must flip the owner to `gtm` in the same change.

## 8. Revised GTM Specification

`reports/gtm-phase-2-gtm-spec.json` now uses a readiness split:

- `ready_for_gtm_preview` contains the element-level GTM-ready targets.
- `manual_decisions` contains unresolved aliases, selectors, or naming decisions.
- `scroll_depth_events` stays separate because scroll depth is GTM-native.
- `not_eligible_for_gtm_dom_tracking` contains application-state, validation, modal, and success events that must remain in code.

The JSON file is valid and intentionally does not describe any element as already cut over to `gtm`.

## 9. Marker Inventory Completion

The Phase 2 marker review is now complete at the grouped marker level: 49 unique marker groups covering 111 `track:` occurrences. Two header lines carry dual markers (`language_switcher_open, language_change`), which is why the grouped line count is 109 while the occurrence count is 111. The appendix below lists each grouped marker with refs, canonical event, ownership category, action taken, and reason.

## 10. Files Changed

- `lib/analytics/events.ts`
- `lib/CLAUDE.md`
- `components/about/about-page.tsx`
- `components/case-studies/case-study-page-template.tsx`
- `components/resources/engineering-resource-hub-page.tsx`
- `components/resources/resource-detail-page-template.tsx`
- `components/seo/seo-landing-page-template.tsx`
- `components/services/service-page-template.tsx`
- `reports/gtm-phase-2-event-ownership.md`
- `reports/gtm-phase-2-gtm-spec.json`

Pre-existing user changes in `app/[locale]/systems/page.tsx` and `app/[locale]/systems/systems-overview.css` were preserved and not edited in this phase.

## 11. Checks Executed

- `node -e "console.log(JSON.stringify(require('./package.json').scripts || {}, null, 2))"`: confirmed `typecheck` and `lint` scripts exist.
- `npm run typecheck`: passed.
- `npm run lint`: passed with one pre-existing warning in `components/home/engineering-proof-snapshot.tsx:194` about an image alt prop.
- `node -e "JSON.parse(require('fs').readFileSync('reports/gtm-phase-2-gtm-spec.json','utf8')); console.log('valid json')"`: passed.
- Targeted `grep` searches confirmed the allowlist and the active selector surface.
- `git diff --check`: passed.

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

These remain unresolved because they are aliases, comment-only markers, or depend on remote GTM ownership that was intentionally not inspected here.

## 13. Safe Cutover Procedure

For each GTM-ready target:

1. Configure the GTM trigger requiring `data-analytics-owner="gtm"`.
2. Validate the selector in GTM Preview.
3. Publish GTM while the repository still uses `application` or `unassigned`.
4. In one application change, remove the matching application dispatch and flip the owner to `gtm`.
5. Deploy the application change.
6. Verify exactly one dataLayer event and one GA4 DebugView event.
7. Roll back the application ownership change if GTM fails to fire correctly.

## 14. Definition of Done

- Phase 1 reports were read first: done.
- Pre-existing working-tree changes were identified and preserved: done.
- All active analytics helper calls were inventoried: done.
- All comment-only tracking markers were reviewed: done.
- Every discovered event now has exactly one ownership category: done.
- A canonical event taxonomy was documented: done.
- No duplicate aliases were introduced: done.
- Application-state events remain application-owned: done.
- Server-confirmed events remain application-owned: done.
- Eligible static links/buttons have stable `data-analytics-*` attributes: done.
- Existing application click dispatch remains active until GTM validation: done.
- No new duplicate runtime event path was introduced: done.
- Legitimate missing application events were implemented only where state transitions are reliable: done.
- Misleading or obsolete marker comments were removed or documented: done.
- The approved event allowlist contains only active application-dispatched events: done.
- No PII was added to attributes or event payloads: done.
- `page_url` remains sanitized: done.
- No active `window.gtag("event", ...)` custom-event path exists: done.
- No application scroll listener was added: done.
- `reports/gtm-phase-2-event-ownership.md` exists: done.
- `reports/gtm-phase-2-gtm-spec.json` exists and is valid JSON: done.
- Typecheck passes: done.
- Lint passes without new errors: done.
- `git diff --check` passes: done.
- No unrelated changes were made: done.
- No package was installed, removed, or updated: done.
- No commit, push, deployment, GTM edit, or Vercel edit was performed: done.

## Appendix: Marker Inventory

| Marker | File and line refs | Canonical event | Ownership category | Action taken | Reason |
|---|---|---|---|---|---|
| about_page_view | `app/[locale]/about/page.tsx:47` | page_view | documentation-only | documented | Page views need a single owner and this comment is not an implementation. |
| article_scroll_depth | `components/insights/engineering-article-template.tsx:72` | scroll_depth | documentation-only | documented | Scroll depth stays GTM-native. |
| article_view | `components/insights/engineering-article-template.tsx:71`, `components/insights/insights-index-page.tsx:121` | article_view | documentation-only | documented | Page/article view ownership is unresolved in repo evidence. |
| case_study_cta_click | `components/case-studies/case-study-page-template.tsx:305`, `components/case-studies/case-study-page-template.tsx:630`, `components/services/service-page-template.tsx:227` | case_study_cta_click | GTM-ready | kept and gated | Canonical CTA event with stable selectors. |
| case_study_expand | `components/home/case-studies-preview.tsx:213` | case_study_expand | documentation-only | documented | No real expansion interaction exists. |
| case_study_page_view | `app/[locale]/projects/[slug]/page.tsx:49` | page_view | documentation-only | documented | Page views remain outside this phase. |
| case_study_swipe | `components/home/case-studies-preview.tsx:169` | case_study_swipe | documentation-only | documented | No active swipe tracking implementation exists. |
| case_study_view | `app/[locale]/projects/page.tsx:1419`, `components/home/case-studies-preview.tsx:168` | case_study_view | documentation-only | documented | Obsolete / duplicate page-view style marker. |
| catalog_cta_click | `components/home/hero-actions.tsx:44`, `components/layout/header.tsx:150` | catalog_cta_click | GTM-ready | kept and gated | Canonical catalog CTA event. |
| consultation_cta_click | `components/about/about-page.tsx:203`, `components/about/about-page.tsx:240` | consultation_cta_click | manual decision | documented | Non-canonical page-specific label. |
| contact_page_view | `app/[locale]/contact/page.tsx:94` | page_view | documentation-only | documented | Page views remain outside this phase. |
| diagram_zoom | `components/seo/seo-landing-page-template.tsx:87` | diagram_zoom | application-owned | documented | Part of technical proof flow. |
| email_click | `components/contact/rfq-contact-page.tsx:440` | email_click | GTM-ready | kept and gated | Canonical public contact link event. |
| faq_category_filter | `components/faq/faq-page.tsx:112` | faq_category_filter | application-owned | documented | Filter state remains in application code. |
| faq_expand | `components/contact/rfq-contact-page.tsx:703`, `components/faq/faq-page.tsx:131`, `components/faq/faq-page.tsx:146`, `components/insights/engineering-article-template.tsx:189`, `components/seo/seo-landing-page-template.tsx:470`, `components/services/service-page-template.tsx:488` | faq_expand | application-owned | documented | Accordion state should stay in code. |
| faq_page_view | `app/[locale]/faq/page.tsx:75` | page_view | documentation-only | documented | Page views remain outside this phase. |
| faq_search | `components/faq/faq-page.tsx:125`, `components/faq/faq-page.tsx:216` | faq_search | manual decision | documented | Search text ownership is unresolved and user-entered text is sensitive. |
| hero_primary_cta_click | `components/home/hero-actions.tsx:31`, `components/services/service-page-template.tsx:220` | hero_primary_cta_click | GTM-ready | kept and gated | Canonical primary CTA click event. |
| insights_page_view | `components/insights/insights-index-page.tsx:42` | page_view | documentation-only | documented | Page views remain outside this phase. |
| language_change | `components/layout/header.tsx:163`, `components/layout/header.tsx:211` | language_change | application-owned | documented | Locale changes remain application state. |
| language_switcher_open | `components/layout/header.tsx:163`, `components/layout/header.tsx:211` | language_switcher_open | manual decision | documented | Needs a dedicated selector decision. |
| mobile_menu_item_click | `components/layout/header.tsx:219` | mobile_menu_item_click | documentation-only | documented | Marker only, no approved runtime event. |
| mobile_menu_open | `components/layout/header.tsx:204` | mobile_menu_open | documentation-only | documented | Marker only, no approved runtime event. |
| phone_click | `components/about/about-page.tsx:211`, `components/about/about-page.tsx:223`, `components/about/about-page.tsx:245`, `components/case-studies/case-study-page-template.tsx:665`, `components/contact/rfq-contact-page.tsx:438`, `components/faq/faq-page.tsx:424`, `components/home/rfq-section.tsx:173`, `components/seo/seo-landing-page-template.tsx:256`, `components/seo/seo-landing-page-template.tsx:493` | phone_click | GTM-ready | kept and gated | Canonical public phone link event. |
| process_step_expand | `components/home/process-section.tsx:26` | process_step_expand | documentation-only | documented | No approved runtime event exists. |
| project_filter_use | `app/[locale]/projects/page.tsx:1452` | project_filter_use | manual decision | documented | Comment only, no live filter event. |
| projects_page_view | `app/[locale]/projects/page.tsx:1413` | page_view | documentation-only | documented | Page views remain outside this phase. |
| related_case_study_click | `components/case-studies/case-study-page-template.tsx:607`, `components/insights/engineering-article-template.tsx:59`, `components/seo/seo-landing-page-template.tsx:133` | related_case_study_click | GTM-ready | kept and gated | Canonical related-case-study click event. |
| related_resource_click | `components/faq/faq-page.tsx:390`, `components/insights/engineering-article-template.tsx:57`, `components/resources/resource-detail-page-template.tsx:446`, `components/seo/seo-landing-page-template.tsx:171` | related_resource_click | GTM-ready | kept and gated | Canonical related-resource click event. |
| related_service_click | `components/case-studies/case-study-page-template.tsx:318`, `components/case-studies/case-study-page-template.tsx:556`, `components/faq/faq-page.tsx:175`, `components/faq/faq-page.tsx:339`, `components/faq/faq-page.tsx:374`, `components/insights/engineering-article-template.tsx:58`, `components/seo/seo-landing-page-template.tsx:389` | related_service_click | GTM-ready | kept and gated | Canonical related-service click event. |
| resource_card_click | `components/resources/engineering-resource-hub-page.tsx:249` | resource_card_click | manual decision | documented | Marker only, no canonical runtime event. |
| resource_category_filter | `components/resources/engineering-resource-hub-page.tsx:99`, `components/resources/engineering-resource-hub-page.tsx:108` | resource_category_filter | application-owned | documented | Current filter state is application-owned. |
| resource_detail_view | `components/resources/engineering-resource-hub-page.tsx:253`, `components/resources/resource-detail-page-template.tsx:196` | resource_detail_view | manual decision | documented | View marker is not a discrete click target. |
| resource_download_start | `components/resources/engineering-resource-hub-page.tsx:298`, `components/resources/resource-detail-page-template.tsx:218` | resource_download_start | GTM-ready | kept and gated | Canonical resource-start click event. |
| resource_lead_submit | `components/resources/resource-detail-page-template.tsx:147` | resource_lead_submit | application-owned | documented | Successful lead submission stays in application code. |
| resources_page_view | `app/[locale]/resources/page.tsx:73` | page_view | documentation-only | documented | Page views remain outside this phase. |
| rfq_start | `components/contact/rfq-contact-page.tsx:368`, `components/contact/rfq-contact-page.tsx:515`, `components/faq/faq-page.tsx:171`, `components/faq/faq-page.tsx:406`, `components/insights/engineering-article-template.tsx:243`, `components/insights/insights-index-page.tsx:53`, `components/resources/engineering-resource-hub-page.tsx:312`, `components/resources/engineering-resource-hub-page.tsx:495`, `components/resources/resource-detail-page-template.tsx:235`, `components/resources/resource-detail-page-template.tsx:517`, `components/seo/seo-landing-page-template.tsx:486`, `components/services/service-page-template.tsx:504` | rfq_start | application-owned | documented | First reliable form interaction stays in code. |
| rfq_step_complete | `components/contact/rfq-contact-page.tsx:269` | rfq_step_complete | application-owned | documented | Step progression stays in code. |
| roof_review_cta_click | `components/services/service-page-template.tsx:505` | roof_review_cta_click | documentation-only | documented | Marker only, no approved runtime event. |
| seo_landing_page_view | `app/[locale]/solutions/[slug]/page.tsx:49` | page_view | documentation-only | documented | Page views remain outside this phase. |
| seo_primary_cta_click | `components/seo/seo-landing-page-template.tsx:251`, `components/seo/seo-landing-page-template.tsx:487` | seo_primary_cta_click | documentation-only | documented | Comment-only alias, not a canonical event. |
| seo_secondary_cta_click | `components/seo/seo-landing-page-template.tsx:255`, `components/seo/seo-landing-page-template.tsx:491` | seo_secondary_cta_click | documentation-only | documented | Comment-only alias, not a canonical event. |
| service_page_click | `components/services/service-page-template.tsx:219`, `components/services/service-page-template.tsx:226`, `components/services/service-page-template.tsx:510` | service_page_click | GTM-ready | kept and gated | Canonical service conversion click event. |
| service_page_view | `app/[locale]/systems/aluminium-cladding-covering/page.tsx:56`, `app/[locale]/systems/daylighting-transparent-roofing/page.tsx:53`, `app/[locale]/systems/sandwich-panel-systems/page.tsx:53`, `app/[locale]/systems/standing-seam-zip-tech-roofing/page.tsx:56` | page_view | documentation-only | documented | Page views remain outside this phase. |
| service_primary_cta_click | `components/services/service-page-template.tsx:219` | service_primary_cta_click | documentation-only | documented | Comment-only alias, not a canonical event. |
| service_secondary_cta_click | `components/services/service-page-template.tsx:226` | service_secondary_cta_click | documentation-only | documented | Comment-only alias, not a canonical event. |
| sticky_cta_click | `components/contact/rfq-contact-page.tsx:713`, `components/home/sticky-mobile-cta.tsx:104` | sticky_cta_click | GTM-ready | kept and gated | Canonical sticky CTA event. |
| technical_proof_open | `components/case-studies/case-study-page-template.tsx:485`, `components/insights/engineering-article-template.tsx:45`, `components/seo/seo-landing-page-template.tsx:86` | technical_proof_open | application-owned | documented | Modal / proof open state stays in code. |
| technical_proof_zoom | `components/case-studies/case-study-page-template.tsx:701`, `components/case-studies/case-study-page-template.tsx:715` | technical_proof_zoom | documentation-only | documented | Marker only; no canonical event and no GTM-ready selector. |
| trust_bar_view | `components/home/trust-bar.tsx:22` | trust_bar_view | documentation-only | documented | Marker only, no approved runtime event. |
| whatsapp_click | `components/about/about-page.tsx:207`, `components/about/about-page.tsx:242`, `components/case-studies/case-study-page-template.tsx:645`, `components/contact/rfq-contact-page.tsx:372`, `components/contact/rfq-contact-page.tsx:439`, `components/contact/rfq-contact-page.tsx:724`, `components/home/sticky-mobile-cta.tsx:117`, `components/seo/seo-landing-page-template.tsx:257`, `components/seo/seo-landing-page-template.tsx:492` | whatsapp_click | GTM-ready | kept and gated | Canonical public WhatsApp link event. |
