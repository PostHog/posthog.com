---
title: URL query parameter converter
github: https://github.com/PostHog/integrations-repository/pull/31
installUrl: https://app.posthog.com/project/apps?name=url-query-parameter-converter
thumbnail: ../../apps/thumbnails/url-query
tags:
    - url-query
---

### What does the URL query parameter converter app do?

This app automatically converts URL query parameters for specific terms into event properties in PostHog, enabling you to analyse them like any other data point. This can be useful for seeing how your product or content converts based on search terms. 

### What are the requirements for this app?

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the this app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'URL query parameter converter' and select the app, press Install.
3. Configure the app to whitelist the parameters you want to turn into events.

That's it!

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for this app](https://github.com/PostHog/posthog-app-url-parameters-to-event-properties) is available on GitHub.

### Who created this app?

We'd like to thank PostHog community member [Benjamin Werker](https://github.com/everald) for creating this app.

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please raise a bug report to let the maintainer of this app know.

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
