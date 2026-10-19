"use client";

import { profile } from "@/content/profile";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function SocialBar() {
  const socials = [
    {
      name: "GitHub",
      href: profile.links.github || "https://github.com/DuchPanhathun",
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      href: profile.links.linkedin || "https://linkedin.com",
      icon: LinkedinIcon,
      show: Boolean(profile.links.linkedin),
    },
    {
      name: "Email",
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
  ].filter((s) => s.show !== false && Boolean(s.href));

  return (
    <aside
      aria-label="Social and Resume Links"
      className="fixed bottom-8 left-6 z-40 hidden flex-col items-center gap-4 lg:flex"
    >
      {/* Social Icon Dock */}
      <div
        data-cursor="icons"
        className="flex flex-col items-center gap-2.5 rounded-full border border-border/80 bg-surface/80 p-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:border-accent/40"
      >
        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={item.name}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent/15 hover:text-accent"
            >
              <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs font-mono text-ink opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Resume Pill Button */}
      {profile.links.cv && (
        <a
          href={profile.links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface/90 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider text-accent backdrop-blur-md shadow-[0_4px_20px_rgba(194,164,255,0.12)] transition-all hover:border-accent hover:bg-accent hover:text-bg hover:shadow-[0_0_20px_rgba(194,164,255,0.4)]"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>RESUME</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}

      {/* Vertical Subtle Guide Line */}
      <div className="h-12 w-px bg-gradient-to-b from-border to-transparent" />
    </aside>
  );
}
