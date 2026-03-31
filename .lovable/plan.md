

## Fix: Build failure + Loading animation upgrade

### Problem 1: Build failure (publishing blocked)
`vite.config.ts` line 61 references `lodash`, `axios`, `zustand` in `manualChunks`, but none are installed. Rollup fails trying to resolve them.

### Problem 2: Loading animation not modern enough
Current bouncing dots feel dated and slow. Replace with a minimal, modern CSS spinner — a thin rotating ring that feels fast and premium.

---

### Changes

**1. `vite.config.ts` — Fix build**

Remove the `vendor` chunk line (line 61):

```ts
// Before
manualChunks: {
  react: ["react", "react-dom"],
  vendor: ["lodash", "axios", "zustand"],
},

// After
manualChunks: {
  react: ["react", "react-dom"],
},
```

**2. `src/pages/Index.tsx` — Modern loading animation**

Replace the bouncing dots block (lines 25-41) with a single thin spinning ring:

```tsx
<div id="video-loader" className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
  <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
</div>
```

This is a minimal spinning ring — thin border, partially transparent, smooth rotation. Looks modern, loads instantly, and conveys speed rather than "waiting".

---

### Summary

| File | Change |
|------|--------|
| `vite.config.ts` | Remove unused `vendor` chunk → fixes build/publish |
| `src/pages/Index.tsx` | Replace bouncing dots with spinning ring loader |

