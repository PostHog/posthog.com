---
title: Engage
github: 'https://github.com/PostHog/posthog-engage-so-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Engage'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/engage_logo.png
tags:
  - engage
---

Connect PostHog to [Engage](https://engage.so/), a marketing automation platform, and sends data to Engage for use in segmentation, targeting and automation.

Specifically, it only exports your `Custom` and `$identify` events to Engage.

Extra event properties and metadata are also processed and sent to Engage.

```
posthog.identify(
    '[user unique id]', // distinct_id, required
    { userProperty: 'value1' }, // $set, optional
    { anotherUserProperty: 'value2' } // $set_once, optional
);
```

The example above, using the PostHog browser JS SDK, appends extra properties to the identify event. These extra properties are also sent to Engage.

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to a Engage account, obviously.

## Installation

To install this destination, you will need your Engage secret key and public key to send data to PostHog. These are available on the 'Settings' page of your Engage dashboard, under the 'Account' > 'API' Keys section.

Once you have made a note of your keys, log in to your PostHog instance and follow the steps below.

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Engage' and select the destination, press Install.
3. Enter configuration by selecting the blue gear icon.
4. Enter the API information as requested, select save.

Now, as soon as the destination is enabled, PostHog will start sending your events to Engage in real-time.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destinations on the platform. The [source code](https://github.com/PostHog/posthog-engage-so-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog community members [Francis Onyishi](https://github.com/proalgor) and [Opeyemi Obembe](https://github.com/kehers) for creating this. Thank you!

### Who maintains this destination?

This destination is maintained by Engage.so. If you have issues with the destination not functioning as intended, please [let them know](mailto:hello@engage.so)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell Engage.so what you think](mailto:hello@engage.so)! to tell them what you think.

### What if my question isn't answered above?

We love answering questions. [Ask us anything](/questions).
