"use client";
import { useEffect, useState } from "react";
import { factById } from "@/lib/facts";
import { Dot, useInView, type Pick } from "./shared";
import { Scene, type Mode } from "./WhyNotSaas.scene";

/** A sourced statement as a button: evidence dot + words, opens the statement it comes from. */
function F({ id, onPick, children, className = "" }: { id: string; onPick: Pick; children: React.ReactNode; className?: string }) {
  const f = factById[id];
  if (!f) return null;
  return (
    <button className={`tile wns-f tile-${f.state} ${className}`} onClick={() => onPick(id)} title={f.text}>
      <Dot state={f.state} />
      <span>{children}</span>
    </button>
  );
}

const st = (id: string) => factById[id]?.state ?? "unknown";

const CAPTION: Record<Mode, { id: string; text: string }> = {
  saas: { id: "mkt.saas-only", text: "Databricks and Snowflake are cloud services on public clouds. Neither installs on your own hardware." },
  iomete: { id: "what.one-liner", text: "IOMETE is software you install on your own Kubernetes, on-premises or in your cloud account." },
};

type Cell = { text: string; id?: string; note?: { text: string; id: string } };
const ROWS: { q: string; saas: Cell; iomete: Cell }[] = [
  { q: "Where it runs",
    saas: { text: "Their service, on a public cloud", id: "mkt.saas-only" },
    iomete: { text: "Your Kubernetes, on-premises or in your cloud", id: "what.one-liner" } },
  { q: "Who runs it",
    saas: { text: "They do", id: "mkt.saas-only" },
    iomete: { text: "You do", id: "what.one-liner" } },
  { q: "Where tables live",
    saas: { text: "Not compared here" },
    iomete: { text: "Open Apache Iceberg, in your own object store", id: "what.open-formats" } },
  { q: "How you pay",
    saas: { text: "Their price list. Not compared here" },
    iomete: { text: "$500 per vCPU a year, plus your own servers", id: "price.infra",
      note: { text: "“Save 2–5x over SaaS”, says iomete.com. Its other pages say less.", id: "price.savings" } } },
  { q: "Can you leave",
    saas: { text: "Not compared here" },
    iomete: { text: "Other Iceberg engines can read your tables", id: "what.open-formats",
      note: { text: "The platform itself is proprietary, not open source", id: "what.license" } } },
];

function CellView({ c, onPick }: { c: Cell; onPick: Pick }) {
  return (
    <>
      {c.id ? <F id={c.id} onPick={onPick}>{c.text}</F> : <span className="wns-nc">{c.text}</span>}
      {c.note && <F id={c.note.id} onPick={onPick} className="wns-note">{c.note.text}</F>}
    </>
  );
}

function People() {
  // 50 seats: 11 certain, 39 possible. LinkedIn's band is 11–50.
  return (
    <svg className="wns-people" viewBox="0 0 200 80" aria-hidden="true">
      {Array.from({ length: 50 }, (_, i) => {
        const x = (i % 10) * 20 + 10, y = Math.floor(i / 10) * 16 + 8;
        return i < 11
          ? <circle key={i} cx={x} cy={y} r="5.5" fill="#2d382d" />
          : <circle key={i} cx={x} cy={y} r="4.75" fill="none" stroke="#2d382d" strokeWidth="1.5" opacity=".35" />;
      })}
    </svg>
  );
}

const TIMELINE = [
  { when: "2021", id: "co.founded", text: "IOMETE founded" },
  { when: "2022", id: "co.founded", text: "Y Combinator, Winter 2022" },
  { when: "2025", id: "co.gartner", text: "In Gartner’s Market Guide for Data Lakehouse Platforms. An overview, not a ranking" },
  { when: "2026", id: "mkt.dremio", text: "SAP buys Dremio (May–July). IOMETE publishes a Dremio migration guide" },
];

