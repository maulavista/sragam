-- ============================================================
-- sragam.com — Supabase schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Orders table
create table if not exists public.orders (
  id               uuid        primary key default gen_random_uuid(),
  created_at       timestamptz not null    default now(),

  -- Contact
  nama             text        not null,
  whatsapp         text        not null,
  nama_organisasi  text,

  -- Order details
  jenis_seragam    text        not null,
  jumlah           integer     not null check (jumlah > 0),
  bahan            text,
  metode_logo      text,
  desain_path      text,
  deadline         date,
  catatan          text,

  -- Internal
  status           text        not null    default 'baru',
  email_sent       boolean     not null    default false
);

-- Enable Row Level Security
alter table public.orders enable row level security;

-- Only allow anonymous inserts (public form submissions)
-- All reads/updates are admin-only via service role key
create policy "allow_public_insert" on public.orders
  for insert
  with check (true);

-- ============================================================
-- Storage bucket for design file uploads
-- Run this separately or via Supabase dashboard
-- ============================================================

-- Create a private bucket (files are not publicly accessible)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'order-designs',
  'order-designs',
  false,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do nothing;

-- Allow anyone to upload (server bypasses this via service role key anyway)
create policy "allow_upload_designs" on storage.objects
  for insert
  with check (bucket_id = 'order-designs');
