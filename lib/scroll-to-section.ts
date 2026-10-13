const HEADER_OFFSET = 88;

/** Scroll tới section theo hash — hoạt động kể cả khi URL đã có hash đó */
export function scrollToHash(hash: string): void {
  if (!hash.startsWith("#")) return;

  const el = document.getElementById(hash.slice(1));
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
}
