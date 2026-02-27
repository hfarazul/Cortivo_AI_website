import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type AnalysisType = "summarize" | "diff" | "chat";

interface AnalyzeRequest {
  text: string;
  analysisType: AnalysisType;
  sectionName?: string;
  previousText?: string;
  question?: string;
  chatHistory?: { role: "user" | "assistant"; content: string }[];
}

function getSystemPrompt(analysisType: AnalysisType): string {
  switch (analysisType) {
    case "summarize":
      return `You are an expert financial analyst specializing in Indian listed companies (BSE/NSE). You analyze annual reports filed under SEBI LODR regulations and the Companies Act, 2013.

When summarizing a section of an Indian annual report, provide:
1. **Key Points** — The 3-5 most important takeaways from this section
2. **Financial Highlights** — Any notable numbers, metrics, or financial data mentioned
3. **Red Flags** — Any concerns, qualifications, material weaknesses, or items that warrant investor attention
4. **Outlook** — Any forward-looking statements or guidance from management

Be concise but thorough. Use bullet points. Highlight specific numbers and percentages when available. If the section contains financial tables, extract the key metrics.`;

    case "diff":
      return `You are an expert financial analyst specializing in Indian listed companies (BSE/NSE). You compare annual reports year-over-year to identify material changes.

When comparing two annual reports, identify:
1. **New Additions** — Risks, disclosures, business segments, or policies that appear in the current year but not the previous year
2. **Removals** — Items that were in the previous year but removed from the current year
3. **Material Changes** — Significant changes in language, tone, or emphasis between the two years
4. **Financial Changes** — Changes in key financial metrics (revenue, profit, margins, debt, etc.)
5. **Tone Shift** — Any shift in management tone from optimistic to cautious or vice versa

For each change, explain WHY it matters for investors. Use specific quotes when relevant. Format changes as a structured list with clear categories.`;

    case "chat":
      return `You are an expert financial analyst specializing in Indian listed companies (BSE/NSE). You have been given the full text of an annual report. Answer the user's questions accurately based solely on the information in the report.

Rules:
- Base your answers ONLY on the content of the annual report provided
- Quote specific text from the report when possible
- If the answer is not in the report, say so clearly
- Provide page/section references when possible
- Be concise but thorough
- For financial questions, cite specific numbers from the report
- Understand Indian financial reporting standards (Ind AS, Companies Act 2013, SEBI LODR)`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { text, analysisType, sectionName, previousText, question, chatHistory } = body;

    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let userMessage = "";

    switch (analysisType) {
      case "summarize":
        userMessage = sectionName
          ? `Summarize the following section "${sectionName}" from the annual report:\n\n${text}`
          : `Summarize the key points of this annual report:\n\n${text.slice(0, 100000)}`;
        break;

      case "diff":
        if (!previousText) {
          return new Response(
            JSON.stringify({ error: "Previous year text is required for diff analysis" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        userMessage = `Compare these two annual reports and identify all material changes:\n\n**PREVIOUS YEAR REPORT:**\n${previousText.slice(0, 80000)}\n\n**CURRENT YEAR REPORT:**\n${text.slice(0, 80000)}`;
        break;

      case "chat":
        if (!question) {
          return new Response(
            JSON.stringify({ error: "Question is required for chat analysis" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        userMessage = `Based on this annual report:\n\n${text.slice(0, 100000)}\n\nAnswer this question: ${question}`;
        break;
    }

    const messages: Anthropic.MessageParam[] = [];

    if (analysisType === "chat" && chatHistory && chatHistory.length > 0) {
      for (const msg of chatHistory) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    messages.push({ role: "user", content: userMessage });

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: getSystemPrompt(analysisType),
      messages,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Analysis failed. Please check your API key." })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Analyze error:", error);
    return new Response(
      JSON.stringify({ error: "Analysis request failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
