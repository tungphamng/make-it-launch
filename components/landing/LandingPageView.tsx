import LandingPageShell from "@/components/landing/LandingPageShell";
import { loadLandingPage } from "@/lib/landing-page";
import { Suspense } from "react";

function LandingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-green)] text-white/80">
      Đang tải…
    </div>
  );
}

async function LandingPageInner({
  searchParams,
  cmsReturnPath,
}: {
  searchParams: Promise<{ cms?: string }>;
  cmsReturnPath: string;
}) {
  const { content, isEditing, adminEmail } = await loadLandingPage(
    searchParams,
    cmsReturnPath,
  );

  return (
    <LandingPageShell
      initialContent={content}
      isEditing={isEditing}
      adminEmail={adminEmail}
    />
  );
}

export function LandingPageView({
  searchParams,
  cmsReturnPath,
}: {
  searchParams: Promise<{ cms?: string }>;
  cmsReturnPath: string;
}) {
  return (
    <Suspense fallback={<LandingFallback />}>
      <LandingPageInner searchParams={searchParams} cmsReturnPath={cmsReturnPath} />
    </Suspense>
  );
}
