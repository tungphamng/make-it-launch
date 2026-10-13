import { DEFAULT_PAGE_CONTENT } from "@/lib/content/defaults";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { AllPageContent, SectionId } from "@/types/content";

const SECTION_IDS: SectionId[] = [
  "header",
  "hero",
  "marquee",
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

export async function getAllPageContent(): Promise<AllPageContent> {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return DEFAULT_PAGE_CONTENT;
  }

  const { data, error } = await supabase.from("page_content").select("id, content");

  if (error || !data?.length) {
    return DEFAULT_PAGE_CONTENT;
  }

  const content: AllPageContent = structuredClone(DEFAULT_PAGE_CONTENT);

  for (const row of data) {
    const id = row.id as SectionId;
    if (!SECTION_IDS.includes(id)) continue;
    Object.assign(content[id], row.content as Partial<AllPageContent[typeof id]>);
  }

  return content;
}

/** @deprecated Dùng getAdminSession() từ lib/auth/session */
export async function getIsAdminEditing(): Promise<boolean> {
  const { getAdminSession } = await import("@/lib/auth/session");
  const { isAdmin } = await getAdminSession();
  return isAdmin;
}
