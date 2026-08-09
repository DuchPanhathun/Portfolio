import { profile } from "@/content/profile";

/**
 * Hero entrance is pure CSS (`.hero-item`), staged with animation delays.
 *
 * The hero is always above the fold, so there is nothing for a scroll
 * observer to detect — using CSS here removes six IntersectionObservers,
 * animates before hydration, and works with JavaScript disabled.
 */
const stage = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const { links } = profile;

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center pt-24 pb-16 sm:min-h-screen"
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <p
          className="hero-item flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-muted uppercase"
          style={stage(0)}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          {profile.location}
        </p>

        <h1
          className="hero-item mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          style={stage(60)}
        >
          {profile.name}
        </h1>

        <p
          className="hero-item mt-4 text-lg font-medium text-accent sm:text-xl"
          style={stage(120)}
        >
          {profile.role}
        </p>

        {/* Accent rule draws in once, tying the name to the value proposition. */}
        <div
          className="hero-rule mt-6 h-px w-16 bg-accent"
          aria-hidden="true"
        />

        <p
          className="hero-item mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg"
          style={stage(180)}
        >
          {profile.tagline}
        </p>

        {/* Calls to action — only links that actually exist are rendered */}
        <div
          className="hero-item mt-9 flex flex-wrap items-center gap-3"
          style={stage(240)}
        >
          <a
            href="#projects"
            className="btn rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="btn rounded-lg border border-border-strong px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
          {links.cv ? (
            <a
              href={links.cv}
              className="btn rounded-lg border border-border-strong px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          ) : null}
          {links.github ? (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn rounded-lg border border-border-strong px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          ) : null}
          {links.linkedin ? (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="btn rounded-lg border border-border-strong px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          ) : null}
        </div>

        {/* Credibility strip */}
        <dl
          className="hero-item mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3"
          style={stage(310)}
        >
          {profile.highlights.map((h) => (
            <div key={h.label} className="bg-surface px-5 py-4">
              <dt className="font-mono text-[11px] tracking-wide text-muted uppercase">
                {h.label}
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
