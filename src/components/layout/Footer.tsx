import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-muted">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
