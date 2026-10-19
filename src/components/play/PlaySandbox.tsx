"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  Camera,
  Maximize2,
  Minimize2,
  Zap,
  Layers,
  Activity,
  Radio,
  Waves,
  Compass,
  Sparkles,
  Info,
} from "lucide-react";

type SimMode = "gravity" | "repulsion" | "constellation" | "vortex" | "wave";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  life?: number;
  maxLife?: number;
  mass: number;
  hueOffset?: number;
}

interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bgAlpha: string;
}

const THEMES: Record<string, ColorTheme> = {
  lavender: {
    id: "lavender",
    name: "Obsidian Lavender",
    primary: "#c2a4ff",
    secondary: "#a87cff",
    accent: "#eae5ec",
    bgAlpha: "rgba(11, 8, 12, ",
  },
  cyan: {
    id: "cyan",
    name: "Electric Cyan",
    primary: "#00f2fe",
    secondary: "#4facfe",
    accent: "#ffffff",
    bgAlpha: "rgba(6, 14, 20, ",
  },
  emerald: {
    id: "emerald",
    name: "Neon Emerald",
    primary: "#00ff87",
    secondary: "#60efff",
    accent: "#e0ffe8",
    bgAlpha: "rgba(6, 18, 12, ",
  },
  ember: {
    id: "ember",
    name: "Sunset Ember",
    primary: "#ff0844",
    secondary: "#ffb199",
    accent: "#fff0f3",
    bgAlpha: "rgba(20, 8, 10, ",
  },
  prismatic: {
    id: "prismatic",
    name: "Prismatic Rainbow",
    primary: "#c2a4ff",
    secondary: "#00ff87",
    accent: "#ff0844",
    bgAlpha: "rgba(11, 8, 12, ",
  },
};

const MODES: { id: SimMode; label: string; icon: typeof Activity; description: string }[] = [
  {
    id: "constellation",
    label: "Constellation",
    icon: Radio,
    description: "Network nodes with dynamic proximity links and magnetic cursor attractor.",
  },
  {
    id: "repulsion",
    label: "Repulsion",
    icon: Compass,
    description: "Kinetic forcefield pushing particles away from cursor disturbances.",
  },
  {
    id: "gravity",
    label: "Gravity",
    icon: Activity,
    description: "Gravitational acceleration with elastic wall bounces and cursor fling.",
  },
  {
    id: "vortex",
    label: "Vortex",
    icon: Sparkles,
    description: "Cosmic accretion disk swirling particles rapidly around pointer well.",
  },
  {
    id: "wave",
    label: "Wave Field",
    icon: Waves,
    description: "Generative trigonometric flow field with ripple perturbations.",
  },
];

