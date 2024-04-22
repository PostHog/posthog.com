---
title: How to build a PostHog transformation or destination
sidebar: Docs
showTitle: true
---

This tutorial explains the development workflow and best practices, using an example 'Hello World' transformation. We go from zero to publishing it in the official PostHog repository.

## Prerequisites

1. A self-hosted PostHog instance (or a local development environment)
1. Some knowledge of JavaScript (or TypeScript)

## The transformation

Every transformation begins with either the PostHog transformation [source editor](#using-the-plugin-source-editor), or a new GitHub repository. In both cases, our transformation source code will look like this:

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

For information on what code to write and what special functions to use, check out [the overview](/docs/cdp/build) and [the developer reference](/docs/cdp/build/reference).

### Using the transformation source editor

Go to Data pipeline -> Manage apps tab -> Install app (advanced) -> Start coding.

![App editor location](https://res.cloudinary.com/dmukukwp6/image/upload/v1712101259/posthog.com/contents/images/docs/cdp/install-app.png)

Then, click on "Edit Source", and you're good to go. Copy your code and config into the editor, and you're ready to [test the transformation.](#testing)

### Using a GitHub repository

We have a [GitHub template (GH login required)](https://github.com/PostHog/posthog-plugin-starter-kit/generate) which helps you create a new repository with all the right files. There are only two files which make up the entire transformation: the `index.js` and `plugin.json`. Your code goes into `index.js`, and your configuration goes into `plugin.json`.

Other than this, there's the `index.test.js` file for tests, and `package.json` for package dependencies and metadata.

Remember to update `package.json` with the appropriate metadata, like name, description, and maintainer.

Once you've written the code in this new repository, you can run it by installing it locally in PostHog. [See testing for more information.](#testing)

#### Transformation naming conventions

When creating your repository, follow the naming convention of `posthog-<plugin-name>-plugin`. For example, the hello world  repository would be called `posthog-hello-world-plugin`.

### Converting a source transformation to a GitHub repository

If you wish to submit your transformation or destination to the official repository (so it is listed on PostHog Cloud), you need to convert it into a GitHub repository. The easiest way to do this is to start with [the template](https://github.com/PostHog/posthog-plugin-starter-kit/generate) and copy your source code into `index.js` and your config into the config field of `plugin.json`. Then update `package.json` with the appropriate metadata, like name, description, and maintainer.

[See submission instructions](#submitting-your-plugin) for how to submit the it to the PostHog Repository.

## Testing

For now, the best way to test transformations or destinations is to install them locally. 

- If you're writing one in the source editor, this is as easy as clicking "Save".
- If you're writing one in a GitHub repository, install it locally using the "Install from GitHub, GitLab or npm" option in the Advanced tab.

![Install transformation or destination location](https://res.cloudinary.com/dmukukwp6/image/upload/v1712101367/posthog.com/contents/images/docs/cdp/install-local.png)

This allows you to tweak it and see that everything works fine.

## Debugging

Transformations or destinations can make use of the JavaScript `console` for logging and debugging. 

These logs can be seen on the 'Logs' page, which can be accessed on the [Data Pipelines](https://app.posthog.com/apps) tab of the PostHog UI.

## Publishing your transformation or destination

There are four ways to publish transformation or destination you build:

1. Publish them to `npm` and install it with the url from `npmjs.com` 
1. You can add it via its repository URL (e.g. GitHub/GitLab)
1. Reference the location of them on your local instance (e.g. `/Users/yourname/path/to/transformation`). This can be configured in 'Settings' -> 'Project Apps'.
1. Submit it to the official repository so that it can be installed on PostHog Cloud. [See below](#submitting-your-plugin) 

## Submitting your transformation or destination

You can submit your transformation or destination to the [official library](/cdp). If accepted, it becomes available to all PostHog Cloud users. 

> **Note:** We are only reviewing new apps relying on stateless `processEvent` (no cache or external calls) or `composeWebhook` functions.

If you built one inside the PostHog editor, convert it to a GitHub repository

To submit, send your GitHub repository URL in [an in-app support ticket](https://us.posthog.com/#panel=support%3Asupport%3Aapps%3Alow) (topic: Data pipelines) or [email your GitHub URL to hey@posthog.com](mailto:hey@posthog.com?subject=Submit%20Plugin%20to%20Repository&body=Plugin%20GitHub%20link%3A)

Once we get your email, we review it to ensure it's secure, performant, and adheres to best practices. Then, we add it to our official repository and make it available for everyone to use.
