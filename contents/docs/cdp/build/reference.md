---
title: Apps developer reference
---

> **Note:** It's worth reading the [Building apps overview](..) for a quick introduction to how to build your own app.

## `plugin.json` file

A `plugin.json` file is structured as follows:

```json
{
  "name": "<plugin_display_name>",
  "url": "<repo_url>",
  "description": "<description>",
  "main": "<entry_point>",
  "config": [
    {
      "markdown": "A Markdown block.\n[Use links](http://example.com) and other goodies!"
    },
    {
      "key": "param1",
      "name": "<param1_name>",
      "type": "<param1_type>",
      "default": "<param1_default_value>",
      "hint": "<param1_hint_value>",
      "required": true,
      "secret": true
    },
    {
      "key": "param2",
      "name": "<param2_name>",
      "type": "<param2_type>",
      "default": "<param2_default_value>",
      "required": false
    }
  ]
}
```

Here's an example `plugin.json` file from our ['Hello world app'](https://github.com/PostHog/helloworldplugin):

```json
{
  "name": "Hello World",
  "url": "https://github.com/PostHog/helloworldplugin",
  "description": "Greet the World and Foo a Bar, JS edition!",
  "main": "index.js",
  "config": [
    {
      "markdown": "This is a sample app!"
    },
    {
      "key": "bar",
      "name": "What's in the bar?",
      "type": "string",
      "default": "baz",
      "hint": "This will be sent in a **property**",
      "required": false
    }
  ]
}
```

Most options in this file are self-explanatory, but there are a few worth exploring further:

### `main`

`main` determines the entry point for your app, where your `setupPlugin` and `processEvent` functions are. More on these later.

### `config`

`config` consists of an array of objects that each pertain to a specific configuration field or markdown explanation for your plugin.

Each object in a config can have the following properties:

|   Key    |                    Type                    |                                                                           Description                                                                           |
| :------ | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   type   | `"string"` or `"attachment"` or `"choice"` | Determines the type of the field - "attachment" asks the user for an upload, and "choice" requires the config object to have a `choices` array, explained below |
|   key    |                  `string`                  |                                     The key of the app config field, used to reference the value from inside the app                                      |
|   name   |                  `string`                  |                                          Displayable name of the field - appears on the app setup in the PostHog UI                                          |
| default  |                  `string`                  |                                                                   Default value of the field                                                                    |
|   hint   |                  `string`                  |                                             More information about the field, displayed under the in the PostHog UI                                             |
| markdown |                  `string`                  |                                                             Markdown to be displayed with the field                                                             |
|  order   |                  `number`                  |                                                                           Deprecated                                                                            |
| required |                 `boolean`                  |                                               Specifies if the user needs to provide a value for the field or not                                               |
|  secret  |                 `boolean`                  |                     Secret values are write-only and never shown to the user again - useful for apps that ask for API Keys, for example                      |
| choices  |                  `string[]`                   |                           Only accepted on configs with `type` equal to `"choice"` - an array of choices (of type `string`) to be presented to the user                            |

> **Note:** You can have a config field that only contains `markdown`. This won't be used to configure your app but can be placed anywhere in the `config` array and is useful for customizing the content of your app's configuration step in the PostHog UI.

## `PluginMeta`

> Check out [App Types](/docs/plugins/types) for a full spec of types for app authors.

**Every plugin server function** is called by the server with an object of type `PluginMeta` that will always contain the object `cache`, and can also include `global`, `attachments`, and `config`, which you can use in your logic. 

Here's what they do:

### `config`

Gives you access to the app config values as described in `plugin.json` and configured via the PostHog interface.

Example:
```js
export async function processEvent(event, { config }) {
    event.properties['greeting'] = config.greeting
    return event
}
```

### `cache`

