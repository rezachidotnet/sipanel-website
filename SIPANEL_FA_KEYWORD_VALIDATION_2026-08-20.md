# SIPANEL fa — 20–30 Keyword Validation

**Date:** 2026-08-20
**Phase:** Validation (GSC / Google Trends Iran / SERP intent)
**Preceding document:** `SIPANEL_FA_EXISTING_PAGE_KEYWORD_MAP_2026-08-20.md`

---

## Validation set selection (27 keywords)

Selected using the weighting from the discovery report and this task's instructions: existing first-party evidence (unavailable, see below) > business value > intent clarity > GKP discovery signal (directional only) > cannibalization significance. Adjusted from the "starting candidates" list after repository inspection — added سایبان متحرک (to directly test the report's DO NOT CREATE hypothesis) and سقف استندینگ سیم (to test whether the current live primary keyword differs materially from the bare head term); kept the cold-storage/cleanroom pair to close out the Business Fit Gate.

---

## A. Google Search Console — status

```
GSC VALIDATION: PENDING — DATA ACCESS REQUIRED
```

No authenticated Google Search Console connection or exported dataset is available in this environment or repository. No GSC figures are reported anywhere in this document or its sibling files — none were fabricated.

**Exact export required before the next phase**, per the source report's own priority (GSC evidence should outrank GKP):

1. Search Console property for `https://www.sipanelco.com` (or the relevant Google Search Console resource covering it)
2. **Performance report** → Search results
3. Filter: **Country = Iran**
4. Filter: **Search type = Web**
5. Date ranges: **last 3 months** and **last 6 months** (both, as separate exports)
6. Dimensions: **Query + Page** (not query-only — landing-page attribution is required to detect whether Google already associates an existing SIPANEL URL with a topic, and to check for the "multiple URLs receiving impressions for the same query" cannibalization signal)
7. Metrics needed: Clicks, Impressions, CTR, Average Position
8. Export as CSV (Search Console UI export, or Search Console API / bulk export table if BigQuery linking exists)

Until this is supplied, every row below is capped at **MEDIUM** confidence at most, per the instruction that confidence may never be marked HIGH with missing evidence pillars.

---

## B. Google Trends — Iran — status

```
GOOGLE TRENDS (IRAN): INSUFFICIENT ACCESS
```

`trends.google.com` was attempted via the available fetch tool (`geo=IR`, head term ساندویچ پانل) and returned **HTTP 429 (rate-limited/blocked)** before any chart data could be retrieved. Google Trends is a JavaScript-rendered single-page app that does not expose usable relative-interest data to a non-browser fetch even when it does respond. No Trends scores are reported anywhere in this document — none were fabricated or approximated from GKP.

**What is required to complete this step:** a human with a live browser session should open `trends.google.com/trends/explore?geo=IR` and run the six comparison groups specified in the source instructions (max 5 terms per group), then paste or export the resulting relative-interest series back for interpretation. Per instruction, any term that returns "insufficient data" in Trends should be recorded as **"Insufficient Trends data"**, not treated as zero demand.

Every row below is marked `Insufficient Trends data` in the Trends column, honestly reflecting that no Trends check could be completed — not a claim that demand is low.

---

## C. Live SERP intent — status and caveat

```
SERP VALIDATION: COMPLETED for 18 of 27 terms (real web search), extrapolated for the remaining 9 from a closely related tested sibling term (marked accordingly)
```

**Important limitation to disclose:** the web-search tool available in this environment is **US-region**, not Iran-geo-targeted. Results are real, current Google/web results for the Persian-language query, and the *page-type/intent classification* they reveal (manufacturer vs. contractor vs. marketplace vs. article, etc.) is a legitimate signal independent of geo-ranking — but the *exact rank order* a person searching from inside Iran would see may differ. This is disclosed per the "do not fabricate" requirement; treat the SERP column as directional intent evidence, not a verified Iran SERP snapshot.

---

## D. Validation table

