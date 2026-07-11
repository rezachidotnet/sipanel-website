# lib/

- Content modules export typed, per-locale data objects consumed by pages/templates — no JSX, no `'use client'`.
- Source content from `specs/pages/*.json` (import the JSON, type it, project per `Locale`); do not hardcode page copy that belongs in specs.
- Each feature module exposes the page-contract helpers used by `app/`: `getXPageData(slug)`, `getXPageMetadata(locale, page)`, `listXSlugs()`.
- `seo/` — `metadata.ts` builds `Metadata` (canonical, hreflang, OG); `schema.ts` builds JSON-LD. Add new OG sections/images here, not inline.
- `analytics/events.ts` — `'use client'`; append new event names to `approvedAnalyticsEvents` before firing them (the allowlist gates dispatch). GTM/dataLayer is the single transport for custom client analytics events; direct `window.gtag("event", ...)` calls are prohibited unless explicitly approved. The GTM loader must exist only once in the shared layout. Do not send full URLs with uncontrolled query parameters: common `page_url` values must exclude query strings and hashes. Server-confirmed conversions must originate from application code, application-state events must not be replaced with unreliable DOM-only triggers, and PII must never be sent to GTM or GA4. Check simple DOM-event ownership against the remote GTM container before migration.
- `rfq/` — `server.ts` (validate + persist to `private/`), `odoo.ts` (CRM), `sanitize.ts`, `constants.ts` (allowed upload types/size). Keep Zod schemas in `route.ts` and `server.ts` aligned.
- Project-related/featured logic must respect the Tier A hierarchy (see root) — do not derive importance from `relatedSlugs`/`slice` defaults.
