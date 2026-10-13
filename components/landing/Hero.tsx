"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { AmbientOrbs } from "@/components/ui/ambient-orbs";
import { RegisterCtaButton } from "@/components/ui/register-cta-button";
import { SectionScrollButton } from "@/components/ui/section-scroll-button";
import { CTA_BENEFITS_HREF } from "@/lib/constants";
import type { HeroContent } from "@/types/content";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface HeroProps {
  initialContent: HeroContent;
  isEditing: boolean;
  onSave: (content: HeroContent) => Promise<void>;
}

export default function HeroSection({ initialContent, isEditing, onSave }: HeroProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const updateBullet = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      trustBullets: prev.trustBullets.map((b, i) => (i === index ? value : b)),
    }));
  };

  return (
    <section
      id="hero"
      className="bg-mesh-animated relative w-full overflow-hidden pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24"
    >
      <AmbientOrbs variant="hero" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.2),_transparent_55%)]" />

      <div className="container relative mx-auto px-5 md:px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            className="space-y-4 text-white"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex max-w-full rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-xs sm:tracking-[0.14em]"
            >
              <InlineField
                isEditing={isEditing}
                value={content.badgeText}
                onChange={(v) => setContent((p) => ({ ...p, badgeText: v }))}
              />
            </span>

            {isEditing ? (
              <div className="space-y-2">
                <InlineField
                  isEditing
                  as="textarea"
                  value={content.headline}
                  onChange={(v) => setContent((p) => ({ ...p, headline: v }))}
                  inputClassName="text-2xl font-bold"
                />
                <InlineField
                  isEditing
                  as="textarea"
                  value={content.headlineAccent}
                  onChange={(v) => setContent((p) => ({ ...p, headlineAccent: v }))}
                  inputClassName="text-2xl font-bold text-[var(--color-brand-gold)]"
                />
                <InlineField
                  isEditing
                  as="textarea"
                  value={content.headlineSuffix}
                  onChange={(v) => setContent((p) => ({ ...p, headlineSuffix: v }))}
                  inputClassName="text-2xl font-bold"
                />
              </div>
            ) : (
              <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl md:leading-[1.12]">
                {content.headline}{" "}
                <span className="text-[var(--color-brand-gold)]">{content.headlineAccent}</span>{" "}
                {content.headlineSuffix}
              </h1>
            )}

            {(isEditing || content.subheadline.trim()) &&
              (isEditing ? (
                <InlineField
                  isEditing
                  as="textarea"
                  value={content.subheadline}
                  onChange={(v) => setContent((p) => ({ ...p, subheadline: v }))}
                  inputClassName="text-base leading-relaxed"
                />
              ) : (
                <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                  {content.subheadline}
                </p>
              ))}

            <ul className="space-y-2">
              {content.trustBullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex gap-2.5 text-sm leading-snug text-white/90 sm:text-[0.9375rem]"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-gold)] text-xs font-bold text-slate-950"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <InlineField
                    isEditing={isEditing}
                    as="textarea"
                    value={bullet}
                    onChange={(v) => updateBullet(index, v)}
                  />
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pb-4 pt-1 md:flex-row md:items-center md:pb-6">
              <RegisterCtaButton size="lg" variant="primary" className="w-full md:w-auto">
                {content.ctaPrimary}
              </RegisterCtaButton>
              <SectionScrollButton
                href={CTA_BENEFITS_HREF}
                size="lg"
                variant="outline-light"
                className="w-full md:w-auto"
              >
                {content.ctaSecondary}
              </SectionScrollButton>
            </div>

            <p className="text-sm text-white/70">
              <InlineField
                isEditing={isEditing}
                value={content.urgencyText}
                onChange={(v) => setContent((p) => ({ ...p, urgencyText: v }))}
              />
            </p>

            <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <p className="text-2xl font-extrabold text-[var(--color-brand-gold)] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/75 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="float-badge absolute -right-4 -top-4 z-10 rounded-2xl border border-[var(--color-brand-gold)]/60 bg-black/80 px-4 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(212,175,55,0.35)] backdrop-blur sm:-right-6">
              Live cùng Coach Thảo Trần
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-[var(--color-brand-gold)]/30 shadow-[0_25px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(212,175,55,0.15)]">
              <Image
                src={content.portraitImage}
                alt="Coach Thảo Trần — MAKE IT LAUNCH workshop"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 440px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-green-dark)]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-lg font-bold text-white">Mrs. Thảo Trần</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-gold)]">
                  MAKE IT LAUNCH
                </p>
                <p className="text-xs text-white/75">10X Masterminds</p>
              </div>
            </div>
          </motion.div>
        </div>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
