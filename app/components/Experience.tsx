"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { PERSONAS } from "@/content/personas";
import { INTENTS, intentBySlug, intentFor, sectionsFor, type Intent } from "@/content/intents";
import { TEASERS } from "@/content/teasers";
import type { Answer } from "@/lib/types";
import Landing from "./Landing";
import { Icon } from "./QuestionIcon";
import { VISUALS } from "./Visuals";
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

function Progress({ current, go }: { current: string; go: (i: Intent) => void }) {
  return (
    <nav className="qrail" aria-label="The six questions">
      <ol>
        {INTENTS.map((i) => {
          const here = i.slug === current;
          return (
            <li key={i.slug} className={here ? "here" : ""}>
              <button onClick={() => go(i)} aria-current={here ? "page" : undefined}
                aria-label={`${i.question}${here ? " (this page)" : ""}`} title={i.question} disabled={here}>
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
  const [pending, setPending] = useState<{ atom?: string; fact?: string } | null>(null);
  useClickThroughTransitions();

  useEffect(() => {
    const onPop = () => transition(() => { setIntent(readIntent()); window.scrollTo(0, 0); });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const intentRef = useRef(intent);
  intentRef.current = intent;
  const go = useCallback((next: Intent | null, target?: { atom?: string; fact?: string }) => {
    if (intentRef.current?.slug !== next?.slug) {
      window.history.pushState({}, "", next ? `/?v=${next.slug}` : "/");
      transition(() => {
        setIntent(next);
        // a new page starts at its top; a pointed-at section scrolls below
        if (!target?.atom) window.scrollTo(0, 0);
        else setPending(target);
      });
      return;
    }
    setIntent(next);
    setPending(target ?? {});
  }, []);

  useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => {
      const el = pending.atom && document.getElementById(`atom-${pending.atom}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (pending.atom) window.scrollTo({ top: 0, behavior: "smooth" });
      setPending(null);
    }, 80);
    return () => clearTimeout(t);
  }, [pending, intent]);

  // the evidence list is gone from the page, so tapping a picture no longer jumps anywhere
  const pick = useCallback((_factId: string) => {}, []);

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

  const next = intent ? PERSONAS[intent.persona].next.filter((n) => !n.href.includes(`v=${intent.slug}`) || n.href.startsWith("/brief")) : [];

  return (
    <div className={`app${dockOpen ? " dock-open" : ""}`}>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="wordmark" href="/" onClick={(e) => { e.preventDefault(); go(null); }}>
            <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#d3f52c" stroke="#2d382d" strokeWidth="1.5" /></svg>
            <b>IOMETE</b>
          </a>
          <nav className="topnav">
            {intent && (
              <button className="topnav-all" onClick={() => go(null)}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><g fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1.5" /><rect x="8" y="0" width="6" height="6" rx="1.5" /><rect x="0" y="8" width="6" height="6" rx="1.5" /><rect x="8" y="8" width="6" height="6" rx="1.5" /></g></svg>
                <span>All questions</span>
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
              return (
                <div className="a-head">
                  <Progress current={intent.slug} go={go} />
                  <h1>{intent.question}</h1>
                  <p className="q-answer" title={intent.answer}><span className="hook">{intent.hook}</span></p>
                </div>
              );
            })()}
            {(() => { const V = VISUALS[intent.slug]; return <V onPick={pick} />; })()}
            {(() => {
              const nx = intentBySlug[NEXT_Q[intent.slug]];
              const t = TEASERS[nx.slug];
              const others = INTENTS.filter((i) => i.slug !== intent.slug && i.slug !== nx.slug);
              return (
                <nav className="nextup" aria-label="Where to go next">
                  <div className="nextup-head">
                    <p className="nextup-hook">Usually asked next</p>
                  </div>
                  <button className="nextup-main" onClick={() => go(nx)}>
                    <span className="nm-icon"><Icon slug={nx.slug} /></span>
                    {t && <span className="nm-big">{t.big}</span>}
                    <span className="nm-q">{nx.question}</span>
                    <span aria-hidden="true" className="arrow">→</span>
                  </button>
                  <div className="more">
                    {others.map((i) => {
                      const ti = TEASERS[i.slug];
                      return (
                        <button key={i.slug} onClick={() => go(i)}>
                          <span className="mo-top"><Icon slug={i.slug} /></span>
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
                <ul className="next-links">
                  {next.map((n) => {
                    const ext = n.href.startsWith("http");
                    return (
                      <li key={n.label}>
                        <a href={n.href} target={ext ? "_blank" : undefined} rel="noreferrer"
                          onClick={(e) => { if (n.href.startsWith("/?v=")) { e.preventDefault(); go(intentBySlug[n.href.slice(4)]); } }}>
                          {n.label}<span aria-hidden="true">{ext ? " ↗" : " →"}</span>
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
        <div className="wrap footer-row">
          <p className="footer-brand"><svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#d3f52c" /></svg><b>IOMETE</b></p>
          <p className="footer-links"><a href="https://iomete.com" target="_blank" rel="noreferrer">iomete.com ↗</a><a href="https://iomete.com/resources" target="_blank" rel="noreferrer">Docs ↗</a></p>
        </div>
      </footer>

      <BotDock turns={turns} busy={busy} onAsk={onAsk} onShow={show} open={dockOpen} setOpen={setDockOpen} />
    </div>
  );
}
