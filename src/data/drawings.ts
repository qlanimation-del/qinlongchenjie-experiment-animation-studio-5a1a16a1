export interface ArtworkItem {
  id: string;
  src: string;
  title: { en: string; zh: string; fr: string };
  medium: { en: string; zh: string; fr: string };
}

export const drawings: ArtworkItem[] = [
  {
    id: "d1",
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    title: { en: "Untitled No.1", zh: "无题 一", fr: "Sans titre N°1" },
    medium: { en: "Charcoal on paper, 2023", zh: "纸上炭笔, 2023", fr: "Fusain sur papier, 2023" },
  },
  {
    id: "d2",
    src: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&q=80",
    title: { en: "Fragment Series I", zh: "片段系列 一", fr: "Série Fragments I" },
    medium: { en: "Ink on rice paper, 2023", zh: "宣纸水墨, 2023", fr: "Encre sur papier de riz, 2023" },
  },
  {
    id: "d3",
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    title: { en: "Study of Light", zh: "光的研究", fr: "Étude de lumière" },
    medium: { en: "Graphite on paper, 2022", zh: "纸上石墨, 2022", fr: "Graphite sur papier, 2022" },
  },
  {
    id: "d4",
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    title: { en: "Landscape Memory", zh: "风景的记忆", fr: "Mémoire de paysage" },
    medium: { en: "Watercolor on paper, 2023", zh: "纸上水彩, 2023", fr: "Aquarelle sur papier, 2023" },
  },
  {
    id: "d5",
    src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    title: { en: "Abstract Form No.3", zh: "抽象形态 三", fr: "Forme abstraite N°3" },
    medium: { en: "Acrylic on canvas, 2024", zh: "布面丙烯, 2024", fr: "Acrylique sur toile, 2024" },
  },
  {
    id: "d6",
    src: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&q=80",
    title: { en: "Traces", zh: "痕迹", fr: "Traces" },
    medium: { en: "Mixed media on paper, 2022", zh: "纸上综合材料, 2022", fr: "Technique mixte sur papier, 2022" },
  },
  {
    id: "d7",
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    title: { en: "Nocturne", zh: "夜曲", fr: "Nocturne" },
    medium: { en: "Oil pastel on paper, 2023", zh: "纸上油画棒, 2023", fr: "Pastel à l'huile sur papier, 2023" },
  },
  {
    id: "d8",
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80",
    title: { en: "Erosion Study", zh: "侵蚀研究", fr: "Étude d'érosion" },
    medium: { en: "Pen and ink, 2024", zh: "钢笔水墨, 2024", fr: "Plume et encre, 2024" },
  },
  {
    id: "d9",
    src: "https://images.unsplash.com/photo-1531913764164-f85c3e01b2aa?w=600&q=80",
    title: { en: "Quiet Moment", zh: "静谧时刻", fr: "Moment de calme" },
    medium: { en: "Colored pencil on paper, 2023", zh: "纸上彩铅, 2023", fr: "Crayon de couleur sur papier, 2023" },
  },
];
