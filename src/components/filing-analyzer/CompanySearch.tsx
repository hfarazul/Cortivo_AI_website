"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, Building2, Loader, Download, ExternalLink, FileText, Link2 } from "lucide-react";

interface CompanyResult {
  name: string;
  symbol: string;
  exchange: string;
  bseScripCode?: string;
}

interface AnnualReportListing {
  year: string;
  title: string;
  pdfUrl: string;
  source: string;
}

interface CompanySearchProps {
  onCompanySelect: (company: CompanyResult) => void;
  onReportFetch: (url: string) => void;
  fetchingReport: boolean;
}

export default function CompanySearch({ onCompanySelect, onReportFetch, fetchingReport }: CompanySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyResult | null>(null);
  const [reports, setReports] = useState<AnnualReportListing[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [directUrl, setDirectUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchCompanies = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/filing/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
        setShowDropdown(true);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReportListings = async (company: CompanyResult) => {
    setLoadingReports(true);
    try {
      const response = await fetch("/api/filing/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bseScripCode: company.bseScripCode,
          symbol: company.symbol,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch {
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setSelectedCompany(null);
    setReports([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchCompanies(value), 300);
  };

  const handleCompanyClick = (company: CompanyResult) => {
    setSelectedCompany(company);
    setShowDropdown(false);
    setQuery(company.name);
    onCompanySelect(company);
    fetchReportListings(company);
  };

  const handleDirectUrlSubmit = () => {
    if (!directUrl.trim()) return;
    onReportFetch(directUrl.trim());
    setDirectUrl("");
    setShowUrlInput(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Search Input */}
      <div>
        <label className="text-f-p text-[#757575] uppercase tracking-widest text-[0.625rem] block mb-2">
          Search Company
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#757575]" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            placeholder="Search by name or symbol (e.g. Reliance, TCS)"
            className="w-full pl-10 pr-10 py-3 bg-transparent border border-[#2E2E2E] text-[#E6E6E6] text-f-p placeholder:text-[#757575] focus:border-[#FF4D00] focus:outline-none transition-colors"
          />
          {loading && (
            <Loader className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF4D00] animate-spin" />
          )}
        </div>

        {/* Dropdown Results */}
        {showDropdown && results.length > 0 && (
          <div className="absolute z-50 w-[calc(100%-2.5rem)] mt-1 bg-[#0A0A0A] border border-[#2E2E2E] max-h-60 overflow-y-auto">
            {results.map((company, idx) => (
              <button
                key={`${company.symbol}-${idx}`}
                onClick={() => handleCompanyClick(company)}
                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[rgba(255,77,0,0.05)] border-b border-[#2E2E2E] last:border-b-0 transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-f-p text-[#E6E6E6] truncate">{company.name}</div>
                  <div className="text-[0.625rem] text-[#757575]">
                    {company.symbol} · {company.exchange}
                    {company.bseScripCode && ` · BSE: ${company.bseScripCode}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Company — Annual Report Listings */}
      {selectedCompany && (
        <div className="border-t border-[#2E2E2E] pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[0.625rem] text-[#757575] uppercase tracking-widest">
              Annual Reports
            </div>
            {loadingReports && (
              <div className="w-3 h-3 border border-[#2E2E2E] border-t-[#FF4D00] animate-spin" />
            )}
          </div>

          {reports.length > 0 ? (
            <div className="space-y-2">
              {reports.map((report, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border border-[#2E2E2E] hover:border-[#FF4D00] transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-f-p text-[#E6E6E6] truncate">{report.year}</div>
                    <div className="text-[0.625rem] text-[#757575] truncate">{report.source}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {report.source === "BSE (manual download)" ? (
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[#757575] hover:text-[#FF4D00] transition-colors"
                        title="Open on BSE"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onReportFetch(report.pdfUrl)}
                        disabled={fetchingReport}
                        className="flex items-center gap-1.5 px-2 py-1 text-[0.625rem] text-[#FF4D00] border border-[#FF4D00] hover:bg-[rgba(255,77,0,0.1)] disabled:opacity-40 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Load
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : !loadingReports ? (
            <div className="text-f-p text-[#757575] text-center py-4 border border-[#2E2E2E]">
              <FileText className="w-5 h-5 mx-auto mb-2 opacity-40" />
              <p className="text-[0.625rem]">No direct downloads found.</p>
              <p className="text-[0.625rem] mt-1">Try uploading a PDF manually or use a direct URL below.</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Direct URL Input */}
      <div className="border-t border-[#2E2E2E] pt-4">
        <button
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-2 text-[0.625rem] text-[#757575] uppercase tracking-widest hover:text-[#FF4D00] transition-colors"
        >
          <Link2 className="w-3 h-3" />
          {showUrlInput ? "Hide" : "Load from URL"}
        </button>

        {showUrlInput && (
          <div className="mt-3 space-y-2">
            <input
              type="url"
              value={directUrl}
              onChange={(e) => setDirectUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDirectUrlSubmit()}
              placeholder="Paste annual report PDF URL..."
              className="w-full px-3 py-2 bg-transparent border border-[#2E2E2E] text-[#E6E6E6] text-f-p placeholder:text-[#757575] focus:border-[#FF4D00] focus:outline-none transition-colors"
            />
            <button
              onClick={handleDirectUrlSubmit}
              disabled={!directUrl.trim() || fetchingReport}
              className="w-full py-2 text-f-p font-semibold bg-[#FF4D00] text-black disabled:opacity-40 transition-opacity"
            >
              {fetchingReport ? "Fetching..." : "Fetch & Analyze"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
