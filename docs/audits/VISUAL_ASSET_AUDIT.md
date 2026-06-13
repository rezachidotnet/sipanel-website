# Full Website Visual Asset Audit

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Mode:** READ-ONLY (no code changed, nothing fixed)
**Method:** Traced every route's image-rendering path through its component + data layer, verified asset files on disk, and confirmed locale behaviour. Findings reflect what is actually *rendered*, not just what exists in data.

---

# Executive Summary

| Metric | Value |
| --- | --- |
| Unique route templates audited | 16 |
| Total page instances (× 4 locales) | ~336 |
| Locales covered | fa, en, ar, ru (all) |
| Reusable image components audited | 15 |
| Distinct image assets present in repo | ~250 webp/jpg (homepage, systems, resources, 35 projects, 14 logos) |
| **Missing / not-rendered images (page-instances)** | **OG image: all ~336 · resource-detail hero: 24 · solutions visuals: ~92 · project proof galleries: 140** |
| **Placeholder graphics in use** | ResourcePreviewGraphic (24), service-technical-placeholder (systems + solutions), projects-index-hero (CSS), case-study pending proof (140) |
| **Broken / dead references** | `/images/projects/*` in 34 `info.json` (not rendered); `tabas` folder/slug mismatch |
| Alt-text coverage | 29/29 `<Image>` have `alt` ✓ (no missing alt) |
| Locale-specific image divergence | None (images are locale-agnostic; only alt text is localized) ✓ |

**One-line verdict:** The homepage, systems index, and `/resources` index are well-imaged. The serious gaps are: **(1) no social/OG image anywhere, (2) resource *detail* pages hide their real preview image behind a generic graphic, (3) all four systems share the same three generic technical images, (4) 23 solutions pages and 35 project proof galleries render placeholders, and (5) several hero images are borrowed from unrelated projects.**

---

# Critical Issues

### C1 — No social-sharing / OG image on any page (site-wide)
- **Severity:** HIGH
- **URL:** every route, every locale (e.g. `/en`, `/fa/resources/...`, `/en/projects/army-hospital`)
- **Component/File:** `lib/seo/metadata.ts:48` — `openGraph` block has **no `images:` field**; `twitter.card` is `summary_large_image` but no image supplied. No OG image file exists in `public/`.
- **Current state:** Pages shared on LinkedIn / WhatsApp / X render with no preview image.
- **Recommended image:** A branded 1200×630 OG template per section (default SIPANEL industrial-envelope hero; per-page override for flagship projects).

### C2 — Resource detail hero shows a generic CSS graphic, not the real preview image
- **Severity:** HIGH (Resources = highest priority per scope)
- **URL:** all 6 × 4 = 24 pages, e.g. `/en/resources/roof-leakage-prevention-checklist`
- **Component:** `components/resources/resource-detail-page-template.tsx:222` renders `<ResourcePreviewGraphic>` (3 empty `<span>` bars + a label, lines 62–72) in the hero visual slot.
- **Current state:** The real preview webp (`assets/resources/<slug>.webp`, **all 6 exist** and ARE shown on the `/resources` index cards) is **never rendered on the detail page**. The detail hero is an abstract placeholder.
- **Recommended image:** Use the existing per-resource preview webp as the detail hero; see RESOURCE IMAGE DEFICIENCIES.

### C3 — All four systems pages share the same three generic technical images
- **Severity:** HIGH
- **URL:** `/en/systems/{sandwich-panel-systems, standing-seam-zip-tech-roofing, aluminium-cladding-covering, daylighting-transparent-roofing}` × 4 locales
- **Component:** `components/services/service-page-template.tsx` technicalProof grid; data in `lib/services/*.ts`.
- **Current state:** Every system's "technical proof" gallery renders the **identical** `shop-drawings-main.webp`, `gutter-flashing-desktop.webp`, `bom-mto-preview.webp`. The polycarbonate/daylighting page shows the same shop-drawing and gutter-flashing images as the sandwich-panel page — **images do not match the system described.**
- **Recommended image:** System-specific technical visuals (e.g. polycarbonate glazing detail for daylighting; standing-seam clip/seam detail for ZIP roofing).

