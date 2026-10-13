import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/auth/session";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Đăng nhập CMS",
  robots: { index: false, follow: false },
};

async function AdminPageGate() {
  await connection();
  const { isAdmin } = await getAdminSession();
  if (isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-[var(--color-brand-green)] px-5 py-16">
      <div
        className="w-full max-w-md rounded-3xl border border-white/15 bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
        role="dialog"
        aria-labelledby="admin-login-title"
      >
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-gold)]">
          MAKE IT LAUNCH
        </p>
        <h1 id="admin-login-title" className="mt-2 text-center text-2xl font-bold text-slate-900">
          Đăng nhập CMS
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Chỉnh sửa nội dung và ảnh landing page
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-center text-sm text-slate-500">Đang tải…</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-[var(--color-brand-green)] hover:underline">
            ← Về trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-green)] text-white/80">
          Đang tải…
        </div>
      }
    >
      <AdminPageGate />
    </Suspense>
  );
}
