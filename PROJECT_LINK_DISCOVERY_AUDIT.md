# Complete Project-Detail-Page Link Discovery Audit

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Mode:** READ-ONLY (no code changed, nothing implemented)
**Goal:** Find every internal link to a project detail page — including links hidden inside *content* (resources, guides, rich text) that component-focused audits missed.

---

## 🔴 Headline: The previous audits missed an entire link source

**Resource detail pages link to project detail pages — in two places — and these links are real, rendered, and locale-safe.**

They were missed because **neither content file contains a literal `/projects/<slug>` string**:

- `lib/resources/engineering-resource-hub.ts:1836` builds the href as a **template literal** → `href: \`/projects/${projectSlug}\`` (slug is a variable, so a slug grep never matches it).
- `lib/insights/engineering-insights.ts` links to bare **`/projects`** (the index, no slug) — also invisible to a `/projects/<slug>` grep.

Both files reference project slugs only inside data maps (`relatedProjectSlugs`, `resourceRelatedProjects`), which read like config, not links — so prior passes treated them as data, not navigation.

---

## How resource → project links are generated & rendered (verified)

**Data** — `lib/resources/engineering-resource-hub.ts:393` maps each resource to project slugs:
```js
const resourceRelatedProjects = {
  roof_leakage_prevention_checklist: ['shahre-babak-hall', 'andimeshk-stadium'],
  sandwich_panel_selection_guide:    ['tabas-railway-facility', 'mahshahr-taxi-parking', 'tiran-gas-station'],
  shop_drawing_review_guide:         ['sepehan-flower-market', 'absaar-water-park'],
  standing_seam_roof_detail_notes:   ['shahre-babak-hall', 'megaparsmall-atrium'],
  aluminium_cladding_layout_checklist:['shahr-babak-stadium-entrance', 'parand-city-entrance'],
  mto_procurement_planning_sheet:    ['andimeshk-stadium', 'tabas-railway-facility'],
};
```
**Resolver** — `engineering-resource-hub.ts:1824-1841` resolves each slug via `getCaseStudyPageData()` (drops any missing — all 10 exist) and sets `href: /projects/${projectSlug}`.

**Render** — `components/resources/resource-detail-page-template.tsx`:
- **Line 427** — card grid: `page.relatedProjects.map(project => <Link href={project.href} className="resource-project-card">)` → **every** related project rendered as a clickable card.
- **Line 95** — inline rich-text: `ResourceContextLinks` renders `relatedProjects[0]` as `<Link href={project.href}>{project.name}</Link>` inside a prose paragraph → the **first** related project gets an additional inline link.

Both use next-intl `Link` (from `@/i18n/routing`) with an unprefixed href → auto-prefixed per locale → **locale-safe**. Resource detail route exists: `app/[locale]/resources/[slug]/page.tsx` (uses `ResourceDetailPageTemplate`); resource slug = `id.replaceAll('_','-')` (line 1413).

---

## A. Full Link Inventory — all rendered links to project detail pages

### Source 1 — Homepage (previously known)
| Project | Source Page | Source Route | Link Location | File | Classification |
|---|---|---|---|---|---|
| army-hospital | Homepage | `/{locale}` | Featured-project CTA button | `components/home/featured-project.tsx:120` | CTA link (manual) |

