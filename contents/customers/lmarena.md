---
title: How LMArena uses PostHog to ship without bias at the AI frontier
customer: LMArena
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/Rayfit_1aa197cafd.png
date: 2026-01-12
---

[LMArena](https://lmarena.ai/) is where AI models meet for single combat. Through side-by-side, blind comparisons, users see two anonymous model responses to the same prompt and vote on which one is stronger.

With 5M+ monthly users across 150 countries, those votes add up fast. Millions of real-world comparisons are generated every month, making LMArena one of the largest sources of human preference data in AI.

At this scale, guesswork doesn’t hold up. LMArena’s product team needs clear answers on user engagement, how UI changes affect voting behavior, and where bias can sneak in. 

We spoke with Matt Hova, Member of Technical Staff, and Lily Dinh, Growth Marketer, about how PostHog helps support LMArena's core mission to measure and advance the frontier of AI.

## Measuring preference without introducing bias

At LMArena, the product _is_ the measurement. Every vote feeds directly into how models are ranked, so while experimentation is essential, it’s also risky. A slightly different layout or interaction pattern can quietly influence user behavior. 

“The core thing that we’re doing is collecting votes.” Hova told us. “Anytime that we update the UI, we risk affecting the bias of how votes are cast.” 

Because rankings depend on these signals, every change needs guardrails. Feature flags and experiments in PostHog let the team ship changes without committing to them outright. Before anything reaches the main experience, they look for bias signals: Are users suddenly favoring one side? Are voting patterns drifting?

“Everything we launch has an experiment, often with multiple treatments, to make sure the guardrails stay healthy,” Hova said.

This discipline applies across the product, from major features to small UI decisions.

## Experiments as the default
At any given time, LMArena has dozens of experiments running in parallel. Knowing how to assess which variant “wins” matters as much as running the test itself.

“Generally, you come into it with a product spec and say, this is what we expect to happen.” Hova explained. “For each experiment we typically target one event, and define a benchmark we want to see in order to ship it.”

That approach makes even small decisions measurable.

“We ran an experiment where we put the login button in, like, five different places just to see where users click. We were surprised how quickly we could really tell which variant would work.”

For Lily, that same experimentation loop is critical higher up the funnel.

“Experimentation with PostHog is really important for our conversion rate optimization,” she said. “It’s how you build something backed by data, instead of assuming you know what users want.”

Hova told us about a recent experiment that followed this pattern.

“We had a lot of people come to the site thinking, _oh, this is where I generate images_,” Hova said. “They’d type something like ‘picture of a dog,’ and then you’d get text models responding with, ‘I can tell you about dogs.’ So it was a very obvious problem.”

Auto-routing users to the right modality seemed like the obvious fix, but it had to be tested carefully to make sure it didn't skew evaluation results.


Auto-routing users to the right modality seemed like the obvious fix, but it had to be tested carefully to make sure it didn't skew evaluation results.

“We set up an experiment where we had an AI model look at the text input and decide which modality you should use based on the prompt. We also tested multiple variants, like what the button should look like and how assertive the routing should be.”

After about two weeks, the results were clear. “People were less confused, and fewer users were sending messages to the wrong area. We were also able to dial in the right assertiveness for offering secondary suggestions, like _did you mean an image?_”

## Guardrails against bias
Mobile UX introduces another complexity. Early versions of Battle mode stacked responses vertically due to screen size constraints. The team suspected a scroll-based interaction might work better and rolled out a new experience to a subset of users.

“We were kind of blown away by how much it helped with retention and with people actually casting votes,” Hova said. But improved engagement wasn’t enough.

Even though the product randomizes which model is A or B, the team wanted to validate that the new UI didn’t influence voting behavior. That cohort-level visibility has also helped surface issues elsewhere.

“I’ve seen instances where engineers noticed something off with a cohort,” Lily added. “There was some action that wasn’t happening for a group of users, and PostHog gave us visibility into the issue.”


## Seeing the full picture
As a platform dependent on users returning and voting repeatedly, retention is the north star for LMArena. “The thing we care about most is monitoring the funnel from visiting the site to chatting and voting,” Hova told us.

That’s where PostHog clicked early for the team. Being able to follow users from their first anonymous visit through to a logged-in vote made it possible to set up the conversion funnel properly.

“As a marketer, it’s so important to understand what top-of-funnel looks like, and which KPIs the company actually cares about,” Lily said. “All of that data lives in PostHog. It’s our source of truth for company performance.”

Product and web analytics, experiments, feature flags, cohorts, and filters all sit alongside the same behavioral data – so changes can be evaluated in context, not isolation.

More recently, the team extended that visibility into reliability.

“Being able to tie errors to the feature flags that were applied to them feels like a really great thing. We were using Sentry – it worked – but it’s just nicer having everything connected.”


## Why PostHog fits the way LMArena builds
So why PostHog? According to Hova, it started as a practical choice, then quickly became foundational.

“Initially we chose PostHog because it was easy to use. It was easy to create charts. The API was clean. Every time I hit a snag like, _how do you hook this up with Next.js in some weird edge case?_, there was always great documentation.”

Those were the early signals. The real test came later. As LMArena scaled, the workflow got more demanding: more experiments, more feature flags, and far more data. Over the past six months alone, event volume increased 19×. The tooling had to keep up.

PostHog supports that by letting the team ship carefully, test constantly, and instrument the system well enough to catch bias before it shows up in the results.

As Lily put it: “We have a lot of users and a lot of data. PostHog helps us interpret that data and pull real value out of it. It’s our source of truth for company performance.” 

<OSQuote
  customer="lmarena"
  author="matt_hova"
  product="experiments"
/>
