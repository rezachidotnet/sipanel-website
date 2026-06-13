# Project Detail Page — Internal Link Audit

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Scope:** `/[locale]/projects/[slug]` across `fa`, `en`, `ar`, `ru`
**Method:** Static read of route files, data layers, and render templates + full-repo grep. Findings are based on what the code **renders** (DOM output), not on what data **contains**. No code was modified.

---

## Executive Summary

The site defines **35 project (case-study) slugs**, each generated for 4 locales ⇒ **140 detail pages**. All 140 are in the sitemap with full hreflang. **But only 4 of the 35 projects receive any clickable internal link.** The remaining **31 projects (124 locale pages) are click-orphans** — reachable only by direct URL, sitemap, or search engine. The `/projects` index renders 35 cards but none are clickable, and the 4 Systems pages define case-study links that the template never renders (dead data).

**Key Numbers**
- 35 slugs × 4 locales = **140** detail pages
- **2** components render a real `<Link>` to a detail page
- **4** projects reachable by click; **31** orphaned
- **140/140** pages in sitemap (all SEO-discoverable)
- **12** intended Systems-page links are dead (href present in data, never rendered)

---

## Route Architecture (verified)

- **Route:** `app/[locale]/projects/[slug]/page.tsx` → renders `CaseStudyPageTemplate`.
- **Data:** `lib/case-studies/case-study-pages.ts` (projects are internally modeled as "case studies").
- **Slugs:** `listCaseStudySlugs()` → 35 (see matrix). `generateStaticParams` maps each across `locales` ⇒ 140 routes.
- **Localized routes:** `buildLocalizedCaseStudyRoutes()` → `/{en,fa,ar,ru}/projects/{slug}`.

---

## Where Detail-Page Links Actually Originate

Only **two** components render a clickable link to a detail page (both use the next-intl `Link` from `@/i18n/routing`, so they auto-prefix the locale and are **locale-safe**):

| Source | Renders link to | File:line | Locale-safe |
|---|---|---|---|
| Homepage Featured Project | `/projects/army-hospital` | `components/home/featured-project.tsx:120` | ✅ |
| Detail page "Related Case Studies" | the page's related studies | `components/case-studies/case-study-page-template.tsx:569` | ✅ |

### Sources that look like links but are NOT (verified)

| Location | Why it does not link to a detail page |
|---|---|
| `/projects` index — `app/[locale]/projects/page.tsx` | 35 cards rendered, **no anchor** on any card. Only `<Link>`s are the RFQ CTAs (lines 1416, 1593). `/projects/{slug}` appears **only in JSON-LD** (`buildCollectionSchema`). `ProjectsFilterActivator` toggles radio filters — no navigation. |
| 4 Systems pages — `lib/services/*.ts` | Each defines `href: /{locale}/projects/{slug}` on 3 case-study cards (12 total), but `components/services/service-page-template.tsx` (render block ~line 287) **never outputs `project.href` or the `viewProject` label**. Cards are non-clickable → **dead data**. |
| Homepage case-studies preview — `components/home/case-studies-preview.tsx` | Both `<Link>`s point to `/projects` (index), never to a detail page (lines 173, 214). |
| About page — `lib/about/about-page.ts` | Only imports a project **image**; no link. |

---

## The "Related Case Studies" links are array-ordered, not relevant

`lib/case-studies/case-study-pages.ts:1269`
```
const relatedStudies = initialCaseStudies
  .filter((study) => study.slug !== config.slug)
  .slice(0, 3)
  .map((study) => ({ ..., href: `/projects/${study.slug}` }));
```
This always returns the **first 3 entries of the array** (minus self), assigned to `relatedCaseStudies.items` (line 1439) and rendered by the template. Therefore the related-studies links from **every** detail page only ever target:

- `army-hospital`, `shahre-babak-hall`, `sepehan-flower-market` — on ~34 pages each
- `shahr-babak-stadium-entrance` — only on the 3 pages where one of the above is the "self" being filtered out

No detail page links to a topically-relevant project. 31 projects never appear as anyone's "related."

---

## Section A — Project pages WITH ≥1 internal clickable link (4)

