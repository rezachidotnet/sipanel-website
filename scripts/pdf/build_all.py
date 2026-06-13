# -*- coding: utf-8 -*-
"""Generate all 24 SIPANEL technical PDFs (6 documents x 4 languages)."""
import os, importlib
import engine as E

import doc1_roof_leakage as d1
import doc2_panel_selection as d2
import doc3_shop_drawing as d3
import doc4_standing_seam as d4
import doc5_cladding as d5
import doc6_mto as d6

OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "public", "downloads"))
LANGS = ["en", "fa", "ar", "ru"]

DOCS = [
    ("roof-leakage-prevention-checklist", d1.DATA),
    ("sandwich-panel-selection-guide",    d2.DATA),
    ("shop-drawing-review-guide",         d3.DATA),
    ("standing-seam-roof-detail-notes",   d4.DATA),
    ("aluminium-cladding-layout-checklist", d5.DATA),
    ("mto-procurement-planning-sheet",    d6.DATA),
]


def main():
    rows = []
    for lang in LANGS:
        os.makedirs(os.path.join(OUT, lang), exist_ok=True)
    for slug, data in DOCS:
        for lang in LANGS:
            d = data[lang]
            path = os.path.join(OUT, lang, slug + ".pdf")
            E.build_pdf(path, lang, d["title"], d["subtitle"], d["tag"], d["pages"])
            size = os.path.getsize(path)
            rows.append((lang, slug, len(d["pages"]) + 1, size))
    # report
    print("%-4s %-42s %5s %9s" % ("lang", "file", "pages", "bytes"))
    for lang, slug, pages, size in rows:
        print("%-4s %-42s %5d %9d" % (lang, slug + ".pdf", pages, size))
    print("TOTAL FILES:", len(rows))


if __name__ == "__main__":
    main()
