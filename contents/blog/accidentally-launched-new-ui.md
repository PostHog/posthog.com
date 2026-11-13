---
title: "We accidentally launched our new UI"
date: 2026-11-13
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/we_accidentally_launched_our_new_ui_3_956a71ad00.png
featuredImageType: full
author:
    - cleo-lant
category: PostHog news
tags:
    - Product updates
    - AI
seo:
    metaTitle: "We accidentally launched our new UI"
    metaDescription: "A flag change shipped PostHog's redesign to 9,000 people for two hours. Here's the new Home and nav rail, what we learned, and how to opt in."
---

> **TL;DR:** The new Home page opens on what needs your attention today. A new nav rail down the left sorts every product by the question it answers. It's opt-in, changing based on your feedback, and if you *really* don’t like it, you can switch back (until early 2027). [Try the new design →](https://app.posthog.com/settings/user-feature-previews#today-rail-nav)

We planned to launch the PostHog Web redesign through a sensible, controlled rollout. Instead, we accidentally shipped it to everyone.

On November 2, Ruby was opting a user out of the internal testing flag for the new UI. The conditions of the flag, to her memory, were reordered, and there was a 0% rollout condition at the bottom. So she clicked on it (to remove it), thinking she’d added it by accident. Instead of opting her user out as planned, she removed the condition *preventing* all users from seeing it.

For two hours and 23 minutes, about 9,000 people in 7,800 organizations opened PostHog to a homepage and sidebar they'd never seen, with no explanation and no way back.

Users on X noticed before we did.

