"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-20 pb-4">
      {/* Background - subtle diagonal lines */}
      <div className="absolute inset-0 with-diagonal-lines opacity-30" />

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          {/* Text Content - Centered */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
              className="flex items-center justify-center mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#2E2E2E] text-f-p text-[#E6E6E6]"
                style={{ textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.8)' }}
              >
                <span className="w-1.5 h-1.5 bg-[#FF4D00]" style={{ boxShadow: '0 0 6px rgba(255,77,0,0.5)' }} />
                AI-Native Product Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-f-h1-mobile lg:text-f-h0 mb-5"
            >
              Build <span className="text-[#FF4D00]">AI Products</span> That Scale
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-f-p lg:text-f-h4 text-[#C4C4C4] max-w-2xl mx-auto mb-8"
            >
              From voice agents to multi-agent systems — we design, develop, and ship production-ready AI solutions.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <Link
                href="https://calendar.app.google/5B19MHG9JVoGbyMw7"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-premium px-6 py-3 bg-[#FF4D00] text-black font-semibold flex items-center gap-2 transition-opacity hover:opacity-90"
              >
                Book a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Logo Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="w-full"
            >
              <p className="text-[#757575] text-f-p-mobile text-center mb-4 uppercase tracking-widest">
                Trusted by innovative companies
              </p>
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
                        className="object-contain max-h-full max-w-full opacity-50 hover:opacity-100 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
