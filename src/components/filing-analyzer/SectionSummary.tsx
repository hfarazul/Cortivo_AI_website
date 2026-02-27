"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, FileText, Loader } from "lucide-react";

interface Section {
  name: string;
  content: string;
  startIndex: number;
}

interface SectionSummaryProps {
  sections: Section[];
  onSectionClick?: (sectionName: string) => void;
}

export default function SectionSummary({ sections, onSectionClick }: SectionSummaryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [summaries, setSummaries] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  const summarizeSection = useCallback(
    async (index: number, section: Section) => {
      if (summaries[index]) return;

      setLoading((prev) => ({ ...prev, [index]: true }));
      let accumulated = "";

      try {
        const response = await fetch("/api/filing/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: section.content,
            analysisType: "summarize",
            sectionName: section.name,
          }),
        });

        if (!response.ok) throw new Error("Analysis failed");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader available");

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
                  setSummaries((prev) => ({ ...prev, [index]: accumulated }));
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      } catch {
        setSummaries((prev) => ({
          ...prev,
          [index]:
            "Failed to generate summary. Please check your API key and try again.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [index]: false }));
      }
    },
    [summaries]
  );

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      summarizeSection(index, sections[index]);
      onSectionClick?.(sections[index].name);
    }
  };

  if (sections.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="w-12 h-12 text-[#2E2E2E] mx-auto mb-4" />
        <p className="text-f-p text-[#757575]">
          Upload an annual report to see section summaries
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <motion.div
          key={`${section.name}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
          className="border border-[rgba(230,230,230,0.1)] hover:border-[rgba(230,230,230,0.2)] transition-colors"
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[0.625rem] text-[#FF4D00] font-semibold uppercase tracking-widest flex-shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-f-p font-semibold truncate">{section.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {loading[index] && (
                <Loader className="w-3 h-3 text-[#FF4D00] animate-spin" />
              )}
              {openIndex === index ? (
                <Minus className="w-4 h-4 text-[#FF4D00]" />
              ) : (
                <Plus className="w-4 h-4 text-[#757575]" />
              )}
            </div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 pb-4 border-t border-[rgba(230,230,230,0.05)]">
                  {summaries[index] ? (
                    <div className="text-f-p text-[#C4C4C4] leading-relaxed whitespace-pre-wrap pt-4 prose-invert">
                      {summaries[index]}
                    </div>
                  ) : loading[index] ? (
                    <div className="flex items-center gap-3 py-4">
                      <div className="w-6 h-6 border-2 border-[#2E2E2E] border-t-[#FF4D00] animate-spin" />
                      <span className="text-f-p text-[#757575]">
                        Analyzing section...
                      </span>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
