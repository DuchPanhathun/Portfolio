import type { SkillGroup, TechStackPyramidRow } from "./types";

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

/**
 * Inverted pyramid tech stack specification for the dark atmospheric Tech Stack section.
 * Descends in count: Row 1 (10), Row 2 (8), Row 3 (6), Row 4 (5), Row 5 (4).
 */
export const techStackPyramid: TechStackPyramidRow[] = [
  // Row 1: Languages & Core Web (10 items)
  [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages" },
    { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", category: "Languages" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Core Web" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Core Web" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  ],
  // Row 2: Frameworks & ML (8 items)
  [
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI/ML" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI/ML" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "Backend" },
    { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", category: "Backend" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", category: "Computer Vision" },
    { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", category: "Backend" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg", category: "Frontend" },
  ],
  // Row 3: Cloud & Databases (6 items)
  [
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Cloud" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Database" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Cloud" },
  ],
  // Row 4: Tooling & DevOps (5 items)
  [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tooling" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "Tooling" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "Systems" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", category: "Deployment" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tooling" },
  ],
  // Row 5: AI & Design (4 items)
  [
    { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", category: "AI" },
    { name: "OpenAI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg", category: "AI" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Design" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", category: "API Testing" },
  ],
];
