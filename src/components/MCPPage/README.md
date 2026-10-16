# MCPPage

The page at `/mcp`. It has two readers: a person, and the agent that person asked to compare MCP servers.

## Files

- `index.tsx`: the page. The "Reading as" toggle at the top swaps the page for the agent brief.
- `agentBrief.ts`: the agent brief. `buildMcpBrief()` returns plain markdown.
- `agentBrief.test.ts`: checks the brief against the docs. Run `node --test src/components/MCPPage/agentBrief.test.ts`.
- `WaitingRoom.tsx`: the closing section. Magazine covers for agents that wait to be tool-called.

## The agent brief

One source, two ways in:

1. The build writes it to `/mcp.md` (`generateMcpMd` in `gatsby/rawMarkdownUtils.ts`), with the build date and the live tool list from `src/data/mcp-tools.json`.
2. The "Agent" option of the toggle renders the same text on the page.

### Keep it from going stale

- Do not hard-code data that the build has. The tool count and categories come from the tool schema.
- Link to details that change often. Rate limit numbers, which client gets which tool mode, and the tested client list belong to the [MCP FAQ](/docs/model-context-protocol/faq).
- Put every param, header, URL, and command in backticks or a `bash` block. The test fails when one of them is no longer in `contents/docs` or the install schema, and when a linked docs page no longer exists.
- Keep it factual. An agent will quote it to its user. No demo output and no claims that the docs do not make.

## The waiting room

Eight covers on an accent "table". Each cover has its own tilt and a two-layer shadow. On hover, a cover lifts, straightens, and its shadow grows. The motion runs only when the visitor allows motion (`motion-safe:`). A click opens the cover in a `Modal`. The arrow buttons and the arrow keys move between covers.

The "Now serving" ticket cycles through real tool names from the tool schema. If the schema is missing from the build, the ticket does not render.

To add a cover, add an entry to `magazines` and a tilt to `tilts`.
