# IOMETE

A persona-routed rebuild of iomete.com for the hackCBS 9.0 IOMETE track, "Make Complex Tech Easy to Buy".

A visitor lands on a 15-second animated picture of what a sovereign lakehouse is, then picks the question on
their mind ("Where does our data go?", "What does it cost?", "What would we actually install?" and three more)
or types to the bot. The page reshapes around that question.

The visitor is never asked who they are and never told who the page thinks they are. Internally each question maps
to one of three readers (the engineer who would run it, the risk officer who would sign it off, the executive who
would pay for it), which decides the order of the rest of the page. A typed self-description ("I'm the CISO at an
insurer") routes the same way, silently. The browser test fails if a role label appears on any visitor-facing page.

Every claim on the page carries one of three marks:

| Mark | Meaning |
|---|---|
| Documented | Backed by IOMETE's docs, release notes, licence or pricing page, with the exact quoted words |
| IOMETE claims | IOMETE marketing, attributed, not independently verified |
| Not public | No public source found. Routed to the trust center or a written question |

The bot answers in at most two sentences, shows the mark and the source, and **moves the page** to the card that proves it.

Unofficial prototype. Not affiliated with or endorsed by IOMETE.

## Run it

```bash
npm install
npm run corpus          # clones nothing: reads ../vendor/iom-docs, fetches live sitemap + 17 marketing pages
npm run build && npm start   # http://localhost:3107  (pages are /?v=<question-slug>)
```

To refresh the docs source first: `git clone --depth 1 https://github.com/iomete/iom-docs ../vendor/iom-docs`.

Optional model mode: copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` (or `ANTHROPIC_API_KEY`). See "Bot engines" below.

## Tests

```bash
npm run test:accuracy   # 29 questions x 5 runs against /api/ask + 21 refusal-guard unit tests
npm run test:e2e        # drives real Chrome through the whole workflow (needs /usr/bin/google-chrome or $CHROME)
```

Results of the last run are written to `../reports/accuracy-results.md`.

| Measure | Last result |
|---|---|
| Question runs correct | 145 / 145 |
| Confident wrong answers (said documented when the truth is unknown) | 0 |
| Refusal guard unit tests | 21 / 21 |
| Browser end-to-end checks, including "no role label shown anywhere" | 14 / 14 |

**Honest caveat on the question set.** Most of these questions were used while tuning retrieval, so they measure
regressions, not generalisation. A separate held-out set of 12 questions was run once before any fix:
10 were correct, one was a conservative miss ("What is the minimum contract?" answered not public), and one was a
confident wrong answer ("How many people work at IOMETE?" quoted an unrelated docs sentence as documented).
Both were fixed and added to the suite. Expect similar misses on new phrasings; the design leans toward
"not public" when unsure.

## How it works

```
content/facts.json     68 hand-checked facts: text, state, source URL, verbatim quote, keywords
content/atoms.ts       15 page components, each mapped to the iomete.com component it reuses
content/intents.ts     the six visitor questions: wording, direct answer, hidden reader, sections shown first
content/personas.ts    internal only: section order and next steps per reader
data/corpus.json       ~4,700 chunks from 394 live pages (docs repo mapped to live URLs + marketing pages)
lib/search.ts          BM25 with synonym expansion, exact-word weighting, rarity-weighted coverage
lib/answer.ts          answer pipeline (below)
lib/guard.ts           refusal list enforced in code
app/api/ask            POST {q, persona} -> answer with state, sources and a page action
app/brief              printable one-page brief per persona (Print or save as PDF)
scripts/               corpus builder, accuracy harness, e2e test, Claude mock
```

**Answer pipeline**

1. Detect a self-introduction ("I'm the CISO at an insurer") and route to that door.
2. Rank facts. A fact answers only if it scores well **and** covers most of the question's meaningful words, weighted by rarity.
3. Otherwise quote one sentence from the docs corpus, only if that sentence contains the question's rarest word and most of the others. Release notes, docs and legal pages count as documented; blog and homepage as claimed. Questions about the company itself are never answered from product docs.
4. Otherwise say it is not public and do not guess.

**Bot engines**

- *Retrieval* (default, no credentials): steps above. Deterministic and covered by the test suite.
- *Gemini* (`gemini-3.7-flash`, temperature 0, plain JSON string output parsed and checked in code): used whenever `GEMINI_API_KEY` is set. Same
  prompt, same code-side citation and refusal checks as the Claude path below, same fallback to retrieval.
- *Claude* (`claude-opus-5-5`, low effort, structured JSON output, server-side refusal fallback): Claude writes the
  two sentences from the top facts and passages only. The server then rejects any answer that cites an id it was not
  given or trips the refusal guard, and falls back to retrieval. Verified against `scripts/mock-claude.mjs`
  (good answer kept; a false ISO 27001 + savings claim blocked; an invented citation rejected).
  **Not yet verified against the live API**: no key was available while building.

**Refusal guard** blocks, unless attributed as an IOMETE claim where allowed: savings percentages or multiples as fact,
ISO 27001 / SOC 2 Type II / FedRAMP / PCI as achieved, "no telemetry", any `docs.iomete.com` link, logos as named
customers, headcount or funding figures, shipped data lineage, "IOMETE is open source", a documented air-gap guide,
a cloud marketplace listing, an uptime percentage.

## Keeping it true

- `npm run corpus` re-reads the docs repo and the live site; every docs URL is validated against IOMETE's live sitemap (377 of 386 pages matched; 9 unlisted pages skipped).
- `facts.json` carries `checkedAt`. Every quote in it was verified to appear verbatim on its source page on 2026-11-01, and every source URL returned 200.
- Facts that IOMETE could close by publishing something are the "Not public" ones. They double as a backlog for IOMETE.

## Known limits

- Claude mode untested live (see above).
- The Vanta trust center is JavaScript-rendered and was not read; attestation facts rely on IOMETE's blog and a third-party job posting.
- Product screenshots load from IOMETE's CDN and will break if those URLs change.
- The hidden "CRO" reader is a Chief Risk Officer. Retargeting means editing `content/personas.ts`, `content/intents.ts` and its sections.
- The open chat panel covers the right edge of the page on desktop; close it to see what is underneath.
