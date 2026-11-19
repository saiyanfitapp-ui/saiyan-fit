import { NextResponse } from 'next/server';
import { requireUser, supabaseAdmin } from '@/lib/supabase/server';
import { hashToken, newToken } from '@/lib/token';

// Genera (o rigenera) il token personale da incollare nel Comando rapido. Viene mostrato una sola volta.
export async function POST() {
  const { user } = await requireUser();
  if (!user) return NextResponse.json({ error: 'Sessione scaduta: esci e rientra nell\'app.' }, { status: 401 });
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: 'Su Vercel manca la variabile SUPABASE_SECRET_KEY.' }, { status: 500 });
  if (secret.startsWith('sb_publishable_')) return NextResponse.json({ error: 'In SUPABASE_SECRET_KEY hai messo la chiave publishable: serve quella sb_secret_….' }, { status: 500 });

  const token = newToken();
  const { error } = await supabaseAdmin().from('health_tokens').upsert({ user_id: user.id, token_hash: hashToken(token), created_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) {
    console.error('health token', error.code, error.message);
    const why = error.code === 'PGRST205' || /does not exist|schema cache/i.test(error.message)
      ? 'La tabella health_tokens non esiste: esegui di nuovo database.sql su Supabase.'
      : /invalid api key|jwt|unauthorized|apikey/i.test(error.message)
        ? 'La chiave SUPABASE_SECRET_KEY su Vercel non è valida: ricopiala da Supabase → API Keys.'
        : `Errore del database: ${error.message}`;
    return NextResponse.json({ error: why }, { status: 500 });
  }
  return NextResponse.json({ token });
}
