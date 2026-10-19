"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { openSourceProjects } from "@/content/open-source";
import type { Project, OpenSourceProject } from "@/content/types";
import { DetailModal } from "@/components/DetailModal";
import { ArrowLeft, ArrowUpRight, ExternalLink, Code2, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

type UnifiedWork = {
  id: string;
  title: string;
  category: string;
  orgOrStatus: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  links?: { label: string; href: string }[];
  type: "project" | "open-source";
  source: Project | OpenSourceProject;
};

export function MyWorksClient() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedWork, setSelectedWork] = useState<UnifiedWork | null>(null);

  // Unify projects and openSourceProjects into a standard catalog
  const allWorks = useMemo<UnifiedWork[]>(() => {
    const pList: UnifiedWork[] = projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.name,
      category: p.category || "Production Web & Systems",
      orgOrStatus: p.org,
      period: p.period,
      summary: p.summary,
      highlights: p.highlights,
      stack: p.stack,
      links: p.links,
      type: "project",
      source: p,
    }));

    const osList: UnifiedWork[] = openSourceProjects.map((os) => ({
      id: `os-${os.slug}`,
      title: os.name,
      category: os.category || "Open Source & DevTools",
      orgOrStatus: os.role,
      period: os.period,
      summary: os.summary,
      highlights: os.highlights,
      stack: os.stack,
      repoUrl: os.repoUrl,
      demoUrl: os.demoUrl,
      links: os.links,
      type: "open-source",
      source: os,
    }));

    return [...pList, ...osList];
  }, []);

  const categories = [
    { id: "all", label: "All Works" },
    { id: "ai-ml", label: "AI & Machine Learning" },
    { id: "systems", label: "Production & ERP" },
    { id: "open-source", label: "Open Source Tools" },
  ];

  const filteredWorks = useMemo(() => {
    if (activeTab === "all") return allWorks;
    if (activeTab === "ai-ml") {
      return allWorks.filter(
        (w) =>
          w.category.toLowerCase().includes("ai") ||
          w.category.toLowerCase().includes("learning") ||
          w.category.toLowerCase().includes("vision"),
      );
    }
    if (activeTab === "systems") {
      return allWorks.filter(
        (w) =>
          w.type === "project" &&
          !w.category.toLowerCase().includes("learning") &&
          !w.category.toLowerCase().includes("vision"),
      );
    }
    if (activeTab === "open-source") {
      return allWorks.filter((w) => w.type === "open-source");
    }
    return allWorks;
  }, [allWorks, activeTab]);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto w-[var(--cWidth)] max-w-6xl px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted uppercase transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12 border-b border-border/80 pb-10">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
            01 — Catalog
          </p>
          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-ink sm:text-5xl uppercase">
            All Works <span className="text-accent">&amp;</span> Archive
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            A complete catalog of deployed production systems, machine learning
            architectures, and developer tools authored by Duch Panhathun.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs font-medium tracking-wider uppercase transition-all ${
                  activeTab === cat.id
                    ? "border border-accent bg-accent text-bg shadow-[0_0_15px_rgba(194,164,255,0.4)]"
                    : "border border-border/80 bg-surface/60 text-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Works */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorks.map((work, idx) => {
            const indexStr = String(idx + 1).padStart(2, "0");
            return (
              <article
                key={work.id}
                onClick={() => setSelectedWork(work)}
                className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-border/70 bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface/90 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              >
                {/* Top Corner Crosshair Decorator */}
                <div className="what-corner what-corner-tl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="what-corner what-corner-tr opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="what-corner what-corner-bl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="what-corner what-corner-br opacity-0 transition-opacity group-hover:opacity-100" />

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
                    <span className="text-accent/80">{indexStr}</span>
                    <span className="rounded-md border border-border/60 bg-surface-2 px-2 py-0.5 text-[10px] uppercase">
                      {work.category}
                    </span>
                  </div>

                  <h2 className="mt-4 font-mono text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {work.title}
                  </h2>

                  <p className="mt-1 text-xs font-medium text-accent/90">
                    {work.orgOrStatus}
                  </p>

                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-ink-soft">
                    {work.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/50 pt-4">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {work.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border/60 bg-surface/80 px-2 py-0.5 text-[10px] font-mono text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {work.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted">
                        +{work.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-muted group-hover:text-accent transition-colors">
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      <span>View Architecture</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Dialog */}
      <DetailModal
        isOpen={selectedWork !== null}
        onClose={() => setSelectedWork(null)}
        eyebrow={selectedWork?.category}
        title={selectedWork?.title}
        subtitle={selectedWork?.orgOrStatus}
        size="lg"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            <div className="text-xs font-mono text-muted">
              Period: {selectedWork?.period}
            </div>
            <div className="flex items-center gap-3">
              {selectedWork?.repoUrl && (
                <a
                  href={selectedWork.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-mono text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Repository</span>
                </a>
              )}
              {selectedWork?.demoUrl && (
                <a
                  href={selectedWork.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent bg-accent/10 px-3 py-1.5 text-xs font-mono text-accent transition-colors hover:bg-accent hover:text-bg"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedWork?.links?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-mono text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          </div>
        }
      >
        {selectedWork && (
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
                Overview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {selectedWork.summary}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
                Technical Highlights &amp; Architecture
              </h4>
              <ul className="mt-3 space-y-2.5">
                {selectedWork.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-semibold tracking-wider text-muted uppercase">
                Technology Stack
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedWork.stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-mono text-ink-soft"
                  >
                    <Code2 className="h-3 w-3 text-accent" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
