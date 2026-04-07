create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique
);

alter table public.users
  add column if not exists is_premium boolean not null default false,
  add column if not exists stripe_customer_id text,
  add column if not exists created_at timestamptz not null default timezone('utc', now()),
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'users_stripe_customer_id_key'
  ) then
    alter table public.users add constraint users_stripe_customer_id_key unique (stripe_customer_id);
  end if;
end
$$;

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  product_name text not null,
  amount integer not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.purchases
  add column if not exists currency text not null default 'eur',
  add column if not exists status text not null default 'paid',
  add column if not exists stripe_checkout_session_id text,
  add column if not exists stripe_payment_intent_id text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'purchases_status_check'
  ) then
    alter table public.purchases
      add constraint purchases_status_check check (status in ('paid', 'pending', 'failed', 'refunded'));
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'purchases_stripe_checkout_session_id_key'
  ) then
    alter table public.purchases
      add constraint purchases_stripe_checkout_session_id_key unique (stripe_checkout_session_id);
  end if;
end
$$;

create index if not exists purchases_user_status_created_at_idx
  on public.purchases (user_id, status, created_at desc);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  video_url text not null,
  position integer not null unique,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists modules_published_position_idx
  on public.modules (is_published, position);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row
execute function public.handle_updated_at();

insert into public.modules (title, description, video_url, position, is_published)
values
  (
    'Introduction + mindset',
    'Comprendre le plan des 30 jours, adopter le bon positionnement et eviter les blocages du debutant.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    1,
    true
  ),
  (
    'Bases du metier IT',
    'Les services que tu peux vendre vite, les problemes clients frequents et les competences a maitriser en priorite.',
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    2,
    true
  ),
  (
    'Trouver ses premiers clients',
    'Methode terrain pour decrocher ses premiers prospects sans audience ni gros budget marketing.',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    3,
    true
  ),
  (
    'Outils indispensables',
    'Les outils simples pour diagnostiquer, intervenir, s''organiser et paraitre professionnel des le depart.',
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    4,
    true
  ),
  (
    'Strategie freelance',
    'Construire une offre claire, fixer ses prix et structurer son activite pour tenir dans le temps.',
    'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    5,
    true
  ),
  (
    'Generer 1000 EUR/mois',
    'Plan d''action concret pour atteindre rapidement un premier palier de revenus recurrents.',
    'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
    6,
    true
  )
on conflict (position) do update
set
  title = excluded.title,
  description = excluded.description,
  video_url = excluded.video_url,
  is_published = excluded.is_published;

alter table public.users enable row level security;
alter table public.purchases enable row level security;
alter table public.modules enable row level security;

drop policy if exists "Users can insert their own profile" on public.users;
create policy "Users can insert their own profile"
on public.users
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.users;
create policy "Users can update their own profile"
on public.users
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can read their own profile" on public.users;
create policy "Users can read their own profile"
on public.users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can read their own purchases" on public.purchases;
create policy "Users can read their own purchases"
on public.purchases
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Anyone can read published modules" on public.modules;
drop policy if exists "Authenticated users can read published modules" on public.modules;
create policy "Anyone can read published modules"
on public.modules
for select
to anon, authenticated
using (is_published = true);
