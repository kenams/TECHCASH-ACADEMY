create extension if not exists "pgcrypto";

do $$
begin
  if not exists (
    select 1 from pg_type where typname = 'product_content_type'
  ) then
    create type public.product_content_type as enum ('pdf', 'video', 'text', 'resource', 'coming_soon');
  end if;
end
$$;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  is_premium boolean not null default false,
  stripe_customer_id text unique,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row
execute function public.handle_updated_at();

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text not null,
  short_description text not null,
  long_description text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'eur',
  stripe_price_id text,
  thumbnail_url text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.handle_updated_at();

create table if not exists public.product_modules (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null,
  content_type public.product_content_type not null default 'text',
  content_url text,
  content_body text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (product_id, slug)
);

drop trigger if exists set_product_modules_updated_at on public.product_modules;
create trigger set_product_modules_updated_at
before update on public.product_modules
for each row
execute function public.handle_updated_at();

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_name text not null,
  amount integer not null,
  amount_total integer,
  currency text not null default 'eur',
  status text not null default 'paid',
  stripe_session_id text,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.purchases
  drop constraint if exists purchases_status_check;

alter table public.purchases
  add constraint purchases_status_check
  check (status in ('paid', 'pending', 'failed', 'refunded'));

create index if not exists purchases_user_status_created_at_idx
  on public.purchases (user_id, status, created_at desc);

create unique index if not exists purchases_stripe_session_id_idx
  on public.purchases (stripe_session_id)
  where stripe_session_id is not null;

create unique index if not exists purchases_paid_product_per_user_idx
  on public.purchases (user_id, product_id)
  where status = 'paid' and product_id is not null;

create index if not exists products_active_featured_idx
  on public.products (is_active, is_featured, created_at desc);

create index if not exists product_modules_product_published_idx
  on public.product_modules (product_id, is_published, sort_order);

alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.product_modules enable row level security;
alter table public.purchases enable row level security;

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

drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Members can read published modules for owned products" on public.product_modules;
create policy "Members can read published modules for owned products"
on public.product_modules
for select
to authenticated
using (
  is_published = true
  and (
    exists (
      select 1
      from public.users
      where users.id = auth.uid() and users.is_premium = true
    )
    or exists (
      select 1
      from public.purchases
      where purchases.user_id = auth.uid()
        and purchases.product_id = product_modules.product_id
        and purchases.status = 'paid'
    )
  )
);
