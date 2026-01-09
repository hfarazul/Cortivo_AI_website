"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

import haqImage from "@/images/haq.jpeg";
import nishitImage from "@/images/nishit.jpeg";

const team: { name: string; role: string; bio: string; linkedin: string; image: StaticImageData }[] = [
  {
    name: "Haque Farazul",
    role: "Co-founder",
    bio: "IIT Kharagpur alum with expertise in AI, software architecture, and product development. Previously at Mastercard, now building AI-native solutions at Cortivo.",
    linkedin: "https://www.linkedin.com/in/haquefarazul/",
    image: haqImage,
  },
  {
    name: "Nishit Goyal",
    role: "Co-founder",
    bio: "Delhi College of Engineering alum. Formerly led Rocket Learning's flagship AI initiatives with Google DeepMind, OpenAI & Meta; scaled the team 10x.",
    linkedin: "https://www.linkedin.com/in/nishit-goyal/",
    image: nishitImage,
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 relative border-t border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Team</span>
          <h2 className="text-f-h2-mobile lg:text-f-h2 mt-6 mb-4">
            Meet the <span className="text-[#FF4D00]">Founders</span>
          </h2>
          <p className="text-[#757575] text-f-p max-w-2xl mx-auto">
            Building the future of AI products together
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-6 overflow-hidden border border-[#2E2E2E]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-f-h4 mb-1">{member.name}</h3>
              <p className="text-[#FF4D00] text-f-p mb-4">{member.role}</p>
              <p className="text-[#757575] text-f-p leading-relaxed mb-6">{member.bio}</p>

              {/* LinkedIn */}
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#2E2E2E] text-[#757575] hover:text-[#E6E6E6] hover:border-[#FF4D00] transition-all text-f-p"
              >
                <Linkedin className="w-4 h-4" />
                Connect
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
