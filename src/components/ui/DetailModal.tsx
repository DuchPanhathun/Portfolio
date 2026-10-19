"use client";

import {
  useEffect,
  useRef,
  useState,
  useId,
  useSyncExternalStore,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

export type DetailModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type DetailModalProps = {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback invoked when the modal is requested to close */
  onClose: () => void;
  /** Primary dialog heading */
  title?: ReactNode;
  /** Small category / eyebrow label rendered above the heading */
  eyebrow?: ReactNode;
  /** Secondary subtitle or metadata line */
  subtitle?: ReactNode;
  /** Optional badge or tag displayed alongside the title */
  badge?: ReactNode;
  /** Modal body content */
  children?: ReactNode;
  /** Optional bottom action bar or link container */
  footer?: ReactNode;
  /** Sizing variant controlling maximum width */
  size?: DetailModalSize;
  /** Extra class names for dialog container */
  className?: string;
  /** Extra class names for scrollable body */
  bodyClassName?: string;
  /** Accessible label if title element is omitted */
  ariaLabel?: string;
  /** Accessible description identifier */
  ariaDescribedBy?: string;
  /** Whether to render the default top-right close button */
  showCloseButton?: boolean;
  /** Accessible aria-label for the close button */
  closeButtonAriaLabel?: string;
};

const sizeClasses: Record<DetailModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  full: "max-w-5xl",
};

const emptySubscribe = () => () => {};

/**
 * DetailModal
 *
 * An accessible, responsive modal dialog crafted for rich item detail views
 * (experience roles, open-source projects, case studies).
 *
 * Features:
 * - Accessibility: role="dialog", aria-modal="true", aria-labelledby, focus trapping, escape key listener.
 * - Backdrop overlay with smooth backdrop blur.
 * - Animated entrance & exit with graceful timing.
 * - Scroll locking on document body with scrollbar shift compensation.
 * - Drag-safe backdrop click dismissal.
 * - Responsive sizing and smooth internal scrolling.
 */
export function DetailModal({
  isOpen,
  onClose,
  title,
  eyebrow,
  subtitle,
  badge,
  children,
  footer,
  size = "xl",
  className = "",
  bodyClassName = "",
  ariaLabel,
  ariaDescribedBy,
  showCloseButton = true,
  closeButtonAriaLabel = "Close dialog",
}: DetailModalProps) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [rendered, setRendered] = useState(isOpen);
  const [active, setActive] = useState(false);

  // Adjust state during render when isOpen prop transitions (React 19 pattern)
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setRendered(true);
    }
  }

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const backdropMouseDownRef = useRef(false);

  const defaultId = useId();
  const titleId = title ? `${defaultId}-title` : undefined;

  // Handle smooth enter/exit animations via callbacks
  useEffect(() => {
    let animFrame: number;
    let timer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      animFrame = requestAnimationFrame(() => {
        setActive(true);
      });
    } else {
      animFrame = requestAnimationFrame(() => {
        setActive(false);
      });
      timer = setTimeout(() => {
        setRendered(false);
      }, 240);
    }

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Lock document body scroll while dialog is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap and focus restoration
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current =
        document.activeElement as HTMLElement | null;

      const timer = setTimeout(() => {
        if (!dialogRef.current) return;
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }, 40);

      return () => clearTimeout(timer);
    } else {
      if (
        previousActiveElement.current &&
        typeof previousActiveElement.current.focus === "function"
      ) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Tab key focus wrapping inside modal
  const handleDialogKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;

    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const firstElement = focusables[0];
    const lastElement = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Safe backdrop click dismissal (prevents closing on drag-release from inside dialog)
  const handleBackdropMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    backdropMouseDownRef.current = e.target === e.currentTarget;
  };

  const handleBackdropMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (backdropMouseDownRef.current && e.target === e.currentTarget) {
      onClose();
    }
    backdropMouseDownRef.current = false;
  };

  if (!isHydrated || !rendered) {
    return null;
  }

  const hasHeader = title || eyebrow || subtitle || badge || showCloseButton;

  const modalElement = (
    <div
      role="presentation"
      className="fixed inset-0 z-[100] overflow-y-auto"
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
    >
      {/* Backdrop overlay with blur */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-200 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Centering shell */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-none">
        {/* Dialog container */}
        <div
          ref={dialogRef}
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={titleId}
          aria-label={!titleId ? ariaLabel : undefined}
          aria-describedby={ariaDescribedBy}
          onKeyDown={handleDialogKeyDown}
          onClick={(e) => e.stopPropagation()}
          className={`pointer-events-auto relative flex w-full flex-col max-h-[90vh] rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/80 transition-all duration-200 ease-out ${
            sizeClasses[size]
          } ${
            active
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-3"
          } ${className}`}
        >
          {/* Header */}
          {hasHeader ? (
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8 sm:py-6">
              <div className="min-w-0 flex-1">
                {eyebrow ? (
                  <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                    {eyebrow}
                  </p>
                ) : null}

                <div className="mt-1 flex flex-wrap items-center gap-2.5">
                  {title ? (
                    <h3
                      id={titleId}
                      className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
                    >
                      {title}
                    </h3>
                  ) : null}
                  {badge}
                </div>

                {subtitle ? (
                  <div className="mt-1 text-sm font-medium text-ink-soft">
                    {subtitle}
                  </div>
                ) : null}
              </div>

              {showCloseButton ? (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={closeButtonAriaLabel}
                  className="btn inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted hover:border-border-strong hover:bg-surface-2/80 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Scrollable body */}
          <div
            className={`flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7 ${bodyClassName}`}
          >
            {children}
          </div>

          {/* Optional footer */}
          {footer ? (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-surface-2/30 px-6 py-4 sm:px-8 rounded-b-2xl">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
}

export default DetailModal;
