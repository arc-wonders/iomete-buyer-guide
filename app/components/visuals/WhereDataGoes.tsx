"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import { factById } from "@/lib/facts";
import { C, Tile, useInView, type Pick } from "./shared";

/**
 * "Where does our data go?" A trust perimeter: your environment (dark, lime dashed border) holds
 * IOMETE, your data, your keys and your logins. Only two flows cross the line, each tappable:
 * usage data out (sec.telemetry) and support in, gated by a contract (sec.support-access).
 * Two drawings: wide (>= 880px) and tall (phones), so SVG text stays >= 12px rendered.
 */

const OUT = "#e0a04a"; // apricot: leaves the perimeter
const IN = "#6aa3dc";  // lake: comes in through the gate
const MUTED = "#a9bba9";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => { setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  return r;
}

function press(fn: () => void) {
  return {
    role: "button" as const, tabIndex: 0, onClick: fn,
    onKeyDown: (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } },
  };
}

function Icon({ kind, x, y, s = 1 }: { kind: "data" | "key" | "id"; x: number; y: number; s?: number }) {
  const p = { fill: "none", stroke: C.lime, strokeWidth: 1.8 / s, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} aria-hidden="true">
      {kind === "data" && (<>
        <ellipse cx="12" cy="5" rx="9" ry="3.5" {...p} />
        <path d="M3 5v14c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V5M3 12c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5" {...p} />
      </>)}
      {kind === "key" && (<>
        <circle cx="7.5" cy="15.5" r="5" {...p} />
        <path d="M11 12 21 2M17 6l3 3M14.5 8.5l2.5 2.5" {...p} />
      </>)}
      {kind === "id" && (<>
        <circle cx="12" cy="8" r="4.5" {...p} />
        <path d="M3.5 22c.8-4.6 4.2-7.5 8.5-7.5s7.7 2.9 8.5 7.5" {...p} />
      </>)}
    </g>
  );
}

function Lock({ x, y, color = MUTED }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <rect x="0" y="6" width="12" height="9" rx="2" />
      <path d="M2.5 6V4a3.5 3.5 0 0 1 7 0v2" />
    </g>
  );
}

function Hub({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = Math.PI / 3 * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <g className="wdg-hub">
      <circle className="wdg-ring" cx={cx} cy={cy} r={r * 1.25} fill="none" stroke={C.lime} strokeOpacity=".5" />
      <circle className="wdg-ring wdg-ring2" cx={cx} cy={cy} r={r * 1.25} fill="none" stroke={C.lime} strokeOpacity=".5" />
      <polygon points={pts} fill={C.lime} />
      <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="var(--body)" fontWeight="600" fontSize={r > 45 ? 18 : 16} fill={C.ink} letterSpacing=".02em">IOMETE</text>
    </g>
  );
}

type V = { kind: "data" | "key" | "id"; t: string; s: string; id: string };
const VAULTS: V[] = [
  { kind: "data", t: "Your data", s: "your object store", id: "what.not-saas" },
  { kind: "key", t: "Your keys", s: "your key manager", id: "sec.at-rest" },
  { kind: "id", t: "Your logins", s: "your identity provider", id: "sec.sso" },
];

function Evidence({ id, x, y, anchor = "start", fill = C.ink2, size = 13 }: { id: string; x: number; y: number; anchor?: "start" | "end"; fill?: string; size?: number }) {
  const st = factById[id]?.state ?? "unknown";
  const col = st === "documented" ? C.documented : st === "claimed" ? C.claimed : C.unknown;
  const word = st === "documented" ? "documented" : st === "claimed" ? "IOMETE claims" : "not public";
  const w = word.length * size * 0.6;
  const dx = anchor === "end" ? x - w - 14 : x;
  return (
    <g>
      <circle cx={dx + 4.5} cy={y - 4.5} r="4.5" fill={st === "unknown" ? "none" : col} stroke={st === "unknown" ? col : "none"} strokeWidth="2" />
      <text x={dx + 14} y={y} fontFamily="var(--font-mono), ui-monospace, monospace" fontSize={size} fill={fill}>{word}</text>
    </g>
  );
}

