---
title: Engage 
github: https://github.com/PostHog/posthog-engage-so-plugin
installUrl: https://app.posthog.com/project/apps?name=Engage
thumbnail: ../../cdp/thumbnails/engage_logo.png
tags:
    - engage
---

Connect PostHog to [Engage](https://engage.so/), a marketing automation platform, and sends data to Engage for use in segmentation, targeting and automation.

Specifically, this app only exports your `Custom` and `$identify` events to Engage.

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

This requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to a Engage account, obviously.

## Installation

To install this app, you will need your Engage secret key and public key to send data to PostHog. These are available on the 'Settings' page of your Engage dashboard, under the 'Account' > 'API' Keys section.

Once you have made a note of your keys, log in to your PostHog instance and follow the steps below.

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Engage' and select the app, press Install.
3. Enter configuration by selecting the blue gear icon.
4. Enter the API information as requested, select save.

Now, as soon as the app is enabled, PostHog will start sending your events to Engage in real-time.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code](https://github.com/PostHog/posthog-engage-so-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog community members [Francis Onyishi](https://github.com/proalgor) and [Opeyemi Obembe](https://github.com/kehers) for creating this. Thank you!

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 