# SIPANEL GTM Migration Audit

## 1. Executive Summary

This audit found one global Google Tag Manager installation, one global Vercel Speed Insights installation, one centralized client analytics helper, several real business-event call sites, many comment-only tracking markers, server-side lead/CRM integrations, and SEO JSON-LD scripts.

The current GTM loader is installed once in `app/[locale]/layout.tsx` and reads `NEXT_PUBLIC_GTM_ID`, so all localized routes inherit the same container. No raw GTM snippet, `next/script` analytics loader, Meta Pixel, Microsoft Clarity, Hotjar, LinkedIn Insight Tag, TikTok Pixel, Segment, Mixpanel, PostHog, Sentry, LogRocket, HubSpot widget, chat widget, `navigator.sendBeacon`, or direct `GoogleAnalytics` component was found in active source.

The highest-risk issue is not the GTM loader itself. The risk is that `lib/analytics/events.ts` can send every approved custom event both to GTM via `sendGTMEvent()` and to a direct `window.gtag('event', ...)` branch when `NEXT_PUBLIC_GA4_MEASUREMENT_ID` or `window.gtag` exists. If GA4 is also configured inside GTM, this can duplicate custom events and conversions. Confidence: High.

The second important issue is privacy and consent. GTM and Vercel Speed Insights load globally without an explicit consent gate in this repository, and analytics payloads include `page_url: window.location.href`. If URL query strings ever contain lead data, that value can be sent to GTM/GA4. Confidence: High.

The third important issue is maintainability and analytics accuracy. Many `track:` comments exist without a real helper call. Some marker names are also absent from the `approvedAnalyticsEvents` allowlist. These comments do not dispatch events and should not be treated as implemented tracking. Confidence: High.

## 2. Current Tracking Architecture

Current architecture:

```text
Localized Next.js App Router layout
    -> @next/third-parties GoogleTagManager
    -> GTM container from NEXT_PUBLIC_GTM_ID
    -> client helper lib/analytics/events.ts
        -> sendGTMEvent({ event, ...params })
        -> optional direct window.gtag('event', ...) fallback
    -> @vercel/speed-insights global component
    -> server-side /api/lead and /api/rfq CRM/notification flow
```

Important implementation details:

- `app/[locale]/layout.tsx:3` imports `GoogleTagManager` from `@next/third-parties/google`.
- `app/[locale]/layout.tsx:79-80` reads and validates `process.env.NEXT_PUBLIC_GTM_ID`.
- `app/[locale]/layout.tsx:158-174` preserves localized `<html lang={validLocale} dir={dir}>`, wraps the app in `NextIntlClientProvider`, renders `<SpeedInsights />`, then renders `<GoogleTagManager gtmId={gtmId} />` once when the ID is valid.
- `lib/analytics/events.ts:180-209` is the central custom event dispatcher.
- `components/CLAUDE.md:6` and `lib/CLAUDE.md:7` state that analytics should go through `lib/analytics/events.ts` and that new events must be added to the allowlist.

## 3. Tracking and Third-Party Script Inventory

