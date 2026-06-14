# SEO / AI Crawl Fix Report — sipanelco.ir

Date: 2026-06-14
Scope: sitemap, llms.txt, robots.txt, www/non-www canonical consistency, AI/SEO discovery URLs.
Constraints honored: no visual UI changes, no content rewrites, no routes removed.

---

## 0. Critical context: canonical host direction

**The audit was written assuming `sipanelco.ir` (non-www) is canonical. The codebase says the opposite — `www.sipanelco.ir` is canonical — and that decision is wired through every layer:**

| Layer | Value |
| --- | --- |
| `specs/0_Sipanel_website_merged_2.json` → `production_contact_info.website` | `https://www.sipanelco.ir` |
| `lib/seo/metadata.ts` → `getSiteBaseUrl()` | resolves to `https://www.sipanelco.ir` |
| `app/[locale]/layout.tsx` → `metadataBase` | `https://www.sipanelco.ir` |
| `app/sitemap.ts`, `app/robots.ts` | all URLs + `host` → www |
| `next.config.mjs` → `redirects()` | apex `sipanelco.ir/*` → `https://www.sipanelco.ir/*` (308 permanent) |

Per the task rule ("use sipanelco.ir as canonical **unless existing config clearly says otherwise**") and an explicit confirmation from the maintainer, **www was kept as the single canonical host.** This is the lowest-risk choice: it preserves the existing Search Console property, all current canonicals, and hreflang.

This re-frames several audit findings as *correct-by-design* rather than bugs (see below).

---

## 1. Issues found vs. reality

| Audit finding | Verdict | Action |
| --- | --- | --- |
| `https://sipanelco.ir/sitemap.xml` redirects | **Intended** — apex 308→www is the canonicalization rule. | No change. |
| `https://www.sipanelco.ir/sitemap.xml` returns 200 | **Correct** — www is canonical. | No change. |
| `/fa,/en,/ar,/ru/sitemap.xml` return 404 | **Intended** — single-sitemap strategy; no code references these. | No change (verified no references). |
| `https://www.sipanelco.ir/llms.txt` returns 404 | **Real bug** — no `llms.txt` existed anywhere in the repo. | Created `public/llms.txt`. |
| `https://sipanelco.ir/llms.txt` "healthy" | Stale/edge artifact; apex now 308→www where the file now lives. | Resolved by the new file. |
| Mixed www / non-www URLs | Canonicalization already enforced (apex→www). | Verified; documented server note below. |
| `/cdn-cgi/email-protection` returns 404 | **Not from this codebase** — no `cdn-cgi`, `email-protection`, or obfuscated email markup exists. Emails use plain `mailto:`. Injected by Cloudflare's "Email Address Obfuscation" feature at the edge. | No code change; server note below. |
| robots / AI crawler access | `*` already allowed all bots; made intent explicit. | Enhanced `app/robots.ts`. |
| Canonical / hreflang metadata | Already correct (metadataBase=www, fa/en/ar/ru + x-default). | Verified; no change. |

---

## 2. Files changed

| File | Type | Change |
| --- | --- | --- |
| `app/robots.ts` | modified | Added explicit allow groups for `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` (same scope as the `*` rule). Sitemap + host unchanged (www). |
| `public/llms.txt` | **new** | AI/LLM discovery file. Curated index of systems, Tier-A projects, resources, company pages, and the sitemap — all www canonical URLs, links verified against real routes. |
| `SEO_AI_CRAWL_FIX_REPORT.md` | **new** | This report. |

No other files were touched. Sitemap, metadata, middleware, and `next.config.mjs` were inspected and confirmed correct for a www-canonical setup — left unchanged.

---

## 3. Exact fixes

### 3.1 robots.txt (`app/robots.ts`)
- Converted the single `rules` object into an array: the existing `*` group plus a named group for the search/AI crawlers listed above.
- Shared `disallow` list (`/_next/`, `/api/`, `/catalogs/`) extracted to a constant and applied to both groups.
- `Sitemap: https://www.sipanelco.ir/sitemap.xml` (single, valid) and `Host: https://www.sipanelco.ir` retained.

Generated output (verified from build):
```
User-Agent: *
Allow: /
Disallow: /_next/
Disallow: /api/
Disallow: /catalogs/

User-Agent: Googlebot
User-Agent: Bingbot
User-Agent: GPTBot
User-Agent: ClaudeBot
User-Agent: PerplexityBot
User-Agent: Google-Extended
Allow: /
Disallow: /_next/
Disallow: /api/
Disallow: /catalogs/

Host: https://www.sipanelco.ir
Sitemap: https://www.sipanelco.ir/sitemap.xml
```

