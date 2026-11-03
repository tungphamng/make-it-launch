-- Keep-alive Supabase (chạy trên SQL Editor)
-- Schema phải trùng SUPABASE_DB_SCHEMA trên Vercel (mặc định app: make_it_launch)
-- Sau khi chạy script này, KHÔNG cần SUPABASE_DB_URL — cron chỉ upsert qua API.

create schema if not exists make_it_launch;

create table if not exists make_it_launch.keep_alive_log (
  id text primary key,
  pinged_at timestamp with time zone not null default timezone('utc'::text, now())
);

comment on table make_it_launch.keep_alive_log is
  'Ping định kỳ từ /api/cron/keep-alive để tránh pause project Supabase Free';

alter table make_it_launch.keep_alive_log enable row level security;

-- Không tạo policy public: chỉ service_role (API cron) ghi/đọc
grant usage on schema make_it_launch to service_role;
grant all on table make_it_launch.keep_alive_log to service_role;

-- Dòng mặc định (cron sẽ upsert id = ping)
insert into make_it_launch.keep_alive_log (id, pinged_at)
values ('ping', timezone('utc'::text, now()))
on conflict (id) do nothing;
