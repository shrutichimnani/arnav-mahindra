"""Prepare the supplied Veero screenshot for use as a transparent product cutout.

The supplied image is a browser screenshot, so this crops the gallery image,
keeps the truck silhouette, removes the scene around it, and paints the
registration plate as a clean, character-free plate.
"""

import sys
from pathlib import Path
from PIL import Image, ImageDraw


source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    r"C:\Users\SHRUTI~1\AppData\Local\Temp\codex-clipboard-e56d98fd-8911-4f38-bdca-fbb112d348ed.png"
)
output = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("public/cars/requested/veero-removebg-preview.png")

# Gallery image bounds within the 1920 x 1128 browser screenshot.
image = Image.open(source).convert("RGBA").crop((430, 315, 1460, 885))
width, height = image.size

# A tight hand-traced outer silhouette of the vehicle in the cropped image.
silhouette = [
    (56, 388), (62, 350), (72, 334), (82, 270), (97, 246),
    (110, 194), (137, 184), (158, 119), (170, 65), (210, 34),
    (318, 19), (422, 17), (521, 22), (557, 42), (580, 72),
    (596, 197), (592, 225), (609, 229), (972, 228), (986, 245),
    (984, 351), (970, 372), (944, 379), (923, 378),
    (919, 432), (901, 471), (873, 490), (838, 493), (806, 477),
    (786, 450), (776, 416), (760, 411), (642, 411),
    (620, 455), (597, 486), (564, 505), (531, 506),
    (497, 490), (479, 465), (466, 434), (445, 416),
    (420, 412), (399, 439), (374, 464), (343, 475), (303, 472),
    (270, 451), (249, 425), (233, 410), (192, 410),
    (176, 424), (145, 424), (110, 413), (79, 409),
]

mask = Image.new("L", (width, height), 0)
draw = ImageDraw.Draw(mask)
draw.polygon(silhouette, fill=255)

# Remove the large background gap below the cargo box, while preserving the
# visible rear wheel, front wheel, axle and central chassis components.
draw.rectangle((603, 349, 776, 420), fill=0)
draw.rectangle((918, 350, 985, 423), fill=0)
draw.ellipse((792, 330, 927, 498), fill=255)
draw.polygon(
    [(583, 358), (633, 354), (680, 369), (733, 365), (781, 378),
     (773, 412), (724, 410), (684, 401), (638, 411), (592, 409)],
    fill=255,
)
draw.polygon(
    [(560, 398), (607, 390), (641, 403), (631, 443), (603, 461),
     (576, 449)],
    fill=255,
)
draw.ellipse((388, 332, 535, 535), fill=255)

# Blank the plate while preserving its yellow plate shape. The source text is
# fully covered; no letters or numbers remain in the exported asset.
plate = Image.new("RGBA", (width, height), (0, 0, 0, 0))
plate_draw = ImageDraw.Draw(plate)
plate_draw.polygon(
    [(103, 376), (191, 375), (191, 403), (106, 410)],
    fill=(186, 137, 22, 255),
)
plate_draw.line(
    [(103, 376), (191, 375), (191, 403), (106, 410), (103, 376)],
    fill=(104, 78, 15, 255),
    width=2,
)
image = Image.alpha_composite(image, plate)
image.putalpha(mask)

# Trim transparent margins for a compact product asset, retaining a small
# breathing room so the website card does not clip the bumper or tyres.
bbox = mask.getbbox()
if bbox:
    left, top, right, bottom = bbox
    pad = 10
    image = image.crop(
        (max(0, left - pad), max(0, top - pad), min(width, right + pad), min(height, bottom + pad))
    )

output.parent.mkdir(parents=True, exist_ok=True)
image.save(output, "PNG", optimize=True)
print(f"saved {output} ({image.width}x{image.height})")
