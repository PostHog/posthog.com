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
  - Product
---

There's a 2030 version of you who isn't boxed into one job function. Someone who has an idea in the morning and the means to ship it the same afternoon.

Farfetched? Hardly. That version of you isn't waiting for 2030 – they exist today. They're in **build mode**, and they're not looking back.

## What is build mode?

Build mode is the version of you that ships a *lot* more. I'd love to tell you this means [everyone is an engineer now](/newsletter/engineeringification-of-everything) (and that's sort of true), but the more honest version is that product engineers, product managers, and product marketers can finally play in each other's sandboxes.

Look at who's actually building with PostHog's AI products. In the last 30 days, people made more than 8 million [MCP](/docs/model-context-protocol) tool calls, held over 600,000 conversations with [PostHog AI](/ai), and created more than 750,000 [insights](/product-analytics). That's not people reading dashboards someone else made. That's people making things.

And a growing share of them would never call themselves engineers. The "ask the data person" era is ending.

So build mode isn't really about more output. It's about every person with a product function getting more capable.

## What you can build

Reading this didn't change your job title, so what does build mode actually look like on a Tuesday? Here are concrete things you can do today, grouped by the tool that does them.

### Ask @PostHog in Slack

**1. Settle an argument with a chart, in the thread where it started.** A colleague swears users love the new onboarding flow. You swear they hate it. Instead of booking a meeting about it, tag [@PostHog](/docs/slack) right there in the thread: *"How does 7-day retention compare for users who went through the new onboarding versus the old one?"* It drops a chart in the thread. Debate over.

And because it's a Slack thread, it's multiplayer. Your PM jumps in to ask about mobile, someone from support adds a segment, and the bot keeps refining the answer as the conversation goes. Nobody had to "own" the question.

