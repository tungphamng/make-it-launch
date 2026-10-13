import { CTA_REGISTER_HREF } from "@/lib/constants";
import { scrollToHash } from "@/lib/scroll-to-section";

/** Scroll tới form đăng ký — hoạt động kể cả khi URL đã là /#dang-ky */
export function scrollToRegisterSection(): void {
  scrollToHash(CTA_REGISTER_HREF);
}
