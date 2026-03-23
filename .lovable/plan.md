

## Plan: Fix Translations, Parallax Black Edges, Photo Loading, and Sidebar Width

### Issues Found

1. **Missing French essay poem** — `/work/between-us` French description (line 322 in projects.ts) only has the intro paragraph; the full essay poem present in EN and ZH is missing from FR.

2. **Parallax black edges on large screens** — `ParallaxHero.tsx` uses `scale(1.15)` base which is insufficient on large monitors. When `scrollY` increases and `translateY` shifts layers, the image edges become visible against the black background. Need to increase scale to ~1.3 and ensure the container clips properly.

3. **Photographs images not loading** — Files exist in `public/photographs/` but filenames contain commas (e.g., `Artifacts,Nature,and People01.webp`) and Chinese characters with spaces (`枯枝影 2021 艺术微喷，60x60.webp`). The `src` paths in `photographs.ts` need URL-encoding to load correctly in browsers.

4. **Publication description width mismatch** — Both `Drawing.tsx` (line 101) and `Photographs.tsx` (line 106) have `max-w-[200px]` on the book description, making it narrower than the philosophy text above (which also has `max-w-[200px]` but renders differently due to `dangerouslySetInnerHTML` in Photographs). Remove `max-w-[200px]` from the description `<p>` tags so they naturally fill the sidebar width (`lg:w-[200px]`), matching the philosophy text.

### Changes

| File | Change |
|---|---|
| `src/data/projects.ts` | Add full French translation of the essay poem to the between-us `fr` description field |
| `src/components/ParallaxHero.tsx` | Increase base scale from 1.15 to ~1.3, adjust per-layer scales accordingly to prevent black edge exposure on large screens |
| `src/data/photographs.ts` | URL-encode the `src` paths: commas → `%2C`, spaces → `%20`, Chinese comma → `%EF%BC%8C` |
| `src/pages/Drawing.tsx` | Remove `max-w-[200px]` from book description (line 101) |
| `src/pages/Photographs.tsx` | Remove `max-w-[200px]` from book description (line 106) |

### French Essay Translation (between-us)

The full poem will be translated to French, preserving the same structure and line breaks as the EN/ZH versions, starting with the intro paragraph already present, followed by:

- `<strong>ENTRE NOUS ET LE MONDE</strong>`
- All stanzas translated (sailor, wolves, Erhai Lake, Huizhou, lonely tree, Lake Sayram, Cabo da Roca, closing)

### Parallax Scale Fix

Current scale values: `1.15 - i * 0.05` (layer 0: 1.15, layer 1: 1.10, layer 2: 1.05)
New scale values: `1.35 - i * 0.05` (layer 0: 1.35, layer 1: 1.30, layer 2: 1.25)

This provides enough image overflow to cover the viewport even at maximum scroll offset on ultrawide/large displays.

