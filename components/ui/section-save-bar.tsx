"use client";

import { Button } from "@/components/ui/button";

interface SectionSaveBarProps {
  isEditing: boolean;
  loading: boolean;
  onSave: () => void;
}

export function SectionSaveBar({ isEditing, loading, onSave }: SectionSaveBarProps) {
  if (!isEditing) return null;

  return (
    <div className="mt-8 flex justify-center">
      <Button type="button" onClick={onSave} disabled={loading} size="sm">
        {loading ? "Đang lưu..." : "Lưu thay đổi section"}
      </Button>
    </div>
  );
}
