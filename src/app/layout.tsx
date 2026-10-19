import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { SocialBar } from "@/components/ui/SocialBar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://duchpanhathun.com";

const description =
  "Duch Panhathun is a software engineer specialising in applied machine learning and full-stack product engineering — computer vision, LLM pipelines, and the APIs and payment systems around them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  themeColor: "#0b080c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="relative flex min-h-full flex-col bg-bg text-ink font-sans selection:bg-accent/30 selection:text-white">
        {/* Initial Interactive Physics Loading Gate */}
        <LoadingScreen />

        {/* Interactive Custom Magnetic Cursor */}
        <CustomCursor />

        {/* Lenis Smooth Scrolling Provider */}
        <SmoothScroll>
          {/* Atmospheric Ambient Glowing Orbs */}
          <div className="landing-circle1" aria-hidden="true" />
          <div className="landing-circle2" aria-hidden="true" />

          {/* Top navigation atmospheric gradient fade */}
          <div className="nav-top-fade" aria-hidden="true" />

          <Script id="js-flag" strategy="beforeInteractive">
            {`document.documentElement.classList.add('js')`}
          </Script>

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
          >
            Skip to content
          </a>

          {/* Floating Left/Bottom Social & Resume Dock */}
          <SocialBar />

          {/* Minimalist Floating Header */}
          <Header />

          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>

          {/* Editorial 3-Column Footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
