---
title: How Arena uses PostHog to ship without bias at the AI frontier
customer: Arena
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/LM_Arena_57e75a71b4.png
date: 2026-01-12
---

[Arena](https://arena.ai/) is where AI models meet for single combat. Users throw in a prompt, get two anonymous LLM responses, and vote for the winner.

It's a simple concept that's hit massive scale. With 5M+ monthly users generating millions of comparisons each month, Arena's product team needs clear insights into how users engage, how UI tweaks affect votes, and where bias might creep in. 

Matt Hova, Member of Technical Staff, and Lily Dinh, Growth Marketer, shared how Arena uses PostHog to keep the fight fair while shipping fast.

## Measuring preference without introducing bias
"The core thing that we're doing is collecting votes," Matt said. "Anytime that we update the UI, we risk affecting the bias of how votes are cast." 

To manage that risk, Arena uses [feature flags](/feature-flags) and [experiments](/experiments). Website changes get tested with controlled user subsets and outcomes get compared. "Everything we ship has an experiment," Matt explained, "often with multiple treatments to make sure the guardrails stay healthy."

With dozens of variants running in parallel, knowing which one 'wins' matters as much as running the test. 

"Generally, we come into it with a product spec and say, _this is what we expect to happen_." Matt said. "For each experiment, we typically target one specific event in PostHog, and define a benchmark we want to see in order to roll it out."

"We ran an experiment where we put the login button in five different places, just to see where users click. We were surprised how quickly we could tell which variant would work."

A similar experimentation loop applies across the board – from product work to top-of-funnel marketing.

"We have leaderboard pages that are basically ranking charts," Lily said. "I personally don't spend much time on them, but through PostHog [analytics](/product-analytics) I found that users were spending, on average, 14 minutes on those pages."

"It indicates a lot of value," she said. "But it also makes you wonder: do people want to spend 14 minutes there? Are there features we should pull out so people don't have to parse the whole thing?"

Insights like this influenced a new growth marketing effort to build targeted landing pages for specific searches — queries like _best AI for recipes_ or _best AI for UI design_.

"All the data PostHog captures is really important for our conversion rate optimization," Lily noted. "It's how we build something backed by data, instead of assuming we know what users want."

Matt referenced another example where experimentation helped fix a core usability issue. 

"We had a lot of people come to the site thinking, _oh, this is where I generate images_. They'd type something like 'picture of a dog', and get text models responding with, 'I can tell you about dogs.' So it was a very obvious problem."

Auto-routing users to the right modality (image, text, video, code) seemed like the obvious fix, but still required testing to make sure it didn't skew evaluation results.

"We set up an experiment where we had an AI model look at the text input and decide which modality you should use based on the prompt." Matt said. "We also tested multiple variants, like what the button should look like and how assertive the routing should be."

After about two weeks, the data was clear. "People were less confused, and fewer users were sending messages to the wrong area. We were also able to dial in the right assertiveness for offering secondary suggestions, like _did you mean an image?_"

## Guardrails against bias
Mobile screens present another realm for experimentation. Early versions of Battle mode stacked responses vertically, but the team suspected a swipe-based interaction might work better. They tested it with a subset of users.

"We were kind of blown away by how much it helped with retention and with people actually casting votes," Matt said.

But better engagement wasn't the primary goal – avoiding bias was. Battle mode randomizes which AI response shows up as A or B, and they needed to make sure the new UI hierarchy didn't accidentally favor one position over the other. PostHog enabled them to isolate users exposed to each variant and keep those votes separate from the main leaderboard during testing.

"Vote quality matters to us a lot," Lily said. "So being able to monitor trends across all of the different user cohorts is really important."

Cohort visibility has also proven useful beyond UI testing. "I've seen cases where our engineers noticed something off in the product simply by looking at the cohorts. In one instance, a key action wasn't firing for a group of users, and PostHog gave us immediate visibility just through behavioral signals."

## Seeing the full picture
For a platform built on repeat visits, retention is the north star. "The thing we care about most is monitoring the funnel of users visiting the site, chatting and voting, and returning," Matt explained.

PostHog's ability to track anonymous visitors all the way through to logged-in votes provided a foundation for proper conversion funnels. [PostHog AI](/ai) was another unlock — turning raw [product analytics](/product-analytics) from a specialist skill into something anyone could use.

"I don't normally write SQL," Matt said, "and being able to use PostHog AI has been great. Whether it's adding a custom selector or writing full SQL queries, it's really powerful." That accessibility has changed how the entire team works. 

For Lily, having PostHog AI as a data scientist on demand provides tangible time savings. "It's pretty standard now for anyone on our team to log into PostHog and start a task by asking PostHog AI."

<OSQuote
  customer="arena"
  author="lily_dinh"
  product="product_analytics"
/>

More recently, the team added [error tracking](/error-tracking) to the mix, connecting product visibility to reliability.

"Being able to tie errors to the feature flags that were applied to them feels like a really great thing." Matt said. "We were using [Sentry](/blog/posthog-vs-sentry) – it worked – but it's just nicer having everything connected."

## Why PostHog works for Arena
So why PostHog? Matt's take: it started as a practical choice, and quickly became foundational.

"Initially we chose PostHog because it was easy to use. It was easy to create charts. The API was clean. Every time I hit a snag like, _how do you hook this up with Next.js in some weird edge case?_, there was always great documentation."

As Arena grew, so did the stakes. More experiments, more feature flags, and far more data. Over the past six months alone, event volume increased 19×. 

Having product and web analytics, experiments, cohorts, and flags all in one place helps the team at Arena ship carefully, experiment constantly, and keep the AI battleground neutral. May the best AI model win.

<OSQuote
  customer="arena"
  author="matt_hova"
  product="experiments"
/>