import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import { BM25, GENERIC, coverage, factText, tierBoost, tokenize, weightedTerms } from "./search";
import { checkAnswer } from "./guard";
import { FACTS, factById, locateFact } from "./facts";
import { PERSONAS } from "@/content/personas";
import { intentFor } from "@/content/intents";
import type { Answer, Chunk, Fact, PersonaId, State } from "./types";

// ---------- indexes (built once per server process) ----------
let corpus: { fetchedAt: string; chunks: Chunk[] } | null = null;
let corpusIndex: BM25<Chunk> | null = null;
const factIndex = new BM25<Fact>(FACTS, factText);

function getCorpus() {
  if (!corpus) {
    const file = path.join(process.cwd(), "data", "corpus.json");
    corpus = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { fetchedAt: "", chunks: [] };
    corpusIndex = new BM25<Chunk>(corpus!.chunks, (c) => `${c.title} ${c.heading} ${c.text}`);
  }
  return { corpus: corpus!, index: corpusIndex! };
}

// ---------- persona detection ----------
const ROLE_PATTERNS: [PersonaId, RegExp][] = [
  ["cro", /\b(risk|ciso|security|compliance|audit|regulat|dora|gdpr|vendor[- ]risk|cro|privacy|legal|infosec)\w*/i],
  ["fde", /\b(engineer|devops|sre|platform team|data platform|kubernetes|k8s|helm|install|deploy|architect|data team|spark|developer|fde)\w*/i],
  ["ceo", /\b(ceo|cfo|cto|cdo|founder|budget|board|cost|price|pricing|pay|roi|buy|purchase|executive|vp)\w*/i],
];
export function detectPersona(q: string): PersonaId | null {
  const selfDescribed = q.match(/\bi(?:'m| am| run| lead| manage| own| work| head)\b[^.?!]{0,60}|\bas an?\b[^.?!]{0,40}|\bmy (role|job|team)\b[^.?!]{0,40}/i);
  const scope = selfDescribed ? selfDescribed[0] : q;
  for (const [p, re] of ROLE_PATTERNS) if (re.test(scope)) return p;
  if (selfDescribed) return null;
  return null;
}
function isSelfIntro(q: string) {
  return /\b(i'm|i am|i run|i lead|i manage|i own|i work|i head|as an?|we are|we're)\b/i.test(q) && q.trim().split(/\s+/).length < 26 && !/\?\s*$/.test(q.trim());
}

const STATE_RANK: Record<State, number> = { documented: 0, claimed: 1, unknown: 2 };
const mostCautious = (states: State[]): State =>
  states.reduce<State>((a, s) => (STATE_RANK[s] > STATE_RANK[a] ? s : a), "documented");

function cleanSnippet(text: string) {
  return text
    .replace(/[|*`#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function bestSentence(texts: string[], q: string): { s: string; i: number } {
  const exact = new Set(tokenize(q));
  let best = "";
  let bestIdx = 0;
  let bestScore = -1;
  texts.forEach((raw, rank) => {
    const sentences = cleanSnippet(raw).split(/(?<=[.!?])\s+(?=[A-Z])/).filter((s) => s.length > 12 && s.length < 360);
    for (const s of sentences) {
      const toks = tokenize(s);
      const hit = toks.filter((t) => exact.has(t)).length;
      const score = hit - rank * 0.5 + (s.length < 200 ? 0.2 : 0);
      if (score > bestScore) { best = s; bestScore = score; bestIdx = rank; }
    }
  });
  return best ? { s: best, i: bestIdx } : { s: cleanSnippet(texts[0]).slice(0, 240), i: 0 };
}

// Calibrated against scripts/accuracy.mjs. A fact answers only if it is both a strong
// match and covers most of the question's meaningful words.
const FACT_MIN = 8.0;
const FACT_COVERAGE = 0.6;
const CORPUS_MIN = 9.0;
const CORPUS_COVERAGE = 0.6;

// ---------- retrieval-only answer (always available, deterministic) ----------
export function retrievalAnswer(q: string, current?: PersonaId): Answer {
  const persona = detectPersona(q);
  const terms = weightedTerms(q);
  const fidf = (t: string) => factIndex.idf(t);
  // Re-rank the top facts by how much of the question they cover, weighted by word rarity.
  const facts = factIndex.search(terms, 6)
    .map((x) => ({ ...x, cov: coverage(q, factText(x.item), fidf) }))
    .map((x) => ({ ...x, rank: x.score * (0.4 + x.cov) }))
    .sort((a, b) => b.rank - a.rank);
  const { index } = getCorpus();
  const passages = index.search(terms, 5, tierBoost);

  const factOk = !!facts[0] && facts[0].score >= FACT_MIN && facts[0].cov >= FACT_COVERAGE;
  if (persona && isSelfIntro(q) && (!factOk || facts[0].score < FACT_MIN * 2)) {
    const intent = intentFor(persona);
    return {
      text: `Start with “${intent.question}” ${intent.answer.split(". ")[0]}.`,
      state: "documented", factIds: [], sources: [],
      action: { type: "navigate", persona }, engine: "retrieval",
    };
  }

  if (factOk) {
    const f = facts[0].item;
    const loc = locateFact(f.id, persona ?? current);
    return {
      text: f.text,
      state: f.state,
      factIds: [f.id],
      sources: f.url ? [{ url: f.url, title: f.source, quote: f.quote || undefined }] : [],
      action: loc ? { type: "navigate", persona: loc.persona, atom: loc.atom, fact: f.id } : { type: "none" },
      engine: "retrieval",
    };
  }

  const pool = passages.slice(0, 3).filter((p) => p.score >= CORPUS_MIN && p.score > (passages[0]?.score ?? 0) * 0.6);
  const pick = pool.length ? bestSentence(pool.map((p) => p.item.text), q) : null;
  const sentence = pick?.s ?? "";
  // The quoted sentence itself must contain most of the question's meaningful words.
  // ...and the question's rarest meaningful word (e.g. "pen" in "pen test report").
  const rarest = tokenize(q).filter((t) => !GENERIC.has(t)).sort((a, b) => index.idf(b) - index.idf(a))[0];
  const hasRarest = !!rarest && tokenize(sentence).includes(rarest);
  const aboutCompany = /\b(employees?|people|staff|headcount|funding|raised|investors?|founded|founders?|valuation|revenue|customers?)\b/i.test(q);
  if (pick && hasRarest && !aboutCompany && coverage(q, sentence, (t) => index.idf(t)) >= CORPUS_COVERAGE) {
    const c = pool[pick.i].item;
    const state: State = c.tier <= 3 ? "documented" : "claimed";
    return {
      text: state === "documented" ? `IOMETE's ${c.tier === 1 ? "release notes say" : c.tier === 3 ? "published terms say" : "documentation says"}: “${sentence}”` : `IOMETE's ${c.url.includes("/blog/") ? "blog" : "site"} says: “${sentence}”`,
      state, factIds: [],
      sources: [{ url: c.url, title: c.title + (c.heading ? ` › ${c.heading}` : "") }],
      action: persona ? { type: "navigate", persona } : { type: "none" },
      engine: "retrieval",
    };
  }

  return {
    text: "I could not find this in IOMETE's public docs, site or legal terms, so I won't guess. It is a good question to send IOMETE in writing.",
    state: "unknown", factIds: [], sources: [],
    action: persona ? { type: "navigate", persona } : { type: "none" },
    engine: "retrieval",
  };
}

// ---------- Claude-composed answer (used when credentials exist), with code-side checks ----------
const SYSTEM = `You answer questions about IOMETE, a self-hosted data lakehouse, for a visitor on a buyer-education page.

Rules:
- Use only the FACTS and PASSAGES provided in the user message. If they do not answer the question, say plainly that public sources do not say, and cite nothing.
- At most two short sentences, plain language, no marketing tone. Adjust vocabulary to the visitor's role.
- When a fact is marked "claimed", attribute it ("IOMETE says ..."). When a fact is marked "unknown", say it is not publicly stated.
- Never state savings percentages or multiples as outcomes, never say a certification exists beyond what a fact says, never say IOMETE sends no telemetry, never call a logo a customer.
- Return JSON matching the schema. best_fact_id is the single fact the page should scroll to, or null.`;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["answer", "cited_fact_ids", "cited_passage_ids", "best_fact_id"],
  properties: {
    answer: { type: "string" },
    cited_fact_ids: { type: "array", items: { type: "string" } },
    cited_passage_ids: { type: "array", items: { type: "string" } },
    best_fact_id: { type: ["string", "null"] },
  },
} as const;

let client: Anthropic | null | undefined;
function getClient() {
  if (client !== undefined) return client;
  const hasCreds = !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_PROFILE);
  client = hasCreds && process.env.BOT_ENGINE !== "retrieval" ? new Anthropic() : null;
  return client;
}
export const claudeEnabled = () => !!getClient();

export async function answer(q: string, current?: PersonaId): Promise<Answer> {
  const fallback = retrievalAnswer(q, current);
  const c = getClient();
  const isIntro = fallback.action.type === "navigate" && !fallback.action.atom && fallback.text.startsWith("Start with");
  if (!c || isIntro) return fallback;
  const persona = detectPersona(q) ?? current;
  const terms = weightedTerms(q);
  const facts = factIndex.search(terms, 8).map((x) => x.item);
  const { index } = getCorpus();
  const passages = index.search(terms, 6, tierBoost).map((x, i) => ({ pid: `P${i + 1}`, chunk: x.item }));

  const userMsg = [
    `Visitor role: ${persona ? PERSONAS[persona].title : "unknown"}`,
    `Question: ${q}`,
    "",
    "FACTS:",
    ...facts.map((f) => `- [${f.id}] (${f.state}) ${f.text}`),
    "",
    "PASSAGES (verbatim from IOMETE pages):",
    ...passages.map((p) => `- [${p.pid}] ${p.chunk.url}${p.chunk.heading ? " › " + p.chunk.heading : ""}\n  ${p.chunk.text.slice(0, 900)}`),
  ].join("\n");

  try {
    const res = await c.beta.messages.create({
      model: process.env.BOT_MODEL || "claude-opus-5-5",
      max_tokens: 2000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
      messages: [{ role: "user", content: userMsg }],
    } as never) as unknown as Anthropic.Beta.BetaMessage;

    if (res.stop_reason === "refusal") return fallback;
    const text = res.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") return fallback;
    const out = JSON.parse(text.text) as { answer: string; cited_fact_ids: string[]; cited_passage_ids: string[]; best_fact_id: string | null };

    const validFacts = out.cited_fact_ids.filter((id) => facts.some((f) => f.id === id));
    const validPassages = passages.filter((p) => out.cited_passage_ids.includes(p.pid));
    if (validFacts.length !== out.cited_fact_ids.length || validPassages.length !== out.cited_passage_ids.length) {
      return { ...fallback, guard: ["invalid-citation"] };
    }
    const violations = checkAnswer(out.answer);
    if (violations.length) return { ...fallback, guard: violations };

    const states: State[] = [
      ...validFacts.map((id) => factById[id].state),
      ...validPassages.map((p) => (p.chunk.tier <= 3 ? "documented" : "claimed") as State),
    ];
    const state = states.length ? mostCautious(states) : "unknown";
    const focus = out.best_fact_id && validFacts.includes(out.best_fact_id) ? out.best_fact_id : validFacts[0];
    const loc = focus ? locateFact(focus, persona ?? undefined) : null;
    return {
      text: out.answer,
      state,
      factIds: validFacts,
      sources: [
        ...validFacts.map((id) => factById[id]).filter((f) => f.url).map((f) => ({ url: f.url, title: f.source, quote: f.quote || undefined })),
        ...validPassages.map((p) => ({ url: p.chunk.url, title: p.chunk.title + (p.chunk.heading ? ` › ${p.chunk.heading}` : "") })),
      ].filter((s, i, a) => a.findIndex((x) => x.url === s.url) === i).slice(0, 3),
      action: loc ? { type: "navigate", persona: loc.persona, atom: loc.atom, fact: focus } : persona ? { type: "navigate", persona } : { type: "none" },
      engine: "claude",
    };
  } catch (e) {
    console.error("[ask] Claude call failed, using retrieval:", e instanceof Error ? e.message : e);
    return fallback;
  }
}

export function corpusStats() {
  const { corpus } = getCorpus();
  return { fetchedAt: corpus.fetchedAt, chunks: corpus.chunks.length, pages: new Set(corpus.chunks.map((c) => c.url)).size };
}
