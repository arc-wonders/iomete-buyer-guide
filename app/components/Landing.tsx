"use client";
import { useState } from "react";
import { INTENTS, type Intent } from "@/content/intents";
import { TEASERS } from "@/content/teasers";
import { factById } from "@/lib/facts";
import type { Answer } from "@/lib/types";
import { CAPTIONS, HeroDiagram, useBeats } from "./Hero";
import { AnswerBlock } from "./Bot";
import { Dot, useInView } from "./visuals/shared";
import { Mini } from "./Landing.minis";

/** The first screen: a short animated story, then six picture cards (one per question) and a free-text box. */
export default function Landing({ go, onAsk, busy, last, onShow }: {
  go: (i: Intent) => void; onAsk: (q: string) => void; busy: boolean; last?: Answer; onShow: (a: Answer) => void;
}) {
  const [landingQ, setLandingQ] = useState("");
  const { beat } = useBeats();
  const [qRef, qIn] = useInView<HTMLElement>(0.12);
  return (
    <main className="landing v-landing">
      <div className="wrap">
        <div className="landing-grid">
          <div className="landing-copy">
            <p className="lp-eyebrow"><span className="lp-hexdot" aria-hidden="true" />Sovereign data lakehouse</p>
            <h1>Your data.<br />Your servers.<br />Your rules.</h1>
            <div className="caption-stack" aria-live="polite">
              {CAPTIONS.map((c, i) => <p key={i} className={beat === i ? "on" : ""}>{c}</p>)}
            </div>
            <form className="hero-ask" onSubmit={(e) => { e.preventDefault(); if (landingQ.trim()) { onAsk(landingQ.trim()); setLandingQ(""); } }}>
              <label htmlFor="landing-q" className="hero-ask-label">Tell us what you are weighing up</label>
              <div className="hero-ask-box">
                <textarea id="landing-q" rows={3} value={landingQ} onChange={(e) => setLandingQ(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement).requestSubmit(); } }}
                  placeholder="e.g. We hold 300 TB on-premises, need SOC 2 evidence for procurement, and must shortlist a Databricks alternative by Q2."
                  autoComplete="off" />
                <div className="hero-ask-foot">
                  <span className="hero-ask-hint">Your setup, constraints or deadline.</span>
                  <button className="btn btn-lime" disabled={busy}>Get the answer</button>
                </div>
              </div>
            </form>
            {last && <div className="landing-answer"><AnswerBlock a={last} onShow={onShow} /></div>}
          </div>
          <HeroDiagram beat={beat} />
        </div>

        <section ref={qRef} className={"questions" + (qIn ? " in" : "")} aria-labelledby="q-head">
          <div className="lp-qhead">
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
        </section>
      </div>
    </main>
  );
}
