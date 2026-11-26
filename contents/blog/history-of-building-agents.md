---
title: "A brief history of building agents, told in deleted code"
date: 2026-11-25
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/two_years_of_rebuilding_posthog_ai_17562cb000.png
featuredImageType: full
author:
    - cleo-lant
category: Engineering
tags:
    - AI
    - Engineering
seo:
    metaTitle: "A brief history of building agents, told in deleted code"
    metaDescription: "What two years of rebuilding an AI agent taught us about B2B SaaS."
---

Over two years, PostHog AI went from 42,000 lines of Python to a 10 KB prompt. The (fifth) version we just shipped is what we would have built first if we knew what we know now.

The nice thing about being open source is that every version still lives in our public [repos](https://github.com/posthog/posthog). You're welcome to dig through the git history yourself, or you could just read this. It has a plot.

Don't care about history? Jump straight into the good stuff: [what's new in PostHog AI →](#now-whats-actually-new-for-you)

![The five versions of PostHog AI, from a single chat box in 2024 to a rented coding agent in 2026](https://res.cloudinary.com/dmukukwp6/image/upload/five_versions_e6118884aa.png)

> _Note: Ian counted [three harnesses in a year](/newsletter/building-ai-agents). I'm counting from the first chat box, before there was a loop at all._

## It all started at a hackathon (2024)

PostHog AI was born at a [hackathon](/newsletter/hackathons) in August 2024, as a simple chat box that [turned your question into a trends chart](https://github.com/PostHog/posthog/pull/24463). It made a single call to GPT-4o, which was only [four months old](https://openai.com/index/hello-gpt-4o/) at the time. The system prompt told the model it was both a head of product growth and a top-tier data engineer (no pressure). Then it pasted in every event and property in the project and forced the answer into our query format.

Seven weeks later, we [split the job in two](https://github.com/PostHog/posthog/pull/25484) with LangGraph, which is basically a flowchart of AI steps. A planner used tools to look up the project's events and properties, then a second step wrote the query. [Funnels soon got their own branch](https://github.com/PostHog/posthog/pull/25987), plus a small router to pick between the two. Every new kind of question meant building new nodes (more on that later).

Most of the early bugs weren't the model's fault, they were plumbing. Streaming broke twice in one month, mostly because Django and our infra weren't built for it. The first time, answers started so slowly that our web server [gave up and killed the connection](https://github.com/PostHog/posthog/pull/25826). The second time, we'd just [moved to async serving](https://github.com/PostHog/posthog/pull/26374).

In December 2024, PostHog AI [learned to ask a clarifying question](https://github.com/PostHog/posthog/pull/26767) when your event names didn't make the answer obvious. This meant, for the first time, it had to keep a conversation around between messages so we started saving chats in Postgres, but soon had to [fix it so they actually loaded back](https://github.com/PostHog/posthog/pull/27048). In January 2025, it got a longer memory too: a [running note about your company](https://github.com/PostHog/posthog/pull/27270) that it researched from the web, checked with you, and kept updating across chats.

Every one of these features added more boxes to the flowchart. It was getting too damn big, so in February, we started taking it apart.

## Enter the "boss agent" (Early 2025)

In a flowchart, you decide every step in advance. In a loop, the model decides the steps itself: it picks a tool, reads the result, and keeps going until it's done. That's what turned PostHog AI into a proper agent, and it meant we could stop drawing new boxes for every new kind of question.

The first loop had [a boss called "Root"](https://github.com/PostHog/posthog/pull/28154). Root handed each question to a specialist sub-agent, but since it couldn't see what the sub-agent did, context got lost at every handoff (the [black box problem](/newsletter/building-ai-agents#2-your-harness-is-not-your-moat)). Sub-agents sometimes made up data, and some questions got stuck in infinite loops.

By spring, teams across PostHog were each building their own AI features, with their own tuned prompts and tools that called their product's API. That meant a lot of teams building small agents in parallel, so the AI team [shipped MaxTool](https://github.com/PostHog/posthog/pull/30027), then [opened it up](https://github.com/PostHog/posthog/pull/30705) so any team could plug its tools into PostHog AI instead.

Then we fiddled with everything around the model:

- **Temperature**, the dial for how random answers are. We turned it from 0.7 down to 0, where every rerun gave nearly the same answer, then [settled on 0.3](https://github.com/PostHog/posthog/pull/32150).
- **GPT-4, by accident.** An engineer's autocomplete filled in the wrong model name, and PostHog AI ran on GPT-4 instead of GPT-4o for nine days. (oops).
- **GPT-4o got pulled from SQL generation.** [The PR's diagnosis](https://github.com/PostHog/posthog/pull/34185): "it's not so much a prompting or error handling issue, as `gpt-4o` being too dumb."
- **Clarifying questions** got flaky once Root arrived, because [Root's replies confused the sub-agent](https://github.com/PostHog/posthog/pull/28678) asking them.
- **Evals** [started on deepeval](https://github.com/PostHog/posthog/pull/26179), then [moved to Braintrust](https://github.com/PostHog/posthog/pull/31686). Running them on every PR got pricey, so we [cut them back](https://github.com/PostHog/posthog/pull/37165) to save some benjamins.

While we were busy tweaking, the frontier labs were moving faster than our graphs. Models that think before answering got cheap with [o4-mini in April 2025](https://openai.com/index/introducing-o3-and-o4-mini/), and models got reliable at using tools with [Claude 4 in May](https://www.anthropic.com/news/claude-4). As Ian wrote in [38 things we've learned about building AI products](/newsletter/building-ai-products), those two releases are what convinced us to restructure PostHog AI. That same month, we also started [our own MCP server](/mcp), which turned out to matter a lot later.

In July, we [moved chat out of the web request and into Temporal](https://github.com/PostHog/posthog/pull/34607), a workflow engine, with replies streamed through Redis. Before, closing the tab or losing wifi killed the answer halfway through. Now the agent kept working in the background, and picked the reply back up when you came back.

## Bye bye boss, hello loop (Late 2025)

By then, Claude Code had shown how much a single loop could do on its own (with no boss and no sub-agents). It was clear where the frontier labs were heading: models that work as agents by themselves, so the team decided specialists no longer made sense.

Anthropic shipped Claude Sonnet 4.5 and the Claude Agent SDK [in September 2025](https://www.anthropic.com/news/claude-sonnet-4-5). The following month, we collapsed PostHog AI into one simple loop, modeled on Claude Code. It called the model, ran whatever tool it picked, and repeated. It took two tries btw. We [merged it](https://github.com/PostHog/posthog/pull/38527), reverted it the same day, and [relanded it](https://github.com/PostHog/posthog/pull/39717) two days later. The same PR switched the main model from gpt-4.1 to Claude Sonnet 4.5.

The single loop was a big step up. With [no sub-agents](/blog/8-learnings-from-1-year-of-agents-posthog-ai), nothing got lost in a handoff. A month later, PostHog AI went GA, and we explained [why we retired Max](/blog/why-we-killed-our-ai-product-assistant), our beloved hedgehog mascot, as the face of our AI.

The new snag was tools. PostHog has 20+ products, lots of jobs to be done, and far too many tools to hand a model all at once. Our solution was to [give the loop "modes"](https://github.com/PostHog/posthog/pull/41284), which kept it focused on one set of capabilities at a time. There were [modes](https://github.com/PostHog/posthog/tree/master/ee/hogai/core/agent_modes) for product analytics, SQL, session replay, error tracking, feature flags, surveys and more. They worked well, just not cheaply.

The real limit was tools. The agent could only do what someone had written a tool for, and writing one meant learning how PostHog AI worked first. Most product teams didn't have time for that, so across 20+ products there were just 44 tools (today there are over 1,200). Our MCP server had the same problem, since its tools were written by hand too.

Then, in November 2025, Anthropic released [tool search](https://www.anthropic.com/engineering/advanced-tool-use), which lets an agent look up tools as it needs them instead of loading them all at once. Suddenly, thousands of tools weren't a problem. We just needed a way to make them without anyone writing them by hand.

So we built two pipelines. One [turns the API endpoints teams already ship into MCP tools](https://github.com/PostHog/posthog/pull/47859). The other [packages skills](https://github.com/PostHog/posthog/pull/47218) (how-to files for common jobs) into [plugins any agent can install](https://github.com/PostHog/ai-plugin). We didn't need a PostHog AI specific team anymore. Every product team builds PostHog's AI now, mostly just by shipping their APIs.

## Finally, we rented a coding agent instead of building one (2026)

Up to this point, we'd been rebuilding PostHog AI one plank at a time (a bit like the ship of Theseus). Meanwhile, a team next door had built a whole second ship.

[That ship](/newsletter/find-pmf-again) was called Array, then twig, then PostHog Desktop. It [ran Claude Code](https://github.com/PostHog/posthog/pull/35401) (later Codex and our own harness too) in [throwaway sandboxes](https://github.com/PostHog/posthog/pull/39082).

We ran a lot of experiments to see whether PostHog AI should move onto it. Coding agents turned out to be great at data analysis, and they handled things we'd been fixing by hand. They compact long conversations on their own, and when a query returns too much data, they save it to a file instead of cramming it into context.

Anthropic had also shown, with [Skills](https://www.anthropic.com/news/skills) and [code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp), that agents work better when they load tools and instructions only when they need them, which is how coding agents already work. Building our own coding agent would have been a pain, and renting one meant the big labs did the heavy lifting on the loop.

The trade-off is that you can't change a rented loop, so the only way to bring PostHog into it is through MCP. That's why the MCP server had to get good first. So in the summer of 2026, we [moved PostHog AI onto the same runtime as Desktop](https://github.com/PostHog/posthog/pull/65164) and stopped writing our own loop.

That's the version you're getting now btw. It took a while to get ready, so we kept the old one running in the meantime. You can even see the handoff in our commits: by July 2026, more work was going into the new PostHog AI than the old one.

![Monthly commits to the old PostHog AI and the new one, with the new one taking over by July 2026](https://res.cloudinary.com/dmukukwp6/image/upload/chart_2_commits_old_vs_new_2cd7ca0e7d.png)

Moving over wasn't smooth. For every good call we made, we made a few wrong guesses:

- **We thought the new agent should start somewhere else.** We gave the new agent to our other products first. Desktop, the Slack app, and Self-driving all had it before PostHog AI's own chat did, so PostHog AI users waited longer than they should have.
- **We thought the migration would be quick.** It took much longer than expected. The new agent had to support two harnesses (Claude Code and Codex), 1,200+ tools and a better UI, plus fraud prevention, because sandboxes are easy to abuse without prepaid credits.
- **We thought sandboxes would be the easy part.** They're hard, but manageable. If we did it again, we'd start sandboxes on demand, like ChatGPT Work does.
- **We thought agents would use the tools we spent longest on.** Across 63 million calls to our MCP server, a quarter are raw SQL. The trends, funnels and retention tools our old graph was built around get 3% (see more in [how AI agents behave](/blog/how-ai-agents-behave)).

It also meant throwing a lot of our own work away. The tools went first. Our MCP server (which lets any agent use PostHog) had one tool per API action, enough to [dump a 270-tool catalog on the agent](https://github.com/PostHog/posthog/pull/56644). Now the agent sees one tool, exec, and uses it to find and run the rest.

Then our agent code went. The old agent was about [42,000 lines of Python](https://github.com/PostHog/posthog/tree/master/ee/hogai), not counting tests. In the new one, PostHog's part is [one file](https://github.com/PostHog/posthog/blob/master/products/posthog_ai/backend/services/system_prompt/prompt.py), under 10 KB, appended to Claude Code's own [system prompt](https://github.com/PostHog/posthog/blob/master/products/posthog_ai/backend/services/system_prompt/service.py).

The funny thing is, for a few months, the agent never actually got that file. Two bugs were to blame. [One kept it from loading](https://github.com/PostHog/posthog/pull/96810), and [a second stripped it out in production](https://github.com/PostHog/posthog/pull/98329), even though the unit tests passed. Nothing errored, and without the file, the agent just guessed which tools to use from their descriptions. Its answers looked fine, so we only caught it in September, when a batch of evals flagged it (it's a good case for Jina's advice to [test your context like it's code](/newsletter/fix-your-agents)).

So what does the file actually say? It tells the agent that Claude Code's instructions "remain fully in force." In other words: you work at PostHog now.

![The size of PostHog's agent code over time, from about 42,000 lines of Python down to one prompt file under 10 KB](https://res.cloudinary.com/dmukukwp6/image/upload/chart_1_agent_code_size_74e193629e.png)

## (Now) What's actually new for you?

If you've used the PostHog Slack app in the last few months, you've already met the new PostHog AI. It doesn't have a backend of its own. It [talks to PostHog through our MCP server](https://github.com/PostHog/posthog/pull/64293), the same one your agent can use, so anything we build for our agent works for yours too. That's the first [golden rule of agent-first product engineering](/newsletter/agent-first-product-engineering): let agents do everything users can.

It's also what runs [Self-driving](/docs/self-driving). Scouts keep an eye on your product data, group what they find into reports, and agents open pull requests to fix things. Basically, PostHog AI gets on with it without you having to ask.

Five rebuilds of plumbing were fun for us, but here's what you actually get:

- **All of PostHog.** The agent can use every one of the 1,200+ tools on our MCP server. Because it can write SQL and code in its sandbox, it can take on the big jobs too, like digging through gigabytes of usage data.
- **Much better SQL.** A quarter of all calls to our MCP server are raw SQL, so we rewrote the agent's SQL guidance from scratch. It writes far better queries than the old agent did, and it understands your semantic layer.
- **A skills store.** Teach PostHog AI how your team does things, then share those skills with your colleagues, in PostHog AI or through our MCP server.
- **An MCP store.** Hook up your other tools' MCP servers, and PostHog AI can work across them too.
- **It writes code.** Ask it to instrument an event or set up an experiment, and it opens a pull request in your repo.
- **Any model, any time.** Claude Sonnet 5.5 is the default, but you can switch to Opus, Fable or OpenAI's GPT models, even halfway through a conversation. We're not model-monogamous, so why should you be?
- **Your own subscription.** Already paying for ChatGPT? Sign in and PostHog AI runs Codex on your plan. Claude is on the way, don't you worry.
- **Plan mode.** By default, it gets stuck in straight away, but it still checks with you before changing live data. For bigger jobs, use Plan mode to agree on the approach first.

There's plenty of smaller stuff too. A Faster/Smarter slider lets you choose how hard it thinks, so you can slide left for a quick count of yesterday's signups and right for a proper look at a retention drop. (The slider literally says $$$, so the bill won't come as a shock.) You can pull an insight, dashboard, notebook, event or error into the chat with @. And there are a few slash commands, like `/btw` for a side question, `/usage` to see what a run has cost, and `/ticket` to open a support ticket.

## Try it

If you already use PostHog AI, you don't need to do anything, because you're on the new version. To get the most out of it, connect your GitHub repo so it can write code and open pull requests, not just answer questions.

If you tried it a while back and weren't impressed, fair enough, and we'd love you to give it another go. It's a very different agent now. If it still isn't smart enough for the job, pick a bigger model or push the slider towards $$$.

And if you've never tried it, lucky you. Open PostHog, follow the [start guide](/docs/posthog-ai/start-here), and ask it something you'd normally write SQL for. For anything bigger, start in Plan mode so you can see the plan before anything runs.

Rather use your own agent? Plug in the [PostHog MCP server](/docs/model-context-protocol) instead.

## FAQ

**How much does PostHog AI cost?**

You pay in AI credits as you use it: 100 credits is $1, and every organization gets 500 free credits ($5) each month. We charge what the model provider charges us, plus 20%. The [PostHog AI pricing docs](/docs/posthog-ai/pricing) have the details.

**Do I pay for the cloud sandbox too?**

Yes, from [start date]. The new PostHog AI works in a cloud sandbox, which is what lets it run code, change files and open pull requests. Sandbox time is billed in the same AI credits, at the same rates as [PostHog Desktop](/desktop), with no markup.

**How do I stop it from running up a bill?**

Tokens and sandbox time share one meter and one billing limit. Every organization starts with a $150 limit, and you can [set your own](/docs/posthog-ai/pricing#control-your-ai-credit-spend) and turn on usage alerts. If you hit it, AI features pause until your billing reset next period.

**Which model does it use?**

Claude Sonnet 5.5 at high effort, unless you pick something else. You can switch to Claude Opus or Fable, or OpenAI's GPT models, and change your mind halfway through a conversation. The model picker opens on a Faster/Smarter slider: Faster ($) is quicker and cheaper, Smarter ($$$) thinks harder and costs more. Either way, you pay what the provider charges plus 20%.

**Why use PostHog AI instead of Claude or ChatGPT?**

Because it works right where your data, your team, and your work already are. It sees the page you're on, remembers your product between chats, and keeps working in Slack and Self-driving when nobody's asked it to. It isn't tied to one lab either. It runs on Claude Code or Codex, with Claude, GPT, or open weight models, so you can pick whichever is best for the job.

**Can I use my own agent instead?**

Yes. Connect Claude Code, Cursor, Codex or any other MCP client to the [PostHog MCP server](/docs/model-context-protocol/faq). Connecting and calling tools is free, though a few tools use LLMs themselves and spend PostHog AI credits.
