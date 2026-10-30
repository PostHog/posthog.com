# McpToolsList

Renders PostHog MCP tools for one product feature, grouped into families: a bold family
title with a one-line description, then the tool names as minimal pills (hover shows the
tool's summary).

Data comes from `McpTool` GraphQL nodes sourced at build time in `gatsby/sourceNodes.ts`,
which fetches `tool-definitions.json` (hand-written tools) and `generated-tool-definitions.json`
(tools generated from YAML) from `services/mcp/schema/` in the
[PostHog monorepo](https://github.com/PostHog/posthog) (branch `GATSBY_POSTHOG_BRANCH`,
default `master`) and merges them in `fetchMCPToolDefinitions` (`gatsby/utils/fetchMCPTools.ts`).
Generated entries win over hand-written ones with the same name, like in the MCP server.
The list updates automatically on every site build – nothing is hand-maintained
except the family grouping below.

## Usage

Import directly in MDX (no global shortcode registration):

```mdx
import McpToolsList from 'components/McpToolsList'

<McpToolsList feature="llm_analytics" />
```

## Props

| Prop       | Type       | Description                                                            |
| ---------- | ---------- | ---------------------------------------------------------------------- |
| `feature`  | `string`   | `feature` tag in the MCP schema, e.g. `llm_analytics`                  |
| `families` | `Family[]` | Optional grouping config; defaults to the AI Observability families    |

A `Family` is `{ title, description, match }` where `match` holds tool-name prefixes or
exact names; the first matching family wins. Tools matching no family render in an
"Other" bucket so new tool groups surface instead of silently disappearing – if "Other"
shows up, add a proper family for it in `AIO_FAMILIES`.

If no tools were sourced (e.g. a build without network access), it renders a fallback
link to the schema folder on GitHub instead of an empty section.

## Used by

- `contents/docs/ai-observability/surfaces/mcp.mdx` (`/docs/ai-observability/surfaces/mcp`)
