"use client";

import { techStackPyramid } from "@/content/skills";
import { Cpu, Sparkles } from "lucide-react";

export function TechStack() {
  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient Radial Glowing Orb behind pyramid */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[650px] rounded-full bg-radial from-accent/10 via-accent/3 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 text-center">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <Cpu className="h-3.5 w-3.5" />
            <span>05 &mdash; Tech Stack</span>
          </div>
          <h2 className="mt-3 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl">
            TECHNOLOGIES <span className="text-accent">&amp;</span> TOOLS
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            A battle-tested stack spanning machine learning, high-scale web platforms, cloud infrastructure, and systems engineering.
          </p>
        </div>

        {/* Inverted Pyramid Grid */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:gap-5">
          {techStackPyramid.map((row, rowIdx) => (
            <div
              key={`pyramid-row-${rowIdx}`}
              className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-5xl"
            >
              {row.map((item) => (
                <div
                  key={item.name}
                  className="card-lift group relative flex items-center gap-2 rounded-xl border border-border bg-surface/70 px-3.5 py-2.5 sm:px-4 sm:py-3 backdrop-blur-md transition-all hover:border-accent/60 hover:bg-surface/95 hover:shadow-[0_0_24px_rgba(194,164,255,0.3)]"
                  title={`${item.name} (${item.category || "Tech"})`}
                >
                  {/* Tech Icon */}
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      loading="lazy"
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain filter group-hover:brightness-110 transition-transform group-hover:scale-110"
                    />
                  </div>

                  {/* Tech Name */}
                  <span className="font-mono text-xs font-medium text-ink group-hover:text-accent transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Stack Summary Bar */}
        <div className="mx-auto mt-14 max-w-xl rounded-xl border border-border/50 bg-surface/30 p-4 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 font-mono text-xs text-muted">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Languages &bull; Computer Vision &bull; PyTorch &bull; Next.js &bull; AWS Cloud</span>
          </p>
        </div>
      </div>
    </section>
  );
}
