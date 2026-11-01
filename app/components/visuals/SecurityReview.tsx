"use client";
import { useState } from "react";
import { factById } from "@/lib/facts";
import type { State } from "@/lib/types";
import { Dot, useInView, type Pick } from "./shared";

/* ---------- the facts this picture is drawn from (ids from the controls / attestations / open-questions atoms) ---------- */

const CONTROLS = ["sec.sso", "sec.mfa", "sec.policies", "sec.masking", "sec.audit", "sec.netpol", "sec.secrets", "sec.cves"];
const PAPER = ["sec.soc2", "sec.trust-center", "sec.badges", "mkt.regs", "sec.type2", "sec.iso27001"];
const OPEN: [string, string][] = [
  ["sec.breach", "Breach notice window"], ["sec.pentest", "Pen test cadence or summary"], ["sec.sbom", "SBOM and image signing"],
  ["sec.retention", "Audit log retention and SIEM export"], ["sec.dpa", "Data Processing and Security Addendum"],
  ["sec.mtls", "Internal mutual TLS and TLS versions"], ["sec.backup", "Backup and disaster recovery"],
];

const SHORT: Record<string, string> = {
  "sec.sso": "Single sign-on", "sec.mfa": "MFA via your IdP", "sec.policies": "Access policies", "sec.masking": "Masking",
  "sec.audit": "Audit tables", "sec.netpol": "Network policies", "sec.secrets": "Encrypted secrets", "sec.cves": "CVE fixes",
  "sec.soc2": "SOC 2 Type I", "sec.trust-center": "Trust center", "sec.badges": "HIPAA, GDPR badges", "mkt.regs": "DORA, GDPR mapping",
  "sec.type2": "SOC 2 Type II", "sec.iso27001": "ISO 27001",
  ...Object.fromEntries(OPEN),
};
const WORD: Record<State, string> = { documented: "documented", claimed: "IOMETE claims", unknown: "not public" };

const st = (id: string): State => factById[id]?.state ?? "unknown";
const count = (ids: string[]) => {
  const c = { documented: 0, claimed: 0, unknown: 0 } as Record<State, number>;
  ids.forEach((id) => { c[st(id)]++; });
  return c;
};
const order = (ids: string[]) => {
  const rank: Record<State, number> = { documented: 0, claimed: 1, unknown: 2 };
  return [...ids].sort((a, b) => rank[st(a)] - rank[st(b)]);
};

/* ---------- 1. the verdict: two evidence meters ---------- */

function Meter({ label, ids, onPick, seen, delay }: { label: string; ids: string[]; onPick: Pick; seen: boolean; delay: number }) {
  const c = count(ids);
  return (
    <div className="sr-meter">
      <div className="sr-meter-head">
        <span className="sr-eyebrow">{label}</span>
        <span className="sr-meter-score"><b>{c.documented}</b><span>/{ids.length} documented</span></span>
      </div>
      <div className="sr-cells" role="list">
        {order(ids).map((id, i) => (
          <button key={id} role="listitem" className={`tile sr-cell sr-${st(id)} ${seen ? "on" : ""}`}
            style={{ transitionDelay: `${delay + i * 45}ms` }} onClick={() => onPick(id)}
            title={`${SHORT[id]}: ${WORD[st(id)]}`} aria-label={`${SHORT[id]}: ${WORD[st(id)]}`}>
            <span className="sr-cell-tip" aria-hidden="true">{SHORT[id]}</span>
          </button>
        ))}
      </div>
      <p className="sr-meter-foot">
        {(["documented", "claimed", "unknown"] as State[]).filter((s) => c[s]).map((s) => (
          <span key={s}><Dot state={s} /> {c[s]} {WORD[s]}</span>
        ))}
      </p>
    </div>
  );
}

/* ---------- 2. the control stack: a query passes four documented layers ---------- */

