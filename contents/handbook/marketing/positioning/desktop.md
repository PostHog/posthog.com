---
title: PostHog Desktop
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog Desktop is a product editor: a desktop app where you, your team, and a fleet of coding agents build your product together.

The same self-driving engine that turns product data into pull requests runs in PostHog web, but Desktop isn't where you watch that work happen; it's where you do it. Think of the web app as the dashboard and Desktop as the driver's seat.

## The unique belief (in terms of PostHog Desktop)

Agents write most of code now. Claude Code and Codex are all excellent at the work, but neither of them can originate it – they need a prompt from a human to turn it into a task. The solution isn't a chat box, and it isn't an IDE. It's a product editor: one that's deeply integrated with your data, and multiplayer (like work actually is).

## Who this is for

The primary audience is AI-pilled software teams at engineering-led companies. Adoption starts bottom-up, the way PostHog always wins: an engineer connects a repo, turns on signals, and the first fixes show up within minutes.

| Persona | Fit | Why |
| --- | --- | --- |
| **Founding team** | Strong | Team size is a worse proxy for fit than it used to be – a five-person founding team can already carry the product surface of a company ten times its size. The loop is what lets that founder-mode instinct (care about every detail, fix it today) scale past the headcount that used to cap it. |
| **Startup** | Strong | PMF and a growing backlog of small fixes nobody has time to get to. A fleet of agents plus the loop clears it without another hire, and product data keeps every fix pointed at what users actually hit. |
| **Scaleup** | Strong | Multiple teams, each already running their own coding agents that don't talk to each other or share any context. PostHog Desktop gives them one shared loop instead of a dozen disconnected ones. |
| **Enterprise** | Good, with caveats | More data means more signal to act on, but also more noise. Agents shipping changes into a very complex codebase spanning many teams is a bigger blast radius to get wrong, with more org-hierarchy friction than a smaller team deals with. Might be a hard sell unless they operate like a compound startup. |

