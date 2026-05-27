# Manual Interaction QA Report

Date: 2026-05-24

Sources of truth:

- `SITE_AUDIT_REPORT.md`
- `FINAL_PRELAUNCH_CHECKLIST.md`

## 1. Fixed interaction bugs

- Fixed browser icon metadata to reference implemented assets: `/icon.png` and `/apple-icon.png`.
- Fixed mobile menu behavior so menu links, mobile CTA, and compact language switcher selections close the open menu after activation, including same-page anchor links.
- Fixed a pending homepage proof-viewer control that had `aria-disabled="true"` but was still technically clickable. It is now a real disabled button.
- Added missing `aria-pressed` state to mobile FAQ category filter pills.
- Added a consistent global `:focus-visible` outline for links, buttons, summaries, form fields, and textareas.
- Improved project gallery dialog keyboard flow: opening a gallery item focuses the close control, `Escape` closes the dialog, and focus returns to the triggering gallery card.

## 2. Remaining UX issues

- Resource download buttons are intentionally disabled until real downloadable files and lead-capture flow exist.
- Pending proof cards remain visible by design where verified technical/project assets are not available.
- The local browser automation environment produced localhost proxy/file-handle noise during the broad click run, so a clean exhaustive all-click browser log could not be preserved in this session.

## 3. Remaining pending states

- RFQ/contact backend integration.
- Resource downloadable files and lead-capture delivery.
- Verified map URL.
- Case study metrics, locations, durations, costs, leakage/waterproofing results, and gallery assets where marked pending.
- About-page company metrics.
- SEO landing proof diagrams/drawings and related project proof where marked pending.

## 4. Browser console issues

- No code-level hydration or build errors were introduced by the fixes; `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- During headless Chrome QA, local environment errors appeared from Chrome/Next attempting to proxy `http://localhost:3000/...` where `localhost` did not resolve, followed by `EMFILE` after the broad tab run. These are local QA-environment issues, not confirmed application runtime errors.

## 5. Mobile interaction issues

- Fixed: mobile menu no longer remains open after activating same-page nav, CTA, or language switcher items.
- Sticky mobile CTA remains intentionally linked to homepage engineering review and WhatsApp.
- No code change was made to layout or visual design.

## 6. Accessibility concerns

- Fixed: FAQ mobile filters now expose pressed state.
- Fixed: gallery dialog now places focus inside the dialog and returns focus after close.
- Fixed: broad focus-visible styling is available for interactive controls.
- Remaining: full real-device screen-reader QA and focus-trap audit should still be completed before launch.

## 7. Launch-critical issues

- No new code/build blockers found after this fix pass.
- Operational launch blockers from the prelaunch checklist remain: RFQ backend, resource delivery, map URL, domain/DNS, SSL, backup/rollback, Lighthouse, and verified real project data/assets.

## 8. Final production confidence level

Medium-high for implemented static/interactions after the safe fixes and successful build verification.

Not full launch confidence until operational blockers and a clean external browser/device QA pass are completed outside the local proxy/file-handle issue observed in this environment.
