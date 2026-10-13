"use client";

import { InlineField } from "@/components/ui/inline-field";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { ShineCard } from "@/components/ui/shine-card";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { DEFAULT_PAGE_CONTENT } from "@/lib/content/defaults";
import type { SocialProofContent, TestimonialItem } from "@/types/content";
import { useState } from "react";

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function mergeTestimonial(
  item: Partial<TestimonialItem>,
  index: number,
): TestimonialItem {
  const fallback = DEFAULT_PAGE_CONTENT.socialProof.testimonials[index];
  if (!fallback) {
    return {
      headline: item.headline ?? "",
      highlight: item.highlight ?? "",
      quote: item.quote ?? "",
      insight: item.insight ?? "",
      author: item.author ?? "",
      role: item.role ?? "",
    };
  }
  return {
    headline: item.headline ?? fallback.headline,
    highlight: item.highlight ?? fallback.highlight,
    quote: item.quote ?? fallback.quote,
    insight: item.insight ?? fallback.insight,
    author: item.author ?? fallback.author,
    role: item.role ?? fallback.role,
  };
}

interface SocialProofProps {
  initialContent: SocialProofContent;
  isEditing: boolean;
  onSave: (content: SocialProofContent) => Promise<void>;
}

export default function SocialProofSection({
  initialContent,
  isEditing,
  onSave,
}: SocialProofProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const updateTestimonial = (
    index: number,
    patch: Partial<TestimonialItem>,
  ) => {
    setContent((p) => ({
      ...p,
      testimonials: p.testimonials.map((t, i) =>
        i === index ? { ...mergeTestimonial(t, i), ...patch } : t,
      ),
    }));
  };

  const items = content.testimonials.map((t, i) => mergeTestimonial(t, i));

  return (
    <section id="phan-hoi" className="relative w-full overflow-hidden bg-slate-50 py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(212,175,55,0.12),transparent_55%)]"
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
          <p className="text-justify-vi text-lg leading-relaxed text-slate-600">
            <InlineField
              isEditing={isEditing}
              as="textarea"
              value={content.subtitle}
              onChange={(v) => setContent((p) => ({ ...p, subtitle: v }))}
            />
          </p>
        </div>
        <Stagger className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {items.map((item, index) => (
            <StaggerItem key={index} className="h-full">
              <ShineCard
                glow
                className="flex h-full flex-col overflow-hidden border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-brand-gold)]/35"
              >
                <div className="border-b border-slate-100 bg-gradient-to-br from-[var(--color-brand-green)] to-[var(--color-brand-green-dark)] px-6 py-5 text-white">
                  <span className="inline-flex rounded-full border border-[var(--color-brand-gold)]/50 bg-[var(--color-brand-gold)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-gold)]">
                    <InlineField
                      isEditing={isEditing}
                      value={item.highlight}
                      onChange={(v) => updateTestimonial(index, { highlight: v })}
                      inputClassName="text-[11px] font-bold uppercase"
                    />
                  </span>
                  <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight sm:text-[1.35rem]">
                    <InlineField
                      isEditing={isEditing}
                      value={item.headline}
                      onChange={(v) => updateTestimonial(index, { headline: v })}
                      inputClassName="text-xl font-bold"
                    />
                  </h3>
                </div>

                <div className="flex flex-1 flex-col px-6 py-6">
                  <p className="text-justify-vi flex-1 text-[0.9375rem] leading-relaxed text-slate-700">
                    <InlineField
                      isEditing={isEditing}
                      as="textarea"
                      value={item.quote}
                      onChange={(v) => updateTestimonial(index, { quote: v })}
                    />
                  </p>
                  <div className="mt-5 rounded-xl border border-[var(--color-brand-green)]/15 bg-[var(--color-brand-green)]/5 px-4 py-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-brand-green)]">
                      Bài học
                    </p>
                    <p className="mt-1.5 text-justify-vi text-sm leading-relaxed text-slate-600">
                      <InlineField
                        isEditing={isEditing}
                        as="textarea"
                        value={item.insight}
                        onChange={(v) => updateTestimonial(index, { insight: v })}
                      />
                    </p>
                  </div>
                </div>

                <footer className="flex items-center gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-green)] text-sm font-bold text-[var(--color-brand-gold)] ring-2 ring-white"
                    aria-hidden
                  >
                    {authorInitials(item.author)}
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="truncate font-semibold text-slate-900">
                      <InlineField
                        isEditing={isEditing}
                        value={item.author}
                        onChange={(v) => updateTestimonial(index, { author: v })}
                      />
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      <InlineField
                        isEditing={isEditing}
                        value={item.role}
                        onChange={(v) => updateTestimonial(index, { role: v })}
                      />
                    </p>
                  </div>
                </footer>
              </ShineCard>
            </StaggerItem>
          ))}
        </Stagger>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
