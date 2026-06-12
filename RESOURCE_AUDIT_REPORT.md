# Resources Section — Full Audit Report

**Audit Date:** 2026-06-12
**Auditor:** Claude Code
**Scope:** /fa/resources, /en/resources, /ar/resources, /ru/resources + all 6 detail pages x 4 locales

---

## Executive Summary

The Resources section has solid foundational architecture — 6 resources fully localized in 4 languages (fa/en/ar/ru), proper routing with hreflang/canonical, structured data (JSON-LD), and a working lead capture pipeline to Odoo CRM. However, it has critical gaps in delivery: no actual PDF files exist, no email follow-up is sent after form submission, and the download form is missing an email field. Analytics tracking exists only as code comments with zero implementation. The section captures leads but never delivers the promised resource.

**Key Numbers:**
- 6 resources x 4 locales = 24 detail pages (all generated and accessible)
- 0 actual PDF files exist
- 0 analytics events implemented (13 planned in comments)
- 1 form field missing (email) that blocks all email-based follow-up

---

## Resource Inventory

| Locale | Resource Title | Slug | Detail Page Works | Download Form Works | PDF Exists | Translation Complete |
|--------|---------------|------|-------------------|--------------------|-----------|--------------------|
| en | Roof Leakage Prevention Checklist | roof-leakage-prevention-checklist | Yes | Yes | No | Yes |
| fa | Roof Leakage Prevention Checklist | roof-leakage-prevention-checklist | Yes | Yes | No | Yes |
| ar | Roof Leakage Prevention Checklist | roof-leakage-prevention-checklist | Yes | Yes | No | Yes |
| ru | Roof Leakage Prevention Checklist | roof-leakage-prevention-checklist | Yes | Yes | No | Yes |
| en | Sandwich Panel Selection Guide | sandwich-panel-selection-guide | Yes | Yes | No | Yes |
| fa | Sandwich Panel Selection Guide | sandwich-panel-selection-guide | Yes | Yes | No | Yes |
| ar | Sandwich Panel Selection Guide | sandwich-panel-selection-guide | Yes | Yes | No | Yes |
| ru | Sandwich Panel Selection Guide | sandwich-panel-selection-guide | Yes | Yes | No | Yes |
| en | Shop Drawing Review Guide | shop-drawing-review-guide | Yes | Yes | No | Yes |
| fa | Shop Drawing Review Guide | shop-drawing-review-guide | Yes | Yes | No | Yes |
| ar | Shop Drawing Review Guide | shop-drawing-review-guide | Yes | Yes | No | Yes |
| ru | Shop Drawing Review Guide | shop-drawing-review-guide | Yes | Yes | No | Yes |
| en | Standing Seam Roof Detail Notes | standing-seam-roof-detail-notes | Yes | Yes | No | Yes |
| fa | Standing Seam Roof Detail Notes | standing-seam-roof-detail-notes | Yes | Yes | No | Yes |
| ar | Standing Seam Roof Detail Notes | standing-seam-roof-detail-notes | Yes | Yes | No | Yes |
| ru | Standing Seam Roof Detail Notes | standing-seam-roof-detail-notes | Yes | Yes | No | Yes |
| en | Aluminium Cladding Layout Checklist | aluminium-cladding-layout-checklist | Yes | Yes | No | Yes |
| fa | Aluminium Cladding Layout Checklist | aluminium-cladding-layout-checklist | Yes | Yes | No | Yes |
| ar | Aluminium Cladding Layout Checklist | aluminium-cladding-layout-checklist | Yes | Yes | No | Yes |
| ru | Aluminium Cladding Layout Checklist | aluminium-cladding-layout-checklist | Yes | Yes | No | Yes |
| en | MTO Procurement Planning Sheet | mto-procurement-planning-sheet | Yes | Yes | No | Yes |
| fa | MTO Procurement Planning Sheet | mto-procurement-planning-sheet | Yes | Yes | No | Yes |
| ar | MTO Procurement Planning Sheet | mto-procurement-planning-sheet | Yes | Yes | No | Yes |
| ru | MTO Procurement Planning Sheet | mto-procurement-planning-sheet | Yes | Yes | No | Yes |

---

## Issue List by Priority

### P0 — Broken Functionality

