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
    <section id="process" className="py-24 relative border-t border-[#2E2E2E]">
      {/* Subtle diagonal lines pattern */}
      <div className="absolute inset-0 with-diagonal-lines opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Process</span>
          <h2 className="text-f-h2-mobile lg:text-f-h2 mt-6 mb-4">
            Our easy 3-step method to{" "}
            <span className="text-[#FF4D00]">accelerate your roadmap</span>
          </h2>
          <p className="text-[#757575] text-f-p max-w-2xl mx-auto">
            From ideation to execution, we work closely with you every step of the way
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-6 pt-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative overflow-visible"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF4D00] text-black text-f-p font-bold z-20">
                {step.number}
              </div>

              <div className="card p-8 pt-10 text-center relative z-10 h-full">
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-6 bg-[#1A1A1A] flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-[#FF4D00]" />
                </div>

                {/* Content */}
                <h3 className="text-f-h3 mb-4">{step.title}</h3>
                <p className="text-[#757575] text-f-p leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
