---
date: 2021-10-07
title: Sessions deprecation
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: paolodamico
featuredImage: ../images/blog/generic-release-notes.png
featuredImageType: full
---

This blog post describes our process to deprecate and remove the previously existing "Sessions" page in PostHog. This page used to contain a list of all sessions by your users on a given day, where sessions were calculated by periods of activity where no inactivity larger than 30 minutes was detected. In addition, this is where you would be able to access [recordings](/docs/user-guides/recordings).

Now, you will see a **Recordings** tab on the main menu in its place.


## Why?

We got continuous reports from users where this page was causing confusion (e.g. "missing recordings", sessions definition not fitting all use cases, inability to filter properly), which led us to question the purpose of this page and sessions in general at PostHog. 

We found two main session analytics use cases:
1. Run session-based behavioral analytics. Useful for products with certain types of engagement where interactions over time are important and natural. Examples: Netflix, Slack, Notion.
2. Explore, debug, deep dive to answer _why_ users are behaving a certain way.


We realized, the first case we mostly don't support today. The only session-based analysis you can do is session duration distribution and even then it has the fundamental problem of how sessions are computed. Not all products define sessions by 30 minutes of inactivity, and further, we had edge cases such as server-side events being sent asynchronously for a user.

For the second case, sessions is not the best way to solve the problem. Further, all the work we are doing around Paths and Quantitative Analysis (see [Diagnosing Causes](/handbook/strategy/strategy#milestone-2-early-august-onwards)) will actually solve for this use case and provide significantly more value. In particular, you'll get the same useful qualitative information, but the quantitative overlay will greatly reduce bias (and effort).


### What's new

From the context above, we decided to take the following actions:
- Remove the sessions page altogether. It introduces significant confusion and provides limited value. In numerical terms, less than 3% of pageviews in the app in the last month were on the sessions page for users with no session recording enabled (proxy metric).
- Introduce a recordings list page instead. This page should mostly be around finding specific recordings you want to watch (e.g. customer support, recordings with exceptions, ...). This page also includes filtering that's geared towards finding the recordings you care about. _Funnels will be the starting spot for the other use cases.
- On the Person modal you get when clicking on a data point in an insight graph, and particularly in funnels, you now get a direct link to relevant recordings for the specific users in the data point.
- On a Person page, recordings are now shown first (if enabled) and events as a secondary tab.
- We're evaluating getting rid of the "Sessions" insight. The functionality is quite limited (only a time distribution with scant visualization) and confusing (e.g. the events/actions that compose a session). Further, only [.5% of insights analyzed in the last month were on "Sessions".


In addition to the changes above, we're significantly improving recordings ingestion to make sure more sessions are captured, and the recordings playback experience to make sure you can seamlessly find the relevant parts of a recording.


> 💡 **Not seeing these changes yet?** We're A/B testing some of these changes in PostHog Cloud, you may still not be in the release group. Please [contact us](/slack) if you'd like to be included. If you're on PostHog Self-Hosted please keep an eye out for the next release.

## What's next?
Consider full support for session-based behavioral analytics. We need to gather more context first on the use cases for this. In particular, we want to make sure users have flexibility around their own concept of sessions, support a full range of analytics (e.g. session count, duration, multi-device sessions), etc.