| Tool / Code | Purpose | File and line | Current loading method | Current destination | Duplicate risk | Recommendation |
| ----------- | ------- | ------------- | ---------------------- | ------------------- | -------------- | -------------- |
| Google Tag Manager container | Global tag manager and marketing tag orchestration | `app/[locale]/layout.tsx:3`, `79-80`, `173` | Official `@next/third-parties/google` component; normal React import in Server Component layout; no `next/script` in source | GTM container from `NEXT_PUBLIC_GTM_ID`, currently documented as `GTM-K5HK55FN` in `.env.example:1` | Low for loader duplication; only one loader found | Keep one global loader in localized root layout. Do not add raw snippets. Confidence: High |
| Central dataLayer event helper | Custom event dispatch with allowlist and common params | `lib/analytics/events.ts:6-68`, `72-96`, `180-209` | Client module with `sendGTMEvent`; imported by client components | GTM `dataLayer`; optional direct GA4 event branch | High if direct GA4 branch is active while GA4 tag is inside GTM | Keep for app-state events, but decide whether direct GA4 fallback should be removed after verification. Confidence: High |
| Direct GA4 event fallback | Sends custom events to `window.gtag` | `lib/analytics/events.ts:98-100`, `113-119`, `205-206`; `docker-compose.yml:27` | Conditional client call, no loader found in source | GA4 via `window.gtag` if present | High if `NEXT_PUBLIC_GA4_MEASUREMENT_ID` exists and GTM also sends GA4 events | Requires Vercel/GTM verification. Likely consolidate GA4 under GTM or remove fallback after confirming no standalone GA4 loader is required. Confidence: High |
| Vercel Speed Insights | Web performance monitoring | `app/[locale]/layout.tsx:5`, `171`; `package.json:16` | `@vercel/speed-insights/next` component; normal React import | Vercel Speed Insights | Low with GA/GTM, different destination and purpose | Keep independent unless product decision says otherwise. Not a GTM replacement. Confidence: High |
| RFQ/contact form event tracking | Form start, step, submit, error, contact clicks | `components/home/rfq-section.tsx:104-155`, `170-174`; `components/contact/rfq-contact-page.tsx:248-328`, `353-357`, `406-412`, `607-612` | Client event handlers call analytics helper | GTM dataLayer and optional direct GA4 fallback | Medium; DOM click triggers in GTM could duplicate code events | Keep server/result-aware events in code; simple contact clicks can move to GTM only if code events are removed or disabled. Confidence: High |
| Catalog lead/download tracking | Catalog CTA, successful lead submit, download start | `components/home/catalog-download-button.tsx:10-12`; `components/home/catalog-download-modal.tsx:54-95`; `components/home/hero-actions.tsx:23-25`; `components/layout/header.tsx:110-113` | Client event handlers call analytics helper | GTM dataLayer and optional direct GA4 fallback | Medium if GTM also tracks the same buttons/forms by DOM selectors | Keep successful submit/download state in code. CTA clicks can be GTM DOM triggers only after removing equivalent code events. Confidence: High |
| Service/SEO proof, FAQ, related content events | Tracks dynamic proof views, FAQ expansion, related service/resource clicks | `components/services/service-page-template.tsx:12`, `221-228`, `476-501`; `components/seo/seo-landing-page-template.tsx:23`, `93`, `135`, `164`, `234-240`, `360`, `439`, `460-466`; `components/home/engineering-proof-snapshot.tsx:46-93` | Client event handlers call analytics helper | GTM dataLayer and optional direct GA4 fallback | Medium if duplicate GTM click triggers are configured | Keep events needing page IDs, titles, selected asset, or app state in code. Confidence: High |
| Contact links and sticky CTA | Phone, WhatsApp, email, sticky CTA click tracking | `components/home/sticky-mobile-cta.tsx:105-109`; `components/home/rfq-section.tsx:170-174`; `components/contact/rfq-contact-page.tsx:406-412`; marker-only links at `components/contact/rfq-contact-page.tsx:673-676` | Mixed: some client handlers, some comment-only anchors | GTM dataLayer for wired handlers; none for marker-only links | High if GTM DOM triggers are added without removing code events | Good GTM DOM-trigger candidates, but choose one system. Confidence: High |
| Comment-only tracking markers | Intended event inventory/documentation | Examples: `app/[locale]/contact/page.tsx:94`, `components/faq/faq-page.tsx:111-129`, `components/resources/resource-detail-page-template.tsx:146`, `components/case-studies/case-study-page-template.tsx:295-300`, `components/home/trust-bar.tsx:22` | No runtime loading; JSX comments only | None | High accuracy risk because comments are not tracking | Consolidate or wire intentionally. Do not assume implemented. Confidence: High |
| SEO JSON-LD scripts | Structured data for SEO | `app/[locale]/contact/page.tsx:23`; `components/seo/schema-script.tsx:2`; `components/services/service-page-template.tsx:138`; `components/resources/resource-detail-page-template.tsx:34`; other template schema placeholders | Inline `<script type="application/ld+json">` using `dangerouslySetInnerHTML` | Search engines, not analytics | Low tracking risk; not marketing pixels | Keep in Next.js. Do not move to GTM. Confidence: High |
| `/api/lead` CRM/notification integration | Lead validation, persistence, notification, Odoo CRM lead creation | `app/api/lead/route.ts:25-43`, `113-205`; `lib/rfq/odoo.ts:35-52`, `154-207`; `lib/rfq/server.ts:218-252` | Server route and server-side `fetch` calls | Odoo JSON-RPC, notification webhook, local/private storage | Low analytics duplication; high functional impact if moved | Must remain in Next.js/server code. Only emit minimal success/failure events after confirmed outcomes. Confidence: High |
| Legacy `/api/rfq` proxy | Backward-compatible RFQ endpoint | `app/api/rfq/route.ts:1-12` | Server route proxy to `/api/lead` | Same lead handler | Low | Keep as app routing/API behavior. Not GTM. Confidence: High |

## 4. Duplicate or Conflicting Implementations

