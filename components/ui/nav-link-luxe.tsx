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
      <span
        className={cn(
          "nav-link-luxe-text relative z-[1] font-nav text-[15px] font-medium tracking-normal [word-spacing:0.12em]",
          "text-white/80 transition-colors duration-300 group-hover:text-white",
        )}
      >
        {label}
      </span>
      <span className="nav-link-luxe-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}
