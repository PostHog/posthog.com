---
title: Send PostHog events to Unify
templateId:
    - template-unify
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import CommunityMaintained from "../_snippets/community-maintained.mdx"

Send your PostHog events to [Unify](https://www.unifygtm.com/) to power your go-to-market workflows with product usage data. This destination forwards track events along with person and company context to Unify's webhook endpoint.

You'll need a Unify account with access to their PostHog integration.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.
2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=unify) tab.
3. Search for **Unify** and click **+ Create**.
4. Add your Unify Write Key at the configuration step. You can find this in the Unify app under **Settings** > **Integrations** > **PostHog**.
5. Configure the person and company attribute mappings to match your PostHog properties.
6. Press **Create & Enable**.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

### Attribute mapping

The destination lets you map PostHog person and group properties to Unify's person and company fields. By default, common fields like `email`, `first_name`, `last_name`, and `domain` are mapped automatically.

You can customize these mappings to match your property names in PostHog.

### Unsupported events

This destination skips the following event types:

- `$groupidentify`
- `$set`
- `$web_vitals`

All other events are forwarded to Unify.

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destinations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/unify/unify.template.ts) is available on GitHub.

<CommunityMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
