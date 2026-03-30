import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// 压缩插件：生成 gzip + brotli
import viteCompression from "vite-plugin-compression";
// 图片优化插件
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => ({
  base: "/", // 必须保留，解决 CSS 路径
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  // 生产环境才开压缩和图片优化
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // 1. Gzip 压缩（兼容所有浏览器）
    mode === "production" && viteCompression({
      algorithm: "gzip",
      threshold: 10240, // >10KB 才压缩
      ext: ".gz",
    }),
    // 2. Brotli 压缩（现代浏览器，体积更小）
    mode === "production" && viteCompression({
      algorithm: "brotliCompress",
      threshold: 10240,
      ext: ".br",
    }),
    // 3. 图片自动压缩+转 WebP/AVIF
    mode === "production" && ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
    }),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    // 4. 极致代码压缩（比默认 esbuild 更小）
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // 删掉所有 console
        drop_debugger: true, // 删掉 debugger
        pure_funcs: ["console.log", "console.info"],
      },
    },
    // 5. 代码分包：拆分公共库，实现缓存复用
    rollupOptions: {
      output: {
        manualChunks: {
          // 把 React 相关单独打包，长期缓存
          react: ["react", "react-dom"],
          // 其他大库单独分包
          vendor: ["lodash", "axios", "zustand"],
        },
      },
    },
    // 6. 禁用 sourcemap（生产环境不需要，减少体积）
    sourcemap: false,
  },
}));