PostHog Desktop fits best for teams with a real product and real users (that's the fuel the whole thing runs on). It's a workbench for engineers, but the benefits extend to other roles in build mode (product managers, marketers, and pesky execs trying to steer the roadmap).

### Who this isn't for

- Teams who haven't shipped a product to real users. Without product data there are no signals to act on.
- Non-technical builders without a repo to point at (using Lovable, Replit, and other no-code platforms).

## Messaging

### Message 1: Real usage catches what review can't

**Problem:** Code review catches wrongness in the syntax, but it can't catch wrongness in *behaviour*. That's because behaviour only shows up in production.

**Solution:** In PostHog Desktop, flags and experiments are how a code change actually earns its spot. When an agent opens a PR, it builds in instrumentation and measures against a real metric you care about. If it works, great. If it doesn't, it fixes it.

**Supporting features:**
- Feature flags wrap agent-shipped changes by default, before they reach everyone
- Experiments measure the change against the metric that matters, not just "did it deploy"
- Scouts watch your product on a schedule and open a PR when they find something worth fixing
- Your events, errors, and session replays are the secret sauce – that's the real data every fix gets checked against

### Message 2: Your product gets better in between the times you look at it

**Problem:** Every team has a long tail of work that's real but not urgent. Papercuts compete for the same hours as the big bets, and the big bets usually win the argument.

**Solution:** PostHog agents watch that long tail continuously and turn what they find into shipped fixes. The dull triage work doesn't need a human, and your product improves while you sleep. Better instrumentation leads to better detection, better detection leads to better tasks, and better tasks lead to clearer data telling you exactly where to spend your own judgment.

**Supporting features:**
- Handles the long tail of polish – papercuts, small fixes, instrumentation, cleanup, docs, edge cases
- No prompt required: Signals and Scouts generate reports which turn into PRs
- Frees your best people for the work that needs judgment – architecture, big bets, and the problems only a human notices out in the real world

### Message 3: Humans and agents building together

**Problem:** Midjourney hit $200M in revenue with 40 people – outsized impact from a tiny team (and we'll see a lot more of this soon). Agents solved the writing-code half, they don't solve the managing-it-all half. More changes means more surface area for the same small team to review, measure, and catch when something goes sideways.

**Solution:** That's the half PostHog Desktop is built for. A handful of people steering a fleet of agents from a shared workspace can outship a team ten times their size, without losing the detail that velocity like that usually costs you. Call it founder mode for your product: the hands-on, fix-it-today instinct that used to only survive at five people, running as the default no matter how big or small your company gets.

**Supporting features:**
- Parallel agent orchestration, multi-model – run several agents at once, each on the model that fits the task
- Channels: a shared space where your team's agent work lives, with memory that sticks around between sessions *(alpha)*
- Canvases: ask for a dashboard, report, or internal tool and get it built on your real data model *(alpha)*
- No markup – you pay the token costs, not a subscription stacked on top

## Battle cards

### vs Claude Code / Codex

**Their approach:** Claude Code and Codex are Anthropic and OpenAI's own coding products, built on the same models PostHog Desktop runs on top of. They're the harness we use and a direct competitor at the same time, since they sell their own single-player interface around those same models.

**Where PostHog wins:**
- Multiplayer: your whole team and their agents share channels and context, not private terminals
- Native product context – work is sourced from and measured against your product data
- Not either/or: PostHog Desktop runs the Claude Code and Codex harnesses through one app at usage-based pricing, no per-tool subscription

### vs Devin, Factory, and other scoped AI engineering tools

**Their approach:** An autonomous cloud engineer that takes a task and runs. Strong at unattended work, scoped to the codebase and the task you hand it.

**Where PostHog wins:**
- A product editor you actively steer (plan, review, redirect mid-run)
- Multiplayer by design: a shared team surface, not a single autonomous worker
- Work is grounded in and measured against your product data, then shipped behind a flag
- Usage-based pricing rather than a fixed monthly seat

### vs the agentic multiplayer-workspace (Buzz, Capy, PromptQL, Dust)

*This is a new and fast-moving category. Check what each one actually shipped recently before leaning on specifics.*

**Their approach:** A growing set of tools putting agents into a shared, multiplayer workspace, layered on top of your existing data or tools.

**Where PostHog wins:**
- We own the whole stack the agents act on – product data, analytics, flags, experiments, replay – rather than bolting an agent onto someone else's data
- The self-driving loop closes because the same platform ships the change and measures whether it worked
- We're not a workspace layered on top of someone else's product data – PostHog is the product data, so there's no integration to build or context to lose in the handoff

## Objections

### "Why a new app? Just give me an MCP into my existing setup."

**What they're really saying:** I live in Claude Code or Cursor. My workflow is settled.

**Answer:** Fair, and you can! Our MCP is a first-class product, and for a lot of teams, it's the main way they use PostHog. The inbox and signals are in the web app too, so reviewing work doesn't require the app either. Desktop exists for a different job: running many agents at once and working on them alongside your teammates in a shared space – shipping, reviewing, and iterating together in a control center. It's a much more intuitive way to build a product than a terminal built for one.

### "Why pay usage when my Anthropic subscription is subsidized?"

**What they're really saying:** Inference feels free right now. Anything metered next to a flat, subsidized sub looks expensive.

**Answer:** You're comparing the cost of generating changes with the cost of knowing whether they worked. Run the logic forward: subsidized inference means you'll run more agents making more changes, which makes verification the growing line item, not the optional one. We also run open source models, which are getting good enough to handle plenty of the work for a fraction of the cost.

*When they push on bill predictability (a fair worry) point at billing limits and per-tool caps. Don't argue that usage-based pricing is painless; argue it's honest.*

### "We already have an established stack. Why consolidate?"

**What they're really saying:** Switching cost is enormous, and "all-in-one" has historically meant "mediocre at everything."

**Answer:** When an agent ships a change behind a flag, the flag system needs to know which sessions saw it, replay needs to know which errors those sessions hit, and the experiment needs to tie all three back to the same user, automatically, within moments, or the rollout can't proceed. Across vendors that's either glue code you write and maintain, humans acting as APIs, or precious context falling through the cracks. One system of record isn't a procurement preference anymore, it's what keeps the agent loop, well, looping.

### "I don't trust agents to ship. We review every PR by hand."

**What they're really saying:** The 2030 story is ahead of my org. Don't sell me the destination.

**Answer:** No problem – most teams are here. Our version of the agent loop is worth running because it doesn't rely on autonomy from humans (just autonomy from instruction). You set the bar for which repos to connect, PostHog agents follow your CI rules, and you cap the spend on PR creation.

### "It's still beta, and the multiplayer stuff sounds early."

**What they're really saying:** I don't want to bet a workflow on something half-built.

**Answer:** It's a WIP, and we'd rather say so than oversell. The core coding primitives (tasks, the Command Center, multi-model support, MCP) is solid, and it's what we use to build PostHog every day. Channels, canvases, and channel memory are alpha and changing weekly. If you need a locked-down, GA-only tool today, wait. If you want a say in where multiplayer agent development goes, hop in.

## Selling to enterprise

PostHog Desktop is usage-based with no per-seat license. You pay for what the agents consume, starting from a free monthly tier ($20). Multi-model support (including open source) means no lock-in to a single provider's roadmap or contract.

The forward-looking pitch: the self-driving loop runs on product data, so established companies with lots data are the ones who can put the most work on autopilot (and steer the rest from one place, as a team).
