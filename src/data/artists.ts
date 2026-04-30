import type { Locale } from "@/i18n/translations";
import director1 from "@/assets/director-1.jpg";
import director2 from "@/assets/director-2.jpg";

export interface CVEntry {
  year: string;
  title: Record<Locale, string>;
  venue?: Record<Locale, string>;
  city?: Record<Locale, string>;
}

export interface CVSection {
  key: string;
  label: Record<Locale, string>;
  entries: CVEntry[];
}

export interface Artist {
  id: string;
  name: Record<Locale, string>;
  role: Record<Locale, string>;
  image: string;
  shortBio: Record<Locale, string>;
  longBio: Record<Locale, string>;
  sections: CVSection[];
}

// Empty section scaffolds — populate with real CV data when available.
const emptySections = (): CVSection[] => [
  {
    key: "solo",
    label: { en: "Solo Exhibitions", zh: "个展", fr: "Expositions personnelles" },
    entries: [],
  },
  {
    key: "group",
    label: { en: "Group Exhibitions", zh: "群展", fr: "Expositions collectives" },
    entries: [],
  },
  {
    key: "screenings",
    label: { en: "Screenings & Festivals", zh: "放映与电影节", fr: "Projections & Festivals" },
    entries: [],
  },
  {
    key: "awards",
    label: { en: "Awards & Grants", zh: "奖项与资助", fr: "Prix & Bourses" },
    entries: [],
  },
  {
    key: "residencies",
    label: { en: "Residencies", zh: "驻留项目", fr: "Résidences" },
    entries: [],
  },
  {
    key: "publications",
    label: { en: "Publications", zh: "出版物", fr: "Publications" },
    entries: [],
  },
  {
    key: "teaching",
    label: { en: "Teaching", zh: "教学", fr: "Enseignement" },
    entries: [],
  },
];

export const artists: Artist[] = [
  {
    id: "qinlong",
    name: { en: "Qinlong", zh: "秦龙", fr: "Qinlong" },
    role: {
      en: "Director / Animator — Independent Animation",
      zh: "导演 / 动画师 — 独立动画",
      fr: "Réalisateur / Animateur — Animation indépendante",
    },
    image: director1,
    shortBio: {
      en: "Independent animator based in Guangzhou. Teaches at the Guangzhou Academy of Fine Arts.",
      zh: "独立动画导演，常驻广州，任教于广州美术学院。",
      fr: "Animateur indépendant basé à Guangzhou. Enseignant à l'Académie des Beaux-Arts de Guangzhou.",
    },
    longBio: {
      en: "Qinlong's practice centres on experimental animation, weaving handcrafted texture with digital techniques. His films explore memory, landscape, and the porous boundary between drawing and moving image.",
      zh: "秦龙的创作以实验动画为核心，将手工质感与数字技术交织。作品聚焦记忆、风景，以及绘画与动态影像之间松动的边界。",
      fr: "La pratique de Qinlong se concentre sur l'animation expérimentale, mêlant la matière artisanale aux techniques numériques. Ses films explorent la mémoire, le paysage et la frontière poreuse entre le dessin et l'image en mouvement.",
    },
    sections: emptySections(),
  },
  {
    id: "chenjie",
    name: { en: "Chenjie", zh: "陈洁", fr: "Chenjie" },
    role: {
      en: "Director / Writer — Video Essay · Experimental Video",
      zh: "导演 / 编剧 — 影像散文 · 实验影像",
      fr: "Réalisatrice / Scénariste — Essai vidéo · Vidéo expérimentale",
    },
    image: director2,
    shortBio: {
      en: "Filmmaker and writer working with video essay and experimental video. Teaches at the Guangzhou Academy of Fine Arts.",
      zh: "导演与作者，从事影像散文与实验影像创作，任教于广州美术学院。",
      fr: "Réalisatrice et autrice travaillant l'essai vidéo et la vidéo expérimentale. Enseignante à l'Académie des Beaux-Arts de Guangzhou.",
    },
    longBio: {
      en: "Chenjie's work moves between video essay and experimental video, drawing on language, image archives, and everyday observation to reflect on contemporary life and its mediations.",
      zh: "陈洁的创作游走于影像散文与实验影像之间，借助语言、影像档案与日常观察，回应当代生活及其中介化的处境。",
      fr: "Le travail de Chenjie circule entre l'essai vidéo et la vidéo expérimentale, en s'appuyant sur la langue, les archives d'images et l'observation du quotidien pour interroger la vie contemporaine et ses médiations.",
    },
    sections: emptySections(),
  },
];