![Ian asks @PostHog to analyze web traffic in a Slack thread](https://res.cloudinary.com/dmukukwp6/image/upload/analyze_web_traffic_in_slack_6c927c34ef.png)
<Caption>A data question becomes a chart, right where the conversation is happening.</Caption>

**2. Turn a complaint into a merged PR without leaving Slack.** Whoever's in the channel can tag the bot with "fix this" or "build that" – and at PostHog that's roughly a quarter engineers, a quarter founders, and the rest marketing, product, support, and sales. The bot spins up a sandbox, makes a plan, edits files, runs your checks, opens a draft PR, and answers your review comments in the thread.

[ANECDOTE: drop in a fresh story here – a non-engineer who shipped something real from a Slack thread, with the role, the prompt, and the PR link.]

### Chat with PostHog AI in the web app

**3. Answer your own questions, and enrich your writing while you're at it.** [PostHog AI](/ai) is a surprisingly good writing assistant precisely because it's wired into your product data. Drop a draft into the chat and ask it to pull the relevant numbers into a [notebook](/docs/notebooks). It'll surface angles and figures worth including (guess what I did for this post). Before you push a claim in a sales deck or a blog, you can ask it to verify the claim against real data first.

![A notebook PostHog AI built to help research this blog post](https://res.cloudinary.com/dmukukwp6/image/upload/build_mode_notebook_741d3d939b.png)
<Caption>The notebook PostHog AI built while I was writing this post – the 8 million MCP calls and 750,000 insights above came straight out of it.</Caption>

**4. Build a product dashboard like a data engineer.** Tell PostHog AI: *"Build me a dashboard with week-over-week retention for new signups, activation rate by signup source, and a funnel from signup to first value moment."* It builds the insights and assembles the dashboard. You didn't open the insight builder once. The same trick works for a post-launch gut check – *"Anything weird in the last two hours? Compare error rate, rage clicks, and checkout completion to the same window yesterday"* – and you'll know whether to roll back or relax before anyone files a ticket.

**5. Find your best users without watching a single 40-minute replay.** I don't have time to sit through hours of [session recordings](/session-replay) to understand how someone uses our product, and neither do you. Ask PostHog AI: *"Find the 10 users with the highest session frequency and longest retention who've invited at least one teammate, and summarize their last 10 recordings."* Now you've got a shortlist for a customer story, or a candidate to flag to a PM for alpha access – with the context to actually reach out.

**6. Settle the button-color war with an experiment.** This one's fun, especially when the debate is landing page copy or (lord have mercy) what shade of blue the button should be. Tell PostHog AI: *"Create an A/B experiment testing the new checkout flow, using purchase completion as the success metric."* It sets up the [experiment](/experiments), links the flag, and sets the metric. You launch it from the experiment page. [AI has quietly killed the case for no-code experiment tools](/blog/ai-is-killing-no-code-experiments) – you no longer need an engineer to run a real one.

### Use the PostHog MCP in your editor (or any agent)

**7. Build a weekly digest that writes itself.** If you use something like Claude Cowork or Codex to prep for the week, put the [PostHog MCP](/docs/model-context-protocol) in the loop alongside your calendar and meeting notes. Every Monday: *"Summarize last week's activation rate, day-7 retention, and top onboarding drop-off, compared to the week before."* You're suddenly the person who always has the numbers. ([The highest-leverage use of an agent like this](/blog/making-claude-cowork-actually-useful) is usually the work you weren't doing at all.) You can also pipe key metrics into a public Slack channel so *everyone* has the numbers – our #marketing-alerts channel gets daily drops like "LLM prompts that drove signups" and "most-read articles." Try "weekly signup count broken down by UTM source," or a daily "new users" update.

**8. Create a cohort for your next campaign – and the tracking to measure it.** Ask the MCP to *"create a cohort of users who visited the pricing page at least twice in the last 30 days but never started a trial."* That [cohort](/docs/data/cohorts) now exists in PostHog, and you can sync it to your ad platform – you're retargeting warm intent instead of cold lists. While you're in your editor, you can also ask *"what events are we already tracking in the checkout flow?"* It reads the schema live from PostHog, then you prompt it to add the missing `checkout_step_completed` call with the right properties. No more shipping a feature you can't measure.

### Open PostHog Code on your desktop

**9. Fix something in production. Yes, really.** If marketers like Joe and I can do it, you can too. [PostHog Code](/code) is a desktop coding agent that understands your product and your data, not just your source code – so you can start from a problem ("conversion dropped on signup") rather than a file. It plans the work, opens a PR, and sticks with it through the review.

![Adam praises Joe's PR shipped through PostHog Code](https://res.cloudinary.com/dmukukwp6/image/upload/Joe_Adam_PR_praise_4802f2ff1a.png)
<Caption>A marketer ships to the main app, and an engineer signs off. This is build mode working as intended.</Caption>

<CalloutBox icon="IconPullRequest" title="The resulting PR" type="fyi">

<Link to="https://github.com/PostHog/posthog/pull/61350" external>PostHog/posthog#61350</Link>

</CalloutBox>

<NewsletterForm />

## Build mode is multiplayer

The best part is that none of this happens alone. Some of the best agentic work at PostHog happens in public Slack channels: a thread starts with an idea and ends with shipped code, while people from three different teams pile in to steer it.

And that know-how compounds. The old way to pass on how you do something was to write an SOP – a document that tells you how to do the thing but can't do it itself. A [skill](/docs/posthog-code/skills) can. It's your judgment written down in a form an agent can actually run, so the next person doesn't start from scratch. If your company is *cautiously* adopting AI, that's the cleanest way to let people work outside their lane – the agent runs on your colleagues' codified judgment, not a blank prompt.

## How to switch on build mode

I get it – it's intimidating. Build mode hands you the ability to [always be launching](https://andrewchen.substack.com/p/always-be-launching), which means you now have to decide what to build. That low-grade "am I doing enough with AI?" dread is real, and it's normal.

Good news: AI doesn't care what's in your LinkedIn skills section. It responds to ideas and makes them happen.

What I love is that product data now lives in every interface I work in. I pull numbers into blog posts I'm co-writing with Claude through the MCP. I @PostHog to explore data in Slack with my colleagues. I build data-backed landing pages in [PostHog Code](/code). And when I want to actually *see* something – because I'm a human, and humans like charts – chatting with [PostHog AI](/ai) builds me dashboards that look great and are correct, despite my roughly zero SQL skill.

## Meet the 2030 version of you

At a previous company, I was cross-functional but still firmly inside a lane (product marketing). I wasn't allowed near the source code, and even if I had been, I wouldn't have known where to start.

The version of me powered by AI is a completely different shape, and I see it happening all around me. Engineers are designing. Product managers are shipping code instead of writing PRDs. Everyone gets to be a product *person*.

This is the thing people actually wanted from AI (and the agency that comes with it): the ability to imagine something and then have it exist. It's a genie lamp, except you're allowed to wish for more wishes.

## So, go build

There's a version of you doing the most interesting work of your life, and the only thing standing between you and that person is the decision to be a builder. Once you're in build mode, the only limits left are your taste and your nerve.

So, go build.

*Words by <TeamMember name="Cleo Lant" />, who wrote this post in build mode (with a lot of help from the MCP).*

## Further reading

- [The engineeringification of everything](/newsletter/engineeringification-of-everything) – why every role is becoming an engineering one
- [We put PostHog in Slack and now everyone's an engineer](/blog/slack-app-beta) – real prompts that became real PRs
- [The golden rules of agent-first product engineering](/newsletter/agent-first-product-engineering) – what we've learned building for agents
- [AI is killing no-code experiments](/blog/ai-is-killing-no-code-experiments) – run a real experiment without an engineer
- [Making Claude Cowork actually useful](/blog/making-claude-cowork-actually-useful) – the highest-leverage way to use a background agent

<NewsletterForm />