### Source 2 — Resource detail pages (★ NEWLY DISCOVERED)
| Project | Source Page (resource) | Source Route | Link Location | File | Classification |
|---|---|---|---|---|---|
| shahre-babak-hall | Roof Leakage Prevention Checklist | `/{locale}/resources/roof-leakage-prevention-checklist` | inline prose **+** related-projects card | template `:95` & `:427`; data hub `:394` | Rich text link **+** Resource card link |
| andimeshk-stadium | Roof Leakage Prevention Checklist | `/{locale}/resources/roof-leakage-prevention-checklist` | related-projects card | template `:427`; hub `:394` | Resource card link |
| tabas-railway-facility | Sandwich Panel Selection Guide | `/{locale}/resources/sandwich-panel-selection-guide` | inline prose **+** card | template `:95` & `:427`; hub `:395` | Rich text link **+** Resource card link |
| mahshahr-taxi-parking | Sandwich Panel Selection Guide | `/{locale}/resources/sandwich-panel-selection-guide` | related-projects card | template `:427`; hub `:395` | Resource card link |
| tiran-gas-station | Sandwich Panel Selection Guide | `/{locale}/resources/sandwich-panel-selection-guide` | related-projects card | template `:427`; hub `:395` | Resource card link |
| sepehan-flower-market | Shop Drawing Review Guide | `/{locale}/resources/shop-drawing-review-guide` | inline prose **+** card | template `:95` & `:427`; hub `:396` | Rich text link **+** Resource card link |
| absaar-water-park | Shop Drawing Review Guide | `/{locale}/resources/shop-drawing-review-guide` | related-projects card | template `:427`; hub `:396` | Resource card link |
| shahre-babak-hall | Standing Seam Roof Detail Notes | `/{locale}/resources/standing-seam-roof-detail-notes` | inline prose **+** card | template `:95` & `:427`; hub `:397` | Rich text link **+** Resource card link |
| megaparsmall-atrium | Standing Seam Roof Detail Notes | `/{locale}/resources/standing-seam-roof-detail-notes` | related-projects card | template `:427`; hub `:397` | Resource card link |
| shahr-babak-stadium-entrance | Aluminium Cladding Layout Checklist | `/{locale}/resources/aluminium-cladding-layout-checklist` | inline prose **+** card | template `:95` & `:427`; hub `:398` | Rich text link **+** Resource card link |
| parand-city-entrance | Aluminium Cladding Layout Checklist | `/{locale}/resources/aluminium-cladding-layout-checklist` | related-projects card | template `:427`; hub `:398` | Resource card link |
| andimeshk-stadium | MTO Procurement Planning Sheet | `/{locale}/resources/mto-procurement-planning-sheet` | inline prose **+** card | template `:95` & `:427`; hub `:399` | Rich text link **+** Resource card link |
| tabas-railway-facility | MTO Procurement Planning Sheet | `/{locale}/resources/mto-procurement-planning-sheet` | related-projects card | template `:427`; hub `:399` | Resource card link |

### Source 3 — Project detail pages, "Related Projects" (previously known)
| Project (target) | Source Page | Source Route | Link Location | File | Classification |
|---|---|---|---|---|---|
| army-hospital | 33 detail pages (default trio) | `/{locale}/projects/{slug}` | Related-projects section | `case-study-page-template.tsx:569` | Related project link (dynamic) |
| shahre-babak-hall | 34 detail pages | `/{locale}/projects/{slug}` | Related-projects section | `:569` | Related project link |
| sepehan-flower-market | 33 detail pages | `/{locale}/projects/{slug}` | Related-projects section | `:569` | Related project link |
| shahr-babak-stadium-entrance | 3 detail pages (army/shahre/sepehan) | `/{locale}/projects/{slug}` | Related-projects section | `:569` | Related project link |
| tabas-railway-facility | andimeshk-stadium (relatedSlugs override) | `/{locale}/projects/andimeshk-stadium` | Related-projects section | hub `case-study-pages.ts:488` → `:569` | Related project link (override) |
| gonabad-university-sports-hall | andimeshk-stadium (relatedSlugs override) | `/{locale}/projects/andimeshk-stadium` | Related-projects section | `:488` → `:569` | Related project link (override) |

### NOT a detail link (clarification)
| Reference | Target | File | Note |
|---|---|---|---|
| Engineering Insights "Project Proof" | `/projects` (**index, not a detail page**) | `lib/insights/engineering-insights.ts:177,247,317` | Rich-text/CTA link to the listing only — does **not** reach any detail page |
| Resource hub "Project Proof" | `/#case-studies-preview` (homepage anchor) | `engineering-resource-hub.ts:1731` | Anchor, not a detail link |

---

## B. "Links Missed by the Previous Audit"

