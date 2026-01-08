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
    bio: "IIT Kharagpur alum with expertise in AI, blockchain, and product development. Previously at Mastercard, now building AI-native solutions at Cortivo.",
    linkedin: "https://www.linkedin.com/in/haquefarazul/",
    image: haqImage,
  },
  {
    name: "Nishit Goyal",
    role: "Co-founder",
    bio: "Delhi Technological University alum. Former PM at Rocket Learning where he led AI initiatives with OpenAI, Meta & Google.org, scaling the team 10x.",
    linkedin: "https://www.linkedin.com/in/nishit-goyal/",
    image: nishitImage,
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Team</span>
          <h2 className="text-4xl md:text-5xl font-semibold mt-6 mb-4">
            Meet the <span className="gradient-text">Founders</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Building the future of AI products together
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card p-8 text-center"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-purple-400 text-sm font-medium mb-4">{member.role}</p>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{member.bio}</p>

              {/* LinkedIn */}
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-sm"
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
