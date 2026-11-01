// Accuracy harness. Usage: node scripts/accuracy.mjs [baseUrl] [runs]
// 1. Asks a fixed question set N times against the live /api/ask and checks state, fact and routing.
// 2. Unit-tests the refusal guard with sentences that must be blocked and sentences that must pass.
// Writes a Markdown report to ../reports/accuracy-results.md
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const BASE = process.argv[2] || "http://localhost:3107";
const RUNS = Number(process.argv[3] || 5);

// expect: state, and one of fact (exact fact id), text (regex on answer), persona (routing)
const CASES = [
  // documented
  { q: "What does Enterprise cost?", state: "documented", fact: "price.enterprise" },
  { q: "Which Kubernetes distributions are supported?", state: "documented", fact: "deploy.models" },
  { q: "Does it work with Okta?", state: "documented", fact: "sec.sso" },
  { q: "Can IOMETE staff see our data?", state: "documented", fact: "sec.support-access" },
  { q: "Does it phone home?", state: "documented", fact: "sec.telemetry" },
  { q: "Does it have data lineage?", state: "documented", fact: "feat.lineage" },
  { q: "Is IOMETE open source?", state: "documented", fact: "what.license" },
  { q: "What version is current?", state: "documented", fact: "arch.version" },
  { q: "Does it support Delta Lake?", state: "documented", text: /planned/i },
  // claimed
  { q: "Can it run air-gapped?", state: "claimed", fact: "deploy.airgap" },
  { q: "Is it cheaper than Databricks?", state: "claimed", fact: "price.savings" },
  { q: "How long does install take?", state: "claimed", fact: "deploy.time" },
  // unknown: zero-fabrication set
  { q: "Is IOMETE ISO 27001 certified?", state: "unknown", fact: "sec.iso27001" },
  { q: "Is it SOC 2 Type II?", state: "unknown", fact: "sec.type2" },
  { q: "What is the breach notification window?", state: "unknown", fact: "sec.breach" },
  { q: "Do you have a pen test report?", state: "unknown", fact: "sec.pentest" },
  { q: "Do you publish an SBOM?", state: "unknown", fact: "sec.sbom" },
  { q: "How long are audit logs retained?", state: "unknown", fact: "sec.retention" },
  { q: "How much does support cost?", state: "unknown", fact: "price.support-cost" },
  { q: "Who are your customers?", state: "unknown", fact: "co.case-studies" },
  { q: "How much funding has IOMETE raised?", state: "unknown", fact: "co.funding" },
  { q: "What is the capital of France?", state: "unknown", text: /could not find/i },
  // added after a held-out run (see README): one conservative miss, one confident wrong answer
  { q: "What is the minimum contract?", state: "documented", fact: "price.enterprise" },
  { q: "How many people work at IOMETE?", state: "documented", fact: "co.size" },
  { q: "Is there a HIPAA BAA?", state: "unknown" },
  { q: "What SLA do you give for uptime?", state: "unknown" },
  // routing from a self-introduction
  { q: "I'm the CISO at an insurer", persona: "cro" },
  { q: "I run data platforms at a bank", persona: "fde" },
  { q: "I'm the CFO", persona: "ceo" },
];

