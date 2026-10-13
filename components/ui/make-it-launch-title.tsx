import { cn } from "@/lib/utils/cn";

interface MakeItLaunchTitleProps {
  children: string;
  size?: "hero" | "header" | "section";
  className?: string;
}

export function MakeItLaunchTitle({
  children,
  size = "hero",
  className,
}: MakeItLaunchTitleProps) {
  return (
    <span
      className={cn(
        "make-it-launch-title text-gold-shimmer inline-block uppercase",
        size === "hero" &&
          "text-[2.5rem] font-extrabold leading-[0.95] tracking-[0.02em] sm:text-5xl md:text-6xl lg:text-7xl",
        size === "header" &&
          "text-[11px] font-extrabold tracking-[0.28em] sm:text-xs sm:tracking-[0.32em]",
        size === "section" && "text-2xl font-black tracking-[0.12em] sm:text-3xl",
        className,
      )}
    >
      {children}
    </span>
  );
}
