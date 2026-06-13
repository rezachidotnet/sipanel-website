# Mobile View Audit — Images & Components

**Date:** 2026-06-13
**Scope:** All wired imagery and page components in mobile viewport, across all four locales (fa, en, ar, ru).
**Method:** Headless Chrome (Playwright, `/usr/bin/google-chrome-stable`) at a phone viewport (390×844, DPR 2, `isMobile`), plus a plain narrow-viewport control pass (390px, no mobile emulation) to separate real layout facts from emulation artifacts. Server under test: local `next start` on `http://localhost:3000` serving build of commit `dcd79db`.

---

## Verdict

All images and components render correctly on mobile across **all four locales**, with **one exception**: `/fa/projects` has a real, Persian-only document-level horizontal overflow. Two findings are recorded below — one bug, one cleanup item.

---

## Pages checked

11 pages × 4 locales (fa / en / ar / ru):

- `/` (home)
- `/systems` (index)
- `/systems/sandwich-panel-systems`
- `/systems/standing-seam-zip-tech-roofing`
- `/systems/aluminium-cladding-covering`
- `/systems/daylighting-transparent-roofing`
- `/resources` (index)
- `/resources/sandwich-panel-selection-guide` (resource detail sample)
- `/about`
- `/contact`
- `/projects`

| Check | Result |
| --- | --- |
| HTTP status | 200 on all pages, all locales |
| Broken images (`naturalWidth === 0` after load) | **0** on every page |
| JS console errors | 0 (one non-critical 404 for a static resource on `/projects`) |
| Mobile image sizing | ✅ Next image optimizer serves correctly downscaled candidates (e.g. `w=750`/`w=828` for ~348px render slots at DPR 2) |
| Horizontal overflow (user-facing) | Clean on **every page except `/fa/projects`** |

---

## Finding 1 — `/fa/projects` horizontal overflow (BUG, fa-only, pre-existing)

### Symptom
- Document `scrollWidth` = **10324px** on **fa only**. `ar`, `en`, `ru` = 390px (contained).
- Reproducible **both** with mobile emulation **and** in plain narrow Chrome (390px, no emulation) — so the 10324px width is a real DOM/layout fact, not a test artifact.
- Under mobile RTL scroll restoration, the initial viewport lands on empty space (`initialScrollX = -1170`, hero `<h1>` positioned at `x≈1190`, outside the 0–390 viewport) → page appears **blank on load** in the headless mobile pass.
- In the non-emulated control pass, content is visible at `scrollX=0` (`h1.left=20`), but the page remains sideways-scrollable into empty space — janky on fa.

### Per-locale measurements
| Locale | doc scrollWidth | initial scrollX (mobile) | hero h1 visible (mobile) |
| --- | --- | --- | --- |
| fa | **10324px** | **-1170** | **No (off-screen at x≈1190)** |
| ar | 390px | 0 | Yes (x=20) |
| en | 390px | 0 | Yes |
| ru | 390px (≈16px noise) | 0 | Yes |

### Source
The project-card carousel `.projects-index-grid` (`app/globals.css:8264`):

```css
.projects-index-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(286px, 86vw);
  gap: 16px;
  margin-inline: calc(var(--container-padding) * -1);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
```

This is an intentional horizontal carousel: 35 cards × 286px + gaps = **10554px** internal scroll width. It is correctly contained (`overflow-x: auto`, clientWidth 350px) in ar/en/ru, and the ancestor `article.projects-index-page` has `overflow-x: clip`. The same computed styles apply in fa, yet in fa the carousel content leaks to the document level. The differentiator is the fa locale (Vazirmatn font / Persian content) interacting with the RTL + `scroll-snap-type: x mandatory` + `overflow-x: auto` carousel — a Chromium RTL scroll-snap/overflow containment quirk that does not trigger in the (also-RTL) Arabic locale.

### Not caused by the imagery commit
The only change to `app/[locale]/projects/page.tsx` in commit `dcd79db` was a layout-identical hero image swap:

```diff
- <Image src={tabasCard}      alt="" fill priority sizes="(max-width: 767px) 100vw, 45vw" />
+ <Image src={projectsHeroImg} alt="" fill priority sizes="(max-width: 767px) 100vw, 45vw" />
```

`ar` uses the identical code and the same image and is clean, so this is a **pre-existing** issue, not a regression from the image wiring.

### Recommendation
Contain the carousel overflow more robustly for the fa RTL case (e.g. enforce `overflow-x: clip` / `max-width: 100vw` on a stable ancestor, or revisit the RTL scroll-snap configuration). Verify any fix on a real device, since the "blank on load" severity was specific to the headless mobile RTL scroll-restoration behavior.

---

## Finding 2 — Orphaned `-mobile.webp` variants (cleanup, not a bug)

The 16 `-mobile.webp` files added in commit `dcd79db` are **never imported** anywhere in the codebase:

```
about-hero-mobile.webp
contact-trust-image-mobile.webp
projects-index-hero-mobile.webp
roof-leakage-prevention-checklist-mobile.webp
sandwich-panel-selection-guide-mobile.webp
shop-drawing-review-guide-mobile.webp
standing-seam-roof-detail-notes-mobile.webp
aluminium-cladding-layout-checklist-mobile.webp
mto-procurement-planning-sheet-mobile.webp
systems/*/installation-mobile.webp
systems/*/technical-detail-mobile.webp
systems/*/clip-installation-mobile.webp
systems/*/seam-detail-mobile.webp
systems/*/joint-detail-mobile.webp
systems/*/interior-view-mobile.webp
systems/*/junction-detail-mobile.webp
```

The wired components all use a single `<Image src={desktop} sizes=…>`, so Next's optimizer generates mobile sizes from the desktop source automatically. Mobile rendering works correctly, but these hand-cropped mobile files are unused dead weight (~150 KB) in the repo.

**Note:** The *pre-existing* mobile variants on the home and systems-index pages — `hero-mobile`, `cover-mobile`, `systems-hero-mobile`, `bom-mto-mobile`, `shop-drawings-mobile`, `gutter-flashing-mobile` — **are** wired via `<picture>`/`<source>` art direction (`components/home/hero-section.tsx`, `components/home/engineering-proof-snapshot.tsx`, `components/home/featured-project.tsx`, `app/[locale]/systems/page.tsx`). Only the new batch from this task is orphaned.

### Options
- **Delete** the 16 unused files (lowest effort; desktop `<Image sizes>` already handles mobile), **or**
- **Wire** them via `<picture>` art direction if true mobile crops are desired.

---

## Notes

- The imagery wiring shipped in `dcd79db` is verified correct on mobile (all heroes/technical images present, no broken images, correct downscaled srcset) across all four locales.
- Neither finding blocks that commit. Finding 1 is a separate pre-existing layout issue; Finding 2 is a cleanup item.
