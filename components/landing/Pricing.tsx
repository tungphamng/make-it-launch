"use client";

import { RegisterCtaButton } from "@/components/ui/register-cta-button";
import { InlineField } from "@/components/ui/inline-field";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { ShineCard } from "@/components/ui/shine-card";
import { cn } from "@/lib/utils/cn";
import type { PricingContent } from "@/types/content";
import { useState } from "react";

interface PricingProps {
  initialContent: PricingContent;
  isEditing: boolean;
  onSave: (content: PricingContent) => Promise<void>;
}

export default function PricingSection({
  initialContent,
  isEditing,
  onSave,
}: PricingProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <section id="goi-hoc" className="w-full bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-4">
        <Reveal className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
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
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.tiers.map((tier, tierIndex) => (
            <StaggerItem key={tier.id}>
            <ShineCard
              glow={tier.highlighted}
              className={cn(
                "flex flex-col overflow-hidden border bg-white shadow-sm transition-all duration-500 hover:scale-[1.03]",
                tier.highlighted
                  ? "border-[var(--color-brand-gold)] shadow-[0_0_35px_rgba(212,175,55,0.2)] ring-2 ring-[var(--color-brand-gold)]/40"
                  : "border-slate-200",
                tier.id === "vip" && "md:-translate-y-2",
              )}
            >
              <div
                className={cn(
                  "px-6 py-4 text-center font-bold uppercase tracking-wider text-white",
                  tier.id === "vip"
                    ? "border-b-2 border-[var(--color-brand-gold)] bg-black"
                    : "bg-black",
                )}
              >
                <InlineField
                  isEditing={isEditing}
                  value={tier.name}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      tiers: p.tiers.map((t, i) =>
                        i === tierIndex ? { ...t, name: v } : t,
                      ),
                    }))
                  }
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-6 text-center text-3xl font-extrabold text-slate-900">
                  <InlineField
                    isEditing={isEditing}
                    value={tier.price}
                    onChange={(v) =>
                      setContent((p) => ({
                        ...p,
                        tiers: p.tiers.map((t, i) =>
                          i === tierIndex ? { ...t, price: v } : t,
                        ),
                      }))
                    }
                  />
                </p>
                <ul className="mb-8 flex-1 space-y-3 text-sm leading-relaxed text-slate-600">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-2">
                      <span className="text-[var(--color-brand-green)]">✓</span>
                      <InlineField
                        isEditing={isEditing}
                        as="textarea"
                        value={feature}
                        onChange={(v) =>
                          setContent((p) => ({
                            ...p,
                            tiers: p.tiers.map((t, i) =>
                              i === tierIndex
                                ? {
                                    ...t,
                                    features: t.features.map((f, fi) =>
                                      fi === featureIndex ? v : f,
                                    ),
                                  }
                                : t,
                            ),
                          }))
                        }
                      />
                    </li>
                  ))}
                </ul>
                <RegisterCtaButton
                  variant={tier.highlighted ? "primary" : "green"}
                  className="mt-auto w-full"
                >
                  Chọn {tier.name}
                </RegisterCtaButton>
              </div>
            </ShineCard>
            </StaggerItem>
          ))}
        </Stagger>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
