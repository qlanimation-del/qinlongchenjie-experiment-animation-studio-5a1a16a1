## 目标
为 **首页 Hero / Work 列表 / 项目详情页** 增加更"高级艺术感"的微交互与质感层，不引入大型库，不影响 LCP，不破坏现有暗色极简体系（Montserrat、灰阶、霓虹悬浮色）。

所有动效复用现有 `usePerfMode`（FPS 监控）—— 低帧时自动退化为静态/纯淡入。

---

## 1. 全局质感层（一次性接入）

**1.1 静态噪点 / 颗粒层**
- 在 `Layout` 之上叠加 fixed、`pointer-events-none`、`mix-blend-overlay`、`opacity-[0.04]` 的噪点纹理（一张 ~6KB 的 SVG/WebP，平铺）。
- 让暗背景拥有胶片/纸张般的质感（艺术感的关键），几乎零成本。
- `prefers-reduced-motion` 或 perf degraded → 隐藏。

**1.2 字体 OpenType 优化**
- 全局 `font-feature-settings: "ss01","cv11","liga","calt"; font-variant-numeric: tabular-nums lining-nums;`
- Montserrat 自带 ss01/cv11，开启后字形更精致；零运行时成本。

**1.3 选区颜色**
- `::selection { background: hsl(var(--foreground)/0.15); color: hsl(var(--foreground)); }` —— 细节决定高级感。

---

## 2. 首页 Hero 增强

**2.1 大标题 / Letters3D 字距呼吸**
- 进场后给 `Letters3D` 容器加 `letter-spacing` 8s 缓慢循环呼吸 (0.32em ↔ 0.36em)，配合 `text-shadow` 极淡光晕。
- 仅 CSS 关键帧，GPU 友好。

**2.2 Hero CTA 玻璃按钮**
- 现有 frosted glass 基础上叠加：
  - 鼠标跟随的高光 (`radial-gradient(circle at var(--mx) var(--my), white/12%, transparent 40%)`)
  - 边框流光：`background-clip:padding-box` + 双层 `::before` conic-gradient 旋转 6s（仅 desktop）。

**2.3 滚动指示器 chevron**
- 改为细线 + 旁注的"SCROLL"竖排字母，更有展览图录感。

**2.4 Upcoming 单行公告**
- 入场 `clip-reveal` + 左侧细线扫光（200ms scaleX）。

---

## 3. Work 列表页增强

**3.1 卡片胶片质感**
- 现有 3D tilt + specular shine 基础上：
  - 加 `inset` 极淡内描边 `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06)`。
  - hover 时叠加一层 `mix-blend-overlay` 的颗粒，呼应全局噪点。

**3.2 进场瀑布**
- 卡片按 grid 顺序 `IntersectionObserver` 触发 60ms stagger 的淡入上移（已有 useScrollAnimation 可复用）。

**3.3 筛选切换微动效**
- 切换分类时，对网格做 `FLIP` 风格 200ms opacity 淡出 → 重排 → 淡入；不用 framer-motion，纯 CSS + 短 timeout。

**3.4 Index 视图行高亮**
- 鼠标 hover 行时，年份数字 `font-variation`/`letter-spacing` 微扩；底部线条左→右 scaleX 入场（已有动画语言一致）。

---

## 4. 项目详情页增强

**4.1 章节进入：保留现有 flip3d，叠加副效果**
- 在每个 `AnimatedSection` 上加一层左侧细线 (`h-px w-12 → w-24`) 在 reveal 时 scaleX 展开，类似展览说明牌的引导线。
- 不增加 JS 成本，纯条件 class。

**4.2 文字段落首字母装饰**
- `description` 段落首字母自动放大（CSS `::first-letter`，serif fallback `Cormorant`/系统衬线），形成编辑设计感。可通过 prop 关闭。

**4.3 视频块画框**
- 视频外层加 1px 暗描边 + 4px 外发光 (`box-shadow`)，hover 时发光过渡到项目 `glowColor`（霓虹色），呼应 Work 卡片悬浮色系。

**4.4 Credits / Exhibitions 列表**
- 每行左侧加竖向细线 `border-l border-white/10`，hover 行 `border-l-foreground/60` + 文本 `translateX(4px)`。

**4.5 ParallaxHero 标题**
- 在 `type` 字母组下方加一个 1px 细线（width 0 → 80px）入场扫开；与 4.1 引导线统一语言。

---

## 5. 性能策略（硬约束）

- 不引入 framer-motion / three.js / lottie。
- 所有新动效只用 `transform / opacity / clip-path / filter` 中的轻量值；避免动 `box-shadow` 的大模糊半径（除按需 hover）。
- 噪点纹理：单张 ≤6KB，base64 内联或 `public/textures/grain.webp`，1x 平铺。
- 接入 `usePerfMode`：degraded 时 → 隐藏噪点层、停用边框流光、Letters3D 呼吸退化为静态。
- 移动端：禁用边框 conic 流光、跟随光晕；保留淡入和细线。
- 不动 Hero `<video>`、不动 LCP 路径、不改 vite manualChunks。

---

## 6. 技术清单（实现顺序）

```text
1) src/index.css           噪点 utility + ::selection + font-feature-settings + 字距呼吸 keyframes
2) public/textures/grain.webp  （6KB 噪点贴图）
3) src/components/Layout.tsx   叠加 GrainOverlay（degrade-aware）
4) src/components/Letters3D.tsx 可选 breathe 模式
5) src/pages/Index.tsx     Hero CTA 光晕 + chevron 重塑 + Upcoming 扫光
6) src/pages/Work.tsx      ProjectCard 内描边/颗粒 + 筛选 FLIP 过渡 + IndexRow hover
7) src/pages/ProjectDetail.tsx  Section 引导线 + 段落首字母 + 视频画框 + Credits 列表 hover
8) src/components/ParallaxHero.tsx  type 下扫线
```

预计变更 ≤8 个文件，新增 ~120 行 CSS / ~80 行 TSX。对 bundle 体积影响 <2KB（gzip），无新依赖。

---

## 我会等你确认后再实现
如有偏好（比如：只做首页、不要噪点、不要首字母大写装饰），告诉我，我会按需裁剪。