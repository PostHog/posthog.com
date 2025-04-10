---
title: Send PostHog event data to Customer.io
templateId:
    - template-customerio
---

import Requirements from "../_snippets/requirements.mdx"
import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

<Requirements />

You'll also need access to the relevant Customer.io account.

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline/overview)" tab in the left sidebar.
2. Click the 'Destinations' tab.
3. Search for 'Customer.io' and select the destination.
4. Add your Customer.io site ID and API Key at the configuration step. Note that our integration requires Track API credentials.
5. Press 'Create & Enable' and watch your 'People' list get populated in Customer.io!

## Handling identity merging

PostHog and Customer.io handle identity management differently, which can lead to duplicate profiles in Customer.io when choosing `ID` as identifier and `distinct_id` as value.

### The issue

In PostHog, when a user first visits your site, they get an anonymous distinct ID. When they later sign up or log in and you call `.identify()` with their real user ID, PostHog merges both identities under one profile.

However, when these events sync to Customer.io using the default configuration:
1. First, a profile is created in Customer.io with the anonymous ID
2. Later, a second separate profile is created with the real user ID
3. The profiles remain disconnected in Customer.io, even though they're merged in PostHog

### Solution: use the profile merging toggle

You can enable automatic profile merging with the built-in toggle:

1. Go to your Customer.io destination in PostHog
2. Enable the "Enable profile merging" toggle in the configuration
3. Make sure you're using "Id" as the identifier key and `{event.distinct_id}` as the identifier value

This option will automatically merge profiles in Customer.io when an `$identify` event occurs in PostHog, connecting anonymous users with their identified profiles.

> **Note:** For advanced customization needs, you can click the "Edit source" button to modify the destination's code directly. See our guide on [customizing destinations](/docs/cdp/destinations/customizing-destinations) for more details.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/customerio/template_customerio.py) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
