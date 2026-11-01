"use client";
import { useState } from "react";
import { factById } from "@/lib/facts";
import type { State } from "@/lib/types";

type Pick = (factId: string) => void;
const CDN = "https://cdn.prod.website-files.com/679e8e39ccda840d403b4bb5/";

const C = {
  lime: "#d3f52c", ink: "#1d211d", ink2: "#5a5f59", ink3: "#8e8e8c", rule: "#d9d9d3",
  green: "#e3f1e3", greenInk: "#2d382d", grey: "#ececE6", dark: "#2d382d",
  documented: "#4e664e", claimed: "#c07a2c", unknown: "#c4472f",
};

export function Dot({ state }: { state: State }) {
  return <span className={`dot dot-${state}`} aria-label={state} />;
}

/** A tappable statement in picture form: a dot for its evidence state and a few words. */
function Tile({ id, label, onPick }: { id: string; label: string; onPick: Pick }) {
  const f = factById[id];
  if (!f) return null;
  return (
    <button className={`tile tile-${f.state}`} onClick={() => onPick(id)} title={f.text}>
      <Dot state={f.state} />
      <span>{label}</span>
    </button>
  );
}

// ---------------------------------------------------------------- where does our data go?
export function WhereDataGoes({ onPick }: { onPick: Pick }) {
  return (
    <figure className="visual">
      <svg viewBox="0 0 900 420" role="img" aria-label="Inside your environment: IOMETE, your object store, your key manager and your identity provider. Outside: the IOMETE company, which may receive usage data and gets support access only when a contract allows it.">
        <rect x="20" y="40" width="560" height="350" rx="14" fill={C.green} />
        <text x="44" y="78" fontFamily="var(--body)" fontSize="18" fill={C.greenInk}>Your environment</text>
        <polygon points="300,110 352,140 352,200 300,230 248,200 248,140" fill={C.lime} />
        <text x="300" y="176" textAnchor="middle" fontFamily="var(--body)" fontSize="16" fill={C.ink}>IOMETE</text>
        {[
          { x: 60, t: "Your data", s: "in your object store" },
          { x: 230, t: "Your keys", s: "in your key manager" },
          { x: 400, t: "Your logins", s: "in your identity provider" },
        ].map((b) => (
          <g key={b.t}>
            <line x1="300" y1="230" x2={b.x + 70} y2="290" stroke={C.greenInk} strokeOpacity=".35" strokeWidth="2" />
            <rect x={b.x} y="290" width="140" height="66" rx="10" fill="#fff" />
            <text x={b.x + 70} y="320" textAnchor="middle" fontFamily="var(--body)" fontSize="15" fill={C.ink}>{b.t}</text>
            <text x={b.x + 70} y="340" textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill={C.ink2}>{b.s}</text>
          </g>
        ))}
        <rect x="690" y="150" width="190" height="80" rx="12" fill={C.dark} />
        <text x="785" y="187" textAnchor="middle" fontFamily="var(--body)" fontSize="15" fill="#fff">IOMETE, the company</text>
        <text x="785" y="208" textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill="#a0b8a0">outside your walls</text>
        <g style={{ cursor: "pointer" }} onClick={() => onPick("sec.telemetry")}>
          <path d="M352 150 C 480 120, 580 130, 690 172" fill="none" stroke={C.claimed} strokeWidth="2.5" strokeDasharray="7 6" className="flow" />
          <text x="600" y="120" textAnchor="middle" fontFamily="var(--body)" fontSize="13" fill={C.claimed}>usage data may go out</text>
        </g>
        <g style={{ cursor: "pointer" }} onClick={() => onPick("sec.support-access")}>
          <path d="M690 212 C 580 250, 470 240, 352 196" fill="none" stroke={C.ink2} strokeWidth="2.5" strokeDasharray="2 6" className="flow" />
          <text x="600" y="262" textAnchor="middle" fontFamily="var(--body)" fontSize="13" fill={C.ink2}>support comes in only if your contract allows</text>
        </g>
      </svg>
      <div className="tiles">
        <Tile id="what.not-saas" label="IOMETE does not host your data" onPick={onPick} />
        <Tile id="sec.at-rest" label="You hold the encryption keys" onPick={onPick} />
        <Tile id="sec.support-access" label="Support access needs a contract" onPick={onPick} />
        <Tile id="sec.telemetry" label="Usage data is allowed out" onPick={onPick} />
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------- security review
export function SecurityReview({ onPick }: { onPick: Pick }) {
  const groups: { title: string; items: [string, string][] }[] = [
    { title: "Controls you can check in the docs", items: [
      ["sec.sso", "SSO: SAML, OIDC, SCIM, LDAP"], ["sec.mfa", "MFA through your IdP"], ["sec.policies", "Access policies, row filters"],
      ["sec.masking", "7 masking types"], ["sec.audit", "Audit log tables"], ["sec.netpol", "Network policies"],
      ["sec.secrets", "Encrypted secrets"], ["sec.cves", "CVE fixes in releases"]] },
    { title: "Badges and paperwork", items: [
      ["sec.soc2", "SOC 2 Type I, 2022"], ["sec.badges", "HIPAA and GDPR badges"], ["sec.trust-center", "Trust center"],
      ["mkt.regs", "DORA and GDPR mapping"], ["sec.type2", "SOC 2 Type II"], ["sec.iso27001", "ISO 27001"]] },
    { title: "Ask IOMETE in writing", items: [
      ["sec.breach", "Breach notice window"], ["sec.pentest", "Pen test"], ["sec.sbom", "SBOM, image signing"],
      ["sec.retention", "Audit log retention"], ["sec.dpa", "Data processing addendum"], ["sec.mtls", "Internal mTLS"], ["sec.backup", "Backup and recovery"]] },
  ];
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = "Questions for IOMETE:\n" + groups[2].items.map(([id], i) => `${i + 1}. ${factById[id].text}`).join("\n");
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* blocked */ }
  };
  return (
    <figure className="visual">
      <div className="board">
        {groups.map((g) => (
          <div key={g.title} className="board-col">
            <h3>{g.title}</h3>
            <div className="tiles tiles-col">{g.items.map(([id, l]) => <Tile key={id} id={id} label={l} onPick={onPick} />)}</div>
          </div>
        ))}
      </div>
      <button className="plain-btn" onClick={copy}>{copied ? "Copied" : "Copy the open questions"}</button>
    </figure>
  );
}

