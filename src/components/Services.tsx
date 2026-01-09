"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Users, SlidersHorizontal, Sparkles, Layers, Cpu, Server, Shield, BarChart3 } from "lucide-react";

const serviceCategories = {
  "Generative AI": [
    {
      icon: Mic,
      title: "Voice Agents",
      description: "Build intelligent voice agents that understand context and deliver natural conversations. From customer support to internal tools, AI that speaks for your brand",
    },
    {
      icon: Users,
      title: "Multi-Agent Systems",
      description: "Orchestrate complex multi-agent workflows that collaborate to solve real problems. AI agents that reason, plan, and act autonomously",
    },
    {
      icon: SlidersHorizontal,
      title: "Model Finetuning",
      description: "Test and validate AI systems with comprehensive evaluation frameworks. Ensure your models perform reliably before production",
    },
  ],
  "AI Products": [
    {
      icon: Sparkles,
      title: "AI-Powered Apps",
      description: "End-to-end development of AI-native applications. From concept to deployment, we build products that leverage the latest in machine learning",
    },
    {
      icon: Layers,
      title: "Custom LLM Solutions",
      description: "Tailored large language model integrations for your specific use case. RAG systems, chatbots, and intelligent assistants",
    },
    {
      icon: Cpu,
      title: "AI Integrations",
      description: "Seamlessly integrate AI capabilities into your existing products. APIs, SDKs, and custom middleware for any platform",
    },
  ],
  "Enterprise LLMOps": [
    {
      icon: Server,
      title: "Infrastructure Setup",
      description: "Production-ready AI infrastructure. Model serving, scaling, monitoring, and optimization for enterprise workloads",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security for AI systems. Data privacy, access controls, audit trails, and regulatory compliance",
    },
    {
      icon: BarChart3,
      title: "Monitoring & Analytics",
      description: "Comprehensive observability for your AI systems. Performance metrics, cost tracking, and continuous improvement insights",
    },
  ],
};

const categories = Object.keys(serviceCategories) as (keyof typeof serviceCategories)[];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof serviceCategories>("Generative AI");

  return (
    <section id="services" className="py-24 relative border-t border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Services</span>
          <h2 className="text-f-h2-mobile lg:text-f-h2 mt-6 mb-4">
            How can we{" "}
            <span className="text-[#FF4D00]">help you?</span>
          </h2>
          <p className="text-[#757575] text-f-p max-w-2xl mx-auto mb-8">
            Generative AI. AI Products. LLMOps. Enterprise-grade AI solutions from concept to production
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-f-p font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-[#FF4D00] text-black"
                    : "border border-[#2E2E2E] text-[#757575] hover:text-[#E6E6E6] hover:border-[#FF4D00]"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {serviceCategories[activeCategory].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="card p-6 md:p-8 group"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="p-3 bg-[#1A1A1A] w-fit mb-6 group-hover:bg-[#212121] transition-colors">
                    <service.icon className="w-6 h-6 text-[#FF4D00]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-f-h3 mb-4">{service.title}</h3>
                  <p className="text-[#757575] text-f-p leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
