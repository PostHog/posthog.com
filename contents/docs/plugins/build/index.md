---
title: Overview
sidebar: Docs
showTitle: true
---

PostHog makes it possible to build your own [plugins](/docs/plugins/overview) and integrate with other platforms. So, if [our integration library](/integrations) is missing something you need then you may still be able to create it yourself.

Plugins can add more information to the event, modify existing properties or trigger a range of other activities. There are also some plugins that enqueue jobs to run in the future. Find out more about jobs in [our developer reference docs](/docs/plugins/build/reference#jobs-1).

Before building your first plugin it's important to understand how data flows through plugins in the first place. There are three critical concepts to remember:

1. Plugins act on _single events_ coming in to PostHog.

2. Plugins act on events _before_ they are stored.

3. The output of one plugin will go into the next plugin, creating a chain.

Before we get started, lets look at an examples of these principles in action. 

## Example of a plugin chain

The [GeoIP plugin](/integrations/geoip) is an example of a plugin which adds information to events. Specifically, it adds geographical information based on the user IP address. As above, it is triggered on each single event and adds additional informational to each event before it is stored.

By running a second plugin after the GeoIP plugin, we create a plugin chain. Here's an example of how this can look for an individual event when a second plugin (which simply adds ```Hello: "world"``` to the event) runs after the GeoIP plugin. 

![GeoIP Plugin Example](../../../images/plugins/geoip-plugin-example.png)

Plugin chains are important because they control what the event looks like before it is stored. If you want to remove certain properties out of an event with the [Property Filter plugin](/integrations/property-filter), for example, it is best to have it run at the end of the plugin chain. 

## Example of a plugin integrating with an external system

The GeoIP plugin is an example of a plugin which modifies an event as it is ingested, but plugins _don't_ have to modify events at all. They can do all sorts of other things, such as integrating with other systems.

For example, a plugin can send an event to AWS S3 whenever an event is seen in PostHog. Indeed, the [S3 plugin](https://posthog.com/plugins/s3-export) does exactly that. In this case, it doesn't matter if the S3 export succeeds or not, the event will always be stored.

Here's how this can look:

![S3 Plugin Example](../../../images/plugins/s3-plugin-example.png)

As before, it is important to bear in mind how plugin chains work. If you wanted the event stored on S3 to contain GeoIP information, for example, then the GeoIP plugin must run _before_ the S3 plugin. 

## Building your own plugin

Now, how do you make all of this happen? Each plugin has two files: `index.js` and `plugin.json`. The index file has code for the entire plugin, and the JSON file has configuration for user inputs. This config is what you see in PostHog:

![Plugin Configuration Example](../../../images/plugins/plugin-config.png)

We have some special function names which enable you to process an event, like in the GeoIP plugin, or to do something else entirely, like in the S3 export plugin. We expect `index.js` to export these special functions.

Two notable functions to be aware of are `processEvent` and `onEvent`. Both of these take in a single event and the meta object. You can find out more about meta objects [in our developer reference docs](/docs/plugins/build/reference#pluginmeta), but one key property is `meta.config`. This property enables your code to read the configuration values set by users via `plugin.json`.

If you want to add new properties to your event, like the GeoIP plugin does, use the `processEvent` function. Here's an example plugin that adds the `hello` property to events.

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

Note how you need to return the event to ensure the chain continues. If you return `null` or `undefined`, you're telling PostHog to discard this event. For example, the [Schema enforcer plugin](https://github.com/PostHog/posthog-schema-enforcer-plugin) does precisely this for events that don't adhere to a schema.

To do something elese, like exporting to S3, use the `onEvent` function. For example, the below plugin logs the current URL on $pageview type events:

```js
/* Runs on every event */
export function onEvent(event, meta) {

    if (event.event === "$pageview") {
        // these logs appear in the UI
        console.log(event.$current_url)
    }

    // Don't need to return event, any return value is discarded, and the event is not modified
}
```

This plugin is admittedly useless since PostHog can already show you this information, but it serves to explain how things work. Note how you can choose what kind of events you want to operate on by using the existing event properties.

## Next steps

That's all for the crash course. There's a lot you can do with plugins, such as running specific jobs every hour, sending events elsewhere via HTTP endpoints or modifying events before they're stored. Here are some additional resources to help you get started in building your own plugin for PostHog:

1. For in-depth information on all the special functions, check out [the developer reference docs](/docs/plugins/build/reference).
2. For building your own plugin from start to finish, check out [our tutorial](/docs/plugins/build/tutorial).
3. To ask questions or collaborate with others in the community, join [the #Contributing channel in our community Slack group](/slack).