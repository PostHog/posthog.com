---
title: Customer.io
github: 'https://github.com/PostHog/customerio-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Customer'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/customerio-connector.png
tags:
  - customer.io-connector
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"

Send event data from PostHog into Customer.io. User emails will also be sent if available and customers will be created in Customer.io.

> Note: We currently have an [open issue](https://github.com/PostHog/customerio-plugin/issues/26) with our customer.io plugin which is impacting some functionality. 

<Requirements />

You'll also need access to the relevant Customer.io account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Customer.io' and select the connector, press Install.
3. Add your Customer.io site ID and token at the configuration step.
4. Enable the connector and watch your 'People' list get populated in Customer.io!

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

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/customerio-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra), [Michael Matloka](https://github.com/Twixes) and community members [Angela Purcell](https://github.com/purcell3a), [Conrad Kurth](https://github.com/ConradKurth) and [Alberto S](https://github.com/albtsantos) for creating this.

<PostHogMaintained />

<FeedbackQuestions />
