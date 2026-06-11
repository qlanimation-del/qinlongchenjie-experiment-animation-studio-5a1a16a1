// Lightweight FPS monitor + degradation flag for heavy visual effects.
// Singleton: starts on first subscribe, stops when no listeners remain.
// Auto-degrades when sustained FPS drops below threshold; effects can
// subscribe and fall back to a lighter animation.

type Listener = (degraded: boolean) => void;

const listeners = new Set<Listener>();
let degraded = false;
let rafId: number | null = null;
let lastFrame = 0;
let lowFrames = 0;
let sampledFrames = 0;
let accumFps = 0;

const FPS_THRESHOLD = 24;          // only treat truly stuttery frames as slow
const LOW_FRAMES_TO_DEGRADE = 120; // ~2s of sustained slow frames before fallback
const SAMPLE_WINDOW = 120;         // log avg fps every ~2s (dev visibility)
const WARMUP_FRAMES = 90;          // ignore first ~1.5s while page settles

let totalFrames = 0;

const tick = (now: number) => {
  if (lastFrame) {
    const delta = now - lastFrame;
    const fps = 1000 / delta;
    accumFps += fps;
    sampledFrames += 1;
    totalFrames += 1;

    if (fps < FPS_THRESHOLD && totalFrames > WARMUP_FRAMES) {
      lowFrames += 1;
      if (!degraded && lowFrames >= LOW_FRAMES_TO_DEGRADE) {
        degraded = true;
        listeners.forEach((l) => l(true));
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.info("[perfMode] degraded → fallback to fade (low FPS sustained)");
        }
      }
    } else {
      // recovery: decay the low-frame counter slowly
      if (lowFrames > 0) lowFrames -= 1;
    }

    if (import.meta.env.DEV && sampledFrames >= SAMPLE_WINDOW) {
      // eslint-disable-next-line no-console
      console.debug(`[perfMode] avg fps ≈ ${(accumFps / sampledFrames).toFixed(1)}, degraded=${degraded}`);
      sampledFrames = 0;
      accumFps = 0;
    }
  }
  lastFrame = now;
  rafId = requestAnimationFrame(tick);
};

const start = () => {
  if (rafId !== null) return;
  lastFrame = 0;
  rafId = requestAnimationFrame(tick);
};

const stop = () => {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  lastFrame = 0;
  lowFrames = 0;
  sampledFrames = 0;
  accumFps = 0;
  totalFrames = 0;
};

export const subscribePerfMode = (l: Listener): (() => void) => {
  listeners.add(l);
  if (listeners.size === 1) start();
  // emit current value
  l(degraded);
  return () => {
    listeners.delete(l);
    if (listeners.size === 0) stop();
  };
};

export const isDegraded = () => degraded;
