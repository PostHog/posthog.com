---
title: Send PostHog events and user profiles to Appcues
templateId:
  - template-appcues
---

import FeedbackQuestions from "../\_snippets/feedback-questions.mdx"
import PostHogMaintained from "../\_snippets/posthog-maintained.mdx"

You'll also need access to an Appcues account with API access enabled. You can create API credentials under settings in [Appcues Studio](https://studio.appcues.com).

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=appcues) tab.
3. Search for **Appcues** and click **+ Create**.
4. Enter your Appcues account ID, API key, and API secret at the configuration step.
5. Select your data region (US or EU).
6. Press **Create & Enable**.

<HideOnCDPIndex>

## How it works

The Appcues destination supports two types of calls:

- **Identify calls** – When PostHog captures `$identify` or `$set` events, the destination sends a `PATCH` request to update the user's profile in Appcues with the configured profile properties.

- **Track calls** – For all other events, the destination sends a `POST` request to record the event in Appcues with the event name, timestamp, and any configured attributes.

Both mapping templates are enabled by default.

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/appcues/appcues.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
