# SIPANEL Army Hospital Project Detail Alignment Audit - 2026-07-30

## Scope

Reference page: `/projects/army-hospital`

Priority pages audited:

- `/projects/mehrabad-aircraft-hangar`
- `/projects/mahshahr-taxi-parking`
- `/projects/ahvaz-airport-passenger-terminal`
- `/projects/kermanshah-industrial-university-petroleum-faculty`

All findings apply to Persian, English, Arabic, and Russian route variants unless a locale is named explicitly.

## Reference Section Order

Army Hospital renders this section order:

1. `case_study_hero`
2. `case_study_group`
3. `project_snapshot`
4. `challenge_section`
5. `engineering_decision_section`
6. `execution_detail_section`
7. `measured_result_section`
8. `risk_prevented_section`
9. `related_case_studies`
10. `conversion_cta`

## Target Section Order Before Edits

The four target pages rendered this section order:

1. `case_study_hero`
2. `project_snapshot`
3. `challenge_section`
4. `engineering_decision_section`
5. `execution_detail_section`
6. `technical_proof_gallery`
7. `measured_result_section`
8. `risk_prevented_section`
9. `related_services`
10. `related_case_studies`
11. `conversion_cta`

## Comparison Inventory

| Project | Difference | Classification | Current behavior | Expected behavior | Proposed correction |
|---|---|---|---|---|---|
| Mehrabad Aircraft Hangar | Missing `case_study_group`; extra gallery and service sections | visual inconsistency | Uses full project-detail mode rather than Army-style case-study mode | Use the same Army section contract unless verified project evidence justifies optional sections | Set `detailLayout: 'case-study-only'` |
| Mahshahr Taxi Parking | Missing `case_study_group`; extra gallery and service sections | visual inconsistency | Uses full project-detail mode while Army uses compact case-study mode | Same section order and visual rhythm as Army | Set `detailLayout: 'case-study-only'` |
| Ahvaz Airport Passenger Terminal | Missing `case_study_group`; extra gallery and service sections | visual inconsistency | Uses full project-detail mode and renders pending proof/service sections | Same section order and visual rhythm as Army | Set `detailLayout: 'case-study-only'` |
| Kermanshah Industrial University Petroleum Faculty | Missing `case_study_group`; extra gallery and service sections | visual inconsistency | Uses full project-detail mode and renders pending proof/service sections | Same section order and visual rhythm as Army | Set `detailLayout: 'case-study-only'` |
| Image-based target pages | Hero image container lacks image-specific positioning/cropping class | responsive defect | Image hero can depend on generic visual wrapper rather than explicit image media treatment | Stable image crop, border, radius, and aspect behavior comparable to Army media quality | Add image-mode class and CSS object-fit rules |
| All Army-style case-study pages | Related case cards lose links in `case-study-only` mode | reusable-component defect | Related cards can render as static content despite having localized destinations | Related project cards should remain crawlable and locale-aware | Render localized related-project links whenever `href` exists |
| Ahvaz Airport Passenger Terminal | Non-English narrative fields rely on generated defaults for several rendered fields | translation/content weakness | Visible text is localized but generic in some sections | Complete project-specific localized challenge, decision, execution, result, risk, and CTA text | Add full locale overrides |
| Kermanshah Industrial University Petroleum Faculty | Non-English narrative fields rely on generated defaults for several rendered fields | translation/content weakness | Visible text is localized but generic in some sections | Complete project-specific localized challenge, decision, execution, result, risk, and CTA text | Add full locale overrides |
| Mehrabad Aircraft Hangar | Non-English narrative fields rely on generated defaults for several rendered fields | translation/content weakness | Visible text is localized but generic in some sections | Complete project-specific localized challenge, decision, execution, result, risk, and CTA text | Add full locale overrides |
| Mahshahr Taxi Parking | Content already has full localized overrides | intended project-specific difference | More complete source content than other targets | Preserve facts and align layout only | Keep content, set Army-style layout |

## Unsupported Evidence Not Added

The audit found no repository evidence for exact completion dates, project cost, contract value, client names, consultant names, wind speeds, thermal values, fire ratings, acoustic values, tested performance values, percentage savings, awards, or exact material quantities beyond the existing area/scope records. Those claims must remain omitted.
