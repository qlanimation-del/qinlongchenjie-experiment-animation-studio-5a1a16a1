

## Fix: Lightbox mobile fullscreen + BackToTop conflict

### Problems
1. Lightbox doesn't fill the screen on mobile — bottom area leaks through (safe area / padding issues)
2. BackToTop button (z-9999) appears on top of the lightbox (z-50), causing interaction conflict

### Changes

**1. `src/components/ImageLightbox.tsx`**
- Use `dvh` (dynamic viewport height) to ensure true fullscreen on mobile: `h-[100dvh]` alongside `inset-0`
- Add safe-area padding: `pb-[env(safe-area-inset-bottom)]` to the thumbnail strip so it doesn't get cut off by phone notch/home bar
- Increase z-index to `z-[10000]` to sit above BackToTop's `z-[9999]`

**2. `src/components/BackToTop.tsx`**
- Hide when lightbox is open: check `document.body.style.overflow === 'hidden'` (already set by lightbox) — simpler approach: just ensure z-index is below lightbox. Since lightbox will be `z-[10000]`, BackToTop at `z-[9999]` will naturally be hidden behind the lightbox overlay.

Actually, the real issue is BackToTop has `z-[9999]` while lightbox has `z-50`. Fix: raise lightbox to `z-[10000]`.

### Summary of edits

| File | Change |
|------|--------|
| `ImageLightbox.tsx` line 43 | `z-50` → `z-[10000]`, add `h-[100dvh]` |
| `ImageLightbox.tsx` line 85 | Add `pb-[env(safe-area-inset-bottom)]` to thumbnail strip |

Two lines changed, no functional or design impact beyond fixing these bugs.

