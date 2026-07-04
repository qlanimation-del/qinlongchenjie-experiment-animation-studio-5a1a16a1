// Plain-text snapshot of studio content for the MCP server.
// Kept free of asset imports so it's safe to bundle into a Deno edge function.

export interface McpProject {
  id: string;
  title: string;
  type: string;
  year: string;
  description: string;
  url: string;
}

const site = "https://qinlong-chenjie.lovable.app";

export const mcpProjects: McpProject[] = [
  {
    id: "beyond-orbit",
    title: "DUST",
    type: "Independent Animation",
    year: "2026-Present",
    description: "An in-progress independent animation project by the studio.",
    url: `${site}/work/beyond-orbit`,
  },
  {
    id: "between-us",
    title: "Between Us and the World",
    type: "Video essay",
    year: "2025",
    description:
      "Inspired by the correspondence between Zhong Shuhe and Zhou Zuoren, this film uses the metaphor of 'a torch in the darkness' to pay tribute to the ordinary people who have quietly illuminated the course of civilization throughout history.",
    url: `${site}/work/between-us`,
  },
  {
    id: "tiny-worlds",
    title: "IN-BETWEEN",
    type: "Short Film",
    year: "2023-2024",
    description:
      "A short film honoring the 'carriers' — those who run in the darkness, passing on the light as a vital middle link. Multiple international festival awards including Golden Dolphin Gold Award and Barcelona International Sports Film Festival Silver Award.",
    url: `${site}/work/tiny-worlds`,
  },
  {
    id: "gafa-logo",
    title: "GAFA Animation Major",
    type: "Commercial",
    year: "2023",
    description:
      "A dynamic logo animation created for the GAFA (Guangzhou Academy of Fine Arts) Animation Major.",
    url: `${site}/work/gafa-logo`,
  },
  {
    id: "entering-cloud",
    title: "Entering the Cloud",
    type: "Commercial",
    year: "2022",
    description:
      "An experimental animated short exploring the liminal space between physical and digital worlds, combining Chinese heritage with data-stream imagery for naked-eye 3D display.",
    url: `${site}/work/entering-cloud`,
  },
  {
    id: "resonance",
    title: "Naturally Yours",
    type: "Commercial",
    year: "2018",
    description:
      "An abstract motion graphics journey through sound and color.",
    url: `${site}/work/resonance`,
  },
  {
    id: "fizzy-pop",
    title: "YEAR OF FATE",
    type: "Short Film",
    year: "2014",
    description:
      "A short film dedicated to the loved ones and elders who have passed away in our lives.",
    url: `${site}/work/fizzy-pop`,
  },
  {
    id: "shadows-within",
    title: "INTROSPECTION",
    type: "Short Film",
    year: "2013",
    description:
      "Drawn from a real-life incident in Guangzhou. An animation intended to awaken the conscience that has been sunk in sleep.",
    url: `${site}/work/shadows-within`,
  },
  {
    id: "dreamscape",
    title: "Life's TRACk",
    type: "Short Film",
    year: "2011",
    description:
      "A 2D hand-drawn animated short film depicting a day in the life of modern young people and their confusion at life's crossroads.",
    url: `${site}/work/dreamscape`,
  },
];

export const studioInfo = {
  name: "QinLong & ChenJie",
  tagline: "Experimental Animation Studio",
  location: "Guangzhou, China",
  founded: "2019",
  affiliation: "Guangzhou Academy of Fine Arts (GAFA)",
  directors: [
    { name: "Qin Long", role: "Animator / Director" },
    { name: "Chen Jie", role: "Video Essay / Director" },
  ],
  bio: "A two-person independent studio composed of Chinese directors Qin Long and Chen Jie, exploring experimental animation, immersive and interactive video, video essays, and essay films. Based in Guangzhou since 2019, both directors teach at the Guangzhou Academy of Fine Arts.",
  website: site,
  contact: `${site}/contact`,
};
