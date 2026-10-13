"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminEditBannerProps {
  email: string | null;
}

export function AdminEditBanner({ email }: AdminEditBannerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div
      className="sticky top-0 z-[60] border-b border-[var(--color-brand-gold)]/40 bg-slate-900/95 px-4 py-2.5 text-center text-sm text-white backdrop-blur-md"
      role="status"
    >
      <span className="text-white/80">Chế độ chỉnh sửa</span>
      {email && <span className="mx-2 text-white/50">·</span>}
      {email && <span className="text-[var(--color-brand-gold)]">{email}</span>}
      <span className="mx-2 text-white/50">·</span>
      <span className="text-white/70">Sửa nội dung trên trang, bấm Lưu từng section</span>
      <button
        type="button"
        disabled={loading}
        onClick={() => void logout()}
        className="ml-3 rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold hover:bg-white/10 disabled:opacity-50"
      >
        {loading ? "…" : "Đăng xuất"}
      </button>
    </div>
  );
}
