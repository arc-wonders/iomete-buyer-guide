/**
 * One-glance hooks for each question: a big figure or phrase plus a short line, used wherever a
 * question is offered (landing cards, "usually asked next"). Each `fact` must back the hook;
 * a "claimed" fact must read as IOMETE's claim, never as a plain fact.
 */
export interface Teaser { big: string; line: string; fact: string }

export const TEASERS: Record<string, Teaser> = {
  "where-data-goes": { big: "Stays put", line: "IOMETE runs inside your environment and does not host your data.", fact: "what.not-saas" },
  "security-review": { big: "8 controls", line: "SSO, masking, row filters and audit tables, all documented. SOC 2 audited.", fact: "sec.masking" },
  "what-it-costs": { big: "$500", line: "per vCPU a year, $100,000 minimum, plus your own infrastructure.", fact: "price.enterprise" },
  "why-not-saas": { big: "Yours vs. theirs", line: "SaaS keeps your data on their cloud. IOMETE runs in yours.", fact: "mkt.saas-only" },
  "what-gets-installed": { big: "1 Helm chart", line: "A control plane, then a data plane per environment.", fact: "arch.planes" },
  "how-hard-to-run": { big: "~25 min", line: "A cloud install takes about 25 minutes. IOMETE's engineers can run it with your team.", fact: "deploy.time" },
};
