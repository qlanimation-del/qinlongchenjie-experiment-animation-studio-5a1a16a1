# 首页 Hero 视频按设备分流

## 目标
- 桌面 + 平板（视口宽度 ≥ 768px）：加载 `/videos/hero-bg.mp4`（最清晰）
- 手机（< 768px）：加载 `/videos/hero-bg.webm`（更省流）

## 修改文件
`src/pages/Index.tsx`

## 实现步骤

1. 新增 state：`const [isMobile, setIsMobile] = useState(false);`
2. 在已有"慢网络检测" `useEffect` 内一次性判断 `window.innerWidth < 768`，写入 `isMobile`。只判断一次，不监听 resize，避免视频中途重载。
3. 替换 `<video>` 内的 `<source>` 标签：根据 `isMobile` 输出单一 source，桌面/平板用 mp4，手机用 webm。
4. 检查 `index.html` 是否有 `<link rel="preload" as="video">` 指向 hero 视频；如有则移除或保留，由运行时根据设备决定加载。

## 兜底
若某档视频文件加载失败，浏览器会显示 poster（已有 `/hero-poster.webp`），不会出现黑屏。
