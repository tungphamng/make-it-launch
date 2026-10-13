import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-nav",
  subsets: ["vietnamese"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "MAKE IT LAUNCH | 10X Masterminds",
    template: "%s | 10X Masterminds",
  },
  description:
    "Đăng ký MAKE IT LAUNCH — workshop webinar 10X Masterminds & The New Rich Vietnam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${beVietnamPro.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${plusJakarta.className} min-h-full flex flex-col font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
