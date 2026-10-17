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
| `$mcp_tool_call` | Every call, captured by posthog-js | See below |

posthog-js captures `$mcp_tool_call` because the init config in `gatsby/onPreBootstrap.ts`
sets `capture_webmcp: true`. The event uses the [MCP analytics](/docs/mcp-analytics) contract, with
`$mcp_interface: webmcp`. It links to the current person, session, and replay. This component does not capture
tool calls itself.

The SDK adds two required string fields to each tool schema that the agent sees: `context`, the reason for the call,
and `llm_model`, the model that the agent reports. It captures them as `$mcp_intent` and `$mcp_llm_model`, and
removes them before the tool runs. Do not give a tool its own `context` or `llm_model` input. The SDK does not add a
field that the schema already declares.

posthog-js only captures calls to tools registered after it initializes. It loads async, and the component does not
wait for it. If the component mounts first, the calls on that page load are not captured.

Older calls use the custom properties `$mcp_transport`, `$mcp_client_name`, and `$mcp_input_keys`, or the event
`webmcp tool called`.

## Notes

- Tools register once and read live page state through a ref, so `ask_max` always opens the chat for the
  current page and `read_skill` sees the skills from the static query.
- Aborting the registration signal unregisters the tools, per spec. The component does this on unmount.
- The pages under `/pocket-guides` are also readable through `read_page`. The self-driving guides render a
  scout's `SKILL.md` in the page, so an agent can read a scout definition either way.
