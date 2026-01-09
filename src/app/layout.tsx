import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cortivo AI | AI-Native Product Studio",
  description: "We help you build next-generation AI products. Fullstack AI/LLM apps from concept to production.",
  keywords: ["AI", "LLM", "voice agents", "multi-agent systems", "AI products", "generative AI", "LLMOps"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-[#E6E6E6]`}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
