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
  "lib": "<lib_file>",
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


### setupPlugin function

`setupPlugin` is a function you can use to dynamically set plugin configuration based on the user's inputs at the configuration step. 

You could, for example, check if an API Key inputted by the user is valid and throw an error if it isn't, prompting PostHog to ask for a new key.

The plugins server calls this function with an object containing `cache`, `global`, `attachments` and `config` (explained below), which you can use in your logic. 

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

Like `setupPlugin`, it can also take `cache`, `global`, `attachments`, and `config` as parameters via an object. 

Here's an example (from the ['Hello World Plugin'](https://github.com/PostHog/helloworldplugin)):

```js
async function processEvent(event, { config, cache }) {
    const counter = await cache.get('counter', 0)
    cache.set('counter', counter + 1)

    if (event.properties) {
        event.properties['hello'] = 'world'
        event.properties['bar'] = config.bar
        event.properties['$counter'] = counter
        event.properties['lib_number'] = libFunction(3)
    }

    return event
}
```

As you can see, the function receives the event before it is ingested by PostHog, adds properties to it (or modifies them), and returns the enriched event, which will then be ingested by PostHog (after all plugins run).

### Global Parameters

PostHog automatically injects useful parameters in the `setupPlugin` and `processEvent` functions. These are:

#### config

Gives you access to the PostHog config as described in `plugin.json` and configured via the PostHog interface.

#### cache

A way to store values that persist across `processEvent` calls. The values are stored in [Redis](https://redis.io/), an in-memory store.

Storing values is done via `cache.set`, which takes the following parameters:

```
key: string, 
value: unknown
```

And retrieving them uses `cache.get`, which takes:

```
key: string, 
defaultValue: unknown
```

> If you're unfamiliar with TypeScript, you can read about the `unknown` type on this [blog post by Microsoft](https://devblogs.microsoft.com/typescript/announcing-typescript-3-0-rc-2/#the-unknown-type)

### global

Global is used for sharing functionality between `setupPlugin` and `processEvent`, since global scope does not work in the context of PostHog plugins. 

### attachments

Attachments gives access to files uploaded by the user for config parameters of type `attachment`. An `attachment` has the following type definition:

```js
interface PluginAttachment {
    content_type: string
    file_name: string
    contents: any
}
```

As such, accessing the contents of an uploaded file can be done with `attachments.attachmentName.contents`.

### Publishing Your Plugin

There are 3 ways to use plugins you build:

1. Publish the plugin to `npm` and install it with the url from `npmjs.com` 
1. If the plugin is built with JavaScript only (not TypeScript), you can add it via its repository URL (e.g. GitHub/GitLab)
1. Reference the location of the plugin on your local instance (e.g. /Users/yourname/path/to/plugin)

This can be configured in 'Settings' -> 'Project Plugins'. 





