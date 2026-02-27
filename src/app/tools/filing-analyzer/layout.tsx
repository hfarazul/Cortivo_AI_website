import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filing Analyzer | Cortivo AI",
  description:
    "AI-powered annual report analyzer for Indian listed companies. Summarize, compare, and chat with BSE/NSE filings.",
};

export default function FilingAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
