"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What all services does Cortivo AI offer?",
    answer: "We offer a wide range of services. In design, we specialize in product design and landing page design. On the development side, we provide multiple LLM integrations, cross-platform apps (web & mobile), finetuning infrastructure, voice agents, and multi-agent systems.",
  },
  {
    question: "How long does a typical software development project take?",
    answer: "The duration of a typical software development project depends on its scope, complexity, and the specific requirements. On average, it can range from a few weeks to several months. We work closely with you to establish timelines during the ideation phase.",
  },
  {
    question: "What does the broader process look like?",
    answer: "Our process is simple: First, we hop on a call to ideate with you and understand your vision and goals. Then, with your business goals in mind, we design and develop the product. Finally, we launch the product and continue to support you with updates and more.",
  },
  {
    question: "What kind of quality assurance do we have? Do we offer maintenance?",
    answer: "We implement comprehensive testing and evaluation frameworks to ensure your AI systems perform reliably before production. Yes, we offer ongoing maintenance and support after launch to keep your product running smoothly and up-to-date.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative border-t border-[#2E2E2E]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">FAQs</span>
          <h2 className="text-f-h2-mobile lg:text-f-h2 mt-6 mb-4">
            Frequently Asked{" "}
            <span className="text-[#FF4D00]">Questions</span>
          </h2>
          <p className="text-[#757575] text-f-p max-w-2xl mx-auto">
            Everything you need to know about working with Cortivo AI
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-[rgba(230,230,230,0.1)] hover:border-[rgba(230,230,230,0.2)] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-f-p font-semibold pr-4">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-[#FF4D00]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#757575]" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-[#757575] text-f-p leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
