import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mcpProjects } from "../data";

export default defineTool({
  name: "get_project",
  title: "Get project",
  description:
    "Get full details for a single project by its id. Use list_projects first to discover valid ids.",
  inputSchema: {
    id: z.string().min(1).describe("The project id, e.g. 'between-us' or 'entering-cloud'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const project = mcpProjects.find((p) => p.id === id);
    if (!project) {
      return {
        content: [{ type: "text", text: `No project found with id '${id}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      structuredContent: { project },
    };
  },
});
