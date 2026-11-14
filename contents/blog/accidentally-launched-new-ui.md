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

For two hours and 23 minutes, about 9,000 people in 7,800 organizations opened PostHog to a homepage and sidebar they'd never seen, with no explanation and no way back.

Users on X noticed before we did.

![Posts on X from users reacting to the new PostHog UI on November 2](https://res.cloudinary.com/dmukukwp6/image/upload/x_ui_nov_2_grabs_4d197a3311.png)

How’d that happen? Ruby, the PM for team surfaces, was taking one user off the internal testing flag for the new UI. The flag’s conditions weren’t in the order she remembered, and a 0% rollout condition sat at the bottom. She figured she’d added it by accident and deleted it. But that condition was the one keeping everyone else *out*.

With it gone, the flag turned on for everyone.

After a brief moment of panic, we realized most people were curious about the new UI, and a few even asked to be opted back in. Those who were upset weren’t upset about the change itself, but the lack of warning.

A few others asked the obvious question: if people are handing more of the work to agents, why redo the UI at all?

## Too much PostHog

It’s been a theme for years: “The PostHog UI is overwhelming.” Tim, our co-founder, reckons every other tweet about us says some version of it (he’s not far off).

Customers say it on calls too. When we sorted the complaints from our recorded customer calls by topic, usability came up about twice as often as anything else. The biggest theme: PostHog is too big and too hard to learn, especially if you’re not an engineer.

No wonder. There are (quite literally) thousands of things to do in PostHog. A single [Trends chart](/trends) has at least 9,600 possible setups before you add a filter. The Web app has 236 pages, but just ten pages get more than half of all pageviews. Every extra choice slows people down (that’s [Hick’s law](https://lawsofux.com/hicks-law/)).

We needed to fix how you get in, do what you need, and get out.

### The new nav sorts PostHog by the question you're asking

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

## Agents do the work. People still check it.

Nearly half of everything people create or change in PostHog now happens through [the MCP](/mcp), and we’re actively encouraging it.

Yes, because the data says [you’re still looking at it](/blog/agents-killing-ui). MCP users work with their agent, then check a [dashboard](/dashboards) or flag in the web app. Last week, about 40,000 users came back to the web app within an hour of an MCP call. Most went straight to a dashboard (~11K people), then [session replays](/session-replay) (~6K), then insights, web analytics, [feature flags](/feature-flags) and [experiments](/experiments) – typically under a minute later.

They're either clicking a link their agent gave them, or opening a new tab, y’know, “just to check”. They want an instant sense of state and, perhaps more importantly, a feeling of control.

### The new Home shows you what needs your attention

A sense of state is exactly what the new Home is for. The old home was a list of pages you could open. The new one is a short briefing, built from your own product data, to answer: what needs my attention today?

It has three parts:

1. **At a glance.** Four key numbers with sparklines. We suggest them at first (look for the sparkles). Pin your own from Edit, or with "Add to home" in any insight's menu. Hovering over a sparkline opens a modal with a detailed view so you don’t need to open another page.
2. **Jump back in.** The last few things you opened, each with a hover card that shows where it lives.
3. **For you today.** If you have [self-driving](/blog/self-driving-ga) set up, the highest-priority reports are listed here. Each one says what changed, shows the evidence, and lets you ask [PostHog AI](/ai) about it without leaving the page. If you don’t use self-driving, reports are snapshots of risks, opportunities, and notable changes in your product data.

Above that is a task composer. Type what you want done, and PostHog AI kicks off the work.

![The new PostHog Home with a task composer, At a glance numbers, Jump back in, and For you today reports](https://res.cloudinary.com/dmukukwp6/image/upload/today_home_changelog_8c94bafbf4.png)

Note: orgs without AI features won’t see the task composer or self-driving reports.

## Peer reviewed by a few thousand strangers

We wouldn’t recommend it as a research method, but the accidental rollout gave us more data in two hours than weeks of interviews did: 2,000 session replays, which we ran through [Replay Vision](/replay-vision). Nearly 20% of people used Jump back in. Only 1.1% opened a report in “For you today”, and 76% of people had none to open (we’ve fixed that).

Ruby had already spent weeks screen-sharing the new UI with users, asking what they thought and writing it all up. People wanted to customize Home, said our default charts were the wrong ones, and couldn’t find things that used to live somewhere familiar. They also told her the reports felt redundant or wordy. We fixed all of it, but only as fast as the feedback came in.

We [talk to users](/product-engineers/user-research) a lot. You should too, but a call is a controlled slice of reality. People who agree to 30 minutes tend to like you (several opened by telling Ruby how much they love PostHog). And when they get stuck, someone’s right there to help.

To see what people actually do, sometimes you just have to ship it.

![A Slack thread where PostHog AI confirms the new UI rolled out to 100% and a reply calls it one way to get early feedback, next to a "we're so back, it's so over" yin-yang meme](https://res.cloudinary.com/dmukukwp6/image/upload/slack_one_way_to_get_feedback_89e77f875a.png)

## Complaints welcome

The new UI has one job: get you back to your own product faster. If you hate it, no worries – you can still [use PostHog without using PostHog](/mcp).

Worried you can’t find something? Nothing was removed, and pages keep their URLs, so bookmarks and shared links still work. Every sidebar has a search box that filters as you type, and Cmd+K still searches everything.

Turn on the new UI in [feature previews](https://app.posthog.com/settings/user-feature-previews#today-rail-nav), or wait for the in-app prompt when you log into PostHog Web. If it gets in your way, click "Use old navigation" and you're back to the old UI instantly (until early 2027). Do us a favor though and fill out the quick survey (we'll actually read it).

P.S. Ruby [made sure](https://github.com/PostHog/posthog/pull/127717) the next person gets a confirmation prompt before a flag goes out to everyone.
