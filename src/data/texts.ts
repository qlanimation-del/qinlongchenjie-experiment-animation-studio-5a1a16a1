import type { Locale } from "@/i18n/translations";

export interface TextItem {
  year: string;
  author: Record<Locale, string>;
  title: Record<Locale, string>;
  publication?: Record<Locale, string>;
  url?: string;
}

// Empty placeholder — ready to be populated with essays / interviews / writings.
export const textItems: TextItem[] = [];
