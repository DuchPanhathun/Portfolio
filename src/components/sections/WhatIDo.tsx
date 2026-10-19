"use client";

import { useState } from "react";
import { Cpu, Server, CheckCircle2, Layers } from "lucide-react";

/**
 * What I Do — Interactive exploration of core engineering disciplines.
 * Features dual expandable cards with dashed SVG framing and corner crosshairs.
 */
export function WhatIDo() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const disciplines = [
    {
      id: 1,
      number: "01",
      icon: Cpu,
      title: "AI & MACHINE LEARNING",
      subtitle: "Applied Deep Learning & Generative AI",
      tagline: "Bridging mathematical models into reliable production endpoints.",
      description:
        "Designing, training, and operationalizing computer vision models, gradient-boosted tabular classifiers, and LLM-powered reasoning pipelines built for real-world inference constraints.",
      capabilities: [
        "Computer vision classifiers (ConvNeXt, EfficientNet) reaching up to 99.74% accuracy",
        "Tabular ML & cost-sensitive fraud detection on imbalanced financial transactions",
        "Retrieval-Augmented Generation (RAG) with vector databases and embedding search",
        "LLM agent gateways with multi-key round-robin rotation and thought streaming",
        "Data pipelines, automated augmentation, focal loss, and cosine LR scheduling",
      ],
      stack: [
        "PyTorch",
        "TensorFlow / Keras",
        "scikit-learn",
        "OpenCV",
        "FastAPI",
        "OpenAI & Anthropic",
        "FAISS / Vector Search",
        "CatBoost / XGBoost",
      ],
    },
    {
      id: 2,
      number: "02",
      icon: Server,
      title: "FULL-STACK & PRODUCTION SYSTEMS",
      subtitle: "Scalable Web Platforms & Cloud Architecture",
      tagline: "Engineering the robust interfaces, APIs, and microservices that power products.",
      description:
        "Architecting end-to-end production applications, microservices, secure authentication layers, and asynchronous background pipelines from blank repositories to high-availability deployment.",
      capabilities: [
        "High-throughput asynchronous scraping pipelines with AWS SQS and MongoDB",
        "National payment rails integration (Bakong KHQR, ABA PayWay, Stripe) with idempotency",
        "Transitive role-based access control (RBAC) and service-to-service authentication",
        "Enterprise POS terminals, ERP engines, bilingual Khmer/English dashboards",
        "Cloud deployments on AWS (EC2, ECS, Lambda, Route 53) with Docker & Terraform",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "FastAPI",
        "NestJS",
        "AWS (ECS, SQS, S3)",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Tailwind CSS",
      ],
    },
  ];

  return (
    <section id="disciplines" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <Layers className="h-3.5 w-3.5" />
            <span>02 &mdash; Disciplines</span>
          </div>
          <h2 className="mt-3 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl">
            WHAT I <span className="text-accent">DO</span>
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg max-w-2xl">
            Specialized in applying deep learning models and engineering reliable full-stack production systems &mdash; combining intelligent models with the unglamorous backend plumbing that makes them usable.
          </p>
        </div>

        {/* Two Expandable Dashed Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {disciplines.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === index;
            const isSibling = activeCard !== null && activeCard !== index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-7 sm:p-9 transition-all duration-300 ${
                  isActive
                    ? "border-accent/60 bg-surface/90 shadow-[0_0_40px_rgba(194,164,255,0.18)] translate-y-[-2px]"
                    : isSibling
                    ? "border-border/40 bg-surface/30 opacity-75"
                    : "border-border/70 bg-surface/50 hover:border-border-strong hover:bg-surface/70"
                }`}
              >
                {/* 4 Corner Crosshairs */}
                <div className="what-corner what-corner-tl" />
                <div className="what-corner what-corner-tr" />
                <div className="what-corner what-corner-bl" />
                <div className="what-corner what-corner-br" />

                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between border-b border-border/50 pb-5">
                    <span className="font-mono text-xs tracking-widest text-accent uppercase font-semibold">
                      {item.number} / DISCIPLINE
                    </span>
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl border border-border bg-bg/80 text-accent group-hover:border-accent/50 group-hover:scale-105 transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Card Title & Tagline */}
                  <div className="mt-6">
                    <h3 className="font-bold tracking-tight text-ink text-xl sm:text-2xl uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-accent font-medium">
                      {item.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>

                  {/* Core Capabilities */}
                  <div className="mt-6 space-y-2.5">
                    <p className="font-mono text-[11px] tracking-wider text-muted uppercase">
                      Core Engineering Scope
                    </p>
                    <ul className="space-y-2">
                      {item.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5 text-xs text-ink-soft">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Tags Footer */}
                <div className="mt-8 pt-5 border-t border-border/50">
                  <p className="font-mono text-[11px] tracking-wider text-muted uppercase mb-3">
                    Applied Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-ink-soft group-hover:border-accent/30 group-hover:text-ink transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
