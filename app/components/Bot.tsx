"use client";
import { useEffect, useRef, useState } from "react";
import type { Answer, PersonaId } from "@/lib/types";
import { Chip } from "./FactCard";

export interface Turn { q: string; a?: Answer; error?: string }

export async function ask(q: string, persona?: PersonaId): Promise<Answer> {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ q, persona }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `Request failed (${res.status})`);
  return res.json();
}

export const EXAMPLES = [
  "Is IOMETE ISO 27001 certified?",
  "Can it run air-gapped?",
  "What does Enterprise cost?",
  "Does it phone home?",
  "Which Kubernetes distributions are supported?",
  "Does it have data lineage?",
];

export function AnswerBlock({ a, onShow }: { a: Answer; onShow?: (a: Answer) => void }) {
  return (
    <div className="msg-a">
      <p>{a.text}</p>
      <div className="meta">
        <Chip state={a.state} />
        {a.sources.slice(0, 2).map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>
        ))}
        {a.action.type === "navigate" && a.action.atom && onShow && (
          <button className="show" onClick={() => onShow(a)}>Show me</button>
        )}
      </div>
    </div>
  );
}

export function BotDock({
  turns, busy, onAsk, onShow, open, setOpen,
}: {
  turns: Turn[]; busy: boolean; onAsk: (q: string) => void; onShow: (a: Answer) => void;
  open: boolean; setOpen: (o: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }); }, [turns, busy]);

  if (!open) {
    if (turns.length === 0) return null;
    return (
      <div className="dock no-print">
        <button className="btn btn-lime dock-toggle" onClick={() => setOpen(true)}>Your questions ({turns.length})</button>
      </div>
    );
  }
  return (
    <div className="dock no-print" role="dialog" aria-label="Ask about IOMETE">
      <div className="dock-panel">
        <div className="dock-head">
          <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#d3f52c" stroke="#2d382d" strokeWidth="1.5" /></svg>
          <span className="dock-title"><b>Ask about IOMETE</b><span className="eyebrow">Answers from public sources only</span></span>
          <button aria-label="Close" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="dock-log" ref={logRef} aria-live="polite">
          {turns.length === 0 && (
            <>
              <p className="empty-hint">Ask anything about IOMETE. Every answer links to IOMETE's own documentation, pricing or licence, and the page moves to the matching section.</p>
              <div className="examples">
                {EXAMPLES.map((x) => <button key={x} onClick={() => onAsk(x)}>{x}</button>)}
              </div>
            </>
          )}
          {turns.map((t, i) => (
            <div key={i} style={{ display: "grid", gap: 8 }}>
              <div className="msg-q">{t.q}</div>
              {t.a && <AnswerBlock a={t.a} onShow={onShow} />}
              {t.error && <div className="msg-a"><p>{t.error}</p></div>}
            </div>
          ))}
          {busy && <p className="thinking">Checking IOMETE&apos;s docs…</p>}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) { onAsk(q.trim()); setQ(""); } }}>
          <label htmlFor="dock-q" className="sr-only">Question</label>
          <input id="dock-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a question" autoComplete="off" autoFocus />
          <button className="btn btn-lime" disabled={busy}>Ask</button>
        </form>
      </div>
    </div>
  );
}
