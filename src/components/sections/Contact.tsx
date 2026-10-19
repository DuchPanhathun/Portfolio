"use client";

import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  FileText,
  Send,
  Globe,
} from "lucide-react";

export function Contact() {
  const { links } = profile;

  return (
    <section id="contact" className="relative py-24 sm:py-36 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <Send className="h-3.5 w-3.5" />
            <span>07 &mdash; Contact</span>
          </div>
          <h2 className="mt-3 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl">
            LET&apos;S WORK <span className="text-accent">TOGETHER</span>
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg max-w-2xl">
            Open to engineering roles and high-impact project collaborations, particularly where machine learning intersects with production software.
          </p>
        </div>

        {/* 3-Column Contact Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Col 1: Direct Communication */}
          <div className="card-lift group relative flex flex-col justify-between rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-md hover:border-accent/50">
            <div className="what-corner what-corner-tl" />
            <div className="what-corner what-corner-tr" />
            <div className="what-corner what-corner-bl" />
            <div className="what-corner what-corner-br" />

            <div>
              <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                <Mail className="h-4 w-4 text-accent" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-ink uppercase">
                  Direct Inquiries
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="font-mono text-[11px] text-muted uppercase">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1 block font-mono text-sm text-ink group-hover:text-accent transition-colors break-all"
                  >
                    {profile.email}
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] text-muted uppercase flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-accent" />
                    <span>Phone</span>
                  </p>
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                    className="mt-1 block font-mono text-sm text-ink hover:text-accent transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <a
                href={`mailto:${profile.email}`}
                className="btn inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-accent uppercase hover:underline"
              >
                <span>Send Message</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Social Portals & Repos */}
          <div className="card-lift group relative flex flex-col justify-between rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-md hover:border-accent/50">
            <div className="what-corner what-corner-tl" />
            <div className="what-corner what-corner-tr" />
            <div className="what-corner what-corner-bl" />
            <div className="what-corner what-corner-br" />

            <div>
              <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                <Globe className="h-4 w-4 text-accent" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-ink uppercase">
                  Portals &amp; Presence
                </h3>
              </div>

              <ul className="mt-5 space-y-3 font-mono text-xs">
                {links.github && (
                  <li>
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-ink-soft hover:text-accent transition-colors py-1"
                    >
                      <span className="flex items-center gap-2">
                        <GithubIcon className="h-3.5 w-3.5 text-accent" />
                        <span>GitHub</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                )}
                {links.linkedin && (
                  <li>
                    <a
                      href={links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-ink-soft hover:text-accent transition-colors py-1"
                    >
                      <span className="flex items-center gap-2">
                        <LinkedinIcon className="h-3.5 w-3.5 text-accent" />
                        <span>LinkedIn</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                )}
                {links.portfolio3D && (
                  <li>
                    <a
                      href={links.portfolio3D}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-ink-soft hover:text-accent transition-colors py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-accent" />
                        <span>3D Interactive Portfolio</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                )}
                {links.portfolio2D && (
                  <li>
                    <a
                      href={links.portfolio2D}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-ink-soft hover:text-accent transition-colors py-1"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-accent" />
                        <span>2D Classic Portfolio</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {links.cv && (
              <div className="mt-6 pt-4 border-t border-border/40">
                <a
                  href={links.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-accent uppercase hover:underline"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Download Curriculum Vitae</span>
                </a>
              </div>
            )}
          </div>

          {/* Col 3: Location & Availability */}
          <div className="card-lift group relative flex flex-col justify-between rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-md hover:border-accent/50">
            <div className="what-corner what-corner-tl" />
            <div className="what-corner what-corner-tr" />
            <div className="what-corner what-corner-bl" />
            <div className="what-corner what-corner-br" />

            <div>
              <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                <MapPin className="h-4 w-4 text-accent" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-ink uppercase">
                  Location &amp; Status
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="font-mono text-[11px] text-muted uppercase">Headquarters</p>
                  <p className="mt-1 font-mono text-sm text-ink">
                    {profile.location}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    UTC+7 (Indochina Time) &bull; Open to Remote &amp; Relocation
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-bg/50 p-3.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span>Current Availability</span>
                  </div>
                  <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
                    Available for select full-stack &amp; machine learning engineering contracts and full-time roles.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 text-xs text-muted font-mono">
              References available on request.
            </div>
          </div>
        </div>

        {/* Giant Monogram Typography Display */}
        <div className="mt-24 pt-12 border-t border-border/40 select-none pointer-events-none opacity-20 hover:opacity-30 transition-opacity text-center">
          <p className="font-extrabold uppercase tracking-tighter text-ink text-4xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-none">
            DUCH PANHATHUN
          </p>
        </div>
      </div>
    </section>
  );
}
