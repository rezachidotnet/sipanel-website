# SIPANEL GTM Phase 1 Cleanup

## 1. Summary

Implemented Phase 1 only: custom client analytics events now use GTM/dataLayer through `sendGTMEvent` as the single runtime transport, and common analytics page URL parameters no longer include uncontrolled query strings or hashes.

No GTM remote configuration, Vercel environment variables, Measurement IDs, CRM/Odoo logic, form validation, SEO JSON-LD, metadata, sitemap, robots, Vercel Speed Insights, package dependencies, deployment, or Git history were changed.

## 2. Measurement ID Findings

Repository evidence:

- `.env.example:1` contains `NEXT_PUBLIC_GTM_ID=GTM-K5HK55FN`.
- `app/[locale]/layout.tsx:79` reads `NEXT_PUBLIC_GTM_ID`.
- `lib/analytics/events.ts` no longer references `NEXT_PUBLIC_GA4_MEASUREMENT_ID` after this cleanup.
- `docker-compose.yml:27` still passes through `NEXT_PUBLIC_GA4_MEASUREMENT_ID` if provided by the environment.
- `docker-compose.yml:28` still passes through `NEXT_PUBLIC_GTM_ID`.
- `reports/gtm-migration-audit.md` references `G-33FL4K0R3S` as audit evidence requiring manual GTM verification.
- No active source/config reference to `G-8QFRB20LMW` was found.

Production Tag Assistant evidence supplied in the task:

- `G-8QFRB20LMW` was previously observed in production Tag Assistant.

Unresolved remote configuration:

- Repository evidence cannot establish whether `G-33FL4K0R3S` or `G-8QFRB20LMW` is the intended production GA4 property.
- No Measurement ID was replaced, hardcoded, or removed.

## 3. Pre-change Architecture

The repository met the GTM ownership decision rule:

- A single official `GoogleTagManager` loader exists in `app/[locale]/layout.tsx:3` and `app/[locale]/layout.tsx:173`.
- The loader reads `NEXT_PUBLIC_GTM_ID` at `app/[locale]/layout.tsx:79`.
- The centralized helper already dispatched custom events through `sendGTMEvent`.
- No active standalone `gtag.js` loader or `GoogleAnalytics` component was found in source searches.
- Project docs directed analytics through `lib/analytics/events.ts`.

Before this cleanup, `lib/analytics/events.ts` also had a direct `window.gtag` custom-event branch gated by `NEXT_PUBLIC_GA4_MEASUREMENT_ID` or `window.gtag`, which could duplicate events when GA4 is configured in GTM.

## 4. Files Changed

| File | What changed | Why | Behavior change | Risk | Verification |
| ---- | ------------ | --- | --------------- | ---- | ------------ |
| `lib/analytics/events.ts` | Removed the direct `window.gtag` custom-event path, kept `sendGTMEvent`, added `page_path`, sanitized `page_url`, removed `utm_source` query parsing from common params, and added a development-only once-per-event missing-GTM warning | Prevent duplicate GA4 delivery and uncontrolled URL/query leakage | Custom events now dispatch only to GTM/dataLayer; common `page_url` excludes search/hash | Low to medium: depends on GTM container routing events correctly | Typecheck passed, lint passed with one unrelated warning, source search confirmed no active `window.gtag` or `window.location.href` |
| `lib/CLAUDE.md` | Added analytics architecture rules | Keep future analytics work aligned with Phase 1 | Documentation only | Low | Diff inspected |
| `reports/gtm-phase-1-cleanup.md` | Added this report | Required task artifact | Documentation only | Low | File created and inspected |

Pre-existing dirty files preserved and not intentionally changed in this task: `.gitignore`, `app/[locale]/layout.tsx`, `app/[locale]/systems/page.tsx`, `app/[locale]/systems/systems-overview.css`, `package-lock.json`, `package.json`, untracked `.env.example`, and the pre-existing `reports/gtm-migration-audit.md`.

## 5. Duplicate Event Path Before

Before cleanup, approved custom events could follow two runtime paths:

