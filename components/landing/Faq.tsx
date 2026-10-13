"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { cn } from "@/lib/utils/cn";
import type { FaqContent } from "@/types/content";
import { useState } from "react";

interface FaqProps {
  initialContent: FaqContent;
  isEditing: boolean;
  onSave: (content: FaqContent) => Promise<void>;
}

export default function FaqSection({ initialContent, isEditing, onSave }: FaqProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <section id="faq" className="w-full bg-white py-16 md:py-24">
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
        <div className="mx-auto max-w-3xl space-y-4">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300",
                  isOpen
                    ? "border-[var(--color-brand-green)]/35 shadow-[0_10px_32px_rgba(31,61,30,0.1)]"
                    : "border-slate-200 hover:border-[var(--color-brand-green)]/20",
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors sm:px-5 sm:py-5",
                    isOpen
                      ? "bg-gradient-to-r from-[var(--color-brand-green)]/12 via-[var(--color-brand-green)]/5 to-white"
                      : "bg-slate-50 hover:bg-slate-100/90",
                  )}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "w-1 shrink-0 self-stretch rounded-full transition-colors",
                      isOpen
                        ? "bg-[var(--color-brand-gold)]"
                        : "bg-[var(--color-brand-green)]/35",
                    )}
                    aria-hidden
                  />
                  <span className="flex-1 font-heading text-base font-bold leading-snug tracking-tight text-slate-900 sm:text-lg">
                    <InlineField
                      isEditing={isEditing}
                      value={item.question}
                      onChange={(v) =>
                        setContent((p) => ({
                          ...p,
                          items: p.items.map((it, i) =>
                            i === index ? { ...it, question: v } : it,
                          ),
                        }))
                      }
                      inputClassName="text-base font-bold sm:text-lg"
                    />
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl font-bold leading-none transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-[var(--color-brand-gold)]/50 bg-[var(--color-brand-gold)]/15 text-[var(--color-brand-green-dark)]"
                        : "border-[var(--color-brand-green)]/25 bg-white text-[var(--color-brand-green)]",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-200/80 bg-white px-5 py-5 text-justify-vi text-[0.9375rem] leading-relaxed text-slate-600 sm:px-6">
                      <InlineField
                        isEditing={isEditing}
                        as="textarea"
                        value={item.answer}
                        onChange={(v) =>
                          setContent((p) => ({
                            ...p,
                            items: p.items.map((it, i) =>
                              i === index ? { ...it, answer: v } : it,
                            ),
                          }))
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
