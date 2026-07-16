---
title: Implementing AI features
sidebar: Handbook
showTitle: true
---

This page provides implementation guidance for building AI features at PostHog. For a high-level overview, see the [AI platform overview](/handbook/engineering/ai/ai-platform).

## How PostHog AI works across surfaces

PostHog AI isn't a single product – it's a platform that works wherever customers work. Through a combination of MCP tools and skills, PostHog AI is available across any agent of the customer's choice: PostHog AI in the web, PostHog Code, Claude Code, Cursor, Codex, and others.

All of these surfaces share the same underlying capabilities. The MCP server exposes PostHog's API as atomic tools, and skills teach agents how to compose those tools into workflows. When a product team adds a new MCP tool or writes a new skill, every surface benefits automatically.

### PostHog AI in the web

PostHog AI in the web is a sandboxed coding agent built on the Agents SDK (Claude Code's harness). It runs in a controlled environment with access to PostHog's full API surface and unlocks use cases that go beyond what a simple chat interface can offer:

- **Better coverage of existing products** – the agent can navigate across product boundaries, combining data from analytics, session recordings, feature flags, and more in a single workflow.
- **Advanced SQL writing and analysis** – the agent writes HogQL queries, executes them, and reasons over large result sets to answer complex analytical questions.
- **Automatic instrumentation for non-technical users** – users who aren't engineers can describe what they want to track and the agent generates instrumentation code.
- **User-created custom skills and capabilities** – customers can create their own skills to teach the agent domain-specific workflows.
- **Generative UI for complex needs** – for the most complex UI requirements, the agent can generate custom visualizations and interfaces on the fly.

### PostHog Code

PostHog Code is a desktop agent that turns PostHog signals into shipped code. It watches PostHog for problems (errors, frustration patterns, user feedback) and automatically creates tasks, generates fixes, and opens pull requests with human oversight at key decision points.

### Third-party agents

Engineers who prefer to work in Claude Code, Cursor, Codex, or any other MCP-compatible tool get access to the same PostHog capabilities.

## Headless first, then UI

Product teams must think about AI features as **headless (UI-less) workflows**. Agents don't need UI – they compose tools and follow skills to accomplish goals. But customers do need UI, and for that we have **MCP Apps**.

The rule of thumb: **first headless, then UI for a persona.**

1. **Build the capability headless** – expose your product's API as MCP tools and write skills that teach agents how to use them. This makes the capability available across all surfaces immediately.
2. **Then build UI where it matters** – if a persona (product manager, engineer, analyst) needs a dedicated experience, build an MCP App that provides the right UI for that workflow.

This order matters because headless capabilities are reusable across every surface, while UI is specific to one. If you build UI first, you've created something that only works in one place. If you build headless first, you've created something that works everywhere, and you can always add UI later.

## MCP tools vs skills

Understanding the distinction between tools and skills is essential for building effective AI features.

**MCP tools** are atomic capabilities – CRUD operations and simple actions. They answer "what can I do?" (list feature flags, execute SQL, create a survey, summarize a session recording). Tools should be basic primitives that agents compose into higher-level workflows.

**Skills** answer "how do I accomplish X?" They combine tools, domain knowledge, query patterns, and step-by-step workflows into a template that agents follow to solve a class of problems. A skill might reference multiple tools, include HogQL query examples, explain what data to verify before querying, and describe the desired outcome for the customer.

This separation matters because agents are good at composing simple tools but need guidance on _which_ tools to use, in _what order_, with _what constraints_.

For implementation details:
- [Adding tools to the MCP server](/handbook/engineering/ai/implementing-mcp-tools)
- [Writing skills](/handbook/engineering/ai/writing-skills)

## Implementation recommendations

### For engineers adding AI features

1. **Expose your product's API as MCP tools.** Every product should be accessible through the MCP server. Scaffold a YAML definition, enable the operations that make sense, and add a HogQL system table for data access. See [Adding tools to the MCP server](/handbook/engineering/ai/implementing-mcp-tools).

2. **Write skills for jobs to be done.** If your product has jobs that require domain knowledge – specific tool ordering, constraints, query patterns, or reasoning about what data to check – write a skill that teaches agents how to accomplish that job well. See [Writing skills](/handbook/engineering/ai/writing-skills).

3. **Build UI only when a specific persona needs it.** Don't start with a UI-specific AI feature. Start headless, validate that agents can accomplish the workflow, then add UI if a persona needs a dedicated experience.

### Serializer best practices

Descriptions flow through the entire pipeline:

```text
Django serializer field → OpenAPI spec → Zod schema → MCP tool description
```

Product teams should type and describe their serializer fields. These descriptions are what agents read to understand tool parameters – vague or missing descriptions lead to worse agent behavior.

Tips:
- Use `help_text` on serializer fields – it becomes the OpenAPI description.
- Use `param_overrides` in YAML definitions to override generated descriptions with imperative instructions.
- Be specific about formats, constraints, and valid values.
- Avoid jargon that an LLM wouldn't understand without context.

## Pricing and product positioning

### How we think about pricing

With our AI pricing, we want to follow the [PostHog pricing principles](/handbook/engineering/feature-pricing). Concretely, this means:

1. We offer a generous free tier
2. We charge usage-based instead of a flat subscription

The unit that matches usage the closest is token consumption. This means to fix a SQL query with AI, the user would pay very little, analysing hundreds of session recordings will cost more. Since token costs differ based on token type & model, we are passing on our own costs to our users, with a small markup, instead of having a fixed price per token.

To keep our AI pricing simple, this pricing applies to all AI features once they are in general availability, that means per-product AI features as well as Session summaries and Deep research.

So that users can learn how to use PostHog without worrying about being charged, we are keeping chats that refer to our documentation free without a limit.

### How users should think about our products

**PostHog AI** is the main PostHog product for AI interactions. You can use it in the web for the richest experience, through PostHog Code for code-generation workflows, or through any third-party agent via MCP. The web UX is best for sharing, navigation, and linking between AI results and PostHog artifacts. PostHog AI is also trained on PostHog-specific patterns and your actual usage data, so it provides higher quality, more contextual results than a general-purpose AI.

**Deep research** is a feature available within PostHog AI, but also accessible through its own dedicated UI if you want to jump straight into research. Use it for open-ended investigative work where you're trying to understand a complex problem.

**Session summaries** is callable from PostHog AI and Deep research, and also has its own UI. Use it when you need to analyze many session recordings and extract patterns or issues.

**PostHog Code** is a desktop product for single-engineer use. It's separate from PostHog AI because the workflow is different – you're not asking questions, you're letting an AI agent watch PostHog for problems and automatically fix them in your codebase. Think of it as an AI assistant that lives in your development environment.

**MCP** is for users who prefer to work in third-party tools like Claude Code, Cursor, or Codex. You get access to PostHog's data and can combine it with other MCP servers (like Hubspot or Zendesk). The trade-off is you don't get PostHog AI's polished UX or PostHog-specific optimizations.

## How to develop and test

1. **Set up the MCP stack locally.** Run `hogli dev:setup` and add the MCP stack to your local environment.
2. **Write YAML configs and skills.** Use the monorepo Claude Code skills to scaffold tool definitions and write skills (TODO: dedicated skill for this).
3. **Build skills and dump them locally.** Run `hogli build:skills` to render all skills, then unzip them into `.agents/skills/` so Claude Code can pick them up during local testing: `unzip -o products/posthog_ai/dist/skills.zip -d .agents/skills/`.
4. **Test with headless agents, not UIs.** Forget about UIs – that's for humans. Test your tools and skills by talking to Claude Code or another headless agent. If the agent can accomplish the job, the capability works.
5. **Test with PostHog Code.** Sign in to a local environment in PostHog Code and verify the end-to-end workflow.
6. **Alternatively, add the local MCP server to Claude Code.** Run `claude mcp add --transport http posthog-local http://localhost:8787/mcp` to point Claude Code at your local MCP server.


## Future directions

### Third-party context integration

We want to connect PostHog AI to third-party tools for additional context. Imagine PostHog AI analyzing data across PostHog, Slack messages, and Zendesk tickets to understand not just what users are doing, but what they're saying and reporting. This data could also generate signals for PostHog Code – if users are complaining about a bug in Slack and PostHog sees errors in the same area, that's a strong signal to investigate and potentially fix automatically.

### Continuous instrumentation

The Wizard's future evolution involves continuous instrumentation – watching your codebase and suggesting event tracking for new features, filling gaps in existing tracking, and standardizing event patterns. This could integrate with PostHog Code to automatically handle PostHog instrumentation when generating code.

### Research improvements

Deep research is being refined with better research strategies, improved denoising algorithms, and more sophisticated pattern recognition. The goal is to reduce rabbit holes and improve data interpretation accuracy.

## Contact and resources

For questions about working with PostHog AI, ask in the #team-posthog-ai Slack channel.

Additional resources:
- <SmallTeam slug="posthog-ai">PostHog AI team page</SmallTeam>
- [PostHog AI user documentation](/docs/posthog-ai)
- [PostHog AI objectives](/teams/posthog-ai/objectives)
- [AI platform overview](/handbook/engineering/ai/ai-platform)
- [Adding tools to the MCP server](/handbook/engineering/ai/implementing-mcp-tools)
- [Writing skills](/handbook/engineering/ai/writing-skills)
- [Products documentation](/handbook/engineering/ai/products)
- [Architecture documentation](/handbook/engineering/ai/architecture)
- [Team structure documentation](/handbook/engineering/ai/team-structure)
