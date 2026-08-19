import type { SkillGroup } from "./types";

/**
 * Groups and items mirror the CV's technical-skills table exactly.
 *
 * Order is chosen so that, in the two-column grid, tall groups pair with tall
 * ones and short with short — otherwise a 5-item group sitting beside a
 * 13-item group leaves a large empty cell. AI/ML leads because it is the
 * strongest differentiator in this profile.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "AI / Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow / Keras",
      "scikit-learn",
      "CatBoost",
      "XGBoost",
      "LightGBM",
      "ConvNeXt · EfficientNet · Swin",
      "Embeddings & vector search",
      "RAG (LangChain, FAISS)",
      "OpenAI & Anthropic APIs",
      "Feature engineering",
      "Cost-sensitive learning",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (EC2, ECS, Lambda, SQS, S3)",
      "AWS (EventBridge, CloudWatch, Parameter Store)",
      "AWS (Amplify, Route 53)",
      "Docker",
      "GitHub Actions",
      "Terraform",
      "Vercel",
      "Cloudflare R2",
      "GCP",
    ],
  },
  {
    title: "Backend",
    items: [
      "FastAPI",
      "NestJS",
      "Django REST Framework",
      "Laravel",
      "Node.js / Express",
      "Next.js (Server Actions & API routes)",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Next.js",
      "React",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Angular Material",
      "Radix UI",
      "Framer",
    ],
  },
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "PHP", "SQL"],
  },
  {
    title: "Databases",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Firebase / Firestore",
      "Redis",
    ],
  },
  {
    title: "Integrations",
    items: [
      "Telegram Bot API & Mini Apps",
      "Bakong KHQR / ABA PayWay",
      "Auth0",
      "Stripe",
      "Google OAuth",
      "EmailJS",
    ],
  },
  {
    title: "Other",
    items: [
      "Web scraping & data extraction",
      "Data analysis & visualisation",
      "REST API design",
      "RBAC & authentication systems",
      "On-page SEO & technical metadata",
    ],
  },
];
