"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import a16zLogo from "@/images/a16z.jpeg";
import sequoiaLogo from "@/images/sequoia-removebg-preview.png";
import accelLogo from "@/images/accel.svg";
import bespokeLogo from "@/images/Bespoke-removebg-preview.png";
import microforgeLogo from "@/images/microforge-new-removebg-preview.png";
import surgegrowthLogo from "@/images/surgegrowth.avif";

const clients: { name: string; logo: StaticImageData }[] = [
  { name: "a16z", logo: a16zLogo },
  { name: "Sequoia", logo: sequoiaLogo },
  { name: "Accel", logo: accelLogo },
  { name: "Bespoke", logo: bespokeLogo },
  { name: "Microforge", logo: microforgeLogo },
  { name: "Surge Growth", logo: surgegrowthLogo },
];

export default function Clients() {
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-white/50 text-sm mb-2">Trusted by innovative companies</p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Carousel */}
      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex items-center animate-scroll">
          {/* First set of logos */}
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10 w-[120px] md:w-[150px] h-[40px] md:h-[50px] flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={150}
                height={50}
                className="object-contain max-h-full max-w-full opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
