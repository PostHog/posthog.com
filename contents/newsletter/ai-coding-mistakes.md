---
title: 7 mistakes to avoid when coding with AI
date: 2025-09-16
author:
 - ian-vanagas
tags:
 - AI
---

Our team is still out on whether AI code editors like Cursor, Copilot, and Claude Code actually make us better. Some find autocomplete great, but need to rip out anything beyond that. Others find they are a huge speedup, but only in specific circumstances.

Either way, power users and skeptics agree there are a ton of pitfalls to avoid if you want to use AI well.

As our team has been power users for a while, and we take these tools seriously (we just raised the budget limit for AI tools to $300 per month), we’ve uncovered our fair share of mistakes to avoid and we’re sharing them here to help you avoid them too.

## 1. Forgetting about customers

Because AI tools make code so easy to write, it can be easy to forget the reason you’re writing it. Twitter is filled with AI coding examples that have zero practical application.

![Don't forget about customers](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_09_10_at_10_44_262x_56eaadcb57.png)

Just because you can build something cool with AI doesn’t mean you should. When it becomes easier to write code and ship features, [choosing what features you ship](/newsletter/how-we-decide-what-to-build) becomes much more important.

Doing this well means maintaining a connection to your users. Define an ICP, talk to users, ask for feedback, back decisions with context from users. 

This isn’t to say AI can’t help you with this. Much of our team relies on Granola for meeting notes and BuildBetter for user interviews. This helps future product decisions get backed up by real user experiences.

For example, in a research sprint on session replay filters, Annika recorded five interviews using BuildBetter. She could then more easily break down each’s use cases, filter and playlist feedback, broader replay experience, and more. The summary and takeaways could then be backed up by direct quotes and references in context. 

This was all possible without AI, but made a lot faster with it, helping the team get to a better decision about what to build, faster. 

## 2. Not using AI (at least a little bit)

As much as you might dislike AI personally, it is a mistake to not use it for two reasons *unrelated to you*:

1. **Your competitors are using AI.** Customers will be comparing your product to AI-powered alternatives. The engineers of (good) competitors will also be trying to use AI to out ship you, so you better be confident your way is the right one.

2. **Your users are almost certainly using it.** They have AI in their workflows. Some of them will be trying to fit what you’ve built into those workflows. Especially if you are building for developers, you won’t understand the full experience of using AI in software development if you don’t try it. 

In both these cases, knowing the capabilities and limits of AI is helpful, and using AI is one of the best ways to do this. This means coding with AI can provide huge benefits even if you use none of the code it writes.

## 3. Treating your big codebase like a small codebase

Like many companies, we have quite a large codebase, 8,984 files and 1,623,533 lines of code, to be exact.

So much AI coding advice out there is written for the opposite situation to this. It’s for new developers vibe coding from zero to one rather than making use of AI in a larger, existing codebase. Treating both as the same is a mistake. 

![Treating your big codebase like a small codebase](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_09_10_at_11_37_522x_2f8d372950.png)

There are many ways being thoughtful about using AI is more important in a larger codebase though:

- Less of your app fits into the AI tool’s context windows. You need to be much more careful about what goes into the context window. This is true of both coding and [building AI-powered features](/newsletter/building-ai-features).
- AI can go and make changes to parts of your apps you don’t expect. Radically changing the UI might be fine in a small prototype but it can ruin a lot of things in a big app like ours.
- Related, tests increase in importance as they help protect against AI making changes with unintended consequences. Luckily, this is one area AI is pretty good at.
- Be specific with your prompts. In a larger codebase, individual files and features can take over your context window. Vaguely asking “make it better” will leave the agent confused and ineffective.

As one of our product engineers, Paul, said in [his blog on how he uses LLMs](https://pauldambra.dev/2025/07/how-i-use-llms.html):

> They're not actually very good software engineers… particularly since most of the data they've ingested about software engineering is "blogs on how to start something from scratch". So, if that's not the task. Then I find it often harder to prompt an LLM to do than to do it myself

## 4. Not having rules and guardrails

> DO NOT GIVE ME HIGH LEVEL SHIT, IF I ASK FOR FIX OR EXPLANATION, I WANT ACTUAL CODE OR EXPLANATION! I DON'T WANT "Here's how you can blablabla" - `posthog/.cursorrules`

As LLMs are non-deterministic, they can go off the rails in a lot of ways. To prevent this, you need guardrails to keep them on track. 

Our [AI install wizard](/blog/envoy-wizard-llm-agent) is basically a big scaffold to do just this. Users could ask AI to install PostHog for them, but would quickly run into problems like out-of-date patterns, hallucinated API keys, and phantom libraries. The wizard prevents all of this thanks to the guardrails it provides.

More examples of rules and guardrails we rely on include:

- `.cursor/rules`. Have different rule files for different languages (we have [Django/Python](https://github.com/PostHog/posthog/blob/master/.cursor/rules/django-python.mdc), [React/Typescript](https://github.com/PostHog/posthog/blob/master/.cursor/rules/react-typescript.mdc), and [Rust](https://github.com/PostHog/posthog/blob/master/.cursor/rules/rust.mdc)). Include principles, project structure, dependencies, best practices, naming conventions, logging, testing, and security details.
- Reference examples of code already written whenever possible such as pre-built UI components, database schema, optimized database queries, testing patterns, and [opinionated state management](https://keajs.org/).

- `claude.md`. A lot of what to include here overlaps with `.cursor/rules` but having clear spec of what you want to do matters a lot more as well as commands Claude can use for tests, linting, and building. [See ours here](https://github.com/PostHog/posthog/blob/e945beb317fc9d1a2830be758534881a9e81be29/CLAUDE.md?plain=1#L4).

- [Subagents for Claude](https://github.com/PostHog/posthog/tree/master/.claude/agents) to help with specific tasks like [code reviews](https://github.com/PostHog/posthog/blob/master/.claude/agents/code-reviewer.md), [systematic debugging](https://github.com/PostHog/posthog/blob/master/.claude/agents/systematic-debugger.md), [test writing](https://github.com/PostHog/posthog/blob/master/.claude/agents/test-writer.md), and [prompt engineering](https://github.com/PostHog/posthog/blob/master/.claude/agents/prompt-engineer.md).

- Greptile to review pull requests, which occasionally catches errors before we merge.

Developers have also developed a whole set of non-AI tools built for preventing mistakes and issues. These work just as well (if not better) with AI and often, upgrades to these tools have a bigger impact on developer productivity than AI tools do. Examples include:

- Ruff, Oxlint, mypy, Prettier, and more for linting, formatting, and type checking.
- Jest, Playwright, pytest for testing.
- Type hinting required in both Python and Typescript.
- IDE tooling like PyCharm, JetBrains’ testing suite and IntelliJ.
- Having style guides and coding standards.

Of course developers, especially product engineers, were already relying on tools like these prior to AI. It is just that AI has made these deterministic checks and guardrails even more important, and this isn’t expected to slow down. As [Gergely from Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/software-engineering-with-llms-in-2025) says:

> **Google is preparing for 10x more code to be shipped.** A former Google Site Reliability Engineer (SRE) told me:
> “What I’m hearing from SRE friends is that they are preparing for 10x the lines of code making their way into production.”
> If any company has data on the likely impact of AI tools, it’s Google. 10x as much code generated will likely also mean 10x more:
> - Code review
> - Deployments
> - Feature flags
> - Source control footprint
> - … and, perhaps, even bugs and outages, if not handled with care

## 5. Trying to use AI on something you know it’s not good at

> Claude Code writing Rust is a `while` loop that accelerates climate change - [Nick Best](/community/profiles/33511), product engineer, Team Ingestion

Using AI most effectively requires piling up a collection of examples of situations where AI is and isn’t useful. You can waste a lot of time and energy repeatedly asking it to do something you know it can’t do. 

A helpful way to remember all of this is anthropomorphizing your AI assistant like it’s a coworker. Some call AI “an army of interns” while [Birgitta Böckeler](https://martinfowler.com/articles/exploring-gen-ai/08-how-to-tackle-unreliability.html) settles on giving it the specific characteristics of being “eager, stubborn, well-read, inexperienced, and won’t admit when they don’t “know” something.” You can think of anthropomorphizing your AI as the AI age’s version of rubberducking.

Once you’ve got your anthropomorphized AI, you can get specific with the situations it excels at. For our team, these include:

- Autocomplete. Everyone loves hitting tab repeatedly to get their work done.
- Adding more versions of tests and fixing them.
- Using it as a rubber duck. Asking deep questions, learning more about the codebase and context. It’s easier to understand any file or function with an LLM in hand.
- Doing research. This is not necessarily a coding-related task but something engineers still need to do for you. No more Googling for StackOverflow answers.
- Learning the patterns of [what AI is good at](/building-ai-features) is helpful too.

On the other side, our team finds AI sucks at:

- Writing code in a language it is unfamiliar with, like our internal version of SQL, HogQL.
- It hallucinates methods, classes, libraries and assumes the function of them based on their name (rather than their contents).
- It uses deprecated APIs.
- Writing tests from scratch. Paul says there are so many bad examples of tests out there that LLMs often churn out the same.
- Specifically for AI IDEs, a replacement for Google Search.

Identifying what AI is and isn’t good at also helps you at a meta level. It stops you from falling into the pitfall of just doing things that are easy and can be done with AI.

Because doing things with AI is easy, you’ll be drawn towards them. You might neglect harder to accomplish tasks, but it is essential to keep doing these more difficult tasks. 

## 6. Being content with your existing workflow

A personality trait of a great product engineer is that they are always experimenting. When it comes to AI tools, this is no different. 

Our team is always testing (and talking about) new tools and approaches. There have been 1,104 messages with the word “Cursor” in our Slack, 187 with “Claude Code.” This started early and is led by our cofounders. 

James is an avid vibe coder, building the prototype of our job board on a flight while Tim is a real developer™ and regularly contributes mild to hot takes on AI workflows:

![Tim](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_09_11_at_11_39_122x_52c038c3e7.png)

What are some specific ways we aim to improve our workflows?

- Raising our AI tool budget to $300. This enables people to try Claude Max and other top tier models.
    
    ![Budget](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2025_09_11_at_15_29_522x_cc1f3faaf1.png)
    
- Testing different tools, agents, and frameworks like [Claude Squad](https://posthog.slack.com/archives/C02EJABQ39R/p1751360779557799) (which didn’t work), Git worktrees, Traycer, Relace, Robusta, and more.

- Trying different models with the same tools to figure out which models are good at what. For example, a lot of our engineers find switching to Opus extremely beneficial (over Sonnet) and have tested out QWEN in Cursor.

- Building and dogfooding our own AI engineering tools like Max AI, the PostHog MCP, and LLM analytics. This also means we talk to a lot of teams on the cutting edge of AI engineering like [Lovable](/customers/lovable) and [ElevenLabs](/customers/elevenlabs).

- Nearly every hackathon has had AI-related projects being built in it. This gives more of the team opportunities to explore new tools and understand what AI is good/not good at.

At a more granular level, great engineers are experimenting with different prompts and references. They are constantly judging the output of these to create the ideal workflow that works for them (this never ends).

## 7. Letting AI do everything for you

Because AI can seemingly do anything you ask of it, it is tempting to let it do everything. For example, we’re seeing an increasing number of people use AI tools in live job interviews (yes, we can tell and we’ll fail you if you do it).

Ultimately, you are responsible for the end product of what you create. This is true whether you use AI or not. For nearly all work, using AI exclusively is probably a bad idea. As I’ve said before, you can’t one shot your way to a billion dollars. 

AI is reshaping software. As model capacities and adoption increase, more and more of software (and software development) will be reshaped. What’s important as an individual isn’t using AI for the sake of it, but, like everything else, fitting it into how you work. 

Getting big architecture decisions right, figuring out what to build, positioning correctly, and choosing the right tools will all remain important, but it will remain up to you to figure these out, with or without AI. If you do choose to use AI, avoiding the mistakes here will help improve your odds that you’re successful.