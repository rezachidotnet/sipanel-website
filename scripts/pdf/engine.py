# -*- coding: utf-8 -*-
"""SIPANEL technical PDF engine.

Renders branded A4 PDFs in 4 languages (en, ru = LTR; fa, ar = RTL).
Content is supplied as language-keyed "blocks"; this module turns blocks
into reportlab flowables, applies the SIPANEL brand chrome (cover, header,
footer), and handles Arabic/Persian shaping + bidi + column mirroring.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepInFrame,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

import arabic_reshaper
from bidi.algorithm import get_display

# ---------------------------------------------------------------- brand
BRAND = {
    "orange": HexColor("#FF6A00"),
    "dark": HexColor("#1a1a1a"),
    "mid": HexColor("#2d2d2d"),
    "body": HexColor("#333333"),
    "light_bg": HexColor("#f5f5f5"),
    "border": HexColor("#dddddd"),
    "white": white,
    "tagline": "ENGINEERING POWER. CONTROLLED EXECUTION.",
    "website": "sipanelco.ir",
    "email": "info@sipanelco.ir",
    "phone": "+98 313 675 1101",
}

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm

# ---------------------------------------------------------------- fonts
_HERE = os.path.dirname(os.path.abspath(__file__))
_VAZIR = os.path.join(_HERE, "fonts", "Vazirmatn-Regular.ttf")
_VAZIR_B = os.path.join(_HERE, "fonts", "Vazirmatn-Bold.ttf")
_DEJA = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
_DEJA_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

# Vazirmatn (fa/ar): Arabic + Persian + Latin + punctuation + basic math.
# DejaVu (en/ru): full Latin/Cyrillic + Greek + superscripts (needed by formulas).
pdfmetrics.registerFont(TTFont("Vazir", _VAZIR))
pdfmetrics.registerFont(TTFont("Vazir-Bold", _VAZIR_B))
pdfmetrics.registerFont(TTFont("Deja", _DEJA))
pdfmetrics.registerFont(TTFont("Deja-Bold", _DEJA_B))

RTL_LANGS = {"fa", "ar"}

# Glyphs absent from Vazirmatn (Greek + superscripts), used only in the
# thermal-movement formula. Substituted to ASCII for fa/ar.
_SUB = {"Δ": "d", "α": "a", "β": "b", "≥": ">=", "≤": "<=",
        "⁻": "^-", "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
        "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"}


def fonts_for(lang):
    """Return (regular, bold) font names for a language."""
    if lang in RTL_LANGS:
        return "Vazir", "Vazir-Bold"
    return "Deja", "Deja-Bold"


# ------------------------------------------------------------ shaping
def shape(text, lang):
    """Reshape + bidi for RTL languages; pass through otherwise."""
    if lang in RTL_LANGS and text:
        s = str(text)
        for k, v in _SUB.items():
            if k in s:
                s = s.replace(k, v)
        return get_display(arabic_reshaper.reshape(s))
    return str(text)


_FA_DIGITS = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")


def localize_num(n, lang):
    s = str(n)
    if lang == "fa":
        return s.translate(_FA_DIGITS)
    return s


# ------------------------------------------------------------ styles
def make_styles(lang):
    reg, bold = fonts_for(lang)
    align = TA_RIGHT if lang in RTL_LANGS else TA_LEFT
    return {
        "section": ParagraphStyle(
            "section", fontName=bold, fontSize=13, textColor=BRAND["orange"],
            leading=17, spaceBefore=4, spaceAfter=6, alignment=align),
        "sub": ParagraphStyle(
            "sub", fontName=bold, fontSize=11, textColor=BRAND["dark"],
            leading=15, spaceBefore=6, spaceAfter=3, alignment=align),
        "body": ParagraphStyle(
            "body", fontName=reg, fontSize=10, textColor=BRAND["body"],
            leading=14, spaceAfter=6, alignment=align),
        "cell": ParagraphStyle(
            "cell", fontName=reg, fontSize=8.5, textColor=BRAND["body"],
            leading=11, alignment=align),
        "cellc": ParagraphStyle(
            "cellc", fontName=reg, fontSize=8.5, textColor=BRAND["body"],
            leading=11, alignment=TA_CENTER),
        "th": ParagraphStyle(
            "th", fontName=bold, fontSize=9, textColor=white,
            leading=12, alignment=TA_CENTER),
        # dense variants for wide (>7 column) tables
        "cell_d": ParagraphStyle(
            "cell_d", fontName=reg, fontSize=7, textColor=BRAND["body"],
            leading=9, alignment=align),
        "cellc_d": ParagraphStyle(
            "cellc_d", fontName=reg, fontSize=7, textColor=BRAND["body"],
            leading=9, alignment=TA_CENTER),
        "th_d": ParagraphStyle(
            "th_d", fontName=bold, fontSize=7.5, textColor=white,
            leading=9, alignment=TA_CENTER),
        "lead": ParagraphStyle(
            "lead", fontName=reg, fontSize=10.5, textColor=BRAND["body"],
            leading=15, spaceAfter=6, alignment=align),
    }


# ----------------------------------------------------- fixed labels
LABELS = {
    "item":    {"en": "Item", "fa": "ردیف", "ar": "البند", "ru": "Пункт"},
    "pass":    {"en": "Pass ✓", "fa": "قبول ✓", "ar": "مقبول ✓", "ru": "Принято ✓"},
    "fail":    {"en": "Fail ✗", "fa": "رد ✗", "ar": "مرفوض ✗", "ru": "Отклонено ✗"},
    "notes":   {"en": "Notes", "fa": "یادداشت", "ar": "ملاحظات", "ru": "Примечания"},
    "status":  {"en": "Status", "fa": "وضعیت", "ar": "الحالة", "ru": "Статус"},
    "check":   {"en": "Check", "fa": "کنترل", "ar": "التحقق", "ru": "Проверка"},
    "risk":    {"en": "Risk", "fa": "ریسک", "ar": "الخطر", "ru": "Риск"},
}


def L(key, lang):
    return LABELS[key][lang]


# ------------------------------------------------------------ blocks -> flowables
def _para(text, style, lang):
    return Paragraph(shape(text, lang).replace("\n", "<br/>"), style)


def render_block(block, lang, st):
    """Convert one content block tuple into a list of flowables."""
    kind = block[0]
    rtl = lang in RTL_LANGS

    if kind == "section":
        return [_para(block[1], st["section"], lang)]
    if kind == "sub":
        return [_para(block[1], st["sub"], lang)]
    if kind == "p":
        return [_para(block[1], st["body"], lang)]
    if kind == "lead":
        return [_para(block[1], st["lead"], lang)]
    if kind == "spacer":
        return [Spacer(1, block[1])]

    if kind in ("bullets", "numbers"):
        out = []
        items = block[1]
        for i, it in enumerate(items, 1):
            prefix = (localize_num(i, lang) + ". ") if kind == "numbers" else "• "
            if rtl:
                txt = it + " " + prefix.strip()
            else:
                txt = prefix + it
            out.append(_para(txt, st["body"], lang))
        return out

    if kind == "checktable":
        items = block[1]
        headers = [L("item", lang), L("pass", lang), L("fail", lang), L("notes", lang)]
        # column relative widths (Item wide, pass/fail narrow, notes medium)
        widths = [0.46, 0.13, 0.13, 0.28]
        rows = []
        for it in items:
            rows.append([it, "", "", ""])
        return [_check_table(headers, rows, widths, lang, st)]

    if kind == "table":
        # ("table", headers, rows, relwidths, center_cols?)
        headers = block[1]
        rows = block[2]
        widths = block[3]
        center_cols = block[4] if len(block) > 4 else set()
        return [_grid_table(headers, rows, widths, lang, st, center_cols)]

    if kind == "signoff":
        # ("signoff", [labels]) -> two-column label | blank
        labels = block[1]
        rows = [[lab, ""] for lab in labels]
        return [_grid_table([L("item", lang) if False else "", ""], rows,
                            [0.4, 0.6], lang, st, set(), header=False, tall=True)]

    raise ValueError("unknown block %r" % (kind,))


def _avail_width():
    return PAGE_W - 2 * MARGIN


def _check_table(headers, rows, widths, lang, st):
    rtl = lang in RTL_LANGS
    aw = _avail_width()
    colw = [w * aw for w in widths]
    # build paragraph cells
    head_cells = [Paragraph(shape(h, lang), st["th"]) for h in headers]
    body = [head_cells]
    for r in rows:
        item = Paragraph(shape(r[0], lang), st["cell"])
        body.append([item, "", "", ""])
    if rtl:
        colw = list(reversed(colw))
        body = [list(reversed(row)) for row in body]
    t = Table(body, colWidths=colw, repeatRows=1)
    ts = [
        ("BACKGROUND", (0, 0), (-1, 0), BRAND["orange"]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, BRAND["border"]),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, BRAND["light_bg"]]),
    ]
    t.setStyle(TableStyle(ts))
    return t


def _grid_table(headers, rows, widths, lang, st, center_cols, header=True, tall=False):
    rtl = lang in RTL_LANGS
    dense = len(widths) > 7
    th_s = st["th_d"] if dense else st["th"]
    cell_s = st["cell_d"] if dense else st["cell"]
    cellc_s = st["cellc_d"] if dense else st["cellc"]
    pad = 3 if dense else (7 if tall else 5)
    hpad = 3 if dense else 6
    aw = _avail_width()
    colw = [w * aw for w in widths]
    body = []
    if header:
        body.append([Paragraph(shape(h, lang), th_s) for h in headers])
    for r in rows:
        cells = []
        for ci, val in enumerate(r):
            stl = cellc_s if ci in center_cols else cell_s
            cells.append(Paragraph(shape(val, lang), stl) if val != "" else "")
        body.append(cells)
    if rtl:
        colw = list(reversed(colw))
        body = [list(reversed(row)) for row in body]
    t = Table(body, colWidths=colw, repeatRows=1 if header else 0)
    ts = [
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, BRAND["border"]),
        ("TOPPADDING", (0, 0), (-1, -1), pad),
        ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
        ("LEFTPADDING", (0, 0), (-1, -1), hpad),
        ("RIGHTPADDING", (0, 0), (-1, -1), hpad),
    ]
    if header:
        ts.append(("BACKGROUND", (0, 0), (-1, 0), BRAND["orange"]))
        ts.append(("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, BRAND["light_bg"]]))
    t.setStyle(TableStyle(ts))
    return t


# ------------------------------------------------------------ page chrome
class _Chrome:
    """Holds per-document meta for the canvas callbacks."""
    def __init__(self, lang, title, subtitle, tag, total_pages):
        self.lang = lang
        self.title = title
        self.subtitle = subtitle
        self.tag = tag
        self.total = total_pages


def _draw_cover(c, ch):
    lang = ch.lang
    reg, bold = fonts_for(lang)
    c.saveState()
    # full dark bg
    c.setFillColor(BRAND["dark"])
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # top orange bar
    c.setFillColor(BRAND["orange"])
    c.rect(0, PAGE_H - 45, PAGE_W, 45, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN, PAGE_H - 29, "SIPANEL   |   sipanelco.ir")
    # bottom orange bar
    c.setFillColor(BRAND["orange"])
    c.rect(0, 0, PAGE_W, 35, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(PAGE_W / 2, 13, BRAND["tagline"])

    # centred title + subtitle
    cy = PAGE_H / 2 + 40
    c.setFillColor(white)
    title_lines = _wrap(c, shape(ch.title, lang), bold, 26, PAGE_W - 2 * MARGIN)
    c.setFont(bold, 26)
    for line in title_lines:
        c.drawCentredString(PAGE_W / 2, cy, line)
        cy -= 32
    # orange rule
    cy -= 6
    c.setStrokeColor(BRAND["orange"])
    c.setLineWidth(2)
    c.line(PAGE_W / 2 - 60, cy, PAGE_W / 2 + 60, cy)
    cy -= 26
    c.setFillColor(white)
    sub_lines = _wrap(c, shape(ch.subtitle, lang), reg, 11, PAGE_W - 2 * MARGIN - 40)
    c.setFont(reg, 11)
    for line in sub_lines:
        c.drawCentredString(PAGE_W / 2, cy, line)
        cy -= 16
    cy -= 8
    c.setFillColor(BRAND["orange"])
    c.setFont(reg, 10)
    c.drawCentredString(PAGE_W / 2, cy, shape(ch.tag, lang))
    c.restoreState()


def _wrap(c, text, font, size, maxw):
    """Greedy word-wrap for canvas strings (works on already-shaped text)."""
    words = text.split(" ")
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if c.stringWidth(trial, font, size) <= maxw:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _draw_interior(c, ch, page_num):
    lang = ch.lang
    reg, bold = fonts_for(lang)
    rtl = lang in RTL_LANGS
    c.saveState()
    # header bar
    c.setFillColor(BRAND["orange"])
    c.rect(0, PAGE_H - 22, PAGE_W, 22, fill=1, stroke=0)
    c.setFillColor(white)
    # left: section/doc title ; right: SIPANEL  (mirror for RTL)
    htitle = shape(ch.title, lang)
    c.setFont(bold, 9)
    if rtl:
        c.drawRightString(PAGE_W - MARGIN, PAGE_H - 15, htitle)
        c.drawString(MARGIN, PAGE_H - 15, "SIPANEL")
    else:
        c.drawString(MARGIN, PAGE_H - 15, htitle)
        c.drawRightString(PAGE_W - MARGIN, PAGE_H - 15, "SIPANEL")
    # footer bar
    c.setFillColor(BRAND["dark"])
    c.rect(0, 0, PAGE_W, 18, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica", 8)
    foot = "© 2026 SIPANEL  |  sipanelco.ir  |  info@sipanelco.ir  |  +98 313 675 1101"
    c.drawCentredString(PAGE_W / 2, 6, foot)
    # page number (Persian numerals for fa need the Noto font, not Helvetica)
    pno = "%s / %s" % (localize_num(page_num, lang), localize_num(ch.total, lang))
    c.setFont(reg if lang == "fa" else "Helvetica", 8)
    if rtl:
        c.drawString(MARGIN, 6, pno)
    else:
        c.drawRightString(PAGE_W - MARGIN, 6, pno)
    c.restoreState()


# ------------------------------------------------------------ document build
def build_pdf(path, lang, title, subtitle, tag, pages):
    """pages: list of pages; each page is a list of content blocks."""
    st = make_styles(lang)
    total = len(pages) + 1  # + cover
    ch = _Chrome(lang, title, subtitle, tag, total)

    frame = Frame(MARGIN, 24, PAGE_W - 2 * MARGIN, PAGE_H - 22 - 24 - 6,
                  id="body", leftPadding=0, rightPadding=0,
                  topPadding=6, bottomPadding=0)

    state = {"n": 0}

    def on_page(c, doc):
        state["n"] += 1
        if state["n"] == 1:
            _draw_cover(c, ch)
        else:
            _draw_interior(c, ch, state["n"])

    doc = BaseDocTemplate(path, pagesize=A4,
                          leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=22 + 6, bottomMargin=24,
                          title=title, author="SIPANEL")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=on_page)])

    story = [PageBreak()]  # leave page 1 for the cover
    for pi, page in enumerate(pages):
        fls = []
        for block in page:
            fls.extend(render_block(block, lang, st))
        # keep a page's content together on one page where possible
        story.append(KeepInFrame(PAGE_W - 2 * MARGIN, PAGE_H - 70,
                                 fls, mode="shrink"))
        if pi != len(pages) - 1:
            story.append(PageBreak())
    doc.build(story)
    return path
