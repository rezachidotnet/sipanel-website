# SIPANEL Website — Project Structure & Asset Map

> Where every kind of file lives: PDFs, images, videos, data, locales, and submissions.
> Stack: **Next.js 16 (App Router)** · **next-intl** (fa/en/ar/ru) · **TypeScript** · **Tailwind** · deployed on **Vercel**.

---

## 1. The two image/file homes — `assets/` vs `public/`

This is the most important distinction in the project. There are **two** places files live, and they behave differently.

| | `assets/` | `public/` |
|---|---|---|
| **Served how?** | Imported in code (`import x from '@/assets/...'`) | Served raw at a URL (`/downloads/...`) |
| **Processed?** | Yes — Next.js optimizes, resizes, hashes filenames, emits AVIF/WebP | No — byte-for-byte, original filename |
| **Use for** | Photos & artwork rendered by `<Image>` components | Files users download or link to directly (PDFs, video, favicons, logos) |
| **Referenced by** | `@/assets/...` import statements | Absolute URL paths like `/catalogs/fa/sipanel-catalog.pdf` |

Rule of thumb: **if a component renders it → `assets/`. If a browser downloads or hot-links it → `public/`.**

---

## 2. `public/` — statically served files (URLs)

Everything here maps 1:1 to a public URL. `public/downloads/fa/foo.pdf` → `https://site/downloads/fa/foo.pdf`.

```
public/
├── downloads/              ← Lead-magnet PDFs (gated technical docs), per locale
│   ├── en/  fa/  ar/  ru/
│   │     ├── roof-leakage-prevention-checklist.pdf
│   │     ├── sandwich-panel-selection-guide.pdf
│   │     ├── shop-drawing-review-guide.pdf
│   │     ├── standing-seam-roof-detail-notes.pdf
│   │     ├── aluminium-cladding-layout-checklist.pdf
│   │     └── mto-procurement-planning-sheet.pdf
│   │     (6 documents × 4 locales = 24 PDFs — GENERATED, see §6)
│
├── catalogs/               ← Main product catalog PDF, per locale
│   └── en/ fa/ ar/ ru/  →  sipanel-catalog.pdf
│
├── videos/projects/        ← Case-study video (mp4 + webm + poster images)
│   └── army-hospital/  (army-hospital-18s.mp4/.webm, posters, featured cut)
│
├── clients/                ← Client / reference logos (.webp) shown in trust strip
├── icons/                  ← PWA icons (icon-16…512.png, icon-180/192)
├── images/                 ← (currently empty placeholder)
├── apple-touch-icon.png
└── favicon.png
```

**PDFs live in two `public/` folders:**
- `public/catalogs/<locale>/sipanel-catalog.pdf` — the headline product catalog (linked from `components/home/catalog-download-modal.tsx`).
- `public/downloads/<locale>/<slug>.pdf` — the 6 gated engineering lead-magnet docs (one per resource).

---

## 3. `assets/` — imported, optimized media (bundled)

Pulled into the build via `@/assets/...` imports. Next.js fingerprints and re-encodes these.

```
assets/
├── projects/               ← Per-project photo sets (40+ projects)
│   └── <project-slug>/
│        ├── main.jpg / main.JPG     ← hero/cover photo
│        ├── photos/                 ← gallery images
│        ├── source/                 ← original/raw drops (some projects)
│        └── project.json            ← per-project metadata
├── systems/                ← Product-system artwork (cover-desktop.webp, hero/)
│   ├── sandwich-panel/  standing-seam/  aluminium-claddin/  transparent-roofing/  hero/
├── resources/              ← Preview thumbnails for the downloadable PDFs (.webp)
│   │     roof-leakage-prevention-checklist.webp, sandwich-panel-selection-guide.webp, …
│   │     lead-capture-preview.webp, resources-hero.webp
│   └── template/
├── technical/              ← Diagrams for procurement / shop-drawings / waterproofing
├── about/leadership/       ← Team / leadership photos
├── home/hero/              ← Homepage hero imagery
├── brand/                  ← logos/  icons/  favicons/  guidelines/
└── fonts/                  ← vazirmatn/  inter/  ibm-plex-sans-arabic/  (web font files)
```

> Note: `assets/resources/*.webp` are the **preview images** of each PDF; the actual **PDF** with the same slug lives in `public/downloads/<locale>/`. They are paired by slug.

---

## 4. Application code

