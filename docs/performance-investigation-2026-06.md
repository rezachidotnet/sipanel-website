# Performance Investigation — `/fa` (June 2026)

Investigation into homepage (`/fa`) mobile performance — Next.js 16 App Router, Vercel + Cloudflare. **Status: complete, pending future field-data review.** All figures are measured (live Lighthouse, production headers, build artifacts, `curl` timing), not estimated.

See also: [`performance-monitoring-plan.md`](./performance-monitoring-plan.md) for how/when to validate with field data.

---

## 1. Initial state (before any work)

Lab (mobile, simulated): **Perf 78 · LCP 5111 ms · FCP 1314 ms · TBT 150 ms · CLS 0** (reported PSI was ~70 / ~7.5 s LCP).

LCP breakdown — the diagnosis:

| Phase | Value | % |
|---|---|---|
| TTFB | 836 ms | 16% |
| **Load Delay** | **2426 ms** | **47% — dominant** |
| Load Time | 1369 ms | 27% |
| Render Delay | 479 ms | 9% |

Root causes:
- **Hero (LCP element) mis-delivered on mobile** — `next/image priority` preloaded a desktop variant the page never paints (the `<picture>` renders `hero-mobile.webp`), while the real mobile LCP image was **not preloaded**; the desktop variant also **double-downloaded** on mobile.
- **8 fonts (~372 KB) preloaded**, incl. ~150 KB Latin/Cyrillic Inter on a Persian page.
- **Monolithic `globals.css`** — 211 KB / 26.5 KB gzip, render-blocking on every route, ~82% unused on `/fa`.
- **JS ~315 KB** — Zod on the initial path; `RevealSection` running ~9 IntersectionObservers; main-thread ~1.8 s (Style & Layout 628 ms).

## 2. Changes implemented (all shipped to production)

| Commit | Change |
|---|---|
| `441fbdb` (prior) | Server-render hero; CTA isolated into `hero-actions` client island |
| `e3d2e7b` | Media-scoped hero preload (mobile→`hero-mobile.webp` `max-width:767px`; desktop→`min-width:768px`); killed mobile double-download; fonts **8→1** (Vazirmatn only) |
| `8ee30ec` | CSS split: `projects-index`, `about`, `contact`, `seo` → route-scoped files |
| `f2c6066` | CSS split: `resource-*` (42 KB, 289 rules) → `components/resources/resources.css` |
| `cd11c36` | `RevealSection` → server component (dead-weight observer/hydration removed); Zod dynamic-imported in the RFQ resolver; catalog modal `dynamic(ssr:false)` + render-on-open |

Each verified per route × all four locales (fa/en/ar/ru) before deploy.

## 3. Measured improvements

- **Load Delay 2426 ms → 419 ms** (the dominant bottleneck, eliminated); **Load Time 1369 → 577 ms**. Hero now `priority=High`, ~81 ms download, no desktop fetch on mobile; fonts 372 KB → 46 KB on the critical path.
- **Render-blocking CSS 26.5 → 17.9 KB gzip** (`globals.css` 211 → 134 KB).
- **Initial `/fa` JS 1.21 MB → 0.93 MB raw**; Zod refs in initial JS **485 → 0**.
- **TBT 130 → 104 ms (−20%) · Style & Layout 628 → 513 ms (−18%) · main-thread 1800 → 1662 ms.** CLS 0 throughout.

**Measurement caveat:** lab LCP swung **3.9 s → 6.4 s with no causal code change** between runs. CPU-bound metrics improved consistently (and despite worse network windows), so those deltas are credible; **absolute lab LCP is not a reliable before/after** on the local box.

## 4. Infrastructure findings (rendering / caching / TTFB)

- **`/fa` is 100% static (SSG)** — `prerender-manifest` `initialRevalidateSeconds: false`, `x-nextjs-prerender: 1`. No SSR, no ISR, no cold start.
- **Middleware does not touch `/fa`** — matcher is `['/']` (apex→default-locale redirect only).
- **Vercel edge cache works** — `x-vercel-cache: HIT`, served from `fra1`; requests are cache reads, not renders.
- **Cloudflare does NOT cache the HTML** — `cf-cache-status: DYNAMIC`, because Next sets `Cache-Control: max-age=0, must-revalidate` (correct default: the HTML `Vary`s on RSC headers). Static assets are cached at Cloudflare + Vercel (`immutable`, 1 yr).
- **Real measured TTFB is low** — ~115 ms warm / ~270 ms cold (`curl`). The ~900–1100 ms "TTFB" in Lighthouse is the **simulated 4G throttling model**, not real network.
- TTFB decomposition (from a Sofia Cloudflare POP → `fra1`): Browser→CF setup ~150 ms (one-time); **CF→Vercel `fra1` origin hop ~66–95 ms**; Vercel edge response negligible (cache HIT); no extra revalidation RTT (no `ETag`, so no 304 — `max-age=0` forces a full GET per navigation but adds no separate round trip).

## 5. Remaining bottlenecks

1. **Network geography / Cloudflare HTML pass-through** — every navigation does a CF→`fra1` hop (~66–95 ms from Europe; likely **150–300 ms for the Iran-based audience**, far from Frankfurt). The only real, code-independent residual. Infra, not application.
2. **Lab throttling artifact** — not a real bottleneck; the inflated lab TTFB/LCP is the simulation.
3. **Residual main-thread ~1.6 s** — next-intl client runtime + `@formatjs/intl-messageformat`, `react-hook-form`, remaining client islands. Real but **diminishing LCP ROI**.

## 6. Items intentionally NOT changed

- `experimental.optimizeCss` / critters — verified a **no-op in App Router + Turbopack**, reverted.
- Remaining CSS families (`case-study` detail, `systems` detail, `service`, `faq`, `insights` — ~68 KB / 51% of `globals.css`) — low LCP ROI; paused.
- `technical-diagram-modal` CSS — left in globals; its component is on the homepage, so extracting would re-load it onto `/fa`.
- next-intl strings-as-props refactor & `react-hook-form` reduction — paused (biggest surface, smallest LCP payoff).
- **Cloudflare HTML caching** — not touched. Requires respecting the RSC `Vary`, scoping to document requests, and invalidating on deploy; decision deferred to field data.

## 7. Conclusion

The investigation eliminated the real, fixable bottlenecks (hero delivery, render-blocking CSS bloat, dead-weight hydration) and ruled out SSR / ISR / middleware / runtime rendering. The remaining lever is **network geography (Cloudflare HTML caching)**, decidable only with **field data for the real audience**. Shipped changes are net-positive, verified, and live. Application-level JS/CSS optimization has reached diminishing returns for LCP.

**Next step:** field-data review per the monitoring plan, then a single binary decision — enable Cloudflare HTML caching (if field TTFB p75 is high for the audience) or close the investigation (if field TTFB is already low).
