---
date: 2026-06-14
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

There's a 2030 version of you who isn't boxed into one job function. Someone who has an idea in the morning and the means to ship it the same afternoon.

Farfetched? Hardly. That version of you isn't waiting for 2030 – they exist today. They're in **build mode**, and they're not looking back.

## What is build mode?

Build mode is the version of you that ships a *lot* more. You could call it [everyone being an engineer now](/newsletter/engineeringification-of-everything), but I'd put it more precisely: [product engineers](/blog/what-is-a-product-engineer), product managers, and product marketers can finally play in each other's sandboxes.

Look at who's actually building with PostHog's AI products. In the last 30 days, people:

- made more than 8 million [MCP](/docs/model-context-protocol) tool calls
- held over 600,000 conversations with [PostHog AI](/ai)
- created more than 750,000 [insights](/product-analytics)

That's people building things. And a growing share of them would never call themselves engineers.

In other words: build mode isn't really about more output. It's about making every person with a product function more capable.

![PostHog AI chat usage broken down by role](https://res.cloudinary.com/dmukukwp6/image/upload/ai_chat_usage_by_role_f3eb44e198.png)
<Caption>Who's actually chatting with PostHog AI – plenty of them don't sit in engineering.</Caption>

## What you can build

Reading this won't change your job title, so what does build mode mean for you? Here are some concrete things you can do today:

### Use @PostHog in Slack

**1. Turn a question or complaint into a merged PR.**

In case you haven't met it: PostHog has a [Slack app](/docs/slack). Mention `@PostHog` in any channel and it can answer any question about your users or product usage.

Tag it with "fix this" or "build that" and it can code too. It spins up a sandbox, makes a plan, edits files, runs your checks, and opens a draft PR – answering your review comments right there in the thread. ([Here's how to set it up.](/docs/slack/setup))

In the first week it was available, usage split roughly into a quarter engineers, a quarter founders, and the rest marketing, product, support, and sales. People in every one of those roles have [shipped real PRs](/blog/slack-app-beta).

**2. Settle an argument with a chart, in the thread where it started.**

A colleague swears users love the new onboarding flow. You swear they hate it. Instead of booking a meeting about it, tag `@PostHog` right there in the thread: *"How does 7-day retention compare for users who went through the new onboarding versus the old one?"* It drops the data. Debate over.

And because it's a Slack thread, it's [multiplayer](/docs/slack#follow-ups-in-a-thread). Your PM jumps in to ask about mobile, someone from support adds a segment, and the bot keeps refining the answer as the conversation goes.

You can also make it recurring. [Subscriptions](/docs/product-analytics/subscriptions) pipe scheduled insights straight into a Slack channel. Our `#marketing-alerts` channel gets daily updates like "LLM prompts that drove signups" and "most-read articles."

When something catches their eye, [Ian](/community/profiles/29296) and [Nat](/community/profiles/35321) from the editorial team `@PostHog` in that same thread to dig in.

![Ian asks @PostHog to analyze web traffic in a Slack thread](https://res.cloudinary.com/dmukukwp6/image/upload/analyze_web_traffic_in_slack_6c927c34ef.png)
<Caption>Every answer just raises three more questions. Mercifully, the bot doesn't tire of them.</Caption>

### Chat with PostHog AI in the web app

**3. Answer your own questions, and enrich your writing while you're at it.**

[PostHog AI](/ai) is a surprisingly good writing assistant, because it's wired straight into your product data. Describe what you're working on – or draft the whole thing in a [notebook](/docs/notebooks) – and ask it to pull the relevant numbers in. It'll surface angles and figures worth including (guess what I did for this post).

![A notebook PostHog AI built to help research this blog post](https://res.cloudinary.com/dmukukwp6/image/upload/build_mode_notebook_741d3d939b.png)

> Before you push a claim in a deck or a blog post, ask PostHog AI to check it against real data first. You ship a number you can stand behind, with the notebook to back it up.

**4. Build a product dashboard like a data engineer.**

Whether you're a [PM or a PMM](/blog/pm-pmm-collaboration), having your own view of how the product is doing – what's growing, what's breaking, who's converting – means you stop waiting on someone else to pull it for you.

Tell PostHog AI: *"Build me a dashboard for new-signup retention and activation by source."* It assembles the insights, and you go a few turns back and forth until it's the thing you actually wanted – without ever opening the insight builder. That's build mode in a single move: the dashboard a data engineer would normally own, built by whoever actually needs it.

![A product marketing dashboard built with PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/posthog_code_pmm_dashboard_5ec371cf8d.png)
<Caption>My real launch dashboard – I didn't build a single insight by hand. I borrowed what engineering and the PMs already had, and asked PostHog AI for the rest.</Caption>

The same trick works for a post-launch gut check – *"Anything weird in the last two hours versus yesterday?"* – and you'll know whether to relax or roll back.

**5. Find your best users and go talk to them.**

[Case studies](/customers), alpha testers, champions to rally inside an account – they all start with finding your best users, which usually means digging through usage data nobody has time for. Ask PostHog AI: *"Find my 10 most engaged users who've invited a teammate, and summarize their recent [session recordings](/session-replay)."* Now you've got a shortlist, with enough context to actually reach out.

![Pulling user data for a case study with PostHog AI](https://res.cloudinary.com/dmukukwp6/image/upload/case_study_user_research_59a375e521.png)
<Caption>I didn't have to ask sales or CS for a list – the context already lives in PostHog, so I did the research myself.</Caption>

### Use the PostHog MCP in your editor (or any agent)

**6. Build a weekly digest that writes itself.**

If you already use something like Claude Cowork or Codex to prep for the week, add the [PostHog MCP](/docs/model-context-protocol) to the mix – now your agent can pull live product data alongside your calendar and meeting notes.

Set it on a schedule. Every Monday: *"summarize last week's activation, day-7 retention, and top onboarding drop-off versus the week before."* You walk into the week already knowing the numbers instead of digging for them. ([The highest-leverage agent work](/blog/making-claude-cowork-actually-useful) is usually the stuff you weren't doing at all.)

**7. Create a cohort for your next campaign – and the tracking to measure it.**

With the PostHog MCP connected, your editor – or Claude, Cursor, Codex – can do this for you. Ask it to *"create a cohort of users who visited the pricing page at least twice in the last 30 days but never started a trial,"* and that [cohort](/docs/data/cohorts) now exists in PostHog, ready to sync to your ad platform so you're retargeting warm intent instead of cold lists.

It works the other way too. Ask *"what events are we already tracking in the checkout flow?"* and your agent reads the schema live, then adds the missing `checkout_step_completed` call and opens the PR. Shipping a real change becomes part of the same conversation as asking about your data – which is how our team does [agent-first product engineering](/newsletter/agent-first-product-engineering), now serving 6,000+ daily MCP users.

### Ship to production with PostHog Code

**8. Fix something in production. Yes, really.**

If marketers like Joe and I can do [this](https://github.com/PostHog/posthog/pull/61350), you can too. [PostHog Code](/code) is a desktop coding agent that understands your product and your data, not just your source code – so you can start from a problem ("conversion dropped on signup") rather than a file. It plans the work, opens a PR, and sticks with it through the review.

![Adam praises Joe's PR shipped through PostHog Code](https://res.cloudinary.com/dmukukwp6/image/upload/Joe_Adam_PR_praise_4802f2ff1a.png)
<Caption>A marketer ships to the main app, and an engineer signs off. This is build mode working as intended.</Caption>

**9. Run a real growth experiment.**

The button-color A/B test is the cliché. The experiments that actually move growth usually need code: a reverse trial, a paywall in a new spot, an upgrade nudge the moment a free user hits a limit.

Tell PostHog Code: *"Add an experiment that shows free users an upgrade prompt when they hit the dashboard limit, with trial starts as the success metric."* It builds the variant, wires up the [experiment](/experiments) and metric, and opens the PR. No engineer required – which is why [AI has quietly killed the case for no-code experiment tools](/blog/ai-is-killing-no-code-experiments).

## Build mode is multiplayer

Build mode isn't a solo act. Some of the best agentic work at PostHog happens in public Slack channels: a thread starts with an idea and ends with shipped code, while people from three different teams pile in to steer it. It's the [self-driving product](/blog/self-driving-product) idea in miniature.

And that know-how compounds. The old way to pass on how you do something was to write an SOP – a document that tells you how to do the thing but can't do it itself. A [skill](/docs/posthog-code/skills) can. It's your judgment written down in a form an agent can actually run, so the next person doesn't start from scratch. If your company is *cautiously* adopting AI, that's the cleanest way to let people work outside their lane – the agent runs on your colleagues' codified judgment, not a blank prompt.

## Meet the 2030 version of you

I get it – it's intimidating. Build mode hands you the ability to [always be launching](https://andrewchen.substack.com/p/always-be-launching), which means you now have to decide what to build. Good news: AI doesn't care what's in your LinkedIn skills section. It responds to ideas and makes them happen.

At a previous company, I was cross-functional but still firmly inside a lane (product marketing). I wasn't allowed near the source code, and even if I had been, I wouldn't have known where to start. The version of me powered by AI is a completely different shape, and I see it happening all around me. Engineers are [designing](/newsletter/vibe-designing). Product managers are shipping code instead of writing PRDs. Everyone gets to be a product *person*.

Product data now lives in every interface I work in: I pull numbers into blog posts through the MCP, I `@PostHog` to explore data in Slack, I build data-backed landing pages in [PostHog Code](/code), and I lean on [PostHog AI](/ai) for dashboards that look great and are correct despite my roughly zero SQL skill.

This is the thing people actually wanted from AI (and the agency that comes with it): the ability to imagine something and then have it exist. It's a genie lamp except you are, in fact, allowed to wish for more wishes.

### So, go build

There's a version of you doing the most interesting work of your life, and the only thing standing between you and that person is the decision to be a builder. Once you're in build mode, the only limits left are your taste and your nerve.

So, go build.
