---
title: Heartbeat
github: https://github.com/PostHog/posthog-heartbeat-plugin
installUrl: https://app.posthog.com/project/apps?name=Heartbeat
<<<<<<<< HEAD:contents/docs/pipelines/heartbeat.md
thumbnail: ../../pipelines/thumbnails/heartbeat.png
========
thumbnail: ../../cdp/thumbnails/heartbeat.png
>>>>>>>> master:contents/docs/cdp/heartbeat.md
tags:
    - heartbeat
---

The Heartbeat app simply sends one event to your project every minute for as long as it is enabled. It's mainly useful for testing and works well in conjunction with the Ingestion Alert app.

## Requirements

The Heartbeat app doesn't require a living heart, but it _does_ require either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Heartbeat' press 'Install'
4. Configure the by app by following the instructions below.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Heartbeat app](https://github.com/PostHog/posthog-heartbeat-plugin) is available on GitHub.

### Who created this app?

We'd like to thank [Marcus Hyett](https://github.com/marcushyett-ph) for creating the Heartbeat app. Thanks, Marcus!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

Or, if you see the feedback widget enabled, use that!

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 