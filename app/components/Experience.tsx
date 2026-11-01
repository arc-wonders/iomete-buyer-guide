"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PERSONAS } from "@/content/personas";
import { INTENTS, intentBySlug, intentFor, sectionsFor, type Intent } from "@/content/intents";
import { CHECKED_AT, FACTS } from "@/lib/facts";
import type { Answer } from "@/lib/types";
import { BeatBar, CAPTIONS, HeroDiagram, useBeats } from "./Hero";
import { VISUALS, Dot } from "./Visuals";
import { Statements } from "./Statements";
import { AnswerBlock, BotDock, ask, type Turn } from "./Bot";

const counts = FACTS.reduce((a, f) => ((a[f.state] = (a[f.state] || 0) + 1), a), {} as Record<string, number>);

function readIntent(): Intent | null {
  const params = new URLSearchParams(window.location.search);
  const v = params.get("v");
  if (v && intentBySlug[v]) return intentBySlug[v];
  const p = params.get("p");
  if (p === "fde" || p === "cro" || p === "ceo") return intentFor(p);
  return null;
}

const ICONS: Record<string, React.ReactNode> = {
  "where-data-goes": <><rect x="4" y="8" width="20" height="16" rx="3" /><path d="M14 2v12m-4-4 4 4 4-4" /></>,
  "security-review": <><path d="M14 3 5 7v6c0 6 4 10 9 12 5-2 9-6 9-12V7z" /><path d="m10 14 3 3 5-6" /></>,
  "what-it-costs": <><circle cx="14" cy="14" r="10" /><path d="M17.5 10.5c-.7-1-2-1.5-3.5-1.5-2 0-3.5 1-3.5 2.5 0 3.5 7 2 7 5 0 1.5-1.5 2.5-3.5 2.5-1.6 0-3-.6-3.7-1.7M14 7v2m0 10v2" /></>,
  "why-not-saas": <><rect x="2" y="9" width="10" height="10" rx="2" /><rect x="16" y="9" width="10" height="10" rx="2" /><path d="M12 14h4" /></>,
  "what-gets-installed": <><path d="m14 3 10 5.5v11L14 25 4 19.5v-11z" /><path d="M4 8.5 14 14l10-5.5M14 14v11" /></>,
  "how-hard-to-run": <><circle cx="14" cy="14" r="4" /><path d="M14 2v4m0 16v4M2 14h4m16 0h4M5.5 5.5l2.8 2.8m11.4 11.4 2.8 2.8M5.5 22.5l2.8-2.8m11.4-11.4 2.8-2.8" /></>,
};
/** The question a buyer usually has next, so every page hands off to one obvious step. */
const NEXT_Q: Record<string, string> = {
  "where-data-goes": "security-review",
  "security-review": "where-data-goes",
  "what-it-costs": "why-not-saas",
  "why-not-saas": "what-it-costs",
  "what-gets-installed": "how-hard-to-run",
  "how-hard-to-run": "what-gets-installed",
};

function Icon({ slug }: { slug: string }) {
  return <svg className="qicon" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[slug]}</svg>;
}

