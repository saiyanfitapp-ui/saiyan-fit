import { NextResponse } from 'next/server';
import { requireUser, supabaseAdmin } from '@/lib/supabase/server';
import { hashToken, newToken } from '@/lib/token';

// Genera (o rigenera) il token personale da incollare nel Comando rapido. Viene mostrato una sola volta.
export async function POST() {
  const { user } = await requireUser();
  if (!user) return NextResponse.json({ error: 'login richiesto' }, { status: 401 });
  const token = newToken();
  const { error } = await supabaseAdmin().from('health_tokens').upsert({ user_id: user.id, token_hash: hashToken(token), created_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) return NextResponse.json({ error: 'token non creato' }, { status: 500 });
  return NextResponse.json({ token });
}
