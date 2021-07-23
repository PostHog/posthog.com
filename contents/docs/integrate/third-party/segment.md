---
title: Segment Integration
sidebarTitle: Segment
sidebar: Docs
showTitle: true
---

Segment allows you to easily manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

#### Can PostHog with Segment do everything PostHog does by itself?

We are **big fans** of Segment, and many in our team use it now or have used it in the past. However, it comes with some limitations for PostHog. 

The PostHog integration with Segment gives you access to everything our [JS Library](/docs/integrate/client/js) can do, with the exception of autocapture. All features for your PostHog instance will be the same, but all Segment sends to PostHog are events you **manually** send. In addition, PostHog isn't able to show you our [toolbar](/docs/user-guides/toolbar). 

Lastly, Segment is also more easily blocked by ad-blockers. To get around these limitations, you can install the [PostHog snippet](/docs/integrate/client/js) alongside your Segment integration.

## Getting Started with Segment

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) **and** a PostHog account, either [self-hosted](/docs/deployment) or using [PostHog Cloud](https://app.posthog.com/signup).

1. In the Segment workspace, create a new project and enable PostHog as an integration. We are listed as a 'Destination' on Segment.
2. Grab the PostHog API key from the 'Project Settings' page in PostHog.
3. Use one of Segment's libraries to send events.
4. See the events coming into PostHog


