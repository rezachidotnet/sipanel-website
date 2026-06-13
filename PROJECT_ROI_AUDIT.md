# Project Detail Page — ROI Audit & Investment Strategy

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Scope:** All 35 project (case-study) detail pages
**Companion docs:** `PROJECT_LINK_AUDIT.md` (internal-link map), `PROJECT_ROI_AUDIT_scorecard.csv` (raw scores)

> Analysis only — no code was changed and nothing was implemented.

---

## Decision Question

Should SIPANEL **(A)** invest in improving all 35 project detail pages, or **(B)** focus on a small number of flagship case studies?

**Answer: B — invest deeply in the top 5, apply a cheap site-wide linking fix to all 35, then expand to a top-10 only if metrics justify it. Do not fund all 35.**

---

## Context (from prior link audit)

- Only **4 of 35** projects receive any internal link; **31 are click-orphans**.
- Project detail pages are **not currently a major user journey**.
- All 140 locale pages are in the sitemap (SEO-discoverable) but largely unreachable by click.

**Implication:** polishing pages nobody navigates to is low-ROI. The cheapest, highest-leverage move (making cards clickable) must come *before* deep content spend.

---

## Key data facts (verified in `lib/case-studies/case-study-pages.ts`)

- **All 35 already contain complete written content** (challenge / engineering decision / execution detail / measured result) in all 4 languages. The *text* is not the gap.
- **Only `army-hospital` has a hero video.** All others are photo-only.
- **`erbil-eye-hospital-entrance-canopy` (Erbil, Iraq) is the ONLY non-Iran project** — the single existing proof point for the GCC/Iraq target market.
- Differentiators between projects are therefore **scale, sector prestige, visual/proof assets, and buyer relevance** — not content completeness.

---

## Scoring Methodology

Each project scored 1–10 on 8 dimensions; composite is weighted toward what converts SIPANEL's stated buyers (GCC/Iraq, industrial manufacturers, EPC contractors):

| Dimension | Code | Weight emphasis |
|---|---|---|
| Engineering significance | ENG | medium |
| Commercial value | COM | high |
| Visual appeal | VIS | low |
| International relevance | INT | medium |
| Proof strength (marquee credibility, not text completeness) | PRF | high |
| GCC/Iraq buyer fit | GCC | high |
| Industrial-manufacturer fit | IND | high |
| EPC-contractor fit | EPC | high |

---

## Full Ranked Scorecard (35 projects)

| # | Project | ENG | COM | VIS | INT | PRF | GCC | IND | EPC | Score | Tier |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | army-hospital (32-bed, <50-day EPC, **video**) | 9 | 9 | 9 | 8 | 10 | 9 | 8 | 10 | **9.1** | 1 |
| 2 | erbil-eye-hospital-entrance-canopy (**Iraq**) | 7 | 9 | 8 | 10 | 8 | 10 | 6 | 8 | **8.4** | 1 |
| 3 | imam-khomeini-airport-hajj-terminal | 9 | 8 | 8 | 8 | 9 | 8 | 7 | 9 | **8.3** | 1 |
| 4 | marun-petrochemical-visitor-terminal | 8 | 8 | 7 | 8 | 8 | 9 | 9 | 8 | **8.0** | 1 |
| 5 | mehrabad-aircraft-hangar | 9 | 8 | 8 | 7 | 8 | 7 | 9 | 8 | **7.9** | 1 |
| 6 | tabas-railway-facility (10,000 m², double-curved) | 9 | 7 | 7 | 6 | 8 | 7 | 9 | 8 | **7.7** | 2★ |
| 7 | payam-industrial-city-ceramic-factory | 8 | 7 | 6 | 6 | 7 | 7 | 10 | 8 | **7.5** | 2★ |
| 8 | tehran-mall-roof-garden-foodcourt (7,000 m²) | 8 | 8 | 8 | 6 | 7 | 6 | 6 | 7 | **7.3** | 2★ |
| 9 | ahvaz-airport-passenger-terminal | 8 | 7 | 7 | 6 | 7 | 7 | 6 | 7 | **7.0** | 2★ |
| 10 | shahre-babak-hall (ZIP flagship, already linked) | 7 | 7 | 7 | 6 | 7 | 6 | 6 | 7 | **6.8** | 2★ |
| 11 | shalamcheh-border-gate (border infra) | 7 | 7 | 6 | 7 | 6 | 7 | 5 | 7 | **6.6** | 2 |
| 12 | megaparsmall-atrium (ZIP, 4,500 m²) | 7 | 7 | 7 | 5 | 6 | 5 | 6 | 6 | **6.4** | 2 |
| 13 | absaar-water-park (12,000 m² ZIP) | 7 | 6 | 8 | 5 | 6 | 5 | 5 | 6 | **6.3** | 2 |
| 14 | kermanshah-univ-petroleum-faculty (glass facade) | 7 | 6 | 7 | 5 | 6 | 6 | 6 | 6 | **6.2** | 2 |
| 15 | atlas-hotel-shahinshahr-atrium | 6 | 7 | 8 | 5 | 6 | 5 | 4 | 5 | **6.1** | 2 |
| 16 | toranj-kish-restaurant (overwater, Kish) | 6 | 6 | 9 | 6 | 6 | 5 | 4 | 5 | **6.0** | 2 |
| 17 | andimeshk-stadium (6,000 m² curved roof) | 7 | 6 | 7 | 5 | 6 | 5 | 5 | 6 | **6.0** | 2 |
| 18 | tavanir-shahrekord-central-atrium (utility) | 6 | 6 | 6 | 5 | 6 | 5 | 6 | 6 | **5.8** | 2 |
| 19 | bandar-abbas-mall-atrium-roof | 6 | 6 | 7 | 5 | 6 | 5 | 4 | 5 | **5.7** | 2 |
| 20 | najafabad-university-amphitheater | 6 | 6 | 6 | 4 | 6 | 4 | 5 | 6 | **5.6** | 2 |
| 21 | gonabad-university-sports-hall | 6 | 6 | 6 | 4 | 5 | 4 | 5 | 6 | **5.5** | 2 |
| 22 | maku-convention-hall | 6 | 6 | 6 | 4 | 5 | 4 | 5 | 6 | **5.5** | 2 |
| 23 | sepehan-flower-market (3,500 m², linked) | 5 | 6 | 5 | 4 | 6 | 4 | 6 | 6 | **5.4** | 2 |
| 24 | enghelab-club-padel-center | 6 | 6 | 6 | 4 | 5 | 4 | 4 | 5 | **5.3** | 3 |
| 25 | bandar-mahshahr-bus-terminal | 5 | 5 | 5 | 4 | 5 | 5 | 4 | 6 | **5.1** | 3 |
| 26 | tarbiat-modares-research-greenhouse | 6 | 5 | 6 | 4 | 5 | 4 | 5 | 5 | **5.1** | 3 |
| 27 | mahshahr-taxi-parking (linked) | 5 | 5 | 5 | 4 | 5 | 5 | 4 | 5 | **5.0** | 3 |
| 28 | fadak-mall-glass-skylight | 5 | 5 | 6 | 4 | 5 | 4 | 4 | 5 | **4.9** | 3 |
| 29 | rouzbeh-charity-complex-zanjan | 5 | 5 | 5 | 4 | 5 | 4 | 4 | 5 | **4.8** | 3 |
| 30 | eftekhar-commercial-office-complex (300 m²) | 5 | 5 | 5 | 4 | 5 | 4 | 4 | 5 | **4.7** | 3 |
| 31 | shahr-babak-stadium-entrance (cladding, linked) | 5 | 5 | 5 | 4 | 5 | 4 | 3 | 4 | **4.6** | 3 |
| 32 | baharestan-prayer-hall | 5 | 4 | 5 | 4 | 5 | 4 | 3 | 4 | **4.4** | 3 |
| 33 | shahrood-azad-university-skylight (400 m²) | 4 | 4 | 5 | 4 | 4 | 3 | 3 | 4 | **4.1** | 3 |
| 34 | parand-city-entrance (500 m²) | 4 | 4 | 5 | 4 | 4 | 3 | 3 | 4 | **4.0** | 3 |
| 35 | tiran-gas-station (600 m²) | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 4 | **3.9** | 3 |

