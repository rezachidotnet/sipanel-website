# Flagship Project — Asset Readiness Audit

**Audit Date:** 2026-06-13
**Auditor:** Claude Code
**Mode:** READ-ONLY (no code, content, or commits changed)
**Scope:** `army-hospital`, `erbil-eye-hospital-entrance-canopy`, `imam-khomeini-airport-hajj-terminal`, `marun-petrochemical-visitor-terminal`, `mehrabad-aircraft-hangar`, `tabas-railway-facility`
**Lens:** Only assets that already exist in the repo + reasonable content work. **No new project execution / site visits assumed.**

---

## Repo-Wide Findings (apply to all six)

- **Drawings / specs / technical reports: ZERO.** A repo-wide search for `*.pdf *.dwg *.dxf *spec* *drawing* *detail* *report*` returned **nothing** for any of the six. There are no shop drawings, layout drawings, detail drawings, technical reports, material specs, or quantity data anywhere.
- **Client, contractor, and execution-duration data: absent** from every project JSON. (Only `army-hospital` has a timeline narrative — "<50 days" — embedded in case-study copy.)
- **Verified hard metrics:** only `area_m2` is a real number. All other "metrics" are qualitative prose.
- **Video:** only `army-hospital`. **Drone:** only `tabas` (one 4032×3024 still).
- **Each project has only ~1–2 real photographs** (a before/after pair). The 4 `.webp` files per project are responsive derivatives of the same source image, not distinct photos. No project has a construction, installation, or interior photo set.
- `tabas/project.json` references `tabas-installation.webp` and `tabas-technical-detail.webp` that **do not exist** in the folder (referenced-but-missing).

---

## 1. army-hospital
*32-bed military hospital · Raz & Jargalan, North Khorasan, Iran · 1,000 m² · <50-day full EPC*

**Photos** — Total: 2 webp (`card`, `hero-desktop`); **no source stills, no `gallery-large`/`hero-mobile`**
- Construction: 0 · Installation: 0 · Finished: 1 (frame from video) · Interior: 0 · Exterior: 1 · Drone: 0

**Video** — Raw footage: not in repo · Edited: **yes (4 files)**
- `army-hospital-18s` mp4+webm — **22.6 s @ 1920×1080** · `featured-extended` — 18 s @ 1920×1080 · `army-hospital-case-study.mp4` — **33 s @ 1280×720** + poster
- Quality: **Good** (1080p reels; case-study at 720p). Strongest media asset in the portfolio.

**Technical assets** — Shop/layout/detail drawings: none · Reports: none · Material specs: none · Quantity data: none

**Project facts** — Area 1,000 m² · Location Raz & Jargalan · Duration **<50 days (known)** · Client: missing (military/MoD, unnamed) · Contractor: missing · System: sandwich panel + structure + partitions (EPC) · Verified metrics: timeline only

| Category | Score |
|---|---|
| Visual Proof | 8 |
| Engineering Proof | 4 |
| Commercial Credibility | 8 |
| International Appeal | 6 |
| Buyer Conversion Potential | 8 |
| **Overall** | **6.8** |

**Critical missing:** real stats panel (panel m², tonnage, bed→m²→days), `gallery-large`+`hero-mobile`, any technical drawing, client/MoD reference
**Recommended:** 3–5 construction/installation stills, annotated drawing or animated detail
**Nice-to-have:** raw footage archive, extended interview/testimonial cut

**Effort (existing assets + content):** GOOD **+6 h** · EXCELLENT **+14 h** · WORLD-CLASS **+28 h** *(achievable — video already exists; the only one that can hit world-class from repo assets alone)*

---

## 2. erbil-eye-hospital-entrance-canopy
*Erbil, **IRAQ** · 1,500 m² · polycarbonate cladding + architectural space frame*

**Photos** — Total: 4 webp + 2 source (`before.jpg`, `after.JPG`)
- after.JPG = **2448×3264 (high-res)**; before = low-res
- Construction: 0 · Installation: 0 · Finished: 1 · Interior: 0 · Exterior: 1–2 · Drone: 0

**Video** — Raw: none · Edited: none · Duration: — · Quality: n/a

**Technical assets** — none (no drawings/reports/specs/quantities)

**Project facts** — Area 1,500 m² · Location Erbil, Iraq (only international project) · Duration: missing · Client: missing · Contractor: missing · Systems: polycarbonate_cladding, architectural_space_frame · Verified metrics: area only · Full 4-lang narrative (challenge / engineering_decision / measured_result / risk_prevented) + "eye-form architecture" hook

| Category | Score |
|---|---|
| Visual Proof | 5 |
| Engineering Proof | 4 |
| Commercial Credibility | 6 |
| International Appeal | 10 |
| Buyer Conversion Potential | 8 |
| **Overall** | **6.6** |

**Critical missing:** more finished photos (multiple angles of the eye-form), stats panel, client reference
**Recommended:** video / animated reveal of the eye-geometry, space-frame drawing or 3D
**Nice-to-have:** drone, night-lit shot

