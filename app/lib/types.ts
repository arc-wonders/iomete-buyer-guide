export type State = "documented" | "claimed" | "unknown";
export type PersonaId = "fde" | "cro" | "ceo";

export interface Fact {
  id: string;
  state: State;
  text: string;
  quote: string;
  url: string;
  source: string;
  keywords?: string;
}

export interface Chunk {
  id: string;
  url: string;
  title: string;
  heading: string;
  date: string;
  tier: number;
  text: string;
}

export type AtomKind =
  | "deploy" | "architecture" | "showcase" | "cards" | "checklist"
  | "perimeter" | "pricing" | "plain" | "logos";

export interface Atom {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  kind: AtomKind;
  facts: string[];
  /** Which iomete.com component this atom reuses. */
  origin: string;
}

export interface Persona {
  id: PersonaId;
  label: string;
  title: string;
  door: string;
  headline: string;
  lead: string;
  atoms: string[];
  next: { label: string; href: string; note: string }[];
}

export interface Answer {
  text: string;
  state: State;
  factIds: string[];
  sources: { url: string; title: string; quote?: string }[];
  action: { type: "navigate" | "none"; persona?: PersonaId; atom?: string; fact?: string };
  engine: "claude" | "gemini" | "retrieval";
  guard?: string[];
}
