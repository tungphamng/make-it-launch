import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerAuthClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
  }
}
