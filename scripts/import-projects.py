#!/usr/bin/env python3
"""
SIPANEL Incoming Project Import Pipeline

Reads assets/projects/_incoming/*/info.json
Generates optimized images, registers in TypeScript files
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path
from datetime import date

ROOT = Path(__file__).resolve().parent.parent
INCOMING = ROOT / "assets" / "projects" / "_incoming"
CASE_STUDY_FILE = ROOT / "lib" / "case-studies" / "case-study-pages.ts"
PROJECTS_PAGE = ROOT / "app" / "[locale]" / "projects" / "page.tsx"
REPORT = ROOT / "PROJECT_IMPORT_REPORT.md"

# Image dimensions (matching existing assets)
IMAGE_SPECS = {
    "card":         (800, 600, 82),
    "hero-desktop": (1600, 900, 82),
    "hero-mobile":  (900, 1400, 82),
    "gallery-large": (2400, 1600, 85),
}

# System keyword → service mapping
SYSTEM_MAP = {
    "zip_tech_roofing": "zip",
    "standing_seam": "zip",
    "zip_tech": "zip",
    "aluminium_cladding": "cladding",
    "cladding": "cladding",
}

SERVICE_VARS = {
    "zip": ("zipRoofingService", "/systems/standing-seam-zip-tech-roofing"),
    "cladding": ("claddingService", "/systems/aluminium-cladding-covering"),
    "sandwich": ("sandwichPanelService", "/systems/sandwich-panel-systems"),
}


def slug_to_camel(slug: str) -> str:
    parts = slug.split("-")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def ts_str(s: str) -> str:
    return f"'{ts_escape(s)}'"


def ts_array(items: list[str]) -> str:
    return "[" + ", ".join(ts_str(i) for i in items) + "]"


def detect_service(systems: list[str]) -> str:
    for sys_key in systems:
        for keyword, svc in SYSTEM_MAP.items():
            if keyword in sys_key.lower():
                return svc
    return "sandwich"


def detect_filters(systems: list[str]) -> list[str]:
    filters = set()
    for sys_key in systems:
        key_lower = sys_key.lower()
        if "sandwich" in key_lower:
            filters.add("sandwich")
        if "zip" in key_lower or "standing" in key_lower:
            filters.add("standing")
        if "cladding" in key_lower or "aluminium" in key_lower:
            filters.add("cladding")
    filters.add("envelope")
    order = ["sandwich", "standing", "cladding", "envelope"]
    return [f for f in order if f in filters]


def find_image(directory: Path, prefix: str) -> Path | None:
    for pattern in [f"{prefix}.*", f"*-{prefix}.*", f"*{prefix}.*"]:
        matches = [f for f in directory.iterdir()
                   if f.is_file() and not f.suffix == ".json"
                   and re.match(pattern.replace("*", ".*"), f.name, re.IGNORECASE)]
        if matches:
            return matches[0]
    return None


def generate_image(src: Path, dest: Path, width: int, height: int, quality: int) -> bool:
    try:
        subprocess.run([
            "convert", str(src),
            "-resize", f"{width}x{height}^",
            "-gravity", "center",
            "-extent", f"{width}x{height}",
            "-quality", str(quality),
            str(dest)
        ], check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError:
        return False


def get_existing_slugs() -> set[str]:
    content = CASE_STUDY_FILE.read_text()
    return set(re.findall(r"slug:\s*'([^']+)'", content))


def main():
    if not INCOMING.exists():
        print(f"ERROR: {INCOMING} does not exist")
        sys.exit(1)

    existing_slugs = get_existing_slugs()
    print(f"Existing slugs: {len(existing_slugs)}")

    imported = []
    skipped = []
    missing_images = []
    generated_images = []
    projects_data = []

    # ── Process each incoming project ──
    for project_dir in sorted(INCOMING.iterdir()):
        if not project_dir.is_dir():
            continue

        # Find JSON
        json_files = list(project_dir.glob("*.json"))
        if not json_files:
            print(f"  SKIP: {project_dir.name} (no JSON)")
            skipped.append(f"{project_dir.name} (no JSON)")
            continue

        json_file = json_files[0]
        data = json.load(open(json_file))
        slug = data.get("slug", project_dir.name)

        if slug in existing_slugs:
            print(f"  SKIP: {slug} (already registered)")
            skipped.append(f"{slug} (duplicate)")
            continue

        print(f"  IMPORTING: {slug}")

        # ── STEP 1 & 3: Find source images, preserve originals ──
        dest_photos = ROOT / "assets" / "projects" / slug / "photos"
        dest_source = ROOT / "assets" / "projects" / slug / "source"
        dest_photos.mkdir(parents=True, exist_ok=True)
        dest_source.mkdir(parents=True, exist_ok=True)

        after_img = find_image(project_dir, "after")
        before_img = find_image(project_dir, "before")

        # Copy originals
        for img in [after_img, before_img]:
            if img:
                subprocess.run(["cp", str(img), str(dest_source)], check=True)
        subprocess.run(["cp", str(json_file), str(dest_source)], check=True)

        if not after_img:
            missing_images.append(f"{slug}: no after image")
        if not before_img:
            missing_images.append(f"{slug}: no before image")

        # ── STEP 2: Generate optimized images ──
        src_img = after_img or before_img
        img_generated = False

        if src_img:
            for variant, (w, h, q) in IMAGE_SPECS.items():
                dest = dest_photos / f"{slug}-{variant}.webp"
                if generate_image(src_img, dest, w, h, q):
                    generated_images.append(f"{slug}-{variant}.webp")
                    img_generated = True
                else:
                    missing_images.append(f"{slug}: failed to generate {variant}")
        else:
            missing_images.append(f"{slug}: no source image for generation")

        if not img_generated:
            print(f"    WARNING: No images generated for {slug}")

        # Collect project data
        projects_data.append({
            "slug": slug,
            "data": data,
            "has_images": img_generated,
        })
        imported.append(slug)
        existing_slugs.add(slug)

    if not imported:
        print("\nNo new projects to import.")
        generate_report(imported, skipped, missing_images, generated_images)
        return

    # ── STEP 4: Register in case-study-pages.ts ──
    print(f"\n=== Registering {len(imported)} projects ===")

    cs_content = CASE_STUDY_FILE.read_text()

    # Build imports
    new_cs_imports = []
    for pd in projects_data:
        slug = pd["slug"]
        camel = slug_to_camel(slug)
        new_cs_imports.append(
            f"import {camel}Card from '@/assets/projects/{slug}/photos/{slug}-card.webp';\n"
            f"import {camel}Hero from '@/assets/projects/{slug}/photos/{slug}-hero-desktop.webp';"
        )

    # Insert imports after last existing project import
    last_import_match = None
    for m in re.finditer(r"^import \w+(?:Card|Hero) from '@/assets/projects/.*';$", cs_content, re.MULTILINE):
        last_import_match = m
    if last_import_match:
        insert_pos = last_import_match.end()
        cs_content = cs_content[:insert_pos] + "\n" + "\n".join(new_cs_imports) + cs_content[insert_pos:]

    # Build entries
    new_cs_entries = []
    for pd in projects_data:
        slug = pd["slug"]
        d = pd["data"]
        camel = slug_to_camel(slug)
        c_en = d["content"]["en"]
        c_fa = d["content"]["fa"]
        c_ar = d["content"].get("ar", c_en)
        c_ru = d["content"].get("ru", c_en)
        systems = d.get("systems", [])
        service_key = detect_service(systems)
        service_var, service_href = SERVICE_VARS[service_key]

        entry = f"""  {{
    slug: {ts_str(slug)},
    projectName: {{
      en: {ts_str(c_en['title'])},
      fa: {ts_str(c_fa['title'])},
      ar: {ts_str(c_ar['title'])},
      ru: {ts_str(c_ru['title'])}
    }},
    projectType: {{
      en: {ts_str(c_en.get('project_type', ''))},
      fa: {ts_str(c_fa.get('project_type', ''))},
      ar: {ts_str(c_ar.get('project_type', ''))},
      ru: {ts_str(c_ru.get('project_type', ''))}
    }},
    mainService: {service_var},
    serviceHref: {ts_str(service_href)},
    location: {ts_str(c_en.get('location', ''))},
    area: {ts_str(c_en.get('area_label', ''))},
    challenge: {ts_str(c_en.get('challenge', ''))},
    sipanelSolution: {ts_str(c_en.get('engineering_decision', ''))},
    engineeringDecision: {ts_str(c_en.get('engineering_decision', ''))},
    executionDetail: {ts_str(c_en.get('measured_result', ''))},
    measuredResult: {ts_str(c_en.get('measured_result', ''))},
    riskPrevented: {ts_array(c_en.get('risk_prevented', [])[:4])},
    cardImage: {camel}Card,
    heroImage: {camel}Hero,
    resourceTitle: localized('Panel Selection Guide')
  }}"""
        new_cs_entries.append(entry)

    # Insert entries before the closing of initialCaseStudies
    marker = "];\n\nfunction buildInitialCaseStudyPage"
    if marker in cs_content:
        parts = cs_content.split(marker, 1)
        entries_block = ",\n".join(new_cs_entries)
        cs_content = parts[0].rstrip() + ",\n" + entries_block + "\n" + marker + parts[1]

    CASE_STUDY_FILE.write_text(cs_content)
    print("  Updated case-study-pages.ts")

    # ── STEP 5: Register in projects/page.tsx ──
    pp_content = PROJECTS_PAGE.read_text()

    # Build page imports
    new_pp_imports = []
    for pd in projects_data:
        slug = pd["slug"]
        camel = slug_to_camel(slug)
        new_pp_imports.append(
            f"import {camel}Card from '@/assets/projects/{slug}/photos/{slug}-card.webp';"
        )

    # Insert imports after last existing project import
    last_import_match = None
    for m in re.finditer(r"^import \w+Card from '@/assets/projects/.*';$", pp_content, re.MULTILINE):
        last_import_match = m
    if last_import_match:
        insert_pos = last_import_match.end()
        pp_content = pp_content[:insert_pos] + "\n" + "\n".join(new_pp_imports) + pp_content[insert_pos:]

    # Build projectCaseStudies entries
    new_pp_entries = []
    for pd in projects_data:
        slug = pd["slug"]
        d = pd["data"]
        camel = slug_to_camel(slug)
        c_en = d["content"]["en"]
        systems = d.get("systems", [])
        filters = detect_filters(systems)
        filters_ts = ", ".join(f"'{f}'" for f in filters)

        entry = f"""  {{
    projectName: {ts_str(c_en['title'])},
    slug: {ts_str(slug)},
    filters: [{filters_ts}],
    location: {ts_str(c_en.get('location', ''))},
    category: {ts_str(c_en.get('category', ''))},
    projectType: {ts_str(c_en.get('project_type', ''))},
    systemType: {ts_str(c_en.get('system_label', ''))},
    area: {ts_str(c_en.get('area_label', ''))},
    challenge: {ts_str(c_en.get('challenge', ''))},
    engineeringDecision: {ts_str(c_en.get('engineering_decision', ''))},
    measuredResult: {ts_str(c_en.get('measured_result', ''))},
    riskPrevented: {ts_array(c_en.get('risk_prevented', [])[:3])},
    image: {camel}Card
  }}"""
        new_pp_entries.append(entry)

    # Insert before "];\n\nconst rfqHref"
    marker = "];\n\nconst rfqHref"
    if marker in pp_content:
        parts = pp_content.split(marker, 1)
        entries_block = ",\n".join(new_pp_entries)
        pp_content = parts[0].rstrip() + ",\n" + entries_block + "\n" + marker + parts[1]

    # Build fa localization entries
    new_fa_entries = []
    for pd in projects_data:
        slug = pd["slug"]
        c_fa = pd["data"]["content"]["fa"]

        entry = f"""    {ts_str(slug)}: {{
      projectName: {ts_str(c_fa['title'])},
      location: {ts_str(c_fa.get('location', ''))},
      category: {ts_str(c_fa.get('category', ''))},
      projectType: {ts_str(c_fa.get('project_type', ''))},
      systemType: {ts_str(c_fa.get('system_label', ''))},
      area: {ts_str(c_fa.get('area_label', ''))},
      challenge: {ts_str(c_fa.get('challenge', ''))},
      engineeringDecision: {ts_str(c_fa.get('engineering_decision', ''))},
      measuredResult: {ts_str(c_fa.get('measured_result', ''))},
      riskPrevented: {ts_array(c_fa.get('risk_prevented', [])[:3])}
    }}"""
        new_fa_entries.append(entry)

    # Insert before the closing of fa object in localizedProjectCaseStudies
    marker2 = "  }\n};\n\nfunction getProjectCaseStudy"
    if marker2 in pp_content:
        parts = pp_content.split(marker2, 1)
        fa_block = ",\n".join(new_fa_entries)
        pp_content = parts[0].rstrip() + ",\n" + fa_block + "\n  }\n};\n\nfunction getProjectCaseStudy" + parts[1]

    PROJECTS_PAGE.write_text(pp_content)
    print("  Updated projects/page.tsx")

    # ── STEP 7: Generate report ──
    generate_report(imported, skipped, missing_images, generated_images)


def generate_report(imported, skipped, missing_images, generated_images):
    imported_list = "\n".join(f"- `{s}`" for s in imported) if imported else "None"
    skipped_list = "\n".join(f"- `{s}`" for s in skipped) if skipped else "None"
    missing_list = "\n".join(f"- `{s}`" for s in missing_images) if missing_images else "None"

    img_table = ""
    for s in imported:
        img_table += f"| `{s}` | `{s}-card.webp`, `{s}-hero-desktop.webp`, `{s}-hero-mobile.webp`, `{s}-gallery-large.webp` |\n"

    report = f"""# Project Import Report

