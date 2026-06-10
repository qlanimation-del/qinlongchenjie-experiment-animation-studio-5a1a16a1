import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Letters3DProps {
  text: string;
  className?: string;
  /** Delay before first letter starts (ms) */
  delay?: number;
  /** Stagger between letters (ms) */
  stagger?: number;
  /** Z-depth letters travel from (px) */
  depth?: number;
  /** Run animation only once on mount (default true) */
  once?: boolean;
  /** Subtle looping letter-spacing breathe after entrance */
  breathe?: boolean;
}

/**
 * Splits text into letters and animates each with a 3D
 * translateZ + opacity entrance. GPU-only, runs once.
 * Respects prefers-reduced-motion.
 */
const Letters3D = ({
  text,
  className,
  delay = 0,
  stagger = 40,
  depth = 200,
  once = true,
  breathe = false,
}: Letters3DProps) => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    if (reduced) {
      letters.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const animate = () => {
      letters.forEach((el, i) => {
        el.style.transitionDelay = `${delay + i * stagger}ms`;
        el.style.opacity = "1";
        el.style.transform = "translate3d(0,0,0)";
      });
    };

    // Defer one frame so initial styles apply first
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [text, delay, stagger, once]);

  const chars = Array.from(text);

  return (
    <span
      ref={rootRef as React.Ref<HTMLSpanElement>}
      className={cn("inline-block [transform-style:preserve-3d]", className)}
      style={{ perspective: "800px" }}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          data-letter
          aria-hidden="true"
          className="inline-block will-change-transform"
          style={{
            opacity: 0,
            transform: `translate3d(0, 12px, -${depth}px) rotateX(-35deg)`,
            transition:
              "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease-out",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
};

export default Letters3D;
