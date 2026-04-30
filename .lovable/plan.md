## Goal

1. **Add museum-style caption metadata (medium / duration / edition / courtesy)** to all 7 remaining projects (currently only `beyond-orbit` and `between-us` have it).
2. **Smooth out desktop parallax scroll** on `ParallaxHero` — eliminate jitter caused by the dual-rAF + scaleBase interaction.

---

## Part A — Caption data for all works

`WorkCaption` already auto-renders any subset of: `medium`, `duration`, `edition`, `commissionedBy`, `courtesy`. Only the data is missing for 7 projects.

Fill in `src/data/projects.ts` for the following IDs (all three locales en/zh/fr). Defaults proposed below — please scan and adjust before approval if anything needs to change:

| id | year | medium | duration | edition / courtesy |
|---|---|---|---|---|
| `tiny-worlds` (IN-BETWEEN) | 2023–2024 | Single-channel animation, color, sound | (from existing credits, need to confirm) | Edition of 5 + 2 AP / Courtesy the artists |
| `gafa-logo` | 2023 | Motion graphics, color, sound | TBA | Commissioned by Guangzhou Academy of Fine Arts |
| `entering-cloud` | 2022 | Naked-eye 3D installation, color, sound | TBA | Commissioned by client (to confirm) |
| `resonance` | 2018 | Commercial film, color, sound | TBA | Commissioned by client (to confirm) |
| `fizzy-pop` | 2014 | Single-channel animation, color, sound | TBA | Courtesy the artists |
| `shadows-within` | 2013 | Single-channel animation, color, sound | TBA | Courtesy the artists |
| `dreamscape` | 2011 | Single-channel animation, color, sound | TBA | Courtesy the artists |

For commissioned commercial works, use `commissionedBy` instead of `edition`. For DUST, also add `commissionedBy` as `Personal Project` if you want consistency (optional).

Output: each project gets up to 5 new fields (`medium`, `duration`, `edition` OR `commissionedBy`, `courtesy`). Existing fields untouched.

---

## Part B — Fix desktop parallax jitter

Root cause in `src/components/ParallaxHero.tsx`:

- A `scroll` listener writes to `scrollYRef` inside `requestAnimationFrame`.
- A separate **infinite rAF loop** then reads that ref and calls `setScrollY` every frame, **even when the user isn't scrolling** — forcing React to re-render the entire hero on every frame, which competes with the browser's compositor and causes micro-stutters on desktop where parallax travel is largest (×0.4 / ×0.6).
- All transforms are applied to React-rendered `<div>` style props, so each frame triggers reconciliation + style recalc for ~5 nodes.

### Fix

Replace the dual-rAF state pattern with a single rAF that mutates DOM transforms directly via refs — no `setScrollY`, no per-frame React render.

```text
useEffect:
  - register one passive scroll listener
  - inside listener: if (!ticking) requestAnimationFrame(update); ticking = true
  - update(): read window.scrollY, write transform strings to each layerRef.current.style.transform; ticking = false
```

Concretely:

1. Create `layerRefs = useRef<(HTMLDivElement | null)[]>([])`, `titleRef`, store `[]` per layer.
2. In JSX, attach `ref={el => layerRefs.current[i] = el}` to each parallax wrapper div, drop `transform` from its inline style (keep only `zIndex`, `willChange:transform`).
3. Compute the static `scale` part once (it doesn't depend on scroll) and bake it into the `update()` transform string together with the dynamic `translateY`.
4. Remove the `useState scrollY`, the second rAF loop, and the `titleOpacity` / `titleTranslateY` JSX bindings — apply both directly to `titleRef.current.style` inside `update()`.
5. Run `update()` once on mount so initial transform is correct; cancel the pending rAF on unmount.
6. Add `transform: translate3d(...)` (instead of `translateY`) to force GPU layer promotion and remove sub-pixel snap on desktop. Keep `will-change: transform` only on the wrapper.

Result: zero React re-renders during scroll, transforms applied on the compositor thread, eliminating the desktop jitter. Mobile/tablet behavior preserved (smaller offsets, same `useIsMobile` logic).

---

## Files touched

- `src/data/projects.ts` — add caption fields to 7 projects
- `src/components/ParallaxHero.tsx` — refactor scroll handling to ref-based DOM writes

No visual/layout changes besides the new caption block appearing on each project detail page and smoother scrolling.

---

## Open questions before I implement

- For `entering-cloud` and `resonance`, do you have the actual **commissioning client name** to put in `commissionedBy`? If not I'll write `Commissioned project` as placeholder.
- For durations marked `TBA`, do you want me to leave `TBA` or omit the `duration` field entirely until you supply real values? (`WorkCaption` skips empty fields automatically.)
