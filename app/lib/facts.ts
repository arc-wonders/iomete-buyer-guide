import data from "@/content/facts.json";
import { ATOMS } from "@/content/atoms";
import { PERSONAS, PERSONA_IDS } from "@/content/personas";
import type { Fact, PersonaId } from "./types";

export const FACTS = data.facts as Fact[];
export const CHECKED_AT = data.checkedAt;
export const factById: Record<string, Fact> = Object.fromEntries(FACTS.map((f) => [f.id, f]));

/** Where a fact is shown: prefer the current persona, else the first persona that shows it. */
export function locateFact(factId: string, prefer?: PersonaId): { persona: PersonaId; atom: string } | null {
  const order = prefer ? [prefer, ...PERSONA_IDS.filter((p) => p !== prefer)] : PERSONA_IDS;
  for (const p of order) {
    for (const atomId of PERSONAS[p].atoms) {
      const atom = ATOMS.find((a) => a.id === atomId);
      if (atom?.facts.includes(factId)) return { persona: p, atom: atomId };
    }
  }
  return null;
}

export function factsForPersona(p: PersonaId): Fact[] {
  const ids = new Set(PERSONAS[p].atoms.flatMap((a) => ATOMS.find((x) => x.id === a)?.facts ?? []));
  return FACTS.filter((f) => ids.has(f.id));
}
