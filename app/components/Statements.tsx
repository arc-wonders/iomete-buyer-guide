"use client";
import { ATOMS } from "@/content/atoms";
import { factById } from "@/lib/facts";
import { Dot } from "./Visuals";

/** Every sourced statement behind a page, folded away until wanted. */
export function Statements({ atoms, open, setOpen, highlight }: {
  atoms: string[]; open: boolean; setOpen: (o: boolean) => void; highlight?: string;
}) {
  const groups = atoms.map((id) => ATOMS.find((a) => a.id === id)!).filter(Boolean);
  const total = new Set(groups.flatMap((g) => g.facts)).size;
  return (
    <details className="statements" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary>{open ? "Hide" : "Show"} the {total} sourced statements behind this page</summary>
      {groups.map((g) => (
        <section key={g.id} id={`atom-${g.id}`}>
          <h3>{g.title}</h3>
          <ul>
            {g.facts.map((fid) => {
              const f = factById[fid];
              return (
                <li key={fid} id={`fact-${fid}`} className={highlight === fid ? "hl" : ""}>
                  <Dot state={f.state} />
                  <div>
                    <p>{f.text}</p>
                    {f.url ? <a href={f.url} target="_blank" rel="noreferrer">{f.source}</a> : <span className="nosrc">No public source</span>}
                    {f.quote && <q>{f.quote}</q>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </details>
  );
}
