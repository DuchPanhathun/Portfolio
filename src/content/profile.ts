import type { Profile } from "./types";

export const profile: Profile = {
  name: "Duch Panhathun",
  role: "Software Engineer — AI/ML & Full-Stack",
  tagline:
    "I build applied machine learning and production web systems — from computer-vision models and LLM pipelines to the APIs, dashboards and payment flows around them.",
  location: "Phnom Penh, Cambodia",
  email: "duchpanhathun9@gmail.com",
  phone: "+855 16 222 054",

  about: [
    "I'm a software engineer working across applied machine learning and full-stack product engineering. Most recently I was a Python Engineer at Ailsa HQ Limited, a UK AI grant-funding platform, and an IT Consultant at Save the Children Cambodia — holding both roles concurrently through 2026.",
    "My work tends to sit where models meet real systems. On one side that means training deep-learning classifiers, engineering features for tabular models, and wiring LLM and embedding pipelines. On the other it means the unglamorous half that makes those things usable: REST APIs, access-control systems, payment integrations, admin dashboards and the deployment around them.",
    "A lot of that work has been for Cambodia and the region — crop-disease recognition delivered to farmers through a Telegram chatbot, a point-of-sale and ERP system for a coffee business, national QR payment rails, and bilingual Khmer/English interfaces. I care about software that reaches people who aren't well served by the default assumptions of most products.",
    "I graduated in Information Technology Engineering from the Royal University of Phnom Penh in 2025, and published my thesis research on payment-fraud detection independently.",
  ],

  highlights: [
    { label: "Published research", value: "Fraud detection, DOI-indexed" },
    { label: "Pan-SEA AI Challenge 2025", value: "Top 20 of 100+ ASEAN teams" },
    { label: "Core stack", value: "Python · TypeScript · AWS" },
  ],

  links: {
    portfolio2D: "https://www.duchpanhathun.com/",
    portfolio3D: "https://www.duchpanhathun.xyz/",

    // ---------------------------------------------------------------------
    // Not present in the CV, so intentionally left empty rather than invented.
    // Fill either in and the UI reveals the link automatically.
    // ---------------------------------------------------------------------
    github: "",
    linkedin: "",

    // Add a PDF at `public/cv.pdf` and set this to "/cv.pdf" to show the
    // "Download CV" button in the hero.
    cv: "",
  },
};
