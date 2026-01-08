"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import logo from "@/images/logo.png";

const footerLinks = {
  links: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQs", href: "#faq" },
  ],
  pages: [
    { label: "Home", href: "/" },
    { label: "Contact", href: "mailto:nishit@cortivo.ai" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/cortivo-ai/posts/?feedView=all", icon: Linkedin },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="Cortivo AI"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-white font-semibold text-lg tracking-tight">
                Cortivo AI
              </span>
            </Link>
            <p className="text-white/60 max-w-sm">
              An AI-native product studio building fullstack AI/LLM apps. We engineer AI native solutions that transform ideas into powerful realities.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-medium mb-4">Links</p>
            <ul className="space-y-3">
              {footerLinks.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <p className="font-medium mb-4">Pages</p>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Cortivo. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {footerLinks.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <social.icon className="w-5 h-5 text-white/60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
