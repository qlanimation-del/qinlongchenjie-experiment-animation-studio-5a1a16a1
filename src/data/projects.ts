import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import project4 from "@/assets/project-4.webp";
import project5 from "@/assets/project-5.webp";
import project6 from "@/assets/project-6.webp";
import project7 from "@/assets/project-7.webp";
import projectCloud from "@/assets/project-cloud.webp";
import projectGafa from "@/assets/project-gafa.webp";

// Parallax layers — dedicated files per project for easy replacement
import dustParallaxBg from "@/assets/dust-parallax-bg.webp";
import dustParallaxMid from "@/assets/dust-parallax-mid.webp";
import dustParallaxTop from "@/assets/dust-parallax-top.webp";

import betweenParallaxBg from "@/assets/between-parallax-bg.webp";
import betweenParallaxMid from "@/assets/between-parallax-mid.webp";
import betweenParallaxTop from "@/assets/between-parallax-top.webp";

import inbetweenParallaxBg from "@/assets/inbetween-parallax-bg.webp";
import inbetweenParallaxMid from "@/assets/inbetween-parallax-mid.webp";
import inbetweenParallaxTop from "@/assets/inbetween-parallax-top.webp";

import resonanceParallaxBg from "@/assets/resonance-parallax-bg.webp";
import resonanceParallaxMid from "@/assets/resonance-parallax-mid.webp";
import resonanceParallaxTop from "@/assets/resonance-parallax-top.webp";

import fizzyParallaxBg from "@/assets/fizzy-parallax-bg.webp";
import fizzyParallaxMid from "@/assets/fizzy-parallax-mid.webp";
import fizzyParallaxTop from "@/assets/fizzy-parallax-top.webp";

import shadowsParallaxBg from "@/assets/shadows-parallax-bg.webp";
import shadowsParallaxMid from "@/assets/shadows-parallax-mid.webp";
import shadowsParallaxTop from "@/assets/shadows-parallax-top.webp";

import dreamscapeParallaxBg from "@/assets/dreamscape-parallax-bg.webp";
import dreamscapeParallaxMid from "@/assets/dreamscape-parallax-mid.webp";
import dreamscapeParallaxTop from "@/assets/dreamscape-parallax-top.webp";

import cloudParallaxBg from "@/assets/cloud-parallax-bg.webp";
import cloudParallaxMid from "@/assets/cloud-parallax-mid.webp";
import cloudParallaxTop from "@/assets/cloud-parallax-top.webp";

import gafaParallaxBg from "@/assets/gafa-parallax-bg.webp";
import gafaParallaxMid from "@/assets/gafa-parallax-mid.webp";
import gafaParallaxTop from "@/assets/gafa-parallax-top.webp";

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
import bw1 from "@/assets/gallery/between-1.webp";
import bw2 from "@/assets/gallery/between-2.webp";
import bw3 from "@/assets/gallery/between-3.webp";
import bw4 from "@/assets/gallery/between-4.webp";
import bw5 from "@/assets/gallery/between-5.webp";
import bw6 from "@/assets/gallery/between-6.webp";
import cl1 from "@/assets/gallery/cloud-1.webp";
import cl2 from "@/assets/gallery/cloud-2.webp";
import cl3 from "@/assets/gallery/cloud-3.webp";
import cl4 from "@/assets/gallery/cloud-4.webp";
import cl5 from "@/assets/gallery/cloud-5.webp";
import cl6 from "@/assets/gallery/cloud-6.webp";
import g1 from "@/assets/gallery/gafa-1.webp";
import g2 from "@/assets/gallery/gafa-2.webp";
import g3 from "@/assets/gallery/gafa-3.webp";
import g4 from "@/assets/gallery/gafa-4.webp";
import g5 from "@/assets/gallery/gafa-5.webp";
import g6 from "@/assets/gallery/gafa-6.webp";

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
  videoUrl?: string | string[];
  videoAspect?: string | string[];
  description: Record<Locale, string>;
  credits: Record<Locale, string[]>;
  exhibitions?: Record<Locale, string[]>;
  glowColor: string;
  parallaxLayers?: ParallaxLayer[];
  client?: Record<Locale, string>;
  crew?: Record<Locale, string>;
  galleryImages?: GalleryImage[];
}

