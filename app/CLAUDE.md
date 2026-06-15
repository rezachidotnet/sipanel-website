# app/

## Page convention (`[locale]/.../page.tsx`)

- Export `generateStaticParams()` returning `locales × slugs` (use `listXSlugs()` from the matching `lib/` module).
- Export `async generateMetadata({params})`: await `params`, validate `locale` against `locales`, `notFound()` on invalid locale/slug, call `setRequestLocale(locale)`, then return the lib `getXMetadata(...)`.
- In the default export: same await/validate/`notFound`/`setRequestLocale` sequence, then render the feature template from `components/`.
- `params` is a `Promise` — always `await` it.
- Keep page files thin: data from `lib/`, UI from `components/`. No content literals here.

## API routes (`api/`)

- `runtime = 'nodejs'`.
- `api/lead` is the only real handler; `api/rfq` re-exports its `POST`. Route all new submissions to `/api/lead`.
- Validate every payload with Zod; treat the `website` field as a honeypot (must be empty).
- In-memory rate limiting is in place — preserve it.
- Persist submissions via `lib/rfq/server.ts` (writes to `private/`); push CRM leads via `lib/rfq/odoo.ts`. Never log raw PII.

## Metadata files

- `sitemap.ts`, `robots.ts`, `manifest.ts` are generated routes — keep them in sync with locales and new page types.
