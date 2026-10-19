"use client";

import Link from "next/link";
import { Gamepad2, Mail, ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[600px] rounded-full bg-accent/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="relative rounded-3xl border border-border bg-surface/70 p-8 sm:p-14 lg:p-16 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-accent/40 transition-colors duration-500">
          {/* Redoyan signature corner crosshairs */}
          <div className="what-corner what-corner-tl" />
          <div className="what-corner what-corner-tr" />
          <div className="what-corner what-corner-bl" />
          <div className="what-corner what-corner-br" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/80 px-4 py-1.5 font-mono text-xs text-accent uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Playground & Collaborations</span>
            </div>

            {/* Main Headline */}
            <h2 className="mt-6 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
              READY TO <span className="text-accent">COLLABORATE</span> OR{" "}
              <span className="bg-gradient-to-r from-accent via-accent-vibrant to-white bg-clip-text text-transparent">
                EXPERIMENT
              </span>
              ?
            </h2>

            {/* Editorial Subtitle */}
            <p className="mt-5 max-w-2xl text-base text-ink-soft sm:text-lg leading-relaxed">
              Dive into generative canvas physics and creative developer
              experiments, or connect directly to build production-grade AI
              models and full-stack software.
            </p>

            {/* Dual-Pill CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* Pill 1: Play With Me → /play */}
              <Link
                href="/play"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent to-accent-vibrant px-8 py-4 text-sm sm:text-base font-bold text-bg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(194,164,255,0.45)] active:scale-95"
              >
                <Gamepad2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Play With Me</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              {/* Pill 2: Hire Me / Get in Touch → #contact */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface/80 px-8 py-4 text-sm sm:text-base font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-white hover:scale-105 active:scale-95"
              >
                <Mail className="h-5 w-5 text-accent" />
                <span>Hire Me / Get in Touch</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>

            {/* Availability Footer Note */}
            <div className="mt-8 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AVAILABLE FOR NEW PROJECTS & CONSULTING • PHNOM PENH & REMOTE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