```text
trackEvent(...)
    -> sendGTMEvent(...)
    -> GTM
    -> GA4 or other tags

trackEvent(...)
    -> window.gtag("event", ...)
    -> GA4 directly
```

If GA4 is configured inside `GTM-K5HK55FN` and `window.gtag` is available, the direct custom-event branch could inflate custom event and conversion counts.

## 6. Event Path After

After cleanup:

```text
trackEvent(...)
    -> allowlist validation
    -> safe common parameters
    -> safe event-specific parameters
    -> sendGTMEvent(...)
    -> GTM/dataLayer
    -> GA4 and approved destinations configured inside GTM
```

The centralized helper has exactly one active custom-event transport. Active source search returned no `window.gtag` or `gtag(` matches after the change.

## 7. URL Privacy Fix

Before:

```text
page_url = window.location.href
```

After:

```text
page_path = window.location.pathname
page_url = `${window.location.origin}${pagePath}`
```

The common analytics payload now excludes query strings and hashes. The helper also no longer reads `utm_source` from `window.location.search`; GA4/GTM should own campaign attribution instead of duplicating it in custom event parameters.

No active `window.location.href` usage remains in analytics common parameters.

## 8. Events Preserved in Application Code

No UI event handlers were migrated to DOM-only GTM triggers. Application-originated events remain routed through the centralized helper, including:

- `rfq_start`
- `rfq_step_complete`
- `rfq_submit`
- `rfq_error`
- `rfq_abandon`
- `catalog_form_submitted`
- `catalog_download_started`
- `resource_download_complete`
- `language_change`
- `file_upload_attempt`
- `diagram_open`
- `diagram_zoom`
- `diagram_close`
- `case_study_expand`
- `proof_card_expand`

Simple click handlers such as phone, WhatsApp, email, map, hero CTA, sticky CTA, and catalog CTA were not moved or removed.

## 9. Development Safeguards

`lib/analytics/events.ts` now warns in development only when an approved analytics event is attempted but GTM/dataLayer transport is unavailable.

Safeguard properties:

- Runs only when `process.env.NODE_ENV === 'development'`.
- Does not throw.
- Does not block interaction.
- Does not run in production.
- Logs only the event name and a generic unavailable-transport message.
- Uses an in-memory set to warn once per event name.
- Does not log event payloads or user data.

## 10. Checks Executed

Pre-edit read/search checks:

- Read required files in order: `reports/gtm-migration-audit.md`, `lib/analytics/events.ts`, `app/[locale]/layout.tsx`, `package.json`, `lib/CLAUDE.md`, `components/CLAUDE.md`, `.env.example`, `docker-compose.yml`.
- `git status --short`
- `git diff --stat`
- `git diff --name-only`
- Required targeted source search. The literal `.next` exclusion hit `.next.stale-*` generated output, so the active-source search was rerun with `.next*` excluded.
- Required config search for `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_ID`, `G-33FL4K0R3S`, `G-8QFRB20LMW`, and `GTM-`.

Package scripts inspected:

```bash
node -e "console.log(JSON.stringify(require('./package.json').scripts || {}, null, 2))"
```

Verification commands:

```bash
npm run typecheck
```

Result: passed.

```bash
npm run lint
```

Result: passed with one pre-existing warning in `components/home/engineering-proof-snapshot.tsx:194` about an `img` alt prop. No lint errors.

Post-change searches:

```bash
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir='.next*' --exclude-dir=coverage --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.mjs" --include="*.cjs" -E 'window\.gtag|gtag\(|sendGTMEvent|window\.location\.href|NEXT_PUBLIC_GA4_MEASUREMENT_ID|NEXT_PUBLIC_GTM_ID|G-33FL4K0R3S|G-8QFRB20LMW' .
```

Result: active source references only `NEXT_PUBLIC_GTM_ID` and `sendGTMEvent`; no active `window.gtag`, `gtag(`, `window.location.href`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `G-33FL4K0R3S`, or `G-8QFRB20LMW` matches.

Git checks:

