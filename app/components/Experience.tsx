"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { PERSONAS } from "@/content/personas";
import { INTENTS, intentBySlug, intentFor, sectionsFor, type Intent } from "@/content/intents";
import { TEASERS } from "@/content/teasers";
import { CHECKED_AT, FACTS, factById } from "@/lib/facts";
import type { Answer } from "@/lib/types";
import Landing from "./Landing";
import { Icon } from "./QuestionIcon";
import { VISUALS, Dot } from "./Visuals";
import { EvidenceBar, Statements } from "./Statements";
import { BotDock, ask, type Turn } from "./Bot";

function readIntent(): Intent | null {
  const params = new URLSearchParams(window.location.search);
  const v = params.get("v");
  if (v && intentBySlug[v]) return intentBySlug[v];
  const p = params.get("p");
  if (p === "fde" || p === "cro" || p === "ceo") return intentFor(p);
  return null;
}

/** The question a buyer usually has next, so every page hands off to one obvious step. */
const NEXT_Q: Record<string, string> = {
  "where-data-goes": "security-review",
  "security-review": "where-data-goes",
  "what-it-costs": "why-not-saas",
  "why-not-saas": "what-it-costs",
  "what-gets-installed": "how-hard-to-run",
  "how-hard-to-run": "what-gets-installed",
};

/** Which questions this visitor has opened, for this browser tab only. */
const SEEN_KEY = "iomete.seen";
function loadSeen(): string[] {
  try { const v = JSON.parse(sessionStorage.getItem(SEEN_KEY) || "[]"); return Array.isArray(v) ? v.filter((s) => intentBySlug[s]) : []; }
  catch { return []; }
}
function saveSeen(s: string[]) {
  try { sessionStorage.setItem(SEEN_KEY, JSON.stringify(s)); } catch { /* storage blocked: progress just isn't remembered */ }
}

/** Split the direct answer into a one-line hook and the rest. */
function splitAnswer(a: string): [string, string] {
  const m = a.match(/^(.+?[.!?])\s+(?=[A-Z$])(.*)$/s);
  return m ? [m[1], m[2]] : [a, ""];
}

/** Swap page content inside a View Transition when the browser has one, so pages crossfade instead of flashing. */
type VT = { skipTransition: () => void; finished: Promise<void> };
let activeVT: VT | null = null;
function transition(update: () => void) {
  const d = document as Document & { startViewTransition?: (cb: () => void) => VT };
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!d.startViewTransition || reduce) { update(); return; }
  const vt = d.startViewTransition(() => flushSync(update));
  activeVT = vt;
  vt.finished.catch(() => {}).finally(() => { if (activeVT === vt) activeVT = null; });
}
/** While pages crossfade the browser routes clicks to <html>; end the fade and hand the click to what is underneath. */
function useClickThroughTransitions() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!activeVT || e.target !== document.documentElement) return;
      activeVT.skipTransition();
      activeVT = null;
      const { clientX: x, clientY: y } = e;
      requestAnimationFrame(() => {
        const el = document.elementFromPoint(x, y);
        if (el && el !== document.documentElement) el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, clientX: x, clientY: y }));
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

