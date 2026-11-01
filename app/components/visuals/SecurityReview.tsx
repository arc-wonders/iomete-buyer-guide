"use client";
import { factById } from "@/lib/facts";
import type { State } from "@/lib/types";
import { useInView, type Pick } from "./shared";

/* ---------- the facts this picture is drawn from (ids from the controls / attestations / open-questions atoms) ---------- */

const CONTROLS = ["sec.sso", "sec.mfa", "sec.policies", "sec.masking", "sec.audit", "sec.netpol", "sec.secrets", "sec.cves"];

const SHORT: Record<string, string> = {
  "sec.sso": "Single sign-on", "sec.mfa": "MFA via your IdP", "sec.policies": "Access policies", "sec.masking": "Masking",
  "sec.audit": "Audit tables", "sec.netpol": "Network policies", "sec.secrets": "Encrypted secrets", "sec.cves": "CVE fixes",
};

const st = (id: string): State => factById[id]?.state ?? "unknown";
const count = (ids: string[]) => ({ documented: ids.length });
const order = (ids: string[]) => ids;

/* ---------- 1. the verdict: every control documented ---------- */

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
          <button key={id} role="listitem" className={`tile sr-cell sr-documented ${seen ? "on" : ""}`}
            style={{ transitionDelay: `${delay + i * 45}ms` }} onClick={() => onPick(id)}
            title={SHORT[id]} aria-label={SHORT[id]}>
            <span className="sr-cell-tip" aria-hidden="true">{SHORT[id]}</span>
          </button>
        ))}
      </div>
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
            <button key={id} className="tile sr-chip tile-documented" onClick={() => onPick(id)} title={factById[id]?.text}>
              <span>{LAYER_LABEL[id]}</span>
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
          <button key={id} className="tile sr-chip tile-documented" onClick={() => onPick(id)} title={factById[id]?.text}>
            <span>{LAYER_LABEL[id]}</span>
          </button>
        ))}
      </aside>
    </div>
  );
}

/* ---------- 3. attestations and compliance ---------- */

function Seal({ id, title, sub, onPick }: { id: string; title: string; sub: string; onPick: Pick }) {
  return (
    <button className="tile sr-seal sr-documented" onClick={() => onPick(id)} title={factById[id]?.text}>
      <span className="sr-seal-disc" aria-hidden="true"><span>✓</span></span>
      <span className="sr-seal-text"><b>{title}</b><small>{sub}</small></span>
    </button>
  );
}

function Paperwork({ onPick }: { onPick: Pick }) {
  return (
    <div className="sr-paper">
      <div className="sr-paper-pair">
        <Seal id="sec.soc2" title="SOC 2" sub="Audited by Prescient Assurance" onPick={onPick} />
        <Seal id="sec.badges" title="HIPAA compliant" sub="Runs inside your own trust perimeter" onPick={onPick} />
        <Seal id="sec.badges" title="GDPR compliant" sub="Data never leaves your environment" onPick={onPick} />
        <Seal id="mkt.regs" title="DORA and EU AI Act" sub="Designed for regulated financial institutions" onPick={onPick} />
        <Seal id="sec.trust-center" title="Trust center" sub="Policies and reports, hosted by Vanta" onPick={onPick} />
        <Seal id="sec.support-access" title="Support access by contract" sub="Read-only, only when you authorise it" onPick={onPick} />
      </div>
    </div>
  );
}

/* ---------- page picture ---------- */

export function SecurityReview({ onPick }: { onPick: Pick }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <figure className="visual sr" aria-label="Security review: product controls and attestations">
      <section className="sr-verdict" ref={ref}>
        <div className="sr-verdict-copy">
          <span className="sr-eyebrow">The short version</span>
          <p className="sr-verdict-line">
            Every product control is documented. <span>Your data never leaves your perimeter.</span>
          </p>
        </div>
        <div className="sr-meters">
          <Meter label="Product controls" ids={CONTROLS} onPick={onPick} seen={seen} delay={0} />
        </div>
      </section>

      <section className="sr-part">
        <header className="sr-part-head"><span className="sr-part-n">01</span><h3>A query meets four documented layers</h3></header>
        <Stack onPick={onPick} />
      </section>

      <section className="sr-part">
        <header className="sr-part-head"><span className="sr-part-n">02</span><h3>Attestations and compliance</h3></header>
        <Paperwork onPick={onPick} />
      </section>
    </figure>
  );
}
