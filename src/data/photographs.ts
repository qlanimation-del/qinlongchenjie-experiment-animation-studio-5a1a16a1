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
  // Artifacts,Nature,and People / 人造物与自然与人 (2023)
  // ═══════════════════════════════════════
  {
    id: "p1",
    src: "/photographs/Artifacts,Nature,and People01.webp",
    title: { en: "Artifacts,Nature,and People01", zh: "人造物与自然与人01", fr: "Artefacts, nature et hommes 01" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p2",
    src: "/photographs/Artifacts,Nature,and People02.webp",
    title: { en: "Artifacts,Nature,and People02", zh: "人造物与自然与人02", fr: "Artefacts, nature et hommes 02" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p3",
    src: "/photographs/Artifacts,Nature,and People03.webp",
    title: { en: "Artifacts,Nature,and People03", zh: "人造物与自然与人03", fr: "Artefacts, nature et hommes 03" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p4",
    src: "/photographs/Artifacts,Nature,and People04.webp",
    title: { en: "Artifacts,Nature,and People04", zh: "人造物与自然与人04", fr: "Artefacts, nature et hommes 04" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p5",
    src: "/photographs/Artifacts,Nature,and People05.webp",
    title: { en: "Artifacts,Nature,and People05", zh: "人造物与自然与人05", fr: "Artefacts, nature et hommes 05" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p6",
    src: "/photographs/Artifacts,Nature,and People06.webp",
    title: { en: "Artifacts,Nature,and People06", zh: "人造物与自然与人06", fr: "Artefacts, nature et hommes 06" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p7",
    src: "/photographs/Artifacts,Nature,and People07.webp",
    title: { en: "Artifacts,Nature,and People07", zh: "人造物与自然与人07", fr: "Artefacts, nature et hommes 07" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p8",
    src: "/photographs/Artifacts,Nature,and People08.webp",
    title: { en: "Artifacts,Nature,and People08", zh: "人造物与自然与人08", fr: "Artefacts, nature et hommes 08" },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },
  {
    id: "p9",
    src: "/photographs/Artifacts,Nature,and People09.webp",
    title: { en: "Artifacts,Nature,and People09", zh: "人造物与自然与人09", fr: "Artefacts, nature et hommes 09 " },
    medium: { en: "Digital Photography, 2023", zh: "数码摄影, 2023", fr: "Photographie numérique, 2023" },
    year: 2023,
    category: { en: "Artifacts,Nature,and People", zh: "人造物与自然与人", fr: "Artefacts, nature et hommes" },
  },

  // ═══════════════════════════════════════
  // Conceptual Photography / 观念摄影 (2022)
  // ═══════════════════════════════════════
  {
    id: "p10",
    src: "/photographs/枯枝影 2021 艺术微喷，60x60.webp",
    title: { en: "Silhouette of Withered Boughs", zh: "枯枝影", fr: "Silhouette de Branches Flétries" },
    medium: { en: "Digital Photography, 2021", zh: "数码摄影, 2021", fr: "Photographie numérique, 2021" },
    year: 2021,
    category: { en: "Conceptual Photography", zh: "观念摄影", fr: "Photographie Conceptuelle" },
  },
  

];
