"use client";
import { useEffect, useRef, useState } from "react";
import type { Pick } from "./shared";

/* ---------- pricing, straight from content/facts.json (price.free / price.enterprise / price.bc) ---------- */
export const FREE_MAX = 100;        // price.free: "Max 100 vCPUs", $0
export const PER_VCPU = 500;        // price.enterprise: "$500 license cost per vCPU per year"
export const FLOOR = 100_000;       // price.enterprise: "$100,000 per year (200 vCPU) minimum commitment"
export const FLOOR_VCPU = 200;
export const BC_MIN = 250_000;      // price.bc: "$250,000 per year minimum commitment"
export const X_MAX = 1000;
export const Y_MAX = 500_000;

export const licence = (v: number) => (v <= FREE_MAX ? 0 : Math.max(v * PER_VCPU, FLOOR));
export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const kfmt = (n: number) => (n === 0 ? "$0" : "$" + n / 1000 + "K");

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Width of an element, kept current. The chart draws in real pixels so its text never shrinks below 12px. */
export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    setW(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/** A number that glides to its target (ease-out). Snaps when reduced motion is on. */
export function useTween(target: number, ms = 520) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  const cur = useRef(target);
  useEffect(() => {
    if (reduced()) { cur.current = target; setV(target); return; }
    from.current = cur.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      cur.current = from.current + (target - from.current) * e;
      setV(cur.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

const key = (fn: () => void) => (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } };

/**
 * Licence cost (y) against vCPUs (x). Free band, the $100K floor, the $500/vCPU line, the
 * Business Critical $250K minimum. Drag or tap anywhere on the plot to move the marker.
 */
export function CostChart({ width, vcpu, setVcpu, onPick, seen, focus }: {
  width: number; vcpu: number; setVcpu: (v: number) => void; onPick: Pick; seen: boolean; focus: string | null;
}) {
  const narrow = width < 560;
  const W = Math.max(width, 300);
  const H = narrow ? 270 : 360;
  const padL = narrow ? 46 : 58, padR = narrow ? 12 : 20, padT = 34, padB = 34;
  const pw = W - padL - padR, ph = H - padT - padB;
  const x = (v: number) => padL + (v / X_MAX) * pw;
  const y = (d: number) => padT + (1 - d / Y_MAX) * ph;
  const [hover, setHover] = useState<number | null>(null);
  const drag = useRef(false);

  const toV = (e: React.PointerEvent) => {
    const r = (e.currentTarget as SVGElement).getBoundingClientRect();
    const v = ((e.clientX - r.left - padL) / pw) * X_MAX;
    return Math.min(X_MAX, Math.max(10, Math.round(v / 10) * 10));
  };

  const line = `M${x(FLOOR_VCPU)},${y(FLOOR)} L${x(X_MAX)},${y(X_MAX * PER_VCPU)}`;
  const curve = `M${x(0)},${y(0)} L${x(FREE_MAX)},${y(0)} M${x(FREE_MAX)},${y(FLOOR)} L${x(FLOOR_VCPU)},${y(FLOOR)} ` + line.replace("M", "L");
  const area = `M${x(FREE_MAX)},${y(0)} L${x(FREE_MAX)},${y(FLOOR)} L${x(FLOOR_VCPU)},${y(FLOOR)} L${x(X_MAX)},${y(X_MAX * PER_VCPU)} L${x(X_MAX)},${y(0)} Z`;
  const floorGap = `M${x(FREE_MAX)},${y(FLOOR)} L${x(FLOOR_VCPU)},${y(FLOOR)} L${x(FREE_MAX)},${y(FREE_MAX * PER_VCPU)} Z`;

  const mv = vcpu, ml = licence(mv);
  const mx = x(mv), my = y(ml);
  const label = `${mv.toLocaleString("en-US")} vCPUs · ${money(ml)}`;
  const lw = label.length * 7.4 + 20;
  // bubble sits up-left of the dot (clear of a line that rises to the right); flips right-below near the left edge
  const flip = mx - 12 - lw < padL + 4;
  const lx = flip ? Math.min(mx + 14, W - padR - lw) : mx - 12 - lw;
  const ly = flip ? my + 10 : Math.max(padT - 2, my - 36);

  const hv = hover !== null && hover !== mv ? hover : null;
  const xt = narrow ? [0, 250, 500, 750, 1000] : [0, 200, 400, 600, 800, 1000];
  const yt = [0, 100_000, 200_000, 300_000, 400_000, 500_000];
  const dim = (k: string) => (focus && focus !== k ? " is-dim" : focus === k ? " is-on" : "");

  return (
    <svg
      className={`cost-chart${seen ? " is-seen" : ""}`}
      width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Licence cost per year by vCPUs. Free up to 100 vCPUs. Above that Enterprise at $500 per vCPU per year with a $100,000 minimum, reached at 200 vCPUs. Business Critical minimum $250,000. Marker at ${label}.`}
      onPointerDown={(e) => { drag.current = true; (e.currentTarget as SVGElement).setPointerCapture(e.pointerId); setVcpu(toV(e)); }}
      onPointerMove={(e) => { const v = toV(e); if (drag.current) setVcpu(v); else if (e.pointerType === "mouse") setHover(v); }}
      onPointerUp={() => { drag.current = false; }}
      onPointerCancel={() => { drag.current = false; }}
      onPointerLeave={() => setHover(null)}
    >
      <defs>
        <pattern id="cost-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--lime)" strokeWidth="1.6" strokeOpacity=".55" />
        </pattern>
        <linearGradient id="cost-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--lime)" stopOpacity=".22" />
          <stop offset="1" stopColor="var(--lime)" stopOpacity=".02" />
        </linearGradient>
      </defs>

      {/* grid + axes */}
      {yt.map((t) => (
        <g key={t} className="cc-grid">
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} />
          <text x={padL - 8} y={y(t) + 4} textAnchor="end">{kfmt(t)}</text>
        </g>
      ))}
      {xt.map((t) => (
        <text key={t} className="cc-tick" x={x(t)} y={H - padB + 20} textAnchor={t === 0 ? "start" : t === X_MAX ? "end" : "middle"}>{t.toLocaleString("en-US")}</text>
      ))}
      {!narrow && <text className="cc-axis" x={W - padR} y={padT - 14} textAnchor="end">licence per year</text>}

      {/* Free band */}
      <g className={"cc-hit" + dim("free")} role="button" tabIndex={0} aria-label="Free plan: $0 up to 100 vCPUs" onClick={() => onPick("price.free")} onKeyDown={key(() => onPick("price.free"))} onPointerDown={(e) => e.stopPropagation()}>
        <rect className="cc-free" x={x(0)} y={padT} width={x(FREE_MAX) - x(0)} height={ph} rx="6" />
        <text className="cc-ann" x={(x(0) + x(FREE_MAX)) / 2} y={padT - 12} textAnchor="middle">Free</text>
        <text className="cc-ann-sub" x={(x(0) + x(FREE_MAX)) / 2} y={y(0) - 10} textAnchor="middle">$0</text>
      </g>

      {/* area + the floor's "pay for 200" wedge */}
      <path className="cc-area" d={area} fill="url(#cost-area)" />
      <path className={"cc-wedge" + dim("floor")} d={floorGap} fill="url(#cost-hatch)" />

      {/* Business Critical minimum */}
      <g className={"cc-hit" + dim("bc")} role="button" tabIndex={0} aria-label="Business Critical: custom price, $250,000 per year minimum" onClick={() => onPick("price.bc")} onKeyDown={key(() => onPick("price.bc"))} onPointerDown={(e) => e.stopPropagation()}>
        <line className="cc-bc-hit" x1={padL} x2={W - padR} y1={y(BC_MIN)} y2={y(BC_MIN)} />
        <line className="cc-bc" x1={padL} x2={W - padR} y1={y(BC_MIN)} y2={y(BC_MIN)} />
        <text className="cc-ann" x={W - padR - 4} y={y(BC_MIN) + 20} textAnchor="end">{narrow ? "Business Critical min." : "Business Critical minimum, $250K"}</text>
      </g>

      {/* the licence line */}
      <path className="cc-line" d={curve} pathLength={1} />
      <line className="cc-jump" x1={x(FREE_MAX)} x2={x(FREE_MAX)} y1={y(0)} y2={y(FLOOR)} />

      {/* $100K floor */}
      <g className={"cc-hit" + dim("floor")} role="button" tabIndex={0} aria-label="Enterprise minimum: $100,000 per year, 200 vCPUs" onClick={() => onPick("price.enterprise")} onKeyDown={key(() => onPick("price.enterprise"))} onPointerDown={(e) => e.stopPropagation()}>
        <circle className="cc-hitpad" cx={x(FLOOR_VCPU)} cy={y(FLOOR)} r="18" />
        <circle className="cc-node" cx={x(FLOOR_VCPU)} cy={y(FLOOR)} r="5" />
        <text className="cc-ann" x={x(FLOOR_VCPU) + 10} y={y(FLOOR) + 22}>{narrow ? "$100K min." : "$100K minimum = 200 vCPUs"}</text>
      </g>
      {!narrow && (
        <g className={"cc-hit" + dim("rate")} role="button" tabIndex={0} aria-label="Enterprise: $500 per vCPU per year" onClick={() => onPick("price.enterprise")} onKeyDown={key(() => onPick("price.enterprise"))} onPointerDown={(e) => e.stopPropagation()}>
          <text className="cc-ann cc-rate" x={x(720)} y={y(720 * PER_VCPU) - 14} textAnchor="end">+$500 per vCPU</text>
        </g>
      )}

      {/* hover ghost */}
      {hv !== null && (
        <g className="cc-ghost" pointerEvents="none">
          <line x1={x(hv)} x2={x(hv)} y1={padT} y2={y(0)} />
          <circle cx={x(hv)} cy={y(licence(hv))} r="4" />
          <text x={Math.min(Math.max(x(hv), padL + 40), W - padR - 40)} y={H - 4} textAnchor="middle">{hv} → {money(licence(hv))}</text>
        </g>
      )}

      {/* marker */}
      <g className="cc-marker" pointerEvents="none" style={{ transform: `translateX(${mx}px)` }}>
        <line x1={0} x2={0} y1={padT} y2={y(0)} />
      </g>
      <circle className="cc-dot" cx={mx} cy={my} r="7" pointerEvents="none" />
      {!narrow && (
        <g pointerEvents="none" className="cc-bubble">
          <rect x={lx} y={ly} width={lw} height={26} rx={13} />
          <text x={lx + lw / 2} y={ly + 17.5} textAnchor="middle">{label}</text>
        </g>
      )}
      {narrow && Math.abs(mx - (x(0) + x(FREE_MAX)) / 2) > 34 && <text className="cc-mtop" x={Math.min(Math.max(mx, padL + 16), W - padR - 16)} y={padT - 12} textAnchor="middle" pointerEvents="none">{mv}</text>}
    </svg>
  );
}