// Ordered new → old
export const projects: Project[] = [
  {
    id: "beyond-orbit",
    title: "DUST",
    type: { en: "Independent Animation", zh: "独立动画", fr: "Indépendante Animation " },
    year: "2026-Present",
    thumbnail: project6,
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
    exhibitions: {
      en: [
        "2027",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Best Experimental Film – Zagreb World Festival of Animated Films, Zagreb, Croatia",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Jury Prize – Fantoche International Animation Festival, Baden, Switzerland",
        "2028",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Official Selection – Annecy International Animation Festival, Annecy, France",
      ],
      zh: [
        "2027",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0最佳实验电影 – 萨格勒布世界动画电影节，克罗地亚萨格勒布",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0评审团奖 – Fantoche 国际动画电影节，瑞士巴登",
        "2028",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0入围 – 昂西国际动画电影节，法国昂西",
      ],
      fr: [
        "2027",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Meilleur film expérimental – Festival mondial du film d'animation de Zagreb, Zagreb, Croatie",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Prix du jury – Fantoche Festival international du film d'animation, Baden, Suisse",
        "2028",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Sélection officielle – Festival international du film d'animation d'Annecy, Annecy, France",
      ],
    },
    glowColor: "#AA88FF",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong, ChenJie", zh: "秦龙、陈洁", fr: "QinLong, ChenJie" },
    parallaxLayers: [
      { src: dustParallaxBg, speed: 0.1 },
      { src: dustParallaxMid, speed: 0.25 },
      { src: dustParallaxTop, speed: 0.4 },
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
    type: { en: "Video essay", zh: "短片", fr: "Court métrage" },
    year: "2025",
    thumbnail: project7,
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
    exhibitions: {
      en: [
        "2025",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Official Selection – Ottawa International Animation Festival, Ottawa, Canada",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Audience Award – Holland Animation Film Festival, Utrecht, Netherlands",
      ],
      zh: [
        "2025",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0入围 – 渥太华国际动画电影节，加拿大渥太华",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0观众奖 – 荷兰动画电影节，荷兰乌得勒支",
      ],
      fr: [
        "2025",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Sélection officielle – Festival international d'animation d'Ottawa, Ottawa, Canada",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Prix du public – Holland Animation Film Festival, Utrecht, Pays-Bas",
      ],
    },
    glowColor: "#E8A87C",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: betweenParallaxBg, speed: 0.1 },
      { src: betweenParallaxMid, speed: 0.25 },
      { src: betweenParallaxTop, speed: 0.4 },
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
  {
    id: "tiny-worlds",
    title: "IN-BETWEEN",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2023-2024",
    thumbnail: project5,
    videoUrl: "https://player.vimeo.com/video/1162742319?h=f695b2b474",
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
    exhibitions: {
      en: [
         "2024",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A016th Golden Dolphin International Animation Festival – Gold Award, Xiamen, China",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A011th Chengdu Jinsha Short Film Competition Week – Best Director Award, Chengdu, China",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Barcelona International Sports Film Festival – Silver Award, Barcelona, Spain",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A011th Montreal International Animation Film Festival – Official Selection, Montreal, Canada",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Animation Nights New York – Official Selection, New York, USA",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Liberec International Sports Film Festival – Official Selection, Liberec, Czech Republic",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A014th Festival International du Film d’Animation de Metz – Official Selection, Metz, France",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0ICONA International Animation Festival – Official Selection, Salerno, Italy",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A036th Festival de Cine de Girona – Official Selection, Girona, Spain",
        "2025",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0First Film Festival, Bamboo Dragonfly Section – Official Selection, Beijing, China",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A06th Dongbuzhou Animation Week – Official Selection, Nantong, China",
        

      ],
      zh: [
        "2024",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0第十六届金海豚国际动画节 – 金奖，中国厦门",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0第十一届成都金沙短片竞赛周 – 最佳导演奖，中国成都",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0巴塞罗那国际体育电影节 – 银奖，西班牙巴塞罗那",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0第十一届加拿大蒙特利尔国际动画电影节 – 入选，加拿大蒙特利尔",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0美国纽约动画之夜 – 入选，美国纽约",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0捷克利贝雷茨体育电影节 – 入选，捷克利贝雷茨",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0第十四届法国梅斯国际动画电影节 – 入选，法国梅斯",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0ICONA国际动画节 – 入选，意大利萨莱诺",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0第三十六届西班牙赫罗纳电影节 – 入选，西班牙赫罗纳",
        "2025",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0First电影节（竹蜻蜓单元） – 年度入选，中国北京",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0第六届东布洲动画周 – 入选，中国南通"
      ],
      fr: [
      "2024",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A016ème Festival International d'Animation Golden Dolphin – Prix d'Or, Xiamen, Chine",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A011ème Semaine du Concours de Courts Métrages Jinsha de Chengdu – Prix du Meilleur Réalisateur, Chengdu, Chine",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Festival International du Film Sportif de Barcelone – Prix d'Argent, Barcelone, Espagne",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A011ème Festival International du Film d'Animation de Montréal – Sélection Officielle, Montréal, Canada",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Animation Nights New York – Sélection Officielle, New York, États-Unis",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Festival International du Film Sportif de Liberec – Sélection Officielle, Liberec, République Tchèque",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A014ème Festival International du Film d'Animation de Metz – Sélection Officielle, Metz, France",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Festival International d'Animation ICONA – Sélection Officielle, Salerne, Italie",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A036ème Festival de Cinéma de Gérone – Sélection Officielle, Gérone, Espagne",
      "2025",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0First Film Festival, Section Libellule de Bambou – Sélection Annuelle, Pékin, Chine",
      "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A06ème Semaine d'Animation de Dongbuzhou – Sélection Officielle, Nantong, Chine",
      ],
    },
    glowColor: "#FF8800",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "Qin Long, Chen Jie", zh: "秦龙、陈洁", fr: "Qin Long, Chen Jie" },
    parallaxLayers: [
      { src: inbetweenParallaxBg, speed: 0.1 },
      { src: inbetweenParallaxMid, speed: 0.25 },
      { src: inbetweenParallaxTop, speed: 0.4 },
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
    id: "gafa-logo",
    title: "GAFA Animation Major",
    type: { en: "COMMERCIAL", zh: "商业项目", fr: "COMMERCIAL" },
    year: "2023",
    thumbnail: projectGafa,
    videoUrl: "https://player.vimeo.com/video/860598489?h=bcb862d10f",
    description: {
      en: "A dynamic logo animation created for the GAFA (Gobelins, l'école de l'image) Animation Major. The design captures the spirit of animation education through fluid motion and bold typography.",
      zh: "为GAFA（高布兰动画学院）动画专业创作的动态标志动画。设计通过流畅的运动和大胆的字体捕捉动画教育的精神。",
      fr: "Une animation de logo dynamique créée pour la filière Animation de GAFA (Gobelins, l'école de l'image). Le design capture l'esprit de l'enseignement de l'animation à travers un mouvement fluide et une typographie audacieuse.",
    },
    credits: {
      en: ["Director: QinLong", "Animation: QinLong", "Design: QinLong"],
      zh: ["导演：秦龙", "动画：秦龙", "设计：秦龙"],
      fr: ["Réalisateur : QinLong", "Animation : QinLong", "Design : QinLong"],
    },
    glowColor: "#4FC3F7",
    client: { en: "GAFA Animation Major", zh: "GAFA 动画专业", fr: "GAFA Animation Major" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: gafaParallaxBg, speed: 0.1 },
      { src: gafaParallaxMid, speed: 0.25 },
      { src: gafaParallaxTop, speed: 0.4 },
    ],
    galleryImages: [
      { src: g1, alt: "GAFA Logo gallery 1" },
      { src: g2, alt: "GAFA Logo gallery 2" },
      { src: g3, alt: "GAFA Logo gallery 3" },
      { src: g4, alt: "GAFA Logo gallery 4" },
      { src: g5, alt: "GAFA Logo gallery 5" },
      { src: g6, alt: "GAFA Logo gallery 6" },
    ],
  },
  {
    id: "entering-cloud",
    title: "Entering the Cloud",
    type: { en: "COMMERCIAL", zh: "商业项目", fr: "COMMERCIAL" },
    year: "2022",
    thumbnail: projectCloud,
    videoUrl: "https://player.vimeo.com/video/860598575?h=e277ea2e24",
    videoAspect: "9/16",
    description: {
      en: "An experimental animated short exploring the liminal space between the physical and digital worlds. As our lives increasingly migrate to the cloud, what do we leave behind?",
      zh: "一部实验性动画短片，探索物理世界与数字世界之间的过渡空间。当我们的生活越来越多地迁移到云端，我们留下了什么？",
      fr: "Un court métrage d'animation expérimental explorant l'espace liminal entre les mondes physique et numérique. Alors que nos vies migrent de plus en plus vers le cloud, que laissons-nous derrière nous ?",
    },
    credits: {
      en: ["Director: QinLong", "Animation: QinLong", "Music: TBD"],
      zh: ["导演：秦龙", "动画：秦龙", "音乐：待定"],
      fr: ["Réalisateur : QinLong", "Animation : QinLong", "Musique : À déterminer"],
    },
    exhibitions: {
      en: [
        "2022",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Won the Second Prize and Third Prize in the 2022 China Brand Innovation Design Competition",
      ],
      zh: [
        "2022",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0荣获 2022 年中国品牌创新设计大赛二等奖、三等奖",
      ],
      fr: [
        "2022",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0ce",
      ],
    },
    glowColor: "#B388FF",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: cloudParallaxBg, speed: 0.1 },
      { src: cloudParallaxMid, speed: 0.25 },
      { src: cloudParallaxTop, speed: 0.4 },
    ],
    galleryImages: [
      { src: cl1, alt: "Entering the Cloud gallery 1" },
      { src: cl2, alt: "Entering the Cloud gallery 2" },
      { src: cl3, alt: "Entering the Cloud gallery 3" },
      { src: cl4, alt: "Entering the Cloud gallery 4" },
      { src: cl5, alt: "Entering the Cloud gallery 5" },
      { src: cl6, alt: "Entering the Cloud gallery 6" },
    ],
  },
  {
    id: "resonance",
    title: "Naturally Yours",
    type: { en: "Commercial", zh: "商业广告", fr: "Publicité" },
    year: "2018",
    thumbnail: project4,
    videoUrl: ["https://player.vimeo.com/video/1175416894?h=9630b322a1", "https://player.vimeo.com/video/1175336696?h=e67e868106"],
    videoAspect: ["16/9", "2.39/1"],
    description: {
      en: "An abstract motion graphics journey through sound and color. Each beat triggers a visual explosion of geometric forms and flowing particles.",
      zh: "一场抽象的动态图形之旅，穿越声音与色彩。每一个节拍都触发几何形态和流动粒子的视觉爆发。",
      fr: "Un voyage abstrait en motion design à travers le son et la couleur. Chaque battement déclenche une explosion visuelle de formes géométriques et de particules fluides.",
    },
    credits: {

      en: ["Director: QinLong", "Story board: QinLong", "Animation: Beijing Yudubai Culture Media Co. Ltd.","Character Design: QinLong", "Scene Art：Chongqing Shifu Qianfang Animation Design Co., Ltd.","Music & Voice Acting: TrioPen Studio"],
      zh: ["导演：秦龙", "故事版：秦龙", "动画：北京鱼肚白文化传媒有限公司", "角色设计：秦龙", "场景美术：重庆市师傅前方动画设计有限公司", "音乐与配音：TrioPen Studio"],
      fr: ["Réalisateur : QinLong", "Story board : QinLong", "Animation : Beijing Yudubai Culture Media Co. Ltd.","Personnage conçu par : QinLong", "Art de scène : Chongqing Shifu Qianfang Animation Design Co., Ltd.","Musique et voix : TrioPen Studio"],
    },
    exhibitions: {
      en: [
        "2018",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Official Selection – China Independent Animation Film Forum, China",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Best Motion Design – Beijing Design Week, Beijing, China",
      ],
      zh: [
        "2018",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0入围 – 中国独立动画电影论坛，中国",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0最佳动态设计 – 北京设计周，中国北京",
      ],
      fr: [
        "2018",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Sélection officielle – Forum du film d'animation indépendant de Chine, Chine",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Meilleur motion design – Beijing Design Week, Pékin, Chine",
      ],
    },
    glowColor: "#00FF88",
    client: { en: "Beijing Forestry University-Admissions Office", zh: "北京林业大学", fr: "Université forestière de Pékin" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: resonanceParallaxBg, speed: 0.1 },
      { src: resonanceParallaxMid, speed: 0.25 },
      { src: resonanceParallaxTop, speed: 0.4 },
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
    id: "fizzy-pop",
    title: "YEAR OF FATE",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2014",
    thumbnail: project3,
    videoUrl: "https://player.vimeo.com/video/153659679?h=363f9693d5",
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
    exhibitions: {
      en: [
        "2014",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Screening – Shenzhen Animation Biennale, Shenzhen, China",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Nominee – Asia Pacific Screen Awards, Brisbane, Australia",
        "2015",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Official Selection – Animamundi Festival, Rio de Janeiro, Brazil",
      ],
      zh: [
        "2014",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0展映 – 深圳动画双年展，中国深圳",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0提名 – 亚太电影大奖，澳大利亚布里斯班",
        "2015",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0入围 – Animamundi 动画节，巴西里约热内卢",
      ],
      fr: [
        "2014",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Projection – Biennale de l'animation de Shenzhen, Shenzhen, Chine",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Nomination – Asia Pacific Screen Awards, Brisbane, Australie",
        "2015",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Sélection officielle – Festival Animamundi, Rio de Janeiro, Brésil",
      ],
    },
    glowColor: "#FFD700",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: fizzyParallaxBg, speed: 0.1 },
      { src: fizzyParallaxMid, speed: 0.25 },
      { src: fizzyParallaxTop, speed: 0.4 },
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
    id: "shadows-within",
    title: "INTROSPECTION",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2013",
    thumbnail: project2,
    videoUrl: "https://player.vimeo.com/video/72798344?h=1f250d5e92",
    description: {
      en: "This story has drawn its materials from real life. A little girl was run over by two vehicles in Guangzhou and ignored by numerous passers-by. This animation is to awaken the conscience that has been sunk in sleep.",
      zh: "这个故事取材于现实生活。在广州，一名小女孩先后被两辆车碾压，众多路人却视而不见。这部动画旨在唤醒沉睡的良知。",
      fr: "Cette histoire s’inspire de la vie réelle. Une petite fille a été renversée par deux véhicules à Canton et ignorée par de nombreux passants. Ce dessin animé vise à réveiller la conscience endormie.",
    },
    credits: {
      en: ["Director: QinLong", "Animation: Qin Long，Zhang Yin，Zhang Ran，Hu Guofeng ",  "Music: Ólafur Arnalds"],
      zh: ["导演：秦龙", "动画：秦龙、张引、张然、胡国峰", "音乐：Ólafur Arnalds"],
      fr: ["Réalisateur : QinLong", "Animation : Qin Long，Zhang Yin，Zhang Ran，Hu Guofeng", "Musique : Ólafur Arnalds"],
    },
    exhibitions: {
      en: [
        "2013",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Best Student Film – British Animation Awards, London, UK",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Official Selection – London International Animation Festival, London, UK",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Honorable Mention – Encounters Film Festival, Bristol, UK",
      ],
      zh: [
        "2013",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0最佳学生电影 – 英国动画大奖，英国伦敦",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0入围 – 伦敦国际动画电影节，英国伦敦",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0荣誉提名 – Encounters 电影节，英国布里斯托尔",
      ],
      fr: [
        "2013",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Meilleur film étudiant – British Animation Awards, Londres, Royaume-Uni",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Sélection officielle – London International Animation Festival, Londres, Royaume-Uni",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Mention honorable – Encounters Film Festival, Bristol, Royaume-Uni",
      ],
    },
    glowColor: "#FF3366",
    client: { en: "Passion Pictures", zh: "Passion Pictures", fr: "Passion Pictures" },
    crew: { en: "QinLong, MegaComputeur", zh: "秦龙、MegaComputeur", fr: "QinLong, MegaComputeur" },
    parallaxLayers: [
      { src: shadowsParallaxBg, speed: 0.1 },
      { src: shadowsParallaxMid, speed: 0.25 },
      { src: shadowsParallaxTop, speed: 0.4 },
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
    id: "dreamscape",
    title: "Life's TRACk",
    type: { en: "Short Film", zh: "短片", fr: "Court métrage" },
    year: "2011",
    thumbnail: project1,
    videoUrl: "https://player.vimeo.com/video/000000",
    description: {
      en: "An ing is quite what it seems.",
      zh: "一部",
      fr: "Un re rêvle être.",
    },
    credits: {
      en: ["Director: QinLong", "Animation: QinLong", ],
      zh: ["导演：秦龙", "动画：秦龙", ],
      fr: ["Réalisateur : QinLong", "Animation : QinLong", ],
    },
    exhibitions: {
      en: [
        "2012",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Youku Young Director Support Program, Signed Director, Beijing, China",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Finalist, SICAF Animation Festival, Seoul, South Korea",
        "2011",
        
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Finalist Award, Fukuoka Asian Digital Art Exhibition, Fukuoka, Japan",
      ],
      zh: [
        "2011",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0获奖 – 英国皇家电视学会学生奖，英国伦敦",
        "2012",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0入围 – Anima Mundi 动画节，巴西里约热内卢",
      ],
      fr: [
        "2011",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Lauréat – Royal Television Society Student Awards, Londres, Royaume-Uni",
        "2012",
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0⦿\u00A0\u00A0Sélection officielle – Festival Anima Mundi, Rio de Janeiro, Brésil",
      ],
    },
    glowColor: "#00D9FF",
    client: { en: "Personal Project", zh: "个人项目", fr: "Projet personnel" },
    crew: { en: "QinLong", zh: "秦龙", fr: "QinLong" },
    parallaxLayers: [
      { src: dreamscapeParallaxBg, speed: 0.1 },
      { src: dreamscapeParallaxMid, speed: 0.25 },
      { src: dreamscapeParallaxTop, speed: 0.4 },
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
];
