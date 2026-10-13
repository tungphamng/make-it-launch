"use client";

import { InlineField } from "@/components/ui/inline-field";
import type { HeroInfoItem } from "@/types/content";

interface HeroEventInfoBarProps {
  items: HeroInfoItem[];
  isEditing: boolean;
  onChangeItem: (index: number, patch: Partial<HeroInfoItem>) => void;
}

export function HeroEventInfoBar({ items, isEditing, onChangeItem }: HeroEventInfoBarProps) {
  return (
    <div
      className="flex divide-x divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm"
      role="group"
      aria-label="Thông tin sự kiện"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex min-w-0 flex-1 flex-col justify-center px-3 py-4 sm:px-5 md:px-6"
        >
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/55">
            {isEditing ? (
              <InlineField
                isEditing
                value={item.label}
                onChange={(v) => onChangeItem(index, { label: v })}
                inputClassName="text-[10px] uppercase"
              />
            ) : (
              item.label
            )}
          </p>
          <p className="text-sm font-bold leading-snug text-white sm:text-base">
            {isEditing ? (
              <InlineField
                isEditing
                value={item.value}
                onChange={(v) => onChangeItem(index, { value: v })}
                inputClassName="text-sm font-bold sm:text-base"
              />
            ) : (
              <span className="whitespace-normal sm:whitespace-nowrap">{item.value}</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
