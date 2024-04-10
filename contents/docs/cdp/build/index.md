---
title: Build a transformation or destination
sidebar: Docs
showTitle: true
---

Transformation and destination enable you to define custom pipeline behaviors in PostHog.

**Transformations** enable you to add more information to an event or modify existing properties. They act on _single events_ coming into PostHog. The output of one goes into the next, creating a chain.

**Destinations** enable you to export data to other services. They operate at the _end of the pipeline_ in parallel with each other at the same time data is being written to ClickHouse.

## Example of an transformation chain

The [GeoIP Enricher](/cdp/geoip-enrichment) is an example of a transformation which adds information to events. Specifically, it adds geographical information based on the user IP address. It is triggered on each single event and adds additional informational to each event before it is stored.

By running a second transformation after the GeoIP transformation, we create a chain. Here's an example of how this can look for an individual event when a second transformation (which simply adds ```Hello: "world"``` to the event) runs after the GeoIP Enricher. 

![GeoIP Enricher Example](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/plugins/geoip-plugin-example.png)

Pipeline chains are important because they control what the event looks like before it is stored. If you want to remove certain properties out of an event with the [Property Filter transformation](/cdp/property-filter), for example, it is best to have it run at the end of the pipeline chain so that all unwanted properties can be filtered out before storage.  

## Building your own transformation or destination

Now, how do you make all of this happen? Each transformation or destination has two files: `index.js` and `plugin.json`. The index file has the functional code and the JSON file has configuration for user inputs. This config is what you see in PostHog:

![Transformation configuration example](https://res.cloudinary.com/dmukukwp6/image/upload/v1712101712/posthog.com/contents/images/docs/cdp/app-config.png)

We have some special function names which enable you to process an event, like in the GeoIP Enricher. We expect `index.js` to export these special functions.

Two notable functions to be aware of are `processEvent` (transformation) and `composeWebhook` (destination). Both take in a single event and the meta object. You can find out more about meta objects [in our developer reference docs](/docs/cdp/build/reference#pluginmeta), but one key property is `meta.config`. This property enables your code to read the configuration values set by users via `plugin.json`.

If you want to add new properties to your event, like the GeoIP Enricher does, use the `processEvent` function. Here's an example transformation that adds the `hello` property to events.

```js
/* Runs on every event */
export function processEvent(event, meta) {
    // Some events (like $identify) don't have properties
    if (event.properties) {
        event.properties['hello'] = `Hello ${meta.config.name || 'world'}`
    }
    // Return the event to ingest, return nothing to discard  
    return event
}
```

> **Note:** If you return `null` or `undefined`, you're telling PostHog to discard this event. For example, the [schema enforcer transformation](https://github.com/PostHog/posthog-schema-enforcer-plugin) does precisely this for events that don't adhere to a schema.

To submit data to your own HTTP endpoint as a destination, use the `composeWebhook` function:

```js
/* Runs on every event */
function composeWebhook(event) {
    if (event.event == '$autocapture') {
        return null
    }
    return {
        url: "http://pineapples-make-pizzas-delicious.com",
        body: JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }

    // Don't need to return event, any return value is discarded, and the event is not modified
}
```

> **Tip**: You can choose what kind of events you want to operate on by using the existing event properties.

## Next steps

That's all for the crash course. There's a lot you can do with transformation, such as modifying events before they're stored, and destinations such as sending events elsewhere via webhooks. Here are some additional resources to help you get started in building your own for PostHog:

1. For in-depth information on all the special functions, check out [the developer reference docs](/docs/cdp/build/reference).

2. For building your own from start to finish (including publishing to PostHog Cloud), check out [our tutorial](/docs/cdp/build/tutorial).

3. To ask questions or collaborate with others in the community, join [our community page](/questions).
