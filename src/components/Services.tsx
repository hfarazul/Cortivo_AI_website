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
    <section id="services" className="py-24 relative">
      {/* Subtle glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4">Services</span>
          <h2 className="text-4xl md:text-5xl font-semibold mt-6 mb-4">
            How can we{" "}
            <span className="gradient-text">help you?</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Generative AI. AI Products. LLMOps. Enterprise-grade AI solutions from concept to production
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "gradient-bg text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-purple-500/30"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {serviceCategories[activeCategory].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 md:p-8 hover:border-purple-500/30 transition-colors group"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-purple-400" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed">
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
