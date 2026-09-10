-- ============================================================
-- Haven · Supabase 初始化脚本
-- 用法：Supabase 控制台 → 左侧 SQL Editor → New query → 粘贴本文件全部内容 → Run
-- 说明：可重复执行（已做 if exists / on conflict 保护）
-- ============================================================

-- 1) 打卡点数据表
create table if not exists public.spots (
  id          text primary key,
  name        text not null,
  city        text,
  area        text,
  address     text,
  scene_type  text,
  style_tags  text[] default '{}',
  price       text,
  open_time   text,
  indoor      boolean default true,
  lat         double precision,
  lng         double precision,
  palette     text[] default '{}',
  emoji       text,
  photo_desc  text,
  tips        text,
  images      text[] default '{}',
  upload_user text,
  device_id   text,
  status      text default 'pending',   -- pending / approved / rejected / removed
  notice      text default '',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index if not exists spots_status_idx on public.spots (status);
create index if not exists spots_created_idx on public.spots (created_at desc);

-- 2) 行级安全（RLS）
alter table public.spots enable row level security;

drop policy if exists "spots_read"   on public.spots;
drop policy if exists "spots_insert" on public.spots;
drop policy if exists "spots_update" on public.spots;
drop policy if exists "spots_delete" on public.spots;

-- 所有人可读（首页/地图/详情需要）
create policy "spots_read"   on public.spots for select using (true);
-- 所有人可投稿
create policy "spots_insert" on public.spots for insert with check (true);
-- 编辑/删除：原型阶段先开放，由客户端用 device_id 限制「只能改自己那条」，
-- 审核台再用管理员密码保护。正式上线前建议换成 Supabase Auth + 更严格的策略。
create policy "spots_update" on public.spots for update using (true) with check (true);
create policy "spots_delete" on public.spots for delete using (true);

-- 3) 图片存储桶（公开读，可上传）
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

drop policy if exists "photos_read"   on storage.objects;
drop policy if exists "photos_insert" on storage.objects;
drop policy if exists "photos_delete" on storage.objects;

create policy "photos_read"   on storage.objects for select using (bucket_id = 'photos');
create policy "photos_insert" on storage.objects for insert with check (bucket_id = 'photos');
create policy "photos_delete" on storage.objects for delete using (bucket_id = 'photos');

-- 完成。接下来把 Project URL 和 anon public key 给 Codex，
-- 会把 app.js 的数据层从 localStorage 换成 Supabase 读写，并支持把本地已有投稿一键同步上云。
