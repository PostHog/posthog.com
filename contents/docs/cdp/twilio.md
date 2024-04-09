---
title: Twilio
github: 'https://github.com/PostHog/posthog-twilio-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=posthog-twilio-plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/twilio.png
tags:
  - twilio
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This destination triggers SMS messages in Twilio when specified events or actions are detected in PostHog.

You can set a timeout period of between 1 second and 31536000 seconds (1 calendar year) to avoid accidentally spamming users with too many messages.

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Twilio' and select the connector, press 'Install'.
3. Follow the steps below to configure the connector.

## Configuration

To configure this destination, you will need your Account SID and Auth Token from Twilio. You can find these in Twilio in your account menu under `Account > Keys & Credentials > API Keys and tokens > Live credentials`.

Additionally, you will need to know your Twilio Phone Number. Follow [Twilio's documentation for buying or finding your Twilio phone numbers](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number).

## Additional configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/posthog-twilio-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank community members [Sandeep Guptan](https://github.com/samcaspus) and [Himanshu Garg](https://github.com/merrcury) for their work creating this destination. Thank you, both!

### Where can I find out more?

Check [Twilio's documentation](https://www.twilio.com/docs/) for more information on connecting Twilio with other services.

<CommunityMaintained />

<FeedbackQuestions />
