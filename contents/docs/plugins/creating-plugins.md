---
title: Creating plugins
rootPage: /plugins
sidebar: Docs
showTitle: true
---

You may be looking to build or publish a plugin that doesn't yet exist, or perhaps you're curious about an existing plugin's structure.

## Core concepts

* Each PostHog plugin is created as a public GitHub repository, then published in this JSON in the [plugins repo](https://github.com/posthog/plugins)
* Plugins are installed from the [PostHog CLI](https://github.com/PostHog/posthog-cli), which installs based on the plugins repo.
* Each plugin requires a `<plugin-name>.py` file
* When a plugin is installed into a PostHog instance, the files are placed into the plugins folder of the instance.
* Plugins implement the PostHog APIs to provide access to the core functionality of PostHog