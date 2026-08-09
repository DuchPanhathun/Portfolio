import type { Project } from "@/content/types";
import { additionalProjects, featuredProjects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";

/**
 * Featured projects are one of the two places (with the hero) given extra
 * personality: a light per-card stagger on reveal, and a lift on hover.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article" delay={index * 80}>
      <div className="card-lift h-full rounded-xl border border-border bg-surface p-6 sm:p-8">
        {/*
          Image slot — intentionally omitted while no screenshots exist.
          Set `image` in content/projects.ts to enable it.
        */}
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.name} interface`}
            className="mb-6 w-full rounded-lg border border-border"
          />
        ) : null}

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-ink">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-muted">{project.period}</span>
        </div>

        <p className="mt-1 text-sm font-medium text-accent">{project.org}</p>

        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        <div className="mt-5 border-l-2 border-accent/40 pl-4">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            My role
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            {project.role}
          </p>
        </div>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-sm leading-relaxed text-ink-soft"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {project.links?.length ? (
          <div className="mt-5 flex flex-wrap gap-4">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {l.label} →
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <article className="card-quiet h-full rounded-xl border border-border bg-surface p-6 hover:border-border-strong">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        <span className="font-mono text-xs text-muted">{project.period}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-accent">{project.org}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {project.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="02 — Projects"
      title="Selected work"
      intro="Each of these shipped for a real organisation. Descriptions cover what the system does, my own role, and the technical decisions that mattered most."
    >
      <div className="grid gap-6">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <Reveal>
        <h3 className="mt-16 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Also built
        </h3>
      </Reveal>

      {/* Secondary tier: one reveal for the group, no per-card stagger. */}
      <Reveal delay={60}>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {additionalProjects.map((project) => (
            <CompactCard key={project.slug} project={project} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
