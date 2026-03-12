---
date: 2026-03-13
title: Open source (and self-hosted) session replay tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/open-source-hotjar-alternatives/replayhog.png
featuredImageType: full
featuredVideo: 'https://www.youtube-nocookie.com/embed/mWW3lJw81LE'
author:
  - hanna-crombie
  - andy-vandervell
  - natalia-amorim
category: General
tags:
  - Comparisons
---

[Open-source analytics](/blog/best-open-source-analytics-tools) is great when you need hard numbers, but hard numbers don't give you the full picture. 

What else do you need to do? [Talk to users](/blog/10x-engineers-do-user-interviews)? Sure. Gather feedback? That's useful, too. But, for us, there's nothing better than watching session replays for understanding a user's pain points.

Replays (aka session recordings) are a great way to understand:

- What causes bugs and user frustration.
- Where users are getting stuck on your site.
- Hesitation at different stages of your funnel.
- How your users are interacting with individual elements of your product.

[Hotjar](/blog/posthog-vs-hotjar) (now part of Contentsquare) and [Fullstory](/blog/posthog-vs-fullstory) are popular session replay products, but they're expensive, inflexible, and primarily designed with marketing teams. 

In this guide, we're looking at [Hotjar alternatives](/blog/best-hotjar-alternatives) that are either free or open source, particularly session replay tools. 

## 1. PostHog
![PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/screenshots/session-replay.png)

