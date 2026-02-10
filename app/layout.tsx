import React from "react"
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "천원마켓 - 온라인 국민가게",
  description:
    "천원마켓에서 생활용품, 주방, 수납, 문구, 뷰티 등 다양한 상품을 만나보세요.",
};

export const viewport: Viewport = {
  themeColor: "#FFC400",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
