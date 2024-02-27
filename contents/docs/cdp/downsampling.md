---
title: Downsampler
github: https://github.com/PostHog/downsampling-plugin
installUrl: https://app.posthog.com/project/apps?name=Downsampling
thumbnail: ../../cdp/thumbnails/downsampling.png
tags:
    - downsampler
---

This app enables you to reduce how many events a deployment of PostHog will ingest. This is especially useful for users who have huge volumes of data, but don't need to analyze it all and want to avoid large bills.

### Requirements

The Downsampler app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Downsampling' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

## Can I use the Downsampler app to control my PostHog bill?

Yes. Paid-for versions of PostHog are priced per event and the Downsampling app enables you to reduce the number of events which your instance ingests, thereby giving you greater control over billing.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Downsampler app](https://github.com/PostHog/downsampling-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Michael Matloka](https://github.com/Twixes) and [Marius Andra](https://github.com/mariusandra) and [Neil Kakkar](https://github.com/neilkakkar) for creating the Downsampler.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 