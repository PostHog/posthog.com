---
title: Send PostHog person data to Zendesk
templateId:
  - template-zendesk
---

import FeedbackQuestions from "../\_snippets/feedback-questions.mdx"
import PostHogMaintained from "../\_snippets/posthog-maintained.mdx"

You can also send person properties to User fields in Zendesk.

## Prerequisites

You'll need a Zendesk OAuth client configured for the client credentials grant:

1. In Zendesk Admin Center, go to **Apps and integrations** > **APIs** > **OAuth clients**.
2. Create a confidential client that allows the client credentials grant and the `users:write` scope.
3. Copy the client identifier and secret – you'll add these in PostHog.

> **Note:** Changes made by the destination are attributed to the admin who created the OAuth client.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=zendesk) tab.
3. Search for 'Zendesk' and click **+ Create**.
4. Add your Zendesk subdomain, OAuth client identifier, and OAuth client secret at the configuration step.
5. Press **Create & Enable** and watch your 'Customer' list get populated in Zendesk!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/products/cdp/backend/templates/zendesk/template_zendesk.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
