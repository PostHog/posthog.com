---
title: Build Your Own
sidebar: Docs
showTitle: true
---
<br>

> **Note:** It's worth familiarizing yourself with the [architecture of PostHog plugins](/docs/plugins/architecture) before building your own. 

## Pre-Requisites

1. A self-hosted PostHog instance (or a local development environment)
1. Knowledge of JavaScript (or TypeScript)

## Main Components

A PostHog plugin is composed of 3 main parts:

### plugin.json file

A `plugin.json` file is structured as follows:

```json
{
  "name": "<plugin_name>",
  "url": "<repo_url>",
  "description": "<description>",
  "main": "<entry_point>",
  "config": {
    "param1": {
      "name": "<param1_name>",
      "type": "<param1_type>",
      "default": "<param1_default_value>",
      "required": <is_param1_required>
    },
    "param2": {
      "name": "<param2_name>",
      "type": "<param2_type>",
      "default": "<param2_default_value>",
      "required": <is_param2_required>
    },
  }
}
```

Here's an example `plugin.json` file from our ['Hello World Plugin'](https://github.com/PostHog/helloworldplugin):

```json
{
  "name": "helloworldplugin",
  "url": "https://github.com/PostHog/helloworldplugin",
  "description": "Greet the World and Foo a Bar, JS edition!",
  "main": "index.js",
  "config": {
    "bar": {
      "name": "What's in the bar?",
      "type": "string",
      "default": "baz",
      "required": false
    }
  }
}
```

Most options in this file are self-explanatory, but there are a few worth exploring further:

#### main

`main` determines the entry point for your plugin, where your `setupPlugin` and `processEvent` functions are. More on these later.

#### type (config -> param -> type)

The type of a parameter in the config can be either `string` or `attachment`. If the type is set to `attachment`, PostHog will prompt the user for a file upload during the configuration step.

### PluginMeta

> Check out [Plugin Types](/docs/plugins/types) for a full spec of types for plugin authors.

**Every plugin server function** is called by the plugin server with an object of type `PluginMeta` that will always contain the object `cache`, and can also include `global`, `attachments`, and `config`, which you can use in your logic. 

Here's what they do:

#### config

Gives you access to the plugin config values as described in `plugin.json` and configured via the PostHog interface.

#### cache

