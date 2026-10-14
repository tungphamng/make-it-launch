import { createClient } from "@supabase/supabase-js";

/** Postgres schema (phải khai báo trong Supabase → Settings → API → Exposed schemas) */
export const SUPABASE_DB_SCHEMA =
  process.env.SUPABASE_DB_SCHEMA?.trim() || "make_it_launch";

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    db: { schema: SUPABASE_DB_SCHEMA },
  });
}
