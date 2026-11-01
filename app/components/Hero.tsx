"use client";
import { useEffect, useState } from "react";

export const CAPTIONS = [
  "IOMETE is a data lakehouse: one place to keep huge amounts of data cheaply and query it with SQL.",
  "It runs inside your infrastructure. Your servers or your cloud account, not a vendor's.",
  "So your data never leaves, and the bill does not grow with every query.",
];

/** Three beats, about 5 s each; the whole story fits in 15 seconds. Play, pause and replay like a short clip. */
export function useBeats(total = 3, ms = 5000) {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setBeat(total - 1); setPlaying(false); }
  }, [total]);
  useEffect(() => {
    if (!playing) return;
    if (beat >= total - 1) { const t = setTimeout(() => setPlaying(false), ms); return () => clearTimeout(t); }
    const t = setTimeout(() => setBeat((b) => Math.min(b + 1, total - 1)), ms);
    return () => clearTimeout(t);
  }, [beat, playing, total, ms]);
  const done = !playing && beat === total - 1;
  return {
    beat, playing, done, ms,
    setBeat: (b: number) => { setPlaying(false); setBeat(b); },
    toggle: () => { if (done) { setBeat(0); setPlaying(true); } else setPlaying((p) => !p); },
  };
}

/** Segmented progress: one bar per beat, the current one fills while playing. */
export function BeatBar({ labels, beat, playing, done, ms, setBeat, toggle }: {
  labels: string[]; beat: number; playing: boolean; done: boolean; ms: number;
  setBeat: (b: number) => void; toggle: () => void;
}) {
  return (
    <div className="beatbar">
      <button className="beat-toggle" onClick={toggle} aria-label={done ? "Replay" : playing ? "Pause" : "Play"}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="currentColor">
          {done ? <path d="M7 2a5 5 0 1 1-4.6 3H.8L3.4 2 6 5H4.2A3.4 3.4 0 1 0 7 3.6z" />
            : playing ? <><rect x="3" y="2" width="3" height="10" rx="1" /><rect x="8" y="2" width="3" height="10" rx="1" /></>
            : <path d="M4 2v10l8-5z" />}
        </svg>
      </button>
      <ol>
        {labels.map((l, i) => (
          <li key={i}>
            <button onClick={() => setBeat(i)} aria-current={beat === i ? "step" : undefined} aria-label={`Step ${i + 1}: ${l}`}>
              <span className="track"><span
                key={`${i}-${beat}-${playing}`}
                className={"fill" + (i < beat || (i === beat && !playing) ? " full" : i === beat ? " run" : "")}
                style={{ animationDuration: `${ms}ms` }} /></span>
              <span className="lbl">{l}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HeroDiagram({ beat }: { beat: number }) {
  const on = (from: number, delay = 0) => ({ opacity: beat >= from ? 1 : 0, transition: `opacity .9s ease ${delay}s` });
  const envs = [
    { x: 62, y: 96, label: "Your data center" },
    { x: 62, y: 250, label: "Your Azure" },
    { x: 302, y: 96, label: "Your AWS" },
    { x: 302, y: 250, label: "Your Google Cloud" },
  ];
  return (
    <svg className="hero-svg" viewBox="0 0 640 380" role="img"
      aria-label="IOMETE sits inside your infrastructure, connected to your data center and your cloud accounts. SaaS platforms outside it are cut off from your data.">
      <g style={on(1)}>
        <rect x="30" y="48" width="440" height="292" rx="10" fill="#e3f1e3" />
        <text x="46" y="38" fontFamily="var(--body)" fontSize="15" fill="#2d382d">Your infrastructure</text>
      </g>
      <g stroke="#2d382d" strokeOpacity=".3" strokeWidth="1.6" style={on(0)}>
        {envs.map((e) => <line key={e.label} x1="240" y1="194" x2={e.x + 66} y2={e.y + 17} />)}
      </g>
      {envs.map((e, i) => (
        <g key={e.label} style={on(0, 0.15 * i)}>
          <rect x={e.x} y={e.y} width="132" height="34" rx="8" fill="#ffffff" />
          <text x={e.x + 66} y={e.y + 21} textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill="#1d211d">{e.label}</text>
        </g>
      ))}
      <g>
        <polygon points="240,148 280,171 280,217 240,240 200,217 200,171" fill="#d3f52c" />
        <text x="240" y="199" textAnchor="middle" fontFamily="var(--display)" fontSize="15" fill="#202020">IOMETE</text>
      </g>
      <g style={on(2)}>
        {[110, 250].map((y, i) => (
          <g key={y}>
            <line x1="280" y1="194" x2="520" y2={y + 18} stroke="#8e8e8c" strokeWidth="1.2" strokeDasharray="4 5" className="flow" />
            <rect x="520" y={y} width="104" height="36" rx="8" fill="#e6e6e0" />
            <text x="572" y={y + 22} textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill="#5a5f59">{i ? "Other SaaS" : "SaaS platform"}</text>
          </g>
        ))}
      </g>
      <g stroke="#ed7e68" strokeWidth="3" strokeLinecap="round">
        {[142, 252].map((y) => (
          <g key={y} style={{ ...on(2, 0.8), transform: beat >= 2 ? "scale(1)" : "scale(.2)", transformOrigin: `470px ${y}px`, transitionProperty: "opacity, transform" }}>
            <line x1="460" y1={y - 10} x2="480" y2={y + 10} />
            <line x1="480" y1={y - 10} x2="460" y2={y + 10} />
          </g>
        ))}
      </g>
    </svg>
  );
}
