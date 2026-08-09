import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const FOCUS_AREAS = [
  "Computer vision & deep learning",
  "Gradient-boosted tabular ML",
  "LLM & embedding pipelines",
  "Backend APIs & data pipelines",
  "Full-stack product engineering",
  "Payments & authentication systems",
];

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="What I work on">
      {/*
        Two reveals for the whole section — the prose block and the aside.
        Revealing each paragraph separately made a reading section feel busy.
      */}
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-5">
            {profile.about.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <aside className="rounded-xl border border-border bg-surface p-6">
            <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Focus areas
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              {FOCUS_AREAS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
