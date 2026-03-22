

## Plan: Add Book Section to Sidebar on Drawing & Photographs Pages

### Overview
In the left sidebar of both `/drawing` and `/photographs`, add a book promotion section below the Philosophy text and above the category index. The section includes: book cover image, title, short description, and a purchase link. A placeholder image will be used for easy replacement.

### Sidebar Layout (top to bottom)
```text
┌─────────────────────┐
│ Philosophy (header)  │
│ philosophy text...   │
│                      │
│ ── Book Section ──   │  ← NEW
│ [book cover image]   │
│ Book Title           │
│ Short description    │
│ [Purchase Link →]    │
│                      │
│ ── Category Index ── │  ← moved down
│ Artifacts,Nature...  │
│ Conceptual Photo...  │
└─────────────────────┘
```

### Changes

#### 1. Create shared book data (`src/data/books.ts`)
- Trilingual book info for both pages (drawing book + photography book, or same book)
- Fields: `coverSrc`, `title`, `description`, `purchaseUrl` — all with `{ en, zh, fr }` where appropriate
- Placeholder cover image from Unsplash, stored concept: real images go to `public/photographs/` or `public/images/`

#### 2. Update `src/pages/Photographs.tsx`
- Import book data
- Insert book section between philosophy `<div>` and the category `<nav>`
- Book cover image (clickable, links to purchase), title, description, purchase link
- Category nav gets more top margin to sit lower on the page

#### 3. Update `src/pages/Drawing.tsx`
- Same structure as Photographs — book section between philosophy and category nav
- Can use a different book or same book depending on content

### File Changes

| File | Action |
|---|---|
| `src/data/books.ts` | Create — shared book data with placeholder image |
| `src/pages/Photographs.tsx` | Add book section in sidebar |
| `src/pages/Drawing.tsx` | Add book section in sidebar |

