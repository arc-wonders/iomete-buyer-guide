"use client";
import { useEffect, useState } from "react";
import { factById } from "@/lib/facts";
import { useInView, type Pick } from "./shared";
import { Scene, type Mode } from "./WhyNotSaas.scene";

/** A sourced statement as a button: evidence dot + words, opens the statement it comes from. */
function F({ id, onPick, children, className = "" }: { id: string; onPick: Pick; children: React.ReactNode; className?: string }) {
  const f = factById[id];
  if (!f) return null;
  return (
    <button className={`tile wns-f tile-documented ${className}`} onClick={() => onPick(id)} title={f.text}>
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
    iomete: { text: "Your Kubernetes, on-prem or your cloud", id: "what.one-liner" } },
  { q: "Who runs it",
    saas: { text: "They do", id: "mkt.saas-only" },
    iomete: { text: "You do", id: "what.one-liner" } },
  { q: "How you pay",
    saas: { text: "—" },
    iomete: { text: "$500 per vCPU a year + your servers", id: "price.infra" } },
  { q: "Can you leave",
    saas: { text: "—" },
    iomete: { text: "Yes: open Iceberg tables in your object store", id: "what.open-formats" } },
];

function CellView({ c, onPick }: { c: Cell; onPick: Pick }) {
  return (
    <>
      {c.id ? <F id={c.id} onPick={onPick}>{c.text}</F> : <span className="wns-nc">{c.text}</span>}
      {c.note && <F id={c.note.id} onPick={onPick} className="wns-note">{c.note.text}</F>}
    </>
  );
}

const COMPARE: { k: string; iomete: string; saas: string }[] = [
  { k: "Deployment", iomete: "Hybrid first: on-premises, private or public cloud", saas: "Public cloud only" },
  { k: "Data ownership", iomete: "Customer-controlled, no lock-in", saas: "Vendor-controlled" },
  { k: "Security and privacy", iomete: "Your own security measures, end to end", saas: "Dependent on the vendor" },
  { k: "Cost", iomete: "Your cloud discounts, 2–5x cheaper", saas: "A permanent SaaS premium" },
  { k: "Service model", iomete: "Open and customizable", saas: "One size fits all" },
];

const TIMELINE = [
  { when: "2021", id: "co.founded", text: "IOMETE founded" },
  { when: "2022", id: "co.founded", text: "Y Combinator, Winter 2022" },
  { when: "2025", id: "co.gartner", text: "In Gartner’s lakehouse Market Guide" },
  { when: "2026", id: "mkt.dremio", text: "SAP buys Dremio" },
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
          <p className="wns-eyebrow">What self-hosting means</p>
          <h3>Control means you run it.</h3>
        </div>
        <ol className="wns-cost-list">
          <li><button onClick={() => onPick("what.one-liner")}><b>Kubernetes</b><span>You install and operate it on your own cluster</span></button></li>
          <li><button onClick={() => onPick("price.infra")}><b>+ servers</b><span>Your own cloud or hardware, at your negotiated rates</span></button></li>
          <li><button onClick={() => onPick("price.enterprise")}><b>$100k</b><span>A year, the Enterprise minimum (200 vCPUs)</span></button></li>
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
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="wns-vendor">
          <p className="wns-eyebrow">IOMETE vs SaaS platforms</p>
          <table className="wns-cmp" aria-label="IOMETE compared with SaaS data platforms">
            <thead><tr><th scope="col"></th><th scope="col" className="wns-cmp-io">IOMETE</th><th scope="col">Databricks, Snowflake</th></tr></thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.k}>
                  <th scope="row">{r.k}</th>
                  <td className="wns-cmp-io"><button onClick={() => onPick("mkt.compare")} title={factById["mkt.compare"]?.text}>{r.iomete}</button></td>
                  <td>{r.saas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </figure>
  );
}
