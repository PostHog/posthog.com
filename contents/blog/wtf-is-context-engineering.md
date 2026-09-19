---
date: 2026-05-19
title: WTF is context engineering? (and why it matters)
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/ai_powered_features_4259857d61.jpg
featuredImageType: full
category: Engineering
tags:
  - Explainers
  - AI engineering
---

If you've found your way to this blog, you probably already do some form of context engineering all the time. You just didn't know that yet. Whether you're doing it *well* is a different question.

Let's find out.

## WTF is context engineering?

**Context engineering is about designing all the input that goes in and around an AI model to make it actually useful.** 

The term started gaining traction in June 2025, when Andrej Karpathy (ex-OpenAI) [tweeted](https://x.com/karpathy/status/1937902205765607626): 
> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step." (find tweet image)

The phrase stuck around longer than its predecessor, prompt engineering, because it captures the larger context (🤪) that so many developers have been working on for years – including but not limited to:

- **System prompt** — the instructions that define the model's role, behavior, and constraints
- **Conversation history** — what's been said so far in the thread
- **Retrieved information** — documents, database rows, or search results fetched on the fly (RAG)
- **Tool definitions** — descriptions of functions the model can call, including their parameters and what they do
- **Tool results** — the outputs from tools the model has already called in this session
- **Memory** — information persisted from previous sessions and injected back in
- **Few-shot examples** — worked examples that show the model how to behave

Context engineers treat all of these as parts of an intentionally designed information system to find the *smallest possible set of high-signal tokens* that gets you the result you want. 

Striking that balance is the core challenge of a context engineer. You can't just stuff all your product documentation into every call so it has all the information, all the time. That would be expensive and bad.

The key to is to design context like an environment rather than a skeleton. Agents, with their non-deterministic quirks and features, must be able to flow, explore, and respond flexibly to whatever they encounter. In other words, context should guide and shape the agent, not constrain and control it.

![Meme of a pink blob escaping a box](https://i.redd.it/1tbcdsi2lfc71.png)


## Why does context engineering matter so much right now?

Context engineering is a rapidly growing discipline because the quality of any AI product's output depends so much on the quality of its inputs.

1. The bottleneck in building reliable AI products used to be model capability. Not anymore. Models are good! And they just keep getting better. The real bottleneck is in the information environment you build around them.

2. One-shot LLM prompting is just way outperformed by multi-step agents. The popular research benchmark [SWE-bench](https://www.swebench.com/) confirmed this: NUMBERS HERE TODO. Even with the same models, agents that can retrieve, observe, and update context dynamically are just way better, and those need much better context engineering to do that work.

3. As agents take on more complex tasks with more subjective and not-objectievly-measured successes like SOFT SKILL TODO EXAMPLES, context gets super important. It's much easier to design context when pass/fail unit tests tell you a clear answer; it requires much more nuance to define if a generated graphic is tasteful or not. The difference and success criteria lie in the context.


## What's the difference between context engineering and prompt engineering?

Prompt engineering is technically a subset of context engineering. A prompt engineer might tweak the wording of instructions to squeeze better output from a single call, like changing "Review this code" to "You are a senior engineer. Review this code for clarity, correctness, and security." 

Context engineering asks the broader question: what does the model need to know to operate reliably across every call? The prompt is just one part of all possible sources of information the model has access to before it says anything back. A context engineer might architect the same code review system so that before every review, the agent retrieves the last five PRs the developer submitted, the team's style guide, and any open issues related to the file being changed. The prompt itself might stay exactly the same in each turn, but the output improves dramatically because the model is grounded in more relevant inputs.

## What does good context engineering actually look like?

We think about context engineering in three parts. A lot of engineers focus almost entirely on the first since it's the shiniest object of the bunch, but the other two matter just as much (if not more).

**1. Techniques.** The mechanics of managing context at runtime:

- **Just-in-time retrieval** — don't pre-load everything; pull only what's relevant for the current step via RAG
- **Compaction** — when a session runs long, summarize the history and reinitialize with the compressed version; Claude Code does this automatically
- **Structured note-taking** — let the agent write `todo.md` updates and notes to itself, pulling them back into context as needed so it doesn't drift from its goal
- **Leave errors in context** — counterintuitively, keeping failed attempts visible helps the model not repeat them; erasing mistakes removes the evidence it needs to recover
- **Stable prompt prefixes** — don't include timestamps or dynamic values at the top of your system prompt; cache misses are expensive (cached tokens on Claude Sonnet cost $0.30/MTok vs $3.00 uncached — a 10x difference)

Manus, the AI agent platform now part of Meta, put it well: betting on context engineering over model fine-tuning let them ship improvements in hours instead of weeks, and kept their product model-agnostic. If model progress is the rising tide, they want to be the boat — not the pillar stuck to the seabed.

**2. Content.** The techniques only work if the information you're feeding the model is actually good.

This is where a lot of teams get stuck. You can have perfect RAG infrastructure and still get bad outputs if your documentation is contradictory, your examples are stale, or your system prompt assumes knowledge the model doesn't have. 

Our take at PostHog: the real leverage is here. A few things we've found consistently useful:

- **Treat context like code.** Version your prompts. Track changes. Review them like you'd review a PR.
- **Iterate on examples.** Few-shot examples are often the highest-leverage thing you can change. Swap them out and measure the difference.
- **Instrument your pipelines.** Log what context the model actually receives, not just what you intend to send. There's often a gap.

(more stuff from the newsletter will go here, plus a link!)

**3. Evaluation.** The part most teams skip entirely.

Good context engineering is not a one-time design decision. It's an iterative loop. You need to define what good output looks like, measure it consistently, and trace failures back to what was in the context when things went wrong. PostHog is, unsurprisingly, biased toward this: you can't improve what you don't measure. Build evals. Track context quality as a metric. Treat your AI pipeline the same way you'd treat any other piece of software in production.

## Is context engineering the new product engineering?

Product engineers are in a great position to thrive as context engineers since they share similar skillsets: understanding users, knowing what to cut, and communicating actionably. 

After all, if you look at how the best teams use Claude Code, they're not writing better code; they're writing better CLAUDE.md files and spending more time defining the problem rather than touching the actual implementation.

With fewer developers writing code by hand, the roles are likely to overlap in the near future as the work of product engineering shifts from "how to build things" to "what to build".

The difference now is that instead of writing specs for your product team, you're designing context for your agents. And the engineers who build the best AI products will be the ones who know not just _what_ to build, but how to design the right environment for agents to build it.