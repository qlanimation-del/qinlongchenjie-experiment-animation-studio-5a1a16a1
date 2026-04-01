

## Fix: Eliminate black flash before hero poster image

### Problem
The poster image is loaded as a regular `<img>` tag. Even with `fetchPriority="high"`, there's a brief moment where the black background shows before the image renders — defeating the purpose of the poster.

### Solution
Add the poster image as an **inline CSS background** on the container `<div>`, so it starts rendering immediately as the DOM paints, while keeping the `<img>` tag for full quality. Also add a preload link in `index.html` for the poster image.

### Changes

**`src/pages/Index.tsx`**
- On the outer `<div className="absolute inset-0">` (line 57), add an inline `style` with `backgroundImage` pointing to the imported poster, plus `backgroundSize: 'cover'` and `backgroundPosition: 'center'` — this ensures the container itself has the image as its background paint, visible from the very first frame
- Keep the `<img>` tag as-is for sharp rendering once loaded

**`index.html`**
- Add `<link rel="preload" as="image" href="/src/assets/hero-poster.webp">` in `<head>` to start fetching the poster even before JS bundles execute

