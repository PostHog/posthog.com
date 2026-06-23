---
title: Why we're bullish on loops
date: 2026-06-17
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/steal_753960cac2.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: WTF is loop engineering and why is everyone talking about it?
  metaDescription: >-
    We're bullish on loops. Here's what they are, why they're taking off now, and what they mean for product engineers.
---

![Peter Steinberger on loops](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Pasted_image_20260610103323_b772252479.png)

When the creators of both OpenClaw and Claude Code speak, people listen. And last week [Peter Steinberger](https://x.com/steipete/status/2063697162748260627) and Boris Cherny were [both talking about](https://www.youtube.com/watch?v=PfWVVI9ALd8&t=1s) the same concept: loops.

Their argument? You shouldn't be prompting agents to write code, but building loops that prompt themselves to write code, so agents can complete long running tasks and you can use multiple agents at once to go further, faster.

## What's needed to engineer a loop?

You need four things:

**1. A goal**

Agents are capable, but you need to scope the loop so they know what you want them achieve. A loop without a goal is a slop cannon.

**2. Context**

Context is fuel and loops are often starved of it. Context can include tools, skills, analytics data, errors, memories – any information that helps the agent find work and complete the loop. It's best to curate context and feed it throughout, rather than dump it all upfront. The agent needs to be able to fetch and react to new inputs.

**3. Evaluation**

This is how the agent checks itself. [Tests](/blog/testing-ai-agents), [evals](/docs/ai-evals), metrics, [LLM-as-judge](/blog/stop-ai-slop), playgrounds. Test-driven development is _so back_, or maybe it never left? This is a big difference between loops and prompting: agents do the verification, not engineers.

**4. An agent (obviously)**

The most basic is using something like Claude Code with a `while true` (aka [Ralph](https://ghuntley.com/ralph/)) or using `/goal`. More complicated is purpose-built harnesses and context systems – e.g. an agent on a cron that pulls signals from your product data and emit work to subagents, or a loop that codegens its own test suite to verify itself.

Good examples of loops include:

- **PR babysitter.** The goal is to get a pull request to pass tests and "get CI green." The context is the changes (diff) as well as the testing suite, and the evaluation is done by the CI.

- **Bug fixer.** The goal is to fix the bug. The context is the bug report and error trace. The evaluation is the test suite, snapshots, logs.

- **Flaky test hunter.** The goal is to kill flaky tests. The context is CI history and retry logs. The eval is consecutive green runs.

- **Performance autoresearcher.** The goal is to beat a benchmark. The context is the system, metrics, and budget. The eval is whether it is faster, better, etc. on that metric. We recently used Karpathy's autoresearcher loop and it [fixed a 3-year-old bug in our query engine](/blog/karpathy-autoresearch-query-engine-bug) and increased performance by 11%.

<NewsletterForm />

## Why is everyone talking about loops right now?

Because it works. Yes, Peter and Boris lit the fire, but they're doing so because it's a real thing. The real "why now" is new and improved capabilities:

1. **Models are better at long running tasks**. [METR](https://metr.org/time-horizons/) finds that Opus 4.6 can complete 50% of tasks that take 12 hours, over 6x the 1 hour 40 minutes of Opus 4 from a year ago. [Fable (RIP)](https://www.anthropic.com/news/claude-fable-5-mythos-5) pushed this even further.

2. **Stories about huge tasks completed**. Stripe performed a codebase-wide migration in a day that would take a team two months by hand. Lovable found it can now one shot apps that previously took hundreds of prompts to build.

3. **Loops are built-in now**. Claude Code shipped a `/loop` command, both it and Codex have automations, and there's even a [Ralph plugin for Claude Code](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum).

4. **Subagents separate the loop from the work**. The main loop can spin up subagents that do the work and report back, saving tokens and preventing degradation.

5. **Harnesses are maturing**. Compaction keeps context windows from filling. Skills and [MCP](/blog/machine-copy-paste-mcp-intro) enable agents to use more tools. Cloud execution lets you kick off a loop and walk away.

Loops didn't magic themselves into existence based on a couple of tweets. They're an expression of real industry-wide progress.

## Loops are not just a new AI thing

Critics deride loops as a ploy from OpenAI and Anthropic to get everyone tokenmaxxing, but we think there's a greater goal here: [self-driving products](/blog/self-driving-product).

Rather than an engineer needing to prompt an agent to progress a project, the agent can prompt itself. The product improves itself without input. User problems get solved faster and yes, numbers go up.

And here's the thing, [product engineers](/product-engineer/what-is-a-product-engineer) already complete this loop manually by:

1. Collecting data through analytics and [talking to users](/newsletter/talk-to-users)

2. Building and shipping improvements to their products based on that data

3. Evaluating how that improvement performed to guide future development

4. Repeating constantly

PostHog has helped product engineers complete this loop for years now, so we think we're in a great position to help agents with it too. It's why we're betting on building features that help make your product self-driving, like [our Slack app](/slack), [PostHog Code](/code), and [Replay Vision](/replay-vision). Yes, we're a little AI-pilled.

There are, of course, limits. Loops aren't about to eliminate all engineering work, but they can put the 1% gains on cruise control: the bugs, UX issues, [paper cuts](/blog/slack-app-beta), and conversion tweaks. The things that drain engineering hours, but rarely need strategic input.

The more you can automate these tasks, the more time you can spend on more impactful and (frankly) interesting work. The "self" in self-driving doesn't mean autonomy from the engineer, it's autonomy from user instruction as the starting point.

## Code was never the problem

The opposition to loops is easy to understand: it's another shift in the way software is built. Being told they should be "designing loops" makes engineers feel like they're being replaced. The work is increasingly abstracted away from writing code.

But the rise of product engineers already showed that writing code was only a small portion of the work. The direction, taste, and empathy of a product engineer remain critical for building successful products in a loop-driven future.

<NewsletterForm />
