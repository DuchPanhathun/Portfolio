import { contractExperience, coreExperience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Experience is an informational section, so motion is deliberately calm:
 * one reveal per role (not per bullet), and the contract list reveals as a
 * single block rather than row by row.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 — Experience"
      title="Where I've worked"
      intro="Two roles ran concurrently through 2026 — a UK AI platform and an NGO consultancy in Phnom Penh."
    >
      <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
        {coreExperience.map((job, i) => (
          <Reveal as="li" key={`${job.org}-${job.period}`} delay={i * 70}>
            <span
              aria-hidden="true"
              className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight text-ink">
                {job.role}
              </h3>
              <span className="font-mono text-xs text-muted">{job.period}</span>
            </div>

            <p className="mt-1 text-sm font-medium text-accent">{job.org}</p>

            {job.note ? (
              <p className="mt-1 text-sm text-muted italic">{job.note}</p>
            ) : null}

            {job.points ? (
              <ul className="mt-4 space-y-2.5">
                {job.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {job.groups?.map((group) => (
              <div key={group.title} className="mt-5">
                <h4 className="text-sm font-semibold text-ink">{group.title}</h4>
                <ul className="mt-2.5 space-y-2.5">
                  {group.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {job.stack ? (
              <p className="mt-5 font-mono text-xs leading-relaxed text-muted">
                {job.stack}
              </p>
            ) : null}
          </Reveal>
        ))}
      </ol>

      {/* Short contracts — compact, so they don't compete with the core roles */}
      <Reveal>
        <h3 className="mt-16 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Short-term contracts &amp; freelance
        </h3>
      </Reveal>

      <Reveal delay={60}>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
          {contractExperience.map((job) => (
            <li key={`${job.org}-${job.period}`} className="bg-surface px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[15px] font-medium text-ink">
                  {job.role} <span className="text-accent">— {job.org}</span>
                </p>
                <span className="font-mono text-xs text-muted">{job.period}</span>
              </div>
              {job.note ? (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {job.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
