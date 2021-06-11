---
title: Tutorial
sidebar: Docs
showTitle: true
---

This tutorial explains the development workflow and best practices using a hello world plugin. We go from zero to publishing your plugin in the official PostHog repository.

## Pre-Requisites

1. A self-hosted PostHog instance (or a local development environment)
1. Knowledge of JavaScript (or TypeScript)

## The Plugin

### Using the Plugin Source Editor

Every plugin begins with either the [PostHog Plugin Source Editor](TK image), or simply a new GitHub repository.

### Converting to a GitHub Repository

Use the "basic plugin template" -> install locally -> test -> commit -> submit

## Testing

TODO

## Debugging

Plugins can make use of the JavaScript `console` for logging and debugging. 

These logs can be seen on the 'Logs' page of each plugin, which can be accessed on the 'Plugins' page of the PostHog UI.

## Limitations

PostHog plugins are still in beta, and our scheduled tasks are the newest feature within plugins. As such, they currently have a few limitations:

1. The time intervals (e.g. "every minute" / "every hour") are promises, not guarantees. A worker may be down for 2 seconds because of a restart and miss the task. We're working to add better timing guarantees in the upcoming releases.

## Publishing Your Plugin

There are 3 ways to use plugins you build:

1. Publish the plugin to `npm` and install it with the url from `npmjs.com` 
1. You can add it via its repository URL (e.g. GitHub/GitLab)
1. Reference the location of the plugin on your local instance (e.g. /Users/yourname/path/to/plugin)  

    This can be configured in 'Settings' -> 'Project Plugins'. 

## Submitting Your Plugin

If you wish to, you can contribute back to the PostHog community by submitting your plugin to the [official Plugin Repository](https://github.com/PostHog/plugin-repository). This means everyone else can use your plugin, too!

To submit, simply raise a pull request, adding your plugin to [repository.json](https://github.com/PostHog/plugin-repository/blob/main/repository.json)

<!-- TK button to make this PR for you from a GitHub url? - to come when ready -->