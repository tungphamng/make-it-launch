/** Viết hoa chữ cái đầu tiên của cả chuỗi (sentence case). */
export function sentenceCase(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toLocaleUpperCase("vi-VN") + trimmed.slice(1);
}
