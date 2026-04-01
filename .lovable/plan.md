

## Plan: Hero placeholder image + Work skeleton cards

### 1. Hero: Show uploaded image as backdrop while video loads

**File: `src/pages/Index.tsx`**

- Copy `user-uploads://Still01_1.webp` to `src/assets/hero-poster.webp`
- Import the image and render it as an `<img>` behind the video, covering the full hero area
- Remove the `bg-black/40` from the loader overlay (the image itself provides the backdrop)
- When video finishes loading (`onLoadedData`), the video fades in via `opacity-0 → opacity-100` (already implemented with `transition-opacity duration-1000`), naturally covering the poster image

The poster image loads almost instantly (static image vs video), so users see meaningful content immediately instead of a black screen.

### 2. Work page: Skeleton placeholders for project cards

**File: `src/pages/Work.tsx`**

- Add a `useState` for image loaded state per card
- Show each card container immediately with its correct grid span and a skeleton placeholder (dark gray with a subtle shimmer animation)
- When the thumbnail `<img>` fires `onLoad`, fade in the image over the skeleton
- Remove the current `opacity-0 translate-y-8` entrance animation (which hides cards entirely until intersection) — instead, show the skeleton frame right away so users see the grid structure

**File: `src/index.css`**

- Add a `skeleton-shimmer` keyframe animation: a left-to-right gradient sweep on the placeholder background

### Summary

| File | Change |
|------|--------|
| `src/assets/hero-poster.webp` | Copy uploaded image |
| `src/pages/Index.tsx` | Add poster image behind video as loading backdrop |
| `src/pages/Work.tsx` | Skeleton placeholders visible immediately, images fade in on load |
| `src/index.css` | Add shimmer animation keyframe |

