#!/usr/bin/env python3
"""Generate favicon PNG multi-size + apple-touch-icon + favicon.ico aligned on Le Carnet brand."""
import os
from PIL import Image, ImageDraw, ImageFont

PUB = os.path.join(os.path.dirname(__file__), "..", "site", "public")

FOREST = (26, 61, 46)
FOREST_DARK = (15, 36, 25)
GOLD = (244, 196, 48)
GOLD_LIGHT = (253, 230, 138)
CREAM = (250, 247, 242)

def safe_font(size):
    for path in [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "/Library/Fonts/Georgia.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
    ]:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()

def draw_icon(size, maskable=False):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    padding = int(size * 0.10) if maskable else 0
    outer = size - padding * 2
    cx = size / 2
    cy = size / 2
    r_outer = outer / 2
    r_inner = r_outer * 0.52
    draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer), fill=FOREST)
    draw.ellipse(
        (cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner),
        fill=GOLD,
        outline=FOREST,
        width=max(1, int(size * 0.02)),
    )
    font_size = int(r_inner * 1.3)
    font = safe_font(font_size)
    bbox = draw.textbbox((0, 0), "€", font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(
        (cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1] - int(size * 0.02)),
        "€",
        fill=FOREST_DARK,
        font=font,
    )
    return img

os.makedirs(PUB, exist_ok=True)

sizes = [16, 32, 48, 96, 192, 512]
for s in sizes:
    img = draw_icon(s)
    path = os.path.join(PUB, f"favicon-{s}.png")
    img.save(path, "PNG", optimize=True)
    print(f"OK favicon-{s}.png ({os.path.getsize(path)//1024}KB)")

apple = draw_icon(180)
apple_bg = Image.new("RGBA", (180, 180), CREAM + (255,))
apple_bg.paste(apple, (0, 0), apple)
apple_bg.save(os.path.join(PUB, "apple-touch-icon.png"), "PNG", optimize=True)
print(f"OK apple-touch-icon.png ({os.path.getsize(os.path.join(PUB, 'apple-touch-icon.png'))//1024}KB)")

maskable = draw_icon(512, maskable=True)
maskable_bg = Image.new("RGBA", (512, 512), CREAM + (255,))
maskable_bg.paste(maskable, (0, 0), maskable)
maskable_bg.save(os.path.join(PUB, "maskable-icon-512.png"), "PNG", optimize=True)
print(f"OK maskable-icon-512.png")

ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_imgs = [draw_icon(s[0]) for s in ico_sizes]
ico_path = os.path.join(PUB, "favicon.ico")
ico_imgs[0].save(ico_path, format="ICO", sizes=ico_sizes, append_images=ico_imgs[1:])
print(f"OK favicon.ico multi-res")

tile144 = Image.new("RGBA", (144, 144), FOREST + (255,))
tile_icon = draw_icon(120)
tile144.paste(tile_icon, (12, 12), tile_icon)
tile144.save(os.path.join(PUB, "mstile-144x144.png"), "PNG", optimize=True)
print(f"OK mstile-144x144.png")

print("\nAll icons generated.")
