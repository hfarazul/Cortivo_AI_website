"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden grid-pattern">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Ready to build your{" "}
            <span className="gradient-text">next-generation AI product?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10">
            Let&apos;s transform your ideas into powerful realities
          </p>
          <Link
            href="https://calendar.app.google/5B19MHG9JVoGbyMw7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 px-10 py-4 rounded-full gradient-bg text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 transition-all group"
          >
            Book a free call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
