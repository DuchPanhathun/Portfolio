"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms, for revealing lists item by item. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
};

/** Hard ceiling: content is never allowed to stay hidden longer than this. */
const FAILSAFE_MS = 1200;

/**
 * Reveals children on first scroll into view.
 *
 * Uses IntersectionObserver directly rather than pulling in an animation
 * library. Visibility is treated as non-negotiable, so there are two safety
 * nets around the animation:
 *
 *  1. The hidden start state only applies when `.js` is on <html> (set before
 *     first paint), so with JavaScript disabled the page renders fully.
 *  2. A failsafe timer reveals the element regardless, in case the observer
 *     never fires in a given environment.
 *
 * `prefers-reduced-motion` is handled in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const failsafe = window.setTimeout(() => setVisible(true), FAILSAFE_MS);

    const reveal = () => {
      window.clearTimeout(failsafe);
      setVisible(true);
    };

    // If IntersectionObserver is unavailable, show immediately.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
