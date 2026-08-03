---
title: How to pitch self-driving
sidebar: Handbook
showTitle: true
---

This is a living page for how we pitch PostHog making _your_ product self-driving. It covers [the concepts](#what-youre-actually-selling) (so you can explain scouts, signals, and sources without tying yourself in knots), [the strengths of each and which to lead with](#scouts-and-signal-sources-the-strengths-of-each), the core pitch, how to run it, and a [reverse demo](#the-reverse-demo) format that lets the customer experience self-driving on their own data. We're still early, so treat this as a starting point and iterate on it as we practice the pitch and learn what lands.

This pitch sits on top of our [brand story](/handbook/brand/foundations#how-we-describe-posthog), so keep it consistent with how we describe PostHog everywhere else. Two things carry through from there: **self-driving is the story** (the narrative everything sits under), and the customer's product stays the subject – we make _your_ product self-driving, PostHog isn't "a self-driving product" itself. Write it lowercase and hyphenated.

This page assumes you've already done the work in [discovery](/handbook/growth/sales/how-to-do-discovery) – it covers what to say once you know their pain, not how to find it. For the mechanics of the wider deal, see [new sales](/handbook/growth/sales/new-sales) and [running trials](/handbook/growth/sales/running-trials). If you want to go deeper on the product itself, the [product enablement](/handbook/growth/sales/product-enablement) SMEs are your route in.

In a hurry before a call? Skip to the [cheat sheet](#cheat-sheet).

## What you're actually selling

The pitch is simple, but the machinery behind it has five parts and customers ask about them by name. If you can define these five in one line each, you can handle almost any question on the call. Self-driving is currently in open beta, so say that out loud too.

| Part | One-line definition |
|---|---|
| **[Signal sources](/docs/self-driving/inbox/sources)** | Built-in pipelines that watch **one stream continuously**, in real time. Error tracking, support conversations, session replay, logs, Replay Vision, and health checks inside PostHog, plus external tools connected through the [data warehouse](/docs/data-warehouse) – Sentry, Zendesk, Linear, Jira, GitHub Issues, Snyk, Canny, and [many more](/docs/self-driving/inbox/sources). You toggle them on. |
| **[Scouts](/docs/self-driving/scouts)** | Scheduled agents that **explore your data and use judgement**. A scout runs on a schedule, looks across whatever slice of PostHog you point it at, decides whether anything clears the bar you set, and files what it found. Some ship with PostHog, some you write yourself. |
| **The [signals](/docs/self-driving/signals) pipeline** | Both of the above emit **signals** – a finding, the evidence behind it, and a suggested action. The pipeline deduplicates and groups related signals so one real problem becomes one item, not five. |
| **[Reports](/docs/self-driving/reports) and the [inbox](/docs/self-driving/inbox)** | A grouped set of signals becomes a **report** in your inbox, available in the [web app](/docs/self-driving/web), [PostHog Desktop](/docs/posthog-desktop), and Slack. This is the surface a human actually looks at. |
| **[Research](/docs/self-driving/inbox/research) and [PRs](/docs/self-driving/anatomy-of-a-pr)** | From a report, a research agent connects it to the codebase and marks it **actionable** when a code fix is possible. From there an implementation agent can open a PR. Nothing merges without a human. |

The chain in one breath: **something watches (source or scout) → it emits signals → the pipeline groups them into a report → the inbox researches it → an agent can open a PR.** The docs walk the same chain in order, so [the self-improving loop](/docs/self-driving/self-improving-loop) is the page to send anyone who wants the whole thing end to end.

> **The mistake to avoid.** Whichever of the two you personally understand best is the one you'll reach for on every call, and that's what makes a pitch feel generic. Sources and scouts are different tools with genuinely different strengths – neither is the premium version of the other. Pick based on what the customer told you in discovery, not on which one you find easier to explain.

### Two things customers reliably conflate

- **A scout is not an alert.** An alert fires on a threshold you set on one metric. A scout has memory, learns your baseline, dedupes against what it already told you, weighs how much a finding matters, and stays quiet on a quiet day. If a customer describes something a simple alert would solve, sell them the alert – it's cheaper and they'll trust us more for saying so.
- **Not every report becomes a PR.** The PR is the flashiest end state, not the only one. Plenty of the value is a report that tells a human something true they'd have missed. Overpromising "it just fixes things" is the fastest way to a disappointed customer in week two.

## Scouts and signal sources: the strengths of each

Both feed the same inbox, and most customers end up running both. They aren't competing products and one isn't the upgrade from the other – they make an honest trade against each other, and a rep who can name that trade sounds like they know the product.

**The trade is determinism versus judgement.**

A signal source is deterministic and exhaustive. Turn on error tracking as a source and *every* qualifying error-tracking signal gets processed, continuously, in real time. Nothing is skipped because an agent weighed it and decided it wasn't interesting. That predictability is a genuine feature: you can reason about coverage, you get the same behavior today and next month, and there's no bar for something to clear. When a customer says "I need to know that nothing gets missed," that's not a limitation talking, that's a requirement – and the pipeline is the honest answer.

A scout trades some of that determinism for judgement and steerability. It runs on a schedule rather than continuously, it explores rather than following a fixed stream, and it decides what clears the bar – which means it can weigh, rank, cluster, and stay quiet, but also means it's making a call each run and won't be exhaustive by design. That's the right trade when the volume is unmanageable, the interesting thing spans several surfaces, or "worth knowing" is a matter of opinion that only the customer can define.

| | **Signal sources** | **Scouts** |
|---|---|---|
| **Coverage** | Exhaustive – every qualifying item in the stream is processed | Selective by design – surfaces what clears the bar, holds the rest |
| **Timing** | Continuous, real-time | Scheduled, from every 30 minutes to every 30 days (or a cron slot) |
| **Behavior** | Predictable and repeatable; same input, same handling | Uses judgement each run; ranks, clusters, and weighs |
| **Scope** | One stream, deeply | Across surfaces, or any slice you point it at |
| **Setup** | Toggle it on | Authored – describe what "worth my attention" means |
| **Tuning** | Configuration | Steerable in plain English, and it learns |
| **Best when** | Missing something is unacceptable | Everything is technically "something" and you need a filter |

### Steerability is the scout's other half

Determinism is what you give up; steerability and learning are what you get, and this is the part reps under-sell because it's harder to demo than a toggle. Worth knowing concretely:

- **Scout notes.** Short steering messages in plain English that every run reads: "the staging traffic spike you keep flagging is known noise, stop reporting it," or "we shipped a new checkout Tuesday, treat conversion shifts after that as expected." They can address one scout or the whole fleet, and can be given an expiry so time-boxed steering retires itself. Notes are advisory – they direct attention without lowering the evidence bar.
- **Inbox feedback becomes steering.** When someone dismisses or snoozes a report and types why, that note is forwarded into the steering channel and later runs read it. Triaging your inbox honestly is how scouts get quieter, with nobody editing anything.
- **Durable memory.** Each run reads back what earlier runs learned – what's normal, what it already surfaced, what it decided to hold – so it dedupes against itself and sharpens over time rather than starting cold.
- **A custom scout suggests its own edits.** When a run turns up concrete evidence that its own instructions misdirected it, it files that as a suggestion with the evidence attached. The scout proposes, the customer decides.
- **Dry runs.** Run it for real, record everything it would have filed, write nothing to the inbox. The answer for a cautious or high-stakes team.

So the framing for a customer with strong opinions about their own domain: a source gives you guaranteed handling of a known stream; a scout lets you encode judgement nobody else could write down, then keep tuning it in English as you learn. Customization is the reason to reach for a scout, and it's a real reason.

### Which to lead with

You still have to open on one. The question to ask yourself: **does this customer have a stream that's already telling them something, or a question nobody is holding?**

| Lead with **signal sources** when… | Lead with **scouts** when… |
|---|---|
| They already have a firehose – errors, tickets, Sentry, Linear – and the problem is triage, not detection | Nobody is watching the thing they care about, or a person is watching it manually every morning |
| Completeness matters: "we can't miss one" | Volume matters: "we get too many to look at" |
| The stream is well-defined and they trust it | The interesting thing spans surfaces, or nobody's written down what "interesting" means yet |
| They want to shorten the path from a known issue to a merged fix | They want judgement applied to data they already have but never look at |
| Their pain is described in nouns: tickets, exceptions, issues | Their pain is described in questions: "are we losing anyone?", "did that launch land?" |
| Fastest to demo: toggle a source, show the queue fill | Fastest to demo: point a scout at their data and run it on demand |

Two things that hold up on most calls:

- **Most customers land on both, and they compose well.** The common shape is sources for the streams where completeness matters, scouts for the questions nobody is holding. Pitching them as either/or makes the product smaller than it is.
- **If a detector already exists, a scout can sit on top of it rather than replace it.** Customers with existing alerting or triage often assume we're a rip-and-replace. Frequently the better answer is that their detector keeps its deterministic coverage and a scout adds the layer above: bundling related items, weighing who's affected, flagging what nobody actioned.

> **A worked example.** A customer asks for a Linear source, expecting every issue to become a PR. That's exactly what the source does, and for a team whose backlog is already groomed – where every issue in there genuinely should be worked – it's the right answer, and the determinism is the point. But listen for "…and then it just does them all?" said with a slight wince. That's a team whose backlog is a mixed bag, and what they want is a Linear _scout_ reading the same issues with weighting and judgement they control and can steer over time. Same data, two legitimate products. The question that separates them: "should everything in there get worked, or does someone need to decide what matters first?"

## The core pitch

Keep it simple. Something like this:

> PostHog already has all the behavioral data about how people use your product. We turn that data into signals, feed those signals to an agent running in a sandbox, and it automatically opens PRs that improve your product. That's your product, self-driving – and the more you put into PostHog, the better the signals get.

That last line is the flywheel line. Every event, flag, and replay you capture sharpens the signals the agent works from, so more data in means better PRs out. In brand terms this is [context – the fuel](/handbook/brand/foundations#how-we-describe-posthog) for the self-driving loop, which is why "put more into PostHog" and "get better PRs out" are the same sentence.

The flywheel is stronger than it first sounds, because it isn't limited to product analytics. A scout reads your data through the same [PostHog MCP](/docs/model-context-protocol) you'd connect to Claude Code, so **anything you land in PostHog becomes watchable** – a warehouse table, a Stripe sync, a support inbox, even a Slack channel relayed into the warehouse. That turns "put more into PostHog" from a land-grab into a concrete promise: every new source is a new thing a scout can hold an opinion about.

## Why it works

The pitch resonates because the customer connects the dots themselves. You don't have to convince anyone that behavioral data is valuable, because they already believe it. You're just showing them the obvious next step, which is that data shouldn't sit in a dashboard waiting for a human to act on it. It should drive changes to the product directly.

When it goes well, the customer arrives at the conclusion before you finish. We've seen this play out on an [on-site](/handbook/growth/sales/customer-onsites): as the pitch unfolded the team worked through it out loud, described the exact signals use case back to us, and then started sequencing their own rollout, ending with asking whether they should do a Fable 5 audit of all their instrumentation first to make sure they're tagging everything and getting as much as possible into PostHog.

When the customer starts planning their instrumentation rollout unprompted and immediately, you know pitch has landed!

### Signals that it's working

- They start planning their own instrumentation rollout, unprompted
- They describe the use case back to you in their own words, using their own product as the example
- They name the thing they'd want watched before you offer to build it
- They ask who else on their team should see this
- The question shifts from "what is it?" to "how would we set this up?" (when it does, [setup](/docs/self-driving/setup) is the page to walk them through)

If none of these happen, you probably pitched the machinery instead of their problem. Go back to what they told you in discovery and re-anchor.

## How to run it

- **Lead with the data they already have.** Start from the behavioral data they're capturing in PostHog today, not from the agent. The agent is the payoff, not the opener.
- **Draw the line from data to PR.** Walk through it: data goes to signals, signals to an agent in a sandbox, and the agent to PRs that ship improvements. Let them follow the chain rather than asserting the conclusion.
- **Ask what they check manually.** "What does someone on your team open every morning?" is the single best scout-discovery question. Whatever they name is a scout, and naming it back to them lands harder than any feature list.
- **Land the flywheel.** Make sure they leave understanding that more data means better signals means better PRs. This is what turns it from a feature into a reason to instrument everything.
- **Let them sequence the rollout.** The strongest outcome is the customer proposing their own instrumentation audit. When they get there, help them plan it, since that's the start of the flywheel.
- **Leave with one concrete thing, not a strategy.** The commitment you want is small and specific: one source switched on for a stream they care about, or one scout pointed at one question. Either proves the concept on their own data, and it's the thing they'll show their team.

## The reverse demo

A [reverse demo](https://www.clay.com/blog/reverse-demo) (a term Clay recently popularized) flips the usual script: instead of you driving a polished demo environment, the customer drives their own data. It's a faster path to the aha moment because the value shows up in their product, not a sandbox account.

The honest catch for us is that a reverse demo only works once there's enough clean data in PostHog for the agent to act on. Clay can have someone build a lead list on the first call before they're even a customer; we can't conjure signals out of an empty project. That makes the reverse demo a great fit for existing customers who already have the data flowing (a natural play for TAMs), and a tougher one for prospects who haven't connected anything yet (TAEs will usually need to get data flowing first, see the pre-call prep below).

### Pre-call prep

The whole demo depends on there being real signals to work from, so set that up before the call:

- Ask them to turn on error tracking and session replays for a window of time ahead of the call, so the agent has fresh, real signals to act on by the time you meet.
- Have them get PostHog Desktop downloaded and their GitHub and PostHog connected, so they can kick off a PR live.
- Frame the cost honestly: offer to credit any usage on errors and replays during the demo window, since you need them on to show it at its best, and they can turn them back off after. If it wows them, they'll want to keep them on anyway, and that's the flywheel starting.

### Running it

Let them drive the whole way. You narrate, they click.

1. Have them open the PostHog Desktop inbox.
2. Walk them through what they're seeing in the reports and PRs tabs, using their own data.
3. Have them pick a report to inspect and kick off a PR from it themselves.
4. Explain the self-driving part: they can set it up to handle bugfix and maintenance PRs automatically, while humans still drive product decisions and new features. (This is the same line as "robots do maintenance, humans do creative work" below, made concrete.)

Because they're looking at their own product the whole time, the conclusion lands on its own, which is exactly the same dynamic that makes the core pitch work.

### The scout-led reverse demo (no soak window needed)

The source-led version above needs data to accumulate first. The scout-led version doesn't, which makes it the better opener for an account with historical data but nothing switched on yet.

1. In PostHog Desktop, open the scouts page and pick the **"Make a scout"** suggestion. It scans their actual project and proposes custom scouts grounded in their real data – which is itself the moment, because the suggestions are specific to them.
2. Let them pick the one that makes them go "huh, yeah, I'd want to know that."
3. [Run it on demand](/docs/self-driving/scouts#running-a-scout-on-demand) right there on the call – no waiting for a schedule, and a scout that's still disabled can be run this way.
4. Read what it filed together. If it's good, turn it on. If it's noisy, that's a demo too: show them the [dry run](/docs/self-driving/scouts#dry-runs) and [scout notes](/docs/self-driving/scouts#steering-a-scout-with-a-note), because "I can tell it that's known noise, in English" is often what closes it.

The thing to make land here is the memory. A scout reads back what earlier runs learned – what's normal, what it already surfaced, what it decided to hold – so it dedupes against itself and gets sharper. That's the difference between an agent and a cron job, and it's what justifies the price of a thing that mostly stays quiet.

## What a scout actually looks like

Abstract explanations of scouts land badly. Concrete ones land immediately, so keep a few in your back pocket.

PostHog ships around 30 **canonical scouts** out of the box – error tracking, product analytics, revenue analytics, experiments, feature flags, web vitals, session replay, data warehouse health, and more – each watching a common pattern, each toggled on or off per project. The full list with what each one looks for is in [scout examples](/docs/self-driving/scout-examples). Worth knowing: every canonical scout is just a readable markdown skill in our public repo, which is a good answer to "what is it actually doing?" from a skeptical engineer.

**Custom scouts** are where the pitch gets specific, and we run a lot of them on ourselves. Genericized, some of the shapes we dogfood internally:

- A scout that scores each day's new signups against our written ICP and files one ranked digest, instead of a firehose of signup notifications.
- A scout that watches a social-listening feed synced into the warehouse and surfaces live product problems people are hitting in public.
- A scout that reads our community Discord relay for recurring frustrations, clustered by theme rather than forwarded one by one.
- A scout that finds fast-growing accounts nobody on our side is working yet – the intersection of "taking off," "good profile," and "not already owned."
- A scout that watches for sustained multi-axis decline on commercially meaningful accounts: usage down _and_ spend down _and_ engagement down, ranked by revenue at risk.
- A scout that catches items in an already-automated queue that got classified but never actioned – the judgement layer on top of an existing detector.
- A scout that checks whether a merged fix actually held, re-measured after a soak window.
- Scouts that read a repo: docs drifting out of date, features shipped with no instrumentation, flags fully rolled out whose keys still litter the codebase.

The last few are worth calling out because they surprise people: a scout can watch things that never throw an exception. Silence where there should be a heartbeat. A promise event with no matching fulfillment. A classifier whose verdict rate is quietly drifting. None of those show up in error tracking, ever.

For customer-shaped ideas across verticals, and the [scout patterns cookbook](https://github.com/PostHog/posthog/blob/master/products/signals/skills/authoring-scouts/references/scout-patterns.md) behind them, send them to [scout examples](/docs/self-driving/scout-examples). For a deep dive with two real scouts traced end to end and a walkthrough video, [What is a scout?](/blog/what-is-a-scout) is the best single link to leave behind.

## The AI observability play

AI products are an easy self-driving pitch: they already know their agent misbehaves, and nobody is reading every trace. Two signal types turn [AI observability](/docs/ai-observability/start-here) data into inbox reports.

**Evaluations (rolled out to everyone).** [Ingest AIO events](/docs/ai-observability/start-here) → create an [online evaluation](/docs/ai-evals) that scores them → turn on [evaluation reports](/docs/ai-evals#evaluation-reports), where an agent reads a batch of results and writes up what it found. That summary is the signal.

The report is the step reps skip. An evaluation on its own is just a quality dashboard.

**Anomaly detection (alpha).** Ingest AIO events → add an [anomaly detection alert](/docs/alerts#anomaly-detection) on an AI errors, latency, or cost insight → enable agent investigation. The agent checks whether the anomaly is real and writes a notebook. Only true positives reach the inbox. Say the alpha part out loud.

Two things to get right on the call:

- **Anomaly investigation is the best "a scout is not an alert" demo we have.** They already have a latency alert and already ignore it.
- **Be straight about the free tier.** The first 100k LLM events a month are free and every eval run counts as one, so trying it is free but running evals at volume reaches paid sooner than they'd expect. Say both halves.

Scouts that explore AIO data directly are still WIP – sell these two for now.

## Run one on your own accounts first

The best preparation for pitching a scout is having one. You'll explain it better, you'll have a screenshot, and you'll know where the rough edges are before a customer finds them.

All of our "who owns what account" logic now lives in [customer analytics](/docs/customer-analytics) in PostHog, which is the source of truth for the accounts you look after. That means a scout can scope itself to _your_ book of business and watch it for you: usage surges and drops, a product tried for the first time or abandoned, new teammates appearing, a support ticket, an upcoming renewal, or a billing-page visit that reads as intent.

The nuggets are small and specific, and that's the point. A customer turning session replay on and then off again an hour later is exactly the kind of thing that's invisible in a dashboard, obvious in hindsight, and genuinely useful the same day. Ask yourself what you'd want a teammate to Slack you about, then make that the scout's bar.

Each scout can post what it finds to a Slack channel of your choosing, so route yours to a channel you actually read rather than adding another inbox to your day.

## How to frame it

These are framings that help the pitch land. Reach for them when a customer needs help picturing what self-driving actually means for their team.

- **Autonomy from instruction, not from the engineer.** Self-driving means the bots don't need to be told every step, not that they ship without you. Nothing gets Yolo-merged without your approval, so the engineer stays in control.
- **Robots do maintenance, humans do creative work.** Bots are great at fixing bugs and making optimizations, while people are best at building new features. Self-driving is compelling because it puts maintenance mode on autopilot and frees you up to be in build mode.
- **It belongs in a shared workspace.** The Slack app is a hit because it brings self-driving behavior into a space the whole team shares. Marketers can prompt work, engineers can help steer it, and everyone gets to feel like an F1 driver.
- **It's more than cruise control.** Agentic workflows from other companies are basically cruise control, keeping you in the lane you already picked. Self-driving takes you down a road you didn't know was there.
- **A scout is the teammate who reads the dashboards nobody opens.** Everyone has metrics they'd check if they had time. A scout is the colleague who checks them every day and only says something when it matters.
- **You're buying silence, not volume.** A good scout mostly tells you nothing. That's the product working. If it talked every day you'd stop reading it, which is exactly what happened to their alerting.

## Objections and what not to promise

Getting these right up front is what stops a great first call becoming a rough second month.

| What they say | How to handle it |
|---|---|
| "So it merges code on its own?" | No. Agents open PRs, humans review and merge. Autonomy is from instruction, not from the engineer. Never soften this one. |
| "Won't this be noisy?" | Legitimately possible, and don't wave it away. Explain the three dials: dismiss or snooze a report with a note and later runs read it, leave a [scout note](/docs/self-driving/scouts#steering-a-scout-with-a-note) in plain English, or slow the schedule. Triaging honestly is how scouts get quieter – you don't have to go and edit anything. |
| "How is this different from alerts we already have?" | Alerts fire on thresholds. Scouts hold judgement, remember what they already said, and weigh how much something matters. And if an alert genuinely solves it, say so. |
| "Can it watch _X_?" (something not in PostHog) | If it can land in PostHog – warehouse table, connector, Slack relay – yes. If it can't, say so plainly. "Get it into PostHog first" is a real answer, and it's the flywheel. |
| "What's it actually doing in there?" | Every canonical scout is a readable markdown skill in our public repo, and every run records its full reasoning. Show them, especially with engineering buyers. |
| "What does it cost to run?" | Runs come out of a project's daily run budget, and the schedule is the main dial. Frame it honestly: a tighter cadence mostly pays to re-confirm nothing changed. Slow a chatty scout down before turning it off. See [self-driving pricing](/docs/self-driving/pricing) for the current numbers – check it rather than quoting from memory, it's still moving. |
| "Can we try it without it doing anything?" | Yes – [dry run](/docs/self-driving/scouts#dry-runs) mode runs the scout and records everything it would have filed without writing to the inbox. Great for cautious or high-stakes teams. |

Things not to promise: that it replaces anyone, that it catches everything, that reports always become PRs, or that it's finished. It's in open beta, it's improving fast, and saying so builds more credibility than pretending otherwise.

## Common mistakes

- **Defaulting to whichever one you explain best.** The most common version is opening on the sources grid because it demos in ten seconds, but the reverse happens too – reps who love scouts pitching judgement to a team whose actual requirement is "we cannot miss one." Let discovery pick, not habit.
- **Framing them as either/or.** Most customers end up with both, and the trade between determinism and judgement is a strength of the product, not an awkward question to dodge. Reps who explain the trade honestly sound like they know the product; reps who claim one does everything sound like they're selling.
- **Demoing on an empty project.** Self-driving has nothing to say without data, and a scout that finds nothing on the call reads as "the product doesn't work" rather than "there's no data yet." Check what's flowing before you commit to a live demo, and use the [pre-call prep](#pre-call-prep) if it's thin.
- **Explaining the architecture instead of their problem.** Nobody buys a pipeline diagram. The five parts exist so you can answer questions confidently, not so you can present them. If you're three minutes into signals-versus-sources and they haven't mentioned their own product once, you've lost the thread.
- **Pitching a scout where an alert would do.** If they describe one metric and one threshold, sell them the alert. Saying "you don't need us for that" buys more credibility than the deal you'd have talked them into.
- **Leaving without a specific scout.** "We'll follow up on self-driving" dies in the inbox. "We'll point a scout at your onboarding funnel and I'll send you what it finds Thursday" doesn't.
- **Overpromising the PR.** The PR is the flashiest end state, not the guaranteed one. A rep who promises auto-fixes creates a churn risk in week two for a demo moment in week one.
- **Being vague about beta.** They will find the rough edges. Naming them first makes you the person who told them, not the person who didn't.

Specific beats generic every time, so watch the language. "It surfaces actionable insights from your data" is the kind of sentence that makes a buyer stop listening. "It'll tell you when someone turns on session replay and then turns it off an hour later" is the kind that makes them ask a follow-up question.

## Cheat sheet

For the five minutes before a call.

- **The chain:** something watches (source or scout) → signals → grouped into a report → inbox researches it → agent opens a PR → human merges.
- **Source = one stream, continuous, exhaustive, predictable. Scout = scheduled, exploratory, selective, steerable.** Both land in the same inbox, and most customers run both.
- **The trade in one line:** sources give determinism and guaranteed coverage, scouts give judgement and steerability. Neither is the upgrade.
- **Lead with sources** when missing one is unacceptable. **Lead with scouts** when everything is technically "something" and they need a filter.
- **Best discovery question:** "What does someone on your team open every morning?"
- **The question that separates the two:** "Should everything in that stream get worked, or does someone need to decide what matters first?"
- **Best demo move:** toggle a source and watch the queue fill, or make a scout on their data and run it on demand, live.
- **Best close:** one concrete thing pointed at one thing they care about.
- **On an AI account:** eval + [evaluation report](/docs/ai-evals#evaluation-reports) ships today, anomaly detection + agent investigation is alpha. Both need [AIO events](/docs/ai-observability/start-here) flowing first.
- **Never promise:** auto-merge, total coverage from a scout, or a PR from every report.
- **Links to leave behind:** [What is a scout?](/blog/what-is-a-scout), [scout examples](/docs/self-driving/scout-examples), [self-driving docs](/docs/self-driving).
- **Have open in another tab:** [the FAQ](/docs/self-driving/faq) for anything you get asked cold, and [pricing](/docs/self-driving/pricing) so you never guess at a number.

## Iterating on this page

We're actively refining this pitch. If you run it and learn something, whether what resonated, what fell flat, or a better way to frame the flywheel, add it here so the whole team gets sharper.
