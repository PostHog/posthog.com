# WebMCP

Registers [WebMCP](https://webmachinelearning.github.io/webmcp/) tools on every page so a browser agent can
search, read, and navigate posthog.com through typed function calls instead of reading the DOM. The component
renders nothing. It is mounted once, in `components/Wrapper`, next to the other global overlays.

```tsx
import WebMCP from 'components/WebMCP'

<WebMCP />
```

WebMCP is a W3C community group draft. A page calls `document.modelContext.registerTool()` with a name, a
description, a JSON schema for the input, and an `execute` callback. A browser agent that supports the
standard lists the tools and calls them. Gemini in Chrome is the first announced consumer.

## Tools

| Tool | Input | What it does |
| --- | --- | --- |
| `search_docs` | `query`, optional `type` | Searches the Algolia index that powers site search. Returns up to 8 hits as JSON. |
| `read_page` | optional `path` | Fetches the `.md` twin of a page under `MARKDOWN_CONTENT_PATHS`. No path means the current page. |
| `get_site_overview` | none | Returns `/platform.md`, the machine-readable platform overview built in `onPostBuild`. |
| `read_skill` | optional `name` or `product` | Lists agent skills by product, or fetches one `SKILL.md` from the monorepo. Every listing and skill ends with the source URL and the two install paths from the docs. |
| `navigate_page` | `path` | Calls Gatsby `navigate`. Refuses paths that are not on this origin. |
| `ask_max` | `question` | Opens the PostHog AI chat overlay with the question. The answer stays in the chat panel. |
| `get_mcp_connection_info` | none | Returns the PostHog MCP server URL, the auth method, and the wizard setup command. |
| `get_install_instructions` | none | Returns the wizard command to run locally, and what the wizard does. |

Every tool is read-only, or only changes what the page shows. No tool creates an account or changes PostHog
data. Tools that only read data carry `readOnlyHint: true` so an agent can call them without confirmation.

Each `execute` returns `{ content: [{ type: 'text', text }] }`, the MCP result shape, with `isError: true` on a
handled failure. A thrown error also becomes an error result, so the agent gets a message instead of a rejected
call.

## Availability

The tools exist for a visitor as soon as the browser exposes `document.modelContext`. There is no feature flag.

Chrome ships WebMCP as an origin trial in versions 149 to 156, and plans to enable it by default in 157. During
the trial, the site must serve a per-origin token or the API is undefined and nothing registers. `src/html.tsx`
renders `<meta http-equiv="origin-trial">` when `GATSBY_WEBMCP_ORIGIN_TRIAL_TOKEN` is set. Register the origin at
[developer.chrome.com/origintrials](https://developer.chrome.com/origintrials) and set the token in Vercel. The
token is public by design, so the `GATSBY_` prefix is fine. Before Chrome 157, unsetting the token is the only
switch. After Chrome 157, removing the tools means removing the component.

## Testing locally

1. In Chrome 149 or later, open `chrome://flags/#enable-webmcp-testing`, set it to Enabled, and relaunch.
2. Start the dev server and open any page.
3. In DevTools, run `const tools = await document.modelContext.getTools()` to list the registered tools, and
   `await document.modelContext.executeTool(tools.find((t) => t.name === 'search_docs'), JSON.stringify({ query: 'feature flags' }))`
   to call one. Chrome 153 expects the arguments as a JSON string and returns the result as a string.

`read_page` and `get_site_overview` return an error result in development, because the `.md` files and
`/platform.md` are written in `onPostBuild` and do not exist under `gatsby develop`. Test those two against a
preview deploy or production.

## Telemetry

| Event | When | Properties |
| --- | --- | --- |
| `webmcp tools registered` | Once per page load, after all tools register | `tools`: list of tool names |
| `$mcp_tool_call` | Every call | Agent intent, tool name, description, declared input key names, error state, duration, server hostname, and WebMCP transport metadata |

`$mcp_tool_call` uses the [MCP analytics](/docs/mcp-analytics) event contract, so the calls show in MCP analytics
next to the calls to the hosted MCP server. `$mcp_source` must be `posthog_mcp_analytics`, or MCP analytics does not
read the event. `$mcp_transport` separates these calls from the calls to the server. Older calls use the event
`webmcp tool called`, with the properties `tool`, `success`, and `duration_ms`.

The telemetry wrapper adds a required `context` string to each tool schema. The calling agent uses it to describe
the user's goal. The wrapper captures it as `$mcp_intent` with `$mcp_intent_source: context_parameter`. It removes
the field before the tool runs.

`$mcp_resource_name` and `$mcp_tool_name` both contain the tool name, as required by the SDK contract.
`$mcp_tool_description` contains the registered description. `$mcp_input_keys` contains only names that appear in
the registered input schema. It never contains input values. A thrown error adds `$mcp_error_type`, but not its
message. PostHog JS adds the current `$session_id`, so the call links to the browser session and its replay.

The agent-provided `context` is the only captured input value. Other inputs, results, and error messages are not
captured. The WebMCP callback does not expose the calling agent, model, protocol version, or conversation ID.
`$mcp_client_name: webmcp` identifies the integration surface, not the agent.

## Notes

- Tools register once and read live page state through a ref, so `ask_max` always opens the chat for the
  current page and `read_skill` sees the skills from the static query.
- Aborting the registration signal unregisters the tools, per spec. The component does this on unmount.
- The pages under `/pocket-guides` are also readable through `read_page`. The self-driving guides render a
  scout's `SKILL.md` in the page, so an agent can read a scout definition either way.
