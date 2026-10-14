import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_VIEW_URL,
  buildGoogleFormBody,
  parseFbzxFromFormHtml,
  type LeadFormPayload,
} from "@/lib/google-form-lead";
import { NextResponse } from "next/server";

const FORM_FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
};

async function fetchFbzx(): Promise<string | null> {
  const viewRes = await fetch(GOOGLE_FORM_VIEW_URL, {
    headers: FORM_FETCH_HEADERS,
    cache: "no-store",
  });
  if (!viewRes.ok) return null;
  const html = await viewRes.text();
  return parseFbzxFromFormHtml(html);
}

export async function GET() {
  const fbzx = await fetchFbzx();
  if (!fbzx) {
    return NextResponse.json(
      { error: "Không lấy được token form Google." },
      { status: 502 },
    );
  }
  return NextResponse.json({ fbzx });
}

export async function POST(request: Request) {
  let body: LeadFormPayload;
  try {
    body = (await request.json()) as LeadFormPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const participationLevel = body.participationLevel?.trim();
  const member10x = body.member10x?.trim();

  if (!fullName || !email || !phone || !participationLevel || !member10x) {
    return NextResponse.json(
      { error: "Vui lòng điền đầy đủ thông tin." },
      { status: 400 },
    );
  }

  const fbzx = await fetchFbzx();
  if (!fbzx) {
    return NextResponse.json(
      { error: "Không kết nối được Google Form." },
      { status: 502 },
    );
  }

  const params = buildGoogleFormBody(
    { fullName, email, phone, participationLevel, member10x },
    fbzx,
  );

  const submitRes = await fetch(GOOGLE_FORM_ACTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: GOOGLE_FORM_VIEW_URL,
      Origin: "https://docs.google.com",
      ...FORM_FETCH_HEADERS,
    },
    body: params.toString(),
    redirect: "manual",
  });

  const ok =
    submitRes.status === 200 ||
    submitRes.status === 302 ||
    submitRes.status === 303;

  if (!ok) {
    return NextResponse.json(
      {
        error:
          "Google Form từ chối gửi. Kiểm tra form đang mở cho mọi người có link.",
        status: submitRes.status,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
