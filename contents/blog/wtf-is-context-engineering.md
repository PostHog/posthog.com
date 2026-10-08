---
title: "WTF is context engineering? (with real examples)"
date: 2026-10-07
author:
  - jina-yoon
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Blog_Job_Posts_70bb45215b.png
featuredImageType: full
category: Engineering
tags:
  - Explainers
  - AI
  - Engineering
seo:
  metaTitle: "WTF is context engineering? (with real examples)"
  metaDescription: "Context engineering is about deciding what information AI agents see, and when. Here's why it's important now, how it differs from prompt engineering, plus real examples from PostHog."
---

Say you're deploying an AI assistant that processes online order returns. For it to work, it would need access to your store's purchase policy, item prices, and order history.

The problem is that LLMs can only hold a finite amount of information, so you can't give it the whole database of purchases made by every user since you launched. Instead, you might provide details on one specific order, which you can only get *after* the customer provides their order number.

Building the systems to deliver that information is what context engineering is about. You're designing *what* an agent should read – instructions, tools, data, examples, memory – and *when*. [Andrej Karpathy](https://x.com/karpathy/status/1937902205765607626), one of the co-founders of OpenAI, described it well:

> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."

You might think that as models and agents improve, context engineering's relevance would decrease over time, but it's actually the opposite.

Better models just give agents the *potential* to tackle a challenge, but context engineering is what gets them to actually succeed at scale.

## What does context engineering *actually* look like?

To understand what context engineering is more concretely, take a look at the system behind the [PostHog Wizard](/docs/ai-engineering/ai-wizard), our custom onboarding agent.

The PostHog Wizard is an AI assistant that automatically installs PostHog in an existing codebase. This used to take developers at least 2 hours of manually reading docs, pasting code snippets, and testing integrations. Now, users can accomplish this in *8 minutes* – all with a simple `npx @posthog/wizard@latest` command. And it's been wildly successful since launch, 5x'ing our paid conversion rates and 2x'ing activation speeds.

Building it, however, was not simple.

When we started on it back in 2025, language models were already good enough at generalized coding tasks. The challenge was in making them good at *PostHog*-specific code. It's like how the world's greatest rocket scientist won't know how to install a toilet or cook a mean lasagna if they've never tried or been taught how. No matter how super-intelligent models are, general knowledge can only take you so far in highly specific scenarios.

Then, when you consider that PostHog has 20+ products, 17+ SDKs, and 25+ frameworks that are constantly getting updated, you'll start to see the moving combinatorial explosion we were dealing with. On top of that, LLMs are diabolically good at sounding correct, so there were many wrong solutions that slipped and passed our review in the early stages.

(We won't go into the details of how we solved those problems in this blog. If you're interested in that story and want to see the lessons we learned while building the PostHog Wizard, check out [our newsletter](/newsletter/context-engineering).)

It took several months of hacking and experimenting until we finally landed on the design that's still in use today: the [`context-mill`](/handbook/wizard-and-docs/context-mill).

