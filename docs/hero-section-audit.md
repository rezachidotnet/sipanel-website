# SIPANEL Homepage Hero Section Audit

**Date:** 2026-06-09
**Status:** Review only — no implementation yet

---

## Current Hero Content

### Persian (fa)

| Element | Current Copy |
|---------|-------------|
| Eyebrow | مهندسی دقیق، اجرای مطمئن |
| Headline | سازه خود را به زیبایی پوشش کنید |
| Subheadline | نقشه شاپ دقیق، خرید هوشمند و نصب مهندسی انواع پوشش سازه‌های صنعتی |
| Primary CTA | دریافت کاتالوگ |
| Secondary CTA | درخواست بررسی هزینه پروژه |

### English (en)

| Element | Current Copy |
|---------|-------------|
| Eyebrow | Engineering Power. Controlled Execution. |
| Headline | Cover Your Structure with Precision and Beauty. |
| Subheadline | Precision shop drawings, controlled procurement, and engineered installation systems for industrial buildings. |
| Primary CTA | Get Catalog |
| Secondary CTA | Request Project Cost Check |

### Visual

- Image: `mahshahr_taxi-hero-desktop.webp` (Mahshahr Taxi Parking project)
- Desktop: 55/45 grid split with diagonal clip-path
- Mobile: Stacked, video/image below copy
- Overlay: 20% dark overlay on image

---

## 1. Headline Evaluation

### Persian: "سازه خود را به زیبایی پوشش کنید"
**Translation:** "Cover your structure with beauty"

**Problems:**

- **Consumer-facing tone.** "به زیبایی" (with beauty) sounds like a home decoration ad, not an industrial engineering company. Factory owners and EPC contractors don't buy beauty — they buy risk reduction, schedule reliability, and technical execution.
- **Product-focused, not engineering-focused.** The headline positions SIPANEL as a covering/cladding supplier. SIPANEL's differentiation is engineering control, not the panel itself.
- **Too generic.** Any sandwich panel seller could use this headline. It doesn't communicate what makes SIPANEL different.
- **Misaligned with page flow.** The sections below the hero talk about shop drawings, procurement optimization, risk prevention, 50-day hospital delivery — none of which relate to "beauty."

### English: "Cover Your Structure with Precision and Beauty."

**Same problems** as Persian, plus:
- Adding "Precision" doesn't fix the beauty framing. The word "Cover" still positions SIPANEL as a material supplier.
- Industrial decision-makers scanning this headline would classify SIPANEL as a commodity panel vendor.

**Verdict: The headline actively works against SIPANEL's positioning.**

---

## 2. Subheadline Evaluation

### Persian: "نقشه شاپ دقیق، خرید هوشمند و نصب مهندسی انواع پوشش سازه‌های صنعتی"

**Assessment:**
- This is actually better than the headline. It mentions shop drawings, smart procurement, and engineered installation — SIPANEL's real value.
- However, it reads like a feature list, not a benefit statement.
- "انواع پوشش سازه‌های صنعتی" (various industrial building coverings) again frames SIPANEL as a product supplier at the end.

### English: "Precision shop drawings, controlled procurement, and engineered installation systems for industrial buildings."

- Same issue: correct capabilities but listed as features, not framed as outcomes the buyer cares about.
- Missing: what problem does this solve? Why should the decision-maker care?

**Verdict: Contains the right content but structured as a feature list, not a value proposition.**

---

## 3. CTA Evaluation

| CTA | Label | Problem |
|-----|-------|---------|
| Primary | دریافت کاتالوگ / Get Catalog | A catalog download is a weak primary action for B2B industrial. It signals "browse our products" rather than "start solving your project problem." |
| Secondary | درخواست بررسی هزینه پروژه / Request Project Cost Check | This is actually the stronger CTA — it implies SIPANEL will review your project. But it's secondary. |

**Problems:**
- The CTA hierarchy is inverted. The engineering review / project assessment should be primary. The catalog should be secondary.
- "Get Catalog" is a product-seller action. "Get Engineering Review" is a consultative-seller action. SIPANEL positions as the latter but CTAs say the former.
- Neither CTA creates urgency or frames a clear next step.

**Verdict: CTAs are backwards. The consultative action is buried as secondary.**

---

## 4. Hero Visual Evaluation

**Current image:** Mahshahr Taxi Parking project photo

