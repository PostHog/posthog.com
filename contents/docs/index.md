---
title: PostHog overview
sidebar: Docs
showTitle: true
---

PostHog is the product analytics suite you can self-host. With our open source platform, customer data never has to leave your infrastructure.

We believe the era of third-party product analytics software will eventually come to end, and that there should be an alternative to sending your customers' personal information and usage data to third parties. PostHog gives you full control over all the data from your users, while allowing you to do powerful analytics.

Without a self-hosted solution like PostHog, companies who cannot send their data to third-party tracking services for cost or privacy reasons often end up with a complex data pipeline into a data warehouse, with an analytics platform on top. Data analysts end up being the only people who understand it.

PostHog solves that. We let every person in the company have easy access to product analytics that they can understand and use independently, even at a massive scale, all without sending data to third parties.

## What can I use PostHog for?

PostHog providers everything product-led teams need in one place, including:

- Product Analytics
- Session Recording
- Feature Flags
- Heatmaps
- Multivariate A/B tests
- Event pipelines
- Export to data warehouse

Using these products independently across different providers means sending data to multiple third parties that don't talk to each other. With PostHog, you can keep all your product insights on one platform - and we never need to see your users' data. 

## How to use these Docs

### Deploy PostHog

There are 2 ways of using PostHog:

* [PostHog Cloud](/docs/cloud) - get started immediately, we host and manage everything for you
* [Self-host](/docs/self-host) - user data stays on your infrastructure, you host and manage your own instance

### Integrate PostHog

You can capture events and send data to PostHog in 3 different ways:

**Snippet**

Using our [HTML snippet](/docs/integrate/client/snippet-installation) is the quickest way to get started if you're using PostHog to track a website. You can also start trying PostHog with no code using [our bookmarklet](/docs/integrate/client/snippet-installation#get-started-with-no-code).

**Integrations**

We have PostHog libraries written in all major programming languages, as well as integrations available with services like [Segment](/docs/integrate/third-party/segment), [Slack](/docs/integrate/webhooks/slack), and [Sentry](/docs/integrate/third-party/sentry).

**API**

You can use our [API](/docs/api/overview) to get data in and out of PostHog, making it suitable for any use case you have that is not met by our integrations. 

### Tutorials

Check out our [tutorials](/docs/tutorials) which cover a wide range of the most popular use cases, including: 

- [Analyzing your conversion with funnels](/docs/tutorials/funnels)
- [Analyzing user behavior with cohorts](/docs/tutorials/cohorts)
- [Visualizing user behavior with the PostHog toolbar](/docs/tutorials/toolbar)
- [Measuring retention and tracking churn](/docs/tutorials/retention)

Our [manuals](/docs/user-guides) also provide a complete reference guide to each PostHog feature if you want to go deeper. 

### Plugins

[Plugins](/docs/plugins/overview) extend PostHog's functionality even further, allowing you to enrich your event data, send events to other services, and prevent event ingestion.  

If there's something you need in PostHog that we haven't built yet, you can [request it on GitHub](https://github.com/PostHog/posthog/issues/new?labels=enhancement&template=feature_request.md), or [build a plugin for it yourself](/docs/plugins/build).

### Contributing to PostHog

We love all contributions to PostHog, big and small! Check out our [contributing docs](/docs/contributing) for more info on how to get involved. 
