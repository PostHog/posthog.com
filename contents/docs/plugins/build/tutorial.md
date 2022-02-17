---
title: Tutorial
sidebar: Docs
showTitle: true
---

This tutorial explains the development workflow and best practices, using an example 'Hello World' plugin. We go from zero to publishing your plugin in the official PostHog repository.

## Prerequisites

1. A self-hosted PostHog instance (or a local development environment)
1. Some knowledge of JavaScript (or TypeScript)

## The plugin

Every plugin begins with either the PostHog plugin [source editor](#using-the-plugin-source-editor), or a new GitHub repository. In both cases, our plugin source code will look like this:

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

And our config would look like:

```js
[
  {
    "key": "name", // name of key to be accessed using meta. Check value using `meta.config.name`
    "name": "Person to greet",
    "type": "string",
    "hint": "Used to personalise the property `hello`",
    "default": "",
    "required": false
  }
]
```

For information on what code to write and what special functions to use, check out [the overview](/docs/plugins/build/overview) and [the developer reference](/docs/plugins/build/reference).

### Using the plugin source editor

Go to Plugins -> Advanced tab -> Plugin editor -> Start coding.

![Plugin editor location](../../../images/plugins/plugin-editor-location.png)

Then, click on "Edit Source", and you're good to go. Copy your code and config into the editor, and you're ready to [test the plugin.](#testing)

### Using a GitHub repository

We have a [GitHub template (GH login required)](https://github.com/PostHog/posthog-plugin-starter-kit/generate) which helps you create a new repository with all the right files. There are only two files which make up the entire plugin: the `index.js` and `plugin.json`. Your code goes into `index.js`, and your configuration goes into `plugin.json`.

Other than this, there's the `index.test.js` file for tests, and `package.json` for package dependencies and metadata.

Remember to update `package.json` with the appropriate metadata, like name, description, and maintainer.

Once you've written the code in this new repository, you can run it by installing it locally in PostHog. [See testing for more information.](#testing)

#### Plugin naming conventions

When creating your repository, follow the naming convention of `posthog-<plugin-name>-plugin`. For example, the hello world plugin repository would be called `posthog-hello-world-plugin`.

### Converting a source plugin to a GitHub repository

If you wish to submit your plugin to the official repository, you need to convert it into a GitHub repository. The easiest way to do this is to start with [the plugin template](https://github.com/PostHog/posthog-plugin-starter-kit/generate) and copy your source code into `index.js` and your config into the config field of `plugin.json`. Then update `package.json` with the appropriate metadata, like name, description, and maintainer.

[See submission instructions](#submitting-your-plugin) for how to submit the plugin to the PostHog Repository.

## Testing

For now, the best way to test plugins is to install them locally. 

- If you're writing a plugin in the Plugin source editor, this is as easy as clicking "Save".
- If you're writing a plugin in a GitHub repository, install it locally using the "Install Local Plugin" option in the Advanced Tab.

![Install plugin location](../../../images/plugins/install-plugin-location.png)

This allows you to tweak your plugin and see that everything works fine.

## Debugging

Plugins can make use of the JavaScript `console` for logging and debugging. 

These logs can be seen on the 'Logs' page of each plugin, which can be accessed on the 'Plugins' page of the PostHog UI.

## Publishing your plugin

There are 4 ways to use plugins you build:

1. Publish the plugin to `npm` and install it with the url from `npmjs.com` 
1. You can add it via its repository URL (e.g. GitHub/GitLab)
1. Reference the location of the plugin on your local instance (e.g. /Users/yourname/path/to/plugin)  

    This can be configured in 'Settings' -> 'Project Plugins'.
1. Submit it to the official repository. [See below](#submitting-your-plugin) 

## Submitting your plugin

If you wish to, you can contribute back to the PostHog community by submitting your plugin to the [official Plugin Repository](/plugins). This means everyone else can use your plugin, too!

If you built a plugin inside the PostHog editor, first [convert it to a GitHub repository](#converting-a-source-plugin-to-a-github-repository)

To submit, [email your plugin GitHub URL to hey@posthog.com](mailto:hey@posthog.com?subject=Submit%20Plugin%20to%20Repository&body=Plugin%20GitHub%20link%3A)

Once we get your email, we review the plugin to ensure it's secure, performant, and adheres to best practices. Then, we add it to our official repository and make it available for everyone to use.
