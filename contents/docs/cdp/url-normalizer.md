---
title: URL Normalizer
github: 'https://github.com/PostHog/posthog-url-normalizer-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=URL%20Normalizer'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/cdp/thumbnails/url_normalizer.png
tags:
  - url-normalizer
---

This app normalizes the format of URLs so you can more easily compare them in insights.

By default, the URL Normalizer converts all URLs to lowercase and strips trailing /s, overriding the old `current_url` property.

## Requirements

The URL Normalizer app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'URL Normalizer' and select the app, press Install.

## Configuration

No configuration is needed. The URL Normalizer will automatically convert all URLs to lowercase and remove any trailing slashes.

If you'd like to normalize URLs into a different format, please consider contributing a PR to [the repo](https://github.com/PostHog/posthog-url-normalizer-plugin).

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the URL Normalizer](https://github.com/PostHog/posthog-url-normalizer-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog user and community member [Mark Bennett](https://github.com/MarkBennett) for creating this app

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
