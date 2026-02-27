import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

const INDIAN_ANNUAL_REPORT_SECTIONS = [
  "Chairman's Message",
  "Director's Report",
  "Management Discussion and Analysis",
  "Corporate Governance Report",
  "Auditor's Report",
  "Independent Auditor's Report",
  "Balance Sheet",
  "Statement of Profit and Loss",
  "Cash Flow Statement",
  "Notes to Financial Statements",
  "CSR Report",
  "Secretarial Audit Report",
  "Risk Management",
  "Business Responsibility Report",
  "Standalone Financial Statements",
  "Consolidated Financial Statements",
  "Shareholders' Information",
  "Related Party Transactions",
  "Board of Directors",
  "Corporate Overview",
];

function detectSections(text: string): { name: string; startIndex: number; content: string }[] {
  const sections: { name: string; startIndex: number; content: string }[] = [];
  const lines = text.split("\n");
  let currentSection: { name: string; startIndex: number; lines: string[] } | null = null;
  let charIndex = 0;

  for (const line of lines) {
    const trimmed = line.trim().toLowerCase();
    let matchedSection: string | null = null;

    for (const section of INDIAN_ANNUAL_REPORT_SECTIONS) {
      if (
        trimmed.includes(section.toLowerCase()) &&
        trimmed.length < section.length + 30
      ) {
        matchedSection = section;
        break;
      }
    }

    if (matchedSection) {
      if (currentSection) {
        sections.push({
          name: currentSection.name,
          startIndex: currentSection.startIndex,
          content: currentSection.lines.join("\n"),
        });
      }
      currentSection = { name: matchedSection, startIndex: charIndex, lines: [] };
    } else if (currentSection) {
      currentSection.lines.push(line);
    }

    charIndex += line.length + 1;
  }

  if (currentSection) {
    sections.push({
      name: currentSection.name,
      startIndex: currentSection.startIndex,
      content: currentSection.lines.join("\n"),
    });
  }

  if (sections.length === 0) {
    const chunkSize = Math.ceil(text.length / 5);
    const genericNames = [
      "Beginning of Report",
      "Early Sections",
      "Middle Sections",
      "Later Sections",
      "End of Report",
    ];
    for (let i = 0; i < 5; i++) {
      const start = i * chunkSize;
      const end = Math.min((i + 1) * chunkSize, text.length);
      if (start < text.length) {
        sections.push({
          name: genericNames[i],
          startIndex: start,
          content: text.slice(start, end),
        });
      }
    }
  }

  return sections;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch PDF: HTTP ${response.status}` },
        { status: 502 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    await parser.destroy();
    const sections = detectSections(data.text);

    return NextResponse.json({
      text: data.text,
      pages: data.total,
      fileName: url.split("/").pop() || "fetched-report.pdf",
      fileSize: buffer.length,
      sections: sections.map((s) => ({
        name: s.name,
        startIndex: s.startIndex,
        contentLength: s.content.length,
        preview: s.content.slice(0, 200),
      })),
      fullSections: sections,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch and parse PDF from URL" },
      { status: 500 }
    );
  }
}