![Context mill pipeline diagram](https://res.cloudinary.com/dmukukwp6/image/upload/v1782926288/context_engineering_lesson2_pipeline_f043d88bb2.png)

It's an automated pipeline that independently gathers PostHog installation context and serves it to downstream [`wizard` client agents](/blog/envoy-wizard-llm-agent). It works by first grabbing the latest info about PostHog from three main sources:

1. **Docs.** For example, the Next.js integration skill pulls the Next.js library docs, plus the shared .md guide about how to [identify users](/docs/product-analytics/identify) for analytics.
2. **Example apps.** These are 40+ few-shot example apps with PostHog installed across frameworks like Django, Swift, Rust and more. The wizard is instructed to match these as closely as possible.
3. **Hand-written instructions.** This contains technical "gotchas" to avoid, step-by-step installation guides, and other prompts for runtime.

Once it's gathered all of the source information, the `context-mill` assembles the material into a collection of zip files and cuts a versioned GitHub release. It then packages the context as downloadable skills and registers them with MCP servers as a publicly accessible resource. That way, downstream agents can install PostHog with the latest version from anywhere, anytime.

This is just one example of context engineering in practice. Anyone in the field will tell you that no two context engines will ever look the same since each one is typically built to solve a specific, unique, contextual problem.

## Why is everyone talking about context engineering now?

Context engineering first started trending around 2024, but it exploded in popularity in 2025 for a few reasons.

![Context engineering search trend chart](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_10_08_at_11_06_16_AM_b8d53c222a.png)

### 1. Prompt engineering turned into context engineering

In 2025, most of us were still using ChatGPT in the browser as a chatbot and marveling at Cursor's auto-complete.

At the time, the only real surface in which engineers could improve their AI systems was just in their prompts. This was the era when prompt engineering was hot; people would work on mastering the craft of writing the best combination of text for one-shot classification or generation tasks. Companies were hiring "prompt engineers", communities like [r/PromptEngineering](https://www.reddit.com/r/PromptEngineering/) thrived, and Google published [a 68-page whitepaper](https://www.kaggle.com/whitepaper-prompt-engineering) on advanced prompting techniques.

And then agents happened. Agents changed the meta from chatbots that primarily work in single-turn interactions to systems that can operate over multiple turns of inference:

![Single-turn promp context versus agent loops](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/single_turn_vs_agentic_loop_v2_c1704c20c5.png)

This opened up way more possibilities for AI engineering.[^1] Developers could now start designing strategies for the entire context state including system instructions, tools, message history, and more.

### 2. The models just kept getting better

With every major model release, there's a matching rise in interest in context engineering since no two generations are the same. [Boris Cherny](https://www.youtube.com/watch?v=qyPCVqFUyDo), the creator of Claude Code, described:

> "Every model generation behaves differently. It has a slightly different personality, and you have to take the time to get to know it and then adjust."

One of the most dramatic advancements in model capabilities of 2026 was Anthropic's Fable 5. As part of the release, Anthropic reported that they [removed 80% of Claude Code's system prompt](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) because the new models needed fewer rules and repetition. Instead, they said that allowing more space for LLM judgment was the better approach. The new rules for context engineering now [favor leaner prompts](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6#prompting-best-practices) and thinner context.

For example, in older versions of the PostHog Wizard, the installation would often land on the wrong project in monorepos because our scripts pointed to root by default. Once models got smart enough to reliably infer repo structure on their own, [we updated it](https://github.com/PostHog/wizard/pull/884) so headless runs take advantage of those capabilities.

This is an ongoing cycle in context engineering. As models improve, your context needs to be reshaped and often cut down in response. Otherwise, you risk "hobbling" the model – A.K.A., [overconstraining it](/newsletter/agent-first-product-engineering#3-front-load-universal-context) by giving too *much* information, rather than letting it use built-in reasoning.

![Venn diagram: "Context you provided" overlapping "What the model knows now", with the still-useful overlap marked "Keep this" and the outdated part marked "Delete this"](https://res.cloudinary.com/dmukukwp6/image/upload/fix_your_agents_keep_delete_venn_7b18d18842.png)

### 3. Agentic systems keep getting more complex

Alongside model improvements, harnesses, infrastructure, and tasks keep getting more complex. In turn, agents have more complicated needs for context, which is why interest in context engineering has grown.

Consider that in early 2025, most people were working with just a handful of agents at a time, usually on a single task. Now, we have things like:

- **[Multi-agent orchestration](/newsletter/software-factories):** Agents leading other agents to break up, dispatch, and execute work in parallel
- **Long-horizon tasks:** Agents working autonomously for hours on multi-step projects with complete verification
- **[Scheduled agents](/blog/what-is-a-scout):** Agents that run on a schedule or trigger on events, without a human starting the session
- **Multiplayer AI:** Systems where people and agents work in the same shared workspace and context, like in Slack
- **[Sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing):** Isolated environments that limit what agents can touch, which lets them run often with even higher autonomy

Together, these advancements let teams aim for [software factories](/newsletter/software-factories), or codebases where agents write all of the code, and humans read little to none of it. For us, over the last 4 months at PostHog, we moved from around [20% of our monorepo PRs](/blog/10k-prs-a-month) being opened by agents to 70%. One of the main reasons we were able to keep up with shipping at that speed was by creating autonomous workflows like our [PR auto-stamper](/newsletter/code-review-tips#3-add-a-pr-auto-stamper) and reviewer – and that requires good context engineering.

## What does a day in the life of a context engineer look like?

At PostHog, our context engineers started out as technical writers. When the docs team took over development of the Wizard, their job became maintaining what the agent knows, which tools it can use, and how its output gets checked – and that's when they renamed both their team and job titles.

Here are a few examples of common tasks our context engineers in our [Wizard & Docs Team](/teams/wizard-and-docs) do to improve and maintain the PostHog Wizard:

- **Create feedback loops** to identify fixes and opportunities. For example, we instruct the PostHog Wizard to [report back](/newsletter/fix-your-agents#3-ask-agents-for-feedback-directly) any problems it faced after each run. This gives us a live feed of issues to investigate, like old docs or redundant instructions.
- **Adopt new tech and tools** by making tradeoffs between accuracy, cost, and duration. With every new major model release, our Wizard & Docs Team runs internal [benchmarks](https://github.com/PostHog/wizard-workbench) to figure out if it's worth upgrading our base models.
- **Limit agent scopes** by codifying our stance on what *not* to do. Several of the [commandments](https://github.com/PostHog/context-mill/blob/main/context/commandments.yaml) we give agents are to explicitly set boundaries of its job (e.g., "don't change existing feature flag names in customers' code").
- **Evaluate automated runs** and course correct when needed. Whenever someone updates PostHog docs or code, the `wizard-ci` runs evals and delivers the reports in companion PRs. Our context engineers review these and keep a pulse on what's normal, or what needs human intervention.

Many of these tasks have the same shape as agent-assisted software engineering, and that's not a coincidence. With the [engineeringification of everything](/newsletter/engineeringification-of-everything), the line between context engineering and software engineering is increasingly blurred.

There's a good chance you might already be doing some form of context engineering as a product engineer, but you just didn't call it that. [AI-assisted code review systems](/newsletter/code-review-tips#1-make-agents-review-code-for-you), for example, are a basic form of context engineering since you're likely injecting specific style, conventions, and opinions into those prompts and references.

As developers spend more time building the [software factory](/newsletter/software-factories) rather than the software itself, some might even say that the [future of engineering](/newsletter/when-ai-writes-all-code) *is* context engineering.

## What are context engineering best practices?

The crazy buzzwords you see on Twitter make it seem otherwise (don't even get me started on ["graph engineering"](https://www.analyticsvidhya.com/blog/2026/07/graph-engineering/)), but what makes for good context engineering is quite simple. It has way less to do with the techniques, and much more to do with source quality, information hygiene, and user-centered design.

![Olympics equipment meme](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/wiki_meme_29ca46ac13.png)

Existing disciplines like technical writing, knowledge management, and information architecture have known and studied this for decades. Many of the principles that are now the backbone of [context engineering](/newsletter/context-engineering) today come directly from those existing fields like [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/), [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), and [docs-as-code](https://www.writethedocs.org/guide/docs-as-code/). Yet people keep treating it like a brand new field, which is why they keep making avoidable mistakes.

We're not immune to this either. When we first started building the Wizard, we [hardcoded all of our docs](/blog/correct-llm-code-generation#the-dead-end-of-v1) directly into the agent harness. This led to a poor experience where users would receive outdated information, or have to download the latest version before every single run.

The `context-mill` we have today is the result of us taking a step back and realizing that they need to ship separately. Decoupling them lets each one grow independently without either bottlenecking the other. Of course, informaticists already knew this, and they call it [single-source publishing](https://en.wikipedia.org/wiki/Single-source_publishing): writing content once in a canonical source, then distributing to many outputs.

So instead of getting overwhelmed by the fancy new techniques you hear about on the internet, treat context engineering like building information systems. The goal is to design the best library *ever*, but for agents. Like any other design problem, that starts by understanding your [agents as users](/newsletter/agent-first-product-engineering#5-treat-agents-like-real-users).

[^1]: Graphic adapted from a diagram by Anthropic in [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

## Context engineering FAQs

<details>
<summary>What's the difference between context engineering and prompt engineering?</summary>

Prompt engineering is about writing and organizing the instructions in a single request. Context engineering is about designing the system that decides everything the model sees on each turn: instructions, tools, retrieved data, examples, memory, and message history.

Anthropic describes context engineering as [the natural progression of prompt engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). A prompt is written once. Context is curated again every time an agent decides what to pass to the model.

</details>

<details>
<summary>Is context engineering the same as RAG?</summary>

No. Retrieval-augmented generation (RAG) is one technique for getting information into the context window: index your documents, retrieve the chunks most relevant to a query, and add them to the prompt. Context engineering is the broader practice of deciding what goes into the context window and when. RAG is one tool it can use.

Many agents now combine up-front retrieval with "just in time" context, where the agent keeps lightweight references like file paths or links and loads the data with tools only when it needs it. For the PostHog Wizard, the [context-mill](/handbook/wizard-and-docs/context-mill) packages docs, example apps, and hand-written instructions into versioned skills that agents load through the [PostHog MCP server](/docs/model-context-protocol).

</details>

<details>
<summary>How is context engineering different from harness engineering?</summary>

The harness is all the code, configuration, and execution logic around a model that isn't the model itself – the agent loop, tool calls, permissions, compaction, and so on. Harness engineering improves that scaffolding. Context engineering decides what information flows through it. As Addy Osmani puts it, [harnesses are largely delivery mechanisms](https://addyosmani.com/blog/agent-harness-engineering/) for good context engineering.

In the PostHog Wizard, the `wizard` agent is the harness and the `context-mill` is the context. We keep them separate so [neither has to wait on the other to ship](/newsletter/context-engineering#lesson-2-dont-hardcode-knowledge).

</details>

<details>
<summary>What does a context engineer do?</summary>

A context engineer designs and maintains the information an AI agent works with: what it knows, which tools it can use, what it shouldn't do, and how its output gets checked.

At PostHog, our docs team took over development of the Wizard, and [we now call them context engineers](/blog/posthogs-next-chapter). Their work includes building feedback loops from agent runs, benchmarking new models, codifying what agents shouldn't do, and reviewing automated eval runs. See [a day in the life of a context engineer](#what-does-a-day-in-the-life-of-a-context-engineer-look-like) above for examples.

</details>

<details>
<summary>What tools do you need for context engineering?</summary>

Fewer than you might expect. Most of the work is in the quality of the source material, not the tooling. The common building blocks are:

- **Markdown files:** Instruction files like `AGENTS.md` and [skills](/newsletter/writing-agent-skills) that agents load on demand.
- **MCP servers:** A standard way to deliver context and tools to any compatible agent. The PostHog MCP server exposes the `context-mill` output as resources.
- **Version control and CI:** Context changes go through review and versioned releases, the same as code.
- **Evals:** Automated runs that test the agent whenever context changes and grade the output, like our [wizard-ci and pr-evaluator](/newsletter/fix-your-agents#2-test-your-context-like-its-code).
- **Observability:** Traces of what the agent saw, did, and spent. We use [AI observability](/ai-observability) to [track the Wizard's token costs](/blog/optimizing-agent-cost).

</details>
