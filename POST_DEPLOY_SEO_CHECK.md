# POST-DEPLOY SEO CHECK

**Date:** 2026-06-14
**Verified by:** External HTTP probe (`curl`) against production
**Canonical host:** `https://www.sipanelco.ir`
**Scope:** `llms.txt`, `robots.txt`, `sitemap.xml` on both www and apex hosts
**Status:** ✅ PASS (Cloudflare AI crawler block disabled; robots.txt conflict resolved)

---

## 1. Response Headers

### WWW host (`https://www.sipanelco.ir`) — expected 200 OK

| Path | Status | Content-Type | Cache | Vercel Cache |
| --- | --- | --- | --- | --- |
| `/llms.txt` | **200** | `text/plain; charset=utf-8` | `public, max-age=0, must-revalidate` | HIT |
| `/robots.txt` | **200** | `text/plain; charset=utf-8` | `public, max-age=14400, must-revalidate` | REVALIDATED |
| `/sitemap.xml` | **200** | `application/xml` | `public, max-age=0, must-revalidate` | HIT |

Notable shared headers (all www responses):
- `strict-transport-security: max-age=63072000` (HSTS active)
- `access-control-allow-origin: *` (publicly fetchable by AI agents / tooling)
- `server: cloudflare` + `x-vercel-id: fra1::…` (Cloudflare → Vercel, FRA region)
- `x-matched-path` correctly resolves each route.

### Apex host (`https://sipanelco.ir`) — expected 301/308 → www

| Path | Status | Location |
| --- | --- | --- |
| `/llms.txt` | **308** | `https://www.sipanelco.ir/llms.txt` |
| `/robots.txt` | **308** | `https://www.sipanelco.ir/robots.txt` |
| `/sitemap.xml` | **308** | `https://www.sipanelco.ir/sitemap.xml` |

All apex responses carry HSTS and a permanent (308) redirect plus a matching `refresh` header.

---

## 2. Redirect Chains

Verified end-to-end with `curl -IL`:

```
https://sipanelco.ir/llms.txt
  → HTTP/2 308  location: https://www.sipanelco.ir/llms.txt
  → HTTP/2 200  (final)
```

- Single-hop redirect (apex → www), no chains/loops.
- 308 = **permanent** redirect that preserves method — correct for SEO link equity consolidation.
- Same pattern confirmed for `robots.txt` and `sitemap.xml`.

---

## 3. Canonical Host Verification

| Check | Result |
| --- | --- |
| www serves 200 directly | ✅ PASS |
| apex 30x-redirects to www | ✅ PASS (308 permanent) |
| Redirect target is the canonical www host | ✅ PASS |
| `robots.txt` declares `Host: https://www.sipanelco.ir` | ✅ PASS |
| `robots.txt` declares `Sitemap: https://www.sipanelco.ir/sitemap.xml` | ✅ PASS |
| HSTS enforced on both hosts | ✅ PASS |

**Canonical host is consistent and correctly enforced.**

---

## 4. AI Crawler Accessibility Verification

> **RESOLVED (2026-06-14):** Cloudflare's AI Crawler Block / Managed `robots.txt` feature was **disabled for the zone**. The edge-injected block described below is **no longer served**. The live `robots.txt` now contains only the application's committed rules, which cleanly allow the AI crawlers.

### Live `robots.txt` (current, post-fix)
```
User-Agent: *
Allow: /
Disallow: /_next/  /api/  /catalogs/

User-Agent: Googlebot / Bingbot / GPTBot / ClaudeBot / PerplexityBot / Google-Extended
Allow: /
Disallow: /_next/  /api/  /catalogs/

Host: https://www.sipanelco.ir
Sitemap: https://www.sipanelco.ir/sitemap.xml
```
No `Content-Signal` line and no Cloudflare-injected `Disallow: /` AI-bot group remain.

| Crawler | Intended | Now served | Status |
| --- | --- | --- | --- |
| Googlebot | Allow | Allow | ✅ OK |
| Bingbot | Allow | Allow | ✅ OK |
| PerplexityBot | Allow | Allow | ✅ OK |
| GPTBot | Allow | Allow | ✅ OK |
| ClaudeBot | Allow | Allow | ✅ OK |
| Google-Extended | Allow | Allow | ✅ OK |

`llms.txt` is fully accessible (200, `text/plain`, CORS `*`).

### Background — the conflict that was fixed
Previously, Cloudflare's *AI Crawl Control / Managed robots.txt* feature prepended a block that set `Content-Signal: search=yes,ai-train=no` and `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, and CloudflareBrowserRenderingCrawler. This directly contradicted the explicit AI-crawler `Allow` rules added in commits `9c24def` / `54a1969`, producing two equally-specific, conflicting groups per bot (unreliable under RFC 9309). Disabling the Cloudflare feature removed the contradiction at its source, leaving only the application `robots.txt` in force.

---

## 5. Final Status

| Category | Result |
| --- | --- |
| www returns 200 | ✅ PASS |
| apex 308-redirects → www | ✅ PASS |
| Redirect chain resolves to 200 (no loops) | ✅ PASS |
| Canonical host consistent (headers + robots Host) | ✅ PASS |
| Sitemap reachable + declared | ✅ PASS |
| HSTS enforced | ✅ PASS |
| `llms.txt` reachable by AI agents | ✅ PASS |
| AI crawler `robots.txt` policy coherent | ✅ PASS (Cloudflare block disabled) |

### Overall: ✅ PASS

Core infrastructure, redirects, canonical host, and sitemap are **fully correct**, and the AI-crawler `robots.txt` conflict has been **resolved** by disabling Cloudflare's AI Crawler Block for the zone. The deployed policy now matches the intent of the recent SEO commits — GPTBot, ClaudeBot, PerplexityBot, and Google-Extended are consistently allowed, with `/_next/`, `/api/`, and `/catalogs/` disallowed.

---

*Probe commands used:*
```bash
curl -sI  https://www.sipanelco.ir/{llms.txt,robots.txt,sitemap.xml}
curl -sI  https://sipanelco.ir/{llms.txt,robots.txt,sitemap.xml}
curl -sIL https://sipanelco.ir/llms.txt          # redirect chain
curl -s   https://www.sipanelco.ir/robots.txt    # AI crawler rules
```
