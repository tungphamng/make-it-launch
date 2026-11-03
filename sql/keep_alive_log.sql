-- Tùy chọn: chạy tay nếu không dùng SUPABASE_DB_URL trên Vercel.
-- App cũng tự tạo bảng lần đầu qua /api/cron/keep-alive khi có SUPABASE_DB_URL.

create table if not exists make_it_launch.keep_alive_log (
  id text primary key,
  pinged_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table make_it_launch.keep_alive_log enable row level security;

grant all on table make_it_launch.keep_alive_log to service_role;