```
app/                        ← Next.js App Router
├── [locale]/               ← All localized pages (fa/en/ar/ru)
│   ├── about/  contact/  faq/  insights/[slug]/  projects/[slug]/
│   ├── resources/[slug]/   ← resource detail + lead-capture funnel
│   ├── solutions/[slug]/
│   └── systems/            ← 4 product-system pages
│        ├── sandwich-panel-systems/
│        ├── standing-seam-zip-tech-roofing/
│        ├── aluminium-cladding-covering/
│        └── daylighting-transparent-roofing/
└── api/                    ← Server route handlers
    ├── lead/route.ts       ← lead-magnet form submissions
    └── rfq/route.ts        ← RFQ (request-for-quote) submissions

components/                 ← React UI, grouped by domain
    about/ bidi/ case-studies/ contact/ faq/ home/ insights/
    layout/ localization/ projects/ resources/ seo/ services/ trust/

lib/                        ← Data + business logic (TS modules, no UI)
    services/   ← the 4 product systems' content
    resources/  ← engineering-resource-hub.ts (maps slugs → PDF + preview)
    insights/   case-studies/   faq/   about/   contact/
    rfq/        ← server.ts, odoo.ts, sanitize.ts, constants.ts
    seo/        ← metadata.ts, schema.ts, seo-landing-pages.ts
    analytics/  ← events.ts
    trust/      ← client-logos.ts
```

---

## 5. Localization, config & infra

```
messages/        ← UI translation strings: ar.json en.json fa.json ru.json (fa = source of truth)
i18n/            ← next-intl wiring: request.ts, routing.ts
middleware.ts    ← locale routing middleware

next.config.mjs  ← next-intl plugin; image formats (avif/webp); API file-tracing excludes
tailwind.config.ts · postcss.config.mjs · tsconfig.json · eslint.config.mjs

Dockerfile · docker-compose.yml · .dockerignore   ← container build
nginx/           ← reverse-proxy config
odoo/            ← Odoo CRM integration assets (RFQs forward to Odoo via lib/rfq/odoo.ts)
.vercel/ · .vercelignore   ← Vercel deploy (ignores video, docs, brand guidelines, heic)
```

---

## 6. Generated content & scripts

```
scripts/
├── pdf/                    ← Python generator for the 24 lead-magnet PDFs
│   ├── build_all.py        ← entry point → writes to PUBLIC/downloads/<locale>/<slug>.pdf
│   ├── engine.py           ← shared PDF builder
│   ├── doc1…doc6_*.py      ← one module per document (content/data)
│   └── fonts/              ← Vazirmatn-Regular/Bold.ttf (Persian/Arabic PDF text)
├── import-projects.py      ← imports project photo sets/metadata into assets/projects
├── production-seo-audit.mjs (run via `npm run seo:audit`)
└── test-lead-api.sh
```

> **The PDFs in `public/downloads/` are build artifacts.** Regenerate them with
> `python scripts/pdf/build_all.py` — it writes 6 docs × 4 locales straight into `public/downloads/<locale>/`.

---

## 7. Private / runtime data (not public, not bundled)

```
private/rfq-submissions/    ← Saved RFQ submissions as <uuid>.json (local/dev store)
```

In production the RFQ route writes to `process.env.RFQ_SUBMISSION_DIR` (defaults to `/tmp/rfq-submissions`) — see `lib/rfq/server.ts:53`. The `private/` copies are local development records and are **not** web-accessible.

---

## 8. Docs, specs & reference (repo-only, excluded from deploy)

```
docs/        ← audit/notes markdown (hero-section-audit.md, homepage-component-audit.md)
specs/       ← design/handoff specs: design tokens, analytics map, component maps,
               responsive rules, animation behavior, page JSON, source .docx
CLAUDE.md · PROJECT_CONTEXT.md · RESOURCE_AUDIT_REPORT.md   ← project docs
```
`docs/`, brand guidelines, and large media are listed in `.vercelignore`, so they ship to git but **not** to Vercel.

---

## Quick reference — "Where does X live?"

| Looking for… | Location |
|---|---|
| Downloadable lead-magnet **PDFs** | `public/downloads/<locale>/<slug>.pdf` |
| Product **catalog PDF** | `public/catalogs/<locale>/sipanel-catalog.pdf` |
| PDF generator (source of those PDFs) | `scripts/pdf/` (`build_all.py`) |
| **Project photos** | `assets/projects/<slug>/` (main + `photos/`) |
| **System / hero artwork** | `assets/systems/`, `assets/home/hero/` |
| PDF **preview thumbnails** | `assets/resources/*.webp` |
| **Client logos** | `public/clients/*.webp` |
| **Videos** | `public/videos/projects/<slug>/` |
| **Favicons / PWA icons** | `public/icons/`, `public/favicon.png`, `assets/brand/favicons/` |
| **Fonts** | `assets/fonts/` (web) · `scripts/pdf/fonts/` (PDF) |
| **UI translations** | `messages/<locale>.json` |
| **Page content / data** | `lib/<domain>/*.ts` |
| **Form/RFQ submissions** | `private/rfq-submissions/` (dev) · `$RFQ_SUBMISSION_DIR` (prod) |
