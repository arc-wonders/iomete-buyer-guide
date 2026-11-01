"use client";
import { useState } from "react";
import type { Atom } from "@/lib/types";
import { factById } from "@/lib/facts";
import { Chip, FactRow } from "./FactCard";

const CDN = "https://cdn.prod.website-files.com/679e8e39ccda840d403b4bb5/";
const SHOTS = [
  ["67beec2d7587afb095e70a05_compute.webp", "Compute"],
  ["67beec52f2f7c20b644b7438_sql-editor.gif", "SQL editor"],
  ["67beec3b84d5764a0704cd21_jupyter-notebooks.webp", "Notebooks"],
  ["67beec704e1eac3e9978506f_spark-applications.webp", "Spark jobs"],
  ["67beec812e5f0e507b09f9dd_data-catalog.gif", "Data catalog"],
  ["67beecf8b49ceb6c0c2f2d03_data-security.webp", "Data security"],
  ["67beed0e9d6fa040741782dc_domains.webp", "Domains"],
  ["67beec64cdc6d1dbe7c9d691_query-history.webp", "Query history"],
  ["67beecea9d6fa040741768e8_database-explorer.webp", "Database explorer"],
  ["67beed191d5f4d378acea508_connect-bi-tool.webp", "Connect a BI tool"],
];

function Cards({ ids, hl }: { ids: string[]; hl?: string }) {
  return (
    <ul className="ledger">
      {ids.map((id) => factById[id] && <FactRow key={id} fact={factById[id]} highlighted={hl === id} />)}
    </ul>
  );
}

