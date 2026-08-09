import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { links } = profile;

  const externals = [
    { label: "Portfolio (3D)", href: links.portfolio3D },
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
  ].filter((l) => l.href);

  return (
    <Section
      id="contact"
      eyebrow="07 — Contact"
      title="Get in touch"
      intro="Open to engineering roles and project work, particularly where machine learning meets a real product."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="card-quiet group block h-full rounded-xl border border-border bg-surface p-6 hover:border-accent"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              Email
            </p>
            <p className="mt-2 break-all text-lg font-medium text-ink transition-colors duration-200 group-hover:text-accent">
              {profile.email}
            </p>
          </a>
        </Reveal>

        <Reveal delay={70}>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="card-quiet group block h-full rounded-xl border border-border bg-surface p-6 hover:border-accent"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              Phone
            </p>
            <p className="mt-2 text-lg font-medium text-ink transition-colors duration-200 group-hover:text-accent">
              {profile.phone}
            </p>
          </a>
        </Reveal>
      </div>

      {externals.length ? (
        <Reveal delay={140}>
          <div className="mt-6 rounded-xl border border-border bg-surface p-6">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              Elsewhere
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {externals.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={200}>
        <p className="mt-6 text-sm text-muted">
          Based in {profile.location}. References available on request.
        </p>
      </Reveal>
    </Section>
  );
}
