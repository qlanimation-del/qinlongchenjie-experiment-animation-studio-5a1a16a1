/**
 * 书籍推荐数据 / Book Data
 *
 * 替换封面图片：将真实图片放入 public/images/ 或 public/photographs/，更新 coverSrc 路径
 */

export interface BookInfo {
  coverSrc: string;
  title: { en: string; zh: string; fr: string };
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
  description: {
    en: "A collection exploring the intersection of drawing, emotion, and spatial narrative.",
    zh: "一本探索绘画、情感与空间叙事交汇点的作品集。",
    fr: "Un recueil explorant l'intersection du dessin, de l'émotion et du récit spatial.",
  },
  purchaseUrl: "https://example.com/book-drawing",
};

export const photographyBook: BookInfo = {
  coverSrc: "/public/images/book01.webp",
  title: {
    en: "Research on the Formation and Viewing Behavior of Crowdsourced Images",
    zh: "众包影像的形成与观看行为研究",
    fr: "Recherche sur la Formation et le Comportement de Visualisation des Images Collectives",
  },
  description: {
    en: "Reflections on the spectacle society and the emancipation of the spectator through photography.",
    zh: "通过摄影对景观社会与观众解放的思考。",
    fr: "Réflexions sur la société du spectacle et l'émancipation du spectateur à travers la photographie.",
  },
  purchaseUrl: "https://detail.tmall.com/item.htm?app=chrome&bxsign=scdbrlruKk2jCdiLvVe-Uhz3SBBzMEC5xxnXEhQC_9VLI780hvIjfqP9uwcb7FgjUHqs84efYfWcnFcg7IK4hRh32zMDdzeu0DXiqpdd1v7cbUUts3Ujq4urX-VurmOOeMQ&cpp=1&id=1007710468662&price=73.5&shareUniqueId=35451918062&share_crt_v=1&shareurl=true&short_name=h.i6V9A7TM4r1Cfhh&sourceType=item&sp_tk=VDVVWDVhVzBIRmk%3D&spm=a2159r.13376460.0.0&suid=D4EDBF67-4CE3-4BB0-B985-DD9491DFE4B8&tbSocialPopKey=shareItem&tk=T5UX5aW0HFi%20CA381&un=713dc4701e321a28d327b29a79c3809c&un_site=0&ut_sk=1.aXiu5t0wxpUDANsWUG2eCRxx_21380790_1774180093782.Copy.1&wxsign=tbw6DwOKRWM4gY0cQLV-9BsY6n2XVQuU0ytfgKK3uI3xhRblwSw9KuJjnAI7L03RXOSL5TBu7bxy8endC4Yy8AR15Pj3lPltEG5MAg-0KPc-M9HODf4eHBTGTUVdrCIBYeUajWGVV8tGPU_QJuVTt4h_g&skuId=6168067007205",
};