export function WhyNotSaas({ onPick }: { onPick: Pick }) {
  const [mode, setMode] = useState<Mode>("saas");
  const [auto, setAuto] = useState(true);
  const [ref, seen] = useInView<HTMLDivElement>(0.4);

  useEffect(() => {
    if (!seen || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setMode((m) => (m === "saas" ? "iomete" : "saas")), 4200);
    return () => clearTimeout(id);
  }, [seen, auto, mode]);

  const choose = (m: Mode) => { setAuto(false); setMode(m); };
  const cap = CAPTION[mode];

  return (
    <figure className={`visual wns is-${mode}`}>
      <div className="wns-stage" ref={ref}>
        <div className="wns-toggle" role="group" aria-label="Show the picture for">
          <span className="wns-thumb" aria-hidden="true" />
          <button aria-pressed={mode === "saas"} onClick={() => choose("saas")}>
            <small>SaaS</small>Databricks, Snowflake
          </button>
          <button aria-pressed={mode === "iomete"} onClick={() => choose("iomete")}>
            <small>Self-hosted</small>IOMETE
          </button>
          {auto && seen && <span key={mode} className="wns-timer" aria-hidden="true" />}
        </div>
        <Scene mode={mode} layout="wide" />
        <Scene mode={mode} layout="tall" />
        <div className="wns-caption" aria-live="polite">
          <F id={cap.id} onPick={onPick}>{cap.text}</F>
        </div>
      </div>

      <section className="wns-glance" aria-label="The trade at a glance">
        <div className="wns-row wns-head" aria-hidden="true">
          <span />
          <span className="wns-col-saas"><small>SaaS</small>Databricks, Snowflake</span>
          <span className="wns-col-iomete"><small>Self-hosted</small>IOMETE</span>
        </div>
        {ROWS.map((r) => (
          <div className="wns-row" key={r.q}>
            <h3>{r.q}</h3>
            <div className="wns-col-saas"><span className="wns-tag">Databricks, Snowflake</span><CellView c={r.saas} onPick={onPick} /></div>
            <div className="wns-col-iomete"><span className="wns-tag">IOMETE</span><CellView c={r.iomete} onPick={onPick} /></div>
          </div>
        ))}
      </section>

      <section className="wns-cost" aria-label="What you take on">
        <div className="wns-cost-head">
          <p className="wns-eyebrow">The honest cost</p>
          <h3>Control means you run it.</h3>
        </div>
        <ol className="wns-cost-list">
          <li><button onClick={() => onPick("what.one-liner")}><b>Kubernetes</b><span>You install and operate it on your own cluster</span><Dot state={st("what.one-liner")} /></button></li>
          <li><button onClick={() => onPick("price.infra")}><b>+ servers</b><span>Your cloud or hardware bill comes on top of the licence</span><Dot state={st("price.infra")} /></button></li>
          <li><button onClick={() => onPick("price.enterprise")}><b>$100k</b><span>A year, the Enterprise minimum (200 vCPUs)</span><Dot state={st("price.enterprise")} /></button></li>
        </ol>
      </section>

      <section className="wns-market" aria-label="The market and the vendor">
        <div className="wns-time">
          <p className="wns-eyebrow">The market</p>
          <ol>
            {TIMELINE.map((e) => (
              <li key={e.when}>
                <button onClick={() => onPick(e.id)} title={factById[e.id]?.text}>
                  <span className="wns-when">{e.when}</span>
                  <span className="wns-what">{e.text}</span>
                  <Dot state={st(e.id)} />
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="wns-vendor">
          <p className="wns-eyebrow">The vendor</p>
          <div className="wns-stats">
            <button className="wns-stat wns-stat-people" onClick={() => onPick("co.size")} title={factById["co.size"]?.text}>
              <span className="wns-stat-txt"><b>11–50</b><span>people, per LinkedIn</span></span>
              <People />
              <Dot state={st("co.size")} />
            </button>
            <button className="wns-stat wns-stat-unknown" onClick={() => onPick("co.case-studies")} title={factById["co.case-studies"]?.text}>
              <b>0</b><span>named customer case studies published</span><Dot state={st("co.case-studies")} />
            </button>
            <button className="wns-stat wns-stat-claimed" onClick={() => onPick("co.dell")} title={factById["co.dell"]?.text}>
              <b>20+ PB</b><span>at Dell, a figure IOMETE gave the press</span><Dot state={st("co.dell")} />
            </button>
            <button className="wns-stat wns-stat-unknown" onClick={() => onPick("co.funding")} title={factById["co.funding"]?.text}>
              <b>?</b><span>total funding, not disclosed</span><Dot state={st("co.funding")} />
            </button>
          </div>
        </div>
      </section>
    </figure>
  );
}