### 3.2 llms.txt (`public/llms.txt`)
- Standard llms.txt format: `# SIPANEL` heading, summary blockquote, then sectioned link lists.
- Sections: Engineering Systems (4 systems + overview), Projects (11 Tier-A strategic proof projects + overview), Resources & Knowledge, Company, Sitemap.
- All links use the `https://www.sipanelco.ir` canonical host; locale-prefix convention documented.
- Served statically from `public/`, so `https://www.sipanelco.ir/llms.txt` → **200**, and `https://sipanelco.ir/llms.txt` → 308 → www.

### 3.3 Sitemap — verified, no change
- Single `/sitemap.xml` containing every locale URL with `<xhtml:link rel="alternate">` hreflang entries for fa/en/ar/ru **and** `x-default` → fa. Confirmed in build output.

### 3.4 Canonical / email-protection — no code change
- No locale-sitemap references found in source.
- No `cdn-cgi` / `email-protection` / obfuscated-email markup found; contact emails are plain `mailto:info@sipanelco.ir`.

---

## 4. Remaining server-level actions (Nginx / Cloudflare / Vercel)

These are **not in the repo** and must be handled at the platform level:

1. **Apex → www redirect (primary canonicalization).**
   In production this is served by Vercel before the Next app runs (see comment in `next.config.mjs`). The in-app rule is a fallback only. **Confirm the Vercel domain config redirects `sipanelco.ir` → `www.sipanelco.ir` (308), preserving path + query.** If the site is ever fronted by Nginx instead, use:
   ```nginx
   server {
       listen 443 ssl;
       server_name sipanelco.ir;
       return 301 https://www.sipanelco.ir$request_uri;
   }
   ```

2. **`/cdn-cgi/email-protection` 404.**
   Caused by Cloudflare's **Email Address Obfuscation** feature (Scrape Shield), which rewrites `mailto:` links at the edge and depends on a Cloudflare script/endpoint. The app does not emit these links. To remove the broken URL entirely: **Cloudflare dashboard → Scrape Shield → turn off "Email Address Obfuscation"** for this zone. (Emails will then render as the plain `mailto:` already in the markup — no code change needed.)

3. **llms.txt on www.** No action if www is served by the Next app (file is in `public/`). If a CDN/edge caches a prior 404 for `/llms.txt`, **purge that path** after deploy.

---

## 5. Test results

| Check | Result |
| --- | --- |
| `npm run lint` (eslint) | ✅ Pass, no warnings |
| `npm run typecheck` (tsc --noEmit) | ✅ Pass |
| `npm run build` (next build) | ✅ Success; `/robots.txt` and `/sitemap.xml` emitted as static routes |
| Generated `/robots.txt` | ✅ Explicit bot groups, single valid sitemap, host=www |
| Generated `/sitemap.xml` | ✅ All locales, hreflang + x-default |
| `public/llms.txt` present | ✅ Will serve at `/llms.txt` |
| Locale homepages `/fa /en /ar /ru` | ✅ Prerendered (SSG) in build output |

No automated test suite is configured (`package.json` has no `test` script); manual route verification used instead.

---

## 6. Google Search Console checklist

- [ ] Confirm the **`https://www.sipanelco.ir`** property is the active/verified one (www is canonical).
- [ ] **Submit sitemap:** `https://www.sipanelco.ir/sitemap.xml`.
- [ ] **Inspect** `https://www.sipanelco.ir/llms.txt` → expect 200 (live test after deploy).
- [ ] **Validate fixed 404s:** re-test `https://www.sipanelco.ir/llms.txt`; confirm `/cdn-cgi/email-protection` no longer appears after disabling Cloudflare email obfuscation.
- [ ] Confirm `https://sipanelco.ir/*` consistently **308→** `https://www.sipanelco.ir/*` (URL Inspection on a few apex URLs).
- [ ] **Request indexing** for: `/fa`, `/en`, `/ar`, `/ru`, `/en/systems`, `/en/projects`, and the Tier-A project pages.
- [ ] Verify robots fetch in GSC **robots.txt report** shows the new AI-crawler groups.

---

## 7. Risks

- **Low.** Changes are additive: one new static file, one robots enhancement that only broadens explicit crawler permissions (no path was newly disallowed), and a documentation file. No routes, content, UI, metadata, or canonicalization logic were altered.
- The only behavioral dependency is **server-side** (items in §4) — those are platform settings, not code.
