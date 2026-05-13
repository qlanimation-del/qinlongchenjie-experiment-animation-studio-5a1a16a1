# Work页面 3D 卡片倾斜效果

给 `/work` 页面的项目卡片增加跟随鼠标的轻微 3D 倾斜（perspective + rotateX/Y），营造高端、有空间感的质感。零外部依赖，桌面端独享，移动端保持原状。

## 设计目标

- **克制**：最大倾斜角 ≤ 6°，避免廉价游戏感，符合极简专业调性
- **高级感**：倾斜配合一道极淡的对角光泽（radial-gradient 跟随鼠标），像哑光金属/相纸反光
- **零性能负担**：纯 CSS transform + DOM ref 直写，不触发 React re-render；移动端/触屏完全跳过

## 实现方案

修改单个文件：`src/pages/Work.tsx` 中的 `ProjectCard` 组件。

### 交互逻辑
1. 卡片外层 `<div>` 加 `perspective: 1000px`
2. 内层 Link 容器加 `transform-style: preserve-3d`，初始 `transform: rotateX(0) rotateY(0)`
3. `onMouseMove`：根据鼠标在卡片内的相对位置（-0.5 ~ 0.5），通过 `requestAnimationFrame` 直接写 `el.style.transform = 'rotateX(${y*-6}deg) rotateY(${x*6}deg)'`
4. `onMouseLeave`：transition 平滑回到 0
5. 同步更新 CSS 变量 `--mx, --my`，驱动一层 `radial-gradient(circle at var(--mx) var(--my), white/8%, transparent 50%)` 光泽
6. 触屏检测：`window.matchMedia('(hover: none)').matches` → 不绑事件

### 与现有 hover 动画兼容
- 当前 hover 黑色蒙版 + 文字滑入动画**完全保留**，只是叠加在倾斜的卡片上
- `group-hover:scale-105` 改为 1.02，避免和倾斜叠加过头

### 性能保障
- `will-change: transform` 仅在鼠标进入时添加，离开后移除
- rAF 节流，单次 `mousemove` 最多写一次 transform
- 不影响首屏，不增加包体积（0 字节依赖）

## 技术细节

```text
ProjectCard (perspective: 1000px)
  └─ Link.group (preserve-3d, ref→transform)
       ├─ <img>           (translateZ(0))
       ├─ shine overlay   (radial-gradient via --mx/--my)
       └─ hover overlay   (现有黑蒙版 + 文字动画，不变)
```

只动 `src/pages/Work.tsx`，约 +40 行。无新文件、无新依赖。