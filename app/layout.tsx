import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DearIdolHeader from "@/components/Header";
import DearIdolFooter from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dear Idol — K-POP Production & Social Rhythm Game",
  description: "나만의 K-POP 아이돌 프로덕션을 운영하며 아이돌을 육성·스타일링·연출하는 차세대 아이돌 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DearIdolHeader />
        {children}
        <DearIdolFooter />
      </body>
    </html>
  );
}