![Posts on X from users reacting to the new PostHog UI on November 2](https://res.cloudinary.com/dmukukwp6/image/upload/x_ui_nov_2_grabs_4d197a3311.png)

We turned it off shortly after, and [generated a PR](https://github.com/PostHog/posthog/pull/127717) with a confirmation step for flag rollouts. Ruby then replied to everyone who posted with the truth: we shipped it by mistake.

Most people were curious, and a few even asked to be opted back in. Those who were upset weren’t upset about the UI, but the lack of warning. So consider this a warning, and one you can [opt yourself into](https://app.posthog.com/settings/user-feature-previews#today-rail-nav).

## Why focus on UI when people are using agents?

UI refreshes are generally considered “low-leverage” product work because users don’t care much about fonts and color. A new UI lands like a new logo (“why should I care?”) and can feel corporate and try-hard.

We did it anyway because of two phrases we hear a lot:

<div className="flex justify-center">
<img src="https://res.cloudinary.com/dmukukwp6/image/upload/new_ui_meme_faf0391fde.jpg" alt="Meme: what users expect from your exciting new UI launch, showing two near-identical school photos of the same kid in a different shirt" />
</div>

### 1. “The PostHog UI is overwhelming”

We’ve heard this for years. Tim, our co-founder, reckons every other tweet about us says some version of it (he’s not far off).

Customers say it on calls too. When we sorted the complaints from our recorded customer calls by topic, usability came up about twice as often as anything else. The biggest theme: PostHog is too big and too hard to learn, especially if you’re not an engineer.

No wonder. There are (quite literally) thousands of things to do in PostHog. A single [Trends chart](/docs/product-analytics/trends/overview) has at least 9,600 possible setups before you add a filter. The Web app has 236 pages, but just ten pages get more than half of all pageviews. Every extra choice slows people down (that’s [Hick’s law](https://lawsofux.com/hicks-law/)).

We needed to fix how you get in, do what you need, and get out.

### 2. “I want to check my agents’ work”

Nearly half of everything people create or change in PostHog now happens through [the MCP](/mcp), and we’re actively encouraging it. So is a redesign of the web app even worth it?

Yes, because the data says [you’re still looking at it](/blog/agents-killing-ui). MCP users work with their agent, then check a [dashboard](/dashboards) or flag in the web app. Last week, about 40,000 users came back to the web app within an hour of an MCP call. Most went straight to a dashboard (~11K people), then [session replays](/session-replay) (~6K), then insights, [web analytics](/web-analytics), [feature flags](/feature-flags) and [experiments](/experiments) – typically under a minute later.

They're either clicking a link their agent gave them, or opening a new tab, y’know, “just to check”. They want an instant sense of state and, perhaps more importantly, a feeling of control.

## What’s new and worth your attention

A sense of state is exactly what the new Home is for. The old home was a list of pages you could open. The new one is a short briefing, built from your own product data, to answer: what needs my attention today?

It has three parts:

1. **At a glance.** Four key numbers with sparklines. We suggest them at first (look for the sparkles). Pin your own from Edit, or with "Add to home" in any insight's menu. Hovering over a sparkline opens a modal with a detailed view so you don’t need to open another page.
2. **Jump back in.** The last few things you opened, each with a hover card that shows where it lives.
3. **For you today.** If you have [self-driving](/blog/self-driving-ga) set up, the highest-priority reports are listed here. Each one says what changed, shows the evidence, and lets you ask [PostHog AI](/ai) about it without leaving the page. If you don’t use self-driving, reports are snapshots of risks, opportunities, and notable changes in your product data.

Above that is a task composer. Type what you want done, and PostHog AI kicks off the work.

![The new PostHog Home with a task composer, At a glance numbers, Jump back in, and For you today reports](https://res.cloudinary.com/dmukukwp6/image/upload/today_home_changelog_8c94bafbf4.png)

Note: orgs without AI features won’t see the task composer or self-driving reports.

## The nav rail sorts PostHog by the question you're asking

If you’ve used PostHog for a while, you’ve seen [many versions of the sidebar](/blog/redesigned-nav-menu). The new rail has five items, each built around a question you’d actually ask of your data.

| Nav item | What lives there | The question it answers |
| :---- | :---- | :---- |
| Home | Your briefing: reports, key numbers, recents | What needs my attention today? |
| Chats | PostHog AI threads, spaces, and tasks you've started | Can you do this for me? |
| Analytics | Dashboards, insights, web analytics, session replay, heatmaps, SQL, notebooks | What happened, and who did it? |
| People | Persons, accounts, cohorts, customer analytics, plus surveys, support, workflows and product tours | Who are my users, and how do I reach them? |
| Products | Every PostHog product in one searchable list, plus self-driving, activity, and people and groups | Where’s the tool I need? |

Some of these took a lot of debate, and we haven’t nailed it (yet). For example, **Analytics** is one item because people go from web analytics to a replay to the [SQL editor](/sql) in one session, and splitting them up takes needless clicks.

If you disagree on the hierarchy, let [Adam Leith](/community/profiles/32193) know.

## Eighteen interviews couldn't tell us what two hours did

I wouldn’t recommend it as a research method, but the accidental rollout gave us more data in two hours than weeks of interviews did.

Before this, [Ruby](/community/profiles/44280) had spent weeks screen-sharing the new UI with users, asking what they thought and writing it all up. People wanted to customize Home, said our default charts were the wrong ones, and found “For you today” empty unless they used self-driving.

Two hours gave us 2,000 session replays to run through [Replay Vision](/replay-vision). Nearly 20% of people used Jump back in. And only 1.1% opened a report in “For you today”, mostly because 76% had nothing in it (we’ve fixed that). Interviews had already told us why the rest didn’t bother clicking: the reports felt redundant or wordy.

We [talk to users](/newsletter/talk-to-users) a lot. You should too, but keep in mind it’s just a controlled slice of reality. Folks who agree to a 30-minute call tend to like you (several opened by telling Ruby how much they love PostHog). And when they get stuck, someone’s right there to help.

To see what people actually do, sometimes you just have to ship it.

![A Slack thread confirming the new UI rolled out to 100%, next to a PostHog post with an "it's so over, we're so back" yin-yang meme](https://res.cloudinary.com/dmukukwp6/image/upload/its_so_over_were_so_back_9596dd326d.png)

## Complaints welcome (until early 2027)

Worried you can’t find something? Nothing was removed, and pages keep their URLs, so bookmarks and shared links still work. Every sidebar has a search box that filters as you type, and Cmd+K still searches everything.

Turn on the new UI in [feature previews](https://app.posthog.com/settings/user-feature-previews#today-rail-nav), or wait for the in-app prompt when you log into PostHog Web. If it gets in your way, click "Use old navigation" and you're back instantly. Do us a favor though and fill out the quick survey (we'll actually read it).

### Things we’re still working on

- **A more useful Home:** better default numbers in At a glance (you told us ours were the wrong ones), and smarter picks for which self-driving reports land in For you.
- **Release:** a nav item for feature flags, experiments and early access.
- **Monitor:** a nav item for [error tracking](/error-tracking), [logs](/logs), metrics, tracing, uptime, [AI observability](/ai-observability) and MCP analytics in one place. Each is small on its own, but together they’re an engineer’s daily to-do list.
- **Data:** a nav item for sources, definitions, pipelines and batch exports.
- **Canvases:** generated views built on your data, for anything a dashboard or notebook can’t show.
- **PostHog AI 2.0:** pick your own model, run agents in the cloud, and BYOS.

P.S. Not everyone loved the old UI. On Reddit, one user said: "Posthog ui is unusable, better just connect an MCP and talk to it."

Fair enough. Our goal with the new UI is that you'll spend less time in PostHog and more time in your own product. Either way, [you don’t have to use PostHog](/mcp) to use PostHog.
