

## Plan: Reorder Projects (New→Old) + Add Exhibitions/Awards Data

### 1. Reverse project order in data (new → old)

Reorder the `projects` array in `src/data/projects.ts` to: 2026-2028 (DUST) → 2025 (Between Us) → 2023-2024 (IN-BETWEEN) → 2018 (Naturally Yours) → 2014 (Year of Fate) → 2013 (Introspection) → 2011 (Life's Track).

### 2. Add `exhibitions` field to Project interface and data

Add a new field to the `Project` interface:

```typescript
exhibitions?: Record<Locale, string[]>;
```

Add exhibition/award entries to each project with placeholder content in en/zh/fr. Example:

```typescript
exhibitions: {
  en: [
    "Official Selection – Annecy International Animation Festival 2024",
    "Best Short Film – Ottawa International Animation Festival 2024",
    "Audience Award – Hiroshima International Animation Festival 2023"
  ],
  zh: [...],
  fr: [...]
}
```

Each project gets 2-4 unique festival/award entries with realistic-sounding names.

### 3. Update `cardSpan` for new→old order

Adjust the `cardSpan` values in `Work.tsx` to maintain the current Pinterest-style staggered heights (keeping IN-BETWEEN at span 6, etc.). No layout structure changes needed — just ensure the grid still looks good with the reversed order.

### 4. Display exhibitions in ProjectDetail

In `src/pages/ProjectDetail.tsx`, render the exhibitions list below the credits section:

```tsx
{project.exhibitions?.[locale]?.length > 0 && (
  <div className="mb-16">
    <h2 className="text-xl md:text-2xl font-semibold mb-6">
      {t("projectDetail", "exhibitions")}
    </h2>
    <ul className="space-y-2 text-muted-foreground text-base">
      {project.exhibitions[locale].map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}
```

### 5. Add translations

Add `exhibitions` key to `src/i18n/translations.ts` under `projectDetail`:
- en: "Exhibitions & Awards"
- zh: "参展与获奖"
- fr: "Expositions et Prix"

### Files to modify
- `src/data/projects.ts` — reorder array, add `exhibitions` field to interface and all projects
- `src/pages/ProjectDetail.tsx` — render exhibitions section below credits
- `src/i18n/translations.ts` — add translation key
- `src/pages/Work.tsx` — no changes needed (layout stays the same)

