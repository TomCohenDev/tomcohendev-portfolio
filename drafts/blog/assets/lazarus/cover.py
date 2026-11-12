"""Rebuild the Lazarus article cover: a quiet neuron lattice where seven neurons chain into a terminal."""
import random
from pathlib import Path

OUT = Path(__file__).resolve().parents[4]/'public/blog/lazarus-cover.svg'
W, H = 1600, 840
rng = random.Random(7)
cols, rows, x0, y0, step = 30, 15, 120, 120, 40
lit = [(4, 11), (8, 3), (12, 9), (15, 5), (19, 12), (22, 6), (25, 9)]

parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
         '<defs><pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#e0d0c1" stroke-opacity=".05"/></pattern>'
         '<radialGradient id="glow"><stop stop-color="#bf95f9" stop-opacity=".16"/><stop offset="1" stop-color="#1d201f" stop-opacity="0"/></radialGradient>'
         '<radialGradient id="hot"><stop stop-color="#f49ac1" stop-opacity=".55"/><stop offset="1" stop-color="#f49ac1" stop-opacity="0"/></radialGradient>'
         '<filter id="soft"><feGaussianBlur stdDeviation="2.4"/></filter></defs>',
         f'<rect width="{W}" height="{H}" fill="#1d201f"/><rect width="{W}" height="{H}" fill="url(#grid)"/>',
         '<ellipse cx="720" cy="420" rx="760" ry="420" fill="url(#glow)"/>']

# Faint connections between neighbouring neurons, then the neurons themselves.
for c in range(cols-1):
    for r in range(rows):
        if rng.random() < .22:
            r2 = min(rows-1, max(0, r+rng.choice((-1, 0, 1))))
            parts.append(f'<path d="M{x0+c*step} {y0+r*step}L{x0+(c+1)*step} {y0+r2*step}" stroke="#bf95f9" stroke-opacity=".12" stroke-width="1.2"/>')
for c in range(cols):
    for r in range(rows):
        if (c, r) in lit:
            continue
        o = .18 + rng.random()*.35
        parts.append(f'<circle cx="{x0+c*step}" cy="{y0+r*step}" r="{4+rng.random()*2.5:.1f}" fill="#bf95f9" fill-opacity="{o:.2f}"/>')

# The chain: seven lit neurons joined by one pink path that runs into the terminal.
points = [(x0+c*step, y0+r*step) for c, r in lit]
term_x, term_y = 1330, 420
d = f'M{points[0][0]} {points[0][1]}' + ''.join(f'L{x} {y}' for x, y in points[1:]) + f'L{term_x-10} {term_y}'
parts.append(f'<path d="{d}" fill="none" stroke="#f49ac1" stroke-width="7" stroke-opacity=".35" filter="url(#soft)"/>')
parts.append(f'<path d="{d}" fill="none" stroke="#f49ac1" stroke-width="2.6" stroke-linejoin="round" stroke-dasharray="2 9" stroke-linecap="round"/>')
for i, (x, y) in enumerate(points):
    color = '#f2c46d' if i == 0 else '#f49ac1'
    parts.append(f'<circle cx="{x}" cy="{y}" r="34" fill="url(#hot)"/><circle cx="{x}" cy="{y}" r="11" fill="{color}"/><circle cx="{x}" cy="{y}" r="17" fill="none" stroke="{color}" stroke-opacity=".6" stroke-width="2"/>')

# Terminal window with a prompt glyph and an empty command line.
parts.append(f'<g transform="translate({term_x-10} {term_y-120})">'
             '<rect width="250" height="240" rx="22" fill="#222524" stroke="#f49ac1" stroke-width="2.4"/>'
             '<path d="M0 52H250" stroke="#454845" stroke-width="2"/>'
             '<circle cx="30" cy="26" r="7" fill="#f49ac1"/><circle cx="54" cy="26" r="7" fill="#f2c46d"/><circle cx="78" cy="26" r="7" fill="#43b581"/>'
             '<path d="M34 108L62 130L34 152" fill="none" stroke="#e0d0c1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
             '<path d="M78 156H130" stroke="#f49ac1" stroke-width="6" stroke-linecap="round"/>'
             '<path d="M34 196H200" stroke="#e0d0c1" stroke-opacity=".18" stroke-width="5" stroke-linecap="round"/></g>')
parts.append('</svg>')
OUT.write_text(''.join(parts))
print(f'Wrote {OUT}')
