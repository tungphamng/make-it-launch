"use client";

import { ImageUrlField } from "@/components/ui/image-url-field";
import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { CoachContent } from "@/types/content";
import Image from "next/image";
import { useState } from "react";

interface CoachProps {
  initialContent: CoachContent;
  isEditing: boolean;
  onSave: (content: CoachContent) => Promise<void>;
}

export default function CoachSection({ initialContent, isEditing, onSave }: CoachProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <section
      id="coach"
      className="relative w-full overflow-hidden border-t border-slate-200/80 bg-slate-100 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(31,61,30,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent"
        aria-hidden
      />
      <div className="container relative mx-auto px-5 md:px-4">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <InlineField
              isEditing={isEditing}
              value={content.title}
              onChange={(v) => setContent((p) => ({ ...p, title: v }))}
            />
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src={content.image}
                alt={`${content.name} — ${content.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <ImageUrlField
              isEditing={isEditing}
              label="Ảnh Coach"
              value={content.image}
              onChange={(v) => setContent((p) => ({ ...p, image: v }))}
            />
          </div>
          <div className="space-y-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--color-brand-gold)]">
              MAKE IT LAUNCH
            </p>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
              <InlineField
                isEditing={isEditing}
                value={content.name}
                onChange={(v) => setContent((p) => ({ ...p, name: v }))}
              />
            </h3>
            <div
              className="space-y-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-sm md:px-6 md:py-6"
            >
              <p className="text-justify-vi text-[0.9375rem] font-semibold leading-relaxed text-slate-800 md:text-base">
                <InlineField
                  isEditing={isEditing}
                  as="textarea"
                  className="text-justify-vi font-semibold text-slate-800"
                  value={content.role}
                  onChange={(v) => setContent((p) => ({ ...p, role: v }))}
                />
              </p>
              <div className="h-px bg-gradient-to-r from-[var(--color-brand-gold)]/50 via-slate-200 to-transparent" />
              <InlineField
                isEditing={isEditing}
                as="textarea"
                className="text-justify-vi text-[0.9375rem] leading-[1.85] text-slate-600 md:text-base"
                value={content.description}
                onChange={(v) => setContent((p) => ({ ...p, description: v }))}
              />
            </div>
          </div>
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
