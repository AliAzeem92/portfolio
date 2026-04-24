import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AosInit from "./components/AosInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"),
  title: "Ali Azeem | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js and MongoDB. Available for new projects.",
  keywords: [
    "Ali Azeem",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ali Azeem" }],
  openGraph: {
    title: "Ali Azeem | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and MongoDB.",
    url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://your-domain.com",
    siteName: "Ali Azeem Portfolio",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/me-bgblur.png`,
        width: 1200,
        height: 630,
        alt: "Ali Azeem - Full Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Azeem | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and MongoDB.",
    images: ["/AliAzeemBanner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AosInit />
        {children}
      </body>
    </html>
  );
}
