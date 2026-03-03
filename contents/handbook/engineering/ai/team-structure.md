---
title: AI platform team structure and collaboration
sidebar: Handbook
showTitle: true
---

This page explains how teams collaborate on AI features at PostHog. For a high-level overview, see the [AI platform overview](/handbook/engineering/ai/ai-platform).

## Who does what

### The PostHog AI team

<SmallTeam slug="posthog-ai" /> is responsible for the architecture, performance, and UX/UI of the AI platform. We build and maintain the core infrastructure – the MCP server, skills system, PostHog AI in the web, background sandboxed agents, and shared tooling (`search`, `read_data`, `read_taxonomy`, `enable_mode`). We're also proactive when we see big opportunities for PostHog or when new capabilities can be used across multiple products, like SQL generation or universal filtering.

### The PostHog Code team

<SmallTeam slug="twig" /> builds PostHog Code, an agent development environment for product engineers. Working with coding agents today is bottlenecked by messy workflows — switching between agents, branches, worktrees, and manually managing PRs across multiple applications. PostHog Code solves this by giving each task its own isolated workspace where an agent works, with everything related to a task in one place instead of scattered across your terminal, editor, and GitHub.

The Twig team owns the desktop app and the task execution pipeline.

### The Signals team

<SmallTeam slug="signals" /> turns PostHog data into tasks that coding agents can work on — suggested improvements from session replays, fixes for errors from error tracking, new experiments based on product analytics data. Signals surfaces something useful, creates a task with context, and the cloud agent works on it.

### Product teams

**Product teams** own their product's AI capabilities end-to-end. The AI platform is designed so that any team can ship MCP tools and skills independently, without needing the PostHog AI team to be involved. This means you can:

- [Add MCP tools](/handbook/engineering/ai/implementing-mcp-tools) that expose your product's API to agents
- [Write skills](/handbook/engineering/ai/writing-skills) that teach agents how to accomplish jobs in your domain
- Build UI for specific personas using MCP Apps when needed

Once you ship a tool or skill, it's automatically available across every surface – PostHog AI in the web, PostHog Code, Claude Code, Cursor, and any other MCP-compatible agent.

## How the teams connect

- **Signals** surfaces useful data from PostHog, creates a task with context, and the cloud agent works on it. You review and iterate in PostHog Code.
- **PostHog AI** owns the background sandboxed agents and can start coding agent tasks during chats. These tasks are inspectable in both the web product and PostHog Code.
- **PostHog Code** is where engineers review, guide, and manage agent work across all their tasks in one place.
- **Product teams** ship their own MCP tools and skills independently. Once shipped, these are automatically available across every surface.

## How to get started

The AI platform is self-service by design. Follow the implementation guides to add tools and skills for your product area:

1. **[Add MCP tools](/handbook/engineering/ai/implementing-mcp-tools).** Scaffold a YAML definition, enable the operations that make sense, and add a HogQL system table for data access.
2. **[Write skills](/handbook/engineering/ai/writing-skills).** If your product has jobs that require domain knowledge – specific tool ordering, constraints, query patterns, or reasoning about what data to check – write a skill that teaches agents how to accomplish that job well.
3. **Test with headless agents.** Validate that agents can accomplish the workflow by talking to Claude Code or another MCP-compatible agent before building any UI.
4. **Tag the PostHog AI team in PRs.** We review PRs that touch the AI platform to ensure they meet our quality bar and integrate well with the rest of the system.

For the full implementation workflow, see [Implementing AI features](/handbook/engineering/ai/implementation).

## When to reach out

You don't need the PostHog AI team to ship tools and skills, but we're always happy to help. Reach out to us in #team-posthog-ai if:

- **You have an unusual use case** that doesn't fit the existing tool or skill patterns
- **You need something from the AI infrastructure** that isn't supported yet
- **You want design help** thinking through how your product should work with agents
- **You're unsure whether AI is the right approach** for a problem – sometimes what seems like an AI problem is better solved another way

Don't hesitate to reach out early, even if it's just a vague idea. We'd rather help you think through the approach upfront than have you discover a dead end after building.

## Best practices

### Start headless, then UI

Build your product's AI capabilities as headless workflows first – expose the API as MCP tools, write skills for the key jobs. This makes the capability available across all surfaces immediately. Only add dedicated UI when a specific persona needs it. See [Implementing AI features](/handbook/engineering/ai/implementation) for more on this approach.

### Start small

Begin with simple tools and iterate based on user feedback. It's better to ship something that works reliably for one workflow than to build something ambitious that works unreliably for ten workflows.

### Describe your API fields

API field descriptions flow through the entire pipeline and become what agents read to understand tool parameters. Vague or missing descriptions lead to worse agent behavior. See [Adding tools to the MCP server](/handbook/engineering/ai/implementing-mcp-tools) for details.

## Contact

For questions about working with the AI platform:
- **Slack**: #team-posthog-ai
- **Team page**: <SmallTeam slug="posthog-ai" />
- **Objectives**: [Current goals and initiatives](/teams/posthog-ai/objectives)
