-- Saiyan Fit: schema iniziale. Ogni riga appartiene a un utente e solo lui la vede (RLS).

-- Stato dell'app (profilo, obiettivo, piano, lista spesa, esercizi, media leggeri) + chat con Whis
create table if not exists public.app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  chat jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Dati giornalieri da Salute / Apple Watch (inviati da Comandi rapidi)
create table if not exists public.health_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  steps integer,
  active_kcal integer,
  sleep_h numeric(4,2),
  resting_hr integer,
  weight_kg numeric(5,2),
  workouts jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

-- Token personale per Comandi rapidi (salviamo solo l'hash)
create table if not exists public.health_tokens (
  user_id uuid primary key references auth.users(id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now()
);

-- Registro peso storico (anche da Salute)
create table if not exists public.weights (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  kg numeric(5,2) not null,
  primary key (user_id, day)
);

alter table public.app_state enable row level security;
alter table public.health_daily enable row level security;
alter table public.health_tokens enable row level security;
alter table public.weights enable row level security;

create policy "own app_state" on public.app_state for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own health_daily read" on public.health_daily for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "own weights" on public.weights for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
-- health_tokens: nessuna policy, accesso solo dal server con chiave segreta.

-- Bucket privato per foto progressi e video esercizi (fase successiva)
insert into storage.buckets (id, name, public) values ('media', 'media', false) on conflict (id) do nothing;
create policy "own media read" on storage.objects for select to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "own media write" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "own media delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);
