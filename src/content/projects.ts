import type { Project } from "./types";

/**
 * Projects are drawn from the CV's experience entries. Wording follows the CV;
 * no results, metrics or outcomes are claimed beyond what it states.
 */
export const projects: Project[] = [
  {
    slug: "ailsa-grant-platform",
    name: "AI Grant-Funding Platform",
    org: "Ailsa HQ Limited",
    period: "May 2025 – Aug 2026",
    summary:
      "A six-service platform that helps businesses discover grant funding, match against it, and manage their applications — with AI integrated throughout.",
    role: "Python Engineer — built the production scraping tier and the customer-facing application, and contributed to the matching engine and API gateway.",
    highlights: [
      "Built five funder-specific scrapers for major UK and EU funding bodies, each using a different extraction strategy: undocumented JSON API reverse-engineering, HTML parsing, hybrid headless-browser fallback, and sitemap-less crawling — with dedicated automated test coverage for each.",
      "Designed the normalisation layer mapping five heterogeneous funder sources onto a single grant model, plus a compatibility adapter bridging a new schema onto the platform's legacy one.",
      "Built a provider-agnostic LLM classification and structured-extraction layer across OpenAI and Anthropic, filtering scraped pages down to relevant application data.",
      "Bootstrapped and served as primary engineer for the customer-facing SaaS app from an empty repository — authoring the founding commit and ~62% of all commits.",
      "Designed a department- and section-level access-control system, deriving section ownership transitively from user–department membership rather than requiring a schema migration.",
      "Contributed to the AI matching engine, pairing funding opportunities to company profiles using embedding-based vector search.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "MongoDB",
      "AWS SQS",
      "Auth0",
      "OpenAI",
      "Anthropic",
      "Docker",
    ],
    featured: true,
  },

  {
    slug: "plant-disease-recognition",
    name: "Plant Disease Recognition",
    org: "Save the Children Cambodia",
    period: "Nov 2025 – Jun 2026",
    summary:
      "Deep-learning models that identify diseases in cucumber and cauliflower crops from a photo, delivered to farmers through a Telegram chatbot that also recommends treatment.",
    role: "Trained the models and built the surrounding services — the weather advisory microservice and the admin dashboard.",
    highlights: [
      "Trained and deployed deep-learning models across two crop families — ConvNeXt-Large and EfficientNet-B5 for cucumber (98.06% test accuracy, 94.82% macro-F1 across 7 classes) and EfficientNetB3 for cauliflower (99.74% test accuracy, 99.68% macro-F1 across 5 classes), each measured on a held-out test split.",
      "Built complete training pipelines in both PyTorch and TensorFlow/Keras: focal loss for class imbalance, mixed-precision training, cosine learning-rate scheduling, stratified splitting and augmentation, resolving non-trivial Keras 3.x / HuggingFace compatibility issues along the way.",
      "Built a weather advisory microservice combining government meteorological data with the Windy API, localised into Khmer and deployed as both a scheduled scraper and a REST API.",
      "Built and deployed the bilingual admin dashboard, including automated weather-alert cron jobs.",
    ],
    stack: [
      "PyTorch",
      "TensorFlow / Keras",
      "Python",
      "Telegram Bot API",
      "Next.js",
      "Docker",
    ],
    featured: true,
  },

  {
    slug: "coffee-business-system",
    name: "Coffee Business Management System",
    org: "Save the Children Cambodia",
    period: "Nov 2025 – Jun 2026",
    summary:
      "An end-to-end system for running a coffee business: a point-of-sale terminal, an ERP back office, a customer ordering website, and a Telegram Mini App.",
    role: "Built the system across all four surfaces, including the loyalty backend and payment integrations.",
    highlights: [
      "POS and ERP dashboard (Angular + NestJS): a cashier terminal with dual-currency USD/KHR denomination-level cash handling, plus back-office payroll, purchasing, profit-and-loss reporting, and a recipe-costing engine computing live food-cost margins from ingredient stock.",
      "Customer ordering website (Next.js + NestJS): menu ordering, a stored-value wallet, and a gamified loyalty system of points, rank tiers, missions and collectible stamps.",
      "Telegram Mini App (TypeScript): conversational ordering, account linking and order notifications.",
      "Integrated Cambodian QR payment rails (Bakong/KHQR and ABA PayWay) — QR intent generation, polling-based settlement and bank-app deep-linking.",
      "Integrated OpenAI structured-output generation to assign personalised loyalty badges, validated against a closed catalogue with a deterministic fallback so an AI failure can never break a transaction.",
      "Implemented an idempotency-key interceptor making payment-mutating endpoints safe against client retries.",
    ],
    stack: [
      "Angular",
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Telegram Mini Apps",
      "Bakong KHQR",
      "OpenAI",
    ],
    featured: true,
  },

  {
    slug: "partnership-management-system",
    name: "Partnership Management System",
    org: "Save the Children Cambodia",
    period: "Feb 2024 – Mar 2025",
    summary:
      "An internal system for managing partnership records and organisational relationships, built around Cambodia's real administrative geography.",
    role: "Authored roughly 85% of both the backend and the frontend.",
    highlights: [
      "Modelled a four-level Cambodian administrative geography hierarchy — province → district → commune → village — with cascading dependent address selection on the frontend and eager-loaded hierarchical queries on the backend.",
      "Built multi-file document management, a report submission and review workflow, and role-based access control.",
      "Containerised the full stack for both development and production.",
    ],
    stack: ["Laravel", "Next.js", "PostgreSQL", "Docker"],
    featured: true,
  },

  {
    slug: "ccymcr",
    name: "CCYMCR Website & CMS",
    org: "Cambodia Children and Young People Movement for Child Rights",
    period: "Mar 2026",
    summary:
      "A website for a children's-rights NGO with a hand-built content management system, so non-technical staff can update every part of the site themselves.",
    role: "Web Development Consultant — designed and built the site end to end.",
    highlights: [
      "Built a section-based CMS spanning around 30 independently editable content areas, as a deliberate alternative to adopting a third-party CMS.",
      "Fully bilingual English/Khmer content architecture at the schema level.",
      "An interactive province map of the organisation's operating areas, a partner-network directory, and a donor-facing financial transparency section.",
    ],
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Leaflet", "Vercel"],
    featured: false,
  },

  {
    slug: "garden-options",
    name: "Garden Options Website",
    org: "Garden Options — Scottish Borders, UK",
    period: "Dec 2025",
    summary:
      "A single-page, conversion-focused marketing site for a family-run landscaping business, published to a live custom domain.",
    role: "Web Developer — built and published the site, including a custom code component for the contact form.",
    highlights: [
      "Developed a custom React code component for the contact form inside Framer's code-override system — controlled inputs, client-side validation, an async idle/sending/success/error state machine, and a live EmailJS integration delivering enquiries with no backend server.",
      "Implemented breakpoint-specific layouts rather than simple reflow: an interactive, image-synced accordion on desktop, replaced by a simplified stacked layout on touch devices.",
      "Built reusable parametrised components, scroll-triggered animations and a lazily-hydrated gallery, plus full on-page SEO.",
    ],
    stack: ["Framer", "React", "EmailJS"],
    featured: false,
  },

  {
    slug: "positive-parenting",
    name: "Remote Positive Parenting Platform",
    org: "Save the Children Cambodia",
    period: "Feb 2024 – Mar 2025",
    summary:
      "A Khmer-language website and Telegram chatbot broadcasting parenting and child-protection guidance to parents.",
    role: "Built the admin content-management system and the broadcast scheduling tools.",
    highlights: [
      "Built the admin CMS: multi-format media upload, rich-text editing, and a dynamic tagging system staff can extend themselves.",
      "Built a campaign and quiz broadcast scheduler letting staff queue timed messages for later delivery.",
      "Also trained an earlier cucumber-family plant-disease model served through a Telegram chatbot.",
    ],
    stack: ["React", "Firebase", "Python", "Flask", "Telegram Bot API"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);
