---
title: "Self-Driving is out of beta (we finally fixed the pricing, too)"
date: 2026-11-09
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/Self_driving_pricing_1x_d2d6846f08.png
featuredImageType: full
author:
    - joe-martin
category: PostHog news
tags:
    - Product updates
    - AI
seo:
    metaTitle: "Self-Driving is out of beta (we finally fixed the pricing, too)"
    metaDescription: "PostHog Self-Driving is out of beta. See how Juno, SoundBoost, Higgsfield, and our own team use it, and how the new per-run pricing works."
---

In July we launched PostHog [Self-Driving](/self-driving) as an open beta. Our agents dug through your product data, found things worth fixing, and tried to fix them. Their fix rate is now high enough that it's out of beta, and it has real pricing.

If pricing is all you came for, skip ahead to the pricing section. For everyone else, here's what thousands of teams, including ours, are doing with it.

## Juno merged 26 of the last 30 PRs our agents opened

[Juno](/customers/juno) is an AI health assistant for people living with chronic illness. It came out of YC's Spring 2026 batch and already has 250,000 users, but it's a hard product to debug. It has to strip PII everywhere, it runs on multiple platforms, its users vary wildly, and the team behind it is small.

Self-Driving doesn't need to see the personal data, and it doesn't care how many platforms or engineers you have. It pieces the story together from Error Tracking and Product Analytics, writes it up as a [report](/docs/self-driving/reports), and turns actionable reports into PRs if you want them.

Juno's team merged 26 of the agents' last 30 PRs straight away. Some fixed bugs, like chat boxes that hung. Others added features, like a "Log all" button that makes medication tracking quicker for people juggling several prescriptions. All of them made health tracking a bit less tiring for Juno's users.

## SoundBoost rolled back a domain migration because a report told it to

[SoundBoost](/customers/soundboost) is an AI mastering tool with 225,000 users and a team of four. Founder Berkan Cesur starts every morning in the Self-Driving Inbox, where reports rank what to fix next. "If we fix 10% here, 5% there? Those gains add up, and PostHog compiles that into a menu for me," he says.

Most mornings, reports are bug fixes and performance work, but one morning it was an existential problem. Self-Driving noticed daily clicks from Google had dropped to zero shortly after SoundBoost moved from an .ai domain to a .com. 

The team assumed Google was lagging on the new domain and was ready to leave it be, but the report showed that conversions had stopped, traffic was down, and their best funnel was gone. They rolled back to .ai immediately and the Google traffic came back.

The diagnosis was fast because Berkan tracks every button and feature as an [action](/docs/data/actions), which he can then query using the [PostHog MCP](/mcp) in his editor. He used to review every self-driving PR line by line. Now he merges them almost instantly.

## Our self-driving team let Self-Driving drive itself

We run Self-Driving on PostHog itself, because obviously. One [report](/docs/self-driving/reports) showed that our agents passed on thousands of chances to open a PR each day, and no chart showed why. The agent behind it wrote a query, broke the skips down by reason, checked the numbers, and added a chart to the team dashboard.

![A self-driving report on why our agents skipped PRs](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Screenshot_2026_11_03_at_10_05_19_27f74b08da.png)

The chart got <TeamMember name="Andy Maguire" />, a product engineer on the team, digging into why the work was failing. That investigation is a big part of why Self-Driving is out of beta today. It also taught us that a report can be worth as much as a PR.

Another report compared merge rates across the models our agents can use to write PRs. It flagged that one model had roughly half the merge rate of the others, then Self-Driving kept watching to check the gap held as the sample grew. It held. The model was GPT-6-luna-flex, by the way.

We can't fix the model, but we can steer users away from it before it gives them a bad experience, so that's what we do now. Without that report we might not have noticed for weeks.

<iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/QefP1WAXhc0"
    title="See what self-driving looks like in practice"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
></iframe>
<Caption>See what self-driving looks like in practice. Warning: This video includes pickleball</Caption>

## Higgsfield merges self-driving PRs without opening PostHog

Self-driving PRs go straight to GitHub, and the Inbox is accessible over MCP and other surfaces. If your team works AI-native and rarely logs in to PostHog's web interface, it still fits your workflow.

[Higgsfield](https://higgsfield.ai/), an AI creative suite, works this way. The team has merged over 120 self-driving PRs, all of them from GitHub. It points Self-Driving at error tracking [signals](/docs/self-driving/signals) and reviews the output alongside their daily work. Fixes so far include broken Stripe tracking and noisy exceptions that showed up as errors when they weren't.

## "All I want to know about is the pricing"

Every new org gets $10 off Self-Driving in its first month. That's enough for up to five reports, so you can see what the agents find in your product before you pay anything. After that, you pay for what you use:

- **You pay per run.** A scout scan, a signals investigation, or a PR implementation each counts as one run, and each one tells you what it cost.

- **Not all runs cost the same.** Cost depends on how much context the agent reads and how long it spends in a sandbox. Light runs cost cents. Deep dives into your data cost more.

- **You only pay for what you turn on.** Choose reports, PRs, or both. Billing limits cap what you spend.

In the beta we charged $15 per PR and gave the reports away for free. That turned out to be backwards. The research is where the agents do most of the work, and it's the part people care about most, so now every run is billed, reports included. Automatic PRs are turned off by default, so you can keep an eye on how useful they are while you get used to the system. 

> **Controlling your costs:** We've updated [our Self-Driving pricing docs](/docs/self-driving/pricing#ask-your-agent) with more information, including a [`managing-self-driving-spend` skill](https://github.com/PostHog/posthog/blob/master/products/signals/skills/managing-self-driving-spend/SKILL.md) you can call through [the PostHog MCP](/mcp). 

### If you used the beta

Your org stays on beta pricing until December 9, 2026. From that day you move to per-run pricing like everyone else.

For some of you that means a bigger bill. We'll email every org whose monthly cost goes up by more than $200, or more than doubles past $50 (about 300 of you), and offer a call with one of our engineers to tune your setup, so you're not paying for work that isn't earning its keep.

<!-- TODO: restore this sentence at the end of the paragraph above once PostHog/posthog#124825 is merged:
We've also built a skill to help you manage spend. Ask your agent to run the `managing-self-driving-spend` skill through the [PostHog MCP](/mcp) to get started. -->

Two more things to know:

1. If you removed your billing limit during the beta, we're putting one back at $150. Raise it whenever you like. We'd rather you chose to spend the money than found out you had.

2. If you have credits or a billing limit, your spend might not change, but your usage might count against it at a different rate. If it's faster, you'll hit the limit earlier than you did in the beta and runs will stop. The call above is for you too.

## What's next for the Self-Driving Inbox?

We assumed auto-generated PRs would be the draw, and they are interesting, but once people had the beta in their hands they spent their time on the _reports_. We think that's because people care more about work they were involved in than work they didn't ask for. Better reports make better PRs anyway, if PRs are what you want.

You can see what the agents are working on right now. [Our docs have a public feed of real reports we found useful](/docs/self-driving/from-our-inbox), curated by our own agents. Once a day they read our Inbox, pick new examples, and open a PR to add them to the page.

Everything above is available today. [Set up Self-Driving](/docs/self-driving/setup), browse [examples](/docs/self-driving/scout-examples) of what else self-driving can watch, and check [what your first month looks like](/docs/self-driving/pricing).

