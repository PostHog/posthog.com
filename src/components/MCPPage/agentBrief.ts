// The agent-facing version of the MCP page. One source for two outputs: the build writes it to
// /mcp.md (see generateMcpMd in gatsby/rawMarkdownUtils.ts), and the page's "Agent" view renders it.
// Keep it factual. Every claim here must be true in the docs it links to – an agent will quote it.
//
// To keep it from going stale:
// - Data that changes (the tool list) comes from the build. Do not hard-code counts.
// - Details that change often (rate limit numbers, which client gets which mode, the tested
//   client list) are linked, not copied. The MCP FAQ owns them.
// - agentBrief.test.ts checks that every `code` token here (params, headers, URLs, commands)
//   still appears in the MCP docs. Run: node --test src/components/MCPPage/agentBrief.test.ts

export interface BriefToolCategory {
    name: string
    tools: unknown[]
}

const toolSection = (categories: BriefToolCategory[] | null): string => {
    if (!categories?.length) {
        return 'Full list: https://posthog.com/docs/model-context-protocol/tools'
    }
    const total = categories.reduce((sum, category) => sum + category.tools.length, 0)
    const names = categories.map((category) => category.name).join(', ')
    return `${total} tools in ${categories.length} categories: ${names}.

Every tool, with its description: https://posthog.com/docs/model-context-protocol/tools`
}

