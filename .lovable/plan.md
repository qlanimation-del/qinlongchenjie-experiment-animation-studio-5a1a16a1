

## Add Thumbnail Strip to ImageLightbox

### Overview
Add a horizontally scrollable thumbnail strip at the bottom of the lightbox overlay. The active thumbnail is highlighted; clicking any thumbnail jumps to that image. Works well on both desktop and mobile.

### Changes — `src/components/ImageLightbox.tsx`

1. **Add `onGoTo` callback prop** — accepts an index, passed from `ProjectGallery` via `setLightboxIndex`.

2. **Reduce main image max-height** from `85vh` to `70vh` (desktop) / keep flexible on mobile to make room for thumbnails.

3. **Add thumbnail strip** below the main image area:
   - Horizontal scrollable container (`overflow-x-auto`, `flex`, `gap-2`) pinned to bottom.
   - Each thumbnail: `w-14 h-14 sm:w-16 sm:h-16` with `object-cover`, `rounded`, `cursor-pointer`.
   - Active thumbnail: `ring-2 ring-white opacity-100`; inactive: `opacity-50 hover:opacity-80`.
   - Auto-scroll active thumbnail into view using a `ref` + `scrollIntoView`.
   - Hide scrollbar with `scrollbar-hide` utility.

4. **Move the counter** (`1 / N`) above the thumbnail strip or remove it (thumbnails make it redundant).

### Changes — `src/components/ProjectGallery.tsx`

5. **Pass `onGoTo`** prop to `ImageLightbox`:
   ```
   onGoTo={(i) => setLightboxIndex(i)}
   ```

### Mobile considerations
- Thumbnails use smaller size on mobile (`w-14 h-14`) with touch-friendly horizontal scroll.
- Main image area shrinks slightly to accommodate the strip without overlap.
- `pb-24` padding on the container ensures thumbnails don't overlap navigation.

### Technical details
- Add `useRef` + `useEffect` to scroll active thumbnail into view on index change.
- Add CSS utility `.scrollbar-hide` in `index.css` if not already present (`::-webkit-scrollbar { display: none }`).

