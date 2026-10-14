import { LandingPageView } from "@/components/landing/LandingPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test | MAKE IT LAUNCH",
  robots: { index: false, follow: false },
};

export default function TestLandingPage({
  searchParams,
}: {
  searchParams: Promise<{ cms?: string }>;
}) {
  return <LandingPageView searchParams={searchParams} cmsReturnPath="/test" />;
}
