import { research } from "@/content/credentials";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ResearchSection() {
  return (
    <Section
      id="research"
      eyebrow="04 — Research"
      title="Published research"
      intro="My undergraduate thesis, published independently and DOI-indexed."
    >
      <Reveal>
        <article className="card-quiet rounded-xl border border-border bg-surface p-6 hover:border-border-strong sm:p-8">
          <h3 className="text-balance text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
            {research.title}
          </h3>

          <p className="mt-3 text-sm text-muted">
            {research.institution} · {research.date}
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            {research.summary}
          </p>

          {/* Metrics — the numbers are the fastest way to convey the result */}
          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {research.metrics.map((m) => (
              <div key={m.label} className="bg-surface-2 px-4 py-4 text-center">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-mono text-xl font-semibold text-accent sm:text-2xl">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-[11px] leading-tight text-muted">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-7 space-y-2.5">
            {research.points.map((p) => (
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

          <a
            href={research.doiUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            <span className="font-mono text-xs">DOI</span>
            {research.doi} →
          </a>
        </article>
      </Reveal>
    </Section>
  );
}