A way to cache values globally across plugin reloads. The values are stored in [Redis](https://redis.io/), an in-memory store. This storage is not persistent, so values _can_ be dropped by the system.

The `cache` type is defined as follows:

```js
interface CacheExtension {
    set: (key: string, value: unknown, ttlSeconds?: number, options?: CacheOptions) => Promise<void>
    get: (key: string, defaultValue: unknown, options?: CacheOptions) => Promise<unknown>
    incr: (key: string) => Promise<number>
    expire: (key: string, ttlSeconds: number) => Promise<boolean>
    lpush: (key: string, elementOrArray: unknown[]) => Promise<number>
    lrange: (key: string, startIndex: number, endIndex: number) => Promise<string[]>
    llen: (key: string) => Promise<number>
}
```

Storing values is done via `cache.set`, which takes a key and a value, as well as an optional value in seconds after which the key will expire.

Retrieving values uses `cache.get`, which takes the key of the value to be retrieved, as well as a default value in case the key does not exist.

You can also use `cache.incr` to increment numerical values by 1, and `cache.expire` to make keys _volatile_, meaning they will expire after the specified number of seconds.

Methods `cache.lpush`, `cache.lrange`, and `cache.llen` enable operations on Redis lists.

All the above methods represent their equivalent Redis commands – see Redis documentation:

- [SET](https://redis.io/commands/set)
- [GET](https://redis.io/commands/get)
- [INCR](https://redis.io/commands/incr)
- [EXPIRE](https://redis.io/commands/expire)
- [LPUSH](https://redis.io/commands/lpush)
- [LRANGE](https://redis.io/commands/lrange)
- [LLEN](https://redis.io/commands/llen)

Example:
```js
export function processEvent(event, { config, cache }) {
    const counterValue = (await cache.get('greeting_counter', 0))
    await cache.set('greeting_counter', counterValue + 1)
    if (!event.properties) event.properties = {}
    event.properties['greeting_counter'] = counterValue
    return event
}
```

### `global`

The `global` object is used for sharing functionality between `setupPlugin` and the rest of the special functions, like `processEvent`, `onEvent`, or `runEveryMinute`, since global scope does not work in the context of PostHog apps. `global` is not shared across worker threads

Example:
```js
export function setupPlugin({ global, config }) {
    global.eventsToTrack = (config.eventsToTrack || '').split(',') 
}

export function processEvent(event, { global, config }) {
    if(global.eventsToTrack.includes(event.event)) {
        // Do something
    }
}
```

### `attachments`

`attachments` gives access to files uploaded by the user for config parameters of type `attachment`. An `attachment` has the following type definition:

```js
interface PluginAttachment {
    content_type: string
    file_name: string
    contents: any
}
```

As such, accessing the contents of an uploaded file can be done with `attachments.attachmentName.contents`.

Example:
```js
export function setupPlugin({ attachments, global }: Meta) {
    if (attachments.maxmindMmdb) {
        global.ipLookup = new Reader(attachments.maxmindMmdb.contents)
    }
}
```

### `jobs`

The `jobs` object gives you access to the jobs you specified in your app. See [Jobs](/docs/apps/build/jobs) for more information.

### `geoip`

`geoip` provides a way to interface with a [MaxMind](https://www.maxmind.com/en/home) database running in the app server to get location data for an IP address. It is [primarily used for the PostHog GeoIP plugin](https://github.com/PostHog/posthog-plugin-geoip/blob/6412763f70a80cf3e1895e8a559a470d80abc9d5/index.ts#L12).

It has a `locate` method that takes an IP address and returns an object possibly containing `city`, `location`, `postal`, and `subdivisions`.

Read more about the response from `geoip.locate` [here](https://github.com/maxmind/GeoIP2-node/blob/af20a9681c85445a73d3446e2a682f64d3b673db/src/models/City.ts).

## Maximizing reliability with `RetryError`

Since plugins generally handle data in some way, it's crucial for data integrity that each plugin is as reliable as possible. One system-level mechanism you can leverage to improve reliability is **function retries**.

While normally a plugin function simply fails without ceremony the moment it throws an error, **select functions can be retried** by throwing a special error type: **`RetryError`** – which is included in the `@posthog/plugin-scaffold` package.

As an example, it's safe to assume that a connection to an external service _will_ fail eventually. Due to security considerations, `setTimeout` cannot be used in a plugin to wait until the network problem has passed, but with function retries the solution is even simpler! Just `catch` the connection error and `throw new RetryError` – the system will re-run the function for you:

```js
import { RetryError } from '@posthog/plugin-scaffold'

export function setupPlugin() {
    try {
        // Some network connection
    } catch {
        throw new RetryError('Service is unavailable, but it might be back up in a moment')
    }
}
```

At the same time, make sure NOT to use `RetryError` when the problem cannot be intermittent – perhaps an invalid config, an unhandled edge case, or just a random bug in the code of the plugin. Retrying such a case would just put extra load on the system, without any benefit.

```js
import { RetryError } from '@posthog/plugin-scaffold'

export function setupPlugin({ config }) {
    let eventsToTrack
    try {
        eventsToTrack = config.nonExistentKey.split(',')
    } catch {
        throw new RetryError('Retrying this will never help')
    }
}
```

The maximum number of retries is documented with each function, as it might differ across them. However, the mechanism is constant in its use of _exponential backoff_, that is: the wait time between retries is doubled with each attempt. For instance, if the 1st retry takes place 1 s after the initial failure, the gap between the 5th and the 6th will be 32 s (`2^5`).

As of PostHog 1.37+, the following functions are _retriable_:
- `setupPlugin`
- `onEvent`
- `exportEvents`

## `setupPlugin` function

`setupPlugin` is a function you can use to dynamically set app configuration based on the user's inputs at the configuration step. 

You could, for example, check if an API Key inputted by the user is valid and throw an error if it isn't, prompting PostHog to ask for a new key.

It takes only an object of type `PluginMeta` as a parameter and does not return anything.

Example (from the [PostHog MaxMind app](https://github.com/PostHog/posthog-maxmind-plugin)):

```js
export function setupPlugin({ attachments, global }) {
    if (attachments.maxmindMmdb) {
        global.ipLookup = new Reader(attachments.maxmindMmdb.contents)
    }
}
```

`setupPlugin` can be retried up to 5 times (first retry after 5 s, then 10 s after that, 20 s, 40 s, lastly 80 s) by throwing [`RetryError`](#maximizing-reliability-with-retryerror). Attempting to retry more than 5 times disables the plugin. The plugin is disabled immediately if any error other than `RetryError` is thrown in `setupPlugin`.

On PostHog Cloud and [email-enabled](/docs/self-host/configure/email) instances of PostHog, project members are notified by email of the plugin being disabled automatically. This is to ensure that action is taken if the plugin is important for data integrity.

## `teardownPlugin` function

`teardownPlugin` is ran when an app VM is destroyed, because of, for example, a app server shutdown or an update to the app. It can be used to flush/complete any operations that may still be pending, like exporting events to a third-party service.

```js
async function teardownPlugin({ global }) {
  await global.buffer.flush()
}
```

## `processEvent` function

> If you were using `processEventBatch` before, you should now use `processEvent`. `processEventBatch` has been **deprecated**.

`processEvent` is the juice of your app. 

In essence, it takes an event as a parameter and returns an event as a result. In the process, this event can be:

- Modified
- Sent somewhere else
- Not returned (preventing ingestion)

It takes an event and an object of type `PluginMeta` as parameters and returns an event.

Here's an example (from the ['Hello World App'](https://github.com/PostHog/helloworldplugin)):

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

As you can see, the function receives the event before it is ingested by PostHog, adds properties to it (or modifies them), and returns the enriched event, which will then be ingested by PostHog (after all apps run).

## `onEvent` function

> **Minimum PostHog version:** 1.25.0 

`onEvent` works similarly to `processEvent`, except any returned value is ignored by the app server. In other words, `onEvent` can read an event but not modify it. 

In addition, `onEvent` functions will run after all enabled apps have run `processEvent`. This ensures you will be receiving an event following all possible modifications to it.

This was originally built for and is particularly useful for export apps. These apps need to receive the "final form" of an event and send it out of PostHog, without having to modify it.

Here's a quick example:

```js
async function onEvent(event) {
    // do something to the event
    sendEventToSalesforce(event)

    // no need to return anything
}
```

`onEvent` can be retried up to 5 times (first retry after 5 s, then 10 s after that, 20 s, 40 s, lastly 80 s) by throwing [`RetryError`](#maximizing-reliability-with-retryerror). Attempting to retry more than 5 times is ignored.

## Scheduled tasks

Apps can also run scheduled tasks through the functions:

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

  // posthog.capture is also available in apps by default
    posthog.capture('github_metrics', { 
        stars: metrics.stargazers_count,
        open_issues: metrics.open_issues_count,
        forks: metrics.forks_count,
        subscribers: metrics.subscribers_count
    })
}
```

It's worth noting that scheduled tasks are _debounced_, meaning that only a single run of a given task can be in progress at any given time. For example, if a `runEveryMinute` run takes more than a minute, it will make the system skip each following run until that current one has finished – then, the schedule will resume normally.

## `exportEvents`

`exportEvents` was built to make exporting PostHog events to third-party services (like data warehouses) extremely easy. 

Example:

```js
async function exportEvents(events, meta) {
  try {
    // send events somewhere
  } catch {
    throw new RetryError('Service is down')
  }
}
```

In the background, `exportEvents` sets up asynchronous processing of batches and ensures the events in the batch have already been processed by all enabled apps. `exportEvents` can be retried up to 3 times (first retry after 6 s, then 12 s after that, 24 s) by throwing [`RetryError`](#maximizing-reliability-with-retryerror). Attempting to retry more than 3 times is ignored.

## Using the PostHog API

All apps have access to the PostHog API which can be used to read and create almost anything within PostHog, as well as send additional events.

For more information on using the API, take a look at [this guide](/docs/apps/build/api).

## Available packages and imports

Apps have access to some special objects in the global scope, as well as a variety of libraries for importing. Scheduling functions (`setInterval`, `setTimeout` and `setImmediate`) are not available. Use jobs instead.

### Global

#### `fetch`

<blockquote class="warning-note">

⚠️ Be very careful when using `fetch` to send events to a PostHog instance from `processEvent` or `onEvent`! The event captured will also be run through all the installed apps and could potentially lead to an infinite loop of event generation.

</blockquote>

Equivalent to [node-fetch](https://www.npmjs.com/package/node-fetch).

### Available imports

| Import name | Description |
| :--------- | :--------- | 
| `crypto`    | [Node.js standard lib's `crypto` module](https://nodejs.org/api/crypto.html) |
| `url`    | [Node.js standard lib's `url` module](https://nodejs.org/api/url.html) |
| `zlib`    | [Node.js standard lib's `zlib` module](https://nodejs.org/api/zlib.html) |
| `generic-pool`    | [`npm` package `generic-pool`](https://www.npmjs.com/package/generic-pool) |
| `pg`    | [`npm` package `node-postgres`](https://www.npmjs.com/package/pg) |
| `snowflake-sdk`    | [`npm` package `snowflake-sdk`](https://www.npmjs.com/package/snowflake-sdk) |
| `aws-sdk`    | [`npm` package `aws-sdk`](https://www.npmjs.com/package/aws-sdk) |
| `@google-cloud/bigquery`    | [`npm` package `@google-cloud/bigquery`](https://www.npmjs.com/package/@google-cloud/bigquery) |
| `@google-cloud/storage`    | [`npm` package `@google-cloud/storage`](https://www.npmjs.com/package/@google-cloud/storage) |
| `@google-cloud/pubsub`    | [`npm` package `@google-cloud/pubsub`](https://www.npmjs.com/package/@google-cloud/pubsub) |
| `node-fetch`    | [`npm` package `node-fetch`](https://www.npmjs.com/package/node-fetch) |
| `@posthog/plugin-scaffold`    | Types for PostHog plugins. [`npm` package `@posthog/plugin-scaffold`](https://www.npmjs.com/package/@posthog/plugin-scaffold) |
| `@posthog/plugin-contrib`    | Helpers for plugin devs maintained by PostHog. [`npm` package `@posthog/plugin-contrib`](https://www.npmjs.com/package/@posthog/plugin-contrib) |


#### Example 

Here's an example of the use of imports from the BigQuery plugin:

```js
import { createBuffer } from '@posthog/plugin-contrib'
import { Plugin, PluginMeta, PluginEvent, RetryError } from '@posthog/plugin-scaffold'
import { BigQuery, Table, TableField, TableMetadata } from '@google-cloud/bigquery'
```

You can also use `require` for imports.

## Jobs

Apps can schedule tasks in PostHog that run asynchronously on a given schedule. These can be used to import or export data, as well as creating other resources in PostHog such as annotations and cohorts.

For more information on jobs, check out [this guide](/docs/apps/build/jobs).

## Testing

In order to ensure apps are stable and work as expected for all their users, we highly recommend writing tests for every app you build.

### Adding testing capabilities to your app
You will need to add jest and our app testing scaffold to your project in your `package.json` file:
```json
"jest": {
    "testEnvironment": "node"
},
"scripts": {
    "test": "jest ."
},
"devDependencies": {
    "@posthog/plugin-scaffold": "*",
    "jest": "^27.0.4"
}
```

Create your test files e.g. `index.test.js` or `index.test.ts` for testing your `index.js` or `index.ts` file

### Writing tests

Write tests in jest, you can learn more about the syntax and best practices in the [jest documentation](https://jestjs.io/docs/getting-started). We recommend writing tests to cover the primary functions of your app (e.g. does it create events in the expected format) and also for edge cases (e.g. does it crash if no data is sent).

For more information on how to setup testing, take a look at [this guide](/docs/apps/build/testing).

## Logs

Apps can make use of the `console` for logging and debugging. `console.log`, `console.warn`, `console.error`, `console.debug`, `console.info` are all supported.

These logs can be seen on the 'Logs' page of each app, which can be accessed on the 'Apps' page of the PostHog UI.
