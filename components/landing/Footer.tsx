"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { BRAND_LOGO_SRC } from "@/lib/constants";
import type { FooterContent } from "@/types/content";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  initialContent: FooterContent;
  isEditing: boolean;
  onSave: (content: FooterContent) => Promise<void>;
}

export default function FooterSection({
  initialContent,
  isEditing,
  onSave,
}: FooterProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  return (
    <footer className="w-full border-t border-white/10 bg-black py-5 text-white md:py-6">
      <div className="container mx-auto flex flex-col items-center gap-3 px-5 text-center md:flex-row md:justify-between md:gap-4 md:px-4 md:text-left">
        <div className="flex items-center gap-3">
          <Image
            src={BRAND_LOGO_SRC}
            alt="10X Masterminds"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <p className="text-xs text-white/70 sm:text-sm">
            <InlineField
              isEditing={isEditing}
              value={content.copyright}
              onChange={(v) => setContent((p) => ({ ...p, copyright: v }))}
            />
          </p>
        </div>
        <Link
          href={content.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-white/10 sm:text-sm sm:px-4 sm:py-2"
        >
          <span aria-hidden>f</span>
          <InlineField
            isEditing={isEditing}
            value={content.facebookLabel}
            onChange={(v) => setContent((p) => ({ ...p, facebookLabel: v }))}
          />
        </Link>
      </div>
      <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
    </footer>
  );
}