| # | Issue | File | Line(s) | Evidence |
|---|-------|------|---------|----------|
| P0-1 | No PDF files exist anywhere in the system | N/A | N/A | Zero PDF files found matching any resource slug in `/public` or project root. All resources hardcoded as `assetStatus: 'pending_resource_file'` at `lib/resources/engineering-resource-hub.ts:1393` |
| P0-2 | No email follow-up after form submission | `app/api/lead/route.ts` | Full file | POST handler sends data to Odoo CRM but triggers no email. Success message at `lib/resources/engineering-resource-hub.ts:797` says "resource link will be sent" — it never is |
| P0-3 | Email field missing from download form | `components/resources/resource-detail-page-template.tsx` | 329-361 | Form renders name, phone, company, project_type, message — no email input. But line 144 sends `email: formData.get('email')` which resolves to `null`. Leads captured without email make follow-up impossible |
| P0-4 | Hub page lead capture form is non-functional | `components/resources/engineering-resource-hub-page.tsx` | 474 | Button has `type="button"` with `disabled` and `aria-disabled="true"`. Form is purely decorative |

### P1 — Missing Content / Data

| # | Issue | File | Line(s) | Evidence |
|---|-------|------|---------|----------|
| P1-1 | Resource detail pages missing from XML sitemap | `app/sitemap.ts` | 48 | Only hub page routes included. No call to `getAllResourceDetailStaticParams()`. 24 detail pages not in sitemap. Compare: case studies ARE included at line 52 |
| P1-2 | `standing_seam_roof_detail_notes` missing `fileSize` | `lib/resources/engineering-resource-hub.ts` | 318-329 | All other preview fields present (pageCount: 6, readingTime: '9 min', format: 'PDF') but no `fileSize` property. All other 5 resources have fileSize |
| P1-3 | `project_stage` field submitted but never collected | `components/resources/resource-detail-page-template.tsx` | 146 | Form sends `project_stage: formData.get('project_stage')` — no form input exists for this field. Always `null` |

### P2 — SEO Issues

| # | Issue | File | Line(s) | Evidence |
|---|-------|------|---------|----------|
| P2-1 | 24 detail pages not in sitemap | `app/sitemap.ts` | 48 | Same as P1-1. Routes like `/en/resources/sandwich-panel-selection-guide` not discoverable via XML sitemap |
| P2-2 | No explicit `robots` meta tag | `lib/seo/metadata.ts` | Full file | `buildPageMetadata()` does not set `robots` property. Defaults to index/follow which is correct, but explicit is better practice |
| P2-3 | DigitalDocument schema claims `isAccessibleForFree: true` | `components/resources/resource-detail-page-template.tsx` | 45 | Schema declares resource is freely accessible, but it requires form submission and the file does not exist |

### P3 — UX / Technical Improvements

| # | Issue | File | Line(s) | Evidence |
|---|-------|------|---------|----------|
| P3-1 | All analytics tracking is comments only — zero implementation | `components/resources/resource-detail-page-template.tsx` | 136, 177, 199, 203, 373, 444 | 6 `{/* track: ... */}` comments. No `gtag()`, no analytics service, no event functions |
| P3-1b | Hub page analytics also comments only | `components/resources/engineering-resource-hub-page.tsx` | 109, 118, 259, 263, 308, 322, 495 | 7 additional `{/* track: ... */}` comments with no implementation |
| P3-2 | Promise-performance mismatch in download flow | `components/resources/resource-detail-page-template.tsx` | 162-166 | User clicks "Get Resource" -> fills form -> success message says "resource link will be sent" -> nothing arrives. Damages trust |
| P3-3 | Hardcoded date defaults in sort control | `components/resources/resource-sort-control.tsx` | 30, 38 | Uses `'2026-01'` as fallback date. Will become stale |
| P3-4 | Hardcoded `'SIPANEL'` in DigitalDocument schema | `components/resources/resource-detail-page-template.tsx` | 48 | Should reference shared organization constant for consistency |

---

## Root Cause Analysis

