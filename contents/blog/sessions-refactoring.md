---
date: 2021-09-21
title: (TBD) Sessions refactoring
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: paolodamico
featuredImage: ../images/blog/titles.png
featuredImageType: full
---

Two main session analytics use cases:
1. Run session-based behavioral analytics. Useful for products with certain types of engagement where interactions over time are important and natural. Examples: Netflix, Slack, Notion.
2. Explore, debug, deep dive to answer _why_ users are behaving a certain way.


The first case we mostly don't support today. The only session-based analysis you can do is session duration distribution and even then it has the fundamental problem of how sessions are computed.

For the second case, sessions is not the best way to solve the problem. Further, all the work we're doing around Paths and Quant Analysis will actually solve for this use case and provide significantly more value. In particular, you'll get the same useful qualitative information, but the quantitative overlay will greatly reduce bias (and effort).


Here's therefore an ambitious proposal.

### Actions

- Getting rid of the sessions page altogether. It causes a ton of confusion and provides limited value. In numerical terms, less than [3%](https://app.posthog.com/i/ifiUioRu) of pageviews in the app in the last month were on the sessions page for users with no session recording enabled (proxy metric).
  - Introduce a session recording list page instead. This page should mostly be around finding specific recordings you want to watch (e.g. customer support, recordings with exceptions, ...). _Funnels will be the starting spot for the other use cases._
  - On the Person page, we'll include recordings first and events as a secondary tab.
- Getting rid of the "Sessions" insight. The functionality is quite limited (only a time distribution with limited visualization) and confusing (e.g. the events/actions that compose a session). Further, only [1.5%](https://app.posthog.com/i/y_iUoLva) of insights analyzed in the last month were on "Sessions".


**Longer-term actions**
- Support session-based behavioral analytics (if it makes sense, gather more context first). Allow users to set their own `session_id` or have flexibility around the concept of sessions. Support a full range of analytics from session count, duration, multi-device sessions, ...
> Why not support this today? We could, but it's a separate conversation/goal from Diagnosing Causes. We can gather more context and decide if it's worth prioritizing.