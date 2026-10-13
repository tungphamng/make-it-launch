import { requireAdminApi } from "@/lib/auth/verify-admin-api";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { SectionId } from "@/types/content";
import { NextResponse } from "next/server";

const VALID_SECTIONS: SectionId[] = [
  "header",
  "hero",
  "problem",
  "benefits",
  "audience",
  "process",
  "socialProof",
  "ctaBand",
  "pricing",
  "event",
  "coach",
  "faq",
  "lead",
  "footer",
];

export async function PUT(
  request: Request,
  context: { params: Promise<{ sectionId: string }> },
) {
  try {
    const auth = await requireAdminApi();
    if (!auth.ok) {
      return auth.response;
    }

    const { sectionId } = await context.params;

    if (!VALID_SECTIONS.includes(sectionId as SectionId)) {
      return NextResponse.json(
        { success: false, error: "Invalid section id" },
        { status: 400 },
      );
    }

    const body = (await request.json()) as { content?: unknown };
    if (!body.content || typeof body.content !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing content payload" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Supabase is not configured" },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("page_content").upsert({
      id: sectionId,
      content: body.content,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: { id: sectionId } });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
