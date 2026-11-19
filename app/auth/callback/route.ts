import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (code) {
    const sb = await supabaseServer();
    const { data, error } = await sb.auth.exchangeCodeForSession(code);
    const allowed = process.env.ALLOWED_EMAIL?.toLowerCase();
    if (!error && allowed && data.user?.email?.toLowerCase() !== allowed) {
      await sb.auth.signOut();
      return NextResponse.redirect(new URL('/login?e=non-autorizzato', url.origin));
    }
  }
  return NextResponse.redirect(new URL('/', url.origin));
}