// ---------------------------------------------------------------- cost
export function Cost({ onPick }: { onPick: Pick }) {
  const [vcpu, setVcpu] = useState(320);
  const licence = Math.max(vcpu * 500, 100000);
  const fmt = (n: number) => "$" + n.toLocaleString("en-US");
  return (
    <figure className="visual">
      <div className="sum">
        <button className="sum-part sum-known" onClick={() => onPick("price.enterprise")}>
          <span className="sum-big">{fmt(licence)}</span>
          <span>Enterprise licence per year</span>
          <span className="sum-note">{vcpu} vCPUs × $500{vcpu * 500 < 100000 ? ", raised to the $100,000 minimum" : ""}{vcpu <= 100 ? ". The Free plan covers this size at $0." : ""}</span>
        </button>
        <span className="sum-op">+</span>
        <button className="sum-part sum-unknown" onClick={() => onPick("price.infra")}>
          <span className="sum-big">?</span>
          <span>your servers or cloud</span>
          <span className="sum-note">you pay your provider</span>
        </button>
        <span className="sum-op">+</span>
        <button className="sum-part sum-unknown" onClick={() => onPick("price.support-cost")}>
          <span className="sum-big">?</span>
          <span>support and onboarding</span>
          <span className="sum-note">prices not published</span>
        </button>
      </div>
      <label className="slider" htmlFor="vcpu">
        <span>How many vCPUs? <b>{vcpu}</b></span>
        <input id="vcpu" type="range" min={50} max={4000} step={10} value={vcpu} onChange={(e) => setVcpu(+e.target.value)} />
      </label>
      <output htmlFor="vcpu" className="sr-only">{fmt(licence)}</output>
      <div className="plans">
        {[
          { id: "price.free", n: "Free", p: "$0", d: "up to 100 vCPUs" },
          { id: "price.enterprise", n: "Enterprise", p: "$500", d: "per vCPU a year, $100k minimum" },
          { id: "price.bc", n: "Business Critical", p: "Custom", d: "$250k minimum" },
        ].map((x) => (
          <button key={x.id} className="plan" onClick={() => onPick(x.id)}>
            <span>{x.n}</span><b>{x.p}</b><small>{x.d}</small>
          </button>
        ))}
      </div>
      <div className="tiles">
        <Tile id="price.no-per-query" label="No per-query fees" onPick={onPick} />
        <Tile id="price.savings" label="Savings claims vary by page" onPick={onPick} />
        <Tile id="price.history" label="Pricing changed 3 times since 2023" onPick={onPick} />
        <Tile id="price.marketplace" label="Cloud marketplace listing" onPick={onPick} />
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------- why not SaaS
function Side({ title, sub, mine }: { title: string; sub: string; mine: boolean }) {
  return (
    <div className="side">
      <svg viewBox="0 0 400 230" role="img" aria-label={mine ? "The software comes to your infrastructure; the data stays with you." : "Your data goes to the vendor's cloud."}>
        <rect x="10" y="40" width="160" height="150" rx="12" fill={mine ? C.green : "#eef0ec"} />
        <text x="90" y="30" textAnchor="middle" fontFamily="var(--body)" fontSize="14" fill={C.ink2}>Your company</text>
        <rect x="230" y="40" width="160" height="150" rx="12" fill={mine ? "#eef0ec" : "#e6e6e0"} />
        <text x="310" y="30" textAnchor="middle" fontFamily="var(--body)" fontSize="14" fill={C.ink2}>The vendor</text>
        {/* data cylinder */}
        <g transform={mine ? "translate(60 80)" : "translate(280 80)"}>
          <ellipse cx="30" cy="10" rx="30" ry="10" fill={C.dark} />
          <rect x="0" y="10" width="60" height="50" fill={C.dark} />
          <ellipse cx="30" cy="60" rx="30" ry="10" fill={C.dark} />
          <text x="30" y="44" textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill="#fff">data</text>
        </g>
        {/* software hexagon */}
        <g transform={mine ? "translate(100 120)" : "translate(260 120)"}>
          <polygon points="20,0 38,10 38,32 20,42 2,32 2,10" fill={C.lime} />
        </g>
        {mine ? (
          <path d="M230 160 L 170 160" stroke={C.ink2} strokeWidth="2" markerEnd="url(#arr)" />
        ) : (
          <path d="M170 115 L 230 115" stroke={C.unknown} strokeWidth="2" markerEnd="url(#arr2)" />
        )}
        <text x="200" y={mine ? 185 : 105} textAnchor="middle" fontFamily="var(--body)" fontSize="11" fill={mine ? C.ink2 : C.unknown}>{mine ? "software" : "data"}</text>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={C.ink2} /></marker>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={C.unknown} /></marker>
        </defs>
      </svg>
      <h3>{title}</h3>
      <p>{sub}</p>
    </div>
  );
}
export function WhyNotSaas({ onPick }: { onPick: Pick }) {
  return (
    <figure className="visual">
      <div className="sides">
        <Side mine={false} title="Databricks, Snowflake" sub="Your data moves into their cloud. They run it. You pay per use." />
        <Side mine title="IOMETE" sub="Their software moves into your infrastructure. You run it. You pay per vCPU." />
      </div>
      <div className="tiles">
        <Tile id="mkt.saas-only" label="Databricks and Snowflake are cloud services" onPick={onPick} />
        <Tile id="what.open-formats" label="Open Iceberg tables, so you can leave" onPick={onPick} />
        <Tile id="mkt.dremio" label="Dremio is now owned by SAP" onPick={onPick} />
        <Tile id="co.gartner" label="In Gartner's 2025 market guide" onPick={onPick} />
        <Tile id="co.case-studies" label="Named customer case studies" onPick={onPick} />
        <Tile id="co.size" label="11–50 people" onPick={onPick} />
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------- what gets installed
const SHOTS = [
  ["67beec52f2f7c20b644b7438_sql-editor.gif", "SQL editor"],
  ["67beec3b84d5764a0704cd21_jupyter-notebooks.webp", "Notebooks"],
  ["67beec812e5f0e507b09f9dd_data-catalog.gif", "Data catalog"],
  ["67beecf8b49ceb6c0c2f2d03_data-security.webp", "Data security"],
];
export function WhatGetsInstalled({ onPick }: { onPick: Pick }) {
  return (
    <figure className="visual">
      <svg viewBox="0 0 900 340" role="img" aria-label="Your Kubernetes cluster runs one IOMETE control plane and several data planes. Each data plane runs Spark and SQL next to your object store and PostgreSQL.">
        <rect x="10" y="10" width="880" height="320" rx="14" fill="#eef0ec" />
        <text x="34" y="44" fontFamily="var(--body)" fontSize="16" fill={C.ink2}>Your Kubernetes</text>
        <g style={{ cursor: "pointer" }} onClick={() => onPick("arch.planes")}>
          <rect x="350" y="30" width="200" height="56" rx="10" fill={C.dark} />
          <text x="450" y="64" textAnchor="middle" fontFamily="var(--body)" fontSize="15" fill="#fff">Control plane</text>
        </g>
        {[0, 1, 2].map((i) => {
          const x = 50 + i * 280;
          return (
            <g key={i}>
              <line x1="450" y1="86" x2={x + 120} y2="120" stroke={C.ink3} strokeWidth="1.5" strokeDasharray="4 4" className="flow" />
              <rect x={x} y="120" width="240" height="190" rx="12" fill="#fff" />
              <text x={x + 20} y="148" fontFamily="var(--body)" fontSize="13" fill={C.ink3}>{["Production", "Testing", "Another team"][i]}</text>
              <g style={{ cursor: "pointer" }} onClick={() => onPick("arch.version")}>
                <rect x={x + 20} y="160" width="96" height="54" rx="8" fill={C.lime} />
                <text x={x + 68} y="192" textAnchor="middle" fontFamily="var(--body)" fontSize="14" fill={C.ink}>Spark</text>
              </g>
              <g style={{ cursor: "pointer" }} onClick={() => onPick("arch.endpoints")}>
                <rect x={x + 124} y="160" width="96" height="54" rx="8" fill={C.lime} fillOpacity=".55" />
                <text x={x + 172} y="192" textAnchor="middle" fontFamily="var(--body)" fontSize="14" fill={C.ink}>SQL</text>
              </g>
              <g style={{ cursor: "pointer" }} onClick={() => onPick("deploy.storage")}>
                <rect x={x + 20} y="226" width="200" height="34" rx="8" fill={C.green} />
                <text x={x + 120} y="248" textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill={C.greenInk}>your object store</text>
              </g>
              <rect x={x + 20} y="266" width="200" height="30" rx="8" fill={C.green} />
              <text x={x + 120} y="286" textAnchor="middle" fontFamily="var(--body)" fontSize="12" fill={C.greenInk}>your PostgreSQL</text>
            </g>
          );
        })}
      </svg>
      <div className="shots">
        {SHOTS.map(([f, l]) => (
          <figure key={f}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CDN + f} alt={`IOMETE ${l} screen`} loading="lazy" />
            <figcaption>{l}</figcaption>
          </figure>
        ))}
      </div>
      <div className="tiles">
        <Tile id="deploy.models" label="EKS, AKS, GKE, OpenShift, Tanzu" onPick={onPick} />
        <Tile id="deploy.minimums" label="Starts at 12 CPU + one 4-CPU node" onPick={onPick} />
        <Tile id="feat.integrations" label="dbt, Airflow, Power BI, Tableau" onPick={onPick} />
        <Tile id="deploy.airgap" label="Air-gapped install" onPick={onPick} />
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------- how hard to run
export function HowHardToRun({ onPick }: { onPick: Pick }) {
  const steps: [string, string, string][] = [
    ["deploy.minimums", "1", "You provide a Kubernetes cluster and object storage"],
    ["deploy.time", "2", "Install with Terraform and Helm, about 25 minutes in the cloud"],
    ["mkt.k8s-skills", "3", "Someone on your side keeps the cluster running"],
  ];
  return (
    <figure className="visual">
      <ol className="steps">
        {steps.map(([id, n, t]) => (
          <li key={id}><button onClick={() => onPick(id)}><b>{n}</b><span>{t}</span><Dot state={factById[id].state} /></button></li>
        ))}
      </ol>
      <div className="split2">
        <div>
          <h3>If you lack that person</h3>
          <div className="tiles tiles-col">
            <Tile id="co.fde" label="IOMETE engineers can join your team" onPick={onPick} />
            <Tile id="price.free" label="Free plan to try, up to 100 vCPUs" onPick={onPick} />
            <Tile id="feat.university" label="9 free training videos" onPick={onPick} />
          </div>
        </div>
        <div>
          <h3>Not there yet</h3>
          <div className="tiles tiles-col">
            <Tile id="feat.lineage" label="No data lineage yet" onPick={onPick} />
            <Tile id="feat.no-cli" label="No command-line tool" onPick={onPick} />
            <Tile id="deploy.k8s-matrix" label="No Kubernetes version list" onPick={onPick} />
            <Tile id="deploy.terraform" label="Terraform for Azure only" onPick={onPick} />
            <Tile id="feat.table-maint" label="Table maintenance in beta" onPick={onPick} />
          </div>
        </div>
      </div>
    </figure>
  );
}

export const VISUALS: Record<string, (p: { onPick: Pick }) => React.ReactElement> = {
  "where-data-goes": WhereDataGoes,
  "security-review": SecurityReview,
  "what-it-costs": Cost,
  "why-not-saas": WhyNotSaas,
  "what-gets-installed": WhatGetsInstalled,
  "how-hard-to-run": HowHardToRun,
};
