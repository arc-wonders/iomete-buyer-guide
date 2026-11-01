/**
 * Small pictures for the six question cards on the landing: a glimpse of what each answer page shows.
 * Decorative (the card's button carries the words), no text inside so they stay legible at any size.
 * Animations are CSS (styles/landing.css, .mini-*) and start when the card scrolls into view.
 */
const LIME = "#d3f52c", GREEN = "#2d382d", REEF = "#ed7e68", STONE = "#d8d2cb", LAKE = "#6f9fd8";

const hexPts = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(" ");

function WhereDataGoes() {
  return <>
    <rect x="8" y="12" width="112" height="86" rx="14" fill={LIME} fillOpacity=".14" stroke={GREEN} strokeWidth="1.6" className="m-draw" pathLength={1} />
    <ellipse cx="64" cy="55" rx="40" ry="26" fill="none" stroke={GREEN} strokeOpacity=".18" strokeWidth="1.2" />
    <ellipse cx="64" cy="55" rx="40" ry="26" fill="none" stroke={GREEN} strokeWidth="3.2" strokeLinecap="round" strokeDasharray="0 15.6" className="m-orbit" />
    <polygon points={hexPts(64, 58, 15)} fill="#9db21f" />
    <polygon points={hexPts(64, 55, 15)} fill={LIME} stroke={GREEN} strokeWidth="1.2" />
    <line x1="152" y1="55" x2="122" y2="55" stroke="#9a9e97" strokeWidth="1.6" strokeDasharray="3 4" />
    <path d="M142 66h10a5 5 0 0 0 .4-10 7 7 0 0 0-13.4-2 5.4 5.4 0 0 0 3 12z" fill="#ece8e3" stroke="#9a9e97" strokeWidth="1.3" transform="translate(-4 -14)" />
    <g className="m-pop" style={{ animationDelay: ".7s" }}>
      <circle cx="121" cy="55" r="8" fill="#fff" stroke={REEF} strokeWidth="1.8" />
      <path d="M118 52l6 6m0-6l-6 6" stroke={REEF} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </>;
}

function SecurityReview() {
  return <>
    {Array.from({ length: 15 }, (_, i) => {
      const col = i % 5, row = Math.floor(i / 5), x = 24 + col * 28, y = 22 + row * 31, ok = i < 8;
      return (
        <g key={i} className="m-pop" style={{ animationDelay: `${0.05 * i}s` }}>
          {ok
            ? <><circle cx={x} cy={y} r="11" fill={GREEN} /><path d={`M${x - 4.5},${y}l3,3 6,-6`} fill="none" stroke={LIME} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
            : <><circle cx={x} cy={y} r="10" fill="#fff" stroke={REEF} strokeWidth="2" /><circle cx={x} cy={y + 4} r="1.3" fill={REEF} /><path d={`M${x - 2.6},${y - 3}a2.6 2.6 0 1 1 3.4 2.5c-.8.3-.8.8-.8 1.5`} fill="none" stroke={REEF} strokeWidth="1.6" strokeLinecap="round" /></>}
        </g>
      );
    })}
  </>;
}

function WhatItCosts() {
  // 20 vCPU chips in two rows: the $100,000 minimum is 200 vCPUs at $500 each.
  return <>
    {Array.from({ length: 20 }, (_, i) => {
      const col = i % 10, row = Math.floor(i / 10), x = 8 + col * 15, y = 34 + row * 30;
      return (
        <g key={i} className="m-fill" style={{ animationDelay: `${0.06 * i}s` }}>
          <rect x={x} y={y} width="11" height="20" rx="2.5" />
          <path d={`M${x + 3},${y - 3}v3m5,-3v3M${x + 3},${y + 20}v3m5,-3v3`} stroke={GREEN} strokeOpacity=".45" strokeWidth="1.2" />
        </g>
      );
    })}
    <line x1="4" y1="96" x2="156" y2="96" stroke={GREEN} strokeWidth="1.6" />
    <path d="M156 90v12" stroke={GREEN} strokeWidth="1.6" />
    <path d="M4 90v12" stroke={GREEN} strokeWidth="1.6" />
  </>;
}