function Particles({ d, color, dur, n = 3, on }: { d: string; color: string; dur: number; n?: number; on: boolean }) {
  if (!on) return null;
  return (
    <g className="wdg-particles" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} r="4.5" fill={color}>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${(dur / n) * i}s`} path={d} />
        </circle>
      ))}
    </g>
  );
}

/* ---------- wide drawing, 1040 x 500 ---------- */
function Wide({ onPick, motion }: { onPick: Pick; motion: boolean }) {
  const hub = { cx: 330, cy: 186, r: 54 };
  const outD = "M386 168 C 600 168, 640 222, 826 222";
  const inD = "M826 282 C 640 282, 600 210, 386 210";
  return (
    <svg className="wdg-wide" viewBox="0 0 1040 500" role="img"
      aria-label="Your perimeter holds IOMETE, your data in your object store, your keys in your key manager and your logins in your identity provider. Only two things cross it: usage data goes out to IOMETE the company, and support comes in only when a contract allows it.">
      <defs>
        <marker id="wdg-ao" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill={OUT} /></marker>
        <marker id="wdg-ai" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill={IN} /></marker>
      </defs>

      {/* the perimeter */}
      <g className="wdg-env">
        <rect x="8" y="8" width="672" height="484" rx="28" fill={C.dark} />
        <rect className="wdg-line" x="8" y="8" width="672" height="484" rx="28" fill="none" stroke={C.lime} strokeWidth="2.5" strokeDasharray="10 9" />
        <text x="44" y="54" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="14" letterSpacing=".12em" fill={C.lime}>YOUR PERIMETER</text>
        <text x="44" y="88" fontFamily="var(--display)" fontWeight="300" fontSize="28" fill="#fff">Stays inside</text>
      </g>

      {VAULTS.map((v, i) => {
        const x = 44 + i * 208;
        return (
          <path key={v.id} className="wdg-wire" pathLength={1} d={`M${hub.cx} ${hub.cy + hub.r} C ${hub.cx} 290, ${x + 92} 270, ${x + 92} 330`}
            fill="none" stroke={C.lime} strokeOpacity=".35" strokeWidth="1.5" />
        );
      })}
      <Hub {...hub} />

      {VAULTS.map((v, i) => {
        const x = 44 + i * 208, y = 330;
        return (
          <g key={v.id} className="wdg-vault" style={{ ["--d" as string]: `${0.35 + i * 0.12}s` }} {...press(() => onPick(v.id))} aria-label={`${v.t}, in ${v.s}. Open the statement.`}>
            <rect x={x} y={y} width="184" height="124" rx="16" fill="#ffffff" fillOpacity=".06" stroke="#ffffff" strokeOpacity=".16" />
            <Icon kind={v.kind} x={x + 22} y={y + 22} />
            <Lock x={x + 150} y={y + 22} />
            <text x={x + 22} y={y + 84} fontFamily="var(--body)" fontSize="20" fill="#fff">{v.t}</text>
            <text x={x + 22} y={y + 106} fontFamily="var(--body)" fontSize="14" fill={MUTED}>{v.s}</text>
          </g>
        );
      })}

      {/* outside */}
      <g className="wdg-co">
        <text x="844" y="190" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="14" letterSpacing=".12em" fill={C.ink3}>OUTSIDE</text>
        <rect x="830" y="200" width="200" height="104" rx="18" fill="#f2eeeb" />
        <text x="852" y="244" fontFamily="var(--display)" fontSize="22" fill={C.ink}>IOMETE,</text>
        <text x="852" y="272" fontFamily="var(--display)" fontSize="22" fill={C.ink}>the company</text>
      </g>

      {/* flow 1: usage data out */}
      <g className="wdg-flow wdg-out" {...press(() => onPick("sec.telemetry"))} aria-label="Usage data goes out: logs, telemetry and metrics, not customer data. Open the statement.">
        <path d={outD} fill="none" stroke="transparent" strokeWidth="26" />
        <path className="wdg-lane" pathLength={1} d={outD} fill="none" stroke={OUT} strokeWidth="3" markerEnd="url(#wdg-ao)" />
        <Particles d={outD} color={OUT} dur={2.6} on={motion} />
        <rect x="700" y="44" width="330" height="112" fill="transparent" />
        <path d="M712 72 h20" stroke={OUT} strokeWidth="3" strokeLinecap="round" markerEnd="url(#wdg-ao)" />
        <text x="754" y="78" fontFamily="var(--body)" fontWeight="500" fontSize="19" fill={C.ink}>Usage data goes out</text>
        <text x="712" y="102" fontFamily="var(--body)" fontSize="15" fill={C.ink2}>logs, telemetry, metrics. Not your data.</text>
        <Evidence id="sec.telemetry" x={712} y={132} size={14} />
        <text className="wdg-src" x="826" y="132" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="14" fill={C.ink3}>· licence §4.2 →</text>
      </g>

      {/* flow 2: support in, through a gate */}
      <g className="wdg-flow wdg-in" {...press(() => onPick("sec.support-access"))} aria-label="Support comes in only when a contract allows it, read-only, with credentials you control. Open the statement.">
        <path d={inD} fill="none" stroke="transparent" strokeWidth="26" />
        <path className="wdg-lane" d={inD} fill="none" stroke={IN} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" markerEnd="url(#wdg-ai)" />
        <Particles d={inD} color={IN} dur={3.4} n={2} on={motion} />
        <g className="wdg-gate">
          <rect x="664" y="246" width="32" height="32" rx="9" fill={C.dark} stroke={IN} strokeWidth="2" />
          <Lock x={674} y={253} color={IN} />
        </g>
        <rect x="700" y="336" width="330" height="120" fill="transparent" />
        <path d="M736 362 h-20" stroke={IN} strokeWidth="3" strokeLinecap="round" markerEnd="url(#wdg-ai)" />
        <text x="754" y="368" fontFamily="var(--body)" fontWeight="500" fontSize="19" fill={C.ink}>Support comes in</text>
        <text x="712" y="392" fontFamily="var(--body)" fontSize="15" fill={C.ink2}>only if a contract (SOW) allows it,</text>
        <text x="712" y="412" fontFamily="var(--body)" fontSize="15" fill={C.ink2}>read-only, with your credentials.</text>
        <Evidence id="sec.support-access" x={712} y={442} size={14} />
        <text className="wdg-src" x="826" y="442" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="14" fill={C.ink3}>· licence §10.4 →</text>
      </g>
    </svg>
  );
}

/* ---------- tall drawing for phones, 360 x 640 ---------- */
function Tall({ onPick, motion }: { onPick: Pick; motion: boolean }) {
  const hub = { cx: 180, cy: 290, r: 42 };
  const outD = "M165 250 C 165 205, 146 160, 146 72";
  const inD = "M214 72 C 214 160, 195 205, 195 250";
  return (
    <svg className="wdg-tall" viewBox="0 0 360 640" role="img"
      aria-label="Your perimeter holds IOMETE, your data, your keys and your logins. Only two things cross it: usage data goes out to IOMETE the company, and support comes in only when a contract allows it.">
      <defs>
        <marker id="wdg-ao-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill={OUT} /></marker>
        <marker id="wdg-ai-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill={IN} /></marker>
      </defs>

      <g className="wdg-co">
        <rect x="80" y="4" width="200" height="62" rx="16" fill="#f2eeeb" />
        <text x="180" y="32" textAnchor="middle" fontFamily="var(--display)" fontSize="17" fill={C.ink}>IOMETE, the company</text>
        <text x="180" y="53" textAnchor="middle" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="13" letterSpacing=".1em" fill={C.ink3}>OUTSIDE</text>
      </g>

      <g className="wdg-env">
        <rect x="4" y="184" width="352" height="452" rx="24" fill={C.dark} />
        <rect className="wdg-line" x="4" y="184" width="352" height="452" rx="24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeDasharray="10 9" />
        <text x="22" y="214" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="13" fill={C.lime}>YOUR PERIMETER</text>
      </g>

      <Hub {...hub} />

      {VAULTS.map((v, i) => {
        const x = 20, y = 366 + i * 86;
        return (
          <g key={v.id} className="wdg-vault" style={{ ["--d" as string]: `${0.35 + i * 0.12}s` }} {...press(() => onPick(v.id))} aria-label={`${v.t}, in ${v.s}. Open the statement.`}>
            <rect x={x} y={y} width="320" height="74" rx="14" fill="#ffffff" fillOpacity=".06" stroke="#ffffff" strokeOpacity=".16" />
            <Icon kind={v.kind} x={x + 18} y={y + 25} />
            <text x={x + 60} y={y + 33} fontFamily="var(--body)" fontSize="18" fill="#fff">{v.t}</text>
            <text x={x + 60} y={y + 55} fontFamily="var(--body)" fontSize="14" fill={MUTED}>{v.s}</text>
            <Lock x={x + 290} y={y + 28} />
          </g>
        );
      })}

      <g className="wdg-flow wdg-out" {...press(() => onPick("sec.telemetry"))} aria-label="Usage data goes out: logs, telemetry and metrics, not customer data. Open the statement.">
        <rect x="0" y="80" width="170" height="96" fill="transparent" />
        <path d={outD} fill="none" stroke="transparent" strokeWidth="24" />
        <path className="wdg-lane" pathLength={1} d={outD} fill="none" stroke={OUT} strokeWidth="3" markerEnd="url(#wdg-ao-t)" />
        <Particles d={outD} color={OUT} dur={2.2} on={motion} />
        <text x="134" y="104" textAnchor="end" fontFamily="var(--body)" fontWeight="500" fontSize="16" fill={C.ink}>Usage data out</text>
        <text x="134" y="125" textAnchor="end" fontFamily="var(--body)" fontSize="14" fill={C.ink2}>not your data</text>
        <Evidence id="sec.telemetry" x={134} y={150} anchor="end" />
      </g>

      <g className="wdg-flow wdg-in" {...press(() => onPick("sec.support-access"))} aria-label="Support comes in only when a contract allows it, read-only, with credentials you control. Open the statement.">
        <rect x="192" y="80" width="168" height="96" fill="transparent" />
        <path d={inD} fill="none" stroke="transparent" strokeWidth="24" />
        <path className="wdg-lane" d={inD} fill="none" stroke={IN} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" markerEnd="url(#wdg-ai-t)" />
        <Particles d={inD} color={IN} dur={2.8} n={2} on={motion} />
        <g className="wdg-gate">
          <rect x="191" y="168" width="32" height="32" rx="9" fill={C.dark} stroke={IN} strokeWidth="2" />
          <Lock x={201} y={175} color={IN} />
        </g>
        <text x="228" y="104" fontFamily="var(--body)" fontWeight="500" fontSize="16" fill={C.ink}>Support in</text>
        <text x="228" y="125" fontFamily="var(--body)" fontSize="14" fill={C.ink2}>only if a contract</text>
        <text x="228" y="143" fontFamily="var(--body)" fontSize="14" fill={C.ink2}>allows it</text>
        <Evidence id="sec.support-access" x={228} y={166} />
      </g>
    </svg>
  );
}

export function WhereDataGoes({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLElement>(0.2);
  const reduced = useReducedMotion();
  const motion = seen && !reduced;
  return (
    <figure ref={ref} className={`visual wdg${seen ? " in" : ""}`}>
      <Wide onPick={onPick} motion={motion} />
      <Tall onPick={onPick} motion={motion} />
      <figcaption className="wdg-hint">Only two arrows cross the line. Tap either one to read the licence clause behind it.</figcaption>
      <div className="tiles">
        <Tile id="what.not-saas" label="IOMETE does not host your data" onPick={onPick} />
        <Tile id="sec.at-rest" label="IOMETE does not hold your keys" onPick={onPick} />
        <Tile id="sec.telemetry" label="Usage data may leave" onPick={onPick} />
        <Tile id="sec.support-access" label="Support only if a contract allows" onPick={onPick} />
      </div>
    </figure>
  );
}
