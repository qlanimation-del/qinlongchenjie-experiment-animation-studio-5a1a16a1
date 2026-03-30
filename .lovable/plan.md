

## Fix: Awards section tablet layout

### Problem
At 768px (tablet/`md` breakpoint), `md:flex-row` activates — awards and mascot sit side-by-side. But the award icons jump to `sm` size (150px) while the mascot takes 280px, creating an oversized white area with poor proportions compared to desktop or mobile.

### Solution
Shift the horizontal layout trigger from `md` (768px) to `lg` (1024px), so tablets use the stacked mobile layout. Also scale down award icons and mascot at `md` to create a smoother transition.

### Changes — `src/pages/Index.tsx`

| Line | Current | New |
|------|---------|-----|
| 119 | `md:flex-row` | `lg:flex-row` |
| 121 | `md:gap-14` | `lg:gap-14` |
| 134 | `md:w-[180px] md:h-[180px]` | `lg:w-[180px] lg:h-[180px]` |
| 145 | `md:max-w-[300px]` | `lg:max-w-[300px]` |

This makes the awards section stack vertically on both mobile and tablet, only going horizontal on desktop (≥1024px), keeping the white area compact on all screen sizes.

