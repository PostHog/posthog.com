---
title: Implementing AI features
sidebar: Handbook
showTitle: true
---

This page provides implementation guidance for building AI features at PostHog. For a high-level overview, see the [AI platform overview](/handbook/engineering/ai/ai-platform).

## How PostHog AI works across surfaces

PostHog AI isn't a single product – it's a platform that works wherever customers work. Through a combination of MCP tools and skills, PostHog AI is available across any agent of the customer's choice: PostHog AI in the web, PostHog Desktop, Claude Code, Cursor, Codex, and others.

All of these surfaces share the same underlying capabilities. The MCP server exposes PostHog's API as atomic tools, and skills teach agents how to compose those tools into workflows. When a product team adds a new MCP tool or writes a new skill, every surface benefits automatically.

PostHog AI renders its own interface in several places. The one that matters most for product teams is the side panel, which opens beside whatever page the user is already on:

| Surface | What it is |
| --- | --- |
| The side panel | Opens anywhere in the PostHog app, next to the page the user is working on. |
| `/ai` | The full-page scene. `/max` redirects here, and `/ai/history` lists past threads. |
| `/home` | The AI-first project homepage embeds an instance. |
| `/tasks` | The standalone agent-run scene. |
| Signals inbox | Read-only embeds of a finished run. |
| PostHog Desktop | A separate app that runs the same agent implementation on top of tasks. It has its own interface, so it needs its own UI integration. |

The first five are the PostHog web app, and the frontend seams described below apply to all of them. PostHog Desktop shares the agent but not the frontend, so an integration there is separate work.

### PostHog AI in the web

