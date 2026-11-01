import { ATOMS } from "@/content/atoms";
import { intentBySlug, intentFor, sectionsFor } from "@/content/intents";
import { CHECKED_AT, factById } from "@/lib/facts";
import PrintButton from "@/components/PrintButton";
import type { PersonaId } from "@/lib/types";

export const metadata = { title: "IOMETE brief" };

export default async function Brief({ searchParams }: { searchParams: Promise<{ p?: string; v?: string }> }) {
  const { p, v } = await searchParams;
  const intent = v && intentBySlug[v] ? intentBySlug[v] : intentFor((p === "fde" || p === "ceo" ? p : "cro") as PersonaId);
  const atoms = sectionsFor(intent).map((a) => ATOMS.find((x) => x.id === a)!);

  return (
    <main className="brief">
      <style>{`
        .brief { max-width: 820px; margin: 0 auto; padding: 32px 20px 64px; font-size: 14px; }
        .brief h1 { font-size: 2rem; margin: 6px 0 4px; }
        .brief h2 { font-size: 1.2rem; margin: 26px 0 8px; padding-top: 10px; border-top: 1px solid var(--base-200); }
        .brief table { width: 100%; border-collapse: collapse; }
        .brief td { vertical-align: top; padding: 6px 8px 6px 0; border-bottom: 1px solid var(--base-100); }
        .brief td a { font-size: 12px; color: var(--base-700); word-break: break-all; }
        .brief .bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
        @media print { .brief { padding: 0; font-size: 11px; } .brief h2 { break-after: avoid; } tr { break-inside: avoid; } }
      `}</style>
      <div className="bar">
        <span className="eyebrow muted">IOMETE · checked {CHECKED_AT}</span>
        <span style={{ display: "flex", gap: 8 }}><a className="btn btn-dark no-print" href={`/?v=${intent.slug}`}>Back</a><PrintButton /></span>
      </div>
      <h1>{intent.question}</h1>
      <p style={{ fontSize: "1.1rem", margin: "10px 0 14px", maxWidth: "60ch" }}>{intent.answer}</p>
      <p className="muted">Every line links to its source on iomete.com.</p>

      {atoms.map((a) => (
        <section key={a.id}>
          <h2>{a.title}</h2>
          <table>
            <tbody>
              {a.facts.map((fid) => factById[fid]).filter((f) => f && f.state !== "unknown").map((f) => (
                <tr key={f.id}>
                  <td>{f.text}{f.url && <><br /><a href={f.url}>{f.url}</a></>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

    </main>
  );
}
