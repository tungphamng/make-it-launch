import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
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
      className={`${googleSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${googleSans.className} min-h-full flex flex-col font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
