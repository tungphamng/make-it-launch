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
        <div className="mx-auto max-w-3xl space-y-3">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">
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
                    />
                  </span>
                  <span
                    className={cn(
                      "text-2xl text-[var(--color-brand-green)] transition-transform duration-300",
                      isOpen && "rotate-45",
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
                    <p className="border-t border-slate-200 px-6 py-5 text-justify-vi leading-relaxed text-slate-600">
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
