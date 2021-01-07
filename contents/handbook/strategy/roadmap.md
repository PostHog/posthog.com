---
title: Roadmap
sidebar: Handbook
showTitle: true
---

Our mission is to increase the number of successful products in the world. 

Our roadmap for 2021 will do three things:
1. Create a solid core product that's easy to use
2. Ensure the best developer platform for event-based analytics
3. Set PostHog up to service huge volumes

# 1. Core product

PostHog is a product that people love, primarily because it covers 90% of analytics use cases but bundled into one package.
Some examples of the functionality we've built last year:

- Product analytics
- Session recording
- Feature flags
- Heatmaps
- Autocapture

There's plenty of work to be done within those categories to make a product that is especially useful for engineers and other product minded people. To add on to that, this year we want to build:

- A/B testing
- User feedback
- Data pipelines

On top of those new categories we have a lot of work to do to make our product more stable at higher volumes (especially when self-deploying), much easier to get started with and to catch up with other state-of-the-art analytics software.

# 2. Best developer platform

Developers like using PostHog for many reasons. We're open-source at our core, which has helped a huge amount in gaining trust and adoption from the developer community.
It's easy to debug, you can self-host and PostHog is now starting to become extensible.

This year we're going to lean into that last item. We've kept plugins relatively quiet so far, but we believe plugins will be what will make PostHog the default choice for developers.

We see a ton of usecases, like integrating PostHog into an existing data warehouse, pulling in stats from other APIs and pushing data into other services.

There will be work on three main fronts:
- Building plugins ourselves
- Giving our community the tools to create their own
- Promote adoption of these plugins.

# 3. Service huge volumes

We are getting a lot of inbound interest from enterprise customers who want to either have us host PostHog or want to host it themselves.
We are starting to have experience scaling instances, but we'll need to get a lot better at this to service the biggest customers.
This isn't just about one-off scaling challenges. To do this at scale, we'll need to productize the deployment of a large instance of PostHog.
