"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/images/logo.png";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQs" },
  { href: "mailto:nishit@cortivo.ai", label: "Contact Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#2E2E2E]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={logo}
              alt="Cortivo AI"
              width={28}
              height={28}
              className="rounded-sm"
            />
            <span className="text-[#E6E6E6] font-semibold text-sm tracking-tight">
              Cortivo AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="actionable text-[#757575] hover:text-[#E6E6E6] text-f-p"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="https://calendar.app.google/5B19MHG9JVoGbyMw7"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-black text-f-p font-semibold transition-opacity hover:opacity-90"
            >
              Book a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#E6E6E6] border border-[#2E2E2E] hover:border-[#FF4D00] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-black border-t border-[#2E2E2E]"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-[#757575] hover:text-[#E6E6E6] transition-colors text-f-p font-semibold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://calendar.app.google/5B19MHG9JVoGbyMw7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 bg-[#FF4D00] text-black text-f-p font-semibold mt-4"
            >
              Book a call
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
