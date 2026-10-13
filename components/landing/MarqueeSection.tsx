"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { MarqueeContent } from "@/types/content";
import { useState } from "react";

const SEPARATOR = "✦";

interface MarqueeSectionProps {
  initialContent: MarqueeContent;
  isEditing: boolean;
  onSave: (content: MarqueeContent) => Promise<void>;
}

function MarqueeRow({
  phrases,
  isEditing,
  onChangePhrase,
}: {
  phrases: string[];
  isEditing: boolean;
  onChangePhrase: (index: number, value: string) => void;
}) {
  return (
    <div className="marquee-track flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {phrases.map((phrase, index) => (
        <span
          key={`${index}-${phrase}`}
          className="inline-flex shrink-0 items-center gap-8 md:gap-12"
        >
          <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] md:text-sm md:tracking-[0.18em]">
            {isEditing ? (
              <InlineField
                isEditing
                value={phrase}
                onChange={(v) => onChangePhrase(index, v)}
                inputClassName="text-xs font-bold uppercase md:text-sm min-w-[12rem]"
              />
            ) : (
              phrase
            )}
          </span>
          <span className="text-[10px] opacity-70 md:text-xs" aria-hidden>
            {SEPARATOR}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeSection({
  initialContent,
  isEditing,
  onSave,
}: MarqueeSectionProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const phrases = content.phrases.filter((p) => isEditing || p.trim());

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const updatePhrase = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      phrases: prev.phrases.map((p, i) => (i === index ? value : p)),
    }));
  };

  if (!isEditing && phrases.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[var(--color-brand-gold)]/40 bg-[var(--color-brand-gold)] py-3 text-[var(--color-brand-green-dark)] md:py-3.5"
      aria-label="Điểm nhấn workshop"
    >
      <div className="flex w-full overflow-hidden">
        <div
          className={
            isEditing
              ? "flex w-full flex-wrap justify-center gap-x-8 gap-y-2 px-4"
              : "marquee-group flex w-max"
          }
        >
          <MarqueeRow phrases={phrases} isEditing={isEditing} onChangePhrase={updatePhrase} />
          {!isEditing && (
            <MarqueeRow phrases={phrases} isEditing={false} onChangePhrase={() => {}} />
          )}
        </div>
      </div>
      <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
    </section>
  );
}
