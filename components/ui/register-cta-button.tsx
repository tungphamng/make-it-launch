"use client";

import { Button } from "@/components/ui/button";
import { scrollToRegisterSection } from "@/lib/scroll-to-register";
import type { ComponentProps } from "react";

type RegisterCtaButtonProps = Omit<ComponentProps<typeof Button>, "type" | "onClick">;

export function RegisterCtaButton(props: RegisterCtaButtonProps) {
  return (
    <Button
      type="button"
      {...props}
      onClick={(e) => {
        e.preventDefault();
        scrollToRegisterSection();
      }}
    />
  );
}
