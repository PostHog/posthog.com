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
- **PostHog MCP & PostHog CLI** pipes PostHog's context into the agent you already use (Claude Code, Cursor).
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

### Message 1: Ship like a team 10x your size

**Problem:** Midjourney hit $200M in revenue with 40 people. Coding agents make that kind of leverage possible, but only up to a point: one person can only track so many agents at once, and when everyone on the team runs their own separately, none of that work compounds.

**Solution:** Desktop puts a fleet of agents in one shared workspace, so a few people can track and steer all of it together. That's how a small team outships one 10x its size, without losing the attention to detail that speed usually costs.

**Supporting features:**
- Command Center: run multiple agents at once, each on its own task, local, in a worktree, or in the cloud
- Multi-model: pick Claude Code or Codex, plus the model and reasoning effort, per task
- Channels: a shared space for a team's agent work, with memory that persists across sessions *(alpha)*
- Canvases: generate a dashboard, report, or internal tool from your real data model *(alpha)*

### Message 2: Agents check their own work

**Problem:** Agents are shipping far more changes than your team used to. Code review can tell you the diff looks right, but not whether the change did something meaningful (and no one has time to set that up for every agent PR).

**Solution:** In PostHog Desktop, agents don't just write the fix, they flag it and measure it too. When a change is worth verifying, it ships behind a feature flag and gets checked against a metric you care about before it rolls out any further.

**Supporting features:**
- Feature flags: agents wrap riskier changes in a flag before rolling them out
- Experiments: agents scaffold an A/B test tied to a metric
- Track events: agents instrument the events needed to measure whether a change worked
- Track errors: agents capture exceptions and stack traces to catch regressions fast

### Message 3: Your product gets better while you're not looking

**Problem:** Every team has a backlog of small, real bugs that's been sitting for months. None of them are ever quite bad enough to bump the sprint, so they don't get fixed.

**Solution:** PostHog agents work that backlog continuously, so it gets cleared without pulling anyone off what they're already doing. They watch for it, triage it, and ship the fix. No human has to notice the problem first.

**Supporting features:** (this watch-and-triage loop is self-driving; the [Inbox](/handbook/marketing/positioning/inbox) is its billable tool, it lives in the app and pipes to Slack, and Desktop is where you act on what it finds)
- Scouts run on a schedule and open a PR when they find something worth fixing, no prompt required
- Signal sources draw from errors, support tickets, session replays, GitHub issues, Linear, and Zendesk
- The Inbox ranks incoming reports and PRs by importance and impact
- Outcome-based pricing: a flat $15 per pull request, with your first three each month free, reports always free, and a default $150 billing limit

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

**Answer:** Our MCP is awesome, and for a lot of teams it's the main way they use PostHog. But a terminal only shows you one agent at a time, so if you're running more than a couple of tasks, or want your team to see what's in flight without a status update, MCP might limit you.

### "Why pay usage when my Anthropic subscription is subsidized?"

**What they're really saying:** Inference feels free right now, and anything metered next to a flat, subsidized sub looks expensive (especially if the token budget is tight or the procurement process is slow).

**Answer:** A lot of the work you're doing doesn't need a frontier model. PostHog runs multiple models, including open-source ones that are getting good enough to handle plenty of tasks for a fraction of the price. You're not locked to one subscription that's subsidized today and will probably be repriced tomorrow. If budget's genuinely tight, start with one task or one repo connected, cap the spend, and expand once it's paying for itself.

### "Why would I trust PostHog to ship code? You started as an analytics tool."

**Answer:** The code is written by the same models you'd use anyway. What PostHog adds is everything around it: error tracking to catch regressions, session replay to see exactly what happened, experiments to prove a change is a net positive, flags to control the rollout, plus the memory, context, and data agents need to build the next change with less prompting.

### "Our codebase is legacy, huge, or on a stack agents don't know well. Will this even work?"

**What they're really saying:** I've seen agents choke on repos like mine.

**Answer:** Honestly, worry less than you think. Models have gotten very good at working in legacy and unusual codebases, and if part of yours is still tougher, multi-model support means you can point it at whichever model handles it best. And worst case, it's just code: you review the PR before it merges, and if something still gets through, you flag it off or revert. Nothing here is one-way.

### "I don't trust agents to ship. We review every PR by hand."

**What they're really saying:** The 2030 story is ahead of my org, whether that's general AI skepticism or just not having the bandwidth to review more PRs right now. Don't sell me the destination.

**Answer:** No problem, most teams are here. Our version of the agent loop is worth running because it doesn't rely on autonomy from humans (just autonomy from instruction). You set the bar for which repos to connect, PostHog agents follow your CI rules, and you cap the spend on PR creation. If review bandwidth is the real constraint, start with scouts and signals as alerts only, no PRs, until you're ready to act on them.

## How to sell it

Find out which tool a team already has running (error tracking, replay, analytics), and pitch Desktop as the next step from there.

Don't lead with "connect your repo and let agents ship code" as if everyone's ready for that. Most teams need to see real findings first, then ease into self-driving. For example:

1. **They're already using at least one PostHog product** (ideally analytics, error tracking, or session replay) so there's real data to work from
2. **Scouts start running** against that data and generating reports, still entirely in the web app, no Desktop involved yet
3. **The coding part happens in Desktop**: once a report is worth acting on, that's the natural point to connect a repo and let an agent write the fix
4. **Usage expands from there**: more repos, more agents, more of the team shipping through Desktop
5. **The Slack app is often in the mix too**, surfacing the same findings and PRs wherever the team already works

