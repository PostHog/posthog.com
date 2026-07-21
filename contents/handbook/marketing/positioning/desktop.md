---
title: PostHog Desktop
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog Desktop is a desktop app that runs coding agents on top of your product data. Real usage goes in, pull requests come out. It watches your errors, logs, and session recordings for problems worth fixing, turns them into tasks, and lets you run a fleet of agents against them in parallel – locally or in the cloud.

Every other AI coding tool starts from the repo. PostHog Desktop starts from what your users are actually doing. The obvious fixes ship themselves behind a flag; the judgement calls show up as a prioritized to-do list for you to steer.

Cursor edits your code. PostHog Desktop edits your product.

## The unique belief (in terms of PostHog Desktop)

A coding agent that only reads your codebase is working with half the picture. It knows what the code says. It has no idea that checkout is throwing 500s for Android users, that a rename broke a funnel last Tuesday, or that nobody makes it past step three of onboarding. That context lives in your product data, not your repo.

PostHog Desktop is different because it's built on top of that data. Signals scan your errors, logs, and summarized recordings and surface the problems worth acting on. Tasks turn them into work. Agents do the work. And because PostHog also owns the analytics, flags, and experiments, it can close the [product autonomy loop](/blog/self-driving-product): ship the change behind a flag, measure whether it actually worked, and roll it back if it didn't. No other coding tool can do the last step, because no other coding tool has the data.

**Other agents write code. PostHog Desktop builds your product.**

## Who this is for

It's not only for the people writing the code. The autonomy loop touches everyone who decides what to build and checks whether it worked – engineers, product, marketing, and the people steering the roadmap.

| Persona | Fit | Why |
| --- | --- | --- |
| **Solo indie hacker** | Strong | One person owns the code, the data, and the decisions. A fleet of agents multiplies a team of one, and signals keep it pointed at what users actually hit. |
| **Professional software engineer** | Strong | Spend your time on the hard 20% while agents clear the obvious 80% – each fix wired to the data that says whether it worked. |
| **Startup engineering team** | Strong | More known problems than hands to fix them. Run agents in parallel and let Channels keep the team working together instead of in private chats. |
| **Product manager** | Strong | Turn signals into tasks, steer the agents on them, and read the impact yourself instead of waiting on an engineering ticket. |
| **Non-technical founder** | Good | Describe the product in plain English, let agents build it, and once you have users the production signals start driving the roadmap. |
| **Enterprise engineering team** | Good, with caveats | Usage-based pricing and flag-wrapped rollouts appeal, but governance is less mature than incumbents and it's still beta. See [selling to enterprise](#selling-to-enterprise). |
| **Product marketer** | Situational | Pull real product data and ship site or copy changes directly, without an engineer in the loop – useful, but not the core motion. |
| **Exec / leadership team** | Situational | Good for seeing what's shipping and what signals are surfacing, and for steering priorities – less so for hands-on building. |
| **Beginner learning to build apps** | Not yet | It'll happily build for you, but the production autonomy loop is wasted until you have real usage. A simpler coding tool fits better while you're learning. |

Across all of these, the fit is sharpest for teams whose product data is already in PostHog – that's what turns a good coding agent into a self-driving product.

### Who this isn't for

- Teams who just want inline autocomplete in their existing editor. Copilot and Cursor are more mature at fast, in-flow suggestions, and that's a different job.
- Codebases with no PostHog data yet. Without signals, PostHog Desktop is a good coding agent but you're leaving its whole reason for existing on the table – start by instrumenting first.
- Organizations that need fully on-prem or air-gapped agent execution today. Cloud execution is the default; if the requirement is a hard no on external execution, we're not the fit yet.

## Messaging

### Message 1: The only agent that reads production, not just the repo

**Problem:** Coding agents are only as good as their context, and most of them are blind to production. They can refactor a function beautifully while having no idea it's the one throwing errors for 4% of your users. You end up feeding them the context by hand – pasting stack traces, describing the bug, explaining what changed.

**Solution:** PostHog Desktop's Signals watch your errors, logs, and session recordings and surface the problems worth fixing without being asked. Each one becomes a task an agent can pick up with the production context already attached. The agent isn't guessing what to work on – it's starting from what's actually breaking.

**Supporting features:**
- Signals scan errors, logs, and summarized session recordings for problems worth acting on
- Tasks created automatically from signals, or from a prompt when you have your own idea
- Full PostHog data model available to the agent via MCP and PostHog AI
- Changes wrapped in a feature flag by default so a bad fix has a kill switch

### Message 2: Run a fleet, not a chat

**Problem:** Most agent tools are one conversation at a time. You prompt, you wait, you review, you prompt again. That's fine for a single task and useless for a backlog of fifty. The bottleneck stops being the code and starts being the number of chats you can babysit.

