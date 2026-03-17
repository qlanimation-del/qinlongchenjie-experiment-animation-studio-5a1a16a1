

## Plan: Reorganize Parallax Assets, Remove Videos, Add Two New Projects

### Current Problem

Only IN-BETWEEN has dedicated parallax files (`parallax-bg.webp`, `parallax-mid.webp`, `parallax-top.webp`). All other projects reuse their single thumbnail image for all 3 parallax layers, making it impossible to replace background/mid/top layers independently.

### 1. Create Dedicated Parallax Image Files for Every Project

Create placeholder copies (initially duplicating the existing thumbnail) so you can later replace each file individually.

**New files in `src/assets/`** (naming convention: `{project}-parallax-{layer}.webp`):

```
dust-parallax-bg.webp
dust-parallax-mid.webp
dust-parallax-top.webp

between-parallax-bg.webp
between-parallax-mid.webp
between-parallax-top.webp

inbetween-parallax-bg.webp    (rename existing parallax-bg/mid/top)
inbetween-parallax-mid.webp
inbetween-parallax-top.webp

resonance-parallax-bg.webp
resonance-parallax-mid.webp
resonance-parallax-top.webp

fizzy-parallax-bg.webp
fizzy-parallax-mid.webp
fizzy-parallax-top.webp

shadows-parallax-bg.webp
shadows-parallax-mid.webp
shadows-parallax-top.webp

dreamscape-parallax-bg.webp
dreamscape-parallax-mid.webp
dreamscape-parallax-top.webp

cloud-parallax-bg.webp        (new project)
cloud-parallax-mid.webp
cloud-parallax-top.webp

gafa-parallax-bg.webp         (new project)
gafa-parallax-mid.webp
gafa-parallax-top.webp
```

Since I cannot create binary image files, these will initially be copies of existing placeholder images. You replace them with your real artwork later.

### 2. Remove Video from DUST and Between Us

**File: `src/data/projects.ts`**
- Remove `videoUrl` property from the `beyond-orbit` (DUST) project entry
- Remove `videoUrl` property from the `between-us` project entry

The `ProjectDetail.tsx` already conditionally renders the video block (`{project.videoUrl && ...}`), so removing the field is sufficient — no template changes needed. The metadata grid (year/crew/client) will need to be moved outside the video conditional block so it still shows.

### 3. Move Metadata Grid Outside Video Conditional

**File: `src/pages/ProjectDetail.tsx`**

Currently the year/crew/client metadata grid is nested inside `{project.videoUrl && ...}`. It needs to render independently so projects without videos still show metadata. Extract the grid to always render after the description.

### 4. Add New Project: Entering the Cloud (2022)

**File: `src/data/projects.ts`**

New project entry inserted chronologically (between IN-BETWEEN 2023 and Naturally Yours 2018):

- `id: "entering-cloud"`
- `title: "Entering the Cloud"`
- `year: "2022"`
- `thumbnail: cloudThumb` (new file `src/assets/project-cloud.webp`)
- `videoUrl`: placeholder Vimeo URL
- Parallax layers pointing to the 3 new `cloud-parallax-*` files
- Gallery images: 6 new files `src/assets/gallery/cloud-1.webp` through `cloud-6.webp`
- Placeholder description, credits, exhibitions in en/zh/fr

### 5. Add New Project: Logo for GAFA Animation Major (2023)

**File: `src/data/projects.ts`**

New project entry inserted chronologically (between IN-BETWEEN 2023 and Entering the Cloud 2022):

- `id: "gafa-logo"`
- `title: "Logo for GAFA Animation Major"`
- `year: "2023"`
- `thumbnail: gafaThumb` (new file `src/assets/project-gafa.webp`)
- Parallax layers pointing to 3 new `gafa-parallax-*` files
- Gallery images: 6 new files `src/assets/gallery/gafa-1.webp` through `gafa-6.webp`
- Placeholder description, credits in en/zh/fr

### 6. Update Imports in projects.ts

Add imports for all new parallax files, thumbnails, and gallery images. Update existing projects to reference their dedicated parallax files instead of reusing thumbnails.

### New Asset Files to Create

```
src/assets/project-cloud.webp          (thumbnail)
src/assets/project-gafa.webp           (thumbnail)
src/assets/dust-parallax-bg.webp
src/assets/dust-parallax-mid.webp
src/assets/dust-parallax-top.webp
src/assets/between-parallax-bg.webp
src/assets/between-parallax-mid.webp
src/assets/between-parallax-top.webp
src/assets/inbetween-parallax-bg.webp
src/assets/inbetween-parallax-mid.webp
src/assets/inbetween-parallax-top.webp
src/assets/resonance-parallax-bg.webp
src/assets/resonance-parallax-mid.webp
src/assets/resonance-parallax-top.webp
src/assets/fizzy-parallax-bg.webp
src/assets/fizzy-parallax-mid.webp
src/assets/fizzy-parallax-top.webp
src/assets/shadows-parallax-bg.webp
src/assets/shadows-parallax-mid.webp
src/assets/shadows-parallax-top.webp
src/assets/dreamscape-parallax-bg.webp
src/assets/dreamscape-parallax-mid.webp
src/assets/dreamscape-parallax-top.webp
src/assets/cloud-parallax-bg.webp
src/assets/cloud-parallax-mid.webp
src/assets/cloud-parallax-top.webp
src/assets/gafa-parallax-bg.webp
src/assets/gafa-parallax-mid.webp
src/assets/gafa-parallax-top.webp
src/assets/gallery/cloud-1.webp ~ cloud-6.webp
src/assets/gallery/gafa-1.webp ~ gafa-6.webp
```

All placeholder images will initially copy from existing project thumbnails. You can then replace each file with the correct artwork.

### Files to Modify
- `src/data/projects.ts` — update all parallax imports, remove 2 videoUrls, add 2 new projects
- `src/pages/ProjectDetail.tsx` — extract metadata grid from video conditional

### Chronological Order After Changes (new → old)
1. DUST — 2026-Present
2. Between Us and the World — 2025
3. IN-BETWEEN — 2023-2024
4. Logo for GAFA Animation Major — 2023
5. Entering the Cloud — 2022
6. Naturally Yours — 2018
7. YEAR OF FATE — 2014
8. INTROSPECTION — 2013
9. Life's Track — 2011

