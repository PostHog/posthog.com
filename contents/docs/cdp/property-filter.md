---
title: Property Filter
github: 'https://github.com/witty-works/posthog-property-filter-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Property%20Filter'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/cdp/thumbnails/property-filter.png
tags:
  - property-filter
---

This app sets all specified properties on ingested events to `null`, effectively preventing PostHog from collecting information you do not want it to use.

It is [used by teams such as WittyWorks to protect user privacy](https://posthog.com/customers/wittyworks) by removing unneeded geographic data.

## Requirements

The Property Filter app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. Log in to your PostHog instance
2.  Click "[Data pipeline](https://us.posthog.com/apps)" in the left sidebar
3. Search for 'Property Filter' press 'Install'
4. Configure the by app by following the onscreen instructions.

It's important to note that this app effectively removes information from PostHog events by setting properties to `null`. Apps on PostHog run in sequence, so it usually makes sense to place this app at the _end_ of a sequence.

Note: If you are filtering `$ip`, `event.ip` will also be set to null.

## Does this filter properties for retrospective events?

No. The Property Filter app will only work on events ingested _after_ it was enabled.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Property Filter app](https://github.com/witty-works/posthog-property-filter-plugin) is available on GitHub.

### Who created this app?

This app was created by [community members at WittyWorks](/customers/wittyworks) to protect the privacy of their users. We'd like to thank [Christian](https://github.com/Christian-aman-insurely) and [Lukas Kahwe Smnith](https://github.com/lsmith77) for creating the Property Filter.

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
