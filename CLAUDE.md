# SIPANEL Website

Industrial building-envelope engineering site. Next.js 16 App Router · React 18 · TypeScript (strict) · next-intl v4 · Tailwind 3 · Zod.

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Serve prod build: `npm start`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- SEO audit (prod URL): `npm run seo:audit`
- Image pipeline (PNG → WebP/JPG variants): `node scripts/convert-images.mjs`

## Architecture

- `app/[locale]/` — localized App Router pages; dynamic segments (`[slug]`) for projects, systems, solutions, resources, insights.
- `app/api/` — `lead` is the single lead/RFQ endpoint; `rfq` proxies to it (legacy).
- `lib/` — typed content modules (per-locale objects, sourced from `specs/pages/*.json`), SEO builders, analytics event allowlist.
- `components/` — server + client-island UI, grouped by feature.
- `i18n/` — `routing.ts` (locales, default, RTL, `getDirection`) and `request.ts` (next-intl config).
- `messages/{fa,en,ar,ru}.json` — UI string translations.
- `specs/` — JSON content/spec source of truth consumed by `lib/`.
- `assets/` — fonts + source images (imported in TS); `public/` — static served files (OG, robots assets).
- `private/rfq-submissions/` — runtime lead storage (not served, not committed).
- `middleware.ts` — redirects `/` to the default locale.

## Localization (critical)

- Locales: `fa` (default + source of truth), `en`, `ar`, `ru`. RTL: `fa`, `ar`.
- `fa` content is authoritative; keep all four `messages/*.json` files key-synchronized.
- Never break next-intl routing; preserve the `[locale]` structure and `localePrefix: 'always'`.
- Import locale helpers from `@/i18n/routing` (`locales`, `defaultLocale`, `getDirection`, `Link`). Path alias: `@/*` → repo root.

## SEO (critical)

- Preserve canonical URLs, hreflang, structured data, and per-page metadata.
- Build metadata via `lib/seo/metadata.ts`; structured data via `lib/seo/schema.ts`.
- Production host is `https://www.sipanelco.com` (apex → www is a 308; the legacy `sipanelco.ir`/`www.sipanelco.ir` hosts also 308 here via `middleware.ts`, preserving path and query string).

## Analytics (critical)

- Never remove or break existing tracking.
- Only fire events listed in `approvedAnalyticsEvents` (`lib/analytics/events.ts`); add the name there before using it.

## Project prioritization (critical)

Tier A strategic proof projects — prioritize for internal linking, related projects, homepage proof, featured slots, trust signals. Treat this list (not current links/array order/UI) as the authoritative hierarchy; surface gaps as findings.

| Project | Slug |
| --- | --- |
| 32-Bed Military Hospital | `army-hospital` |
| Mehrabad Airport Aircraft Hangar | `mehrabad-aircraft-hangar` |
| Erbil Eye Hospital Entrance Canopy | `erbil-eye-hospital-entrance-canopy` |
| Tabas Railway Facility | `tabas-railway-facility` |
| Mahshahr Taxi Parking Facility | `mahshahr-taxi-parking` |
| Absaar Water Park | `absaar-water-park` |
| Megapars Mall Atrium | `megaparsmall-atrium` |
| Tehran Mall Roof Garden, Food Court & Cinema Roof | `tehran-mall-roof-garden-foodcourt` |
| Kermanshah Industrial University Petroleum Faculty | `kermanshah-industrial-university-petroleum-faculty` |
| Andimeshk Stadium | `andimeshk-stadium` |
| Parand City Entrance Gate | `parand-city-entrance` |

Do NOT infer importance from existing links, `relatedSlugs`/`slice(0,3)` logic, current UI visibility, data-file order, or asset count.

## Workflow constraints

- Fast-iteration mode: the user reviews changes locally before push/deploy. Do not auto-run build/lint/typecheck after every task.
- Run build/lint/typecheck only when: explicitly requested, routing changes, localization changes, new pages, major refactors, or TS data-structure changes.
- Extend existing components/patterns; do not create duplicate implementations.
- Prefer consistency over redesign; change design only when explicitly asked.
- After a task: report modified files, explain changes, note risks.
