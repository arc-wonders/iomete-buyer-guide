"use client";
import { C } from "./shared";

/**
 * The one scene on the why-not-saas page. Two places (your infrastructure, their service) and three
 * movable things: your data, the software, and who runs it. In "saas" the data goes to the software;
 * in "iomete" the software comes to the data. Positions animate with CSS transforms, so flipping the
 * mode makes the data and the software visibly travel in opposite directions.
 */
export type Mode = "saas" | "iomete";

type P = [number, number];
type Geo = {
  vb: [number, number];
  you: { x: number; y: number; w: number; h: number; label: P };
  them: { x: number; y: number; w: number; h: number; label: P };
  data: Record<Mode, P>;     // top-left of the cylinder
  ghost: P;                   // where the data used to be (shown in saas)
  hex: Record<Mode, P>;       // centre of the software hexagon
  run: Record<Mode, P>;       // centre of the "who runs it" pill
  team: P;                    // static people, inside your side
  rack: P | null;             // static servers, inside their side
  flow: { d: string; label: P; anchor: "middle" | "start" | "end" };
  vertical: boolean;
};

const WIDE: Geo = {
  vb: [1000, 400],
  you: { x: 8, y: 44, w: 404, h: 344, label: [30, 30] },
  them: { x: 588, y: 44, w: 404, h: 344, label: [610, 30] },
  data: { iomete: [70, 118], saas: [650, 118] },
  ghost: [70, 118],
  hex: { iomete: [310, 172], saas: [890, 172] },
  run: { iomete: [240, 334], saas: [820, 334] },
  team: [44, 300],
  rack: [626, 290],
  flow: { d: "M 424 216 L 576 216", label: [500, 180], anchor: "middle" },
  vertical: false,
};

const TALL: Geo = {
  vb: [360, 620],
  them: { x: 4, y: 34, w: 352, h: 226, label: [18, 22] },
  you: { x: 4, y: 384, w: 352, h: 228, label: [18, 372] },
  data: { iomete: [36, 420], saas: [36, 70] },
  ghost: [36, 420],
  hex: { iomete: [262, 470], saas: [262, 120] },
  run: { iomete: [196, 576], saas: [196, 226] },
  team: [20, 556],
  rack: null,
  flow: { d: "M 300 380 L 300 268", label: [284, 316], anchor: "end" },
  vertical: true,
};

const mono = "var(--font-mono), ui-monospace, monospace";
const body = "var(--body)";
const t = (p: P) => ({ transform: `translate(${p[0]}px, ${p[1]}px)` });

function Cylinder({ label = true }: { label?: boolean }) {
  return (
    <g>
      <path d="M0 16 v84 a54 16 0 0 0 108 0 v-84" fill={C.dark} />
      <ellipse cx="54" cy="16" rx="54" ry="16" fill="#3d4a3d" />
      <path d="M0 44 a54 16 0 0 0 108 0 M0 72 a54 16 0 0 0 108 0" fill="none" stroke="#4e5e4e" strokeWidth="1.5" />
      {label && <text x="54" y="96" textAnchor="middle" fontFamily={body} fontSize="15" fontWeight="500" fill={C.lime}>your data</text>}
    </g>
  );
}

function Hex() {
  return (
    <g>
      <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" fill={C.lime} stroke={C.dark} strokeWidth="2" />
      <polygon points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13" fill="none" stroke={C.dark} strokeWidth="2" opacity=".55" />
      <text y="72" textAnchor="middle" fontFamily={body} fontSize="15" fill={C.ink}>the software</text>
    </g>
  );
}

