"use client";

import KitLeadForm from "@/components/landing/KitLeadForm";
import { AmbientOrbs } from "@/components/ui/ambient-orbs";
import { InlineField } from "@/components/ui/inline-field";
import { Reveal } from "@/components/ui/reveal";
import { SectionSaveBar } from "@/components/ui/section-save-bar";
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
          <p className="text-lg leading-relaxed text-white/85">
            <InlineField
              isEditing={isEditing}
              as="textarea"
              value={content.subtitle}
              onChange={(v) => setContent((p) => ({ ...p, subtitle: v }))}
            />
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="hidden space-y-6 rounded-3xl border border-white/15 bg-black/25 p-8 text-white shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-sm lg:block">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand-gold)]">
              Bạn nhận ngay sau khi đăng ký
            </p>
            <ul className="space-y-4 text-sm leading-relaxed text-white/90">
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-gold)]">✓</span>
                Email xác nhận &amp; link Zoom (trước ngày 17/10)
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-gold)]">✓</span>
                Lời mời tham gia nhóm Zalo cập nhật sự kiện
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-gold)]">✓</span>
                Checklist chuẩn bị trước buổi workshop
              </li>
            </ul>
            <p className="text-xs leading-relaxed text-white/60">
              <InlineField
                isEditing={isEditing}
                as="textarea"
                value={content.trustNote}
                onChange={(v) => setContent((p) => ({ ...p, trustNote: v }))}
              />
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_50px_rgba(212,175,55,0.12)] backdrop-blur-sm md:p-10">
            <KitLeadForm />
            <div className="mt-10">
              <div
                className="overflow-hidden rounded-2xl border border-[var(--color-brand-gold)]/30 bg-gradient-to-br from-[var(--color-brand-green)] via-[var(--color-brand-green-dark)] to-[#0a1409] p-1 shadow-[0_12px_40px_rgba(31,61,30,0.35)]"
              >
                <div className="rounded-[calc(1rem-2px)] bg-[var(--color-brand-green)]/95 px-5 py-6 md:px-7 md:py-8">
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
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70 md:text-sm">
                      <InlineField
                        isEditing={isEditing}
                        as="textarea"
                        value={content.paymentIntro}
                        onChange={(v) => setContent((p) => ({ ...p, paymentIntro: v }))}
                      />
                    </p>
                  </div>

                  <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-6">
                    <div className="flex shrink-0 flex-col items-center">
                      <div
                        className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-2 ring-[var(--color-brand-gold)]/50"
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
                        <p className="mt-2 w-full text-center text-xs text-white/40">
                          Ảnh:{" "}
                          <InlineField
                            isEditing={isEditing}
                            value={content.qrCodeImage}
                            onChange={(v) => setContent((p) => ({ ...p, qrCodeImage: v }))}
                          />
                        </p>
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
                    className="mt-6 flex gap-3 rounded-xl border border-[var(--color-brand-gold)]/25 bg-[var(--color-brand-gold)]/10 px-4 py-3.5 text-sm leading-relaxed text-white/90"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-gold)]/25 text-xs text-[var(--color-brand-gold)]"
                      aria-hidden
                    >
                      i
                    </span>
                    <p className="text-left">
                      <InlineField
                        isEditing={isEditing}
                        as="textarea"
                        value={content.paymentNote}
                        onChange={(v) => setContent((p) => ({ ...p, paymentNote: v }))}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500 lg:hidden">
              {content.trustNote}
            </p>
          </div>
        </Reveal>
        <SectionSaveBar isEditing={isEditing} loading={loading} onSave={handleSave} />
      </div>
    </section>
  );
}
