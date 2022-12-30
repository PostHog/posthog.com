---
title: RudderStack Integration
sidebarTitle: RudderStack
sidebar: Docs
showTitle: true
---

RudderStack is an open-source, customer data platform for developers. It allows you to collect and deliver customer event data to a variety of destinations across your growth, product, and marketing stack.

> Before integrating with Rudderstack, we recommend you read our [CDP integration guide](/docs/integrate/cdp) to understand the different options for integrating with PostHog.

## Setting up Rudderstack

Make sure you have a Rudderstack account **and** a PostHog account, using [PostHog Cloud](https://app.posthog.com/signup) or self-hosting.

1. From your RudderStack dashboard, add a source and select PostHog from the list of destinations.
2. Assign a name to your destination (e.g. PostHog production) and click Continue.
3. Add your PostHog 'Project API Key' as the Team API key (**Do not use a Personal API key**) and your host url as `Your-Instance` (`https://app.posthog.com` if you're on PostHog Cloud):
    ![RudderStack Dashboard](../../../images/rs-posthog-config.png)
4. (Recommended) If you are setting up PostHog for your website or web app, configure `Use device-mode to send events` to `true`.

For more information see the [Rudderstack guide for setting up PostHog](https://www.rudderstack.com/docs/destinations/streaming-destinations/posthog/setting-up-posthog/)

## Sending events to PostHog

Once you have set up Rudderstack and PostHog, you can use Rudderstack to send events to PostHog. You send events through the Rudderstack API, or one of the Rudderstack libraries. For example, with javascript you can use the `analytics.track('Event Name')` function which will send the events to your Rudderstack destinations including PostHog.

For the full list of functions see the relevant SDK docs e.g. the [Javascript SDK](https://www.rudderstack.com/docs/sources/event-streams/sdks/rudderstack-javascript-sdk/supported-api/#track).

### Using group analytics

If you want to use group analytics, each event should include the property `$groups` as an key-value object of group type and ID like `{ "company": "42dlsfj23f" }` where `42dlsfj23f` is the id of the group.
