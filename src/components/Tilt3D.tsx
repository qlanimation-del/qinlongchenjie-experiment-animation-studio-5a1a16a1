import { ReactNode, CSSProperties, useRef, useEffect, useState } from "react";
import { useDeviceTilt } from "@/hooks/useDeviceTilt";
import { usePerfMode } from "@/hooks/usePerfMode";
import { cn } from "@/lib/utils";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  /** Max degrees of rotation on each axis */
  maxRotate?: number;
  /** Z translation amplitude in px */
  depth?: number;
  /** Show a subtle glare highlight that follows the tilt */
  glare?: boolean;
  /** Perspective in px */
  perspective?: number;
}

/**
 * Wraps content with live 3D tilt driven by:
 * - Mouse position (desktop, on hover)
 * - Device gyroscope (mobile, always)
 * Adds an optional moving glare highlight for images/cards.
 */
const Tilt3D = ({
  children,
  className,
  maxRotate = 10,
  depth = 30,
  glare = true,
  perspective = 900,
}: Tilt3DProps) => {
  const tilt = useDeviceTilt(30);
  const degraded = usePerfMode();
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      pending = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (pending) setMouse(pending);
          raf = 0;
        });
      }
    };
    const onLeave = () => setMouse(null);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mouse wins when present; otherwise gyroscope on mobile
  const x = mouse ? mouse.x : tilt.x;
  const y = mouse ? mouse.y : tilt.y;

  if (degraded) {
    return <div className={className}>{children}</div>;
  }

  const rotX = (-y * maxRotate).toFixed(2);
  const rotY = (x * maxRotate).toFixed(2);
  const tz = (Math.hypot(x, y) * depth).toFixed(2);

  const style: CSSProperties = {
    transformStyle: "preserve-3d",
    transform: `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0,0,${tz}px)`,
    transition: mouse ? "transform 180ms ease-out" : "transform 400ms ease-out",
    willChange: "transform",
  };

  const glareStyle: CSSProperties = {
    background: `radial-gradient(circle at ${50 + x * 40}% ${50 + y * 40}%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%)`,
    mixBlendMode: "overlay",
    opacity: Math.min(0.9, Math.hypot(x, y) * 0.9 + 0.1),
    transition: "opacity 200ms ease-out, background 200ms ease-out",
  };

  return (
    <div ref={ref} className={cn("relative", className)} style={style}>
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={glareStyle}
        />
      )}
    </div>
  );
};

export default Tilt3D;
