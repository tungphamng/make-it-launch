import { LandingPageView } from "@/components/landing/LandingPageView";
import { BRAND_LOGO_SRC } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAKE IT LAUNCH | Workshop webinar — 10X Masterminds",
  description:
    "MAKE IT LAUNCH: workshop 2 giờ biến audience thành khách hàng. Thiết kế chiến dịch webinar cùng Coach Thảo Trần.",
  openGraph: {
    title: "MAKE IT LAUNCH — 10X Masterminds",
    description:
      "Thiết kế chiến dịch bán hàng bằng webinar. Thứ 7, 17/10 — Online Zoom.",
    images: [{ url: BRAND_LOGO_SRC, width: 800, height: 800, alt: "10X Masterminds" }],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAKE IT LAUNCH — 10X Masterminds",
    description: "MAKE IT LAUNCH — workshop chuyển đổi follower thành khách hàng.",
    images: [BRAND_LOGO_SRC],
  },
  robots: { index: true, follow: true },
};

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ cms?: string }>;
}) {
  return <LandingPageView searchParams={searchParams} cmsReturnPath="/" />;
}
