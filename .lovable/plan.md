

## Plan: Fix Parallax Scroll Jank

### Problem
The parallax hero uses React state (`setScrollY`) to drive transforms on every scroll frame. Each `setScrollY` triggers a full React re-render of the component, recalculating all layer positions and causing the browser to do layout/paint work. This is the root cause of the jitter.

### Solution
Replace React state-driven transforms with **direct DOM manipulation via refs**. Instead of storing `scrollY` in state and re-rendering, we'll use `requestAnimationFrame` to directly update each layer's `transform` style property. This bypasses React's render cycle entirely and lets the browser composite smoothly.

### Technical Details

**File: `src/components/ParallaxHero.tsx`**

1. Remove `scrollY` state entirely
2. Create refs for each parallax layer div and the title/chevron elements
3. In the scroll handler (inside rAF), read `window.scrollY` and directly set `.style.transform` on each ref — no `setState`, no re-render
4. Keep `will-change: transform` and add `translate3d` (instead of `translateY`) to force GPU compositing
5. Use `useRef` array for layer elements, assigned via callback refs in the map

Key change pattern:
```
// Before (causes re-render every frame)
setScrollY(window.scrollY);
// style={{ transform: `translateY(${scrollY * 0.4}px)` }}

// After (direct DOM, zero re-renders)
layerRefs.current[i].style.transform = 
  `translate3d(0, ${window.scrollY * 0.4}px, 0) scale(${scale})`;
```

This is a single-file change to `src/components/ParallaxHero.tsx`.

