---
title: Plugins
rootPage: /plugins
sidebar: Docs
showTitle: true
---

Plugins make it much easier to modify how you use PostHog.

Plugins are in beta. This means at the moment they cannot directly access the full PostHog API.

Currently you can:

* Filter and normalize events and their properties
* Inject new properties into events
* Use the cache (Redis) to store state

The objective of plugins is ultimately to offer a prepackaged integration into the core PostHog APIs to save you time and energy, with minimal configuration. We would greatly appreciate pull requests or issues to help guide the development.

## In this section

* [What is a plugin?](plugins/what-is-a-plugin)
* [Using a plugin in your site](plugins/using-a-plugin-on-your-site)
* [Plugin directory](/plugins)
* [Creating plugins](plugins/creating-plugins)