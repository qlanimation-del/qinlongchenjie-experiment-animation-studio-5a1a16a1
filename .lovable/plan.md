

## Plan: Back-to-Top Button, Performance Cleanup, and Analytics

### Issue 1: Back-to-Top Button Missing

The back-to-top button currently only exists in `ProjectDetail.tsx`. It was never added to other pages. The fix is to move this into a shared component and include it in `Layout.tsx` so it appears on every page automatically.

**Changes:**
- Create `src/components/BackToTop.tsx` — a self-contained component with its own scroll listener and visibility state
- Add `<BackToTop />` to `Layout.tsx` so it renders on all pages
- Remove the duplicate back-to-top button from `ProjectDetail.tsx`

### Issue 2: Performance / Code Cleanup

**Console warnings to fix:**
- `AnimatedSection`, `Footer`, and `VimeoIcon` have "Function components cannot be given refs" warnings. These are caused by React trying to pass refs to function components. Fix by wrapping with `React.forwardRef` where needed, or removing unnecessary ref passing.

**Navbar scroll performance:**
- `Navbar.tsx` calls `forceRender` (setState) on every scroll event, causing a full re-render of the navbar on every pixel scrolled. This is wasteful. Refactor to use CSS transitions or throttle updates.

**Other cleanup:**
- Remove Chinese code comments scattered across `ParallaxHero.tsx` and `Photographs.tsx`
- Ensure all images use `loading="lazy"` and `decoding="async"` consistently
- Videos already use `loading="lazy"` on iframes

### Issue 3: Website Analytics

Lovable has built-in analytics. I can enable it for your project so you can see visitor counts, page views, and traffic sources directly in the Lovable dashboard.

**Options:**
- **Lovable Analytics** (simplest) — built-in, no code changes needed
- **Google Analytics** — add GA4 tag to `index.html` if you want more detailed tracking
- **Umami / Plausible** — privacy-friendly alternatives

### Summary of File Changes

| File | Change |
|---|---|
| `src/components/BackToTop.tsx` | New shared component with scroll-based visibility |
| `src/components/Layout.tsx` | Add `<BackToTop />` |
| `src/pages/ProjectDetail.tsx` | Remove inline back-to-top button |
| `src/components/AnimatedSection.tsx` | Wrap with `forwardRef` to fix warning |
| `src/components/Footer.tsx` | Wrap with `forwardRef`, fix VimeoIcon ref warning |
| `src/components/Navbar.tsx` | Throttle scroll handler to reduce re-renders |
| `src/components/ParallaxHero.tsx` | Remove Chinese comments |
| `src/pages/Photographs.tsx` | Remove Chinese comments |

