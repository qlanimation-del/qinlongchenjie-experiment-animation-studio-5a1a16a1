

## Plan: Add Video to Resonance + Fix Arrow Click + Adjust Video Aspect

### Changes

#### 1. Fix scroll arrow click (`src/components/ParallaxHero.tsx`)
- Add `pointer-events-none` to the vignette layer div (line 63) and the image layer div (line 76) so clicks pass through to the button.

#### 2. Support multiple videos (`src/data/projects.ts`)
- Change `videoUrl?: string` to `videoUrl?: string | string[]` in the `Project` interface.
- Change `videoAspect?: string` to `videoAspect?: string | string[]`.
- Update the resonance project entry:
  - `videoUrl: ["https://player.vimeo.com/video/72798344?h=1f250d5e92", "https://player.vimeo.com/video/1175336696?h=e67e868106"]`
  - `videoAspect: ["16/9", "2.39/1"]` — the new video is 16:9, the existing video appears to be ultra-wide cinematic (~2.39:1).

#### 3. Render multiple videos (`src/pages/ProjectDetail.tsx`)
- Update the video section to normalize `videoUrl` into an array and loop over it.
- Each video gets its own container with the corresponding aspect ratio from the `videoAspect` array (or defaults to 16:9).
- For non-standard aspects (like the existing wide video), the container will use the correct `aspectRatio` style and remove `aspect-video` so the frame matches the content shape.

### Technical Detail

```tsx
// Normalize to arrays
const videoUrls = Array.isArray(project.videoUrl) ? project.videoUrl : project.videoUrl ? [project.videoUrl] : [];
const videoAspects = Array.isArray(project.videoAspect) ? project.videoAspect : project.videoAspect ? [project.videoAspect] : [];

// Render each video
{videoUrls.map((url, i) => {
  const aspect = videoAspects[i];
  const isVertical = aspect === "9/16";
  return (
    <div key={i} className="mb-6">
      <div className={`mx-auto rounded-lg overflow-hidden ${isVertical ? 'max-w-[65%] sm:max-w-[50%]' : 'w-full bg-black/20'}`}
           style={{ aspectRatio: aspect || "16/9" }}>
        <iframe ... src={url} />
      </div>
    </div>
  );
})}
```

Files modified: `ParallaxHero.tsx`, `projects.ts`, `ProjectDetail.tsx`

