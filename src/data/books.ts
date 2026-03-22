/**
 * 书籍推荐数据 / Book Data
 *
 * 替换封面图片：将真实图片放入 public/images/ 或 public/photographs/，更新 coverSrc 路径
 */

export interface BookInfo {
  coverSrc: string;
  // 拆分标题为主体+作者，更易渲染和换行
  title: { en: string; zh: string; fr: string };
  author: { en: string; zh: string; fr: string };
  description: { en: string; zh: string; fr: string };
  purchaseUrl: string;
}

export const drawingBook: BookInfo = {
  coverSrc: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
  title: {
    en: "Lines of Thought",
    zh: "思维之线",
    fr: "Lignes de Pensée",
  },
  author: { // 补充作者字段（保持结构统一）
    en: "",
    zh: "",
    fr: "",
  },
  description: {
    en: "A collection exploring the intersection of drawing, emotion, and spatial narrative.",
    zh: "一本探索绘画、情感与空间叙事交汇点的作品集。",
    fr: "Un recueil explorant l'intersection du dessin, de l'émotion et du récit spatial.",
  },
  purchaseUrl: "https://example.com/book-drawing",
};

export const photographyBook: BookInfo = {
  // 修复：去掉 /public，public 是静态资源根目录，路径从 /images 开始
  coverSrc: "/images/book01.webp",
  title: {
    // 标题只保留核心内容，作者单独拆分
    en: "Research on the Formation and Viewing Behavior of Crowdsourced Images",
    zh: "众包影像的形成与观看行为研究",
    fr: "Recherche sur la Formation et le Comportement de Visualisation des Images Collectives",
  },
  author: { // 新增作者字段，统一管理
    en: "Chen Jie",
    zh: "陈洁",
    fr: "Chen Jie",
  },
  description: {
    en: "Crowdsourcing refers to a work method in which a large task is divided into smaller subtasks and outsourced to a large number of volunteers in a free and voluntary manner. When this method is combined with image production, a new form of image creation—crowdsourced image—emerges, representing a relatively cutting-edge approach to image-making..",
    zh: "“众包”指的是将一个较大型的任务分割为多个小任务，并以自由自愿的方式外包给大量志愿者完成的工作方式，当这种工作方式和影像制作相结合时，一种新型的影像制作方式“众包影像”就出现了，属于一种较为前沿的影像创作方式。",
    fr: "Le crowdsourcing fait référence à une méthode de travail dans laquelle une grande tâche est divisée en sous-tâches plus petites et externalisée à un grand nombre de volontaires de manière libre et volontaire. Lorsqu'elle est combinée avec la production d'images, une nouvelle forme de création d'images - l'image crowdsourcée - émerge, représentant une approche relativement avant-gardiste de la création d'images.",
  },
  purchaseUrl: "https://detail.tmall.com/item.htm?app=chrome&bxsign=scdbrlruKk2jCdiLvVe-Uhz3SBBzMEC5xxnXEhQC_9VLI780hvIjfqP9uwcb7FgjUHqs84efYfWcnFcg7IK4hRh32zMDdzeu0DXiqpdd1v7cbUUts3Ujq4urX-VurmOOeMQ&cpp=1&id=1007710468662&price=73.5&shareUniqueId=35451918062&share_crt_v=1&shareurl=true&short_name=h.i6V9A7TM4r1Cfhh&sourceType=item&sp_tk=VDVVWDVhVzBIRmk%3D&spm=a2159r.13376460.0.0&suid=D4EDBF67-4CE3-4BB0-B985-DD9491DFE4B8&tbSocialPopKey=shareItem&tk=T5UX5aW0HFi%20CA381&un=713dc4701e321a28d327b29a79c3809c&un_site=0&ut_sk=1.aXiu5t0wxpUDANsWUG2eCRxx_21380790_1774180093782.Copy.1&wxsign=tbw6DwOKRWM4gY0cQLV-9BsY6n2XVQuU0ytfgKK3uI3xhRblwSw9KuJjnAI7L03RXOSL5TBu7bxy8endC4Yy8AR15Pj3lPltEG5MAg-0KPc-M9HODf4eHBTGTUVdrCIBYeUajWGVV8tGPU_QJuVTt4h_g&skuId=6168067007205",
};