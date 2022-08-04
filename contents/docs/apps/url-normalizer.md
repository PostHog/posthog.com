---
title: URL Normalizer
github: https://github.com/PostHog/posthog-url-normalizer-plugin
installUrl: https://app.posthog.com/project/apps?name=URL%20Normalizer
thumbnail: ../../apps/thumbnails/url_normalizer.png
topics:
    - url-normalizer
---

### What does the URL Normalizer app do?

This app normalizes the format of URLs so you can more easily compare them in insights.

By default, the URL Normalizer converts all URLs to lowercase and strips trailing /s, overriding the old `current_url` property.

### What are the requirements for this app?

The URL Normalizer app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

### How do I install the URL Normalizer?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'URL Normalizer' and select the app, press Install.

### How do I configure the URL Normalizer?

No configuration is needed. The URL Normalizer will automatically convert all URLs to lowercase and remove any trailing slashes.

If you'd like to normalize URLs into a different format, please consider contributing a PR to [the repo](https://github.com/PostHog/posthog-url-normalizer-plugin).

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the URL Normalizer](https://github.com/PostHog/posthog-url-normalizer-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog user and community member [Mark Bennett](https://github.com/MarkBennett) for creating this app

### Who maintains this app?

This app is maintained by the PostHog Community. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
