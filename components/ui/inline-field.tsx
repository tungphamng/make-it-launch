"use client";

import { cn } from "@/lib/utils/cn";

interface InlineFieldProps {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  as?: "input" | "textarea";
  className?: string;
  inputClassName?: string;
}

export function InlineField({
  isEditing,
  value,
  onChange,
  as = "input",
  className,
  inputClassName,
}: InlineFieldProps) {
  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  const shared =
    "w-full border border-dashed border-slate-300 bg-white p-2 rounded-lg text-inherit focus:outline-none focus:border-[var(--color-brand-gold)]";

  if (as === "textarea") {
    return (
      <textarea
        className={cn(shared, inputClassName)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <input
      className={cn(shared, inputClassName)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
