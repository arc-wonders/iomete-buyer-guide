import Experience from "@/components/Experience";
import { intentBySlug, intentFor } from "@/content/intents";

export default async function Page({ searchParams }: { searchParams: Promise<{ v?: string; p?: string }> }) {
  const { v, p } = await searchParams;
  let initial: string | null = v && intentBySlug[v] ? v : null;
  if (!initial && (p === "fde" || p === "cro" || p === "ceo")) initial = intentFor(p).slug;
  return <Experience initial={initial} />;
}