export function PlaySandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Simulation configuration states
  const [mode, setMode] = useState<SimMode>("constellation");
  const [themeId, setThemeId] = useState<string>("lavender");
  const [particleDensity, setParticleDensity] = useState<number>(180);
  const [motionBlur, setMotionBlur] = useState<boolean>(true);
  const [drawLinks, setDrawLinks] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Realtime telemetry metrics
  const [fps, setFps] = useState<number>(60);
  const [activeCount, setActiveCount] = useState<number>(180);
  const [capturedNotice, setCapturedNotice] = useState<boolean>(false);

  // Mutable animation refs (avoiding React re-renders in 60fps RAF loop)
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    vx: number;
    vy: number;
    isDown: boolean;
    isInside: boolean;
    radius: number;
  }>({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    isDown: false,
    isInside: false,
    radius: 160,
  });

  const timeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const fpsAccumulatorRef = useRef<number>(0);

  // Re-seed particles based on canvas dimensions and density
  const initParticles = useCallback(
    (width: number, height: number, count: number, currentThemeId: string) => {
      const theme = THEMES[currentThemeId] || THEMES.lavender;
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2.2 + 1.2;
        const pickColor = () => {
          if (currentThemeId === "prismatic") {
            const hue = Math.floor(Math.random() * 360);
            return `hsl(${hue}, 85%, 68%)`;
          }
          const r = Math.random();
          if (r < 0.6) return theme.primary;
          if (r < 0.9) return theme.secondary;
          return theme.accent;
        };

        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6,
          radius,
          baseRadius: radius,
          color: pickColor(),
          alpha: Math.random() * 0.5 + 0.4,
          mass: radius * 1.2,
          hueOffset: Math.random() * 360,
        });
      }

      particlesRef.current = newParticles;
      setActiveCount(newParticles.length);
    },
    [],
  );

  // Emit shockwave or particle burst at coordinate
  const emitBurst = useCallback(
    (originX: number, originY: number, burstCount = 24) => {
      const theme = THEMES[themeId] || THEMES.lavender;
      const newParticles: Particle[] = [];

      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const radius = Math.random() * 2.5 + 1.5;

        const color =
          themeId === "prismatic"
            ? `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`
            : Math.random() > 0.5
            ? theme.primary
            : theme.accent;

        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          baseRadius: radius,
          color,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 50 + 60,
          mass: radius * 0.8,
        });
      }

      particlesRef.current = [...particlesRef.current, ...newParticles];
      setActiveCount(particlesRef.current.length);
    },
    [themeId],
  );

  // Explode outward impulse
  const handleExplode = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    particlesRef.current.forEach((p) => {
      const dx = p.x - centerX;
      const dy = p.y - centerY;
      const dist = Math.hypot(dx, dy) || 1;
      const force = (500 / (dist + 50)) * 4;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    });

    emitBurst(centerX, centerY, 36);
  }, [emitBurst]);

  // Re-seed to pristine geometric pattern
  const handleReset = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    initParticles(rect.width, rect.height, particleDensity, themeId);
  }, [initParticles, particleDensity, themeId]);

  // Export canvas snapshot as PNG
  const handleSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `duch-panhathun-play-${mode}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setCapturedNotice(true);
      setTimeout(() => setCapturedNotice(false), 3000);
    } catch (err) {
      console.error("Canvas snapshot capture error:", err);
    }
  }, [mode]);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch((err) => {
        console.warn("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.warn("Fullscreen exit failed:", err);
      });
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Main generative simulation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      if (particlesRef.current.length === 0) {
        initParticles(width, height, particleDensity, themeId);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Main render tick
    const render = (now: number) => {
      timeRef.current += 0.012;
      const delta = lastFrameTimeRef.current ? now - lastFrameTimeRef.current : 16.6;
      lastFrameTimeRef.current = now;

      // Calculate smoothed FPS counter
      frameCountRef.current++;
      fpsAccumulatorRef.current += delta;
      if (fpsAccumulatorRef.current >= 400) {
        setFps(Math.round((frameCountRef.current * 1000) / fpsAccumulatorRef.current));
        frameCountRef.current = 0;
        fpsAccumulatorRef.current = 0;
      }

      const theme = THEMES[themeId] || THEMES.lavender;
      const mouse = mouseRef.current;

      // Velocity tracking for mouse
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // 1. Clear background with trails or crisp clear
      if (motionBlur) {
        ctx.fillStyle = `${theme.bgAlpha}0.22)`;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = "#0b080c";
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Decorative subtle grid dots
      ctx.fillStyle = "rgba(194, 164, 255, 0.03)";
      const gridSize = 48;
      for (let gx = 0; gx < width; gx += gridSize) {
        for (let gy = 0; gy < height; gy += gridSize) {
          ctx.fillRect(gx, gy, 1, 1);
        }
      }

      // 3. Render mouse interactive cursor radius indicator
      if (mouse.isInside) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius,
        );
        grad.addColorStop(0, `${theme.primary}22`);
        grad.addColorStop(0.6, `${theme.secondary}0a`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `${theme.primary}28`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Update and render particle physics
      const particles = particlesRef.current;
      const t = timeRef.current;

      // In constellation mode, optionally draw proximity links between nearby particles
      if (drawLinks && (mode === "constellation" || mode === "repulsion")) {
        const maxDist = mode === "constellation" ? 110 : 80;
        const maxDistSq = maxDist * maxDist;
        const pLen = particles.length;

        ctx.lineWidth = 0.75;
        for (let i = 0; i < pLen; i++) {
          const p1 = particles[i];
          // Link to mouse
          if (mouse.isInside) {
            const mdx = p1.x - mouse.x;
            const mdy = p1.y - mouse.y;
            const mDistSq = mdx * mdx + mdy * mdy;
            const mouseReach = mouse.radius * mouse.radius;
            if (mDistSq < mouseReach) {
              const alpha = (1 - Math.sqrt(mDistSq) / mouse.radius) * 0.45;
              ctx.strokeStyle = `${theme.primary}${Math.floor(alpha * 255)
                .toString(16)
                .padStart(2, "0")}`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }

          // Link between particles
          for (let j = i + 1; j < pLen; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.28;
              ctx.strokeStyle = `${theme.primary}${Math.floor(alpha * 255)
                .toString(16)
                .padStart(2, "0")}`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Process physics per particle
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Lifetime management for transient burst sparkles
        if (p.maxLife !== undefined && p.life !== undefined) {
          p.life++;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);
          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
            continue;
          }
        }

        // Apply Physics Modes
        switch (mode) {
          case "gravity": {
            // Constant downward gravitational acceleration
            p.vy += 0.12;
            p.vx *= 0.994;
            p.vy *= 0.994;

            // Mouse attractor when pressed
            if (mouse.isInside && mouse.isDown) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const dist = Math.hypot(dx, dy) || 1;
              p.vx += (dx / dist) * 0.45;
              p.vy += (dy / dist) * 0.45;
            } else if (mouse.isInside) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.hypot(dx, dy) || 1;
              if (dist < 100) {
                p.vx += (dx / dist) * 0.8;
                p.vy += (dy / dist) * 0.8;
              }
            }

            // Bounce boundaries with restitution
            if (p.y + p.radius > height) {
              p.y = height - p.radius;
              p.vy *= -0.72;
              p.vx *= 0.92;
            } else if (p.y - p.radius < 0) {
              p.y = p.radius;
              p.vy *= -0.72;
            }
            if (p.x + p.radius > width) {
              p.x = width - p.radius;
              p.vx *= -0.72;
            } else if (p.x - p.radius < 0) {
              p.x = p.radius;
              p.vx *= -0.72;
            }
            break;
          }

          case "repulsion": {
            p.vx *= 0.97;
            p.vy *= 0.97;

            // Ambient drift
            p.vx += (Math.random() - 0.5) * 0.2;
            p.vy += (Math.random() - 0.5) * 0.2;

            if (mouse.isInside) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.hypot(dx, dy) || 1;
              if (dist < mouse.radius) {
                const factor = (1 - dist / mouse.radius) * 2.8;
                p.vx += (dx / dist) * factor;
                p.vy += (dy / dist) * factor;
              }
            }

            // Wrap screen boundaries
            if (p.x < -20) p.x = width + 20;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            if (p.y > height + 20) p.y = -20;
            break;
          }

          case "vortex": {
            p.vx *= 0.96;
            p.vy *= 0.96;

            const targetX = mouse.isInside ? mouse.x : width / 2;
            const targetY = mouse.isInside ? mouse.y : height / 2;
            const dx = targetX - p.x;
            const dy = targetY - p.y;
            const dist = Math.hypot(dx, dy) || 1;

            // Centripetal inward pull + tangential perpendicular swirl
            const pull = Math.min(2.5, 300 / (dist + 30));
            const angle = Math.atan2(dy, dx) + Math.PI / 2;
            p.vx += Math.cos(angle) * pull + (dx / dist) * (pull * 0.35);
            p.vy += Math.sin(angle) * pull + (dy / dist) * (pull * 0.35);

            // Soft boundaries
            if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
              p.x = targetX + (Math.random() - 0.5) * 300;
              p.y = targetY + (Math.random() - 0.5) * 300;
            }
            break;
          }

          case "wave": {
            // Generative flow field equation
            const scale = 0.0035;
            const angle =
              Math.sin(p.x * scale + t) * Math.cos(p.y * scale + t * 0.8) * Math.PI * 2;
            p.vx = p.vx * 0.92 + Math.cos(angle) * 1.5;
            p.vy = p.vy * 0.92 + Math.sin(angle) * 1.5;

            if (mouse.isInside) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.hypot(dx, dy) || 1;
              if (dist < 130) {
                const push = (1 - dist / 130) * 2;
                p.vx += (dx / dist) * push;
                p.vy += (dy / dist) * push;
              }
            }

            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;
            break;
          }

          case "constellation":
          default: {
            // Calm organic floating motion
            p.vx *= 0.99;
            p.vy *= 0.99;

            if (mouse.isInside) {
              const dx = mouse.x - p.x;
              const dy = mouse.y - p.y;
              const dist = Math.hypot(dx, dy) || 1;
              if (dist < mouse.radius) {
                // Magnetic soft gravitational attraction
                const force = (1 - dist / mouse.radius) * 0.28;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
              }
            }

            // Bounce edges gently
            if (p.x < 10) p.vx = Math.abs(p.vx);
            if (p.x > width - 10) p.vx = -Math.abs(p.vx);
            if (p.y < 10) p.vy = Math.abs(p.vy);
            if (p.y > height - 10) p.vy = -Math.abs(p.vy);
            break;
          }
        }

        // Step position
        p.x += p.vx;
        p.y += p.vy;

        // Render particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Specular glow dot in center
        if (p.radius > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = p.alpha * 0.8;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mode, themeId, particleDensity, motionBlur, drawLinks, initParticles]);

  // Pointer and touch gesture event handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const mouse = mouseRef.current;
    if (!mouse.isInside) {
      mouse.prevX = clientX;
      mouse.prevY = clientY;
    }
    mouse.x = clientX;
    mouse.y = clientY;
    mouse.isInside = true;

    // If dragging while in gravity or vortex, emit continuous micro trail
    if (mouse.isDown && Math.random() < 0.4) {
      emitBurst(clientX, clientY, 3);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mouseRef.current.isDown = true;
    mouseRef.current.x = clientX;
    mouseRef.current.y = clientY;

    // Click shockwave pulse
    emitBurst(clientX, clientY, 20);
  };

  const handlePointerUp = () => {
    mouseRef.current.isDown = false;
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
    mouseRef.current.isDown = false;
  };

  // When particle density slider changes, re-init
  const handleDensityChange = (newDensity: number) => {
    setParticleDensity(newDensity);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    initParticles(rect.width, rect.height, newDensity, themeId);
  };

  // When theme changes, re-tint existing particles
  const handleThemeChange = (newThemeId: string) => {
    setThemeId(newThemeId);
    const theme = THEMES[newThemeId] || THEMES.lavender;
    particlesRef.current.forEach((p) => {
      if (newThemeId === "prismatic") {
        p.color = `hsl(${Math.floor(Math.random() * 360)}, 85%, 68%)`;
      } else {
        const r = Math.random();
        p.color = r < 0.6 ? theme.primary : r < 0.9 ? theme.secondary : theme.accent;
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#0b080c] select-none overflow-hidden transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 h-screen" : "min-h-[calc(100vh-5rem)] pt-24 pb-16"
      }`}
    >
      {/* Main Interactive Stage Container with Redoyan-style crosshairs & borders */}
      <div
        className={`relative mx-auto w-[var(--cWidth)] max-w-[var(--cMaxWidth)] ${
          isFullscreen ? "h-full max-w-none w-full px-0" : "px-4 sm:px-8"
        }`}
      >
        {/* Top Header & Breadcrumb Bar */}
        {!isFullscreen && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-5">
            {/* Left: Return Navigation */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase backdrop-blur-md transition-all hover:border-accent hover:bg-surface hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Portfolio</span>
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-xs text-muted tracking-widest uppercase">
                  02 — Creative Playground
                </span>
              </div>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowInfo((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-medium tracking-wider uppercase backdrop-blur-md transition-all ${
                  showInfo
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border bg-surface/70 text-ink-soft hover:border-accent/40 hover:text-ink"
                }`}
                aria-label="Toggle Info Dialog"
              >
                <Info className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Guide</span>
              </button>

              <button
                type="button"
                onClick={handleSnapshot}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-xs font-medium tracking-wider text-ink-soft uppercase backdrop-blur-md transition-all hover:border-accent/40 hover:text-accent"
                aria-label="Capture High-Resolution Snapshot PNG"
              >
                <Camera className="h-3.5 w-3.5 text-accent" />
                <span className="hidden md:inline">Snapshot</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-xs font-medium tracking-wider text-ink-soft uppercase backdrop-blur-md transition-all hover:border-accent/40 hover:text-accent"
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
                <span className="hidden md:inline">
                  {isFullscreen ? "Exit FS" : "Fullscreen"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Snapshot Success Notification Pill */}
        {capturedNotice && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 rounded-full border border-accent bg-surface/90 px-4 py-2 font-mono text-xs font-semibold text-accent shadow-[0_0_25px_rgba(194,164,255,0.4)] backdrop-blur-md transition-all">
            ✓ Generative Canvas Snapshot Saved to Downloads
          </div>
        )}

        {/* Information & Instructions Card (Collapsible) */}
        {showInfo && (
          <div className="mb-6 rounded-xl border border-accent/30 bg-surface/85 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <h3 className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
                  Interactive Physics &amp; Vector Sandbox Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="font-mono text-xs text-muted hover:text-ink"
              >
                ✕ Close
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft sm:text-sm">
              This sandbox simulates real-time discrete particle dynamics using
              Lagrangian integration, trigonometric curl-vector fields, and
              Hooke&apos;s elasticity. Interact with cursor or touch gestures to create
              gravitational waves, shockwave bursts, and dynamic constellation meshes.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-muted">
              <div className="rounded-lg border border-border/60 bg-bg/60 p-3">
                <span className="block text-accent font-semibold mb-1">Pointer / Touch</span>
                Steer force fields, repel or attract nodes smoothly.
              </div>
              <div className="rounded-lg border border-border/60 bg-bg/60 p-3">
                <span className="block text-accent font-semibold mb-1">Click / Tap</span>
                Discharge a radial shockwave burst with dynamic momentum.
              </div>
              <div className="rounded-lg border border-border/60 bg-bg/60 p-3">
                <span className="block text-accent font-semibold mb-1">Hold &amp; Drag</span>
                Fling clusters or generate a continuous trail of sparkles.
              </div>
            </div>
          </div>
        )}

        {/* Interactive Canvas Canvas Box Frame with Signature Corner Crosshairs */}
        <div
          className={`relative w-full rounded-2xl border border-border bg-[#0b080c] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.7)] ${
            isFullscreen ? "h-screen rounded-none border-0" : "h-[680px] sm:h-[720px]"
          }`}
        >
          {/* Corner Crosshair Accents */}
          {!isFullscreen && (
            <>
              <span className="what-corner top-[-1px] left-[-1px]" aria-hidden="true" />
              <span className="what-corner top-[-1px] right-[-1px]" aria-hidden="true" />
              <span className="what-corner bottom-[-1px] left-[-1px]" aria-hidden="true" />
              <span className="what-corner bottom-[-1px] right-[-1px]" aria-hidden="true" />
            </>
          )}

          {/* Main HTML5 Canvas Element */}
          <canvas
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            className="block h-full w-full cursor-crosshair touch-none"
            aria-label="Interactive generative physics simulation canvas"
          />

          {/* Overlay HUD: Top-Left Telemetry */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1 font-mono text-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-ink-soft">
                FPS: <strong className="text-ink">{fps}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1 font-mono text-xs backdrop-blur-md">
              <Layers className="h-3 w-3 text-accent" />
              <span className="text-ink-soft">
                Nodes: <strong className="text-ink">{activeCount}</strong>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1 font-mono text-xs backdrop-blur-md">
              <span className="text-muted uppercase">Mode:</span>
              <strong className="text-accent uppercase">{mode}</strong>
            </div>
          </div>

          {/* Overlay HUD: Top-Right Fullscreen Controls when in FS */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="rounded-full border border-border bg-surface/80 p-2 text-ink backdrop-blur-md hover:border-accent hover:text-accent"
                aria-label="Exit Fullscreen"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Overlay HUD: Floating Mode Switcher Bar (Bottom Center) */}
          <div className="absolute bottom-5 inset-x-0 z-20 flex flex-col items-center gap-3 px-4 pointer-events-none">
            {/* Interactive Mode Pills */}
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-border/80 bg-surface/85 p-1.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:border-accent/40">
              {MODES.map((item) => {
                const Icon = item.icon;
                const isActive = mode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMode(item.id)}
                    className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wider uppercase transition-all ${
                      isActive
                        ? "border border-accent bg-accent text-bg shadow-[0_0_16px_rgba(194,164,255,0.4)]"
                        : "text-ink-soft hover:bg-surface-hover hover:text-ink"
                    }`}
                    aria-label={`Switch to ${item.label} mode`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Micro-Controls: Density, Trails, Theme, Reset */}
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/75 px-3 py-2 text-xs font-mono backdrop-blur-md text-ink-soft">
              {/* Theme Picker */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted text-[11px] uppercase">Theme:</span>
                <div className="flex items-center gap-1">
                  {Object.values(THEMES).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleThemeChange(t.id)}
                      className={`h-4 w-4 rounded-full border transition-transform ${
                        themeId === t.id
                          ? "scale-125 border-white ring-2 ring-accent/50"
                          : "border-transparent hover:scale-110 opacity-70"
                      }`}
                      style={{ backgroundColor: t.primary }}
                      title={t.name}
                      aria-label={`Select ${t.name} color theme`}
                    />
                  ))}
                </div>
              </div>

              <span className="h-3 w-px bg-border/60 mx-1" aria-hidden="true" />

              {/* Density Count Toggle */}
              <div className="flex items-center gap-1">
                <span className="text-muted text-[11px] uppercase">Density:</span>
                {[80, 180, 300].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleDensityChange(num)}
                    className={`rounded px-1.5 py-0.5 text-[11px] font-semibold transition-colors ${
                      particleDensity === num
                        ? "bg-accent/20 text-accent border border-accent/40"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <span className="h-3 w-px bg-border/60 mx-1" aria-hidden="true" />

              {/* Motion Blur Trail Toggle */}
              <button
                type="button"
                onClick={() => setMotionBlur((v) => !v)}
                className={`rounded px-2 py-0.5 text-[11px] font-semibold uppercase transition-colors ${
                  motionBlur
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "text-muted hover:text-ink"
                }`}
                title="Toggle motion trails / persistence"
              >
                Trails: {motionBlur ? "ON" : "OFF"}
              </button>

              {/* Mesh Lines Toggle */}
              <button
                type="button"
                onClick={() => setDrawLinks((v) => !v)}
                className={`rounded px-2 py-0.5 text-[11px] font-semibold uppercase transition-colors ${
                  drawLinks
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "text-muted hover:text-ink"
                }`}
                title="Toggle dynamic proximity mesh connections"
              >
                Links: {drawLinks ? "ON" : "OFF"}
              </button>

              <span className="h-3 w-px bg-border/60 mx-1" aria-hidden="true" />

              {/* Impulse Explode & Re-seed */}
              <button
                type="button"
                onClick={handleExplode}
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold text-accent hover:bg-accent/15 uppercase transition-colors"
                title="Apply radial explosion impulse to all particles"
              >
                <Zap className="h-3 w-3" />
                <span>Pulse</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold text-ink-soft hover:text-ink hover:bg-surface-hover uppercase transition-colors"
                title="Re-seed and reset particles"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Technical Description & Narrative Card */}
        {!isFullscreen && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="rounded-xl border border-border/70 bg-surface/40 p-5 backdrop-blur-sm">
              <p className="font-semibold text-accent uppercase tracking-widest mb-1.5">
                01 // Discrete Physics Model
              </p>
              <p className="text-muted leading-relaxed">
                Velocity Verlet numerical integration computing position, restitution
                elasticity, drag damping, and spatial inverse-distance force fields in real-time.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface/40 p-5 backdrop-blur-sm">
              <p className="font-semibold text-accent uppercase tracking-widest mb-1.5">
                02 // Vector Field Synthesis
              </p>
              <p className="text-muted leading-relaxed">
                Trigonometric harmonic curls and dynamic vortex vectors yielding organic
                fluid patterns inspired by fluid mechanics and celestial astrophysics.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface/40 p-5 backdrop-blur-sm">
              <p className="font-semibold text-accent uppercase tracking-widest mb-1.5">
                03 // Kinetic Gestures
              </p>
              <p className="text-muted leading-relaxed">
                Multi-touch and cursor pointer tracking with high-DPI scaling, alpha motion blur
                persistence, and dynamic proximity constellation lattice links.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
