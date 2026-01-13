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

We spoke with Matt Hova, Member of Technical Staff, and Lily D., Growth Marketer, about how PostHog helps support LMArena's core mission to measure and advance the frontier of AI.

## Measuring preference without introducing bias

At LMArena, the product _is_ the measurement. Every vote feeds directly into how models are ranked, so while experimentation is essential, it’s also risky. A slightly different layout or interaction pattern can quietly influence user behavior. 

"The core thing that we’re doing is collecting votes.” Hova told us. “Anytime that we update the UI, we risk affecting the bias of how votes are cast.” 

That’s where PostHog comes in. Feature flags and experiments enable the team to ship A/B tests without committing to them. Before a change makes it into the main experience, the team tests for bias signals: Are users suddenly favoring one side? Are vote patterns drifting?

According to Hova “everything we launch has an experiment, often with multiple treatments, to make sure the guardrails stay healthy.” 

This discipline applies across the product, from major features to small UI decisions.

## Experiments as the default
At any given time, the team can have dozens of experiments running in parallel. When it comes to knowing what “wins”, Hova is candid that formalizing this is a work in progress.

“Generally, you come into it with a product spec and say, this is what we expect to happen. These are the numbers we want to see in order to ship it. And usually there’s one event we really care about and want to target.”

That approach makes even small decisions measurable.

“We ran an experiment where we put the login button in, like, five different places just to see where users click. We were surprised how quickly we could really tell which variant would work.”

A recent experiment that followed this pattern focused on refining auto modality in their AI chat experience. 

LMArena offers three ways to interact with models: direct chat, where users pick a single model; side-by-side, where they choose two models; and Battle mode, where users submit a prompt for two random models to respond to.

“We had a lot of people come to the site thinking, oh, this is where I generate images,” Hova said. “They’d type something like ‘picture of a dog,’ and then you’d get text models responding with, ‘I can tell you about dogs.’ So it was a very obvious problem.”

Auto-routing users to the right modality seemed like the obvious fix, but it had to be tested carefully to make sure it didn't skew evaluation results.

“We set up an experiment where we had an AI model look at the text input and decide which modality you should use based on the prompt. We also tested multiple variants, like what the button should look like and how assertive the routing should be.”

After about two weeks, the results were clear. “People were less confused, and fewer users were sending messages to the wrong area. We were also able to dial in the right assertiveness for offering secondary suggestions, like _did you mean an image?_”

## Guardrails against bias
Mobile UX introduces another complexity. Early versions of Battle mode stacked responses vertically due to screen size constraints. The team suspected a scroll-based interaction might work better and rolled out a new experience to a subset of users.

“We were kind of blown away by how much it helped with retention and with people actually casting votes,” Hova said. But despite the positive engagement metrics, the team didn’t immediately trust the results. Specifically, they wanted to understand whether the new interaction pattern caused users to favor one side more than the other.

“Even though we randomize which model is A or B, we wanted to make sure people weren’t suddenly picking A way more than B, or vice versa. We just wanted to understand how the bias was changing.”

## Nothing happens in isolation
As a platform dependent on users returning and voting repeatedly, retention is the north star for LMArena. “The thing we care about most is monitoring the funnel from visiting the site to chatting and voting,” Hova told us.
That’s where PostHog clicked early for the team. Being able to follow users from their first anonymous visit through to a logged-in vote unlocked the full picture.

That end-to-end view made it possible to set up the conversion funnel properly – plus, having product analytics and web analytics in one place means experiments, feature flags, cohorts, and filters all live alongside the same behavioral data. 

More recently, the team extended that visibility into reliability using error tracking.

“Being able to tie errors to the feature flags that were applied to them feels like a really great thing. We were using Sentry – it worked – but it’s just nicer having everything connected.”

## Why PostHog fits the way LMArena builds
So why PostHog? According to Hova, “initially we chose PostHog because it was easy to use. It was easy to create charts. The API was clean. Every time I hit a snag like, how do you hook this up with Next.js in some weird edge case?, there was always great documentation on how to set it up.”

All good starting signals, but the staying power has shifted as LMArena grows. Over the past 6 months, their event volume has increased 19X.

Labs need feedback they can trust, and enterprises need confidence that rankings reflect not just benchmarks, but real-world performance.

That means shipping carefully, testing constantly, and instrumenting the system well enough to catch bias before it shows up in the results.

<OSQuote
  customer="lmarena"
  author="matt_hova"
  product="experiments"
/>
