
## 为什么首页视频每次都要重新加载

通过抓取真实网络请求确认了根本原因：

```
GET /videos/hero-bg.mp4
cache-control: no-cache, no-store, must-revalidate, max-age=0
```

视频文件目前的响应头是 **完全禁止缓存**，所以浏览器每次访问首页都必须重新下载 3.7MB 的视频，永远不会用本地副本。

注意：`public/_headers` 中已经写了 1 年强缓存，但它只在 **发布到 Cloudflare Pages 之后** 才会生效。当前你看到的预览域名 `lovableproject.com` 是开发沙盒，不读取 `_headers`。

也就是说：**发布后的正式站点已经会有 1 年缓存，预览站本来就会每次重下，这是正常的。**

但即便如此，"第一次访问"的体验还可以做得更快、更专业。下面是完整提速方案。

---

## 优化目标

1. 第一次访问：视频文件尽量小，下载更快
2. 第二次访问：直接命中浏览器缓存，秒开
3. 视频未就绪时：海报图立即显示，零黑屏
4. 视频不阻塞首屏内容渲染
5. 移动网络/弱网用户体验也专业

---

## 方案

### 1. 压缩 / 替换 hero 视频本身（收益最大）

当前 `hero-bg.mp4` 约 **3.7MB**，对 Hero 背景循环视频偏大。专业站点常见做法：

- 目标体积：**800KB ~ 1.5MB**
- 分辨率：1280×720（背景循环视频不需要 1080p）
- 编码：H.264 + AAC（兼容性最好）
- 同时输出一份 **WebM (VP9/AV1)**，体积比 MP4 再小约 30–50%
- 时长尽量控制在 8–12 秒循环
- 去掉音轨（反正是 muted）

新结构：

```
public/videos/
  hero-bg.mp4    ~ 1.2MB  (兼容 fallback)
  hero-bg.webm   ~ 700KB  (现代浏览器优先)
```

`<video>` 内同时挂两个 source：

```text
<source src="/videos/hero-bg.webm" type="video/webm" />
<source src="/videos/hero-bg.mp4"  type="video/mp4"  />
```

浏览器会自动选最合适的。

> 这一步需要你提供新的视频文件（或同意我用现有文件转码后再上传）。如果你愿意，我可以在实施时直接用 ffmpeg 在沙盒里压一份。

### 2. 修改 `<video>` 加载策略，避免抢占首屏

文件：`src/pages/Index.tsx`

- `preload="auto"` 改为 `preload="metadata"`
  - 只先取元数据，浏览器 idle 后再下完整视频
- 给 `<video>` 加原生 `poster={heroPosterImg}` 属性
  - 这是浏览器层面的 fallback，比 React 状态还早
- 视频元素延迟到首屏渲染后再挂载 source
  - 用 `requestIdleCallback` 或 `setTimeout(…, 0)`
  - 用户先看到海报 + 标题 + 按钮，视频在后台拉取
- 移动端可选：检测 `navigator.connection.saveData` 或 `effectiveType === '2g'/'3g'`，弱网用户直接不加载视频，只显示海报

### 3. 修正 `index.html` 预加载优先级

文件：`index.html`

- `hero-poster.webp` 保持 `preload as="image" fetchpriority="high"`
- **移除或降级** `<link rel="preload" as="video" href="/videos/hero-bg.mp4">`
  - 原因：preload 会让视频和海报、JS 抢带宽，反而拖慢首屏
  - 视频真正想"提前预热"应该用更轻的策略，例如让 `<video preload="metadata">` 自然触发
- `/src/assets/hero-poster.webp` 这种开发路径在构建后会变成 `/assets/hero-poster-[hash].webp`，preload 路径需要改成构建友好的方式（通过 `<link>` 在 Layout 中动态注入，或者把 poster 放到 `public/` 下用稳定路径）

### 4. 把 hero-poster 放到 `public/` 下，使用稳定路径

文件：

- 把 `src/assets/hero-poster.webp` 复制到 `public/hero-poster.webp`
- `index.html` preload 改为 `/hero-poster.webp`
- `src/pages/Index.tsx` 引用改为 `/hero-poster.webp`

好处：

- 预加载路径在开发和生产环境一致
- 享受 `public/_headers` 中 `*.webp` 的 1 年强缓存
- 浏览器可以在 HTML 还没解析 JS 的时候就开始下载

### 5. 给视频也享受 immutable 缓存

文件：`public/_headers`

- 当前已有 `/videos/*  Cache-Control: max-age=31536000, immutable` ✓ 已经配置好
- 部署后会生效，回头客直接用本地缓存，**几乎 0 流量秒开**
- 建议视频文件名加版本号或 hash：`hero-bg-v2.mp4`，将来更新视频时缓存能正确失效

### 6. 用 Service Worker 缓存视频（可选，进阶）

如果你希望连"换网络/换设备"的用户都能更快，可以用一个简单的 Service Worker 把 hero 视频持久缓存。但这增加了复杂度，不是必须，建议先做完 1-5 再考虑。

---

## 涉及文件汇总

| 文件 | 改动 |
|---|---|
| `public/hero-poster.webp` | 新增（从 src/assets 复制） |
| `public/videos/hero-bg.webm` | 新增（建议补一个 WebM 版本） |
| `public/videos/hero-bg.mp4` | 替换为压缩后的小体积版本 |
| `index.html` | 调整 preload：海报高优先级、视频不预加载 |
| `src/pages/Index.tsx` | poster 属性 + preload="metadata" + 延迟挂载 source + 弱网检测 |
| `src/assets/hero-poster.webp` | 可移除（已迁移到 public） |

---

## 实施前需要确认两个问题

1. **视频压缩**：是否同意我用 ffmpeg 自动把现有 `hero-bg.mp4` 压缩到 1.2MB 左右、并额外输出一份 WebM？还是你希望自己提供更高品质的源文件再压？
2. **弱网用户策略**：弱网（2G/3G/saveData 模式）用户是否直接 **只显示海报、不加载视频**？还是仍然加载？

确认后我直接进入实施。

---

## 预期效果

| 场景 | 现在 | 优化后 |
|---|---|---|
| 首次访问（正式站） | 3.7MB 视频，1.5–3 秒才开始播放 | 700KB-1.2MB 视频，0.5–1 秒开始播放 |
| 二次访问（正式站） | 仍然 3.7MB 重下（如果未发布）/ 已缓存 | 0 字节，立即播放 |
| 预览域名（开发） | 每次都重下（沙盒不读 _headers） | 同样会重下，但因为视频更小，体感更快 |
| 首屏视觉 | 海报立即显示、无黑屏 | 海报立即显示、无黑屏，且 JS/字体不再被视频拖慢 |
| 弱网用户 | 强行下 3.7MB | 仅显示海报，不浪费流量 |

