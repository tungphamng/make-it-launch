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
    <section id="coach" className="w-full bg-slate-50 py-16 md:py-24">
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
          <div className="space-y-4">
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
            <p className="text-lg font-medium text-slate-700">
              <InlineField
                isEditing={isEditing}
                value={content.role}
                onChange={(v) => setContent((p) => ({ ...p, role: v }))}
              />
            </p>
            <p className="text-justify-vi leading-relaxed text-slate-600">
              <InlineField
                isEditing={isEditing}
                as="textarea"
                value={content.description}
                onChange={(v) => setContent((p) => ({ ...p, description: v }))}
              />
            </p>
          </div>
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
