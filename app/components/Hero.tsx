"use client";
import { useEffect, useState } from "react";

/** One short line per beat. Sources: what.one-liner, deploy.models, what.not-saas, price.no-per-query (claimed). */
export const CAPTIONS = [
  "A data lakehouse: huge amounts of data, stored cheaply, queried with SQL.",
  "Installed on your own Kubernetes: your data center or your cloud account.",
  "Your data stays inside. No per-query or per-user fees.",
];

/** Three beats, about 5 s each, cycling on their own. Reduced motion shows the last frame and stays there. */
export function useBeats(total = 3, ms = 5000) {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setBeat(total - 1); setPlaying(false); }
  }, [total]);
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setBeat((b) => (b + 1) % total), ms);
    return () => clearTimeout(t);
  }, [beat, playing, total, ms]);
  return { beat, playing, ms };
}

/* ---------- the stage ---------- */

type Env = { x: number; y: number; label: string; kind: "dc" | "cloud" };
type Geo = {
  w: number; h: number; fs: number;
  per: { x: number; y: number; w: number; h: number; r: number };
  hex: { x: number; y: number; r: number };
  sql: { x: number; y: number };
  tables: { x: number; y: number; w: number };
  envs: Env[];
  /** SaaS boxes outside the perimeter; `wall` is where their reach is cut. */
  saas: { x: number; y: number; w: number; label: string; wall: { x: number; y: number } }[];
};

const DESK: Geo = {
  w: 680, h: 440, fs: 14,
  per: { x: 22, y: 50, w: 452, h: 360, r: 30 },
  hex: { x: 248, y: 212, r: 46 },
  sql: { x: 248, y: 122 },
  tables: { x: 248, y: 354, w: 100 },
  envs: [
    { x: 110, y: 122, label: "Data center", kind: "dc" },
    { x: 386, y: 122, label: "AWS", kind: "cloud" },
    { x: 110, y: 340, label: "Azure", kind: "cloud" },
    { x: 386, y: 340, label: "Google Cloud", kind: "cloud" },
  ],
  saas: [
    { x: 596, y: 172, w: 136, label: "SaaS platform", wall: { x: 474, y: 172 } },
    { x: 596, y: 288, w: 136, label: "Vendor cloud", wall: { x: 474, y: 288 } },
  ],
};

const MOB: Geo = {
  w: 360, h: 470, fs: 13,
  per: { x: 6, y: 40, w: 348, h: 304, r: 24 },
  hex: { x: 180, y: 182, r: 36 },
  sql: { x: 180, y: 98 },
  tables: { x: 180, y: 300, w: 72 },
  envs: [
    { x: 74, y: 98, label: "Data center", kind: "dc" },
    { x: 286, y: 98, label: "AWS", kind: "cloud" },
    { x: 66, y: 292, label: "Azure", kind: "cloud" },
    { x: 286, y: 292, label: "Google Cloud", kind: "cloud" },
  ],
  saas: [
    { x: 92, y: 420, w: 150, label: "SaaS platform", wall: { x: 92, y: 344 } },
    { x: 268, y: 420, w: 150, label: "Vendor cloud", wall: { x: 268, y: 344 } },
  ],
};

