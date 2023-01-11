---
title: Segment Integration
sidebarTitle: Segment
sidebar: Docs
showTitle: true
---

Segment is a Customer Data Platform (CDP) that allows you to easily manage data and integrations with services across your growth, product, and marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

> Before integrating with Segment, we recommend you read our [CDP integration guide](/docs/integrate/cdp) to understand the different options for integrating with PostHog.

## Setting up Segment

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) **and** a PostHog account, using [PostHog Cloud](https://app.posthog.com/signup) or self-hosting.

1. For each source that you want to send data to PostHog:
2. If it's a website or web app - follow [Setting up Segment with your website](#setting-up-segment-with-your-website-all-features-supported)
3. For all other sources, follow the instructions for [Adding PostHog as a simple Segment destination](#adding-posthog-as-a-simple-segment-destination-minimal-feature-support)

### Setting up Segment with your website (all features supported)

In order to use the full feature set of PostHog (**autocapture**, **session recording**, **feature flags**, **heatmaps** or the **toolbar**) we need to load our own Javascript snippet directly.

1. In addition to Segment, install your [PostHog JS snippet](/docs/integrate/client/js#installation)
2. Modify the initialization as documented below to pass the segment `analytics` through for PostHog JS to sync with:

    ```js
    // Load PostHog JS
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

    // Segment script
    var analytics = "<Segment analytics snippet code>"; 
    analytics.load("<your-segment-key>");

    analytics.ready(() => {
        window.posthog.init("<your-posthog-key>", {
            host: 'https://app.posthog.com', // Use eu.posthog.com for EU instances
            segment: window.analytics, // Pass window.analytics here - NOTE: `window.` is important
            capture_pageview: false, // You want this false if you are going to use segment's `analytics.page()` for pageviews
        });
        // Make sure to send the first pageview _after_ posthog is initialised to get all the correct properties linked
        window.analytics.page();
    })
    ```

Note: It's possible to use PostHog as a simple Segment destination as mentioned below for your website, but you will lose out on the full feature set of PostHog.

### Adding PostHog as a simple Segment destination (minimal feature support)

The simple Segment destination only supports tracking of **pageviews**, **custom events** and **identifying users** - it does not support **autocapture**, **session recording**, **feature flags**, **heatmaps** or the **toolbar**. As such, we only recommend this method for basic tracking of events that are not using the client sidce javascript library e.g. sending your server-side events to PostHog.

1. In the Segment workspace, create a new project and enable PostHog as an integration. We are listed as a 'Destination' on Segment
2. Grab the PostHog API key from the 'Project Settings' page in PostHog
3. Use one of Segment's libraries to send events
4. See the events coming into PostHog

## Sending events to PostHog

Once you have set up Segment and the destination properly configured, can use it to send events to PostHog. You can do this through the Segment API, or one of the Segment libraries. For example, with javascript you can use the `analytics.track('Event Name')` function to send events to Segment, which will then be sent to PostHog.

For the full list of functions see the relevant SDK docs e.g. the [Javascript SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/).

### Using group analytics

If you want to use group analytics, each event should include the property `$groups` as an key-value object of group type and ID like `{ "company": "42dlsfj23f" }` where `42dlsfj23f` is the id of the group.