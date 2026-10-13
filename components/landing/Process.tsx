"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { ProcessContent } from "@/types/content";
import { useState } from "react";

interface ProcessProps {
  initialContent: ProcessContent;
  isEditing: boolean;
  onSave: (content: ProcessContent) => Promise<void>;
}

export default function ProcessSection({
  initialContent,
  isEditing,
  onSave,
}: ProcessProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <section id="lo-trinh" className="w-full bg-white py-16 md:py-24">
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
        <div className="mx-auto grid max-w-4xl gap-0 md:gap-6">
          {content.steps.map((step, index) => (
            <div
              key={index}
              className="relative flex gap-6 border-l-2 border-[var(--color-brand-gold)] py-8 pl-8 md:rounded-2xl md:border md:border-slate-100 md:border-l-4 md:border-l-[var(--color-brand-gold)] md:bg-slate-50 md:p-8 md:pl-10"
            >
              <span className="absolute -left-[1.15rem] top-8 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand-green)] text-sm font-bold text-[var(--color-brand-gold)] md:static md:h-12 md:w-12 md:shrink-0 md:text-base">
                {step.step}
              </span>
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  <InlineField
                    isEditing={isEditing}
                    value={step.title}
                    onChange={(v) =>
                      setContent((p) => ({
                        ...p,
                        steps: p.steps.map((s, i) => (i === index ? { ...s, title: v } : s)),
                      }))
                    }
                  />
                </h3>
                <p className="text-justify-vi leading-relaxed text-slate-600">
                  <InlineField
                    isEditing={isEditing}
                    as="textarea"
                    value={step.description}
                    onChange={(v) =>
                      setContent((p) => ({
                        ...p,
                        steps: p.steps.map((s, i) =>
                          i === index ? { ...s, description: v } : s,
                        ),
                      }))
                    }
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
