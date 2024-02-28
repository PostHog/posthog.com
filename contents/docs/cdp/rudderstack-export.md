---
title: RudderStack (Export)
github: https://github.com/rudderlabs/rudderstack-posthog-plugin
installUrl: https://app.posthog.com/project/apps?name=RudderStack
thumbnail: ../../cdp/thumbnails/rudderstack-export.png
tags:
    - rudderstack
---

Send events from PostHog to RudderStack. RudderStack will recognize PostHog as a data source, so you can use RudderStack's data pipeline features to send PostHog event data to other platforms.

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to the Rudderstack instance you want to export to.

## Installation

First, create a PostHog source in your RudderStack dashboard. Need help? Check [RudderStack's documentation](https://www.rudderstack.com/docs) for more information.

Once you've added PostHog as a source, make a note of the `write-key` field and your RudderStack server URL (also called the Data Planer URL).

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Rudderstack' and select the destination, press Install.
3. Follow the on-screen steps to configure the destination, entering your `write-key` and server URL information.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/rudderlabs/rudderstack-posthog-plugin) is available on GitHub.

### Who created this destination?

This was created by community members and the team at RudderStack. We'd like to thank [Sayan-Mitra](https://github.com/sayan-mitra), [Gavin](https://github.com/thtmnisamnstr), [Amey Varangaonkar](https://github.com/ameypv-rudder), [Utsab Chowdhury](https://github.com/utsabc) and [Arnab Pal](https://github.com/arnab-p) for creating it. Thank you, all!

### Who maintains this destination?

This destination is maintained by Rudderstack. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 