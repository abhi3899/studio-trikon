-- ─────────────────────────────────────────────────────────
-- Studio Trikon — Supabase schema
-- Run this once in the Supabase SQL Editor (supabase.com → project → SQL Editor)
-- ─────────────────────────────────────────────────────────

-- Projects table
create table if not exists projects (
  id             text primary key,
  title          text not null,
  category       text not null,
  year           text not null,
  location       text not null,
  area           text not null default '',
  description    text not null,
  short_description text not null default '',
  images         text[] not null default '{}',
  cover_image    text not null default '',
  tags           text[] not null default '{}',
  featured       boolean not null default false,
  created_at     timestamptz default now()
);

-- Testimonials table
create table if not exists testimonials (
  id          text primary key,
  name        text not null,
  project     text not null,
  quote       text not null,
  role        text not null,
  created_at  timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────────

alter table projects    enable row level security;
alter table testimonials enable row level security;

-- Anyone (public visitors) can read
create policy "Public read projects"
  on projects for select using (true);

create policy "Public read testimonials"
  on testimonials for select using (true);

-- Only logged-in admin can insert / update / delete
create policy "Admin insert projects"
  on projects for insert to authenticated with check (true);

create policy "Admin update projects"
  on projects for update to authenticated using (true);

create policy "Admin delete projects"
  on projects for delete to authenticated using (true);

create policy "Admin insert testimonials"
  on testimonials for insert to authenticated with check (true);

create policy "Admin update testimonials"
  on testimonials for update to authenticated using (true);

create policy "Admin delete testimonials"
  on testimonials for delete to authenticated using (true);
