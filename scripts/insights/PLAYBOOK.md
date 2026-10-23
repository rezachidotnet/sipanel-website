# Automated Engineering Insights — Publishing Playbook

> **خلاصه فارسی:** این فایل دستورالعمل اجرای خودکار است. هر اجرا: بررسی مجاز بودن انتشار (`next-slot`) ← تحقیق ترند روز برای یکی از ۷ سیستم ← نوشتن مقاله در ۴ زبان (فارسی مرجع) ← عبور از دروازه‌های کیفیت و بیلد ← push به `main` ← دیپلوی خودکار Vercel ← بررسی صفحه زنده. اگر موضوع باکیفیتی پیدا نشود یا دروازه‌ها رد شوند، **هیچ چیز منتشر نمی‌شود**.

This playbook is executed by the scheduled publishing agent. Follow it exactly. It is the
contract between the automation and the site; when it conflicts with a general habit, the
playbook wins. Repository rules in `CLAUDE.md` still apply.

**Prime directive:** publishing nothing is always better than publishing a weak, duplicated,
or unverifiable article. Google demotes scaled low-value content; one rejected run costs nothing.

---

## 0. Setup

```bash
git clone https://github.com/rezachidotnet/sipanel-website && cd sipanel-website   # if not already cloned
git checkout main && git pull --ff-only
npm install --no-audit --no-fund && git checkout package-lock.json   # lockfile is not ours to change
```

## 1. Gate: may we publish today?

```bash
node scripts/insights/next-slot.mjs > /tmp/slot.json
```

- If `canPublish` is `false`: stop. Report the `blockers` and end the run. Do not override.
- Otherwise note `recommendedSystems` (rotation order), each system's `existingArticles`,
  `tierAProjects`, and `avoidPrimaryKeywords`.

## 2. Find today's trend (research, ~8–15 searches)

Goal: a topic that people in the SIPANEL market (Iran first, then Iraq/Gulf and CIS) are
searching or talking about **now**, that maps to one of the recommended systems, and that
SIPANEL can answer with real engineering substance.

Signals to check, in this order:
1. **Persian search demand** — WebSearch Persian queries for the top 1–3 recommended systems
   (e.g. `نشتی سقف سوله`, `نورگیر سقفی چکه`, `سازه چادری برف`, `سقف متحرک رستوران زمستان`).
   Note which questions appear in results, "People also ask", forum threads, and fresh news.
2. **News and regulation** — Iranian construction/industry news from the last ~30 days:
   مقررات ملی ساختمان updates, fire-safety rules (e.g. after incidents), energy/insulation
   rules, large public projects (airports, stadiums, hospitals, malls), steel/material market
   shifts. Prefer official and established outlets.
3. **Season and weather** — use the current date. Autumn/winter: rain leakage, snow load,
   condensation, thermal bridges, wind uplift. Spring: dust, hail. Summer: heat gain,
   UV ageing, daylight glare, ventilation.
4. **Global technical trend** — only if it has a clear local angle (e.g. ETFE in stadiums,
   PIR vs. mineral-wool fire performance).

