"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  filingText: string;
  fileName?: string;
}

const SUGGESTED_QUESTIONS = [
  "What is the company's total revenue and net profit?",
  "What are the key risk factors mentioned?",
  "Did the auditor raise any qualifications?",
  "What is the dividend declared per share?",
  "How did employee costs change year-over-year?",
  "What related party transactions were disclosed?",
];

export default function ChatInterface({ filingText, fileName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (question: string) => {
      if (!question.trim() || isStreaming || !filingText) return;

      const userMessage: Message = { role: "user", content: question.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsStreaming(true);

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      try {
        const response = await fetch("/api/filing/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: filingText,
            analysisType: "chat",
            question: question.trim(),
            chatHistory: messages,
          }),
        });

        if (!response.ok) throw new Error("Chat request failed");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: accumulated,
                    };
                    return updated;
                  });
                }
              } catch {
                // Skip malformed
              }
            }
          }
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, I encountered an error. Please check your API key and try again.",
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [filingText, isStreaming, messages]
  );

  if (!filingText) {
    return (
      <div className="text-center py-16">
        <MessageSquare className="w-12 h-12 text-[#2E2E2E] mx-auto mb-4" />
        <p className="text-f-p text-[#757575]">
          Upload an annual report to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-[#FF4D00] mx-auto mb-3" />
              <p className="text-f-p text-[#E6E6E6] mb-1">
                Ask anything about {fileName || "the filing"}
              </p>
              <p className="text-[0.625rem] text-[#757575]">
                Powered by Claude AI
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[0.625rem] text-[#757575] uppercase tracking-widest">
                Suggested Questions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left p-3 border border-[#2E2E2E] text-f-p text-[#C4C4C4] hover:border-[#FF4D00] hover:text-[#E6E6E6] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 bg-[#FF4D00] flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-black" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 text-f-p leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#1A1A1A] text-[#E6E6E6]"
                  : "border border-[#2E2E2E] text-[#C4C4C4]"
              }`}
            >
              {msg.content}
              {msg.role === "assistant" && isStreaming && idx === messages.length - 1 && (
                <span className="inline-block w-2 h-4 bg-[#FF4D00] ml-1 animate-pulse" />
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 bg-[#2E2E2E] flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-[#E6E6E6]" />
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#2E2E2E] pt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the filing..."
            disabled={isStreaming}
            className="flex-1 px-4 py-3 bg-transparent border border-[#2E2E2E] text-[#E6E6E6] text-f-p placeholder:text-[#757575] focus:border-[#FF4D00] focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="px-4 py-3 bg-[#FF4D00] text-black font-semibold text-f-p transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
