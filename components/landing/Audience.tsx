"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { AudienceContent } from "@/types/content";
import { useState } from "react";

interface AudienceProps {
  initialContent: AudienceContent;
  isEditing: boolean;
  onSave: (content: AudienceContent) => Promise<void>;
}

export default function AudienceSection({
  initialContent,
  isEditing,
  onSave,
}: AudienceProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <section id="doi-tuong" className="w-full bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-4">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <InlineField
              isEditing={isEditing}
              value={content.title}
              onChange={(v) => setContent((p) => ({ ...p, title: v }))}
            />
          </h2>
          <p className="text-justify-vi text-lg leading-relaxed text-slate-600">
            <InlineField
              isEditing={isEditing}
              as="textarea"
              value={content.subtitle}
              onChange={(v) => setContent((p) => ({ ...p, subtitle: v }))}
            />
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-green)]/30 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[var(--color-brand-green)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-brand-green)]">
                Phù hợp
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                <InlineField
                  isEditing={isEditing}
                  value={item.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      items: p.items.map((it, i) => (i === index ? { ...it, title: v } : it)),
                    }))
                  }
                />
              </h3>
              <p className="text-justify-vi leading-relaxed text-slate-600">
                <InlineField
                  isEditing={isEditing}
                  as="textarea"
                  value={item.description}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      items: p.items.map((it, i) =>
                        i === index ? { ...it, description: v } : it,
                      ),
                    }))
                  }
                />
              </p>
            </div>
          ))}
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
