---
title: Segment Integration
sidebarTitle: Segment
sidebar: Docs
showTitle: true
---

Segment is a Customer Data Platform (CDP) that allows you to easily manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

> Before integrating with Segment, we recommend you read our [CDP integration guide](/docs/integrate/cdp) to understand the different options for integrating with PostHog.

## Setting up Segment

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) **and** a PostHog account, using [PostHog Cloud](https://app.posthog.com/signup) or self-hosting.

1. For integrating PostHog with the websites and web apps that use Segment, follow [Setting up Segment with your website](#setting-up-segment-with-your-website-all-features-supported)
2. For all other sources, follow the instructions for [Adding PostHog as a simple Segment destination](#adding-posthog-as-a-simple-segment-destination-minimal-feature-support)

### Setting up Segment with your website (all features supported)

In order to use the full feature set of PostHog (**autocapture**, **session recording**, **feature flags**, **heatmaps** or the **toolbar**) we need to load our own Javascript snippet directly.

1. In addition to Segment, install your [PostHog JS snippet](/docs/integrate/client/js#installation)
2. Modify the initialization as documented below to pass the segment `analytics` through for PostHog JS to sync with:

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

Note: It's possible to use PostHog as a simple Segment destination as mentioned below for your website, but you will lose out on the full feature set of PostHog.

### Adding PostHog as a simple Segment destination (minimal feature support)

The standard Segment analytics only supports simple tracking of **pageviews**, **custom events** and **identifying users**. As such, we only recommend this method for basic tracking of non-client javascript events e.g. sending your server-side events to PostHog.

1. In the Segment workspace, create a new project and enable PostHog as an integration. We are listed as a 'Destination' on Segment
2. Grab the PostHog API key from the 'Project Settings' page in PostHog
3. Use one of Segment's libraries to send events
4. See the events coming into PostHog

## Bonus: Group analytics

If you want to use group analytics, each event should include the property `$groups` as an key-value object of group type and ID like `{ "company": "42dlsfj23f" }` where `42dlsfj23f` is the id of the group.