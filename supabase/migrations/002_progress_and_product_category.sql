alter table if exists products
  add column if not exists category text not null default 'it';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_category_check'
  ) then
    alter table products
      add constraint products_category_check
      check (category in ('it', 'trading'));
  end if;
end $$;

create table if not exists user_module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null,
  module_slug text not null,
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, product_slug, module_slug)
);

alter table user_module_progress enable row level security;

drop policy if exists "users can read own progress" on user_module_progress;
create policy "users can read own progress"
  on user_module_progress for select
  using (auth.uid() = user_id);

drop policy if exists "users can insert own progress" on user_module_progress;
create policy "users can insert own progress"
  on user_module_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "users can delete own progress" on user_module_progress;
create policy "users can delete own progress"
  on user_module_progress for delete
  using (auth.uid() = user_id);

create index if not exists user_module_progress_user_product_idx
  on user_module_progress(user_id, product_slug);

create index if not exists user_module_progress_user_updated_idx
  on user_module_progress(user_id, updated_at desc);
