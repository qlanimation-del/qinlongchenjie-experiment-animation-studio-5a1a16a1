

## Fix: Center-align type text and scroll arrow in ParallaxHero

### Problem
- The arrow button (line 199) uses `left-1/2` but has no `translateX(-50%)` — it's offset to the right.
- The type text (line 195) lacks `text-center` so multi-word labels may not appear centered.

### Changes — `src/components/ParallaxHero.tsx`

**1. Arrow container (line 199)** — add `-translate-x-1/2`:
```
<div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[20]">
```

**2. Type text span (line 195)** — add `text-center` to ensure text is centered:
```
<span className="tracking-[0.35em] uppercase text-white drop-shadow-lg text-center">{type}</span>
```

Both are single-property CSS additions. No layout, design, or functional changes.

