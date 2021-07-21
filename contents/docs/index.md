---
title: PostHog Documentation
sidebar: Docs
showTitle: true
---

These Docs explain how to deploy, use, and contribute to PostHog.

## Philosophy

We believe the era of third-party product analytics software will eventually come to end.

In our view, third-party analytics doesn't work anymore in a world of Cookie Laws, GDPR, CCPA, and many other four-letter acronyms. There should be an alternative to sending all of your customers' personal information and usage data to third-parties like Google.

PostHog gives you full control over all the data from your users, while allowing you to do powerful analytics.

We have seen multiple larger companies who cannot send their data to third-party tracking services for cost or privacy reasons. As a result, they end up with a complex data pipeline into a data lake with an analytics platform on top. Data analysts end up being the only people who understand it.

PostHog solves that. We let every person in the company have easy access to product analytics that they can understand and use independently, even at a massive scale, all without sending data to third-parties.

## Documentation Structure

### Deployment

There are 2 ways of using PostHog:

* PostHog Cloud
* Self-Hosted

**Do you want to get started quickly without having to deploy PostHog yourself?**

Start using [PostHog Cloud for free](https://app.posthog.com).

**Do you want to self-host PostHog?**

Check out our [Deployment page](/docs/self-host/overview#deploy).

### Capturing Events with PostHog

You can capture events and send data to PostHog in 3 different ways:

**Snippet**

Using our [HTML snippet](/docs/integrate/client/snippet-installation) is the quickest way to get started if you're using PostHog to track a website. 

You can also start trying PostHog with no code using [our bookmarklet](/docs/integrate/client/snippet-installation#get-started-with-no-code).

**Integrations**

We provide [15+ libraries](/docs/integrate/overview) for various popular programming languages and tools that you can use to send data to PostHog. 

**API**

You can use our [API](/docs/api/overview) to get data in and out of PostHog, making it suitable for any use case you have that is not met by our integrations. 

### Tutorials

Our [tutorials](/docs/tutorials) can help you learn how to use PostHog's many features with in-depth walkthroughs. 

**Doing Analytics with PostHog**

- [How to Safely Roll Out New Features](/docs/tutorials/feature-flags)
- [Visualizing User Behavior with the PostHog Toolbar](/docs/tutorials/toolbar)
- [Analyzing Your Conversion with Funnels](/docs/tutorials/funnels)
- [Analyzing User Behavior with Cohorts](/docs/tutorials/cohorts)
- [Measuring Retention and Tracking Churn](/docs/tutorials/retention)
- [Tracking Single Page Apps](/docs/tutorials/spa)
- [Complete Guide to Event Tracking](/docs/tutorials/actions)
- [Tracking Key B2B Product Metrics](/docs/tutorials/b2b)
- [Sales and Revenue Tracking](/docs/tutorials/revenue)
- [Running Surveys with No Backend](/docs/tutorials/survey)

**Integrating PostHog with Other Tools**

- [Integrate PostHog with Shopify](/docs/integrate/third-party/shopify) 
- [Integrate PostHog with Metabase](/docs/integrate/third-party/metabase) 
- [Integrate PostHog with Google Tag Manager](/docs/integrate/third-party/google-tag-manager) 

### Integrations

[Integrations](/docs/integrate/overview) holds the Docs for all available PostHog libraries, including those maintained by our core team and the community.

We have PostHog libraries written in all major programming languages, as well as integrations available with services like [Segment](/docs/integrate/third-party/segment), [Slack](/docs/integrate/webhooks/slack), and [Sentry](/docs/integrate/third-party/sentry).

### Plugins

[Plugins](/docs/plugins/overview) are a Beta feature that lets you extend PostHog's functionality, allowing you to enrich your event data, send events to other services, as well as prevent event ingestion.  

If there's something you need in PostHog that we haven't built yet, you can [request it on GitHub](https://github.com/PostHog/posthog/issues/new?labels=enhancement&template=feature_request.md), or [build a plugin for it yourself](/docs/plugins/build).

### Contributing to PostHog

We love all contributions to PostHog, big or small.

Check out our [Contributing Docs](/docs/contributing) for information on how to contribute, as well as info about how to [run a local environment](/docs/contribute/developing-locally), what our [stack](/docs/contribute/stack) is, and how the [project is structured](/docs/contribute/project-structure).

### Platform Structure

[Platform Structure](/docs/user-guides/application-settings) hosts information on configuration valid for both cloud and self-hosted instances.
