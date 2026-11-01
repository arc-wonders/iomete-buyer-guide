import { NextResponse } from "next/server";
import { answer, activeEngine, corpusStats } from "@/lib/answer";
import type { PersonaId } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const q = typeof body.q === "string" ? body.q.trim().slice(0, 500) : "";
  const persona = ["fde", "cro", "ceo"].includes(body.persona) ? (body.persona as PersonaId) : undefined;
  if (!q) return NextResponse.json({ error: "Type a question first." }, { status: 400 });
  const a = await answer(q, persona);
  return NextResponse.json(a);
}

export async function GET() {
  return NextResponse.json({ engine: activeEngine(), ...corpusStats() });
}