| # | Keyword | GKP Discovery Signal (All Locations — directional only) | GSC Evidence | Trends Iran | SERP Dominant Intent | SERP Page Type | Existing SIPANEL URL | Final Architecture Decision | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ساندویچ پانل | 1K–10K | PENDING | Insufficient Trends data | Product definition + manufacturer catalog | Article/Guide + Manufacturer | `/systems/sandwich-panel-systems` | KEEP page, retarget primary keyword to bare term | MEDIUM |
| 2 | ساندویچ پانل سقفی | 100–1K | PENDING | Insufficient Trends data | Product-variant category page | Manufacturer/Product | none dedicated (folded into #1) | EXPAND #1 first; NEW PAGE only if GSC later shows split query volume | MEDIUM |
| 3 | ساندویچ پانل دیواری | 100–1K | PENDING | Insufficient Trends data | Product-variant category page (same domains as #2) | Manufacturer/Product | none dedicated | EXPAND #1 first; NEW PAGE only if GSC later shows split query volume | MEDIUM |
| 4 | قیمت ساندویچ پانل | 100–1K | PENDING | Insufficient Trends data | Live per-m² pricing / daily price list | Marketplace/Ecommerce (Torob + daily-price sellers) | none | NEW PAGE, reframed as pricing-factors/RFQ content, not a literal price table | MEDIUM |
| 5 | اجرای ساندویچ پانل | 10–100 | PENDING | Insufficient Trends data | Installation how-to + installation-contractor commercial | Article/Guide + Service contractor | `/solutions/industrial-sandwich-panel-installation` (thin/templated) | NEW real content, retarget the existing thin URL onto it | MEDIUM-HIGH |
| 6 | نصب ساندویچ پانل | 10–100 | PENDING | Insufficient Trends data | (same SERP cluster as #5 — sibling term, not separately queried) | Article/Guide + Service | same as #5 | Secondary term on the same page as #5, not a separate page | MEDIUM |
| 7 | ساندویچ پانل سوله | 10–100 | PENDING | Insufficient Trends data | Product-application, same domains as #2/#3 | Manufacturer/Product | none dedicated | DO NOT CREATE as standalone; fold into #8 as a use-case | MEDIUM-HIGH |
| 8 | پوشش سقف سوله | 10–100 | PENDING | Insufficient Trends data | Covering-type comparison/decision content, **distinct domain set** from #2/#3/#7 | Category/Article-Guide (decision-support) | none | NEW PAGE — strongest Solution-page candidate in the whole set | MEDIUM-HIGH |
| 9 | راهنمای خرید ساندویچ پانل | 10–100 | PENDING | Insufficient Trends data | Buying-guide article | Article/Guide | `/resources/sandwich-panel-selection-guide` (exists as "انتخاب" framing) | RETARGET existing resource's SEO fields to add "خرید" language | MEDIUM |
| 10 | نورگیر سقفی | 100–1K | PENDING | Insufficient Trends data | **Mixed** — Wikipedia + several residential/patio skylight installers | Article + Product (residential-leaning) | `/systems/daylighting-transparent-roofing` | RETARGET, but body copy must lean on industrial qualifiers to counter residential SERP contamination | MEDIUM |
| 11 | سقف پلی کربنات | 10–100 | PENDING | Insufficient Trends data | Buying-guide articles, one overlap with سقف متحرک (retractable+polycarbonate combo product) | Article/Guide | `/systems/daylighting-transparent-roofing` (as supporting material topic) | EXPAND #10 as a subtopic, not a separate page | MEDIUM |
| 12 | استندینگ سیم | 10–100 | PENDING | Insufficient Trends data | Competitor system/contractor pages — **same page type as SIPANEL's own page** | Manufacturer/Service contractor (system-led) | `/systems/standing-seam-zip-tech-roofing` | KEEP, already correctly positioned | MEDIUM-HIGH |
| 13 | سقف استندینگ سیم | 10–100 | PENDING | Insufficient Trends data | (not separately queried — current live primary keyword on the page; treated as a close variant of #12) | — | `/systems/standing-seam-zip-tech-roofing` | KEEP — current primary is fine, add bare استندینگ سیم as explicit secondary | MEDIUM |
| 14 | زیپ پانل | 10–100 (fa) / *"zip panel"=1K–10K is a false signal — see report §14, do not reuse* | PENDING | Insufficient Trends data | Same competitor domains as #12 (dalfa.co ranks for both) | Manufacturer/Service contractor | `/systems/standing-seam-zip-tech-roofing` | Secondary term on #12's page, not a separate page | MEDIUM-HIGH |
| 15 | نمای آلومینیومی | 10–100 | PENDING | Insufficient Trends data | **Heavily ACP/composite-dominated**, not solid-aluminium-dominated | Product/Article, ACP-leaning | `/systems/aluminium-cladding-covering` | KEEP page pending Business Fit answer; do not change scope without confirmation | LOW (business-fit blocked) |
| 16 | نمای کامپوزیت | 100–1K | PENDING | Insufficient Trends data | 100% ACP-specific commercial + informational | Product/Article + raw-material suppliers | none | BUSINESS FIT REQUIRES CONFIRMATION — no decision until answered | LOW (business-fit blocked) |
| 17 | ورق کامپوزیت | 100–1K | PENDING | Insufficient Trends data | Raw ACP sheet pricing/distribution (fabricator-facing, not facade-EPC-facing) | Marketplace/Product (material supplier) | none | BUSINESS FIT REQUIRES CONFIRMATION; if confirmed, this term is lower priority than نمای کامپوزیت (wrong buyer stage for an EPC) | LOW (business-fit blocked) |
| 18 | سازه چادری | 10–100 | PENDING | Insufficient Trends data | Direct competitor/contractor pages | Service contractor/System | `/systems/tensile-fabric-membrane-structures` | RETARGET primary keyword to bare term | MEDIUM-HIGH |
| 19 | سازه کششی | 10–100 | PENDING | Insufficient Trends data | Same domain overlap as #18 (sainats.com ranks for both) | Service contractor/System | `/systems/tensile-fabric-membrane-structures` | Secondary term on #18's page, confirmed same-intent by domain overlap | MEDIUM-HIGH |
| 20 | سقف متحرک | 100–1K | PENDING | Insufficient Trends data | **Dominant: B2C patio/restaurant/pool retractable-awning sellers** | Service contractor (residential/small-commercial) | `/systems/retractable-roof-covering-systems` | KEEP primary term, but EXPAND page to push large-span/architectural signals hard against B2C SERP noise | MEDIUM |
| 21 | سقف جمع شونده | 10–100 | PENDING | Insufficient Trends data | Same B2C cluster as #20 | Service contractor (residential) | `/systems/retractable-roof-covering-systems` | Secondary term on #20's page | MEDIUM |
| 22 | سایبان متحرک | 100–1K | PENDING | Insufficient Trends data | 100% small-project B2C patio/restaurant/pool awning sellers | Service contractor (B2C) | none, and none recommended | **DO NOT CREATE — confirmed** | MEDIUM-HIGH |
| 23 | ساندویچ پانل سردخانه‌ای | 10–100 | PENDING | Insufficient Trends data | Clean, dedicated product-category pages, well-separated from full cold-storage SERP | Manufacturer/Product | none dedicated (currently one line in applications lists) | NEW PAGE, product/envelope scope only | MEDIUM-HIGH |
| 24 | سردخانه صنعتی | 100–1K | PENDING | Insufficient Trends data | 100% full-refrigeration-contractor/equipment intent (HVAC, compressors, "design-to-operation") | Service contractor (full scope) | none, and none recommended as primary | **DO NOT CREATE as a primary money page — confirmed** | MEDIUM-HIGH |
| 25 | ساندویچ پانل کلین روم | 10–100 | PENDING | Insufficient Trends data | (not separately queried — repo shows zero cleanroom evidence at all; see #26) | — | none | HOLD pending business confirmation; weaker fit than cold storage | LOW |
| 26 | ساخت کلین روم | 10–100 | PENDING | Insufficient Trends data | Full HEPA/laminar-flow/regulatory cleanroom-only specialist contractors | Service contractor (regulated, full scope) | none, and none recommended | **DO NOT CREATE — confirmed** | MEDIUM-HIGH |
| 27 | ETFE / سقف ETFE | 0–10 (fa) | PENDING | Insufficient Trends data | Near-zero dedicated Persian commercial content; one real Iranian project reference found (Iran Mall / Mahan Garden ETFE roof) | Manufacturer/Technical (global) + one Project reference | `/systems/etfe-roof-facade-systems` | KEEP as Strategic Authority page; not a traffic target | MEDIUM |

---

## E. Notes on rows that could not reach MEDIUM-HIGH or higher

- **Rows 15–17 (Aluminium/Composite cluster):** capped at LOW regardless of SERP clarity, because the blocking factor is Business Fit, not evidence quality. No amount of SERP/GSC/Trends validation should override the instruction to confirm real ACP capability before touching this cluster.
- **Rows 2, 3, 6, 10, 11, 13:** capped at MEDIUM because SERP evidence exists but is not clean enough (mixed intent, or evidence borrowed from a sibling term) to justify MEDIUM-HIGH without the missing GSC/Trends layers.
- **No row is HIGH.** Per instruction, HIGH requires all evidence pillars; GSC and Trends are PENDING for all 27 terms in this pass.

---

## F. What changes once GSC data is supplied

The rows most likely to move once real GSC Iran data lands:
1. **Rows 2 vs. 3 vs. 7** (سقفی / دیواری / سوله) — GSC query+page data will show whether Google is already sending impressions to `/systems/sandwich-panel-systems` for these three variants, which is the deciding factor between "EXPAND the existing page" and "split into new URLs."
2. **Row 4** (قیمت ساندویچ پانل) — GSC will show whether SIPANEL already receives any impressions for commercial/price-intent queries despite having no dedicated page, which would raise this row's priority.
3. **Rows 12–14, 18–19** (Standing Seam / Zip / Tensile clusters) — GSC will confirm whether the existing pages are already capturing the bare head terms, validating the RETARGET-only recommendation instead of new content.
4. **Row 10** (نورگیر سقفی) — GSC position data will show whether the residential-intent contamination found in live SERP is actually suppressing SIPANEL's ranking, or whether industrial-qualifier long-tails are already working.
