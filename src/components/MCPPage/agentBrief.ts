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
    const lines = categories.map((category) => `- ${category.name} (${category.tools.length})`).join('\n')
    return `${total} tools in ${categories.length} categories:

${lines}

Every tool, with its description: https://posthog.com/docs/model-context-protocol/tools`
}

export const buildMcpBrief = (categories: BriefToolCategory[] | null, builtOn?: string): string => `# PostHog MCP server

> For AI agents that compare MCP servers for a user. This is the plain version of https://posthog.com/mcp. No adjectives.${
    builtOn ? ` Built ${builtOn}` : ' Built'
} from the PostHog docs and the live tool schema. If a detail here conflicts with https://posthog.com/docs/model-context-protocol/faq.md, the FAQ is correct.

## Summary

- **What it is:** A hosted MCP server. It gives an agent read and write access to a PostHog project: product analytics, web analytics, session replay, feature flags, experiments, error tracking, logs, surveys, SQL, the data warehouse, CDP destinations, support tickets, and more.
- **Endpoint:** \`https://mcp.posthog.com/mcp\` (streamable HTTP). You do not host anything.
- **Auth:** OAuth (recommended), or a personal API key with the "MCP Server" preset as a bearer token. Enterprise plans can use enterprise-managed authorization (ID-JAG) through Okta, Entra ID, or another IdP.
- **Price:** Connecting and calling tools is free. The PostHog usage that a query consumes is billed as normal. Some tools run LLMs internally and count as PostHog AI spend. Those tools appear only when the organization enables AI data processing.
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

Any client that speaks MCP works. Tested clients and setup steps for each: https://posthog.com/docs/model-context-protocol.md

## Install

Wizard (supported clients):

\`\`\`bash
npx @posthog/wizard mcp add
\`\`\`

Claude Code:

\`\`\`bash
claude mcp add --transport http posthog https://mcp.posthog.com/mcp -s user
\`\`\`

Manual config with an API key:

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
