import type { OpenSourceProject } from "./types";

/**
 * Open-source and independently developed projects.
 *
 * This module serves as the single source of truth for open-source repositories,
 * developer tools, games, and mobile applications showcased on the portfolio.
 * To add or update an open-source project, simply add or modify an entry below.
 */
export const openSourceProjects: OpenSourceProject[] = [
  {
    slug: "thun-murex",
    name: "Thun Murex Gateway",
    tagline:
      "Unified AI model gateway & proxy bridging cloud LLMs and local coding CLI agents",
    summary:
      "A self-hosted Next.js streaming API gateway that proxies chat requests across cloud LLM providers with multi-key round-robining to eliminate rate limits, while unifying local coding CLI agents under a single standard /api/chat endpoint.",
    description:
      "A self-hosted Next.js streaming API gateway that proxies chat requests across cloud providers (SEA-LION, Cerebras, Groq) with multi-key round-robining to eliminate rate limits, while unifying local AI coding agents (Claude Code, Gemini CLI, Antigravity) under a single standard /api/chat endpoint.",
    role: "Creator & System Architect",
    period: "Oct 2026",
    status: "active",
    category: "AI & Systems",
    featured: true,
    repoUrl: "https://github.com/DuchPanhathun/ai-thun",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DuchPanhathun/ai-thun",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Tailscale",
      "Node.js",
      "systemd",
    ],
    highlights: [
      "Multi-key round-robin rotation across multiple API keys per provider (SEA-LION, Cerebras, Groq) to avoid provider rate limits.",
      "Unified /api/chat endpoint bridging cloud OpenAI-compatible APIs and local CLI coding agents (Claude Code, Gemini CLI, Antigravity) via local-agent-gateway.",
      "Zero public internet exposure: securely hosted over Tailscale private mesh network with systemd daemon management.",
      "Stream-compatible server-sent events (SSE) pipeline with full thought-process folding support.",
    ],
  },

  {
    slug: "thun-murex-vscode",
    name: "Thun Murex for VS Code",
    tagline:
      "Multi-agent AI pair programmer & coding assistant extension for Visual Studio Code",
    summary:
      "A VS Code extension connecting editor workflows to both cloud LLMs and local agent CLIs, featuring autonomous multi-agent teamwork, inline diff editing, and Model Context Protocol (MCP) tool integration.",
    description:
      "A VS Code extension connecting editor workflows to both cloud LLMs and local agent CLIs. Features autonomous multi-agent teamwork with shared task boards and memory, inline diff editing, streaming thought process visualization, and Model Context Protocol (MCP) tool integration.",
    role: "Creator & Lead Developer",
    period: "Oct 2026",
    status: "active",
    category: "Developer Tools",
    featured: true,
    repoUrl: "https://github.com/DuchPanhathun/thun-murex",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DuchPanhathun/thun-murex",
      },
    ],
    stack: [
      "TypeScript",
      "VS Code Extension API",
      "React",
      "MCP (Model Context Protocol)",
      "esbuild",
    ],
    highlights: [
      "Autonomous multi-agent teamwork system with role delegation (Lead, Data Architect, UI Engineer, Tester), shared memory, and task boards.",
      "Inline diff editor with Apply/Discard controls and non-destructive terminal shell command insertion.",
      "Multi-modal context handling: supports multi-image screenshots, active editor selections, and workspace files attached directly into context.",
      "Full MCP (Model Context Protocol) tool integration connecting external developer tools, skills, and custom plugins.",
    ],
  },

  {
    slug: "3d-preview-extension",
    name: "3D Model Preview for VS Code",
    tagline:
      "Interactive 3D model viewer and asset explorer embedded inside Visual Studio Code",
    summary:
      "A VS Code extension to preview 3D models directly in the editor using Three.js with full PBR shading, animation playback, wireframe inspection, and an Activity Bar sidebar tree and thumbnail grid view.",
    description:
      "A VS Code extension to preview 3D models directly in the editor using Three.js with full PBR shading, animation playback, wireframe inspection, and an Activity Bar sidebar tree and thumbnail grid view.",
    role: "Creator & Author",
    period: "Oct 2026",
    status: "completed",
    category: "Developer Tools",
    featured: true,
    repoUrl: "https://github.com/DuchPanhathun/3d_preview_extension_vscode",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DuchPanhathun/3d_preview_extension_vscode",
      },
    ],
    stack: [
      "TypeScript",
      "VS Code Extension API",
      "Three.js",
      "WebGL",
      "esbuild",
    ],
    highlights: [
      "Broad 3D format support: glTF 2.0 (.glb, .gltf), OBJ (+mtllib), FBX, STL, PLY point clouds, DAE, and 3MF.",
      "Interactive viewport with orbit controls, studio lighting presets, wireframe mode, and skeletal animation controls.",
      "Dedicated Activity Bar sidebar with live Explorer tree, single-click preview, and rendered thumbnail grid gallery.",
      "Hardware-accelerated rendering with Draco, Meshopt, and KTX2/Basis texture decompression.",
    ],
  },

  {
    slug: "the-house-of-the-ninth-bell",
    name: "The House of the Ninth Bell",
    tagline:
      "First-person atmospheric narrative survival-horror game built with Unity 6",
    summary:
      "A first-person survival-horror game exploring a haunting colonial mansion, featuring a 7-chapter narrative arc, 4 distinct endings, sound-based monster AI, and diegetic environmental puzzles.",
    description:
      "A first-person survival-horror game exploring a haunting colonial mansion. Features a full 7-chapter narrative story mode with 4 distinct endings, dynamic monster AI (the Mourner, the Drowned, the Remembered), sound-based stealth mechanics, environmental puzzles, and checkpoint save systems.",
    role: "Creator & Lead Game Developer",
    period: "Oct 2026",
    status: "in-development",
    category: "Game Development",
    featured: true,
    repoUrl: "https://github.com/DuchPanhathun/The_House_of_the_Ninth_Bell",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DuchPanhathun/The_House_of_the_Ninth_Bell",
      },
    ],
    stack: [
      "Unity 6",
      "C#",
      "Universal Render Pipeline (URP)",
      "Unity Input System",
      "AI Navigation (NavMesh)",
    ],
    highlights: [
      "Complete 7-chapter narrative arc with 4 branchable endings and secret post-credits narrative layers.",
      "Advanced multi-enemy AI system: noise investigation, sight cones, patrol routes, search patterns, and hiding-spot inspection.",
      "Multi-stage environmental puzzles (drainage valve pressure, colonial portrait codes, sound-based clues) with diegetic journal hints.",
      "Engineered on Unity 6 LTS using Universal Render Pipeline (URP 17) and NavMesh AI navigation.",
    ],
  },

  {
    slug: "ninja-village-defense",
    name: "Ninja Village Defense",
    tagline:
      "2D roguelike action game with unified web platform and shared Firebase backend",
    summary:
      "A 2D roguelike action game in Unity 6 paired with an Astro web portal and admin platform, sharing a unified Firebase serverless backend.",
    description:
      "A 2D roguelike action game developed in Unity 6, backed by a companion web portal and admin management system built with Astro and TypeScript, all synchronized via a unified Firebase serverless architecture.",
    role: "Creator & Full-stack Game Developer",
    period: "Sep 2026",
    status: "completed",
    category: "Game Development",
    featured: false,
    repoUrl: "https://github.com/DuchPanhathun/ninja_village_defense",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DuchPanhathun/ninja_village_defense",
      },
    ],
    stack: [
      "Unity 6",
      "C#",
      "Astro",
      "TypeScript",
      "Firebase (Firestore, Cloud Functions)",
      "Vercel",
    ],
    highlights: [
      "Unified cross-platform data contract shared between TypeScript Cloud Functions, Astro web portal, and Unity C# client.",
      "Secure asynchronous grant inbox architecture: web store purchases and redeem codes are delivered as immutable server-side grants collected by the game.",
      "Full admin dashboard for player management, reward distribution, and Remote Config management.",
      "Automated deployment pipeline leveraging Vercel for web and Firebase CLI for Cloud Functions & security rules.",
    ],
  },

  {
    slug: "auto-clicker",
    name: "Auto Clicker for Android",
    tagline:
      "Native Android macro automation engine with floating overlay controls & AccessibilityService",
    summary:
      "A native Android macro automation app featuring floating draggable overlays, visual marker editing, and scheduled group execution via AccessibilityService.",
    description:
      "A native Android automation utility for building, scheduling, and executing precision touch macros (taps, long presses, multi-touch swipes, curves, and timed waits) over any application using Android's AccessibilityService.",
    role: "Creator & Android Developer",
    period: "Oct 2026",
    status: "completed",
    category: "Mobile Apps",
    featured: false,
    repoUrl: "https://github.com/DuchPanhathun/auto_clicker",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DuchPanhathun/auto_clicker",
      },
    ],
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Android AccessibilityService",
      "Room Database",
      "Coroutines & Flow",
      "Gradle",
    ],
    highlights: [
      "Clean multi-module architecture (:app, :core:engine, :core:data, :core:model) with pure-Kotlin domain logic.",
      "Draggable floating overlay toolbar with tap-to-place visual target positioning and dry-run preview mode.",
      "High-precision automation engine with group scheduling, loop counts, time windows, and emergency stop mechanisms.",
      "Robust safety features: automatic pause on screen lock/rotation, hardware volume-key killswitch, and validated JSON backup/restore.",
    ],
  },
];

export const featuredOpenSourceProjects = openSourceProjects.filter(
  (p) => p.featured
);

export const additionalOpenSourceProjects = openSourceProjects.filter(
  (p) => !p.featured
);
