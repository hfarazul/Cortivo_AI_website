"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael Chen",
    role: "CTO at Fintech Startup",
    content: "Cortivo AI built our voice agent system from scratch. The natural conversations it handles have transformed our customer support - response quality improved while costs dropped significantly.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Founder at AI Health",
    content: "Their multi-agent architecture was exactly what we needed. The team understood our complex requirements and delivered a system that reasons and acts autonomously.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "VP Engineering at DataScale",
    content: "The model finetuning infrastructure Cortivo built for us ensures our AI performs reliably in production. Their evaluation frameworks caught issues we would have missed.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Product Lead at Enterprise Co",
    content: "From ideation to launch, Cortivo was a true partner. They didn't just build what we asked - they helped us think through the AI strategy that made sense for our business.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-semibold mt-6 mb-4">
            What Our Clients{" "}
            <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Trusted by startups and enterprises building AI products
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 md:p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
