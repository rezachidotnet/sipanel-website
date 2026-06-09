# SIPANEL Homepage Component Audit

**Date:** 2026-06-09
**Scope:** Homepage only (`app/[locale]/page.tsx`)
**Purpose:** Inventory current components, compare against spec architecture, identify gaps and problems.

---

## 1. Homepage Component Inventory

### Page-level setup

| Property | Value |
|----------|-------|
| File | `app/[locale]/page.tsx` |
| Type | Server Component (async) |
| SEO | Organization + LocalBusiness JSON-LD schemas |
| Wrapper | `app/[locale]/layout.tsx` provides Header + Footer |

### Component render order

| # | Component | File Path | Type | Translations | Responsive | Notes |
|---|-----------|-----------|------|-------------|------------|-------|
| 1 | SchemaScript (x2) | `components/seo/schema-script.tsx` | Server | n/a | n/a | Organization + LocalBusiness JSON-LD |
| 2 | HeroSection | `components/home/hero-section.tsx` | Client | `hero` (fa/en/ar/ru) | Yes (image sizes) | Catalog modal + secondary CTA |
| 3 | TrustBar | `components/home/trust-bar.tsx` | Server | `trustBar` (fa/en/ar/ru) | Yes (CSS grid) | 3 metrics: years, projects, area |
| 4 | ClientLogosSection | `components/trust/client-logos-section.tsx` | Client | `clientLogos` (fa/en/ar/ru) | Yes (carousel) | variant="carousel" |
| 5 | SystemsShowcase | `components/home/systems-showcase.tsx` | Server | `systemsShowcase` (fa/en/ar/ru) | Yes (image sizes) | 3 system cards with links |
| 6 | FeaturedProject | `components/home/featured-project.tsx` | Client | `featuredProject` (fa/en/ar/ru) | Yes (CSS grid) | Army Hospital video, lazy-load |
| 7 | EngineeringProofSnapshot | `components/home/engineering-proof-snapshot.tsx` | Client | `proofSnapshot` (fa/en/ar/ru) | Yes (picture element) | 3 proof cards with modal viewer |
| 8 | StickyMobileCta | `components/home/sticky-mobile-cta.tsx` | Client | `stickyCta` (fa/en/ar/ru) | Yes (JS visibility) | Scroll-aware, hides near footer |
| 9 | ProcessSection | `components/home/process-section.tsx` | Client | `process` (fa/en/ar/ru) | Yes (accordion mobile) | 4 expandable steps |
| 10 | CaseStudiesPreview | `components/home/case-studies-preview.tsx` | Server | `caseStudies` (fa/en/ar/ru) | Yes (image sizes) | 3 hardcoded case study cards |
| 11 | ComparisonSection | `components/home/comparison-section.tsx` | Server | `comparison` (fa/en/ar/ru) | Yes (dual layout) | Mobile vs desktop comparison |
| 12 | ResourcesPreview | `components/home/resources-preview.tsx` | Server | `resourcesPreview` (fa/en/ar/ru) | Partial | 3 resource cards, all "Coming Soon" |
| 13 | RfqSection | `components/home/rfq-section.tsx` | Client | `rfq` (fa/en/ar/ru) | Partial | Form with honeypot, Zod validation |

### Layout components (not in page.tsx, in layout.tsx)

| Component | File Path | Type | Translations |
|-----------|-----------|------|-------------|
| Header | `components/layout/header.tsx` | Client | `nav`, `header` (fa/en/ar/ru) |
| Footer | `components/layout/footer.tsx` | Server | `footer` (fa/en/ar/ru) |

### Supporting components (used by homepage components)

| Component | File Path | Used By |
|-----------|-----------|---------|
| CatalogDownloadModal | `components/home/catalog-download-modal.tsx` | HeroSection, Header, CatalogDownloadButton |
| CatalogDownloadButton | `components/home/catalog-download-button.tsx` | Projects page (not homepage directly) |

---

## 2. Comparison: Current vs Intended Architecture

### Spec sources reviewed:
- `specs/0_Sipanel_website_merged_2.json` (master strategy)
- `specs/1_component_implementation_map.json` (priority phases)
- `specs/pages/homepage.json` (homepage-specific)