function WhyNotSaas() {
  const cube = (x: number, y: number, c: string) => <g>
    <polygon points={`${x},${y - 9} ${x + 10},${y - 4} ${x},${y + 1} ${x - 10},${y - 4}`} fill={c} />
    <polygon points={`${x - 10},${y - 4} ${x},${y + 1} ${x},${y + 12} ${x - 10},${y + 7}`} fill={c} fillOpacity=".75" />
    <polygon points={`${x + 10},${y - 4} ${x},${y + 1} ${x},${y + 12} ${x + 10},${y + 7}`} fill={c} fillOpacity=".55" />
  </g>;
  return <>
    {/* theirs: your data inside a vendor's cloud */}
    <path d="M14 82h50a16 16 0 0 0 2-32 24 24 0 0 0-45-6 18 18 0 0 0-7 38z" fill="#ece8e3" stroke="#9a9e97" strokeWidth="1.4" />
    <g className="m-slide-l">{cube(40, 60, LAKE)}</g>
    <path d="M82 52h14m-5-5 5 5-5 5M96 64H82m5 5-5-5 5-5" fill="none" stroke={GREEN} strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* yours: their software inside your walls */}
    <rect x="104" y="22" width="52" height="66" rx="10" fill={LIME} fillOpacity=".18" stroke={GREEN} strokeWidth="1.6" />
    <g className="m-slide-r">
      <polygon points={hexPts(130, 45, 10)} fill={LIME} stroke={GREEN} strokeWidth="1.2" />
      {cube(130, 70, LAKE)}
    </g>
  </>;
}

function WhatGetsInstalled() {
  const spokes = Array.from({ length: 7 }, (_, i) => { const a = (i * 2 * Math.PI) / 7 - Math.PI / 2; return `M${22 + 9 * Math.cos(a)},${55 + 9 * Math.sin(a)}L${22 + 17 * Math.cos(a)},${55 + 17 * Math.sin(a)}`; }).join("");
  return <>
    <g className="m-spin">
      <circle cx="22" cy="55" r="14" fill="none" stroke={GREEN} strokeWidth="2" />
      <circle cx="22" cy="55" r="5" fill={GREEN} />
      <path d={spokes} stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" />
    </g>
    <path d="M42 55h20" stroke={GREEN} strokeWidth="1.6" className="m-draw" pathLength={1} />
    <rect x="62" y="40" width="34" height="30" rx="6" fill={GREEN} className="m-pop" style={{ animationDelay: ".3s" }} />
    <polygon points={hexPts(79, 55, 7)} fill={LIME} className="m-pop" style={{ animationDelay: ".4s" }} />
    {[20, 55, 90].map((y, i) => (
      <g key={y}>
        <path d={`M96 55C112 55 112 ${y} 124 ${y}`} fill="none" stroke={GREEN} strokeWidth="1.4" className="m-draw" pathLength={1} style={{ animationDelay: `${0.5 + i * 0.12}s` }} />
        <rect x="124" y={y - 11} width="32" height="22" rx="5" fill={LIME} stroke={GREEN} strokeWidth="1.4" className="m-pop" style={{ animationDelay: `${0.7 + i * 0.12}s` }} />
      </g>
    ))}
  </>;
}

function HowHardToRun() {
  const c = 2 * Math.PI * 36;
  return <>
    <circle cx="56" cy="56" r="36" fill="none" stroke={STONE} strokeWidth="9" />
    <circle cx="56" cy="56" r="36" fill="none" stroke={GREEN} strokeWidth="9" strokeLinecap="round"
      strokeDasharray={`${c * 25 / 60} ${c}`} transform="rotate(-90 56 56)" className="m-arc" style={{ ["--c" as string]: c }} />
    <line x1="56" y1="56" x2="56" y2="30" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" className="m-hand" />
    <circle cx="56" cy="56" r="3.5" fill={GREEN} />
    {/* Kubernetes-style wheel: the skill it takes */}
    <g transform="translate(128 56)">
      <polygon points={Array.from({ length: 7 }, (_, i) => { const a = (i * 2 * Math.PI) / 7 - Math.PI / 2; return `${(22 * Math.cos(a)).toFixed(1)},${(22 * Math.sin(a)).toFixed(1)}`; }).join(" ")} fill={LAKE} />
      <g className="m-spin">
        <circle r="8" fill="none" stroke="#fff" strokeWidth="2" />
        <path d={Array.from({ length: 7 }, (_, i) => { const a = (i * 2 * Math.PI) / 7 - Math.PI / 2; return `M${(3 * Math.cos(a)).toFixed(1)},${(3 * Math.sin(a)).toFixed(1)}L${(14 * Math.cos(a)).toFixed(1)},${(14 * Math.sin(a)).toFixed(1)}`; }).join("")} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  </>;
}

const MINIS: Record<string, () => React.ReactNode> = {
  "where-data-goes": WhereDataGoes,
  "security-review": SecurityReview,
  "what-it-costs": WhatItCosts,
  "why-not-saas": WhyNotSaas,
  "what-gets-installed": WhatGetsInstalled,
  "how-hard-to-run": HowHardToRun,
};

export function Mini({ slug }: { slug: string }) {
  const M = MINIS[slug];
  if (!M) return null;
  return <svg className="mini" viewBox="0 0 160 110" aria-hidden="true" focusable="false"><M /></svg>;
}
