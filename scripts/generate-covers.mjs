// Generates the illustrated project cover images (SVG) in public/images/projects/.
// Covers are original artwork in the site palette — not screenshots of the products.
// Run with: npm run covers
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images", "projects");
mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 750;
const C = {
  bg: "#0B0D10",
  surface: "#12161C",
  raised: "#191F27",
  border: "#29313B",
  text: "#F3F5F7",
  muted: "#A0A9B5",
  dim: "#5B6573",
};
const SANS = "Space Grotesk, Segoe UI, Helvetica, Arial, sans-serif";
const MONO = "JetBrains Mono, Consolas, Menlo, monospace";

const t = (x, y, s, size, fill, opts = {}) =>
  `<text x="${x}" y="${y}" font-family="${opts.mono ? MONO : SANS}" font-size="${size}" font-weight="${opts.weight ?? 500}" fill="${fill}"${opts.anchor ? ` text-anchor="${opts.anchor}"` : ""}${opts.ls ? ` letter-spacing="${opts.ls}"` : ""}>${s}</text>`;
const rect = (x, y, w, h, fill, r = 10, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const line = (x, y, w, fill = C.border, h = 10) => rect(x, y, w, h, fill, h / 2);
const pill = (x, y, label, color, w) => {
  const width = w ?? label.length * 9.2 + 28;
  return `${rect(x, y, width, 30, color, 15, 'fill-opacity="0.14"')}${rect(x + 0.5, y + 0.5, width - 1, 29, "none", 14.5, `stroke="${color}" stroke-opacity="0.45"`)}${t(x + width / 2, y + 20, label, 13, color, { mono: true, anchor: "middle" })}`;
};

function frame(id, accent, label, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<defs>
  <radialGradient id="g1-${id}" cx="78%" cy="18%" r="70%"><stop offset="0" stop-color="${accent}" stop-opacity="0.28"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
  <radialGradient id="g2-${id}" cx="8%" cy="100%" r="60%"><stop offset="0" stop-color="#A7B8FF" stop-opacity="0.14"/><stop offset="1" stop-color="#A7B8FF" stop-opacity="0"/></radialGradient>
  <pattern id="grid-${id}" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#FFFFFF" stroke-opacity="0.045"/></pattern>
  <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${accent}" stop-opacity="0.35"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="${C.bg}"/>
<rect width="${W}" height="${H}" fill="url(#grid-${id})"/>
<rect width="${W}" height="${H}" fill="url(#g1-${id})"/>
<rect width="${W}" height="${H}" fill="url(#g2-${id})"/>
<g transform="translate(90 80)">
  ${rect(0, 0, 1020, 590, C.surface, 22, `stroke="${C.border}" stroke-width="2"`)}
  ${rect(0, 0, 1020, 54, C.raised, 22)}${rect(0, 30, 1020, 24, C.raised, 0)}
  <line x1="0" y1="54" x2="1020" y2="54" stroke="${C.border}" stroke-width="2"/>
  <circle cx="30" cy="27" r="6" fill="${C.border}"/><circle cx="52" cy="27" r="6" fill="${C.border}"/><circle cx="74" cy="27" r="6" fill="${accent}"/>
  ${rect(360, 14, 300, 26, C.bg, 13)}${t(510, 32, label, 13, C.muted, { mono: true, anchor: "middle" })}
  <g transform="translate(0 54)">${body}</g>
</g>
</svg>
`;
}

// ---------- motifs ----------

function linkyfy(a) {
  const nodes = [
    [120, 120, 26], [250, 70, 18], [300, 210, 22], [140, 300, 18], [380, 120, 16],
    [410, 330, 20], [230, 400, 16], [70, 420, 14], [470, 230, 14],
  ];
  const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 6], [3, 7], [2, 8], [5, 6], [4, 8]];
  const e = edges
    .map(([i, j]) => `<line x1="${nodes[i][0]}" y1="${nodes[i][1]}" x2="${nodes[j][0]}" y2="${nodes[j][1]}" stroke="${i === 0 || j === 2 ? a : C.dim}" stroke-opacity="${i === 0 ? 0.7 : 0.45}" stroke-width="2"/>`)
    .join("");
  const n = nodes
    .map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i === 0 ? a : C.raised}" stroke="${i === 0 ? a : C.border}" stroke-width="2"/>${i === 0 ? "" : `<circle cx="${x}" cy="${y - r * 0.22}" r="${r * 0.32}" fill="${C.dim}"/>`}`)
    .join("");
  return `<g transform="translate(40 30)">${e}${n}<circle cx="120" cy="120" r="44" fill="none" stroke="${a}" stroke-opacity="0.35" stroke-width="2"/></g>
  <g transform="translate(560 60)">
    ${rect(0, 0, 400, 150, C.raised, 18, `stroke="${C.border}" stroke-width="2"`)}
    <circle cx="40" cy="40" r="18" fill="${C.border}"/>${line(72, 30, 140, C.muted)}${line(72, 50, 90)}
    ${line(24, 82, 340, C.border)}${line(24, 104, 300, C.border)}${line(24, 126, 200, C.border)}
    ${rect(220, 170, 180, 40, a, 20)}${t(310, 196, "✦ AI personalised", 15, C.bg, { anchor: "middle", weight: 700 })}
    ${rect(40, 236, 360, 130, a, 18, 'fill-opacity="0.1"')}${rect(40.5, 236.5, 359, 129, "none", 18, `stroke="${a}" stroke-opacity="0.5"`)}
    ${line(64, 262, 290, a)}${line(64, 286, 310, a, 10)}${line(64, 310, 220, a)}${line(64, 334, 160, C.border)}
    ${pill(0, 400, "connect", a)}${pill(106, 400, "follow-up", C.muted)}${pill(232, 400, "reply", C.muted)}
  </g>`;
}

