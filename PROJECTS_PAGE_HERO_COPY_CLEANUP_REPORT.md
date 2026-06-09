# Projects Page Hero Copy Cleanup Report

## Files Modified

| File | Changes |
|------|---------|
| `app/[locale]/projects/page.tsx` | Updated hero copy, removed eyebrow/introTitle/intro fields, removed intro header block |
| `app/globals.css` | Adjusted section top padding after intro removal |

## Removed Sections

### 1. Hero eyebrow text
Removed `<p className="service-eyebrow">{content.eyebrow}</p>` from the hero section.

Removed eyebrow values:
- fa: شواهد پروژه
- en: Project Proof
- ar: إثبات المشروع
- ru: Проектное подтверждение

### 2. Intro header block below hero
Removed the entire `<header className="projects-index-section__header">` block containing:
- Eyebrow text (duplicate of hero)
- `<h2>` with `introTitle` (e.g., "پروژه‌هایی که سیستم را اثبات می‌کنند")
- `<p>` with `intro` description paragraph

### 3. Type cleanup
Removed `eyebrow`, `introTitle`, and `intro` fields from the copy type definition and all four locale objects.

## New Hero Copy Per Locale

### fa (Persian)
- **h1:** پروژه‌های منتخب SIPANEL
- **description:** بیش از ده‌ها پروژه اجراشده در صنایع، فرودگاه‌ها، مراکز درمانی، تجاری و ورزشی ایران. از دهانه‌های بلند تا پوشش‌های پیچیده معماری؛ نمونه‌هایی از راهکارهای مهندسی اجراشده SIPANEL.

### en (English)
- **h1:** Selected SIPANEL Projects
- **description:** Dozens of completed projects across industrial facilities, airports, healthcare, commercial and sports buildings in Iran. From long-span structures to complex architectural envelopes, explore SIPANEL's engineered execution solutions.

### ar (Arabic)
- **h1:** مشاريع مختارة من SIPANEL
- **description:** عشرات المشاريع المنفذة في المنشآت الصناعية والمطارات والمرافق الصحية والتجارية والرياضية في إيران. من البحور الواسعة إلى الأغلفة المعمارية المعقدة، استعرض حلول SIPANEL الهندسية المنفذة.

### ru (Russian)
- **h1:** Избранные проекты SIPANEL
- **description:** Десятки реализованных проектов в промышленных, аэропортовых, медицинских, коммерческих и спортивных объектах Ирана. От большепролетных конструкций до сложных архитектурных оболочек — примеры инженерных решений SIPANEL.

## Spacing Adjustments

| Selector | Before | After |
|----------|--------|-------|
| `.projects-index-section` (mobile) | `padding: 64px 0` | `padding: 32px 0 64px` |
| `.projects-index-section` (desktop ≥1024px) | `padding-block: 96px` | `padding: 48px 0 96px` |

Reduced top padding to keep filters visually close to the hero after removing the intro header block. Bottom padding preserved for spacing before the proof governance section.

## Verification Results

| Route | Status |
|-------|--------|
| `/fa/projects` | Builds successfully |
| `/en/projects` | Builds successfully |
| `/ar/projects` | Builds successfully |
| `/ru/projects` | Builds successfully |

| Check | Result |
|-------|--------|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |
