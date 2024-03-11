---
date: 2023-10-23
title: Why we've launched PostHog user surveys
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-survey.png
featuredImageType: full
category: Inside PostHog
---

Today, we’ve announced [user surveys](/surveys) are out of beta and in general release, complete with [new pricing](/pricing). Short version? Pricing is usage-based, with a free tier for small projects and an improved offer for everyone who participated in the beta. 

Launches like this are always exciting for us, but this one is _especially_ notable because it firmly establishes PostHog as an all-in-one tool for building better products. 

Why is this important? Because spreading everything out across multiple platforms _sucks_. Replays in HotJar, feature flags in LaunchDarkly, surveys in Pendo, analytics in Amplitude (but not your SQL insights, those go somewhere else), and experiments in Google Optimize? That only lays a foundation for frustration, incompatibility, and inconsistency.

It’s also a pain having to log in and out of new platforms all the time. 

Imagine creating surveys triggered by the same events you track in your analytics.

Imagine tracing a survey response back to session replay in just a few clicks.

Imagine trialling a new feature as an A/B test, collecting feedback on it with surveys, and finally shipping the new feature to everyone, without ever switching tools.

Imagine your qualitative and quantitative data in one place, connected to the tools you need dissect and act on it.

That’s the vision we have for PostHog – an all-in-one platform where you can research users, observe usage, analyze data, test ideas, deploy changes, and measure impact consistently, and easily. 

No more tool juggling, compatibility wrestling, unclear pricing, or botched integrations – just a single, open-source platform that does it all.

Surveys aren’t [our defining feature](/handbook/company/values#we-havent-built-our-defining-feature-yet), but they’re an essential part of this vision. They add valuable real user feedback to the powerful, qualitative data you can already analyze using PostHog

## What's new in PostHog surveys?

Since we shipped the [initial beta in June](/changelog/2023#surveys-beta-released) with open text surveys, we've added:

- **[July 25:](/changelog/2023#emoji-and-number-surveys-types-released)** Emoji and number rating survey types
- **[August 8:](/changelog/2023#multiple-choice-surveys-released)** Multiple choice surveys
- **[August 18:](/changelog/2023#wait-periods-now-available-for-surveys)** Wait periods and thank you messages
- **[September 14:](/changelog/2023#automatic-nps-scoring-added-to-surveys)** Automatic NPS calculation
- **[October 10:](/changelog/2023#surveys-get-a-makeover)** Redesign and multiple step surveys
- **[October 19:](/changelog/2023#survey-templates-added)** Survey templates for NPS, CSAT, CES and more

These features make surveys perfect for the most common use-cases, including NPS surveys, customer satisfaction surveys, and [product-market fit surveys](/blog/measure-product-market-fit). 

Dozens of teams participated in the beta and hundreds of developers contributed PRs and ideas elsewhere in our code to help us get this far. There are over 81,000 engineers in the PostHog community now, and we couldn’t have built surveys without their support and feedback — we’re thrilled to release surveys fully so they can start collecting feedback from their communities too. 
