---
title: Google Pub/Sub
github: https://github.com/vendasta/pubsub-plugin
thumbnail: ../../cdp/thumbnails/pub-sub-export.png
tags:
    - pub-sub
---

> This app is currently unavailable while we develop [a new export system](https://github.com/PostHog/posthog/issues/15997). It will be back again soon!

This app sends events from PostHog to a [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/) topic when they are ingested. It's [used by teams such as Vendasta](https://posthog.com/customers/vendasta).

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need a Google Cloud Pub/Sub account to connect to.

## Installation

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Pub/Sub' and select the app, press Install.
3. Upload your Google Cloud key .json file. ([How to get the file.](https://cloud.google.com/pubsub/docs/reference/libraries))
4. Enter your Topic ID.
5. Watch events publish to Topic.

## Finding your Google Cloud key .json file

You'll need this file to configure the Pub/Sub app for PostHog. You can find out where to find it in [Google's Pub/Sub client libraries documentation](https://cloud.google.com/pubsub/docs/reference/libraries).

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code](https://github.com/PostHog/pubsub-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog community member Jesse Redl from [Vendasta](https://posthog.com/customers/vendasta) for creating this. Thanks, Jesse!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 