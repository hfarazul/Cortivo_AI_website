import { NextRequest, NextResponse } from "next/server";

interface CompanyResult {
  name: string;
  symbol: string;
  exchange: string;
  bseScripCode?: string;
}

// BSE scrip codes for Nifty 50 + popular companies
const KNOWN_COMPANIES: CompanyResult[] = [
  { name: "Reliance Industries Limited", symbol: "RELIANCE", exchange: "NSE/BSE", bseScripCode: "500325" },
  { name: "Tata Consultancy Services", symbol: "TCS", exchange: "NSE/BSE", bseScripCode: "532540" },
  { name: "HDFC Bank Limited", symbol: "HDFCBANK", exchange: "NSE/BSE", bseScripCode: "500180" },
  { name: "Infosys Limited", symbol: "INFY", exchange: "NSE/BSE", bseScripCode: "500209" },
  { name: "ICICI Bank Limited", symbol: "ICICIBANK", exchange: "NSE/BSE", bseScripCode: "532174" },
  { name: "Hindustan Unilever", symbol: "HINDUNILVR", exchange: "NSE/BSE", bseScripCode: "500696" },
  { name: "Bharti Airtel Limited", symbol: "BHARTIARTL", exchange: "NSE/BSE", bseScripCode: "532454" },
  { name: "State Bank of India", symbol: "SBIN", exchange: "NSE/BSE", bseScripCode: "500112" },
  { name: "ITC Limited", symbol: "ITC", exchange: "NSE/BSE", bseScripCode: "500875" },
  { name: "Kotak Mahindra Bank", symbol: "KOTAKBANK", exchange: "NSE/BSE", bseScripCode: "500247" },
  { name: "Larsen & Toubro", symbol: "LT", exchange: "NSE/BSE", bseScripCode: "500510" },
  { name: "Wipro Limited", symbol: "WIPRO", exchange: "NSE/BSE", bseScripCode: "507685" },
  { name: "Asian Paints Limited", symbol: "ASIANPAINT", exchange: "NSE/BSE", bseScripCode: "500820" },
  { name: "HCL Technologies", symbol: "HCLTECH", exchange: "NSE/BSE", bseScripCode: "532281" },
  { name: "Bajaj Finance Limited", symbol: "BAJFINANCE", exchange: "NSE/BSE", bseScripCode: "500034" },
  { name: "Maruti Suzuki India", symbol: "MARUTI", exchange: "NSE/BSE", bseScripCode: "532500" },
  { name: "Sun Pharmaceutical Industries", symbol: "SUNPHARMA", exchange: "NSE/BSE", bseScripCode: "524715" },
  { name: "Titan Company Limited", symbol: "TITAN", exchange: "NSE/BSE", bseScripCode: "500114" },
  { name: "Adani Enterprises", symbol: "ADANIENT", exchange: "NSE/BSE", bseScripCode: "512599" },
  { name: "Tata Motors Limited", symbol: "TATAMOTORS", exchange: "NSE/BSE", bseScripCode: "500570" },
  { name: "Axis Bank Limited", symbol: "AXISBANK", exchange: "NSE/BSE", bseScripCode: "532215" },
  { name: "Bajaj Finserv Limited", symbol: "BAJAJFINSV", exchange: "NSE/BSE", bseScripCode: "532978" },
  { name: "Tata Steel Limited", symbol: "TATASTEEL", exchange: "NSE/BSE", bseScripCode: "500470" },
  { name: "NTPC Limited", symbol: "NTPC", exchange: "NSE/BSE", bseScripCode: "532555" },
  { name: "Power Grid Corporation", symbol: "POWERGRID", exchange: "NSE/BSE", bseScripCode: "532898" },
  { name: "Mahindra & Mahindra", symbol: "M&M", exchange: "NSE/BSE", bseScripCode: "500520" },
  { name: "JSW Steel Limited", symbol: "JSWSTEEL", exchange: "NSE/BSE", bseScripCode: "500228" },
  { name: "Nestle India Limited", symbol: "NESTLEIND", exchange: "NSE/BSE", bseScripCode: "500790" },
  { name: "Tech Mahindra Limited", symbol: "TECHM", exchange: "NSE/BSE", bseScripCode: "532755" },
  { name: "UltraTech Cement", symbol: "ULTRACEMCO", exchange: "NSE/BSE", bseScripCode: "532538" },
  { name: "Hindalco Industries", symbol: "HINDALCO", exchange: "NSE/BSE", bseScripCode: "500440" },
  { name: "IndusInd Bank", symbol: "INDUSINDBK", exchange: "NSE/BSE", bseScripCode: "532187" },
  { name: "Divi's Laboratories", symbol: "DIVISLAB", exchange: "NSE/BSE", bseScripCode: "532488" },
  { name: "Cipla Limited", symbol: "CIPLA", exchange: "NSE/BSE", bseScripCode: "500087" },
  { name: "Grasim Industries", symbol: "GRASIM", exchange: "NSE/BSE", bseScripCode: "500300" },
  { name: "Adani Ports & SEZ", symbol: "ADANIPORTS", exchange: "NSE/BSE", bseScripCode: "532921" },
  { name: "Coal India Limited", symbol: "COALINDIA", exchange: "NSE/BSE", bseScripCode: "533278" },
  { name: "ONGC Limited", symbol: "ONGC", exchange: "NSE/BSE", bseScripCode: "500312" },
  { name: "Eicher Motors", symbol: "EICHERMOT", exchange: "NSE/BSE", bseScripCode: "505200" },
  { name: "Hero MotoCorp", symbol: "HEROMOTOCO", exchange: "NSE/BSE", bseScripCode: "500182" },
  { name: "Dr. Reddy's Laboratories", symbol: "DRREDDY", exchange: "NSE/BSE", bseScripCode: "500124" },
  { name: "SBI Life Insurance", symbol: "SBILIFE", exchange: "NSE/BSE", bseScripCode: "540719" },
  { name: "Britannia Industries", symbol: "BRITANNIA", exchange: "NSE/BSE", bseScripCode: "500825" },
  { name: "Apollo Hospitals", symbol: "APOLLOHOSP", exchange: "NSE/BSE", bseScripCode: "508869" },
  { name: "Tata Consumer Products", symbol: "TATACONSUM", exchange: "NSE/BSE", bseScripCode: "500800" },
  { name: "HDFC Life Insurance", symbol: "HDFCLIFE", exchange: "NSE/BSE", bseScripCode: "540777" },
  { name: "Bajaj Auto Limited", symbol: "BAJAJ-AUTO", exchange: "NSE/BSE", bseScripCode: "532977" },
  { name: "Vedanta Limited", symbol: "VEDL", exchange: "NSE/BSE", bseScripCode: "500295" },
  { name: "Zomato Limited", symbol: "ZOMATO", exchange: "NSE/BSE", bseScripCode: "543320" },
  { name: "Tata Power Company", symbol: "TATAPOWER", exchange: "NSE/BSE", bseScripCode: "500400" },
];

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Search query must be at least 2 characters" },
        { status: 400 }
      );
    }

    let results: CompanyResult[] = [];

    // Try BSE search API first
    try {
      const bseResponse = await fetch(
        `https://api.bse.co.in/BseIndiaAPI/api/Suggest/getScripSuggest?scripcode=&searchfield=${encodeURIComponent(query)}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "application/json",
            Referer: "https://www.bse.co.in/",
          },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (bseResponse.ok) {
        const bseData = await bseResponse.json();
        if (Array.isArray(bseData) && bseData.length > 0) {
          for (const item of bseData.slice(0, 15)) {
            results.push({
              name: item.LongName || item.ScripName || item.SCRIP_CD,
              symbol: item.ScripName || item.SCRIP_CD,
              exchange: "BSE",
              bseScripCode: String(item.SCRIP_CD || item.scripcode),
            });
          }
        }
      }
    } catch {
      // BSE API may be unavailable
    }

    // Fallback to local database
    if (results.length === 0) {
      const queryLower = query.toLowerCase();
      results = KNOWN_COMPANIES.filter(
        (c) =>
          c.name.toLowerCase().includes(queryLower) ||
          c.symbol.toLowerCase().includes(queryLower) ||
          (c.bseScripCode && c.bseScripCode.includes(query))
      );
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
