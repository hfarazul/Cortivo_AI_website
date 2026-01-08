"use client";

import { motion } from "framer-motion";
import { Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Ideation",
    description: "We'll get on a call to ideate with you & understand your vision and goals",
  },
  {
    number: "02",
    icon: Code,
    title: "Development",
    description: "With your business goals in mind, we'll design & develop the product",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description: "We will launch the product & continue to support you with updates & more",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative dot-pattern">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Process</span>
          <h2 className="text-4xl md:text-5xl font-semibold mt-6 mb-4">
            Our easy 3-step method to{" "}
            <span className="gradient-text">accelerate your roadmap</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From ideation to execution, we work closely with you every step of the way
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 pt-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative overflow-visible"
            >
              {/* Step Number - positioned outside card to avoid overflow:hidden clipping */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-sm font-bold z-20">
                {step.number}
              </div>

              <div className="card p-8 pt-10 text-center relative z-10 h-full">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-purple-400" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