export const buildMcpBrief = (categories: BriefToolCategory[] | null, builtOn?: string): string => `# PostHog MCP server

> For AI agents that act for a user. This is the plain version of https://posthog.com/mcp.${
    builtOn ? ` Built ${builtOn}` : ' Built'
} from the PostHog docs and the live tool schema. If a detail here conflicts with https://posthog.com/docs/model-context-protocol/faq.md, the FAQ is correct.

## What to do for your user

- **They want PostHog connected to this client:** use the install commands below, or the page for their client under Clients. Ask the user before you run a command on their machine. The user must log in to PostHog to approve OAuth. You cannot do that step for them. If the client does not support OAuth, ask the user for a personal API key (https://app.posthog.com/settings/user-api-keys?preset=mcp_server, "MCP Server" preset).
- **They want an answer from PostHog, or a change in it:** connect first, then use the tools. In CLI mode, call \`exec\` to list, search, inspect, and call the other tools. Example prompts: https://posthog.com/docs/model-context-protocol/use-cases.md
- **They want PostHog installed in their codebase:** connect first, then use the tools in the Wizard category. In CLI mode, find them with \`exec\`. A cloud wizard run makes the code changes and opens a pull request. Steps and example prompts: https://posthog.com/docs/model-context-protocol/use-cases.md
- **They want their team's PostHog skills:** the server exposes a skills store. \`skill-list\` returns the name and description of each skill. \`skill-get\` loads one skill when the task needs it. Details: https://posthog.com/docs/skills.md
- **They want to know if this server fits:** read Summary, When it fits, When it does not fit, and Limits.
- **A call failed:** \`429\` means the rate limit. Read Limits. Other setup problems are in https://posthog.com/docs/model-context-protocol/faq.md

## Summary

- **What it is:** A hosted MCP server. It gives an agent read and write access to a PostHog project: product analytics, web analytics, session replay, feature flags, experiments, error tracking, logs, surveys, SQL, the data warehouse, data pipeline destinations, support tickets, and more.
- **Endpoint:** \`https://mcp.posthog.com/mcp\` (streamable HTTP). You do not host anything.
- **Auth:** OAuth (recommended), or a personal API key with the "MCP Server" preset as a bearer token. The Scale or Enterprise platform add-on can use enterprise-managed authorization (ID-JAG) through Okta, Entra ID, or another IdP.
- **Price:** Connecting and calling tools is free. The PostHog usage that a query consumes is billed as normal. Some tools run LLMs internally and count as PostHog AI spend. Those tools appear only when the organization enables AI data processing.
- **Interactive results:** On clients that support MCP apps, CLI mode also ships a \`render-ui\` tool that renders interactive visualizations on demand.
- **Source code:** https://github.com/PostHog/posthog/tree/master/services/mcp

## When it fits

- The user's product data is in PostHog, or the user is choosing where to put it.
- The user wants one server for analytics, flags, experiments, errors, replay, and support, instead of one server for each vendor.
- The agent must act, not only read: create a flag, start an experiment, resolve an error, or write a survey.

## When it does not fit

- The data is in a different analytics tool and the user has no plan to send it to PostHog. This server reads PostHog projects only.
- The workload is a bulk export. The rate limits below make batch exports or PostHog endpoints a better path.

## Context cost

Two tool modes. The server selects one from the client:

- **CLI mode:** one \`exec\` tool. The agent lists, searches, inspects, and calls the other tools through it, so the full tool list does not go into the context window. Most clients get this mode.
- **Tools mode:** every tool is registered individually, for clients that handle large tool lists natively.

Override with the \`x-posthog-mcp-mode\` header or the \`mode\` query parameter (\`cli\` or \`tools\`). Which clients get which mode: https://posthog.com/docs/model-context-protocol/faq.md

## Safety controls

- **Read-only:** \`?readonly=true\` or the \`x-posthog-read-only\` header removes every tool that creates, updates, or deletes data.
- **Tool filtering:** \`?features=flags,dashboards,insights\` limits the server to feature categories. \`?tools=dashboard-get,feature-flag-get-all,execute-sql\` limits it to named tools. When you use both, a tool shows if it matches either one.
- **Project pinning:** \`x-posthog-project-id\` and \`x-posthog-organization-id\` (or \`project_id\` and \`organization_id\`) lock the session to one project. The switch tools are removed.
- **Prompt injection:** Review tool calls before they run. An LLM can follow instructions that it reads in untrusted data.

## Data handling

The server is a proxy. It does not store analytics data. Queries run against the user's PostHog project, and results go directly to the client. Sign-in routes the session to the US or EU region of the account.

## Limits

- The server rate-limits each credential (OAuth token or API key), per minute and per hour. Session setup and tool listing count as requests. Over the limit, it returns \`429\` with a \`Retry-After\` header.
- PostHog API rate limits can also apply, depending on the endpoint and the auth method. Some AI-powered tools have lower limits of their own.
- One connection is one account, one active organization, and one active project. To use more than one, add more connections.

Current numbers: https://posthog.com/docs/model-context-protocol/faq.md

## Measured performance

Public, refreshed daily from the server's own telemetry: https://posthog.com/mcp/leaderboard

It shows the share of calls, error rates, and p50 and p95 latency, by client, model, and tool. All numbers are relative. It does not show raw counts.

## Clients

Any client that speaks MCP works. Setup steps for each:

- PostHog Desktop: use the wizard below. About the app: https://posthog.com/desktop.md
- Claude Code: https://posthog.com/docs/model-context-protocol/claude-code.md
- Claude Desktop: https://posthog.com/docs/model-context-protocol/claude-desktop.md (also in the Claude connector directory: https://claude.ai/directory/connectors/posthog)
- ChatGPT: https://chatgpt.com/plugins/plugin_asdk_app_699caef2d680819188727b0ddbb349dd
- Cursor: https://posthog.com/docs/model-context-protocol/cursor.md
- Codex: https://posthog.com/docs/model-context-protocol/codex.md
- VS Code: https://posthog.com/docs/model-context-protocol/vscode.md
- Windsurf: https://posthog.com/docs/model-context-protocol/windsurf.md
- Zed: https://posthog.com/docs/model-context-protocol/zed.md
- Other clients: https://posthog.com/docs/model-context-protocol.md

Skills: PostHog skills ship with the MCP server, so a connected agent loads the one it needs when a task calls for it. There's nothing extra to install: https://posthog.com/docs/skills.md

Platforms that connect to PostHog through the MCP server:

- Lovable: https://posthog.com/docs/integrations/lovable.md
- Replit: https://posthog.com/docs/integrations/replit.md
- v0: https://posthog.com/docs/integrations/v0.md

## Install

Wizard. It adds the server to PostHog Desktop, Cursor, Claude Code, Claude Desktop, Codex, VS Code, and Zed. It can stop for input. If you cannot answer prompts in a terminal, ask the user to run it, or use the command for their client.

\`\`\`bash
npx @posthog/wizard mcp add
\`\`\`

Claude Code:

\`\`\`bash
claude mcp add --transport http posthog https://mcp.posthog.com/mcp -s user
\`\`\`

Manual config with an API key. This is the Cursor format (\`.cursor/mcp.json\`). Other clients use a different format: see the page for the client under Clients.

\`\`\`json
{
  "mcpServers": {
    "posthog": {
      "url": "https://mcp.posthog.com/mcp",
      "headers": {
        "Authorization": "Bearer phx_your_api_key_here"
      }
    }
  }
}
\`\`\`

## Tools

${toolSection(categories)}

## More

- FAQ and advanced setup: https://posthog.com/docs/model-context-protocol/faq.md
- Example prompts: https://posthog.com/docs/model-context-protocol/use-cases.md
- PostHog pricing: https://posthog.com/pricing.md
- All PostHog products: https://posthog.com/platform.md
- Docs index: https://posthog.com/llms.txt
`