export default function Experience({ initial }: { initial: string | null }) {
  const [intent, setIntent] = useState<Intent | null>(initial ? intentBySlug[initial] ?? null : null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [highlight, setHighlight] = useState<string | undefined>();
  const [pending, setPending] = useState<{ atom?: string; fact?: string } | null>(null);
  const [landingQ, setLandingQ] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const beats = useBeats();
  const { beat } = beats;

  useEffect(() => {
    const onPop = () => setIntent(readIntent());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const hlTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const intentRef = useRef(intent);
  intentRef.current = intent;
  const go = useCallback((next: Intent | null, target?: { atom?: string; fact?: string }) => {
    if (intentRef.current?.slug !== next?.slug) {
      window.history.pushState({}, "", next ? `/?v=${next.slug}` : "/");
      // a new page starts folded, unless we are about to point at one of its statements
      setDetailsOpen(!!target?.fact);
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

  return (
    <div>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="wordmark" href="/" onClick={(e) => { e.preventDefault(); go(null); }}>
            <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#d3f52c" stroke="#2d382d" strokeWidth="1.5" /></svg>
            <b>IOMETE</b><span>in plain words</span>
          </a>
          <nav className="topnav">
            {intent && <button className="link" onClick={() => go(null)}>All questions</button>}
            <button className="btn btn-lime btn-sm" onClick={() => setDockOpen(true)}>Ask a question</button>
          </nav>
        </div>
      </header>

      {!intent ? (
        <main className="landing">
          <div className="wrap">
            <div className="landing-grid">
              <div className="landing-copy">
                <h1>Your data.<br />Your servers.<br />Your rules.</h1>
                <div className="caption-stack" aria-live="polite">
                  {CAPTIONS.map((c, i) => <p key={i} className={beat === i ? "on" : ""}>{c}</p>)}
                </div>
                <BeatBar labels={["What it is", "Where it runs", "Why it matters"]} {...beats} />
              </div>
              <HeroDiagram beat={beat} />
            </div>

            <section className="questions" aria-labelledby="q-head">
              <h2 id="q-head" className="sr-only">What do you want to know first?</h2>
              <ul>
                {INTENTS.map((it, i) => (
                  <li key={it.slug} style={{ animationDelay: `${0.06 * i}s` }}>
                    <button onClick={() => go(it)}>
                      <Icon slug={it.slug} />
                      <span>{it.question}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <form className="askbar" onSubmit={(e) => { e.preventDefault(); if (landingQ.trim()) { onAsk(landingQ.trim()); setLandingQ(""); } }}>
                <label htmlFor="landing-q" className="sr-only">Ask in your own words</label>
                <input id="landing-q" value={landingQ} onChange={(e) => setLandingQ(e.target.value)}
                  placeholder="Or ask in your own words, or tell us about your role" autoComplete="off" />
                <button className="btn btn-lime" disabled={busy}>Ask</button>
              </form>
              {turns.length > 0 && turns[turns.length - 1].a && (
                <div className="landing-answer"><AnswerBlock a={turns[turns.length - 1].a!} onShow={show} /></div>
              )}
            </section>
          </div>
        </main>
      ) : (
        <main className="answer">
          <div className="wrap">
            <h1>{intent.question}</h1>
            <p className="q-answer">{intent.answer}</p>
            {(() => { const V = VISUALS[intent.slug]; return <V onPick={pick} />; })()}
            <p className="legend"><Dot state="documented" /> documented <Dot state="claimed" /> IOMETE claims <Dot state="unknown" /> not public. Tap anything to see its source.</p>
            <Statements atoms={sections} open={detailsOpen} setOpen={setDetailsOpen} highlight={highlight} />
            {(() => {
              const nx = intentBySlug[NEXT_Q[intent.slug]];
              return (
                <nav className="nextup" aria-label="Where to go next">
                  <p className="nextup-hook">Usually asked next</p>
                  <button className="nextup-main" onClick={() => go(nx)}><Icon slug={nx.slug} /><span>{nx.question}</span><span aria-hidden="true" className="arrow">→</span></button>
                  <div className="more">
                    {INTENTS.filter((i) => i.slug !== intent.slug && i.slug !== nx.slug).map((i) => (
                      <button key={i.slug} onClick={() => go(i)}><Icon slug={i.slug} /><span>{i.question}</span></button>
                    ))}
                  </div>
                </nav>
              );
            })()}
            <p className="next-links">
              {next.map((n, i) => (
                <span key={n.label}>
                  {i > 0 && " · "}
                  <a href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    onClick={(e) => { if (n.href.startsWith("/?v=")) { e.preventDefault(); go(intentBySlug[n.href.slice(4)]); } }}>{n.label}</a>
                </span>
              ))}
            </p>
          </div>
        </main>
      )}

      <footer className="footer">
        <div className="wrap footer-grid">
          <p>An unofficial guide built at hackCBS 9.0 for IOMETE&apos;s “Make Complex Tech Easy to Buy” track. Not affiliated with or endorsed by IOMETE.</p>
          <p>{FACTS.length} statements, checked {CHECKED_AT}: {counts.documented} documented, {counts.claimed} IOMETE claims, {counts.unknown} not public.</p>
          <p><a href="https://iomete.com" target="_blank" rel="noreferrer">iomete.com</a> · <a href="https://iomete.com/resources" target="_blank" rel="noreferrer">Docs</a> · <a href="https://github.com/iomete/iom-docs" target="_blank" rel="noreferrer">Docs source</a></p>
        </div>
      </footer>

      <BotDock turns={turns} busy={busy} onAsk={onAsk} onShow={show} open={dockOpen} setOpen={setDockOpen} />
    </div>
  );
}
