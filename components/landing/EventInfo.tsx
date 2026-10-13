"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { EventContent } from "@/types/content";
import { useState } from "react";

interface EventInfoProps {
  initialContent: EventContent;
  isEditing: boolean;
  onSave: (content: EventContent) => Promise<void>;
}

export default function EventInfoSection({
  initialContent,
  isEditing,
  onSave,
}: EventInfoProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const rows: { label: string; key: keyof EventContent }[] = [
    { label: "Ngày", key: "date" },
    { label: "Giờ", key: "time" },
    { label: "Hình thức", key: "location" },
  ];

  return (
    <section id="su-kien" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-4">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <InlineField
              isEditing={isEditing}
              value={content.title}
              onChange={(v) => setContent((p) => ({ ...p, title: v }))}
            />
          </h2>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4">
          {rows.map(({ label, key }) => (
            <div
              key={key}
              className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </span>
              <span className="text-lg font-semibold text-slate-900">
                <InlineField
                  isEditing={isEditing}
                  value={content[key]}
                  onChange={(v) => setContent((p) => ({ ...p, [key]: v }))}
                />
              </span>
            </div>
          ))}
          <p className="rounded-2xl border border-dashed border-[var(--color-brand-green)]/30 bg-[var(--color-brand-green)]/5 px-6 py-4 text-center text-slate-600">
            <InlineField
              isEditing={isEditing}
              as="textarea"
              value={content.note}
              onChange={(v) => setContent((p) => ({ ...p, note: v }))}
            />
          </p>
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
