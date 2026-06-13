# SIPANEL Website

## Project Overview

SIPANEL is an industrial building envelope engineering website.

Primary systems:

- Sandwich Panel Systems
- Standing Seam & ZIP Roofing
- Aluminium Cladding
- Glass & Polycarbonate Daylighting

Supported locales:

- fa (primary source of truth)
- en
- ar
- ru

## SIPANEL Project Prioritization

The following projects are strategic proof projects defined by SIPANEL management. They should receive priority consideration when evaluating:

- Internal linking
- Related projects
- Homepage proof sections
- Resource-to-project relationships
- Featured case studies
- Conversion journeys
- Buyer trust signals
- Engineering showcase content
- Commercial visibility

### Tier A — Strategic Commercial Proof Projects

| Project | Slug |
| --- | --- |
| 32-Bed Military Hospital | `army-hospital` |
| Mehrabad Airport Aircraft Hangar | `mehrabad-aircraft-hangar` |
| Erbil Eye Hospital Entrance Canopy | `erbil-eye-hospital-entrance-canopy` |
| Tabas Railway Facility | `tabas-railway-facility` |
| Mahshahr Taxi Parking Facility | `mahshahr-taxi-parking` |
| Absaar Water Park | `absaar-water-park` |
| Megapars Mall Atrium | `megaparsmall-atrium` |
| Tehran Mall Roof Garden, Food Court & Cinema Roof | `tehran-mall-roof-garden-foodcourt` |
| Kermanshah Industrial University Petroleum Faculty | `kermanshah-industrial-university-petroleum-faculty` |
| Andimeshk Stadium | `andimeshk-stadium` |
| Parand City Entrance Gate | `parand-city-entrance` |

### How to apply this hierarchy

When making recommendations or audits, do NOT infer a project's importance from:

- existing internal links or current link popularity
- current related-project selections (e.g. the `relatedSlugs` / `slice(0, 3)` logic in `lib/case-studies/case-study-pages.ts`)
- current visibility in the UI
- array ordering in data files
- existing resource-to-project relationships
- image or asset count alone

Instead, treat the Tier A list above as the authoritative strategic hierarchy. Prioritize these projects unless there is a strong, explicitly stated business reason not to. When current implementation (links, related logic, featured slots) does not reflect this hierarchy, surface that gap as a finding rather than treating the current state as intent.

## Development Philosophy

Fast iteration mode.

The user reviews all changes locally before pushing to Git.

Do not run build, lint, or typecheck automatically after every task.

Only run them when:

- explicitly requested
- routing changes
- localization changes
- new pages are added
- major refactors are completed
- TypeScript data structures are modified

## Existing Architecture

Before modifying any component, inspect and respect existing patterns.

Do not create duplicate implementations.

Prefer extending existing components.

## Localization Rules

- Never break next-intl routing.
- Preserve locale structure.
- Persian content is the source of truth.
- Keep all locales synchronized when appropriate.

## SEO Rules

- Preserve metadata.
- Preserve canonical URLs.
- Preserve hreflang implementation.
- Preserve structured data.

## Analytics Rules

Never remove or break existing analytics tracking.

## UI Rules

Prefer consistency over redesign.

Follow existing SIPANEL design patterns unless the user explicitly requests changes.

## Delivery Rules

After completing a task:

1. Report modified files.
2. Explain what changed.
3. Mention any risks.
4. Do not run build unless required by the rules above.

## Important

The user prefers rapid implementation and visual verification on localhost before Git push and Vercel deployment.
