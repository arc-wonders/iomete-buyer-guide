"use client";
import { useState } from "react";
import { Dot, Tile, useInView, type Pick } from "./shared";
import { CostChart, FLOOR_VCPU, FREE_MAX, PER_VCPU, X_MAX, licence, money, useTween, useWidth } from "./Cost.parts";

export function Cost({ onPick }: { onPick: Pick }) {
  const [vcpu, setVcpu] = useState(320);
  const [focus, setFocus] = useState<string | null>(null);
  const [plotRef, width] = useWidth<HTMLDivElement>();
  const [viewRef, seen] = useInView<HTMLDivElement>(0.2);
  const lic = licence(vcpu);
  const shown = useTween(lic);

  const plan = vcpu <= FREE_MAX ? "free" : "enterprise";
  const why =
    vcpu <= FREE_MAX ? <>Free plan, up to 100 vCPUs. Community support.</>
    : vcpu < FLOOR_VCPU ? <>Enterprise minimum. You pay for 200 vCPUs and use {vcpu}.</>
    : <>{vcpu.toLocaleString("en-US")} vCPUs × $500, Enterprise</>;

  // chart geometry the slider must line up with
  const narrow = width < 560;
  const padL = narrow ? 46 : 58, padR = narrow ? 12 : 20;
  const share = Math.min(1, lic / (X_MAX * PER_VCPU));

  const plans = [
    { k: "free", id: "price.free", n: "Free", p: "$0", d: "up to 100 vCPUs", go: 100 },
    { k: "floor", id: "price.enterprise", n: "Enterprise", p: "$500", d: "per vCPU a year · $100K min.", go: 200 },
    { k: "bc", id: "price.bc", n: "Business Critical", p: "Custom", d: "$250K a year minimum", go: null },
  ];

  return (
    <figure className="visual cost">
      <div className="cost-panel" ref={viewRef}>
        <div className="cost-head">
          <button className="cost-hero" onClick={() => onPick(plan === "free" ? "price.free" : "price.enterprise")}>
            <span className="cost-eyebrow">Licence, per year</span>
            <span className="cost-big" aria-live="polite">{money(shown)}</span>
            <span className="cost-why"><Dot state="documented" /> {why}</span>
          </button>
          <button className="cost-noq" onClick={() => onPick("price.no-per-query")} aria-label="IOMETE says there are no per-query or per-user fees">
            <span className="cost-noq-row"><b>$0</b><span>per query</span></span>
            <span className="cost-noq-row"><b>$0</b><span>per user</span></span>
            <span className="cost-noq-src"><Dot state="claimed" /> IOMETE says</span>
          </button>
        </div>

        <div className="cost-plot" ref={plotRef}>
          {width > 0 && <CostChart width={width} vcpu={vcpu} setVcpu={setVcpu} onPick={onPick} seen={seen} focus={focus} />}
          <div className="cost-range" style={{ paddingLeft: padL - 11, paddingRight: padR - 11 }}>
            <input
              id="vcpu" type="range" min={10} max={X_MAX} step={10} value={vcpu}
              onChange={(e) => setVcpu(+e.target.value)}
              aria-label="How many vCPUs?"
              aria-valuetext={`${vcpu} vCPUs, ${money(lic)} a year`}
              style={{ ["--p" as string]: `${((vcpu - 10) / (X_MAX - 10)) * 100}%` }}
            />
          </div>
          <div className="cost-xlabel"><span className="cost-drag">Drag to size your cluster</span><span className="cost-live" aria-hidden="true"><b>{vcpu}</b> vCPUs → <b>{money(lic)}</b></span><span>vCPUs</span></div>
          <output htmlFor="vcpu" className="sr-only">{money(lic)}</output>
        </div>

        <div className="cost-plans" role="group" aria-label="Plans">
          {plans.map((p) => (
            <button
              key={p.k}
              className={"cost-plan" + ((p.k === "free" && plan === "free") || (p.k === "floor" && plan === "enterprise") ? " is-active" : "")}
              onMouseEnter={() => setFocus(p.k)} onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(p.k)} onBlur={() => setFocus(null)}
              onClick={() => { if (p.go) setVcpu(p.go); onPick(p.id); }}
            >
              <span className="cost-plan-n"><Dot state="documented" />{p.n}</span>
              <b>{p.p}</b>
              <small>{p.d}</small>
            </button>
          ))}
        </div>
      </div>

      {/* what the bill really is: one known part, two honest unknowns */}
      <div className="cost-bill" aria-label="Your yearly bill">
        <p className="cost-bill-title">Your real yearly bill</p>
        <div className="cost-bill-row">
          <button className="bill bill-known" style={{ ["--s" as string]: share }} onClick={() => onPick("price.enterprise")}>
            <span className="bill-tag"><Dot state="documented" /> IOMETE licence</span>
            <b>{money(shown)}</b>
            <small>published price</small>
          </button>
          <span className="bill-plus" aria-hidden="true">+</span>
          <button className="bill bill-fog" onClick={() => onPick("price.infra")}>
            <span className="bill-tag"><Dot state="documented" /> Your infrastructure</span>
            <span className="bill-fogbar" aria-hidden="true"><i /></span>
            <small>paid to your own cloud or hardware, not IOMETE</small>
          </button>
          <span className="bill-plus" aria-hidden="true">+</span>
          <button className="bill bill-fog bill-unknown" onClick={() => onPick("price.support-cost")}>
            <span className="bill-tag"><Dot state="unknown" /> Support &amp; onboarding</span>
            <span className="bill-fogbar" aria-hidden="true"><i /></span>
            <small>prices not published</small>
          </button>
        </div>
        <button className="bill-sla" onClick={() => onPick("price.support-sla")}>
          <Dot state="documented" /><span>Support response times <em>are</em> published: Sev-1 in 1 hour (Silver, Gold) or 30 minutes (Platinum)</span>
        </button>
      </div>

      {/* the hooks that lead to the next question */}
      <div className="cost-more">
        <button className="tile tile-documented cost-card" onClick={() => onPick("price.history")}>
          <span className="cost-card-h"><Dot state="documented" /> Pricing changed 3 times since 2023</span>
          <ol className="cost-steps" aria-label="per core per month, then per vCPU-hour, then per vCPU per year">
            <li>per core<br />/ month</li>
            <li>per<br />vCPU-hour</li>
            <li className="now">per vCPU<br />/ year</li>
          </ol>
        </button>
        <button className="tile tile-claimed cost-card" onClick={() => onPick("price.savings")}>
          <span className="cost-card-h"><Dot state="claimed" /> IOMETE&rsquo;s savings claims vary by page</span>
          <span className="cost-claims">
            <span><b>2–5x</b><small>homepage</small></span>
            <span><b>30–60%</b><small>FAQ</small></span>
            <span><b>40–60%</b><small>blog, lower TCO</small></span>
            <span className="odd"><b>~1%</b><small>one of its own worked examples</small></span>
          </span>
        </button>
        <div className="cost-tiles">
          <Tile id="price.marketplace" label="Cloud marketplace listing: none found" onPick={onPick} />
        </div>
      </div>

      <table className="sr-only">
        <caption>Licence per year at key sizes</caption>
        <tbody>
          {[50, 100, 150, 200, 500, 1000].map((v) => (<tr key={v}><th>{v} vCPUs</th><td>{money(licence(v))}</td></tr>))}
        </tbody>
      </table>
    </figure>
  );
}