1. Potential duplicate GA4 custom events. `lib/analytics/events.ts:196-202` sends to GTM and `lib/analytics/events.ts:205-206` can also call `window.gtag('event', ...)`. `docker-compose.yml:27` references `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. If production defines this variable or if GTM injects `gtag`, the same custom event can reach GA4 twice. Likely consequence: inflated conversions and inaccurate event counts. Confidence: High.

2. Possible duplicate click tracking if GTM DOM triggers are added over existing code events. Phone, WhatsApp, catalog CTA, hero CTA, language, FAQ, proof, and related-link events are already dispatched in multiple client handlers, for example `components/home/sticky-mobile-cta.tsx:105-109`, `components/home/hero-actions.tsx:23-35`, and `components/contact/rfq-contact-page.tsx:353-357`. If GTM click triggers are configured for the same selectors, counts will duplicate. Confidence: High.

3. Comment-only tracking markers are easy to mistake for implemented analytics. Examples include `components/faq/faq-page.tsx:111-129`, `components/resources/resource-detail-page-template.tsx:146`, and `app/[locale]/projects/page.tsx:1452`. They do not call the helper, so events may be missing. Likely consequence: incomplete funnels and false confidence in tracking coverage. Confidence: High.

4. Some marker names are not in `approvedAnalyticsEvents`. Examples from source include `projects_page_view`, `project_filter_use`, `resource_lead_submit`, `resource_detail_view`, `seo_primary_cta_click`, `service_primary_cta_click`, `technical_proof_zoom`, `consultation_cta_click`, and `article_view`. Because `lib/analytics/events.ts:176-182` gates dispatch through the allowlist, these names would not send if passed to `trackEvent` without being added. Confidence: High.

5. `page_url` includes the full current URL. `lib/analytics/events.ts:157-167` adds `page_url: window.location.href` to every event. If users arrive with PII-bearing query parameters, those values can be sent to GTM/GA4. Likely consequence: privacy policy and GA4 terms risk. Confidence: High.

6. No consent gate was found around GTM or Speed Insights. `app/[locale]/layout.tsx:171-173` renders both globally when configured. Depending on applicable jurisdictions and policy, tracking may occur before consent. Confidence: Medium because legal requirements depend on deployment geography and consent policy.

## 5. GTM Migration Candidates

### 5.1 Move completely to GTM

Category A items:

- GA4 base configuration and page views. GTM can reliably own the Google Tag for `G-33FL4K0R3S`, Conversion Linker, consent mode defaults, and route/page-view tags. Keep the Next.js GTM loader, but avoid separate direct GA4 loading or direct custom-event fallback unless intentionally required. Performance impact: small to no improvement; GA4 still downloads through GTM, but direct app code and duplicate requests can be reduced. Confidence: Medium because GTM container contents were not inspected in this audit.
- Simple DOM click tracking for phone, WhatsApp, email, map, outbound links, header catalog CTA, sticky CTA, and static hero CTAs. GTM can use link-click triggers and element attributes when event parameters do not require application state. Performance impact: small or possible regression; moving to GTM removes some handler calls from app code only if code events are deleted later, but GTM triggers add container runtime work. Confidence: High for technical feasibility.
- Scroll-depth tracking (`scroll_25`, `scroll_50`, `scroll_75`, `scroll_100`) if needed. These are allowlisted in `lib/analytics/events.ts:64-67` but no dispatcher was found. GTM can implement scroll-depth triggers without application code. Performance impact: small to possible regression depending trigger frequency and tag count. Confidence: High.

### 5.2 Keep minimal dataLayer event in application

Category B items:

- RFQ lifecycle events should remain app-originated: `rfq_start`, `rfq_step_complete`, `rfq_submit`, `rfq_error`, `rfq_abandon`. Evidence: `components/contact/rfq-contact-page.tsx:248-328` and `components/home/rfq-section.tsx:104-155` know validation, step, API, and success state. Recommended event shape:

```javascript
window.dataLayer?.push({
  event: "rfq_submit",
  form_type: "project_rfq",
  project_type: "...",
  language: "...",
  submission_status: "success"
});
```

- Catalog conversion events should remain app-originated after the API response and download trigger. Evidence: `components/home/catalog-download-modal.tsx:65-95`. Recommended event shape:

```javascript
window.dataLayer?.push({
  event: "catalog_download_started",
  form_type: "catalog_download",
  language: "...",
  submission_status: "success"
});
```

- Resource lead/download completion should remain app-originated because success depends on `/api/lead` and asset availability. Evidence: `components/resources/resource-detail-page-template.tsx:137-181`; current code has only comments, no helper call. Recommended event shape:

```javascript
window.dataLayer?.push({
  event: "resource_download_complete",
  resource_type: "...",
  language: "...",
  submission_status: "success"
});
```

- Language change should remain app-originated if previous and selected locale are needed. Evidence: `components/layout/header.tsx:181-185` and `components/localization/language-switcher.tsx:39-47`. Recommended event shape:

```javascript
window.dataLayer?.push({
  event: "language_change",
  previous_language: "...",
  selected_language: "...",
  component_id: "language_switcher"
});
```

- Technical proof, diagram, case-study, FAQ, and related-content events should remain app-originated when they need page IDs, selected asset names, item IDs, active filters, or modal state. Evidence: `components/home/engineering-proof-snapshot.tsx:46-93`, `components/services/service-page-template.tsx:408`, `components/seo/seo-landing-page-template.tsx:439`. Recommended event shape:

```javascript
window.dataLayer?.push({
  event: "diagram_open",
  component_id: "...",
  diagram_type: "...",
  language: "..."
});
```

- File upload attempt should remain app-originated but must not include file name. Evidence: `components/contact/rfq-contact-page.tsx:607-612` tracks `file_upload_attempt` and separately stores `selectedFileName` only for UI. Recommended event shape:

```javascript
window.dataLayer?.push({
  event: "file_upload_attempt",
  component_id: "contact_rfq_form",
  interaction_type: "file_select"
});
```

### 5.3 Keep completely in Next.js

Category C items:

- The GTM loader should remain in the shared localized layout through the official Next.js component. GTM cannot load itself without one bootstrap path. Evidence: `app/[locale]/layout.tsx:173`. Confidence: High.
- Vercel Speed Insights should remain independent from GTM unless SIPANEL decides to remove Vercel monitoring. Evidence: `app/[locale]/layout.tsx:171`; dependency at `package.json:16`. GTM does not replace Vercel's performance monitoring pipeline. Confidence: High.
- SEO JSON-LD must remain in Next.js. Evidence: schema scripts at `components/seo/schema-script.tsx:2`, `components/services/service-page-template.tsx:138`, `components/resources/resource-detail-page-template.tsx:34`, and other page templates. GTM-injected JSON-LD is less reliable for SEO and adds unnecessary client-side dependency. Confidence: High.
- Lead validation, RFQ submission, file handling, notification webhook, and Odoo CRM creation must remain in server code. Evidence: `app/api/lead/route.ts:25-43`, `113-205`; `lib/rfq/odoo.ts:154-207`; `lib/rfq/server.ts:149-252`. Moving these to GTM would expose logic and weaken validation/security. Confidence: High.
- Localization, route redirects, canonical redirects, metadata, sitemap, and robots logic should remain in the app. Evidence: `app/[locale]/layout.tsx:91-135`, `middleware.ts:5-20`, `next.config.mjs:16-25`. Confidence: High.

### 5.4 Remove or consolidate after verification

Category D items:

- Consider removing the direct GA4 fallback branch after confirming GTM owns GA4. Evidence: `lib/analytics/events.ts:205-206`. Verification: inspect Vercel production env for `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, inspect GTM container for the `G-33FL4K0R3S` Google Tag, and test that each custom event reaches GA4 once. Confidence: High.
- Consolidate comment-only tracking markers. Evidence: many `track:` comments from the search output, including `components/faq/faq-page.tsx:111-129` and `components/resources/resource-detail-page-template.tsx:146`. Verification: decide whether each marker becomes a GTM DOM trigger, a dataLayer helper call, or documentation removal. Confidence: High.
- Align marker names with `approvedAnalyticsEvents`. Evidence: allowlist at `lib/analytics/events.ts:6-68` does not include several marker names found in source. Verification: map legacy marker names to canonical events before adding or deleting anything. Confidence: High.
- Consider simplifying contact-click tracking to one owner. Evidence: `components/home/rfq-section.tsx:170-174`, `components/contact/rfq-contact-page.tsx:406-412`, `components/home/sticky-mobile-cta.tsx:105-109`. Verification: if GTM link-click tags are enabled, remove or disable equivalent code events in a planned change. Confidence: High.

