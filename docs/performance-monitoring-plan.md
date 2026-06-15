# Performance Monitoring Plan — `/fa`

Companion to [`performance-investigation-2026-06.md`](./performance-investigation-2026-06.md). Lightweight, manual, field-data-first. **No automation is set up** — by design (see "Why no automated job").

## Why field data, and why not a 24–48h job

The investigation showed lab metrics on a local box are dominated by **simulated throttling + run variance** (lab LCP swung 3.9–6.4 s with no code change). Real improvement must be confirmed with **CrUX field data** (real Chrome users).

CrUX field data is a **trailing 28-day p75, recomputed daily**. A deploy moves that window only ~1/28 per day, so **24–48h shows no meaningful signal**. Realistic time to see a deploy's field effect: **~1–4 weeks**. An automated 48h job would produce false reassurance, so none was created.

## What to check

Track **p75** for `https://www.sipanelco.ir/fa` (page-level) and the origin:

| Metric | Why it matters here | Expectation post-deploy |
|---|---|---|
| **LCP** p75 | Primary target of the hero/CSS work | Improvement gated by network geography (TTFB), not code |
| **INP** p75 | Reflects the JS/hydration reductions (RevealSection, Zod defer, modal lazy) | **Clearest expected gain** — this is what the main-thread work targeted |
| **TTFB** p75 | Decides the Cloudflare-caching question | If high (> ~500–600 ms) for the real audience → Cloudflare HTML caching worth doing; if low (~200–300 ms) → lab numbers were artifacts, stop |
| **CLS** p75 | Regression guard | Should stay ~0 |

## Where to check (no API key needed)

1. **PageSpeed Insights** — <https://pagespeed.web.dev/> → enter `https://www.sipanelco.ir/fa`. The top "Discover what your real users are experiencing" panel is CrUX field data (page + origin). Free, no key.
2. **Google Search Console → Core Web Vitals** (Experience report) — trend lines for LCP/INP/CLS across the whole property, mobile vs desktop, with "good/needs-improvement/poor" URL buckets over time. Best for trend-watching.
3. **CrUX Vis / CrUX History** — <https://cruxvis.withgoogle.com/> for the public weekly p75 history of the origin (no key).

## Review intervals

- **Weekly (first 4 weeks post-deploy):** PSI field panel for `/fa` + Search Console CWV trend. Watch INP and LCP p75 move as the 28-day window rolls past the deploy date (deploys landed ~2026-06-15: `e3d2e7b`, `8ee30ec`, `f2c6066`, `cd11c36`).
- **Monthly (ongoing):** Search Console CWV report — confirm no regressions, watch the "good URL" share. Re-baseline if traffic/content shifts materially.
- **Decision checkpoint (~4 weeks out):** read TTFB p75 for the real audience and apply the binary rule above (Cloudflare HTML caching vs. stop).

## Future: PSI / CrUX API key (optional, for scripted checks)

Not required for the manual plan above. Set up only if you later want automated/logged snapshots.

**Obtain a key:**
1. Google Cloud Console → create/select a project.
2. APIs & Services → Library → enable **PageSpeed Insights API** (and **Chrome UX Report API** if using CrUX directly).
3. APIs & Services → Credentials → Create credentials → **API key**.
4. Restrict the key (recommended): API restriction → PageSpeed Insights API (+ CrUX API). It's read-only quota; no billing exposure beyond rate limits.

**Configure (keep out of git):**
- Store as an env var, e.g. `PAGESPEED_API_KEY`, or in a gitignored file (`.env.local` / `/tmp/.psi_key`). Never commit it.

**Fetch field data (example):**
```bash
# Page-level + origin CrUX field data (loadingExperience / originLoadingExperience) for /fa
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed\
?url=https%3A%2F%2Fwww.sipanelco.ir%2Ffa&strategy=mobile&key=$PAGESPEED_API_KEY" \
  | jq '{page: .loadingExperience.metrics, origin: .originLoadingExperience.metrics}'
```
For p75 history (weekly points), use the CrUX **History API** (`https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=...`).

## Status

Performance investigation **complete, pending field-data review**. No further code, infrastructure, or automation changes. Revisit per the intervals above.
