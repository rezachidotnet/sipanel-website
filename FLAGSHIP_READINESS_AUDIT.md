# Flagship Case Study — Readiness Audit

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Scope:** 6 flagship candidates — `army-hospital`, `erbil-eye-hospital-entrance-canopy`, `imam-khomeini-airport-hajj-terminal`, `marun-petrochemical-visitor-terminal`, `mehrabad-aircraft-hangar`, `tabas-railway-facility`
**Method:** Inventory of `assets/projects/*`, `public/videos/*`, and the content wired in `lib/case-studies/case-study-pages.ts`.
**Companion docs:** `PROJECT_LINK_AUDIT.md`, `PROJECT_ROI_AUDIT.md`

> Analysis only — no code was changed and nothing was implemented.

---

## Cross-Cutting Findings (apply to all 6)

- **Technical proof galleries are PENDING for every project.** The template falls back to `buildPendingProofItems` placeholders — **no project has real shop drawings, installation photos, or detail callouts wired in.** This is the single biggest shared gap.
- **Hard metrics are thin.** Source `info.json` carries `area_m2`, location, system tags, and 4-language narrative — but **almost no quantified results** (no tonnage, panel m², span/clear-height, timeline-in-data, U-value, deflection). The numbers live in prose, not in a verifiable stats panel.
- **No client references / testimonials / logos** exist for any of the six.
- **Only `army-hospital` has video. Only `tabas` has a drone asset.** The other four are photo-only with a single before/after pair.

---

## 1. army-hospital
*32-bed military hospital, Raz & Jargalan (North Khorasan), 1,000 m², <50-day full EPC delivery*

**Existing assets**
- **Photos:** `card.webp`, `hero-desktop.webp` — ⚠ **only 2** (no `gallery-large`, no `hero-mobile`)
- **Video:** strongest in portfolio — `army-hospital-18s` (mp4+webm), `army-hospital-case-study.mp4` + poster, `featured-army-hospital-extended.mp4`, `poster.webp`; plus render script + `video-editing-plan.md`
- **Drawings:** none
- **Project facts:** rich (`localeOverrides`, `riskItems`, `executionDetail`, speed/EPC narrative)
- **Metrics:** timeline story strong; hard numbers weak

**Missing assets**
- Execution / in-progress photos · completion drone shots · `gallery-large` + `hero-mobile` variants · technical shop drawings · quantified stats panel (tonnage, panel m², bed-count→m²→days) · client / MoD reference · real proof gallery (currently placeholders)

| Buyer credibility | Engineering authority | International appeal | GCC/Iraq appeal |
|---|---|---|---|
| **9** | **8** | **7** | **8** |

**Effort:** Good **+6 h** · Excellent **+16 h** · World-class **+32 h**
*(video already carries it most of the way; gap is drawings + metrics + client quote)*

---

## 2. erbil-eye-hospital-entrance-canopy
*Erbil, **IRAQ**, 1,500 m², polycarbonate + architectural space frame*

**Existing assets**
- **Photos:** full set — `card`, `gallery-large`, `hero-desktop`, `hero-mobile` (.webp) + source `before.jpg` / `after.JPG` (2.8 MB after = high-res)
- **Facts:** `info.json` — completed, featured, area, country=Iraq, systems, 4-lang content incl. "eye-form architecture" story (strong narrative hook)
- **Video:** none · **Drawings:** none

**Missing assets**
- Video (the eye-geometry is a *visual* story — high value) · execution photos · drone · technical drawings (form-to-buildable space frame) · metrics beyond area · client reference · real proof gallery

| Buyer credibility | Engineering authority | International appeal | GCC/Iraq appeal |
|---|---|---|---|
| **7** | **7** | **10** | **10** |

**Effort:** Good **+6 h** · Excellent **+18 h** · World-class **+40 h**
*(only international proof point — worth the video/drone spend)*

---

## 3. imam-khomeini-airport-hajj-terminal
*Tehran, 5,000 m², passenger waiting hall*

**Existing assets**
- **Photos:** full 4-webp set + source `before.jpg` / `after.jpg` — ⚠ ~220 KB each (**low-res**, weakest source imagery of the six)
- **Facts:** `info.json` (5,000 m²)
- **Video:** none · **Drawings:** none

**Missing assets**
- Higher-res photography (current source too thin for a flagship) · video · execution / drone · drawings · metrics · client reference · real proof gallery

| Buyer credibility | Engineering authority | International appeal | GCC/Iraq appeal |
|---|---|---|---|
| **8** | **8** | **7** | **7** |

**Effort:** Good **+8 h** · Excellent **+20 h** · World-class **+44 h**
*(needs a fresh photo shoot — biggest media deficit)*

---

## 4. marun-petrochemical-visitor-terminal
*Mahshahr, 5,000 m², industrial gathering facility*

**Existing assets**
- **Photos:** full 4-webp set + `maroon-before.jpg` / `maroon-after.jpg` (~530 KB each — solid)
- **Facts:** `info.json` (5,000 m²)
- **Video:** none · **Drawings:** none

