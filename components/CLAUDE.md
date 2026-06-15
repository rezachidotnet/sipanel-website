# components/

- Organized by feature (`home/`, `case-studies/`, `services/`, `layout/`, …). Add new UI to the matching folder; reuse before creating.
- Server components by default. Add `'use client'` only for interactivity (state, effects, event handlers, analytics) and keep client islands small.
- Feature templates (e.g. `case-study-page-template.tsx`) receive `locale` + typed `page` data as props from `app/`; templates render, they don't fetch content.
- Fire analytics through the helper in `lib/analytics/events.ts` only; mark intended events with a `{/* track: event_name */}` comment where wired.
- RTL: derive direction from `getDirection(locale)` (`@/i18n/routing`); use logical CSS (start/end) rather than left/right.
- Style with Tailwind + the `sipanel` design tokens (colors, radii, shadows, fonts) defined in `tailwind.config.ts`; do not hardcode brand hex values.
- Import images from `assets/` (TS imports for optimization); reference `public/` files by URL path.
