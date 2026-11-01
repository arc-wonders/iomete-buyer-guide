"use client";
import { useState } from "react";
import { factById } from "@/lib/facts";
import { Dot, Tile, useInView, type Pick } from "./shared";

/** Big tappable picture that opens the statement behind it. */
function PicBtn({ id, label, onPick, children, className = "" }: {
  id: string; label: string; onPick: Pick; children: React.ReactNode; className?: string;
}) {
  const f = factById[id];
  return (
    <button className={`hh-pic ${className}`} onClick={() => onPick(id)} aria-label={`${label}. Show the source`}>
      {children}
      {f && <Dot state={f.state} />}
    </button>
  );
}

/* ---------- station 1: the footprint you bring ---------- */
function Footprint({ onPick }: { onPick: Pick }) {
  return (
    <PicBtn id="deploy.minimums" label="Minimum footprint: 12 CPU cores and 24 GB RAM for IOMETE services, plus one 4-core, 32 GB node for Spark" onPick={onPick} className="hh-foot">
      <span className="hh-node">
        <span className="hh-node-h"><b>IOMETE services</b><i>12 cores · 24 GB</i></span>
        <span className="hh-cores" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i} style={{ ["--i" as string]: i }} />)}</span>
        <span className="hh-ram" aria-hidden="true"><span style={{ width: `${(24 / 32) * 100}%` }} /></span>
      </span>
      <span className="hh-node hh-node-spark">
        <span className="hh-node-h"><b>Spark node</b><i>4 cores · 32 GB</i></span>
        <span className="hh-cores" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i} style={{ ["--i" as string]: 12 + i }} />)}</span>
        <span className="hh-ram" aria-hidden="true"><span style={{ width: "100%" }} /></span>
      </span>
      <span className="hh-key" aria-hidden="true"><span className="k-core" />CPU core <span className="k-ram" />RAM</span>
    </PicBtn>
  );
}

/* ---------- station 2: the install clock (a claim) ---------- */
function InstallClock({ onPick, seen }: { onPick: Pick; seen: boolean }) {
  const r = 52, c = 2 * Math.PI * r;
  const seg = (from: number, to: number) => ({
    strokeDasharray: `${(((to - from) / 60) * c - 3).toFixed(2)} ${c.toFixed(2)}`,
    strokeDashoffset: (-((from / 60) * c)).toFixed(2),
  });
  const pt = (m: number) => { const a = (m / 60) * 2 * Math.PI; return `${(66 + r * Math.cos(a)).toFixed(2)} ${(66 + r * Math.sin(a)).toFixed(2)}`; };
  const arc = (a: number, b: number) => `M ${pt(a)} A ${r} ${r} 0 0 1 ${pt(b)}`;
  return (
    <PicBtn id="deploy.time" label="IOMETE says a cloud install takes about 25 minutes: about 15 for Terraform plus 5 for Helm" onPick={onPick} className="hh-clockbtn">
      <span className="hh-clockwrap">
        <svg viewBox="0 0 132 132" className={`hh-clock${seen ? " on" : ""}`} aria-hidden="true">
          <g transform="rotate(-90 66 66)">
            <circle cx="66" cy="66" r={r} className="hh-clock-track" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * 2 * Math.PI, q = (n: number) => Math.round(n * 100) / 100;
              return <line key={i} x1={q(66 + 58 * Math.cos(a))} y1={q(66 + 58 * Math.sin(a))} x2={q(66 + 61 * Math.cos(a))} y2={q(66 + 61 * Math.sin(a))} className="hh-tick" />;
            })}
            <circle cx="66" cy="66" r={r} className="hh-arc hh-arc-tf" style={seg(0, 15)} />
            <circle cx="66" cy="66" r={r} className="hh-arc hh-arc-helm" style={seg(15, 20)} />
            <path d={arc(20, 25)} className="hh-arc hh-arc-all" />
          </g>
        </svg>
        <span className="hh-clock-c"><b>~25</b><i>min</i></span>
      </span>
      <span className="hh-claim">IOMETE says</span>
      <span className="hh-clockkey" aria-hidden="true">
        <span><span className="k-tf" />Terraform ~15</span>
        <span><span className="k-helm" />Helm ~5</span>
        <span><span className="k-rest" />rest</span>
      </span>
    </PicBtn>
  );
}

/* ---------- station 3: day 2 never ends ---------- */
function DayTwo({ onPick }: { onPick: Pick }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <PicBtn id="mkt.k8s-skills" label="Running IOMETE needs Kubernetes skills, as IOMETE itself says" onPick={onPick} className="hh-day2">
      <span className="hh-week" aria-hidden="true">
        {days.map((d, i) => <span key={d} style={{ ["--i" as string]: i }}><i>{d}</i><b /></span>)}
        {days.map((d, i) => <span key={d + "2"} className="wk2" style={{ ["--i" as string]: i + 7 }}><b /></span>)}
        {days.map((d, i) => <span key={d + "3"} className="wk3" style={{ ["--i" as string]: i + 14 }}><b /></span>)}
      </span>
      <span className="hh-week-more" aria-hidden="true">This week, next week, every week</span>
      <span className="hh-who">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
        Someone with Kubernetes skills
      </span>
    </PicBtn>
  );
}

