import { defineTool } from "@lovable.dev/mcp-js";
import { studioInfo } from "../data";

export default defineTool({
  name: "get_studio_info",
  title: "Get studio info",
  description:
    "Get information about the QinLong & ChenJie experimental animation studio — directors, location, focus, and contact URLs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(studioInfo, null, 2) }],
    structuredContent: { studio: studioInfo },
  }),
});
