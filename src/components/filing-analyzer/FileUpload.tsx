"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Loader } from "lucide-react";

interface FileUploadProps {
  label: string;
  onFileProcessed: (data: {
    text: string;
    pages: number;
    fileName: string;
    fileSize: number;
    sections: { name: string; startIndex: number; contentLength: number; preview: string }[];
    fullSections: { name: string; startIndex: number; content: string }[];
  }) => void;
  onClear?: () => void;
  isProcessing?: boolean;
}

export default function FileUpload({ label, onFileProcessed, onClear, isProcessing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        setError("Only PDF files are accepted");
        return;
      }

      setError(null);
      setUploading(true);
      setFileName(file.name);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/filing/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Upload failed");
        }

        const data = await response.json();
        onFileProcessed(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process file");
        setFileName(null);
      } finally {
        setUploading(false);
      }
    },
    [onFileProcessed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleClear = () => {
    setFileName(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onClear?.();
  };

  const busy = uploading || isProcessing;

  return (
    <div className="space-y-2">
      <label className="text-f-p text-[#757575] uppercase tracking-widest text-[0.625rem]">
        {label}
      </label>

      {fileName && !busy ? (
        <div className="border border-[#2E2E2E] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 text-[#FF4D00] flex-shrink-0" />
            <span className="text-f-p truncate">{fileName}</span>
          </div>
          <button
            onClick={handleClear}
            className="p-1 text-[#757575] hover:text-[#E6E6E6] transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !busy && inputRef.current?.click()}
          className={`border-2 border-dashed p-6 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-[#FF4D00] bg-[rgba(255,77,0,0.05)]"
              : "border-[#2E2E2E] hover:border-[#FF4D00]"
          } ${busy ? "pointer-events-none opacity-50" : ""}`}
        >
          {busy ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#2E2E2E] border-t-[#FF4D00] animate-spin" />
              <span className="text-f-p text-[#757575]">Processing PDF...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-6 h-6 text-[#757575]" />
              <div>
                <span className="text-f-p text-[#E6E6E6]">Drop PDF here</span>
                <span className="text-f-p text-[#757575]"> or click to browse</span>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />
        </div>
      )}

      {error && (
        <p className="text-[0.75rem] text-[#E60002] font-semibold">{error}</p>
      )}
    </div>
  );
}