| Project | Route (×4 locales) | Linked From | Component/File |
|---|---|---|---|
| army-hospital | `/{locale}/projects/army-hospital` | Homepage Featured + Related (≈34 pages) | `home/featured-project.tsx:120`; `case-study-page-template.tsx:569` |
| shahre-babak-hall | `/{locale}/projects/shahre-babak-hall` | Related (≈34 pages) | `case-study-page-template.tsx:569` |
| sepehan-flower-market | `/{locale}/projects/sepehan-flower-market` | Related (≈34 pages) | `case-study-page-template.tsx:569` |
| shahr-babak-stadium-entrance | `/{locale}/projects/shahr-babak-stadium-entrance` | Related (3 pages only) | `case-study-page-template.tsx:569` |

**Bootstrap note:** The only entry into this graph from the rest of the site is Homepage → `army-hospital`. From there, related links reach the other 3. Crawling from the homepage yields exactly these 4 — no path reaches the other 31.

## Section B — Project pages with ZERO internal links (ORPHANS — 31)

```
andimeshk-stadium                      marun-petrochemical-visitor-terminal
absaar-water-park                      mehrabad-aircraft-hangar
megaparsmall-atrium                    najafabad-university-amphitheater
mahshahr-taxi-parking                  payam-industrial-city-ceramic-factory
parand-city-entrance                   rouzbeh-charity-complex-zanjan
tabas-railway-facility                 shahrood-azad-university-skylight
tiran-gas-station                      shalamcheh-border-gate
ahvaz-airport-passenger-terminal       tarbiat-modares-research-greenhouse
atlas-hotel-shahinshahr-atrium         tavanir-shahrekord-central-atrium
baharestan-prayer-hall                 tehran-mall-roof-garden-foodcourt
bandar-abbas-mall-atrium-roof          toranj-kish-restaurant
bandar-mahshahr-bus-terminal           eftekhar-commercial-office-complex
enghelab-club-padel-center             erbil-eye-hospital-entrance-canopy
fadak-mall-glass-skylight              gonabad-university-sports-hall
imam-khomeini-airport-hajj-terminal    kermanshah-industrial-university-petroleum-faculty
maku-convention-hall
```

> 12 of these (e.g. `tabas-railway-facility`, `ahvaz-airport-passenger-terminal`, `fadak-mall-glass-skylight`, `parand-city-entrance`, `erbil-eye-hospital-entrance-canopy`) appear to be linked from Systems pages but are orphans because that `href` is never rendered.

## Section C — Pages receiving the most internal link "traffic"

| Rank | Project | Inbound clickable internal links |
|---|---|---|
| 1 | army-hospital | ≈34 detail pages × 4 locales (≈136) **+** homepage featured (×4) |
| 2 | shahre-babak-hall | ≈34 × 4 (≈136) |
| 2 | sepehan-flower-market | ≈34 × 4 (≈136) |
| 4 | shahr-babak-stadium-entrance | 3 × 4 (≈12) |
| — | all other 31 | **0** |

## Section D — Broken / invalid / dead references

1. **12 dead hrefs (Systems pages):** `lib/services/{sandwich-panel-systems, standing-seam-zip-tech-roofing, aluminium-cladding-covering, daylighting-transparent-roofing}.ts` set `href` on case-study cards; `service-page-template.tsx` never renders it. Not broken at runtime — simply unreachable.
2. **"Related" relationship is not real:** related studies are array-order (`slice(0,3)`), not relevance-matched — same 3–4 projects shown everywhere.
3. **Stale slugs in source metadata (not live):** `assets/projects/*/project.json` and `*/source/info.json` contain canonical-style URLs that do not match real routes — e.g. `/projects/babak_sardarb` (real: `shahr-babak-stadium-entrance`), `/projects/pomp-tiran` (real: `tiran-gas-station`), `/projects/mahshahr…`, `/projects/atlas-hotel-shahinshahr` (truncated). These are build/source metadata, **not rendered as links** — data-hygiene risk only.
4. **`specs/0_Sipanel_website_merged_2.json`** contains many `/projects/...` references — design spec, not application code.

## Section E — Sitemap & Search-Engine Exposure

`app/sitemap.ts:52` includes `...Object.values(caseStudyPages).map((p) => p.routes)` ⇒ **all 35 detail pages × 4 locales are in the sitemap**, each with hreflang alternates + `x-default` (lines 55–60), `priority: 0.7`, `changeFrequency: monthly`.

