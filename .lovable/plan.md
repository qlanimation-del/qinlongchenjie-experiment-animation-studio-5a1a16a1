

## Plan: Add Placeholder Photographs + Organize File Structure

### Overview
Add ~10 placeholder photograph entries with free network images (Unsplash), organized by category and sorted newest-to-oldest. Create a dedicated `public/photographs/` directory (parallel to `public/images/` for drawings) so photo assets are cleanly separated and easy to swap later.

### Changes

#### 1. Create `public/photographs/` directory
- Add a `README.md` inside explaining the naming convention and how to replace images
- This keeps photo assets separate from drawing assets in `public/images/`

#### 2. Populate `src/data/photographs.ts` with ~10 entries
- Use free Unsplash image URLs (direct links, no API needed)
- 3 categories with trilingual labels:
  - **Urban Fragments / 城市碎片** (2024-2025) — 4 photos
  - **Still Life / 静物** (2023-2024) — 3 photos  
  - **Nature / 自然** (2022-2023) — 3 photos
- Each entry follows the existing `ArtworkItem` interface with `id`, `src`, `title`, `medium`, `year`, `category`
- IDs use `p1`, `p2`, ... prefix (distinct from drawing `d` prefix)
- Sorted by year descending within each category
- Comments in the file clearly mark each category section for easy editing

#### 3. Add `public/photographs/README.md`
- Document naming convention: `{category}-{number}.webp`
- Explain how to replace: drop real files here, update `src` paths in `photographs.ts`

#### 4. No page code changes needed
- `Photographs.tsx` already has the grouping, sorting, lightbox, and empty-state logic identical to Drawing.tsx — it will automatically render once data is added

### File Changes

| File | Action |
|---|---|
| `src/data/photographs.ts` | Add ~10 entries with Unsplash URLs, categorized & sorted |
| `public/photographs/README.md` | Create with asset management instructions |

