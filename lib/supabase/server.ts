import { createServerClient } from '@supabase/ssr';
import { createClient as createAdmin } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: list => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* chiamato da un Server Component */ }
      }
    }
  });
}

/** Client con chiave segreta: SOLO lato server, bypassa RLS. Usato per l'ingest da Salute. */
export function supabaseAdmin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, { auth: { persistSession: false } });
}

export async function requireUser() {
  const sb = await supabaseServer();
  const { data } = await sb.auth.getUser();
  return { sb, user: data.user };
}
