

## Plan: Professional polish enhancements (zero performance cost)

These additions use only CSS animations, existing DOM events, and lightweight inline code — no new libraries, no extra network requests.

---

### 1. Custom cursor glow (CSS only)

Add a subtle radial gradient that follows the mouse on the page body, giving a cinematic "spotlight" feel. Implemented with a single `mousemove` listener updating CSS custom properties, and a `radial-gradient` on a pseudo-element. Pure CSS + 3 lines of JS. No repaints — uses `pointer-events: none` overlay with `will-change: transform`.

**Files:** `src/components/Layout.tsx`, `src/index.css`

### 2. Smooth page transition effect

Wrap route changes in a brief fade/slide animation using CSS transitions on the `<main>` element. When navigating between pages, content fades out then in (200ms). Uses `useLocation` key change + CSS transition — no animation library needed.

**Files:** `src/components/Layout.tsx`, `src/index.css`

### 3. Magnetic hover on nav links (desktop)

Desktop nav links subtly shift toward the cursor when hovering nearby, creating a "magnetic" interactive feel common on award-winning studio sites. Pure JS `mousemove` on each link element with `transform: translate()`. Resets on mouse leave.

**Files:** `src/components/Navbar.tsx`

### 4. Text reveal animation on section headings

Section headings (Who We Are, What We Do, etc.) use a clip-path or translateY per-line reveal as they scroll into view, instead of the current simple fade-up. Still uses IntersectionObserver, just a more cinematic CSS animation.

**Files:** `src/components/AnimatedSection.tsx`, `src/index.css` — add a new variant `reveal` with a mask/clip animation

### 5. Footer: Subtle separator line animation

Add a thin horizontal line above the footer that draws itself from center outward when scrolled into view (CSS `scaleX` transition triggered by IntersectionObserver). A small but polished touch.

**Files:** `src/components/Footer.tsx`

---

### Summary

| Enhancement | File(s) | Technique | Performance impact |
|---|---|---|---|
| Cursor glow spotlight | Layout, CSS | CSS custom property + pseudo-element | Near zero |
| Page transitions | Layout, CSS | CSS opacity/transform on route change | Near zero |
| Magnetic nav links | Navbar | JS mousemove + transform | Near zero |
| Text reveal headings | AnimatedSection, CSS | CSS clip-path + IntersectionObserver | Near zero |
| Footer line draw | Footer | CSS scaleX + IntersectionObserver | Near zero |

All changes are CSS/JS only — no new dependencies, no extra assets, no additional network requests.

