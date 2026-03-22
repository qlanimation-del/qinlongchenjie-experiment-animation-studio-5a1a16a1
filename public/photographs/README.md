# 摄影作品资源目录 / Photographs Assets

## 命名规范 / Naming Convention

```
{category}-{number}.webp
```

示例 / Examples:
- `urban-01.webp`
- `urban-02.webp`
- `still-life-01.webp`
- `nature-01.webp`

## 如何替换 / How to Replace

1. 将真实图片转换为 `.webp` 格式，放入本目录
2. 打开 `src/data/photographs.ts`
3. 将对应条目的 `src` 从 Unsplash URL 改为本地路径，如：
   ```ts
   src: "/photographs/urban-01.webp",
   ```
4. 如需增减作品，直接在对应分类注释块中添加/删除条目

## 分类 / Categories

| 英文 | 中文 | 法文 | ID 范围 |
|------|------|------|---------|
| Urban Fragments | 城市碎片 | Fragments Urbains | p1–p4 |
| Still Life | 静物 | Nature Morte | p5–p7 |
| Nature | 自然 | Nature | p8–p10 |

> 添加新分类时，在 `photographs.ts` 中新增分类注释块，页面会自动分组显示。
