---
date: 2026-05-29
title: "How an @mention becomes a PR with the PostHog Slack app"
author:
  - cleo-lant
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/Template_cover_14_0da4d45933.jpg
featuredImageType: full
category: Blog
tags:
  - Product
  - AI
---

Some issues surface from product data. [PostHog Code](/code) catches those by monitoring for [signals](/docs/posthog-code/inbox/research) and proactively fixing them. Other issues surface from people, like when a colleague flags a UI thing or a customer mentions a bug. Those are signals too, so why do they tend to end up in the backlog?

Because most of it's boring, and not an urgent thing in front of you. Or it's invisible work, never tagged as someone's job.

So make it a robot's job. With the PostHog Slack app, you @mention PostHog to "fix this" or "build that". It spins up a sandbox, makes a plan, edits files, runs checks, opens a draft PR, and answers review comments in the thread.

It uses your product data as context by default and follows your repo's rules, so it feels less like a coding tool and more like a clever teammate (it even reacts with [emojis](/docs/slack-app#emoji-cues)). Today it hits beta, so you can @PostHog now, too.

## @PostHog in the #papercuts channel

[Paul D'Ambra](/community/profiles/30173) (engineer exec) was the first to fall in love with @PostHog. Among other important [blitzscale](/teams/blitzscale) duties, he owns the `#papercuts` Slack channel, where anyone can post the small bugs and nits they hit in the app. He'd been fixing them with PostHog Code like a good engineer. Now he mentions @PostHog in 60% of the total threads.

![Paul mentions @PostHog in #papercuts](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_papercuts_1_877de83ae8.png)

![Paul D'Ambra prompts @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_paul_d_1_90f2841d58.png)

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog/pull/58811" external>PostHog/posthog#58811</Link>

</CalloutBox>

## Real prompts that became actual PRs

It's awesome when a prolific engineer gets even more productive, but what makes @PostHog *really* magical is that it's a force multiplier for every role. Sales, marketing, customer support – anyone can tag the bot with a bug, a papercut, or a feature idea.

Here's a few examples of @PostHog usage across the org chart:

### The one where it built a new feature for the web app

[Will Wearing](/community/profiles/41941) (technical account manager) asked @PostHog to add support to copy and paste for markdown into PostHog [notebooks](/docs/notebooks) with proper rendering. The bot wrote the code, added 20 test cases, and auto-closed a related stale GitHub issue.

![Will Wearing prompts @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_will_w_1_5398cb556b.png)

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog/pull/59142" external>PostHog/posthog#59142</Link>

</CalloutBox>

Worth noting: <Link to="https://github.com/PostHog/posthog" external><code>PostHog/posthog</code></Link> is a massive production repo that most people in a sales role would never feel empowered to touch. Will's PR got merged in less than 24 hours, and the only hiccup was a flaky test (nothing wrong with the code, just CI being CI).

Clearing CI is as much of a job as the code generation itself, and the bot sticks with a PR through red checks and reruns until it's mergeable.

### The one where it prepared for a user interview

It's not just code generation. You can tag @PostHog with a data question and it runs the same agent loop as [PostHog AI](/ai). The only difference is that answers turn up where you're already working (i.e. wasting time searching for the perfect reaction emoji).

[Cory Slater](/community/profiles/34160) (product manager) asked @PostHog to pull context on a [Session Replay](/session-replay) user he was interviewing that afternoon. The bot came back with a full brief: account value, product usage, how long she'd been a customer.

Then it went further. In addition to detecting zero [MCP](/docs/model-context-protocol) activity, it noticed she works across two PostHog projects with replicated feature flag configs. The bot flagged it as odd and suggested Cory ask about that in the interview. Clever robot.

![Cory Slater prompts @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_cory_s_2_cde3716078.png)

*Want to steal Cory's user interview skill? We're building a skill library with all our best agent skills.*

### The one where it updated the company handbook

[Lizzie](/community/profiles/43387) (product marketer), asked in #team-marketing what URL format to use when linking to the PostHog app in emails. She got an answer in the thread – then asked @PostHog to write it into the company [handbook](/handbook). She didn't specify which repo, but the bot figured it out.

![Lizzie prompts @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_lizzie_1_a6f77f3495.png)

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog.com/pull/16957" external>PostHog/posthog.com#16957</Link>

</CalloutBox>

### The one where it did the logs legwork

[Lucas Ricoy](/community/profiles/33028) (product engineer) asked @PostHog to check whether a recent <Link to="https://github.com/PostHog/posthog/pull/58177" external>PR</Link>, which aimed to tag WebStats queries by strategy for better performance visibility, actually worked. It turned out the logs API was returning stale data (which threw off the bot). But once Lucas confirmed the cutover had happened, the bot not only confirmed the new ones were appearing, but also that one query – `stats_table_path_bounce_query` – was showing up as a bottleneck.

![Lucas Ricoy prompts @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_lucas_r_1_cda9922574.png)

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog/pull/58177" external>PostHog/posthog#58177</Link>

</CalloutBox>

### The one where it added feet pics to the website

Then there's [Richard](/community/profiles/40548) (product engineer). He broke his foot at the recent company offsite, posted his x-ray, and asked @PostHog to add it to the [secret company feet pics folder](/feet-pics). The bot grabbed the image link, labeled it `broken bone (real).jpg`, and passed 19 CI checks. The resulting PR was merged a lot quicker than Richard's anticipated 4-6 week recovery period.

![Richard prompts @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_Richard_s_1_0a043105c4.png)

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog.com/pull/16876" external>PostHog/posthog.com#16876</Link>

</CalloutBox>

## What you can @PostHog to do

Over the past two weeks, we've merged 116 <Link to="https://github.com/PostHog/posthog/graphs/contributors" external>contributions</Link> from @PostHog into production across AI Observability, Session Replay, Error Tracking, Feature Flags, Workflows, billing, MCP, and the Data Warehouse. No corner of the codebase is off-limits (except our secrets).

The work it's taken off our hands sorts into roughly these [categories](/docs/slack-app/commands) – and yours probably looks similar:

- **Content and docs** – Navigation changes, removing stale content, adding new pages, copy updates, fixing 404s. Admin chores [fit for a robot](/blog/machine-copy-paste-mcp-intro).
- **Code maintenance** – Removing released feature flag guards, updating naming conventions, bumping versions, resolving merge conflicts, dead click tracking.
- **Bugs and CI fixes** – [Errors](/blog/agents-closed-4063-errors), display issues, flaky tests, merge conflicts. Anything you tell an agent to "debug".
- **UI polish** – Layout tweaks, swapping icons, adding keyboard shortcuts, task renaming, in-app banners and notifications. The nice-to-haves you never seem to get to.
- **AI infrastructure** – Updating the MCP server, adding skills and prompts for AI observability, writing [evals](/blog/stop-ai-slop), tool schema improvements, LLM gateway routing logic (e.g. Bedrock fallback).
- **Net new features** – UX additions, new screens and capabilities, setup scripts, scaffolding whole new products.

## Why it doesn't feel like chaos

You'd expect engineers to hate this. A bot opening hundreds of PRs for them to review, non-technical people shipping AI-generated code to production – that sounds like [a mess](/blog/stop-ai-slop)!

It's not, and here's why: the PostHog Slack app understands your codebase and your product data. It doesn't merge its own work. It follows a rigorous review process, and runs a flurry of tests (which most engineers would rather not do).

If CI fails, it fixes the failure. If you add a review comment, it addresses the comment. It pokes you when the PR sits idle until the merge is clean or it runs out of ideas.

The code generation that lands from one sentence prompts are surprisingly good. So good that even [Cory Watilo](/community/profiles/30200), our resident webmaster, is pleased to @PostHog.

![Cory Watilo reacts to @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_cory_w_1_762cab2a86.png)

*(Sure, we could make this stuff up, but we don't have to.)*

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog/pull/59432" external>PostHog/posthog#59432</Link>

</CalloutBox>

## For when the question needs an answer (not code)

Generating PRs with @PostHog in Slack is so easy it feels illegal, and it's a glimpse at what the [self-driving product](/blog/self-driving-product) means in practice.

But despite being a coding agent, it won't answer every @mention with a PR. That's down to a pleasingly simple guardrail: every @PostHog mention runs through a two-stage classifier before any work happens:

1. **Task classifier** – Does this request need repo access, or is it analytics/data/config?
2. **Repo router** – If it does require code generation, which GitHub repo does it go to?

Both classifiers use Claude Haiku (tiny, fast, cheap) and we track latency and cost with [AI Observability](/docs/ai-observability).

This simple routing is why Paul's prompt "*@PostHog can you generate a team photo of team blitzscale as the Spice Girls*" – was correctly classified as non-actionable work.

![Paul's Spice Girls prompt](https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_paul_2_e5c3312ba5.png)

Paul was disappointed, but the bot knew what it was doing.

## Try it

The PostHog Slack app is in beta – we skipped alpha by [dogfooding](/product-engineers/dogfooding) it to the extreme.

It's free to install, and free to uninstall when you realize this means you can ship production code from your phone (which, frankly, might be too much power for anyone).

<p>
	<CallToAction to="/docs/slack-app/setup">
		Connect Slack
	</CallToAction>
</p>

## FAQ

**Why use this over Cursor, Claude Code, or Codex?** They write code once you prompt them. PostHog is connected to your product data, so you can start from a problem – tag @PostHog with a message like "conversion dropped on signup". It finds the cause in your analytics and replays, explores solutions, and opens a PR to propose a fix. No hopping between a dashboard, a replay tab, and your editor.

**Is it a better coding model?** No. It runs the same frontier models everyone else does. The difference is context – an agent that can read your funnels, replays, and errors is working from evidence, not guessing at what matters.

**Is it an analytics agent or coding agent?** Both, in one thread. Explore data and build in the same conversation.

**Does it just open a PR and walk away?** No. It sticks with the PR through failing checks and reruns until it's mergeable – we call that babysitting. On a big repo, getting through CI is often more work than the code.

**Will it touch our whole codebase?** It only touches repos you connect, and every change goes through a PR you review. Nothing merges without a human saying yes.

**Do I need to be an engineer to use it?** Not at all! It's a Slack message. People in sales and marketing have merged PRs to our main repo. Describe the problem or idea, and the agent takes it from there.

**Won't it try to code every message?** It classifies each @mention first – code task or data question, and which repo. Data questions get answered, not turned into PRs.
