import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

// Helper: create a minimal but valid PDF file
function createTestPdf(tmpPath: string): string {
  // Use pdf-creator-node approach: a minimal valid PDF with proper xref offsets
  const lines = [
    "%PDF-1.0",
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj",
    "2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj",
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj",
    "4 0 obj<</Length 52>>stream",
    "BT /F1 12 Tf 72 720 Td (Annual Report Test) Tj ET",
    "endstream",
    "endobj",
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj",
  ];

  let content = "";
  const offsets: number[] = [];

  // Write objects tracking byte offsets
  for (const line of lines) {
    if (line.match(/^\d+ \d+ obj/)) {
      offsets.push(content.length);
    }
    content += line + "\n";
  }

  const xrefStart = content.length;
  content += "xref\n";
  content += `0 ${offsets.length + 1}\n`;
  content += "0000000000 65535 f \n";
  for (const offset of offsets) {
    content += String(offset).padStart(10, "0") + " 00000 n \n";
  }
  content += "trailer\n";
  content += `<</Size ${offsets.length + 1}/Root 1 0 R>>\n`;
  content += "startxref\n";
  content += `${xrefStart}\n`;
  content += "%%EOF\n";

  fs.writeFileSync(tmpPath, content);
  return tmpPath;
}

test.describe("Filing Analyzer Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools/filing-analyzer");
  });

  test("renders the page with correct heading and layout", async ({ page }) => {
    await expect(page).toHaveTitle(/Filing Analyzer/);
    await expect(page.locator("h1")).toContainText("Annual Report");
    await expect(page.locator("h1")).toContainText("Analyzer");
    await expect(page.locator(".section-label")).toContainText("Tool");
    await expect(page.getByText("Upload annual reports from BSE/NSE")).toBeVisible();
  });

  test("navbar shows Filing Analyzer breadcrumb and back link", async ({ page }) => {
    await expect(page.getByText("Filing Analyzer").first()).toBeVisible();
    await expect(page.getByText("Back to Home")).toBeVisible();
    await expect(page.getByText("Cortivo AI").first()).toBeVisible();
  });

  test("shows empty state when no filing is uploaded", async ({ page }) => {
    await expect(page.getByText("No filing loaded")).toBeVisible();
    await expect(
      page.getByText("Search for a company or upload an annual report PDF")
    ).toBeVisible();
  });

  test("file upload zone is visible and interactive", async ({ page }) => {
    await expect(page.getByText("Current Year Report")).toBeVisible();
    await expect(page.getByText("Drop PDF here").first()).toBeVisible();
    await expect(page.getByText("Previous Year Report (for comparison)")).toBeVisible();
  });

  test("company search input is visible and functional", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or symbol");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("Reliance");

    await expect(page.getByText("Reliance Industries Limited")).toBeVisible({
      timeout: 5000,
    });
    // Use first() to avoid strict mode violation — symbol appears in multiple places
    await expect(page.getByText("RELIANCE").first()).toBeVisible();
  });

  test("company search shows multiple results", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or symbol");
    await searchInput.fill("Tata");

    await expect(page.getByText("Tata Consultancy Services")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText("Tata Motors Limited")).toBeVisible();
  });

  test("search by ticker symbol works", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or symbol");
    await searchInput.fill("INFY");

    await expect(page.getByText("Infosys Limited")).toBeVisible({
      timeout: 5000,
    });
  });

  test("upload rejects non-PDF files", async ({ page }) => {
    const tmpFile = path.join("/tmp", "test-not-pdf.txt");
    fs.writeFileSync(tmpFile, "This is not a PDF");

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(tmpFile);

    await expect(page.getByText("Only PDF files are accepted")).toBeVisible({
      timeout: 5000,
    });

    fs.unlinkSync(tmpFile);
  });

  test("upload accepts PDF file and shows analysis dashboard", async ({ page }) => {
    const tmpPdf = createTestPdf(path.join("/tmp", "test-annual-report.pdf"));

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(tmpPdf);

    // Wait for processing to complete
    await expect(page.getByText("Filing Stats")).toBeVisible({ timeout: 20000 });

    // Should show stats
    await expect(page.getByText("Pages")).toBeVisible();
    await expect(page.getByText("Sections")).toBeVisible();

    // Analysis tabs should appear
    await expect(page.getByRole("button", { name: /Summary/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Year-over-Year/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Chat/ })).toBeVisible();

    fs.unlinkSync(tmpPdf);
  });

  test("tabs switch correctly after file upload", async ({ page }) => {
    const tmpPdf = createTestPdf(path.join("/tmp", "test-tabs.pdf"));

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(tmpPdf);

    await expect(page.getByText("Filing Stats")).toBeVisible({ timeout: 20000 });

    // Click Chat tab
    await page.getByRole("button", { name: /Chat/ }).click();
    await expect(page.getByText("Ask anything about")).toBeVisible();
    await expect(page.getByText("Suggested Questions")).toBeVisible();

    // Click Year-over-Year tab
    await page.getByRole("button", { name: /Year-over-Year/ }).click();
    await expect(
      page.getByText("Upload both current and previous year reports")
    ).toBeVisible();

    // Click back to Summary tab
    await page.getByRole("button", { name: /Summary/ }).click();

    fs.unlinkSync(tmpPdf);
  });

  test("chat tab shows suggested questions after upload", async ({ page }) => {
    const tmpPdf = createTestPdf(path.join("/tmp", "test-chat.pdf"));

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(tmpPdf);

    await expect(page.getByText("Filing Stats")).toBeVisible({ timeout: 20000 });

    // Switch to chat tab
    await page.getByRole("button", { name: /Chat/ }).click();

    // Check suggested questions
    await expect(
      page.getByText("What is the company's total revenue and net profit?")
    ).toBeVisible();
    await expect(
      page.getByText("What are the key risk factors mentioned?")
    ).toBeVisible();
    await expect(
      page.getByText("Did the auditor raise any qualifications?")
    ).toBeVisible();

    fs.unlinkSync(tmpPdf);
  });

  test("diff tab prompts for two files when only one uploaded", async ({ page }) => {
    const tmpPdf = createTestPdf(path.join("/tmp", "test-diff.pdf"));

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(tmpPdf);

    await expect(page.getByText("Filing Stats")).toBeVisible({ timeout: 20000 });

    // Switch to YoY tab
    await page.getByRole("button", { name: /Year-over-Year/ }).click();

    // Should prompt for both files
    await expect(
      page.getByText("Upload both current and previous year reports")
    ).toBeVisible();

    fs.unlinkSync(tmpPdf);
  });

  test("file upload can be cleared", async ({ page }) => {
    const tmpPdf = createTestPdf(path.join("/tmp", "test-clear.pdf"));

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(tmpPdf);

    // Wait for file to be processed — look for the stats panel
    await expect(page.getByText("Filing Stats")).toBeVisible({ timeout: 20000 });

    // The file name should be shown
    await expect(page.getByText("test-clear.pdf")).toBeVisible();

    // Click the X/clear button next to the file name
    const clearButton = page.locator("button").filter({ has: page.locator(".lucide-x") }).first();
    await clearButton.click();

    // Should show drop zone again
    await expect(page.getByText("Drop PDF here").first()).toBeVisible();

    // Should show empty state in main area
    await expect(page.getByText("No filing loaded")).toBeVisible();

    fs.unlinkSync(tmpPdf);
  });
});