★ = "phase-2 flagship" — the next 5 to promote if budget expands to a top-10.

---

## Recommended Tiers

### Tier 1 — Full case-study investment (5)
`army-hospital` · `erbil-eye-hospital-entrance-canopy` · `imam-khomeini-airport-hajj-terminal` · `marun-petrochemical-visitor-terminal` · `mehrabad-aircraft-hangar`

These five cover **all three buyer segments + the GCC/Iraq market** with the fewest pages: a universal EPC-speed anchor (with existing video), the only international proof point, a recognizable national airport, a petrochemical/oil-&-gas reference, and a high-wow large-span hangar.

### Tier 2 — Keep in portfolio, light investment (≈18: ranks 6–23)
Real photos + verified metrics + a clickable card. No deep narrative or proof-gallery production. Ranks 6–10 (★) are the promotion queue for a future top-10.

### Tier 3 — Simple project card only (≈12: ranks 24–35)
Small footprint, low sector differentiation, weak international pull. Keep indexed for SEO long-tail and portfolio breadth; no content investment.

---

## Effort Estimates

Because the 4-language text already exists, "buyer-ready" cost is dominated by **verified proof assets** (site photos, shop-drawing callouts, confirmed metrics), copy polish, translation QA, and layout/SEO — not writing.

| Scope | Per-page | Total |
|---|---|---|
| **All 35 buyer-ready** (full proof galleries, polish, QA ×4 langs) | ~10–14 h | **~350–500 h (~420 h)** |
| **Top 5 buyer-ready** (flagship depth: hero media, galleries, metrics) | ~18–25 h | **~90–130 h (~110 h)** |
| One-time internal-linking fix (make all 35 cards clickable) | — | **~6–10 h** |

**Top 5 ≈ ¼ the cost of all 35**, while capturing the projects that carry the buyer credibility.

---

## Final Recommendation — "If I were SIPANEL CEO"

**Invest deeply in the TOP 5 now + the cheap linking fix for all 35; expand to a top-10 only after measuring demand. Do NOT fund all 35.**

1. **The journey doesn't justify 35 deep pages.** Detail pages aren't a major journey and 31 are click-orphans. ~420 h into pages nobody reaches is low-ROI; polished orphans are still orphans.
2. **Two cheap moves unlock most of the value first.** (a) ~6–10 h linking fix makes all 35 reachable and lifts crawl/SEO across the set. (b) ~110 h on 5 flagships gives sales a credible, sharable proof kit spanning every buyer segment. ~120 h total vs ~420 h — **~70% cost reduction for the majority of conversion value.**
3. **Buyer coverage is achieved at 5, not 35.** GCC/Iraq (Erbil), oil & gas/industrial (Marun, Mehrabad), national infrastructure (IKA airport), and the universal EPC speed story (army hospital) already span the audience. Projects 6–35 mostly repeat these archetypes at smaller scale — diminishing marginal proof.
4. **Top 10 is the expansion ceiling, not 35.** If flagship pages show engagement/lead attribution, promote the 5 ★ candidates (~+100 h). Beyond 10, ROI turns negative for a non-primary journey.

**Verdict: Top 5 (deep) + all-35 linking fix → then Top 10 if metrics warrant. Never all 35 deep.**
