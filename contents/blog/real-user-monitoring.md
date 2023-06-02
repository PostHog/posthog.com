---
title: "Real user monitoring: what it is, why do it, and how to set it up"
date: 2023-05-31
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/happy-hog.png
featuredImageType: full
category: Product growth
tags:
  - Guides
  - Explainers
---

Before anyone can use your product, you must make sure it actually works. Figuring this out is more tricky than just running it locally. Changes often have unintended consequences on other parts of the app or create non-obvious issues. To track and prevent this, companies rely on monitoring.

There are a few ways to do monitoring. The first is synthetic monitoring, which relies on  simulated behaviors and software tests. The second way, which we cover in this post, is real user monitoring. This is monitoring the behavior of real users in your product to ensure that it is working as intended. 

## Real user monitoring in detail

Real user monitoring is tracking the usage, performance, and quality of your product based on how users are experiencing it.

Because of this, it is a closer representation of reality. It identifies real issues, largely broken down into two classes:

- Performance: loading, page, and query speed
- Usability: errors, confusion, bugs

![Types](../images/blog/real-user-monitoring/classes.png)

The ideal real user monitoring system identifies these problems, provides details, supports planning of fixes, and ultimately, supports creating a better user experience.

## Why do real user monitoring?

Real user monitoring is important because it helps you understand your current user experience, discover ways to improve it, and manage the risk of future issues.

![Why](../images/blog/real-user-monitoring/why.png)

### 1. Understand current experience

The first reason to do real user monitoring is to ensure your product performs well and provides a good user experience. This means it loads fast, is issue-free, and enables users to accomplish their goals efficiently.

To make this happen, you must have visibility into what the current user experience is like.This means understanding query performance, core web vitals, front and backend error rates, unclear UI, rageclicks, and more. These are signs of a negative user experience to be fixed.

### 2. Improve experience

There are always endless potential improvements to your product. To get the largest impact on what you build, real user monitoring provides metrics to prioritize these improvements. For example:

- A slow query might not matter for a free user but might be a top priority for a large potential customer in a trial stage.
- Multiple users complain about slow queries, but you don’t know which ones or how slow they are without tracking.
- A user complains a feature "sucks." This feedback by itself is unclear. It could mean slow page speed, poor design, a bug, or a lack of knowledge.

Real user monitoring helps you get the information to understand and prioritize the issues. It also provides details on how to solve those issues; for example, session replays being bug recreation steps or query metrics showing which ones are slow.

### 3. Manage risk

The third and final reason to do real user monitoring is to manage risk. It supports this by uncovering potential risks, providing details for planning, and being part of the solution. 

By knowing error rates, page and query speeds, and product usage, teams are able to monitor the the health of the product and prevent incidents. These metrics also enables companies to make promises about their experience quality, and back those promises with data. 

For large companies, this is critical. These promises are often solidified in a service-level agreement, or SLA, which is a contract defining the expected service levels an application must provide (such as uptime and performance).

## How to setup real user monitoring with PostHog

Setup happens over three stages: capture, analyze, and action. PostHog has the tools to do all three.

### 1. Capture

To capture data for real user monitoring in PostHog, we rely on [session replays](/docs/session-replay) and [custom event capture](/docs/getting-started/send-events#2-capture-custom-events). 

Session replays capture exactly how users are interacting with your product. They also include errors, console logs, and performance measurements. To enable session replays, initialize a `posthog-js` client or add the [snippet](/docs/getting-started/install?tab=snippet) to your site and make sure to enable the options related to "Recordings" in your [project settings](https://app.posthog.com/project/settings#recordings).

![Recordings](../images/blog/real-user-monitoring/recordings.png)

To capture errors, query speed, aggregate performance metrics, and any other events, you can capture custom events using one of our [SDKs](/docs/libraries/js) or with our [API](/docs/api/post-only-endpoints). Alternatively, for error capture, you can use our [Sentry integration](/docs/libraries/sentry). See a more detailed capture setup in our "[How to set up Next.js monitoring](/tutorials/nextjs-monitoring)" tutorial.

### 2. Analyze

Once you’ve begun to capture data, you can start to analyze it. This helps you identify usability and performance issues in your product. You can [create insights](/docs/product-analytics/insights#how-to-create-an-insight), and add them to a monitoring [dashboard](/docs/product-analytics/dashboards). Some insights you might want to add to your dashboard include:

- Errors broken down by page, group, or user.
- Average or p95 page load speed broken down by page.
- Average or p95 query speed broken down by query.
- Rageclicks broken down by page.
- User path to errors.

![Dashboard](../images/blog/real-user-monitoring//dashboard.png)

For each of these insights, you can use session replays to dive deeper into exactly what is happening in the related sessions. Click the visualization to get a list of users and their replays. In those replays, you can see where events like errors or queries happen, console logs, and performance details for that specific session. 

![Dive](../images/blog/real-user-monitoring/dive.mp4)

The combination of these insights enables you to understand your current user experience and what areas need improvement.

### 3. Action

Once you’ve set up capture and analysis,  you must take action on what you've discovered. There are two key ways of doing this: feature development and business processes.

Your monitoring can inform what you are working on. It can show the most common issues hurting user experience, errors, slow queries, and more. Understanding the full landscape of your product’s user experience enables you to prioritize solutions.

For example, breaking your insights down by page enable you to see what pages have the highest number of errors. You can then work to fix errors on that page to improve users’ experience with it. Session replays show you the exact details, enabling you to figure this out quickly. 

Real user monitoring can also integrate with your business processes because a high-quality experience doesn’t only mean the product, but also your interactions with users. For example, you can use actions to send notifications to webhooks on errors. You can then use these webhooks to send details to the places your team spends time in like Slack or Teams. 

In PostHog’s case, we do this with a [broken link checker](/tutorials/broken-link-checker). It  send us a notification in Slack when someone navigates to a page that doesn’t exist and gets a 404. This helps us fix these links and provide a better user experience.

![404s](../images/blog/real-user-monitoring/404.png)

## Further reading

- [The most useful product health metrics](/blog/product-health-metrics)
- [Retention rate vs churn rate: An intro to churn analysis](/blog/churn-rate-vs-retention-rate)
- [How to improve web app performance using PostHog session replays](/tutorials/performance-metrics)