test.describe("Filing Analyzer Navigation", () => {
  test("main site navbar has Filing Analyzer link", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Filing Analyzer")).toBeVisible();
  });

  test("Filing Analyzer link navigates to tool page", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Filing Analyzer").click();
    await expect(page).toHaveURL(/\/tools\/filing-analyzer/);
    await expect(page.getByRole("heading", { name: /Annual Report/ })).toBeVisible();
  });

  test("back to home link works", async ({ page }) => {
    await page.goto("/tools/filing-analyzer");
    await page.getByText("Back to Home").click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Filing Analyzer API Routes", () => {
  test("search API returns results for known companies", async ({ request }) => {
    const response = await request.post("/api/filing/search", {
      data: { query: "Reliance" },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.results).toBeDefined();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0].name).toContain("Reliance");
    expect(data.results[0].symbol).toBe("RELIANCE");
  });

  test("search API rejects short queries", async ({ request }) => {
    const response = await request.post("/api/filing/search", {
      data: { query: "R" },
    });

    expect(response.status()).toBe(400);
  });

  test("upload API rejects missing file", async ({ request }) => {
    const response = await request.post("/api/filing/upload", {
      multipart: {},
    });

    expect(response.status()).toBe(400);
  });

  test("upload API processes a valid PDF", async ({ request }) => {
    const tmpPdf = createTestPdf(path.join("/tmp", "test-api-upload.pdf"));
    const pdfBuffer = fs.readFileSync(tmpPdf);

    const response = await request.post("/api/filing/upload", {
      multipart: {
        file: {
          name: "test-report.pdf",
          mimeType: "application/pdf",
          buffer: pdfBuffer,
        },
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.text).toBeDefined();
    expect(data.pages).toBeGreaterThanOrEqual(1);
    expect(data.fileName).toBe("test-report.pdf");
    expect(data.sections).toBeDefined();
    expect(data.fullSections).toBeDefined();

    fs.unlinkSync(tmpPdf);
  });

  test("analyze API rejects missing text", async ({ request }) => {
    const response = await request.post("/api/filing/analyze", {
      data: { analysisType: "summarize" },
    });

    expect(response.status()).toBe(400);
  });

  test("analyze API rejects diff without previous text", async ({ request }) => {
    const response = await request.post("/api/filing/analyze", {
      data: { text: "some text", analysisType: "diff" },
    });

    expect(response.status()).toBe(400);
  });

  test("analyze API rejects chat without question", async ({ request }) => {
    const response = await request.post("/api/filing/analyze", {
      data: { text: "some text", analysisType: "chat" },
    });

    expect(response.status()).toBe(400);
  });

  test("fetch API rejects missing URL", async ({ request }) => {
    const response = await request.post("/api/filing/fetch", {
      data: {},
    });

    expect(response.status()).toBe(400);
  });

  test("fetch API rejects invalid URL", async ({ request }) => {
    const response = await request.post("/api/filing/fetch", {
      data: { url: "not-a-url" },
    });

    expect(response.status()).toBe(400);
  });
});

test.describe("Filing Analyzer Design System Compliance", () => {
  test("no rounded corners on filing analyzer elements", async ({ page }) => {
    await page.goto("/tools/filing-analyzer");

    // Check our custom elements (not browser-default inputs which may have user-agent border-radius)
    const elements = await page
      .locator(".section-label, .card, button:not(input)")
      .all();
    for (const el of elements.slice(0, 5)) {
      const borderRadius = await el.evaluate(
        (e) => getComputedStyle(e).borderRadius
      );
      expect(borderRadius).toBe("0px");
    }
  });

  test("uses correct accent color", async ({ page }) => {
    await page.goto("/tools/filing-analyzer");

    const accentText = page.locator("h1 span").first();
    await expect(accentText).toBeVisible();
    const color = await accentText.evaluate((e) => getComputedStyle(e).color);
    // #FF4D00 = rgb(255, 77, 0)
    expect(color).toBe("rgb(255, 77, 0)");
  });

  test("has dark background", async ({ page }) => {
    await page.goto("/tools/filing-analyzer");

    const bgColor = await page.locator("main").evaluate(
      (e) => getComputedStyle(e).backgroundColor
    );
    expect(bgColor).toMatch(/rgb\(0, 0, 0\)/);
  });
});
