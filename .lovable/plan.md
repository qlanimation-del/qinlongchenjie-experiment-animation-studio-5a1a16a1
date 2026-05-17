# Project 详情页 ParallaxHero — 3D 景深视差升级

给 `/work/:id` 详情页顶部的 ParallaxHero 增加真正的 **Z 轴景深感**，让多层视差不只是 Y 轴上下错位，而是有真实的"前/中/后景空间分离"，像立体画册一样。

## 设计目标

- **真 3D 透视**：建立 `perspective` 透视容器，三层图分别处于不同的 `translateZ` 深度
- **鼠标视差**：桌面端鼠标移动时，前景/中景/远景以不同力度反向偏移（前景走得多、远景几乎不动），增强空间感
- **滚动景深**：滚动时除了现有的 Y 偏移，叠加细微的 `scale + translateZ` 推拉，让整个 hero 像被"推远"
- **晕影遮罩**：远景叠加一层径向 vignette，强化纵深焦点
- **不破坏现有视差**：保留当前 `scrollY * speed` 的 Y 偏移逻辑
- **手机/平板降级**：移动端只保留 Y 视差和 vignette，跳过 perspective + mouse parallax，保证 60fps

## 实现方案

只改一个文件：`src/components/ParallaxHero.tsx`。

### 1. 容器加透视
最外层 `<div>` 加 `perspective: 1200px` + `transform-style: preserve-3d`。

### 2. 三层 Z 深度
按现有 layer 顺序赋予不同 `translateZ`：
- Layer 0 (背景图): `translateZ(-100px)` — 最远
- Layer 1 (中景图): `translateZ(0)` — 中性
- Layer 2 (vignette): `translateZ(80px)` — 最前

为补偿 translateZ 引起的视觉缩放，配合微调 `scale`。

### 3. 鼠标视差（桌面 only）
```text
mouseMove → (mx, my) ∈ [-1, 1]
layer 0: translate(mx * 8px, my * 6px)   // 远景小幅
layer 1: translate(mx * 16px, my * 12px) // 中景中幅
layer 2: translate(mx * 24px, my * 18px) // 前景/vignette 大幅
```
用 rAF 节流，DOM ref 直写 transform，鼠标离开后 0.8s ease 回中。

### 4. 滚动景深推拉
现有 scroll 处理函数中，整个 hero 容器再叠加 `transform: translateZ(${-scrollY * 0.3}px)`，营造往内推的感觉。

### 5. Vignette 强化
现有 vignette 层增大对比度（`from-black/60 via-transparent to-black/80`），让焦点更聚焦中央。

### 6. 标题层
标题层加 `translateZ(120px)`，确保始终漂浮在最前。

## 性能与降级

- 整个 3D 增强只在 `!isMobile && !isTablet` 时启用
- `prefers-reduced-motion: reduce` 自动跳过 mouse parallax
- 所有 transform 走 GPU 合成层（已有 `will-change: transform`）
- 不增加 DOM 节点、不引入依赖、不影响首屏

## 技术细节

```text
.hero (perspective: 1200px, preserve-3d, mouse listener)
  ├─ Layer 0  translateZ(-100px) + parallaxY + mouseY*0.3
  ├─ Layer 1  translateZ(0)      + parallaxY + mouseY*0.6
  ├─ Vignette translateZ(80px)   + mouseY*1.0
  └─ Title    translateZ(120px)
```

修改约 +50 行，集中在 ParallaxHero.tsx 的 effect 和 JSX style 中。无新文件、无依赖。