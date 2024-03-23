---
title: Sendgrid
github: 'https://github.com/PostHog/sendgrid-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Sendgrid'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/sendgrid-connector.png
tags:
  - sendgrid-connector
---

Send event and emails data from PostHog into Sendgrid whenever a user is identified in PostHog.

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need Sendgrid access, obviously.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Sendgrid' and select the destination, press Install.
3. Add your Sendgrid API key at the configuration step.
4. Enable the destination and watch your contacts list get populated in Sendgrid!

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/sendgrid-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), as well as and community member [Jose Fuentes Castillo](https://github.com/j-fuentesg) for creating this. Thank you, all!

### Who maintains this destination?

This destination is maintained by PostHog. If you have issues with the destination not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this destination?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 

