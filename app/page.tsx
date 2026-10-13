import LandingPageShell from "@/components/landing/LandingPageShell";
import { getAllPageContent, getIsAdminEditing } from "@/lib/content/fetch-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAKE IT LAUNCH | Workshop webinar — 10X Masterminds",
  description:
    "MAKE IT LAUNCH: workshop 2 giờ biến audience thành khách hàng. Thiết kế chiến dịch webinar cùng Coach Thảo Trần.",
  openGraph: {
    title: "MAKE IT LAUNCH — 10X Masterminds",
    description:
      "Thiết kế chiến dịch bán hàng bằng webinar. Thứ 7, 17/10 — Online Zoom.",
    images: [{ url: "/10x_logo.png", width: 800, height: 800, alt: "10X Masterminds" }],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAKE IT LAUNCH — 10X Masterminds",
    description: "MAKE IT LAUNCH — workshop chuyển đổi follower thành khách hàng.",
    images: ["/10x_logo.png"],
  },
  robots: { index: true, follow: true },
};

export default async function Home() {
  const [content, isEditing] = await Promise.all([
    getAllPageContent(),
    getIsAdminEditing(),
  ]);

  return <LandingPageShell initialContent={content} isEditing={isEditing} />;
}
