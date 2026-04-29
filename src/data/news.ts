import type { Locale } from "@/i18n/translations";

export interface NewsItem {
  date: string; // YYYY.MM
  kind: Record<Locale, string>;
  title: Record<Locale, string>;
  venue: Record<Locale, string>;
}

// Empty placeholder — ready to be populated when the studio confirms upcoming events.
export const newsItems: NewsItem[] = [];
