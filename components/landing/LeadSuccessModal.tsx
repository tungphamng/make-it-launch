"use client";

import { LEAD_FORM_SUCCESS_MESSAGE } from "@/lib/google-form-lead";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ZALO_LINK = "http://cani.vn/nhomhoc";

type LeadSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LeadSuccessModal({ open, onClose }: LeadSuccessModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const detail =
    LEAD_FORM_SUCCESS_MESSAGE.split("\n\n").slice(1).join("\n\n") ||
    LEAD_FORM_SUCCESS_MESSAGE;
  const [beforeLink, afterLink] = detail.split(ZALO_LINK);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-success-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Đóng"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/20 bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)] sm:p-8"
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl"
          aria-hidden
        >
          🎉
        </div>
        <h2
          id="lead-success-title"
          className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl"
        >
          Chúc mừng bạn đã đăng ký thành công!
        </h2>
        <p className="mt-4 text-left text-sm leading-relaxed text-slate-600 sm:text-base">
          {beforeLink}
          <a
            href={ZALO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-brand-green)] underline underline-offset-2 hover:opacity-90"
          >
            {ZALO_LINK}
          </a>
          {afterLink ?? ""}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-[#c9a227] via-[#e7c376] to-[#c9a227] px-6 py-3.5 text-base font-bold text-slate-900 shadow-[0_8px_30px_rgba(212,175,55,0.35)] transition hover:brightness-105"
        >
          Đóng
        </button>
      </div>
    </div>,
    document.body,
  );
}