### C4 — 35 project proof galleries render placeholders
- **Severity:** HIGH
- **URL:** all `/{locale}/projects/[slug]` (140 instances)
- **Component:** `components/case-studies/case-study-page-template.tsx` — `buildPendingProofItems` placeholders when `technicalProofGallery.items` is empty (true for all 35).
- **Current state:** No project has real shop-drawings / installation / detail-callout proof images wired; galleries show "pending" placeholders. (Confirmed in `FLAGSHIP_ASSET_READINESS_AUDIT.md`.)

---

# RESOURCE IMAGE DEFICIENCIES

`/resources` **index** is healthy: hero (`resources-hero.webp` ✓), 6 featured-resource cards each render their preview webp ✓, lead-capture visual (`lead-capture-preview.webp` ✓).

`/resources/[slug]` **detail** pages — one entry per resource. All share the same two defects: **(a) hero shows generic graphic instead of the existing preview image (C2), (b) no social/OG image (C1).** No detail page has a wrong-topic image — the correct image exists, it is simply not rendered.

| Resource (en URL `/en/resources/…`) | Preview asset on disk | Rendered on detail hero? | Thumbnail (index) | Social/OG | Deficiency |
| --- | --- | --- | --- | --- | --- |
| `roof-leakage-prevention-checklist` | ✅ 160K | ❌ generic graphic | ✅ | ❌ | C2 + C1 |
| `sandwich-panel-selection-guide` | ✅ 100K | ❌ generic graphic | ✅ | ❌ | C2 + C1 |
| `shop-drawing-review-guide` | ✅ 92K | ❌ generic graphic | ✅ | ❌ | C2 + C1 |
| `standing-seam-roof-detail-notes` | ✅ 80K | ❌ generic graphic | ✅ | ❌ | C2 + C1 |
| `aluminium-cladding-layout-checklist` | ✅ 72K | ❌ generic graphic | ✅ | ❌ | C2 + C1 |
| `mto-procurement-planning-sheet` | ✅ 124K | ❌ generic graphic | ✅ | ❌ | C2 + C1 |

**Per-resource recommended detail-hero subject (use existing preview, or upgrade to):**
- roof-leakage: close-up of standing-seam roof flashing inspection with engineer reviewing detail.
- sandwich-panel: panel-selection layout sheet beside an installed sandwich-panel wall.
- shop-drawing: marked-up shop drawing on screen next to fabricated panel.
- standing-seam: concealed-clip seam detail on a long-run metal roof.
- aluminium-cladding: facade fixing/joint layout with aluminium cassette panels.
- mto-procurement: BOM/MTO sheet with trims, fasteners, flashings laid out.

---

# Systems Image Deficiencies

| System (`/en/systems/…`) | Hero visual | Technical-proof images | Case-study card images | Issue |
| --- | --- | --- | --- | --- |
| sandwich-panel-systems | ✅ `sandwich-panel/hero-desktop.webp` | ⚠ shared 3 generic (C3) | ✅ army/tabas/mahshahr | C3; case-study cards not clickable |
| standing-seam-zip-tech-roofing | ✅ dedicated hero | ⚠ shared 3 generic (C3) | ✅ | C3 |
| aluminium-cladding-covering | ⚠ reuses `cover-desktop.webp` (not a dedicated hero) | ⚠ shared 3 generic (C3) | ✅ | C3 + generic hero |
| daylighting-transparent-roofing | ✅ dedicated cover | ⚠ shared 3 generic (C3) | ✅ | C3 (worst mismatch — polycarbonate page shows panel/gutter images) |

- **Missing across all systems:** real per-system **installation / execution photos** (technical-proof section reuses the same 3 generic technical assets; no site-execution imagery).
- **Severity:** HIGH (C3), LOW (aluminium hero reuse).
- **Recommended:** one execution photo + one system-specific technical detail per system.
- **Systems index** `/en/systems`: hero + 4 system covers (desktop+mobile) all present ✓ — no issue.

---

# Project Image Deficiencies

