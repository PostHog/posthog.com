---
title: Contributing to docs
sidebar: Handbook
showTitle: true
---

Our documentation is a critical piece of PostHog's **context flywheel** — a system that connects our codebase to our docs, which then feeds into our AI agents and the [wizard](/handbook/docs-and-wizard/developing-the-wizard). When documentation is outdated, the agents that help customers integrate PostHog become outdated too.

This means your knowledge directly powers our AI tools. When you write down what you know, it doesn't just help humans — it helps robots help customers faster.

## Why your contributions matter

The docs team has automated writing documentation from PR merges using Inkeep, which indexes our codebase and docs to create first-pass drafts. But there's knowledge that only comes from working directly with customers:

- Common integration patterns and gotchas
- Real-world use cases and configurations
- Cross-selling playbooks and discovery questions
- Troubleshooting steps for edge cases

This knowledge lives in your head. When you write it down in the handbook, it can be transformed into **skills** — portable packages of context that the AI wizard can use to help customers.

## How to contribute

### 1. Write it in the handbook first

The handbook is the appropriate place to document playbooks, processes, and tribal knowledge. We have Markdown rendering for both the documentation and handbook, so content can flow between them.

Good things to document:
- How you help customers solve specific problems
- Discovery questions that uncover customer needs
- Common configurations you walk customers through
- Troubleshooting steps for issues you see repeatedly

### 2. Make it actionable

The [context mill](/handbook/docs-and-wizard/context-mill) transforms handbook content into skills for the AI wizard. To make your content skill-ready:

- **Be specific**: Include actual steps, not just concepts
- **Show examples**: Real code snippets and configurations help
- **Explain the "why"**: Context about when to use something helps the AI apply it correctly
- **Use clear structure**: Headers, bullet points, and numbered steps work better than walls of text

### 3. Think about automation

When you write something down, ask: "Could an agent do this automatically?"

For example, if you write a playbook for gathering a customer dossier, that could become an automated web search agent task. If you document how to identify cross-sell opportunities, that becomes a skill the wizard can use.

## What gets turned into skills?

Skills are defined using a YAML specification that allows for different variants based on app detection and context. The docs team currently has over 60 skills the wizard can use.

Your handbook contributions can become skills that:
- Help customers integrate specific products
- Run migration analyses from competitors (Amplitude, Sentry, etc.)
- Diagnose common issues
- Generate tracking plans based on customer needs

## The wizard and how it helps customers

The [AI wizard](/handbook/docs-and-wizard/developing-the-wizard) is a one-line `npx` command that runs an agent to integrate PostHog:

```bash
npx -y @posthog/wizard@latest
```

Here's what it does automatically:
- Installs the right SDKs for their stack
- Scans their codebase to understand their product
- Creates 10-15 custom events based on product flows it identifies
- Writes both client-side and server-side code for full-stack implementations
- Creates an insight and dashboard in PostHog

This dramatically reduces manual integration work — what might take 3-5 hours happens in minutes. And it produces customized code tailored to each customer's setup.

### Products supported today

- Product analytics
- Web analytics
- Session replay
- Error tracking

Coming soon: feature flags, experiments, LLM analytics, and logs.

## How this helps you help customers

### Close the gap in customer conversations

The wizard and skills architecture lets you close the gap between customer-facing hypotheticals and technical diagnostics without needing engineering present. If a customer asks "how would I track X?", you can point them to the wizard or a specific skill.

### Portable diagnostics

If customers are hesitant to run an agent on their codebase, they can receive the open-source skills package directly. This gives them 80-95% of the wizard's functionality to run locally with their own tools.

### Better onboarding

For new customers, the wizard provides an excellent launchpad — 10-15 best-practice events that help them overcome the initial difficulty of deciding what to track.

## Getting started

1. **Identify something you repeat**: What do you explain to customers often?
2. **Write it down**: Create a handbook page or add to an existing one
3. **Make it specific**: Include actual steps, code, or configurations
4. **Let the docs team know**: Share in Slack that you've added something that might make a good skill

The written-down knowledge also enables automation beyond the wizard — like having agents gather customer dossiers based on your specifications or analyze competitor implementations before a call.

Your knowledge is valuable. Write it down, and it becomes executable.
