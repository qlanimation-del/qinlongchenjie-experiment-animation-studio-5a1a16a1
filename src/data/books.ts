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
  coverSrc: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
  title: {
    en: "Apparatus of Images",
    zh: "影像装置",
    fr: "Appareil d'Images",
  },
  description: {
    en: "Reflections on the spectacle society and the emancipation of the spectator through photography.",
    zh: "通过摄影对景观社会与观众解放的思考。",
    fr: "Réflexions sur la société du spectacle et l'émancipation du spectateur à travers la photographie.",
  },
  purchaseUrl: "https://example.com/book-photography",
};
