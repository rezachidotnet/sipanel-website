# Internal-Link Trace — 4 Target Project Detail Pages

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Mode:** READ-ONLY (no code changed, nothing implemented)
**Targets requested:** `army-hospital`, `shahre-babak-hall`, `sepehan-flower-market`, `mahshahr-taxi-parking`
**Method:** Traced the only two link-emitting components (`components/home/featured-project.tsx`, `components/case-studies/case-study-page-template.tsx`) + the related-studies generator in `lib/case-studies/case-study-pages.ts`, then verified with repo-wide grep for any hardcoded/manual links.

---

## ⚠️ Premise Correction (read first)

The request assumes all four targets "currently receive internal links." **That is true for only three of them.**

- **`mahshahr-taxi-parking` receives ZERO internal links — it is a click-orphan.** It is reachable only by direct URL / sitemap / search engine.
- The genuine 4th internally-linked page is **`shahr-babak-stadium-entrance`** (not requested), which receives links from 3 detail pages.
- A newly-confirmed wrinkle: **`andimeshk-stadium` is the only project that overrides its related set** via `relatedSlugs: ['shahre-babak-hall', 'tabas-railway-facility', 'gonabad-university-sports-hall']`. This means **`tabas-railway-facility` and `gonabad-university-sports-hall` each receive exactly 1 internal link** — they are not full orphans either.

## How detail-page links are generated (verified)

Only **two** components render a clickable `<Link>` to a detail page (both use next-intl `Link` → locale-safe, auto-prefixed):

1. `components/home/featured-project.tsx:120` → hardcoded `href="/projects/army-hospital"` (Featured Project).
2. `components/case-studies/case-study-page-template.tsx:569` → renders each item of `content.relatedCaseStudies.items` (Related Project).

The related set is built in `case-study-pages.ts:1442`:
```js
const relatedSource = config.relatedSlugs
  ? config.relatedSlugs.map(find).filter(exists)          // explicit override (only andimeshk-stadium)
  : initialCaseStudies.filter(s => s.slug !== self).slice(0, 3);  // default = first 3 of the array
```
- **Default trio (array positions 1–3): `army-hospital`, `shahre-babak-hall`, `sepehan-flower-market`.**
- Array order positions 1–8: army-hospital(1), shahre-babak-hall(2), sepehan-flower-market(3), shahr-babak-stadium-entrance(4), andimeshk-stadium(5), absaar-water-park(6), megaparsmall-atrium(7), **mahshahr-taxi-parking(8)**.
- Because `mahshahr-taxi-parking` is position 8, it is **never** in any page's first-3 and is not named in the one override → **0 inbound links.**

The `/projects` index cards have **no anchors**, and the Systems-page case-study `href`s are **never rendered** (confirmed in prior link audit) — so neither contributes any link to these pages.

---

## A. Link Trace Per Project

### army-hospital — 34 unique source pages
| Target Project | Source Page | Source Route | Component/File | Link Type |
|---|---|---|---|---|
| army-hospital | Homepage | `/{locale}` | `components/home/featured-project.tsx:120` | **Featured Project** (manual/hardcoded) |
| army-hospital | shahre-babak-hall (detail) | `/{locale}/projects/shahre-babak-hall` | `case-study-page-template.tsx:569` | Related Project (dynamic) |
| army-hospital | sepehan-flower-market (detail) | `/{locale}/projects/sepehan-flower-market` | `case-study-page-template.tsx:569` | Related Project (dynamic) |
| army-hospital | **31 detail pages** using the default trio (all projects except `army-hospital` self, `shahre-babak-hall`, `sepehan-flower-market`, and `andimeshk-stadium`) | `/{locale}/projects/{slug}` | `case-study-page-template.tsx:569` | Related Project (dynamic) |

Inbound detail-page sources: **33** (×4 locales = 132 instances) **+ Homepage** (×4 = 4). NOT linked from itself or from `andimeshk-stadium`.

