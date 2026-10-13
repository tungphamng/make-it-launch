"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { ProblemContent } from "@/types/content";
import { useState } from "react";

interface ProblemProps {
  initialContent: ProblemContent;
  isEditing: boolean;
  onSave: (content: ProblemContent) => Promise<void>;
}

export default function ProblemSection({
  initialContent,
  isEditing,
  onSave,
}: ProblemProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <section
      id="van-de"
      className="relative w-full overflow-hidden bg-slate-100 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(31,61,30,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="container relative mx-auto px-5 md:px-4">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              <InlineField
                isEditing={isEditing}
                value={content.title}
                onChange={(v) => setContent((p) => ({ ...p, title: v }))}
              />
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              <InlineField
                isEditing={isEditing}
                as="textarea"
                value={content.subtitle}
                onChange={(v) => setContent((p) => ({ ...p, subtitle: v }))}
              />
            </p>
          </div>
          <ul className="space-y-4">
            {content.pains.map((pain, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-2xl border border-red-100/80 bg-white p-5 text-slate-800 shadow-sm"
              >
                <span className="text-xl text-[var(--color-brand-red)]" aria-hidden>
                  ✕
                </span>
                <InlineField
                  isEditing={isEditing}
                  as="textarea"
                  value={pain}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      pains: p.pains.map((item, i) => (i === index ? v : item)),
                    }))
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-medium leading-relaxed text-[var(--color-brand-green)]">
          <InlineField
            isEditing={isEditing}
            as="textarea"
            value={content.closingLine}
            onChange={(v) => setContent((p) => ({ ...p, closingLine: v }))}
          />
        </p>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
