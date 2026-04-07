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

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text not null default '',
  short_description text not null default '',
  long_description text not null default '',
  price_cents integer not null default 0,
  currency text not null default 'eur',
  stripe_price_id text,
  thumbnail_url text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_modules (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null default '',
  content_type public.product_content_type not null default 'coming_soon',
  content_url text,
  content_body text,
  is_published boolean not null default true,
  sort_order integer not null default 1,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'product_modules_product_id_slug_key'
  ) then
    alter table public.product_modules
      add constraint product_modules_product_id_slug_key unique (product_id, slug);
  end if;
end
$$;

alter table public.purchases
  add column if not exists product_id uuid references public.products (id) on delete set null,
  add column if not exists amount_total integer,
  add column if not exists stripe_session_id text;

update public.purchases
set amount_total = coalesce(amount_total, amount)
where amount_total is null;

update public.purchases
set stripe_session_id = coalesce(stripe_session_id, stripe_checkout_session_id)
where stripe_session_id is null;

create index if not exists products_active_featured_idx
  on public.products (is_active, is_featured, created_at desc);

create index if not exists product_modules_product_order_idx
  on public.product_modules (product_id, is_published, sort_order);

create index if not exists purchases_product_status_created_at_idx
  on public.purchases (product_id, status, created_at desc);

create unique index if not exists purchases_paid_product_per_user_idx
  on public.purchases (user_id, product_id)
  where status = 'paid' and product_id is not null;

create unique index if not exists purchases_stripe_session_id_key
  on public.purchases (stripe_session_id)
  where stripe_session_id is not null;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.handle_updated_at();

drop trigger if exists set_product_modules_updated_at on public.product_modules;
create trigger set_product_modules_updated_at
before update on public.product_modules
for each row
execute function public.handle_updated_at();

alter table public.products enable row level security;
alter table public.product_modules enable row level security;

drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Owners can read purchased product modules" on public.product_modules;
create policy "Owners can read purchased product modules"
on public.product_modules
for select
to authenticated
using (
  is_published = true
  and (
    exists (
      select 1
      from public.users
      where users.id = auth.uid()
        and users.is_premium = true
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
