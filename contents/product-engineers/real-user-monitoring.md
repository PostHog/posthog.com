---
title: What is real user monitoring (and how to set it up)
date: 2023-06-13
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/happy-hog.png
featuredImageType: full
ogImage: generated
tags:
  - Product engineers
  - User research
  - Session replay
crosspost:
  - Blog
---

Before anyone can use your product, you must make sure it actually works as expected. Figuring this out is trickier than just running it locally. Changes often have unintended consequences on other parts of the app or create non-obvious issues. 

One way to track and prevent this is synthetic monitoring, which relies on simulated behaviors and software tests. The second way, which we cover in this post, is real user monitoring (RUM). 

## What is real user monitoring?

Real user monitoring is tracking the usage, performance, and quality of your product based on how users are experiencing it, including problems that tests might miss.  

Because it tracks real user behavior, it is a closer representation of reality. It identifies issues, largely broken down into three classes:

- Performance: loading, page, and query speed, web vitals
- Reliability: JavaScript exceptions, failed requests, application errors
- Usability: errors, confusion, bugs, rageclicks, unclear UI

![Types](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/real-user-monitoring/classes.png)

The ideal real user monitoring system captures data about these issues, provides details, supports planning of fixes, and ultimately, supports creating a better user experience.

## Benefits of real user monitoring

By helping you understand your current user experience, real user monitoring helps you discover ways to improve it and manage the risk of future issues.

![Why](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/real-user-monitoring/why.png)

### 1. Improve experience

There are always endless potential improvements to your product. To get the largest impact on what you build, real user monitoring provides metrics to prioritize these improvements. For example:

- A slow query might not matter for a free user but might be a top priority for a large potential customer in a trial stage.

- Multiple users complain about slow queries, but you don’t know which ones or how slow they are without tracking.

- A user complains a feature "sucks." This feedback by itself is unclear. It could mean slow page speed, poor design, a bug, or a lack of knowledge.

Real user monitoring helps you get the information to understand and prioritize the issues based on their impact. [Session replays](https://posthog.com/session-replay) provide context about what users experienced before a problem occurred, while performance metrics and [error tracking](https://posthog.com/error-tracking) help identify what went wrong.

### 2. Manage risk

Real user monitoring uncovers potential risks, provides details for planning, and is part of the incident alerting process.

By knowing error rates, page and query speeds, and product usage, teams are able to monitor the health of the product and prevent incidents. These metrics also enables companies to make promises about their experience quality, and back those promises with data. 

For large companies, this is critical. These promises are often solidified in a service-level agreement, or SLA, which is a contract defining the expected service levels an application must provide (such as uptime and performance).

## How to set up real user monitoring with PostHog

Setup happens over three stages: capture, analyze, and action. PostHog, as an all-in-one developer platform, has the tools to do all three through its Web Analytics, Error Tracking, Session Replay, and Product Analytics features. These features work together to help you identify issues, maintain reliability, and, most importantly, keep users happy. 

> Not a PostHog user? [Get started for free](https://app.posthog.com/signup?utm_source=real-user-monitoring-blog) – all users get 1 million events, 5k recordings for session replay, and 100k exceptions for error tracking free every month, no card required.

### 1. Capture

To capture real user monitoring data in PostHog, start by installing and initializing the [JavaScript Web SDK](/docs/libraries/js) or add the [snippet](/docs/getting-started/install?tab=snippet) to your site. After, make sure to enable the options related to "Recordings" in your [project settings](https://us.posthog.com/replay/settings).

![Recordings](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/real-user-monitoring/recordings.png)

From there, you can capture the data you need using a few PostHog tools:

- **Web Vitals:** Find out whether your pages are slow, unresponsive, or jumping around as they load. Enable [Web Vitals](https://posthog.com/docs/web-analytics/web-vitals) autocapture to track metrics like Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). You don't even need to instrument these yourself!

- **Error Tracking:** Now you can catch exceptions and see what's breaking. PostHog groups similar exceptions into issues, so you can see which errors keep happening instead of digging through individual events. You can also use `posthog.captureException(error)` to capture handled errors.

- **Session Replay:** See what users were doing before something went wrong. Session Replay recordings show how people interact with your product, while optional console logs and network recording give you more context when debugging.

For things PostHog doesn't automatically capture, like the time it takes a specific backend query to run, you can use custom events or instrument the operation. Many frameworks, like React and [Next.js](/tutorials/nextjs-monitoring), have functions for these built-in, others you must build them yourself. Once set up, when an event happens, capture it with one of our [SDKs](/docs/libraries/js) or with our [API](/docs/api/capture).

### 2. Analyze

Once you’ve begun to capture data, you can start to analyze it. This helps you identify usability and performance issues in your product. You can [create insights](/docs/product-analytics/insights#how-to-create-an-insight), and add them to a monitoring [dashboard](/docs/product-analytics/dashboards). Some insights you might want to add to your dashboard include:

- Errors broken down by page, group, or user.
- Average or p95 page load speed broken down by page.
- Average or p95 query speed broken down by query.
- Rageclicks broken down by page.
- User path to errors.

![Dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/real-user-monitoring/dashboard.png)

For each of these insights, you can use session replays to dive deeper into exactly what is happening in the related sessions. Click the visualization to get a list of users and their replays. In those replays, you can see where events like errors or queries happen, console logs, and performance details for that specific session. 

![Dive](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/blog/real-user-monitoring/dive.mp4)

Enabling session replay also captures performance metrics which you can aggregate and analyze using [SQL insights](/docs/data-warehouse/sql) and the `raw_session_replay_events` table.

The combination of these insights enables you to understand your current user experience and what areas need improvement.

### 3. Action

Once you’ve set up capture and analysis, you must take action on what you've discovered. There are two key ways of doing this: feature development and business processes.

Your monitoring can inform what you are working on. It can show the most common issues hurting user experience, errors, slow queries, and more. Understanding the full landscape of your product’s user experience enables you to prioritize solutions.

For example, breaking your insights down by page enables you to see what pages have the highest number of errors. You can then work to fix errors on that page to improve users’ experience with it. Session replays show you the exact details, enabling you to figure this out quickly. 

Real user monitoring can also integrate with your business processes because a high-quality experience doesn’t only mean the product, but also your interactions with users. For example, you can send notifications to webhooks on errors. You can then use these webhooks to send details to the places your team spends time in like Slack or Teams.

At PostHog, we do this with a [broken link checker](/tutorials/broken-link-checker), which sends us a notification in Slack when someone navigates to a page that doesn’t exist and gets a 404. This helps us fix these links and provide a better user experience.

![404s](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/real-user-monitoring/404.png)

## Further reading

- [The most useful product health metrics](/blog/product-health-metrics)
- [Retention rate vs churn rate: An intro to churn analysis](/blog/churn-rate-vs-retention-rate)
- [How to improve web app performance using PostHog session replays](/tutorials/performance-metrics)

<NewsletterForm />