**Date:** {date.today().isoformat()}
**Projects processed:** {len(imported) + len(skipped)}
**Imported:** {len(imported)}
**Skipped:** {len(skipped)}

---

## Imported Projects

{imported_list}

## Generated Images

| Project | Files |
|---|---|
{img_table}
## Modified Files

| File | Changes |
|---|---|
| `lib/case-studies/case-study-pages.ts` | +{len(imported)} image imports, +{len(imported)} initialCaseStudies entries |
| `app/[locale]/projects/page.tsx` | +{len(imported)} card imports, +{len(imported)} projectCaseStudies entries, +{len(imported)} fa localizations |

## Skipped (Duplicates / Missing Data)

{skipped_list}

## Missing Images

{missing_list}

## Image Dimensions

| Variant | Width | Height |
|---|---|---|
| card | 800 | 600 |
| hero-desktop | 1600 | 900 |
| hero-mobile | 900 | 1400 |
| gallery-large | 2400 | 1600 |

## Output Locations

- Images: `assets/projects/{{slug}}/photos/`
- Originals: `assets/projects/{{slug}}/source/`
- Case study data: `lib/case-studies/case-study-pages.ts`
- Projects page: `app/[locale]/projects/page.tsx`
"""

    REPORT.write_text(report)
    print(f"\nReport: {REPORT}")


if __name__ == "__main__":
    main()
