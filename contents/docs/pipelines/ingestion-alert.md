---
title: Ingestion Alert
github: https://github.com/PostHog/ingestion-alert-plugin
installUrl: https://app.posthog.com/project/apps?name=Posthog+Ingestion+Alert+Plugin
thumbnail: ../../pipelines/thumbnails/ingestion-alert.png
tags:
    - ingestion-alert
---

This app triggers a webhook when no events have been ingested for a specified period of time. It can be used to alert you when ingestion for your project / instance is not working correctly.

## Requirements

The Ingestion Alert app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Ingestion Alert'
4. Select the app, press 'Install' and follow the on-screen instructions

## Configuration

<AppParameters />

## Why am I not getting ingestion alert notifications?

If you do not have a lot of users, or they are all based in the same timezone you may legitimately have 'dead periods' where no events are generated. To prevent such dead periods causing alerts you can increase the threshold. You can also use the [heartbeat app](https://github.com/PostHog/posthog-heartbeat-plugin) to trigger events during dead periods if you wish to only monitor the ingestion pipeline.

If an alert has already been triggered and ingestion has not recovered for an extended period, you will not receive another reminder that it is down.

This is helpful to monitor if there are any ingestion issues within your posthog instance and within your setup (e.g. using the wrong project key).

If the app server itself is down, this app will not be able to alert you that ingestion has stopped.

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Ingestion Alert app](https://github.com/PostHog/ingestion-alert-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Marcus Hyett](https://github.com/marcushyett-ph) and former PostHog team member [Kunal](https://github.com/kpthatsme) for creating the Ingestion Alert app.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

Or, if you see the feedback widget enabled, use that!

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 