- `git status --short`
- `git diff --stat`
- `git diff --name-only`
- `git diff --check`
- `git diff -- lib/analytics/events.ts`
- `git diff -- lib/CLAUDE.md components/CLAUDE.md reports/gtm-phase-1-cleanup.md`

Result: `git diff --check` passed.

## 11. Remaining Manual GTM Checks

- Confirm the production container ID.
- Confirm the container loads only once.
- Confirm which GA4 Measurement ID is configured: `G-33FL4K0R3S`, `G-8QFRB20LMW`, or another property.
- Confirm only one Google Tag owns GA4 page views.
- Confirm custom dataLayer events are routed to GA4 once.
- Check for duplicate DOM triggers matching application events.
- Check phone, WhatsApp, hero CTA, sticky CTA, catalog, and form triggers.
- Confirm Consent Mode defaults and updates.
- Confirm Preview and Production environments are separated where appropriate.
- Use Tag Assistant and GA4 DebugView on production, triggering one test event at a time.
- Verify no PII or uncontrolled query string appears in event parameters.
- Verify client-side locale navigation does not reload GTM.

## 12. Remaining Manual Vercel Checks

- Confirm the Production value of `NEXT_PUBLIC_GTM_ID`.
- Confirm whether `NEXT_PUBLIC_GA4_MEASUREMENT_ID` exists in Production.
- Confirm whether Preview and Production use different analytics configuration.
- Do not print unrelated environment-variable values.
- Do not expose secret values.

## 13. Risks and Follow-up

- The remote GTM container was not inspected or edited in this task. If GTM does not route custom dataLayer events to GA4, custom events may stop reaching GA4 until the container is configured.
- The Measurement ID discrepancy remains unresolved: the audit referenced `G-33FL4K0R3S`, while production Tag Assistant reportedly showed `G-8QFRB20LMW`.
- `docker-compose.yml` still supports `NEXT_PUBLIC_GA4_MEASUREMENT_ID`; this was not removed because environment behavior may be intentional outside Vercel.
- Consent Mode and cookie consent are still manual follow-up items.
- Phase 2 should audit remote GTM triggers before changing phone, WhatsApp, hero CTA, sticky CTA, catalog, or form click ownership.
- The lint warning in `components/home/engineering-proof-snapshot.tsx:194` remains outside this task.

## 14. Definition of Done Results

- [x] The initial repository files were read in the required order.
- [x] Pre-edit targeted searches were executed.
- [x] Pre-existing working-tree changes were identified and preserved.
- [x] The repository confirms GTM/dataLayer is the intended custom-event transport.
- [x] The centralized analytics helper has exactly one active custom-event transport.
- [x] Active direct `window.gtag("event", ...)` custom-event calls return zero matches in active source.
- [x] The official GTM loader remains installed in the shared localized layout.
- [x] No standalone GA4 loader was added.
- [x] No Measurement ID was replaced or guessed.
- [x] Repository references to `G-33FL4K0R3S` and `G-8QFRB20LMW` were documented.
- [x] Common analytics parameters no longer use uncontrolled `window.location.href`.
- [x] Analytics `page_url` excludes query strings and hashes.
- [x] `page_path` is available in the common analytics context.
- [x] No PII was added to analytics events.
- [x] Server-confirmed conversion events remain application-originated.
- [x] Application-state events remain application-originated.
- [x] Existing simple click handlers were not migrated prematurely.
- [x] Development warnings run only in development.
- [x] Analytics architecture rules were added to `lib/CLAUDE.md`.
- [x] `reports/gtm-phase-1-cleanup.md` exists.
- [x] The cleanup report contains every required section.
- [x] The typecheck script passed.
- [x] The lint script completed with no errors and one unrelated warning.
- [x] `git diff --check` passed.
- [x] Changed files are listed in this report.
- [x] No unrelated source file was intentionally modified.
- [x] No pre-existing user change was overwritten.
- [x] No package was installed, removed, or updated.
- [x] No commit, push, deployment, GTM edit, or Vercel edit was performed.