function Layer({ n, name, ids, onPick, children }: { n: string; name: string; ids: string[]; onPick: Pick; children: React.ReactNode }) {
  return (
    <li className="sr-layer">
      <span className="sr-layer-n" aria-hidden="true">{n}</span>
      <div className="sr-layer-body">
        <span className="sr-eyebrow">{name}</span>
        <div className="sr-layer-art" aria-hidden="true">{children}</div>
        <div className="sr-layer-tiles">
          {ids.map((id) => (
            <button key={id} className={`tile sr-chip tile-${st(id)}`} onClick={() => onPick(id)} title={factById[id]?.text}>
              <Dot state={st(id)} /><span>{LAYER_LABEL[id]}</span>
            </button>
          ))}
        </div>
      </div>
    </li>
  );
}
const LAYER_LABEL: Record<string, string> = {
  "sec.sso": "SAML 2.0, OIDC, SCIM, LDAP", "sec.mfa": "MFA through your IdP", "sec.policies": "Resource and tag policies, row filters",
  "sec.masking": "7 masking types, applied at query time", "sec.audit": "Iceberg audit tables",
  "sec.netpol": "Kubernetes NetworkPolicies", "sec.secrets": "AES-256-GCM secrets, optional Vault", "sec.cves": "CVE fixes in v4.0.0, v4.0.1",
};
const MASKS = ["redact", "hash", "null", "last 4", "first 4", "year only", "custom SQL"];

function Stack({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={`sr-stack-wrap ${seen ? "seen" : ""}`}>
      <div className="sr-stack-main">
        <p className="sr-flow-end"><span className="sr-pill">A user runs a query</span></p>
        <ol className="sr-stack">
          <Layer n="1" name="Identity" ids={["sec.sso", "sec.mfa"]} onPick={onPick}>
            <span className="sr-idp">IdP</span><span className="sr-arrow">→</span><span className="sr-idp sr-idp-io">IOMETE</span>
          </Layer>
          <Layer n="2" name="Access" ids={["sec.policies"]} onPick={onPick}>
            <span className="sr-grid">
              {Array.from({ length: 12 }, (_, i) => <i key={i} className={i % 4 === 3 ? "lock" : i >= 8 ? "off" : ""} />)}
            </span>
            <span className="sr-art-note">rows filtered, columns locked</span>
          </Layer>
          <Layer n="3" name="Masking" ids={["sec.masking"]} onPick={onPick}>
            <span className="sr-mask"><code>4111 0000 0000 1234</code><span className="sr-arrow">→</span><code className="m">•••• 1234</code></span>
            <span className="sr-mask-types">{MASKS.map((m) => <i key={m}>{m}</i>)}</span>
          </Layer>
          <Layer n="4" name="Audit" ids={["sec.audit"]} onPick={onPick}>
            <span className="sr-log"><code>platform_event_logs</code><code>data_access_audit</code></span>
          </Layer>
        </ol>
        <p className="sr-flow-end"><span className="sr-pill sr-pill-dark">Results, masked and logged</span></p>
      </div>
      <aside className="sr-rail" aria-label="Around the platform">
        <span className="sr-eyebrow">Around the platform</span>
        {["sec.netpol", "sec.secrets", "sec.cves"].map((id) => (
          <button key={id} className={`tile sr-chip tile-${st(id)}`} onClick={() => onPick(id)} title={factById[id]?.text}>
            <Dot state={st(id)} /><span>{LAYER_LABEL[id]}</span>
          </button>
        ))}
      </aside>
    </div>
  );
}

/* ---------- 3. the paperwork: what exists on a timeline, what is only a badge, what is not public ---------- */

function Seal({ id, title, sub, onPick }: { id: string; title: string; sub: string; onPick: Pick }) {
  const s = st(id);
  return (
    <button className={`tile sr-seal sr-${s}`} onClick={() => onPick(id)} title={factById[id]?.text}>
      <span className="sr-seal-disc" aria-hidden="true"><span>{s === "documented" ? "✓" : s === "claimed" ? "!" : "?"}</span></span>
      <span className="sr-seal-text"><b>{title}</b><small>{sub}</small><em><Dot state={s} /> {WORD[s]}</em></span>
    </button>
  );
}

