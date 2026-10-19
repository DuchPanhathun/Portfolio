"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { FastForward, Terminal, Activity } from "lucide-react";

const SESSION_KEY = "dp_portfolio_preloader_seen";

const emptySubscribe = () => () => {};

function getSessionSnapshot(): boolean {
  try {
    return typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const hasSeenSession = useSyncExternalStore(
    emptySubscribe,
    getSessionSnapshot,
    getServerSnapshot
  );

  const dismiss = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Gracefully handle blocked storage / private browsing mode
      }
    }

    setIsExiting((prev) => {
      if (prev) return prev;
      setTimeout(() => {
        setIsVisible(false);
        if (typeof document !== "undefined") {
          document.body.style.overflow = "";
        }
      }, 850);
      return true;
    });
  }, []);

  useEffect(() => {
    if (hasSeenSession) return;
    if (typeof window === "undefined") return;

    // Lock body scroll while cinematic preloader is active
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Kinetic progress counter simulation (~3.5s duration with deliberate, cinematic pacing)
    const startTime = performance.now();
    const duration = 3500;
    let animationFrameId: number;
    let dwellTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);

      // Multi-stage cinematic curve: steady launch, calm asset hydration, deliberate deceleration into 100%
      let easedRatio = rawRatio;
      if (rawRatio < 0.6) {
        // Smooth sine curve into steady progress (0 to 65%)
        easedRatio = Math.sin((rawRatio / 0.6) * (Math.PI / 2)) * 0.65;
      } else {
        // Deliberate, smooth ramp to completion (65% to 100%)
        const remaining = (rawRatio - 0.6) / 0.4;
        easedRatio = 0.65 + Math.pow(remaining, 1.4) * 0.35;
      }

      const currentPercent = Math.min(100, Math.floor(easedRatio * 100));
      setProgress(currentPercent);

      if (currentPercent < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Deliberate cinematic dwell delay at 100% / READY before triggering shutter exit
        dwellTimeoutId = setTimeout(() => {
          dismiss();
        }, 750);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (dwellTimeoutId) clearTimeout(dwellTimeoutId);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dismiss, hasSeenSession]);

  if (!isVisible || hasSeenSession) return null;

  // Dynamic system telemetry lines with extended reading intervals
  const getTelemetryHeadline = (p: number) => {
    if (p < 32) return "INITIALIZING RUNTIME";
    if (p < 72) return "SYNCING ASSETS";
    if (p < 100) return "CALIBRATING INTERACTION PIPELINE";
    return "READY";
  };

  const getTelemetryDetail = (p: number) => {
    if (p < 32) return "Mounting Obsidian-Lavender design tokens & typography matrices...";
    if (p < 72) return "Synthesizing neural model weights, Devicon assets & showcase graphics...";
    if (p < 100) return "Hydrating interactive physics kernels & discrete viewport listeners...";
    return "System fully synchronized. Launching portfolio experience.";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio loading screen"
      onClick={dismiss}
      className="fixed inset-0 z-[100] select-none cursor-pointer overflow-hidden"
    >
      {/* Top Cinematic Shutter Panel */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#0b080c] transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        } border-b border-accent/20`}
      />

      {/* Bottom Cinematic Shutter Panel */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#0b080c] transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "translate-y-full" : "translate-y-0"
        } border-t border-accent/20`}
      />

      {/* Ambient Radial Glowing Orbs behind the aperture */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-800 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-radial from-accent/15 via-accent-vibrant/5 to-transparent blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] rounded-full bg-accent-glow blur-[40px]" />
      </div>

      {/* Central Interactive Preloader Content */}
      <div
        className={`relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Corner Crosshairs */}
        <div className="what-corner what-corner-tl m-4 sm:m-6" />
        <div className="what-corner what-corner-tr m-4 sm:m-6" />
        <div className="what-corner what-corner-bl m-4 sm:m-6" />
        <div className="what-corner what-corner-br m-4 sm:m-6" />

        {/* Top Header Bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs font-bold text-accent shadow-[0_0_15px_rgba(194,164,255,0.25)]">
              DP
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                DUCH PANHATHUN
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted uppercase flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Obsidian Cinematic Preloader
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1 font-mono text-[11px] text-muted backdrop-blur-sm">
              <Activity className="h-3 w-3 text-accent animate-pulse" />
              <span className="text-ink-soft">TELEMETRY // ACTIVE</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="group flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-1.5 font-mono text-xs text-ink-soft backdrop-blur-sm transition-all hover:border-accent hover:text-ink hover:shadow-[0_0_12px_rgba(194,164,255,0.2)] active:scale-95"
            >
              <span>SKIP</span>
              <kbd className="hidden sm:inline-block rounded bg-surface-hover px-1.5 py-0.5 text-[9px] text-muted border border-border">
                ESC
              </kbd>
              <FastForward className="h-3 w-3 text-accent transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </header>

        {/* Center: Cinematic Aperture & Monogram Pulse */}
        <div className="relative flex flex-1 items-center justify-center py-8">
          <div className="relative flex items-center justify-center">
            {/* Outer Rotating Reticle Ring */}
            <svg
              className="absolute h-64 w-64 sm:h-80 sm:w-80 animate-[spin_24s_linear_infinite] pointer-events-none opacity-40 text-accent"
              viewBox="0 0 300 300"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="150"
                cy="150"
                r="115"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="1 12"
              />
              {/* Reticle ticks */}
              <line x1="150" y1="2" x2="150" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="150" y1="288" x2="150" y2="298" stroke="currentColor" strokeWidth="2" />
              <line x1="2" y1="150" x2="12" y2="150" stroke="currentColor" strokeWidth="2" />
              <line x1="288" y1="150" x2="298" y2="150" stroke="currentColor" strokeWidth="2" />
            </svg>

            {/* Counter-rotating Inner Aperture Blades */}
            <svg
              className="absolute h-48 w-48 sm:h-60 sm:w-60 animate-[spin_16s_linear_infinite_reverse] pointer-events-none opacity-30 text-accent-vibrant"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="16 28"
              />
              <circle
                cx="100"
                cy="100"
                r="72"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="8 8"
              />
            </svg>

            {/* Glowing Concentric Aperture Frame */}
            <div className="relative flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-full border border-accent/40 bg-surface/70 backdrop-blur-md shadow-[0_0_35px_rgba(194,164,255,0.25)] transition-transform duration-500 hover:scale-105">
              {/* Inner Pulsing Ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-accent/30 animate-[spin_12s_linear_infinite]" />

              {/* Central Pulsing Monogram */}
              <div className="relative flex flex-col items-center justify-center">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-widest text-ink drop-shadow-[0_0_12px_rgba(194,164,255,0.6)] animate-pulse">
                  DP
                </span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
                  SYSTEM
                </span>
              </div>

              {/* Aperture Degree Coordinate Badges */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-surface px-1.5 py-0.5 font-mono text-[8px] text-muted border border-border">
                00°
              </span>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded bg-surface px-1.5 py-0.5 font-mono text-[8px] text-muted border border-border">
                180°
              </span>
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 rounded bg-surface px-1.5 py-0.5 font-mono text-[8px] text-muted border border-border">
                270°
              </span>
              <span className="absolute -right-3 top-1/2 -translate-y-1/2 rounded bg-surface px-1.5 py-0.5 font-mono text-[8px] text-muted border border-border">
                90°
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Telemetry, Large Kinetic Percentage & Glowing Progress Bar */}
        <footer className="relative z-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
                <Terminal className="h-3.5 w-3.5 text-accent" />
                <span className="font-semibold text-accent">
                  {getTelemetryHeadline(progress)}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-ink-soft">
                {getTelemetryDetail(progress)}
              </div>
            </div>

            {/* Large Kinetic Percentage Indicator */}
            <div className="flex items-baseline gap-1 self-end sm:self-auto">
              <span className="font-mono text-6xl sm:text-8xl font-black tracking-tight text-ink tabular-nums">
                {progress}
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-accent">
                %
              </span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface border border-border/60">
            <div
              className="h-full bg-gradient-to-r from-accent via-accent-vibrant to-white transition-all duration-100 ease-out shadow-[0_0_14px_rgba(194,164,255,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Micro Telemetry Footer */}
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted">
            <span>PRESS ESC OR CLICK ANYWHERE TO ENTER</span>
            <span className="hidden sm:inline">DUCH PANHATHUN • PORTFOLIO 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
