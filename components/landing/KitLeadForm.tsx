"use client";

import LeadSuccessModal from "@/components/landing/LeadSuccessModal";
import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_ENTRIES,
  MEMBER_10X_OPTIONS,
  PARTICIPATION_LEVEL_OPTIONS,
} from "@/lib/google-form-lead";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

const FORM_UID = "e92dae33ea";
const IFRAME_NAME = "google-form-response-frame";

export default function KitLeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const pendingIframeSubmit = useRef(false);
  const [fbzx, setFbzx] = useState<string | null>(null);
  const [metaError, setMetaError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completeSuccess = useCallback(() => {
    setSubmitting(false);
    setSuccessModalOpen(true);
    setError(null);
  }, []);

  const handleCloseSuccessModal = useCallback(() => {
    setSuccessModalOpen(false);
    formRef.current?.reset();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMeta() {
      try {
        const res = await fetch("/api/lead", { cache: "no-store" });
        const data = (await res.json()) as { fbzx?: string; error?: string };
        if (cancelled) return;
        if (!res.ok || !data.fbzx) {
          setMetaError(data.error ?? "Không tải được form đăng ký.");
          return;
        }
        setFbzx(data.fbzx);
      } catch {
        if (!cancelled) {
          setMetaError("Không tải được form đăng ký. Vui lòng tải lại trang.");
        }
      }
    }

    loadMeta();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!fbzx) {
      setError(metaError ?? "Form đang tải, vui lòng thử lại sau giây lát.");
      return;
    }

    setSubmitting(true);
    pendingIframeSubmit.current = true;
    formRef.current?.submit();

    window.setTimeout(() => {
      if (!pendingIframeSubmit.current) return;
      pendingIframeSubmit.current = false;
      completeSuccess();
    }, 4000);
  }

  function handleIframeLoad() {
    if (!pendingIframeSubmit.current) return;
    pendingIframeSubmit.current = false;
    completeSuccess();
  }

  return (
    <div className="kit-form-wrapper w-full max-w-xl mx-auto">
      <LeadSuccessModal
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
      />
      <iframe
        name={IFRAME_NAME}
        title="Google Form submission"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden border-0 opacity-0"
        onLoad={handleIframeLoad}
      />
      <form
        ref={formRef}
        className="seva-form formkit-form"
        data-uid={FORM_UID}
        data-format="inline"
        action={GOOGLE_FORM_ACTION}
        method="POST"
        target={IFRAME_NAME}
        onSubmit={handleSubmit}
      >
        {fbzx ? (
          <>
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="fbzx" value={fbzx} />
            <input type="hidden" name="pageHistory" value="0" />
            <input
              type="hidden"
              name="partialResponse"
              value={`[null,null,"${fbzx}"]`}
            />
            <input type="hidden" name="submissionTimestamp" value="-1" />
          </>
        ) : null}

        <div data-style="clean">
          {metaError && !fbzx ? (
            <ul
              className="formkit-alert formkit-alert-error"
              data-element="errors"
              data-group="alert"
            >
              <li>{metaError}</li>
            </ul>
          ) : null}

          {error ? (
            <ul
              className="formkit-alert formkit-alert-error"
              data-element="errors"
              data-group="alert"
            >
              <li>{error}</li>
            </ul>
          ) : null}

          <div
            data-element="fields"
            data-stacked="true"
            className="seva-fields formkit-fields"
          >
              <div className="formkit-field">
                <input
                  className="formkit-input"
                  aria-label="Họ tên"
                  name={GOOGLE_FORM_ENTRIES.fullName}
                  required
                  placeholder="Họ tên"
                  type="text"
                  disabled={submitting || !fbzx}
                />
              </div>
              <div className="formkit-field">
                <input
                  className="formkit-input"
                  name={GOOGLE_FORM_ENTRIES.email}
                  aria-label="Email"
                  placeholder="Email"
                  required
                  type="email"
                  disabled={submitting || !fbzx}
                />
              </div>
              <div className="formkit-field">
                <input
                  className="formkit-input"
                  aria-label="Số điện thoại"
                  name={GOOGLE_FORM_ENTRIES.phone}
                  required
                  placeholder="Số điện thoại"
                  type="tel"
                  disabled={submitting || !fbzx}
                />
              </div>

              <fieldset
                className="kit-form-radio-group border-0 p-0 m-0 min-w-0"
                disabled={submitting || !fbzx}
              >
                <legend className="kit-form-radio-label">
                  Chọn hình thức tham gia
                </legend>
                <div className="kit-form-radio-options kit-form-radio-options--tier">
                  {PARTICIPATION_LEVEL_OPTIONS.map((option) => (
                    <label key={option} className="kit-form-radio-option">
                      <input
                        type="radio"
                        name={GOOGLE_FORM_ENTRIES.participationLevel}
                        value={option}
                        required
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset
                className="kit-form-radio-group border-0 p-0 m-0 min-w-0"
                disabled={submitting || !fbzx}
              >
                <legend className="kit-form-radio-label">
                  Anh/chị có phải thành viên 10X không?
                </legend>
                <div className="kit-form-radio-options kit-form-radio-options--binary">
                  {MEMBER_10X_OPTIONS.map((option) => (
                    <label key={option} className="kit-form-radio-option">
                      <input
                        type="radio"
                        name={GOOGLE_FORM_ENTRIES.member10x}
                        value={option}
                        required
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                data-element="submit"
                className="formkit-submit"
                disabled={submitting || !fbzx}
                data-active={submitting ? "" : undefined}
              >
                <span>
                  {!fbzx
                    ? "Đang tải form…"
                    : submitting
                      ? "Đang gửi…"
                      : "Đăng ký"}
                </span>
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}
