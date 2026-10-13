"use client";

import { InlineField } from "@/components/ui/inline-field";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
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
    <footer className="w-full border-t border-white/10 bg-black py-12 text-white">
      <div className="container mx-auto flex flex-col items-center gap-6 px-5 text-center md:px-4 md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <Image
            src="/10x_logo.png"
            alt="10X Masterminds"
            width={160}
            height={48}
            className="h-12 w-auto max-w-[160px] object-contain"
          />
          <p className="text-sm text-white/70">
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
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
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
