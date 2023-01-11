---
title: Property Filter
github: https://github.com/witty-works/posthog-property-filter-plugin
installUrl: https://app.posthog.com/project/apps?name=Property%20Filter
thumbnail: ../../apps/thumbnails/property-filter.png
topics:
    - property-filter
---

### What does the Property Filter app do?

This app sets all specified properties on ingested events to `null`, effectively preventing PostHog from collecting information you do not want it to use.

It is [used by teams such as WittyWorks to protect user privacy](https://posthog.com/customers/wittyworks) by removing unneeded geographic data.

### What are the requirements for this app?

The Property Filter app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Property Filter app?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Property Filter' press 'Install'
4. Configure the by app by following the onscreen instructions.

It's important to note that this app effectively removes information from PostHog events by setting properties to `null`. Apps on PostHog run in sequence, so it usually makes sense to place this app at the _end_ of a sequence.

Note: If you are filtering `$ip`, `event.ip` will also be set to null.

### Does this filter properties for retrospective events?

No. The Property Filter app will only work on events ingested _after_ it was enabled.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Property Filter app](https://github.com/witty-works/posthog-property-filter-plugin) is available on GitHub.

### Who created this app?

This app was created by [community members at WittyWorks](/customers/wittyworks) to protect the privacy of their users. We'd like to thank [Christian](https://github.com/Christian-aman-insurely) and [Lukas Kahwe Smnith](https://github.com/lsmith77) for creating the Property Filter.

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [raise a bug report on the repo](https://github.com/witty-works/posthog-property-filter-plugin) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
