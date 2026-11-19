import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Aggiorna la sessione e protegge l'app: senza login si va su /login.
export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: list => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      }
    }
  });
  const { data: { user } } = await sb.auth.getUser();
  const p = req.nextUrl.pathname;
  if (!user && !p.startsWith('/login') && !p.startsWith('/auth')) {
    if (p.startsWith('/api/')) return NextResponse.json({ error: 'login richiesto' }, { status: 401 });
    const u = req.nextUrl.clone(); u.pathname = '/login'; return NextResponse.redirect(u);
  }
  return res;
}

export const config = {
  // /api/health usa un token personale (Comandi rapidi), non la sessione
  matcher: ['/((?!_next/static|_next/image|icons/|manifest.webmanifest|sw.js|app.js|sf.js|api/health/ingest).*)']
};
