import { NextRequest, NextResponse } from "next/server";

interface AnnualReportListing {
  year: string;
  title: string;
  pdfUrl: string;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    const { bseScripCode, symbol } = await request.json();

    if (!bseScripCode && !symbol) {
      return NextResponse.json(
        { error: "BSE scrip code or symbol is required" },
        { status: 400 }
      );
    }

    const reports: AnnualReportListing[] = [];

    // Strategy 1: BSE Annual Report API
    if (bseScripCode) {
      try {
        const bseResponse = await fetch(
          `https://api.bse.co.in/BseIndiaAPI/api/AnnualReport/GetAnnReportData?strType=C&scripcode=${bseScripCode}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "application/json",
              Referer: "https://www.bse.co.in/",
              Origin: "https://www.bse.co.in",
            },
            signal: AbortSignal.timeout(10000),
          }
        );

        if (bseResponse.ok) {
          const bseData = await bseResponse.json();
          if (Array.isArray(bseData) && bseData.length > 0) {
            for (const item of bseData) {
              const pdfUrl = item.FilePath || item.PDFPath || item.AttachmentUrl;
              if (pdfUrl) {
                reports.push({
                  year: item.RptFor || item.Year || "Unknown",
                  title: item.RptType || item.HeadLine || `Annual Report`,
                  pdfUrl: pdfUrl.startsWith("http") ? pdfUrl : `https://www.bse.co.in${pdfUrl}`,
                  source: "BSE",
                });
              }
            }
          }
        }
      } catch {
        // BSE API may be unavailable
      }
    }

    // Strategy 2: BSE Corporate Filing search
    if (reports.length === 0 && bseScripCode) {
      try {
        const currentYear = new Date().getFullYear();
        // Try the BSE corporate filing announcements API
        const announcementResponse = await fetch(
          `https://api.bse.co.in/BseIndiaAPI/api/AnnSubCategoryGetData/GetAnnSubCategoryDataForAll?strCat=Annual%20Report&strType=C&strScrip=${bseScripCode}&strSearch=P&strFromDate=01/01/${currentYear - 3}&strToDate=31/12/${currentYear}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "application/json",
              Referer: "https://www.bse.co.in/",
            },
            signal: AbortSignal.timeout(10000),
          }
        );

        if (announcementResponse.ok) {
          const announcementData = await announcementResponse.json();
          if (announcementData.Table && Array.isArray(announcementData.Table)) {
            for (const item of announcementData.Table) {
              const attachUrl = item.ATTACHMENTNAME;
              if (attachUrl) {
                reports.push({
                  year: item.NEWS_DT ? new Date(item.NEWS_DT).getFullYear().toString() : "Unknown",
                  title: item.HEADLINE || "Annual Report",
                  pdfUrl: attachUrl.startsWith("http") ? attachUrl : `https://www.bse.co.in/xml-data/corpfiling/AttachHis/${attachUrl}`,
                  source: "BSE Filing",
                });
              }
            }
          }
        }
      } catch {
        // Announcement API may be unavailable
      }
    }

    // Strategy 3: NSE corporate filings
    if (reports.length === 0 && symbol) {
      try {
        // First get a session cookie from NSE
        const sessionResponse = await fetch("https://www.nseindia.com/", {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html",
          },
          signal: AbortSignal.timeout(5000),
        });

        const cookies = sessionResponse.headers.get("set-cookie") || "";

        const nseResponse = await fetch(
          `https://www.nseindia.com/api/annual-reports?index=equities&symbol=${encodeURIComponent(symbol)}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "application/json",
              Cookie: cookies,
              Referer: "https://www.nseindia.com/",
            },
            signal: AbortSignal.timeout(10000),
          }
        );

        if (nseResponse.ok) {
          const nseData = await nseResponse.json();
          if (Array.isArray(nseData) && nseData.length > 0) {
            for (const item of nseData) {
              reports.push({
                year: item.year || item.fromYear || "Unknown",
                title: item.companyName ? `${item.companyName} Annual Report` : "Annual Report",
                pdfUrl: item.fileName || item.pdfLink || "",
                source: "NSE",
              });
            }
          }
        }
      } catch {
        // NSE API may be unavailable
      }
    }

    // If no reports found from APIs, provide BSE direct links
    if (reports.length === 0 && bseScripCode) {
      const currentYear = new Date().getFullYear();
      for (let yr = currentYear; yr >= currentYear - 4; yr--) {
        reports.push({
          year: `${yr - 1}-${yr}`,
          title: `Annual Report FY${yr - 1}-${String(yr).slice(-2)}`,
          pdfUrl: `https://www.bse.co.in/corporates/annualreport.aspx?scripcd=${bseScripCode}&Ession=${yr - 1}-${yr}`,
          source: "BSE (manual download)",
        });
      }
    }

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Failed to scrape annual reports" },
      { status: 500 }
    );
  }
}
