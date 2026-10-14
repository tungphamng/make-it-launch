"use client";

import KitLeadForm from "@/components/landing/KitLeadForm";
import { ImageUrlField } from "@/components/ui/image-url-field";
import { AmbientOrbs } from "@/components/ui/ambient-orbs";
import { InlineField } from "@/components/ui/inline-field";
import { Reveal } from "@/components/ui/reveal";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
import { DEFAULT_PAGE_CONTENT } from "@/lib/content/defaults";
import type { LeadContent } from "@/types/content";
import Image from "next/image";
import { useCallback, useState } from "react";

function BankDetailRow({
  label,
  value,
  isEditing,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-white/55">
        {label}
      </span>
      <span className="text-left text-sm font-semibold text-white sm:text-right">
        <InlineField isEditing={isEditing} value={value} onChange={onChange} />
      </span>
    </div>
  );
}

interface LeadCaptureProps {
  initialContent: LeadContent;
  isEditing: boolean;
  onSave: (content: LeadContent) => Promise<void>;
}

export default function LeadCaptureSection({
  initialContent,
  isEditing,
  onSave,
}: LeadCaptureProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content.bankAccountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [content.bankAccountNumber]);

  const handleSave = async () => {
    setLoading(true);
    await onSave(content);
    setLoading(false);
  };

  const formBadge = content.formBadge ?? DEFAULT_PAGE_CONTENT.lead.formBadge;
  const formHeadline = content.formHeadline ?? DEFAULT_PAGE_CONTENT.lead.formHeadline;
  const formHighlight = content.formHighlight ?? DEFAULT_PAGE_CONTENT.lead.formHighlight;

  return (
    <section
      id="dang-ky"
      className="scroll-mt-24 bg-mesh-animated relative w-full overflow-hidden py-16 md:py-24 md:scroll-mt-28"
    >
      <AmbientOrbs variant="hero" />
      <div className="container relative mx-auto px-5 md:px-4">
        <Reveal className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <InlineField
              isEditing={isEditing}
              value={content.title}
              onChange={(v) => setContent((p) => ({ ...p, title: v }))}
            />
          </h2>
          <p className="text-justify-vi text-lg leading-relaxed text-white/85">
            <InlineField
              isEditing={isEditing}
              as="textarea"
              value={content.subtitle}
              onChange={(v) => setContent((p) => ({ ...p, subtitle: v }))}
            />
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <div
              className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-brand-green)]/95 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm"
            >
              <div className="px-5 py-6 md:px-7 md:py-8">
                <div className="mb-6 text-center">
                  <span
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-brand-gold)]/40 bg-[var(--color-brand-gold)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-brand-gold)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-gold)]" aria-hidden />
                    Chuyển khoản
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
                    Thông tin thanh toán
                  </h3>
                </div>

                <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <div
                      className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-white/20"
                    >
                      <Image
                        src={content.qrCodeImage}
                        alt="Mã QR chuyển khoản MB Bank"
                        fill
                        sizes="200px"
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 text-xs font-medium text-white/50">Mã QR MB Bank</p>
                    {isEditing && (
                      <div className="mt-3 w-full">
                        <ImageUrlField
                          isEditing
                          label="Ảnh QR"
                          value={content.qrCodeImage}
                          onChange={(v) => setContent((p) => ({ ...p, qrCodeImage: v }))}
                        />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-1 backdrop-blur-sm md:px-5">
                    <BankDetailRow
                      label="Tên tài khoản"
                      value={content.bankAccountName}
                      isEditing={isEditing}
                      onChange={(v) => setContent((p) => ({ ...p, bankAccountName: v }))}
                    />
                    <div className="flex flex-col gap-1 border-b border-white/10 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-white/55">
                        Số tài khoản
                      </span>
                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        <span className="font-mono text-base font-bold tracking-wider text-[var(--color-brand-gold)]">
                          <InlineField
                            isEditing={isEditing}
                            value={content.bankAccountNumber}
                            onChange={(v) => setContent((p) => ({ ...p, bankAccountNumber: v }))}
                          />
                        </span>
                        {!isEditing && (
                          <button
                            type="button"
                            onClick={copyAccountNumber}
                            className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90 transition hover:bg-white/20"
                          >
                            {copied ? "Đã copy" : "Copy"}
                          </button>
                        )}
                      </div>
                    </div>
                    <BankDetailRow
                      label="Ngân hàng"
                      value={content.bankName}
                      isEditing={isEditing}
                      onChange={(v) => setContent((p) => ({ ...p, bankName: v }))}
                    />
                  </div>
                </div>

                <div
                  className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--color-brand-gold)]/25 bg-[var(--color-brand-gold)]/10 px-4 py-3.5 text-sm leading-relaxed text-white/90"
                >
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-gold)]/25 text-xs font-semibold text-[var(--color-brand-gold)]"
                    aria-hidden
                  >
                    i
                  </span>
                  <p className="min-w-0 flex-1 pt-0.5">
                    <InlineField
                      isEditing={isEditing}
                      as="textarea"
                      className="text-justify-vi"
                      value={content.paymentNote}
                      onChange={(v) => setContent((p) => ({ ...p, paymentNote: v }))}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 rounded-3xl border border-white/20 bg-white/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(212,175,55,0.12)] backdrop-blur-sm md:p-10 lg:order-2">
            <div className="mb-6 text-left">
              <span
                className="inline-flex rounded-full bg-[var(--color-brand-green)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
              >
                <InlineField
                  isEditing={isEditing}
                  value={formBadge}
                  onChange={(v) => setContent((p) => ({ ...p, formBadge: v }))}
                  inputClassName="text-[10px] font-bold uppercase text-white"
                />
              </span>
              <h3 className="mt-3 font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-[1.65rem]">
                <InlineField
                  isEditing={isEditing}
                  value={formHeadline}
                  onChange={(v) => setContent((p) => ({ ...p, formHeadline: v }))}
                  inputClassName="text-2xl font-bold uppercase sm:text-[1.65rem]"
                />
              </h3>
              {(isEditing || formHighlight.trim()) ? (
                <p className="mt-3 flex gap-2.5 text-sm leading-relaxed text-slate-600">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-green)]"
                    aria-hidden
                  />
                  <span className="text-justify-vi flex-1">
                    <InlineField
                      isEditing={isEditing}
                      as="textarea"
                      value={formHighlight}
                      onChange={(v) => setContent((p) => ({ ...p, formHighlight: v }))}
                    />
                  </span>
                </p>
              ) : null}
            </div>
            <KitLeadForm />
          </div>
        </Reveal>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
