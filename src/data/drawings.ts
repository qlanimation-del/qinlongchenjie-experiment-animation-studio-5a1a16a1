export interface ArtworkItem {
  id: string;
  src: string;
  title: { en: string; zh: string; fr: string };
  medium: { en: string; zh: string; fr: string };
  year: number;
  category: { en: string; zh: string; fr: string };
}

export const drawings: ArtworkItem[] = [
  // === Dust / 尘 (newest first) ===
  {
    id: "d11",
    src: "/images/Dust-Poster01.webp",
    title: { en: "Dust 01", zh: "尘 01", fr: " Poussière" },
    medium: { en: "Acrylic on canvas, 2024", zh: "布面丙烯, 2024", fr: "Acrylique sur toile, 2024" },
    year: 2025,
    category: { en: "Dust", zh: "尘", fr: "Poussière" },
  },
  {
    id: "d12",
    src: "/images/Dust-Poster02.webp",
    title: { en: "Dust 02", zh: "尘 02", fr: " Poussière" },
    medium: { en: "Acrylic on canvas, 2024", zh: "布面丙烯, 2024", fr: "Acrylique sur toile, 2024" },
    year: 2025,
    category: { en: "Dust", zh: "尘", fr: "Poussière" },
  },

  // === After Shock / 春日余震  ===
  {
    id: "d5",
    src: "/images/chunriyuzhen005.webp",
    title: { en: "After Shock 05", zh: "春日余震 05", fr: "Réplique printanière 05" },
    medium: { en: "Acrylic on canvas, 2024", zh: "布面丙烯, 2024", fr: "Acrylique sur toile, 2024" },
    year: 2024,
    category: { en: "After Shock", zh: "春日余震", fr: "Réplique printanière" },
  },
  {
    id: "d1",
    src: "/images/chunriyuzhen001.webp",
    title: { en: "After Shock 01", zh: "春日余震 01", fr: "Réplique printanière 01" },
    medium: { en: "Acrylic on paper, 2023", zh: "纸上丙烯, 2023", fr: "Peinture acrylique sur papier, 2023" },
    year: 2023,
    category: { en: "After Shock", zh: "春日余震", fr: "Réplique printanière" },
  },
  {
    id: "d2",
    src: "/images/chunriyuzhen002.webp",
    title: { en: "After Shock 02", zh: "春日余震 02", fr: "Réplique printanière 02" },
    medium: { en: "Ink on rice paper, 2023", zh: "宣纸水墨, 2023", fr: "Encre sur papier de riz, 2023" },
    year: 2023,
    category: { en: "After Shock", zh: "春日余震", fr: "Réplique printanière" },
  },
  {
    id: "d4",
    src: "/images/chunriyuzhen004.webp",
    title: { en: "After Shock 04", zh: "春日余震 04", fr: "Réplique printanière 04" },
    medium: { en: "Watercolor on paper, 2023", zh: "纸上水彩, 2023", fr: "Aquarelle sur papier, 2023" },
    year: 2023,
    category: { en: "After Shock", zh: "春日余震", fr: "Réplique printanière" },
  },
  {
    id: "d6",
    src: "/images/chunriyuzhen006.webp",
    title: { en: "After Shock 06", zh: "春日余震 06", fr: "Réplique printanière 06" },
    medium: { en: "Colored pencil on paper, 2023", zh: "纸上彩铅, 2023", fr: "Crayon de couleur sur papier, 2023" },
    year: 2023,
    category: { en: "After Shock", zh: "春日余震", fr: "Réplique printanière" },
  },
  {
    id: "d3",
    src: "/images/chunriyuzhen003.webp",
    title: { en: "After Shock 03", zh: "春日余震 03", fr: "Réplique printanière 03" },
    medium: { en: "Graphite on paper, 2022", zh: "纸上石墨, 2022", fr: "Graphite sur papier, 2022" },
    year: 2022,
    category: { en: "After Shock", zh: "春日余震", fr: "Réplique printanière" },
  },

  // === HUTOON Animation / 降妖高校 (2017) ===
  {
    id: "d8",
    src: "/images/chunriyuzhen008.webp",
    title: { en: "Storyboard © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "分镜设计-降妖高校", fr: "Storyboard – Lycée des Chasseurs de Démons" },
    medium: { en: "Watercolor on paper, 2017", zh: "钢笔水墨, 2017", fr: "Aquarelle sur papier, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d7",
    src: "/images/Scence-Design009.webp",
    title: { en: "Scene Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "场景设计-降妖高校", fr: "Conception de scène – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d9",
    src: "/images/Scence-Design010.webp",
    title: { en: "Scene Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "场景设计-降妖高校", fr: "Conception de scène – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d10",
    src: "/images/Scence-Design011.webp",
    title: { en: "Character Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "角色设计-降妖高校", fr: "Conception de personnage – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d10b",
    src: "/images/Scence-Design012.webp",
    title: { en: "Character Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "角色设计-降妖高校", fr: "Conception de personnage – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d10c",
    src: "/images/Scence-Design013.webp",
    title: { en: "Character Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "角色设计-降妖高校", fr: "Conception de personnage – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d11",
    src: "/images/Scence-Design014.webp",
    title: { en: "Scene Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "场景设计-降妖高校", fr: "Conception de scène – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d12",
    src: "/images/Scence-Design015.webp",
    title: { en: "Character Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "角色设计-降妖高校", fr: "Conception de personnage – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d13",
    src: "/images/Scence-Design016.webp",
    title: { en: "Character Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "角色设计-降妖高校", fr: "Conception de personnage – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
  {
    id: "d14",
    src: "/images/Scence-Design017.webp",
    title: { en: "Character Design © 2017 Beijing HUTOON Animation Co.Ltd.", zh: "角色设计-降妖高校", fr: "Conception de personnage – Lycée des Chasseurs de Démons" },
    medium: { en: "Digital art, 2017", zh: "数字艺术, 2017", fr: "Art numérique, 2017" },
    year: 2017,
    category: { en: "HUTOON Animation", zh: "降妖高校", fr: "Animation HUTOON" },
  },
];
