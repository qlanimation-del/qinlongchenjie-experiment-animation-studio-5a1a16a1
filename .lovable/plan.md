

## Plan: Sort by Time + Categorize + Add Lightbox Click + Clean Up Garbage Data

### Current Problems Identified

1. **No time-based sorting** — drawings and photographs are in arbitrary order
2. **No category grouping** — all items are displayed in a flat grid
3. **No click-to-view lightbox** — Drawing and Photographs pages have no image click interaction (ImageLightbox exists but is only used in ProjectGallery)
4. **Duplicate IDs in drawings.ts** — three items share `id: "d10"`
5. **Photographs data is all placeholder** — all 9 photos use `picsum.photos` URLs (fake data)
6. **ProjectGallery generates placeholder.svg fallbacks** — not real content

### Changes

#### 1. Update `ArtworkItem` interface (`src/data/drawings.ts`)
- Add `year: number` field for reliable sorting
- Add `category` field with trilingual labels: `{ en: string; zh: string; fr: string }`

#### 2. Fix and sort `drawings.ts` data
- Fix duplicate IDs (d10 appears 3 times -> d10, d10b, d10c)
- Add `year` and `category` to each item
- Categories for drawings: "After Shock / 春日余震" (2022-2024) and "HUTOON Animation / 降妖高校" (2017)
- Sort descending by year (newest first)

#### 3. Clean up `photographs.ts`
- Remove all 9 picsum placeholder entries (garbage data)
- Leave the array empty or with a comment indicating real data should be added
- The page will show an empty state message instead of fake images

#### 4. Refactor Drawing.tsx and Photographs.tsx pages
- Group items by category, render category headers (year range + category name)
- Within each category, sort newest first
- Add click handler to each image card to open `ImageLightbox`
- Manage lightbox state (open/close, prev/next navigation within the full flat list)
- Sidebar index also groups by category
- Show empty state when no items exist (for Photographs)

#### 5. Responsive and UX details
- Lightbox reuses existing `ImageLightbox` component with keyboard nav + swipe
- On mobile: grid becomes 1-2 columns, category headers stack naturally
- Image cards get `cursor-pointer` and subtle hover scale effect

#### 6. Clean up unused code
- Remove `generatePlaceholderImages` fallback in `ProjectGallery.tsx` (replace with empty array default)
- Remove `public/placeholder.svg` if not used elsewhere

### File Changes Summary

| File | Action |
|---|---|
| `src/data/drawings.ts` | Add `year`, `category` fields; fix duplicate IDs; sort by year desc |
| `src/data/photographs.ts` | Clear placeholder data, keep empty array |
| `src/pages/Drawing.tsx` | Add category grouping, lightbox click, sort by time |
| `src/pages/Photographs.tsx` | Add category grouping, lightbox click, empty state |
| `src/components/ProjectGallery.tsx` | Remove placeholder fallback |
| `public/placeholder.svg` | Delete if unused elsewhere |