function Checklist({ ids, hl, copyable }: { ids: string[]; hl?: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const facts = ids.map((id) => factById[id]).filter(Boolean);
  const copy = async () => {
    const text = "Questions for IOMETE (not answered in public sources):\n" + facts.map((f, i) => `${i + 1}. ${f.text}`).join("\n");
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };
  return (
    <>
      <ol className="checklist">
        {facts.map((f, i) => (
          <li key={f.id} id={`fact-${f.id}`} className={`check${hl === f.id ? " hl" : ""}`}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p>{f.text}</p>
              {f.url && <a className="src" href={f.url} target="_blank" rel="noreferrer">Related: {f.source}</a>}
            </div>
            <Chip state={f.state} />
          </li>
        ))}
      </ol>
      {copyable && (
        <p style={{ marginTop: 14 }} className="no-print">
          <button className="btn btn-dark" onClick={copy}>{copied ? "Copied" : "Copy these questions for an email to IOMETE"}</button>
        </p>
      )}
    </>
  );
}

function DeployQuartet() {
  const tiles = [
    { tag: "On-premises", title: "Your data center", tags: ["Any Kubernetes", "Dell ECS", "MinIO", "Ozone"], warn: "Air-gapped: claimed" },
    { tag: "Public cloud", title: "Your cloud account", tags: ["Amazon EKS", "Azure AKS", "Google GKE", "Terraform: Azure only"] },
    { tag: "Private cloud", title: "Your platform team's K8s", tags: ["OpenShift", "VMware Tanzu", "Nutanix NKP"] },
    { tag: "Hybrid", title: "More than one of these", tags: ["Control plane + data planes", "since v4.0.0"] },
  ];
  return (
    <div className="quartet">
      {tiles.map((t) => (
        <div className="q-tile" key={t.tag}>
          <span className="eyebrow">{t.tag}</span>
          <h3>{t.title}</h3>
          <div className="tags">
            {t.tags.map((x) => <span className="tag" key={x}>{x}</span>)}
            {t.warn && <span className="tag tag-warn">{t.warn}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArchitectureDiagram() {
  const planes = [0, 1, 2];
  return (
    <div className="panel">
      <svg className="diagram" viewBox="0 0 720 300" role="img" aria-label="One IOMETE control plane connects to several data planes. Each data plane runs Spark compute clusters next to your object store and your PostgreSQL.">
        <rect x="250" y="16" width="220" height="62" rx="6" fill="#2d382d" />
        <text x="360" y="42" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill="#d3f52c" letterSpacing="1">CONTROL PLANE</text>
        <text x="360" y="62" textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill="#e8f7e8">console · identity · catalog · policies</text>
        {planes.map((i) => {
          const x = 30 + i * 230;
          return (
            <g key={i}>
              <line x1="360" y1="78" x2={x + 100} y2="120" stroke="#617a61" strokeWidth="1.5" strokeDasharray="4 3" />
              <rect x={x} y="120" width="200" height="160" rx="6" fill="#fff" stroke="#d0d0cd" />
              <text x={x + 12} y="140" fontFamily="var(--mono)" fontSize="10" fill="#626261" letterSpacing="1">DATA PLANE {i + 1}</text>
              <rect x={x + 12} y="150" width="84" height="44" rx="4" fill="#e8f7e8" />
              <text x={x + 54} y="168" textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill="#2d382d">Spark</text>
              <text x={x + 54} y="184" textAnchor="middle" fontFamily="var(--body)" fontSize="10" fill="#626261">3.5.7 / 4.1.3</text>
              <rect x={x + 104} y="150" width="84" height="44" rx="4" fill="#e8f7e8" />
              <text x={x + 146} y="168" textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill="#2d382d">SQL / Jupyter</text>
              <text x={x + 146} y="184" textAnchor="middle" fontFamily="var(--body)" fontSize="10" fill="#626261">JDBC · Connect</text>
              <rect x={x + 12} y="204" width="176" height="30" rx="4" fill="#f2eeeb" />
              <text x={x + 100} y="223" textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill="#473733">Iceberg tables in your object store</text>
              <rect x={x + 12} y="240" width="176" height="28" rx="4" fill="#f2eeeb" />
              <text x={x + 100} y="258" textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill="#473733">Your PostgreSQL</text>
            </g>
          );
        })}
      </svg>
      <p className="muted" style={{ fontSize: ".85rem", marginTop: 8 }}>
        Redrawn from IOMETE&apos;s release notes for v4.0.0. One Helm chart per plane, installed into your cluster.
      </p>
    </div>
  );
}

function Perimeter() {
  return (
    <div className="panel">
      <svg className="diagram" viewBox="0 0 720 300" role="img" aria-label="Your environment contains IOMETE, your object store, your key manager and your identity provider. Outside, the IOMETE company may receive usage data and gets support access only through a statement of work.">
        <rect x="20" y="30" width="460" height="250" rx="8" fill="#e8f7e8" stroke="#617a61" strokeDasharray="6 4" />
        <text x="34" y="22" fontFamily="var(--mono)" fontSize="11" fill="#2d382d" letterSpacing="1">YOUR ENVIRONMENT · YOUR CONTROLS</text>
        <polygon points="250,70 290,93 290,139 250,162 210,139 210,93" fill="#d3f52c" />
        <text x="250" y="121" textAnchor="middle" fontFamily="var(--display)" fontSize="14" fill="#202020">IOMETE</text>
        {[
          { x: 50, y: 190, t: "Object store", s: "your encryption" },
          { x: 190, y: 190, t: "Key manager", s: "your keys" },
          { x: 330, y: 190, t: "Identity provider", s: "your MFA" },
        ].map((b) => (
          <g key={b.t}>
            <line x1="250" y1="162" x2={b.x + 60} y2={b.y} stroke="#617a61" />
            <rect x={b.x} y={b.y} width="120" height="54" rx="4" fill="#fff" stroke="#a0b8a0" />
            <text x={b.x + 60} y={b.y + 23} textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill="#202020">{b.t}</text>
            <text x={b.x + 60} y={b.y + 41} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="#626261">{b.s}</text>
          </g>
        ))}
        <rect x="560" y="110" width="140" height="60" rx="6" fill="#4c4c4c" />
        <text x="630" y="136" textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill="#fff">IOMETE (vendor)</text>
        <text x="630" y="154" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="#d0d0cd">outside</text>
        <line x1="290" y1="105" x2="560" y2="125" stroke="#995b25" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="425" y="100" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="#995b25">usage data allowed · licence §4.2</text>
        <line x1="560" y1="155" x2="290" y2="130" stroke="#626261" strokeWidth="1.5" strokeDasharray="2 4" />
        <text x="425" y="168" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="#626261">support access only via SOW · §10.4</text>
      </svg>
    </div>
  );
}

function Pricing({ hl }: { hl?: string }) {
  const [vcpu, setVcpu] = useState(320);
  const licence = Math.max(vcpu * 500, 100000);
  const fmt = (n: number) => "$" + n.toLocaleString("en-US");
  return (
    <>
      <div className="plans">
        <div id="fact-price.free" className={`plan${hl === "price.free" ? " hl" : ""}`}>
          <span className="eyebrow muted">Free</span>
          <div className="price">$0</div>
          <p className="small">Up to 100 vCPUs. Core features, community support. Access reviewed manually.</p>
        </div>
        <div id="fact-price.enterprise" className={`plan${hl === "price.enterprise" ? " hl" : ""}`}>
          <span className="eyebrow muted">Enterprise</span>
          <div className="price">$500 <span className="small">per vCPU per year</span></div>
          <p className="small">Minimum $100,000 a year, which buys 200 vCPUs. Adds masking, row-level security, auditing, enterprise support.</p>
        </div>
        <div id="fact-price.bc" className={`plan${hl === "price.bc" ? " hl" : ""}`}>
          <span className="eyebrow muted">Business Critical</span>
          <div className="price">Custom</div>
          <p className="small">Minimum $250,000 a year. Adds multi-region and dedicated engineers.</p>
        </div>
      </div>
      <p className="small muted">
        <span className="chip chip-documented">Documented</span>{" "}
        <a href="https://iomete.com/pricing" target="_blank" rel="noreferrer">iomete.com/pricing</a>
      </p>
      <div className="calc no-print">
        <span className="eyebrow">Licence calculator · list price only</span>
        <div className="calc-row">
          <label htmlFor="vcpu">How many vCPUs will IOMETE use? <b>{vcpu}</b></label>
          <output htmlFor="vcpu">{fmt(licence)}</output>
        </div>
        <input id="vcpu" type="range" min={50} max={4000} step={10} value={vcpu} onChange={(e) => setVcpu(+e.target.value)} />
        <table>
          <tbody>
            <tr><td>Enterprise licence: {vcpu} × $500{vcpu * 500 < 100000 ? ", raised to the $100,000 minimum" : ""}</td><td>{fmt(licence)} / yr</td></tr>
            <tr><td>Servers or cloud compute for those vCPUs</td><td>Your cost, not included</td></tr>
            <tr><td>Object storage</td><td>Your cost, not included</td></tr>
            <tr><td>Support tier, onboarding, discounts</td><td>Not published</td></tr>
          </tbody>
        </table>
        {vcpu <= 100 && <p className="warn">At {vcpu} vCPUs the Free plan also fits, without masking, auditing or enterprise support.</p>}
        <p className="warn">This is IOMETE&apos;s published list price. It is not a total cost of ownership, and it does not compare against other vendors.</p>
      </div>
      <Cards ids={["price.infra", "price.no-per-query", "price.savings", "price.support-sla", "price.support-cost", "price.history", "price.marketplace"]} hl={hl} />
    </>
  );
}

export function AtomView({ atom, highlight }: { atom: Atom; highlight?: string }) {
  const hl = highlight;
  let body: React.ReactNode;
  switch (atom.kind) {
    case "deploy":
      body = <><DeployQuartet /><Cards ids={atom.facts} hl={hl} /></>;
      break;
    case "architecture":
      body = <><ArchitectureDiagram /><Cards ids={atom.facts} hl={hl} /></>;
      break;
    case "showcase":
      body = (
        <>
          <div className="shots">
            {SHOTS.map(([f, label]) => (
              <figure className="shot" key={f}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CDN + f} alt={`IOMETE ${label} screen`} loading="lazy" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
          <Cards ids={atom.facts} hl={hl} />
        </>
      );
      break;
    case "perimeter":
      body = <><Perimeter /><Cards ids={atom.facts} hl={hl} /></>;
      break;
    case "checklist":
      body = <Checklist ids={atom.facts} hl={hl} copyable={atom.id === "open-questions"} />;
      break;
    case "pricing":
      body = <Pricing hl={hl} />;
      break;
    case "plain":
      body = (
        <>
          <p className="plain-big">
            Software you run on your own servers or cloud account. It stores very large amounts of data cheaply and
            lets your teams query it in SQL. The tables use an open format, so you can leave.
          </p>
          <Cards ids={atom.facts} hl={hl} />
        </>
      );
      break;
    case "logos":
      body = (
        <>
          <div className="logowall">
            {["OverDrive", "Central Bank of Azerbaijan", "Y Combinator", "Mercury", "PASHA Bank", "Dell Technologies", "UZCARD",
              "Central Bank of Uzbekistan", "State Customs Committee", "Ministry of Digital Technologies (Uzbekistan)",
              "PASHA Technology", "Ministry of Economy (Azerbaijan)", "Kapital Bank"].map((n) => <span key={n}>{n}</span>)}
          </div>
          <Cards ids={atom.facts} hl={hl} />
        </>
      );
      break;
    default:
      body = <Cards ids={atom.facts} hl={hl} />;
  }
  return (
    <section id={`atom-${atom.id}`} className="atom" aria-labelledby={`h-${atom.id}`}>
      <div className="wrap">
        <header className="atom-head">
          <span className="eyebrow">{atom.eyebrow}</span>
          <h2 id={`h-${atom.id}`}>{atom.title}</h2>
          {atom.lead && <p className="muted">{atom.lead}</p>}
        </header>
        {body}
      </div>
    </section>
  );
}
