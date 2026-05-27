# Final Prelaunch Checklist

Date: 2026-05-24

Source reports:

- `SITE_AUDIT_REPORT.md`
- `PRODUCTION_QA_REPORT.md`

## Current Readiness Summary

The implemented website has no known code/build/link/route/metadata/schema blockers from the completed automated audits. The site is not operationally launch-ready until the remaining backend, real-asset, verified-data, browser QA, Lighthouse, domain/DNS, SSL, and backup/recovery items are completed or explicitly accepted as pending for launch.

## 1. Deployment Readiness

- [x] `npm run lint` passed.
- [x] `npm run typecheck` passed.
- [x] `npm run build` passed.
- [x] Production route audit passed for implemented localized routes.
- [x] Rendered production link crawl found zero broken internal links.
- [x] Sitemap and robots are present.
- [ ] Confirm hosting platform, build command, Node version, and environment variables.
- [ ] Confirm deployment rollback procedure.
- [ ] Confirm preview deployment QA before production deployment.
- [ ] Confirm `DEPLOYMENT_CHECKLIST.md` requirement, because that file was not present in the repository during the audit.

## 2. Operational Blockers

- [ ] RFQ/contact backend is not connected.
- [ ] Resource downloads are pending.
- [ ] Lead-capture flow is pending.
- [ ] Verified map URL is missing.
- [ ] Manual browser/device QA is still required.
- [ ] Lighthouse review is still required.
- [ ] Domain/DNS readiness has not been verified.
- [ ] SSL readiness has not been verified.
- [ ] Backup/recovery process has not been verified.
- [ ] Verified case study proof data/assets must be supplied before replacing pending states.

## 3. Real Asset Completion

Pending real assets:

- [ ] Resource hub downloadable files.
- [ ] Lead-capture gated resource files.
- [ ] SEO landing page technical proof diagrams/drawings where placeholders are shown.
- [ ] SEO landing page related project proof assets where pending states are shown.
- [ ] Initial case study technical gallery assets where verified real project proof is unavailable.
- [ ] Verified map URL or map embed asset.

Rules before completion:

- [ ] Do not use stock photos as substitutes for project proof.
- [ ] Use technical placeholders until real assets are verified.
- [ ] Keep pending resource labels until actual downloadable files exist.

## 4. Case Study Verification

Pages using pending case study proof states:

- [ ] `/[locale]/projects/industrial-roofing-project`
- [ ] `/[locale]/projects/sandwich-panel-factory-project`
- [ ] `/[locale]/projects/aluminium-cladding-industrial-facade-project`

Pending verified case study data:

- [ ] Project locations where not verified.
- [ ] Project durations.
- [ ] Metrics.
- [ ] Leakage/waterproofing results.
- [ ] Costs.
- [ ] Technical gallery assets.
- [ ] Related project proof.

Verification requirements:

- [ ] Replace pending fields only with verified internal project data.
- [ ] Keep CTA active even when proof is pending.
- [ ] Do not invent project data, metrics, results, or locations.

## 5. Pending Verified Business Data

- [ ] About-page company metrics remain `pending_verified_data`.
- [ ] Homepage preview case study metrics should be reviewed by SIPANEL before public launch.
- [ ] Verified map URL is missing.
- [ ] Any operational change to contact data must be updated in `production_contact_info`.

Verified contact links currently found:

- Phone: `tel:+983136751101`
- WhatsApp: `https://wa.me/9891206566528`
- Email: `mailto:info@sipanelco.ir`

## 6. Backend Integrations

Missing integrations:

- [ ] RFQ/contact backend submission endpoint.
- [ ] CRM or email workflow for RFQ submissions.
- [ ] Spam protection beyond current honeypot.
- [ ] Resource download delivery.
- [ ] Lead-capture submission flow.
- [ ] Privacy handling for submitted files and contact data.

Current form status:

- [x] Forms validate client-side with Zod.
- [x] Honeypot field exists.
- [x] File uploads are limited to `.pdf`, `.jpg`, `.jpeg`, `.png`, `.dwg`.
- [x] File upload size limit is 10 MB.
- [ ] Forms do not yet submit to a backend.

## 7. Analytics Configuration