export function Scene({ mode, layout }: { mode: Mode; layout: "wide" | "tall" }) {
  const g = layout === "wide" ? WIDE : TALL;
  const saas = mode === "saas";
  const id = `wns-${layout}`;
  const label = saas
    ? "Databricks or Snowflake: your data goes to their cloud service, and they run it."
    : "IOMETE: the software comes into your infrastructure, your data stays where it is, and you run it.";
  return (
    <svg className={`wns-scene wns-scene-${layout} is-${mode}`} viewBox={`0 0 ${g.vb[0]} ${g.vb[1]}`} role="img" aria-label={label}>
      <defs>
        <marker id={`${id}-r`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" fill={C.unknown} />
        </marker>
        <marker id={`${id}-g`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" fill={C.dark} />
        </marker>
        <pattern id={`${id}-grid`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.dark} opacity=".12" />
        </pattern>
      </defs>

      {/* their side */}
      <rect x={g.them.x} y={g.them.y} width={g.them.w} height={g.them.h} rx="22" fill="#f2eeeb" />
      <rect className="wns-tint-them" x={g.them.x} y={g.them.y} width={g.them.w} height={g.them.h} rx="22" fill="#fbe3dc" />
      <text x={g.them.label[0]} y={g.them.label[1]} fontFamily={mono} fontSize="13" letterSpacing="1.2" fill={C.ink2}>THEIR SERVICE · PUBLIC CLOUD</text>
      {g.rack && <g transform={`translate(${g.rack[0]} ${g.rack[1]})`} opacity=".55" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 24})`}>
            <rect width="74" height="18" rx="4" fill="none" stroke={C.ink2} strokeWidth="1.5" />
            <circle cx="12" cy="9" r="2.5" fill={C.ink2} />
          </g>
        ))}
      </g>}

      {/* your side */}
      <rect x={g.you.x} y={g.you.y} width={g.you.w} height={g.you.h} rx="22" fill={C.green} />
      <rect x={g.you.x} y={g.you.y} width={g.you.w} height={g.you.h} rx="22" fill={`url(#${id}-grid)`} />
      <rect className="wns-perimeter" x={g.you.x + 1} y={g.you.y + 1} width={g.you.w - 2} height={g.you.h - 2} rx="21" fill="none" stroke={C.documented} strokeWidth="2" strokeDasharray="7 7" />
      <text x={g.you.label[0]} y={g.you.label[1]} fontFamily={mono} fontSize="13" letterSpacing="1.2" fill={C.greenInk}>YOUR INFRASTRUCTURE</text>
      <g transform={`translate(${g.team[0]} ${g.team[1]})`} aria-hidden="true" opacity=".6">
        {[0, 26, 52].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <circle cx="10" cy="8" r="7" fill={C.dark} />
            <path d="M-2 34 a12 13 0 0 1 24 0z" fill={C.dark} />
          </g>
        ))}
      </g>

      {/* ghost of the data's home, visible once it has left */}
      <g className="wns-ghost" style={t(g.ghost)} aria-hidden="true">
        <path d="M0 16 v84 a54 16 0 0 0 108 0 v-84" fill="none" stroke={C.unknown} strokeWidth="1.5" strokeDasharray="5 5" />
        <ellipse cx="54" cy="16" rx="54" ry="16" fill="none" stroke={C.unknown} strokeWidth="1.5" strokeDasharray="5 5" />
        <text x="54" y="72" textAnchor="middle" fontFamily={body} fontSize="14" fill={C.unknown}>moved out</text>
      </g>

      {/* the flow across the gap */}
      <g className="wns-flow" key={mode}>
        <path className="wns-flow-line" d={g.flow.d} fill="none" strokeWidth="2.5"
          stroke={saas ? C.unknown : C.dark}
          markerEnd={saas ? `url(#${id}-r)` : undefined} markerStart={saas ? undefined : `url(#${id}-g)`} />
        {saas && [0, 1, 2].map((i) => (
          <circle key={i} className="wns-packet" r="5" fill={C.unknown}>
            <animateMotion dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={g.flow.d} />
          </circle>
        ))}
        <text x={g.flow.label[0]} y={g.flow.label[1]} textAnchor={g.flow.anchor} fontFamily={body} fontSize="15" fontWeight="500" fill={saas ? C.unknown : C.dark}>
          <tspan x={g.flow.label[0]}>{saas ? "your data" : "the software"}</tspan>
          <tspan x={g.flow.label[0]} dy="19">{saas ? "goes to them" : "comes to you"}</tspan>
        </text>
      </g>

      {/* movers */}
      <g className="wns-mover wns-data" style={t(g.data[mode])}><Cylinder /></g>
      <g className="wns-mover wns-hex" style={t(g.hex[mode])}><Hex /></g>
      <g className="wns-mover wns-run" style={t(g.run[mode])}>
        <rect x="-78" y="-19" width="156" height="38" rx="19" fill={saas ? "#fff" : C.dark} stroke={C.dark} strokeWidth="1.5" />
        <g transform="translate(-54 0)" stroke={saas ? C.dark : C.lime} strokeWidth="2" fill="none">
          <circle r="6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="0" y1="-8" x2="0" y2="-11" transform={`rotate(${a})`} />
          ))}
        </g>
        <text x="10" y="5" textAnchor="middle" fontFamily={body} fontSize="15" fontWeight="500" fill={saas ? C.ink : C.lime}>
          {saas ? "they run it" : "you run it"}
        </text>
      </g>
    </svg>
  );
}
