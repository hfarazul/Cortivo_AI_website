"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, Building2, Loader } from "lucide-react";

interface CompanyResult {
  name: string;
  symbol: string;
  exchange: string;
  annualReportUrl?: string;
}

interface CompanySearchProps {
  onCompanySelect: (company: CompanyResult) => void;
}

export default function CompanySearch({ onCompanySelect }: CompanySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchCompanies(value), 300);
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
    <div ref={containerRef} className="relative">
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

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#0A0A0A] border border-[#2E2E2E] max-h-60 overflow-y-auto">
          {results.map((company, idx) => (
            <button
              key={`${company.symbol}-${idx}`}
              onClick={() => {
                onCompanySelect(company);
                setShowDropdown(false);
                setQuery(company.name);
              }}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[rgba(255,77,0,0.05)] border-b border-[#2E2E2E] last:border-b-0 transition-colors"
            >
              <Building2 className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-f-p text-[#E6E6E6] truncate">{company.name}</div>
                <div className="text-[0.625rem] text-[#757575]">
                  {company.symbol} · {company.exchange}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
