---
date: 2026-06-15
title: "Everything (and everyone) is build mode now"
author:
  - cleo-lant
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/mr_potato_hog_83221a5307.png
featuredImageType: full
category: Blog
tags:
  - AI
  - Guides
---

There's a future version of you who isn't boxed into one job function. Someone who has an idea in the morning and the means to ship it the same afternoon.

Farfetched? Hardly. That version of you isn't waiting for 2030 – they exist today. They're in **build mode**, and they're not looking back.

## What is build mode?

Build mode is the version of you that ships a *lot* more. You could call it [everyone being an engineer now](/newsletter/engineeringification-of-everything), but I'd put it more precisely: [product engineers](/blog/what-is-a-product-engineer), product managers, and product marketers can finally play in each other's sandboxes.

Look at who's actually building with PostHog's AI products. In the last 30 days, people:

- Made millions of [MCP](/docs/model-context-protocol) tool calls
- Held more than 400,000 conversations with [PostHog AI](/ai)
- Created more than 500,000 [insights](/product-analytics)

That's people building things. And a growing share of them would never call themselves engineers.

In other words: build mode isn't really about more output. It's about making everyone who builds, markets, sells, or supports a product more capable.

![PostHog AI chat usage broken down by role](https://res.cloudinary.com/dmukukwp6/image/upload/ai_chat_usage_by_role_f3eb44e198.png)
<Caption>Who's actually chatting with PostHog AI – plenty of them don't sit in engineering.</Caption>

## What you can build

Reading this won't change your job title, so what does build mode mean for you? Here are some concrete things you can do today with @PostHog in Slack, PostHog AI, the MCP, and PostHog Code:

### 1. Turn a question or complaint into a merged PR.

In case you haven't met it: PostHog has a [Slack app](/docs/slack). Mention `@PostHog` in any channel and it can answer any question about your users or product usage.

Tag it with "fix this" or "build that" and it can code too. It spins up a sandbox, makes a plan, edits files, runs your checks, and opens a draft PR – answering your review comments right there in the thread. ([Here's how to set it up.](/docs/slack/setup))

In the first week it was available, usage split roughly into a quarter engineers, a quarter founders, and the rest marketing, product, support, and sales. People in every one of those roles have [shipped real PRs](/blog/slack-app-beta).

### 2. Settle an argument in the thread where it started.

A colleague swears users love the new onboarding flow. You swear they hate it. Instead of booking a meeting about it, tag in `@PostHog`. Ask *"How does 7-day retention compare for users who went through the new onboarding versus the old one?"* It drops the data. Debate over.

And because it's a Slack thread, it's [multiplayer](/docs/slack#follow-ups-in-a-thread). Your PM jumps in to ask about mobile, someone from support adds a segment, and the bot keeps refining the answer as the conversation goes.

You can also make it recurring. [Subscriptions](/docs/product-analytics/subscriptions) pipe scheduled insights straight into a Slack channel. When something catches their eye, [Ian](/community/profiles/29296) and [Nat](/community/profiles/35321) from the editorial team `@PostHog` in that same thread to dig in.

![Ian asks @PostHog to analyze web traffic in a Slack thread](https://res.cloudinary.com/dmukukwp6/image/upload/analyze_web_traffic_in_slack_6c927c34ef.png)
<Caption>Every answer just raises three more questions. Mercifully, the bot doesn't tire of them.</Caption>

### 3. Find your best users and go talk to them.

[Case studies](/customers), alpha testers, champions to rally inside an account – they all start with finding your best users, which usually means digging through usage data nobody has time for. Ask `@PostHog`: *"Find my 10 most engaged users who've invited a teammate, and summarize their recent [session recordings](/session-replay)."* You get a shortlist back in the thread, with enough context to actually reach out.

![Pulling user data for a case study with @PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/case_study_user_research_59a375e521.png)
<Caption>I didn't have to ask sales or CS for a list – the context already lives in PostHog.</Caption>

### 4. Find out which content drives your best users.

Good content decisions come from understanding what actually converts, not just what gets traffic. Because PostHog connects your [web analytics](/web-analytics) to product data, you can ask PostHog AI *"which articles bring in signups that activate within 7 days?"* and see the whole picture at once.

You might find one post quietly driving your best users. Then you go write more like it. Schedule it as a recurring [AI summary](/docs/product-analytics/subscriptions#ai-summaries) and it lands in Slack each week without you asking.

![Content and conversion insights in the #marketing-alerts Slack channel](https://res.cloudinary.com/dmukukwp6/image/upload/marketing_alerts_in_slack_e9b76bdb43.png)
<Caption>The content that's actually converting, surfaced automatically.</Caption>

### 5. Fix something in production. Yes, really.

Yes, a marketer can open a pull request against the real product – not just a marketing page, the actual app. It's not as reckless as it sounds, because `@PostHog` only ever opens a *draft* PR and runs your checks, and an engineer can review it before anything ships.

So when I spot a bug (or an opportunity), I just describe it to `@PostHog`, and the bot opens the PR. That's how Joe and I – two marketers – have shipped [real changes](https://github.com/PostHog/posthog/pull/61350) to a genuinely complex codebase.

![Adam praises Joe's PR shipped from Slack](https://res.cloudinary.com/dmukukwp6/image/upload/Joe_Adam_PR_praise_4802f2ff1a.png)
<Caption>A marketer ships to the main app, and an engineer signs off. This is build mode working as intended.</Caption>

### 6. Answer your own questions, and enrich your writing while you're at it.

[PostHog AI](/ai) is a surprisingly good writing assistant, because it's wired straight into your product data. Describe what you're working on – or drop the draft in the chat – and ask it to pull the relevant numbers in. It'll surface angles and metrics worth including (guess what I did for this post).

![A notebook PostHog AI built to help research this blog post](https://res.cloudinary.com/dmukukwp6/image/upload/build_mode_notebook_741d3d939b.png)
<Caption>Never ship a number you can't stand behind. Ask PostHog AI to check it against real data first.</Caption>

### 7. Create a cohort for your next campaign – and the tracking to measure it.

Say you're launching a feature and aren't sure who to target. Tell PostHog AI: *"we're launching [feature] – here's what it does. Suggest a few user segments we could target, and explain why."*

It comes back with segment ideas and the [cohorts](/docs/data/cohorts) to match – power users who'd love it, or accounts at churn risk it might win back – each ready to email or sync straight to your ad platform. Do it in the web app, or from your editor through the MCP.

It works the other way too. Ask *"what events are we already tracking in the checkout flow?"* and your agent reads the schema live, then adds the missing `checkout_step_completed` call and opens the PR. Shipping a real change becomes part of the same conversation as asking about your data – the heart of [agent-first product engineering](/newsletter/agent-first-product-engineering).

### 8. Build a weekly digest that writes itself.

If you already use something like Claude Cowork or Codex to prep for the week, add the [PostHog MCP](/docs/model-context-protocol) to the mix – now your agent can pull live product data alongside your calendar and meeting notes.

Set it on a schedule. Every Monday: *"summarize last week's activation, day-7 retention, and top onboarding drop-off versus the week before."* You walk into the week already knowing the numbers. [The highest-leverage AI work](/blog/making-claude-cowork-actually-useful) usually isn't a task you'd do faster, it's one you'd never get around to at all.

### 9. Build a product dashboard like a data engineer.

Whether you're a [PM or a PMM](/blog/pm-pmm-collaboration) coordinating a launch, the first question is always: what are we actually measuring, and are we even tracking it? Ask PostHog AI *"what events are we tracking in the onboarding flow?"* and it reads your live schema. Then you can spot the gaps before you build anything.

Once you know what's there, tell it: *"Build me a dashboard showing where new users drop off, and how activation rates compare by signup source."* It assembles the insights, and you go a few turns back and forth until it's filled with the metrics you care about.

The same dashboard tells you when something goes wrong after launch. *"Anything weird in the last two hours versus yesterday?"* – and you'll know whether to relax or roll back. And when the dashboard reveals an opportunity worth testing, that's when you bring in [PostHog Code](/code) or the MCP to build the [experiment](/experiments) properly – [no-code experiment tools can't compete](/blog/ai-is-killing-no-code-experiments) with an agent that already knows your product.

![A product marketing dashboard built with PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/posthog_code_pmm_dashboard_5ec371cf8d.png)
<Caption>A glimpse at my real launch dashboard – I didn't build a single insight by hand.</Caption>

## Build mode is multiplayer

Build mode isn't a solo act. Some of the best work happening at PostHog is in public Slack channels: a thread starts with an idea and ends with shipped code.

And that know-how compounds. The old way to pass on how you do something was to write a standard operating procedure – a document that tells you how to do the thing but can't do it itself. A [skill](/docs/posthog-code/skills) can: it's your judgment written down in a form an agent can actually run, so the next person doesn't start from scratch.

If your company is *cautiously* adopting AI, this is the cleanest way to let people work outside their lane – the agent runs on your colleagues' codified judgment, not a blank prompt. We keep ours in a few places: the [skills store](/docs/ai-engineering/skills-store), the [`.claude` folder](https://github.com/PostHog/posthog.com/tree/master/.claude) in our website repo, and the company [handbook](/handbook).

![Linear vs exponential growth comic](https://res.cloudinary.com/dmukukwp6/image/upload/linear_vs_exponential_comic_906763385b.webp)
<Caption>We're wired to expect progress in straight lines, but build mode is exponential.</Caption>

## Meet the 2030 version of you

Build mode hands you the ability to [always be launching](https://andrewchen.substack.com/p/always-be-launching), which means you now have to decide what to build. Good news: AI doesn't care what's on your resume.

At a previous company, I was cross-functional but still firmly inside a lane (marketing). I wasn't allowed near the source code, and even if I had been, I wouldn't have known where to start. The version of me powered by AI is a completely different shape, and I see it happening all around me. Engineers are [designing](/newsletter/vibe-designing). Product managers are shipping code instead of writing PRDs. Everyone gets to be a product *person*.

This is the thing people actually wanted from AI: the ability to imagine something and [then have it exist](https://x.com/posthog/status/2065480940500267413). It's a genie lamp except you are, in fact, allowed to wish for more wishes.

