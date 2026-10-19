import Link from "next/link";
import { profile } from "@/content/profile";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-surface/30 backdrop-blur-sm py-12 text-ink">
      <div className="mx-auto w-[var(--cWidth)] max-w-[var(--cMaxWidth)] px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Col 1: Identity & Location */}
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold tracking-wider text-ink uppercase">
              {profile.name}
            </p>
            <p className="text-xs text-muted">{profile.location}</p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block font-mono text-xs text-accent hover:underline pt-1"
            >
              {profile.email}
            </a>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold tracking-widest text-ink-soft uppercase">
              Navigation
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-muted">
              <li>
                <Link href="/#about" className="hover:text-accent transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#work" className="hover:text-accent transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-accent transition-colors">
                  Career &amp; Experience
                </Link>
              </li>
              <li>
                <Link href="/myworks" className="hover:text-accent transition-colors">
                  All Works Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Portals */}
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold tracking-widest text-ink-soft uppercase">
              Connect
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-muted">
              {profile.links.github && (
                <li>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              )}
              {profile.links.portfolio3D && (
                <li>
                  <a
                    href={profile.links.portfolio3D}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>3D Portfolio</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              )}
              {profile.links.cv && (
                <li>
                  <a
                    href={profile.links.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>Curriculum Vitae (PDF)</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Copyright & Credits */}
          <div className="space-y-2 text-xs font-mono text-muted md:text-right lg:text-right">
            <p className="text-ink-soft">
              Crafted with Next.js, Tailwind CSS &amp; GSAP
            </p>
            <p className="text-muted">
              &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
