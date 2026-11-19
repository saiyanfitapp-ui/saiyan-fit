import Anthropic from '@anthropic-ai/sdk';
import { requireUser } from '@/lib/supabase/server';
import { WHIS_SYSTEM } from '@/lib/whis';

export const runtime = 'nodejs';
export const maxDuration = 60;

const client = new Anthropic();
type Turn = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  const { user } = await requireUser();
  if (!user) return new Response('login richiesto', { status: 401 });
  const body = await req.json().catch(() => null) as { message?: string; history?: Turn[]; context?: unknown } | null;
  const message = body?.message?.trim().slice(0, 4000);
  if (!message) return new Response('messaggio vuoto', { status: 400 });

  // La conversazione deve alternare user/assistant e iniziare con user
  const history: Turn[] = [];
  for (const t of (body?.history ?? []).slice(-12)) {
    if ((t.role !== 'user' && t.role !== 'assistant') || typeof t.content !== 'string' || !t.content.trim()) continue;
    if (!history.length && t.role !== 'user') continue;
    if (history.length && history[history.length - 1].role === t.role) history[history.length - 1].content += '\n' + t.content;
    else history.push({ role: t.role, content: t.content.slice(0, 4000) });
  }
  if (history.length && history[history.length - 1].role === 'user') history.pop();

  const ctx = JSON.stringify(body?.context ?? {}).slice(0, 12000);
  const stream = client.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: 4000,
    output_config: { effort: 'medium' },
    system: [{ type: 'text', text: WHIS_SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [
      ...history,
      { role: 'user', content: `Contesto aggiornato dell'atleta (JSON):\n${ctx}\n\nDomanda: ${message}` }
    ]
  });

  const enc = new TextEncoder();
  const out = new ReadableStream({
    async start(ctrl) {
      try {
        for await (const ev of stream) {
          if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') ctrl.enqueue(enc.encode(ev.delta.text));
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') ctrl.enqueue(enc.encode('\n\nSu questo non posso aiutarti. Se riguarda la salute, parlane con il tuo medico.'));
        if (final.stop_reason === 'max_tokens') ctrl.enqueue(enc.encode('…'));
        ctrl.close();
      } catch (e) {
        console.error('whis', e instanceof Anthropic.APIError ? `${e.status} ${e.message}` : e);
        ctrl.error(e);
      }
    },
    cancel() { stream.abort(); }
  });
  return new Response(out, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });
}
