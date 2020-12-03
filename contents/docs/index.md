---
title: PostHog Documentation
sidebar: Docs
showTitle: true
---

<br>

These Docs explain how to deploy, use, and contribute to PostHog.

## Philosophy

PostHog is a product analytics platform built for the modern enterprise, with the differentiators of being open source and having a broader view of the tools needed to make a product successful. 

As a result, PostHog can be deployed on your own infrastructure and provides a [large set of tools](/product-features) to help improve your product, such as session recording, heatmaps, and feature flags, which are unique to us in the product analytics space.

## Documentation Structure

### Deployment

We provide over 10 options for deploying PostHog if you are not using [PostHog Cloud](app.posthog.com).

**Do you want to self-host PostHog?**

Check out our [Deployment page](/docs/deployment).

**Want to get up and running immediately?** 

Use our one-click [Heroku deployment](/docs/deployment/deploy-heroku):

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/posthog/posthog)

**Looking for instructions on using our snippet?**

Check out [Snippet Installation](/docs/deployment/snippet-installation).

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
- [Running Surveys with No Backend ⏱️](/docs/tutorials/1-minute/survey)

**Integrating PostHog with Other Tools**

- [Integrate PostHog with Shopify ⏱️](/docs/tutorials/1-minute/integrate-with-shopify) 
- [Integrate PostHog with Metabase ⏱️](/docs/tutorials/1-minute/integrate-with-metabase) 
- [Integrate PostHog with Google Tag Manager ⏱️](/docs/tutorials/1-minute/integrate-with-gtm) 

> The ⏱️ emoji denotes tutorials in our '1 Minute Tutorials' section


### Configuring PostHog

[Configuring PostHog](/docs/configuring-posthog) has all the information you need about configuring your PostHog instance, including info on [scalability](/docs/configuring-posthog/scaling-posthog), [security](/docs/configuring-posthog/securing-posthog), and [upgrade methods](/docs/configuring-posthog/upgrading-posthog).

### Integrations

[Integrations](/docs/integrations) holds the Docs for all available PostHog libraries, including those maintained by our core team and the community.

We have PostHog libraries written in all major programming languages, as well as integrations available with services like [Segment](/docs/integrations/segment-integration), [Slack](/docs/integrations/slack), and [Sentry](/docs/integrations/sentry-integration).

### API

If you have a niche use-case and our integrations are not sufficient for you, you are welcome to use our [API](/docs/api/overview).

### Plugins

[Plugins](/docs/plugins/overview) are a beta feature that lets you extend PostHog's functionality, allowing you to enrich your event data, send events to other services, as well as prevent event ingestion.  

If there's something you need in PostHog that we haven't built yet, you can [request it on GitHub](https://github.com/PostHog/posthog/issues/new?labels=enhancement&template=feature_request.md), or [build a plugin for it yourself](/docs/plugins/build).

### Contributing to PostHog

We love contributions to PostHog, big or small.

Check out our [Contributing Docs](/docs/contributing) for information on how to contribute, as well as info about how to [run a local environment](/docs/developing-locally), what our [stack](/docs/stack) is, and how the [project is structured](/docs/project-structure).

### Platform Structure

[Platform Structure](/docs/application-settings) hosts information on configuration valid for both cloud and self-hosted instances.