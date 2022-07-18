---
title: RudderStack Export
showTitle: true
topics:
    - rudderstack
---

### What does the RudderStack Export app do?

The Rudderstack Export app enables you to send events from PostHog, to RudderStack. RudderStack will recognize PostHog as a data source, so you can use RudderStack's data pipeline features to send PostHog event data to other platforms.

### What are the requirements for this app?

The Rudderstack Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

You'll also need access to the Rudderstack instance you want to export to.

### How do I install the RudderStack Export app?

First, create a PostHog source in your RudderStack dashboard. Need help? Check [RudderStack's documentation](https://www.rudderstack.com/docs) for more information.

Once you've added PostHog as a source, make a note of the `write-key` field and your RudderStack server URL (also called the Data Planer URL).

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Rudderstack' and select the app, press Install.
3. Follow the on-screen steps to configure the app, entering your `write-key` and server URL information.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the RudderStack Export app](https://github.com/rudderlabs/rudderstack-posthog-plugin) is available on GitHub.

### Who created this app?

The Rudderstack Export app was created by community members and the team at RudderStack. We'd like to thank [Sayan-Mitra](https://github.com/sayan-mitra), [Gavin](https://github.com/thtmnisamnstr), [Amey Varangaonkar](https://github.com/ameypv-rudder), [Utsab Chowdhury](https://github.com/utsabc) and [Arnab Pal](https://github.com/arnab-p) for creating it. Thank you, all!

### Who maintains this app?

This app is maintained by Rudderstack. If you have issues with the app not functioning as intended, please [raise a bug report on the repo](https://github.com/rudderlabs/rudderstack-posthog-plugin).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