The component-focused audits (`PROJECT_LINK_AUDIT.md`, `PROJECT_LINK_TRACE_AUDIT.md`) reported only **homepage + related-projects** links. They missed **all resource-content links**. The following project detail pages are reachable via **Resources → resource detail → related project** and were previously mis-classified:

**10 project detail pages are linked from resource content:**
`shahre-babak-hall`, `andimeshk-stadium`, `tabas-railway-facility`, `mahshahr-taxi-parking`, `tiran-gas-station`, `sepehan-flower-market`, `absaar-water-park`, `megaparsmall-atrium`, `shahr-babak-stadium-entrance`, `parand-city-entrance`.

**7 of these were previously declared ORPHANS** and are in fact reachable:
| Project | Previously | Actually linked from |
|---|---|---|
| andimeshk-stadium | orphan | Roof Leakage Checklist + MTO Planning Sheet (card + inline) |
| tabas-railway-facility | orphan | Sandwich Panel Guide (card+inline) + MTO Sheet (card) + andimeshk related |
| mahshahr-taxi-parking | orphan | Sandwich Panel Selection Guide (card) |
| tiran-gas-station | orphan | Sandwich Panel Selection Guide (card) |
| absaar-water-park | orphan | Shop Drawing Review Guide (card) |
| megaparsmall-atrium | orphan | Standing Seam Roof Detail Notes (card) |
| parand-city-entrance | orphan | Aluminium Cladding Layout Checklist (card) |

Plus `gonabad-university-sports-hall` (previously orphan) is reachable via the `andimeshk-stadium` related override.

---

## C. Corrected Reachability — full picture

**Reachable project detail pages: 13** (up from the 4 reported earlier)

| # | Project | Reachable via |
|---|---|---|
| 1 | army-hospital | Homepage CTA + related loop |
| 2 | shahre-babak-hall | Related loop + 2 resources |
| 3 | sepehan-flower-market | Related loop + 1 resource |
| 4 | shahr-babak-stadium-entrance | Related loop + 1 resource |
| 5 | andimeshk-stadium | 2 resources |
| 6 | tabas-railway-facility | 2 resources + andimeshk related |
| 7 | mahshahr-taxi-parking | 1 resource |
| 8 | tiran-gas-station | 1 resource |
| 9 | absaar-water-park | 1 resource |
| 10 | megaparsmall-atrium | 1 resource |
| 11 | parand-city-entrance | 1 resource |
| 12 | gonabad-university-sports-hall | andimeshk related override |
| 13 | shahre-babak-stadium… (counted above) | — |

