# SIPANEL fa — Existing Page ↔ Keyword Discovery Map

**Date:** 2026-08-20
**Phase:** Existing-page mapping (pre-validation)
**Source of truth for keywords:** `گزارش Audit-Ready تحلیل کلمات کلیدی فارسی SIPANEL — فاز Keyword Discovery.md` (supplied outside the repository)
**Source of truth for pages:** live repository content, fa locale (default/unprefixed — confirmed as canonical: production canonical for fa pages is `https://www.sipanelco.com/...` with no locale prefix; `/fa/...` 308-redirects to the unprefixed path)
**Scope:** No production files were read-and-changed in this phase. This is a comparison document only.

**Methodological reminder carried from the source report:** GKP ranges cited below are **All Locations**, not Iran volume. They are used only as directional discovery/language signal, exactly as the source report specifies.

---

## A. Repository state at time of audit

```
repo:   sipanel-website
branch: main
HEAD:   7250153 seo: align EN AR system pages with Iraq search terms
status: clean; only GSC_SYSTEMS_HUB_DEEP_AUDIT_2026-08-17.md untracked (preserved, unrelated)
```
fa content has not been touched by any commit in this session's history (all prior work this session was EN/AR-only, verified). The fa inventory below reflects the actual current production content.

---

## B. Primary SEO architecture inventory (non-project pages)

### B.1 Core pages

