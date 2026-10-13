import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline-light" | "green";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "btn-shimmer bg-[var(--color-brand-gold)] text-slate-950 shadow-lg shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:bg-[#e8c547] hover:shadow-[0_12px_40px_rgba(212,175,55,0.45)]",
        variant === "secondary" &&
          "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
        variant === "ghost" && "text-white/90 hover:bg-white/10",
        variant === "outline-light" &&
          "border border-white/20 bg-transparent text-white shadow-none hover:border-white/50 hover:bg-white/5 hover:text-[var(--color-brand-gold)]",
        variant === "green" &&
          "bg-[var(--color-brand-green)] text-white hover:bg-[#2a5230]",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className,
      )}
      {...props}
    />
  );
}