async function ask(q) {
  const r = await fetch(`${BASE}/api/ask`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ q }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function judge(c, a) {
  const fails = [];
  if (c.state && a.state !== c.state) fails.push(`state ${a.state} != ${c.state}`);
  if (c.fact && !a.factIds.includes(c.fact)) fails.push(`fact ${a.factIds.join(",") || "-"} != ${c.fact}`);
  if (c.text && !c.text.test(a.text)) fails.push(`text did not match ${c.text}`);
  if (c.persona && a.action?.persona !== c.persona) fails.push(`routed to ${a.action?.persona || "-"} != ${c.persona}`);
  // a confident wrong answer: says documented when truth is unknown
  const fabricated = c.state === "unknown" && a.state === "documented";
  return { fails, fabricated };
}

// ---------- guard unit tests ----------
const guardSrc = ts.transpileModule(fs.readFileSync("lib/guard.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const tmp = path.join(process.env.TMPDIR || "/tmp", `guard-${process.pid}.mjs`);
fs.writeFileSync(tmp, guardSrc);
const { checkAnswer } = await import(tmp);
fs.unlinkSync(tmp);
const MUST_BLOCK = [
  "IOMETE saves 40-60% compared to Databricks.",
  "You will save 3x on your data platform bill.",
  "IOMETE is ISO 27001 certified.",
  "IOMETE holds a SOC 2 Type II report.",
  "IOMETE is FedRAMP authorised.",
  "IOMETE never phones home and sends no telemetry.",
  "See docs.iomete.com for the install guide.",
  "Kapital Bank is a customer of IOMETE.",
  "IOMETE has raised $12 million.",
  "IOMETE provides full data lineage across pipelines.",
  "The IOMETE platform is fully open source.",
  "There is a documented air-gapped install guide.",
  "IOMETE is available on the AWS Marketplace.",
  "IOMETE guarantees 99.9% uptime.",
];
const MUST_PASS = [
  "IOMETE claims customers save 30-60% compared to SaaS platforms.",
  "ISO 27001 is not public; a job posting lists it as readiness work.",
  "SOC 2 Type II is unknown from public sources.",
  "The licence lets IOMETE collect telemetry and usage data.",
  "Data lineage is on the roadmap backlog, not shipped.",
  "Enterprise costs $500 per vCPU per year with a $100,000 minimum.",
  "IOMETE is built on open-source engines, Apache Spark and Apache Iceberg.",
];
const guardRows = [
  ...MUST_BLOCK.map((s) => ({ s, want: "block", got: checkAnswer(s) })),
  ...MUST_PASS.map((s) => ({ s, want: "pass", got: checkAnswer(s) })),
].map((r) => ({ ...r, ok: r.want === "block" ? r.got.length > 0 : r.got.length === 0 }));

// ---------- run ----------
const info = await (await fetch(`${BASE}/api/ask`)).json();
const rows = [];
let fabricated = 0, total = 0, passed = 0;
for (const c of CASES) {
  const results = [];
  for (let i = 0; i < RUNS; i++) {
    const a = await ask(c.q);
    const j = judge(c, a);
    total++; if (!j.fails.length) passed++; if (j.fabricated) fabricated++;
    results.push({ a, ...j });
  }
  const ok = results.filter((r) => !r.fails.length).length;
  rows.push({ c, ok, first: results[0] });
  console.log(`${ok === RUNS ? "PASS" : "FAIL"} ${ok}/${RUNS}  ${c.q}${results[0].fails.length ? "  <- " + results[0].fails.join("; ") : ""}`);
}
const gOk = guardRows.filter((r) => r.ok).length;
for (const r of guardRows.filter((r) => !r.ok)) console.log(`GUARD FAIL (${r.want}): ${r.s} -> [${r.got.join(",")}]`);
console.log(`\nQuestions: ${passed}/${total} runs correct · fabricated answers: ${fabricated} · guard: ${gOk}/${guardRows.length} · engine: ${info.engine}`);

const esc = (s) => String(s).replace(/\|/g, "\\|");
const md = [
  `# Accuracy results`,
  ``,
  `Run ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC against ${BASE}. Engine: **${info.engine}**. Corpus: ${info.pages} pages, ${info.chunks} chunks, fetched ${info.fetchedAt}.`,
  ``,
  `| Measure | Result |`,
  `|---|---|`,
  `| Question runs correct | ${passed} / ${total} |`,
  `| Confident wrong answers (said documented when the truth is unknown) | ${fabricated} |`,
  `| Refusal guard unit tests | ${gOk} / ${guardRows.length} |`,
  ``,
  `## Questions (${RUNS} runs each)`,
  ``,
  `| Question | Expected | Got (first run) | Correct runs |`,
  `|---|---|---|---|`,
  ...rows.map(({ c, ok, first }) => `| ${esc(c.q)} | ${[c.state, c.fact, c.persona && "route " + c.persona].filter(Boolean).join(" · ")} | ${first.a.state} · ${first.a.factIds[0] || "-"}${first.a.action?.persona ? " · route " + first.a.action.persona : ""} | ${ok}/${RUNS} |`),
  ``,
  `## Refusal guard`,
  ``,
  `| Sentence | Must | Rules fired | OK |`,
  `|---|---|---|---|`,
  ...guardRows.map((r) => `| ${esc(r.s)} | ${r.want} | ${r.got.join(", ") || "none"} | ${r.ok ? "yes" : "NO"} |`),
  ``,
].join("\n");
const out = path.resolve("../reports/accuracy-results.md");
fs.writeFileSync(out, md);
console.log(`report: ${out}`);
process.exit(passed === total && gOk === guardRows.length ? 0 : 1);
