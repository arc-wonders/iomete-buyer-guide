"use client";
import { useState } from "react";
import { INTENTS, type Intent } from "@/content/intents";
import { TEASERS } from "@/content/teasers";
import { factById } from "@/lib/facts";
import type { Answer } from "@/lib/types";
import { BeatBar, CAPTIONS, HeroDiagram, useBeats } from "./Hero";
import { AnswerBlock } from "./Bot";
import { Dot, useInView } from "./visuals/shared";
import { Mini } from "./Landing.minis";

/** The first screen: a short animated story, then six picture cards (one per question) and a free-text box. */
export default function Landing({ go, onAsk, busy, last, onShow }: {
  go: (i: Intent) => void; onAsk: (q: string) => void; busy: boolean; last?: Answer; onShow: (a: Answer) => void;
}) {
  const [landingQ, setLandingQ] = useState("");
  const beats = useBeats();
  const { beat } = beats;
  const [qRef, qIn] = useInView<HTMLElement>(0.12);
  return (
    <main className="landing v-landing">
      <div className="wrap">
        <div className="landing-grid">
          <div className="landing-copy">
            <p className="lp-eyebrow"><span className="lp-hexdot" aria-hidden="true" />Sovereign data lakehouse, explained</p>
            <h1>Your data.<br />Your servers.<br />Your rules.</h1>
            <div className="caption-stack" aria-live="polite">
              {CAPTIONS.map((c, i) => <p key={i} className={beat === i ? "on" : ""}>{c}</p>)}
            </div>
            <BeatBar labels={["What it is", "Where it runs", "Why it matters"]} {...beats} />
          </div>
          <HeroDiagram beat={beat} />
        </div>

        <section ref={qRef} className={"questions" + (qIn ? " in" : "")} aria-labelledby="q-head">
          <div className="lp-qhead">
            <p className="lp-eyebrow">Six questions · every claim sourced</p>
            <h2 id="q-head">What do you want to know first?</h2>
          </div>
          <ul>
            {INTENTS.map((it, i) => {
              const t = TEASERS[it.slug];
              const f = t && factById[t.fact];
              return (
                <li key={it.slug} style={{ ["--i" as string]: i }}>
                  <button className={`qcard qc-${it.slug}`} onClick={() => go(it)} aria-label={it.question}
                    aria-describedby={t ? `tz-${it.slug}` : undefined}>
                    <span className="qc-art"><Mini slug={it.slug} /></span>
                    {t && (
                      <span className="qc-big">
                        {t.big}
                        {f?.state === "claimed" && <small>IOMETE claims</small>}
                      </span>
                    )}
                    {t && (
                      <span className="qc-reveal" id={`tz-${it.slug}`}>
                        <span className="qc-line">{f && <Dot state={f.state} />}{t.line}</span>
                        <span className="qc-open">See the picture <span aria-hidden="true">→</span></span>
                      </span>
                    )}
                    <span className="qc-q">{it.question}<span className="qc-arrow" aria-hidden="true">→</span></span>
                  </button>
                </li>
              );
            })}
          </ul>
          <form className="askbar" onSubmit={(e) => { e.preventDefault(); if (landingQ.trim()) { onAsk(landingQ.trim()); setLandingQ(""); } }}>
            <label htmlFor="landing-q" className="sr-only">Ask in your own words</label>
            <svg className="askbar-icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="8" cy="8" r="5.5" /><path d="m12.2 12.2 3.8 3.8" />
            </svg>
            <input id="landing-q" value={landingQ} onChange={(e) => setLandingQ(e.target.value)}
              placeholder="Ask anything, or tell us your role" autoComplete="off" />
            <button className="btn btn-lime" disabled={busy}>Ask</button>
          </form>
          {last && (
            <div className="landing-answer"><AnswerBlock a={last} onShow={onShow} /></div>
          )}
        </section>
      </div>
    </main>
  );
}
