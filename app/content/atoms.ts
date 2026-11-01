import type { Atom } from "@/lib/types";

export const ATOMS: Atom[] = [
  // ---------- FDE ----------
  { id: "deploy", eyebrow: "Where it runs", title: "Four ways to deploy, all on Kubernetes", kind: "deploy",
    origin: "Deployment quartet, /product/deployment",
    lead: "You bring the cluster and the object store. IOMETE installs into it with one Helm chart.",
    facts: ["deploy.models", "deploy.nutanix", "deploy.storage", "deploy.airgap", "deploy.terraform"] },
  { id: "architecture", eyebrow: "What gets installed", title: "One control plane, many data planes", kind: "architecture",
    origin: "Control/data-plane diagram, /product/architecture/data-mesh",
    facts: ["what.stack", "arch.planes", "arch.version", "arch.endpoints", "deploy.minimums"] },
  { id: "showcase", eyebrow: "What you get", title: "The modules your users will touch", kind: "showcase",
    origin: "Sticky feature showcase, homepage",
    facts: ["feat.modules", "feat.integrations", "feat.mcp", "feat.table-maint"] },
  { id: "not-yet", eyebrow: "Gaps today", title: "What is not there yet", kind: "checklist",
    origin: "Roadmap rows, /roadmap",
    lead: "Gaps we found in IOMETE's own docs and roadmap. Better to hear them now than in week three of a pilot.",
    facts: ["feat.lineage", "feat.no-cli", "deploy.k8s-matrix", "deploy.terraform", "feat.table-maint"] },
  { id: "run-it", eyebrow: "Who operates it", title: "You run it, or IOMETE's engineers help", kind: "cards",
    origin: "FDE pitch, homepage",
    facts: ["mkt.k8s-skills", "co.fde", "deploy.time", "price.free", "feat.university"] },

  // ---------- CRO ----------
  { id: "perimeter", eyebrow: "The short version", title: "Your data stays inside your perimeter", kind: "perimeter",
    origin: "Trust copy + hybrid diagram, homepage",
    facts: ["what.not-saas", "sec.at-rest", "sec.support-access", "sec.telemetry"] },
  { id: "controls", eyebrow: "Controls you can verify", title: "Identity, access and audit", kind: "cards",
    origin: "Data security page + user guide",
    facts: ["sec.sso", "sec.mfa", "sec.policies", "sec.masking", "sec.audit", "sec.netpol", "sec.secrets", "sec.cves"] },
  { id: "attestations", eyebrow: "Attestations", title: "What the badges actually mean", kind: "cards",
    origin: "Compliance badge trio, homepage",
    facts: ["sec.soc2", "sec.badges", "sec.type2", "sec.iso27001", "sec.trust-center", "mkt.regs"] },
  { id: "open-questions", eyebrow: "Still open", title: "Questions public sources cannot answer", kind: "checklist",
    origin: "New. iomete.com has no equivalent.",
    lead: "Each of these is unknown from public material. Ask IOMETE in writing, or check the trust center.",
    facts: ["sec.breach", "sec.pentest", "sec.sbom", "sec.retention", "sec.dpa", "sec.mtls", "sec.backup"] },

  // ---------- CEO ----------
  { id: "plain", eyebrow: "In one breath", title: "What you would be buying", kind: "plain",
    origin: "Hero copy, homepage",
    facts: ["what.one-liner", "what.open-formats", "what.license"] },
  { id: "pricing", eyebrow: "What it costs", title: "A fixed licence, plus your own infrastructure", kind: "pricing",
    origin: "Pricing plan cards + support tiers, /pricing",
    facts: ["price.free", "price.enterprise", "price.bc", "price.infra", "price.no-per-query", "price.savings",
            "price.support-sla", "price.support-cost", "price.history", "price.marketplace"] },
  { id: "market", eyebrow: "Why now", title: "Where IOMETE sits in the market", kind: "cards",
    origin: "IOMETE-vs-SaaS comparison cards, homepage",
    facts: ["mkt.saas-only", "mkt.dremio", "co.gartner"] },
  { id: "vendor", eyebrow: "Who you are buying from", title: "A small company, honestly described", kind: "cards",
    origin: "About page + founders block",
    facts: ["co.founded", "co.size", "co.funding", "co.dell", "co.case-studies"] },
  { id: "logos", eyebrow: "Social proof", title: "The logos on iomete.com", kind: "logos",
    origin: "Logo marquee, homepage (caption added)",
    facts: ["co.logos"] },
];

export const atomById = Object.fromEntries(ATOMS.map((a) => [a.id, a]));
