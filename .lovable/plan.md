

## Plan: Fix Arrow Centering + Back-to-Top Visibility + Build Error

### Issues
1. **Down arrow not centered** in ParallaxHero — the button uses `left-1/2 -translate-x-1/2` via Tailwind class but the wrapper div at line 50 has `overflow-hidden`, which should be fine. The real issue: the ParallaxHero component's scroll-down button at line 109-114 lacks proper centering on all viewports.
2. **Back-to-top button not showing on desktop** — the `showBackToTop` triggers at `scrollY > 400`, which should work. Likely the button is hidden behind other elements or the scroll threshold isn't being reached on desktop. The `bottom-14` positioning may conflict with the footer on desktop.
3. **Build error** — `videoAspect` was removed from the `Project` interface but is still referenced in `ProjectDetail.tsx`.

### Changes

**File: `src/data/projects.ts`**
- Re-add `videoAspect?: string` to the `Project` interface (fixes build error).
- Re-add `videoAspect: "9/16"` to the entering-cloud project data.

**File: `src/components/ParallaxHero.tsx`**
- The scroll-down button already has `left-1/2 -translate-x-1/2`. Ensure it also has `w-full flex justify-center` approach or verify the absolute positioning works. Current code looks correct with `-translate-x-1/2`. The issue may be that `left-1/2` calculates based on the parent which is `w-full`. This should be fine — let me check if the wrapping div in ProjectDetail (line 50) with `overflow-hidden` clips it. The button is inside ParallaxHero which is inside that div. It should be fine.
- Actually, looking more carefully: the button uses inline class `-translate-x-1/2` which should center it. But on mobile, `safe-area-inset` or other layout shifts could offset it. A more robust approach: wrap it in a full-width flex container instead of absolute positioning.

**File: `src/pages/ProjectDetail.tsx`**
- Remove references to `videoAspect` OR re-add the property to the interface. Since the plan was approved, re-add it.
- For back-to-top: change `bottom-14` to `bottom-8` and ensure `z-50` is high enough. Also check if the Layout/Footer might be covering it.

### Specific Changes

1. **`src/data/projects.ts` line 122**: Add `videoAspect?: string;` back to interface
2. **`src/data/projects.ts` entering-cloud entry**: Add `videoAspect: "9/16"` back
3. **`src/components/ParallaxHero.tsx` lines 109-114**: Change the button from absolute+left-1/2 to a full-width flex container for reliable centering
4. **`src/pages/ProjectDetail.tsx` line 158-165**: Adjust back-to-top button positioning, ensure it's visible on desktop (increase z-index, adjust bottom offset)

