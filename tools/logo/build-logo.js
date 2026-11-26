// Rebuilds the "invasion / del amor" logo as pure SVG paths using Comfortaa.
// Each glyph is fitted into the box it occupies in the 150px original (measured at 4x => 600px space),
// with a uniform outline stroke per line to reach the original stem weight.
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

// Comfortaa 400/700 TTF (Google Fonts, OFL). Set FONTS_DIR or place them in ./fonts
const FONTS = process.env.FONTS_DIR || path.join(__dirname, 'fonts');
const bold = opentype.loadSync(path.join(FONTS, 'Comfortaa-700.ttf'));
const reg = opentype.loadSync(path.join(FONTS, 'Comfortaa-400.ttf'));
const OUT = process.argv[2];
const opts = JSON.parse(process.argv[3] || '{}');

// [char, x0, x1, y0, y1] measured boxes
const line1 = [['i',67,83,251,305],['n',95,152,249,305],['v',158,217,251,307],['a',222,280,249,307],
               ['s',292,338,249,307],['i',351,366,251,305],['o',377,436,248,306],['n',448,504,249,305]];
const line2 = [['d',250,280,320,363],['e',288,316,332,363],['l',324,330,320,362],['a',355,386,332,363],
               ['m',393,443,332,362],['o',450,480,332,363],['r',487,503,332,362]];

const bbox = (font, ch) => font.charToGlyph(ch).getPath(0, 0, 1000).getBoundingBox();
const bw = (font, ch) => { const b = bbox(font, ch); return b.x2 - b.x1; };

// stroke width so that a reference glyph fitted to width W ends with stem = STEM
function solveStroke(font, refCh, W, STEM) {
  const fst = bw(font, 'l');           // stem width (units at size 1000)
  const gw = bw(font, refCh);
  // stem = fst*sx + sw ; sx = (W - sw)/gw  => sw = (STEM - fst*W/gw) / (1 - fst/gw)
  return (STEM - fst * W / gw) / (1 - fst / gw);
}

function fit(font, ch, x0, x1, y0, y1, sw) {
  const g = font.charToGlyph(ch);
  const p = g.getPath(0, 0, 1000);
  const b = p.getBoundingBox();
  const sx = ((x1 - x0 + 1) - sw) / (b.x2 - b.x1);
  const sy = ((y1 - y0 + 1) - sw) / (b.y2 - b.y1);
  const tx = (x) => (x0 + sw / 2 + (x - b.x1) * sx).toFixed(2);
  const ty = (y) => (y0 + sw / 2 + (y - b.y1) * sy).toFixed(2);
  return p.commands.map(c => {
    switch (c.type) {
      case 'M': return `M${tx(c.x)} ${ty(c.y)}`;
      case 'L': return `L${tx(c.x)} ${ty(c.y)}`;
      case 'Q': return `Q${tx(c.x1)} ${ty(c.y1)} ${tx(c.x)} ${ty(c.y)}`;
      case 'C': return `C${tx(c.x1)} ${ty(c.y1)} ${tx(c.x2)} ${ty(c.y2)} ${tx(c.x)} ${ty(c.y)}`;
      case 'Z': return 'Z';
    }
  }).join('');
}

function heartO(x0, x1, y0, y1) {
  const d = x1 - x0 + 1, h = y1 - y0 + 1;
  const rx = d / 2, ry = h / 2, cx = x0 + rx, cy = y0 + ry;
  const hw = d * (opts.heartW ?? 0.44), hh = h * (opts.heartH ?? 0.40);
  const hx = cx, hy = cy + h * (opts.heartDy ?? 0.0);
  const f = (n) => n.toFixed(2);
  // Classic heart in a unit box (two round lobes on top, point at the bottom)
  const bx = hx - hw / 2, by = hy - hh / 2;
  const P = (u, v) => `${f(bx + u * hw)} ${f(by + v * hh)}`;
  // Rounder heart: full circular lobes, soft bottom tip
  const heart = `M${P(.5, 1)}`
    + `C${P(.42, .97)} ${P(.02, .72)} ${P(0, .38)}`
    + `C${P(-.02, .12)} ${P(.14, -.02)} ${P(.28, 0)}`
    + `C${P(.39, .01)} ${P(.47, .08)} ${P(.5, .18)}`
    + `C${P(.53, .08)} ${P(.61, .01)} ${P(.72, 0)}`
    + `C${P(.86, -.02)} ${P(1.02, .12)} ${P(1, .38)}`
    + `C${P(.98, .72)} ${P(.58, .97)} ${P(.5, 1)}Z`;
  const disc = `M${f(cx - rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 0 ${f(cx + rx)} ${f(cy)}A${f(rx)} ${f(ry)} 0 1 0 ${f(cx - rx)} ${f(cy)}Z`;
  return `<path fill-rule="evenodd" d="${disc}${heart}"/>`;
}

