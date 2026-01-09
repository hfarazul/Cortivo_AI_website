"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Praveen Chavali",
    role: "CTO at Microforge",
    content: "Cortivo built us an agentic platform that's now used by a16z, Sequoia, Elevation, and Accel. The autonomous pipeline they created ingests GitHub data, filters for signal, and deploys AI agents to research and score projects — all without human intervention.",
    rating: 5,
  },
  {
    name: "Vaibhav Dusad",
    role: "CEO at SurgeGrowth",
    content: "We partnered with Cortivo to build an AI website generator for our customers. What brands used to spend days creating now takes under 2 minutes. It's transformed our entire offering.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative border-t border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Testimonials</span>
          <h2 className="text-f-h2-mobile lg:text-f-h2 mt-6 mb-4">
            What Our Clients{" "}
            <span className="text-[#FF4D00]">Say About Us</span>
          </h2>
          <p className="text-[#757575] text-f-p max-w-2xl mx-auto">
            Trusted by startups and enterprises building AI products
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card p-6 md:p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF4D00] text-[#FF4D00]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#E6E6E6] text-f-p leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FF4D00] flex items-center justify-center">
                  <span className="text-black font-semibold text-f-p">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-f-p font-semibold">{testimonial.name}</p>
                  <p className="text-f-p-mobile text-[#757575]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