/* ---------- help if you lack that person ---------- */
function Help({ onPick }: { onPick: Pick }) {
  const modules = ["Compute clusters", "Connections & troubleshooting", "Apache Iceberg"];
  return (
    <div className="hh-help">
      <PicBtn id="co.fde" label="IOMETE offers forward-deployed engineers who work as an extension of your team" onPick={onPick} className="hh-hcard">
        <span className="hh-team" aria-hidden="true">
          <span className="p" /><span className="p" /><span className="p" /><span className="p p-io" />
        </span>
        <b>IOMETE engineers join your team</b>
        <i>Your people <span className="sw sw-you" /> + IOMETE <span className="sw sw-io" /></i>
      </PicBtn>
      <PicBtn id="price.free" label="Free plan: no licence cost, up to 100 vCPUs, access reviewed manually" onPick={onPick} className="hh-hcard">
        <span className="hh-meter" aria-hidden="true">
          <span className="hh-meter-n"><b>100</b> vCPUs</span>
          <span className="hh-meter-bar"><span /></span>
          <span className="hh-meter-ax"><i>0</i><i>max on Free</i></span>
        </span>
        <b>Try it free, up to 100 vCPUs</b>
        <i>No licence cost · access reviewed manually</i>
      </PicBtn>
      <PicBtn id="feat.university" label="IOMETE University: 9 free videos in 3 modules" onPick={onPick} className="hh-hcard">
        <span className="hh-vids" aria-hidden="true">
          {modules.map((m) => (
            <span key={m} className="hh-mod">
              <span className="hh-mod-v">{[0, 1, 2].map((k) => <span key={k}><svg viewBox="0 0 10 10"><path d="M3 2l5 3-5 3z" /></svg></span>)}</span>
              <i>{m}</i>
            </span>
          ))}
        </span>
        <b>9 free training videos</b>
        <i>3 modules, IOMETE University</i>
      </PicBtn>
    </div>
  );
}

/* ---------- gaps ---------- */
function Gaps({ onPick }: { onPick: Pick }) {
  return (
    <div className="hh-gaps">
      <PicBtn id="feat.lineage" label="Data lineage is not shipped; it is in the roadmap backlog" onPick={onPick} className="hh-gap">
        <svg viewBox="0 0 120 48" className="hh-gap-art" aria-hidden="true">
          <path d="M18 24 H52 M68 24 L100 10 M68 24 L100 38" className="ghost" />
          <circle cx="12" cy="24" r="7" /><circle cx="60" cy="24" r="7" className="o" />
          <circle cx="106" cy="10" r="6" className="o" /><circle cx="106" cy="38" r="6" className="o" />
        </svg>
        <b>Data lineage</b><i>In the roadmap backlog</i>
      </PicBtn>
      <PicBtn id="feat.no-cli" label="No IOMETE command-line tool is documented" onPick={onPick} className="hh-gap">
        <span className="hh-term" aria-hidden="true"><span>$ iomete</span><span className="cur" /><span className="x">not documented</span></span>
        <b>Command-line tool</b><i>None documented</i>
      </PicBtn>
      <PicBtn id="deploy.k8s-matrix" label="No supported Kubernetes version matrix is published" onPick={onPick} className="hh-gap">
        <span className="hh-matrix" aria-hidden="true">
          <span>K8s 1.?</span><b>?</b><span>K8s 1.?</span><b>?</b><span>K8s 1.?</span><b>?</b>
        </span>
        <b>Kubernetes version list</b><i>Not published</i>
      </PicBtn>
      <PicBtn id="deploy.terraform" label="Terraform install is available for Azure only" onPick={onPick} className="hh-gap">
        <span className="hh-clouds" aria-hidden="true">
          <span className="on">Azure</span><span>AWS</span><span>GCP</span>
        </span>
        <b>Terraform install</b><i>Azure only</i>
      </PicBtn>
      <PicBtn id="feat.table-maint" label="Automated Iceberg table maintenance is in beta and works only for some catalog types" onPick={onPick} className="hh-gap">
        <span className="hh-beta" aria-hidden="true"><span>BETA</span><span className="cats"><i className="on" /><i className="on" /><i /><i /></span></span>
        <b>Table maintenance</b><i>Beta, some catalogs only</i>
      </PicBtn>
    </div>
  );
}

