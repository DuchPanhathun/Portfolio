import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  /** Small monospace label above the heading, e.g. "02 — Projects". */
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Standard section shell: consistent rhythm, heading hierarchy and eyebrow
 * across the whole page, so every section reads as part of one system.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
              {intro}
            </p>
          ) : null}
          <div
            className="hairline mt-8 h-px w-full"
            aria-hidden="true"
            role="presentation"
          />
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
