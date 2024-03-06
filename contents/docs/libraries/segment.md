---
title: Segment
icon: ../../images/docs/integrate/frameworks/segment.svg
---

Segment is a Customer Data Platform (CDP) that allows you to easily manage data and integrations with services across your growth, product, and marketing stack. 

By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

> Before integrating with Segment, we recommend you read our [CDP integration guide](/docs/integrate/cdp) to understand the different options for integrating with PostHog.

## Setting up Segment

Make sure you have a [Segment account](https://segment.com/docs/#getting-started) **and** a PostHog account, using [PostHog Cloud](https://us.posthog.com/signup) or a self-hosted instance running [version 1.30.0](/blog/the-posthog-array-1-30-0) or later.

1. In the Segment workspace, create a new project and enable PostHog as an integration. We are listed as a [destination on Segment](https://segment.com/docs/connections/destinations/catalog/posthog/).
2. Grab the PostHog API key from [your project settings](https://us.posthog.com/settings/project).
3. Use one of Segment's libraries to send events.
4. See the events coming into PostHog.

### Enabling all features via Segment with your website

The simple Segment destination only supports tracking of **pageviews**, **custom events** and **identifying users**.

In order to use the full feature set of PostHog (**autocapture**, **session recording**, **feature flags**, **heatmaps**, **surveys** or the **toolbar**) we need to load our own Javascript snippet directly.

1. In addition to Segment, install your [PostHog JS snippet](/docs/integrate/client/js#installation)
2. Modify the initialization as documented below to pass the segment `analytics` through for PostHog JS to sync with:

    ```js
    // Load PostHog JS
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

    // Segment script
    var analytics = "<Segment analytics snippet code>"; 
    analytics.load("<your-segment-key>");

    analytics.ready(() => {
        window.posthog.init("<your-posthog-key>", {
            api_host: '<ph_client_api_host>', // Use eu.i.posthog.com for EU instances
            segment: window.analytics, // Pass window.analytics here - NOTE: `window.` is important
            capture_pageview: false, // You want this false if you are going to use segment's `analytics.page()` for pageviews
            // When the posthog library has loaded, call `analytics.page()` explicitly.
            loaded: () => window.analytics.page(),
        });
    })
    ```


## Sending events to PostHog

Once you have set up Segment and the destination properly configured, can use it to send events to PostHog. You can do this through the Segment API, or one of the Segment libraries. For example, with javascript you can use the `analytics.track('Event Name')` function to send events to Segment, which will then be sent to PostHog.

For the full list of functions see the relevant SDK docs e.g. the [Javascript SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/).

### Using group analytics

If you want to use group analytics, each event should include the property `$groups` as an key-value object of group type and ID like `{ "company": "company_id_in_your_db" }`

## FAQ

### Where can I find out more?

Further information is available in [Segment's integration catalog](https://segment.com/catalog/integrations/posthog/).

### Who maintains this app?

This app is maintained by Segment. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 