import type { Chunk, Fact } from "./types";

const STOP = new Set(
  "a an the and or of to in on for is are be it its this that with as by at from how what does do can i we you my our your me us which who when where why will would should could about there their them they has have had not no yes any into than then so if".split(" "),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9$%.+-]+/g, " ")
    .split(" ")
    .map((t) => t.replace(/^[.+-]+|[.+-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}
function stem(t: string) {
  if (/^\d/.test(t)) return t;
  return t.replace(/(ings|ing|ies|ied|es|s|ed)$/, (m) => (m === "ies" || m === "ied" ? "y" : "")) || t;
}

/** Synonyms a buyer would type that the facts do not literally contain. */
const SYNONYMS: Record<string, string[]> = {
  cost: ["price", "pricing", "licence", "license", "vcpu", "pay", "expensive", "cheap", "budget", "spend", "much"],
  certified: ["certification", "certificate", "soc", "iso", "27001", "attestation", "compliant", "audit", "badge"],
  airgap: ["air-gapped", "air", "gapped", "offline", "disconnected", "internet"],
  phone: ["telemetry", "usage", "home", "call", "collect", "metrics"],
  customer: ["customers", "client", "reference", "case", "study", "logo", "who uses", "used by"],
  kubernetes: ["k8s", "eks", "aks", "gke", "openshift", "tanzu", "nkp", "helm", "cluster"],
  sso: ["saml", "oidc", "okta", "entra", "ldap", "active directory", "login", "identity", "scim"],
  mask: ["masking", "pii", "redact", "hide", "column"],
  breach: ["incident", "notification", "notify"],
  lineage: ["lineage", "provenance", "upstream"],
  savings: ["save", "saving", "cheaper", "tco", "roi", "cheaper than"],
  company: ["funding", "raised", "employees", "headcount", "founded", "founder", "startup", "investor", "size", "team"],
  open: ["lock-in", "lock", "leave", "exit", "iceberg", "format", "portable"],
};
/** Exact words from the question weigh double; synonym expansions weigh once. */
/** Verbs that appear in many questions and carry little meaning on their own. */
export const GENERIC = new Set(["work", "use", "run", "offer", "provide", "available", "need", "iomete", "get", "much", "many", "tell", "know", "want", "mean", "platform", "data", "take", "status", "current", "exist", "able"].map((t) => tokenize(t)[0] ?? t));
export function weightedTerms(q: string): Map<string, number> {
  const w = new Map<string, number>();
  for (const t of expand(q)) w.set(t, 0.6);
  for (const t of tokenize(q)) w.set(t, GENERIC.has(t) ? 0.7 : 2.2);
  return w;
}
/** Share of the question's meaningful words that appear in a text. */
export function coverage(q: string, text: string, idf: (t: string) => number = () => 1): number {
  const ignore = new Set([...GENERIC, ...tokenize("support supported supports")]);
  const want = [...new Set(tokenize(q).filter((t) => !ignore.has(t)))];
  if (!want.length) return 0;
  const have = new Set(tokenize(text));
  let total = 0;
  const base = new Set(tokenize(q));
  const syn = new Set(expand(q).filter((t) => !base.has(t)));
  let hit = 0;
  for (const t of want) {
    const w = idf(t);
    total += w;
    if (have.has(t)) hit += w;
    else if ([...syn].some((s) => have.has(s))) hit += 0.35 * w;
  }
  return total ? hit / total : 0;
}
export function expand(q: string): string[] {
  const base = tokenize(q);
  const out = [...base];
  const lower = q.toLowerCase();
  for (const [head, alts] of Object.entries(SYNONYMS)) {
    if (lower.includes(head) || alts.some((a) => lower.includes(a))) out.push(...tokenize([head, ...alts].join(" ")));
  }
  return out;
}

export class BM25<T> {
  private docs: { item: T; tf: Map<string, number>; len: number }[] = [];
  private df = new Map<string, number>();
  private avg = 1;
  constructor(items: T[], text: (t: T) => string, private k1 = 1.4, private b = 0.7) {
    for (const item of items) {
      const toks = tokenize(text(item));
      const tf = new Map<string, number>();
      for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
      for (const t of tf.keys()) this.df.set(t, (this.df.get(t) || 0) + 1);
      this.docs.push({ item, tf, len: toks.length });
    }
    this.avg = this.docs.reduce((a, d) => a + d.len, 0) / Math.max(1, this.docs.length);
  }
  /** Inverse document frequency of a stemmed token; unseen tokens are maximally rare. */
  idf(t: string) {
    const N = this.docs.length;
    const df = this.df.get(t) || 0;
    return Math.log(1 + (N - df + 0.5) / (df + 0.5));
  }
  search(terms: string[] | Map<string, number>, k = 5, boost?: (t: T) => number) {
    const N = this.docs.length;
    const weights = terms instanceof Map ? terms : new Map(terms.map((t) => [t, 1] as [string, number]));
    const uniq = [...weights.keys()];
    const scored = this.docs.map((d) => {
      let s = 0;
      for (const t of uniq) {
        const f = d.tf.get(t);
        if (!f) continue;
        const df = this.df.get(t) || 0;
        const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
        s += (weights.get(t) ?? 1) * (idf * f * (this.k1 + 1)) / (f + this.k1 * (1 - this.b + (this.b * d.len) / this.avg));
      }
      return { item: d.item, score: s * (boost ? boost(d.item) : 1) };
    });
    return scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, k);
  }
}

export function factText(f: Fact) {
  return `${f.id.replace(/[.-]/g, " ")} ${f.keywords ?? ""} ${f.text} ${f.quote} ${f.source}`;
}
export const tierBoost = (c: Chunk) => [0, 1.35, 1.25, 1.15, 1.0, 0.8][c.tier] ?? 0.8;