**Consequence:** All 140 pages are crawlable via sitemap, but **31/35 are click-orphans with zero internal inbound links** — the classic "in sitemap, no internal links" pattern that depresses crawl priority / PageRank flow and makes the pages invisible to human navigation.

---

## Recommended Actions (audit only — not implemented)

1. **Make `/projects` index cards clickable** — wrap each `projects-index-card` in a next-intl `<Link href={`/projects/${slug}`}>`. Single highest-impact fix: converts all 31 orphans into reachable pages.
2. **Render the Systems-page case-study `href`** — add the `viewProject` `<Link>` in `service-page-template.tsx`; data already exists (recovers 12 contextual links).
3. **Fix related-studies selection** — replace `slice(0,3)` with relevance-based selection (same system/category) so internal links distribute across all 35 instead of concentrating on 4.
4. **Link homepage case-studies preview cards to their detail pages** (currently link to `/projects`).
5. **Clean stale slugs** in `assets/projects/*/*.json` to match real route slugs.

---

## Appendix — Full Per-Locale Reachability Matrix (140 rows)

| Project | Route | Linked From | Inbound Links | User Reachable? |
|---|---|---|---|---|
| army-hospital | /fa/projects/army-hospital | Homepage Featured + Related (≈34 pages) | ≈140 | Yes |
| army-hospital | /en/projects/army-hospital | Homepage Featured + Related (≈34 pages) | ≈140 | Yes |
| army-hospital | /ar/projects/army-hospital | Homepage Featured + Related (≈34 pages) | ≈140 | Yes |
| army-hospital | /ru/projects/army-hospital | Homepage Featured + Related (≈34 pages) | ≈140 | Yes |
| shahre-babak-hall | /fa/projects/shahre-babak-hall | Related (≈34 pages) | ≈136 | Yes |
| shahre-babak-hall | /en/projects/shahre-babak-hall | Related (≈34 pages) | ≈136 | Yes |
| shahre-babak-hall | /ar/projects/shahre-babak-hall | Related (≈34 pages) | ≈136 | Yes |
| shahre-babak-hall | /ru/projects/shahre-babak-hall | Related (≈34 pages) | ≈136 | Yes |
| sepehan-flower-market | /fa/projects/sepehan-flower-market | Related (≈34 pages) | ≈136 | Yes |
| sepehan-flower-market | /en/projects/sepehan-flower-market | Related (≈34 pages) | ≈136 | Yes |
| sepehan-flower-market | /ar/projects/sepehan-flower-market | Related (≈34 pages) | ≈136 | Yes |
| sepehan-flower-market | /ru/projects/sepehan-flower-market | Related (≈34 pages) | ≈136 | Yes |
| shahr-babak-stadium-entrance | /fa/projects/shahr-babak-stadium-entrance | Related (3 pages only) | ≈12 | Yes |
| shahr-babak-stadium-entrance | /en/projects/shahr-babak-stadium-entrance | Related (3 pages only) | ≈12 | Yes |
| shahr-babak-stadium-entrance | /ar/projects/shahr-babak-stadium-entrance | Related (3 pages only) | ≈12 | Yes |
| shahr-babak-stadium-entrance | /ru/projects/shahr-babak-stadium-entrance | Related (3 pages only) | ≈12 | Yes |
| andimeshk-stadium | /fa/projects/andimeshk-stadium | — (none rendered) | 0 | No (orphan) |
| andimeshk-stadium | /en/projects/andimeshk-stadium | — (none rendered) | 0 | No (orphan) |
| andimeshk-stadium | /ar/projects/andimeshk-stadium | — (none rendered) | 0 | No (orphan) |
| andimeshk-stadium | /ru/projects/andimeshk-stadium | — (none rendered) | 0 | No (orphan) |
| absaar-water-park | /fa/projects/absaar-water-park | — (none rendered) | 0 | No (orphan) |
| absaar-water-park | /en/projects/absaar-water-park | — (none rendered) | 0 | No (orphan) |
| absaar-water-park | /ar/projects/absaar-water-park | — (none rendered) | 0 | No (orphan) |
| absaar-water-park | /ru/projects/absaar-water-park | — (none rendered) | 0 | No (orphan) |
| megaparsmall-atrium | /fa/projects/megaparsmall-atrium | — (none rendered) | 0 | No (orphan) |
| megaparsmall-atrium | /en/projects/megaparsmall-atrium | — (none rendered) | 0 | No (orphan) |
| megaparsmall-atrium | /ar/projects/megaparsmall-atrium | — (none rendered) | 0 | No (orphan) |
| megaparsmall-atrium | /ru/projects/megaparsmall-atrium | — (none rendered) | 0 | No (orphan) |
| mahshahr-taxi-parking | /fa/projects/mahshahr-taxi-parking | — (none rendered) | 0 | No (orphan) |
| mahshahr-taxi-parking | /en/projects/mahshahr-taxi-parking | — (none rendered) | 0 | No (orphan) |
| mahshahr-taxi-parking | /ar/projects/mahshahr-taxi-parking | — (none rendered) | 0 | No (orphan) |
| mahshahr-taxi-parking | /ru/projects/mahshahr-taxi-parking | — (none rendered) | 0 | No (orphan) |
| parand-city-entrance | /fa/projects/parand-city-entrance | — (none rendered) | 0 | No (orphan) |
| parand-city-entrance | /en/projects/parand-city-entrance | — (none rendered) | 0 | No (orphan) |
| parand-city-entrance | /ar/projects/parand-city-entrance | — (none rendered) | 0 | No (orphan) |
| parand-city-entrance | /ru/projects/parand-city-entrance | — (none rendered) | 0 | No (orphan) |
| tabas-railway-facility | /fa/projects/tabas-railway-facility | — (none rendered) | 0 | No (orphan) |
| tabas-railway-facility | /en/projects/tabas-railway-facility | — (none rendered) | 0 | No (orphan) |
| tabas-railway-facility | /ar/projects/tabas-railway-facility | — (none rendered) | 0 | No (orphan) |
| tabas-railway-facility | /ru/projects/tabas-railway-facility | — (none rendered) | 0 | No (orphan) |
| tiran-gas-station | /fa/projects/tiran-gas-station | — (none rendered) | 0 | No (orphan) |
| tiran-gas-station | /en/projects/tiran-gas-station | — (none rendered) | 0 | No (orphan) |
| tiran-gas-station | /ar/projects/tiran-gas-station | — (none rendered) | 0 | No (orphan) |
| tiran-gas-station | /ru/projects/tiran-gas-station | — (none rendered) | 0 | No (orphan) |
| ahvaz-airport-passenger-terminal | /fa/projects/ahvaz-airport-passenger-terminal | — (none rendered) | 0 | No (orphan) |
| ahvaz-airport-passenger-terminal | /en/projects/ahvaz-airport-passenger-terminal | — (none rendered) | 0 | No (orphan) |
| ahvaz-airport-passenger-terminal | /ar/projects/ahvaz-airport-passenger-terminal | — (none rendered) | 0 | No (orphan) |
| ahvaz-airport-passenger-terminal | /ru/projects/ahvaz-airport-passenger-terminal | — (none rendered) | 0 | No (orphan) |
| atlas-hotel-shahinshahr-atrium | /fa/projects/atlas-hotel-shahinshahr-atrium | — (none rendered) | 0 | No (orphan) |
| atlas-hotel-shahinshahr-atrium | /en/projects/atlas-hotel-shahinshahr-atrium | — (none rendered) | 0 | No (orphan) |
| atlas-hotel-shahinshahr-atrium | /ar/projects/atlas-hotel-shahinshahr-atrium | — (none rendered) | 0 | No (orphan) |
| atlas-hotel-shahinshahr-atrium | /ru/projects/atlas-hotel-shahinshahr-atrium | — (none rendered) | 0 | No (orphan) |
| baharestan-prayer-hall | /fa/projects/baharestan-prayer-hall | — (none rendered) | 0 | No (orphan) |
| baharestan-prayer-hall | /en/projects/baharestan-prayer-hall | — (none rendered) | 0 | No (orphan) |
| baharestan-prayer-hall | /ar/projects/baharestan-prayer-hall | — (none rendered) | 0 | No (orphan) |
| baharestan-prayer-hall | /ru/projects/baharestan-prayer-hall | — (none rendered) | 0 | No (orphan) |
| bandar-abbas-mall-atrium-roof | /fa/projects/bandar-abbas-mall-atrium-roof | — (none rendered) | 0 | No (orphan) |
| bandar-abbas-mall-atrium-roof | /en/projects/bandar-abbas-mall-atrium-roof | — (none rendered) | 0 | No (orphan) |
| bandar-abbas-mall-atrium-roof | /ar/projects/bandar-abbas-mall-atrium-roof | — (none rendered) | 0 | No (orphan) |
| bandar-abbas-mall-atrium-roof | /ru/projects/bandar-abbas-mall-atrium-roof | — (none rendered) | 0 | No (orphan) |
| bandar-mahshahr-bus-terminal | /fa/projects/bandar-mahshahr-bus-terminal | — (none rendered) | 0 | No (orphan) |
| bandar-mahshahr-bus-terminal | /en/projects/bandar-mahshahr-bus-terminal | — (none rendered) | 0 | No (orphan) |
| bandar-mahshahr-bus-terminal | /ar/projects/bandar-mahshahr-bus-terminal | — (none rendered) | 0 | No (orphan) |
| bandar-mahshahr-bus-terminal | /ru/projects/bandar-mahshahr-bus-terminal | — (none rendered) | 0 | No (orphan) |
| eftekhar-commercial-office-complex | /fa/projects/eftekhar-commercial-office-complex | — (none rendered) | 0 | No (orphan) |
| eftekhar-commercial-office-complex | /en/projects/eftekhar-commercial-office-complex | — (none rendered) | 0 | No (orphan) |
| eftekhar-commercial-office-complex | /ar/projects/eftekhar-commercial-office-complex | — (none rendered) | 0 | No (orphan) |
| eftekhar-commercial-office-complex | /ru/projects/eftekhar-commercial-office-complex | — (none rendered) | 0 | No (orphan) |
| enghelab-club-padel-center | /fa/projects/enghelab-club-padel-center | — (none rendered) | 0 | No (orphan) |
| enghelab-club-padel-center | /en/projects/enghelab-club-padel-center | — (none rendered) | 0 | No (orphan) |
| enghelab-club-padel-center | /ar/projects/enghelab-club-padel-center | — (none rendered) | 0 | No (orphan) |
| enghelab-club-padel-center | /ru/projects/enghelab-club-padel-center | — (none rendered) | 0 | No (orphan) |
| erbil-eye-hospital-entrance-canopy | /fa/projects/erbil-eye-hospital-entrance-canopy | — (none rendered) | 0 | No (orphan) |
| erbil-eye-hospital-entrance-canopy | /en/projects/erbil-eye-hospital-entrance-canopy | — (none rendered) | 0 | No (orphan) |
| erbil-eye-hospital-entrance-canopy | /ar/projects/erbil-eye-hospital-entrance-canopy | — (none rendered) | 0 | No (orphan) |
| erbil-eye-hospital-entrance-canopy | /ru/projects/erbil-eye-hospital-entrance-canopy | — (none rendered) | 0 | No (orphan) |
| fadak-mall-glass-skylight | /fa/projects/fadak-mall-glass-skylight | — (none rendered) | 0 | No (orphan) |
| fadak-mall-glass-skylight | /en/projects/fadak-mall-glass-skylight | — (none rendered) | 0 | No (orphan) |
| fadak-mall-glass-skylight | /ar/projects/fadak-mall-glass-skylight | — (none rendered) | 0 | No (orphan) |
| fadak-mall-glass-skylight | /ru/projects/fadak-mall-glass-skylight | — (none rendered) | 0 | No (orphan) |
| gonabad-university-sports-hall | /fa/projects/gonabad-university-sports-hall | — (none rendered) | 0 | No (orphan) |
| gonabad-university-sports-hall | /en/projects/gonabad-university-sports-hall | — (none rendered) | 0 | No (orphan) |
| gonabad-university-sports-hall | /ar/projects/gonabad-university-sports-hall | — (none rendered) | 0 | No (orphan) |
| gonabad-university-sports-hall | /ru/projects/gonabad-university-sports-hall | — (none rendered) | 0 | No (orphan) |
| imam-khomeini-airport-hajj-terminal | /fa/projects/imam-khomeini-airport-hajj-terminal | — (none rendered) | 0 | No (orphan) |
| imam-khomeini-airport-hajj-terminal | /en/projects/imam-khomeini-airport-hajj-terminal | — (none rendered) | 0 | No (orphan) |
| imam-khomeini-airport-hajj-terminal | /ar/projects/imam-khomeini-airport-hajj-terminal | — (none rendered) | 0 | No (orphan) |
| imam-khomeini-airport-hajj-terminal | /ru/projects/imam-khomeini-airport-hajj-terminal | — (none rendered) | 0 | No (orphan) |
| kermanshah-industrial-university-petroleum-faculty | /fa/projects/kermanshah-industrial-university-petroleum-faculty | — (none rendered) | 0 | No (orphan) |
| kermanshah-industrial-university-petroleum-faculty | /en/projects/kermanshah-industrial-university-petroleum-faculty | — (none rendered) | 0 | No (orphan) |
| kermanshah-industrial-university-petroleum-faculty | /ar/projects/kermanshah-industrial-university-petroleum-faculty | — (none rendered) | 0 | No (orphan) |
| kermanshah-industrial-university-petroleum-faculty | /ru/projects/kermanshah-industrial-university-petroleum-faculty | — (none rendered) | 0 | No (orphan) |
| maku-convention-hall | /fa/projects/maku-convention-hall | — (none rendered) | 0 | No (orphan) |
| maku-convention-hall | /en/projects/maku-convention-hall | — (none rendered) | 0 | No (orphan) |
| maku-convention-hall | /ar/projects/maku-convention-hall | — (none rendered) | 0 | No (orphan) |
| maku-convention-hall | /ru/projects/maku-convention-hall | — (none rendered) | 0 | No (orphan) |
| marun-petrochemical-visitor-terminal | /fa/projects/marun-petrochemical-visitor-terminal | — (none rendered) | 0 | No (orphan) |
| marun-petrochemical-visitor-terminal | /en/projects/marun-petrochemical-visitor-terminal | — (none rendered) | 0 | No (orphan) |
| marun-petrochemical-visitor-terminal | /ar/projects/marun-petrochemical-visitor-terminal | — (none rendered) | 0 | No (orphan) |
| marun-petrochemical-visitor-terminal | /ru/projects/marun-petrochemical-visitor-terminal | — (none rendered) | 0 | No (orphan) |
| mehrabad-aircraft-hangar | /fa/projects/mehrabad-aircraft-hangar | — (none rendered) | 0 | No (orphan) |
| mehrabad-aircraft-hangar | /en/projects/mehrabad-aircraft-hangar | — (none rendered) | 0 | No (orphan) |
| mehrabad-aircraft-hangar | /ar/projects/mehrabad-aircraft-hangar | — (none rendered) | 0 | No (orphan) |
| mehrabad-aircraft-hangar | /ru/projects/mehrabad-aircraft-hangar | — (none rendered) | 0 | No (orphan) |
| najafabad-university-amphitheater | /fa/projects/najafabad-university-amphitheater | — (none rendered) | 0 | No (orphan) |
| najafabad-university-amphitheater | /en/projects/najafabad-university-amphitheater | — (none rendered) | 0 | No (orphan) |
| najafabad-university-amphitheater | /ar/projects/najafabad-university-amphitheater | — (none rendered) | 0 | No (orphan) |
| najafabad-university-amphitheater | /ru/projects/najafabad-university-amphitheater | — (none rendered) | 0 | No (orphan) |
| payam-industrial-city-ceramic-factory | /fa/projects/payam-industrial-city-ceramic-factory | — (none rendered) | 0 | No (orphan) |
| payam-industrial-city-ceramic-factory | /en/projects/payam-industrial-city-ceramic-factory | — (none rendered) | 0 | No (orphan) |
| payam-industrial-city-ceramic-factory | /ar/projects/payam-industrial-city-ceramic-factory | — (none rendered) | 0 | No (orphan) |
| payam-industrial-city-ceramic-factory | /ru/projects/payam-industrial-city-ceramic-factory | — (none rendered) | 0 | No (orphan) |
| rouzbeh-charity-complex-zanjan | /fa/projects/rouzbeh-charity-complex-zanjan | — (none rendered) | 0 | No (orphan) |
| rouzbeh-charity-complex-zanjan | /en/projects/rouzbeh-charity-complex-zanjan | — (none rendered) | 0 | No (orphan) |
| rouzbeh-charity-complex-zanjan | /ar/projects/rouzbeh-charity-complex-zanjan | — (none rendered) | 0 | No (orphan) |
| rouzbeh-charity-complex-zanjan | /ru/projects/rouzbeh-charity-complex-zanjan | — (none rendered) | 0 | No (orphan) |
| shahrood-azad-university-skylight | /fa/projects/shahrood-azad-university-skylight | — (none rendered) | 0 | No (orphan) |
| shahrood-azad-university-skylight | /en/projects/shahrood-azad-university-skylight | — (none rendered) | 0 | No (orphan) |
| shahrood-azad-university-skylight | /ar/projects/shahrood-azad-university-skylight | — (none rendered) | 0 | No (orphan) |
| shahrood-azad-university-skylight | /ru/projects/shahrood-azad-university-skylight | — (none rendered) | 0 | No (orphan) |
| shalamcheh-border-gate | /fa/projects/shalamcheh-border-gate | — (none rendered) | 0 | No (orphan) |
| shalamcheh-border-gate | /en/projects/shalamcheh-border-gate | — (none rendered) | 0 | No (orphan) |
| shalamcheh-border-gate | /ar/projects/shalamcheh-border-gate | — (none rendered) | 0 | No (orphan) |
| shalamcheh-border-gate | /ru/projects/shalamcheh-border-gate | — (none rendered) | 0 | No (orphan) |
| tarbiat-modares-research-greenhouse | /fa/projects/tarbiat-modares-research-greenhouse | — (none rendered) | 0 | No (orphan) |
| tarbiat-modares-research-greenhouse | /en/projects/tarbiat-modares-research-greenhouse | — (none rendered) | 0 | No (orphan) |
| tarbiat-modares-research-greenhouse | /ar/projects/tarbiat-modares-research-greenhouse | — (none rendered) | 0 | No (orphan) |
| tarbiat-modares-research-greenhouse | /ru/projects/tarbiat-modares-research-greenhouse | — (none rendered) | 0 | No (orphan) |
| tavanir-shahrekord-central-atrium | /fa/projects/tavanir-shahrekord-central-atrium | — (none rendered) | 0 | No (orphan) |
| tavanir-shahrekord-central-atrium | /en/projects/tavanir-shahrekord-central-atrium | — (none rendered) | 0 | No (orphan) |
| tavanir-shahrekord-central-atrium | /ar/projects/tavanir-shahrekord-central-atrium | — (none rendered) | 0 | No (orphan) |
| tavanir-shahrekord-central-atrium | /ru/projects/tavanir-shahrekord-central-atrium | — (none rendered) | 0 | No (orphan) |
| tehran-mall-roof-garden-foodcourt | /fa/projects/tehran-mall-roof-garden-foodcourt | — (none rendered) | 0 | No (orphan) |
| tehran-mall-roof-garden-foodcourt | /en/projects/tehran-mall-roof-garden-foodcourt | — (none rendered) | 0 | No (orphan) |
| tehran-mall-roof-garden-foodcourt | /ar/projects/tehran-mall-roof-garden-foodcourt | — (none rendered) | 0 | No (orphan) |
| tehran-mall-roof-garden-foodcourt | /ru/projects/tehran-mall-roof-garden-foodcourt | — (none rendered) | 0 | No (orphan) |
| toranj-kish-restaurant | /fa/projects/toranj-kish-restaurant | — (none rendered) | 0 | No (orphan) |
| toranj-kish-restaurant | /en/projects/toranj-kish-restaurant | — (none rendered) | 0 | No (orphan) |
| toranj-kish-restaurant | /ar/projects/toranj-kish-restaurant | — (none rendered) | 0 | No (orphan) |
| toranj-kish-restaurant | /ru/projects/toranj-kish-restaurant | — (none rendered) | 0 | No (orphan) |
