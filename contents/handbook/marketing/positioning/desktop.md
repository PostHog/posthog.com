---
title: PostHog Desktop
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses (the self-driving story and standard description), see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog Desktop is a product editor for product builders. Context, knowing what's actually happening in your product, is what separates a fix that works from one that just deploys. That context (analytics, session replay, error tracking, experiments, and feature flags) already lives in PostHog, a layer above the usual devtools, so you and your agents just think about what to ship. Usage data in, pull requests out, with your whole team steering that work together from a multiplayer interface.

## Self-driving, and where Desktop fits (vs web, Slack, and MCP)

The self-driving loop runs anywhere PostHog does, and each interface is a different way to use it. Desktop is the one built for actively building. The other surfaces are for reviewing the loop, or embedding it in tools you already have.

- **PostHog Web** is the full app in your browser: review agent work in the Inbox and query with PostHog AI.
- **PostHog Slack** brings the loop to you: digests, alerts, and quick questions in a thread.
- **PostHog MCP / CLI** pipes PostHog's context into the agent you already use (Claude Code, Cursor).
- **PostHog Desktop** is a workbench for building new features, shipping improvements, and steering agents with your team.

## The unique belief (in terms of PostHog Desktop)

Agents write most of the code now, but someone still has to hand them a task, and review the changes. That's what a product editor does, and it only works if it can see your product data.