[PostHog](/) (that's us 👋) is an all-in-one developer platform that includes [session replay](/session-replay), [product analytics](/product-analytics), [heatmaps](/heatmaps), [feature flags](/feature-flags), [A/B testing](/experiments), [error tracking](/error-tracking), [surveys](/surveys), and more. 

This means it's not just an open source session replay tool, but a full replacement for tools like [Hotjar](/blog/best-hotjar-alternatives), [FullStory](/blog/best-fullstory-alternatives), [LaunchDarkly](/blog/best-launchdarkly-alternatives), and [Sentry](/blog/best-sentry-alternativs).

PostHog's [session replay](/docs/session-replay) includes console logs, network activity, a DOM explorer, and performance metrics so you can identify the root cause of bugs without leaving the replay. You can filter recordings by user, event, feature flag, or any combination of properties, save playlists of related sessions, and export recordings offline for safe keeping. 

[AI session summaries](/ai) automatically surface key moments and issues, so you don't have to watch every recording in full. All of PostHog's tools work together natively – jump from a funnel drop-off directly into a relevant replay, or see which feature flag a user was on when they hit a bug.

### Who is PostHog for?

PostHog is ideal for startups, [product-minded developers](/blog/what-is-a-product-engineer), and product teams. Unlike Hotjar and Fullstory, it's designed for technical users. Its broad range of features means PostHog can replace several tools.

It also supports replay for mobile apps running that use Android, iOS, React Native, and Flutter SDKs, making it a good option if you're also looking for a tool that offers [Hotjar features for mobile apps](/blog/hotjar-for-mobile-ios-android-react-native-flutter).

### Key features

- **Session replay:** Console logs, network activity, DOM explorer, and performance metrics. Filter recordings by user, event, or feature flag. Export recordings offline. AI session summaries automatically surface key moments and issues without watching every recording.
- **Mobile replay:** Native SDKs for iOS, Android, React Native, and Flutter with 2,500 free mobile recordings per month.
- **Heatmaps:** Visualize clicks (including rage clicks), scroll depth, and mouse movement.
- **Error tracking:** Monitor exceptions and stack traces connected directly to session replays.
- **Product analytics:** Funnels, user paths, retention, trends, and SQL access for custom queries.
- **Privacy controls:** CSS selectors to block sensitive data. Cookieless tracking available.

### How much does PostHog cost?

PostHog Cloud is free up to 1 million captured events, 5,000 web recordings and 2,500 mobile recordings per month, and you can set billing limits to avoid surprise bills. 

> #### Bottom line
>
> PostHog is the best open source session replay tool if you want more than just replay. Its generous free tier, mobile support, and tight integration with analytics, feature flags, and error tracking make it the most complete option on this list.
 
<WizardCTA />

## 2. OpenReplay
![OpenReplay - open source session replay](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/open-source-hotjar-alternatives/img2_OpenReplay.png)

[OpenReplay](/) is an open-source [alternative to Microsoft Clarity](/blog/best-microsoft-clarity-alternatives) that offers more advanced, technical features for engineers on top of basic session replay. Its tooling is particularly effective for application state and customer support. It has some basic analytics features, such as funnel analysis, though it falls some way short of feature-complete product analytics tools.

### Who is OpenReplay for?

OpenReplay is a developer-friendly tool. It allows engineers to see how users are interacting with their web apps, respond to issues faster, and troubleshoot problems with users.

### Key features

- **Session replay:** Pixel-perfect recordings with event timelines, network activity, console logs, and JS error capture.
- **DevTools:** Reproduce bugs as if they happened in your own browser, with application state, GraphQL queries, and 40+ metrics.
- **Co-browsing:** Live screen sharing with users via WebRTC – no third-party software required.
- **Heatmaps:** Click and scroll heatmaps added in recent releases.
- **Product analytics:** Basic funnel analysis and conversion tracking.
- **Spot:** A Chrome extension for recording bugs directly from the browser with full technical context attached.

### How much does OpenReplay cost?

OpenReplay has three cloud plans and a free self-hosted option. 

- The **Free** cloud plan is $0 and includes up to 1,000 sessions/month, 2 users, 1 project, and 30-day data retention. 
- The **Serverless** plan is $5.95 per 1,000 sessions/month with unlimited users and projects, also with 30-day retention. 
- The **Dedicated** plan starts at $0.25/hour (roughly $179/month) and gives you a dedicated VM with configurable data retention, SSO/SAML, conditional recording, and data residency across 35+ regions. 

The **self-hosted open source edition** is completely free and includes all core features.

> #### Bottom line
>
> OpenReplay is the best self-hosted option for developer teams that need advanced debugging tools and full data sovereignty. Its co-browsing feature is unique among open source tools. The tradeoff is that self-hosting requires real DevOps resources to deploy and maintain at scale.

## 3. Sentry

![Sentry](https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_03_12_T19_18_34_436_Z_d79ea5531f.png)

[Sentry](/blog/posthog-vs-sentry) is a source-available application monitoring platform primarily known for error tracking and performance monitoring. 

Session replay was added in 2023 and is tightly integrated with Sentry's error data: when an exception fires, the session replay for the affected user is automatically linked, giving you the full interaction context without any additional investigation.

### Who is Sentry for?

Sentry is for developers and engineering teams, not UX or product teams. Sentry approaches replay from an error-first perspective – it's most valuable when you want to understand what a user was doing right before something broke.

### Features and benefits

- **Session replay:** Video-like reproduction of user interactions including page visits, mouse movements, clicks, taps, and scrolls.
- **Error-linked replay:** Every error automatically links to the relevant session replay for instant context.
- **Performance monitoring:** Web vitals, transaction tracing, and frontend performance data alongside replays.
- **Error tracking:** Real-time exception monitoring with stack traces across dozens of languages and frameworks.
- **Self-hosting:** Full self-hosted deployment available free.

### How much does Sentry cost?
 
Sentry has four plans. 

- The **Free** plan is $0 and includes 1 user, error monitoring, and 50 session replays/month. 
- The **Team** plan is $26/month with unlimited users and 50 replays included, with additional replays available at usage-based rates. 
- The **Business** plan is $80/month and adds unlimited custom dashboards and anomaly detection. 
- **Enterprise** pricing is custom. 

All plans include 50 session recordings. Self-hosting is free via Docker Compose, though it's designed for simpler deployments rather than large-scale production use.

> #### Bottom line
>
> Sentry is the best option if your team already uses it for error monitoring and wants to add session replay without a new vendor. It's not a standalone replay tool – it's most valuable when replay is part of a broader error and performance monitoring workflow.

## 4. UXWizz
![UXWizz - self hosted session replay](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/open-source-hotjar-alternatives/img3_UXWizz.png)

**UXWizz** is a simplified, self-hosted product analytics tool offering features like visitor insights, session recording, segments and A/B testing. 

It offers a lightweight version of session recording that only stores the URL of the page and the user actions. This is designed to optimize your data storage and remove the manual maintenance otherwise required by UXWizz.

UXWizz is maintained by a single developer.

### Who is UXWizz for?

UXWizz is a good choice for individuals and small businesses who want quick, qualitative insights and session recordings. A Wordpress plugin is also available.

### Features and benefits

- Broad range of engagement-focused insights
- Low database usage with lightweight version
- Unlimited usage with one-time license fee

### How much does UXWizz cost?

UXWizz is available as a self-hosted solution only and with prices starting at £129 for a lifetime license, including 1-year support. Additional updates and support are priced as add-on subscriptions.

## 5. UXlens
![UXlens - self hosted session replay](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/open-source-hotjar-alternatives/img4_UXlens.png)

[UXlens](https://uxlens.com/) is a developer-first session recording tool that provides insight into user interface and conversion issues. It does not include any additional analytics tools, but does have useful segment filtering features that help businesses locate blocks in their funnel.

### Who is UXlens for?

UXlens is a good choice for UX designers and product teams who want to study the impact of their UI on the user journey without spending too much.

### Strengths

- Customizable filters to track sessions on specific user segments
- Input elements masked by default to protect user data
- UI to assist with complex filter building

### How much does UXlens cost?

The cloud version starts at just $6 per month for 6,000 recordings. Lifetime self-host licenses start at $200.

## 6. [Matomo](/blog/posthog-vs-matomo)
![Matomo - open source GA alternative](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/open-source-hotjar-alternatives/Matomo-session-recording.png)

[Matomo](/blog/posthog-vs-matomo) is an open web analytics platform. Touted as an alternative to Google Analytics, Matomo is largely focused on understanding marketing website analytics. Session recording is available as an add-on via the [on-premise marketplace](https://plugins.matomo.org/HeatmapSessionRecording).

### Who is Matomo for?

Matomo is mainly built with marketing and content teams in mind, offering insights into website content engagement for optimization of user journeys. Features like session recording are part of a wider set of tools that are useful for product teams as well, but they aren't included in Matomo's open source release. To learn more, read our [PostHog vs Matomo comparison](/blog/posthog-vs-matomo).

### Features and benefits

- Funnels, acquisition analysis and other insight features
- Unlimited session recordings
- Out-of-the-box solution meaning no developer required to get set up

### How much does Matomo cost?

The session recording add-on for a self-hosted Matomo solution has a 30-day free trial, after which the cost ranges from $199 to $599 per year depending on the number of users in your team. Session recording is also included in Matomo’s cloud Business plan. Pricing is calculated depending on the volume of your site traffic.