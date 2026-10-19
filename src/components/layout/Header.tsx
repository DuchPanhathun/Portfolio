"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/content/profile";
import { Mail, ArrowUpRight } from "lucide-react";

const NAV = [
  { id: "about", label: "ABOUT", href: "/#about" },
  { id: "work", label: "WORK", href: "/#work" },
  { id: "experience", label: "EXPERIENCE", href: "/#experience" },
  { id: "myworks", label: "ALL WORKS", href: "/myworks" },
  { id: "play", label: "PLAY", href: "/play" },
  { id: "contact", label: "CONTACT", href: "/#contact" },
];

function HoverLink({
  href,
  label,
  active,
  onClick,
  external,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  external?: boolean;
}) {
  const content = (
    <span className="hover-link-inner">
      <span className="hover-link-text">{label}</span>
      <span className="hover-link-text text-accent" aria-hidden="true">
        {label}
      </span>
    </span>
  );

  const className = `hover-link relative rounded-sm px-2.5 py-1 text-xs font-mono tracking-widest uppercase transition-colors ${
    active ? "text-accent" : "text-muted hover:text-ink"
  }`;

  if (href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {content}
    </a>
  );
}

export function Header() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = ["about", "work", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-bg/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-[var(--cWidth)] max-w-[var(--cMaxWidth)] items-center justify-between px-4 sm:px-8">
        {/* Left: Initials Logo */}
        <Link
          href="/#"
          aria-label="Duch Panhathun Home"
          className="group flex items-center gap-1.5 font-mono text-base font-bold tracking-tight text-ink transition-transform hover:scale-105"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/70 text-sm font-semibold text-ink group-hover:border-accent/60 group-hover:text-accent transition-all duration-300">
            DP
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
        </Link>

        {/* Center: Email Direct Link */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-3.5 py-1 backdrop-blur-md hover:border-accent/40 transition-colors">
          <Mail className="h-3.5 w-3.5 text-accent" />
          <a
            href={`mailto:${profile.email}`}
            className="text-xs font-mono text-ink-soft hover:text-accent transition-colors"
          >
            {profile.email}
          </a>
        </div>

        {/* Right: Desktop Navigation */}
        <nav aria-label="Primary Navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <HoverLink
                  href={item.href}
                  label={item.label}
                  active={active === item.id}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/60 text-ink backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent md:hidden"
        >
          <span className="relative block h-3.5 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-b border-border bg-bg/95 backdrop-blur-xl md:hidden transition-all"
      >
        <nav aria-label="Mobile Navigation" className="px-6 py-6">
          <ul className="flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.id} className="border-b border-border/40 pb-2.5 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between text-sm font-mono tracking-widest uppercase transition-colors ${
                    active === item.id ? "text-accent" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-border/50">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              <span>{profile.email}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
