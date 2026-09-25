---
title: How Juno makes health tracking easier by merging 90% of self-driving PRs
customer: Juno
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/PLACEHOLDER_juno_featured.png
date: 2026-09-23
seo:
  metaTitle: Why Juno merges 90% of self-driving PRs from PostHog
  metaDescription: Juno's founder had already built his own bug-fixing agent, but switched to PostHog self-driving anyway. Now the team merges 90% of the PRs it gets.
---

[Juno](https://junocompanion.com/) is an AI health assistant for people living with chronic illness. Despite only launching recently out of YC's Spring 2026 batch the team has already found product-market fit and built a user base of 250,000 users who rely on it for health tracking support.

"People with a chronic illness spend 99.99% of their lives outside the medical system," says Marshall Gould, Juno's CEO, who studied genetics at UCL and genomic medicine at Oxford University. "I've experienced that personally as someone who has myalgic encephalomyelitis/chronic fatigue syndrome and I know that not everyone can afford a personal care assistant. Health services put a huge emphasis on attending doctor's appointments, with no care or management set up in the interim. We wanted to fill the gap and that's why we built Juno."

Marshall built the app himself, but a side-effect of the rapid success and growing user base was that he found he couldn't keep up with bug reports and feature requests. Rather than balloon the size of the team, he created a system of agents to fix simple issues for him by pulling data from [Mixpanel](/blog/posthog-vs-mixpanel).

"Someone would report a bug, we'd pull the context from Mixpanel if we could and the AI would test whether it could replicate the bug, fix it, and push a PR with a simulator recording I could watch," he says. "Then I'd review the code and press merge. It worked, but was cumbersome and Mixpanel didn't reliably have all of the data the agents needed."

Because agents didn't always have the right context to identify and fix issues, Marshall began looking for a tool which could collect more information — and so soon [switched from Mixpanel to PostHog](/docs/migrate/mixpanel).

After installing PostHog with [the wizard](/wizard) he had one platform to monitor analytics, track errors, and observe behaviour — as well as PostHog's [self-driving features](/self-driving) to turn that data and context into PRs.

"I'd basically done part of what PostHog was doing," he says. "But it's so much nicer to have a system that's actually meant for it and integrated with all of the context seamlessly. Our merge rate for self-driving PRs has increased to 90% now that we use PostHog for self-driving."

<OSQuote
  customer="juno"
  author="marshall_gould"
  product="self_driving"
/>

## Self-driving development and user privacy

As a healthtech app, Juno takes privacy further than most consumer apps, and doesn't sell or share personal data. It strips PII and PHI before storing anything, hashes everything in its database, and covers the AI models it uses with zero data retention agreements and BAAs so user data is never used for training.

This approach is great for user privacy, but makes debugging harder for humans because it's difficult to spot a bug when you have privacy protections in place. Self-driving agents, on the other hand, can pull supporting context from several tools at once.

"If someone's being vague about their problem and hasn't shared logs, we can prompt PostHog on what it could be based on their analytics, error reports, and previous bugs," Marshall says. "Realistically, if one user reports something, another 100 users have it too."

A [PostHog scout](/blog/what-is-a-scout) doesn't need to read a user's data to see [rage clicks](/docs/product-analytics/autocapture) and know something is wrong, and it can piece the rest together from [Error Tracking](/error-tracking) and [Product Analytics](/product-analytics). That's enough context to open a PR even when the bug report is thin — which is important because in a health app even small bugs can have a big impact.

"If something goes wrong in our medication log, for example, people might miss their medications or get dosages wrong," Marshall says. "If they're not entering the right thing, or they're not getting notifications? Those are the things we need to find straight away and squash as soon as they happen."

"We had one issue where users were repeatedly tapping at a button to log their medication and kept missing it," says Marshall. "It's the type of thing where a human can't easily notice it without watching dozens of recordings with the same behaviour, but an AI can spot it much faster and propose a fix."

That's exactly what happened too. A PostHog scout spotted the missed taps and proposed making the button bigger — as well as adding a "Log all" button that simplifies the process for people already dealing with fatigue. It's a small change on the surface, but one that makes a massive difference to Juno's users.


The same loop has fixed dozens of other issues for Juno: a chat box that hung so people couldn't message the in-app AI, dose-logging errors that only appeared on certain screen sizes, users getting stuck on frozen tabs, and dead taps that were losing drafts in the symptom logging flow.

![Juno's symptom log before and after a self-driving fix](/images/customers/juno/juno-symptom-hint-before-after.png)

<Caption>Self-driving spotted users tapping an unresponsive Continue button in the symptom log and losing their drafts. The fix adds a hint that explains what to do next.</Caption>

![Juno's support question before and after a self-driving fix](/images/customers/juno/juno-support-question-before-after.png)

<Caption>Self-driving also found users struggling with a question that advanced as soon as they touched an answer. The fix adds a clear selection state and a Next button.</Caption>

## Are self-driving PRs perfect?

No. Marshall still commits to reading every one and staying in the self-driving loop, even for fixes where he could auto-merge. Some bugs also can't be reproduced easily as they're dependent on device issues, like whether the phone is charging or in low power mode. In these cases Marshall reviews the code closely, but has come to trust PostHog's ability to solve the issue most of the time.

"It's not 100% accurate and I do sometimes edit slightly," he says. "We generally like to test on the simulator ourselves, depending on how much time we have. Sometimes we get an AI to test it if it's a high-confidence fix that just needs confirming."

"Right now we're merging 90% of our self-driving PRs though, and we think it's going great. The only thing PostHog can't do for us yet is generate React Native source maps, but I'm sure that will change," Marshall says. "We want to be fully PostHog-pilled going forward."

There is plenty left for Juno to build. The next release will add around 100 environmental data sources, including pollen count, weather, and air pressure, so Juno can surface trends earlier and move from tracking symptoms toward preventing them.

"With so much left to build, it's great that PostHog is helping us not just gather better data, but also ship faster and increase stability so users can rely on us to track their health."