### 5.5 Requires manual verification

Category E items:

- GTM container contents were not inspected. Manually verify that `GTM-K5HK55FN` contains the intended Google Tag for `G-33FL4K0R3S`, that it is published, and that it does not also contain duplicate page-view or conversion tags. Confidence: Medium.
- Production Vercel environment values were not read in this audit. Manually verify whether `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is configured in Production or Preview. Do not expose unrelated env values. Confidence: Medium.
- Consent requirements and current consent policy are not evident in the repository. Manually verify legal/privacy requirements for target users and configure consent mode/cookie UI accordingly. Confidence: Medium.
- Production runtime may include externally injected scripts from GTM, Vercel, browser extensions, CDN, CMS, or external services. This repository audit cannot prove those absent. Use Tag Assistant and browser network inspection on production. Confidence: Medium.

| Item | Category | Move to GTM? | Keep dataLayer in code? | Performance impact | Risk | Required verification |
| ---- | -------- | -----------: | ----------------------: | ------------------ | ---- | --------------------- |
| GA4 base tag and page views | A/E | Yes | No, except optional route event if needed | Small/no improvement; avoids direct duplicate only if direct path removed | Duplicate page views/events | Confirm GTM has only one Google Tag for `G-33FL4K0R3S` |
| Phone/WhatsApp/email/map click tracking | A | Yes, if code events are retired | No for simple link clicks | Small; GTM trigger may add runtime work | Duplicate clicks if both systems run | Compare GTM triggers with code handlers |
| Scroll-depth tracking | A | Yes | No | Small/possible regression depending trigger volume | Extra events and main-thread work | Decide thresholds and route scope |
| RFQ submit/success/error | B | GTM should receive and route it | Yes | No meaningful improvement; app must know success | Inaccurate conversions if DOM-only | Test API success/failure paths |
| Catalog form submit/download | B | GTM should receive and route it | Yes | No meaningful improvement | Duplicate conversions if DOM submit also tracked | Verify one conversion trigger |
| Resource download completion | B | GTM should receive and route it | Yes | No meaningful improvement | Current marker-only event may be missing | Implement/test after audit |
| Language change | B | GTM receives event | Yes | No meaningful improvement | Missing locale metadata with DOM-only | Test all locale links |
| Diagram/proof/case/FAQ state events | B | GTM receives event | Yes for stateful cases | No meaningful improvement | DOM triggers may miss state or duplicate | Map stateful vs simple clicks |
| Vercel Speed Insights | C | No | No | Moving not applicable | Losing Vercel metrics | Product decision only |
| JSON-LD structured data | C | No | No | Moving likely regresses SEO reliability | Search engine parsing risk | Validate schema separately |
| Odoo/lead APIs | C | No | No, except conversion event after success | Not applicable | Security and data loss | Keep server-side |
| Direct GA4 fallback | D/E | Consolidate under GTM if verified | No, unless standalone GA4 is required | Small improvement if duplicate path removed | Duplicate events | Check env + GTM container + network |
| Comment-only markers | D | Some can become GTM triggers | Some need app events | Depends on final implementation | Missing/inconsistent analytics | Inventory each marker before cleanup |

## 6. npm Dependencies and Bundle Impact

| Package | Imported in | Client bundle impact | Replaceable by GTM? | Recommendation |
| ------- | ----------- | -------------------- | ------------------: | -------------- |
| `@next/third-parties` | `app/[locale]/layout.tsx:3`; `lib/analytics/events.ts:3` | Yes, for GTM component and `sendGTMEvent`; small official integration runtime | No, not while using official Next.js GTM integration | Keep. It is the correct official integration. Confidence: High |
| `@vercel/speed-insights` | `app/[locale]/layout.tsx:5`, `171` | Yes, global Speed Insights client/runtime | No | Keep only if SIPANEL wants Vercel performance monitoring. It is not a marketing tag. Confidence: High |
| `react-hook-form` | RFQ/contact/catalog-related forms, e.g. `components/home/rfq-section.tsx:5`, `components/contact/rfq-contact-page.tsx:7` | Yes on form islands | No | Keep; form state/validation cannot move to GTM. Confidence: High |
| `zod` | API validation and client form validation, e.g. `app/api/lead/route.ts:3`, `components/contact/rfq-contact-page.tsx:8`, dynamic import at `components/home/rfq-section.tsx:35` | Yes where directly imported in client contact page; dynamic on homepage validation | No | Keep; validation/security functionality. Confidence: High |
| `playwright` | `package.json:34` devDependency | No production client impact | No | Keep or remove based on test tooling policy, not GTM. Confidence: High |

No package-lock evidence was found for `@vercel/analytics`, Sentry, PostHog, Mixpanel, Hotjar, Clarity, Meta/Facebook pixel packages, HubSpot, LogRocket, Segment, or chat widgets.

## 7. Performance Assessment

Moving tags to GTM is not automatically a performance improvement. The browser still downloads GTM, then downloads and executes whatever tags the container fires. GTM can improve performance only when it replaces duplicate direct code, delays non-critical tags, limits tags to relevant routes, or respects consent so unnecessary requests do not fire.

Performance findings:

- GTM loader: already global and official. Keeping one loader is appropriate. Additional tags inside GTM can increase network requests and main-thread execution. Confidence: High.
- GA4 through GTM: no meaningful improvement if it simply moves from direct `gtag.js` to GTM; possible small improvement if it removes duplicate direct events. Confidence: Medium because no direct GA4 loader was found in source.
- Direct GA4 fallback: removing it after verification could reduce duplicate event calls and inaccurate reporting. Bundle impact is small because the helper remains for GTM events. Confidence: High.
- Simple click tracking: moving from React handlers to GTM may reduce tiny amounts of app code only after code removal, but GTM click listeners and trigger evaluation still run. Performance impact is small or possibly negative. Confidence: High.
- RFQ/resource/catalog success events: moving fully to GTM would weaken accuracy because DOM-only triggers cannot know server-confirmed success. Performance improvement would be negligible. Confidence: High.
- Vercel Speed Insights: independent monitoring adds client/runtime work and network requests, but GTM is not a replacement. Removing it would reduce work but lose Vercel metrics. Confidence: High.
- JSON-LD: keeping it server-rendered is better for SEO reliability. Moving it to GTM would add client dependency and likely regress SEO, not improve Web Vitals. Confidence: High.

## 8. Privacy, Consent, and Security Risks

- Full URL leakage risk: `lib/analytics/events.ts:161` sends `window.location.href` as `page_url`. If campaign, form, email, phone, or other PII appears in query parameters, it can be sent to GTM/GA4. Recommendation: later sanitize URLs to origin + pathname or explicitly strip sensitive query parameters before sending. Confidence: High.
- PII in form fields is not directly sent to analytics in the inspected helper calls. `rfq_submit` uses `project_type` and `submission_method`, not name/phone/email/message (`components/contact/rfq-contact-page.tsx:315-319`; `components/home/rfq-section.tsx:142-146`). Confidence: High.
- File names are not sent in the analytics event. `components/contact/rfq-contact-page.tsx:607-612` sends only `component_id` and `interaction_type`, while `selectedFileName` is UI state. Confidence: High.
- CRM/Odoo intentionally receives PII server-side. Evidence: `lib/rfq/odoo.ts:121-145`, `174-179`. This must not move to GTM. Confidence: High.
- No explicit consent UI or consent mode initialization was found. Global GTM and Speed Insights rendering at `app/[locale]/layout.tsx:171-173` may fire before consent depending on the deployed tag configuration. Confidence: Medium.
- JSON-LD uses `dangerouslySetInnerHTML`, but with `JSON.stringify(schema)` for structured data. This is normal for schema markup, but any future user-generated values in schema should be sanitized before inclusion. Confidence: Medium.
- Public IDs such as `NEXT_PUBLIC_GTM_ID` and GA4 Measurement IDs are public identifiers, not secrets. Odoo, notification, database, and webhook variables in `docker-compose.yml:16-28` are secrets or operational config and should not be exposed in analytics events. Confidence: High.

## 9. Recommended Target Architecture

Recommended target:

```text
Next.js application
    -> one official GoogleTagManager loader in app/[locale]/layout.tsx
    -> minimal, typed dataLayer events for app-state and server-confirmed events
    -> Google Tag Manager
        -> GA4 Google Tag G-33FL4K0R3S
        -> Conversion Linker / Google Ads if needed
        -> Microsoft Clarity or future marketing pixels if approved
        -> DOM triggers for simple non-PII clicks and scroll depth
    -> Vercel Speed Insights remains independent
    -> CRM/Odoo and form validation remain in Next.js/server code
