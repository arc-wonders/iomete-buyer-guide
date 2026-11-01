"use client";
import { useEffect, useState } from "react";
import { useInView, type Pick } from "./shared";

/**
 * The install story, drawn twice (wide and narrow) so text stays readable on phones.
 * When scrolled into view it plays: Helm chart -> control plane -> data planes -> your stores.
 * Timing lives in CSS (styles/what-gets-installed.css) via the --d delay on each step.
 */

const PLANES = ["Production", "Testing", "Another team"];

/** A clickable SVG group that behaves like a button and opens a statement. */
function Hit({ id, onPick, label, children, className = "", d }: {
  id: string; onPick: Pick; label: string; children: React.ReactNode; className?: string; d?: number;
}) {
  return (
    <g
      className={`wgi-hit ${className}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      style={d !== undefined ? st(d) : undefined}
      onClick={() => onPick(id)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(id); } }}
    >
      {children}
    </g>
  );
}

const PACE = 0.7; // whole story plays in about 2 seconds
const st = (d: number) => ({ "--d": `${(d * PACE).toFixed(2)}s` } as React.CSSProperties);
const MONO = "var(--font-mono), ui-monospace, monospace";
const BODY = "var(--body)";

function Badge({ x, y, n, dark = false }: { x: number; y: number; n: string; dark?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill={dark ? "#d3f52c" : "#2d382d"} />
      <text x={x} y={y + 4} textAnchor="middle" fontFamily={MONO} fontSize="12" fill={dark ? "#202020" : "#d3f52c"}>{n}</text>
    </g>
  );
}

function Wide({ onPick }: { onPick: Pick }) {
  const cx = [180, 520, 860];
  return (
    <svg className="wgi-wide" viewBox="0 0 1040 560" role="img"
      aria-label="One Helm chart installs into your Kubernetes: one IOMETE control plane, then a data plane per environment, each running Spark and SQL. Your object store and PostgreSQL stay yours.">
      <defs>
        <marker id="wgi-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="#2d382d" />
        </marker>
        <filter id="wgi-sh" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1d211d" floodOpacity=".08" />
        </filter>
        <pattern id="wgi-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#d9d3cc" />
        </pattern>
      </defs>

      {/* 1. Helm chart */}
      <Hit id="deploy.time" onPick={onPick} label="Helm chart install: about 25 minutes" className="wgi-a wgi-helm" d={0}>
        <rect x="405" y="8" width="230" height="52" rx="12" fill="#202020" />
        <g transform="translate(432 34)" stroke="#d3f52c" strokeWidth="1.6" fill="none">
          <circle r="9" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1="0" y1="0" x2={(9 * Math.cos((a * Math.PI) / 180)).toFixed(2)} y2={(9 * Math.sin((a * Math.PI) / 180)).toFixed(2)} />
          ))}
        </g>
        <text x="452" y="39" fontFamily={MONO} fontSize="15" fill="#fff">helm install</text>
        <text x="576" y="39" fontFamily={MONO} fontSize="12" fill="#d3f52c">iomete</text>
        <Badge x={405} y={8} n="1" dark />
        <text x="655" y="30" fontFamily={MONO} fontSize="12" fill="#8e8e8c" letterSpacing=".06em">ONE HELM CHART</text>
        <text x="670" y="50" fontFamily={BODY} fontSize="13" fill="#5a5f59">~25 min cloud install</text>
      </Hit>

      {/* Your Kubernetes frame */}
      <g className="wgi-a wgi-frame" style={st(0.35)}>
        <rect x="8" y="90" width="1024" height="330" rx="18" fill="#f2eeeb" />
        <rect x="8" y="90" width="1024" height="330" rx="18" fill="url(#wgi-grid)" opacity=".7" />
        <rect x="8.5" y="90.5" width="1023" height="329" rx="18" fill="none" stroke="#d9d3cc" />
      </g>
      <Hit id="deploy.models" onPick={onPick} label="Your Kubernetes: EKS, AKS, GKE, OpenShift, Tanzu" className="wgi-a" d={0.45}>
        <text x="32" y="122" fontFamily={MONO} fontSize="12" fill="#2d382d" letterSpacing=".08em">YOUR KUBERNETES</text>
        <text x="32" y="142" fontFamily={BODY} fontSize="13" fill="#8e8e8c">EKS · AKS · GKE · OpenShift · Tanzu</text>
      </Hit>

      <path className="wgi-draw" style={st(0.3)} d="M520 60 V108" stroke="#2d382d" strokeWidth="1.6" fill="none" markerEnd="url(#wgi-arr)" pathLength={1} />

      {/* 2. Control plane */}
      <Hit id="arch.planes" onPick={onPick} label="Control plane: one, manages the data planes (since v4.0.0)" className="wgi-a wgi-pop" d={0.7}>
        <rect x="392" y="112" width="256" height="70" rx="14" fill="#2d382d" filter="url(#wgi-sh)" />
        <text x="520" y="143" textAnchor="middle" fontFamily={BODY} fontSize="18" fill="#fff">Control plane</text>
        <text x="520" y="166" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="#d3f52c">one · manages every data plane</text>
        <Badge x={392} y={112} n="2" dark />
      </Hit>

      {/* control plane -> data planes */}
      {cx.map((x, i) => (
        <g key={x}>
          <path className="wgi-draw" style={st(1.05 + i * 0.12)} d={`M520 182 C520 205 ${x} 196 ${x} 224`} stroke="#2d382d" strokeWidth="1.4" fill="none" pathLength={1} />
          <path className="wgi-flow" style={st(2.6)} d={`M520 182 C520 205 ${x} 196 ${x} 224`} stroke="#d3f52c" strokeWidth="2.4" fill="none" />
        </g>
      ))}

      {/* 3. Data planes */}
      {PLANES.map((name, i) => {
        const x = cx[i] - 160;
        const d = 1.3 + i * 0.18;
        return (
          <g key={name}>
            <g className="wgi-a wgi-pop" style={st(d)}>
              <rect x={x} y="224" width="320" height="172" rx="14" fill="#fff" filter="url(#wgi-sh)" />
              <text x={x + 20} y="252" fontFamily={MONO} fontSize="12" fill="#8e8e8c" letterSpacing=".08em">DATA PLANE</text>
              <text x={x + 300} y="252" textAnchor="end" fontFamily={BODY} fontSize="14" fill="#1d211d">{name}</text>
              {i === 0 && <Badge x={x} y={224} n="3" />}
            </g>
            <Hit id="arch.version" onPick={onPick} label={`${name}: Spark 3.5 and Spark 4 images`} className="wgi-a wgi-pop" d={d + 0.25}>
              <rect x={x + 16} y="268" width="140" height="110" rx="10" fill="#d3f52c" />
              <text x={x + 32} y="298" fontFamily={BODY} fontSize="18" fill="#1d211d">Spark</text>
              <text x={x + 32} y="318" fontFamily={MONO} fontSize="12" fill="#2d382d">3.5 · 4.1 images</text>
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} className="wgi-exec" style={st(k * 0.25 + i * 0.4)} x={x + 32 + k * 28} y="340" width="20" height="20" rx="4" fill="#2d382d" />
              ))}
            </Hit>
            <Hit id="arch.endpoints" onPick={onPick} label={`${name}: SQL endpoints, JDBC/ODBC, Spark Connect, Arrow Flight`} className="wgi-a wgi-pop" d={d + 0.35}>
              <rect x={x + 164} y="268" width="140" height="110" rx="10" fill="#eef9b8" />
              <text x={x + 180} y="298" fontFamily={BODY} fontSize="18" fill="#1d211d">SQL</text>
              <text x={x + 180} y="318" fontFamily={MONO} fontSize="12" fill="#2d382d">endpoints</text>
              <text x={x + 180} y="346" fontFamily={MONO} fontSize="12" fill="#5a5f59">JDBC · ODBC</text>
              <text x={x + 180} y="364" fontFamily={MONO} fontSize="12" fill="#5a5f59">Arrow Flight</text>
            </Hit>
            {/* data plane -> your stores */}
            <path className="wgi-draw" style={st(2.2 + i * 0.08)} d={`M${cx[i]} 396 V470`} stroke="#4e664e" strokeWidth="1.4" strokeDasharray="0" fill="none" pathLength={1} />
            <path className="wgi-flow wgi-flow-down" style={st(2.8)} d={`M${cx[i]} 396 V470`} stroke="#4e664e" strokeWidth="2.4" fill="none" />
          </g>
        );
      })}

      {/* Yours */}
      <g className="wgi-a wgi-yours" style={st(2.3)}>
        <text x="20" y="452" fontFamily={MONO} fontSize="12" fill="#4e664e" letterSpacing=".08em">ALREADY YOURS</text>
        <line x1="134" y1="448" x2="1032" y2="448" stroke="#4e664e" strokeDasharray="2 5" strokeLinecap="round" />
      </g>
      <Hit id="deploy.storage" onPick={onPick} label="Your object store: S3, Azure Blob or ADLS, GCS, MinIO, Dell ECS, Ozone, IBM COS" className="wgi-a wgi-yours" d={2.45}>
        <rect x="8" y="470" width="672" height="82" rx="14" fill="#e3f1e3" stroke="#4e664e" strokeWidth="1.5" />
        <g transform="translate(40 511)" fill="none" stroke="#2d382d" strokeWidth="1.6">
          <ellipse cx="0" cy="-12" rx="14" ry="5" />
          <path d="M-14 -12 V12 a14 5 0 0 0 28 0 V-12" />
          <path d="M-14 0 a14 5 0 0 0 28 0" />
        </g>
        <text x="72" y="505" fontFamily={BODY} fontSize="18" fill="#2d382d">Your object store</text>
        <text x="72" y="528" fontFamily={MONO} fontSize="12" fill="#4e664e">S3 · ADLS · GCS · MinIO · Dell ECS · Ozone · IBM COS</text>
      </Hit>
      <g className="wgi-a wgi-yours" style={st(2.55)}>
        <rect x="696" y="470" width="336" height="82" rx="14" fill="#e3f1e3" stroke="#4e664e" strokeWidth="1.5" />
        <g transform="translate(728 511)" fill="none" stroke="#2d382d" strokeWidth="1.6">
          <rect x="-13" y="-14" width="26" height="28" rx="4" />
          <path d="M-13 -4 H13 M-13 6 H13" />
        </g>
        <text x="760" y="505" fontFamily={BODY} fontSize="18" fill="#2d382d">Your PostgreSQL</text>
        <text x="760" y="528" fontFamily={MONO} fontSize="12" fill="#4e664e">keeps the metadata</text>
      </g>
    </svg>
  );
}

function Narrow({ onPick }: { onPick: Pick }) {
  return (
    <svg className="wgi-narrow" viewBox="0 0 360 700" role="img"
      aria-label="One Helm chart installs into your Kubernetes: one IOMETE control plane, then a data plane per environment, each running Spark and SQL. Your object store and PostgreSQL stay yours.">
      <defs>
        <marker id="wgi-arr-n" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="#2d382d" />
        </marker>
      </defs>
      <Hit id="deploy.time" onPick={onPick} label="Helm chart install: about 25 minutes" className="wgi-a wgi-helm" d={0}>
        <rect x="70" y="10" width="220" height="48" rx="12" fill="#202020" />
        <text x="180" y="40" textAnchor="middle" fontFamily={MONO} fontSize="15" fill="#fff">helm install <tspan fill="#d3f52c">iomete</tspan></text>
        <Badge x={70} y={10} n="1" dark />
        <text x="206" y="92" fontFamily={BODY} fontSize="13" fill="#5a5f59">~25 min</text>
      </Hit>
      <path className="wgi-draw" style={st(0.3)} d="M180 58 V126" stroke="#2d382d" strokeWidth="1.6" fill="none" markerEnd="url(#wgi-arr-n)" pathLength={1} />

      <g className="wgi-a wgi-frame" style={st(0.35)}>
        <rect x="2" y="96" width="356" height="452" rx="16" fill="#f2eeeb" stroke="#d9d3cc" />
      </g>
      <Hit id="deploy.models" onPick={onPick} label="Your Kubernetes: EKS, AKS, GKE, OpenShift, Tanzu" className="wgi-a" d={0.45}>
        <text x="18" y="118" fontFamily={MONO} fontSize="12" fill="#2d382d" letterSpacing=".08em">YOUR K8S</text>
      </Hit>

      <Hit id="arch.planes" onPick={onPick} label="Control plane: one, manages the data planes (since v4.0.0)" className="wgi-a wgi-pop" d={0.7}>
        <rect x="18" y="130" width="324" height="64" rx="12" fill="#2d382d" />
        <text x="180" y="158" textAnchor="middle" fontFamily={BODY} fontSize="17" fill="#fff">Control plane</text>
        <text x="180" y="180" textAnchor="middle" fontFamily={MONO} fontSize="12" fill="#d3f52c">one · manages every data plane</text>
        <Badge x={18} y={130} n="2" dark />
      </Hit>

      {PLANES.map((name, i) => {
        const y = 222 + i * 108;
        const d = 1.2 + i * 0.2;
        return (
          <g key={name}>
            <path className="wgi-draw" style={st(1.0 + i * 0.12)} d={`M30 194 V${y + 46} H38`} stroke="#2d382d" strokeWidth="1.4" fill="none" pathLength={1} />
            <g className="wgi-a wgi-pop" style={st(d)}>
              <rect x="38" y={y} width="306" height="96" rx="12" fill="#fff" />
              <text x="52" y={y + 22} fontFamily={MONO} fontSize="12" fill="#8e8e8c" letterSpacing=".06em">DATA PLANE</text>
              <text x="332" y={y + 22} textAnchor="end" fontFamily={BODY} fontSize="14" fill="#1d211d">{name}</text>
              {i === 0 && <Badge x={38} y={y} n="3" />}
            </g>
            <Hit id="arch.version" onPick={onPick} label={`${name}: Spark 3.5 and Spark 4 images`} className="wgi-a wgi-pop" d={d + 0.2}>
              <rect x="50" y={y + 34} width="138" height="50" rx="8" fill="#d3f52c" />
              <text x="62" y={y + 56} fontFamily={BODY} fontSize="16" fill="#1d211d">Spark</text>
              <text x="62" y={y + 75} fontFamily={MONO} fontSize="12" fill="#2d382d">3.5 · 4.1</text>
              {[0, 1, 2].map((k) => (
                <rect key={k} className="wgi-exec" style={st(k * 0.25 + i * 0.4)} x={130 + k * 17} y={y + 42} width="12" height="12" rx="3" fill="#2d382d" />
              ))}
            </Hit>
            <Hit id="arch.endpoints" onPick={onPick} label={`${name}: SQL endpoints, JDBC/ODBC, Spark Connect, Arrow Flight`} className="wgi-a wgi-pop" d={d + 0.3}>
              <rect x="194" y={y + 34} width="138" height="50" rx="8" fill="#eef9b8" />
              <text x="206" y={y + 56} fontFamily={BODY} fontSize="16" fill="#1d211d">SQL</text>
              <text x="206" y={y + 75} fontFamily={MONO} fontSize="12" fill="#2d382d">JDBC · Flight</text>
            </Hit>
          </g>
        );
      })}

      <path className="wgi-draw" style={st(2.1)} d="M180 548 V586" stroke="#4e664e" strokeWidth="1.4" fill="none" pathLength={1} />
      <path className="wgi-flow wgi-flow-down" style={st(2.8)} d="M180 548 V586" stroke="#4e664e" strokeWidth="2.4" fill="none" />
      <g className="wgi-a wgi-yours" style={st(2.2)}>
        <text x="4" y="576" fontFamily={MONO} fontSize="12" fill="#4e664e" letterSpacing=".08em">ALREADY YOURS</text>
      </g>
      <Hit id="deploy.storage" onPick={onPick} label="Your object store: S3, Azure Blob or ADLS, GCS, MinIO, Dell ECS, Ozone, IBM COS" className="wgi-a wgi-yours" d={2.35}>
        <rect x="2" y="590" width="174" height="104" rx="12" fill="#e3f1e3" stroke="#4e664e" strokeWidth="1.5" />
        <text x="16" y="620" fontFamily={BODY} fontSize="16" fill="#2d382d">Your object</text>
        <text x="16" y="640" fontFamily={BODY} fontSize="16" fill="#2d382d">store</text>
        <text x="16" y="664" fontFamily={MONO} fontSize="12" fill="#4e664e">S3 · ADLS · GCS</text>
        <text x="16" y="682" fontFamily={MONO} fontSize="12" fill="#4e664e">MinIO · ECS …</text>
      </Hit>
      <g className="wgi-a wgi-yours" style={st(2.45)}>
        <rect x="184" y="590" width="174" height="104" rx="12" fill="#e3f1e3" stroke="#4e664e" strokeWidth="1.5" />
        <text x="198" y="620" fontFamily={BODY} fontSize="16" fill="#2d382d">Your</text>
        <text x="198" y="640" fontFamily={BODY} fontSize="16" fill="#2d382d">PostgreSQL</text>
        <text x="198" y="664" fontFamily={MONO} fontSize="12" fill="#4e664e">keeps the</text>
        <text x="198" y="682" fontFamily={MONO} fontSize="12" fill="#4e664e">metadata</text>
      </g>
    </svg>
  );
}

export function InstallDiagram({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [run, setRun] = useState(0);
  // once the story has played, pin the final frame (so relayouts or captures never catch it mid-way)
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!seen) return;
    setDone(false);
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, [seen, run]);
  return (
    <div ref={ref} className={`wgi-diagram${seen ? " is-on" : ""}${done ? " is-done" : ""}`} key={run}>
      <Wide onPick={onPick} />
      <Narrow onPick={onPick} />
      <button className="wgi-replay" onClick={() => { setDone(false); setRun((r) => r + 1); }} aria-label="Replay the install animation">
        <span aria-hidden="true">↻</span> Replay install
      </button>
    </div>
  );
}
