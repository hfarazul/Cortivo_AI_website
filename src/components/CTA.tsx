"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-[#2E2E2E]">
      {/* Diagonal lines background */}
      <div className="absolute inset-0 with-diagonal-lines opacity-30" />

      {/* Top and bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-f-h2-mobile lg:text-f-h1 mb-6">
            Ready to build your{" "}
            <span className="text-[#FF4D00]">next-generation AI product?</span>
          </h2>
          <p className="text-f-p text-[#757575] mb-10">
            Let&apos;s transform your ideas into powerful realities
          </p>
          <Link
            href="https://calendar.app.google/5B19MHG9JVoGbyMw7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-black font-semibold transition-opacity hover:opacity-90 group"
          >
            Book a free call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
