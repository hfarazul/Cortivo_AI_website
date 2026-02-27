"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, GitCompareArrows, MessageSquare } from "lucide-react";
import SectionSummary from "./SectionSummary";
import ChatInterface from "./ChatInterface";
import DiffView from "./DiffView";

interface Section {
  name: string;
  content: string;
  startIndex: number;
}

interface AnalysisDashboardProps {
  filingText: string;
  filingFileName?: string;
  filingSections: Section[];
  previousFilingText?: string;
  previousFilingFileName?: string;
}

type Tab = "summary" | "diff" | "chat";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "summary", label: "Summary", icon: <FileSearch className="w-4 h-4" /> },
  { id: "diff", label: "Year-over-Year", icon: <GitCompareArrows className="w-4 h-4" /> },
  { id: "chat", label: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
];

export default function AnalysisDashboard({
  filingText,
  filingFileName,
  filingSections,
  previousFilingText,
  previousFilingFileName,
}: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("summary");

  return (
    <div className="space-y-6">
      {/* Tab Bar */}
      <div className="flex border-b border-[#2E2E2E]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-f-p font-semibold transition-colors relative ${
              activeTab === tab.id
                ? "text-[#FF4D00]"
                : "text-[#757575] hover:text-[#E6E6E6]"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4D00]"
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "summary" && (
            <SectionSummary sections={filingSections} />
          )}
          {activeTab === "diff" && (
            <DiffView
              currentText={filingText}
              previousText={previousFilingText || ""}
              currentFileName={filingFileName}
              previousFileName={previousFilingFileName}
            />
          )}
          {activeTab === "chat" && (
            <ChatInterface filingText={filingText} fileName={filingFileName} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
