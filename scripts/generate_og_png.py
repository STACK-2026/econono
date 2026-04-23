#!/usr/bin/env python3
"""Generate site/public/og-default.png (1200x630) aligned on Le Carnet brand."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), "..", "site", "public", "og-default.png")

BG_TOP = (250, 247, 242)
BG_BOT = (244, 236, 216)
FOREST = (26, 61, 46)
FOREST_DARK = (15, 36, 25)
GOLD = (244, 196, 48)
GOLD_LIGHT = (253, 230, 138)
STONE = (87, 83, 78)
CREAM_ACCENT = (26, 61, 46, 15)

def vertical_gradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", size, top)
    top_r, top_g, top_b = top
    bot_r, bot_g, bot_b = bottom
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top_r + (bot_r - top_r) * t)
        g = int(top_g + (bot_g - top_g) * t)
        b = int(top_b + (bot_b - top_b) * t)
        for x in range(w):
            base.putpixel((x, y), (r, g, b))
    return base

def safe_font(candidates, size):
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()

serif_large = safe_font([
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/Library/Fonts/Georgia.ttf",
    "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
], 118)
serif_mid = safe_font([
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/Library/Fonts/Georgia.ttf",
], 64)
body_font = safe_font([
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
], 28)
mono_font = safe_font([
    "/System/Library/Fonts/Menlo.ttc",
    "/Library/Fonts/Courier New.ttf",
], 22)

img = vertical_gradient((W, H), BG_TOP, BG_BOT)

texture = Image.new("RGBA", (W, H), (0, 0, 0, 0))
tex_draw = ImageDraw.Draw(texture)
for y in range(40, H - 40, 40):
    tex_draw.line([(80, y), (W - 80, y)], fill=(244, 196, 48, 10), width=1)
img = Image.alpha_composite(img.convert("RGBA"), texture).convert("RGB")

draw = ImageDraw.Draw(img)

logo_cx, logo_cy, logo_r = 160, 250, 62
draw.ellipse((logo_cx - logo_r, logo_cy - logo_r, logo_cx + logo_r, logo_cy + logo_r), fill=FOREST)
draw.ellipse((logo_cx - 32, logo_cy - 32, logo_cx + 32, logo_cy + 32), fill=GOLD, outline=FOREST, width=3)
euro_font = safe_font(["/System/Library/Fonts/Supplemental/Georgia Bold.ttf"], 40)
bbox = draw.textbbox((0, 0), "€", font=euro_font)
tw = bbox[2] - bbox[0]; th = bbox[3] - bbox[1]
draw.text((logo_cx - tw / 2 - bbox[0], logo_cy - th / 2 - bbox[1]), "€", fill=FOREST, font=euro_font)

draw.text((245, 205), "Econono", fill=FOREST, font=serif_large)

draw.line([(80, 380), (250, 380)], fill=GOLD, width=4)

draw.text((80, 420), "Dépense moins, vis mieux.", fill=FOREST_DARK, font=serif_mid)

draw.text((80, 510), "Calculateurs gratuits · guides honnêtes · actu pouvoir d'achat.",
          fill=STONE, font=body_font)
draw.text((80, 550), "Indépendant des banques. 100% gratuit, 0 inscription.",
          fill=STONE, font=body_font)

draw.text((80, 598), "econono.com", fill=FOREST, font=mono_font)

draw.rectangle((0, 620, W, H), fill=GOLD)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"OK · {OUT} · {os.path.getsize(OUT)//1024} KB")
