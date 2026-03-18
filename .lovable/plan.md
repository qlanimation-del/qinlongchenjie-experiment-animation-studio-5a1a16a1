

## Plan: Optimize Exhibitions & Credits Display

### Problem
1. Year entries (e.g. "2024", "2025") in exhibitions lists are not visually distinguished — they should be **bold**.
2. On mobile (390px), the text in credits and exhibitions sections is too large and not compact enough.

### Changes

**File: `src/pages/ProjectDetail.tsx`** (lines 117-137)

1. **Bold year detection**: Add logic to detect year-only lines (regex `/^\d{4}$/`) and render them with `font-bold text-white` styling, making them stand out as section headers.

2. **Mobile-responsive text sizing for both Credits and Exhibitions**:
   - Change list text from `text-base` to `text-sm sm:text-base`
   - Reduce list spacing from `space-y-2` to `space-y-1 sm:space-y-2`
   - Reduce section heading from `text-xl md:text-2xl` to `text-lg sm:text-xl md:text-2xl`
   - Reduce section bottom margin from `mb-16` to `mb-10 sm:mb-16`
   - Reduce heading bottom margin from `mb-6` to `mb-4 sm:mb-6`

3. **Year items get extra top margin** (`mt-4 first:mt-0`) to create visual grouping under each year.

### Rendering logic for exhibition items
```tsx
{project.exhibitions[locale].map((item, i) => {
  const isYear = /^\d{4}$/.test(item.trim());
  return (
    <li key={i} className={isYear 
      ? "font-bold text-white text-sm sm:text-base mt-4 first:mt-0" 
      : "text-sm sm:text-base"}>
      {item}
    </li>
  );
})}
```

Same compact sizing applied to the Credits `<ul>` for consistency.

