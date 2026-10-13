export interface HeaderContent {
  brandName: string;
  eventName: string;
  ctaLabel: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroInfoItem {
  label: string;
  value: string;
}

export interface HeroContent {
  eventName: string;
  headline: string;
  headlineAccent: string;
  headlineSuffix: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badgeText: string;
  urgencyText: string;
  trustBullets: string[];
  eventInfo: HeroInfoItem[];
  stats: HeroStat[];
  portraitImage: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface BenefitsContent {
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export interface MarqueeContent {
  phrases: string[];
}

export interface ProblemContent {
  title: string;
  subtitle: string;
  pains: string[];
  closingLine: string;
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface AudienceContent {
  title: string;
  subtitle: string;
  items: AudienceItem[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface TestimonialItem {
  headline: string;
  highlight: string;
  quote: string;
  insight: string;
  author: string;
  role: string;
}

export interface SocialProofContent {
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface CtaBandContent {
  headline: string;
  subheadline: string;
  buttonLabel: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export interface PricingContent {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

export interface EventContent {
  title: string;
  date: string;
  time: string;
  location: string;
  note: string;
}

export interface LeadContent {
  title: string;
  subtitle: string;
  trustNote: string;
  qrCodeImage: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  paymentIntro: string;
  paymentNote: string;
}

export interface CoachContent {
  title: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface FooterContent {
  copyright: string;
  facebookLabel: string;
  facebookUrl: string;
}

export type SectionId =
  | "header"
  | "hero"
  | "marquee"
  | "problem"
  | "benefits"
  | "audience"
  | "process"
  | "socialProof"
  | "ctaBand"
  | "pricing"
  | "event"
  | "coach"
  | "faq"
  | "lead"
  | "footer";

export interface AllPageContent {
  header: HeaderContent;
  hero: HeroContent;
  marquee: MarqueeContent;
  problem: ProblemContent;
  benefits: BenefitsContent;
  audience: AudienceContent;
  process: ProcessContent;
  socialProof: SocialProofContent;
  ctaBand: CtaBandContent;
  pricing: PricingContent;
  event: EventContent;
  coach: CoachContent;
  faq: FaqContent;
  lead: LeadContent;
  footer: FooterContent;
}

export type SectionContentMap = {
  [K in SectionId]: AllPageContent[K];
};
