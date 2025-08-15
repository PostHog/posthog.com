---
title: How to redact event data before it is sent to PostHog
date: 2025-05-29
showTitle: true
author:
  - vincent-ge
tags:
  - configuration
  - data management
  - product os
---

When collecting data to better understand your customers, it's important to comply with [privacy regulations](/docs/privacy). 

Sometimes, this means certain information should **never** make it to PostHog servers. This tutorial shows you how to hide or redact information on the [PostHog JavaScript Web SDK](/docs/libraries/js), before it's sent to PostHog.

## Redacting information with the Web SDK

You can selectively remove properties from events before they're sent by initializing PostHog with a [`before_send`](/docs/libraries/js/features#redacting-information-in-events) hook. PostHog will pass the event object to the `before_send` function, where you can redact any information.

For example, you can create a `beforeSend.js` file and define your redaction logic there like this:

```js file=beforeSend.js
// beforeSend.js
// Define the properties you want to redact
const redactedProperties = ["url", "href", "pathname", "referrer", "host", "user_agent"];

// Match property names against the defined list
function filterProperties(value) {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (redactedProperties.some(prop => key.includes(prop))) {
      acc[key] = null;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
}

// Export the before send function
export const beforeSend = (event) => {
  if (!event) {
    return null;
  }

  const redactedProperties = filterProperties(event.properties || {});
  event.properties = redactedProperties;

  // $set
  const redactedSet = filterProperties(event.$set || {});
  event.$set = redactedSet;

  // $set_once
  const redactedSetOnce = filterProperties(event.$set_once || {});
  event.$set_once = redactedSetOnce;

  return event;
};
```

Then, you can initialize PostHog with your `before_send` function.

```js
import { beforeSend } from './beforeSend'

posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',  // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
  defaults: '<ph_posthog_js_defaults>', 
  before_send: beforeSend
})
```

## Hiding customer IP address

PostHog will use the client IP address found during an event capture request if an `$ip` isn't passed through `event.properties`. This means you can't simply redact the `$ip` property like other properties. Instead, enable the [**Discard client IP data**](https://us.posthog.com/settings/environment#datacapture) toggle. When this is enabled, PostHog will drop any IP information related to an event.

## More privacy controls

PostHog offers a wide range of controls to limit data collection at different levels.

You can use [the property filter transformation](/tutorials/property-filter) to filter out captured event properties **before ingestion**. This means the full events will still reach PostHog, but the filtered properties will not be stored.

You can also disable capturing for specific UI elements for [product analytics](/docs/product-analytics/privacy) and [session replay](/docs/session-replay/privacy).

## Further reading

- [Product analytics privacy controls](/docs/product-analytics/privacy)
- [Product analytics autocapture controls](/docs/product-analytics/autocapture#configuring-autocapture)
- [Session replay privacy controls](/docs/session-replay/privacy)
- [LLM observability](/docs/llm-observability/privacy-mode)
- [Privacy compliance](/docs/privacy)
- [Property Filter app](/tutorials/property-filter)