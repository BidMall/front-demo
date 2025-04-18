import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BidMall Demo",
  description: "BidMall Demo Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://cdn.portone.io/v2/browser-sdk.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow w-full">
          {children}
        </main>
        <footer className="py-8 bg-gray-100 text-center">
          <Link href="/main" className="text-gray-600 hover:text-gray-900 text-base">
            © 2024 BidMall Corporation
          </Link>
        </footer>
      </body>
    </html>
  );
}
