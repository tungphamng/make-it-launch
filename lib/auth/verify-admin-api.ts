import { isAdminEmail } from "@/lib/auth/admin";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { NextResponse } from "next/server";

export async function requireAdminApi(): Promise<
  { ok: true; email: string } | { ok: false; response: NextResponse }
> {
  if (process.env.ENABLE_INLINE_CMS !== "true") {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: "Inline CMS is disabled" },
        { status: 403 },
      ),
    };
  }

  const supabase = await createSupabaseServerAuthClient();
  if (!supabase) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: "Auth is not configured" },
        { status: 503 },
      ),
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return {
      ok: false,
      response: NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true, email: user!.email! };
}
