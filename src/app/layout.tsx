import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Set NEXT_PUBLIC_SITE_URL at build time once the real domain is known so
 * Open Graph/canonical URLs resolve absolutely.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://duchpanhathun.com";

const description =
  "Duch Panhathun is a software engineer specialising in applied machine learning and full-stack product engineering — computer vision, LLM pipelines, and the APIs and payment systems around them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // `role` already contains an em-dash, so a pipe keeps the title readable.
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "Duch Panhathun",
    "software engineer",
    "machine learning engineer",
    "AI engineer",
    "full-stack developer",
    "Python",
    "TypeScript",
    "Next.js",
    "FastAPI",
    "Cambodia",
    "Phnom Penh",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The bootstrap script below adds a `js` class to <html> before React
      // hydrates, so the server and client class lists differ by design.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          Marks JS as available before first paint, which is what switches on
          the scroll-reveal start state. Without it the page renders fully
          visible — content never depends on JavaScript to be readable.
        */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
