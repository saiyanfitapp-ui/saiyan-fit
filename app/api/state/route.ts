import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/supabase/server';

export async function GET() {
  const { sb, user } = await requireUser();
  if (!user) return NextResponse.json({ error: 'login richiesto' }, { status: 401 });
  const [st, h] = await Promise.all([
    sb.from('app_state').select('data, chat').eq('user_id', user.id).maybeSingle(),
    sb.from('health_daily').select('day, steps, active_kcal, sleep_h, resting_hr, weight_kg').eq('user_id', user.id).order('day', { ascending: false }).limit(1).maybeSingle()
  ]);
  const d = h.data;
  const health = d ? Object.fromEntries(Object.entries({ steps: d.steps, active: d.active_kcal, sleep: d.sleep_h == null ? null : Number(d.sleep_h), hr: d.resting_hr, weight: d.weight_kg == null ? null : Number(d.weight_kg), day: d.day }).filter(([, v]) => v != null)) : null;
  return NextResponse.json({ data: st.data?.data ?? null, chat: st.data?.chat ?? null, health });
}

export async function PUT(req: Request) {
  const { sb, user } = await requireUser();
  if (!user) return NextResponse.json({ error: 'login richiesto' }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || (body.data === undefined && body.chat === undefined)) return NextResponse.json({ error: 'niente da salvare' }, { status: 400 });
  const row: Record<string, unknown> = { user_id: user.id, updated_at: new Date().toISOString() };
  if (body.data !== undefined) row.data = body.data;
  if (Array.isArray(body.chat)) row.chat = body.chat.slice(-60);
  const { error } = await sb.from('app_state').upsert(row, { onConflict: 'user_id' });
  if (error) return NextResponse.json({ error: 'salvataggio non riuscito' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