function Paperwork({ onPick }: { onPick: Pick }) {
  return (
    <div className="sr-paper">
      <div className="sr-track" aria-hidden="true">
        <span className="sr-year" style={{ left: "0%" }}>2022</span>
        <span className="sr-year" style={{ left: "100%" }}>2026</span>
        <span className="sr-track-line" />
        <span className="sr-track-gap">no newer public report</span>
      </div>
      <div className="sr-paper-row">
        <div className="sr-paper-cell">
          <span className="sr-when">Dec 2022</span>
          <Seal id="sec.soc2" title="SOC 2 Type I" sub="Audited by Prescient Assurance" onPick={onPick} />
        </div>
        <div className="sr-paper-cell sr-paper-later">
          <span className="sr-when">Sep 2026 job posting: “readiness work”</span>
          <div className="sr-paper-pair">
            <Seal id="sec.type2" title="SOC 2 Type II" sub="No public report" onPick={onPick} />
            <Seal id="sec.iso27001" title="ISO 27001" sub="No public certificate" onPick={onPick} />
          </div>
        </div>
      </div>
      <div className="sr-paper-also">
        <span className="sr-eyebrow">Also on iomete.com</span>
        <div className="sr-paper-pair">
          <Seal id="sec.badges" title="HIPAA and GDPR badges" sub="No stated scope or assessor" onPick={onPick} />
          <Seal id="mkt.regs" title="DORA and GDPR mapping" sub="IOMETE’s reading, not a legal opinion" onPick={onPick} />
          <Seal id="sec.trust-center" title="Trust center" sub="Vanta-hosted, read it there" onPick={onPick} />
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. the open questions: a checklist you can copy into an email ---------- */

function Checklist({ onPick }: { onPick: Pick }) {
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(OPEN.map(([id]) => [id, true])));
  const [copied, setCopied] = useState(0);
  const picked = OPEN.filter(([id]) => on[id]);
  const copy = async () => {
    const text = "Questions for IOMETE (not answered in public material):\n" +
      picked.map(([id], i) => `${i + 1}. ${factById[id].text}`).join("\n");
    try { await navigator.clipboard.writeText(text); setCopied(picked.length); setTimeout(() => setCopied(0), 2200); } catch { /* blocked */ }
  };
  return (
    <div className="sr-check">
      <div className="sr-check-head">
        <div>
          <span className="sr-eyebrow">Ask IOMETE in writing</span>
          <p className="sr-check-big"><b>{OPEN.length}</b> questions public sources cannot answer</p>
        </div>
        <button className={`btn btn-lime sr-copy ${copied ? "done" : ""}`} onClick={copy} disabled={!picked.length} aria-live="polite">
          {copied ? `✓ Copied ${copied} question${copied > 1 ? "s" : ""}` : `Copy ${picked.length === OPEN.length ? "all " : ""}${picked.length} for your email`}
        </button>
      </div>
      <ol className="sr-check-list">
        {OPEN.map(([id, label], i) => (
          <li key={id} className={on[id] ? "on" : ""}>
            <label className="sr-box">
              <input type="checkbox" checked={!!on[id]} onChange={() => setOn((o) => ({ ...o, [id]: !o[id] }))} aria-label={`Include: ${label}`} />
              <span aria-hidden="true">✓</span>
            </label>
            <button className="tile sr-q tile-unknown" onClick={() => onPick(id)} title={factById[id]?.text}>
              <span className="sr-q-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="sr-q-t"><b>{label}</b><small>{factById[id]?.text}</small></span>
              <Dot state={st(id)} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- page picture ---------- */

export function SecurityReview({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const company = [...PAPER, ...OPEN.map(([id]) => id)];
  const all = count([...CONTROLS, ...company]);
  return (
    <figure className="visual sr" aria-label="Security review scorecard: product controls, attestations and open questions">
      <section className="sr-verdict" ref={ref}>
        <div className="sr-verdict-copy">
          <span className="sr-eyebrow">The scorecard</span>
          <p className="sr-verdict-line">
            Every product control is in the public docs. <span>Most company evidence is not.</span>
          </p>
          <p className="sr-verdict-sum">
            {CONTROLS.length + company.length} things a reviewer looks for:{" "}
            <span><Dot state="documented" /> {all.documented} documented</span>{" "}
            <span><Dot state="claimed" /> {all.claimed} IOMETE claims</span>{" "}
            <span><Dot state="unknown" /> {all.unknown} not public</span>
          </p>
        </div>
        <div className="sr-meters">
          <Meter label="Product controls" ids={CONTROLS} onPick={onPick} seen={seen} delay={0} />
          <Meter label="Company evidence" ids={company} onPick={onPick} seen={seen} delay={380} />
        </div>
      </section>

      <section className="sr-part">
        <header className="sr-part-head"><span className="sr-part-n">01</span><h3>A query meets four documented layers</h3></header>
        <Stack onPick={onPick} />
      </section>

      <section className="sr-part">
        <header className="sr-part-head"><span className="sr-part-n">02</span><h3>One audit report is public, from 2022</h3></header>
        <Paperwork onPick={onPick} />
      </section>

      <section className="sr-part">
        <header className="sr-part-head"><span className="sr-part-n">03</span><h3>The rest you have to ask for</h3></header>
        <Checklist onPick={onPick} />
      </section>
    </figure>
  );
}
