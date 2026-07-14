---
title: 2030-shaped software
date: 2026-06-30
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Blog_Job_Posts_70bb45215b.png
featuredImageType: full
category: Engineering
tags:
  - Engineering
  - AI
  - Inside PostHog
---

By 2030, AI agents will be the primary users of software. 

Many of the conversations and decisions about what we're building now are impacted by this. More and more, we're aiming towards building "2030-shaped software."

This is a vague aspiration and "agent-first software" isn't much better. But, while we can't predict the future, we can share how we're thinking about the problem.

## Human and agent work is split

The current era of software is designed for humans to do all the work, but in 2030, agents will be the ones **doing**. Agents have shown that they can do the obvious stuff themselves. What does this leave humans to do?

1. **Judging and deciding.** Humans will approve, prioritize, choose direction, and resolve ambiguity.
2. **Understanding and trusting.** Humans will evaluate whether it worked, if it's safe, and what's changed.

"Doing" UI like buttons and forms are going away. They will be replaced with UI that supports the two types of work above. This helps optimize humans' limited time and energy by pointing them where their input actually matters.
## Product infrastructure is agent-first

If a human can do something with your product, agents should be able to do it too. This means complete APIs, an [MCP server](/mcp), tools, and permissions. Build for [agents as a primary surface](/newsletter/agent-first-product-engineering), not an afterthought. 

Missing capabilities are a failure mode. Say you ask an agent to set up an [A/B test](/experiments). It creates the [feature flag](/feature-flags), builds the insight, wires up the events, and stops because you never exposed a tool to create the experiment. It now has to ask you to do that part which defeats the purpose of using agents. 

![Agent-first infrastructure](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Pasted_image_20260630115314_6ae3550668.png)

This doesn't mean that tools are all you need. It won't be enough to just let Claude use your product on its own. Relying entirely on a model provider is too much risk. Building your own harness lets you guarantee quality, protect your brand, and make continuous improvements. Even [OpenAI notes](https://openai.com/index/harness-engineering/) that agents struggle not because they are incapable, but because they lack "the tools, abstractions, and internal structure required to make progress toward high-level goals."

Finally, what makes your agent special is its context. The model is the same for everyone, your moat is the source code, usage data, customer data, and product skills you feed it. This means [context engineering](https://newsletter.posthog.com/p/we-used-ai-to-5x-conversion-and-2x), creating pipelines and flows to get fresh, valuable context to the agents when they need it.  

## Chat is the front door, generative UI inside

People like to complain about chat as an interface, but we think it's a good one. There's a reason why it's still the primary interface to work with agents and companies are doubling down with products, like Slack apps – have you tried the [PostHog Slack app](/slack) yet? Telling an agent what's needed and letting it go do it is a powerful interaction method.

But chat isn't enough because sometimes reading a paragraph is worse than glancing at a chart or flicking a toggle. Text can be too low bandwidth as it's flexible but linear; a UI is legible but rigid. Generative UI is in between. 

![Generative UI](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Pasted_image_20260630140620_c0f8fec2c3.png)

Most generative UI will be disposable, but some will become artifacts: outputs worth keeping, sharing, and forking. Examples include reports, documents, code, pull requests, configuration, even entire apps. All of them are backed by your app's data. Generative UI is how you work with the agent right now; artifacts are what you walk away with. 

## Build UI when text isn't enough

Text and generative UI cover much of what a product needs, but not everything. Some jobs will continue to need persistent, purpose-built UIs, like:

- **Trust and verification surfaces** confirming the agent did what you wanted. Checking work, not doing it.
- **Triage and inbox surfaces** listing decisions that need a human. Approvals, ambiguous calls, unclosed support tickets.

It's tempting to make your UI agent-first by removing the buttons, forms, and other parts of the UI that power the doing, but this is a half-measure. Most of this new "read-only" UI can be delivered as text by an agent, making it redundant and misaligned with what humans need the UI for.

Take our feature flags page. The jobs to be done are:

- Is my flag rolled out? 
- To whom? 
- Does it have a payload?
- What type is it?

An agent can answer all these questions in a sentence. You're not verifying the agent's work and there's no decision to be made. You're just checking the flag's state. A 2030 flags page shows how agents change rollouts and previews a pull request to clear up stale flags. 

The question to ask is: **is a human looking at this for trust and judgement, or to act?** If it's an action, give the agent the capability. If it's to trust or judgement, build for that specifically. 

## Be everywhere

Agents don't work like apps. They run on their own, often for a long time. Nobody should have to sit in a browser tab watching them. 2030 products come to their users, no matter if that means [desktop](/code), Slack, mobile, email, API, or voice. 

These aren't separate products; they're a shared control plane between humans and agents. Thin clients over a shared backend, so the experience is the same anywhere and the handoff between surfaces is seamless. 

This pushes you towards cloud-first. The real bottleneck when working with agents is concurrency and babysitting. Builders want to run many agents at once, point them at a backlog, and refine the output from anywhere. On-device execution can't do that. 

![Theo cloud agents](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_06_30_at_14_16_28_a64f928804.png)

Cloud-first only works if all that infrastructure is excellent. Sandboxes need to be rock solid: fast repo imaging, snappy execution, no crashing or freezing. Your app is ubiquitous, your infrastructure invisible. 

## Building 2030-shaped software now

2030 software requires a lot of changes, and 2026 is not 2030. As a company with multiple successful products and thousands of users relying on us, the hard part is getting there while having a real product and revenue to support. Do we retrofit or start fresh?

Retrofitting maximizes reach, that's where our users already are, but we inherit all our 2026 patterns. Every change draws complaints from users attached to the way things work today (not to mention the tech debt).

Starting fresh means a clean break with years of cumulative UI built on assumptions that might not be valid or relevant. The people who opt in are early adopters who want to co-create the future with us. They don't complain about what's missing, they tell us what they need. The cost of this is convincing existing users to switch (eventually) and splitting focus with our existing products while we do. 

We're cheating a bit and going semi-fresh, using our existing data and infra on a new surface. We're expanding our existing [PostHog Code app](/code) to fit our 2030 vision first before migrating other surfaces. It's already where the best agents live, it draws exactly the early adopters we want, and it's simple enough to be a genuine blank slate.

Without this change, we risk building 2026-shaped software with AI bolted on. We answer "how do we add AI to this" rather than "what is the agent-first version of this?" We can't predict 2030, but don't need to be right about the details to build in the right direction. The companies that matter in 2030 will be the ones who started building for it well before they had to. 