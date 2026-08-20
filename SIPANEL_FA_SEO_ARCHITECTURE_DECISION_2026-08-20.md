# SIPANEL fa — SEO Architecture Decision (Executive Report)

**Date:** 2026-08-20
**Status:** Audit/decision phase complete. **No production files were changed.** No implementation has begun.
**Inputs:** `SIPANEL_FA_EXISTING_PAGE_KEYWORD_MAP_2026-08-20.md`, `SIPANEL_FA_KEYWORD_VALIDATION_2026-08-20.md`, the source Keyword Discovery report.

---

# Executive Verdict

- **30 existing Persian pages** audited (5 core + 7 systems + 8 solutions + 6 resources + 4 insights/hub), plus **13 net-new keyword clusters** evaluated for potential new pages — **43 decision rows total.**

| Decision | Count |
|---|---:|
| KEEP | 18 |
| RETARGET | 4 |
| EXPAND | 3 |
| NEW PAGE | 4 |
| MERGE | 7 |
| DO NOT CREATE | 7 |

**The single biggest finding:** SIPANEL's fa systems pages are already close to correct. Six of seven `/systems/*` pages need only keyword-level retargeting (swap an engineering-phrased primary keyword for the market-language equivalent — often a one- or two-word change), not new content. The real work is on the **`/solutions/*` layer**, where 7 of 8 pages are template-generated duplicates that should be merged away, and on **3–4 genuinely new pages** the discovery report and live SERP both support (اجرای ساندویچ پانل, قیمت ساندویچ پانل, پوشش سقف سوله, ساندویچ پانل سردخانه‌ای).

---

# Highest-Leverage Existing Pages (improve before creating anything)

Ranked by expected impact-per-effort:

1. **`/systems/standing-seam-zip-tech-roofing`, `/systems/tensile-fabric-membrane-structures`, `/systems/aluminium-cladding-covering`** — near-zero-cost primary-keyword retargets (استندینگ سیم / سازه چادری already validated as correct market terms by live SERP domain overlap with their engineering-phrased current equivalents). Aluminium page's retarget is gated on the Business Fit question below.
2. **The 7 templated `/solutions/*` pages** — consolidating these removes near-duplicate content that is actively working against the `/systems/*` pages (a cannibalization risk already flagged before this audit began, now confirmed again from the keyword-discovery side).
3. **`/systems/daylighting-transparent-roofing`** — retarget to نورگیر سقفی, but this is the one page where live SERP contamination (residential skylight installers) means the content work matters as much as the keyword swap.
4. **`/resources/sandwich-panel-selection-guide`** — a metadata-only change (add "خرید" alongside "انتخاب") captures a validated P2 cluster with zero new content required.
5. **`/systems/retractable-roof-covering-systems`** — keep the keyword, but this page needs the most content reinforcement of any "keep" page, because live SERP shows its exact head term is dominated by a completely different market segment (small B2C patio/restaurant awnings) than SIPANEL's actual large-span project work.

---

# New Pages Actually Justified

Only 4 clusters cleared the full bar (distinct intent + existing page cannot satisfy it + business fit + controllable cannibalization + real content available + some validation evidence):

