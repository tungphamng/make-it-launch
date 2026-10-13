"use client";

import { Button } from "@/components/ui/button";
import { scrollToHash } from "@/lib/scroll-to-section";
import type { ComponentProps } from "react";

type SectionScrollButtonProps = Omit<ComponentProps<typeof Button>, "type" | "onClick"> & {
  href: string;
};

export function SectionScrollButton({ href, ...props }: SectionScrollButtonProps) {
  return (
    <Button
      type="button"
      {...props}
      onClick={(e) => {
        e.preventDefault();
        scrollToHash(href);
      }}
    />
  );
}