- [x] Analytics utility is SSR-safe.
- [x] Analytics utility is approved-event gated.
- [x] Analytics utility no-ops without GA4/GTM configuration.
- [ ] Configure real GA4 ID through environment variables when approved.
- [ ] Configure real GTM ID through environment variables when approved.
- [ ] Validate GTM `dataLayer` pushes in browser after configuration.
- [ ] Validate GA4 event receipt in DebugView after configuration.
- [ ] Do not add Meta Pixel unless explicitly configured and approved.

## 8. Lighthouse Review

Required pages:

- [ ] `/en`
- [ ] `/fa`
- [ ] `/en/contact`
- [ ] `/en/resources`
- [ ] One project page

Known Lighthouse risks to review:

- [ ] Image optimization budget.
- [ ] Unused JavaScript from client-heavy FAQ/resources filtering.
- [ ] Homepage main-thread cost.
- [ ] Color contrast after final real content and final imagery.
- [ ] Mobile tap-target spacing.

## 9. Browser / Device QA

Required viewport checks:

- [ ] 360px mobile.
- [ ] 390px mobile.
- [ ] 430px mobile.
- [ ] 768px tablet.
- [ ] Desktop.

Required checks:

- [ ] No horizontal overflow on mobile.
- [ ] CTA visibility above fold on homepage.
- [ ] CTA visibility above fold on service pages.
- [ ] Sticky CTA does not block forms.
- [ ] Sticky CTA does not block footer.
- [ ] FA and AR RTL layout has no visual overlap.
- [ ] Language switcher preserves current route in browser.
- [ ] Mobile menu keyboard/focus behavior.
- [ ] FAQ filters keyboard/focus behavior.
- [ ] Gallery modal keyboard/focus behavior.
- [ ] RFQ step controls keyboard/focus behavior.

## 10. SEO Indexing Review

Completed by automated audit:

- [x] Metadata exists.
- [x] Canonical links exist.
- [x] EN/FA/AR/RU hreflang links exist.
- [x] Sitemap includes implemented localized routes.
- [x] Robots includes production sitemap directive.
- [x] Schema is present and uses production contact information or pending states.

Pre-indexing checks:

- [ ] Confirm production domain in sitemap after deployment.
- [ ] Confirm robots policy is correct for launch.
- [ ] Submit sitemap in Google Search Console after deployment.
- [ ] Confirm no pending proof state is indexed as verified proof.
- [ ] Run visual SERP QA for titles and descriptions.

## 11. Domain / DNS Readiness

- [ ] Confirm production domain ownership/access.
- [ ] Confirm DNS provider access.
- [ ] Confirm A/CNAME records for hosting provider.
- [ ] Confirm `www` and apex-domain behavior.
- [ ] Confirm redirects between apex and `www`.
- [ ] Confirm no old site route conflicts.
- [ ] Confirm DNS TTL plan for launch.

## 12. SSL Readiness

- [ ] Confirm SSL certificate provisioning on hosting platform.
- [ ] Confirm HTTPS works for apex and `www`.
- [ ] Confirm HTTP redirects to HTTPS.
- [ ] Confirm no mixed-content warnings.
- [ ] Confirm sitemap and canonical URLs use HTTPS.

## 13. Backup / Recovery Considerations

- [ ] Confirm repository is backed up remotely.
- [ ] Confirm production deployment rollback is available.
- [ ] Confirm environment variables are documented securely.
- [ ] Confirm content/source JSON files are backed up.
- [ ] Confirm uploaded RFQ files will have retention and deletion policy before backend launch.
- [ ] Confirm resource/download assets are stored in a recoverable location.
- [ ] Confirm who owns emergency contact updates after launch.

## 14. Pages Using Pending Proof States

- [ ] Initial case study pages.
- [ ] SEO landing pages with missing technical proof assets.
- [ ] SEO landing pages with missing related project proof.
- [ ] Resource hub.
- [ ] About page company metrics strip.
- [ ] Contact page map/location area.
- [ ] RFQ/contact backend status.

## 15. Final Go / No-Go Gate

Go only when:

- [ ] Operational blockers are either completed or explicitly accepted for launch.
- [ ] Manual browser/device QA is complete.
- [ ] Lighthouse review is complete.
- [ ] Domain/DNS and SSL are verified.
- [ ] Backup/recovery plan is verified.
- [ ] Any verified case study/business data replacing pending states has been approved.
- [ ] Analytics IDs are configured or intentionally deferred.
- [ ] RFQ/backend status is intentionally accepted as pending or completed.

Do not deploy from this checklist alone. This file identifies remaining launch readiness work; it does not authorize deployment.
