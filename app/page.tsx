import LandingPageShell from "@/components/landing/LandingPageShell";
import { getAdminSession } from "@/lib/auth/session";
import { getAllPageContent } from "@/lib/content/fetch-content";
import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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

async function HomePageContent({
  searchParams,
}: {
  searchParams: Promise<{ cms?: string }>;
}) {
  await connection();

  const params = await searchParams;
  if (params.cms === "1") {
    const { isAdmin } = await getAdminSession();
    if (!isAdmin) {
      redirect("/admin?next=/");
    }
  }

  const [content, session] = await Promise.all([getAllPageContent(), getAdminSession()]);

  return (
    <LandingPageShell
      initialContent={content}
      isEditing={session.isAdmin}
      adminEmail={session.email}
    />
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ cms?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-green)] text-white/80">
          Đang tải…
        </div>
      }
    >
      <HomePageContent searchParams={searchParams} />
    </Suspense>
  );
}
