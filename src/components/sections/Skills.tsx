import { skillGroups } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="05 — Skills"
      title="Technologies I work with"
      intro="Grouped by what they're for, rather than listed as one long wall of logos."
    >
      {/*
        One reveal for the entire grid. Staggering eight groups turned a
        reference section into a light show — this is a section people scan,
        so it should settle immediately.
      */}
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="h-full bg-surface p-6">
              <h3 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-[13px] leading-none text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
