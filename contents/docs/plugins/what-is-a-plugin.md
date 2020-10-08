---
title: What is a plugin?
rootPage: /plugins
sidebar: Docs
showTitle: true
---

PostHog plugins are python packages that implement PostHog APIs.

One of the best ways to add functionality to PostHog is through our plugin system. PostHog is designed to be extensible, which means plugins are able to extend and modify just about everything PostHog does.

Of the many possibilities, plugins can:

* add external data or content (e.g. a 3rd party data provider like Clearbit, static files, a REST API) to your PostHog data
* transform data from other formats (e.g. Markdown, YAML, CSV) to events or users in your PostHog instance
* add third-party services (e.g. Google Analytics, Twitter feeds) to your PostHog data
* send PostHog data (e.g. product usage) out to third-party services (e.g. SalesForce, Hubspot)
* add bundled, pre-configured functionality
* do anything you can dream up!
