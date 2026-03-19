export interface ArtworkItem {
  id: string;
  src: string;
  title: { en: string; zh: string; fr: string };
  medium: { en: string; zh: string; fr: string };
}

export const drawings: ArtworkItem[] = [
  {
    id: "d1",
    src: "/images/chunriyuzhen001.webp",
    title: { en: "After Shock 01", zh: "春日余震 01", fr: "Réplique printanière 01" },
    medium: { en: "Acrylic on paper, 2023", zh: "纸上丙烯, 2023", fr: "Peinture acrylique sur papier, 2023" },
  },
  {
    id: "d2",
    src: "/images/chunriyuzhen002.webp",
    title: { en: "After Shock 02", zh: "春日余震 02", fr: "Réplique printanière 02" },
    medium: { en: "Digital art, 2023", zh: "宣纸水墨, 2023", fr: "Encre sur papier de riz, 2023" },
  },
  {
    id: "d3",
    src: "/images/chunriyuzhen003.webp",
    title: { en: "After Shock 03", zh: "春日余震 03", fr: "Réplique printanière 03" },
    medium: { en: "Digital art, 2023", zh: "纸上石墨, 2022", fr: "Graphite sur papier, 2022" },
  },
  {
    id: "d4",
    src: "https://picsum.photos/seed/landscape/600/400",
    title: { en: "Landscape Memory", zh: "风景的记忆", fr: "Mémoire de paysage" },
    medium: { en: "Watercolor on paper, 2023", zh: "纸上水彩, 2023", fr: "Aquarelle sur papier, 2023" },
  },
  {
    id: "d5",
    src: "https://picsum.photos/seed/abstract/600/750",
    title: { en: "Abstract Form No.3", zh: "抽象形态 三", fr: "Forme abstraite N°3" },
    medium: { en: "Acrylic on canvas, 2024", zh: "布面丙烯, 2024", fr: "Acrylique sur toile, 2024" },
  },
  {
    id: "d6",
    src: "https://picsum.photos/seed/traces/600/600",
    title: { en: "Traces", zh: "痕迹", fr: "Traces" },
    medium: { en: "Mixed media on paper, 2022", zh: "纸上综合材料, 2022", fr: "Technique mixte sur papier, 2022" },
  },
  {
    id: "d7",
    src: "https://picsum.photos/seed/nocturne/600/800",
    title: { en: "Nocturne", zh: "夜曲", fr: "Nocturne" },
    medium: { en: "Oil pastel on paper, 2023", zh: "纸上油画棒, 2023", fr: "Pastel à l'huile sur papier, 2023" },
  },
  {
    id: "d8",
    src: "https://picsum.photos/seed/erosion/600/450",
    title: { en: "Erosion Study", zh: "侵蚀研究", fr: "Étude d'érosion" },
    medium: { en: "Pen and ink, 2024", zh: "钢笔水墨, 2024", fr: "Plume et encre, 2024" },
  },
  {
    id: "d9",
    src: "https://picsum.photos/seed/quiet/600/700",
    title: { en: "Quiet Moment", zh: "静谧时刻", fr: "Moment de calme" },
    medium: { en: "Colored pencil on paper, 2023", zh: "纸上彩铅, 2023", fr: "Crayon de couleur sur papier, 2023" },
  },
];
