---
title: We used context engineering to 5x conversion and 2x activation
date: 2026-06-24
author:
  - edwin-lim
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1782746594/context_engineering_hero_7ee47b4915.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: We used context engineering to 5x conversion and 2x activation
  metaDescription: >-
    How PostHog built a context layer for its AI wizard — 5x paid conversion, 2x
    faster activation, and 80% larger MRR in the first paying month.
---

It all started with a friction log.

A year ago, [Josh Snyder](/community/profiles/32497), then on the growth team, binged [session recordings](/session-replay) of users trying to onboard to PostHog. The long list of failure modes was painful.

![Slack conversation about session replay logs](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Group_144344_7025248ece.png)

But it jolted an idea loose: what if AI could handle the onboarding for you? So we built an AI onboarding wizard.

The [PostHog Wizard](/wizard) is an AI agent that fully integrates PostHog into any codebase with a single CLI command. No manual SDK installation, no docs spelunking. Just `npx @posthog/wizard`.

Early versions were primitive, but today's wizard completes two hours of work in just 8 minutes. It's a genuinely magical experience. People LOVE it.

Building it taught us some important lessons about how to build agents people genuinely love (with great ROI, too!), starting with the most important lesson of all...

![Context supply vs reasoning diagram](https://res.cloudinary.com/dmukukwp6/image/upload/v1782926286/context_engineering_lesson1_reasoning_a86611f1d7.png)

## Lesson #1: Reasoning isn't the bottleneck

We initially tried solving everything at the agent layer – better progressive disclosure techniques, multi-step planning, subagents, pruning, compaction – but the gains were marginal.

The biggest improvements came from simply giving the agent more context. A lot more. That told us something about the shape of the problem.

With 20+ products, 17+ SDKs, and 25+ frameworks, there are thousands of ways to integrate PostHog, and each setup requires some piece of technical trivia, like:

- Where should PostHog initialize? Client, server, both, or serverless?
- How do events get sent? Direct, or through a reverse proxy?
- How are pages rendered? SSR or SSG? RSC?

The agent routinely got these details wrong because it was operating in a context deficit. So we started engineering the context that powered it.

![The PostHog Wizard in action](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/wizard_b75470874d.jpg)

<Caption>The wizard is <a href="https://github.com/PostHog/wizard">open source</a>. You should steal it!</Caption>

Our Docs team of technical writers became a [Wizard & Docs team](/teams/wizard-and-docs) of context engineers – same people, different mission. Their job became building a library of context for agents, and a delivery system that made it accessible.

The result was a company-wide context layer that could pull from everything we maintained: docs, source code, SDK references, example apps, anything that could widen the scope of what the agent could handle.

**Remember:** "If your agent is tackling a high-variance problem like onboarding, reasoning usually isn't the bottleneck. Context supply is."

<NewsletterForm />

## Lesson #2: Don't hardcode knowledge

The naive way to supply more context (which we did) was to hardcode it into its harness.

In v1, the wizard's context and code were locked together, so the two couldn't scale independently. Supporting a new framework or product in the wizard meant shipping a whole new agent.

Our answer was the [context mill](https://github.com/PostHog/context-mill), an assembly-line service for turning scattered PostHog knowledge into portable, versioned zip files that agents can consume remotely.

![Context mill pipeline diagram](https://res.cloudinary.com/dmukukwp6/image/upload/v1782926288/context_engineering_lesson2_pipeline_f043d88bb2.png)

Here's how the context mill works:

1. It pulls context from our docs, source code, Open API specs, example apps, and other maintained sources.
2. It assembles the source material into a collection of zip files and cuts a versioned GitHub release.
3. It delivers each one as a skill or registers it with an [MCP server](/docs/model-context-protocol) as a resource.
4. It reaches every downstream agent without a redeploy or update.

This lets us generate large libraries of skills that cover our entire platform with just a few simple build scripts. Then, at runtime, the wizard can browse a "skill menu" from the context mill's manifest and choose the best skill for the job.

For example, if there's a framework we don't support yet, like serverless Next.js, we load the context into the mill and send it straight to the agent. It's continuous context delivery.

The same pipeline also delivers skills to our [AI plugins](https://github.com/PostHog/ai-plugin), [PostHog Code](/code), and our MCP server.

**Remember:** "The fastest way to make an agent obsolete is to hardcode its knowledge. Decouple the context from your harness and assemble it from sources of truth."

## Lesson #3: Fix context drift at the source

The context mill solved packaging and distribution, but the wizard was still instrumenting out-of-date SDK versions and settings. We realized its context was going stale further upstream, at the source.

The culprit was something we're very proud of: we ship fast. Like, weirdly fast. Our cracked engineers were moving faster than our documentation could keep up with, which meant drift crept into the context mill's output.

So we added a docs agent to close the loop on knowledge management.

![Docs agent feedback loop diagram](https://res.cloudinary.com/dmukukwp6/image/upload/v1782926290/context_engineering_lesson3_feedback_loop_a6e506b4bd.png)

It uses a system of deep research subagents with RAG powered by Inkeep. The docs agent retrieves embeddings across our entire platform and internal repos, follows our style guide, and uses skills and MCPs to draft documentation.

Now every merged feature PR creates a corresponding docs PR, cross-referenced across multiple sources, diffed against existing pages, and ready for a human to review.

Within weeks, our docs velocity matched our code velocity. We're at an all-time high in both.

**Remember:** "If your context drifts, so does every agent consuming it. Build tight feedback loops, human-reviewed where necessary, between your sources and their maintained knowledge bases."

## Lesson #4: Reuse context to compose new skills

Our context mill was delivering fresh but unstructured context at first. We needed a way to shape it into skills the agent could run.

So we gave the wizard a declarative YAML spec – a recipe for which pieces of context to pull together and how to assemble them into skills.

![Declarative YAML spec for skill assembly](https://res.cloudinary.com/dmukukwp6/image/upload/v1782926293/context_engineering_lesson4_yaml_spec_1f20a11bb9.png)

Say we want to teach the wizard how to set up [Error Tracking](/docs/error-tracking). The context spec might include:

- A product overview
- The relevant SDK reference
- An example app

But error tracking doesn't work the same way in every language, so the spec also defines variants. The shared content stays put, and each variation swaps in its own specifics:

- **Shared**: the product overview, the core instructions
- **Python**: the Python SDK reference, a Flask example app
- **JavaScript**: the JS SDK reference, a React example app

The context mill then stitches everything into a collection of skills. Namespacing keeps the Python skill and the JavaScript skill from getting tangled up, even though they came from the same context recipe.

That's how the wizard went from supporting 5 frameworks to 25+ in a few days. Composing context from shared pieces was more flexible and efficient than writing from scratch, even with AI's help.

![Skill composition across frameworks](https://res.cloudinary.com/dmukukwp6/image/upload/v1782926295/context_engineering_lesson4_skill_composition_6a1f6a4441.png)

Once we had building blocks, we started seeing context shapes that should exist but didn't, kind of like how building a REST API makes you notice endpoints inside your data model.

Take our audit-3000 skill from our recent hackathon. It chains multiple product guides, privacy pages, pricing, and a dozen other docs into a hyper-robust workflow that audits a PostHog setup for data integrity. It also comes with arcade games, because why not?

The skill's shape and scope completely surprised us. But to the team who built it, it was obvious because the pieces were already there. The spec just made the combination easy to see.

**Remember:** "Make context easy to compose, so anyone can mix and match knowledge and rapidly expand what your agents can do. Once experimentation is cheap, you can build powerful new skills based on intuition."

## Lesson #5: Eliminate context silos

Going in, we assumed making the wizard work would mean creating context. We spent most of our time digging it out.

Like data, context is generated everywhere, but most of it sits stuck in silos.

We found those barriers everywhere at PostHog. The API references live in the codebase, the installation steps in the docs, and the troubleshooting steps in a runbook. All of it valuable context to the wizard, all of it trapped in separate systems.

We connected the gaps with a network of APIs, MCPs, CI/CD, and gateways, so context can circulate across the company. It looks less like a monolith and more like an ecosystem.

![Context infrastructure network diagram](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Group_144561_8e52377cd6.png)

It's the same plumbing you already use for general software infrastructure, but landscaped for context, so it can run downhill to wherever it's needed.

When a PR is merged, or a docs page is updated at PostHog, that context can reach an agent within minutes.

With the wizard's context layer as shared infrastructure, we can ship a new customer-facing agent to production in an afternoon.

![A company of wizards](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/company_of_wizards_alt_82f3cfdedf.png)

Arguably the most powerful source of context we unlocked wasn't even technical, it was our [company handbook](/handbook).

Because our business playbooks are open source alongside our docs, the same context system that produces skills for Next.js integrations can produce skills to support enterprise customers, or run marketing campaigns.

Today our [small teams](/teams) are building their own fleet of wizards. Many as forward-deployed agents to help users with support, outreach, sales playbooks, and other business motions.

Turns out being a [transparent company](/founders/how-to-run-a-transparent-company) also makes you agent-ready.

> **Remember:** The context with the most leverage is the context you already have. Building shared infrastructure will free the context trapped within your systems to accelerate agent development across teams.

## Lesson #6: Investing in context pays off

![Onboarding conversion and activation results](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/7a19b89f_5592_4037_a9d3_536595f481b1_2002x876_ab9bb1f735.png)

The wizard is one of the highest-impact things we've shipped, and the context behind it is the main reason why.

Here's how it changed our onboarding:

- **5x paid conversion**: 14.2% of wizard users convert to paid usage vs 2.6%
- **2x faster activation**: first event in 1.9 hours vs 3.8, with 94% activating within one hour vs 67%
- **80% larger MRR** in the first paying month

Building a context layer is high-leverage for any company shipping agents, but it takes real investment and a shift in how you think about the work.

We created a whole [new team](/teams/wizard-and-docs) for it. It's a kind of work that didn't exist a year ago, and it's only going to get bigger as more of what companies ship runs on agents.

The job is context.

<NewsletterForm />
