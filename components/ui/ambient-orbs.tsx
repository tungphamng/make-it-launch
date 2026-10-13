"use client";

import { cn } from "@/lib/utils/cn";

interface AmbientOrbsProps {
  className?: string;
  variant?: "hero" | "cta" | "dark";
}

export function AmbientOrbs({ className, variant = "hero" }: AmbientOrbsProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "orb orb-float-a absolute -left-16 top-10 h-64 w-64 rounded-full blur-3xl",
          isDark ? "bg-[var(--color-brand-gold)]/20" : "bg-[var(--color-brand-gold)]/25",
        )}
      />
      <div
        className={cn(
          "orb orb-float-b absolute -right-10 top-1/3 h-72 w-72 rounded-full blur-3xl",
          isDark ? "bg-emerald-500/15" : "bg-white/10",
        )}
      />
      <div
        className={cn(
          "orb orb-float-c absolute bottom-0 left-1/3 h-56 w-56 rounded-full blur-3xl",
          isDark ? "bg-[var(--color-brand-gold)]/10" : "bg-black/25",
        )}
      />
      <div className="sparkle-field absolute inset-0 opacity-70" />
    </div>
  );
}
