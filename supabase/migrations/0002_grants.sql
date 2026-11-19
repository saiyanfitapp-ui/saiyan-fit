-- Permessi espliciti: i progetti Supabase nuovi non danno più accesso automatico alle tabelle create via SQL.
grant usage on schema public to authenticated, service_role;
grant select, insert, update, delete on public.app_state, public.weights to authenticated;
grant select on public.health_daily to authenticated;
grant select, insert, update, delete on public.app_state, public.health_daily, public.health_tokens, public.weights to service_role;
