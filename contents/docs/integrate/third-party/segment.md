---
title: Segment Integration
sidebarTitle: Segment
sidebar: Docs
showTitle: true
---

Segment allows you to easily manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

## Simple Segment setup (minimal feature support)

The standard Segment analytics supports simple **tracking of pageviews**, **custom events** and **identifying users**.

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) **and** a PostHog account, either [self-hosted](/docs/deployment) or using [PostHog Cloud](https://app.posthog.com/signup).

1. In the Segment workspace, create a new project and enable PostHog as an integration. We are listed as a 'Destination' on Segment.
2. Grab the PostHog API key from the 'Project Settings' page in PostHog.
3. Use one of Segment's libraries to send events.
4. See the events coming into PostHog


### Full Segment setup (all features supported)

As Segment does not load any of our custom Javascript, it has limitations and by default cannot support other features of PostHog such as **autocapture**, **Session Recording**, **Feature Flags**, **heatmaps** or the **toolbar**. Segment is also more easily blocked by ad-blockers.

If you would like these additional features, as well as any other functions of our [JS library](/docs/integrate/client/js), you can follow the instructions below to continue using Segment `analytics` but with additional PostHog functionality.

```js

var analytics = "<Segment analytics snippet code>"; 
analytics.load("<your-segment-key>");

analytics.ready(() => {
    posthog.init("<your-posthog-key>", {
        // Pass window.analytics here - NOTE: `window.` is important
        segment: window.analytics,
        // You want this false if you are going to use segment's `analytics.page()` for pageviews
        capture_pageview: false, 
    });
    // Make sure to send the first pageview _after_ posthog is initialised to get all the correct properties linked
    window.analytics.page();
})

```

