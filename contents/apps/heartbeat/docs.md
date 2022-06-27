---
title: Heartbeat documentation
showTitle: true
topics:
    - heartbeat
---

### What does the Heartbeat app do?

The Heartbeat app simply sends one event to your project every minute for as long as it is enabled. It's mainly useful for testing and works well in conjunction with the Ingestion Alert app. 

### What are the requirements for this app?

The Heartbeat app doesn't require a living heart, but it _does_ require either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How do I install the Heartbeat app?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Heartbeat' press 'Install'
4. Configure the by app by following the instructions below. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Heartbeat app](https://github.com/PostHog/posthog-heartbeat-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank PostHog team member [Marcus Hyett](https://github.com/marcushyett-ph) for creating the Heartbeat app. Thanks, Marcus!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.