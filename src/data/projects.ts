import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.webp";
import project6 from "@/assets/project-6.jpg";
import parallaxBg from "@/assets/parallax-bg.webp";
import parallaxMid from "@/assets/parallax-mid.webp";
import parallaxTop from "@/assets/parallax-top.webp";

// Gallery images
import d1 from "@/assets/gallery/dreamscape-1.webp";
import d2 from "@/assets/gallery/dreamscape-2.webp";
import d3 from "@/assets/gallery/dreamscape-3.webp";
import d4 from "@/assets/gallery/dreamscape-4.webp";
import d5 from "@/assets/gallery/dreamscape-5.webp";
import d6 from "@/assets/gallery/dreamscape-6.webp";
import s1 from "@/assets/gallery/shadows-1.webp";
import s2 from "@/assets/gallery/shadows-2.webp";
import s3 from "@/assets/gallery/shadows-3.webp";
import s4 from "@/assets/gallery/shadows-4.webp";
import s5 from "@/assets/gallery/shadows-5.webp";
import s6 from "@/assets/gallery/shadows-6.webp";
import f1 from "@/assets/gallery/fizzy-1.webp";
import f2 from "@/assets/gallery/fizzy-2.webp";
import f3 from "@/assets/gallery/fizzy-3.webp";
import f4 from "@/assets/gallery/fizzy-4.webp";
import f5 from "@/assets/gallery/fizzy-5.webp";
import f6 from "@/assets/gallery/fizzy-6.webp";
import r1 from "@/assets/gallery/resonance-1.webp";
import r2 from "@/assets/gallery/resonance-2.webp";
import r3 from "@/assets/gallery/resonance-3.webp";
import r4 from "@/assets/gallery/resonance-4.webp";
import r5 from "@/assets/gallery/resonance-5.webp";
import r6 from "@/assets/gallery/resonance-6.webp";
import t1 from "@/assets/gallery/tiny-1.webp";
import t2 from "@/assets/gallery/tiny-2.webp";
import t3 from "@/assets/gallery/tiny-3.webp";
import t4 from "@/assets/gallery/tiny-4.webp";
import t5 from "@/assets/gallery/tiny-5.webp";
import t6 from "@/assets/gallery/tiny-6.webp";
import b1 from "@/assets/gallery/beyond-1.webp";
import b2 from "@/assets/gallery/beyond-2.webp";
import b3 from "@/assets/gallery/beyond-3.webp";
import b4 from "@/assets/gallery/beyond-4.webp";
import b5 from "@/assets/gallery/beyond-5.webp";
import b6 from "@/assets/gallery/beyond-6.webp";
import project7 from "@/assets/project-7.webp";
import bw1 from "@/assets/gallery/between-1.webp";
import bw2 from "@/assets/gallery/between-2.webp";
import bw3 from "@/assets/gallery/between-3.webp";
import bw4 from "@/assets/gallery/between-4.webp";
import bw5 from "@/assets/gallery/between-5.webp";
import bw6 from "@/assets/gallery/between-6.webp";

import type { Locale } from "@/i18n/translations";

export interface ParallaxLayer {
  src: string;
  speed: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  type: Record<Locale, string>;
  year: string;
  thumbnail: string;
  videoUrl?: string;
  description: Record<Locale, string>;
  credits: Record<Locale, string[]>;
  glowColor: string;
  parallaxLayers?: ParallaxLayer[];
  client?: Record<Locale, string>;
  crew?: Record<Locale, string>;
  galleryImages?: GalleryImage[];
}

