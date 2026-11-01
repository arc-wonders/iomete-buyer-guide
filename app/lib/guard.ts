/**
 * Refusal list enforced in code. Any model-written answer that trips one of these
 * is discarded and the retrieval answer is used instead.
 * Each rule describes a claim that public evidence does not support as a fact.
 */
const ATTRIBUTED = /\b(iomete (says|claims|states|markets|advertises|reports)|according to iomete|iomete's (homepage|faq|blog|marketing|website)|claimed)\b/i;

const RULES: { id: string; re: RegExp; allowIfAttributed?: boolean }[] = [
  { id: "savings-as-fact", re: /\b(\d+(\.\d+)?\s?[-–]\s?\d+\s?(x|%)|\d+\s?x)\s*(cheaper|savings?|lower|less|over)|\bsav(e|es|ings)\s+(of\s+)?\d+/i, allowIfAttributed: true },
  { id: "iso-27001-certified", re: /\b(is|are|has|holds|achieved|certified)\b[^.]{0,40}\biso\s?27001\b(?![^.]{0,40}\b(not|unknown|readiness|no public)\b)/i },
  { id: "soc2-type2", re: /\bsoc\s?2\s+type\s+(ii|2)\b(?![^.]{0,60}\b(not|unknown|readiness|no public|in progress)\b)/i },
  { id: "other-certs", re: /\b(fedramp|pci[- ]dss|csa star)\b(?![^.]{0,60}\b(not|unknown|no public|isn't|is not)\b)/i },
  { id: "no-telemetry", re: /\b(no|never|zero|doesn't|does not|nothing)\b[^.]{0,30}\b(telemetry|phone[s]? home|call[s]? home)\b/i },
  { id: "dead-docs-domain", re: /docs\.iomete\.com/i },
  { id: "named-customer", re: /\b(pasha|kapital bank|mercury|overdrive|uzcard|central bank|ministry|dell)\b[^.]{0,40}\b(customer|client|uses iomete|runs iomete|deployed)/i, allowIfAttributed: true },
  { id: "headcount-or-funding", re: /\b(raised|funding of|employs?|headcount of)\s+\$?\d/i },
  { id: "lineage-shipped", re: /\b(supports?|provides?|includes?|offers?|has)\b[^.]{0,30}\blineage\b(?![^.]{0,60}\b(roadmap|backlog|not|planned)\b)/i },
  { id: "platform-open-source", re: /\biomete (platform )?is (fully |an? )?open[- ]source\b/i },
  { id: "documented-airgap", re: /\b(documented|published|step-by-step)\b[^.]{0,30}\bair[- ]?gap/i },
  { id: "marketplace", re: /\b(available|listed) (on|in) (the )?(aws|azure|google cloud|gcp) marketplace/i },
  { id: "uptime-sla", re: /\b\d{2}(\.\d+)?%\s*uptime\b/i },
];

export function checkAnswer(text: string): string[] {
  const attributed = ATTRIBUTED.test(text);
  return RULES.filter((r) => r.re.test(text) && !(r.allowIfAttributed && attributed)).map((r) => r.id);
}

export const RULE_IDS = RULES.map((r) => r.id);