const rrect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r},${y}H${x + w - r}A${r},${r} 0 0 1 ${x + w},${y + r}V${y + h - r}A${r},${r} 0 0 1 ${x + w - r},${y + h}H${x + r}A${r},${r} 0 0 1 ${x},${y + h - r}V${y + r}A${r},${r} 0 0 1 ${x + r},${y}Z`;
const hexPts = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(" ");
const chipW = (label: string, fs: number) => Math.round(label.length * fs * 0.6 + 40);

function EnvIcon({ kind, x, y }: { kind: Env["kind"]; x: number; y: number }) {
  return kind === "dc"
    ? <g transform={`translate(${x - 7},${y - 7})`} fill="none" stroke="#d3f52c" strokeWidth="1.4">
        <rect x="1" y="1" width="12" height="4" rx="1" /><rect x="1" y="7" width="12" height="4" rx="1" />
        <circle cx="4" cy="3" r=".6" fill="#d3f52c" /><circle cx="4" cy="9" r=".6" fill="#d3f52c" />
      </g>
    : <path transform={`translate(${x - 8},${y - 6})`} fill="none" stroke="#d3f52c" strokeWidth="1.4" strokeLinejoin="round"
        d="M4 11h8.5a3 3 0 0 0 .3-6A4.3 4.3 0 0 0 4.6 4.2 3.4 3.4 0 0 0 4 11z" />;
}

function Stage({ g, id, className }: { g: Geo; id: string; className: string }) {
  const { per, hex, sql, tables } = g;
  const sqlW = Math.round(g.fs * 3.6 + 24);
  // where the perimeter would sit if it were centred in the frame (SaaS boxes live to its right on desktop, below on phones)
  const sideways = g.saas[0].wall.x !== g.saas[0].x;
  const cx = sideways ? Math.round((g.w - per.w) / 2 - per.x) : 0;
  const cy = sideways ? 0 : Math.round((g.h - per.h) / 2 - per.y);
  const slab = (i: number) => {
    const w = tables.w, d = w * 0.28, t = 7, y = tables.y - i * 13;
    const top = `${tables.x - w / 2},${y} ${tables.x},${y - d} ${tables.x + w / 2},${y} ${tables.x},${y + d}`;
    const side = `${tables.x - w / 2},${y} ${tables.x},${y + d} ${tables.x + w / 2},${y} ${tables.x + w / 2},${y + t} ${tables.x},${y + d + t} ${tables.x - w / 2},${y + t}`;
    return (
      <g key={i} className="hs-slab" style={{ transitionDelay: `${0.9 + i * 0.18}s` }}>
        <polygon points={side} fill="#1f2a1f" stroke="#d3f52c" strokeOpacity=".45" strokeWidth="1" />
        <polygon points={top} fill={i === 2 ? "#3c4a2c" : "#2f3b2b"} stroke="#d3f52c" strokeOpacity={i === 2 ? 1 : 0.55} strokeWidth="1.2" />
      </g>
    );
  };
  return (
    <svg className={className} viewBox={`0 0 ${g.w} ${g.h}`} role="img"
      aria-label="IOMETE sits inside your infrastructure: your data center and your AWS, Azure or Google Cloud accounts, with your tables in your own storage. SaaS platforms outside are cut off from your data.">
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#d3f52c" stopOpacity=".55" />
          <stop offset="1" stopColor="#d3f52c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-hex`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6ff6e" /><stop offset="1" stopColor="#c2e41a" />
        </linearGradient>
        <linearGradient id={`${id}-per`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d3f52c" stopOpacity=".10" /><stop offset="1" stopColor="#d3f52c" stopOpacity=".02" />
        </linearGradient>
      </defs>

      {/* Until the SaaS boxes appear, the scene sits centred; it slides over to make room for them. */}
      <g className="hs-scene" style={{ ["--hs-center" as string]: `translate(${cx}px, ${cy}px)` }}>
      {/* perimeter: your infrastructure (from beat 2, "where it runs") */}
      <g className="f1">
        <path d={rrect(per.x, per.y, per.w, per.h, per.r)} fill={`url(#${id}-per)`} />
        <path className="hs-wall-glow" d={rrect(per.x, per.y, per.w, per.h, per.r)} fill="none" stroke="#d3f52c" strokeOpacity=".18" strokeWidth="8" />
        <path className="hs-wall" pathLength={1} d={rrect(per.x, per.y, per.w, per.h, per.r)} fill="none" stroke="#d3f52c" strokeWidth="1.6" />
        <g className="hs-tag">
          <rect x={per.x + 20} y={per.y - 13} width={g.fs * 13.4} height="26" rx="13" fill="#d3f52c" />
          <text x={per.x + 20 + g.fs * 6.7} y={per.y + 4.5} textAnchor="middle" className="hs-mono" fontSize={g.fs - 1} fill="#202020">YOUR INFRASTRUCTURE</text>
        </g>
      </g>

      {/* data moving between IOMETE and your environments: it circulates, it never crosses the wall */}
      <g className="f1">
        {g.envs.map((e) => (
          <g key={e.label}>
            <line x1={hex.x} y1={hex.y} x2={e.x} y2={e.y} stroke="#d3f52c" strokeOpacity=".22" strokeWidth="1.2" />
            <line className="hs-flow" x1={e.x} y1={e.y} x2={hex.x} y2={hex.y} stroke="#d3f52c" strokeWidth="3" strokeLinecap="round" strokeDasharray="0 14" />
          </g>
        ))}
      </g>

      {/* from the start: SQL in, Iceberg tables underneath */}
      <g className="hs-in" style={{ transitionDelay: ".55s" }}>
        <line x1={sql.x} y1={sql.y + 14} x2={hex.x} y2={hex.y - hex.r} stroke="#ffffff" strokeOpacity=".18" strokeWidth="1.2" />
        <line className="hs-flow hs-flow-fast" x1={sql.x} y1={sql.y + 14} x2={hex.x} y2={hex.y - hex.r} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeDasharray="0 12" />
        <rect x={sql.x - sqlW / 2} y={sql.y - 14} width={sqlW} height="28" rx="8" fill="#1a221a" stroke="#ffffff" strokeOpacity=".28" />
        <text x={sql.x - sqlW / 2 + 12} y={sql.y + 5} className="hs-mono" fontSize={g.fs} fill="#e9ece6">SQL<tspan className="hs-caret" fill="#d3f52c">_</tspan></text>
      </g>
      <g>
        <line x1={hex.x} y1={hex.y + hex.r} x2={tables.x} y2={tables.y - 30} stroke="#d3f52c" strokeOpacity=".3" strokeWidth="1.2" />
        {[0, 1, 2].map(slab)}
      </g>

      {/* the IOMETE mark: a lime hexagon prism with a pulse */}
      <g className="hs-hex">
        <circle cx={hex.x} cy={hex.y} r={hex.r * 2.1} fill={`url(#${id}-glow)`} className="hs-breathe" />
        <polygon className="hs-ring" points={hexPts(hex.x, hex.y, hex.r)} fill="none" stroke="#d3f52c" strokeWidth="1.5" />
        <polygon className="hs-ring hs-ring2" points={hexPts(hex.x, hex.y, hex.r)} fill="none" stroke="#d3f52c" strokeWidth="1.5" />
        <polygon points={hexPts(hex.x, hex.y + 7, hex.r)} fill="#7f9612" />
        <polygon points={hexPts(hex.x, hex.y, hex.r)} fill={`url(#${id}-hex)`} />
        <polygon points={hexPts(hex.x, hex.y, hex.r * 0.62)} fill="none" stroke="#202020" strokeOpacity=".16" strokeWidth="1.2" />
        <text x={hex.x} y={hex.y + g.fs * 0.36} textAnchor="middle" className="hs-display" fontSize={g.fs + 2} fill="#202020">IOMETE</text>
      </g>

      {/* your environments */}
      {g.envs.map((e, i) => {
        const w = chipW(e.label, g.fs);
        return (
          <g key={e.label} className="f1 hs-chip" style={{ transitionDelay: `${0.5 + i * 0.12}s` }}>
            <rect x={e.x - w / 2} y={e.y - 17} width={w} height="34" rx="10" fill="#243024" stroke="#ffffff" strokeOpacity=".16" />
            <EnvIcon kind={e.kind} x={e.x - w / 2 + 18} y={e.y} />
            <text x={e.x - w / 2 + 32} y={e.y + g.fs * 0.36} fontSize={g.fs} className="hs-body" fill="#eef1ea">{e.label}</text>
          </g>
        );
      })}

      </g>

      {/* beat 3: SaaS outside, reaching in, cut at the wall */}
      <g className="f2">
        {g.saas.map((s, i) => {
          const vertical = s.wall.x === s.x;
          const from = vertical ? { x: s.x, y: s.y - 18 } : { x: s.x - s.w / 2, y: s.y };
          return (
            <g key={s.label}>
              <line className="hs-reach" pathLength={1} x1={from.x} y1={from.y} x2={s.wall.x} y2={s.wall.y} stroke="#9a9e97" strokeWidth="1.6" style={{ transitionDelay: `${0.3 + i * 0.2}s` }} />
              <g className="hs-saas" style={{ transitionDelay: `${i * 0.15}s` }}>
                <rect x={s.x - s.w / 2} y={s.y - 18} width={s.w} height="36" rx="10" fill="#2a2e2a" stroke="#8e8e8c" strokeDasharray="4 4" />
                <text x={s.x} y={s.y + g.fs * 0.36} textAnchor="middle" fontSize={g.fs} className="hs-body" fill="#b9bdb5">{s.label}</text>
              </g>
              <circle className="hs-burst" cx={s.wall.x} cy={s.wall.y} r="16" fill="none" stroke="#ed7e68" strokeWidth="2" style={{ animationDelay: `${1.2 + i * 0.2}s` }} />
              <g className="hs-cut" style={{ transformOrigin: `${s.wall.x}px ${s.wall.y}px`, transitionDelay: `${1.2 + i * 0.2}s` }}>
                <circle cx={s.wall.x} cy={s.wall.y} r="13" fill="#202620" stroke="#ed7e68" strokeWidth="2" />
                <path d={`M${s.wall.x - 5},${s.wall.y - 5}l10,10m0,-10l-10,10`} stroke="#ed7e68" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** The animated story. `beat` 0: what it is, 1: where it runs, 2: why it matters. */
export function HeroDiagram({ beat }: { beat: number }) {
  // Entrance runs on CSS transitions once mounted (keyframes on SVG children restart on resize in Chrome).
  const [ready, setReady] = useState(false);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);
  return (
    <div className={"hero-svg hero-stage" + (ready ? " ready" : "")} data-beat={beat}>
      <Stage g={DESK} id="hd" className="hero-d" />
      <Stage g={MOB} id="hm" className="hero-m" />
    </div>
  );
}
