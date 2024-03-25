---
title: Pace
github: 'https://github.com/PostHog/pace-posthog-integration'
installUrl: 'https://app.posthog.com/project/apps?name=Pace'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/pace-integration.png
tags:
  - pace-integration
---

[Pace](https://www.paceapp.com/) is a tool that equips sellers with relevant insights at the right time so they can spend time growing revenue. It allows them to convert, retain, and grow customers by prioritizing time and effort on the users who need it most.

This simply forwards any events that PostHog receives to Pace's internal ingestion endpoint

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to the relevant Pace account.

### Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Pace' and select the destination, press Install.
3. Enable the destination enter your Pace API key to authenticate with Pace.

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/pace-posthog-integration) is available on GitHub.

### Who created this destination?

This destination was created by [Saimon Alam](https://github.com/SaimonAlam15) at [Pace](https://www.paceapp.com/). 

### Who maintains this destination?

This destination is maintained by the community. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