Choose **one** topic that scores well on all of:
- fresh evidence of interest (a dated source within ~45 days, or a seasonal pattern that is active now);
- fits one of the top 3 recommended systems (prefer #1; never the same system as the last article);
- answerable with engineering logic (problem → cause → execution), not with prices or brand comparisons;
- **does not** duplicate an existing article's angle or any keyword in `avoidPrimaryKeywords`;
- not a blocked topic: ACP / نمای کامپوزیت (business fit unconfirmed), prices/costs, competitor names,
  political or tragedy-exploiting framing (an incident may motivate a *preventive* engineering topic,
  but never name victims or speculate on blame).

If no topic qualifies, stop and report "no qualified trend today". Do not force one.

Pick a **long-tail primary keyword** in Persian (3–6 words, question or problem phrasing works well,
e.g. `علت چکه کردن نورگیر سقف سوله`). It must not equal a reserved keyword; it should *support* the
system page, not compete with it.

## 3. Write the article

Create `content/insights/<slug>.json`. Copy the structure of an existing file in that folder;
the schema is enforced by `lib/insights/content-schema.ts` and `scripts/insights/validate.mjs`.

### Fields
| Field | Rule |
|---|---|
| `slug` | English kebab-case, ≤ 60 chars, describes the problem (e.g. `rooflight-condensation-drip-industrial-roof`). Must equal the file name. |
| `category` | The chosen system id from `next-slot`. |
| `status` | `"published"` |
| `publishedAt` / `updatedAt` | Today's date (`today` from `next-slot`). |
| `faqIds` | One stable kebab-case id per FAQ (same order in every locale), e.g. `condensation-root-cause`. Never change ids after publishing. |
| `relatedProjects` | 1–3 project slugs **of the same system**, Tier A first (`tierAProjects`, then `otherProjects`). Empty only if the system has none. |
| `relatedInsights` | 1–2 existing article slugs that a reader would genuinely want next. |
| `relatedResources` | 0–2 resource slugs from `resources` only if truly relevant; otherwise `[]` (system-based fallback applies). |
| `trend` | `{topic, rationale, observedAt, sources[]}` — rationale explains *why now*, sources are the URLs you used as the trend signal. Required. |
| `citedFigures` | Every number that appears anywhere in visible text, with its source (`https://…` or `repo:<path>`). |
| `locales.fa/en/ar/ru` | Full content (see below). |

### Content per locale
- `title` ≤ 65 chars, contains the primary keyword naturally. `metaDescription` 120–160 chars, contains the keyword, ends with what the reader gets.
- `summary`: the direct answer in 2–3 sentences (this is what search snippets and AI answers lift).
- `problem` and `cause`: a specific `title` (not just "Problem"), a substantial `body`, and **4–6 points**.
- `visual`: describe the diagram that *should* exist; it renders as "pending verified proof". Never claim a diagram exists.
- `execution`: **4–6 steps** of SIPANEL engineering logic (review → coordinate → control → verify).
- `faqs`: **4–6** real questions people ask about this topic (use what you saw in research), answered directly.
- `cta`: a headline and text that invite a technical review of *this* problem.
- `readingMinutes`: honest estimate (≈ 200 words/minute).
- Minimum length is enforced: fa ≥ 650 words, en ≥ 600, ar/ru ≥ 520.

### Writing rules (non-negotiable)
1. **Persian is the source.** Write `fa` first as a senior Iranian envelope engineer would explain it to a client: natural, precise, no translationese. Use Persian ی/ک (never Arabic ي/ك), ZWNJ (نیم‌فاصله) where standard (`می‌شود`, `پانل‌ها`).
2. Then write `en`, `ar` (Modern Standard Arabic, Gulf/Iraq-friendly terminology), and `ru` as faithful professional adaptations — same facts, same structure, natural in each language. Arabic must not contain Persian letters (گ چ پ ژ ی ک).
3. **No invented facts.** No project results, percentages, prices, durations, standards numbers or test values unless they come from a source you cite in `citedFigures` (repo facts are in `lib/case-studies/case-study-pages.ts`). When in doubt, explain the mechanism instead of quoting a number. Spell out small counts in words.
4. No marketing superlatives (بهترین، ارزان‌ترین، تضمینی، best, cheapest, guaranteed). Engineering tone, like the existing articles.
5. Talk about SIPANEL's *method* (review, coordination, execution control), never about guarantees.
6. Do not copy sentences from sources. Paraphrase and add engineering reasoning.
7. The article must add something the existing articles and the system page do not already say.

## 4. Quality gates

```bash
node scripts/insights/build-manifest.mjs
node scripts/insights/validate.mjs <slug>      # strict gates for the new article + all others
npm run typecheck
npm test
npm run build
```

- Fix every error and re-run. Warnings: fix unless there is a clear reason not to.

### Independent editor review (required)
Spawn a **separate** agent that did not write the article. Give it only: the JSON file path,
this playbook's sections 2–3, the system page (`app/[locale]/systems/<system>/page.tsx` or
`lib/services/*`), and the existing articles in `content/insights/`. Ask it to return one verdict:
- `PASS` — accurate, original, useful, natural in all four languages;
- `FIXED` — it corrected specific problems in the file (list them);
- `BLOCK` — invented or unverifiable facts, thin/generic content, duplicated angle,
  cannibalizes a systems page, unnatural Persian, or a mistranslation that changes meaning.

The editor checks in particular: every claim is engineering-plausible and not overstated; no
number without a cited source; Persian reads like a native engineer wrote it; ar/ru/en say the
same thing as fa; FAQ answers actually answer. On `BLOCK`, do not publish (see below).
After `FIXED`, re-run all gates.
- If the gates still fail after two repair attempts, or the editor returns `BLOCK`, **do not publish**: delete the new file,
  restore the manifest (`git checkout -- lib/insights/articles.generated.ts`), and report why.

## 5. Publish

```bash
git add content/insights/<slug>.json lib/insights/articles.generated.ts
git commit -m "content(insights): <fa title> (<category>)"
git pull --rebase origin main && git push origin main
```

Only these two files may be in the commit. Pushing to `main` triggers the Vercel production deploy.

## 6. Verify

Wait ~5 minutes, then fetch `https://www.sipanelco.com/insights/<slug>` (Persian is served without a prefix) and `https://www.sipanelco.com/en/insights/<slug>`.
Confirm the page loads with the new title. If it is not live after ~15 minutes, report it
(do not revert unless the live site is broken).

## 7. Report

End the run with a short Persian summary: title (fa), system, primary keyword, why this trend now
(one line + source), live URLs, or — if nothing was published — the exact reason.
