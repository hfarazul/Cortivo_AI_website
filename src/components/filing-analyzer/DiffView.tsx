"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { GitCompareArrows, FileText, Loader } from "lucide-react";

interface DiffViewProps {
  currentText: string;
  previousText: string;
  currentFileName?: string;
  previousFileName?: string;
}

export default function DiffView({
  currentText,
  previousText,
  currentFileName,
  previousFileName,
}: DiffViewProps) {
  const [diffResult, setDiffResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runDiff = useCallback(async () => {
    if (!currentText || !previousText) return;

    setLoading(true);
    setHasRun(true);
    let accumulated = "";

    try {
      const response = await fetch("/api/filing/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: currentText,
          previousText: previousText,
          analysisType: "diff",
        }),
      });

      if (!response.ok) throw new Error("Diff analysis failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setDiffResult(accumulated);
              }
            } catch {
              // Skip
            }
          }
        }
      }
    } catch {
      setDiffResult(
        "Failed to generate comparison. Please check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [currentText, previousText]);

  if (!currentText || !previousText) {
    return (
      <div className="text-center py-16">
        <GitCompareArrows className="w-12 h-12 text-[#2E2E2E] mx-auto mb-4" />
        <p className="text-f-p text-[#757575] mb-2">
          Upload both current and previous year reports
        </p>
        <p className="text-[0.625rem] text-[#757575]">
          to see year-over-year changes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* File indicators */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#2E2E2E] p-3 flex items-center gap-3">
          <FileText className="w-4 h-4 text-[#757575] flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[0.625rem] text-[#757575] uppercase tracking-widest">
              Previous Year
            </div>
            <div className="text-f-p truncate">
              {previousFileName || "Previous Report"}
            </div>
          </div>
        </div>
        <div className="border border-[#FF4D00] p-3 flex items-center gap-3">
          <FileText className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[0.625rem] text-[#FF4D00] uppercase tracking-widest">
              Current Year
            </div>
            <div className="text-f-p truncate">
              {currentFileName || "Current Report"}
            </div>
          </div>
        </div>
      </div>

      {/* Run button or results */}
      {!hasRun ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={runDiff}
          className="w-full py-4 bg-[#FF4D00] text-black font-semibold text-f-p flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
        >
          <GitCompareArrows className="w-5 h-5" />
          Compare Reports
        </motion.button>
      ) : (
        <div className="border border-[#2E2E2E] p-6">
          {loading && !diffResult && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#2E2E2E] border-t-[#FF4D00] animate-spin" />
              <span className="text-f-p text-[#757575]">
                Comparing reports...
              </span>
            </div>
          )}
          {diffResult && (
            <div className="text-f-p text-[#C4C4C4] leading-relaxed whitespace-pre-wrap">
              {diffResult}
              {loading && (
                <span className="inline-block w-2 h-4 bg-[#FF4D00] ml-1 animate-pulse" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
