"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 grid-pattern">
      {/* Background Gradient Orbs */}
      <div className="hero-orb top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="hero-orb top-1/3 left-1/3 -translate-x-1/2 animate-float opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-5"
            >
              We help you build{" "}
              <span className="gradient-text">next-generation AI products</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Cortivo AI is an AI-native product studio building fullstack AI/LLM apps
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start"
            >
              <Link
                href="https://calendar.app.google/5B19MHG9JVoGbyMw7"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-premium px-8 py-4 rounded-full gradient-bg text-white font-semibold transition-all hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 flex items-center gap-2"
              >
                Book a Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* About Text */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 text-sm md:text-base text-white/50 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Here at Cortivo AI we engineer AI native solutions. We are committed to creating
              innovative and inspiring world-class products. Come transform your ideas into powerful realities
            </motion.p>
          </div>

          {/* Spline 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full spline-container"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              </div>
            }>
              <Spline scene="https://prod.spline.design/NQ9Qs07-tYHSubNq/scene.splinecode" />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
