
# 当代艺术语境下的专业化升级方案

目标：把网站从 motion studio 语言，重塑为符合**当代艺术家 / 实验影像工作室**专业标准的语言。参考标准：e-flux、LUX、Hito Steyerl、Cao Fei、陆扬工作室官网。

---

## 阶段 A：语言与信息架构（最关键，0 性能成本）

### A1. 重写导航与文案
- `Work` → `Works` 或 `Index`
- `NOW PLAYING / OUR WORK` (Hero CTA) → `Selected Works, 2019–2025 ↗`
- `Team` → 拆为 `Qinlong` 和 `Chenjie` 两个独立 artist 页（或合并为 `Artists`）
- 新增 `Texts`（评论 / 访谈 / 自撰文章）
- 新增 `News`（Upcoming screenings / exhibitions）
- `Contact` 增加分类入口（General / Press / Screening / Representation）

### A2. 项目数据结构升级（`src/data/projects.ts`）
为每个作品增加美术馆级 caption 字段，全部支持三语：

```text
medium:        Single-channel video, color, sound
duration:      12'34"
edition:       Edition of 5 + 2 AP
commissionedBy: ___
courtesy:      Courtesy the artist
exhibitions:   [{year, title, venue, city}]
screenings:    [{year, festival, city}]
press:         [{year, author, title, publication, url}]
```

### A3. 项目详情页重构
顶部视差大图保留，但下方加入**美术馆作品标签区块**（caption block），统一灰白排版、无特效，作为"作品档案"。下方再接 description / gallery。底部加：
- Exhibitions
- Screenings
- Awards
- Press

---

## 阶段 B：Artist Pages（CV 页）

把现有 Team 页拆/重构为两位艺术家各自的 CV 页：

```text
/artists/qinlong
/artists/chenjie
```

每页结构：
- Portrait + Short Bio (3 行)
- Long Biography (1–2 段)
- CV（按年份倒序，分组）：
  - Solo Exhibitions
  - Group Exhibitions
  - Screenings & Festivals
  - Awards & Grants
  - Residencies
  - Publications
  - Teaching
- Download CV (PDF) 按钮
- Contact / Representation

排版：左侧年份列、右侧条目列，无背景色，纯文字，参考 e-flux 艺术家页。

---

## 阶段 C：视觉系统克制化（让作品做主角）

不是要推翻现有视觉，而是**为艺术语境做一套并行的"克制模式"**：

### C1. Works 列表页第二种视图
增加 `Grid / Index` 切换：
- `Grid`：保留现在的 Pinterest masonry（视觉优先）
- `Index`：纯文字目录视图，按年份倒序，每行显示 `年份 · 标题 · 媒介 · 时长`，hover 时右侧出现小缩略图。这是策展人最爱的视图。

### C2. 悬停效果分级
- Works 列表保留霓虹 hover（你的辨识度）
- 但在 Index 视图、CV 页、Texts 页**不使用霓虹**，只用 underline + 灰度过渡

### C3. 新增筛选器
顶部加轻量筛选 chips：
`All · Animation · Video Essay · Experimental Video · Installation · Commission`

### C4. Caption block 排版规范
统一一个 `<WorkCaption />` 组件，用于详情页和未来的 PDF 导出，保持字号、行距、缩进一致。

---

## 阶段 D：Texts / News / Press

### D1. 新建 `/texts` 页
列出文章 / 访谈 / 评论，每篇有：
- 标题
- 作者
- 出处 / 年份
- 外链或站内长文页

### D2. 新建 `/news` 页
时间线形式列出 Upcoming + Past：
```
2026.05    Screening    Festival Name, City
2026.03    Exhibition   Venue Name, City
```

### D3. 首页加入 "Upcoming" 模块
在 Hero 下方加一个极简单行公告区：`Upcoming: ___ at ___, May 2026 →`，链接到 News 页。这是当代艺术官网的标志性元素。

---

## 阶段 E：Contact 专业化

`/contact` 重构为分类入口：

```
General        hello@...
Press          press@...
Screenings     screenings@...  (or general)
Representation (gallery info or "currently not represented")
Studio         City, Country
```

未来如果接 Lovable Cloud，再升级为表单 + 后台 inquiry 管理。

---

## 实施顺序建议

| 阶段 | 内容 | 优先级 | 工作量 |
|---|---|---|---|
| A | 文案 + 项目数据结构 + 详情页 caption | P0 | 中 |
| B | Artist CV 页 | P0 | 中 |
| C | Index 视图 + 筛选器 + 视觉克制化 | P1 | 中 |
| D | Texts / News / 首页 Upcoming | P1 | 中小 |
| E | Contact 分类化 | P2 | 小 |

---

## 本轮我建议先做的最小可见升级（一次实施）

1. **文案重塑**：Work→Works，Hero CTA 改为 `Selected Works, 2019–2025`
2. **项目数据结构升级**：加 medium / duration / edition / exhibitions / screenings / press 字段（先填 1–2 个示范作品，其余留空）
3. **项目详情页 caption block**：新增 `<WorkCaption />` 美术馆作品标签组件
4. **Works 页加筛选 chips + Index 文字目录视图切换**
5. **首页加 "Upcoming" 极简单行公告区**（即使暂时为空也保留结构）

阶段 B（Artist CV 页）和 D（Texts / News）建议作为下一轮，因为需要你提供真实 CV 内容和文章列表。

---

## 需要你确认的几点

1. 是否同意把导航 `Work` 改为 `Works`、`Team` 改为 `Artists`（拆成两位艺术家独立页）？
2. 项目详情页是否加入美术馆级 caption block（medium / duration / edition / commissioned by / courtesy）？
3. Works 页是否加入 `Grid / Index` 双视图切换 + 类型筛选 chips？
4. 是否本轮就新建 `/texts` 和 `/news` 空架子页，方便后续填内容？

回复确认后我就进入实施。