function kivip(a) {
  const steps = [
    ["Request", "“Summarise this”", C.muted],
    ["AI agents", "drafting · 6 tasks", a],
    ["Concierge", "human review ✓", "#B7F36B"],
    ["Result", "delivered", C.text],
  ];
  const cards = steps
    .map(([h, s, col], i) => {
      const x = 40 + i * 240;
      return `${rect(x, 70, 200, 170, C.raised, 18, `stroke="${i === 1 ? a : C.border}" stroke-width="2"`)}
      <circle cx="${x + 34}" cy="${110}" r="14" fill="${col}" fill-opacity="${i === 3 ? 0.9 : 0.85}"/>
      ${t(x + 24, 160, h, 24, C.text, { weight: 700 })}${t(x + 24, 190, s, 14, C.muted, { mono: true })}
      ${line(x + 24, 210, 120, C.border, 8)}
      ${i < 3 ? `<path d="M${x + 206} 155 h26 m-8 -8 l8 8 l-8 8" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ""}`;
    })
    .join("");
  const chips = ["Transcription", "Translation", "Image", "Video", "Documents", "Data"];
  let cx = 40;
  const chipRow = chips
    .map((c) => {
      const w = c.length * 9.2 + 28;
      const s = pill(cx, 300, c, a, w);
      cx += w + 14;
      return s;
    })
    .join("");
  return `${t(40, 46, "One brief. AI does the work. A person checks it.", 18, C.muted, { mono: true })}
  ${cards}${chipRow}
  ${rect(40, 370, 940, 140, C.bg, 16, `stroke="${C.border}" stroke-width="2"`)}
  <circle cx="84" cy="420" r="18" fill="${a}" fill-opacity="0.25"/>${t(84, 426, "◆", 16, a, { anchor: "middle" })}
  ${line(120, 408, 520, C.muted)}${line(120, 432, 640, C.border)}${line(120, 456, 380, C.border)}
  ${rect(800, 410, 150, 44, "#B7F36B", 22)}${t(875, 438, "Approved", 16, C.bg, { anchor: "middle", weight: 700 })}`;
}

function crm(a) {
  const kpis = [["Open claims", ""], ["In repair", ""], ["Partners", "2,000+"]];
  const k = kpis
    .map(([l, v], i) => `${rect(230 + i * 250, 30, 230, 100, C.raised, 14, `stroke="${C.border}" stroke-width="2"`)}${t(254 + i * 250, 66, l, 14, C.muted, { mono: true })}${v ? t(254 + i * 250, 110, v, 34, a, { weight: 700 }) : line(254 + i * 250, 88, 110 - i * 20, C.muted, 14)}`)
    .join("");
  const statuses = [["Received", C.muted], ["Diagnosing", "#A7B8FF"], ["In repair", a], ["Shipped", "#B7F36B"], ["In repair", a]];
  const rows = statuses
    .map(([s, col], i) => {
      const y = 170 + i * 58;
      return `${rect(230, y, 730, 46, i % 2 ? C.surface : C.raised, 10)}${t(250, y + 29, `#RC-${4810 + i * 7}`, 14, C.muted, { mono: true })}${line(380, y + 18, 150 + (i % 3) * 40, C.border)}${line(600, y + 18, 90, C.border)}${pill(800, y + 8, s, col, 130)}`;
    })
    .join("");
  const side = ["Claims", "Partners", "Products", "Regions", "Reports"]
    .map((s, i) => `${i === 0 ? rect(20, 40 + i * 50, 170, 38, a, 10, 'fill-opacity="0.14"') : ""}${t(40, 65 + i * 50, s, 16, i === 0 ? a : C.muted, { weight: i === 0 ? 700 : 500 })}`)
    .join("");
  return `${rect(0, 0, 210, 536, C.bg, 0)}<line x1="210" y1="0" x2="210" y2="536" stroke="${C.border}" stroke-width="2"/>${side}
  <g transform="translate(20 330)">${["EU", "ASIA", "USA"].map((r, i) => `<circle cx="16" cy="${20 + i * 44}" r="7" fill="${a}"/><circle cx="16" cy="${20 + i * 44}" r="14" fill="none" stroke="${a}" stroke-opacity="0.4"/>${t(40, 26 + i * 44, r, 15, C.text, { mono: true })}`).join("")}</g>
  ${k}${rows}`;
}

function booking(a) {
  const box = (x, y, w, h, o = 1) =>
    `<g opacity="${o}"><path d="M${x} ${y + 18} L${x + w / 2} ${y} L${x + w} ${y + 18} L${x + w / 2} ${y + 36} Z" fill="${a}" fill-opacity="0.55"/><path d="M${x} ${y + 18} L${x + w / 2} ${y + 36} L${x + w / 2} ${y + 36 + h} L${x} ${y + 18 + h} Z" fill="${a}" fill-opacity="0.3"/><path d="M${x + w} ${y + 18} L${x + w / 2} ${y + 36} L${x + w / 2} ${y + 36 + h} L${x + w} ${y + 18 + h} Z" fill="${a}" fill-opacity="0.18"/><path d="M${x + w / 4} ${y + 9} L${x + (3 * w) / 4} ${y + 27}" stroke="${C.bg}" stroke-opacity="0.5" stroke-width="5"/></g>`;
  const days = Array.from({ length: 28 }, (_, i) => {
    const cx = 610 + (i % 7) * 50;
    const cy = 210 + Math.floor(i / 7) * 46;
    const sel = i === 10;
    const range = i > 10 && i < 15;
    return `${sel ? `<circle cx="${cx}" cy="${cy - 5}" r="18" fill="${a}"/>` : range ? rect(cx - 25, cy - 23, 50, 36, a, 0, 'fill-opacity="0.15"') : ""}${t(cx, cy, String(i + 1), 15, sel ? C.bg : C.muted, { anchor: "middle", mono: true, weight: sel ? 700 : 400 })}`;
  }).join("");
  return `${t(40, 56, "How much space do you need?", 26, C.text, { weight: 700 })}
  ${box(120, 150, 120, 70)}${box(240, 150, 120, 70, 0.8)}${box(180, 90, 120, 70, 0.95)}${box(60, 240, 120, 70, 0.7)}${box(180, 210, 120, 70)}${box(300, 240, 120, 70, 0.6)}
  ${t(40, 420, "Space", 14, C.muted, { mono: true })}${line(40, 436, 440, C.border, 8)}${line(40, 436, 270, a, 8)}<circle cx="310" cy="440" r="13" fill="${C.text}" stroke="${a}" stroke-width="4"/>
  ${t(40, 488, "≈ 50 sq ft · 1-bed flat", 16, C.text, { mono: true })}
  ${rect(570, 90, 400, 340, C.raised, 18, `stroke="${C.border}" stroke-width="2"`)}${t(600, 134, "Collection date", 18, C.text, { weight: 700 })}
  ${["M", "T", "W", "T", "F", "S", "S"].map((d, i) => t(610 + i * 50, 172, d, 13, C.dim, { anchor: "middle", mono: true })).join("")}${days}
  ${rect(570, 450, 400, 56, a, 28)}${t(770, 485, "Book collection →", 18, C.bg, { anchor: "middle", weight: 700 })}`;
}

function analytics(a) {
  const bars = [120, 180, 150, 220, 190, 260, 170, 240, 210, 150];
  const b = bars.map((h, i) => rect(60 + i * 52, 400 - h, 30, h, i === 5 ? a : C.border, 6)).join("");
  const pts = bars.map((h, i) => `${75 + i * 52},${400 - h * 0.7 - 40}`).join(" ");
  return `${t(40, 56, "Telecom spend overview", 18, C.muted, { mono: true })}${line(40, 80, 180, a, 22)}
  ${[0, 1, 2, 3].map((i) => `<line x1="40" y1="${180 + i * 74}" x2="580" y2="${180 + i * 74}" stroke="${C.border}" stroke-dasharray="4 6"/>`).join("")}
  ${b}<polyline points="${pts}" fill="none" stroke="#A7B8FF" stroke-width="3"/>
  ${pill(40, 440, "TEM", a)}${pill(118, 440, "Mobility", C.muted)}${pill(238, 440, "Assets", C.muted)}
  ${rect(630, 30, 350, 476, C.raised, 18, `stroke="${C.border}" stroke-width="2"`)}
  <circle cx="666" cy="70" r="14" fill="${a}"/>${t(692, 76, "AI Copilot", 18, C.text, { weight: 700 })}
  ${rect(740, 116, 214, 56, C.border, 14)}${line(756, 132, 170, C.muted, 8)}${line(756, 150, 120, C.muted, 8)}
  ${rect(654, 194, 270, 120, a, 14, 'fill-opacity="0.12"')}${line(672, 214, 220, a, 8)}${line(672, 234, 236, a, 8)}${line(672, 254, 180, a, 8)}${line(672, 274, 210, C.border, 8)}${line(672, 294, 120, C.border, 8)}
  ${rect(740, 336, 214, 40, C.border, 14)}${line(756, 352, 150, C.muted, 8)}
  ${rect(654, 448, 302, 42, C.bg, 21, `stroke="${C.border}" stroke-width="2"`)}${t(676, 475, "Ask about your carriers…", 14, C.dim, { mono: true })}`;
}

function ticker(a) {
  const pts = [
    [0, 60], [40, 90], [80, 70], [120, 130], [160, 110], [200, 170], [240, 150], [280, 210], [320, 190],
    [360, 250], [400, 240], [440, 290], [480, 270], [520, 320],
  ];
  const poly = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `M0,400 L${poly.replace(/ /g, " L")} L520,400 Z`;
  return `${rect(40, 40, 360, 450, C.raised, 18, `stroke="${C.border}" stroke-width="2"`)}
  ${rect(70, 70, 300, 200, C.bg, 14)}
  <g transform="translate(220 170)"><circle r="62" fill="${a}" fill-opacity="0.12"/><path d="M-36 30 L0 -42 L36 30 Z" fill="none" stroke="${a}" stroke-width="5" stroke-linejoin="round"/><circle cy="6" r="10" fill="${a}"/></g>
  ${line(70, 300, 220, C.muted)}${line(70, 324, 160, C.border)}
  ${t(70, 400, "€24,90", 54, C.text, { weight: 700 })}${t(70, 436, "▼ ticking live", 16, a, { mono: true })}
  ${rect(70, 452, 300, 0, C.bg, 0)}
  <g transform="translate(450 70)">
    ${t(0, 0, "Price · live", 16, C.muted, { mono: true })}
    <g transform="translate(0 30)">
      <path d="${area}" fill="url(#fade-dongk)"/>
      <polyline points="${poly}" fill="none" stroke="${a}" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="520" cy="320" r="9" fill="${a}"/><circle cx="520" cy="320" r="20" fill="none" stroke="${a}" stroke-opacity="0.4" stroke-width="2"/>
      <line x1="0" y1="300" x2="520" y2="300" stroke="#B7F36B" stroke-width="2" stroke-dasharray="8 8"/>
      ${rect(330, 258, 150, 32, "#B7F36B", 16)}${t(405, 280, "BuyBot target", 14, C.bg, { anchor: "middle", weight: 700, mono: true })}
    </g>
    ${rect(0, 400, 230, 56, a, 28)}${t(115, 435, "Buy now", 18, C.bg, { anchor: "middle", weight: 700 })}
    ${rect(250, 400, 250, 56, "none", 28, `stroke="${C.border}" stroke-width="2"`)}${t(375, 435, "Set target price", 16, C.text, { anchor: "middle" })}
  </g>`;
}

function city(a) {
  const blocks = [
    "M60 90 L220 60 L260 160 L120 200 Z",
    "M260 160 L380 120 L430 230 L300 270 Z",
    "M120 200 L260 160 L300 270 L150 320 Z",
    "M220 60 L360 40 L380 120 L260 160 Z",
    "M150 320 L300 270 L340 400 L170 440 Z",
    "M300 270 L430 230 L480 360 L340 400 Z",
  ];
  const fills = [0.35, 0.12, 0.2, 0.08, 0.15, 0.25];
  const map = blocks.map((d, i) => `<path d="${d}" fill="${a}" fill-opacity="${fills[i]}" stroke="${a}" stroke-opacity="0.55" stroke-width="2"/>`).join("");
  const pin = (x, y) => `<path d="M${x} ${y} c-14 -18 -20 -26 -20 -36 a20 20 0 0 1 40 0 c0 10 -6 18 -20 36 z" fill="${C.text}"/><circle cx="${x}" cy="${y - 36}" r="7" fill="${C.bg}"/>`;
  const tiles = ["Citizen services", "Events", "Tourism", "Map", "Jobs", "Culture"];
  const tileEls = tiles
    .map((s, i) => {
      const x = 560 + (i % 2) * 210;
      const y = 40 + Math.floor(i / 2) * 104;
      return `${rect(x, y, 190, 88, C.raised, 14, `stroke="${i === 1 ? a : C.border}" stroke-width="2"`)}${rect(x + 18, y + 18, 26, 26, i === 1 ? a : C.border, 7)}${t(x + 18, y + 72, s, 16, C.text, { weight: 600 })}`;
    })
    .join("");
  return `<g transform="translate(20 30)">${map}<path d="M40 330 C 160 260, 260 380, 500 300" stroke="#A7B8FF" stroke-opacity="0.6" stroke-width="10" fill="none" stroke-linecap="round"/>${pin(190, 180)}${pin(370, 220)}${pin(260, 360)}</g>
  ${tileEls}
  ${rect(560, 368, 400, 130, C.bg, 14, `stroke="${C.border}" stroke-width="2"`)}
  ${rect(580, 388, 70, 90, a, 10, 'fill-opacity="0.18"')}${t(615, 425, "SAT", 13, a, { anchor: "middle", mono: true })}${t(615, 460, "14", 30, C.text, { anchor: "middle", weight: 700 })}
  ${line(672, 404, 230, C.muted)}${line(672, 430, 260, C.border)}${line(672, 456, 180, C.border)}`;
}

const covers = [
  ["linkyfy", "#B7F36B", "linkyfy.ai", linkyfy],
  ["kivip-concierge", "#A7B8FF", "kivip-concierge.com", kivip],
  ["alphatheta-pioneer-dj", "#6EE7F2", "crm · repair claims", crm],
  ["easystorage", "#FF9F43", "easystorage.com", booking],
  ["veroxos", "#C4A7FF", "veroxos.com", analytics],
  ["dongk", "#FFD166", "dongk.shop", ticker],
  ["hannover-de", "#FF7A7A", "hannover.de", city],
];

for (const [id, accent, label, motif] of covers) {
  const svg = frame(id, accent, label, motif(accent));
  const file = join(outDir, `${id}.svg`);
  writeFileSync(file, svg.replace(/fill="url\(#fade-dongk\)"/, `fill="url(#fade-${id})"`));
  console.log("wrote", file);
}
