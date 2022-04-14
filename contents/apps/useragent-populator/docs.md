---
title: Useragent Populator documentation
showTitle: true
topics:
    - useragent
---

### What are the requirements for this app?

The Useragent Populator requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### What does the Useragent Populator app do?

This app enhances events to include browser details when the event has a `$useragent` property. This enables off-loading, retrieving and parsing of user agent strings at ingestion.

It's typically used to easily pass the `User-Agent` HTTP header from incoming requests.

### How do I install the Useragent Enhancer app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Useragent Populator' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Useragent Populator](https://www.npmjs.com/package/useragent-plugin) is available on NPM. 

### Who created this app?

This app was created by the community. We'd like to thank [Weyert](https://www.npmjs.com/~weyert) for creating the Useragent Populator, as well as for all the other support and feedback. Thank you, Weyert!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.