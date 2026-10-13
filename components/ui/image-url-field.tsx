"use client";

import { InlineField } from "@/components/ui/inline-field";
import { useRef, useState } from "react";

interface ImageUrlFieldProps {
  isEditing: boolean;
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUrlField({ isEditing, value, onChange, label = "Ảnh" }: ImageUrlFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isEditing) return null;

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const json = (await res.json()) as { success: boolean; data?: { url: string }; error?: string };
      if (!res.ok || !json.success || !json.data?.url) {
        throw new Error(json.error ?? "Upload thất bại");
      }
      onChange(json.data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-3 space-y-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-3 text-left text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <InlineField isEditing value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleUpload(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-[var(--color-brand-green)] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          {uploading ? "Đang tải lên…" : "Tải ảnh lên"}
        </button>
        <span className="text-xs text-slate-500">hoặc dán URL / đường dẫn /file.jpg</span>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
