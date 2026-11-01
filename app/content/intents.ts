import type { PersonaId } from "@/lib/types";
import { PERSONAS } from "./personas";

/**
 * What the visitor sees: questions, never roles. Each question silently maps to a persona
 * (which decides the rest of the page) and to the sections that answer it first.
 */
export interface Intent {
  slug: string;
  persona: PersonaId;
  question: string;
  /** Direct answer shown under the question. Summarises documented facts only. */
  answer: string;
  /** One short line shown under the question; the picture carries the rest. */
  hook: string;
  first: string[];
}

export const INTENTS: Intent[] = [
  {
    slug: "where-data-goes", persona: "cro",
    question: "Where does our data go?",
    hook: "It stays in your environment.",
    answer: "It stays in your environment. IOMETE runs inside your Kubernetes and your object store and never hosts your data. Support access happens only when you authorise it, read-only, with credentials you control.",
    first: ["perimeter"],
  },
  {
    slug: "security-review", persona: "cro",
    question: "Will this pass our security review?",
    hook: "Documented controls. SOC 2 audited.",
    answer: "Every data control is documented: SSO, MFA, masking, row filters, audit tables, network policies and encrypted secrets. IOMETE is SOC 2 audited, HIPAA and GDPR compliant, and publishes its policies in a trust center.",
    first: ["controls", "attestations"],
  },
  {
    slug: "what-it-costs", persona: "ceo",
    question: "What does it cost?",
    hook: "$500 per vCPU a year, $100,000 minimum.",
    answer: "$500 per vCPU per year, with a $100,000 yearly minimum, plus the servers or cloud capacity you already run. No per-query or per-user fees.",
    first: ["pricing"],
  },
  {
    slug: "why-not-saas", persona: "ceo",
    question: "Why not just use Databricks or Snowflake?",
    hook: "They host your data. IOMETE runs on your infrastructure.",
    answer: "Those run as cloud services on someone else's infrastructure. IOMETE runs on yours: you control where data lives, keep your cloud discounts, and never pay a SaaS premium.",
    first: ["plain", "market"],
  },
  {
    slug: "what-gets-installed", persona: "fde",
    question: "What would we actually install?",
    hook: "One Helm chart into your Kubernetes.",
    answer: "One Helm chart into your Kubernetes: a control plane, then a data plane per environment, each running Spark and SQL next to your own object store and PostgreSQL.",
    first: ["architecture", "deploy"],
  },
  {
    slug: "how-hard-to-run", persona: "fde",
    question: "How hard is this to run?",
    hook: "A Kubernetes cluster, and IOMETE's engineers if you want them.",
    answer: "You need a Kubernetes cluster and someone who can operate it. If you don't have that person, IOMETE's forward-deployed engineers work as part of your team.",
    first: ["run-it"],
  },
];

export const intentBySlug = Object.fromEntries(INTENTS.map((i) => [i.slug, i]));

/** Section order for a page: the intent's sections first, then the rest of its persona's. */
export function sectionsFor(intent: Intent): string[] {
  const rest = PERSONAS[intent.persona].atoms.filter((a) => !intent.first.includes(a));
  return [...intent.first, ...rest];
}

/** The intent a bot answer should open: the one whose first sections hold the atom, else the persona's first. */
export function intentFor(persona: PersonaId, atom?: string): Intent {
  const own = INTENTS.filter((i) => i.persona === persona);
  return (atom && own.find((i) => i.first.includes(atom))) || own[0];
}
