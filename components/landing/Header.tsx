"use client";

import { RegisterCtaButton } from "@/components/ui/register-cta-button";
import { InlineField } from "@/components/ui/inline-field";
import { MakeItLaunchTitle } from "@/components/ui/make-it-launch-title";
import { NavLinkLuxe } from "@/components/ui/nav-link-luxe";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { sentenceCase } from "@/lib/utils/format-text";
import type { HeaderContent } from "@/types/content";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#loi-ich", label: "LỢI ÍCH" },
  { href: "#lo-trinh", label: "LỘ TRÌNH" },
  { href: "#goi-hoc", label: "GÓI HỌC" },
  { href: "#faq", label: "FAQ" },
];

interface HeaderProps {
  initialContent: HeaderContent;
  isEditing: boolean;
  onSave: (content: HeaderContent) => Promise<void>;
}

export default function HeaderSection({
  initialContent,
  isEditing,
  onSave,
}: HeaderProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-brand-gold)]/15 bg-[var(--color-brand-green)]/95 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-3 md:px-4 md:py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/10x_logo.png"
            alt="10X Masterminds logo"
            width={140}
            height={40}
            className="h-9 w-auto max-w-[120px] object-contain sm:h-10 sm:max-w-[140px]"
          />
          <div className="hidden leading-tight lg:block">
            {isEditing ? (
              <div className="space-y-1">
                <InlineField
                  isEditing
                  value={content.eventName}
                  onChange={(v) => setContent((p) => ({ ...p, eventName: v }))}
                  inputClassName="text-xs font-black uppercase tracking-widest"
                />
                <InlineField
                  isEditing
                  value={content.brandName}
                  onChange={(v) => setContent((p) => ({ ...p, brandName: v }))}
                  inputClassName="text-[10px] uppercase tracking-widest"
                />
              </div>
            ) : (
              <>
                <MakeItLaunchTitle size="header">{content.eventName}</MakeItLaunchTitle>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
                  {content.brandName}
                </p>
              </>
            )}
          </div>
        </Link>
        <nav
          className="nav-pill-track hidden items-center gap-0.5 rounded-full px-1 py-1 md:flex"
          aria-label="Điều hướng chính"
        >
          {NAV_LINKS.map((link) => (
            <NavLinkLuxe key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <RegisterCtaButton
          size="sm"
          variant="primary"
          className="shrink-0 normal-case tracking-normal"
        >
          {isEditing ? (
            <InlineField
              isEditing
              value={content.ctaLabel}
              onChange={(v) => setContent((p) => ({ ...p, ctaLabel: v }))}
              inputClassName="text-center text-sm font-semibold normal-case"
            />
          ) : (
            <span className="text-sm font-semibold">{sentenceCase(content.ctaLabel)}</span>
          )}
        </RegisterCtaButton>
      </div>
      <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
    </header>
  );
}
