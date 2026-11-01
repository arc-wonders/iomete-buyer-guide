"use client";
import { useEffect, useState } from "react";
import { ATOMS } from "@/content/atoms";
import { factById } from "@/lib/facts";
import type { Fact, State } from "@/lib/types";
import { STATE_LABEL } from "./FactCard";
import { Dot } from "./Visuals";

const ORDER: State[] = ["documented", "claimed", "unknown"];

function domain(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

/** A thin bar split by evidence state, with counts. Doubles as the page's legend. */
export function EvidenceBar({ facts, label }: { facts: Fact[]; label?: string }) {
  const n = facts.length || 1;
  const by = ORDER.map((s) => ({ s, k: facts.filter((f) => f.state === s).length }));
  return (
    <div className="ev">
      <div className="ev-bar" role="img" aria-label={label ?? by.map(({ s, k }) => `${k} ${s === "claimed" ? "IOMETE claims" : STATE_LABEL[s].toLowerCase()}`).join(", ")}>
        {by.map(({ s, k }) => k > 0 && <span key={s} className={`ev-seg ev-${s}`} style={{ flexGrow: k / n }} />)}
      </div>
      <ul className="ev-key" aria-hidden="true">
        {by.map(({ s, k }) => (
          <li key={s}><Dot state={s} /><b>{k}</b> {s === "claimed" ? "IOMETE claims" : STATE_LABEL[s].toLowerCase()}</li>
        ))}
      </ul>
    </div>
  );
}

/** Every sourced statement behind a page, folded away until wanted. */
export function Statements({ atoms, open, setOpen, highlight }: {
  atoms: string[]; open: boolean; setOpen: (o: boolean) => void; highlight?: string;
}) {
  const [only, setOnly] = useState<State | null>(null);
  // a pointed-at statement must never be hidden by a filter
  useEffect(() => { if (highlight) setOnly(null); }, [highlight]);
  const key = atoms.join("|");
  useEffect(() => { setOnly(null); }, [key]);

  const groups = atoms.map((id) => ATOMS.find((a) => a.id === id)!).filter(Boolean);
  const ids = [...new Set(groups.flatMap((g) => g.facts))].filter((id) => factById[id]);
  const facts = ids.map((id) => factById[id]);

  return (
    <details className="statements" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary>
        <span className="st-eyebrow">The evidence</span>
        <span className="st-title"><b>{facts.length}</b> sourced statements behind this page</span>
        <EvidenceBar facts={facts} />
        <span className="st-hint">Tap any tile in the picture to jump to its source.</span>
        <span className="st-toggle" aria-hidden="true">{open ? "Hide" : "Read them"}<i /></span>
      </summary>

      <div className="st-body">
        <div className="st-filter" role="group" aria-label="Show statements">
          <button aria-pressed={only === null} onClick={() => setOnly(null)}>All <b>{facts.length}</b></button>
          {ORDER.map((s) => {
            const k = facts.filter((f) => f.state === s).length;
            return k > 0 && (
              <button key={s} aria-pressed={only === s} onClick={() => setOnly(only === s ? null : s)}>
                <Dot state={s} />{STATE_LABEL[s]} <b>{k}</b>
              </button>
            );
          })}
        </div>

        {groups.map((g) => {
          const shown = g.facts.filter((fid) => factById[fid] && (!only || factById[fid].state === only));
          if (!shown.length) return <section key={g.id} id={`atom-${g.id}`} hidden />;
          return (
            <section key={g.id} id={`atom-${g.id}`}>
              <h3><span>{g.title}</span><small>{shown.length}</small></h3>
              <ul>
                {shown.map((fid) => {
                  const f = factById[fid];
                  const d = f.url ? domain(f.url) : "";
                  return (
                    <li key={fid} id={`fact-${fid}`} className={`st-${f.state}${highlight === fid ? " hl" : ""}`}>
                      <span className="st-mark"><Dot state={f.state} />{STATE_LABEL[f.state]}</span>
                      <p>{f.text}</p>
                      {f.quote && <blockquote>{f.quote}</blockquote>}
                      {f.url ? (
                        <a className="st-src" href={f.url} target="_blank" rel="noreferrer">
                          <span className="st-domain">{d}</span><span className="st-name">{f.source}</span><span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="st-src nosrc"><span className="st-domain">no public source</span><span className="st-name">{f.source || "Ask IOMETE in writing"}</span></span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </details>
  );
}