| Root Cause | Affected Issues | Explanation |
|------------|-----------------|-------------|
| Resources launched before files were produced | P0-1, P0-2, P2-3, P3-2 | Content pages and lead capture were built first. Actual PDF production was deferred. No download URL generation or email delivery was ever implemented because no files existed to deliver |
| Form designed without email field | P0-3, P1-3 | Lead capture form was modeled after the RFQ form (phone-first for Iran market). Resources need email for file delivery but the field was never added to the form UI, only to the submission payload |
| Analytics deferred | P3-1, P3-1b | Tracking events were planned during development (comments mark intended positions) but no analytics service was integrated. No `gtag()`, no custom event tracking utility |
| Sitemap builder not updated when resources were added | P1-1, P2-1 | `app/sitemap.ts` was not extended to include resource detail page routes. Hub page was added but the 24 individual pages were missed |
| Hub form left in disabled state | P0-4 | Form was likely built as a placeholder during development and never activated. Button explicitly set to `disabled` with `aria-disabled="true"` |

---

## Recommended Fix Order

| Priority | Issue | Effort | Impact | Notes |
|----------|-------|--------|--------|-------|
| 1 | P0-3: Add email field to download form | Small | High | Unblocks all email-based follow-up. Single field addition in template + form handler |
| 2 | P0-1 + P0-2: Create PDF resources OR implement email delivery with download links | Medium-Large | Critical | Fulfills the core promise of the section. Without this, every lead form submission erodes trust |
| 3 | P1-1: Add resource detail pages to sitemap | Small | Medium | 24 pages become discoverable. Add `getAllResourceDetailStaticParams()` results to `app/sitemap.ts` |
| 4 | P0-4: Either enable hub form or remove it | Small | Medium | Dead UI creates confusion. Either wire submission handler or remove the form entirely |
| 5 | P3-1: Implement analytics tracking | Medium | High | Enables conversion measurement. Replace 13 comment placeholders with actual event calls |
| 6 | P1-2: Add missing fileSize to standing_seam_roof_detail_notes | Trivial | Low | Data completeness. Add `fileSize: 'X.X MB'` at line 319 |
| 7 | P2-3: Fix DigitalDocument schema accuracy | Trivial | Low | Either remove `isAccessibleForFree` or gate it on actual file availability |
| 8 | P3-3, P3-4: Fix hardcoded values | Trivial | Low | Code quality. Replace hardcoded date and org name with dynamic values |

---

## What Works Well

- Full 4-locale content with professional translations across all 6 resources (no placeholders detected)
- Proper hreflang/canonical/alternates implementation via `lib/seo/metadata.ts:33-41`
- Clean H1 structure (single H1 per page: hub at `engineering-resource-hub-page.tsx:303`, detail at `resource-detail-page-template.tsx:195`)
- 3 JSON-LD schemas per detail page: Article, DigitalDocument, BreadcrumbList
- Lead capture -> Odoo CRM pipeline functional (`app/api/lead/route.ts`)
- Honeypot spam protection working (`resource-detail-page-template.tsx:330`, CSS at `globals.css:4980-4993`)
- Rate limiting on API (8 requests per 10 minutes per IP)
- Form accessibility: `aria-live="polite"` feedback, proper labeling, disabled states
- RTL support for fa/ar locales via `getDirection(locale)`
- Responsive CSS at 640px/768px/1025px breakpoints
- Resource sort control with 4 modes: recommended, newest, oldest, shorter read time
- Category filter pills with counts on hub page
- Breadcrumbs localized for all 4 languages

---

## Route Reference

**Hub Pages:**
- `/en/resources`
- `/fa/resources`
- `/ar/resources`
- `/ru/resources`

**Detail Pages (example for one resource):**
- `/en/resources/sandwich-panel-selection-guide`
- `/fa/resources/sandwich-panel-selection-guide`
- `/ar/resources/sandwich-panel-selection-guide`
- `/ru/resources/sandwich-panel-selection-guide`

**API Endpoints:**
- `POST /api/lead` — lead capture submission

**Key Source Files:**
- `lib/resources/engineering-resource-hub.ts` — core data, types, builders (1877 lines)
- `components/resources/engineering-resource-hub-page.tsx` — hub page component (507 lines)
- `components/resources/resource-detail-page-template.tsx` — detail page template (456 lines)
- `components/resources/resource-sort-control.tsx` — sort control (89 lines)
- `components/resources/resource-breadcrumb.tsx` — breadcrumb component (35 lines)
- `app/api/lead/route.ts` — lead submission API (222 lines)
- `lib/rfq/odoo.ts` — Odoo CRM integration (136 lines)
- `app/sitemap.ts` — XML sitemap generator
- `lib/seo/metadata.ts` — SEO metadata builder
- `lib/seo/schema.ts` — JSON-LD schema builders
