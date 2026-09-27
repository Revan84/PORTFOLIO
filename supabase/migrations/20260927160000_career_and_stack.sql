-- Career and stack move from the code (src/content/experience.ts and stack.ts) to Supabase.
-- The site reads them with the publishable key, so every table keeps RLS and a read policy.

-- ── Stack layers: the six rows of the home "stack" section, top (1) to bottom (6). ──
create table public.stack_layers (
  id bigint generated always as identity primary key,
  code text not null unique,          -- "L6", shown before the name
  name text not null,
  position int not null unique
);

alter table public.stack_layers enable row level security;

create policy "Read stack layers" on public.stack_layers
  for select to anon, authenticated using (true);

-- ── Skills: each one belongs to a layer. The layer replaces the old free-text category. ──
alter table public.skills
  add column layer_id bigint references public.stack_layers (id),
  add column position int not null default 0;

alter table public.skills drop column category;

create index skills_layer_id_idx on public.skills (layer_id);

-- ── Experiences: the "git log" of the career, newest first. ──
create table public.experiences (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  hash text not null unique,          -- fake commit hash, shown in the log
  title text not null,
  organization text not null,
  location text,
  ref text not null,                  -- git-style label: "HEAD → main", "work-study"...
  node text not null check (node in ('head', 'commit', 'branch', 'root')),
  start_year int not null,
  end_year int,                       -- null while ongoing
  summary text not null,              -- Markdown, links allowed
  highlights text[] not null default '{}',
  tools text[] not null default '{}',
  position int not null,              -- 1 = top of the log
  published_at timestamptz,
  check (end_year is null or end_year >= start_year)
);

alter table public.experiences enable row level security;

create policy "Read published experiences" on public.experiences
  for select to anon, authenticated using (published_at is not null);

-- ── Pages: no longer read by the site (the about text lives with the home content). ──
drop table public.pages;
