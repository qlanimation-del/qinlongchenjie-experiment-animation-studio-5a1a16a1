

## Fix: Build failure — missing `axios` dependency

### Problem
The build fails with `Could not resolve entry module "axios"`. The `vite.config.ts` defines a `manualChunks` vendor bundle including `axios`, but `axios` is not installed in the project.

### Solution
Remove `axios` (and any other unused libraries like `lodash`, `zustand`) from the `manualChunks` config in `vite.config.ts`.

### Change — `vite.config.ts`

Replace the `manualChunks` section:

```ts
// Before
manualChunks: {
  react: ["react", "react-dom"],
  vendor: ["lodash", "axios", "zustand"],
},

// After
manualChunks: {
  react: ["react", "react-dom"],
},
```

One line changed. No functionality affected — these libraries weren't used in the project.