| Aspect | State |
| --- | --- |
| Hero (card/hero) | ✅ present for all 35 (army-hospital = video) |
| Proof gallery | ❌ placeholder/pending for all 35 (C4) |
| Related-project card | ⚠ `army-hospital` has **no `cardImage`** → related card shows placeholder (MEDIUM) |
| Source photos | ⚠ typically a single before/after pair per project; **`imam-khomeini-airport` (1280×960)** and **`mehrabad-aircraft-hangar` (1024×768)** are low-res (MEDIUM) |
| Drone footage | only `tabas` (one 4032×3024 still) |
| Folder/slug | ⚠ `tabas` folder vs `tabas-railway-facility` slug mismatch; `project.json` references `tabas-installation.webp` + `tabas-technical-detail.webp` that **do not exist** (LOW) |
| Dead refs | 34 `info.json` reference `/images/projects/<slug>/*.webp` but `public/images/` is **empty** — not rendered (LOW) |

- **Reused/borrowed imagery:** none *within* project pages, but see About (A1) — the About story hero borrows `andimeshk` project imagery.
- **Recommended:** wire real proof galleries (C4); re-shoot/upscale IKA airport + Mehrabad; add an `army-hospital` card image.

---

# Homepage Issues

The homepage is the **best-imaged** area — all sections have real, on-disk images. No empty containers found.

| Section | Image source | State |
| --- | --- | --- |
| Hero | `home/hero/hero-desktop.webp` + `hero-mobile.webp` | ✅ |
| Systems showcase | 4 system `cover-desktop.webp` | ✅ |
| Featured project | `videos/projects/army-hospital/*` (video + poster) | ✅ |
| Case-studies preview | mahshahr/megapars/tabas card webp | ✅ |
| Engineering proof snapshot | 6 technical webp (BOM, shop drawings, gutter) | ✅ |
| Client logos | 14 logos via `lib/trust/client-logos` (files in `public/clients`) | ✅ |

- **Only issue:** no OG image (C1, site-wide). Severity LOW for homepage specifically (visually complete).

---

# Component Issues

| Finding | File | Severity |
| --- | --- | --- |
| `ResourcePreviewGraphic` placeholder used instead of real image | `resource-detail-page-template.tsx:62,222` | HIGH (C2) |
| `service-technical-placeholder` CSS block when `hero.visual`/asset absent | `service-page-template.tsx:247`, `seo-landing-page-template.tsx:62` | MEDIUM |
| `projects-index-hero__visual` is `aria-hidden` decorative CSS (no real image) | `app/[locale]/projects/page.tsx:1422` | LOW |
| Case-study `pending` proof placeholders | `case-study-page-template.tsx` (many) | HIGH (C4) |
| `army-hospital` related card has no `cardImage` → placeholder | `case-study-pages.ts` (army config) | MEDIUM |
| Dead `/images/projects/*` references | 34 × `assets/projects/*/source/info.json` | LOW (not rendered) |
| Empty `src=""` / `image: ""` / `heroImage: null` / `TODO image` | — | **None found** ✓ |
| Missing `alt` text | — | **None** (29/29 have alt) ✓ |
| Contact page renders no image at all | `components/contact/rfq-contact-page.tsx` | LOW (form page; intentional but no visual trust signal) |
| Insights articles + index render no images/diagrams | `components/insights/*` | MEDIUM (engineering guides with zero supporting visuals) |
| Solutions/SEO-landing pages have **0 image fields in data** → all visuals are placeholders | `lib/seo/seo-landing-pages.ts` (23 pages) | MEDIUM–HIGH |

---

# Localization Issues

**No locale-specific image problems found.** All image assets are imported as locale-agnostic `StaticImageData` and shared identically across fa/en/ar/ru. There is **no** "image in FA but missing in EN" situation, and **no** locale-specific broken path. Only **alt text** is localized (e.g. `imageAlt: Record<Locale,…>` in resources), which is correct. ✅

(One consequence: where imagery is wrong/generic, it is wrong in *all* locales equally — fixing once fixes all four.)

---

# Recommended Fixes (prioritized)

Format: Severity · URL · Component · Recommended image type · Suggested subject.

