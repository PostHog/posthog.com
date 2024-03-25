---
title: Salesforce
github: 'https://github.com/PostHog/salesforce-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Salesforce'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/salesforce.svg
tags:
  - salesforce
---

This destination connects to your Salesforce instance, sending events from PostHog to Salesforce as they are ingested.

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need a Salesforce account to connect to, as well as the relevant levels of access to install and configure this destination.

## Installation

1. Log in to your PostHog instance
2.  Click "[Data pipeline](https://us.posthog.com/apps)" in the left sidebar
3. Search for 'Salesforce'
4. Select the destination, press 'Install' and follow the on-screen instructions

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/salesforce-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) and community members [Angela Purcell](https://github.com/purcell3a) and [Conrad Kurth](https://github.com/ConradKurth) for creating this. Thank you, all!

### Who maintains this destination?

This destination is maintained by the community. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
