# RFQ Backend Implementation Report

Date: 2026-05-24

## Source Of Truth

- `specs/pages/rfq_contact_page.json`
- `specs/3_analytics_tracking_system.json`
- `FINAL_PRELAUNCH_CHECKLIST.md`
- `PROJECT_CONTEXT.md`

## Implemented Scope

- Added a Next.js App Router RFQ API endpoint at `app/api/rfq/route.ts`.
- Connected the contact-page RFQ form and homepage RFQ form to `/api/rfq`.
- Added server-side Zod validation for:
  - `name`
  - `company`
  - `phone`
  - `whatsapp`
  - `email`
  - `project_type`
  - `project_location`
  - `estimated_area`
  - `message`
  - optional `project_stage`
  - optional `main_concern`
  - honeypot `website`
- Added server-side input sanitization in `lib/rfq/sanitize.ts`.
- Added protected temporary upload storage in `private/rfq-uploads/tmp` by default.
- Added protected sanitized submission JSON storage in `private/rfq-submissions` by default.
- Added `.gitignore` exclusions for private uploads and environment files.
- Added `.env.example` entries for analytics, RFQ notifications, and upload storage.
- Kept analytics hooks compatible by preserving and extending approved RFQ/contact events.
- Added server-side Odoo `crm.lead` integration for same-server deployment.
- Did not deploy.

## Upload Security

Implemented in `lib/rfq/server.ts`.

- Allowed extensions:
  - `.pdf`
  - `.jpg`
  - `.jpeg`
  - `.png`
  - `.dwg`
- Size limit:
  - 10 MB
- MIME checks:
  - PDF, JPEG, PNG, DWG-related MIME types, and browser-safe DWG octet-stream handling.
- Signature checks:
  - PDF `%PDF`
  - JPEG magic bytes
  - PNG magic bytes
  - DWG `AC10` signature
- Stored files are written outside `/public` with restrictive file and directory modes.

## Spam Protection

- Honeypot field: `website`
- Simple in-memory rate limiting placeholder:
  - 5 requests per 10 minutes per detected IP
  - Uses `x-forwarded-for`, `x-real-ip`, or `unknown`

This is suitable as a placeholder but should be replaced with a durable store-backed limiter before high-traffic production use.

## Email Notification Configuration

No credentials are hardcoded.

The endpoint supports environment-variable based notification delivery through an internal email/webhook relay:

- `RFQ_NOTIFICATION_WEBHOOK_URL`
- `RFQ_NOTIFICATION_WEBHOOK_TOKEN`
- `RFQ_NOTIFICATION_TO_EMAIL`
- `RFQ_NOTIFICATION_FROM_EMAIL`
- `RFQ_NOTIFICATION_SUBJECT`
- `RFQ_SUBMISSION_DIR`
- `ODOO_URL`
- `ODOO_DB`
- `ODOO_USERNAME`
- `ODOO_PASSWORD`
- `ODOO_CRM_TEAM_ID`
- `ODOO_CRM_SOURCE_ID`

If the webhook is not configured, the API safely accepts and stores the sanitized RFQ submission and returns `notificationConfigured: false`.

## Odoo CRM Integration

Implemented in `lib/rfq/odoo.ts`.

- Uses server-side Odoo JSON-RPC.
- Creates a `crm.lead` after the sanitized RFQ submission is stored.
- Reads credentials only from `ODOO_*` environment variables.
- Does not expose Odoo credentials or CRM payloads to frontend JavaScript.
- Returns a safe `502` response if Odoo is configured but lead creation fails.

## API Responses

Success response:

```json
{
  "ok": true,
  "message": "RFQ submission received...",
  "submissionId": "...",
  "notificationConfigured": false
}
```

Error responses:

- `400` validation or upload security failure
- `429` rate limit exceeded
- `500` safe generic processing failure

## Files Added

- `app/api/rfq/route.ts`
- `lib/rfq/constants.ts`
- `lib/rfq/sanitize.ts`
- `lib/rfq/server.ts`
- `.env.example`
- `.gitignore`
- `RFQ_BACKEND_IMPLEMENTATION_REPORT.md`

## Files Updated

- `components/contact/rfq-contact-page.tsx`
- `components/home/rfq-section.tsx`
- `lib/analytics/events.ts`
- `messages/en.json`
- `messages/fa.json`
- `messages/ar.json`
- `messages/ru.json`

## Verification

- `npm run typecheck` passed.
- `npm run lint` passed with no warnings or errors.
- `npm run build` passed.

Build output includes:

- Dynamic API route: `/api/rfq`
- Localized contact routes: `/en/contact`, `/fa/contact`, `/ar/contact`, `/ru/contact`

## Remaining Operational Notes

- Configure the real notification relay environment variables on the hosting platform.
- Confirm upload retention and deletion policy before launch.
- Replace the in-memory rate limiter with a durable production store if the app is deployed across multiple instances.
- Run browser QA and analytics DebugView validation after real GA4/GTM IDs are configured.