const SW1 = Math.max(0, opts.sw1 ?? solveStroke(bold, 'n', 58, opts.stem1 ?? 16.5));
const font2 = (opts.font2 === 'reg') ? reg : bold;
const SW2 = Math.max(0, opts.sw2 ?? solveStroke(font2, 'o', 31, opts.stem2 ?? 7));

// In the original the "i" is a solid rounded bar (no separate dot)
const bar = (x0, x1, y0, y1) => {
  const w = x1 - x0 + 1, h = y1 - y0 + 1, r = w / 2;
  return `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="${r}" ry="${r}"/>`;
};
// Geometric letters drawn as centerline strokes (the original's n, v and s differ from Comfortaa)
const STEM = opts.stem1 ?? 16.5;
const f2 = (n) => n.toFixed(2);
function drawn(ch, x0, x1, y0, y1) {
  const h = STEM / 2;
  const L = x0 + h, R = x1 + 1 - h, T = y0 + h, B = y1 + 1 - h;
  if (ch === 'n') {
    const r = (R - L) / 2, cy = T + r;
    return `M${f2(L)} ${f2(B)}V${f2(cy)}A${f2(r)} ${f2(r)} 0 0 1 ${f2(R)} ${f2(cy)}V${f2(B)}`;
  }
  if (ch === 'v') {
    const cx = (L + R) / 2;
    return `M${f2(L)} ${f2(T)}L${f2(cx)} ${f2(B)}L${f2(R)} ${f2(T)}`;
  }
  if (ch === 's') {
    const mid = (T + B) / 2, r = (mid - T) / 2;
    return `M${f2(R)} ${f2(T)}H${f2(L + r)}A${f2(r)} ${f2(r)} 0 0 0 ${f2(L + r)} ${f2(mid)}`
      + `H${f2(R - r)}A${f2(r)} ${f2(r)} 0 0 1 ${f2(R - r)} ${f2(B)}H${f2(L)}`;
  }
}
const DRAWN = new Set(['n', 'v', 's']);
const strokes = line1.filter(([ch]) => DRAWN.has(ch)).map(([ch, ...b]) => drawn(ch, ...b)).join('');
const l1 = line1.filter(([ch]) => ch !== 'o' && ch !== 'i' && !DRAWN.has(ch)).map(([ch, ...b]) => fit(bold, ch, ...b, SW1)).join('');
const bars = line1.filter(([ch]) => ch === 'i').map(([, ...b]) => bar(...b)).join('');
const oEl = heartO(...line1[6].slice(1));
const l2 = line2.map(([ch, ...b]) => fit(font2, ch, ...b, SW2)).join('');

const minX = 64, minY = 245, w = 444, h = 122;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${w} ${h}" width="${w * 2}" height="${h * 2}" fill="#FFFFFF">`
  + `<title>Invasión del Amor</title>`
  + `<path d="${l1}" stroke="#FFFFFF" stroke-width="${SW1.toFixed(2)}" stroke-linejoin="round"/>`
  + `<path d="${strokes}" fill="none" stroke="#FFFFFF" stroke-width="${STEM}" stroke-linecap="round" stroke-linejoin="round"/>`
  + bars + oEl
  + `<path d="${l2}" stroke="#FFFFFF" stroke-width="${SW2.toFixed(2)}" stroke-linejoin="round"/>`
  + `</svg>`;
fs.writeFileSync(OUT, svg);
console.log({ SW1: SW1.toFixed(2), SW2: SW2.toFixed(2), font2: font2 === reg ? 'reg' : 'bold', bytes: svg.length });
