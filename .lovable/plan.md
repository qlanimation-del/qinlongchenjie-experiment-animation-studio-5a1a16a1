## Fix: Desktop homepage video not playing

**Root cause**: `src/pages/Index.tsx` treats `effectiveType === "3g"` as "slow" and sets `skipVideo=true`, which prevents the `<video>` element from rendering at all. Many desktop broadband connections report `"3g"` via the Network Information API, so the video never appears.

### Changes to `src/pages/Index.tsx`

1. **Network detection** — remove the `"3g"` check; only skip video on data-saver or 2G:
   ```ts
   const slow = conn.saveData === true ||
     conn.effectiveType === "slow-2g" ||
     conn.effectiveType === "2g";
   ```

2. **Faster mount** — reduce `requestIdleCallback` timeout from `1500` → `500`, and the fallback `setTimeout` from `200` → `100`.

3. **Preload** — change `<video preload="metadata">` → `preload="auto"` so the browser fetches enough data for autoplay immediately.

No other files affected.
