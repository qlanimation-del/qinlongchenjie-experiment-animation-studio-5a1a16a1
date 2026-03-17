

## Plan: Add Left Sidebar Text to Drawing and Photographs Pages

### Layout Change

Convert both pages from a centered grid to a two-column layout: a narrow left text column + wider right image grid. Both columns scroll together normally. The outer container uses the same `max-w-7xl mx-auto px-4 md:px-6` as the Navbar to ensure the left text aligns with the logo.

### Left Column Content (within first viewport height)

**Upper section** — Artist statement / philosophy (small text, 2-3 sentences)
**Lower section** — Mini catalog list with dates

#### Photographs Page:
- **Upper**: Brief photography philosophy text (en/zh/fr)
- **Lower**: Catalog entries like:
  - *Mountain Pass* — 2023
  - *Empty Road* — 2022
  - etc.

#### Drawing Page:
- **Upper**: Brief drawing philosophy text (en/zh/fr)
- **Lower**: Catalog entries like:
  - *Untitled No.1* — 2023
  - *Fragment Series I* — 2023
  - etc.

### Responsive Behavior

- **Desktop (lg+)**: Two-column layout — left sidebar ~200px, right grid takes remaining space
- **Mobile/tablet**: Left text stacks above the grid (single column)

### Files to Modify
- `src/pages/Drawing.tsx` — add left sidebar with philosophy + catalog
- `src/pages/Photographs.tsx` — same structure with photography content

No new files needed. Catalog data is derived from the existing `drawings` and `photographs` arrays.

