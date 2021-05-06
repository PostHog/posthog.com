---
title: Roadmap
sidebar: Handbook
showTitle: true
---

Our mission is to increase the number of successful products in the world. 

Our roadmap for 2021 will do three things:
1. Reach parity with other product analytics tools, but better
2. Ensure we have the best developer platform for event-based analytics
3. Make it easy to deploy and maintain a scalable version of PostHog, for free

# 1. Reach parity

PostHog went from 0 to a fully-featured analytics platform in an incredibly short period of time. Realistically, that did mean we had to cut some corners when it came to stability, usability and depth of analytics you could do with PostHog.

In 2021, we're going to make sure that PostHog has all the features you love from other platforms. That way, self-hosting your product analytics doesn't need to be a compromise.

We're also putting more focus into usability and UX, especially for less technical users.

# 2. Best developer platform

Developers like using PostHog for many reasons. We're open-source at our core, which has helped us gain trust and adoption from the developer community.
It's easy to debug, you can self-host and PostHog is now starting to become extensible.

This year we're going to lean into that last item. We've kept plugins relatively quiet so far, but we believe plugins will be what will make PostHog the default choice for developers.

We see a ton of usecases, like integrating PostHog into an existing data warehouse, pulling in stats from other APIs and pushing data into other services.

There will be work on three main fronts:
- Building plugins ourselves
- Giving our community the tools to create their own
- Promote adoption of these plugins

# 3. Make it easy to deploy a scalable version of PostHog, free

When we started PostHog we went with Postgres as our backend. This was a great choice early on as it allowed virtually anyone to deploy PostHog on any platform. Over time, however, the limitations of using Postgres for analytics became obvious, and we spent a chunk of 2020 converting our cloud offering to use Clickhouse in the backend.

The next step is offering this super scalable version of PostHog to people who want to self host. We'll need to build tooling, metrics and monitoring to help people who need the power of Clickhouse, but want to maintain control over their data.