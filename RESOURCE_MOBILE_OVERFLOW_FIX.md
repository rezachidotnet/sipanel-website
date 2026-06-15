# Resource Library — Mobile Clipping Fix

**Section:** Engineering Resource Library (`/[locale]/resources`)
**Component:** `components/resources/engineering-resource-hub-page.tsx`
**File changed:** `app/globals.css` (1 file, +24 lines, CSS only)
**Date:** 2026-06-15

---

## 1. Symptom

At mobile widths (~390px, also reproduced at 360px), the resource cards in the
**Engineering Resource Library** grid appeared vertically clipped — the lower part of
each card and the orange **"View details" / "مشاهده جزئیات"** CTA were cut off / not
fully visible.

## 2. Root cause (the *parent container* responsible)

The clipping was **not** a vertical `height`/`max-height` or `overflow: hidden`
constraint on the card. It was **horizontal overflow** of the grid that an ancestor
`overflow` then swallowed — so it *read* as content being cut off instead of a scrollbar.

The chain, top to bottom:

```
section.resource-hub-section--light
└─ div.resource-hub-section__inner            (grid)   width 350px  ✓ fits
   └─ div.resource-hub-filter-shell           (grid)   ← THE PARENT AT FAULT
      ├─ div.resource-hub-filter-bar          (flex)
      │  └─ div.resource-filter-controls      (overflow-x:auto chip scroller)
      └─ div.resource-hub-grid                (grid)   ← cards live here
```

- `.resource-filter-controls` (the category-filter chip row) is, by design, a
  horizontal scroller on mobile: `display:flex; overflow-x:auto`.
- For that scroller to actually scroll, it needs a **width constraint** from above.
  It had none: grid items default to `min-width: auto`, and `.resource-hub-filter-shell`
  uses an **implicit `auto` (max-content) column**.
- So the chip row's full content width (**~481px in `fa`, ~732px in `en/ru`** at a
  390px screen) propagated *up* and set the shell's grid column to that width instead
  of scrolling.
- `.resource-hub-grid` is the shell's other child, so it was placed into that same
  oversized column → **cards rendered 481–732px wide inside a 390px viewport**.
- The off-screen remainder (including the CTA, which is full-width on mobile) was
  clipped by ancestor overflow → the reported "lower part / CTA cut off".

The **featured** grid (`.resource-hub-featured-grid`) did *not* clip because it is a
direct child of `__inner` with no filter-shell / chip-scroller wrapper, so its
max-content already fit.

### Checklist from the brief

| Check | Finding |
| --- | --- |
| `overflow:hidden` on parents | Present on `.resource-card` (intended, for image radius). **Not** the cause. |
| Fixed `height` / `max-height` | None on mobile (the `min-height: 580/700px` rules are scoped to `min-width:768px` only). Not the cause. |
| Flex/grid misconfiguration on mobile | **Yes — root cause.** Grid items at default `min-width:auto` + implicit `auto` column let the chip scroller's max-content blow out the shell width. |
| Missing `padding-bottom` on mobile | No — vertical box was correct (`scrollHeight - clientHeight === 0`). |

## 3. Fix (mobile breakpoint only)

Added one `@media (max-width: 767px)` block in `app/globals.css` (immediately after the
`.resource-hub-grid` base rule). It pins every grid level in the chain to a single
container-width column and lets the shrinkable parts collapse, so the chip row scrolls
within the viewport instead of expanding the layout:

```css
@media (max-width: 767px) {
  .resource-hub-filter-shell,
  .resource-hub-featured-grid,
  .resource-hub-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .resource-hub-filter-shell,
  .resource-hub-filter-bar,
  .resource-filter-controls,
  .resource-hub-grid {
    min-width: 0;
  }
}
```

- `minmax(0, 1fr)` gives each grid a single column whose floor is `0`, so width is
  driven by the container (viewport), not by content max-content.
- `min-width: 0` releases the default `auto` minimum on the grid items so they can
  shrink, allowing `.resource-filter-controls` to scroll as intended.
- **Desktop is untouched:** the multi-column templates (`repeat(2/3, minmax(0,1fr))`,
  `min-height`, chip-row wrapping) all live in `@media (min-width: 768px)` blocks, which
  are the exact complement of `max-width: 767px`.

## 4. Verification (Playwright, headless Chromium)

### Mobile — fixed
| Locale @ width | Card width (before → after) | H-scroll | Card clipped | CTA inside card |
| --- | --- | --- | --- | --- |
| `fa` @ 390 | 481px → **350px** | 0 | no | yes |
| `en` @ 390 | 732px → **350px** | 2 → **0** | no | yes |
| `en` @ 360 | 732px → **320px** | **32 → 0** | no | yes |
| `ar` @ 390 | 542px → **350px** | 0 | no | yes |
| `ru` @ 390 | 831px(max) → **350px** | 0 | no | yes |

The chip row now scrolls *within* the viewport (e.g. `fa@390`: box 390px / scrollWidth 521px).

> Bonus: `en @ 360px` previously had a **real horizontal-scroll bug** (`hScroll = 32px`).
> It is now `0`.

### Desktop — unchanged (regression guard)
| Width | Library card width | Columns | H-scroll |
| --- | --- | --- | --- |
| 768 | 225px | 3-col | 0 |
| 1024 | 311px | 3-col | 0 |
| 1440 | 391px | 3-col | 0 |

Identical to pre-fix output (cards/chips wrap, no scroll).

### Core Web Vitals (`fa @ 390px`, after scrolling whole page)
- **CLS = 0.0000** — no layout shift introduced.
- **LCP = 440 ms** — no regression (fix is CSS-only; hero / LCP path untouched).

## 5. Scope / safety

- **Not touched:** fonts, hero performance logic, card design, desktop spacing, global
  `overflow-x` fixes, JS/TSX. Only the one scoped mobile CSS block was added.
- **Files modified:** `app/globals.css` only.
