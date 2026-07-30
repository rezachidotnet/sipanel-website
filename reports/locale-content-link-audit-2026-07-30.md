# SIPANEL Locale Content and Link Audit - 2026-07-30

## Scope

Production sitemap crawled: `https://www.sipanelco.ir/sitemap.xml`

Routes crawled: 232

Crawlable internal anchors checked: 10,007

Locale URL mismatch count: 0

Mixed-language destination/content defects confirmed: 148 rendered production pages, concentrated in project detail pages and pages that render related project cards from the same case-study data source.

## Defect Inventory

| Source URL | Source locale | Anchor text | Current destination URL | Expected destination URL | Destination locale | Mismatch type | Repository source | Current field or data source | Proposed correction |
|---|---:|---|---|---|---:|---|---|---|---|
| `/resources/sandwich-panel-selection-guide` | fa | related project cards | `/projects/army-hospital`, `/projects/mahshahr-taxi-parking`, `/projects/mehrabad-aircraft-hangar` | same unprefixed Persian URLs | fa | untranslated related card | `lib/resources/engineering-resource-hub.ts`, `lib/case-studies/case-study-pages.ts` | resource related cards consume case-study `hero` and project reason fields; several project names, locations, and descriptions resolve from English base data | use localized case-study content and localized locations/reasons for every rendered related card |
| `/ar/resources/sandwich-panel-selection-guide` | ar | related project cards | `/ar/projects/army-hospital`, `/ar/projects/mahshahr-taxi-parking`, `/ar/projects/mehrabad-aircraft-hangar` | same Arabic-prefixed URLs | ar | untranslated related card | `lib/resources/engineering-resource-hub.ts`, `lib/case-studies/case-study-pages.ts` | Arabic route links correctly, but Army Hospital and priority project card body can expose English descriptive fields through fallback | add complete Arabic case-study content and prevent English descriptive fallback |
| `/ru/resources/sandwich-panel-selection-guide` | ru | related project cards | `/ru/projects/army-hospital`, `/ru/projects/mahshahr-taxi-parking`, `/ru/projects/mehrabad-aircraft-hangar` | same Russian-prefixed URLs | ru | untranslated related card | `lib/resources/engineering-resource-hub.ts`, `lib/case-studies/case-study-pages.ts` | Russian route links correctly, but Army Hospital and priority project card body can expose English descriptive fields through fallback | add complete Russian case-study content and prevent English descriptive fallback |
| `/projects/mahshahr-taxi-parking` | fa | n/a | n/a | n/a | fa | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | `projectName`, `projectType`, `challenge`, `sipanelSolution`, `engineeringDecision`, `executionDetail`, `measuredResult`, `riskPrevented`, generated summary, image alt | improve English source, add complete Persian/Arabic/Russian localized overrides, localize location, prevent generated English fallback |
| `/projects/mehrabad-aircraft-hangar` | fa | n/a | n/a | n/a | fa | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | `challenge`, `sipanelSolution`, `engineeringDecision`, `executionDetail`, `measuredResult`, `riskPrevented`, generated summary, image alt | improve English source, add complete Persian/Arabic/Russian localized overrides, localize location, prevent generated English fallback |
| `/projects/ahvaz-airport-passenger-terminal` | fa | n/a | n/a | n/a | fa | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | `challenge`, `sipanelSolution`, `engineeringDecision`, `executionDetail`, `measuredResult`, `riskPrevented`, generated summary, image alt | improve English source, add complete Persian/Arabic/Russian localized overrides, localize location, prevent generated English fallback |
| `/projects/kermanshah-industrial-university-petroleum-faculty` | fa | n/a | n/a | n/a | fa | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | `challenge`, `sipanelSolution`, `engineeringDecision`, `executionDetail`, `measuredResult`, `riskPrevented`, generated summary, image alt | improve English source, add complete Persian/Arabic/Russian localized overrides, localize location, prevent generated English fallback |
| `/ar/projects/army-hospital` | ar | n/a | n/a | n/a | ar | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | Arabic override only covers hero/CTA fields; body challenge, solution, execution, result, risk points fall back to English base | add complete Arabic override for every rendered descriptive project field |
| `/ru/projects/army-hospital` | ru | n/a | n/a | n/a | ru | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | Russian override only covers hero/CTA fields; body challenge, solution, execution, result, risk points fall back to English base | add complete Russian override for every rendered descriptive project field |
| all non-English project detail pages without full overrides | fa/ar/ru | n/a | n/a | n/a | fa/ar/ru | mixed-language destination content | `lib/case-studies/case-study-pages.ts` | `buildInitialLocaleContent()` uses English base strings for verified challenge/result fields when locale-specific overrides are absent | change fallback policy so indexable non-English pages render localized verified-summary text, not English descriptive sentences |
| all project detail related-case cards | fa/ar/ru | related case-study cards | locale-aware project URLs | same locale-aware project URLs | fa/ar/ru | untranslated related card and image alt | `components/case-studies/case-study-page-template.tsx`, `lib/case-studies/case-study-pages.ts` | related card challenge/result fields and image alt suffix are English when sourced from base fields | use localized card content and localized alt suffix |

## Link Findings

The production link crawl found no confirmed wrong-locale internal destination URLs after excluding language switcher links and correctly distinguishing `/faq` from `/fa`. The routing helper and `next-intl` `Link` usage are preserving the intended URL architecture:

- Persian source pages link to unprefixed Persian destinations.
- English source pages link to `/en/...` destinations.
- Arabic source pages link to `/ar/...` destinations.
- Russian source pages link to `/ru/...` destinations.

## Root Data Sources

- `lib/case-studies/case-study-pages.ts`: primary source for project-detail content, metadata, schema descriptions, related project cards, and case-study route maps.
- `components/case-studies/case-study-page-template.tsx`: renders related-project card image alt text with an English suffix.
- `lib/resources/engineering-resource-hub.ts`: consumes case-study locale content for resource related-project cards; URLs are correct, but card text quality depends on case-study localization completeness.

## Priority Correction Scope

The following four project case studies require factual source improvement first, then complete localization:

- `mehrabad-aircraft-hangar`
- `ahvaz-airport-passenger-terminal`
- `kermanshah-industrial-university-petroleum-faculty`
- `mahshahr-taxi-parking`

The following confirmed related defect also requires correction:

- Arabic and Russian Army Hospital project detail pages fallback to English body sections.

