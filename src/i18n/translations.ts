export type Locale = "en" | "zh" | "fr";

export const translations = {
  // Navbar
  nav: {
    work: { en: "WORKS", zh: "作品", fr: "ŒUVRES" },
    drawing: { en: "DRAWING", zh: "绘画", fr: "DESSIN" },
    photographs: { en: "PHOTOGRAPHS", zh: "摄影", fr: "PHOTOGRAPHIES" },
    team: { en: "ARTISTS", zh: "艺术家", fr: "ARTISTES" },
    texts: { en: "TEXTS", zh: "文论", fr: "TEXTES" },
    news: { en: "NEWS", zh: "动态", fr: "ACTUALITÉS" },
    contact: { en: "CONTACT", zh: "联系", fr: "CONTACT" },
    studioSubtitle: { en: "experiment animation studio", zh: "实验动画工作室", fr: "studio d'animation expérimentale" },
  },

  // Hero
  hero: {
    nowPlaying: { en: "Selected Works", zh: "精选作品", fr: "Œuvres choisies" },
    ourWork: { en: "2019 – 2025", zh: "2019 – 2025", fr: "2019 – 2025" },
  },

  // Upcoming banner (homepage)
  upcoming: {
    label: { en: "Upcoming", zh: "近期", fr: "À venir" },
    empty: { en: "Programme to be announced soon.", zh: "近期项目即将公布。", fr: "Programme bientôt annoncé." },
  },

  // Works page (list view)
  works: {
    viewGrid: { en: "Grid", zh: "网格", fr: "Grille" },
    viewIndex: { en: "Index", zh: "目录", fr: "Index" },
    filterAll: { en: "All", zh: "全部", fr: "Tout" },
  },

  // Work caption block (museum-style)
  caption: {
    medium: { en: "Medium", zh: "媒介", fr: "Médium" },
    duration: { en: "Duration", zh: "时长", fr: "Durée" },
    edition: { en: "Edition", zh: "版次", fr: "Édition" },
    commissionedBy: { en: "Commissioned by", zh: "委约方", fr: "Commande de" },
    courtesy: { en: "Courtesy", zh: "鸣谢", fr: "Courtoisie" },
    screenings: { en: "Screenings", zh: "放映", fr: "Projections" },
    press: { en: "Press", zh: "评论与报道", fr: "Presse" },
  },

  // Texts page
  texts: {
    title: { en: "Texts", zh: "文论", fr: "Textes" },
    subtitle: { en: "Essays, interviews, and writings.", zh: "评论、访谈与自撰文章。", fr: "Essais, entretiens et écrits." },
    empty: { en: "Texts will be published here soon.", zh: "文章即将于此发布。", fr: "Les textes seront publiés ici prochainement." },
  },

  // News page
  news: {
    title: { en: "News", zh: "动态", fr: "Actualités" },
    subtitle: { en: "Upcoming and past screenings, exhibitions, and events.", zh: "近期与过往放映、展览与活动。", fr: "Projections, expositions et événements à venir et passés." },
    empty: { en: "Announcements coming soon.", zh: "动态即将更新。", fr: "Annonces à venir." },
    upcoming: { en: "Upcoming", zh: "近期", fr: "À venir" },
    past: { en: "Past", zh: "过往", fr: "Passé" },
  },

  // Index - Who We Are
  whoWeAre: {
    sectionLabel: { en: "About", zh: "关于", fr: "À propos" },
    title: { en: "Who We Are", zh: "关于我们", fr: "Qui Sommes-Nous" },
    description: {
      en: "We are a studio composed of two Chinese directors, passionate about creating experimental animation and visual works. Since 2019, we have been working in Guangzhou, where we serve as teachers at the Guangzhou Academy of Fine Arts.",
      zh: "我们是由两位中国导演组成的工作室，热衷于创作实验动画和视觉作品。自2019年以来，我们一直在广州工作，同时在广州美术学院担任教师。",
      fr: "Nous sommes un studio composé de deux réalisateurs chinois, passionnés par la création d'animation expérimentale et d'œuvres visuelles. Depuis 2019, nous travaillons à Guangzhou, où nous sommes enseignants à l'Académie des Beaux-Arts de Guangzhou.",
    },
  },

  // Index - What We Do
  whatWeDo: {
    sectionLabel: { en: "WORK", zh: "作品", fr: "TRAVAUX" },
    title: { en: "What We Do", zh: "我们做什么", fr: "Ce Que Nous Faisons" },
    description: {
      en: "Rooted in our two‑person independent studio, we explore diverse moving image forms, including experimental animation, immersive and interactive video, video essays, and essay films. We blend handcrafted texture with digital technology, placing story and emotion at the heart of our creation, and guide students to explore further possibilities together.",
      zh: "依托双人独立工作室，我们探索多元影像形式，涵盖实验动画、沉浸式影像与互动体验、视频论文、散文影像等。我们坚持手工质感与数字技术相融合，始终以故事与情感为创作核心，并带领学生一同探索更多可能。",
      fr: "Fort de notre studio indépendant à deux personnes, nous explorons des formes variées d’images animées : animation expérimentale, vidéo immersive et interactive, essais vidéo, films d’essai, etc. Nous associons la qualité artisanale à la technologie numérique, plaçant toujours le récit et l’émotion au cœur de notre création, et accompagnons nos étudiants à explorer de nouvelles possibilités.",
    },
    viewWork: { en: "View Our Work", zh: "查看作品", fr: "Voir Nos Travaux" },
  },

  // Work page
  work: {
    title: { en: "Our Work", zh: "我们的作品", fr: "Nos Travaux" },
  },

  // Team page
  team: {
    title: { en: "The Team", zh: "团队", fr: "L'Équipe" },
    director: { en: "Director", zh: "导演", fr: "Réalisateur" },
    ourStory: { en: "Our Story", zh: "我们的故事", fr: "Notre Histoire" },
    storyP1: {
      en: "The experimental and visual artworks by Qin Long and Chen Jie are not confined to animation, experimental video, or photography. Rooted in their shared passion, they continuously push the boundaries of visual storytelling.\n",
      zh: "秦龙和陈洁的实验和视觉艺术作品不仅局限于动画、实验影像或摄影。源于他们共同的热情，他们不断突破视觉叙事的边界。",
      fr: "Les œuvres artistiques expérimentales et visuelles de Qin Long et Chen Jie ne se limitent pas à l'animation, à la vidéo expérimentale ou à la photographie. Enracinés dans leur passion commune, ils repoussent continuellement les limites de la narration visuelle.",
    },
    storyP2: {
      en: "They explore experimental techniques, integrating traditional craftsmanship with cutting-edge technology to create works that challenge and inspire.",
      zh: "他们探索实验性技术，将传统工艺与前沿科技相融合，创造出具有挑战性且启发灵感的作品。",
      fr: "Ils explorent des techniques expérimentales, intégrant l'artisanat traditionnel aux technologies de pointe pour créer des œuvres qui interpellent et inspirent.",
    },
  },

  // Contact page
  contact: {
    title: { en: "Get In Touch", zh: "联系我们", fr: "Contactez-Nous" },
    subtitle: { en: "Any enquiry project, contact us directly!", zh: "如有项目咨询，请直接联系我们！", fr: "Pour toute demande de projet, contactez-nous directement !" },
    name: { en: "Name", zh: "姓名", fr: "Nom" },
    namePlaceholder: { en: "Your name", zh: "您的姓名", fr: "Votre nom" },
    email: { en: "Email", zh: "邮箱", fr: "Email" },
    emailPlaceholder: { en: "your@email.com", zh: "your@email.com", fr: "votre@email.com" },
    message: { en: "Message", zh: "留言", fr: "Message" },
    messagePlaceholder: { en: "Tell us about your project...", zh: "告诉我们您的项目...", fr: "Parlez-nous de votre projet..." },
    send: { en: "Send Message", zh: "发送消息", fr: "Envoyer" },
    sent: { en: "Message sent! We'll get back to you soon.", zh: "消息已发送！我们会尽快回复您。", fr: "Message envoyé ! Nous vous répondrons bientôt." },
    office: { en: "Office", zh: "办公室", fr: "Bureau" },
    officeAddress: { en: "Guangzhou Academy of Fine Arts\nGuangzhou, China", zh: "广州美术学院\n中国广州", fr: "Académie des Beaux-Arts de Guangzhou\nGuangzhou, Chine" },
    contactLabel: { en: "CONTACT", zh: "联系方式", fr: "CONTACT" },
  },

  // Project Detail
  projectDetail: {
    notFound: { en: "Project not found", zh: "未找到项目", fr: "Projet non trouvé" },
    backToWork: { en: "Back to Work", zh: "返回作品", fr: "Retour aux travaux" },
    year: { en: "Year", zh: "年份", fr: "Année" },
    crew: { en: "Crew", zh: "团队", fr: "Équipe" },
    client: { en: "Client", zh: "客户", fr: "Client" },
    credits: { en: "Credits", zh: "制作团队", fr: "Crédits" },
    exhibitions: { en: "Exhibitions & Awards", zh: "参展与获奖", fr: "Expositions et Prix" },
    gallery: { en: "Project Gallery", zh: "项目图集", fr: "Galerie du Projet" },
  },

  // Footer
  footer: {
    rights: { en: "All rights reserved.", zh: "版权所有。", fr: "Tous droits réservés." },
  },
} as const;
