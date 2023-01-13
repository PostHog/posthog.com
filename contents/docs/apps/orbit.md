---
title: Orbit Connector
github: https://github.com/PostHog/posthog-orbit-love-plugin
installUrl: https://app.posthog.com/project/apps?name=Orbit+Love+Report+Sync
thumbnail: ../../apps/thumbnails/orbit-stats-sync.png
tags:
    - orbit
---

### What does the Orbit Connector app do?

The Orbit app for PostHog pulls data from the Orbit.love workspace API into PostHog, enabling you to track your community as a product metric.

### What are the requirements for this app?

The Orbit Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need an Orbit workspace you can connect to.

### How do I install the Orbit Connector app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Orbit' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

### How do I use the Orbit Connector app?

Workspace stats are sent into your PostHog instance as an `orbit love report` event, which you can filter and explore using PostHog. Supported report types include: overview, members, and activities.

Refer to [Orbit's API documentation](https://docs.orbit.love/reference/about-the-orbit-api) for a full list of properties available in each report.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Orbit Connector](https://github.com/PostHog/posthog-orbit-love-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog co-founder [Tim Glaser](https://github.com/timgl) and former PostHog team member [Kunal](https://github.com/kpthatsme) for creating the Orbit Connector. Thank you, both!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
