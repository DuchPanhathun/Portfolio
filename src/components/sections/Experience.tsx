"use client";

import { useState } from "react";
import type { ExperienceItem } from "@/content/types";
import { contractExperience, coreExperience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { DetailModal } from "@/components/DetailModal";

/** Parse comma/slash/bullet separated tech stacks into distinct clean badges */
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

/** Extract a concise summary to display on the compact card */
function getExperienceSummary(job: ExperienceItem): string {
  if (job.note) return job.note;
  if (job.groups && job.groups.length > 0) {
    return job.groups.map((g) => g.title).join(" · ");
  }
  if (job.points && job.points.length > 0) {
    return job.points[0];
  }
  return "Role details and engineering impact.";
}

/** Count total impact / achievement bullets across groups or point lists */
function getTotalPoints(job: ExperienceItem): number {
  if (job.groups) {
    return job.groups.reduce((acc, g) => acc + g.points.length, 0);
  }
  return job.points?.length || 0;
}

function ExperienceCard({
  job,
  index,
  onSelect,
}: {
  job: ExperienceItem;
  index: number;
  onSelect: () => void;
}) {
  const tags = getTechTags(job.stack).slice(0, 5);
  const summary = getExperienceSummary(job);
  const totalPoints = getTotalPoints(job);

  return (
    <Reveal as="article" delay={index * 80} className="h-full">
      <button
        type="button"
        onClick={onSelect}
        className="card-lift group relative flex h-full w-full flex-col justify-between rounded-xl border border-border bg-surface p-6 text-left transition-all hover:border-border-strong focus-visible:outline-2 focus-visible:outline-accent sm:p-7 cursor-pointer"
        aria-haspopup="dialog"
        aria-label={`View details for ${job.role} at ${job.org}`}
      >
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-muted">{job.period}</span>
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              Core Role
            </span>
          </div>

          <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            {job.role}
          </h3>

          <p className="mt-1 text-sm font-medium text-accent">{job.org}</p>

          <p className="mt-3.5 text-sm leading-relaxed text-ink-soft line-clamp-3">
            {summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {totalPoints > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {totalPoints} achievements
              </span>
            ) : null}
            {job.groups ? (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
                {job.groups.length} focus tracks
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-6 border-t border-border/70 pt-4">
          {tags.length > 0 ? (
            <div className="mb-3.5 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          ) : null}

          <div className="flex items-center justify-between text-xs font-medium text-accent">
            <span className="group-hover:underline">
              View details &amp; achievements
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

function ContractCard({
  job,
  onSelect,
}: {
  job: ExperienceItem;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="card-quiet group flex h-full w-full flex-col justify-between rounded-xl border border-border bg-surface p-5 text-left transition-all hover:border-border-strong hover:bg-surface-2/40 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
      aria-haspopup="dialog"
      aria-label={`View details for contract role: ${job.role} at ${job.org}`}
    >
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <span className="font-mono text-xs text-muted">{job.period}</span>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
            Contract
          </span>
        </div>

        <h4 className="mt-2 text-[15px] font-semibold text-ink transition-colors group-hover:text-accent">
          {job.role}
        </h4>

        <p className="mt-0.5 text-sm font-medium text-accent">{job.org}</p>

        {job.note ? (
          <p className="mt-2 text-xs leading-relaxed text-ink-soft line-clamp-2">
            {job.note}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-medium text-accent">
        <span className="group-hover:underline">Read details</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
    </button>
  );
}

export function Experience() {
  const [selectedJob, setSelectedJob] = useState<ExperienceItem | null>(null);

  return (
    <Section
      id="experience"
      eyebrow="04 — Experience"
      title="Where I've worked"
      intro="Two roles ran concurrently through 2026 — a UK AI platform and an NGO consultancy in Phnom Penh. Click any card to explore full project impact, responsibilities, and architecture."
    >
      {/* Core roles in compact card grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coreExperience.map((job, i) => (
          <ExperienceCard
            key={`${job.org}-${job.period}`}
            job={job}
            index={i}
            onSelect={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* Short contracts & freelance */}
      <Reveal>
        <div className="mt-16 flex items-center justify-between">
          <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Short-term contracts &amp; freelance
          </h3>
          <span className="font-mono text-xs text-muted">
            {contractExperience.length} assignments
          </span>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contractExperience.map((job) => (
            <ContractCard
              key={`${job.org}-${job.period}`}
              job={job}
              onSelect={() => setSelectedJob(job)}
            />
          ))}
        </div>
      </Reveal>

      {/* Detail Modal Dialog */}
      <DetailModal
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        eyebrow={
          selectedJob?.kind === "core"
            ? "04 — Experience Detail"
            : "Contract Assignment"
        }
        title={selectedJob?.role}
        subtitle={
          selectedJob ? (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-soft">
              <span className="font-semibold text-accent">{selectedJob.org}</span>
              <span className="text-muted" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs text-muted">
                {selectedJob.period}
              </span>
            </div>
          ) : undefined
        }
        badge={
          selectedJob ? (
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
                selectedJob.kind === "core"
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-surface-2 text-muted"
              }`}
            >
              {selectedJob.kind === "core" ? "Core Role" : "Contract"}
            </span>
          ) : undefined
        }
        size="xl"
        footer={
          selectedJob ? (
            <div className="flex w-full items-center justify-between gap-4">
              <span className="font-mono text-xs text-muted">
                {selectedJob.period}
              </span>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="btn rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-ink hover:border-border-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent"
              >
                Close
              </button>
            </div>
          ) : undefined
        }
      >
        {selectedJob ? (
          <div className="space-y-6">
            {selectedJob.note ? (
              <div className="rounded-xl border border-border bg-surface-2/60 p-4 text-sm text-ink-soft">
                <p className="font-mono text-[11px] font-semibold tracking-wider text-muted uppercase mb-1">
                  Overview
                </p>
                <p className="italic leading-relaxed">{selectedJob.note}</p>
              </div>
            ) : null}

            {selectedJob.points && selectedJob.points.length > 0 ? (
              <div>
                <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase mb-3.5">
                  Key Responsibilities &amp; Engineering Impact
                </h4>
                <ul className="space-y-3">
                  {selectedJob.points.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedJob.groups?.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-border bg-surface/80 p-5"
              >
                <h4 className="flex items-center gap-2.5 text-base font-semibold text-ink">
                  <span
                    className="h-2 w-2 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {group.title}
                </h4>
                <ul className="mt-3.5 space-y-3">
                  {group.points.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {selectedJob.stack ? (
              <div className="border-t border-border pt-5">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
                  Technologies &amp; Architecture
                </h4>
                <p className="mt-2.5 font-mono text-xs leading-relaxed text-ink-soft">
                  {selectedJob.stack}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {getTechTags(selectedJob.stack).map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </DetailModal>
    </Section>
  );
}
