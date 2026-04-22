-- Econono · schéma initial
-- Analytics tracker custom (page_views) + newsletter

-- =====================================================================
-- 1. NEWSLETTER SUBSCRIBERS
-- =====================================================================
create table if not exists public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    source text not null default 'unknown', -- 'homepage' | 'article' | 'popup' | 'footer'
    confirmed_at timestamptz,
    unsubscribed_at timestamptz,
    locale text default 'fr-FR',
    user_agent text,
    referrer text,
    ip_country text,
    created_at timestamptz default now() not null
);

create index if not exists idx_newsletter_email on public.newsletter_subscribers(email);
create index if not exists idx_newsletter_created on public.newsletter_subscribers(created_at desc);

alter table public.newsletter_subscribers enable row level security;

-- Anyone can insert (signup), but only service_role can read/update/delete
drop policy if exists "newsletter_anon_insert" on public.newsletter_subscribers;
create policy "newsletter_anon_insert" on public.newsletter_subscribers for insert to anon with check (true);

-- =====================================================================
-- 2. PAGE VIEWS (analytics tracker custom + bot detection)
-- =====================================================================
create table if not exists public.page_views (
    id bigserial primary key,
    visit_id uuid not null, -- rotates every 30 min, anonymous
    path text not null,
    referrer text,
    user_agent text,
    is_bot boolean default false,
    bot_family text, -- 'google', 'gpt', 'claude', 'perplexity', 'apple', 'bing', 'yandex', 'human'
    locale text default 'fr-FR',
    viewport_w int,
    viewport_h int,
    created_at timestamptz default now() not null
);

create index if not exists idx_pv_path on public.page_views(path);
create index if not exists idx_pv_created on public.page_views(created_at desc);
create index if not exists idx_pv_bot_family on public.page_views(bot_family) where bot_family is not null;
create index if not exists idx_pv_visit on public.page_views(visit_id, created_at desc);

alter table public.page_views enable row level security;

drop policy if exists "pv_anon_insert" on public.page_views;
create policy "pv_anon_insert" on public.page_views for insert to anon with check (true);

-- =====================================================================
-- 3. CALCULATEUR USES (anonymous tracking · which calculator was used + score)
-- =====================================================================
create table if not exists public.calculateur_uses (
    id bigserial primary key,
    calculateur_slug text not null, -- 'budget-mensuel', 'reste-a-vivre', etc.
    score int, -- score santé budgétaire si applicable
    bracket text, -- 'sain' | 'correct' | 'tendu' | 'alerte'
    is_bot boolean default false,
    bot_family text,
    locale text default 'fr-FR',
    created_at timestamptz default now() not null
);

create index if not exists idx_cu_slug on public.calculateur_uses(calculateur_slug);
create index if not exists idx_cu_created on public.calculateur_uses(created_at desc);

alter table public.calculateur_uses enable row level security;

drop policy if exists "cu_anon_insert" on public.calculateur_uses;
create policy "cu_anon_insert" on public.calculateur_uses for insert to anon with check (true);

-- =====================================================================
-- 4. VIEWS · admin dashboard
-- =====================================================================

-- Daily aggregates last 30 days
create or replace view public.v_daily_stats as
select
    date_trunc('day', created_at)::date as day,
    count(*) filter (where not is_bot) as human_views,
    count(*) filter (where is_bot) as bot_views,
    count(distinct visit_id) filter (where not is_bot) as human_unique,
    count(distinct visit_id) filter (where is_bot) as bot_unique
from public.page_views
where created_at >= now() - interval '30 days'
group by 1
order by 1 desc;

-- Top pages last 7 days (humans only)
create or replace view public.v_top_pages_7d as
select
    path,
    count(*) as views,
    count(distinct visit_id) as unique_visitors
from public.page_views
where created_at >= now() - interval '7 days' and not is_bot
group by path
order by views desc
limit 100;

-- Bot families last 7 days
create or replace view public.v_bot_families_7d as
select
    coalesce(bot_family, 'other') as family,
    count(*) as hits,
    count(distinct path) as unique_paths
from public.page_views
where created_at >= now() - interval '7 days' and is_bot
group by 1
order by hits desc;

-- Calculateur usage last 7 days
create or replace view public.v_calculateur_usage_7d as
select
    calculateur_slug,
    count(*) as uses,
    count(*) filter (where bracket = 'sain') as sain,
    count(*) filter (where bracket = 'correct') as correct,
    count(*) filter (where bracket = 'tendu') as tendu,
    count(*) filter (where bracket = 'alerte') as alerte,
    avg(score)::int as avg_score
from public.calculateur_uses
where created_at >= now() - interval '7 days' and not is_bot
group by calculateur_slug
order by uses desc;
