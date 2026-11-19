# Saiyan Fit

App personale per alimentazione (Senzu), palestra (Gravity Room) e coach AI (Whis). Next.js 15 + Supabase + API Anthropic, installabile su iPhone come PWA.

## Configurazione

1. **Supabase**: SQL Editor → esegui `supabase/migrations/0001_init.sql`.
2. **Variabili d'ambiente** (Vercel → Settings → Environment Variables, oppure `.env.local`): vedi `.env.example`.
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` (solo server)
   - `ANTHROPIC_API_KEY`
   - `ALLOWED_EMAIL` (facoltativa: solo questa email può entrare)
3. **Supabase → Authentication → URL Configuration**: Site URL = indirizzo Vercel, Redirect URL = `https://<tuo-dominio>/auth/callback`.

## Struttura

- `app/page.tsx` + `app/shell.ts` + `public/app.js`: interfaccia (portata dal prototipo).
- `public/sf.js`: ponte con il backend (salvataggio, Whis in streaming, analisi foto).
- `app/api/state`: stato dell'app per utente (RLS).
- `app/api/whis`: coach Whis (`claude-opus-5-5`, streaming). Prompt in `lib/whis.ts`.
- `app/api/analyze-meal`: foto del piatto → alimenti, grammi, macro.
- `app/api/health/token` e `app/api/health/ingest`: dati da Salute/Apple Watch via Comandi rapidi.
- `public/sw.js`, `public/manifest.webmanifest`: PWA e uso offline.

## Salute (Comandi rapidi)

`POST /api/health/ingest` con header `Authorization: Bearer <token>` e body JSON:
`{"steps": 8000, "active_kcal": 520, "sleep_h": 7.3, "resting_hr": 57, "weight_kg": 78.4}`
