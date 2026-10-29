---
title: "Self-driving is out of beta, and we finally fixed the pricing too"
date: 2026-10-29
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
# TODO: add featuredImage (bare Cloudinary URL, no transform segment) and featuredImageType: full
author:
    - joe-martin
category: PostHog news
tags:
    - Product updates
    - AI
seo:
    metaTitle: "Self-driving is out of beta, and we finally fixed the pricing too"
    metaDescription: "PostHog self-driving is out of beta. See how Juno, SoundBoost, Higgsfield, and our own team use it, and how the new per-run pricing works."
---

In July we launched the PostHog self-driving Inbox as an open beta. Our agents dug through your product data, found things worth fixing, and tried to fix them. Their fix rate is now high enough that it's out of beta, and it has real pricing.

The pricing is on [our pricing page](/pricing). If that's all you came for, skip to [the pricing section](#all-i-want-to-know-about-is-the-pricing). For everyone else, here's what thousands of teams, including ours, are doing with it.

## Juno merged 26 of the last 30 PRs our agents opened

[Juno](/customers/juno) is an AI health assistant for people living with chronic illness. It came out of YC's Spring 2026 batch and already has 250,000 users, but it's a hard product to debug. It has to strip PII everywhere, it runs on multiple platforms, its users vary wildly, and the team behind it is small.

Self-driving doesn't need to see the personal data, and it doesn't care how many platforms or engineers you have. It pieces the story together from rage clicks, error reports, and analytics, writes it up as a [report](/docs/self-driving/reports), and turns actionable reports into PRs if you want them.

Juno's team merged 26 of the agents' last 30 PRs straight away. Some fixed bugs, like chat boxes that hung. Others added features, like a "Log all" button that makes medication tracking quicker for people juggling several prescriptions. All of them made health tracking a bit less tiring for Juno's users.

## SoundBoost rolled back a domain migration because a scout told it to

[SoundBoost](/customers/soundboost) is an AI mastering tool with 225,000 users and a team of four. Founder Berkan Cesur starts every morning in the self-driving Inbox, where reports rank what to fix next. "If we fix 10% here, 5% there? Those gains add up, and PostHog compiles that into a menu for me," he says.

Most mornings that's bug fixes and performance work, but one morning it was an existential problem. A scout noticed daily clicks from Google had dropped to zero shortly after SoundBoost moved from an .ai domain to a .com. The team assumed Google was lagging on the new domain and was ready to leave it be, but the report showed that conversions had stopped, traffic was down, and their best funnel was gone. They rolled back to .ai immediately and the Google traffic came back.

The diagnosis was fast because Berkan tracks every button and feature as an [action](/docs/data/actions), mostly through the [PostHog MCP](/mcp) from his editor. He used to review every self-driving PR line by line. Now he merges them almost instantly.

## Our self-driving team let self-driving drive itself

We run self-driving on PostHog itself, because obviously. One [scout](/docs/self-driving/scouts) noticed we were skipping thousands of potential self-driving PRs a day and had nothing measuring why. So it wrote a query, broke the skips down by reason, checked the numbers, and added a chart to the team dashboard.

The chart got <TeamMember name="Andy Maguire" />, a product engineer on the team, digging into why the work was failing. That investigation is a big part of why self-driving is out of beta today. It also taught us that a report can be worth as much as a PR.

Another scout compared merge rates across the models our agents can use to write PRs. It flagged that one model had roughly half the merge rate of the others, then kept watching to check the gap held as the sample grew. It held. The model was GPT-6-luna-flex, by the way.

We can't fix the model, but we can steer users away from it before it gives them a bad experience, so that's what we do now. Without the scout we might not have noticed for weeks.

## Higgsfield merges self-driving PRs without opening PostHog

Self-driving PRs go straight to GitHub, and the Inbox is accessible over MCP and other surfaces. If your team works AI-native and rarely logs in to PostHog's web interface, it still fits your workflow.

[Higgsfield](https://higgsfield.ai/), an AI creative suite, works this way. It has merged over 120 self-driving PRs, all of them from GitHub. The team set up a handful of scouts to watch error-tracking [signals](/docs/self-driving/signals) and reviews the output alongside their daily work. Fixes so far include broken Stripe tracking and noisy exceptions that showed up as errors when they weren't.

## "All I want to know about is the pricing"

Every new org gets $10 off self-driving in its first month. That's enough for up to five reports, so you can see what the agents find in your product before you pay anything. After that, you pay for what you use:

- **You pay per run.** A scout scan, a signals investigation, or a PR implementation each counts as one run, and each one tells you what it cost.

- **Not all runs cost the same.** Cost depends on how much context the agent reads, which model it uses, and how long it spends in a sandbox. Light runs cost cents. Deep dives into your data cost more.

- **You only pay for what you turn on.** Choose reports, PRs, or both, and billing limits cap what you spend.

In the beta we charged $15 per PR and gave the reports away for free. That turned out to be backwards. The research is where the agents do most of the work, and it's the part people care about most, so now every run is billed, reports included.

### If you used the beta

Your org stays on beta pricing until November 28, 2026. After that you move to per-run pricing like everyone else.

For some of you that means a bigger bill. We'll email every org whose monthly cost goes up by more than $200, or more than doubles past $50 (about 300 of you), and offer a call with one of our engineers to tune your setup, so you're not paying for scouts and sources that aren't earning their keep.

<!-- TODO: restore this sentence at the end of the paragraph above once PostHog/posthog#124825 is merged:
We've also built a skill to help you manage spend. Ask your agent to run the `managing-self-driving-spend` skill to get started. -->

Two more things to know:

- If you removed your billing limit during the beta, we're putting one back at $150. Raise it whenever you like. We'd rather you chose to spend the money than found out you had.

- If you have credits or a billing limit, your spend might not change, but your usage might count against it at a different rate. If it's faster, you'll hit the limit earlier than you did in the beta and runs will stop. The call above is for you too.

## What's next for the self-driving Inbox

We assumed auto-generated PRs would be the draw, and they are interesting, but once people had the beta in their hands they spent their time on the _reports_. We think that's because people care more about work they were involved in than work they didn't ask for. Improvements to scouts flow through to the PRs anyway, if PRs are what you want.

You can see what the agents are working on right now. [Our docs have a public feed of real reports we found useful](/docs/self-driving/from-our-inbox), curated by a scout. Once a day it reads our Inbox, picks new examples, and opens a PR to add them to the page.

Everything above is available today. [Set up self-driving](/docs/self-driving/setup) with one command, browse the [scout examples](/docs/self-driving/scout-examples) to see what else a scout can watch, and check [what your first month looks like](/docs/self-driving/pricing).

And if you build something weird with a scout, [tell us on X](https://x.com/posthog).
