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
            <p className="text-justify-vi text-lg leading-relaxed text-slate-600">
              <InlineField
                isEditing={isEditing}
                as="textarea"
                value={content.subtitle}
                onChange={(v) => setContent((p) => ({ ...p, subtitle: v }))}
              />
            </p>
          </div>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {content.pains.map((pain, index) => (
              <li key={index}>
                <div
                  className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white py-5 pl-5 pr-5 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-[var(--color-brand-red)]/20 hover:shadow-[0_10px_36px_rgba(196,30,58,0.1)] sm:gap-5 sm:py-6 sm:pl-6 sm:pr-6"
                >
                  <span
                    className="pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-gradient-to-b from-[var(--color-brand-red)] to-[var(--color-brand-red)]/35"
                    aria-hidden
                  />
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-red)]/10 text-base font-bold text-[var(--color-brand-red)] ring-1 ring-[var(--color-brand-red)]/15 transition-colors group-hover:bg-[var(--color-brand-red)]/15"
                    aria-hidden
                  >
                    ✕
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-justify-vi text-[0.9375rem] font-medium leading-relaxed text-slate-700 sm:text-base">
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
                    </p>
                  </div>
                  <span
                    className="hidden shrink-0 pt-1 text-xs font-bold tabular-nums text-slate-300 sm:block"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-justify-vi text-lg font-medium leading-relaxed text-[var(--color-brand-green)]">
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
