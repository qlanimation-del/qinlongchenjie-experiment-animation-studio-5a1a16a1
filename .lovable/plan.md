

## Plan: Add Drawing and Photographs Pages with Light Theme Navbar

### Overview

Add two new pages (Drawing, Photographs) with white backgrounds, a Stephen Shore-style grid layout (3-column matrix of images with captions), and a navbar that switches to dark text on these light-background pages.

### 1. Update Navbar to support light/dark mode

**File: `src/components/Navbar.tsx`**

- Accept a `variant` prop: `"dark"` (default, current behavior) or `"light"` (for white-bg pages)
- When `variant="light"`:
  - Logo text: `text-black` instead of `text-white`
  - Subtitle: `text-black/70` instead of `text-white/70`
  - Nav links: `text-black/70` / `text-black` instead of white variants
  - Hamburger icon: `text-black`
  - Globe icon in LanguageSwitcher: needs variant prop too

**File: `src/components/LanguageSwitcher.tsx`**

- Accept a `variant` prop to switch text colors (white vs black)

**File: `src/components/Layout.tsx`**

- Accept a `navVariant` prop, pass it through to `<Navbar variant={navVariant} />`
- Accept optional `className` for the outer wrapper (to set `bg-white` on light pages)

### 2. Add translation keys

**File: `src/i18n/translations.ts`**

Add nav entries:
```
drawing: { en: "DRAWING", zh: "绘画", fr: "DESSIN" }
photographs: { en: "PHOTOGRAPHS", zh: "摄影", fr: "PHOTOGRAPHIES" }
```

### 3. Update nav links order

**File: `src/components/Navbar.tsx`**

Add two links after WORK:
```
WORK → DRAWING → PHOTOGRAPHS → TEAM → CONTACT
```

### 4. Create placeholder image data files

**File: `src/data/drawings.ts`**

Array of ~9-12 items, each with:
- `src`: free placeholder image URL (e.g. from picsum.photos or unsplash with specific dimensions to vary aspect ratios)
- `title`: en/zh/fr caption
- `medium`: en/zh/fr (e.g. "Oil on canvas, 2023")

**File: `src/data/photographs.ts`**

Same structure, ~9-12 items with photography-themed placeholders.

### 5. Create the two new pages

**File: `src/pages/Drawing.tsx`**
**File: `src/pages/Photographs.tsx`**

Both follow the same layout pattern inspired by stephenshore.net:
- `<Layout navVariant="light" className="bg-white">`
- 3-column CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)
- Each cell: image at natural aspect ratio + caption text below (title + medium/description)
- Text in dark/gray tones on white background
- Generous spacing between items
- Images use `object-contain` or natural sizing to respect original proportions

### 6. Register routes

**File: `src/App.tsx`**

Add lazy imports and routes:
```tsx
const Drawing = lazy(() => import("./pages/Drawing"));
const Photographs = lazy(() => import("./pages/Photographs"));

<Route path="/drawing" element={<Drawing />} />
<Route path="/photographs" element={<Photographs />} />
```

### 7. Footer adaptation

The Footer currently has dark background. On light pages, it should also adapt. Add a `variant` prop to Footer or keep it dark as a design contrast element — keeping it dark provides a natural visual anchor.

### Files to create
- `src/pages/Drawing.tsx`
- `src/pages/Photographs.tsx`
- `src/data/drawings.ts`
- `src/data/photographs.ts`

### Files to modify
- `src/components/Navbar.tsx` — add `variant` prop for light/dark
- `src/components/LanguageSwitcher.tsx` — add `variant` prop
- `src/components/Layout.tsx` — pass variant + bg class
- `src/App.tsx` — add routes
- `src/i18n/translations.ts` — add translation keys