| Current URL | Page type | Current H1 | Current title | Primary visible subject | Search intent | Current target keyword | Indexable |
|---|---|---|---|---|---|---|---|
| `/` | Homepage | پوشش ساختمان‌های صنعتی، از طراحی تا اجرا | SIPANEL \| مهندسی پوسته ساختمان صنعتی | Brand + engineering positioning | Branded / navigational | مهندسی پوسته ساختمان صنعتی (brand phrase, not a market term per report §27/§49) | Yes |
| `/about` | About | درباره SIPANEL (generic) | درباره SIPANEL \| مهندسی پوسته صنعتی و اجرای کنترل‌شده | Company capability/trust | Branded | — (trust page, not keyword-targeted) | Yes |
| `/systems` | Category hub | سیستم‌های پوشش صنعتی برای سقف و نما | سیستم‌های پوشش صنعتی سقف و نما \| SIPANEL | 7-system category/selection guidance | Category / comparison | سیستم‌های پوشش صنعتی سقف و نما (engineering-led phrase, not in discovery report's market-language list) | Yes |
| `/faq` | FAQ | پرسش‌های صنعتی درباره پنل، سقف و کلادینگ | FAQ \| پرسش‌های صنعتی SIPANEL درباره پنل، سقف و کلادینگ | Cross-system Q&A | Informational | — | Yes |
| `/contact` | RFQ/conversion | اطلاعات پروژه را ارسال کنید... | تماس با SIPANEL \| ... | Lead capture | Transactional | — | Yes |

### B.2 Systems (`/systems/*`) — fully authored, engineering-led

| Current URL | Current H1 | Current title | Current target keyword (fa) | Relevant discovery cluster | Indexable |
|---|---|---|---|---|---|
| `/systems/sandwich-panel-systems` | سیستم‌های ساندویچ پانل با مهندسی پیش از نصب | سیستم‌های ساندویچ پانل \| مهندسی، تأمین و اجرای کنترل‌شده SIPANEL | سیستم‌های ساندویچ پانل | Sandwich Panel core (§4–5) | Yes |
| `/systems/standing-seam-zip-tech-roofing` | سقف استندینگ سیم با منطق مهندسی آب‌بندی | سقف استندینگ سیم و ZIP Tech \| سیستم سقف ضدآب صنعتی SIPANEL | سقف استندینگ سیم | Standing Seam (§13) | Yes |
| `/systems/aluminium-cladding-covering` | نمای آلومینیومی با مهندسی پیش از نصب | نمای آلومینیومی \| سیستم‌های نمای صنعتی SIPANEL | سیستم‌های نمای آلومینیومی | Aluminium/Composite (§15–17) | Yes |
| `/systems/daylighting-transparent-roofing` | سیستم‌های پوشش شفاف با مهندسی عملکردی | نورگیرها و پوشش‌های شفاف \| سیستم‌های نورگیر صنعتی SIPANEL | سیستم‌های نورگیر و پوشش شفاف | Rooflight/Polycarbonate (§18) | Yes |
| `/systems/tensile-fabric-membrane-structures` | سازه پارچه‌ای کششی با مهندسی فرم، تنش و اتصال | سازه پارچه‌ای کششی \| طراحی و اجرای پوشش غشایی SIPANEL | سازه پارچه‌ای کششی | Tensile Fabric (§19) | Yes |
| `/systems/retractable-roof-covering-systems` | سقف متحرک با مهندسی حرکت، آب‌بندی و ایمنی | سقف متحرک \| طراحی و اجرای پوشش بازشو SIPANEL | سقف متحرک | Retractable Roof (§20) | Yes |
| `/systems/etfe-roof-facade-systems` | پوشش ETFE با مهندسی فویل، هوا و سازه پشتیبان | پوشش ETFE \| سقف و نمای فویلی مهندسی‌شده SIPANEL | پوشش ETFE | ETFE (§22) | Yes |

**Important existing-architecture fact:** fa titles/H1s on the systems pages already largely match the discovery report's recommended market-language primaries almost exactly (سقف استندینگ سیم, سقف متحرک) or very closely (سیستم‌های ساندویچ پانل vs. bare ساندویچ پانل; سیستم‌های نمای آلومینیومی vs. bare نمای آلومینیومی; سازه پارچه‌ای کششی vs. سازه چادری). This is the single most important input to the decisions in Section D — most of the "system layer" work is **RETARGET (light)**, not **NEW PAGE**.

### B.3 Solutions (`/solutions/*`) — audited per Section 20 requirement

| Current URL | Current title (fa) | Unique keyword? | Unique problem? | Distinct funnel stage? | Distinct SERP intent? | Genuine reason to exist? |
|---|---|---|---|---|---|---|
| `/solutions/industrial-envelope-systems` | هماهنگی مهندسی رابط‌های پوسته ساختمان صنعتی \| SIPANEL | Yes — multi-system interface coordination, hand-authored | Yes — genuinely distinct (junction/interface coordination between adjacent systems) | Yes — post-selection, pre-execution | Not tested in this pass (engineering-only phrase, no discovery-report match) | **Yes** |
| `/solutions/industrial-sandwich-panel-installation` | اجرای صنعتی ساندویچ پانل \| SIPANEL | No — generic template, only page-name noun swapped | No | No | Overlaps `/systems/sandwich-panel-systems` and the discovery report's اجرای ساندویچ پانل cluster | **No** |
| `/solutions/sandwich-panel-for-factory-buildings` | ساندویچ پانل برای ساختمان‌های کارخانه \| SIPANEL | No — same template | No | No | Directly overlaps `/systems/sandwich-panel-systems` | **No** |
| `/solutions/standing-seam-roofing-industrial-buildings` | سقف استندینگ سیم برای ساختمان‌های صنعتی \| SIPANEL | No — same template | No | No | Directly overlaps `/systems/standing-seam-zip-tech-roofing` | **No** |
| `/solutions/industrial-roof-leakage-prevention` | پیشگیری از نشت سقف صنعتی \| SIPANEL | No — same template | Nominally yes (leakage) but templated, no unique body content | No | Overlaps `/systems/standing-seam-zip-tech-roofing`'s waterproofing section; discovery report §32 explicitly says leakage should be **supporting content, not a landing page** | **No** |
| `/solutions/aluminium-cladding-industrial-facades` | نمای آلومینیومی برای نماهای صنعتی \| SIPANEL | No — same template | No | No | Directly overlaps `/systems/aluminium-cladding-covering` | **No** |
| `/solutions/shop-drawing-review-panel-projects` | بازبینی شاپ‌دراوینگ پروژه‌های پانلی \| SIPANEL | No — same template | Weak — shop-drawing review is a real distinct service, but templated | Yes, arguably (procurement-stage) | Most distinct of the 7 templated pages | **Weak — borderline** |
| `/solutions/panel-material-optimization` | بهینه‌سازی متریال پانل \| SIPANEL | No — same template | No | No | Overlaps `/systems/sandwich-panel-systems` procurement content | **No** |

This confirms and extends the finding already on record from the prior EN/AR audit in this repository: **7 of 8 `/solutions/*` pages are template-generated with only the page name swapped, in fa as well as en/ar.** None of the 7 has content that could not already live inside its corresponding `/systems/*` page. This is the largest structural finding of this audit.

### B.4 Resources (`/resources/*`) — real, differentiated, gated technical content

| Current URL | Current title (fa) | Type | Relevant discovery cluster |
|---|---|---|---|
| `/resources` | مرکز دانش مهندسی پوشش‌های صنعتی (hub) | Hub | — |
| `/resources/sandwich-panel-selection-guide` | راهنمای انتخاب ساندویچ پانل | Gated PDF guide (14pp) | **Directly maps to discovery report's proposed "راهنمای خرید ساندویچ پانل" P2 candidate** — already exists in "انتخاب" (selection) framing, not yet in "خرید" (buying) framing |
| `/resources/roof-leakage-prevention-checklist` | چک‌لیست پیشگیری از نشتی سقف صنعتی | Gated PDF checklist | Leakage/waterproofing (§32) — matches report's "should be supporting content" guidance; already correctly scoped as a checklist, not a landing page |
| `/resources/shop-drawing-review-guide` | راهنمای بازبینی نقشه شاپ پروژه‌های پانلی | Gated PDF guide | Overlaps `/solutions/shop-drawing-review-panel-projects` (see Section E, Group: solutions consolidation) |
| `/resources/standing-seam-roof-detail-notes` | نکات دیتیل سقف ایستادرز | Gated PDF | Standing Seam technical detail (§13 supporting) |
| `/resources/aluminium-cladding-layout-checklist` | چک‌لیست چیدمان کلادینگ آلومینیومی | Gated PDF checklist | Aluminium technical detail |
| `/resources/mto-procurement-planning-sheet` | برگه برنامه‌ریزی MTO و خرید | Gated PDF | Procurement/execution supporting content |

**Finding:** this section is already architected almost exactly the way the discovery report recommends "Supporting Knowledge" should be built — real, substantial (not thin), gated technical deliverables rather than thin SEO pages. This is a **KEEP** section overall; the one live opportunity is retargeting `sandwich-panel-selection-guide`'s on-page SEO fields toward the validated "خرید"/"انتخاب" dual-language, not creating a competing page.

### B.5 Insights (`/insights/*`)

| Current URL | Current title (fa) | Note |
|---|---|---|
| `/insights` | hub | — |
| `/insights/sandwich-panel-joint-leakage-risk` | چرا منطق درز ساندویچ پانل ریسک نشتی را کنترل می‌کند | Body content is templated/near-duplicate across all 3 insight articles (pre-existing finding, unrelated to keyword discovery — noted for completeness, out of scope to fix here) |
| `/insights/standing-seam-roof-drainage-logic` | منطق زهکشی سقف استندینگ سیم پیش از اجرا | same |
| `/insights/aluminium-cladding-facade-joint-control` | کنترل درز نمای آلومینیومی در نماهای صنعتی | same |

Not a priority for this keyword-architecture decision — these are engineering-authority long-form pieces, not primary commercial targets in the discovery report.

---

## C. Project/case-study layer (Group B — evaluated separately, per instructions)

35 case studies under `/projects/*` + hub. Per instructions, these are evaluated only for:

- **Proof:** Strong — the Tier A project set (32-bed hospital, Mehrabad hangar, Erbil eye hospital canopy, etc.) gives SIPANEL real large-scale execution evidence for exactly the systems in this keyword map (sandwich panel, standing seam, cladding, tensile/canopy).
- **Long-tail relevance:** Low-to-none currently — case-study titles carry no keyword signal (a separate, already-documented finding from the prior EN/AR audit; out of scope here).
- **Internal-linking support:** This is the layer that should sit at the bottom of the funnel (`Search language → Product page → Engineering explanation → Projects/Proof → RFQ`, see Section 21 of the executive report) for every P1 system page. It is **not** a keyword-landing-page layer and no case study is recommended for conversion into one.

No individual project page is scored against the keyword clusters in this document.

---

## D. Existing Page ↔ Keyword Discovery — Core Decision Matrix

| Current URL / Proposed Cluster | Existing? | Current Intent | Proposed Primary Keyword | Secondary Keywords | Decision | Cannibalization Risk | Business Fit | Evidence | Priority | Reason |
|---|---|---|---|---|---|---|---|---|---|---|
| `/systems/sandwich-panel-systems` | Yes | Engineering/system overview | ساندویچ پانل | انواع ساندویچ پانل, مشخصات ساندویچ پانل | **RETARGET** | LOW (if سقفی/دیواری split out cleanly, see below) | HIGH | GKP 1K–10K (All Loc.) + SERP: mixed informational/manufacturer, no EPC-type competitor visible | P1 | Terminology gap only — page already owns the category; primary keyword phrasing should drop the extra "سیستم‌های" wrapper the market rarely searches |
| `/systems/sandwich-panel-systems` → روف variant | No (would be new content within existing page or new URL) | — | ساندویچ پانل سقفی | قیمت/نصب/اجرای ساندویچ پانل سقفی | **EXPAND existing page first; NEW PAGE only if validation in file 2 confirms** | MEDIUM (SERP for سقفی and سوله shares the same manufacturer domains — see file 2) | HIGH | GKP 100–1K; SERP: dedicated manufacturer category pages exist in-market | P1 | Report and SERP agree real product-variant intent exists; but SIPANEL is not a panel manufacturer/reseller — a strong **section** inside the core page may satisfy intent as well as a new URL. Validation-gated, see file 2. |
| — | No | — | ساندویچ پانل دیواری | قیمت/نصب/اجرای ساندویچ پانل دیواری | **EXPAND existing page first; NEW PAGE only if validation confirms** | MEDIUM (same as above) | HIGH | GKP 100–1K; SERP: same competitor cluster as سقفی | P1 | Same reasoning as روف variant |
| — | No | — | قیمت ساندویچ پانل | قیمت روز/لیست قیمت/قیمت هر متر ساندویچ پانل | **NEW PAGE (conditional on RFQ-model fit)** | LOW (clearly separate Commercial/Price intent from Category and Service) | MEDIUM–HIGH | GKP 100–1K; SERP: 100% price-marketplace/ecommerce (Torob, daily price lists) dominant | P1 | Report calls this out as coherent enough for its own page. **Caution:** SERP is dominated by transactional per-m² daily pricing from manufacturers/resellers — SIPANEL is an RFQ/EPC business, not a per-sheet seller. A literal "امروز قیمت" page would compete against a business model SIPANEL doesn't run. Recommend the page exist but be framed as **"چه چیزهایی روی قیمت ساندویچ پانل صنعتی اثر می‌گذارد" / RFQ-oriented pricing factors**, not a daily price list — this preserves the keyword capture without promising something SIPANEL can't deliver (a live price table). |
| — | No | — | اجرای ساندویچ پانل | نصب ساندویچ پانل, هزینه نصب ساندویچ پانل | **NEW PAGE** | LOW (Service intent, clearly separate from Category/Price) | HIGH — this is exactly SIPANEL's actual differentiator (controlled installation) | GKP 10–100; SERP: mix of how-to tutorials + real installation-contractor commercial pages (carenpanel: "قیمت اجرای... تهران و کرج") | P1 | Report explicitly flags this as likely higher business value than many high-traffic pages. SERP confirms a real "installation contractor" result type exists — SIPANEL fits that type better than most competitors shown (who are material sellers offering installation as an add-on) |
| `/solutions/industrial-sandwich-panel-installation` | Yes (templated, thin) | Nominally "installation" | (same as اجرای ساندویچ پانل above) | — | **MERGE / RETARGET into the NEW اجرای ساندویچ پانل page** | Would be HIGH if both existed independently | — | Templated content, see §B.3 | P1 | This URL already sits at the exact intent slot the report validates. Retarget this existing (weak) URL into the real "اجرای ساندویچ پانل" page rather than creating a fresh URL — **preserves URL stability**, per Section 22 principle. |
| — | No | — | ساندویچ پانل سوله | ساندویچ پانل سقف سوله, قیمت/اجرای ساندویچ پانل سوله | **DO NOT CREATE as separate page; fold into `پوشش سقف سوله` as an SIPANEL-recommendation section** | HIGH — SERP overlaps heavily with هم سقفی و هم پوشش سقف سوله | MEDIUM | GKP 10–100; SERP: same manufacturer domains as سقفی/دیواری | P2→HOLD | Report flagged this cannibalization explicitly (§10). SERP confirms domain overlap. Safer as a subsection of the Solution page than a fourth near-duplicate Product page. |
| `/systems` (hub) + new content | Partial | Category/comparison, engineering-led | پوشش سقف سوله | انواع پوشش سقف سوله, عایق حرارتی سقف سوله | **NEW PAGE** | MEDIUM (must be kept clearly distinct from `/systems` hub — see cannibalization Group C in file 3) | HIGH | GKP 10–100 per term but a coherent multi-term cluster; SERP: dedicated "shed roofing options" comparison sites, distinct domain set from product pages | P1/P2 | Report's strongest "Solution Page" candidate; SERP confirms a real "which covering type" decision-page format exists in-market and is NOT the same result set as the pure-product pages. This is the correct home for the funnel described in Section 21: user arrives not knowing which system, gets engineered into Sandwich Panel / Standing Seam / Rooflight. |
| `/systems/standing-seam-zip-tech-roofing` | Yes | Engineering/system overview | استندینگ سیم | سقف استندینگ سیم, ورق استندینگ سیم, ایستادرز, زیپ پانل | **KEEP** (already targets سقف استندینگ سیم; consider adding bare استندینگ سیم and زیپ پانل as explicit secondary terms) | LOW | HIGH | GKP 10–100 (technical cluster, not commercial); SERP: competitor **system/contractor pages** (archmetal.ir, dalfa.co), exactly SIPANEL's own page type | P2 | Best-aligned existing page in the whole site — title/H1 already essentially correct. Zip Panel SERP (a separate check) shares the same competitor domains, confirming it belongs as a secondary term on this same page, not a split page. |
| `/systems/aluminium-cladding-covering` | Yes | Engineering/system overview | نمای آلومینیومی | — | **KEEP, but flag Business-Fit question below** | MEDIUM–HIGH (see Business Fit Gate, Section F) | **REQUIRES CONFIRMATION** | GKP 10–100 (نمای آلومینیومی) vs. 100–1K (نمای کامپوزیت); SERP: "نمای آلومینیومی" results are **heavily ACP/composite-dominated** in live search, not solid-aluminium-dominated | P1 (pending confirmation) | Live SERP finding not in the source report: Google substantially conflates "نمای آلومینیومی" with "نمای کامپوزیت" in this market. This raises the stakes on the Business Fit question — see Section F. |
| — | No | — | نمای کامپوزیت | ورق کامپوزیت, قیمت نمای کامپوزیت | **BUSINESS FIT REQUIRES CONFIRMATION — no page work until answered** | Would be HIGH against `/systems/aluminium-cladding-covering` if built without a confirmed distinct scope | **REQUIRES CONFIRMATION** | GKP 100–1K (strongest Aluminium/Composite term); SERP: 100% ACP-specific commercial content, including raw-sheet suppliers (a different business model — material reseller, not facade EPC) | HOLD | Zero mentions of "کامپوزیت"/ACP anywhere in the repository (`grep` across `lib/`, `specs/`, `messages/`, `app/`, `components/` returns nothing). Cannot confirm SIPANEL supplies/executes/contracts ACP. Per Section 8 instruction, this must not be assumed from traffic alone. |
| `/systems/daylighting-transparent-roofing` | Yes | Engineering/system overview | نورگیر سقفی | سقف پلی کربنات, ورق پلی کربنات, نورگیر سقف سوله | **RETARGET** | LOW–MEDIUM | HIGH | GKP 100–1K; SERP: **mixed — Wikipedia + several *residential* skylight/patio-roof installers** (courtyard/patio-roof intent, not industrial) | P1/P2 | Current primary ("سیستم‌های نورگیر و پوشش شفاف") is engineering-phrased; retarget to نورگیر سقفی per report. **New finding not in source report:** live SERP for the bare head term shows meaningful residential-intent contamination — body copy should lean on "نورگیر سقف سوله"/industrial qualifiers to keep Google's relevance signal pointed at commercial/industrial buyers, not homeowners. |
| `/systems/tensile-fabric-membrane-structures` | Yes | Engineering/system overview | سازه چادری | سازه کششی, سازه پارچه‌ای | **RETARGET** | LOW | HIGH | GKP 10–100 each; SERP: direct competitor/contractor domains, with the **same domain (sainats.com)** ranking for both سازه چادری and سازه کششی — confirms shared intent | P2 | Current primary ("سازه پارچه‌ای کششی") is close but not the plain market term. Retarget title/H1 primary to سازه چادری, keep سازه کششی as an explicit synonym in the same content (not a second page) — SERP domain overlap makes a split indefensible. |
| `/systems/retractable-roof-covering-systems` | Yes | Engineering/system overview | سقف متحرک | سقف جمع شونده, سقف بازشو | **KEEP primary term, EXPAND differentiation content** | LOW on cannibalization, but **HIGH market-fit risk** (see reason) | HIGH (SIPANEL's actual project scale) | GKP 100–1K; SERP: **dominant result set is B2C retractable-awning sellers** (restaurant/pool/terrace) — same cluster as "سایبان متحرک" | P1/P2 | Primary term is already correct and shouldn't change. But live SERP shows "سقف متحرک" itself — not just "سایبان متحرک" — is contested almost entirely by small-scale consumer awning sellers. The page must lean hard into large-span/architectural/stadium-scale signals (project photos, spans, mechanism engineering) so Google and users don't mis-classify SIPANEL alongside patio-awning vendors. This is a content-differentiation task, not a keyword-swap task. |
| — | No | — | سایبان متحرک / سایبان برقی | — | **DO NOT CREATE** | N/A | **LOW** — confirmed B2C/small-project mismatch | GKP 100–1K (both terms) but SERP 100% patio/restaurant/pool retractable-awning sellers; repo evidence: SIPANEL's only "سایبان" work in the codebase is large fixed architectural canopies (hospital entrance, commercial entrances, stadium-scale), never small consumer awnings | HOLD | Textbook "Search opportunity ≠ Business opportunity" case, exactly as the source report frames it (§21). Repository confirms SIPANEL's real canopy work is a completely different market segment. |
| `/systems/etfe-roof-facade-systems` | Yes | Engineering/system overview | پوشش ETFE (fa) | — | **KEEP as Strategic Authority page, not a traffic target** | LOW | HIGH (as authority, not traffic) | GKP 0–10 for all fa ETFE terms; SERP: near-zero dedicated Persian commercial content — the one real Persian hit found is an actual Iranian ETFE project reference (Iran Mall / Mahan Garden), confirming rarity | P3 (traffic) / High (authority) | Confirms report's verdict exactly. No change recommended beyond what's already live. |
| `/resources/sandwich-panel-selection-guide` | Yes | Gated technical guide ("انتخاب") | راهنمای خرید ساندویچ پانل (add alongside existing "انتخاب" framing) | انواع/مشخصات/ضخامت ساندویچ پانل | **RETARGET (metadata-level only)** | LOW | HIGH | GKP 10–100 (راهنمای خرید ساندویچ پانل); SERP: dedicated buying-guide article format already standard in-market | P2 | This resource already covers the exact content shape the report recommends as a P2 pillar. No new page needed — align its SEO fields (title/meta/H1) to include "خرید" language alongside "انتخاب" so it can capture both query framings. |
| — | No | — | ساندویچ پانل سردخانه‌ای | پانل سردخانه, قیمت ساندویچ پانل سردخانه | **NEW PAGE (product/application angle only)** | LOW if scoped correctly (see Business Fit) | **HIGH, conditional on staying envelope-only** | GKP 10–100; SERP: clean, dedicated product-category pages, well-separated from the "سردخانه صنعتی" cluster | P2/P3 | Repository confirms SIPANEL's only cold-storage evidence is "سردخانه‌ها" listed as one of several sandwich-panel *applications* — no refrigeration/HVAC scope anywhere. Page must target the panel/envelope angle only. |
| — | No | — | سردخانه صنعتی / ساخت سردخانه | — | **DO NOT CREATE as a primary money page** | Would be HIGH against the product page above if scope isn't kept separate | **LOW — no full-refrigeration evidence in repo** | GKP 100–1K (سردخانه) / 10–100 (ساخت سردخانه); SERP: 100% full refrigeration-contractor/equipment intent (compressors, HVAC, "0 to 100 design-to-operation") | HOLD | Direct confirmation of the source report's caution (§24). SERP intent for "ساخت سردخانه"/"سردخانه صنعتی" is unambiguously full-refrigeration-contractor, which SIPANEL's repository shows no evidence of doing. |
| — | No | — | ساندویچ پانل کلین روم | — | **DO NOT CREATE (for now) — needs explicit business confirmation** | LOW (no competing SIPANEL page) | **LOW / REQUIRES CONFIRMATION** | GKP 10–100; SERP for "ساخت کلین روم" (closest head term) is dominated by full HEPA/laminar-flow/HVAC cleanroom-only specialist contractors | HOLD | Zero mentions of "کلین روم"/"اتاق تمیز" anywhere in the repository — not even as a listed application (unlike cold storage, which appears in every system's applications list). This is a materially weaker business-fit signal than cold storage. Do not build until confirmed. |
| — | No | — | ساخت کلین روم | — | **DO NOT CREATE** | N/A | **LOW** | Same evidence as above, stronger reason | HOLD | Full-contractor SERP intent (HEPA, laminar flow, regulatory) — a specialized, regulated construction category with zero repository evidence SIPANEL performs it. |

---

## E. Cannibalization groups (source-report groups, mapped to actual pages)

See the dedicated cannibalization section in `SIPANEL_FA_SEO_ARCHITECTURE_DECISION_2026-08-20.md` for the full analysis with SERP evidence attached to each group — summarized here against real URLs:

| Group | Pages/clusters involved | Same or distinct intent | Recommended owner |
|---|---|---|---|
| A | ساندویچ پانل / سقفی / دیواری | Distinct (Category vs. two Product variants) | One core page (`/systems/sandwich-panel-systems`) + two product sections/pages gated on validation |
| B | ساندویچ پانل / قیمت / اجرا | Distinct (Category vs. Price vs. Service) | Three separate pages — core system page, new price page, new/retargeted execution page |
| C | ساندویچ پانل سقفی / سوله / پوشش سقف سوله | Overlapping — سقفی and سوله share SERP domains; پوشش سقف سوله is genuinely distinct (Solution/decision page) | سقفی lives as a product page or section; سوله folds into پوشش سقف سوله as a use-case; پوشش سقف سوله gets its own new page |
| D | استندینگ سیم / زیپ پانل / سقف استندینگ سیم | Same intent — SERP domain overlap confirmed (dalfa.co ranks for both) | Single existing page (`/systems/standing-seam-zip-tech-roofing`), زیپ پانل as secondary term |
| E | نورگیر سقفی / سقف پلی کربنات / نورگیر سقف سوله | Same page, different qualifiers — پلی کربنات is a material sub-topic, نورگیر سقف سوله is the industrial-intent qualifier needed to counter residential SERP contamination | Single existing page (`/systems/daylighting-transparent-roofing`), retargeted |
| F | نمای آلومینیومی / نمای کامپوزیت / آلومینیوم سالید-cassette | Live SERP shows نمای آلومینیومی and نمای کامپوزیت **converge** more than the source report assumed | **BUSINESS FIT REQUIRES CONFIRMATION before any decision** |
| G | سازه چادری / سازه کششی / سازه غشایی | Same intent — confirmed by shared domain (sainats.com ranks for چادری and کششی) | Single existing page (`/systems/tensile-fabric-membrane-structures`), retargeted to چادری primary |
| H | سقف متحرک / سقف جمع‌شونده / سقف بازشو | Same intent (all share the B2C awning-seller SERP cluster) | Single existing page (`/systems/retractable-roof-covering-systems`) — but see the market-fit caution above |

---

## F. Business Fit Gate — explicit findings

| Cluster | Repository evidence | Live SERP evidence | Verdict |
|---|---|---|---|
| نمای کامپوزیت (ACP) | **Zero** mentions of "کامپوزیت"/ACP anywhere in `lib/`, `specs/`, `messages/`, `app/`, `components/` | SERP for both نمای کامپوزیت and (surprisingly) نمای آلومینیومی is ACP-dominated, including raw-sheet material suppliers | **BUSINESS FIT REQUIRES CONFIRMATION.** Per instructions, Solid Aluminium content must not be retargeted toward ACP for traffic alone. |
| Cold storage (سردخانه) | "سردخانه‌ها" appears only as one line in sandwich-panel/standing-seam/daylighting *applications* lists — never with refrigeration, HVAC, compressor, or equipment language | "سردخانه صنعتی"/"ساخت سردخانه" SERP is 100% full-refrigeration-contractor intent | **Envelope-only fit confirmed.** Target ساندویچ پانل سردخانه‌ای only; do not target ساخت سردخانه / سردخانه صنعتی as primary money pages. |
| Cleanroom (کلین روم) | **Zero** mentions anywhere in the repository, including in applications lists (weaker than cold storage) | "ساخت کلین روم" SERP is dominated by specialist HEPA/laminar-flow/regulatory contractors | **REQUIRES CONFIRMATION**, weaker fit than cold storage. Recommend holding entirely until business confirms even product-level cleanroom-panel scope. |
| سایبان متحرک / برقی (retractable awning) | SIPANEL's only "سایبان" work in the repo is large fixed architectural canopies (hospital entrance, commercial entrances) tied to Tier A projects — never small consumer/patio awnings | SERP 100% B2C patio/restaurant/pool retractable-awning sellers | **Confirmed poor fit.** Do not create; keep as supporting vocabulary only inside the retractable-roof and tensile-fabric system pages. |

---

## G. Summary counts (existing-page decisions only — full counts including net-new clusters are in the executive report)

- Pages/clusters evaluated in this document: **9 systems-layer rows, 8 solutions pages, 6 resources, 3 insights, homepage/about/faq**, plus **11 net-new-keyword clusters**
- See `SIPANEL_FA_SEO_ARCHITECTURE_DECISION_2026-08-20.md §Executive Verdict` for the consolidated decision tally across the full audit.
