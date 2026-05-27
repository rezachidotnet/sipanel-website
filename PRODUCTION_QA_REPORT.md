# Production QA Report

Date: 2026-05-24

## Completed checks

- Production build completed successfully: 81 static pages generated.
- `npm run lint` passed with no warnings or errors.
- `npm run typecheck` passed.
- `npm run build` passed.
- Production server route audit passed for 78 URLs:
  - `/en`, `/fa`, `/ar`, `/ru`
  - About, contact, FAQ, resources
  - all implemented systems pages
  - all implemented solutions pages
  - all implemented project pages
  - `/sitemap.xml` and `/robots.txt`
- Route audit verified one H1, canonical, meta description, Open Graph title, localized alternates, and JSON-LD presence on every checked page.
- RTL audit verified `lang` and `dir="rtl"` for FA and AR sample routes.
- Language switcher audit verified locale links preserve the current route for project pages.
- Image audit verified rendered sample routes contain no `<img>` tags missing `alt`.
- Sitemap and robots are present and reference localized production URLs.
- Schema helpers use production contact data and omit/preserve pending states rather than inventing unverified data.
- Analytics utility is SSR-safe, approved-event gated, and no-op safe without GA4/GTM configuration.
- RFQ forms use Zod validation, honeypot field, 10 MB file size limit, and restricted extensions: `.pdf`, `.jpg`, `.jpeg`, `.png`, `.dwg`.
- Motion has a global `prefers-reduced-motion: reduce` override.
- Sticky mobile CTA behavior reviewed:
  - Homepage sticky CTA hides near the footer.
  - Contact sticky CTA is in flow with sticky positioning.
  - About sticky CTA was changed from fixed to sticky to avoid blocking footer content.
- CSS production-risk fix added for missing design aliases: `--color-primary`, `--color-surface`, and `--radius-sm`.
- SEO fallback fix added for FAQ and Resources so H1 and JSON-LD exist in production HTML before client-side filtering loads.
- Homepage Organization and LocalBusiness schema placeholders added.

## Remaining pending assets/data

- Initial case study pages intentionally use pending proof states for unverified project locations, durations, metrics, leakage results, cost, and technical gallery assets.
- SEO landing pages still contain pending technical proof, related project proof, and downloadable resource states where verified assets are unavailable.
- Resource hub downloadable files and lead-capture flow remain pending.
- About-page company metrics remain `pending_verified_data`.
- RFQ/contact backend submission endpoint remains pending; forms validate but do not submit to a backend.
- Verified map URL remains pending.

## Known risks

- Full visual browser QA and Lighthouse were not executed because the Browser plugin control surface was unavailable in this session. Route-level production HTTP checks and static audits were completed instead.
- Lighthouse risks to check before launch: image optimization budget, unused JavaScript from client-heavy FAQ/resources filtering, main-thread cost on homepage, color contrast after final content changes, and mobile tap-target spacing.
- Some homepage preview case study metrics come from local project JSON/assets and should remain reviewed by SIPANEL before public launch.
- Contact and footer production contact data are present from `production_contact_info`; any operational change must be updated in the source JSON before launch.

## Launch blockers

- No TypeScript, lint, build, route, metadata, sitemap, robots, schema, H1, RTL, or rendered image-alt blockers found in the completed checks.
- Manual visual QA and Lighthouse remain required before deployment because they could not be run with the unavailable browser automation surface.

## Recommended next steps

- Run Lighthouse on `/en`, `/fa`, `/en/contact`, `/en/resources`, and one project page after browser automation is available.
- Perform manual mobile checks at 360px, 390px, 430px, 768px, and desktop widths for CTA placement, no horizontal overflow, form usability, and RTL layout.
- Replace pending case study/resource/about metrics only after verified proof is available.
- Configure real GA4/GTM IDs through environment variables when analytics is approved.
- Connect RFQ/backend and lead-capture workflows only after endpoint, spam protection, and privacy handling are approved.