A way to store values that persist across `processEvent` calls. The values are stored in [Redis](https://redis.io/), an in-memory store.

The `cache` type is defined as follows:

```js
interface CacheExtension {
    set: (key: string, value: unknown, ttlSeconds?: number) => Promise<void>
    get: (key: string, defaultValue: unknown) => Promise<unknown>
    incr: (key: string) => Promise<number>
    expire: (key: string, ttlSeconds: number) => Promise<boolean>
}
```

Storing values is done via `cache.set`, which takes a key and a value, as well as an optional value in seconds after which the key will expire.

Retrieving values uses `cache.get`, which takes the key of the value to be retrieved, as well as a default value in case the key does not exist.

You can also use `cache.incr` to increment numerical values by 1, and `cache.expire` to make [keys volatile](https://redis.io/commands/expire), meaning they will expire after the specified number of seconds.


#### global

Global is used for sharing functionality between `setupPlugin` and `processEvent` or `processEventBatch`, since global scope does not work in the context of PostHog plugins. 

#### attachments

Attachments gives access to files uploaded by the user for config parameters of type `attachment`. An `attachment` has the following type definition:

```js
interface PluginAttachment {
    content_type: string
    file_name: string
    contents: any
}
```

As such, accessing the contents of an uploaded file can be done with `attachments.attachmentName.contents`.


### setupPlugin function

`setupPlugin` is a function you can use to dynamically set plugin configuration based on the user's inputs at the configuration step. 

You could, for example, check if an API Key inputted by the user is valid and throw an error if it isn't, prompting PostHog to ask for a new key.

It takes only an object of type `PluginMeta` as a parameter and does not return anything.

Example (from the [PostHog MaxMind Plugin](https://github.com/PostHog/posthog-maxmind-plugin)):

```js
export function setupPlugin({ attachments, global }) {
    if (attachments.maxmindMmdb) {
        global.ipLookup = new Reader(attachments.maxmindMmdb.contents)
    }
}
```

### processEvent function

`processEvent` is the juice of your plugin. 

In essence, it takes an event as a parameter and returns an event as a result. In the process, this event can be:

- Modified
- Sent somewhere else
- Not returned (preventing ingestion)

It takes an event and an object of type `PluginMeta` as parameters and returns an event.

Here's an example (from the ['Hello World Plugin'](https://github.com/PostHog/helloworldplugin)):

```js
async function processEvent(event, { config, cache }) {
    const counter = await cache.get('counter', 0)
    cache.set('counter', counter + 1)

    if (event.properties) {
        event.properties['hello'] = 'world'
        event.properties['bar'] = config.bar
        event.properties['$counter'] = counter
    }

    return event
}
```

As you can see, the function receives the event before it is ingested by PostHog, adds properties to it (or modifies them), and returns the enriched event, which will then be ingested by PostHog (after all plugins run).

### processEventBatch function 

`processEventBatch` works just like `processEvent`, except it takes a batch of events at once, rather than one event at a time. It also returns an array of events (although not necessarily with the same number of events as the input array). This is especially useful for plugins that export data out of PostHog, so that they do not need to make an HTTP request with every incoming event. 

> **Note:** Your plugin can use `processEvent` or `processEventBatch`. Currently, if both are present, `processEventBatch` will not run. 

Here's the same example from above, except now using `processEventBatch`: 

```js
async function processEventBatch(events, { config, cache }) {
    const counter = await cache.get('counter', 0)
    cache.set('counter', counter + 1)

    for (let event of events) {
      if (event.properties) {
          event.properties['hello'] = 'world'
          event.properties['bar'] = config.bar
          event.properties['$counter'] = counter
      }
    }

    return events
}
```

As you can see, since `events` is an array of events, we iterate over it to access every individual event. 

> **Note:** As of right now, batch size is not yet configurable and still receives only one event (albeit in array form).

### Scheduled Tasks

Plugins can also run scheduled tasks through the functions:

- `runEveryMinute`
- `runEveryHour`
- `runEveryDay`

These functions only take an object of type `PluginMeta` as a parameter and do not return anything.

Example usage:

```js
async function runEveryMinute({ config }) {
    const url = `https://api.github.com/repos/PostHog/posthog`
    const response = await fetch(url)
    const metrics = await response.json()

  // posthog.capture is also available in plugins by default
    posthog.capture('github metrics', { 
        stars: metrics.stargazers_count,
        open_issues: metrics.open_issues_count,
        forks: metrics.forks_count,
        subscribers: metrics.subscribers_count
    })
}
```

It's worth noting that the plugin server supports debouncing, meaning that the counter for the next task will only start once the previous task finishes. In other words, if a given task that runs "every minute" takes longer than a minute, the next task will only start one minute after the previous task finishes.

#### Limitations

PostHog plugins are still in beta, and our scheduled tasks are the newest feature within plugins. As such, they currently have a few limitations:

1. The time intervals (e.g. "every minute" / "every hour") are promises, not guarantees. A worker may be down for 2 seconds because of a restart and miss the task. We're working to add better timing guarantees in the upcoming releases.
2. We intend to make scheduled tasks via plugins more flexible in the near-future. Keep an eye out for any updates to the API.
3. If you have multiple instances of `posthog-plugin-server` running, the defined tasks will be run on each instance at the specified interval. Fixes for this are also on the way in the upcoming releases.

### Publishing Your Plugin

There are 3 ways to use plugins you build:

1. Publish the plugin to `npm` and install it with the url from `npmjs.com` 
1. If the plugin is built with JavaScript only (not TypeScript), you can add it via its repository URL (e.g. GitHub/GitLab)
1. Reference the location of the plugin on your local instance (e.g. /Users/yourname/path/to/plugin)

This can be configured in 'Settings' -> 'Project Plugins'. 





