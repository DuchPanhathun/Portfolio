import type { ReactNode } from "react";

/** Small pill used for tech-stack chips and metadata. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] leading-none text-ink-soft">
      {children}
    </span>
  );
}
