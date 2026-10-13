"use client";

import { RegisterCtaButton } from "@/components/ui/register-cta-button";
import { InlineField } from "@/components/ui/inline-field";
import { AmbientOrbs } from "@/components/ui/ambient-orbs";
import { Reveal } from "@/components/ui/reveal";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import type { CtaBandContent } from "@/types/content";
import { useState } from "react";

interface CtaBandProps {
  initialContent: CtaBandContent;
  isEditing: boolean;
  onSave: (content: CtaBandContent) => Promise<void>;
  variant?: "green" | "dark";
}

export default function CtaBandSection({
  initialContent,
  isEditing,
  onSave,
  variant = "green",
}: CtaBandProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const isDark = variant === "dark";

  return (
    <section
      className={
        isDark
          ? "relative w-full overflow-hidden bg-black py-14 md:py-16"
          : "bg-mesh-animated relative w-full overflow-hidden py-14 md:py-16"
      }
    >
      {!isDark && <AmbientOrbs variant="cta" />}
      <div className="section-glow-line absolute top-0 left-0 right-0" />
      <div className="container relative mx-auto px-5 md:px-4">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
            <InlineField
              isEditing={isEditing}
              value={content.headline}
              onChange={(v) => setContent((p) => ({ ...p, headline: v }))}
            />
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85">
            <InlineField
              isEditing={isEditing}
              as="textarea"
              value={content.subheadline}
              onChange={(v) => setContent((p) => ({ ...p, subheadline: v }))}
            />
          </p>
          <RegisterCtaButton size="lg" variant="primary">
            <InlineField
              isEditing={isEditing}
              value={content.buttonLabel}
              onChange={(v) => setContent((p) => ({ ...p, buttonLabel: v }))}
            />
          </RegisterCtaButton>
        </Reveal>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
