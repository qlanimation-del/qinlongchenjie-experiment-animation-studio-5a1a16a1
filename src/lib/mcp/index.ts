import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import getStudioInfo from "./tools/get-studio-info";

export default defineMcp({
  name: "qinlong-chenjie-mcp",
  title: "QinLong & ChenJie Studio",
  version: "0.1.0",
  instructions:
    "Read-only tools exposing the QinLong & ChenJie experimental animation studio portfolio. Use `list_projects` to browse works (optionally filtered by year or type), `get_project` for full details of one work, and `get_studio_info` for information about the studio and its directors.",
  tools: [listProjects, getProject, getStudioInfo],
});
