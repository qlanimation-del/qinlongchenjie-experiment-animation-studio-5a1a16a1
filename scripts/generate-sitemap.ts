import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://qinlong-chenjie.lovable.app";

const projectIds = [
  "beyond-orbit",
  "between-us",
  "tiny-worlds",
  "gafa-logo",
  "entering-cloud",
  "resonance",
  "fizzy-pop",
  "shadows-within",
  "dreamscape",
];

interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/drawing", changefreq: "monthly", priority: "0.7" },
  { path: "/photographs", changefreq: "monthly", priority: "0.7" },
  { path: "/texts", changefreq: "monthly", priority: "0.6" },
  { path: "/news", changefreq: "weekly", priority: "0.7" },
  { path: "/artists", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
  ...projectIds.map((id) => ({
    path: `/work/${id}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n")
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
