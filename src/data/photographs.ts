import type { ArtworkItem } from "./drawings";

/**
 * 摄影作品数据 / Photographs Data
 *
 * 替换方法 / How to replace:
 * 1. 将真实图片放入 public/photographs/ 目录
 * 2. 文件命名格式: {类别}-{编号}.webp (如 urban-01.webp)
 * 3. 将下方 src 路径从 Unsplash URL 改为 "/photographs/urban-01.webp"
 *
 * ID 前缀: p (区别于绘画的 d 前缀)
 */

export const photographs: ArtworkItem[] = [
  // ═══════════════════════════════════════
  // Urban Fragments / 城市碎片 (2024–2025)
  // ═══════════════════════════════════════
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    title: { en: "Urban Geometry 01", zh: "城市几何 01", fr: "Géométrie Urbaine 01" },
    medium: { en: "Digital Photography, 2025", zh: "数码摄影, 2025", fr: "Photographie numérique, 2025" },
    year: 2025,
    category: { en: "Urban Fragments", zh: "城市碎片", fr: "Fragments Urbains" },
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    title: { en: "Urban Geometry 02", zh: "城市几何 02", fr: "Géométrie Urbaine 02" },
    medium: { en: "Digital Photography, 2025", zh: "数码摄影, 2025", fr: "Photographie numérique, 2025" },
    year: 2025,
    category: { en: "Urban Fragments", zh: "城市碎片", fr: "Fragments Urbains" },
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    title: { en: "Concrete Light", zh: "混凝土之光", fr: "Lumière de Béton" },
    medium: { en: "Digital Photography, 2024", zh: "数码摄影, 2024", fr: "Photographie numérique, 2024" },
    year: 2024,
    category: { en: "Urban Fragments", zh: "城市碎片", fr: "Fragments Urbains" },
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
    title: { en: "Shadow Play", zh: "光影戏", fr: "Jeu d'Ombres" },
    medium: { en: "Digital Photography, 2024", zh: "数码摄影, 2024", fr: "Photographie numérique, 2024" },
    year: 2024,
    category: { en: "Urban Fragments", zh: "城市碎片", fr: "Fragments Urbains" },
  },

  // ═══════════════════════════════════════
  // Still Life / 静物 (2023–2024)
  // ═══════════════════════════════════════
  {
    id: "p5",
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
    title: { en: "Quiet Objects 01", zh: "静物 01", fr: "Objets Silencieux 01" },
    medium: { en: "Film Photography, 2024", zh: "胶片摄影, 2024", fr: "Photographie argentique, 2024" },
    year: 2024,
    category: { en: "Still Life", zh: "静物", fr: "Nature Morte" },
  },
  {
    id: "p6",
    src: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80",
    title: { en: "Quiet Objects 02", zh: "静物 02", fr: "Objets Silencieux 02" },
    medium: { en: "Film Photography, 2023", zh: "胶片摄影, 2023", fr: "Photographie argentique, 2023" },
    year: 2023,
    category: { en: "Still Life", zh: "静物", fr: "Nature Morte" },
  },
  {
    id: "p7",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: { en: "Morning Table", zh: "晨间桌面", fr: "Table du Matin" },
    medium: { en: "Film Photography, 2023", zh: "胶片摄影, 2023", fr: "Photographie argentique, 2023" },
    year: 2023,
    category: { en: "Still Life", zh: "静物", fr: "Nature Morte" },
  },

  // ═══════════════════════════════════════
  // Nature / 自然 (2022–2023)
  // ═══════════════════════════════════════
  {
    id: "p8",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    title: { en: "Forest Breath", zh: "森林的呼吸", fr: "Souffle de la Forêt" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Nature", zh: "自然", fr: "Nature" },
  },
  {
    id: "p9",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    title: { en: "Valley Mist", zh: "山谷薄雾", fr: "Brume de Vallée" },
    medium: { en: "Digital Photography, 2022", zh: "数码摄影, 2022", fr: "Photographie numérique, 2022" },
    year: 2022,
    category: { en: "Nature", zh: "自然", fr: "Nature" },
  },
  {
    id: "p10",
    src: "https://images.unsplash.com/photo-1500534314263-a3ee5be48e52?w=800&q=80",
    title: { en: "Water Surface", zh: "水面", fr: "Surface de l'Eau" },
    medium: { en: "Digital Photography, 2022", zh: "数码摄影, 2022", fr: "Photographie numérique, 2022" },
    year: 2022,
    category: { en: "Nature", zh: "自然", fr: "Nature" },
  },
];
