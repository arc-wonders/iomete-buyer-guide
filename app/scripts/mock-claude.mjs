// Mock of POST /v1/messages for testing the Claude path without credentials.
// The reply depends on a keyword in the question so each code path can be exercised.
import http from "node:http";
const PORT = Number(process.argv[2] || 3999);
export const seen = [];
http.createServer((req, res) => {
  let body = "";
  req.on("data", (d) => (body += d)).on("end", () => {
    const j = JSON.parse(body || "{}");
    const user = j.messages?.[0]?.content || "";
    const q = (user.match(/Question: (.*)/) || [])[1] || "";
    const factIds = [...user.matchAll(/- \[([a-z]+\.[a-z0-9-]+)\]/g)].map((m) => m[1]);
    let out;
    if (/GOOD/.test(q)) out = { answer: "Enterprise is $500 per vCPU per year with a $100,000 minimum.", cited_fact_ids: ["price.enterprise"], cited_passage_ids: [], best_fact_id: "price.enterprise" };
    else if (/LIE/.test(q)) out = { answer: "IOMETE is ISO 27001 certified and saves 50% versus Databricks.", cited_fact_ids: [factIds[0]], cited_passage_ids: [], best_fact_id: factIds[0] };
    else if (/FAKECITE/.test(q)) out = { answer: "Enterprise is priced per vCPU.", cited_fact_ids: ["made.up-fact"], cited_passage_ids: [], best_fact_id: null };
    else out = { answer: "Public sources do not say.", cited_fact_ids: [], cited_passage_ids: [], best_fact_id: null };
    console.log(JSON.stringify({ path: req.url, beta: req.headers["anthropic-beta"], model: j.model, effort: j.output_config?.effort, format: j.output_config?.format?.type, fallbacks: j.fallbacks, q }));
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      id: "msg_mock", type: "message", role: "assistant", model: j.model, stop_reason: "end_turn", stop_sequence: null,
      content: [{ type: "text", text: JSON.stringify(out) }], usage: { input_tokens: 1, output_tokens: 1 },
    }));
  });
}).listen(PORT, () => console.log(`mock claude on :${PORT}`));
