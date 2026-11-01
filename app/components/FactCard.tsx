import type { Fact, State } from "@/lib/types";

export const STATE_LABEL: Record<State, string> = {
  documented: "Documented",
  claimed: "IOMETE claims",
  unknown: "Not public",
};
export function Chip({ state }: { state: State }) {
  return <span className={`chip chip-${state}`}>{STATE_LABEL[state]}</span>;
}

/** One claim as a ledger row: the statement, then its mark and its source. */
export function FactRow({ fact, highlighted }: { fact: Fact; highlighted?: boolean }) {
  return (
    <li id={`fact-${fact.id}`} className={`row${highlighted ? " hl" : ""}`} data-state={fact.state}>
      <p className="row-text">{fact.text}</p>
      <div className="row-meta">
        <Chip state={fact.state} />
        {fact.url ? (
          <a href={fact.url} target="_blank" rel="noreferrer">{fact.source}</a>
        ) : (
          <span className="muted">No public source</span>
        )}
        {fact.quote && (
          <details>
            <summary>Exact words</summary>
            <blockquote>“{fact.quote}”</blockquote>
          </details>
        )}
      </div>
    </li>
  );
}
