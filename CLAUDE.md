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
