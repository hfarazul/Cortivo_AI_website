"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import logo from "@/images/logo.png";
import FileUpload from "@/components/filing-analyzer/FileUpload";
import CompanySearch from "@/components/filing-analyzer/CompanySearch";
import AnalysisDashboard from "@/components/filing-analyzer/AnalysisDashboard";

interface FilingData {
  text: string;
  pages: number;
  fileName: string;
  fileSize: number;
  sections: { name: string; startIndex: number; contentLength: number; preview: string }[];
  fullSections: { name: string; startIndex: number; content: string }[];
}

export default function FilingAnalyzerPage() {
  const [currentFiling, setCurrentFiling] = useState<FilingData | null>(null);
  const [previousFiling, setPreviousFiling] = useState<FilingData | null>(null);
  const [fetchingUrl, setFetchingUrl] = useState(false);

  const handleCompanySelect = async (company: { name: string; symbol: string; annualReportUrl?: string }) => {
    if (!company.annualReportUrl) return;

    setFetchingUrl(true);
    try {
      const response = await fetch("/api/filing/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: company.annualReportUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentFiling(data);
      }
    } catch {
      // Error handled silently — user can still upload manually
    } finally {
      setFetchingUrl(false);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Tool Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#2E2E2E]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <Image src={logo} alt="Cortivo AI" width={24} height={24} />
                <span className="logo-text">Cortivo AI</span>
              </Link>
              <span className="text-[#2E2E2E]">/</span>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF4D00]" />
                <span className="text-f-p text-[#E6E6E6] font-semibold">Filing Analyzer</span>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-[#757575] hover:text-[#E6E6E6] transition-colors text-f-p"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <span className="section-label mb-4">Tool</span>
            <h1 className="text-f-h2-mobile lg:text-f-h2 mt-6 mb-4">
              Annual Report{" "}
              <span className="text-[#FF4D00]">Analyzer</span>
            </h1>
            <p className="text-[#757575] text-f-p max-w-2xl">
              Upload annual reports from BSE/NSE listed companies. Get AI-powered
              summaries, year-over-year comparisons, and ask questions about any filing.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Sidebar — Input */}
            <motion.aside
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Company Search */}
              <div className="border border-[#2E2E2E] p-5">
                <CompanySearch onCompanySelect={handleCompanySelect} />
                {fetchingUrl && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-4 h-4 border-2 border-[#2E2E2E] border-t-[#FF4D00] animate-spin" />
                    <span className="text-[0.625rem] text-[#757575]">Fetching report...</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-[#2E2E2E]" />
                <span className="text-[0.625rem] text-[#757575] uppercase tracking-widest">or upload</span>
                <div className="flex-1 border-t border-[#2E2E2E]" />
              </div>

              {/* Current Year Upload */}
              <div className="border border-[#2E2E2E] p-5">
                <FileUpload
                  label="Current Year Report"
                  onFileProcessed={(data) => setCurrentFiling(data)}
                  onClear={() => setCurrentFiling(null)}
                />
              </div>

              {/* Previous Year Upload */}
              <div className="border border-[#2E2E2E] p-5">
                <FileUpload
                  label="Previous Year Report (for comparison)"
                  onFileProcessed={(data) => setPreviousFiling(data)}
                  onClear={() => setPreviousFiling(null)}
                />
              </div>

              {/* Stats */}
              {currentFiling && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-[#2E2E2E] p-5 space-y-3"
                >
                  <div className="text-[0.625rem] text-[#757575] uppercase tracking-widest">
                    Filing Stats
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-f-h3 text-[#FF4D00]">{currentFiling.pages}</div>
                      <div className="text-[0.625rem] text-[#757575]">Pages</div>
                    </div>
                    <div>
                      <div className="text-f-h3 text-[#FF4D00]">{currentFiling.fullSections.length}</div>
                      <div className="text-[0.625rem] text-[#757575]">Sections</div>
                    </div>
                    <div>
                      <div className="text-f-h3 text-[#FF4D00]">
                        {(currentFiling.fileSize / 1024 / 1024).toFixed(1)}
                      </div>
                      <div className="text-[0.625rem] text-[#757575]">MB</div>
                    </div>
                    <div>
                      <div className="text-f-h3 text-[#FF4D00]">
                        {(currentFiling.text.split(/\s+/).length / 1000).toFixed(0)}k
                      </div>
                      <div className="text-[0.625rem] text-[#757575]">Words</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.aside>

            {/* Main — Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="min-w-0"
            >
              {currentFiling ? (
                <AnalysisDashboard
                  filingText={currentFiling.text}
                  filingFileName={currentFiling.fileName}
                  filingSections={currentFiling.fullSections}
                  previousFilingText={previousFiling?.text}
                  previousFilingFileName={previousFiling?.fileName}
                />
              ) : (
                <div className="border border-[#2E2E2E] flex flex-col items-center justify-center py-24">
                  <div className="w-16 h-16 border-2 border-[#2E2E2E] flex items-center justify-center mb-6">
                    <Upload className="w-8 h-8 text-[#2E2E2E]" />
                  </div>
                  <h3 className="text-f-h3-mobile lg:text-f-h3 mb-3">No filing loaded</h3>
                  <p className="text-f-p text-[#757575] text-center max-w-md">
                    Search for a company or upload an annual report PDF to get started.
                    Supports annual reports from any BSE/NSE listed company.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
