import { achievements, education, volunteering } from "@/content/credentials";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Calm section: each block (education, featured awards, remaining awards,
 * volunteering) reveals as one unit rather than row by row.
 */
export function Credentials() {
  const featured = achievements.filter((a) => a.featured);
  const rest = achievements.filter((a) => !a.featured);

  return (
    <Section
      id="credentials"
      eyebrow="06 — Background"
      title="Education & achievements"
    >
      {/* Education */}
      <Reveal>
        <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Education
        </h3>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
          {education.map((item) => (
            <li key={item.qualification} className="bg-surface px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p
                  className={
                    item.primary
                      ? "text-[15px] font-semibold text-ink"
                      : "text-[15px] text-ink-soft"
                  }
                >
                  {item.qualification}
                </p>
                <span className="font-mono text-xs text-muted">{item.date}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Featured achievements — the only part of this section with a stagger */}
      <Reveal>
        <h3 className="mt-14 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Achievements
        </h3>
      </Reveal>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {featured.map((a, i) => (
          <Reveal as="article" key={a.title} delay={i * 70}>
            <div className="card-quiet h-full rounded-xl border border-accent/25 bg-surface p-6 hover:border-accent/50">
              <p className="font-mono text-xs text-accent">{a.date}</p>
              <h4 className="mt-3 text-base font-semibold leading-snug text-ink">
                {a.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {a.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={60}>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
          {rest.map((a) => (
            <li key={a.title} className="bg-surface px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[15px] font-medium text-ink">{a.title}</p>
                <span className="font-mono text-xs text-muted">{a.date}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {a.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Volunteering — present, but never competing for attention */}
      <Reveal>
        <h3 className="mt-14 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Volunteering
        </h3>
        <ul className="mt-5 space-y-2.5">
          {volunteering.map((v) => (
            <li
              key={v.role}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-border/60 pb-2.5"
            >
              <span className="text-sm text-ink-soft">{v.role}</span>
              <span className="font-mono text-xs text-muted">{v.date}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
