"use client";

import { useState } from "react";
import type {
  OpenSourceProject,
  OpenSourceProjectStatus,
} from "@/content/types";
import {
  additionalOpenSourceProjects,
  featuredOpenSourceProjects,
} from "@/content/open-source";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { DetailModal } from "@/components/DetailModal";

function StatusBadge({ status }: { status: OpenSourceProjectStatus }) {
  const statusLabels: Record<OpenSourceProjectStatus, string> = {
    active: "Active",
    completed: "Completed",
    "in-development": "In Dev",
    beta: "Beta",
    prototype: "Prototype",
  };

  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
        isActive
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border bg-surface-2 text-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-accent" : "bg-muted"
        }`}
        aria-hidden="true"
      />
      {statusLabels[status] ?? status}
    </span>
  );
}

function getProjectLinks(project: OpenSourceProject) {
  const links: { label: string; href: string }[] = [];
  if (project.repoUrl) {
    links.push({ label: "Source", href: project.repoUrl });
  }
  if (project.links) {
    for (const link of project.links) {
      if (link.href !== project.repoUrl && !links.some((l) => l.href === link.href)) {
        links.push({
          label: link.label === "GitHub" ? "Source" : link.label,
          href: link.href,
        });
      }
    }
  }
  if (project.demoUrl && !links.some((l) => l.href === project.demoUrl)) {
    links.push({ label: "Live Demo", href: project.demoUrl });
  }
  return links;
}

function OpenSourceCard({
  project,
  index,
  onSelect,
}: {
  project: OpenSourceProject;
  index: number;
  onSelect: () => void;
}) {
  return (
    <Reveal as="article" delay={index * 70} className="h-full">
      <div className="card-lift group relative flex h-full w-full flex-col justify-between rounded-xl border border-border bg-surface p-6 text-left transition-all hover:border-border-strong sm:p-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className="font-mono text-xs text-muted">{project.period}</span>
            <StatusBadge status={project.status} />
          </div>

          <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            <button
              type="button"
              onClick={onSelect}
              className="text-left transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
              aria-haspopup="dialog"
              aria-label={`View architecture for ${project.name}`}
            >
              {project.name}
            </button>
          </h3>

          {project.category ? (
            <p className="mt-1 text-sm font-medium text-accent">
              {project.category}
            </p>
          ) : null}

          <p className="mt-2 text-sm font-medium text-ink-soft">
            {project.tagline}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              {project.highlights.length} highlights
            </span>
            <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
              {project.role}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-border/70 pt-4">
          <div className="mb-3.5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
            {project.stack.length > 4 ? (
              <span className="font-mono text-[11px] text-muted self-center">
                +{project.stack.length - 4}
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <button
              type="button"
              onClick={onSelect}
              className="btn group/btn inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
              aria-haspopup="dialog"
              aria-label={`View architecture for ${project.name}`}
            >
              <span>View Architecture</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover/btn:translate-x-0.5"
              >
                →
              </span>
            </button>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-accent/50 hover:bg-surface-2/80 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                aria-label={`View source code for ${project.name}`}
              >
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Source</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CompactOpenSourceCard({
  project,
  onSelect,
}: {
  project: OpenSourceProject;
  onSelect: () => void;
}) {
  return (
    <article className="card-quiet group flex h-full w-full flex-col justify-between rounded-xl border border-border bg-surface p-5 text-left transition-all hover:border-border-strong hover:bg-surface-2/40">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className="font-mono text-xs text-muted">{project.period}</span>
          <StatusBadge status={project.status} />
        </div>

        <h4 className="mt-2 text-[15px] font-semibold text-ink transition-colors group-hover:text-accent">
          <button
            type="button"
            onClick={onSelect}
            className="text-left transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
            aria-haspopup="dialog"
            aria-label={`View architecture for ${project.name}`}
          >
            {project.name}
          </button>
        </h4>

        {project.category ? (
          <p className="mt-0.5 text-sm font-medium text-accent">
            {project.category}
          </p>
        ) : null}

        <p className="mt-2 text-xs leading-relaxed text-ink-soft line-clamp-2">
          {project.summary}
        </p>
      </div>

      <div className="mt-4 border-t border-border/50 pt-3">
        <div className="mb-2.5 flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onSelect}
            className="btn group/btn inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
            aria-haspopup="dialog"
            aria-label={`View architecture for ${project.name}`}
          >
            <span>View Architecture</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover/btn:translate-x-0.5"
            >
              →
            </span>
          </button>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-1 rounded border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-soft transition-colors hover:border-accent/50 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={`View source code for ${project.name}`}
            >
              <span>Source</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function OpenSource() {
  const [selectedProject, setSelectedProject] =
    useState<OpenSourceProject | null>(null);

  const links = selectedProject ? getProjectLinks(selectedProject) : [];

  return (
    <Section
      id="open-source"
      eyebrow="03 — Open Source"
      title="Open source & tools"
      intro="Independent developer tools, game engineering systems, and automation software. Click 'View Architecture' on any card to explore full architecture highlights, or 'Source' to visit repositories."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredOpenSourceProjects.map((project, i) => (
          <OpenSourceCard
            key={project.slug}
            project={project}
            index={i}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {additionalOpenSourceProjects.length > 0 ? (
        <>
          <Reveal>
            <div className="mt-16 flex items-center justify-between">
              <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                More open source &amp; utilities
              </h3>
              <span className="font-mono text-xs text-muted">
                {additionalOpenSourceProjects.length} projects
              </span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {additionalOpenSourceProjects.map((project) => (
                <CompactOpenSourceCard
                  key={project.slug}
                  project={project}
                  onSelect={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </Reveal>
        </>
      ) : null}

      {/* Detail Modal Dialog */}
      <DetailModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        eyebrow={
          selectedProject?.category
            ? `03 — ${selectedProject.category}`
            : "Open Source"
        }
        title={selectedProject?.name}
        subtitle={
          selectedProject ? (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-soft">
              <span className="font-semibold text-accent">
                {selectedProject.role}
              </span>
              <span className="text-muted" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs text-muted">
                {selectedProject.period}
              </span>
            </div>
          ) : undefined
        }
        badge={
          selectedProject ? (
            <StatusBadge status={selectedProject.status} />
          ) : undefined
        }
        size="xl"
        footer={
          selectedProject ? (
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent hover:border-accent hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {l.label === "GitHub" || l.label === "Source" || l.label.includes("Source") ? (
                      <svg
                        className="h-3.5 w-3.5 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    ) : null}
                    <span>{l.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="btn rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-ink hover:border-border-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent"
              >
                Close
              </button>
            </div>
          ) : undefined
        }
      >
        {selectedProject ? (
          <div className="space-y-6">
            {selectedProject.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedProject.image}
                alt={`${selectedProject.name} preview`}
                className="w-full rounded-xl border border-border"
              />
            ) : null}

            <div className="rounded-xl border border-border bg-surface-2/60 p-4 text-sm text-ink-soft">
              <p className="font-mono text-[11px] font-semibold tracking-wider text-muted uppercase mb-1">
                Overview
              </p>
              <p className="font-medium text-ink mb-1.5">
                {selectedProject.tagline}
              </p>
              <p className="leading-relaxed text-ink-soft">
                {selectedProject.description || selectedProject.summary}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase mb-3.5">
                Key Architecture &amp; Engineering Highlights
              </h4>
              <ul className="space-y-3">
                {selectedProject.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-5">
              <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase mb-3">
                Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            {links.length > 0 ? (
              <div className="border-t border-border pt-5">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase mb-3">
                  Repository &amp; Source Links
                </h4>
                <div className="flex flex-wrap gap-3">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3.5 py-2 text-xs font-medium text-accent hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span>{l.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
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