```

What remains in Next.js:

- The official GTM bootstrap in `app/[locale]/layout.tsx`.
- `lib/analytics/events.ts` or a smaller successor for app-state events only.
- RFQ/catalog/resource success/error events after application or API confirmation.
- CRM, Odoo, notification webhook, file validation/storage, metadata, canonical/hreflang, sitemap, robots, and JSON-LD.
- Vercel Speed Insights if SIPANEL wants Vercel performance monitoring.

What moves to GTM:

- GA4 configuration and page views, if GTM has the published Google Tag.
- Google Ads conversion tags, Conversion Linker, Microsoft Clarity, Meta Pixel, LinkedIn, Hotjar, or other marketing pixels if adopted later.
- Simple DOM click events: outbound links, phone, WhatsApp, email, map, static CTA clicks, and scroll depth.

What is removed after verification:

- Direct GA4 event fallback in `lib/analytics/events.ts` if GA4 is managed exclusively through GTM.
- Comment-only markers that are not used as source-of-truth documentation.
- Any duplicate DOM trigger in GTM or duplicate app helper call for the same event.

Page views in App Router:

- Prefer one owner. Either GA4 automatic/enhanced page measurement through the GTM Google Tag or one explicit App Router route-change page-view event. Do not run both.
- If explicit route tracking is needed, implement it as one small client component using `usePathname()` and `useSearchParams()`, with de-duplication on path/search changes and sanitized URLs.

Consent:

- Define consent defaults before marketing tags fire.
- Use GTM consent mode and a Next.js consent UI/state source if consent is required for the target jurisdictions.
- Fire non-essential marketing pixels only after consent.

Staging and production:

- Use separate GTM containers or environment-specific GTM workspaces/environments for Preview/Staging vs Production.
- Do not send staging traffic into the production GA4 property unless intentionally filtered.

## 10. Prioritized Migration Plan

| Priority | Action | Expected benefit | Risk | Prerequisite |
| -------- | ------ | ---------------- | ---- | ------------ |
| P0 | Verify GTM container `GTM-K5HK55FN` contains a published Google Tag for `G-33FL4K0R3S` and only one GA4 page-view path | Prevent missing or duplicate GA4 data | Incorrect GTM edits can break tracking | GTM account access |
| P0 | Decide and implement consent architecture for GTM/marketing tags; sanitize `page_url` before analytics dispatch | Privacy and compliance improvement | Requires product/legal decision | Consent policy and jurisdictions |
| P1 | Verify whether `NEXT_PUBLIC_GA4_MEASUREMENT_ID` exists in Vercel Production; remove/consolidate direct GA4 fallback only after confirming GTM owns GA4 | Prevent duplicate custom events/conversions | Removing fallback before GTM is configured can lose events | Vercel env and GTM verification |
| P1 | Audit GTM triggers against code-dispatched events for phone, WhatsApp, catalog, hero, and form events | Prevent inflated clicks/conversions | Requires GTM container inspection | Tag Assistant test plan |
| P2 | Convert marker-only events into either GTM DOM triggers or typed dataLayer helper calls | Improve analytics coverage and maintainability | Incorrect mapping can create noisy events | Event taxonomy agreement |
| P2 | Align all marker names with `approvedAnalyticsEvents` or rename markers to approved names | Prevent silent drops from allowlist | Requires taxonomy migration | Source event inventory |
| P3 | Consider route-scoped GTM triggers for heavy third-party tags | Reduce unnecessary requests on irrelevant pages | GTM complexity | Tag priority and consent plan |

## 11. Verification Checklist

- Open GTM Preview/Tag Assistant for `https://www.sipanelco.ir/fa`.
- Confirm `GTM-K5HK55FN` loads once and `GTM-T9VNLQNN` does not load.
- Confirm `window.dataLayer` exists and contains a GTM initialization event.
- Confirm one GA4 Google Tag for `G-33FL4K0R3S` fires, if GA4 is intended to be managed by GTM.
- Confirm a localized client-side navigation, such as `/fa` to `/fa/projects`, does not bootstrap the GTM container again.
- Test `/fa`, `/en`, `/ar`, and `/ru` localized roots.
- Test RFQ success and error paths; verify exactly one `rfq_submit` event for successful API response and no PII parameters.
- Test catalog modal success; verify exactly one `catalog_form_submitted` and one `catalog_download_started` event.
- Test phone, WhatsApp, email, map, and sticky CTA clicks; verify they are owned by either code or GTM DOM triggers, not both.
- Test resource lead download; verify whether the comment-only marker has no event today, then implement one owner in a future change.
- Inspect GA4 DebugView for duplicate page views and duplicate custom events.
- Verify consent defaults and consent updates before enabling non-essential marketing tags.