export const projects: Project[] = [
  {
    id: "dreamscape",
    title: "Life's TRACk",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2011",
    thumbnail: project1,
    videoUrl: "https://player.vimeo.com/video/000000",
    description: {
      en: "An award-winning animated short exploring the boundaries between dreams and reality. A journey through surreal landscapes where nothing is quite what it seems.",
      zh: "一部获奖动画短片，探索梦境与现实之间的边界。穿越超现实景观的旅程，在这里一切都并非表面所见。",
      fr: "Un court métrage d'animation primé explorant les frontières entre rêves et réalité. Un voyage à travers des paysages surréalistes où rien n'est tout à fait ce qu'il semble être.",
    },
    credits: {
      en: ["Director: Alex Mercer", "Animation: MegaComputeur", "Music: Nils Frahm", "Sound Design: Studio Echo"],
      zh: ["导演：Alex Mercer", "动画：MegaComputeur", "音乐：Nils Frahm", "声音设计：Studio Echo"],
      fr: ["Réalisateur : Alex Mercer", "Animation : MegaComputeur", "Musique : Nils Frahm", "Conception sonore : Studio Echo"],
    },
    glowColor: "#00D9FF",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "Alex Mercer, MegaComputeur", zh: "Alex Mercer、MegaComputeur", fr: "Alex Mercer, MegaComputeur" },
    parallaxLayers: [
      { src: project1, speed: 0.1 },
      { src: project1, speed: 0.25 },
      { src: project1, speed: 0.4 },
    ],
    galleryImages: [
      { src: d1, alt: "Life's Track gallery 1" },
      { src: d2, alt: "Life's Track gallery 2" },
      { src: d3, alt: "Life's Track gallery 3" },
      { src: d4, alt: "Life's Track gallery 4" },
      { src: d5, alt: "Life's Track gallery 5" },
      { src: d6, alt: "Life's Track gallery 6" },
    ],
  },
  {
    id: "shadows-within",
    title: "INTROSPECTION",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2013",
    thumbnail: project2,
    videoUrl: "https://player.vimeo.com/video/000001",
    description: {
      en: "A dark and atmospheric short film about confronting inner demons. Hand-drawn animation meets digital compositing in this deeply personal story.",
      zh: "一部关于面对内心恶魔的黑暗氛围短片。手绘动画与数字合成在这个极具个人色彩的故事中交汇。",
      fr: "Un court métrage sombre et atmosphérique sur la confrontation avec ses démons intérieurs. L'animation dessinée à la main rencontre le compositing numérique dans cette histoire profondément personnelle.",
    },
    credits: {
      en: ["Director: QinLong", "Animation: MegaComputeur", "Producer: Passion Pictures", "Music: Ólafur Arnalds"],
      zh: ["导演：秦龙", "动画：MegaComputeur", "制片：Passion Pictures", "音乐：Ólafur Arnalds"],
      fr: ["Réalisateur : QinLong", "Animation : MegaComputeur", "Producteur : Passion Pictures", "Musique : Ólafur Arnalds"],
    },
    glowColor: "#FF3366",
    client: { en: "Passion Pictures", zh: "Passion Pictures", fr: "Passion Pictures" },
    crew: { en: "QinLong, MegaComputeur", zh: "秦龙、MegaComputeur", fr: "QinLong, MegaComputeur" },
    parallaxLayers: [
      { src: project2, speed: 0.1 },
      { src: project2, speed: 0.25 },
      { src: project2, speed: 0.4 },
    ],
    galleryImages: [
      { src: s1, alt: "Introspection gallery 1" },
      { src: s2, alt: "Introspection gallery 2" },
      { src: s3, alt: "Introspection gallery 3" },
      { src: s4, alt: "Introspection gallery 4" },
      { src: s5, alt: "Introspection gallery 5" },
      { src: s6, alt: "Introspection gallery 6" },
    ],
  },
  {
    id: "fizzy-pop",
    title: "YEAR OF FATE",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2014",
    thumbnail: project3,
    videoUrl: "https://player.vimeo.com/video/000002",
    description: {
      en: "A vibrant and playful animated commercial for a fizzy drink brand. Character animation brings the product to life with energy and charm.",
      zh: "一部充满活力和趣味的动画广告。角色动画以能量和魅力赋予产品生命力。",
      fr: "Une publicité animée vibrante et ludique. L'animation de personnages donne vie au produit avec énergie et charme.",
    },
    credits: {
      en: ["Director: QinLong", "Animation: QinLong"],
      zh: ["导演：秦龙", "动画：秦龙"],
      fr: ["Réalisateur : QinLong", "Animation : QinLong"],
    },
    glowColor: "#FFD700",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: project3, speed: 0.1 },
      { src: project3, speed: 0.25 },
      { src: project3, speed: 0.4 },
    ],
    galleryImages: [
      { src: f1, alt: "Year of Fate gallery 1" },
      { src: f2, alt: "Year of Fate gallery 2" },
      { src: f3, alt: "Year of Fate gallery 3" },
      { src: f4, alt: "Year of Fate gallery 4" },
      { src: f5, alt: "Year of Fate gallery 5" },
      { src: f6, alt: "Year of Fate gallery 6" },
    ],
  },
  {
    id: "resonance",
    title: "Naturally Yours",
    type: { en: "Commercial", zh: "商业广告", fr: "Publicité" },
    year: "2018",
    thumbnail: project4,
    videoUrl: "https://player.vimeo.com/video/000003",
    description: {
      en: "An abstract motion graphics journey through sound and color. Each beat triggers a visual explosion of geometric forms and flowing particles.",
      zh: "一场抽象的动态图形之旅，穿越声音与色彩。每一个节拍都触发几何形态和流动粒子的视觉爆发。",
      fr: "Un voyage abstrait en motion design à travers le son et la couleur. Chaque battement déclenche une explosion visuelle de formes géométriques et de particules fluides.",
    },
    credits: {
      en: ["Director: QinLong", "Beijing Forestry University-Admissions Office", "Artist: QinLong", "Animation: QinLong"],
      zh: ["导演：秦龙", "客户：北京林业大学", "艺术家：秦龙", "动画：秦龙"],
      fr: ["Réalisateur : QinLong", "Client : Université forestière de Pékin", "Artiste : QinLong", "Animation : QinLong"],
    },
    glowColor: "#00FF88",
    client: { en: "Beijing Forestry University-Admissions Office", zh: "北京林业大学", fr: "Université forestière de Pékin" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: project4, speed: 0.1 },
      { src: project4, speed: 0.25 },
      { src: project4, speed: 0.4 },
    ],
    galleryImages: [
      { src: r1, alt: "Naturally Yours gallery 1" },
      { src: r2, alt: "Naturally Yours gallery 2" },
      { src: r3, alt: "Naturally Yours gallery 3" },
      { src: r4, alt: "Naturally Yours gallery 4" },
      { src: r5, alt: "Naturally Yours gallery 5" },
      { src: r6, alt: "Naturally Yours gallery 6" },
    ],
  },
  {
    id: "tiny-worlds",
    title: "IN-BETWEEN",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2023-2024",
    thumbnail: project5,
    videoUrl: "https://player.vimeo.com/video/000004",
    description: {
      en: "Inspired by the correspondence between Zhong Shuhe and Zhou Zuoren, this film uses the metaphor of 'a torch in the darkness' to pay tribute to the ordinary people who have quietly illuminated the course of civilization throughout history. Through portraying a group of athletes who never won medals in sports competitions, the film highlights those essential yet often overlooked 'carriers' — those who run in the darkness, passing on the light as a vital middle link. Their value deserves to be remembered. Born ordinary, with lives both long and fleeting, it is precisely these predecessors who transformed the ordinary into the extraordinary. Through quiet perseverance and passing on the torch, they gave future generations 'the courage to dare to face danger.",
      zh: "本片受钟叔河与周作人通信的启发，以\u201C黑暗中的火炬\u201D为隐喻，向历史上那些默默照亮文明进程的普通人致敬。通过刻画一群在体育竞技中从未获得奖牌的运动员，影片聚焦于那些不可或缺却常被忽视的\u201C传递者\u201D\u2014\u2014他们在黑暗中奔跑，作为至关重要的中间环节传递着光明。他们的价值值得被铭记。生而平凡，生命或长或短，正是这些前行者将平凡化为非凡。通过默默坚守与薪火相传，他们赋予后人\u201C敢于直面危险的勇气\u201D。",
      fr: "Inspiré par la correspondance entre Zhong Shuhe et Zhou Zuoren, ce film utilise la métaphore d'« une torche dans l'obscurité » pour rendre hommage aux gens ordinaires qui ont silencieusement illuminé le cours de la civilisation à travers l'histoire. En dépeignant un groupe d'athlètes n'ayant jamais remporté de médailles, le film met en lumière ces « porteurs » essentiels mais souvent négligés — ceux qui courent dans l'obscurité, transmettant la lumière comme un maillon vital. Leur valeur mérite d'être rappelée.",
    },
    credits: {
      en: ["Director: Qin Long", "Animation: Qin Long", "Script writer: Chen Jie", "Music: Ferenc Hegedus (Magyarország)", "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Lynne Publishing (PRS)"],
      zh: ["导演：秦龙", "动画：秦龙", "编剧：陈洁", "音乐：Ferenc Hegedus (匈牙利)", "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Lynne Publishing (PRS)"],
      fr: ["Réalisateur : Qin Long", "Animation : Qin Long", "Scénariste : Chen Jie", "Musique : Ferenc Hegedus (Hongrie)", "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Lynne Publishing (PRS)"],
    },
    glowColor: "#FF8800",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "Qin Long, Chen Jie", zh: "秦龙、陈洁", fr: "Qin Long, Chen Jie" },
    parallaxLayers: [
      { src: parallaxBg, speed: 0.1 },
      { src: parallaxMid, speed: 0.25 },
      { src: parallaxTop, speed: 0.4 },
    ],
    galleryImages: [
      { src: t1, alt: "In-Between gallery 1" },
      { src: t2, alt: "In-Between gallery 2" },
      { src: t3, alt: "In-Between gallery 3" },
      { src: t4, alt: "In-Between gallery 4" },
      { src: t5, alt: "In-Between gallery 5" },
      { src: t6, alt: "In-Between gallery 6" },
    ],
  },
  {
    id: "beyond-orbit",
    title: "DUST",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2026-2028",
    thumbnail: project6,
    videoUrl: "https://player.vimeo.com/video/000005",
    description: {
      en: "A sci-fi cinematic commercial for a tech company. High-end CGI animation with dramatic lighting and epic scale.",
      zh: "一部为科技公司制作的科幻电影级广告。高端CGI动画，配以戏剧性灯光和宏大规模。",
      fr: "Une publicité cinématographique de science-fiction pour une entreprise technologique. Animation CGI haut de gamme avec un éclairage dramatique et une échelle épique.",
    },
    credits: {
      en: ["Director: QinLong & ChenJie", "Animation: QinLong", "VFX: QinLong"],
      zh: ["导演：秦龙 & 陈洁", "动画：秦龙", "视觉特效：秦龙"],
      fr: ["Réalisateur : QinLong & ChenJie", "Animation : QinLong", "VFX : QinLong"],
    },
    glowColor: "#AA88FF",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong, ChenJie", zh: "秦龙、陈洁", fr: "QinLong, ChenJie" },
    parallaxLayers: [
      { src: project6, speed: 0.1 },
      { src: project6, speed: 0.25 },
      { src: project6, speed: 0.4 },
    ],
    galleryImages: [
      { src: b1, alt: "Dust gallery 1" },
      { src: b2, alt: "Dust gallery 2" },
      { src: b3, alt: "Dust gallery 3" },
      { src: b4, alt: "Dust gallery 4" },
      { src: b5, alt: "Dust gallery 5" },
      { src: b6, alt: "Dust gallery 6" },
    ],
  },
  {
    id: "between-us",
    title: "Between Us and the World",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2025",
    thumbnail: project7,
    videoUrl: "https://player.vimeo.com/video/000006",
    description: {
      en: "An intimate animated short exploring the invisible threads that connect people across distance and time. A poetic meditation on human bonds.",
      zh: "一部亲密的动画短片，探索跨越距离与时间将人们联系在一起的无形纽带。一首关于人类情感联结的诗意冥想。",
      fr: "Un court métrage d'animation intime explorant les fils invisibles qui relient les gens à travers la distance et le temps. Une méditation poétique sur les liens humains.",
    },
    credits: {
      en: ["Director: QinLong", "Animation: QinLong", "Music: TBD", "Sound Design: TBD"],
      zh: ["导演：秦龙", "动画：秦龙", "音乐：待定", "声音设计：待定"],
      fr: ["Réalisateur : QinLong", "Animation : QinLong", "Musique : À déterminer", "Conception sonore : À déterminer"],
    },
    glowColor: "#E8A87C",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: project7, speed: 0.1 },
      { src: project7, speed: 0.25 },
      { src: project7, speed: 0.4 },
    ],
    galleryImages: [
      { src: bw1, alt: "Between Us and the World gallery 1" },
      { src: bw2, alt: "Between Us and the World gallery 2" },
      { src: bw3, alt: "Between Us and the World gallery 3" },
      { src: bw4, alt: "Between Us and the World gallery 4" },
      { src: bw5, alt: "Between Us and the World gallery 5" },
      { src: bw6, alt: "Between Us and the World gallery 6" },
    ],
  },
];