**Effort:** GOOD **+6 h** · EXCELLENT **+18 h** · WORLD-CLASS **~+40 h but capped at "Excellent" from repo assets** (true world-class needs new photography/video of the form)

---

## 3. imam-khomeini-airport-hajj-terminal
*Tehran, Iran · 5,000 m² · passenger waiting hall*

**Photos** — Total: 4 webp + 2 source (`before.jpg`, `after.jpg`)
- after.jpg = **1280×960 (low-res — weakest source imagery of the six)**
- Construction: 0 · Installation: 0 · Finished: 1 · Interior: possibly · Exterior: 1 · Drone: 0

**Video** — none

**Technical assets** — none

**Project facts** — Area 5,000 m² · Location Tehran · Duration/Client/Contractor: missing · Systems: sandwich_panel, polycarbonate_daylighting · Verified metrics: area only · Full 4-lang narrative

| Category | Score |
|---|---|
| Visual Proof | 4 |
| Engineering Proof | 4 |
| Commercial Credibility | 7 |
| International Appeal | 6 |
| Buyer Conversion Potential | 6 |
| **Overall** | **5.4** |

**Critical missing:** **higher-resolution photography** (current source is too small for a flagship), stats panel, client reference
**Recommended:** video, drawings, interior daylighting shots
**Nice-to-have:** drone, passenger-context photography

**Effort:** GOOD **+8 h** · EXCELLENT **+20 h** · WORLD-CLASS **blocked from repo assets** (requires a reshoot — only 1280×960 exists)

---

## 4. marun-petrochemical-visitor-terminal
*Mahshahr, Iran · 5,000 m² · industrial gathering facility*

**Photos** — Total: 4 webp + 2 source (`maroon-before.jpg`, `maroon-after.jpg`)
- after = **2592×1552 (solid)**
- Construction: 0 · Installation: 0 · Finished: 1 · Interior: 0 · Exterior: 1 · Drone: 0

**Video** — none

**Technical assets** — none

**Project facts** — Area 5,000 m² · Location Mahshahr · Duration/Client/Contractor: missing · **Systems (richest): sandwich_panel, tensile_membrane_structure, custom_connection_design, large_span_space_frame** · Verified metrics: area only · Full 4-lang narrative

| Category | Score |
|---|---|
| Visual Proof | 5 |
| Engineering Proof | 5 |
| Commercial Credibility | 7 |
| International Appeal | 7 |
| Buyer Conversion Potential | 8 |
| **Overall** | **6.4** |

**Critical missing:** stats panel, **named petrochemical client reference** (highest-impact possible add), HSE credentials
**Recommended:** video, drawings of the tensile/space-frame/custom connections, multi-angle photos
**Nice-to-have:** drone, safety/installation sequence

