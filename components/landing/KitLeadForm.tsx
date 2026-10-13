"use client";

import { KIT_FORM_MARKUP } from "@/lib/kit-form-markup";
import Script from "next/script";

export default function KitLeadForm() {
  return (
    <div className="kit-form-wrapper w-full max-w-xl mx-auto">
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="lazyOnload" />
      <div dangerouslySetInnerHTML={{ __html: KIT_FORM_MARKUP }} />
    </div>
  );
}