**Solution:** The Command Center runs up to nine agents in parallel, each on its own task, cloud or local. You steer the ones that need judgement and let the rest run – including overnight. Channels give the whole thing a multiplayer surface, so your team works alongside the agents instead of each person driving a private chat.

**Supporting features:**
- Command Center runs up to nine agents at once, each on a separate task
- Cloud execution by default; local execution when you want it
- Channels: a shared, multiplayer workspace where agent sessions live and context accumulates
- Human review before anything ships – agents work autonomously, you keep the final call

### Message 3: One subscription, every model, wired to your data

**Problem:** The agent tooling stack fragments fast. A Claude Code subscription here, a Cursor seat there, an analytics tool that doesn't talk to any of them. You're paying three vendors and stitching the context together yourself.

**Solution:** PostHog Desktop gives you the latest models – Claude, Codex, open source – without a separate subscription to any of them, at usage-based pricing that lands around what you'd pay anyway. And because it's PostHog, the agent can query your analytics, read your flags, and check whether a change worked, all from the same place you already keep your data.

**Supporting features:**
- Access to the latest Claude, Codex, and open-source models with no separate provider subscription
- Usage-based pricing – pay for what the agents actually do
- PostHog AI and MCP give agents a native query interface to your product data
- Flags, experiments, analytics, and replay all in the same platform the agent ships into

## Battle cards

### vs Claude Code / Codex

**Their approach:** Excellent terminal-based coding agents. They read your repo, run commands, and write good code. Context stops at the codebase – they don't know your production data, and they can't measure whether a change worked. Each is a separate subscription.

**Where PostHog wins:**
- Production context: Signals surface what to fix from real usage, not just the repo
- Closes the loop – ships behind a flag, then measures impact in the same platform
- Run up to nine agents in parallel from the Command Center, not one session at a time
- No separate model subscription; usage-based pricing across Claude, Codex, and open source
- Still uses the same underlying models, so you're not trading away code quality to get all of this

### vs Devin

**Their approach:** An autonomous cloud software engineer, closest to the "ships while you sleep" pitch. Strong at taking a task and running with it end to end. Its autonomy is scoped to the codebase and the task you hand it.

**Where PostHog wins:**
- The tasks come from production signals, not just from what you think to ask for
- Impact measurement is built in – PostHog owns the analytics that tell you if it worked
- Multiplayer Channels and a nine-agent Command Center, not a single autonomous worker
- Feature-flag-wrapped rollouts give autonomous changes a native safety net

### vs the agentic multiplayer-workspace challengers (Buzz, Capy, PromptQL, Dust)

This is a new and fast-moving category, so keep the comparison honest and current – check what each one actually ships before leaning on specifics.

**Their approach:** A growing set of tools putting agents into a shared, multiplayer workspace, several of them layered on top of your existing data or tools.

**Where PostHog wins:**
- We own the whole stack the agents act on – data, analytics, flags, experiments, replay – rather than bolting an agent onto someone else's data
- The autonomy loop only closes when the same platform can both ship the change and measure it; that's structurally hard to replicate from a workspace layer alone
- Everything runs against real product data you already have in PostHog

## Objections

### "We already use Cursor / Claude Code and the team likes it"

**Follow-up:** Where does that agent get its context today – just the repo, or does it know what's happening in production?

**Answer:** Keep using them for in-flow coding if the team likes them; PostHog Desktop runs the same underlying models, so it's not a downgrade on code quality. The difference is where the work comes from and what happens after. PostHog Desktop starts from production signals and measures impact after shipping – the parts a repo-only agent can't do. Plenty of teams run both.

### "It's still in beta"

**Answer:** It is, and we're honest about that – some features are early and it's improving weekly. It's the tool we use to build PostHog itself, which is the same bar we hold every product to before we ship it. If you need a locked-down, GA-only tool for a regulated production process today, wait. If you want to shape a category-defining product and get the autonomy loop working before your competitors do, now is the time.

### "We don't want agents shipping to production autonomously"

**Answer:** Neither do we, and PostHog Desktop is built that way. Agents do the work autonomously, but a human reviews and approves before anything ships. Changes are wrapped in a feature flag by default, so even an approved change rolls out gradually with a kill switch – and the analytics tell you whether to keep going. Autonomy is on the work, not on the deploy button.

## Selling to enterprise

PostHog Desktop is usage-based – you pay for what the agents do, with no per-seat model subscription to stack on top. That maps cleanly onto how larger teams want to budget agent spend, and it scales with usage rather than headcount.

Enterprise customers get SSO, EU data residency, SOC 2, and dedicated support, with contracts following [the four-lever framework](/handbook/growth/sales/contract-rules). The forward-looking pitch is simple: the autonomy loop only works for teams whose product data is already in PostHog. The teams instrumenting analytics, flags, and replay today are the ones who will have a working self-driving product tomorrow – and the gap widens every month they wait.