## 12. Files Inspected

Key files inspected:

- `app/[locale]/layout.tsx`
- `lib/analytics/events.ts`
- `components/home/rfq-section.tsx`
- `components/contact/rfq-contact-page.tsx`
- `components/home/catalog-download-modal.tsx`
- `components/home/catalog-download-button.tsx`
- `components/home/hero-actions.tsx`
- `components/home/sticky-mobile-cta.tsx`
- `components/home/engineering-proof-snapshot.tsx`
- `components/home/case-studies-preview.tsx`
- `components/home/trust-bar.tsx`
- `components/layout/header.tsx`
- `components/localization/language-switcher.tsx`
- `components/services/service-page-template.tsx`
- `components/seo/seo-landing-page-template.tsx`
- `components/case-studies/case-study-page-template.tsx`
- `components/resources/engineering-resource-hub-page.tsx`
- `components/resources/resource-detail-page-template.tsx`
- `components/faq/faq-page.tsx`
- `app/api/lead/route.ts`
- `app/api/rfq/route.ts`
- `lib/rfq/odoo.ts`
- `lib/rfq/server.ts`
- `lib/rfq/sanitize.ts`
- `components/CLAUDE.md`
- `lib/CLAUDE.md`
- `next.config.mjs`
- `middleware.ts`
- `package.json`
- `package-lock.json`
- `docker-compose.yml`
- `.env.example`
- `public/` paths were searched for matching script/tracking terms; no active script integrations were identified there.