function Progress({ current, seen, go }: { current: string; seen: string[]; go: (i: Intent) => void }) {
  const idx = INTENTS.findIndex((i) => i.slug === current);
  return (
    <nav className="qrail" aria-label="The six questions">
      <span className="qrail-count">Question {idx + 1} of {INTENTS.length}</span>
      <ol>
        {INTENTS.map((i) => {
          const here = i.slug === current;
          const was = seen.includes(i.slug);
          return (
            <li key={i.slug} className={here ? "here" : was ? "seen" : ""}>
              <button onClick={() => go(i)} aria-current={here ? "page" : undefined}
                aria-label={`${i.question}${here ? " (this page)" : was ? " (seen)" : ""}`} title={i.question} disabled={here}>
                <Icon slug={i.slug} />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function Experience({ initial }: { initial: string | null }) {
  const [intent, setIntent] = useState<Intent | null>(initial ? intentBySlug[initial] ?? null : null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [highlight, setHighlight] = useState<string | undefined>();
  const [pending, setPending] = useState<{ atom?: string; fact?: string } | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [seen, setSeen] = useState<string[]>([]);
  useClickThroughTransitions();

  useEffect(() => {
    const onPop = () => transition(() => { setIntent(readIntent()); window.scrollTo(0, 0); });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // remember every question opened in this tab
  useEffect(() => {
    const s = loadSeen();
    const next = intent && !s.includes(intent.slug) ? [...s, intent.slug] : s;
    if (next !== s) saveSeen(next);
    setSeen(next);
  }, [intent]);

  const hlTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const intentRef = useRef(intent);
  intentRef.current = intent;
  const go = useCallback((next: Intent | null, target?: { atom?: string; fact?: string }) => {
    if (intentRef.current?.slug !== next?.slug) {
      window.history.pushState({}, "", next ? `/?v=${next.slug}` : "/");
      transition(() => {
        // a new page starts folded, unless we are about to point at one of its statements
        setDetailsOpen(!!target?.fact);
        setIntent(next);
        // a new page starts at its top; a pointed-at statement scrolls below
        if (!target?.fact && !target?.atom) window.scrollTo(0, 0);
        else setPending(target);
      });
      return;
    }
    setIntent(next);
    setPending(target ?? {});
  }, []);

  useEffect(() => {
    if (!pending) return;
    if (pending.fact && !detailsOpen) { setDetailsOpen(true); return; }
    const t = setTimeout(() => {
      const el =
        (pending.fact && document.getElementById(`fact-${pending.fact}`)) ||
        (pending.atom && document.getElementById(`atom-${pending.atom}`));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      if (pending.fact) {
        setHighlight(pending.fact);
        // one timer at a time, so an older highlight cannot clear a newer one
        clearTimeout(hlTimer.current);
        hlTimer.current = setTimeout(() => setHighlight(undefined), 4000);
      }
      setPending(null);
    }, 80);
    return () => clearTimeout(t);
  }, [pending, intent, detailsOpen]);

  const pick = useCallback((factId: string) => setPending({ fact: factId }), []);

  const show = useCallback((a: Answer) => {
    if (a.action.type !== "navigate" || !a.action.persona) return;
    // stay on the current page if it already shows the target
    const here = intent && intent.persona === a.action.persona && (!a.action.atom || sectionsFor(intent).includes(a.action.atom));
    go(here ? intent : intentFor(a.action.persona, a.action.atom), { atom: a.action.atom, fact: a.action.fact });
  }, [go, intent]);

  const onAsk = useCallback(async (q: string) => {
    setDockOpen(true);
    setBusy(true);
    setTurns((t) => [...t, { q }]);
    try {
      const a = await ask(q, intent?.persona);
      setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, a } : x)));
      if (a.action.type === "navigate") show(a);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, error: `${msg} Try again in a moment.` } : x)));
    } finally {
      setBusy(false);
    }
  }, [intent, show]);

  const sections = intent ? sectionsFor(intent) : [];
  const next = intent ? PERSONAS[intent.persona].next.filter((n) => !n.href.includes(`v=${intent.slug}`) || n.href.startsWith("/brief")) : [];
  const seenCount = seen.length;

  return (
    <div className={`app${dockOpen ? " dock-open" : ""}`}>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="wordmark" href="/" onClick={(e) => { e.preventDefault(); go(null); }}>
            <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#d3f52c" stroke="#2d382d" strokeWidth="1.5" /></svg>
            <b>IOMETE</b><span>in plain words</span>
          </a>
          <nav className="topnav">
            {intent && (
              <button className="topnav-all" onClick={() => go(null)}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><g fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1.5" /><rect x="8" y="0" width="6" height="6" rx="1.5" /><rect x="0" y="8" width="6" height="6" rx="1.5" /><rect x="8" y="8" width="6" height="6" rx="1.5" /></g></svg>
                <span>All questions</span>{seenCount > 0 && <small>{seenCount}/{INTENTS.length}</small>}
              </button>
            )}
            <button className="btn btn-lime btn-sm" onClick={() => setDockOpen(true)} aria-expanded={dockOpen}>Ask a question</button>
          </nav>
        </div>
      </header>

      {!intent ? (
        <Landing go={go} onAsk={onAsk} busy={busy} last={turns[turns.length - 1]?.a} onShow={show} />
      ) : (
        <main className={`answer v-${intent.slug}`} key={intent.slug}>
          <div className="wrap">
            {(() => {
              const [hook, rest] = splitAnswer(intent.answer);
              return (
                <div className="a-head">
                  <Progress current={intent.slug} seen={seen} go={go} />
                  <h1>{intent.question}</h1>
                  <p className="q-answer"><span className="hook">{hook}</span>{rest && <span className="rest"> {rest}</span>}</p>
                </div>
              );
            })()}
            {(() => { const V = VISUALS[intent.slug]; return <V onPick={pick} />; })()}
            <Statements atoms={sections} open={detailsOpen} setOpen={setDetailsOpen} highlight={highlight} />
            {(() => {
              const nx = intentBySlug[NEXT_Q[intent.slug]];
              const t = TEASERS[nx.slug];
              const tf = t && factById[t.fact];
              const others = INTENTS.filter((i) => i.slug !== intent.slug && i.slug !== nx.slug);
              const left = INTENTS.filter((i) => !seen.includes(i.slug)).length;
              return (
                <nav className="nextup" aria-label="Where to go next">
                  <div className="nextup-head">
                    <p className="nextup-hook">Usually asked next</p>
                    <p className="nextup-progress" aria-live="polite">
                      {left === 0 ? "You have seen all six questions." : `${INTENTS.length - left} of ${INTENTS.length} seen`}
                      <span className="pbar" aria-hidden="true">{INTENTS.map((i) => <i key={i.slug} className={seen.includes(i.slug) ? "on" : ""} />)}</span>
                    </p>
                  </div>
                  <button className="nextup-main" onClick={() => go(nx)}>
                    <span className="nm-icon"><Icon slug={nx.slug} /></span>
                    {t && <span className="nm-big">{t.big}</span>}
                    <span className="nm-q">{nx.question}</span>
                    {t && <span className="nm-line">{tf && <Dot state={tf.state} />}{t.line}</span>}
                    <span aria-hidden="true" className="arrow">→</span>
                    {seen.includes(nx.slug) && <span className="nm-seen">Seen</span>}
                  </button>
                  <div className="more">
                    {others.map((i) => {
                      const ti = TEASERS[i.slug];
                      const was = seen.includes(i.slug);
                      return (
                        <button key={i.slug} onClick={() => go(i)} className={was ? "seen" : ""}>
                          <span className="mo-top"><Icon slug={i.slug} />{was && <span className="mo-seen">Seen</span>}</span>
                          {ti && <span className="mo-big">{ti.big}</span>}
                          <span className="mo-q">{i.question}</span>
                        </button>
                      );
                    })}
                  </div>
                </nav>
              );
            })()}
            {next.length > 0 && (
              <section className="takeaway" aria-label="Take it further">
                <p className="nextup-hook">Take it further</p>
                <ul className="next-links">
                  {next.map((n) => {
                    const ext = n.href.startsWith("http");
                    return (
                      <li key={n.label}>
                        <a href={n.href} target={ext ? "_blank" : undefined} rel="noreferrer"
                          onClick={(e) => { if (n.href.startsWith("/?v=")) { e.preventDefault(); go(intentBySlug[n.href.slice(4)]); } }}>
                          <b>{n.label}<span aria-hidden="true">{ext ? " ↗" : " →"}</span></b>
                          {n.note && <span>{n.note}</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </main>
      )}

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <p className="footer-brand"><svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#d3f52c" /></svg><b>IOMETE</b> in plain words</p>
            <p>An unofficial guide built at hackCBS 9.0 for IOMETE&apos;s “Make Complex Tech Easy to Buy” track. Not affiliated with or endorsed by IOMETE.</p>
          </div>
          <div>
            <p className="footer-h">The six questions</p>
            <ul className="footer-qs">
              {INTENTS.map((i) => (
                <li key={i.slug} className={seen.includes(i.slug) ? "seen" : ""}>
                  <a href={`/?v=${i.slug}`} onClick={(e) => { e.preventDefault(); go(i); }}>{i.question}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-h">{FACTS.length} statements, checked {CHECKED_AT}</p>
            <EvidenceBar facts={FACTS} />
            <p className="footer-links"><a href="https://iomete.com" target="_blank" rel="noreferrer">iomete.com ↗</a><a href="https://iomete.com/resources" target="_blank" rel="noreferrer">Docs ↗</a><a href="https://github.com/iomete/iom-docs" target="_blank" rel="noreferrer">Docs source ↗</a></p>
          </div>
        </div>
      </footer>

      <BotDock turns={turns} busy={busy} onAsk={onAsk} onShow={show} open={dockOpen} setOpen={setDockOpen} />
    </div>
  );
}