**Missing assets**
- Video · execution / drone · drawings · **HSE / petrochemical-spec metrics** (the credential Gulf oil & gas buyers care about) · client reference (petrochemical operator logo = high impact) · real proof gallery

| Buyer credibility | Engineering authority | International appeal | GCC/Iraq appeal |
|---|---|---|---|
| **7** | **8** | **7** | **9** |

**Effort:** Good **+8 h** · Excellent **+18 h** · World-class **+40 h**
*(highest payoff if a named petrochemical client reference can be secured)*

---

## 5. mehrabad-aircraft-hangar
*Tehran, 5,000 m², aircraft hangar (large-span)*

**Existing assets**
- **Photos:** full 4-webp set + `before.jpeg` / `after.jpeg` (~150–190 KB — modest)
- **Facts:** `info.json` (5,000 m²)
- **Video:** none · **Drawings:** none

**Missing assets**
- Video · drone (hangar scale is a drone story) · **structural drawings + span / clear-height metrics** (the entire credibility of a hangar is the span — currently unquantified) · client reference · real proof gallery

| Buyer credibility | Engineering authority | International appeal | GCC/Iraq appeal |
|---|---|---|---|
| **7** | **9** | **6** | **6** |

**Effort:** Good **+8 h** · Excellent **+20 h** · World-class **+42 h**
*(engineering-led; drawings + span data are non-negotiable)*

---

## 6. tabas-railway-facility
*Tabas, 10,000 m², double-curved railway roof (assets under folder `tabas`)*

**Existing assets**
- **Photos:** full 4-webp set + **`DJI_0838.JPG` (3.1 MB drone shot — only drone asset in the entire portfolio)** + `main.JPG`
- **Facts:** `project.json` (10,000 m², double-curved)
- **Video:** none · **Drawings:** none
- ⚠ **Wiring note:** asset folder is `tabas`, slug is `tabas-railway-facility` (mismatch — fine today, fragile)

**Missing assets**
- Video (drone footage would be cheap given the still already exists) · before / execution photos · technical drawings of the double-curved geometry (the headline engineering feat) · curvature / span metrics · client reference · real proof gallery

| Buyer credibility | Engineering authority | International appeal | GCC/Iraq appeal |
|---|---|---|---|
| **7** | **9** | **6** | **6** |

**Effort:** Good **+6 h** · Excellent **+16 h** · World-class **+36 h**
*(drone head-start lowers world-class cost; geometry drawings are the key add)*

---

## Prioritized Action List (highest leverage first)

1. **Wire real technical proof galleries** for all 6 (replace placeholders) — shared blocker, removes the "pending" look. *~3 h each.*
2. **Build a verified stats panel per project** (5–7 hard metrics each: span, m², tonnage, timeline, system spec). Converts prose into engineering authority. *~2 h each.*
3. **Secure ≥1 client reference / logo / quote per project** — biggest credibility multiplier, hardest to fake. *(Sales-led, low SIPANEL hours, high impact.)*
4. **Generate missing photo variants** — army-hospital `gallery-large` + `hero-mobile`; re-shoot / upscale IKA airport (low-res). *~2–4 h.*
5. **Add drawings** where engineering *is* the story: Mehrabad span, Tabas double-curve, Erbil eye-geometry, Marun petrochemical detailing.
6. **Video where it pays:** Erbil (eye-form), Tabas (drone footage from existing aerial). Army-hospital already covered.
7. **Fix the `tabas` → `tabas-railway-facility` folder/slug mismatch** (hygiene).

---

## Effort Summary

| Project | Good | Excellent | World-class |
|---|---|---|---|
| army-hospital | +6 h | +16 h | +32 h |
| erbil-eye-hospital-entrance-canopy | +6 h | +18 h | +40 h |
| imam-khomeini-airport-hajj-terminal | +8 h | +20 h | +44 h |
| marun-petrochemical-visitor-terminal | +8 h | +18 h | +40 h |
| mehrabad-aircraft-hangar | +8 h | +20 h | +42 h |
| tabas-railway-facility | +6 h | +16 h | +36 h |
| **Total (all 6)** | **+42 h** | **+108 h** | **+234 h** |

---

## Final Ranking — Commercial Value to SIPANEL

| Rank | Project | Why |
|---|---|---|
| **1** | **army-hospital** | Strongest overall: universal <50-day EPC speed story + only full video suite. Nearest to world-class; highest conversion value across all segments. |
| **2** | **erbil-eye-hospital-entrance-canopy** | The **only international / Iraq proof point** — irreplaceable for GCC/Iraq market entry, even at smaller scale. |
| **3** | **marun-petrochemical-visitor-terminal** | Petrochemical / oil & gas = the core Gulf industrial buyer. A named client reference would make it a top-2 asset. |
| **4** | **imam-khomeini-airport-hajj-terminal** | National-airport prestige, broad appeal — but weakest source imagery; needs a shoot to perform. |
| **5** | **mehrabad-aircraft-hangar** | Highest engineering authority (large-span hangar) but narrower buyer set and no span metrics yet. |
| **6** | **tabas-railway-facility** | Excellent engineering + a drone head-start, but domestic rail infrastructure has the least direct pull on SIPANEL's named target buyers. |
