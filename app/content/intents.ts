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
  first: string[];
}

export const INTENTS: Intent[] = [
  {
    slug: "where-data-goes", persona: "cro",
    question: "Where does our data go?",
    answer: "It stays in your environment. IOMETE runs inside your Kubernetes and your object store and does not host your data. Two things can cross the line: usage data the licence allows, and support access you approve per contract.",
    first: ["perimeter"],
  },
  {
    slug: "security-review", persona: "cro",
    question: "Will this pass our security review?",
    answer: "The data controls are well documented: SSO, masking, row filters, audit tables. The company-level evidence is thinner: a 2022 SOC 2 Type I, and several questions you will have to put to IOMETE in writing.",
    first: ["controls", "attestations", "open-questions"],
  },
  {
    slug: "what-it-costs", persona: "ceo",
    question: "What does it cost?",
    answer: "$500 per vCPU per year, with a $100,000 yearly minimum, plus the servers or cloud capacity you run it on. There are no per-query fees.",
    first: ["pricing"],
  },
  {
    slug: "why-not-saas", persona: "ceo",
    question: "Why not just use Databricks or Snowflake?",
    answer: "Those run as cloud services on someone else's infrastructure. IOMETE runs on yours. You get control over where data lives, and you take on running it.",
    first: ["plain", "market"],
  },
  {
    slug: "what-gets-installed", persona: "fde",
    question: "What would we actually install?",
    answer: "One Helm chart into your Kubernetes: a control plane, then a data plane per environment, each running Spark and SQL next to your own object store and PostgreSQL.",
    first: ["architecture", "deploy"],
  },
  {
    slug: "how-hard-to-run", persona: "fde",
    question: "How hard is this to run?",
    answer: "You need a Kubernetes cluster and someone who can operate it. If you don't have that person, IOMETE offers engineers who work as part of your team. Some features are still missing, and they are listed below.",
    first: ["run-it", "not-yet"],
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
