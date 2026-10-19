"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ArrowDown, ArrowUpRight, FileText, Sparkles, MapPin } from "lucide-react";

export function Hero() {
  const roles =
    profile.displayRoles && profile.displayRoles.length > 0
      ? profile.displayRoles
      : ["AI / ML Engineer", "Full-Stack Developer", "Systems Architect"];

  const [roleIndex, setRoleIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setAnimating(false);
      }, 400);
    }, 3600);

    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-between pt-28 pb-12 sm:min-h-screen sm:pt-36 sm:pb-16 overflow-hidden"
    >
      {/* Ambient Radial Lighting Orbs */}
      <div className="landing-circle1" aria-hidden="true" />
      <div className="landing-circle2" aria-hidden="true" />

      <div className="section-container relative z-10 my-auto flex flex-col justify-center">
        {/* Top Eyebrow: Location & Availability Pill */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest uppercase">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-ink-soft">Available for Projects &amp; Roles</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-muted">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Kinetic Hero Display Heading */}
        <div className="mt-8">
          <p className="font-mono text-sm tracking-[0.25em] text-accent uppercase font-medium">
            HELLO! I&apos;M
          </p>
          <h1 className="mt-2 text-balance font-extrabold uppercase leading-[0.92] tracking-tighter text-ink text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]">
            DUCH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#d4bfff] to-[#9e70ff] drop-shadow-[0_0_40px_rgba(194,164,255,0.35)]">
              PANHATHUN
            </span>
          </h1>
        </div>

        {/* Rolling Kinetic Titles & Tagline */}
        <div className="mt-6 max-w-3xl space-y-4">
          {/* Rolling role carousel */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
            <div className="h-8 overflow-hidden font-mono text-lg font-semibold tracking-wider text-accent sm:text-2xl uppercase">
              <div
                className={`transition-all duration-500 ease-out transform ${
                  animating
                    ? "-translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {roles[roleIndex]}
              </div>
            </div>
          </div>

          {/* Value proposition narrative */}
          <p className="text-pretty text-base leading-relaxed text-ink-soft sm:text-lg lg:text-xl font-normal max-w-2xl">
            {profile.tagline}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="btn group relative inline-flex items-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold tracking-wider text-bg uppercase transition-all hover:bg-accent/90 hover:shadow-[0_0_24px_rgba(194,164,255,0.45)]"
          >
            <span>Explore Work</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>

          <a
            href="#contact"
            className="btn group inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface/40 px-6 py-3.5 text-sm font-semibold tracking-wider text-ink uppercase backdrop-blur-md transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(194,164,255,0.15)]"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {profile.links.cv && (
            <a
              href={profile.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 rounded-lg border border-border/80 bg-surface/20 px-5 py-3.5 text-sm font-mono tracking-wider text-muted transition-all hover:border-border-strong hover:text-ink"
            >
              <FileText className="h-4 w-4 text-accent" />
              <span>Resume (PDF)</span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom Credibility Strip */}
      <div className="section-container relative z-10 mt-12 pt-8 border-t border-border/50">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {profile.highlights.map((h, i) => (
            <div
              key={h.label}
              className="group relative rounded-lg border border-border/40 bg-surface/30 p-4 backdrop-blur-sm transition-all hover:border-accent/40"
            >
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-accent uppercase">
                <Sparkles className="h-3 w-3" />
                <span>0{i + 1} &mdash; {h.label}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-ink">
                {h.value}
              </p>
            </div>
          ))
        }
        </div>
      </div>
    </section>
  );
}
