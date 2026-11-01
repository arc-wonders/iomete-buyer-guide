import { ATOMS } from "@/content/atoms";
import { intentBySlug, intentFor, sectionsFor } from "@/content/intents";
import { CHECKED_AT, factById } from "@/lib/facts";
import { STATE_LABEL } from "@/components/FactCard";
import PrintButton from "@/components/PrintButton";
import type { PersonaId } from "@/lib/types";

export const metadata = { title: "IOMETE brief" };

export default async function Brief({ searchParams }: { searchParams: Promise<{ p?: string; v?: string }> }) {
  const { p, v } = await searchParams;
  const intent = v && intentBySlug[v] ? intentBySlug[v] : intentFor((p === "fde" || p === "ceo" ? p : "cro") as PersonaId);
  const atoms = sectionsFor(intent).map((a) => ATOMS.find((x) => x.id === a)!);
  const all = atoms.flatMap((a) => a.facts.map((f) => factById[f]));
  const unknown = all.filter((f, i) => f.state === "unknown" && all.findIndex((x) => x.id === f.id) === i);

  return (
    <main className="brief">
      <style>{`
        .brief { max-width: 820px; margin: 0 auto; padding: 32px 20px 64px; font-size: 14px; }
        .brief h1 { font-size: 2rem; margin: 6px 0 4px; }
        .brief h2 { font-size: 1.2rem; margin: 26px 0 8px; padding-top: 10px; border-top: 1px solid var(--base-200); }
        .brief table { width: 100%; border-collapse: collapse; }
        .brief td { vertical-align: top; padding: 6px 8px 6px 0; border-bottom: 1px solid var(--base-100); }
        .brief td:first-child { width: 130px; }
        .brief td a { font-size: 12px; color: var(--base-700); word-break: break-all; }
        .brief .bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
        @media print { .brief { padding: 0; font-size: 11px; } .brief h2 { break-after: avoid; } tr { break-inside: avoid; } }
      `}</style>
      <div className="bar">
        <span className="eyebrow muted">IOMETE in plain words · checked {CHECKED_AT}</span>
        <span style={{ display: "flex", gap: 8 }}><a className="btn btn-dark no-print" href={`/?v=${intent.slug}`}>Back</a><PrintButton /></span>
      </div>
      <h1>{intent.question}</h1>
      <p style={{ fontSize: "1.1rem", margin: "10px 0 14px", maxWidth: "60ch" }}>{intent.answer}</p>
      <p className="muted">Every line is marked {Object.values(STATE_LABEL).map((s) => `“${s}”`).join(", ")}. Documented lines link to IOMETE&apos;s own docs, pricing or licence. Claimed lines are IOMETE marketing. Not public means we found no source.</p>

      {atoms.map((a) => (
        <section key={a.id}>
          <h2>{a.title}</h2>
          <table>
            <tbody>
              {a.facts.map((fid) => {
                const f = factById[fid];
                return (
                  <tr key={fid}>
                    <td><span className={`chip chip-${f.state}`}>{STATE_LABEL[f.state]}</span></td>
                    <td>{f.text}{f.url && <><br /><a href={f.url}>{f.url}</a></>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ))}

      {unknown.length > 0 && (
        <section>
          <h2>Questions to put to IOMETE in writing</h2>
          <ol>{unknown.map((f) => <li key={f.id}>{f.text}</li>)}</ol>
        </section>
      )}
      <p className="muted" style={{ marginTop: 24, fontSize: 12 }}>Unofficial prototype built at hackCBS 9.0. Not affiliated with or endorsed by IOMETE.</p>
    </main>
  );
}
