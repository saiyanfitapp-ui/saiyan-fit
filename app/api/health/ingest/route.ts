import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { hashToken } from '@/lib/token';

export const runtime = 'nodejs';

const num = (v: unknown) => {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  // Comandi rapidi in italiano può mandare "8.240 passi" o "78,4 kg"
  let t = String(v).trim().replace(/[^\d.,-]/g, '');
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, '');
  const n = parseFloat(t.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

/**
 * Riceve i dati di Salute da Comandi rapidi.
 * Header: Authorization: Bearer <token>
 * Body JSON: { day?: "2026-11-19", steps, active_kcal, sleep_h, resting_hr, weight_kg, workouts? }
 */
export async function POST(req: Request) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (!token) return NextResponse.json({ error: 'token mancante' }, { status: 401 });
  const db = supabaseAdmin();
  const { data: owner } = await db.from('health_tokens').select('user_id').eq('token_hash', hashToken(token)).maybeSingle();
  if (!owner) return NextResponse.json({ error: 'token non valido' }, { status: 401 });

  const b = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!b) return NextResponse.json({ error: 'JSON non valido' }, { status: 400 });
  const day = typeof b.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(b.day) ? b.day : new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' });

  const row = {
    user_id: owner.user_id, day,
    steps: num(b.steps) == null ? null : Math.round(num(b.steps)!),
    active_kcal: num(b.active_kcal) == null ? null : Math.round(num(b.active_kcal)!),
    sleep_h: num(b.sleep_h), resting_hr: num(b.resting_hr) == null ? null : Math.round(num(b.resting_hr)!),
    weight_kg: num(b.weight_kg), workouts: Array.isArray(b.workouts) ? b.workouts.slice(0, 20) : null,
    updated_at: new Date().toISOString()
  };
  const clean = Object.fromEntries(Object.entries(row).filter(([, v]) => v !== null));
  const { error } = await db.from('health_daily').upsert(clean, { onConflict: 'user_id,day' });
  if (error) return NextResponse.json({ error: 'salvataggio non riuscito' }, { status: 500 });
  if (row.weight_kg) await db.from('weights').upsert({ user_id: owner.user_id, day, kg: row.weight_kg }, { onConflict: 'user_id,day' });
  return NextResponse.json({ ok: true, day });
}