### shahre-babak-hall — 34 unique source pages
| Target Project | Source Page | Source Route | Component/File | Link Type |
|---|---|---|---|---|
| shahre-babak-hall | army-hospital (detail) | `/{locale}/projects/army-hospital` | `case-study-page-template.tsx:569` | Related Project |
| shahre-babak-hall | sepehan-flower-market (detail) | `/{locale}/projects/sepehan-flower-market` | `case-study-page-template.tsx:569` | Related Project |
| shahre-babak-hall | **andimeshk-stadium** (detail) | `/{locale}/projects/andimeshk-stadium` | `case-study-pages.ts:488` (`relatedSlugs`) → template:569 | Related Project (**explicit override**) |
| shahre-babak-hall | **31 default-trio detail pages** (all except `shahre-babak-hall` self) | `/{locale}/projects/{slug}` | `case-study-page-template.tsx:569` | Related Project |

Inbound detail-page sources: **34** (×4 locales = 136 instances). No homepage link. *Most-linked page in the entire site.*

### sepehan-flower-market — 33 unique source pages
| Target Project | Source Page | Source Route | Component/File | Link Type |
|---|---|---|---|---|
| sepehan-flower-market | army-hospital (detail) | `/{locale}/projects/army-hospital` | `case-study-page-template.tsx:569` | Related Project |
| sepehan-flower-market | shahre-babak-hall (detail) | `/{locale}/projects/shahre-babak-hall` | `case-study-page-template.tsx:569` | Related Project |
| sepehan-flower-market | **31 default-trio detail pages** (all except `sepehan-flower-market` self) | `/{locale}/projects/{slug}` | `case-study-page-template.tsx:569` | Related Project |

Inbound detail-page sources: **33** (×4 locales = 132 instances). No homepage link. NOT linked from `andimeshk-stadium`.

### mahshahr-taxi-parking — 0 source pages (ORPHAN)
| Target Project | Source Page | Source Route | Component/File | Link Type |
|---|---|---|---|---|
| mahshahr-taxi-parking | — | — | — | **None — no internal link exists anywhere** |

Verified: not in the default trio (position 8), not in the one `relatedSlugs` override, not hardcoded anywhere, `/projects` cards have no anchors, Systems-page `href` to it is never rendered. **Inbound links = 0.**

---

## B. Reachability Map

```
Homepage  (/{locale})
└── army-hospital                         [Featured Project — only entry point into the graph]
     └── Related Projects:
          ├── shahre-babak-hall
          ├── sepehan-flower-market
          └── shahr-babak-stadium-entrance     (← not in the requested 4, but real)

shahre-babak-hall
└── Related Projects:
     ├── army-hospital
     ├── sepehan-flower-market
     └── shahr-babak-stadium-entrance

sepehan-flower-market
└── Related Projects:
     ├── army-hospital
     ├── shahre-babak-hall
     └── shahr-babak-stadium-entrance

(every other detail page)
└── Related Projects:
     ├── army-hospital
     ├── shahre-babak-hall
     └── sepehan-flower-market

andimeshk-stadium   [the ONE exception — relatedSlugs override]
└── Related Projects:
     ├── shahre-babak-hall
     ├── tabas-railway-facility      (← its only inbound link)
     └── gonabad-university-sports-hall  (← its only inbound link)

mahshahr-taxi-parking
└── (UNREACHABLE by any click — sitemap / direct URL / search engine only)
```

**Click-reachable-from-Homepage set:** `{ army-hospital, shahre-babak-hall, sepehan-flower-market, shahr-babak-stadium-entrance }` — a closed 4-node loop. No click path leaves this loop to reach `mahshahr-taxi-parking` (or any of the other 28 orphans).

---

## C. Source Files & Components

| File | Role | Lines |
|---|---|---|
| `components/home/featured-project.tsx` | Homepage Featured Project link → `army-hospital` only | 120 |
| `components/case-studies/case-study-page-template.tsx` | Renders Related Projects (`relatedCaseStudies.items`) as `<Link>` | 168–173, 541, 568–571 |
| `lib/case-studies/case-study-pages.ts` | Builds the related set (`relatedSource`) — default `slice(0,3)` or `relatedSlugs` override | 1442–1459 |
| `lib/case-studies/case-study-pages.ts` | The single `relatedSlugs` override (on `andimeshk-stadium`) | 488 |

