---
title: How to redact sensitive information before they're sent to PostHog
date: 2025-05-29
showTitle: true
author:
  - vincent-ge
tags:
  - configuration
  - data management
  - product os
---

When collecting data to better understand your customers, it's important to comply with [privacy regulations](https://posthog.com/docs/privacy). 

Sometimes, this means certain information should **never** make it to PostHog servers. This tutorial shows you how to hide or redact information on the [PostHog JavaScript Web SDK](https://posthog.com/docs/libraries/js), before they're sent to PostHog.

## Redacting information with the Web SDK
You can selectively remove properties from events before they're sent by initializing PostHog with a [`before_send`](https://posthog.com/docs/libraries/js/features#redacting-information-in-events) hook. PostHog will pass the event object to the `before_send` function, where you can redact any information.

For example, you can create a `beforeSend.js` file and define your redaction logic there.

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
  capture_pageview: 'history_change',
  before_send: beforeSend
})
```

## Hiding customer IP address

PostHog will use the client IP address found during an event capture request if an `$ip` isn't passed through `event.properties`. To hide your customer's IP address, you can override the `$ip` property with a sample address like `192.0.2.0`.

```js file=beforeSend.js
export const beforeSend = (event) => {
  if (!event) {
    return null;
  }

  event.properties['$ip'] = '';

  return event;
};
```

If you require your customers' IP addresses to be completely obfuscated from PostHog servers, consider [hosting a reverse proxy](/docs/advanced/proxy#deploying-a-reverse-proxy).

## Opting out of automatic collection
If you want more control over what events are captured, you can opt out of automatic collection completely. You can do this at two different levels:
1. Per-user opt out
2. Opt out for all users

### Per-user opt out
Start by opting out each user by default when you initialize PostHog.
```js
posthog.init('phc_5xbNHn6pKYcPD2qpmtoJIET2qhoNLObyPsrO8evJQ7w', {
    opt_out_capturing_by_default: true,
});
```

Then, you can prompt users to opt in or opt out:
```js
// opt out
posthog.opt_out_capturing()
// opt in
posthog.opt_in_capturing()
```

Before capturing events manually, you can check if the user has opted out like this:

```js
posthog.has_opted_out_capturing()
```

### Opt out for all users
To opt out of automatic collection entirely, you can navigate to your PostHog dashboard > **Settings** > **Project** > [**Autocapture & heatmaps**](https://us.posthog.com/settings/project-autocapture#autocapture) and toggle to disable different types of auto-capturing. 

## More privacy controls
PostHog offers a wide range of controls to limit data collection at different levels.

You can use [the Property Filter transformation](/tutorials/property-filter) to filter out captured event properties **before ingestion**. This means the full events will still reach PostHog, but the filtered properties will not be stored

You can also disable capturing for specific UI elements for [Product analytics](https://posthog.com/docs/product-analytics/privacy) and [Session replay](https://posthog.com/docs/session-replay/privacy).

## Further reading
- [Product analytics privacy controls](https://posthog.com/docs/product-analytics/privacy)
- [Session replay privacy controls](https://posthog.com/docs/session-replay/privacy)
- [Privacy compliance](https://posthog.com/docs/privacy)
- [Property Filter app](/tutorials/property-filter)