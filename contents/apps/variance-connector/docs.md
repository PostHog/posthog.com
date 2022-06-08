---
title: Variance Connector documentation
showTitle: true
topics:
    - variance-connector
---

### What does the Variance Connector app do?
Variance ingests your PostHog usage data in real-time and puts it in a format that is to use and work with for revenue teams. This includes extracting accounts and contacts, making it easy to see customers by their sales stage, define and monitor your PQLs, and more.

### What are the requirements for this app?
The Variance Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.31.0](https://posthog.com/blog/the-posthog-array-1-31-0) or later. The app supports `capture`, `page`, `identify`, and `alias` calls. 

Not running 1.31.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

### How do I install the Variance Connector app?
To install the Variance app you'll need a Variance account. In your Variance account go to Variance > Integrations > Create a new PostHog connection. This will give you a Webhook URL and Authorization header value. You will then use those two values when installing the app in your PostHog instance. Don't forget to hit enable after you've added the configuration details.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Variance Connector](https://github.com/PostHog/posthog-variance-plugin) is available on GitHub. 

### Who created this app?

This app was created by Variance. We'd like to thank everyone at Variance, especially Noah Briar, for creating the Variance connector. Thanks!

### Who maintains this app?

This app is maintained by Variance. For more information or to report an issues, please check [Variance's documentation](https://www.variance.com/docs/posthog).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions! You can [ask anything via our FAQ page](/questions). 

You can also [join the PostHog Community Slack group](/slack) to get advice on developing your own PostHog apps.