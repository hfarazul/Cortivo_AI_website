import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      <body className={`${figtree.variable} font-sans antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
