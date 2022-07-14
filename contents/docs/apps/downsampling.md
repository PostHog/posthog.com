---
title: Downsampler
showTitle: true
topics:
    - downsampler
---

### What does the Downsampler app do?

This app enables you to reduce how many events a deployment of PostHog will ingest. This is especially useful for users who have huge volumes of data, but don't need to analyze it all and want to avoid large bills.

### What are the requirements for this app?

The Downsampler app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

### How do I install the Downsampler app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Downsampling' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

### Can I use the Downsampler app to control my PostHog bill?

Yes. Paid-for versions of PostHog are priced per event and the Downsampling app enables you to reduce the number of events which your instance ingests, thereby giving you greater control over billing.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Downsampler app](https://github.com/PostHog/downsampling-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Michael Matloka](https://github.com/Twixes) and [Marius Andra](https://github.com/mariusandra) and [Neil Kakkar](https://github.com/neilkakkar) for creating the Downsampler.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
