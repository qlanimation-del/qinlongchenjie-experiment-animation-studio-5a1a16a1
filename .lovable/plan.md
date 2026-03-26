
目标：继续修复作品详情页视差背景在桌面鼠标滚轮下的卡顿和抖动，这次不只改 `ParallaxHero`，而是把整条滚动链路一起优化。

我重新检查后的结论：
1. `ParallaxHero` 已经不再用 React state 驱动滚动，但问题还没完全消失。
2. 真正仍在持续吃性能的，是全局滚动时还在 React 重渲染的组件，尤其是 `Navbar.tsx`。CPU profile 里最明显的热点就在它的滚动回调。
3. `BackToTop.tsx` 也仍然在滚动时触发 state 更新。
4. `ParallaxHero` 目前是“直接跟随原始 `window.scrollY`”，对桌面鼠标滚轮这种离散滚动输入会显得一顿一顿，需要做插值平滑。
5. Hero 里第 2/3 层图仍是 `loading="lazy"`，但它们其实首屏就可见，首次滚动时可能发生解码/加载抖动。

实施方案

一、先修真正的主瓶颈：去掉导航栏的滚动重渲染
- 文件：`src/components/Navbar.tsx`
- 把现在的 `forceRender` + `hideProgress.current` 方案改成 ref 直接写 DOM transform。
- 保留现有“向下滚隐藏、向上滚显示”的视觉逻辑，但滚动时不再触发 React render。
- 这样可以减少与视差动画同时发生的主线程开销。

二、把 BackToTop 也改成非重渲染式滚动响应
- 文件：`src/components/BackToTop.tsx`
- 不再在每次滚动里 `setVisible(...)`。
- 改成 button ref + class/style 直接切换，或者至少只在阈值跨越时更新一次状态。
- 目标是避免全局滚动时额外的 React work。

三、把 ParallaxHero 从“原始滚动跟随”升级为“平滑插值动画”
- 文件：`src/components/ParallaxHero.tsx`
- 新增：
  - `targetScrollYRef`：真实滚动位置
  - `currentScrollYRef`：当前渲染位置
  - 常驻 `requestAnimationFrame` 动画循环
- 在 scroll 事件里只更新 `targetScrollYRef`，真正的 transform 更新在动画循环里用 lerp 插值逼近目标值。
- 这样桌面滚轮产生的阶梯式位移会被平滑掉，视觉上会明显更顺。

四、修正首屏 Hero 图的加载策略
- 文件：`src/components/ParallaxHero.tsx`
- 对首屏可见的视差层取消 lazy loading：
  - 第一层保留 `fetchPriority="high"`
  - 第二、三层至少改为 `loading="eager"` / 非 lazy
- 避免首次滚动时浏览器才去补加载/解码可见图层。

五、补充合成层优化，减少 transform 抖动
- 文件：`src/components/ParallaxHero.tsx`
- 给层容器和图片补更明确的合成提示，如：
  - `backface-visibility: hidden`
  - `transform: translate3d(...)`
  - 必要时补 `contain: paint`
- 保持现有视觉不变，只做渲染层面的稳定化。

技术细节
- 重点不是再“继续节流 scroll”，而是把所有滚动动画统一改成：
  - scroll 事件只采集目标值
  - rAF 循环负责平滑写入 DOM
  - 不让 React 在滚动过程中频繁参与
- 预计修改文件：
  - `src/components/ParallaxHero.tsx`
  - `src/components/Navbar.tsx`
  - `src/components/BackToTop.tsx`

验收标准
1. 在 `/work/resonance` 页面，桌面端鼠标滚轮连续上下滚动时，Hero 三层背景不再出现明显阶梯跳动。
2. 标题与箭头淡出依旧正常。
3. Navbar 与回到顶部按钮功能保持不变，但滚动时不再引入明显卡顿。
4. 首次进入详情页后立即滚动，不再因为 Hero 图层延迟加载产生抖动。