Components that do **not** link to these pages (verified): `/projects` index (`app/[locale]/projects/page.tsx` — no card anchors), all Systems pages (`lib/services/*` + `components/services/service-page-template.tsx` — `href` never rendered), About page, Resources pages, navigation/header/footer, homepage case-studies preview (links to `/projects` only).

---

## D. Per-Project Reachability Answers

| Reachable from… | army-hospital | shahre-babak-hall | sepehan-flower-market | mahshahr-taxi-parking |
|---|---|---|---|---|
| Homepage? | ✅ (Featured Project) | ❌ | ❌ | ❌ |
| Projects listing page? | ❌ (no card anchors) | ❌ | ❌ | ❌ |
| Systems pages? | ❌ (href not rendered) | ❌ | ❌ | ❌ |
| Another project detail page? | ✅ (33 pages) | ✅ (34 pages) | ✅ (33 pages) | ❌ (0 pages) |
| Search engines only? | No (also click-reachable) | Yes — *only* via another detail page | Yes — *only* via another detail page | **Yes — exclusively** |

---

## E. Surprising Findings

1. **`mahshahr-taxi-parking` is a true orphan** — despite being named in the request as "linked," it has **zero** inbound internal links. It can only be reached by typing the URL or via Google.
2. **`shahre-babak-hall` is the most-linked page on the entire site** (34 source detail pages), edging out `army-hospital` — purely because it sits at array position 2 *and* is the only page named in the one `relatedSlugs` override.
3. **The `relatedSlugs` override exists but is used exactly once** (`andimeshk-stadium`). It is the *only* place `tabas-railway-facility` and `gonabad-university-sports-hall` receive any internal link — one each.
4. **Only `army-hospital` is an entry point.** The four click-reachable pages form a closed loop; the single door into that loop is the homepage Featured Project. Remove that one link and *all* detail pages become unreachable by click.
5. **"Related" is not relevance-based** — it's array-order (`slice(0,3)`), so 31 of 35 pages show the identical trio regardless of system or sector.

---

## F. Verification — No Hidden Links

- Repo-wide grep for `/projects/{slug}` literals across `.tsx/.ts/.json/.md` (excluding the data layer, specs, and audit docs): the **only** hardcoded rendered link found is `featured-project.tsx:120 → army-hospital`. No manual/rich-text/markdown/JSON links to any of the four targets.
- Related links are **dynamic** (generated from `relatedSource`), so counts are derived from the verified array order + the single override — not from literal grep.
- `/projects` index card-level links: **none** (confirmed).

| Target | Total incoming links (unique source pages) | ×4 locales (instances) | Dynamic or static |
|---|---|---|---|
| army-hospital | 34 (33 detail + 1 homepage) | 136 | 132 dynamic + 4 static |
| shahre-babak-hall | 34 (detail only) | 136 | dynamic |
| sepehan-flower-market | 33 (detail only) | 132 | dynamic |
| mahshahr-taxi-parking | **0** | 0 | — |

---

## Final User-Journey Analysis

- **The only real user journey into project detail pages is:** Homepage → *(Featured Project button)* → **army-hospital** → *(Related Projects)* → `shahre-babak-hall` / `sepehan-flower-market` / `shahr-babak-stadium-entrance` → and back among those same four. It is a **closed 4-page loop with a single entrance.**
- **`army-hospital`, `shahre-babak-hall`, `sepehan-flower-market`** are genuinely reachable — but only `army-hospital` is reachable *directly*; the other two require a user to first land on a detail page and click "Related Projects."
- **`mahshahr-taxi-parking` has no user click-path at all.** A real user cannot reach it by clicking anywhere on the site. It exists for search engines and direct links only.
- **Practical implication:** of the four requested pages, three are reachable only through a niche related-projects loop that itself depends on one homepage button, and the fourth is unreachable by click entirely. None sit on a primary navigation path.
