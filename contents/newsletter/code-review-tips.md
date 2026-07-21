---
title: Stop being the code review bottleneck
date: 2026-07-09
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1783662227/stop_being_the_code_review_bottleneck_hero_a734a37558.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: Stop being the code review bottleneck
  metaDescription: >-
    AI writes code faster than you can review. Four workflows PostHog
    engineers use to delegate code review to agents and stop being the
    bottleneck.
---

Agents are writing code faster than any human can review.

The naive solution would be for developers to review code faster. The 500 IQ take is for developers to review as little code as possible.

If you need to be involved in every code review, you will always be the bottleneck. Instead, put yourself outside of the code review loop by building a pipeline that delegates tasks to agents.

We asked engineers at PostHog how they’ve been reviewing [AI-generated code](/newsletter/ai-coding-mistakes) to keep shipping fast without losing quality.

Here are four workflow changes you can steal (with prompts included) to make your life easier.

## 1. Make agents review code for you

The number one thing to add, if you haven’t yet, is a way for agents to review code for you.

![Slack thread asking devs how they review agent-generated code, with a joke reply meme](https://res.cloudinary.com/dmukukwp6/image/upload/v1783662228/stop_being_the_code_review_bottleneck_1_slack_thread_8ca1a6a450.jpg)

The goal is to offload the simpler reviews to agents, and flag if something genuinely needs a human.

The key is that the agent that wrote the code can’t be the one that reviews it. Agents are bad at checking their own work since they’re often unaware of their own blind spots.[^1]

For the same reason, it’s better to have multiple agents with different instructions and goals to cover more gaps,[^2] as well as different models and providers for different reviewers.[^3]

Here’s how one of our engineers, [Paul D’Ambra](/community/profiles/30173), makes his own custom agent review system work:

![qa-swarm review-triage agent pipeline diagram](https://res.cloudinary.com/dmukukwp6/image/upload/v1783662229/stop_being_the_code_review_bottleneck_1_qa_swarm_diagram_d728ab2551.png)

1. First, **[qa-swarm](https://github.com/pauldambra/dotfiles/tree/main/ai/skills/qa-swarm)** spawns four reviewer agents, each with their own special instructions:

   - **qa-team** – spawns technical subagents that hunt for security, database, performance, etc.
   - **security-audit** – probes for vulnerabilities like SQL or prompt injections
   - **paul-reviewer** – uses Paul’s voice and focuses on observability, rollouts, naming
   - **xp-reviewer** – applies an Extreme Programming lens to review
2. Then, **[review-triage](https://github.com/pauldambra/dotfiles/blob/main/ai/skills/review-triage/SKILL.md)** sorts those reviews to classify threads into three categories:

   - **actionable** → gets fixed and pushed
   - **nits** → get resolved and replied to with a comment
   - **ambiguous** → escalated and sorted for Paul to work through with the agent later
3. An outer loop iterates up to three times or until no new actionable threads appear.

From there, you can connect this to another loop that shepherds the PR until it’s ready to merge – more on that in the next section.

> **The takeaway:** Save time reviewing code by making [agents](/newsletter/agent-first-product-engineering) review each other. This knocks out easier reviews so that only the PRs that really need human attention get flagged.

### Steal this

You can check out and copy Paul’s [qa-swarm](https://github.com/pauldambra/dotfiles/blob/main/ai/skills/qa-swarm/SKILL.md) and [review-triage](https://github.com/pauldambra/dotfiles/blob/main/ai/skills/review-triage/SKILL.md) skills, or use this prompt to design your own review loop based on his:

```llm
Read Paul D'Ambra's qa-swarm skill, plus its sibling review-triage in the same folder, then help me design my own version: https://github.com/pauldambra/dotfiles/blob/main/ai/skills/qa-swarm/SKILL.md

It should take in a single PR, spawn a reviewer panel, triage every finding and existing PR thread into actionable / nit / ambiguous, and keep going until nothing's left but the ambiguous ones flagged for me.  

Interview me about my stack, tooling, available models, and how autonomous it should be — what gets auto-fixed vs. only reported, and what it may post to GitHub — before writing the final SKILL.md, then install it.
```

That said, these systems can get token expensive:

> *“Something like 60% of my token spend is burned automating the toil of handling CI and review and I don’t regret a single dollar.”* – Paul

So if running multiple agents or loops isn’t an option for your team, look for single agent designs like [this one](https://github.com/kunchenguid/no-mistakes) by Kun Chen.

<NewsletterForm />

## 2. Delegate PR babysitting to loops

The context switching that comes with agentic coding is exhausting. One easy way to reduce that fatigue is by automating code review-adjacent tasks that don’t need your attention.

For example, babysitting a single PR can involve tedious tasks like monitoring CI, re-running flaky tests, checking notifications for comments, and keeping the branch up to date.

Why waste your most precious resource – your energy – when you can just delegate all of it to a [loop](/newsletter/loops)?

> **The takeaway:** Reduce context switching and fatigue by delegating simple tasks like PR babysitting to a loop.

### Steal this

You can implement your own PR babysitter skill, based on [babysit-prs](https://github.com/haacked/dotfiles/blob/main/ai/skills/babysit-prs/SKILL.md) by [Phil Haack](/community/profiles/32501) with the prompt below. (It works best if you run it after creating a review loop skill from the previous section.)

```llm
Read https://github.com/haacked/dotfiles/blob/main/ai/skills/babysit-prs/SKILL.md and adapt it for me: same sweep/state design, but it dispatches my own single-PR review skill via a spawned agent per unreviewed PR. 

Before writing SKILL.md, interview me on: which skill it dispatches and where my skills live, my stack/tooling/models, and which extra tasks to include — CI monitoring, branch freshness, flaky-test reruns, lint/format autofix, regenerating drifted artifacts, description sync. 

Ground the interview in  facts you can discover yourself (my open PRs, gh auth, clone layout) rather than asking about them.
```

## 3. Add a PR auto-stamper

Fast-moving teams generate a lot of small, low-risk PRs, and every one still needs approval on GitHub (a.k.a., a stamp).

![PostHog hedgehog mascot illustration reviewing a stack of papers next to a stamping machine](https://res.cloudinary.com/dmukukwp6/image/upload/v1783662231/stop_being_the_code_review_bottleneck_3_stamphog_mascot_7741e0b1ba.png)

At PostHog, we used to handle this in Slack where you drop your PR in #dev-stamp-exchange and wait for someone to give it a quick approval and react with a stamp emoji. We even built a [leaderboard](https://stamphog.vercel.app/) for it.

It worked, but each stamp required another engineer to take themselves out of their flow to approve a change they had little to no context on.

Now, most of those are done by our StampHog agent instead. And in just one quarter, it gives the final stamp on roughly 1 in 3 PRs merged into our main repo.

Our engineers add a stamphog label on their PR in GitHub, and it runs a few safety checks based on:

- **PR state.** No merge conflicts or changes requested
- **Blast radius.** [Deny-list](https://github.com/PostHog/posthog/blob/master/tools/pr-approval-agent/README.md#t2--never-ai-approved) keywords (auth, secrets, billing, public APIs, etc.)
- **Diff size.** Under 500 lines and 20 files
- **A simple LLM check.** For basic showstoppers

If the agent approves, it’ll leave a bare GitHub approval with no line comments.

Otherwise, it refuses or escalates with a 1-2 sentence reason, risk level rating, and next steps. Usually that means routing to a subject matter expert based on [CODEOWNERS-soft](https://github.com/PostHog/posthog/blob/master/.github/CODEOWNERS-soft) and git-blame familiarity.

We still use #dev-stamp-exchange when the agent can’t auto-accept or route, but it’s way less active now. Last month, the StampHog agent took care of 1.6K PRs on its own – that’s *1.6K fewer Slack interruptions* for our engineers.

> **The takeaway:** Let an agent can take care of low-context PR approvals and routing to reduce distractions. Use deterministic checks to route sensitive code to humans.

### Steal this

The code for StampHog is available [here](https://github.com/PostHog/posthog/blob/master/tools/pr-approval-agent/). Many of its inner workings are specific to PostHog, so instead of copying it, here's a prompt to start customizing one for your repo based on ours:

```llm
Read https://github.com/PostHog/posthog/blob/master/tools/pr-approval-agent/README.md and build the equivalent for the repo at <path>. 

Copy the architecture; preserve its safety invariants exactly (fail closed, never request changes or merge, LLM can tighten gates but never loosen). 

Their deny-list and thresholds are calibrated to their codebase — re-derive mine: mine my git history for high-blast-radius deny candidates and calibrate size/tier ceilings from my merged PRs, then propose the full gate config for my sign-off before writing any code. 

At the same time, ask me whatever you can't derive from the repo — at minimum the CI system and trigger label, escalation routing if there's no CODEOWNERS, and which LLM/SDK to use and how CI gets its credentials. 

Leave the result as uncommitted files on my working tree.
```

## 4. Verify by observation, not reasoning

[Agents](/newsletter/building-ai-agents) are good at explaining why their code works. The explanation is often convincing... but also wrong.

If you run the code end to end, you’ll frequently find errors the agent never reasoned about, or output that’s just slightly not what you asked for.

That’s why [Daniel Visca](/community/profiles/43453)‘s rule of thumb is observability over **reasoning**. Don’t accept an argument that the code works when you can *watch* it work.

The gold standard is something you can observe directly, like sending a real API request and reading the response. If the behavior is in front of you, you don’t have to trust the agent’s rationale at all. But this has a scaling problem since a 3,000-line PR would be challenging to trust and observe.

His approach is to make agents decompose the work. For example, for a large change (like building a metrics pipeline end to end), he instructs the agent to produce a stack of small, single-purpose PRs and then uses [Graphite](https://graphite.dev) for its “stacking” functionality. This makes each diff independently runnable and observable:

![Graphite stacked PR view for a posthog-js CLI analytics feature](https://res.cloudinary.com/dmukukwp6/image/upload/v1783662232/stop_being_the_code_review_bottleneck_4_graphite_stack_d66eec1dbc.jpg)

At each step of the stack, you can run a real check and confirm the output matches what you expect. Then, as you merge bottom-up, each layer only builds on behavior that’s already been verified.

This way, early mistakes can’t compound, and when something does break, you’re debugging one small diff instead of the whole change.

As a bonus, this lets StampHog from #3 auto-approve the small and focused PRs. You end up with two different checks: the agent reasoning about the code first, and a human observing its actual behavior.

> **The takeaway:** When you can't trust an agent's reasoning, don't read more code; decompose the change until you can watch each piece run. Observation scales better than review.

### Steal this

You can set this up by using Graphite to stack smaller PRs produced by your agents with these instructions:

```llm
Split work into a stack of small PRs, each under 400 changed lines and focused on a single change, building only on the PRs below it. 

Every PR must ship with its own tests and end with a way to observe it working directly — a command to run and the output I should expect.
```

This approach is especially valuable for frontend work since deterministic tests don’t always capture the visual or behavioral functionality you’re looking for.

[Pawel Cebula](/community/profiles/33209) says it’s a huge timesaver to have an agent take screenshots and GIFs for each step, with something like this:

```llm
For each PR with frontend work, run the affected screens and capture evidence from the branch's final state: a screenshot of each relevant state (empty, loading, error, populated) and a GIF of the key interaction end to end. Where behavior changes, include before/after. 

Attach it all to the PR so the change can be reviewed by observation, not by reading the diff — and re-capture if the code changes after.
```

<NewsletterForm />

[^1]: [Tyen et al., "LLMs cannot find reasoning errors, but can correct them given the error location" (2024)](https://research.google/blog/can-large-language-models-identify-and-correct-their-mistakes/)

[^2]: [Qian et al., "Enhancing LLM-as-a-judge via multi-agent collaboration" (2025)](https://www.amazon.science/publications/enhancing-llm-as-a-judge-via-multi-agent-collaboration)

[^3]: [Verga et al., "Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models" (2024)](https://arxiv.org/abs/2404.18796)