/* ---------- readiness self-check ---------- */
const CHECKS: { k: string; q: string; fact: string; miss: string }[] = [
  { k: "k8s", q: "We already run Kubernetes", fact: "deploy.models", miss: "IOMETE runs on Kubernetes: EKS, AKS, GKE, OpenShift, Tanzu or your own." },
  { k: "store", q: "We have an S3-compatible object store", fact: "deploy.storage", miss: "You need object storage: S3, Azure Blob, GCS, MinIO, Dell ECS and others work." },
  { k: "room", q: "We can spare 16 cores and 56 GB RAM", fact: "deploy.minimums", miss: "Minimum: 12 cores + 24 GB for services, plus a 4-core, 32 GB Spark node." },
  { k: "person", q: "Someone can own the cluster day to day", fact: "co.fde", miss: "No one yet? IOMETE offers engineers who work as part of your team." },
  { k: "gaps", q: "We can live without lineage and a CLI for now", fact: "feat.lineage", miss: "Lineage is in the backlog and no CLI is documented. Check these against your pilot." },
];

function SelfCheck({ onPick }: { onPick: Pick }) {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const n = CHECKS.filter((c) => on[c.k]).length;
  const missing = CHECKS.filter((c) => !on[c.k]);
  const verdict = n === 5 ? "You have what the docs ask for. The Free plan is the next step."
    : n === 0 ? "Tick what is true for your team."
    : `${5 - n} to sort out first. Each one is listed below.`;
  return (
    <section className="hh-check" aria-labelledby="hh-check-h">
      <div className="hh-check-head">
        <span className="hh-eyebrow">Readiness check</span>
        <h3 id="hh-check-h">Could your team run it?</h3>
      </div>
      <div className="hh-check-body">
        <ul className="hh-check-list">
          {CHECKS.map((c) => (
            <li key={c.k}>
              <button role="checkbox" aria-checked={!!on[c.k]} className={on[c.k] ? "on" : ""} onClick={() => setOn((s) => ({ ...s, [c.k]: !s[c.k] }))}>
                <span className="box" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5" /></svg></span>
                {c.q}
              </button>
            </li>
          ))}
        </ul>
        <div className="hh-score" aria-live="polite">
          <div className="hh-score-bar" aria-hidden="true">{CHECKS.map((c) => <span key={c.k} className={on[c.k] ? "on" : ""} />)}</div>
          <p className="hh-score-n"><b>{n}</b>/5 ready</p>
          <p className="hh-score-v">{verdict}</p>
          {n > 0 && missing.length > 0 && (
            <ul className="hh-miss">
              {missing.map((c) => (
                <li key={c.k}><button onClick={() => onPick(c.fact)}>{c.miss}<span className="hh-arrow" aria-hidden="true">→</span></button></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function HowHardToRun({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLOListElement>(0.2);
  return (
    <figure className="visual hh" aria-label="The path to running IOMETE: what you bring, the install, and day-to-day operation, with the help on offer and the gaps today">
      <ol ref={ref} className={`hh-path${seen ? " seen" : ""}`}>
        <li className="hh-st">
          <span className="hh-n" aria-hidden="true">1</span>
          <span className="hh-eyebrow">Before · you bring</span>
          <h3>A Kubernetes cluster and an object store</h3>
          <Footprint onPick={onPick} />
          <PicBtn id="deploy.storage" label="Works with S3, Azure Blob/ADLS, GCS, MinIO, Dell ECS, Ozone, IBM COS and other S3-compatible object stores" onPick={onPick} className="hh-store">
            <svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="8" rx="11" ry="4" /><path d="M5 8v16c0 2.2 4.9 4 11 4s11-1.8 11-4V8M5 16c0 2.2 4.9 4 11 4s11-1.8 11-4" /></svg>
            <span><b>+ your object store</b><i>S3 · Azure Blob · GCS · MinIO · Dell ECS · Ozone · IBM COS</i></span>
          </PicBtn>
          <div className="hh-tiles">
            <Tile id="deploy.minimums" label="Minimum footprint" onPick={onPick} />
          </div>
        </li>
        <li className="hh-st">
          <span className="hh-n" aria-hidden="true">2</span>
          <span className="hh-eyebrow">Day 1 · install</span>
          <h3>Terraform and Helm, in the cloud</h3>
          <InstallClock onPick={onPick} seen={seen} />
          <div className="hh-tiles">
            <Tile id="deploy.time" label="About 25 min, IOMETE says" onPick={onPick} />
          </div>
        </li>
        <li className="hh-st">
          <span className="hh-n" aria-hidden="true">3</span>
          <span className="hh-eyebrow">Day 2 · onwards</span>
          <h3>Someone keeps it running</h3>
          <DayTwo onPick={onPick} />
          <div className="hh-tiles">
            <Tile id="mkt.k8s-skills" label="Needs Kubernetes skills" onPick={onPick} />
          </div>
        </li>
      </ol>

      <div className="hh-fork">
        <div className="hh-fork-h"><span className="hh-eyebrow">No one like that yet?</span><h3>Help on offer</h3></div>
        <Help onPick={onPick} />
      </div>

      <div className="hh-not">
        <div className="hh-fork-h"><span className="hh-eyebrow hh-eyebrow-red">Not there yet</span><h3>Five gaps to know before a pilot</h3></div>
        <Gaps onPick={onPick} />
      </div>

      <SelfCheck onPick={onPick} />
    </figure>
  );
}
