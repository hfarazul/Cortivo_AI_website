"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import a16zLogo from "@/images/a16z.jpeg";
import sequoiaLogo from "@/images/sequoia-removebg-preview.png";
import accelLogo from "@/images/accel.png";
import bespokeLogo from "@/images/Bespoke-removebg-preview.png";
import microforgeLogo from "@/images/microforge-new-removebg-preview.png";
import surgegrowthLogo from "@/images/surgegrowth.avif";

const clients = [
  { name: "a16z", logo: a16zLogo },
  { name: "Sequoia", logo: sequoiaLogo },
  { name: "Accel", logo: accelLogo },
  { name: "Bespoke", logo: bespokeLogo },
  { name: "Microforge", logo: microforgeLogo },
  { name: "Surge Growth", logo: surgegrowthLogo },
];

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
    <section className="relative overflow-hidden pt-20 pb-4">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex items-center justify-center lg:justify-start mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                AI-Native Product Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-5"
            >
              Build <span className="gradient-text">AI Products</span> That Scale
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              From voice agents to multi-agent systems — we design, develop, and ship production-ready AI solutions.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start mb-6"
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

            {/* Logo Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <p className="text-white/40 text-xs text-center lg:text-left mb-4 uppercase tracking-wider">Trusted by innovative companies</p>
              <div className="relative overflow-hidden">
                {/* Scrolling container */}
                <div className="flex items-center animate-scroll">
                  {[...clients, ...clients, ...clients].map((client, index) => (
                    <div
                      key={`${client.name}-${index}`}
                      className="flex-shrink-0 mx-3 md:mx-4 w-[70px] md:w-[90px] h-[24px] md:h-[28px] flex items-center justify-center"
                    >
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={90}
                        height={28}
                        className="object-contain max-h-full max-w-full opacity-60 hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

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
