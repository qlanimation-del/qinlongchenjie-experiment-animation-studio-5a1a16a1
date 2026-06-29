## 问题
在 `/work/[id]` 项目详情页的 Project Gallery 中点击图片，弹出的 Lightbox 把图片限制在 `max-w-[90vw] max-h-[85vh]`，再加上左右/关闭按钮挤占空间，导致：
- 图片实际显示区域偏小，竖图尤其明显
- 手机端顶部留出 80px (top-20) 给关闭按钮，下方安全区也被浪费
- 没有放大查看 / 缩放手势，无法看清细节
- 没有缩略图条或页码，看不出当前是第几张

## 目标
统一所有项目的 Gallery 查看体验，做到「真正的全屏沉浸式查看」，并兼顾桌面与移动端。

## 方案（推荐）
升级现有 `src/components/ImageLightbox.tsx`，让它成为一个真正的全屏查看器，所有调用方（`ProjectGallery`、`Drawing` 等）自动受益，无需逐页修改。

### 改动要点
1. **真·全屏画布**
   - 容器从 `flex items-center justify-center` + 内层 `max-w-[90vw] max-h-[85vh]` 改为占满 `100vw × 100dvh`
   - 图片改为 `w-full h-full object-contain`，最大化显示区域（横图填宽、竖图填高）
   - 背景从 `bg-black/95` 改为 `bg-black`（纯黑，更沉浸）

2. **悬浮控件，不挤占图片空间**
   - 关闭按钮、左右箭头、计数器全部 `absolute` 浮在图片上层
   - 给按钮加半透明圆形底（`bg-black/40 backdrop-blur`）保证在亮色图上也清晰
   - 移动端按钮尺寸放大到 44×44（符合 iOS HIG 触控标准）
   - 底部居中显示 `currentIndex + 1 / total` 计数

3. **手势与交互**
   - 移动端：左右滑动切换图片（touchstart / touchend，阈值 50px）
   - 移动端：下滑关闭（可选，阈值 100px）
   - 桌面端：保留 ← → Esc 键盘操作（已有）
   - 点击图片本身不关闭，点击图片外的黑色区域才关闭（避免误触）

4. **加载体验**
   - 切换时显示一个简洁的 loading spinner（图片 onLoad 前）
   - 预加载相邻的上一张 / 下一张图片，切换更顺滑

5. **保留现有 API**
   - `images / currentIndex / onClose / onPrev / onNext / onGoTo` 签名不变
   - `ProjectGallery.tsx`、`Drawing.tsx`、`Photographs.tsx` 等调用方无需改动

### 涉及文件
- `src/components/ImageLightbox.tsx` — 主要重写
- 不改 `ProjectGallery.tsx`、`Drawing.tsx`、`Photographs.tsx` 的调用逻辑

## 不做的事
- 不引入 zoom / pinch 缩放库（避免包体积膨胀；如需可后续单独加）
- 不改任何项目数据或路由结构
- 不改 BackToTop / Navbar 的 z-index 关系（Lightbox 已是 z-[10000]）

## 验收
- 桌面端：图片占满视口 95% 以上，按钮浮于图上，← → Esc 正常
- 手机端：图片在 100dvh 内最大化显示，左右滑动切换，下滑关闭
- 所有 `/work/[id]`、`/drawing`、`/photographs` 的 Lightbox 表现一致