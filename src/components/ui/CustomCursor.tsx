"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!isFinePointer) return;

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-cursor="disable"]')) {
        setVisible(false);
        return;
      }
      setVisible(true);
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='icons']",
        )
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.18);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(194,164,255,0.8)] will-change-transform"
      />
      {/* Outer fluid aura ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full border border-accent/40 bg-accent/5 backdrop-blur-[0.5px] will-change-transform transition-[width,height,margin,background-color,border-color] duration-200 ease-out ${
          hovered
            ? "-ml-5 -mt-5 h-10 w-10 border-accent/80 bg-accent/15 scale-110"
            : "-ml-3.5 -mt-3.5 h-7 w-7 border-accent/35 bg-transparent"
        }`}
      />
    </div>
  );
}
