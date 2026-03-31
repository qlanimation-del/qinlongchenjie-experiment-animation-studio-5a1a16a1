

## Upgrade: Video loader with percentage progress

### Current state
A small 40px spinning ring — functional but underwhelming.

### New design
A centered circular progress indicator with percentage text:
- **Larger ring** (80px) with a gradient stroke effect using CSS `conic-gradient`
- **Percentage counter** in the center that counts from 0% to 100%
- Smooth pulse glow animation on the ring
- When video loads, percentage jumps to 100% then fades out

### Changes

**`src/pages/Index.tsx`** — Replace the simple spinner (lines 25-27) with a React state-driven loader component:

```tsx
// Inside the hero section, replace the loader div with:
// - useState for progress (0-100)
// - useEffect with setInterval to simulate progress (fast at start, slows near 90%, jumps to 100% on video load)
// - Circular progress ring using SVG (stroke-dasharray/dashoffset)
// - Percentage text in center
// - Fade-out animation when complete
```

The loader will be a `<div>` containing:
1. An SVG circle (80px) with animated `stroke-dashoffset` driven by progress state
2. A glowing outer ring effect via `box-shadow` animation
3. Centered percentage text (`{progress}%`) with `tabular-nums` font
4. On `onLoadedData`, set progress to 100 → after 300ms delay, fade out and remove

**`src/index.css`** — Add a subtle pulse-glow keyframe for the ring's outer glow.

### Summary

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Replace spinner with SVG circular progress + percentage |
| `src/index.css` | Add glow pulse keyframe |

