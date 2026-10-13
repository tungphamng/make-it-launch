"use client";

import AudienceSection from "@/components/landing/Audience";
import BenefitsSection from "@/components/landing/Benefits";
import CoachSection from "@/components/landing/Coach";
import CtaBandSection from "@/components/landing/CtaBand";
import FaqSection from "@/components/landing/Faq";
import FooterSection from "@/components/landing/Footer";
import HeaderSection from "@/components/landing/Header";
import HeroSection from "@/components/landing/Hero";
import MarqueeSection from "@/components/landing/MarqueeSection";
import LeadCaptureSection from "@/components/landing/LeadCapture";
import PricingSection from "@/components/landing/Pricing";
import ProblemSection from "@/components/landing/Problem";
import ProcessSection from "@/components/landing/Process";
import SocialProofSection from "@/components/landing/SocialProof";
import SectionDivider from "@/components/landing/SectionDivider";
import { AdminEditBanner } from "@/components/admin/AdminEditBanner";
import { Reveal } from "@/components/ui/reveal";
import type { AllPageContent, SectionId } from "@/types/content";

interface LandingPageShellProps {
  initialContent: AllPageContent;
  isEditing: boolean;
  adminEmail?: string | null;
}

async function saveSection<T>(sectionId: SectionId, content: T): Promise<void> {
  const response = await fetch(`/api/content/${sectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const payload = (await response.json()) as { error?: string };
    throw new Error(payload.error ?? "Không thể lưu nội dung");
  }
}

export default function LandingPageShell({
  initialContent,
  isEditing,
  adminEmail = null,
}: LandingPageShellProps) {
  return (
    <div className="flex min-h-full flex-col">
      {isEditing && <AdminEditBanner email={adminEmail} />}
      <HeaderSection
        initialContent={initialContent.header}
        isEditing={isEditing}
        onSave={(content) => saveSection("header", content)}
      />
      <main className="flex-1">
        <HeroSection
          initialContent={initialContent.hero}
          isEditing={isEditing}
          onSave={(content) => saveSection("hero", content)}
        />
        <MarqueeSection
          initialContent={initialContent.marquee}
          isEditing={isEditing}
          onSave={(content) => saveSection("marquee", content)}
        />
        <SectionDivider />
        <Reveal>
          <ProblemSection
            initialContent={initialContent.problem}
            isEditing={isEditing}
            onSave={(content) => saveSection("problem", content)}
          />
        </Reveal>
        <SectionDivider />
        <BenefitsSection
          initialContent={initialContent.benefits}
          isEditing={isEditing}
          onSave={(content) => saveSection("benefits", content)}
        />
        <Reveal>
          <AudienceSection
            initialContent={initialContent.audience}
            isEditing={isEditing}
            onSave={(content) => saveSection("audience", content)}
          />
        </Reveal>
        <Reveal>
          <ProcessSection
            initialContent={initialContent.process}
            isEditing={isEditing}
            onSave={(content) => saveSection("process", content)}
          />
        </Reveal>
        <Reveal>
          <SocialProofSection
            initialContent={initialContent.socialProof}
            isEditing={isEditing}
            onSave={(content) => saveSection("socialProof", content)}
          />
        </Reveal>
        <CtaBandSection
          initialContent={initialContent.ctaBand}
          isEditing={isEditing}
          onSave={(content) => saveSection("ctaBand", content)}
        />
        <PricingSection
          initialContent={initialContent.pricing}
          isEditing={isEditing}
          onSave={(content) => saveSection("pricing", content)}
        />
        <Reveal>
          <CoachSection
            initialContent={initialContent.coach}
            isEditing={isEditing}
            onSave={(content) => saveSection("coach", content)}
          />
        </Reveal>
        <Reveal>
          <FaqSection
            initialContent={initialContent.faq}
            isEditing={isEditing}
            onSave={(content) => saveSection("faq", content)}
          />
        </Reveal>
        <LeadCaptureSection
          initialContent={initialContent.lead}
          isEditing={isEditing}
          onSave={(content) => saveSection("lead", content)}
        />
      </main>
      <FooterSection
        initialContent={initialContent.footer}
        isEditing={isEditing}
        onSave={(content) => saveSection("footer", content)}
      />
    </div>
  );
}
