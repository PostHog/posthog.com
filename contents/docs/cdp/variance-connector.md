---
title: Variance
github: https://github.com/PostHog/posthog-variance-plugin
installUrl: https://app.posthog.com/project/apps?name=Variance
thumbnail: ../../cdp/thumbnails/variance.png
tags:
    - variance-connector
---

This app exports PostHog data to Variance in real-time and formats it for use by revenue teams. This includes extracting accounts and contacts, making it easy to see customers by sales stage, and more.

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.31.0](https://posthog.com/blog/the-posthog-array-1-31-0) or later. The app supports `capture`, `page`, `identify`, and `alias` calls.

Not running 1.31.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

To install the Variance app you'll need a Variance account. In your Variance account go to Variance > Integrations > Create a new PostHog connection. This will give you a Webhook URL and Authorization header value. You will then use those two values when installing the app in your PostHog instance. Don't forget to hit enable after you've added the configuration details.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code](https://github.com/PostHog/posthog-variance-plugin) is available on GitHub.

### Who created this app?

This app was created by Variance. We'd like to thank everyone at Variance for creating this. Thanks!

### Who maintains this app?

This app is maintained by Variance. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 

