---
title: How much can you delegate to agents?
date: 2026-07-27
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/agent_autonomy_hero_0b9b4c0b41.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: How much can you delegate to agents?
  metaDescription: >-
    A simple guide to agent autonomy. The four levels of delegation, how to tell
    which one a task belongs in, and how to level up from each.
---

People are trusting their agents to do more work without supervision, but how do you decide when to trust them?

Some think the answer depends on how good the model is – i.e. when models get better, you can trust them to do more. But trusting your agents just because the models got smarter is like skipping your seatbelt because you got a nicer car.

The real answer has nothing to do with the model, and everything to do with the *task*. You need to build a mental model for when to delegate and how much, which you can then adapt.

Here’s a simple guide to maximizing agent autonomy, so you can ship fast *without* breaking things.

## The two factors that set the ceiling

You need ask yourself two questions first:

### 1. Is it easy to check the agent’s work?

To run safely on their own, agents need immediate feedback when they’re wrong. This is possible for most code with deterministic checks, like unit and integration tests. But subjective tasks, like renaming a parameter for clarity, are harder without human taste and judgment.

### 2. Is it cheap to undo an agent’s mistake?

Just like in traditional software engineering, if you want to trust an agent run without supervision, you need a guaranteed Ctrl+Z for worst case scenarios. That’s why StampHog, [our PR approval agent](/newsletter/code-review-tips#3-add-a-pr-auto-stamper), routes anything that contains deny-list keywords to a human.

Together, these two factors[^1] point you to one of four levels for any task:

- **Level 0: Agent as assistant.** For tasks that are hard to check and hard to undo. Necessary when dealing with tricky and sensitive code.

- **Level 1: Human-in-the-loop.** For tasks that are hard to check and easy to undo. Usually when you need subjective evaluation.

- **Level 2: Agent delegation.** For tasks that are easy to check and hard to undo. The default ceiling for most dev work today.

- **Level 3: Self-driving mode.** For tasks that are easy to check and easy to undo. Everything is accelerating towards this.

You can map these four levels to a very simple decision tree, which you can apply to any task:

![Decision tree for the four agent autonomy levels](https://res.cloudinary.com/dmukukwp6/image/upload/v1785215028/agent_autonomy_decision_tree_a058ef998d.png)

This helps you make decisions about how much to delegate to your agents, but you still can engineer your pipeline to enable higher autonomy for any specific task.

<NewsletterForm />

## Level 0: Agent as assistant

_When the work is **hard to check** + **costly to undo**_

This is the lowest level of agent autonomy. Think asking ChatGPT for advice, or auto-complete in Cursor, just like the good ol’ days of 2024.

But just because it’s old-fashioned doesn’t mean it’s bad; this mode is ideal when dealing with tricky problems in sensitive code surfaces.

For example, when [Dylan](/community/profiles/30455) updated our feature flag engine to support generic property targeting last year, he had to migrate an assumption that was indirectly baked into every feature flag at PostHog.

This would have been hard for agents to check deterministically since it wasn’t possible to grep for. The update also had a huge blast radius since it touched live customer flags, API response shapes, and reason-scoring functions.

### How to level up from here

**Break the task down.** Small pieces make it obvious where delegation is safe or not. Dylan handed off less critical work, like propagating the new targeting logic across our JavaScript, PHP, Ruby, and Flutter SDKs, to agents while doing the riskier core migration by hand.

## Level 1: Human-in-the-loop

_When the work is **hard to check** + **cheap to undo**_

This level of agent autonomy is common for tasks that need subjective evaluation since it’s hard to teach agents taste and judgment (for now, at least).

![Level 1: the agent writes code, the human reviews and gives feedback, and the human owns every merge](https://res.cloudinary.com/dmukukwp6/image/upload/v1785215029/agent_autonomy_level_1_human_in_the_loop_09d1750587.png)

Human-in-the-loop tasks are considered cheap to undo since the code stays in draft mode and won’t get merged until it’s verified by a human. An undo just means kicking off another iteration.

[This code readability refactor](https://github.com/PostHog/posthog/pull/35127) by [Thomas](/community/profiles/30210) was mostly done by hand, but it's a good example of something an agent wouldn't know how to grade. It was just a few lines that made it easier for humans to understand – adding comments, grouping actions, swapping strings for an enum – and didn't introduce any breaking changes.

### How to level up from here

- **Use LLM-as-judge.** This is how most people are building their agentic code review systems. As models continue to improve, more tasks that require human judgment can be [checked with LLMs](/blog/testing-ai-agents#non-deterministic-evaluators).

- **Define a scoped, measurable goal.** Success metrics or contracts can work as a proxy for a subjective evaluation. For example, you could instruct a system to [experiment with landing page copy](/experiments) until a variant reaches 3% conversion.

- **[Write custom skills.](/newsletter/agent-first-product-engineering#4-writing-skills-is-a-human-skill)** This helps agents produce work that reliably fits your standards, conventions, and taste with less steering required. For example, many developers write custom code review skills to follow team-specific standards.

## Level 2: Agent delegation

_When the work is **easy to check** + **costly to undo**_

![Level 2: the human delegates, the agent writes and tests code, and a safety gate stands between the agent and the merge](https://res.cloudinary.com/dmukukwp6/image/upload/v1785215031/agent_autonomy_level_2_agent_delegation_28c716226c.png)

This is the level that most developer tasks are today. An agent writes code that can be tested deterministically, but the final act of merging it is gated behind a final safety check.

When [Robbie](/community/profiles/29292) [rewrote our SQL parser](/blog/sql-parser) in Rust from scratch, he barely read the code since he had a machine oracle to check the work. But since the parser touches every query at PostHog, the agent’s work was gated behind multiple safety checks: shadow mode in production, then a staged cutover.

### How to level up from here

**Enforce policies and guardrails with code.** Most people default to gating Level 2 tasks behind a human (a.k.a., themselves), but this habit turns you into your own bottleneck. Instead, encode as many of your guardrails directly into your pipeline with policies like dry-running by default, scoping credentials, and putting changes behind [feature flags](/feature-flags).

## Level 3: Self-driving mode

_When the work is **easy to check** + **cheap to undo**_

There aren’t very many tasks in this category yet – just smaller ones like dependency bumps, lint fixes, adding test coverage to existing code. But the category is growing quickly, especially with long-running agents, goal-driven loops, and more complex orchestration.

We’re going all-in at PostHog on making [self-driving](/docs/self-driving) mode a reality for builders. Last month, for example, we launched [Scouts](/blog/what-is-a-scout) – agents that run on a schedule, investigate signals from product data, and draft a PR based on what they find.

### How to level up from here

- **Train domain-specific models.** Much of the next wave of tooling will be about improving verification tasks that are difficult for LLMs today. One obvious path is purpose-trained models that know what “good” looks like in a specific domain, which is why we’re [training our own AI models](/blog/training-ai-models) at PostHog.

- **Build expert-level context banks.** A lack of agent autonomy is often just due to a context deficit. We learned firsthand from [engineering our context layer](/newsletter/context-engineering) for the PostHog Wizard that closing this gap with structured and fresh knowledge is one of the highest-leverage things you can build for reliable agents.

- **Design clear signals for scouts.** The bottleneck for long-running agents is going to be whether they know when there’s work worth doing, and how to distinguish valid [signals](/docs/self-driving/signals) from random noise.

<NewsletterForm />

[^1]: Note that scale isn’t a factor for determining agent autonomy levels. People often conflate the two because multi-agent orchestration makes autonomy urgent. But if you get autonomy right at the task level, scale takes care of itself.
