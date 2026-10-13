"use client";

import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface ShineCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function ShineCard({ className, glow, children, ...props }: ShineCardProps) {
  return (
    <div
      className={cn(
        "shine-card group relative overflow-hidden rounded-2xl transition-all duration-500",
        glow && "hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]",
        className,
      )}
      {...props}
    >
      <div className="shine-card-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}
