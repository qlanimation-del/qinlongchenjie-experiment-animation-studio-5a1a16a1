

## Plan: Optimize Video Display for Entering the Cloud

### Problem
The "Entering the Cloud" project has a **vertical/portrait video**, but the current embed uses `aspect-video` (16:9), causing black bars on both sides and an ugly dark background.

### Solution
Add a `videoAspect` property to the project data, and use it in `ProjectDetail.tsx` to dynamically set the video container's aspect ratio. For this project, use a portrait ratio (e.g. `9/16`), remove the dark background, and let the video fill naturally.

### Changes

**File: `src/data/projects.ts`**
- Add `videoAspect: "9/16"` to the `entering-cloud` project object.

**File: `src/pages/ProjectDetail.tsx`**
- Read `project.videoAspect` and apply it as a dynamic aspect ratio style.
- When `videoAspect` is set (portrait video), constrain the container width (e.g. `max-w-sm` / ~60% width) and center it, so it doesn't take the full width.
- Remove `bg-black/20` when a custom aspect is provided, keeping the background clean.

```tsx
{project.videoUrl && (
  <div className="mb-12">
    <div
      className={`mx-auto rounded-lg overflow-hidden ${
        project.videoAspect ? 'max-w-[65%] sm:max-w-[50%]' : 'w-full aspect-video bg-black/20'
      }`}
      style={project.videoAspect ? { aspectRatio: project.videoAspect } : undefined}
    >
      <iframe ... />
    </div>
  </div>
)}
```

### Type Update
Add `videoAspect?: string` to the project type definition (if explicitly typed), or just add the property directly to the data.