**Assessment:**
- The image shows a completed project, which is good for credibility.
- However, it's a parking structure — not the most impressive project in SIPANEL's portfolio.
- The Army Hospital (32-bed, 50-day delivery) is a far stronger proof point and already has video assets.
- The diagonal clip-path is a nice design touch that works well in both LTR and RTL.
- The 20% overlay is appropriate — maintains readability without hiding the project.

**Options:**
1. Use the Army Hospital project image — aligns with Featured Project section below
2. Use a technical/engineering image (shop drawings, site coordination) — aligns with SIPANEL's engineering positioning
3. Keep current but swap to a more impressive industrial project

**Verdict: The visual is acceptable but not optimized. A stronger project image or engineering-context visual would perform better.**

---

## 5. Trust Signal Evaluation

**Current state:** No trust signals in the hero. TrustBar appears as a separate section below.

**Assessment:**
- Industrial decision-makers scanning above-the-fold content see: headline + subheadline + CTAs + project photo.
- No metrics, no client proof, no credibility anchors.
- The eyebrow "مهندسی دقیق، اجرای مطمئن" attempts to serve as a trust signal but reads as a tagline, not proof.
- Moving trust metrics (30+ years, 400+ projects, 10M+ m²) into or near the hero would significantly strengthen first-impression credibility.

**Options:**
1. Add a compact trust strip inside the hero (below CTAs, above fold)
2. Keep TrustBar separate but ensure it's visible above the fold on desktop
3. Add 2-3 micro-proof points as text near the subheadline

**Verdict: Hero lacks early proof. Some trust signal should appear above the fold.**

---

## 6. Mobile Experience Evaluation

**Current mobile layout:**
- Eyebrow → Headline → Subheadline → CTAs → Image (stacked)
- padding-block: 14px 32px
- h1 at 32px font-size
- Image at min-height 300px

**Assessment:**
- The headline "سازه خود را به زیبایی پوشش کنید" takes up one screen line — efficient.
- But it communicates "panel seller" not "engineering partner."
- Two full-width stacked CTAs are good for touch targets.
- The image appears below the fold on most phones — acceptable.
- No trust signals visible on first mobile screen.

**Verdict: Mobile layout mechanics are fine. The content problem (weak headline, no trust signals) is what hurts mobile conversion.**

---

## A. Current Weaknesses Summary

| # | Weakness | Impact |
|---|----------|--------|
| 1 | Headline positions SIPANEL as a product seller, not an engineering company | Visitors immediately classify SIPANEL as another panel vendor |
| 2 | "Beauty" framing is consumer-facing, not industrial B2B | Misalignment with target audience (EPC contractors, factory owners) |
| 3 | CTA hierarchy is inverted — catalog download is primary, engineering review is secondary | Weaker conversion path; misses consultative positioning |
| 4 | No trust signals above the fold | Industrial buyers need credibility proof early |
| 5 | Subheadline lists features, not outcomes | Doesn't answer "why should I care?" |
| 6 | Hero image is a parking structure, not SIPANEL's strongest project | Missed opportunity to show impressive execution |
| 7 | Eyebrow reads as a generic tagline | Doesn't differentiate from competitors |

---

## B. Recommended Strategy

SIPANEL's hero should answer three questions in under 5 seconds:

1. **What do you do?** → Engineering, procurement, and installation management for industrial building envelopes
2. **Why should I trust you?** → 30+ years, 400+ projects, real execution proof
3. **What should I do next?** → Request an engineering review for my project

The hero should NOT:
- Mention beauty or aesthetics
- Position SIPANEL as a material seller
- Lead with a catalog download
- Use generic industry claims

---

## C. Three Alternative Headline Directions

### Direction 1: Engineering-First

**fa:** پوشش ساختمان صنعتی، از مهندسی تا اجرا
**en:** Industrial Building Envelopes, from Engineering to Execution

**Rationale:** Leads with the engineering process, not the product. Positions SIPANEL as a full-service engineering partner. "از مهندسی تا اجرا" captures the end-to-end value.

**Subheadline (fa):** نقشه‌های کارگاهی دقیق، تأمین کنترل‌شده و نصب مدیریت‌شده برای کاهش ریسک و دوباره‌کاری در پروژه شما.
**Subheadline (en):** Precise shop drawings, controlled procurement, and managed installation to reduce risk and rework in your project.

---

### Direction 2: Risk-Reduction-First

**fa:** ریسک اجرای پوشش سازه را قبل از شروع کاهش دهید
**en:** Reduce Envelope Execution Risk Before Construction Begins