| Spec Section | Spec ID | Current Component | Status |
|-------------|---------|------------------|--------|
| Header | `header` | Header | Built |
| Hero Section | `hero_section` | HeroSection | Built |
| Trust Bar | `trust_bar` | TrustBar | Built |
| Proof Snapshot | `proof_snapshot` | EngineeringProofSnapshot | Built |
| Problem Section | `problem_section` | -- | Not built |
| Solution Section | `solution_section` | -- | Not built |
| Comparison Section | `comparison_section` | ComparisonSection | Built |
| Services / Systems Cards | `services` / `systems_overview` | SystemsShowcase | Built (as systems, not services) |
| Industry Pages Preview | `industry_pages_preview` | -- | Not built |
| Why SIPANEL / Why Choose Us | `why_choose_us` | -- | Not built |
| Projects / Case Studies | `projects` | CaseStudiesPreview + FeaturedProject | Built (split into two) |
| Process Section | `process_section` | ProcessSection | Built |
| Certificates / Clients | `certificates_and_clients` | ClientLogosSection | Partial (logos only, no certificates) |
| Guarantee Section | `guarantee_section` | -- | Not built |
| Engineering Value | `engineering_value` | EngineeringProofSnapshot | Merged with proof_snapshot |
| Resources Section | `resources` | ResourcesPreview | Built (placeholder) |
| Engineering Insights | `engineering_insights` | -- | Not built |
| CTA / RFQ Form | `cta` / `rfq_section` | RfqSection | Built |
| Contact Section | `contact` | -- | Not built (RFQ serves this role) |
| Testimonials | `testimonials` | -- | Not built |
| Footer | `footer` | Footer | Built |
| Sticky Mobile CTA | `sticky_mobile_cta` | StickyMobileCta | Built |

---

## 3. Component Classification

| Component | Classification | Reasoning |
|-----------|---------------|-----------|
| Header | **Keep** | Functional, recently refined with compact language dropdown and sticky state |
| HeroSection | **Improve** | Working but hero image is generic (mahshahr_taxi), could use Army Hospital or brand visual |
| TrustBar | **Keep** | Clean, server component, real metrics |
| ClientLogosSection | **Improve** | Carousel works but needs audit for real vs placeholder logos |
| SystemsShowcase | **Keep** | Clean 3-card layout linking to real system pages |
| FeaturedProject | **Keep** | Recently refined, strong value statement, real video |
| EngineeringProofSnapshot | **Keep** | Unique technical proof, interactive modal viewer |
| StickyMobileCta | **Keep** | Good mobile conversion tool with scroll awareness |
| ProcessSection | **Keep** | Clear 4-step accordion |
| CaseStudiesPreview | **Improve** | Hardcoded data, not DRY with projects page data |
| ComparisonSection | **Keep** | Dual mobile/desktop layout is well-executed |
| ResourcesPreview | **Improve** | All 3 cards show "Coming Soon" - low value currently |
| RfqSection | **Keep** | Validated form with honeypot, Zod, analytics |
| Footer | **Keep** | Recently rebuilt with proper columns and bottom bar |
| Problem Section | **Missing** | Spec calls for pain-point cards, not yet built |
| Solution Section | **Missing** | Spec calls for solution flow, not yet built |
| Why Choose Us | **Missing** | Spec calls for benefits grid, not yet built |
| Industry Pages Preview | **Missing** | Spec calls for industry landing page teasers |
| Testimonials | **Missing** | Spec calls for quote cards |
| Guarantee Section | **Missing** | Spec calls for 3-item risk reduction proof |
| Engineering Insights | **Missing** | Spec calls for blog/insight preview cards |

---

## 4. Architecture Assessment

### Strengths

| Area | Assessment |
|------|-----------|
| **Multilingual** | Excellent. All 13 homepage components have translations in fa/en/ar/ru. next-intl used consistently. |
| **SEO** | Good. Server components where possible, JSON-LD schemas, semantic HTML. Page uses generateStaticParams for SSG. |
| **Mobile-first** | Good. ComparisonSection has dual layout. StickyMobileCta is scroll-aware. Most components use responsive image sizes. |
| **Performance** | Good. 5 server components reduce client JS. FeaturedProject lazy-loads video. EngineeringProofSnapshot uses IntersectionObserver. |
| **Analytics** | Moderate. trackEvent/trackCatalogEvent/trackCtaClick used in HeroSection, ProcessSection, StickyMobileCta, RfqSection. Missing from some components. |
| **Maintainability** | Good. Clean component boundaries, single-responsibility. Each component has its own translation namespace. |
| **Reuse** | Moderate. Components are homepage-specific. SystemsShowcase and CaseStudiesPreview could be reused on landing pages but currently hardcode data. |

### Weaknesses

| Area | Issue |
|------|-------|
| **Client component overuse** | 8 of 13 homepage components are client components. ProcessSection and FeaturedProject could potentially be server components with minimal refactoring. |
| **Hardcoded data** | CaseStudiesPreview has hardcoded multilingual project data instead of sharing with projects page data. |
| **Placeholder content** | ResourcesPreview shows 3 "Coming Soon" cards - adds visual weight without delivering value. |
| **Missing proof early** | Problem/Solution sections from spec are not built. The page goes Hero > TrustBar > ClientLogos > Systems without addressing user pain points first. |
| **CTA density** | Hero has 2 CTAs, StickyMobileCta has 2, RfqSection has form - but mid-page has no conversion points between FeaturedProject and RfqSection. |

