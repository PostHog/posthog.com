---
title: Customer.io
github: https://github.com/PostHog/customerio-plugin
installUrl: https://app.posthog.com/project/apps?name=Customer
thumbnail: ../../cdp/thumbnails/customerio-connector.png
tags:
    - customer.io-connector
---

Send event data from PostHog into Customer.io. User emails will also be sent if available and customers will be created in Customer.io.

## Requirements

This requires either PostHog Cloud with the [data pipeline add-on](https://us.posthog.com/organization/billing), or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to the relevant Customer.io account.

## Installation

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Customer.io' and select the app, press Install.
3. Add your Customer.io site ID and token at the configuration step.
4. Enable the app and watch your 'People' list get populated in Customer.io!

## Configuration

<AppParameters />

### How do I match persons in PostHog with customers in Customer.io?

We assume that you use the same ID to identify users in Customer.io as you use as distinct_id or in `posthog.identify()`.

### How do I set properties on a Customer.io customer via PostHog?

PostHog will send any property inside the `$set: {}` property to customer.io. In the example below, `email` and `userProperty` will be set on the customer

```js
posthog.capture(
  'some_event',
  {
    event_property: 'this will not get sent',
    $set: {
      email: 'test@example.com',
      userProperty: 'value'
    }
  }
)
```

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code](https://github.com/PostHog/customerio-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), [Michael Matloka](https://github.com/Twixes) and community members [Angela Purcell](https://github.com/purcell3a), [Conrad Kurth](https://github.com/ConradKurth) and [Alberto S](https://github.com/albtsantos) for creating this.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 