(Items 2–4 overlap the related loop and resources; #13 is `shahr-babak-stadium-entrance`, already listed as #4.)

**Net: 12 unique project detail pages are now confirmed reachable** (army-hospital, shahre-babak-hall, sepehan-flower-market, shahr-babak-stadium-entrance, andimeshk-stadium, tabas-railway-facility, mahshahr-taxi-parking, tiran-gas-station, absaar-water-park, megaparsmall-atrium, parand-city-entrance, gonabad-university-sports-hall).

**Still orphaned: 23 of 35** — all 17 flagship/other projects NOT listed above, including notably `ahvaz-airport-passenger-terminal`, `erbil-eye-hospital-entrance-canopy`, `imam-khomeini-airport-hajj-terminal`, `marun-petrochemical-visitor-terminal`, `mehrabad-aircraft-hangar`, `atlas-hotel-shahinshahr-atrium`, `fadak-mall-glass-skylight`, `kermanshah-…-petroleum-faculty`, `bandar-abbas-mall-atrium-roof`, `bandar-mahshahr-bus-terminal`, `baharestan-prayer-hall`, `eftekhar-…`, `enghelab-…`, `maku-…`, `najafabad-…`, `payam-…`, `rouzbeh-…`, `shahrood-…`, `shalamcheh-…`, `tarbiat-…`, `tavanir-…`, `tehran-mall-…`, `toranj-kish-restaurant`.

> ⚠️ Notable: **none of the 6 ROI-flagship projects** (erbil, IKA airport, marun, mehrabad, tabas… ) are linked from resources **except `tabas-railway-facility`**. The resource links favor smaller projects.

---

## D. Sources Audited — and their verdict

| Source class | File(s) | Links to detail pages? |
|---|---|---|
| Homepage featured | `components/home/featured-project.tsx` | ✅ army-hospital (CTA) |
| Homepage case-studies preview | `components/home/case-studies-preview.tsx` | ❌ `/projects` index only |
| Projects listing | `app/[locale]/projects/page.tsx` | ❌ cards have no anchors; slug only in JSON-LD |
| Systems pages | `lib/services/*.ts`, `components/services/service-page-template.tsx` | ❌ `href` defined but never rendered |
| About page | `lib/about/about-page.ts` | ❌ image import only |
| **Resources — detail pages** | `lib/resources/engineering-resource-hub.ts`, `components/resources/resource-detail-page-template.tsx` | ✅ **10 projects (card + inline rich text)** |
| Resources — hub/landing | `engineering-resource-hub.ts:1731` | ❌ `/#case-studies-preview` anchor |
| Engineering guides / insights | `lib/insights/engineering-insights.ts` | ❌ `/projects` index only |
| Process / engineering-process sections | (within service templates) | ❌ none |
| FAQ | `lib/faq/faq-page.ts` | ❌ links to `/systems`, `/resources` only |
| SEO landing pages | `lib/seo/seo-landing-pages.ts` | ❌ none to detail |
| Related projects (case study) | `case-study-page-template.tsx` + `case-study-pages.ts` | ✅ loop of 6 targets (incl. relatedSlugs override) |
| Translation files | `messages/{en,fa,ar,ru}.json` | ❌ contain no hrefs at all |
| Markdown / MDX | none with project links (only `army-hospital/video-editing-plan.md` = a shell-command path, not a web link) | ❌ |
| JSON content | `assets/projects/*/{project,info}.json` | ❌ source metadata (stale canonical strings), never rendered |
| Build scripts / specs | `scripts/import-projects.py`, `specs/*.json` | ❌ not shipped to users |

---

## E. Final Definitive Internal-Link Map (all detail pages)

```
Homepage ─── CTA ──▶ army-hospital
                       └─ Related loop ⇄ { shahre-babak-hall, sepehan-flower-market,
                                            shahr-babak-stadium-entrance }

Resources (index) ─▶ Resource detail page ─── card + inline rich-text ──▶ project detail:
   roof-leakage-prevention-checklist   ─▶ shahre-babak-hall*, andimeshk-stadium
   sandwich-panel-selection-guide      ─▶ tabas-railway-facility*, mahshahr-taxi-parking, tiran-gas-station
   shop-drawing-review-guide           ─▶ sepehan-flower-market*, absaar-water-park
   standing-seam-roof-detail-notes     ─▶ shahre-babak-hall*, megaparsmall-atrium
   aluminium-cladding-layout-checklist ─▶ shahr-babak-stadium-entrance*, parand-city-entrance
   mto-procurement-planning-sheet      ─▶ andimeshk-stadium*, tabas-railway-facility
                                          ( * = also gets the inline rich-text link )

Project detail (andimeshk-stadium, relatedSlugs override)
   └─ Related ─▶ shahre-babak-hall, tabas-railway-facility, gonabad-university-sports-hall

NOT detail links:  Engineering Insights "Project Proof" ─▶ /projects (index)
                   Resource hub "Project Proof" ─▶ /#case-studies-preview
```

**Confirmed totals**
- Project detail pages with ≥1 internal link: **12 / 35**
- New pages discovered reachable (vs. prior audits): **8** (andimeshk-stadium, tabas-railway-facility, mahshahr-taxi-parking, tiran-gas-station, absaar-water-park, megaparsmall-atrium, parand-city-entrance, gonabad-university-sports-hall)
- Distinct content-link sources missed before: **resource detail pages (6 resources → 10 projects), via card + inline rich-text**
- Still orphaned: **23 / 35**
- Why missed: href is a **template literal** `/projects/${projectSlug}`, never a literal slug string — invisible to slug-based grep; the slugs live in `relatedProjectSlugs` data maps that read as config.
