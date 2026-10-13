"use client";

import { InlineField } from "@/components/ui/inline-field";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ShineCard } from "@/components/ui/shine-card";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { BenefitsContent } from "@/types/content";
import { useState } from "react";

interface BenefitsProps {
  initialContent: BenefitsContent;
  isEditing: boolean;
  onSave: (content: BenefitsContent) => Promise<void>;
}

export default function BenefitsSection({
  initialContent,
  isEditing,
  onSave,
}: BenefitsProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const updateItem = (index: number, field: "title" | "description", value: string) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  return (
    <section
      id="loi-ich"
      className="scroll-mt-24 relative w-full border-t border-slate-200/80 bg-white py-16 shadow-[inset_0_8px_24px_rgba(15,23,42,0.04)] md:scroll-mt-28 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-gold)]/40 to-transparent"
        aria-hidden
      />
      <div className="container relative mx-auto px-5 md:px-4">
        <Reveal className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
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
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.items.map((item, index) => (
            <StaggerItem key={index}>
            <ShineCard
              glow
              className="border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-brand-gold)]/40 hover:shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-green)] text-sm font-bold text-[var(--color-brand-gold)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 font-manrope text-xl font-semibold leading-snug text-slate-900">
                <InlineField
                  isEditing={isEditing}
                  value={item.title}
                  onChange={(v) => updateItem(index, "title", v)}
                />
              </h3>
              <p className="text-justify-vi leading-relaxed text-slate-600">
                <InlineField
                  isEditing={isEditing}
                  as="textarea"
                  value={item.description}
                  onChange={(v) => updateItem(index, "description", v)}
                />
              </p>
            </ShineCard>
            </StaggerItem>
          ))}
        </Stagger>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
