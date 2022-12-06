---
title: Avo Inspector
github: https://github.com/PostHog/posthog-avo-plugin
installUrl: https://app.posthog.com/project/apps?name=avo-inspector
thumbnail: ../../apps/thumbnails/avo-logo.png
topics:
    - avo-inspector
---

### What does the Avo Inspector do?

[Avo](https://www.avo.app/) is a data governance platform which helps teams plan, implement and verify analytics at any scale. The Avo Inspector app sends event schema - but not events themselves - to Avo. This enables you to, for example, avoid losing data or events due to naming issues in your analytics. 

You can read more about the Avo Inspector in [the official announcement](/blog/avo-plugin-announcement). 

###### What are the requirements for this app?

Using the Avo Inspector app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need to have an [Avo](https://www.avo.app/) account, obviously. 

##### How do I get started with the Avo Inspector?

First, you need to set PostHog as a data source in Avo. We recommend checking Avo's [documentation for setting PostHog as a source in Avo](https://www.avo.app/docs/workspace/connect-inspector-to-posthog).

Once PostHog is set as a source in Avo, simply install and enable the app in your PostHog instance by heading to the Apps section. You'll need to enter your Avo API key to complete the setup. 

### Where can I find out more?

Avo maintains robust [documentation about integrating PostHog and Avo](https://www.avo.app/docs/workspace/connect-inspector-to-posthog).

### Who maintains this app?

This app is maintained by the PostHog community. 

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
