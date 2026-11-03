import postgres from "postgres";

import { getSupabaseServer, SUPABASE_DB_SCHEMA } from "@/lib/supabase/server";

const KEEP_ALIVE_TABLE = "keep_alive_log";
const KEEP_ALIVE_ROW_ID = "ping";

function assertSafeSchemaName(schema: string): string {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schema)) {
    throw new Error("Invalid Supabase schema name");
  }
  return schema;
}

function getDirectDbUrl(): string | null {
  const url =
    process.env.SUPABASE_DB_URL?.trim() || process.env.DATABASE_URL?.trim();
  return url || null;
}

async function createKeepAliveTableIfMissing(): Promise<void> {
  const dbUrl = getDirectDbUrl();
  if (!dbUrl) {
    throw new Error(
      "Bảng keep_alive_log chưa tồn tại. Thêm biến SUPABASE_DB_URL (Postgres connection string từ Supabase → Project Settings → Database) để app tự tạo bảng lần đầu.",
    );
  }

  const schema = assertSafeSchemaName(SUPABASE_DB_SCHEMA);
  const sql = postgres(dbUrl, { ssl: "require", max: 1 });

  try {
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS "${schema}"."${KEEP_ALIVE_TABLE}" (
        id text PRIMARY KEY,
        pinged_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
      );

      ALTER TABLE "${schema}"."${KEEP_ALIVE_TABLE}" ENABLE ROW LEVEL SECURITY;

      GRANT ALL ON TABLE "${schema}"."${KEEP_ALIVE_TABLE}" TO service_role;
    `);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

function isMissingTableError(message: string, code?: string): boolean {
  if (code === "PGRST205") {
    return true;
  }
  const lower = message.toLowerCase();
  return (
    lower.includes("does not exist") ||
    lower.includes("schema cache") ||
    lower.includes("could not find the table")
  );
}

/** Tạo bảng trên DB chỉ khi chưa có (probe qua PostgREST, DDL qua Postgres URL). */
export async function ensureKeepAliveTable(): Promise<{ created: boolean }> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const probe = await supabase.from(KEEP_ALIVE_TABLE).select("id").limit(1);

  if (!probe.error) {
    return { created: false };
  }

  if (!isMissingTableError(probe.error.message, probe.error.code)) {
    throw new Error(probe.error.message);
  }

  await createKeepAliveTableIfMissing();
  return { created: true };
}

export async function recordKeepAlivePing(): Promise<{
  pingedAt: string;
  tableCreated: boolean;
}> {
  const { created: tableCreated } = await ensureKeepAliveTable();
  const supabase = getSupabaseServer();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const pingedAt = new Date().toISOString();
  const { error } = await supabase.from(KEEP_ALIVE_TABLE).upsert({
    id: KEEP_ALIVE_ROW_ID,
    pinged_at: pingedAt,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { pingedAt, tableCreated };
}

export function verifyCronAuthorization(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return false;
  }
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}