**Rationale:** Directly addresses the buyer's pain point. Industrial decision-makers care about risk — schedule overruns, material failures, rework costs. This headline frames SIPANEL as the risk-reduction solution.

**Subheadline (fa):** SIPANEL با مهندسی نقشه‌های کارگاهی، بهینه‌سازی تأمین و مدیریت نصب، خطاهای اجرایی را پیش از وقوع کنترل می‌کند.
**Subheadline (en):** SIPANEL controls execution errors before they happen through shop drawing engineering, procurement optimization, and installation management.

---

### Direction 3: Project-Delivery-First

**fa:** مهندسی، تأمین و اجرای پوشش ساختمان‌های صنعتی
**en:** Engineering, Procurement & Execution for Industrial Building Envelopes

**Rationale:** Simple, direct, no-nonsense. States exactly what SIPANEL does in one line. Works well for B2B audiences who want clarity, not marketing.

**Subheadline (fa):** ساندویچ پانل، ایستادرز، کلادینگ آلومینیومی — از نقشه کارگاهی تا تحویل نهایی با کنترل مهندسی.
**Subheadline (en):** Sandwich panels, standing seam, aluminium cladding — from shop drawings to final delivery with engineering control.

---

## D. Recommended Final Headline and Subheadline

**Recommended direction: Direction 1 (Engineering-First)** with elements from Direction 3.

### Final recommendation:

**Eyebrow:**
- fa: مهندسی، تأمین و اجرای کنترل‌شده
- en: Engineering, Procurement & Controlled Execution

**Headline:**
- fa: پوشش ساختمان صنعتی، از مهندسی تا اجرا
- en: Industrial Building Envelopes, from Engineering to Execution

**Subheadline:**
- fa: نقشه‌های کارگاهی دقیق، تأمین بهینه‌شده و نصب مدیریت‌شده برای کاهش ریسک، دوباره‌کاری و هزینه‌های پنهان پروژه شما.
- en: Precise shop drawings, optimized procurement, and managed installation to reduce risk, rework, and hidden costs in your project.

**Reasoning:**
- Headline is clear, engineering-focused, and positions SIPANEL as a full-service partner
- "از مهندسی تا اجرا" captures the end-to-end value proposition
- Subheadline connects capabilities to buyer outcomes (risk, rework, hidden costs)
- No "beauty," no generic claims, no product-seller framing

---

## E. Recommended CTA Structure

| Position | Label (fa) | Label (en) | Action |
|----------|-----------|-----------|--------|
| Primary | دریافت بررسی مهندسی رایگان | Get Free Engineering Review | Links to /contact or RFQ section |
| Secondary | دانلود کاتالوگ فنی | Download Technical Catalog | Opens catalog lead capture modal |

**Reasoning:**
- Primary CTA is consultative and engineering-focused — it frames SIPANEL as reviewing the project, not selling a product
- Secondary CTA keeps the catalog path available for early-stage researchers
- "Free" in the primary CTA reduces friction
- Both CTAs are specific about what the user gets

---

## F. Recommended Hero Layout Improvements

### Desktop

1. **Keep the 55/45 grid split** — works well, gives visual enough space
2. **Consider swapping the image** to Army Hospital or a more impressive industrial project
3. **Add a compact trust strip** below the CTAs (still inside hero-copy): "۳۰+ سال تجربه · ۴۰۰+ پروژه · ۱۰,۰۰۰,۰۰۰+ m²" — small, muted text, not a full section
4. **Keep the diagonal clip-path** — it's distinctive and works in RTL

### Mobile

1. **Move trust strip** to appear between subheadline and CTAs
2. **Keep stacked CTAs** — good touch targets
3. **Consider removing or reducing eyebrow** on mobile to save vertical space
4. **Keep image below fold** — acceptable for mobile

### Visual

1. Replace Mahshahr Taxi Parking with a stronger project image
2. If using Army Hospital: aligns with Featured Project section below, creates a coherent narrative
3. If using a different image: choose one that shows scale, complexity, or engineering activity (not just a finished building)

---

## Implementation Priority

| Change | Priority | Complexity |
|--------|----------|-----------|
| Replace headline and subheadline copy | P1 | Low |
| Swap CTA hierarchy (engineering review as primary) | P1 | Low |
| Update eyebrow text | P2 | Low |
| Add compact trust strip inside hero | P2 | Medium |
| Replace hero image | P3 | Low (asset exists) |
| Update ar/ru translations to match | P1 | Low |
