import { useEffect, useState } from "react";

/**
 * Subscribes to device orientation and returns normalized tilt values
 * in the range [-1, 1] for x (left/right) and y (front/back).
 * Returns {x:0,y:0} on desktop or when sensors are unavailable.
 */
export function useDeviceTilt(maxDeg = 25): { x: number; y: number } {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const handler = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right [-90,90]
      const beta = e.beta ?? 0;   // front/back [-180,180]
      const x = Math.max(-1, Math.min(1, gamma / maxDeg));
      const y = Math.max(-1, Math.min(1, (beta - 45) / maxDeg));
      pending = { x, y };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (pending) setTilt(pending);
          raf = 0;
        });
      }
    };

    window.addEventListener("deviceorientation", handler, { passive: true });
    return () => {
      window.removeEventListener("deviceorientation", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maxDeg]);

  return tilt;
}
