import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const client = new Anthropic();
const Items = z.object({
  items: z.array(z.object({
    name: z.string().describe('Nome dell\'alimento in italiano, es. "Petto di pollo"'),
    grams: z.number().describe('Grammi stimati nel piatto'),
    k: z.number().describe('kcal per 100 g'),
    p: z.number().describe('proteine g per 100 g'),
    c: z.number().describe('carboidrati g per 100 g'),
    f: z.number().describe('grassi g per 100 g')
  }))
});

export async function POST(req: Request) {
  const { user } = await requireUser();
  if (!user) return NextResponse.json({ error: 'login richiesto' }, { status: 401 });
  const body = await req.json().catch(() => null) as { image?: string; meal?: string } | null;
  const m = body?.image?.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/);
  if (!m) return NextResponse.json({ error: 'immagine non valida' }, { status: 400 });

  try {
    const res = await client.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 8000,
      output_config: { effort: 'low', format: zodOutputFormat(Items) },
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: m[1] as 'image/jpeg', data: m[2] } },
          { type: 'text', text: `Sei un nutrizionista sportivo. Questa è la foto del mio ${body?.meal ?? 'pasto'}. Elenca ogni alimento visibile (condimenti compresi, es. olio) con i grammi stimati nel piatto e i valori per 100 g dell'alimento così com'è (cotto se è cotto). Stima le porzioni usando piatto e posate come riferimento. Se nella foto non c'è cibo, restituisci una lista vuota.` }
        ]
      }]
    });
    if (res.stop_reason === 'refusal' || !res.parsed_output) return NextResponse.json({ items: [] });
    const items = res.parsed_output.items
      .filter(i => i.grams > 0)
      .map(i => ({ name: i.name.slice(0, 60), grams: Math.round(i.grams), k: Math.round(i.k), p: +i.p.toFixed(1), c: +i.c.toFixed(1), f: +i.f.toFixed(1) }));
    return NextResponse.json({ items });
  } catch (e) {
    console.error('analyze-meal', e instanceof Anthropic.APIError ? `${e.status} ${e.message}` : e);
    return NextResponse.json({ error: 'analisi non riuscita' }, { status: 502 });
  }
}