1. **HIGH** · all routes/locales · `lib/seo/metadata.ts` openGraph · *OG social image (1200×630)* · SIPANEL industrial envelope hero with logo; per-section variants.
2. **HIGH** · `/{locale}/resources/*` (24) · `resource-detail-page-template.tsx:222` · *render existing preview webp as hero* · the per-resource preview already on disk.
3. **HIGH** · `/{locale}/systems/*` (16) · `service-page-template.tsx` technicalProof · *system-specific technical detail images* · e.g. polycarbonate glazing detail, standing-seam clip detail.
4. **HIGH** · `/{locale}/projects/*` (140) · `case-study-page-template.tsx` proof gallery · *real shop-drawing + installation photos* · per project.
5. **MEDIUM–HIGH** · `/{locale}/solutions/*` (92) · `seo-landing-page-template.tsx` · *hero + asset images* · system/application-relevant photography (data currently has none).
6. **MEDIUM** · `/{locale}/about` · `components/about/about-page.tsx` (A1) · *dedicated company/facility image* · SIPANEL facility or team, not the borrowed `andimeshk` project hero.
7. **MEDIUM** · `/{locale}/insights/*` (36) · `components/insights/*` · *technical diagrams/illustrations* · per-article detail diagrams.
8. **MEDIUM** · `/{locale}/projects/army-hospital` related cards · `case-study-pages.ts` · *card image* · army-hospital card webp (currently none).
9. **MEDIUM** · `/{locale}/projects/imam-khomeini-airport-hajj-terminal`, `…/mehrabad-aircraft-hangar` · source assets · *higher-res photography* · replace 1280×960 / 1024×768 sources.
10. **LOW** · `/{locale}/contact` · `rfq-contact-page.tsx` · *optional trust visual* · facility/contact-context image.
11. **LOW** · `/{locale}/systems/aluminium-cladding-covering` · service data · *dedicated hero* · aluminium facade hero (currently reuses cover).
12. **LOW** · data hygiene · `assets/projects/*/info.json`, `tabas` folder · fix dead `/images/*` refs + `tabas` slug mismatch.

---

# Final Numbers

- **Affected unique pages (templates):** 13 of 16 route templates have at least one image deficiency (only homepage, `/resources` index, `/systems` index are clean). Across locales this is **~300 of ~336 page instances** carrying at least the site-wide OG gap; **~180** carry a content-image gap beyond OG (resource detail 24 + systems 16 + solutions 92 + project galleries 140 overlap-counted as distinct content surfaces).
- **Critical (HIGH) issues:** **4** (C1 OG site-wide, C2 resource hero, C3 systems generic images, C4 project galleries) + 1 HIGH-leaning (solutions imagery).

## Top 20 Highest-Priority Image Gaps

| # | Severity | Gap | Where |
| --- | --- | --- | --- |
| 1 | HIGH | No OG/social image anywhere | all pages, all locales |
| 2 | HIGH | Resource detail hero = generic graphic, real preview not rendered | 6 resources × 4 |
| 3 | HIGH | Daylighting page shows panel/gutter technical images (wrong system) | `/systems/daylighting-transparent-roofing` |
| 4 | HIGH | Standing-seam page shows same generic technical images | `/systems/standing-seam-zip-tech-roofing` |
| 5 | HIGH | Aluminium page shows same generic technical images + reused hero | `/systems/aluminium-cladding-covering` |
| 6 | HIGH | Sandwich-panel technical images are generic/shared | `/systems/sandwich-panel-systems` |
| 7 | HIGH | All 35 project proof galleries are placeholders | `/projects/*` |
| 8 | HIGH | 23 solutions pages have no hero/asset images (data has 0) | `/solutions/*` |
| 9 | MEDIUM | About story hero borrows `andimeshk` project photo | `/about` |
| 10 | MEDIUM | 8 insight articles have no diagrams/visuals | `/insights/*` |
| 11 | MEDIUM | `army-hospital` has no card image → related-card placeholder | related sections sitewide |
| 12 | MEDIUM | IKA airport source photo low-res (1280×960) | `/projects/imam-khomeini-airport-hajj-terminal` |
| 13 | MEDIUM | Mehrabad source photo low-res (1024×768) | `/projects/mehrabad-aircraft-hangar` |
| 14 | MEDIUM | Insights index has no thumbnails/imagery | `/insights` |
| 15 | MEDIUM | No resource-detail thumbnail/social image | `/resources/*` |
| 16 | LOW | Contact page has zero imagery | `/contact` |
| 17 | LOW | Projects index hero visual is decorative CSS (no real image) | `/projects` |
| 18 | LOW | `tabas` folder/slug mismatch + 2 referenced images missing | `tabas` project |
| 19 | LOW | 34 `info.json` reference empty `public/images/*` (dead) | data hygiene |
| 20 | LOW | Aluminium system hero reuses cover instead of dedicated hero | `/systems/aluminium-cladding-covering` |
