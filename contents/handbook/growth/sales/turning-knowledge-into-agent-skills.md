---
title: Turning knowledge into agent skills
sidebar: Handbook
showTitle: true
---

Our documentation is a critical piece of PostHog's **context flywheel** – a system that connects our codebase to our docs, which then feeds into our AI agents, the [Wizard](/handbook/docs-and-wizard/developing-the-wizard), and PostHog Code. When documentation is outdated, the agents that help customers integrate PostHog become outdated too.

This means your knowledge directly powers our AI tools. When you write down what you know, it doesn't just help humans – it helps robots help customers faster.

## Why your contributions matter

The <SmallTeam slug="docs-wizard" /> team has automated writing documentation from PR merges using InKeep, which indexes our codebase and docs to create first-pass drafts. But there's knowledge that only comes from working directly with customers:

- Common integration patterns and gotchas
- Real-world use cases and configurations
- Cross-selling playbooks and discovery questions
- Troubleshooting steps for edge cases

This knowledge lives in your head. When you write it down in the handbook, it can be transformed into **skills** – portable packages of context that the AI Wizard can use to help customers.

## How to contribute

### 1. Write it in the handbook first

The handbook is the appropriate place to document playbooks, processes, and tribal knowledge. We have Markdown rendering for both the documentation and handbook, so content can flow between them.

Good things to document:
- How you help customers solve specific problems
- Discovery questions that uncover customer needs
- Common configurations you walk customers through
- Troubleshooting steps for issues you see repeatedly

### 2. Make it actionable

The [context mill](/handbook/docs-and-wizard/context-mill) transforms handbook content into skills for the AI Wizard. To make your content skill-ready:

- **Be specific**: Include actual steps, not just concepts
- **Show examples**: Real code snippets and configurations help
- **Explain the "why"**: Context about when to use something helps the AI apply it correctly
- **Use clear structure**: Headers, bullet points, and numbered steps work better than walls of text

For example, the [Logs skill](https://github.com/PostHog/context-mill/blob/main/transformation-config/skills/logs/description.md) is just a root prompt with some [reference material](https://github.com/PostHog/context-mill/blob/main/transformation-config/skills/logs/config.yaml) – it's that simple.

### 3. Think about automation

When you write something down, ask: "Could an agent do this automatically?"

For example, if you write a playbook for gathering a customer dossier, that could become an automated web search agent task. If you document how to identify cross-sell opportunities, that becomes a skill the Wizard can use.

## What gets turned into skills?

Skills are defined using a YAML specification that allows for different variants based on app detection and context. The <SmallTeam slug="docs-wizard" /> team currently has over 60 skills the Wizard can use.

Your handbook contributions can become skills that:
- Help customers integrate specific products
- Run migration analyses from competitors (Amplitude, Sentry, etc.)
- Diagnose common issues
- Generate tracking plans based on customer needs

## The Wizard and how it helps customers

The [AI Wizard](/docs/ai-engineering/ai-wizard) is a one-line `npx` command that runs an agent to integrate PostHog:

```bash
npx -y @posthog/wizard@latest
```

Here's what it does automatically:

- Instruments multiple products like Product Analytics, Web Analytics, Session Replay, Error Tracking, and [others]((/docs/ai-engineering/ai-wizard))
- Installs the right SDKs for their stack
- Scans their codebase to understand their product
- Creates 10-15 custom events based on product flows it identifies
- Writes both client-side and server-side code for full-stack implementations
- Creates an insight and dashboard in PostHog

This dramatically reduces manual integration work – what might take 3-5 hours happens in minutes. And it produces customized code tailored to each customer's setup.

The Wizard is agentic software that runs on our docs. When you write something down, the Wizard can execute it as a skill – it's like turning documentation into executable code.

So ask yourself: if an agent can read, analyze, and understand a user's codebase, what else could it  discover or build to help the user get value from PostHog faster? 

Those answers can become Wizard skills – and new ways of creating customers. 

## How this helps you help customers

### Close the gap in customer conversations

The Wizard and skills architecture lets you close the gap between customer-facing hypotheticals and technical diagnostics without needing engineering present. If a customer asks "how would I track X?", you can point them to the Wizard or a specific skill.

### Portable diagnostics

If customers are hesitant to run an agent on their codebase, they can receive the open-source skills package directly. This gives them 80-95% of the Wizard's functionality to run locally with their own tools.

### Better onboarding

For new customers, the Wizard provides an excellent launchpad – 10-15 best-practice events that help them overcome the initial difficulty of deciding what to track. The best approach is to:

1. Run the Wizard first
2. Review what it did together with the customer
3. Come up with a plan and tweaks

The Wizard helps you get past the blank page. It's much easier to iterate from there!

## Getting started

1. **Identify something you repeat**: What do you explain to customers often?
2. **Write it down**: Create a handbook page or add to an existing one
3. **Make it specific**: Include actual steps, code, or configurations
4. **Let the <SmallTeam slug="docs-wizard" /> team know**: Share in Slack that you've added something that might make a good skill

The written-down knowledge also enables automation beyond the Wizard – like having agents gather customer dossiers based on your specifications or analyze competitor implementations before a call.

Your knowledge is valuable. Write it down, and it becomes executable.