The old way to build with agents: one engineer prompting one coding agent (a few if they're savvy), alone, working locally from whatever's in their head. Desktop is the new way: your whole team steers a fleet of agents from one shared space, and context acts as fuel to build better products.

## Who this is for

AI-pilled software teams at engineering-led companies. Adoption starts bottom-up (the way PostHog always wins) with one engineer connecting a repo.

| Persona | Fit | Why |
| --- | --- | --- |
| **Founding team** | Strong | Five people with agents can outship a company 10x their size. The self-driving loop hones the founder instinct (obsess over details), and Desktop gives structure to how small teams collaborate. |
| **Startup** | Strong | They've got PMF and a backlog of small fixes nobody has time for. Agents clear it without another hire, and the self-driving loop gets stronger the more context they generate, since PostHog's own tools instrument that context automatically. |
| **Scaleup** | Strong | The product surface has grown past what any one team can watch closely, and at this revenue scale, a fraction of a percent of conversion or retention is real money. Desktop puts a fleet of agents on that surface continuously and measures every fix against the metric that matters, so small wins compound into real growth. |
| **Enterprise** | Good, with caveats | More data means more signal, but also more noise, and a bigger blast radius when an agent ships into a huge, complex codebase. Add the org politics and it's a harder sell, unless they already act like a compound startup. |

### Who this isn't for

- Teams who haven't shipped a product to real users. No product data means no signals to act on.
- Non-technical builders\* without a repo to point at (using Lovable, Replit, and other no-code platforms).

*\*Desktop is built for engineers, but adoption across a product org is expected: PMs, marketers, pesky execs trying to steer the roadmap, basically anyone in build mode can benefit.*

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

**What they're really saying:** Inference feels free right now, and anything metered next to a flat, subsidized sub looks expensive, especially if the token budget or the procurement process is already tight.

**Answer:** A lot of the work doesn't need a frontier model. PostHog runs multiple models, including open-source ones that are getting good enough to handle plenty of tasks for a fraction of the price. You're not locked to one subscription that's subsidized today and will probably be repriced tomorrow. If budget's genuinely tight, start with one scout or signal source, cap the spend, and expand once it's paying for itself.

*When they push on bill predictability (a fair worry) point at billing limits and per-tool caps. Don't argue that usage-based pricing is painless; argue it's honest.*

### "Why would I trust PostHog to ship code? You're an analytics company."

**Answer:** Fair question, but you're not betting on PostHog being a great engineer. The code is written by Claude Code and Codex, the same models you'd use anyway. What PostHog adds is the safety net around them: every change ships behind a flag, gets measured against real user behavior, and doesn't reach everyone until the numbers say it's safe. If something regresses, you kill it with a flag, no redeploy or revert. You still review the PRs and set the CI rules the agents follow. That's more scrutiny than most teams put on their hand-written code, and it's exactly how we ship PostHog itself.

### "Our codebase is legacy, huge, or on a stack agents don't know well. Will this even work?"

**What they're really saying:** I've seen agents choke on codebases like mine, and I don't want to find out the hard way.

**Answer:** Fair, and it's not one-size-fits-all. Multi-model support means you can point the harder or more unusual parts of your codebase at whichever model handles them best. Start scouts where your data already shows a real problem, since that's usually the highest-value fix, not necessarily the gnarliest legacy code. And you choose which repos to connect, so anything too risky to hand an agent yet just doesn't get connected.

### "We already have an established stack. Why consolidate?"

**What they're really saying:** Switching cost is enormous, and "all-in-one" has historically meant "mediocre at everything."

**Answer:** When an agent ships behind a flag, the flag system has to know which sessions saw it, replay has to know which errors those sessions hit, and the experiment has to tie it all back to the same user, automatically, in seconds, or the rollout stalls. Across separate vendors that's glue code you maintain forever, humans copy-pasting between tools, or context falling through the cracks. One system of record is what keeps the loop running at all.

### "I don't trust agents to ship. We review every PR by hand."

**What they're really saying:** The 2030 story is ahead of my org, whether that's general AI skepticism or just not having the bandwidth to review more PRs right now. Don't sell me the destination.

**Answer:** No problem, most teams are here. Our version of the agent loop is worth running because it doesn't rely on autonomy from humans (just autonomy from instruction). You set the bar for which repos to connect, PostHog agents follow your CI rules, and you cap the spend on PR creation. If review bandwidth is the real constraint, start with scouts and signals as alerts only, no PRs, until you're ready to act on them.

### "It's still beta, and the multiplayer stuff sounds early."

**What they're really saying:** I don't want to bet a workflow on something half-built.

**Answer:** It's a WIP, and we'd rather say so than oversell. The core coding primitives (tasks, the Command Center, multi-model support, MCP) are solid, and they're what we use to build PostHog Desktop itself. Channels, canvases, and channel memory are in alpha and changing shape weekly.

## How to sell it (the ramp)

Don't lead with "self-driving products" as if everyone's ready for it. Most teams need to see concrete value first, then arrive at autonomy as their own idea.

1. **SKU selling:** "Do you want error tracking?" (too basic, nobody's inspired)
2. **Use-case selling:** "I see errors causing drop-off in your replays, here's how to surface them"
3. **Value selling:** "Let's look at your conversion rate and a plan to raise it, with error tracking, replay, and A/B tests working as one thing"
4. **Vision selling:** "Your product can be self-driving, come on this journey with us"

It's a stepped process. You can't jump straight to "stop reviewing your code, AI-slop everything." A sensible ramp: turn on session replay, add Replay Vision, then scouts and signals as alerts only (no PRs yet). That shows value and makes continuing the customer's own idea, so the pain point bubbles up naturally: they'll want to connect their repo themselves.

For a good customer, getting to a meaningful level of autonomy is probably a year-long process. Start where they are:

- **More basic customers:** error tracking and session replay to bubble up basic issues
- **More advanced customers:** scouts slurping data, surfacing PRs and recommendations to act on

### The progression

1. **Identify issues** (error tracking, session replay)
2. **Surface useful patterns** (product analytics, web analytics, AI observability)
3. **Recommend actions** (signals, scouts)
4. **Validate and measure** (feature flags, experiments, PostHog AI to check whether a change worked)
5. **Generate fixes** (self-driving via PostHog Desktop, Slack app, and MCP)
6. **Automate more over time**

Sell concrete value first (Replay Vision, error tracking), then surface self-driving as a signal of AI readiness. That order avoids churn risk from pushing a product that isn't a fit yet.

## Selling to enterprise

PostHog Desktop is usage-based with no per-seat license. You pay for what the agents consume, starting from a free monthly tier ($20). Multi-model support (including open source) means no lock-in to a single provider's roadmap or contract.

The forward-looking pitch: the loop runs on product data, so the companies with the most data can put the most work on autopilot (and steer the rest from one place, as a team).
