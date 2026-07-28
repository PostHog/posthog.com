---
title: Signals
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses (the self-driving story and standard description), see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

Signals is the part of PostHog that watches your product for you and turns what it finds into work. Scouts run on a schedule, read your context (errors, session replays, support tickets, GitHub issues, Linear, Zendesk, and more), and write up anything worth acting on. Those reports land in your Inbox, ranked by impact. When one is worth fixing, an agent can pick it up and open a PR.

It used to be bundled into Desktop. Now it's its own tool with its own usage-based pricing, and you use it wherever you already work. The Inbox lives in PostHog Web, and the same reports pipe into Slack.

## How you use Signals in each PostHog product

Signals is one tool, but you meet it in a different place depending on the product you're in.

| Product | What Signals does here |
| --- | --- |
| **PostHog Web** | Home base. The Inbox lives here: review ranked reports and PRs, configure and run Scouts, and connect the tools you already use as signal sources. |
| **PostHog Slack** | The loop comes to you. Digests and alerts land in a channel, and you can triage a report or ask a follow-up in the thread without opening the app. |
| **PostHog MCP & CLI** | Pull signals and reports into the agent you already use (Claude Code, Cursor) as context, so a fix starts from what PostHog already noticed. |
| **PostHog Desktop** | Where you act on a report. Connect a repo, let an agent research and ship the fix behind a flag, and steer that work with your team. |

## The unique belief (in terms of Signals)

The scarce thing isn't generating fixes, it's noticing what's worth fixing. Every team has a backlog of small, real problems nobody has time to spot, triage, and write up. Signals does that noticing continuously, so the work is already scoped and ranked before a human (or an agent) picks it up.

This is the context fuel for self-driving. Signals is the "signals in" half of the loop: without it, agents wait to be prompted; with it, the product tells you what to work on.

## Who this is for

- Teams already sending PostHog real data (errors, replays, analytics) who want it read for them instead of watching dashboards.
- Teams who aren't ready to let agents ship yet. Run Signals as alerts only, no PRs, until they trust it.
- Anyone who lives in Slack and wants the important stuff to come to them.

### Who this isn't for

- Teams with no product data yet. No context means no signals to act on.

## The ramp: from using a tool to self-driving

Signals is usually the bridge between "I use PostHog to look things up" and "PostHog improves my product for me." A natural path:

1. **Start with one tool** in PostHog Web or via MCP (analytics, session replay, or error tracking). You're already generating context.
2. **Connect that tool as a signal source.** Now Scouts have something to read.
3. **Reports start landing in the Inbox**, ranked by impact, and piping into Slack. Still no code, still no Desktop.
4. **When a report is worth acting on, open it in Desktop**, connect a repo, and let an agent ship the fix behind a flag.
5. **Usage expands from there:** more sources, more scouts, more of the loop running on its own.

The point is that nobody has to commit to "let agents ship code" on day one. Signals earns its keep as an alerting layer first, then becomes the trigger for self-driving once the reports are obviously worth acting on.

## How to sell it

Find the tool a team already has running (error tracking, replay, analytics) and pitch Signals as the thing that reads it for them. Lead with "you'll stop watching dashboards," not "agents will ship code." The Slack piping is often the hook: the important stuff shows up where the team already works, and connecting a repo in Desktop is the next step, not the first one.
