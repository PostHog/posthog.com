---
title: How to pitch self-driving
sidebar: Handbook
showTitle: true
---

This is a living page for how we pitch PostHog making _your_ product self-driving. It covers [the concepts](#what-youre-actually-selling) (so you can explain scouts, signals, and sources without tying yourself in knots), [the strengths of each and which to lead with](#scouts-and-signal-sources-the-strengths-of-each), the core pitch, how to run it, and a [reverse demo](#the-reverse-demo) format that lets the customer experience self-driving on their own data. We're still early, so treat this as a starting point and iterate on it as we practice the pitch and learn what lands.

This pitch sits on top of our [brand story](/handbook/brand/foundations#how-we-describe-posthog), so keep it consistent with how we describe PostHog everywhere else. Two things carry through from there: **self-driving is the story** (the narrative everything sits under), and the customer's product stays the subject – we make _your_ product self-driving, PostHog isn't "a self-driving product" itself. 

This page assumes you've already done the work in [discovery](/handbook/growth/sales/how-to-do-discovery) – it covers what to say once you know their pain, not how to find it. For the mechanics of the wider deal, see [new sales](/handbook/growth/sales/new-sales) and [running trials](/handbook/growth/sales/running-trials). 

In a hurry before a call? Skip to the [cheat sheet](#cheat-sheet).

## What you're selling

These are the core pieces. The docs pages are more thorough, but you at least need to have these concepts engrained before you can attempt a demo.

| Part | One-line definition |
|---|---|
| **[Signal sources](/docs/self-driving/inbox/sources)** | Built-in pipelines that watch **one data stream continuously**, in real time. Error Tracking, Support, Session Replay, Replay Vision, Product Analytics, and AI Observability in PostHog, plus external tools connected through the [data warehouse](/docs/data-warehouse) – GitHub Issues, GitHub CI, Zendesk, Linear, and pganalyze. You toggle them on. |
| **[Scouts](/docs/self-driving/scouts)** | Research agents that **explore a slice of your data** on a schedule, and decide what's worth surfacing. A few standard scout templates are ready to use, and you can generate custom scouts specific to your project. |
| **The [signals](/docs/self-driving/signals) pipeline** | Both of the above emit **signals** – a finding, the evidence behind it, and a suggested action. The pipeline deduplicates and groups related signals so one real problem becomes one item, not five. |
| **[Reports](/docs/self-driving/reports) and the [inbox](/docs/self-driving/inbox)** | A grouped set of signals becomes a **report** in your inbox, available in the [web app](/docs/self-driving/web), [PostHog Desktop](/docs/posthog-desktop), and Slack. This is the surface a human actually looks at. |
| **[Research](/docs/self-driving/inbox/research) and [PRs](/docs/self-driving/anatomy-of-a-pr)** | From a report, a research agent connects it to the codebase and marks it **actionable** when a code fix is possible. From there an implementation agent can open a PR. Nothing merges without a human. |

The full pipeline: **something watches (source or scout) → it emits signals → the pipeline groups them into a report → the inbox researches it → an agent can open a PR.** The docs walk the same chain in order, so [the self-improving loop](/docs/self-driving/self-improving-loop) is the page to send anyone who wants the whole thing end to end.


### Which to lead with - scouts vs signals

| Lead with **signal sources** when… | Lead with **scouts** when… |
|---|---|
| They already have a firehose – errors, tickets, Sentry, Linear – and the problem is triage, not detection | Nobody is watching the thing they care about, or a person is watching it manually every morning |
| Completeness matters: "we can't miss one" | Volume matters: "we get too many to look at" |
| The stream is well-defined and they trust it | The interesting thing spans surfaces, or nobody's written down what "interesting" means yet |
| They want to shorten the path from a known issue to a merged fix | They want judgement applied to data they already have but never look at |
| Their pain is described in nouns: tickets, exceptions, issues | Their pain is described in questions: "are we losing anyone?", "did that launch land?" |
| Fastest to demo: toggle a source, show the queue fill | Fastest to demo: point a scout at their data and run it on demand |


## The core pitch

Keep it simple. Something like this:

> PostHog already has all the behavioral data about how people use your product. We turn that data into signals, feed those signals to an agent running in a sandbox, and it automatically opens PRs that improve your product. The more you put into PostHog, the better the signals get.

That last line is the flywheel line. Every event, flag, and replay you capture improves the signals the agent works from, so more data in means better PRs out. In brand terms this is [context – the fuel](/handbook/brand/foundations#how-we-describe-posthog) for the self-driving loop.

The flywheel is stronger than it first sounds, because it isn't limited to product analytics. A scout reads your data through the same [PostHog MCP](/docs/model-context-protocol) you'd connect to Claude Code, so **anything you land in PostHog becomes watchable** – a warehouse table, a Stripe sync, a support inbox, even a Slack channel relayed into the warehouse. 

## Why it works

The pitch resonates because the customer connects the dots themselves. You don't have to convince anyone that behavioral data is valuable, because they already believe it. You're just showing them the obvious next step, which is that data shouldn't sit in a dashboard waiting for a human to act on it. It should drive changes to the product directly.

When it goes well, the customer arrives at the conclusion before you finish. We've seen this play out on an [on-site](/handbook/growth/sales/customer-onsites): as the pitch unfolded the team worked through it out loud, described the exact signals use case back to us, and then started sequencing their own rollout, ending with asking whether they should do a Fable 5 audit of all their instrumentation first to make sure they're tagging everything and getting as much as possible into PostHog.

When the customer starts planning their instrumentation rollout unprompted and immediately, you know pitch has landed!

## How to run the self-driving pitch and demo

- **Lead with the data they already have.** Start from the behavioral data they're capturing in PostHog today, not from the agent. The agent is the payoff, not the opener.
- **Draw the line from data to PR.** Walk through it: data goes to signals, signals to an agent in a sandbox, and the agent to PRs that ship improvements. Let them follow the chain rather than asserting the conclusion.
- **Ask what they check manually.** "What does someone on your team open every morning?" is the single best scout-discovery question. Whatever they name is a scout, and naming it back to them lands harder than any feature list.
- **Land the flywheel.** Make sure they leave understanding that more data means better signals means better PRs. This is what turns it from a feature into a reason to instrument everything.
- **Let them sequence the rollout.** The strongest outcome is the customer proposing their own instrumentation audit. When they get there, help them plan it, since that's the start of the flywheel.
- **Leave with one concrete thing, not a strategy.** The commitment you want is small and specific: one source switched on for a stream they care about, or one scout pointed at one question. Either proves the concept on their own data, and it's the thing they'll show their team.

## The reverse demo

A [reverse demo](https://www.clay.com/blog/reverse-demo) (a term Clay recently popularized) flips the usual script: instead of you driving a polished demo environment, the customer drives their own data. It's a faster path to the aha moment because the value shows up in their product, not a sandbox account.

The catch for us is that a reverse demo only works once there's enough clean data in PostHog for the agent to act on. Clay can have someone build a lead list on the first call before they're even a customer; we can't conjure signals out of an empty project. That makes the reverse demo a great fit for existing customers who already have the data flowing (a natural play for TAMs), and a tougher one for prospects who haven't connected anything yet (TAEs will usually need to get data flowing first, see the pre-call prep below). 

### Pre-call prep

The whole demo depends on there being real signals to work from, so set that up before the call:

- Ask them to turn on error tracking and session replays for a window of time ahead of the call, so the agent has fresh, real signals to act on by the time you meet.
- Have them get PostHog Desktop downloaded and their GitHub and PostHog connected, so they can kick off a PR live.
- Frame the cost honestly: offer to credit any usage on errors and replays during the demo window, since you need them on to show it at its best, and they can turn them back off after. If it wows them, they'll want to keep them on anyway, and that's the flywheel starting.

### Demo flow

Let them drive the whole way. You narrate, they click.

1. Have them open the PostHog Desktop inbox.
2. Walk them through what they're seeing in the reports and PRs tabs, using their own data.
3. Have them pick a report to inspect and kick off a PR from it themselves.
4. Explain the self-driving part: they can set it up to handle bugfix and maintenance PRs automatically, while humans still drive product decisions and new features. (This is the same line as "robots do maintenance, humans do creative work" below, made concrete.)

Using their data for this makes it click and get to the "aha!" moment much more quickly.

### The scout-based reverse demo (no data prep or pre-ingest needed)

The source-led version above needs data to accumulate first. The scout-led version doesn't, which makes it the better opener for an account with historical data but nothing switched on yet.

1. In PostHog Desktop, open the scouts page and pick the **"Make a scout"** suggestion. It scans their actual project and proposes custom scouts grounded in their real data – which is itself the moment, because the suggestions are specific to them.
2. Let them pick the one that makes them go "huh, yeah, I'd want to know that."
3. [Run it on demand](/docs/self-driving/scouts#running-a-scout-on-demand) right there on the call – no waiting for a schedule, and a scout that's still disabled can be run this way.
4. Read what it filed together. If it's good, turn it on. If it's noisy, that's a demo too: show them the [dry run](/docs/self-driving/scouts#dry-runs) and [scout notes](/docs/self-driving/scouts#steering-a-scout-with-a-note), because "I can tell it that's known noise, in English" is often what closes it.

The thing to make land here is the memory. A scout reads back what earlier runs learned so it dedupes against itself and gets smarter. 


For ideas that work across verticals, and the [scout patterns cookbook](https://github.com/PostHog/posthog/blob/master/products/signals/skills/authoring-scouts/references/scout-patterns.md) behind them, send them to [scout examples](/docs/self-driving/scout-examples). For a deep dive with two real scouts traced end to end and a walkthrough video, [What is a scout?](/blog/what-is-a-scout) are good references.

## How AI observability can fit in

AI products are an easy self-driving pitch: they already know their agent misbehaves, and nobody is reading every trace. Two signal types turn [AI observability](/docs/ai-observability/start-here) data into inbox reports.

**Evaluations (rolled out to everyone).** [Ingest AIO events](/docs/ai-observability/start-here) → create an [online evaluation](/docs/ai-evals) that scores them → turn on [evaluation reports](/docs/ai-evals#evaluation-reports), where an agent reads a batch of results and writes up what it found. That summary is the signal.

**Anomaly detection (alpha).** Ingest AI observability events, then add an [anomaly detection alert](/docs/alerts#anomaly-detection) on an AI errors, latency, or cost insight and turn on agent investigation. When the alert fires, the agent checks whether the anomaly is real and writes up what it found in a notebook. Only true positives reach the inbox, as a report summarizing the investigation.


## Objection handling

| What they say | How to handle it |
|---|---|
| "Will it automatically merge PRs?" | No. Agents open PRs, humans review and merge. Autonomy is from instruction, not from the engineer. Never soften this one. |
| "Won't this be noisy?" | Yes, definitely. Quality of the sources and scouts matters, but not ever report or PR is a hit. Explain the three dials: dismiss or snooze a report with a note and later runs read it, leave a [scout note](/docs/self-driving/scouts#steering-a-scout-with-a-note) in plain English, or slow the schedule. . |
| "How is this different from alerts we already have?" | Alerts fire on thresholds. Scouts hold judgement, remember what they already said, and weigh how much something matters. Sometimes an alert is a suitable solution |
| "Can it watch _X_?" (something not in PostHog) | If it can land in PostHog – warehouse table, connector, Slack relay – yes. If it can't, say so. "Get it into PostHog first" is the answer |
| "What does it cost to run?" | Runs come out of a project's daily run budget, and the schedule is the main dial. Frame it honestly: a tighter cadence mostly pays to re-confirm nothing changed. Slow a chatty scout down before turning it off. See [self-driving pricing](/docs/self-driving/pricing) for the current numbers – check it rather than quoting from memory, it's still moving. |
| "Can we try it without it doing anything?" | Yes – [dry run](/docs/self-driving/scouts#dry-runs) mode runs the scout and records everything it would have filed without writing to the inbox. Great for cautious or high-stakes teams. |


## Cheat sheet

For the five minutes before a call.

- **The chain:** something watches (source or scout) → signals → grouped into a report → inbox researches it → agent opens a PR → human merges.
- **The trade-offs between Signals and Scouts:** sources give determinism and guaranteed coverage, scouts give judgement and steerability. 
- **Lead with sources** when there's significant volume to triage. **Lead with scouts** when everything is technically "something" and they need a filter.
- **Best demo move:** toggle a source and watch the queue fill, or make a scout on their data and run it on demand, live.
- **On an AI account:** eval + [evaluation report](/docs/ai-evals#evaluation-reports) ships today, anomaly detection + agent investigation is alpha. Both need [AIO events](/docs/ai-observability/start-here) flowing first.
- **Never promise:** auto-merge, total coverage from a scout, or a PR from every report.
- **Links to share:** [What is a scout?](/blog/what-is-a-scout), [scout examples](/docs/self-driving/scout-examples), [self-driving docs](/docs/self-driving).
- **Have open in another tab:** [the FAQ](/docs/self-driving/faq) for anything you get asked cold, and [pricing](/docs/self-driving/pricing) so you never guess at a number.

## Iterating on this page

We're actively refining this pitch. If you run it and learn something, whether what resonated, what fell flat, or a better way to frame the flywheel, add it here so the whole team gets sharper.