PostHog AI in the web is a sandboxed coding agent built on the Agents SDK (Claude Code's harness). It runs in a controlled environment with access to PostHog's full API surface and unlocks use cases that go beyond what a simple chat interface can offer:

- **Better coverage of existing products** – the agent can navigate across product boundaries, combining data from analytics, session recordings, feature flags, and more in a single workflow.
- **Advanced SQL writing and analysis** – the agent writes HogQL queries, executes them, and reasons over large result sets to answer complex analytical questions.
- **Automatic instrumentation for non-technical users** – users who aren't engineers can describe what they want to track and the agent generates instrumentation code.
- **User-created custom skills and capabilities** – customers can create their own skills to teach the agent domain-specific workflows.

### PostHog Desktop

PostHog Desktop is a desktop agent that turns PostHog signals into shipped code. It watches PostHog for problems (errors, frustration patterns, user feedback) and automatically creates tasks, generates fixes, and opens pull requests with human oversight at key decision points.

### Third-party agents

Engineers who prefer to work in Claude Code, Cursor, Codex, or any other MCP-compatible tool get access to the same PostHog capabilities.

## Headless first, then react, then UI

Product teams must think about AI features as **headless (UI-less) workflows**. Agents don't need UI – they compose tools and follow skills to accomplish goals. But customers do need UI, and there are two different things that can mean.

The rule of thumb: **headless first, then make your existing UI react, then a dedicated UI for a persona.**

1. **Build the capability headless** – expose your product's API as MCP tools and write skills that teach agents how to use them. This makes the capability available across all surfaces immediately.
2. **Make your existing UI react to the agent** – tell the agent what the user has open, and update the page when the agent changes something. This is a small amount of frontend work on the product you already have, and it's what makes the side panel feel like part of your product instead of a chat window next to it. See [integrating your product's UI](#integrating-your-products-ui-with-posthog-ai) below.
3. **Then build a dedicated UI where it matters** – if a persona (product manager, engineer, analyst) needs an experience of their own, build an MCP App that provides the right UI for that workflow.

This order matters because headless capabilities are reusable across every surface, while UI is specific to one. If you build UI first, you've created something that only works in one place. If you build headless first, you've created something that works everywhere, and you can always add UI later.

Step 2 is the one teams skip. It's cheap, it applies to the product you already shipped, and without it a user watching PostHog AI edit their feature flag sees a stale form.

## MCP tools vs skills

Understanding the distinction between tools and skills is essential for building effective AI features.

**MCP tools** are atomic capabilities – CRUD operations and simple actions. They answer "what can I do?" (list feature flags, execute SQL, create a survey, summarize a session recording). Tools should be basic primitives that agents compose into higher-level workflows.

**Skills** answer "how do I accomplish X?" They combine tools, domain knowledge, query patterns, and step-by-step workflows into a template that agents follow to solve a class of problems. A skill might reference multiple tools, include HogQL query examples, explain what data to verify before querying, and describe the desired outcome for the customer.

This separation matters because agents are good at composing simple tools but need guidance on _which_ tools to use, in _what order_, with _what constraints_.

For implementation details:

- [Adding tools to the MCP server](/handbook/engineering/ai/implementing-mcp-tools)
- [Writing skills](/handbook/engineering/ai/writing-skills)

## Integrating your product's UI with PostHog AI

Everything in this section is frontend work in the PostHog app. **There is no backend integration API** – nothing you build here talks to a PostHog AI backend. The agent reads and writes your entities through your MCP tools, so an integration always has two halves, and the frontend half depends on the backend half.

Injected context carries _references_, not data. A reference the agent can't resolve with a tool is a dead end, so ship the tool first.

The seams live in the PostHog AI product's frontend, and the full detail is in its [integration README](https://github.com/PostHog/posthog/blob/master/products/posthog_ai/README.md). In the monorepo, the `/integrating-with-posthog-ai` skill walks an agent through the same material.

### The import rule

Import from a domain-scoped `api/<module>` entry. Don't reach into internal paths, and note there's deliberately no root barrel:

```ts
import { useAttachedContext, useMcpToolApplyBack } from 'products/posthog_ai/frontend/api/logics'
import { registerToolRenderers } from 'products/posthog_ai/frontend/api/tools'
```

Pick the narrowest module that does the job. `api/logics` and `api/types` are headless, `api/primitives` pulls in markdown rendering and virtualization, and `api/tools` registers built-ins at module load, so importing it is a side effect that isn't tree-shaken. A status badge that imports the wrong tier doubles its chunk.

### Seam 1: inject context

Register what the user is looking at. While it's registered, every message sent from the surface is silently prefixed with a context block describing it. The user only ever sees their own text.

```tsx
import { useAttachedContext } from 'products/posthog_ai/frontend/api/logics'

useAttachedContext(dashboard ? [{ type: 'dashboard', key: dashboard.id, label: dashboard.name ?? undefined }] : null)
```

Items are abstract. `type` is any string you like (`'insight'`, `'trace'`, `'text'`, `'hog_flow_editor_state'`) and never an enum, plus optional `key`, `label`, `value`, `hidden`, and `dismissGroup`. JSX-only call sites can render `<AttachedContextProvider items={...} />` instead. From a kea logic, register through a disposable with `pauseOnPageHidden: false` – the default hide-pause would silently drop context from a follow-up that flushes while the tab is hidden.

Three rules:

- **Inject identifiers, not object shapes.** The context block rides on _every_ message in the conversation, so a serialized entity is a per-turn cost that never goes away. Send the reference and let the agent fetch details through your MCP tools.
- **This context is untrusted, by design.** It lands in a `<posthog_untrusted_context>` block behind hardening prose that tells the agent it's data, not direction. That's what makes it safe to inject whatever the user typed – and you should, because their unsaved work is usually the most useful thing you have. Don't sanitize user text into blandness.
- **Strip secrets before you serialize.** Saved secrets never reach the frontend, but a secret typed into a form and not yet saved sits in cleartext in your live form state.

The exception to the first rule is **unsaved progress the agent can't fetch**: live editor or form state. When you send that, budget it. The Workflows editor caps its state at 64,000 characters and _elides_ the heavy nested parts, replacing them with a marker telling the agent which tool to call for the full value. Elision keeps the JSON parseable, and blind truncation doesn't.

Deduping is automatic and scoped to the task, covering the whole chain of runs. `text` items are the exception and always resend.

### Seam 2: inject custom instructions

`type: 'instructions'` is the one reserved item type. Its value lands in a `<posthog_trusted_context>` block – guidance the agent is told to follow. Use it to say what the user has open and which tools to prefer:

```ts
const ISSUES_QUERY_TOOL_CONTEXT_ITEM: AttachedContextItem = {
    type: 'instructions',
    hidden: true,
    value:
        'The user has the error tracking issue list open. When you call query-error-tracking-issues-list, the filters ' +
        'from your query (filter group, status, date range, search, ordering, assignee) are also applied to the open ' +
        'page, so the user sees matching issues both in this chat and on screen.',
}
```

**Trusted means static.** Instructions must only ever carry your own build-time strings. Never a user-entered name, an ingested value, or a string interpolated from one. Trusted context is direction the agent follows, so a crafted entity name there is a prompt injection against whoever reads the thread next, including other users on a shared task.

If an instruction needs to point at something that varies – which record is open, which step is selected – don't interpolate it. Put the pointer on an ordinary untrusted item and have the static instruction refer to it by field name. There's a second reason to do this: instructions dedupe by exact text, so a varying ID inside an instruction gets pruned on a reopen, leaving a stale pointer as the newest surviving text.

The richest use of trusted context is handing the agent everything it needs up front, so it doesn't spend turns discovering tools or reading skill files. The Workflows editor attaches a preamble, the full text of its skill, one item per MCP tool, and a visible chip the user can detach. All of it comes from a generated module that pulls the skill markdown and tool descriptions out of the repo at build time – which is what makes them safe as trusted strings. Don't hand-copy skill text into a component, because it will drift from the skill it claims to be.

### Seam 3: react to what the agent does

A global event bus publishes tool-call lifecycle events with resolved tool names. Two consumer APIs use it.

**Reload after the agent changes something**, with `useToolStreamListener`. The bus is global, so an event about some other record still reaches you – parse the inner arguments and check the call was actually about the thing you're showing.

**Apply an agent edit back into an open form**, with `useMcpToolApplyBack`. This is the one to reach for when the side panel is open next to your editor: the user asks PostHog AI to change a feature flag, and the open form updates instead of going stale.

```tsx
useMcpToolApplyBack({
    tools: ['insight-create', 'insight-update'],
    targetKey: `dashboard:${dashboard?.id ?? 'unloaded'}`,
    active: !!dashboard && canEditDashboard,
    onApply: (_event, { innerInput }) => {
        if (dashboard && insightIsAddedToDashboard(innerInput, dashboard.id)) {
            loadDashboard({ action: DashboardLoadAction.Update })
        }
    },
})
```

It's a hardened wrapper over the bus, not a convenience alias. It only fires for the run rendered in the panel the user is watching, so a background task can't rewrite the page under them. It snapshots the active registration when the prompt is sent, so navigating to a different editor mid-run can't hand the response to the new one. And it fails closed when more than one target claims the same tool.

Two caveats bite people:

- **Replay events are suppressed by default.** A page reload replays the run's history through the same code path. Without suppression every handler would re-fire on every reload, creating things twice or re-applying stale edits.
- **The tool name is unreliable when a call starts.** For PostHog tools wrapped in an exec call, the command streams in through later updates. Match on completion whenever correctness depends on knowing which tool ran.

Pair an apply-back with a trusted instruction telling the agent its tool calls are reflected on the open page. Otherwise it doesn't know the user can see the result, and may narrate the change instead of making it.

### Seam 4: render your own tool cards

Register a renderer and your product's tool calls display as a real card in the thread instead of the generic MCP fallback. Registration is a module-level side effect – call it once from your scene's entrypoint:

```tsx
import { registerToolRenderers } from 'products/posthog_ai/frontend/api/tools'

registerToolRenderers([
    {
        key: 'cdp-functions-partial-update',
        displayName: 'Update function',
        icon: <IconBolt />,
        renderPermissionPreview: renderPartialUpdatePreview,
        requiresPostHogOrigin: true,
    },
])
```

An entry can draw the result card, the approval prompt shown _before_ a write runs, or both. Set `requiresPostHogOrigin` on anything that renders PostHog entities, so a same-named tool from another MCP server can't render through your card.

**A tool card is two header lines plus an accordion.** You get a title and one subtitle – the single most salient input. Everything else your tool produces goes in the collapsible body, so a thread with twenty tool calls stays scannable and a reader expands only the cards they care about. Reserve the always-visible area for something the user must act on. Output is never that.

> MCP Apps are a different mechanism. Those render tool results in _external_ clients such as Claude Desktop, and don't appear in PostHog AI threads. "Make our results look good in Claude Desktop" is an MCP App. "Make our results look good in PostHog AI" is this seam.

### Seam 5: build a custom UI on the run primitives

The same facade exposes the machinery for rendering and driving an agent run yourself: a read-only embed, a compound surface with thread and composer slots, the whole `/tasks` product inline, and the thread and composer primitives underneath.

**Avoid this unless you know exactly what you're doing.** The four seams above are what a product integration needs. This one means owning stream binding, composer and queue state, permission routing, and the choice that decides whether your surface doubles someone's bundle. There's no default layout, so you compose one. If you need it, copy one of the two reference implementations rather than composing from scratch.

### Shortcut for a whole scene

`useSceneAgentPanel` bundles context, contextual welcome headlines, and gated auto-open of the side panel into one call. Start there for a scene, and drop to the individual hooks for a single component.

### What not to use

The LangGraph runtime is frozen. Don't add `useMaxTool` registrations, `MaxUIContext` fields, or `maxContext` selectors on scene logics. New integrations use the seams above.

## Implementation recommendations

### For engineers adding AI features

1. **Expose your product's API as MCP tools.** Every product should be accessible through the MCP server. Scaffold a YAML definition, enable the operations that make sense, and add a HogQL system table for data access. See [Adding tools to the MCP server](/handbook/engineering/ai/implementing-mcp-tools).

2. **Write skills for jobs to be done.** If your product has jobs that require domain knowledge – specific tool ordering, constraints, query patterns, or reasoning about what data to check – write a skill that teaches agents how to accomplish that job well. See [Writing skills](/handbook/engineering/ai/writing-skills).

3. **Make your existing UI react.** Attach the entity the user has open, add a trusted instruction describing what this page is for, and update when the agent changes something you're displaying. Each of these is a hook call on a component you already have, and together they're what makes the side panel useful on your product. See [integrating your product's UI](#integrating-your-products-ui-with-posthog-ai).

4. **Build a dedicated UI only when a specific persona needs it.** Don't start with a UI-specific AI feature. Start headless, validate that agents can accomplish the workflow, then add UI if a persona needs an experience of their own.

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

**PostHog AI** is the main PostHog product for AI interactions. You can use it in the web for the richest experience, through PostHog Desktop for code-generation workflows, or through any third-party agent via MCP. The web UX is best for sharing, navigation, and linking between AI results and PostHog artifacts. PostHog AI is also trained on PostHog-specific patterns and your actual usage data, so it provides higher quality, more contextual results than a general-purpose AI.

**Deep research** is a feature available within PostHog AI, but also accessible through its own dedicated UI if you want to jump straight into research. Use it for open-ended investigative work where you're trying to understand a complex problem.

**Session summaries** is callable from PostHog AI and Deep research, and also has its own UI. Use it when you need to analyze many session recordings and extract patterns or issues.

**PostHog Desktop** is a desktop product for single-engineer use. It's separate from PostHog AI because the workflow is different – you're not asking questions, you're letting an AI agent watch PostHog for problems and automatically fix them in your codebase. Think of it as an AI assistant that lives in your development environment.

**MCP** is for users who prefer to work in third-party tools like Claude Code, Cursor, or Codex. You get access to PostHog's data and can combine it with other MCP servers (like Hubspot or Zendesk). The trade-off is you don't get PostHog AI's polished UX or PostHog-specific optimizations.

## How to develop and test

1. **Set up the MCP stack locally.** Run `hogli dev:setup` and add the MCP stack to your local environment.
2. **Write YAML configs and skills.** Use the monorepo skills to scaffold and shape the work: `/implementing-mcp-tools` for tool definitions, `/writing-skills` for skills, and `/integrating-with-posthog-ai` for the frontend seams.
3. **Build skills and pick them up locally.** Run `hogli build:skills` to render all skills, then `hogli sync:skill -- --name <skill-name>` to copy one into `.agents/skills/` so Claude Code discovers it. `hogli unsync:skill -- --name <skill-name>` removes it again.
4. **Test with headless agents, not UIs.** Forget about UIs – that's for humans. Test your tools and skills by talking to Claude Code or another headless agent. If the agent can accomplish the job, the capability works.
5. **Test with PostHog Desktop.** Sign in to a local environment in PostHog Desktop and verify the end-to-end workflow.
6. **Alternatively, add the local MCP server to Claude Code.** Run `claude mcp add --transport http posthog-local http://localhost:8787/mcp` to point Claude Code at your local MCP server.
7. **Test a UI integration in the app.** Attached context is invisible by design, so check it landed: an item that isn't hidden shows as a chip in the composer, and the agent should answer a question about the thing you attached without being told its ID. For a reactivity seam, ask the agent to make the change and confirm the open page updates, then reload the page and confirm your handler does _not_ fire again.

## Future directions

### Third-party context integration

We want to connect PostHog AI to third-party tools for additional context. Imagine PostHog AI analyzing data across PostHog, Slack messages, and Zendesk tickets to understand not just what users are doing, but what they're saying and reporting. This data could also generate signals for PostHog Desktop – if users are complaining about a bug in Slack and PostHog sees errors in the same area, that's a strong signal to investigate and potentially fix automatically.

### Continuous instrumentation

The Wizard's future evolution involves continuous instrumentation – watching your codebase and suggesting event tracking for new features, filling gaps in existing tracking, and standardizing event patterns. This could integrate with PostHog Desktop to automatically handle PostHog instrumentation when generating code.

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
- [Integrating a product with PostHog AI](https://github.com/PostHog/posthog/blob/master/products/posthog_ai/README.md) – the frontend seams, in full
- [Products documentation](/handbook/engineering/ai/products)
- [Architecture documentation](/handbook/engineering/ai/architecture)
- [Team structure documentation](/handbook/engineering/ai/team-structure)
