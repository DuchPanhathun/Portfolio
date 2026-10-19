"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { openSourceProjects } from "@/content/open-source";
import { DetailModal } from "@/components/DetailModal";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Code,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";

type UnifiedWork = {
  slug: string;
  name: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  category: string;
  stack: string[];
  highlights: string[];
  repoUrl?: string;
  demoUrl?: string;
  links?: { label: string; href: string }[];
};

export function WorkSection() {
  const [selectedItem, setSelectedItem] = useState<UnifiedWork | null>(null);

  // Top 5 Curated Flagship Projects
  const ailsa = projects.find((p) => p.slug === "ailsa-grant-platform");
  const plant = projects.find((p) => p.slug === "plant-disease-recognition");
  const fraud = projects.find((p) => p.slug === "payment-fraud-detection");
  const coffee = projects.find((p) => p.slug === "coffee-business-management-system");
  const thunGateway = openSourceProjects.find((p) => p.slug === "thun-murex");

  const featuredWorks: UnifiedWork[] = [];
  if (ailsa) {
    featuredWorks.push({
      slug: ailsa.slug,
      name: ailsa.name,
      org: ailsa.org,
      role: ailsa.role,
      period: ailsa.period,
      summary: ailsa.summary,
      category: ailsa.category || "AI & Cloud Platforms",
      stack: ailsa.stack,
      highlights: ailsa.highlights,
      links: ailsa.links,
    });
  }
  if (plant) {
    featuredWorks.push({
      slug: plant.slug,
      name: plant.name,
      org: plant.org,
      role: plant.role,
      period: plant.period,
      summary: plant.summary,
      category: plant.category || "Computer Vision & AI/ML",
      stack: plant.stack,
      highlights: plant.highlights,
      links: plant.links,
    });
  }
  if (fraud) {
    featuredWorks.push({
      slug: fraud.slug,
      name: fraud.name,
      org: fraud.org,
      role: fraud.role,
      period: fraud.period,
      summary: fraud.summary,
      category: fraud.category || "Tabular ML & Research",
      stack: fraud.stack,
      highlights: fraud.highlights,
      links: fraud.links,
    });
  }
  if (coffee) {
    featuredWorks.push({
      slug: coffee.slug,
      name: coffee.name,
      org: coffee.org,
      role: coffee.role,
      period: coffee.period,
      summary: coffee.summary,
      category: coffee.category || "Production Web & Fintech ERP",
      stack: coffee.stack,
      highlights: coffee.highlights,
      links: coffee.links,
    });
  }
  if (thunGateway) {
    featuredWorks.push({
      slug: thunGateway.slug,
      name: thunGateway.name,
      org: "Open Source",
      role: thunGateway.role,
      period: thunGateway.period,
      summary: thunGateway.summary,
      category: thunGateway.category || "AI & Developer Systems",
      stack: thunGateway.stack,
      highlights: thunGateway.highlights,
      repoUrl: thunGateway.repoUrl,
      demoUrl: thunGateway.demoUrl,
      links: thunGateway.links,
    });
  }

  return (
    <section id="work" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>03 &mdash; Selected Work</span>
            </div>
            <h2 className="mt-3 text-balance font-extrabold tracking-tight uppercase text-ink text-3xl sm:text-5xl lg:text-6xl">
              SELECTED <span className="text-accent">WORKS</span>
            </h2>
            <p className="mt-4 text-base text-ink-soft sm:text-lg">
              Flagship machine learning deployments, enterprise web platforms, and open-source systems engineered for real-world impact.
            </p>
          </div>

          <Link
            href="/myworks"
            className="btn group inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface/50 px-5 py-3 font-mono text-xs font-semibold tracking-wider text-ink uppercase backdrop-blur-md transition-all hover:border-accent hover:text-accent sm:self-end"
          >
            <span>All Works Archive</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Work Grid Showcase */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((work, idx) => (
            <article
              key={work.slug}
              className="card-lift group relative flex flex-col justify-between rounded-2xl border border-border bg-surface/60 p-7 sm:p-8 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface/90"
            >
              {/* 4 Corner Crosshairs */}
              <div className="what-corner what-corner-tl" />
              <div className="what-corner what-corner-tr" />
              <div className="what-corner what-corner-bl" />
              <div className="what-corner what-corner-br" />

              <div>
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                    0{idx + 1}
                  </span>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                    {work.category}
                  </span>
                </div>

                {/* Title & Organization */}
                <div className="mt-5">
                  <h3 className="font-bold tracking-tight text-ink text-xl sm:text-2xl group-hover:text-accent transition-colors">
                    {work.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {work.org} &bull; {work.period}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-ink-soft line-clamp-3">
                    {work.summary}
                  </p>
                </div>

                {/* Highlights Sample */}
                {work.highlights && work.highlights.length > 0 && (
                  <div className="mt-5 space-y-1.5 border-t border-border/40 pt-4">
                    <div className="flex items-start gap-2 text-xs text-ink-soft">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                      <span className="line-clamp-2">{work.highlights[0]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Tech & Actions */}
              <div className="mt-8 pt-5 border-t border-border/50">
                {/* Tech tags preview */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {work.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-border/60 bg-bg/50 px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {work.stack.length > 4 && (
                    <span className="rounded border border-border/40 bg-bg/30 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                      +{work.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(work)}
                    className="btn inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-accent uppercase hover:underline cursor-pointer"
                  >
                    <Code className="h-3.5 w-3.5" />
                    <span>View Details</span>
                  </button>

                  {work.repoUrl && (
                    <a
                      href={work.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-ink transition-colors"
                      aria-label={`Source code for ${work.name}`}
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* 6th Card: Explore Complete Archive CTA */}
          <article className="card-lift group relative flex flex-col justify-between rounded-2xl border border-dashed border-accent/40 bg-surface/30 p-7 sm:p-8 backdrop-blur-sm transition-all hover:border-accent hover:bg-surface/50">
            <div className="what-corner what-corner-tl" />
            <div className="what-corner what-corner-tr" />
            <div className="what-corner what-corner-bl" />
            <div className="what-corner what-corner-br" />

            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                  06 / ARCHIVE
                </span>
                <FolderGit2 className="h-5 w-5 text-accent" />
              </div>

              <div className="mt-6">
                <h3 className="font-bold tracking-tight text-ink text-xl sm:text-2xl">
                  WANT TO SEE MORE?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Explore the complete catalog of open-source developer tools, AI agents, 3D extensions, games, and enterprise applications.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-border/50">
              <Link
                href="/myworks"
                className="btn group/btn flex items-center justify-center gap-2 w-full rounded-lg bg-accent/15 border border-accent/40 py-3 text-xs font-mono font-semibold tracking-wider text-accent uppercase hover:bg-accent hover:text-bg transition-all"
              >
                <span>Explore All Works</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Detail Modal Dialog */}
      {selectedItem && (
        <DetailModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.name}
          eyebrow={selectedItem.category}
          subtitle={selectedItem.org ? `${selectedItem.role} • ${selectedItem.org}` : selectedItem.role}
          badge={selectedItem.period}
          footer={
            <div className="flex flex-wrap items-center gap-3">
              {selectedItem.repoUrl && (
                <a
                  href={selectedItem.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-bg hover:opacity-90 transition-opacity"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {selectedItem.demoUrl && (
                <a
                  href={selectedItem.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedItem.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-mono text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs tracking-widest text-muted uppercase">
                Overview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {selectedItem.summary}
              </p>
            </div>

            {selectedItem.highlights && selectedItem.highlights.length > 0 && (
              <div>
                <h4 className="font-mono text-xs tracking-widest text-muted uppercase">
                  Engineering Highlights &amp; Architecture
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedItem.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-ink-soft leading-relaxed">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-mono text-xs tracking-widest text-muted uppercase">
                Technologies &amp; Architecture
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {selectedItem.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border/80 bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DetailModal>
      )}
    </section>
  );
}