---

## 5. Problems Found

### Content issues

| Problem | Location | Severity |
|---------|----------|----------|
| ResourcesPreview is entirely placeholder | `components/home/resources-preview.tsx` | Medium - shows "Coming Soon" x3, adds no value |
| CaseStudiesPreview hardcodes project data | `components/home/case-studies-preview.tsx` | Low - duplicates data from projects page |
| ClientLogosSection needs logo audit | `components/trust/client-logos-section.tsx` | Low - verify all logos are real clients |
| Hero image uses mahshahr_taxi project | `components/home/hero-section.tsx` | Low - may not be the strongest brand visual |

### Structural issues

| Problem | Location | Severity |
|---------|----------|----------|
| No Problem/Solution sections | Missing from page | Medium - spec says address pain points before showing solutions |
| No Why Choose Us section | Missing from page | Medium - no explicit benefits/differentiators section |
| No Guarantee/Risk section | Missing from page | Low - spec calls for risk reduction proof |
| No Testimonials | Missing from page | Low - no social proof quotes |
| No Engineering Insights | Missing from page | Low - no blog/article preview for SEO authority |

### Technical issues

| Problem | Location | Severity |
|---------|----------|----------|
| Too many client components | 8 of 13 components | Low - some could be server components |
| Missing analytics on some components | SystemsShowcase, TrustBar, ComparisonSection | Low - no click/view tracking |
| No explicit schema for FeaturedProject | `components/home/featured-project.tsx` | Low - could add VideoObject schema |
| CaseStudiesPreview has no analytics | `components/home/case-studies-preview.tsx` | Low - card clicks not tracked |

### Mobile/UX issues

| Problem | Location | Severity |
|---------|----------|----------|
| ResourcesPreview on mobile wastes scroll | All 3 cards are placeholders | Medium - empty content on mobile is worse |
| No mid-page CTA | Between FeaturedProject and RfqSection | Low - long scroll without conversion point |
| ComparisonSection shows different point counts | 5 mobile vs 6 desktop | Low - intentional but could confuse |

---

## 6. Final Recommendation Table

| Component | Current Status | Problem | Recommendation | Priority |
|-----------|---------------|---------|----------------|----------|
| Header | Built, refined | None | **Keep** | -- |
| HeroSection | Built | Generic hero image | **Improve** - consider stronger brand visual | P3 |
| TrustBar | Built | None | **Keep** | -- |
| ClientLogosSection | Built | Needs logo audit | **Improve** - verify real clients, remove placeholders | P3 |
| SystemsShowcase | Built | No analytics | **Improve** - add click tracking | P3 |
| FeaturedProject | Built, refined | No VideoObject schema | **Keep** - optionally add schema | P3 |
| EngineeringProofSnapshot | Built | None | **Keep** | -- |
| StickyMobileCta | Built | None | **Keep** | -- |
| ProcessSection | Built | Could be server component | **Keep** | -- |
| CaseStudiesPreview | Built | Hardcoded data | **Improve** - share data with projects page | P3 |
| ComparisonSection | Built | None | **Keep** | -- |
| ResourcesPreview | Placeholder | All "Coming Soon" | **Remove or hide** until real content exists | P1 |
| RfqSection | Built | None | **Keep** | -- |
| Footer | Built, refined | None | **Keep** | -- |
| Problem Section | Not built | Spec requires it | **Add later** - pain-point cards before solutions | P2 |
| Solution Section | Not built | Spec requires it | **Add later** - or merge with existing SystemsShowcase | P2 |
| Why Choose Us | Not built | No benefits section | **Add later** - differentiators/benefits grid | P2 |
| Guarantee Section | Not built | No risk reduction section | **Add later** - or merge into ComparisonSection | P3 |
| Industry Pages Preview | Not built | No industry landing teasers | **Add later** - when industry pages exist | P3 |
| Testimonials | Not built | No social proof | **Add later** - when real testimonials available | P3 |
| Engineering Insights | Not built | No blog preview | **Add later** - when blog content exists | P3 |

### Priority key

- **P1** - Should fix now (hurts current page)
- **P2** - Should build next (missing conversion-critical content)
- **P3** - Build when content/data is ready

### Summary

The homepage has 13 active components covering the core conversion flow: Hero > Trust > Systems > Proof > Process > CTA. Translation coverage is 100% across all 4 locales. The main gaps vs spec are Problem/Solution/Why sections (P2) and placeholder ResourcesPreview (P1). The architecture is sound for multilingual SSG with good server/client component split.

**Immediate action:** Remove or conditionally hide ResourcesPreview until real downloadable resources exist. Three "Coming Soon" cards weaken credibility.

**Next phase:** Add Problem/Solution or Why Choose Us section between TrustBar and SystemsShowcase to address user pain points before showing products.
