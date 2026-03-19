

## Plan: Fix Down Arrow Click Reliability

### Root Cause
The parallax image layers and vignette overlay are positioned `absolute inset-0` and sit on top of the button area. They don't have `pointer-events-none`, so they intercept clicks, preventing the scroll-down button from responding.

### Changes

**File: `src/components/ParallaxHero.tsx`**
- Add `pointer-events-none` to both the vignette layer div (line 61) and the image layer div (line 75), so clicks pass through to the button underneath.
- The button container (line 109) already has proper z-index and no `pointer-events-none`, so it will receive clicks correctly.

This is a 2-line change that fixes the issue on all screen sizes.

