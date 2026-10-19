"use client";

import { profile } from "@/content/profile";
import { User, Award, CheckCircle2, BookOpen, Globe2 } from "lucide-react";

const FOCUS_AREAS = [
  "Computer vision & deep learning classifiers",
  "Gradient-boosted tabular ML & fraud detection",
  "LLM & embedding pipelines (RAG, agent proxies)",
  "High-throughput backend APIs & data pipelines",
  "Full-stack product engineering (Next.js, NestJS)",
  "National payment rails (Bakong KHQR, ABA PayWay)",
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Eyebrow & Title */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <User className="h-3.5 w-3.5" />
            <span>01 &mdash; About Me</span>
          </div>
          <h2 className="mt-3 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl">
            ENGINEERING AT THE INTERSECTION OF <span className="text-accent">MODELS &amp; SYSTEMS</span>
          </h2>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-ink-soft sm:text-lg font-normal">
            {profile.about.map((paragraph, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-surface/50 p-6 sm:p-7 backdrop-blur-sm relative group hover:border-accent/40 transition-colors"
              >
                <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase block mb-2">
                  0{idx + 1} &mdash; Perspective
                </span>
                <p className="text-pretty text-sm sm:text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>

          {/* Aside Column (5 cols): Focus Areas & Credentials */}
          <div className="lg:col-span-5 space-y-8">
            {/* Focus Areas Card */}
            <div className="card-lift group relative rounded-2xl border border-border bg-surface/70 p-6 sm:p-8 backdrop-blur-md">
              <div className="what-corner what-corner-tl" />
              <div className="what-corner what-corner-tr" />
              <div className="what-corner what-corner-bl" />
              <div className="what-corner what-corner-br" />

              <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                <BookOpen className="h-4 w-4 text-accent" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-ink uppercase">
                  Core Focus Disciplines
                </h3>
              </div>

              <ul className="mt-5 space-y-3">
                {FOCUS_AREAS.map((area, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-soft">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Fact / Impact Card */}
            <div className="card-lift group relative rounded-2xl border border-accent/30 bg-surface/40 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                <Award className="h-4 w-4 text-accent" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                  Milestones &amp; Recognition
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="font-mono text-[11px] text-muted uppercase">Independent Research</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">
                    Published Thesis on Payment-Fraud Detection
                  </p>
                  <p className="text-xs text-accent mt-0.5 font-mono">DOI: 10.5281/zenodo.15061986</p>
                </div>

                <div className="border-t border-border/40 pt-3">
                  <p className="font-mono text-[11px] text-muted uppercase">Competition</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">
                    Pan-SEA AI Challenge 2025
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">Top 20 Finalist among 100+ ASEAN engineering teams</p>
                </div>

                <div className="border-t border-border/40 pt-3">
                  <p className="font-mono text-[11px] text-muted uppercase">Regional Commitment</p>
                  <div className="flex items-center gap-1.5 text-xs text-ink-soft mt-1">
                    <Globe2 className="h-3.5 w-3.5 text-accent" />
                    <span>Building localized, accessible systems for Southeast Asia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
