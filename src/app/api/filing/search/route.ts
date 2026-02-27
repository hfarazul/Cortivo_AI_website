import { NextRequest, NextResponse } from "next/server";

interface CompanyResult {
  name: string;
  symbol: string;
  exchange: string;
  annualReportUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Search query must be at least 2 characters" },
        { status: 400 }
      );
    }

    const results: CompanyResult[] = [];

    // Try NSE India search
    try {
      const nseResponse = await fetch(
        `https://www.nseindia.com/api/search/autocomplete?q=${encodeURIComponent(query)}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
          },
        }
      );

      if (nseResponse.ok) {
        const nseData = await nseResponse.json();
        if (nseData.symbols && Array.isArray(nseData.symbols)) {
          for (const item of nseData.symbols.slice(0, 10)) {
            results.push({
              name: item.symbol_info || item.company_name || item.symbol,
              symbol: item.symbol,
              exchange: "NSE",
              annualReportUrl: `https://www.nseindia.com/companies-listing/corporate-filings-annual-reports`,
            });
          }
        }
      }
    } catch {
      // NSE API may be unavailable — fall through to fallback
    }

    // Fallback: well-known Indian companies for demo
    if (results.length === 0) {
      const knownCompanies: CompanyResult[] = [
        { name: "Reliance Industries Limited", symbol: "RELIANCE", exchange: "NSE/BSE" },
        { name: "Tata Consultancy Services", symbol: "TCS", exchange: "NSE/BSE" },
        { name: "HDFC Bank Limited", symbol: "HDFCBANK", exchange: "NSE/BSE" },
        { name: "Infosys Limited", symbol: "INFY", exchange: "NSE/BSE" },
        { name: "ICICI Bank Limited", symbol: "ICICIBANK", exchange: "NSE/BSE" },
        { name: "Hindustan Unilever", symbol: "HINDUNILVR", exchange: "NSE/BSE" },
        { name: "Bharti Airtel Limited", symbol: "BHARTIARTL", exchange: "NSE/BSE" },
        { name: "State Bank of India", symbol: "SBIN", exchange: "NSE/BSE" },
        { name: "ITC Limited", symbol: "ITC", exchange: "NSE/BSE" },
        { name: "Kotak Mahindra Bank", symbol: "KOTAKBANK", exchange: "NSE/BSE" },
        { name: "Larsen & Toubro", symbol: "LT", exchange: "NSE/BSE" },
        { name: "Wipro Limited", symbol: "WIPRO", exchange: "NSE/BSE" },
        { name: "Asian Paints Limited", symbol: "ASIANPAINT", exchange: "NSE/BSE" },
        { name: "HCL Technologies", symbol: "HCLTECH", exchange: "NSE/BSE" },
        { name: "Bajaj Finance Limited", symbol: "BAJFINANCE", exchange: "NSE/BSE" },
        { name: "Maruti Suzuki India", symbol: "MARUTI", exchange: "NSE/BSE" },
        { name: "Sun Pharmaceutical Industries", symbol: "SUNPHARMA", exchange: "NSE/BSE" },
        { name: "Titan Company Limited", symbol: "TITAN", exchange: "NSE/BSE" },
        { name: "Adani Enterprises", symbol: "ADANIENT", exchange: "NSE/BSE" },
        { name: "Tata Motors Limited", symbol: "TATAMOTORS", exchange: "NSE/BSE" },
      ];

      const queryLower = query.toLowerCase();
      const filtered = knownCompanies.filter(
        (c) =>
          c.name.toLowerCase().includes(queryLower) ||
          c.symbol.toLowerCase().includes(queryLower)
      );
      results.push(...filtered);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
