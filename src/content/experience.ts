import type { ExperienceItem } from "./types";

/** Dates are reproduced exactly as they appear in the CV. */
export const experience: ExperienceItem[] = [
  {
    kind: "core",
    role: "Python Engineer",
    org: "Ailsa HQ Limited",
    period: "25 May 2025 – 31 Aug 2026",
    note: "AI-powered grant-funding discovery and application platform (UK)",
    points: [
      "Built the platform's production scraping tier — five funder-specific scrapers for major UK and EU funding bodies, each with a distinct extraction strategy and dedicated automated test coverage.",
      "Designed the data-normalisation layer mapping five heterogeneous funder sources onto one shared grant model, plus a legacy-schema compatibility adapter.",
      "Built an LLM-based classification and structured-extraction layer, provider-agnostic across OpenAI and Anthropic.",
      "Contributed to the AI grant-matching engine using embedding-based vector search, and built machine learning for opportunity-to-company matching.",
      "Bootstrapped and served as primary engineer for the customer-facing SaaS application, authoring the founding commit and ~62% of all commits.",
      "Designed a department- and section-level access-control system enforced across both the admin tool and the customer app.",
      "Designed a service-to-service authentication mechanism letting an external AI agent report structured data back into the production API.",
      "Implemented an asynchronous scraping pipeline on AWS SQS with MongoDB-backed status tracking and audit logging.",
    ],
    stack:
      "Python/FastAPI microservices · Next.js · Node.js/Express · MongoDB · AWS (EC2, ECS, Lambda, SQS, S3, EventBridge, CloudWatch, Parameter Store, Amplify, Route 53) · Auth0 · OpenAI & Anthropic · Docker, Terraform, GitHub Actions",
  },

  {
    kind: "core",
    role: "IT Consultant",
    org: "Save the Children Cambodia",
    period: "16 Nov 2025 – Jun 2026",
    groups: [
      {
        title: "Plant Disease Recognition (AI/ML)",
        points: [
          "Trained deep-learning and machine-learning models for crop disease recognition, deployed through a Telegram chatbot — ConvNeXt-Large, EfficientNet-B5 and Swin-B for the cucumber family; Xception and DenseNet121 for cauliflower — achieving higher accuracy than comparable published research.",
          "Built complete training pipelines in both PyTorch and TensorFlow/Keras, including focal loss, mixed-precision training, cosine LR scheduling, stratified splitting and augmentation.",
          "Built a weather advisory microservice combining government meteorological data with the Windy API, localised into Khmer.",
          "Built and deployed the bilingual admin/CMS dashboard with automated weather-alert cron jobs.",
        ],
      },
      {
        title: "Coffee Business Management System",
        points: [
          "Built an end-to-end system spanning a POS terminal, ERP dashboard, customer ordering website and Telegram Mini App.",
          "POS and ERP (Angular + NestJS): dual-currency USD/KHR denomination-level cash handling, payroll, purchasing, profit-and-loss reporting, and a live recipe-costing engine.",
          "Customer web (Next.js + NestJS): ordering, a stored-value wallet and a gamified loyalty system.",
          "Integrated Cambodian QR payment rails (Bakong/KHQR, ABA PayWay) and an OpenAI-driven loyalty badge feature with validation and deterministic fallback.",
          "Implemented an idempotency-key interceptor making payment endpoints safe against client retries.",
        ],
      },
    ],
    stack:
      "PyTorch, TensorFlow/Keras, Python · Angular, NestJS, Next.js, TypeScript · PostgreSQL · Telegram Bot API & Mini Apps · Socket.IO · Docker",
  },

  {
    kind: "core",
    role: "IT Intern",
    org: "Save the Children Cambodia",
    period: "1 Feb 2024 – 1 Mar 2025",
    points: [
      "Built the Remote Positive Parenting platform — a Khmer-language website and Telegram chatbot — including the admin CMS and a campaign/quiz broadcast scheduler.",
      "Built a machine-learning model for cucumber-family plant disease recognition, served through a Telegram chatbot.",
      "Built the Partnership Management System, including a four-level Cambodian administrative geography hierarchy, document management, a report review workflow and role-based access control. Authored ~85% of both backend and frontend.",
    ],
    stack: "React, Firebase · Python, Flask · Laravel, Next.js, PostgreSQL, Docker",
  },

  {
    kind: "contract",
    role: "Data Collector",
    org: "Vikasa Advisory and Academy",
    period: "28 Apr – 8 May 2026",
  },
  {
    kind: "contract",
    role: "Web Development Consultant",
    org: "CCYMCR",
    period: "16 – 30 Mar 2026",
    note: "Built a bilingual NGO website with a hand-built CMS spanning ~30 editable content sections.",
  },
  {
    kind: "contract",
    role: "Web Developer",
    org: "Garden Options (Scottish Borders, UK)",
    period: "16 – 30 Dec 2025",
    note: "Single-page marketing site in Framer with a custom React contact-form component wired to EmailJS.",
  },
  {
    kind: "contract",
    role: "Freelance Data Interpretation",
    org: "CWEA Project",
    period: "28 Mar – 1 May 2025",
    note: "Data interpretation and visualisation (Python, Excel).",
  },
  {
    kind: "contract",
    role: "Freelance Data Collector",
    org: "Confluences Asie Co., Ltd.",
    period: "12 Sep – 2 Oct 2023",
  },
];

export const coreExperience = experience.filter((e) => e.kind === "core");
export const contractExperience = experience.filter((e) => e.kind === "contract");
