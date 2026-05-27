# SITE AUDIT REPORT

Date: 2026-05-24

## 1. Executive Summary

The implemented SIPANEL website passed the production build, route rendering, rendered-link, localized metadata, schema, RTL, language switcher, sitemap, robots, image alt, analytics safety, and static href checks completed in this audit.

Safe fixes applied during this audit:

- Aligned the aluminium cladding SEO landing route with the JSON source of truth: `/solutions/aluminium-cladding-industrial-facades`.
- Aligned the shop drawing SEO landing route with the JSON source of truth: `/solutions/shop-drawing-review-panel-projects`.
- Fixed SEO landing related-service links that were rendering as double-localized paths such as `/en/en/systems/...`.
- Added the missing homepage `#process` anchor.
- Replaced missing `#project-cost-check` CTA targets with `/contact#rfq-form`.
- Fixed footer Systems and Projects links so they no longer point generically to `/`.
- Replaced duplicated homepage/footer/sticky contact constants with `production_contact_info`.

`DEPLOYMENT_CHECKLIST.md` was requested as a source of truth, but no file with that name exists in the repository.

## 2. Passed Checks

- All implemented localized routes rendered with HTTP 200 in the production server.
- 76 localized pages were checked.
- `/sitemap.xml` and `/robots.txt` rendered correctly.
- All checked pages had exactly one H1.
- All checked pages had metadata, canonical URL, Open Graph title, and localized hreflang links.
- All checked pages had JSON-LD schema present.
- 324 JSON-LD blocks were present across checked pages.
- 200 rendered images were checked; no missing `alt` attributes were found.
- FA and AR sample routes rendered with `dir="rtl"`.
- Language switcher preserved the current route across EN, FA, AR, and RU.
- Static href scan across `app`, `components`, and `lib` found no suspicious internal route literals.
- Rendered production link crawl found zero broken internal links.
- Motion includes a global `prefers-reduced-motion: reduce` override.
- Analytics utilities are approved-event gated and no-op safe when GA4/GTM are not configured.
- RFQ file rules are constrained to `.pdf`, `.jpg`, `.jpeg`, `.png`, `.dwg` and 10 MB.

## 3. Broken Links

None found in the final rendered production link crawl.

Initial issues found and fixed:

- SEO landing related services rendered `/en/en/...`, `/fa/fa/...`, `/ar/ar/...`, and `/ru/ru/...`.
- Footer Systems and Projects links pointed to `/`.
- Homepage/service CTA used a missing `#project-cost-check` anchor.
- Homepage Process navigation target used `/#process`, but the section did not have `id="process"`.

## 4. Missing Routes

None found after fixes.

The final checked implemented routes include:

- Home: `/en`, `/fa`, `/ar`, `/ru`
- System pages: sandwich panel, standing seam ZIP roofing, aluminium cladding covering
- Solution pages: 8 localized SEO landing pages
- Core pages: contact, resources, FAQ, about
- Project pages: industrial roofing, sandwich panel factory, aluminium cladding industrial facade

## 5. Invalid or Unverified Contact Links

No invalid production contact links were found.

Verified rendered contact link formats:

- Phone: `tel:+983136751101`
- WhatsApp: `https://wa.me/9891206566528`
- Email: `mailto:info@sipanelco.ir`

Map links are not rendered because no verified map URL exists. The site correctly shows pending map/address states instead.

## 6. Missing Assets

No broken rendered image references were found in the production HTML audit.

Known intentionally missing assets:

- Resource downloadable files are pending.
- Several SEO landing page proof diagrams/drawings are pending.
- Initial case study technical gallery assets are pending where verified real project proof is unavailable.

## 7. Pending Proof / Pending Data

Pending states are present and expected for:

- Initial case study metrics, durations, leakage/waterproofing results, costs, and project locations where verified data is missing.
- About-page company metrics, which remain `pending_verified_data`.
- Resource hub downloadable files and lead-capture flow.
- SEO landing page technical proof assets and related project proof where real assets are missing.
- RFQ backend integration.
- Verified map URL.

No fake contact data was found after replacing duplicated contact constants with `production_contact_info`.

## 8. SEO Issues

No blocking SEO issues were found in the final automated audit.

Verified:

- Localized metadata exists.
- Canonical links exist.
- EN/FA/AR/RU hreflang links exist.
- Sitemap includes all implemented localized routes.
- Robots includes the production sitemap directive.
- Schema is present and uses production contact information or pending states.

Remaining non-blocking SEO risk:

- Full Lighthouse and visual SERP QA were not run in-browser in this session.

## 9. Accessibility Issues

No missing rendered image alt attributes were found.

Known areas for manual accessibility review:

- Keyboard/focus behavior in mobile menu, FAQ filters, gallery modal, and RFQ step controls.
- Color contrast after final real content and final imagery are added.
- Mobile tap target spacing under real-device testing.

## 10. Mobile / RTL Issues

Automated production HTML checks verified RTL direction for FA and AR.

Sticky CTA review:

- Homepage sticky CTA hides near the footer.
- Contact sticky CTA is in-flow/sticky and does not use fixed positioning.
- About sticky CTA was previously changed to sticky to avoid footer blocking.

Remaining manual check:

- True horizontal overflow and visual overlap need browser/device verification at 360px, 390px, 430px, 768px, and desktop widths.

## 11. Build, Lint, and TypeScript Results

Passed:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Production build generated 81 static pages, including localized app routes, sitemap, and robots.

## 12. Launch Blockers

No code/build/link/route/metadata/schema blockers were found after the fixes in this audit.

Operational launch blockers:

- RFQ/contact backend is not connected.
- Resource downloads and lead capture are pending.
- Verified map URL is missing.
- Manual browser QA and Lighthouse remain required before deployment.
- Verified case study proof data/assets must be supplied before replacing pending states.

## 13. Recommended Fix Order

1. Complete manual responsive QA and Lighthouse on `/en`, `/fa`, `/en/contact`, `/en/resources`, and one project page.
2. Connect RFQ backend only after endpoint, spam protection, privacy handling, and CRM/email workflow are approved.
3. Add verified map URL or keep the current pending map state.
4. Add verified downloadable resources and lead-capture behavior.
5. Replace pending case study/about/SEO proof fields only with verified internal project data.
6. Configure GA4/GTM IDs through environment variables when tracking is approved.