### 1. اجرای ساندویچ پانل
- **Proposed URL:** retarget the existing `/solutions/industrial-sandwich-panel-installation` (preserves URL, avoids a new redirect)
- **Primary:** اجرای ساندویچ پانل — **Secondary:** نصب ساندویچ پانل, هزینه نصب ساندویچ پانل
- **Intent:** Service/how-it's-done, pre-RFQ
- **Funnel role:** Product page (سقفی/دیواری/core) → **this page** → Projects/Proof → RFQ
- **Distinctiveness:** SIPANEL's own controlled-installation process is genuinely differentiated content (shop drawing → sequencing → QA), not available on the current templated page
- **Closest competing SIPANEL URL:** `/systems/sandwich-panel-systems` (covers installation only as one of several engineering topics, not as the page's own intent)
- **Why it won't cannibalize:** distinct SERP intent confirmed live (installation-tutorial + installation-contractor result types, separate from both the Category and Price clusters)
- **Minimum content scope:** installation sequence, common failure points (already exists as engineering content elsewhere on the site and can be reused), what SIPANEL's controlled-installation process actually looks like, a real project reference
- **Business value:** high — closest of any cluster to an actual RFQ trigger
- **Validation evidence:** GKP 10–100 (fa), SERP MEDIUM-HIGH confidence, GSC/Trends pending

### 2. قیمت ساندویچ پانل
- **Proposed URL:** `/solutions/sandwich-panel-pricing-factors` (new — no existing URL owns this intent; naming avoids implying a literal live price list)
- **Primary:** قیمت ساندویچ پانل — **Secondary:** عوامل مؤثر بر قیمت ساندویچ پانل, قیمت ساندویچ پانل سقفی/دیواری (as subsections, not separate pages)
- **Intent:** Commercial/price, pre-RFQ, price-comparison shopping
- **Funnel role:** entry or mid-funnel → RFQ CTA
- **Distinctiveness:** genuinely separate from the Category page — SERP is 100% price-marketplace, a page type SIPANEL doesn't currently have any version of
- **Closest competing SIPANEL URL:** `/systems/sandwich-panel-systems` (no pricing content at all today)
- **Why it won't cannibalize:** live SERP shows zero overlap between this cluster's result set (Torob, daily-price sellers) and the Category/Service clusters
- **Minimum content scope:** what drives sandwich panel pricing (thickness, core type, quantity, project conditions) — **not** a literal daily price table, since SIPANEL is an RFQ business, not a per-sheet seller; end with a clear "get a project-specific quote" CTA
- **Business value:** medium-high — captures real commercial-intent traffic but must be honest about not offering instant per-m² pricing
- **Validation evidence:** GKP 100–1K (fa), SERP MEDIUM confidence (business-model mismatch risk flagged), GSC/Trends pending

### 3. پوشش سقف سوله
- **Proposed URL:** `/solutions/shed-roof-covering-selection` (new)
- **Primary:** پوشش سقف سوله — **Secondary:** انواع پوشش سقف سوله, عایق حرارتی سقف سوله
- **Intent:** Solution/decision — user hasn't chosen a system yet
- **Funnel role:** **This is the top of the recommended funnel** (Section below): Search language → **this page** → engineering explanation → system pages → proof → RFQ
- **Distinctiveness:** confirmed live — a genuinely separate SERP cluster (shed-roofing comparison/decision sites), distinct domains from every product-specific cluster tested
- **Closest competing SIPANEL URL:** `/systems` hub (similar comparison role, but engineering-phrased and positioned mid-funnel rather than as a market-language entry point) — see cannibalization Group C, MEDIUM risk, must be actively managed (this page should send users deeper into `/systems`, not duplicate its comparison table)
- **Why it won't cannibalize:** distinct SERP intent confirmed; role difference from `/systems` hub is by design (market-language entry vs. mid-funnel engineering comparison), not accidental overlap
- **Minimum content scope:** a real decision framework — span, slope, thermal transfer, waterproofing, wind load, fire, project conditions — leading to Sandwich Panel / Standing Seam / Rooflight
- **Business value:** high — this is the page shape the entire discovery report is built around (§40–41)
- **Validation evidence:** GKP 10–100 per term (coherent multi-term cluster), SERP MEDIUM-HIGH confidence, GSC/Trends pending

### 4. ساندویچ پانل سردخانه‌ای
- **Proposed URL:** `/solutions/sandwich-panel-cold-room` (new)
- **Primary:** ساندویچ پانل سردخانه‌ای — **Secondary:** پانل سردخانه, قیمت ساندویچ پانل سردخانه
- **Intent:** Product/application
- **Funnel role:** application page, sibling to پوشش سقف سوله but narrower
- **Distinctiveness:** confirmed live — clean, dedicated product-category SERP, well-separated from the full-refrigeration-contractor cluster
- **Closest competing SIPANEL URL:** `/systems/sandwich-panel-systems` (currently only lists "سردخانه‌ها" as one word inside an applications list)
- **Why it won't cannibalize:** scope is explicitly envelope/panel-only, which is also the only scope repository evidence supports — this keeps it distinct from any future full-cold-storage content (which is not recommended, see below)
- **Minimum content scope:** panel thickness/core selection for above-zero vs. below-zero rooms, joint/vapor-barrier detailing, a project reference if available
- **Business value:** medium — real, validated demand, but must stay disciplined about not implying full refrigeration/HVAC scope
- **Validation evidence:** GKP 10–100 (fa), SERP MEDIUM-HIGH confidence, GSC/Trends pending

---

# Pages That Should Not Be Created

| Cluster | Why not |
|---|---|
| نمای کامپوزیت / ورق کامپوزیت | **Business Fit Requires Confirmation.** Zero ACP evidence anywhere in the repository; live SERP shows this is a materials-supplier-dominated market, a different business model from SIPANEL's facade-EPC positioning. Do not build until the business/technical team confirms real ACP scope. |
| ساخت سردخانه / سردخانه صنعتی | Confirmed full-refrigeration-contractor SERP intent (HVAC, compressors, "design-to-operation"). Repository shows envelope-only scope. Building this page would set an expectation SIPANEL cannot deliver. |
| ساخت کلین روم / ساندویچ پانل کلین روم | Weakest business-fit evidence of any cluster examined — zero mentions anywhere in the repository, not even as a one-line application (unlike cold storage). SERP for the closest head term is dominated by regulated HEPA/laminar-flow specialist contractors. Hold entirely pending explicit confirmation. |
| سایبان متحرک / سایبان برقی | Confirmed B2C/small-project SERP dominance (patio, restaurant, pool awning sellers). Repository confirms SIPANEL's actual canopy work is exclusively large fixed architectural structures — a different market segment. Textbook "search opportunity ≠ business opportunity." |
| ساندویچ پانل سوله (as a standalone page) | Live SERP shares the same manufacturer domains as ساندویچ پانل سقفی/دیواری — building a fourth near-duplicate product page would recreate the exact cannibalization pattern already flagged for the core Sandwich Panel cluster. Belongs as a use-case inside پوشش سقف سوله instead. |
| Any X vs. Y comparison page (ساندویچ پانل یا ورق گالوانیزه, استندینگ سیم یا ساندویچ پانل, etc.) | Discovery report shows 0–10 GKP for every comparison phrasing tested; live SERP was not separately checked for these (correctly out of scope per the source report's own guidance) — comparisons belong inside پوشش سقف سوله and system pages, not as standalone pages. |
| Any single-thickness/spec long-tail (قیمت 4 سانت, ضخامت‌های مختلف, ابعاد, وزن, پیچ, فلاشینگ, زیرسازی, کندانس, تعریق, خوردگی, نشتی) | Explicitly out of scope per source report §10/§31/§39 — these remain sections inside the relevant system/solution page or resource guide, never standalone pages. |

---

# Cannibalization Risks — ranked

## HIGH

1. **The `/solutions/*` template cluster vs. `/systems/*`** — 7 pages share one generic fa template that directly overlaps its corresponding fully-authored systems page. This is the single largest cannibalization exposure on the fa site and predates this audit (already flagged in a prior repo audit); this keyword-discovery pass confirms none of the 7 has content that satisfies a genuinely distinct search intent.
2. **ساندویچ پانل سقفی / دیواری / سوله** — live SERP shows the same manufacturer domain set ranking for all three. Any future page split here must be evidence-gated by GSC (see validation file §F) — do not build three separate URLs preemptively.

## MEDIUM

3. **نمای آلومینیومی vs. نمای کامپوزیت** — not a SIPANEL-internal cannibalization risk today (no ACP page exists), but a *external* SERP-conflation risk: Google already treats these as substantially the same topic in live results. If ACP scope is ever confirmed and a composite page is built, it must be deliberately differentiated from the existing aluminium-cladding page or it will cannibalize itself.
4. **پوشش سقف سوله vs. `/systems` hub** — both are comparison/decision pages by nature. Justified as separate by funnel-stage role (market-language entry point vs. mid-funnel engineering comparison) but requires active editorial discipline to keep them from converging into the same content.
5. **نورگیر سقفی vs. سقف پلی‌کربنات vs. سقف متحرک** — polycarbonate roofing content has a natural pull toward both the daylighting page and the retractable-roof page (one live result literally combined "سقف متحرک پلی کربنات"). Keep polycarbonate material content on the daylighting page only; mention movable/retractable polycarbonate options on the retractable page without duplicating material specs.

## LOW

6. **استندینگ سیم / زیپ پانل** and **سازه چادری / سازه کششی** — confirmed same-intent by SERP domain overlap, but since both are consolidated onto a single existing page each in every recommendation in this report, there is no actual cannibalization exposure — flagging only to confirm the consolidation decision is correct and should be maintained.

---

# Business-Fit Questions Requiring Management Confirmation

1. **Does SIPANEL supply, fabricate, or contract Aluminium Composite Panel (ACP) facade systems, in any capacity?** (Zero repository evidence found. Blocks: نمای کامپوزیت, ورق کامپوزیت, and any retargeting of `/systems/aluminium-cladding-covering` toward composite terminology.)
2. **Does SIPANEL have, or intend to develop, any refrigeration/HVAC/full cold-storage-construction capability**, or is the business strictly envelope/panel supply for cold rooms? (Repository evidence supports envelope-only. Confirms ساندویچ پانل سردخانه‌ای as the correct scope; blocks ساخت سردخانه/سردخانه صنعتی.)
3. **Does SIPANEL have any cleanroom (HEPA/laminar-flow/regulated) capability, even at the panel-supply level?** (Zero repository evidence — weaker than cold storage. Blocks the entire cleanroom cluster until answered.)
4. **Is small-scale/B2C retractable awning (residential terraces, restaurants, pools) a market SIPANEL wants to enter**, separate from its existing large-span architectural canopy and retractable-roof work? (Repository evidence says no. Confirms DO NOT CREATE for سایبان متحرک/برقی.)

---

# 20–30 Keyword Validation Results — summary

Full detail in `SIPANEL_FA_KEYWORD_VALIDATION_2026-08-20.md`. Headline results:

- **GSC:** PENDING for all 27 validated keywords — no authenticated access or export available in this environment. Exact required export specified in the validation file.
- **Google Trends (Iran):** INSUFFICIENT ACCESS for all 27 — `trends.google.com` returned HTTP 429 on the one attempted fetch; the tool available in this environment cannot render Trends' JS-only interface. Requires a human browser session.
- **Live SERP:** completed for 18 of 27 terms via real web search (US-region, disclosed as a limitation), extrapolated for 9 closely-related sibling terms. This is the only evidence pillar with real signal in this pass, and it **surfaced two findings the source discovery report did not have**: (a) نمای آلومینیومی is far more ACP-conflated in live search than assumed, sharpening the urgency of the Business Fit question; (b) سقف متحرک's live SERP is dominated by small B2C awning sellers even more completely than سایبان متحرک alone, meaning the *existing* retractable-roof page's differentiation content matters more than previously flagged.
- **No keyword reached HIGH confidence** — by design, since two of four evidence pillars (GSC, Trends) are pending for every term.

---

# Recommended Implementation Order

### Wave 1 — Existing P1 pages: retarget/expand (lowest risk, no new URLs)
- Retarget `/systems/sandwich-panel-systems`, `/systems/standing-seam-zip-tech-roofing`, `/systems/tensile-fabric-membrane-structures` primary keywords to market language
- Retarget `/systems/daylighting-transparent-roofing` to نورگیر سقفی + add industrial-qualifier content to counter residential SERP contamination
- Expand `/systems/retractable-roof-covering-systems` with large-span/architectural differentiation content
- Retarget `/resources/sandwich-panel-selection-guide` metadata to add "خرید" alongside "انتخاب"
- Consolidate the 7 templated `/solutions/*` pages (merge into their corresponding `/systems/*` pages; retarget `/solutions/industrial-sandwich-panel-installation`'s URL to become the real اجرای ساندویچ پانل page rather than deleting it — preserves URL history per Section 22)

### Wave 2 — Evidence-backed new commercial/system pages
- اجرای ساندویچ پانل (on the retargeted `/solutions/industrial-sandwich-panel-installation` URL)
- قیمت ساندویچ پانل (new URL, RFQ-framed, not a live price table)
- پوشش سقف سوله (new URL — highest strategic priority of the wave)

### Wave 3 — Supporting guides/application content
- ساندویچ پانل سردخانه‌ای (new URL, envelope-only scope)
- ساندویچ پانل سقفی / دیواری sections inside the core Sandwich Panel page (upgrade to standalone URLs only if GSC evidence in a later pass shows split query demand)
- راهنمای خرید ساندویچ پانل framing already covered by Wave 1's resource retarget

### Wave 4 — Strategic authority content
- ETFE — no change needed to scope, continue treating as authority/consultant-confidence content, not a traffic target
- Any Aluminium/Composite, Cold Storage full-scope, or Cleanroom content **only after** the Business Fit questions above are answered

---

# Special Attention — Sandwich Panel Decision Tree

```
ساندویچ پانل                                    → KEEP core page, RETARGET primary keyword
├── ساندویچ پانل سقفی                            → EXPAND (section on core page) — upgrade to own URL only if GSC confirms split demand
├── ساندویچ پانل دیواری                          → EXPAND (section on core page) — same gate
├── قیمت ساندویچ پانل                            → NEW PAGE — distinct Commercial/Price intent, RFQ-framed
├── اجرای ساندویچ پانل                           → NEW content on retargeted /solutions/industrial-sandwich-panel-installation — distinct Service intent
├── ساندویچ پانل سوله                            → DO NOT CREATE separately — fold as a use-case into پوشش سقف سوله
├── ساندویچ پانل سردخانه‌ای                       → NEW PAGE — distinct Product/application intent, envelope-only scope
└── ساندویچ پانل کلین روم                        → DO NOT CREATE (for now) — weakest business-fit evidence of the whole tree
```

**Intent boundary logic:** Category (ساندویچ پانل) answers "what is this product family." Product variants (سقفی/دیواری) answer "which physical configuration." Commercial (قیمت) answers "what does it cost." Service (اجرای) answers "how does installation work and who does it." Application (سوله, سردخانه‌ای, کلین روم) answers "does this work for my specific building type" — and of the three applications, only سردخانه‌ای currently has both real repository evidence and clean SERP separation to justify its own URL today.

---

# Special Attention — `/solutions/*` Consolidation

All 8 pages were re-audited against the "unique keyword / unique problem / distinct funnel stage / distinct SERP intent / genuine reason to exist" test from Section 20 of the task instructions (full detail in the existing-page map, §B.3):

| URL | Verdict |
|---|---|
| `industrial-envelope-systems` | Passes all 5 tests — **KEEP**, only hand-authored page in the set |
| `shop-drawing-review-panel-projects` | Weak/borderline — real distinct service, but templated; **MERGE** content into a real page (either retarget this URL or fold into the matching `/resources/shop-drawing-review-guide`) |
| The other 6 | Fail every test — **MERGE** into their corresponding `/systems/*` page (or, for `industrial-sandwich-panel-installation`, retarget the URL itself into the new اجرای ساندویچ پانل page in Wave 2) |

Do not preserve any of the 6 failing pages merely because they already exist, per instruction — but do preserve their **URLs** where a natural retarget target exists, to avoid unnecessary redirects.

---

# Internal Linking Model (architecture only — not implemented)

```
Search language (پوشش سقف سوله / ساندویچ پانل سقفی / نورگیر سقفی / سقف متحرک / سازه چادری / استندینگ سیم)
      ↓
Product / Solution page (new Wave 2/3 pages, or expanded sections on /systems/*)
      ↓
Engineering explanation (/systems/* pages — the current fully-authored content)
      ↓
Projects / Proof (Tier A case studies — army-hospital, mehrabad-aircraft-hangar, erbil-eye-hospital-entrance-canopy, mahshahr-taxi-parking, etc., matched by system type)
      ↓
RFQ (/contact)
```

Per-P1-page architecture (parent/hub, supporting pages, proof, CTA):

| P1 page | Parent/hub | Supporting pages | Project proof | CTA |
|---|---|---|---|---|
| ساندویچ پانل (core) | `/systems` hub | سقفی/دیواری sections, راهنمای خرید (resource) | army-hospital, mahshahr-taxi-parking, mehrabad-aircraft-hangar | RFQ + اجرای ساندویچ پانل sibling |
| قیمت ساندویچ پانل | ساندویچ پانل (core) | — | — (price page should link to proof, not carry it) | RFQ (primary CTA of this whole page) |
| اجرای ساندویچ پانل | ساندویچ پانل (core) | راهنمای بازبینی شاپ‌دراوینگ (resource) | mahshahr-taxi-parking | RFQ |
| پوشش سقف سوله | `/systems` hub (sibling entry point) | all 7 system pages | one project per system type shown as a decision aid | Deeper into the matched system page, not a direct RFQ jump |
| استندینگ سیم | `/systems` hub | standing-seam-roof-detail-notes (resource) | ahvaz-airport-passenger-terminal, megaparsmall-atrium | RFQ |
| سازه چادری | `/systems` hub | — | any tensile/canopy project once case-study titles are keyword-aligned (separate, already-flagged workstream) | RFQ |
| سقف متحرک | `/systems` hub | — | large-span project reference, chosen specifically to counter B2C SERP framing | RFQ |
| نورگیر سقفی | `/systems` hub | سقف پلی‌کربنات (subsection) | any daylighting/skylight project | RFQ |
| ساندویچ پانل سردخانه‌ای | ساندویچ پانل (core) | — | any cold-room project if one exists in the Tier list | RFQ |

---

# URL Stability Principle — applied

Every recommendation above defaults to **KEEP URL + RETARGET/EXPAND content** ahead of creating a new URL, per instruction. The only 4 net-new URLs proposed (قیمت ساندویچ پانل, پوشش سقف سوله, ساندویچ پانل سردخانه‌ای, and the retarget-in-place of `industrial-sandwich-panel-installation` into اجرای ساندویچ پانل) are new **because no existing URL owns that search intent today** — not for cosmetic keyword reasons. No URL change is proposed for any page that already exists and already ranks for something.

---

# Implementation Backlog (proposed — NOT implemented)

| Order | URL | Action | Primary Keyword | Decision | Priority | Expected SEO Role | Dependencies |
|---:|---|---|---|---|---|---|---|
| 1 | `/systems/standing-seam-zip-tech-roofing` | Retarget primary keyword | استندینگ سیم | RETARGET | P1 | Category/System | None |
| 2 | `/systems/tensile-fabric-membrane-structures` | Retarget primary keyword | سازه چادری | RETARGET | P1 | Category/System | None |
| 3 | `/systems/sandwich-panel-systems` | Retarget primary keyword | ساندویچ پانل | RETARGET | P1 | Category | None |
| 4 | `/systems/daylighting-transparent-roofing` | Retarget + add industrial-qualifier content | نورگیر سقفی | RETARGET | P1 | Category | None |
| 5 | `/systems/retractable-roof-covering-systems` | Expand with large-span differentiation content | سقف متحرک | EXPAND | P1 | Category | None |
| 6 | `/resources/sandwich-panel-selection-guide` | Retarget metadata only | راهنمای خرید/انتخاب ساندویچ پانل | RETARGET | P2 | Supporting guide | None |
| 7 | 6 templated `/solutions/*` pages | Merge into corresponding `/systems/*` pages | — | MERGE | P1 | (removed as standalone) | Items 1–4 should land first so merge targets are already retargeted |
| 8 | `/solutions/industrial-sandwich-panel-installation` | Retarget URL into new page | اجرای ساندویچ پانل | RETARGET (URL) + NEW (content) | P1 | Service | Item 3 |
| 9 | New URL | Create | قیمت ساندویچ پانل | NEW PAGE | P1 | Commercial | Item 3 |
| 10 | New URL | Create | پوشش سقف سوله | NEW PAGE | P1/P2 | Solution/decision | Items 1–5 (must link into retargeted system pages) |
| 11 | New URL | Create | ساندویچ پانل سردخانه‌ای | NEW PAGE | P2/P3 | Product/application | Item 3, Business-Fit confirmation #2 |
| — | Aluminium/Composite, Cold Storage full-scope, Cleanroom | **HOLD — no action** | — | DO NOT CREATE / HOLD | HOLD | — | Business-Fit answers #1, #2 (partial), #3 |

**Do not launch Wave 1 and Wave 2 simultaneously.** Recommended first implementation slice, per instruction to avoid launching dozens of pages at once: **items 1–6 only** (all retarget/expand, zero new URLs, zero redirect risk), validated against real GSC data before proceeding to items 7–11.