## 13. Commands Executed

Read-only inspection commands executed:

```bash
pwd && git status --short
nl -ba 'app/[locale]/layout.tsx' | sed -n '1,210p'
nl -ba lib/analytics/events.ts | sed -n '1,320p'
nl -ba package.json | sed -n '1,220p'
nl -ba docker-compose.yml | sed -n '1,90p'
nl -ba components/home/rfq-section.tsx | sed -n '1,190p'
nl -ba components/home/sticky-mobile-cta.tsx | sed -n '1,150p'
nl -ba components/home/hero-actions.tsx | sed -n '1,110p'
nl -ba components/contact/rfq-contact-page.tsx | sed -n '1,380p'
nl -ba components/contact/rfq-contact-page.tsx | sed -n '380,520p'
nl -ba components/contact/rfq-contact-page.tsx | sed -n '580,700p'
nl -ba components/layout/header.tsx | sed -n '1,260p'
nl -ba components/localization/language-switcher.tsx | sed -n '1,110p'
nl -ba components/home/catalog-download-modal.tsx | sed -n '1,260p'
nl -ba app/api/rfq/route.ts | sed -n '1,280p'
nl -ba app/api/lead/route.ts | sed -n '1,240p'
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir='.next*' --exclude='*.tsbuildinfo' --exclude='package-lock.json' -E 'GoogleTagManager|googletagmanager|GTM-|dataLayer|gtag|GoogleAnalytics|NEXT_PUBLIC_GA|NEXT_PUBLIC_GTM|@vercel/analytics|SpeedInsights|@vercel/speed-insights|next/script|dangerouslySetInnerHTML|sendBeacon|fbq|clarity|hotjar|sentry|posthog|mixpanel|hubspot|AW-|G-[A-Z0-9]+' app components lib utils hooks providers middleware.ts next.config.* package.json docker-compose.yml .env.example
nl -ba components/resources/resource-detail-page-template.tsx | sed -n '1,260p'
nl -ba components/resources/engineering-resource-hub-page.tsx | sed -n '1,360p'
nl -ba components/faq/faq-page.tsx | sed -n '1,260p'
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir='.next*' --exclude='*.tsbuildinfo' --exclude='package-lock.json' -E 'track:|trackEvent\\(|track[A-Za-z]+Event\\(|trackContactClick|trackCtaClick|sendGTMEvent|dataLayer|gtag' app components lib
nl -ba components/case-studies/case-study-page-template.tsx | sed -n '1,120p;280,330p;560,660p'
nl -ba components/seo/seo-landing-page-template.tsx | sed -n '1,80p;220,250p;350,370p;450,475p'
nl -ba components/services/service-page-template.tsx | sed -n '1,30p;130,150p;210,235p;485,510p'
nl -ba components/home/engineering-proof-snapshot.tsx | sed -n '1,130p'
nl -ba components/home/case-studies-preview.tsx | sed -n '1,250p'
nl -ba components/home/catalog-download-button.tsx | sed -n '1,80p'
nl -ba components/home/trust-bar.tsx | sed -n '1,70p'
find . -maxdepth 2 -type f \( -name 'next.config.*' -o -name 'middleware.*' -o -name 'proxy.*' -o -name 'instrumentation.*' -o -name '_app.*' -o -name '_document.*' \) -print
nl -ba next.config.mjs | sed -n '1,220p'
nl -ba middleware.ts | sed -n '1,220p'
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir='.next*' --exclude='*.tsbuildinfo' --exclude='package-lock.json' -E "from ['\\\"]@next/third-parties|from ['\\\"]@vercel/speed-insights|from ['\\\"]@vercel/analytics|from ['\\\"]next/script|sendGTMEvent|GoogleTagManager|SpeedInsights" app components lib
nl -ba lib/rfq/odoo.ts | sed -n '1,260p'
nl -ba lib/rfq/server.ts | sed -n '1,320p'
nl -ba lib/rfq/sanitize.ts | sed -n '1,120p'
nl -ba components/CLAUDE.md | sed -n '1,80p'
nl -ba lib/CLAUDE.md | sed -n '1,80p'
find app components lib utils hooks providers pages src -maxdepth 3 -type d -print
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir='.next*' --exclude='*.tsbuildinfo' --exclude='package-lock.json' -E 'Meta Pixel|Facebook Pixel|fbq|Microsoft Clarity|clarity\\(|Hotjar|hj\\(|LinkedIn Insight|TikTok|ttq|Yandex|ym\\(|Google Optimize|Segment|analytics\\.track|Mixpanel|mixpanel|PostHog|posthog|Sentry|LogRocket|HubSpot|hubspot|chat widget|Intercom|Crisp|Tawk|AW-[0-9]|googletagmanager|gtag\\(|GoogleAnalytics|GoogleTagManager|dataLayer|NEXT_PUBLIC_GA|NEXT_PUBLIC_GTM|sendBeacon|navigator\\.sendBeacon|beacon|pixel|iframe|<script|next/script|dangerouslySetInnerHTML' app components lib public next.config.mjs middleware.ts package.json docker-compose.yml .env.example
grep -n '"@next/third-parties"\\|"@vercel/speed-insights"\\|"@vercel/analytics"\\|"sentry"\\|"posthog"\\|"mixpanel"\\|"hotjar"\\|"clarity"' package-lock.json
git ls-files | grep -E '(^app/|^components/|^lib/|^utils/|^hooks/|^providers/|^pages/|^src/app/|^middleware|^next.config|^package.json|^package-lock.json|^docker-compose.yml|^\\.env.example|^public/)'
```

Earlier broad searches that included generated `.next*` output were interrupted after they produced noisy stale build-artifact matches. The report above is based on targeted source/config searches that excluded generated directories and lockfile noise except where dependency checks were intentional.

No build, lint, typecheck, install, deploy, Vercel env read, or GTM change command was run because this was an audit-only task and source inspection was sufficient.

## 14. Final Recommendation

Keep the single official GTM integration in `app/[locale]/layout.tsx`. Manage GA4, future advertising tags, conversion linker, scroll depth, and simple link-click marketing events in GTM after confirming consent behavior and avoiding duplicate DOM/code triggers.

Keep server-confirmed and application-state events in Next.js as minimal non-PII `dataLayer` events. This includes RFQ submit/error, catalog submit/download, resource download completion, language changes, file upload attempts, and stateful proof/case/FAQ events.

Do not move CRM submission, Odoo integration, form validation, file upload validation/storage, metadata, canonical/hreflang, sitemap, robots, JSON-LD, or Vercel Speed Insights into GTM.

Before any migration, verify the GTM container contents and Vercel production env values. The most important cleanup is to prevent duplicate GA4/custom event paths and to formalize consent and URL sanitization.
