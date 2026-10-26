---
title: Running reverse demo calls
sidebar: Handbook
showTitle: true
---

Most customer calls follow the same script. You agree to topics in advance, audit the account, prepare a demo, then spend the call walking the customer through what you prepared. It works, but it puts you in front of the customer instead of beside them, and it caps a call at the two or three things you had time to prepare for.

A [reverse demo](https://www.clay.com/blog/reverse-demo) (a term Clay recently popularized) flips that script. Instead of you driving a polished demo environment, the customer drives their own account and their own data, and does most of the talking. You may also hear these called customer-led calls. The detailed answers come afterwards, in writing.

This applies to every customer-facing team, whether you are selling to a prospect, onboarding a new account, or checking in with a long-standing customer. It has worked well enough that we recommend it as the default. There is also a specific version for [showing self-driving](#reverse-demos-for-self-driving) on the customer's own data.

## The old way

1. Agree topics with the customer ahead of time.
2. Audit the account and prepare demos for those topics.
3. On the call, set the agenda and demo what you prepared.

The problem is not the prep, it is the assumptions. You audit what you guess matters, you demo what you guess helps, and the customer spends the call watching. If they think of something new halfway through, there is no room for it.

## The reverse demo way

1. **Still agree topics ahead of time.** The customer should know what the call is for.
2. **Set the agenda at the start**, and make it explicit that this call is theirs. Tell them you want them to walk you through how they use PostHog, where they hit bottlenecks, what they have already tried, what questions they have, and what would move the needle most for them.
3. **Ask about goals first.** What are they trying to achieve, which metrics matter, and what do they care about most right now. Everything else on the call gets weighed against this.
4. **Have them demo to you.** Screen share on their side, not yours. Watch how they actually use the product, what they click, where they hesitate, and what they work around. See what is confusing.
5. **Tell them up front that you will follow up in writing** with specifics for everything covered. Notes, screenshots, click-by-click walkthroughs, and Loom videos where they help. They should leave the call knowing they do not need to remember anything.
6. **Recap before you end.** Repeat back everything you heard and get them to confirm each point, so you know exactly what they need before you start working on it.

After the call, do the audit. Now it is driven by what they told you rather than what you guessed, and each follow-up can go as deep as it needs to.

## Why it works

- **The customer talks, you learn.** You see their real constraints, their real workflow, and the things they have already tried. That is information you cannot get from just an account audit.
- **The value shows up in their product.** Working in their own account with their own data is a faster path to the aha moment than a sandbox or a demo project.
- **You come back with more.** A prepared demo covers two or three pain points. Letting the customer go deep routinely surfaces significantly more, because people think of more as they talk.
- **The follow-up is better than a live demo.** Each item gets polished instructions, screenshots, or a short video, delivered so they can work through it at their own pace. They learn how to do it themselves, not just how to solve today's problem.
- **It takes the pressure off.** You do not need every answer on the call, you do not need to rush through a list, and you rarely need a second call because time ran out.
- **It removes prep based on guesswork.** The audit happens after the call and targets exactly what they raised.

## When to use it

Use this as the default for check-ins, health calls, and any call where the customer has brought their own list. It is especially useful if you tend to feel nervous going into calls or feel like you are racing the clock, because the structure gives the customer the floor and gives you the room to answer properly afterwards. Defer to the follow-up if needed.

A reverse demo needs something for the customer to drive. Existing customers already have data flowing, so it fits them naturally. Prospects who have not connected anything yet usually need to get data in first, so plan for that before the call.

Keep the old approach for calls that are genuinely about showing something new, like a product launch walkthrough or a [training session](/handbook/growth/sales/customer-training) the customer asked for. Make sure the customer knows what to expect before the call if this is the approach you're taking.

## Helpful sample checklist

Before the call

- [ ] Topics agreed with the customer
- [ ] Agenda ready, framed around them walking you through their setup

On the call

- [ ] Ask about goals, metrics, and what matters most
- [ ] Customer shares their screen and demos
- [ ] Capture bottlenecks, things tried, questions, and what would move the needle
- [ ] Say that everything will be followed up in writing
- [ ] Recap and confirm each point

After the call

- [ ] Audit the account against what they raised
- [ ] Send the follow-up with notes, screenshots, walkthroughs, and videos per item
- [ ] Log the outcomes in the account notes

## Reverse demos for self-driving

The same format is the best way to show [self-driving](/docs/self-driving), because the customer experiences it on their own data. For the pitch itself, what to say and which parts to lead with, see [how to pitch self-driving](/handbook/growth/sales/how-to-pitch-self-driving).

The catch for us is that this only works once there's enough clean data in PostHog for the agent to act on. Clay can have someone build a lead list on the first call before they're even a customer. We can't conjure signals out of an empty project. That makes the reverse demo a great fit for existing customers who already have the data flowing (a natural play for TAMs), and a tougher one for prospects who haven't connected anything yet (TAEs will usually need to get data flowing first, see the pre-call prep below).

There are two versions. The source-led version needs data to accumulate first. The [scout-led version](#the-scout-based-reverse-demo) doesn't.

### Pre-call prep

The source-led demo depends on there being real signals to work from, so set that up before the call.

- Ask them to turn on error tracking and session replays for a window of time ahead of the call, so the agent has fresh, real signals to act on by the time you meet.
- Have them get PostHog Desktop downloaded and their GitHub and PostHog connected, so they can kick off a PR live.
- Frame the cost honestly. Offer to credit any usage on errors and replays during the demo window, since you need them on to show it at its best, and they can turn them back off after. If it wows them, they'll want to keep them on anyway, and that's the flywheel starting.

### Demo flow

Let them drive the whole way. You narrate, they click.

1. Have them open the PostHog Desktop inbox.
2. Walk them through what they're seeing in the reports and PRs tabs, using their own data.
3. Have them pick a report to inspect and kick off a PR from it themselves.
4. Explain the self-driving part. They can set it up to handle bugfix and maintenance PRs automatically, while humans still drive product decisions and new features.

Using their data for this makes it click and gets them to the "aha!" moment much more quickly.

### The scout-based reverse demo

No data prep or pre-ingest needed. This makes it the better opener for an account with historical data but nothing switched on yet.

1. In PostHog Desktop, open the scouts page and pick the **"Make a scout"** suggestion. It scans their actual project and proposes custom scouts grounded in their real data, which is itself the moment, because the suggestions are specific to them.
2. Let them pick the one that makes them go "huh, yeah, I'd want to know that."
3. [Run it on demand](/docs/self-driving/scouts#running-a-scout-on-demand) right there on the call. There is no waiting for a schedule, and a scout that's still disabled can be run this way.
4. Read what it filed together. If it's good, turn it on. If it's noisy, that's a demo too. Show them the [dry run](/docs/self-driving/scouts#dry-runs) and [scout notes](/docs/self-driving/scouts#steering-a-scout-with-a-note), because "I can tell it that's known noise, in English" is often what closes it.

The thing to make land here is the memory. A scout reads back what earlier runs learned so it dedupes against itself and gets smarter.

For ideas that work across verticals, and the [scout patterns cookbook](https://github.com/PostHog/posthog/blob/master/products/signals/skills/authoring-scouts/references/scout-patterns.md) behind them, send them to [scout examples](/docs/self-driving/scout-examples). For a deep dive with two real scouts traced end to end and a walkthrough video, [What is a scout?](/blog/what-is-a-scout) is a good reference.
