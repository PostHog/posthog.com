---
title: URL query parameter converter
github: https://github.com/PostHog/integrations-repository/pull/31
installUrl: https://app.posthog.com/project/apps?name=url-query-parameter-converter
thumbnail: ../../cdp/thumbnails/url-query.png
tags:
    - url-query
---

This app automatically converts URL query parameters for specific terms into event properties in PostHog, enabling you to analyse them like any other data point. This can be useful for seeing how your product or content converts based on search terms. 

## Requirements

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'URL query parameter converter' and select the app, press Install.
3. Configure the app to whitelist the parameters you want to turn into events.

That's it!

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for this app](https://github.com/PostHog/posthog-app-url-parameters-to-event-properties) is available on GitHub.

### Who created this app?

We'd like to thank PostHog community member [Benjamin Werker](https://github.com/everald) for creating this app.

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 

