import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mcpProjects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List all works by QinLong & ChenJie studio (animations, video essays, short films, commercials). Optionally filter by year or type.",
  inputSchema: {
    year: z.string().optional().describe("Filter by year, e.g. '2023' or '2023-2024'."),
    type: z
      .string()
      .optional()
      .describe("Filter by type, e.g. 'Short Film', 'Video essay', 'Commercial', 'Independent Animation'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ year, type }) => {
    const items = mcpProjects.filter(
      (p) =>
        (!year || p.year.toLowerCase().includes(year.toLowerCase())) &&
        (!type || p.type.toLowerCase().includes(type.toLowerCase())),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items, count: items.length },
    };
  },
});
