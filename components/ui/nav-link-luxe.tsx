"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface NavLinkLuxeProps {
  href: string;
  label: string;
}

export function NavLinkLuxe({ href, label }: NavLinkLuxeProps) {
  return (
    <Link href={href} className={cn("nav-link-luxe group relative px-4 py-2")}>
      <span className="nav-link-luxe-text relative z-[1] text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/90 transition-all duration-300 group-hover:text-[var(--color-brand-gold)] sm:text-xs sm:tracking-[0.26em]">
        {label}
      </span>
      <span className="nav-link-luxe-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}
