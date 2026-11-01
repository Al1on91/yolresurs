-- Yo‘lResurs.uz — Supabase sozlamasi
-- Supabase → SQL Editor → New query → shu faylning hammasini joylab, RUN bosing.

-- 1) Yagona yozuvlar jadvali (hujjatlar, yangiliklar, arizalar, savollar va h.k.)
create table if not exists public.records (
  col        text        not null,
  id         text        not null,
  data       jsonb       not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (col, id)
);
alter table public.records enable row level security;

-- 2) Administratorlar ro‘yxati. Pastdagi pochtani O‘ZINGIZNIKIGA almashtiring!
create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;
insert into public.admins (email) values ('aliroda.02042017@gmail.com') on conflict do nothing;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

-- 3) Kirish qoidalari
drop policy if exists "public read"   on public.records;
drop policy if exists "anon submit"   on public.records;
drop policy if exists "admin all"     on public.records;

-- Hamma o‘qiy oladigan bo‘limlar
create policy "public read" on public.records for select
  to anon, authenticated
  using (col in ('docs','news','links','collections','site','specialists','qa','specstat'));

-- Foydalanuvchilar faqat yangi ariza / savol qo‘sha oladi (o‘qiy olmaydi, o‘zgartira olmaydi)
create policy "anon submit" on public.records for insert
  to anon, authenticated
  with check (col in ('submissions','specreq','qareq') and length(data::text) < 20000);

-- Faqat administratorlar ro‘yxatidagi foydalanuvchi hamma narsani boshqaradi
create policy "admin all" on public.records for all
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 4) Fayllar uchun ochiq ombor (PDF, DOCX, rasmlar)
insert into storage.buckets (id, name, public)
values ('files', 'files', true)
on conflict (id) do update set public = true;

drop policy if exists "files public read"  on storage.objects;
drop policy if exists "files admin write"  on storage.objects;
drop policy if exists "files admin delete" on storage.objects;
create policy "files public read"  on storage.objects for select to anon, authenticated using (bucket_id = 'files');
create policy "files admin write"  on storage.objects for insert to authenticated with check (bucket_id = 'files' and public.is_admin());
create policy "files admin delete" on storage.objects for delete to authenticated using (bucket_id = 'files' and public.is_admin());
