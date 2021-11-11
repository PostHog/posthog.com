---
title: Segment Integration
sidebarTitle: Segment
sidebar: Docs
showTitle: true
---

Segment allows you to easily manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

#### Can PostHog with Segment do everything PostHog does by itself?

We are _big fans_ of Segment, and many in our team use it now or have used it in the past. However, it comes with some limitations for PostHog. 

The PostHog integration with Segment gives you access to some things our [JS library](/docs/integrate/client/js) can do, but using Segment alone means you can't have autocapture, feature flags, session recordings, heatmaps or the toolbar. Segment is also more easily blocked by ad-blockers.

To get around these limitations, you can install the [PostHog snippet or posthog-js](/docs/integrate/client/js) alongside your Segment integration. You would then use Segment for any custom events (for example `segment.track('user sign up')`), and posthog-js will add on 

## Getting started with Segment

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) **and** a PostHog account, either [self-hosted](/docs/deployment) or using [PostHog Cloud](https://app.posthog.com/signup).

1. In the Segment workspace, create a new project and enable PostHog as an integration. We are listed as a 'Destination' on Segment.
2. Grab the PostHog API key from the 'Project Settings' page in PostHog.
3. Use one of Segment's libraries to send events.
4. See the events coming into PostHog


