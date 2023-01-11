---
title: Segment Connector
github: https://github.com/PostHog/posthog-segment
thumbnail: ../../apps/thumbnails/segment.png
tags:
    - segment
---

### What does the Segment Connector app do?

The Segment Connector app enables you to send events to PostHog, via Segment.

Segment allows you to easily manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics/marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

### What are the requirements for this app?

Using the Segment Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to a Segment workspace.

### How do I get started with the Segment Connector app?

1. In your Segment workspace, create a new project and enable PostHog as an integration. We are listed as a 'Destination' on Segment.
2. Grab the PostHog API key from the 'Project Settings' page in PostHog.
3. Use one of Segment's libraries to send events.
4. See the events coming into PostHog.

### Can PostHog with Segment do everything PostHog does by itself?

We are _big_ fans of Segment, and many people in our team use it now or have used it in the past. However, it comes with some limitations for PostHog.

The Segment app gives you access to some things our JS library can do, but using Segment alone means you can't have autocapture, feature flags, session recording, heatmaps or the toolbar. Segment is also more easily blocked by ad-blockers.

To get around these limitations, you can install the PostHog snippet or posthog-js alongside your Segment integration. You can then use Segment for any custom events (for example `segment.track('user sign up')`), and posthog-js will automatically give you access to all the extra features.

### Where can I find out more?

Further information about PostHog's Segment Connector is available in [Segment's integration catalog](https://segment.com/catalog/integrations/posthog/).

### Who maintains this app?

This app is maintained by Segment. For more information, please check [Segment's integration catalog](https://segment.com/catalog/integrations/posthog/).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
