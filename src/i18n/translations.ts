export type Locale = "en" | "zh" | "fr";

export const translations = {
  // Navbar
  nav: {
    work: { en: "WORK", zh: "作品", fr: "TRAVAUX" },
    drawing: { en: "DRAWING", zh: "绘画", fr: "DESSIN" },
    photographs: { en: "PHOTOGRAPHS", zh: "摄影", fr: "PHOTOGRAPHIES" },
    team: { en: "TEAM", zh: "团队", fr: "ÉQUIPE" },
    contact: { en: "CONTACT", zh: "联系", fr: "CONTACT" },
    studioSubtitle: { en: "experiment animation studio", zh: "实验动画工作室", fr: "studio d'animation expérimentale" },
  },

  // Hero
  hero: {
    nowPlaying: { en: "Now Playing", zh: "正在播放", fr: "En lecture" },
    ourWork: { en: "Our Work", zh: "我们的作品", fr: "Nos Travaux" },
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
      en: "We direct and produce animation across all formats — short films, commercials, music videos, and title sequences. Our style blends hand-crafted warmth with digital precision, always in service of the story.",
      zh: "我们导演和制作各种形式的动画——短片、广告、音乐录影带和片头序列。我们的风格融合了手工的温暖与数字的精准，始终服务于故事本身。",
      fr: "Nous réalisons et produisons des animations dans tous les formats — courts métrages, publicités, clips musicaux et génériques. Notre style allie la chaleur artisanale à la précision numérique, toujours au service de l'histoire.",
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
