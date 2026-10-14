export const GOOGLE_FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdbzbJS7WkzuXKHM93IcUtWleEjMBlWtRQZOYZj_DGtKw_oiQ/viewform";

export const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdbzbJS7WkzuXKHM93IcUtWleEjMBlWtRQZOYZj_DGtKw_oiQ/formResponse";

export const GOOGLE_FORM_ENTRIES = {
  fullName: "entry.891303203",
  phone: "entry.1361733923",
  email: "entry.289192246",
  participationLevel: "entry.2084910154",
  member10x: "entry.2101058856",
} as const;

export const PARTICIPATION_LEVEL_OPTIONS = [
  "Miễn phí",
  "Standard",
  "VIP",
] as const;

export const MEMBER_10X_OPTIONS = ["Có", "Không"] as const;

export const LEAD_FORM_SUCCESS_MESSAGE =
  "🎉 Chúc mừng bạn đã đăng ký thành công!\n\nĐể nhận quà tặng và cập nhật các thông tin quan trọng về sự kiện, vui lòng tham gia nhóm Zalo tại link: http://cani.vn/nhomhoc";

export function parseFbzxFromFormHtml(html: string): string | null {
  const match = html.match(/name="fbzx"\s+value="([^"]+)"/);
  return match?.[1] ?? null;
}

export type LeadFormPayload = {
  fullName: string;
  email: string;
  phone: string;
  participationLevel: string;
  member10x: string;
};

export function buildGoogleFormBody(
  payload: LeadFormPayload,
  fbzx: string,
): URLSearchParams {
  const params = new URLSearchParams();
  params.set(GOOGLE_FORM_ENTRIES.fullName, payload.fullName);
  params.set(GOOGLE_FORM_ENTRIES.email, payload.email);
  params.set(GOOGLE_FORM_ENTRIES.phone, payload.phone);
  params.set(GOOGLE_FORM_ENTRIES.participationLevel, payload.participationLevel);
  params.set(GOOGLE_FORM_ENTRIES.member10x, payload.member10x);
  params.set("fvv", "1");
  params.set("fbzx", fbzx);
  params.set("pageHistory", "0");
  params.set("partialResponse", `[null,null,"${fbzx}"]`);
  params.set("submissionTimestamp", "-1");
  return params;
}
