import { isAdminEmail } from "@/lib/auth/admin";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";

export async function getAdminSession(): Promise<{
  isAdmin: boolean;
  email: string | null;
}> {
  if (process.env.ENABLE_INLINE_CMS !== "true") {
    return { isAdmin: false, email: null };
  }

  const supabase = await createSupabaseServerAuthClient();
  if (!supabase) {
    return { isAdmin: false, email: null };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? null;
  return { isAdmin: isAdminEmail(email), email };
}
