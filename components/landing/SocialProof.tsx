"use client";

import { InlineField } from "@/components/ui/inline-field";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { ShineCard } from "@/components/ui/shine-card";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { SocialProofContent } from "@/types/content";
import { useState } from "react";

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

  return (
    <section id="phan-hoi" className="w-full bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-4">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
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
        <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.testimonials.map((item, index) => (
            <StaggerItem key={index}>
            <ShineCard
              glow
              className="flex flex-col border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1"
            >
              <p className="mb-6 flex-1 text-lg leading-relaxed text-slate-700">
                <span className="text-[var(--color-brand-gold)]" aria-hidden>
                  “
                </span>
                <InlineField
                  isEditing={isEditing}
                  as="textarea"
                  value={item.quote}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      testimonials: p.testimonials.map((t, i) =>
                        i === index ? { ...t, quote: v } : t,
                      ),
                    }))
                  }
                />
              </p>
              <footer className="border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900">
                  <InlineField
                    isEditing={isEditing}
                    value={item.author}
                    onChange={(v) =>
                      setContent((p) => ({
                        ...p,
                        testimonials: p.testimonials.map((t, i) =>
                          i === index ? { ...t, author: v } : t,
                        ),
                      }))
                    }
                  />
                </p>
                <p className="text-sm text-slate-500">
                  <InlineField
                    isEditing={isEditing}
                    value={item.role}
                    onChange={(v) =>
                      setContent((p) => ({
                        ...p,
                        testimonials: p.testimonials.map((t, i) =>
                          i === index ? { ...t, role: v } : t,
                        ),
                      }))
                    }
                  />
                </p>
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