**Effort:** GOOD **+8 h** · EXCELLENT **+18 h** · WORLD-CLASS **capped at "Excellent" from repo assets** (multi-system engineering deserves drawings/video that don't exist yet)

---

## 5. mehrabad-aircraft-hangar
*Tehran, Iran · 5,000 m² · aircraft hangar (large-span)*

**Photos** — Total: 4 webp + 2 source (`before.jpeg`, `after.jpeg`)
- after = **1024×768 (low-res)**
- Construction: 0 · Installation: 0 · Finished: 1 · Interior: 0 · Exterior: 1 · Drone: 0

**Video** — none

**Technical assets** — none

**Project facts** — Area 5,000 m² · Location Tehran · Duration/Client/Contractor: missing · Systems: sandwich_panel · Verified metrics: area only — **no span / clear-height data (the defining metric for a hangar)** · Full 4-lang narrative

| Category | Score |
|---|---|
| Visual Proof | 4 |
| Engineering Proof | 5 |
| Commercial Credibility | 7 |
| International Appeal | 6 |
| Buyer Conversion Potential | 6 |
| **Overall** | **5.6** |

**Critical missing:** **span/clear-height metrics**, higher-res photography, structural drawings, client reference
**Recommended:** drone (hangar scale is a drone story), video, interior span shot
**Nice-to-have:** aircraft-in-context photo

**Effort:** GOOD **+8 h** · EXCELLENT **+20 h** · WORLD-CLASS **blocked from repo assets** (low-res + no drawings/span data)

---

## 6. tabas-railway-facility
*Tabas, Iran · 10,000 m² (largest) · double-curved railway roof (assets under folder `tabas`)*

**Photos** — Total: 4 webp + 2 source (`DJI_0838.JPG`, `main.JPG`)
- **`DJI_0838.JPG` = 4032×3024 DRONE (only drone asset in the portfolio)**; `main.JPG` = 1644×875
- Construction: 0 · Installation: 0 (referenced `tabas-installation.webp` is **missing**) · Finished: 1 · Interior: 0 · Exterior: 1 · **Drone: 1**

**Video** — none (but a 4K drone still exists → cheapest path to motion content)

**Technical assets** — none (referenced `tabas-technical-detail.webp` is **missing**)

**Project facts** — Area **10,000 m²** · Location Tabas · Duration/Client/Contractor: missing · System: sandwich panel roofing · **Richest structured JSON**: `proof_points`, `metrics` block (qualitative), `risk_prevented`, `primary_message` · Verified metrics: area only (rest qualitative)

| Category | Score |
|---|---|
| Visual Proof | 6 |
| Engineering Proof | 6 |
| Commercial Credibility | 6 |
| International Appeal | 5 |
| Buyer Conversion Potential | 5 |
| **Overall** | **5.6** |

**Critical missing:** the two referenced-but-missing images (`installation`, `technical-detail`), curvature/span metrics, client reference
**Recommended:** drone video (from existing aerial position), double-curve geometry drawing, before/construction photo
**Nice-to-have:** time-lapse, multi-angle drone set

**Effort:** GOOD **+6 h** · EXCELLENT **+16 h** · WORLD-CLASS **~+34 h, near-achievable** (4K drone gives a real head-start; geometry drawing is the gating add)

---

## Effort Summary

| Project | GOOD | EXCELLENT | WORLD-CLASS (asset-constrained) |
|---|---|---|---|
| army-hospital | +6 h | +14 h | **+28 h — achievable** (video exists) |
| erbil-eye-hospital-entrance-canopy | +6 h | +18 h | ~+40 h — *capped at Excellent w/o new photo/video* |
| imam-khomeini-airport-hajj-terminal | +8 h | +20 h | **blocked** — needs reshoot (low-res only) |
| marun-petrochemical-visitor-terminal | +8 h | +18 h | *capped at Excellent w/o new media/drawings* |
| mehrabad-aircraft-hangar | +8 h | +20 h | **blocked** — low-res + no span data/drawings |
| tabas-railway-facility | +6 h | +16 h | ~+34 h — near-achievable (drone head-start) |

> **Hard constraint flagged:** "world-class" normally requires construction photos + technical drawings. Those **cannot be produced from existing repo assets** for any project. Only `army-hospital` (video) and `tabas` (4K drone) carry enough raw visual proof to approach world-class without new capture. The other four can realistically reach **"Excellent"** from the repo and need new photography/drawings to go beyond.

---

## Final Rankings

**A. Fastest to upgrade** (least work to a strong state)
1. army-hospital (video done) · 2. tabas (drone + richest JSON) · 3. erbil (full webp set + hi-res after) · 4. marun · 5. mehrabad · 6. imam-khomeini (needs reshoot)

**B. Highest commercial value**
1. army-hospital · 2. erbil-eye-hospital (only Iraq) · 3. marun-petrochemical · 4. imam-khomeini-airport · 5. mehrabad-aircraft-hangar · 6. tabas-railway-facility

**C. Best GCC/Iraq marketing value**
1. erbil-eye-hospital (literal Iraq) · 2. marun-petrochemical (Gulf oil & gas) · 3. army-hospital (EPC speed) · 4. imam-khomeini-airport · 5. mehrabad · 6. tabas

**D. Best engineering showcase value**
1. tabas (double-curved long-span) · 2. marun (4 systems incl. tensile membrane + custom connections) · 3. mehrabad (large-span hangar) · 4. erbil (eye-form space frame) · 5. imam-khomeini (daylighting) · 6. army-hospital (speed > structural complexity)

---

## Final Recommendation — If SIPANEL can fund only THREE flagships next phase

### Select: **army-hospital · erbil-eye-hospital-entrance-canopy · marun-petrochemical-visitor-terminal**

**Why these three**
- **army-hospital** — the only project that can reach **true world-class from repo assets alone** (full 1080p video suite + the universal <50-day EPC story). Highest commercial value, lowest risk, fastest to publish. Non-negotiable pick.
- **erbil-eye-hospital-entrance-canopy** — the **only international/Iraq proof point** SIPANEL owns, and it already has a complete responsive image set plus a high-res (2448×3264) finished photo and a strong "eye-form architecture" narrative. Irreplaceable for GCC/Iraq market entry; reaches "Excellent" cheaply.
- **marun-petrochemical-visitor-terminal** — the **strongest Gulf-industrial fit** (petrochemical / oil & gas), the **richest engineering system set** (tensile membrane + space frame + custom connections), and a solid 2592×1552 finished photo. A named client reference would push it to top-2.

**Honest caveat for leadership:** only **army-hospital** is world-class-ready from existing assets. **erbil** and **marun** are world-class *worthy* but, under the no-new-execution constraint, cap at **"Excellent"** until a modest new photo/video/drawing shoot is funded.

**Asset-purist alternate:** if the priority is "world-class achievable from the repo with zero new capture," swap **marun → tabas-railway-facility** — its unique 4K drone still + richest structured data make it the second-most asset-ready after army-hospital, at the cost of lower direct GCC/buyer pull.

**Do not prioritize** `imam-khomeini-airport` or `mehrabad-aircraft-hangar` next phase: both are gated on **low-resolution source imagery** that forces a reshoot before either can perform as a flagship — exactly the "new execution" this phase is meant to avoid.
