---
title: Inbox
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses (the self-driving story and standard description), see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

The Inbox is how you turn on self-driving and the one place the work lands. PostHog watches your product, finds what's worth fixing, and drops it in your Inbox: reports to review and pull requests to merge, ranked by priority. It used to ship as part of Desktop. Now it's its own tool with its own pricing (a flat fee per pull request), and it meets you wherever you work: the PostHog app, Slack, and PostHog Desktop.

## Getting the words right

This is the part that's easy to muddle, so here's the whole chain from raw data to the work in front of you:

- **Self-driving** is the whole loop (watch your product, find what's worth fixing, open a PR, measure whether it worked). It's the story, not a line item.
- **Scouts** are scheduled agents that watch a slice of your data and raise a hand when something's worth knowing.
- **Signal sources** are built-in watchers on one stream (error tracking, session replay, health checks, plus Zendesk, GitHub Issues, Jira, and Linear).
- **Signals** are the structured findings scouts and sources emit: what's happening, the evidence, and a suggested action.
- **Reports** group related signals into one framed problem, ranked by priority, marked actionable or needs-input.
- **Inbox** is where reports and PRs land for you to review, steer, and merge. It's the tool you turn on, and the only part you pay for.

In one line: scouts and signal sources emit signals, signals group into reports, an agent opens a PR for the actionable ones, and it all lands in your Inbox.

## How you use the Inbox in each PostHog product

It's one shared setup, not a separate one per product. The same reports, scouts, and inbox state show up everywhere; only the way you open it changes.

| Product | What you do here |
| --- | --- |
| **PostHog Web** | Home base. Watch the signals feeding the loop, review reports and PRs, and turn on or tune your scouts and signal sources. |
| **PostHog Slack** | The Inbox comes to you. Reports and PRs pipe into a channel (or per-scout channels), and your team steers in the thread. |
| **PostHog Desktop** | The same inbox, reports, and scouts, sitting next to the agents doing the work. Act on a report and drive the fix without leaving the app. |
| **PostHog MCP & CLI** | Scouts read your data through the same MCP you connect to Claude Code or Cursor, so your own agent works with the same product context, not just code. |

## The unique belief (in terms of the Inbox)

The scarce thing isn't fixing problems, it's noticing which ones are worth fixing and framing them well. Scouts and signal sources do that noticing continuously, and the Inbox turns it into a decision you can make in seconds: merge this PR, steer that report, dismiss the noise. You only pay when it produces a pull request worth merging.

This is the context fuel for self-driving made concrete. The signals live in your product data (which is exactly what PostHog has), and the Inbox is where that data turns into shipped work.

## Who this is for

- Teams already sending PostHog real data (errors, replays, analytics) who want it read for them instead of watching dashboards.
- Teams who aren't ready to let agents ship yet. Reports are free, so you can run it as an alerting layer and never open a PR until you trust it.
- Anyone who lives in Slack and wants the important stuff to come to them.

### Who this isn't for

- Teams with no product data yet. No context means no signals to act on.
- Teams looking for it to set product vision. Self-driving is at its best in maintenance mode (bugs, broken flows, instrumentation gaps); the judgment calls land in your Inbox marked needs-input, they don't become PRs.

## The ramp: from using a tool to self-driving

The Inbox is usually the bridge between "I use PostHog to look things up" and "PostHog improves my product for me." A natural path:

1. **Start with one tool** in PostHog Web or via MCP (analytics, session replay, or error tracking). You're already generating context.
2. **Turn that tool on as a signal source.** Now the loop has something to watch. Session replay and error tracking are signal sources out of the box.
3. **Reports start landing in your Inbox**, ranked by priority, and piping into Slack. Still no code, and reports are free.
4. **When a report is actionable, an agent opens a PR.** That's the first thing you pay for, and your first three each month are free.
5. **Act on it wherever you work**, including PostHog Desktop, and expand from there: more sources, more scouts, more of the loop running on its own.

The point is that nobody has to commit to "let agents ship code" on day one. The Inbox earns its keep as a free alerting layer first, then becomes the trigger for self-driving once the reports are obviously worth acting on.

## Pricing

The Inbox is priced by outcome, so you only pay for completed work:

- A flat **$15 per pull request** (an actionable report with a code change attached).
- Reports that aren't actionable, or that need your input, are **always free**.
- Your **first three PRs each month are free**.
- A **default $150 billing limit** you can change, with real-time tracking and usage alerts. Generation pauses when you hit it.
- If a PR isn't worth paying for (a false finding, or code that doesn't solve the stated problem), PostHog refunds it.

It's in open beta, so expect the pricing to keep moving.

## How to sell it

Lead with the free part: reports cost nothing, so a team can turn it on, see real findings land in their Inbox, and only pay once it's opening PRs worth merging. Find the tool they already run (error tracking, replay, analytics), turn it on as a signal source, and let the Inbox fill up before anyone talks about letting agents ship code. The Slack piping is often the hook, since the important stuff shows up where the team already works.
