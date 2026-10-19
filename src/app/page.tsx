import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { WorkSection } from "@/components/sections/WorkSection";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { ResearchSection } from "@/components/sections/ResearchSection";
import { Credentials } from "@/components/sections/Credentials";
import { CTASection } from "@/components/sections/CTASection";
import { Contact } from "@/components/sections/Contact";
import { profile } from "@/content/profile";

/**
 * Structured data helps search engines and AI crawlers understand who this
 * page is about. Only facts already present on the page are described.
 */
function PersonJsonLd() {
  const sameAs = [
    profile.links.portfolio2D,
    profile.links.portfolio3D,
    profile.links.github,
    profile.links.linkedin,
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phnom Penh",
      addressCountry: "KH",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Royal University of Phnom Penh",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <div id="landingDiv">
        <Hero />
      </div>
      <About />
      <WhatIDo />
      <WorkSection />
      <Experience />
      <TechStack />
      <ResearchSection />
      <Credentials />
      <CTASection />
      <Contact />
    </>
  );
}
