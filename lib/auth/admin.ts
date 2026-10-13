/** Email được phép chỉnh sửa CMS (phân tách bằng dấu phẩy trong env) */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS ?? "tutor10xplus@gmail.com";
  const allowed = raw.split(",").map((e) => e.trim().toLowerCase());
  return allowed.includes(email.toLowerCase());
}
