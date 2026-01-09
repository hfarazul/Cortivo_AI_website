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
    <footer className="border-t border-[#2E2E2E] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="Cortivo AI"
                width={24}
                height={24}
              />
              <span className="logo-text">
                Cortivo AI
              </span>
            </Link>
            <p className="text-[#757575] text-f-p max-w-sm">
              An AI-native product studio building fullstack AI/LLM apps. We engineer AI native solutions that transform ideas into powerful realities.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-f-p font-semibold mb-4">Links</p>
            <ul className="space-y-3">
              {footerLinks.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="actionable text-[#757575] hover:text-[#E6E6E6] text-f-p"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <p className="text-f-p font-semibold mb-4">Pages</p>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="actionable text-[#757575] hover:text-[#E6E6E6] text-f-p"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2E2E2E] gap-4">
          <p className="text-[#757575] text-f-p-mobile">
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
                className="p-2 border border-[#2E2E2E] hover:border-[#FF4D00] transition-colors"
              >
                <social.icon className="w-4 h-4 text-[#757575]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
