"use client";
import { useEffect, useRef, useState } from "react";
import { CDN, Shot, Tile, useInView, type Pick } from "./shared";

/**
 * One large, readable product screen at a time. Each screen is cropped to the part worth reading
 * (desktop and phone crops differ), and opens full size on click via the shared Shot lightbox.
 * Crop = left x, top y and width w as fractions of the full image (all images are 5:3).
 */
type Crop = [x: number, y: number, w: number];
type Screen = { key: string; tab: string; file: string; line: string; d: Crop; m: Crop; fact: string; factLabel: string };

const SCREENS: Screen[] = [
  {
    key: "compute", tab: "Compute", file: "67beec2d7587afb095e70a05_compute.webp",
    line: "Spark clusters you size, start and stop per team.",
    d: [0.17, 0.13, 0.52], m: [0.175, 0.2, 0.32],
    fact: "arch.endpoints", factLabel: "JDBC/ODBC, Spark Connect, Arrow Flight",
  },
  {
    key: "sql", tab: "SQL editor", file: "67beec52f2f7c20b644b7438_sql-editor.gif",
    line: "Write SQL in the browser, see rows or a chart.",
    d: [0.39, 0.06, 0.46], m: [0.39, 0.1, 0.33],
    fact: "feat.integrations", factLabel: "Or bring dbt, Power BI, Tableau",
  },
  {
    key: "spark", tab: "Spark jobs", file: "67beec704e1eac3e9978506f_spark-applications.webp",
    line: "Every Spark run, its state and how long it took.",
    d: [0.17, 0.13, 0.58], m: [0.17, 0.3, 0.33],
    fact: "arch.version", factLabel: "Spark 3.5 and Spark 4 images",
  },
  {
    key: "notebooks", tab: "Notebooks", file: "67beec3b84d5764a0704cd21_jupyter-notebooks.webp",
    line: "Point JupyterLab or VS Code at your own cluster.",
    d: [0.17, 0.13, 0.58], m: [0.172, 0.15, 0.34],
    fact: "feat.modules", factLabel: "Jupyter containers included",
  },
  {
    key: "security", tab: "Data security", file: "67beecf8b49ceb6c0c2f2d03_data-security.webp",
    line: "Who sees which tables, rows and columns.",
    d: [0.17, 0.14, 0.58], m: [0.172, 0.24, 0.37],
    fact: "sec.policies", factLabel: "Access, row-filter and masking policies",
  },
];

const AUTO_MS = 6000;

export function ScreenShowcase({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!seen || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setAuto(false); return; }
    const t = setTimeout(() => setI((n) => (n + 1) % SCREENS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [seen, auto, i]);

  // fetch every screen once the showcase is near, so switching tabs never shows a blank frame
  useEffect(() => {
    if (!seen) return;
    SCREENS.forEach((x) => { const im = new Image(); im.src = CDN + x.file; });
  }, [seen]);

  // keep the active tab visible in the (phone-width) scrolling tab row, without moving the page
  const tabs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = tabs.current;
    const btn = row?.children[i] as HTMLElement | undefined;
    if (row && btn && row.scrollWidth > row.clientWidth) row.scrollTo({ left: btn.offsetLeft - row.offsetLeft - 8, behavior: "smooth" });
  }, [i]);

  const choose = (n: number) => { setAuto(false); setI(n); };
  const s = SCREENS[i];
  const vars = {
    "--xd": s.d[0], "--yd": s.d[1], "--wd": s.d[2],
    "--xm": s.m[0], "--ym": s.m[1], "--wm": s.m[2],
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`wgi-show${seen && auto ? " is-auto" : ""}`}>
      <div ref={tabs} className="wgi-tabs" role="tablist" aria-label="IOMETE console screens">
        {SCREENS.map((x, n) => (
          <button
            key={x.key} role="tab" id={`wgi-tab-${x.key}`} aria-selected={n === i} aria-controls="wgi-stage"
            className={n === i ? "on" : ""} onClick={() => choose(n)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); choose((i + 1) % SCREENS.length); }
              if (e.key === "ArrowLeft") { e.preventDefault(); choose((i + SCREENS.length - 1) % SCREENS.length); }
            }}
          >
            <span className="n">{String(n + 1).padStart(2, "0")}</span>
            {x.tab}
            {n === i && <span className="bar" key={`${i}-${auto}`} style={{ animationDuration: `${AUTO_MS}ms` }} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div className="wgi-stage" id="wgi-stage" role="tabpanel" aria-labelledby={`wgi-tab-${s.key}`}>
        <div className="wgi-chrome" aria-hidden="true">
          <i /><i /><i />
          <span>IOMETE console · {s.tab}</span>
        </div>
        <div className="wgi-crop" style={vars} key={s.key}>
          <Shot src={CDN + s.file} alt={`IOMETE console: ${s.tab}`} caption={`${s.tab}: ${s.line}`} className="wgi-shot" />
        </div>
      </div>
      <div className="wgi-cap" key={`cap-${s.key}`}>
        <p><b>{s.tab}.</b> {s.line} <span className="wgi-hint">Tap to enlarge.</span></p>
        <div className="tiles"><Tile id={s.fact} label={s.factLabel} onPick={onPick} /></div>
      </div>
    </div>
  );
}
