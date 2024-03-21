---
title: Avo
github: 'https://github.com/PostHog/posthog-avo-plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/avo-logo.png
tags:
  - avo
---

[Avo](https://www.avo.app/) is a data governance platform which helps teams plan, implement and verify analytics at any scale. The Avo Inspector sends event schema - but not events themselves - to Avo. This enables you to, for example, avoid losing data or events due to naming issues in your analytics. 

You can read more about Avo in [the official announcement](/blog/avo-plugin-announcement). 

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need to have an [Avo](https://www.avo.app/) account, obviously. 

## Installation

First, you need to set PostHog as a data source in Avo. We recommend checking Avo's [documentation for setting PostHog as a source in Avo](https://www.avo.app/docs/workspace/connect-inspector-to-posthog).

Once PostHog is set as a source in Avo, simply install and enable the app in your PostHog instance by heading to the Apps section. You'll need to enter your Avo API key to complete the setup. 

## FAQ

### Where can I find out more?

Avo maintains robust [documentation about integrating PostHog and Avo](https://www.avo.app/docs/workspace/connect-inspector-to-posthog).

### Who maintains this destination?

This destination is maintained by the community. If you have issues with it not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
