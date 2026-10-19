"use client";

import { useState } from "react";
import type { ExperienceItem } from "@/content/types";
import { coreExperience, contractExperience } from "@/content/experience";
import { DetailModal } from "@/components/DetailModal";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react";

function getTechTags(stackStr?: string): string[] {
  if (!stackStr) return [];
  const parts = stackStr.split("·").map((p) => p.trim());
  const tags: string[] = [];
  for (const part of parts) {
    if (part.includes("(") && part.includes(")")) {
      const main = part.split("(")[0].trim();
      if (main) tags.push(main);
    } else if (part.includes(",")) {
      part.split(",").forEach((sub) => {
        const trimmed = sub.trim();
        if (trimmed) tags.push(trimmed);
      });
    } else {
      if (part) tags.push(part);
    }
  }
  return Array.from(new Set(tags));
}

export function Experience() {
  const [selectedJob, setSelectedJob] = useState<ExperienceItem | null>(null);

  const allRoles = [...coreExperience, ...contractExperience];

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <Briefcase className="h-3.5 w-3.5" />
            <span>04 &mdash; Career &amp; Experience</span>
          </div>
          <h2 className="mt-3 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl">
            MY CAREER <span className="text-accent">&amp;</span><br className="hidden sm:inline" /> EXPERIENCE
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            A progressive track record delivering applied AI/ML pipelines and scalable web applications across international and regional organizations.
          </p>
        </div>

        {/* Timeline Rail Container */}
        <div className="relative mt-16">
          {/* Glowing Vertical Rail Line */}
          <div
            className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-transparent sm:left-6 shadow-[0_0_12px_rgba(194,164,255,0.4)]"
            aria-hidden="true"
          />

          {/* Timeline Items */}
          <div className="space-y-10">
            {allRoles.map((role, idx) => {
              const tags = getTechTags(role.stack).slice(0, 5);
              const isCore = role.kind === "core";

              return (
                <div key={`${role.role}-${role.period}-${idx}`} className="relative flex items-start gap-6 sm:gap-10">
                  {/* Illuminated Marker Dot */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent bg-bg shadow-[0_0_14px_rgba(194,164,255,0.6)] sm:h-12 sm:w-12">
                    <span className="h-2 w-2 rounded-full bg-accent sm:h-3 sm:w-3" />
                  </div>

                  {/* Role Content Card */}
                  <div className="card-lift group relative flex-1 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface/90">
                    {/* Corner Markers */}
                    <div className="what-corner what-corner-tl" />
                    <div className="what-corner what-corner-tr" />
                    <div className="what-corner what-corner-bl" />
                    <div className="what-corner what-corner-br" />

                    {/* Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{role.period}</span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
                          isCore
                            ? "border border-accent/40 bg-accent/15 text-accent"
                            : "border border-border bg-surface text-muted"
                        }`}
                      >
                        {isCore ? "Core Role" : "Contract / Advisory"}
                      </span>
                    </div>

                    {/* Role & Org */}
                    <div className="mt-4">
                      <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl group-hover:text-accent transition-colors">
                        {role.role}
                      </h3>
                      <h4 className="mt-1 font-mono text-sm text-ink-soft">
                        {role.org}
                      </h4>
                      {role.note && (
                        <p className="mt-2 text-xs text-muted">
                          {role.note}
                        </p>
                      )}
                    </div>

                    {/* Highlights Preview */}
                    {role.points && role.points.length > 0 && (
                      <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
                        <p className="text-xs leading-relaxed text-ink-soft line-clamp-2">
                          &bull; {role.points[0]}
                        </p>
                      </div>
                    )}

                    {role.groups && role.groups.length > 0 && (
                      <div className="mt-4 space-y-1.5 border-t border-border/40 pt-4">
                        <p className="font-mono text-[11px] text-accent tracking-wider uppercase">
                          Tracks: {role.groups.map((g) => g.title).join(" • ")}
                        </p>
                      </div>
                    )}

                    {/* Bottom Tech & Trigger */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-border/60 bg-bg/60 px-2 py-0.5 font-mono text-[11px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedJob(role)}
                        className="btn inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-accent uppercase hover:underline cursor-pointer"
                      >
                        <span>View Impact</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Experience Detail Modal */}
      {selectedJob && (
        <DetailModal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={selectedJob.role}
          eyebrow={selectedJob.org}
          subtitle={selectedJob.note || "Engineering Role & Accomplishments"}
          badge={selectedJob.period}
        >
          <div className="space-y-6">
            {selectedJob.groups ? (
              <div className="space-y-6">
                {selectedJob.groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="font-mono text-xs tracking-widest text-accent uppercase flex items-center gap-2">
                      <Sparkles className="h-3 w-3" />
                      <span>{group.title}</span>
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {group.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs text-ink-soft leading-relaxed">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : selectedJob.points ? (
              <div>
                <h4 className="font-mono text-xs tracking-widest text-muted uppercase">
                  Key Responsibilities &amp; Impact
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedJob.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-ink-soft leading-relaxed">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedJob.stack && (
              <div className="pt-4 border-t border-border/50">
                <h4 className="font-mono text-xs tracking-widest text-muted uppercase flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-accent" />
                  <span>Applied Tech Stack</span>
                </h4>
                <p className="mt-2 font-mono text-xs text-ink-soft leading-relaxed bg-surface p-3.5 rounded-lg border border-border/70">
                  {selectedJob.stack}
                </p>
              </div>
            )}
          </div>
        </DetailModal>
      )}
    </section>
  );
}
