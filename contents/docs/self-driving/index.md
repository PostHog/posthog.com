---
title: Self-driving product
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

PostHog makes your product self-driving.

A self-driving product can prompt itself. It understands your codebase, your data, and your users, and proposes and ships work on its own, inside guardrails you set. The _self_ in self-driving isn't autonomy from the engineer. It's autonomy from user instruction as the starting point: robots do the maintenance work like fixing bugs and closing UX gaps, so humans are free for the creative work.

This page explains what that means, how the pieces fit together, and where to start.

## The 3-layer stack

Self-driving works as three layers:

- **Surfaces** – where you and your team interact with the work: the [Slack app](/docs/slack), the [web app](/docs/web), and the [MCP server](/docs/model-context-protocol) for bringing PostHog into your own AI tools.

- **Agents** – long-running agents with skills that do the work: triaging issues, instrumenting events, opening pull requests, and measuring whether they worked.

- **Data** – the fuel. Your [SDKs](/docs/libraries), [data warehouse](/docs/data-warehouse), and imports and exports feed everything above. Better data means better signals, which means smarter agents.

## The product autonomy loop

The agents run a loop:

1. **Signals** – PostHog collects signals from every product and external source: error patterns, frustration in session recordings, experiment results, survey responses, support tickets, Slack threads, and more.

2. **Enrich** – signals are deduplicated and enriched with context, turning a vague "users seem frustrated at checkout" into a concrete, evidenced finding.

3. **Plan** – enriched signals become structured plans: what needs to happen, why, and the evidence behind it.

4. **Ship** – a sandboxed coding agent acts on the plan, usually by opening a pull request, and instruments the change (events, flags, experiments) as it goes.

5. **Review** – you review, iterate on, and merge or decline the proposed work.

6. **Evaluate** – once a change ships, a new signal checks what happened. Did the metric move? Did new errors appear? That feeds back into step 1.

![The product autonomy loop](https://res.cloudinary.com/dmukukwp6/image/upload/product_autonomy_loop_V2_a5243dfada.png)

You can't run this reliably inside a general-purpose coding agent, because the signals that drive it live in your product data. For a lot of teams, that's PostHog.

## Anatomy of a self-driving product

To make agents self-driving, PostHog adds five things on top of the model and harness:

- **Tools** – small, specific actions an agent can take, like `create_insight` or `read_taxonomy`.
- **Skills** – playbooks that tie tools, docs, and rules into a repeatable workflow.
- **Signals** – the _when_: the patterns in your data that trigger work.
- **Memory** – what the agent already did, so it doesn't redo work or reopen the same PR every week.
- **Evaluation** – the check that closes the loop: did the change actually work?

For the deep version, see the [AI engineering handbook](/handbook/engineering/ai/ai-platform) and the [self-driving product announcement](/blog/self-driving-product).

## Where you'll work

Self-driving shows up across the surfaces you already use:

- **[Slack app](/docs/slack)** – the simplest way for your whole team to use PostHog.
- **[Web app](/docs/web)** – for deeper work, right in your browser.
- **[MCP](/docs/model-context-protocol)** – for working from the AI tools you already use.

{/*TODO: add PostHog Code (desktop) as a fourth surface here once it's GA. Tagline: "the power tools, for your most complex work."*/}

## Get started

Self-driving runs on your product data, so the first step is to wire PostHog in.

<WizardCTA />
