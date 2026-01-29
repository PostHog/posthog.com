---
title: How LMArena uses PostHog to ship without bias at the AI frontier
customer: LMArena
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/Rayfit_1aa197cafd.png
date: 2026-01-12
---

[LMArena](https://lmarena.ai/) is where AI models meet for single combat. Users submit a prompt and vote between two anonymous LLM responses shown side-by-side.

With 5M+ monthly users generating millions of comparisons each month, guesswork isn’t an option. LMArena's product team needs clear signal on how users engage, how UI changes affect votes, and where bias can creep in. 

Matt Hova, Member of Technical Staff, and Lily Dinh, Growth Marketer, walked us through how PostHog supports that work.

## Measuring preference without introducing bias
“The core thing that we’re doing is collecting votes.” Hova told us. “Anytime that we update the UI, we risk affecting the bias of how votes are cast.” 

To manage that risk, the team uses [feature flags](/feature-flags) and [experiments](/experiments) in PostHog to test website changes with controlled subsets of users, and compare outcomes before deciding what rolls out more broadly. According to Hova, "everything has an experiment, often with multiple treatments to make sure the guardrails stay healthy”.

With dozens of variants running in parallel, knowing how to judge which one 'wins' matters as much as running the test itself.

"Generally, you come into it with a product spec and say, this is what we expect to happen." Hova explained. "For each experiment we typically target one specific event with PostHog, and define a benchmark we want to see in order to ship it."

This discipline applies across the product, from major features to small UI decisions.

“We ran an experiment where we put the login button in five different places – just to see where users click", Hova said. "We were surprised how quickly we could tell which variant would work.”

The same experimentation loop applies to top-of-funnel marketing.

“We have leaderboard pages that are basically ranking charts,” Lily said. “I personally don’t spend much time on them, but through PostHog [analytics](/product-analytics) I found out that users were spending, on average, 14 minutes on those pages.”

“It indicates a lot of value,” she said. “But it also makes you wonder: do people want to spend 14 minutes there? Are there features we should pull out so people don’t have to parse the whole thing?”

Insights like this influenced a new marketing effort to build targeted landing pages for specific model searches — queries like _best AI for recipes_ or _best AI for UI design_.

“Experimentation with PostHog is really important for our conversion rate optimization,” Lily noted. “It’s how we build something backed by data, instead of assuming we know what users want.”

Hova referenced another example where experimentation helped fix a recurring usability issue. 

“We had a lot of people come to the site thinking, _oh, this is where I generate images_. They’d type something like 'picture of a dog', and get text models responding with, ‘I can tell you about dogs.’ So it was a very obvious problem.”

Auto-routing users to the right modality (image, text, video, code) seemed like the obvious fix, but it had to be tested carefully to make sure it didn't skew evaluation results.

“We set up an experiment where we had an AI model look at the text input and decide which modality you should use based on the prompt." Hova said. "We also tested multiple variants, like what the button should look like and how assertive the routing should be.”

After about two weeks, the results were clear. “People were less confused, and fewer users were sending messages to the wrong area. We were also able to dial in the right assertiveness for offering secondary suggestions, like _did you mean an image?_”

## Guardrails against bias
Mobile UX introduces its own set of constraints which demand experimentation. Early versions of Battle mode on LMArena's mobile site stacked responses vertically due to screen size. The team suspected a scroll-based interaction might work better and out their hypothesis to the test with a subset of users.

“We were kind of blown away by how much it helped with retention and with people actually casting votes,” Hova said. But improved engagement wasn’t enough. Battle mode randomizes which AI response is A or B, but the team needed to validate that the new UI didn’t influence votes. 

“Vote quality matters to us a lot,” Lily added. “So being able to monitor trends across all of the different user cohorts is really important.” Cohort-level visibility has also proven benefits beyond UI testing.

“I’ve seen cases where our engineers noticed something off in the product simply by looking at the cohorts,” Lily said. “A key action wasn’t firing for a group of users, and PostHog gave us immediate visibility through behavioral signals.”

## Seeing the full picture
For a platform built on repeat engagement, LMArena's success hinges on one metric: retention. "The thing we care about most is monitoring the funnel from visiting the site to chatting and voting," Hova explained.

PostHog solved this challenge immediately. The platform's ability to track users from their first anonymous visit through to a logged-in vote gave the team the foundation they needed to build proper conversion funnels. [PostHog AI](/ai) was the icing on the cake — turning [product analytics](/product-analytics) from a specialized skill into a universal starting point.

“For myself, I don’t normally write SQL, and being able to use PostHog AI has been great.” Hova said. “Whether it’s adding a little custom selector or writing full-on SQL, it’s really powerful.”
That ease of access has lowered the barrier for the whole team. “I think it’s pretty standard for anyone on our team to log into PostHog and start on a task by asking PostHog AI.”

"I don't normally write SQL," Hova said, "and being able to use PostHog AI has been great. Whether it's adding a custom selector or writing full SQL queries, it's really powerful." That accessibility has changed how the entire team works. "It's pretty standard now for anyone on our team to log into PostHog and start a task by asking PostHog AI."

For Lily, it's like having instant expertise on demand. "I use PostHog AI to ask quick data questions. It feels like having your own pocket data scientist."

<OSQuote
  customer="lmarena"
  author="lily_dinh"
  product="product_analytics"
/>

More recently, the team extended that visibility into reliability with [error tracking](/error-tracking).

“Being able to tie errors to the feature flags that were applied to them feels like a really great thing." Hova said. "We were using [Sentry](/blog/posthog-vs-sentry) – it worked – but it’s just nicer having everything connected.”

## Why PostHog fits the way LMArena builds
So why PostHog? According to Hova, it started as a practical choice, then quickly became foundational.

“Initially we chose PostHog because it was easy to use. It was easy to create charts. The API was clean. Every time I hit a snag like, _how do you hook this up with Next.js in some weird edge case?_, there was always great documentation.”

As LMArena grew, so did the stakes. More experiments, more feature flags, and far more data. Over the past six months alone, event volume increased 19×. The tooling had to keep up.

With product and web analytics, experiments, cohorts, and flags all living in one place, PostHog helps LMArena ship carefully, test constantly, keep the fight fair at the frontier of AI.

<OSQuote
  customer="lmarena"
  author="matt_hova"
  product="experiments"
/>
