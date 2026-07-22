---
title: PostHog Desktop
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses (the self-driving story and standard description), see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog makes your product self-driving: agents work off your product's own context (events, errors, session replays) to find real problems, fix them, and open PRs without being prompted. PostHog Desktop is the product editor where you and your team run that loop together, steering a whole fleet of agents at once. Because the context is already there, the PRs are grounded in how your product actually behaves, not the generic slop from an agent that's only seen your code.

## The unique belief (in terms of PostHog Desktop)

Agents write most of the code now, but someone still has to hand them a task. That's what a product editor does, and it only works if it can see your product data.

The old way to build with agents: one engineer, one agent (maybe loads if you're savvy), alone, working locally from whatever's in their head. Desktop is the new way: your whole team steers a fleet of cloud agents from one shared place, and the work comes straight from your real product data (events, errors, replays, and signals that show what's broken or missing).

## Who this is for

The primary audience is AI-pilled software teams at engineering-led companies. Adoption starts bottom-up, the way PostHog always wins: an engineer connects a repo, turns on signals, and the first fixes show up within minutes.

| Persona | Fit | Why |
| --- | --- | --- |
| **Founding team** | Strong | Five people can now cover the product surface of a company 10x their size. The loop lets you keep the founder instinct (fix every papercut today) long after you'd normally have run out of hands. |
| **Startup** | Strong | You've got PMF and a backlog of small fixes nobody has time for. Agents clear it without another hire, and your product data keeps every fix aimed at what users actually hit. |
| **Scaleup** | Strong | Multiple teams already running their own coding agents that share no context. Desktop gives them one shared loop instead of a dozen disconnected ones. |
| **Enterprise** | Good, with caveats | More data, more signal, but also more noise, and a bigger blast radius when an agent ships into a huge multi-team codebase. Add the org politics and it's a harder sell, unless they already act like a compound startup. |

Desktop fits best for teams with a real product and real users (that's the fuel the whole thing runs on). It's built for engineers, but anyone in build mode gets value: PMs, marketers, and pesky execs trying to steer the roadmap.

### Who this isn't for

- Teams who haven't shipped a product to real users. No product data means no signals to act on.
- Non-technical builders without a repo to point at (using Lovable, Replit, and other no-code platforms).

## Messaging

### Message 1: Real usage catches what review can't

**Problem:** Code review catches bugs in the code. It can't catch a change that works exactly as written but makes things worse for real users. That only shows up once real people use it in production.

**Solution:** In PostHog Desktop, agent-shipped changes go out behind a feature flag before they reach everyone. When a change is worth measuring, it's checked against a metric you actually care about, so you find out whether it helped or hurt real users, not just whether it deployed. If the numbers move the right way, it stays. If they don't, the agent fixes it or rolls it back.

**Supporting features:**
- Feature flags wrap agent-shipped changes by default, before they reach everyone
- Experiments measure the change against the metric that matters, not just "did it deploy"
- Scouts watch your product on a schedule and open a PR when they find something worth fixing
- Every fix gets checked against your real events, errors, and session replays, not a hunch

### Message 2: Your product gets better while you're not looking

**Problem:** Every team has a long tail of work that's real but not urgent. Papercuts compete for the same hours as the big bets, and the big bets usually win the argument.

**Solution:** PostHog agents watch that long tail around the clock and turn what they find into shipped fixes. Triage doesn't need a human, so the boring stuff gets handled while you sleep, and the better your instrumentation, the sharper the tasks the agents pick up.

**Supporting features:**
- Handles the long tail of polish (papercuts, small fixes, instrumentation, cleanup, docs, edge cases)
- No prompt required: Signals and Scouts generate reports that turn into PRs
- Frees your best people for the work that needs judgment (architecture, big bets, and the problems only a human notices out in the real world)

### Message 3: Humans and agents building together

**Problem:** Midjourney did $200M in revenue with 40 people. We'll see a lot more of that. Agents cracked the writing-code half. They didn't touch the managing-it-all half. More changes shipped means more surface for the same small team to review, measure, and catch when something goes sideways.

**Solution:** That's the half Desktop is built for. A few people steering a fleet of agents from one shared workspace can outship a team 10x their size, and keep the attention to detail that kind of speed usually kills. It's founder mode that doesn't fall apart as you grow.

**Supporting features:**
- Parallel agent orchestration, multi-model: run several agents at once, each on the model that fits the task
- Channels: a shared space where your team's agent work lives, with memory that sticks around between sessions *(alpha)*
- Canvases: ask for a dashboard, report, or internal tool and get it built on your real data model *(alpha)*
- No markup: you pay the token costs, not a subscription stacked on top

## Battle cards

### vs Claude Code / Codex

**Their approach:** Anthropic's and OpenAI's own coding products, built on the same models Desktop runs on top of. They're both the harness we use and a competitor (they sell a single-player interface around those models).

**Where PostHog wins:**
- Multiplayer: your whole team and their agents share channels and context, not private terminals
- Native product context: work is sourced from and measured against your product data
- Not either/or: Desktop runs the Claude Code and Codex harnesses through one app at usage-based pricing, no per-tool subscription

### vs Devin, Factory, and other scoped AI engineering tools

**Their approach:** An autonomous cloud engineer that takes a task and runs. Strong at unattended work, scoped to the codebase and the task you hand it.

**Where PostHog wins:**
- A product editor you actively steer (plan, review, redirect mid-run)
- Multiplayer by design: a shared team surface, not a single autonomous worker
- Work is grounded in and measured against your product data, then shipped behind a flag
- Usage-based pricing, not a fixed monthly seat

### vs the agentic multiplayer-workspace (Buzz, Capy, PromptQL, Dust)

*This is a new and fast-moving category. Check what each one actually shipped recently before leaning on specifics.*

**Their approach:** A growing set of tools putting agents into a shared, multiplayer workspace, layered on top of your existing data or tools.

**Where PostHog wins:**
- We own the whole stack the agents act on (product data, analytics, flags, experiments, replay) instead of bolting an agent onto someone else's data
- The loop actually closes, because the same platform ships the change and measures whether it worked
- There's no data to integrate and no context to lose in a handoff, because there is no handoff

## Objections

### "Why a new app? Just give me an MCP into my existing setup."

**What they're really saying:** I live in Claude Code or Cursor. My workflow is settled.

**Answer:** Fair, and you can. Our MCP is first-class, and for a lot of teams it's the main way they use PostHog. Inbox and signals live in the web app too, so you don't need Desktop to review work. Desktop is for a different job: running many agents at once, with your teammates, in one place.

### "Why pay usage when my Anthropic subscription is subsidized?"

**What they're really saying:** Inference feels free right now. Anything metered next to a flat, subsidized sub looks expensive.

**Answer:** A lot of the work doesn't need a frontier model. PostHog runs multiple models, including open-source ones that are getting good enough to handle plenty of tasks for a fraction of the price. You're not locked to one subscription that's subsidized today and will probably be repriced tomorrow.

*When they push on bill predictability (a fair worry) point at billing limits and per-tool caps. Don't argue that usage-based pricing is painless; argue it's honest.*

### "Why would I trust PostHog to ship code? You're an analytics company."

**Answer:** Fair question, but you're not betting on PostHog being a great engineer. The code is written by Claude Code and Codex, the same models you'd use anyway. What PostHog adds is the safety net around them: every change ships behind a flag, gets measured against real user behavior, and doesn't reach everyone until the numbers say it's safe. If something regresses, you kill it with a flag, no redeploy or revert. You still review the PRs and set the CI rules the agents follow. That's more scrutiny than most teams put on their hand-written code, and it's exactly how we ship PostHog itself.

### "We already have an established stack. Why consolidate?"

**What they're really saying:** Switching cost is enormous, and "all-in-one" has historically meant "mediocre at everything."

**Answer:** When an agent ships behind a flag, the flag system has to know which sessions saw it, replay has to know which errors those sessions hit, and the experiment has to tie it all back to the same user, automatically, in seconds, or the rollout stalls. Across separate vendors that's glue code you maintain forever, humans copy-pasting between tools, or context falling through the cracks. One system of record is what keeps the loop running at all.

### "I don't trust agents to ship. We review every PR by hand."

**What they're really saying:** The 2030 story is ahead of my org. Don't sell me the destination.

**Answer:** No problem, most teams are here. Our version of the agent loop is worth running because it doesn't rely on autonomy from humans (just autonomy from instruction). You set the bar for which repos to connect, PostHog agents follow your CI rules, and you cap the spend on PR creation.

### "It's still beta, and the multiplayer stuff sounds early."

**What they're really saying:** I don't want to bet a workflow on something half-built.

**Answer:** It's a WIP, and we'd rather say so than oversell. The core coding primitives (tasks, the Command Center, multi-model support, MCP) are solid, and they're what we use to build PostHog Desktop itself. Channels, canvases, and channel memory are in alpha and changing shape weekly.

## Selling to enterprise

PostHog Desktop is usage-based with no per-seat license. You pay for what the agents consume, starting from a free monthly tier ($20). Multi-model support (including open source) means no lock-in to a single provider's roadmap or contract.

The forward-looking pitch: the loop runs on product data, so the companies with the most data can put the most work on autopilot (and steer the rest from one place, as a team).
