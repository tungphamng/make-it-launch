import { getAdminSession } from "@/lib/auth/session";
import { getAllPageContent } from "@/lib/content/fetch-content";
import type { AllPageContent } from "@/types/content";
import { connection } from "next/server";
import { redirect } from "next/navigation";

export async function loadLandingPage(
  searchParams: Promise<{ cms?: string }>,
  cmsReturnPath: string,
): Promise<{
  content: AllPageContent;
  isEditing: boolean;
  adminEmail: string | null;
}> {
  await connection();

  const params = await searchParams;
  if (params.cms === "1") {
    const { isAdmin } = await getAdminSession();
    if (!isAdmin) {
      redirect(`/admin?next=${encodeURIComponent(cmsReturnPath)}`);
    }
  }

  const [content, session] = await Promise.all([getAllPageContent(), getAdminSession()]);

  return {
    content,
    isEditing: session.isAdmin,
    adminEmail: session.email,
  };
}
